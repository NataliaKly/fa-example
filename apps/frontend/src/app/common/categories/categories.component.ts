import { Component, OnInit } from "@angular/core";
import { ViewModeEnum } from "../../enums/view-mode.enum";
import { ActionEnum } from "../../enums/action.enum";
import { CategoryDto } from "@fa-example/models/category.dto";
import { CostsService } from "../../service/costs.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";

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
              title: [category?.title ?? "", [Validators.required]],
              id: [category?.id ?? ""]
            }
          : {
              title: ["", [Validators.required]]
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
}
