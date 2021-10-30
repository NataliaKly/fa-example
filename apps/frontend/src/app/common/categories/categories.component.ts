import { Component, OnInit } from "@angular/core";
import { ViewModeEnum } from "../../enums/view-mode.enum";
import { ActionEnum } from "../../enums/action.enum";
import { CategoryDto } from "@fa-example/models/category.dto";
import { CostsService } from "../../service/costs.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { categoryUniqueTitleValidator } from "../../service/validation/categories-validation.service";

@Component({
  selector: "fa-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.less"]
})
export class CategoriesComponent implements OnInit {
  public readonly mode = ViewModeEnum.CATEGORIES;
  public readonly actions: typeof ActionEnum = ActionEnum;

  public formGroup: FormGroup;
  public loading: boolean = false;

  public get formArray(): FormArray {
    return this.formGroup.get("items") as FormArray;
  }

  constructor(
    public calendarService: CostsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      items: this.formBuilder.array([])
    });
    this.loading = true;
    this.calendarService.getCategories().subscribe((categories: CategoryDto[]) => {
      categories.forEach((category: CategoryDto) => {
        this.addControl(category);
      });
      this.loading = false;
    });
  }

  public addControl(category?: CategoryDto): void {
    this.formArray.push(
      this.formBuilder.group(
        category?.id
          ? {
              title: [category?.title ?? "", [Validators.required, categoryUniqueTitleValidator(this.formGroup)]],
              id: [category?.id ?? ""]
            }
          : {
              title: ["", [Validators.required, categoryUniqueTitleValidator(this.formGroup)]]
            }
      )
    );
  }

  public save(): void {
    this.calendarService
      .saveCategories((this.formArray.value as CategoryDto[]).filter((category: CategoryDto) => !!category.title))
      .subscribe();
  }

  public doAction(action: string): void {
    switch (action) {
      case this.actions.CALENDAR:
        this.router.navigate(["/"]);
        break;
    }
  }

  public removeCategory(control: AbstractControl): void {
    if (control.value.id) {
      this.calendarService.removeCategory(control.value.id).subscribe(() => this.removeControl(control));
    } else {
      this.removeControl(control);
    }
  }

  private removeControl(control: AbstractControl): void {
    (this.formGroup.get("items") as FormArray).controls.splice(
      (this.formGroup.get("items") as FormArray).controls.indexOf(control),
      1
    );
    (this.formGroup.get("items") as FormArray).updateValueAndValidity();
  }
}
