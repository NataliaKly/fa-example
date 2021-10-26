import { Component, HostBinding, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CategoryDto } from "@fa-example/models/category.dto";
import { CostsService } from "../../service/costs.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import moment from "moment";
import { CostDto } from "@fa-example/models/cost.dto";
import { switchMap, tap } from "rxjs/operators";
import { MatSelectChange } from "@angular/material/select";
import { ViewModeEnum } from "../../enums/view-mode.enum";
import { ActionEnum } from "../../enums/action.enum";

@Component({
  selector: "fa-edit-cost",
  templateUrl: "./edit-cost.component.html",
  styleUrls: ["./edit-cost.component.less"]
})
export class EditCostComponent implements OnInit {
  @HostBinding("class.fa-edit-cost")
  private hostClass: boolean = true;

  public formGroup: FormGroup;
  public categories: CategoryDto[] = [];
  public loading: boolean = false;
  public id: string = "";

  public readonly mode = ViewModeEnum.EDIT_COST;
  public readonly actions: typeof ActionEnum = ActionEnum;

  constructor(
    public costsService: CostsService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.costsService
      .getCategories()
      .pipe(
        tap((categories: CategoryDto[]) => {
          this.categories = categories;
        }),
        switchMap(categories => this.route.params),
        tap((params: Params) => {
          this.id = params.id;
        }),
        switchMap(() => this.costsService.getCostById(this.id))
      )
      .subscribe((cost: CostDto) => {
        this.formGroup = this.formBuilder.group({
          id: [cost.id],
          title: [cost.title, [Validators.required]],
          amount: [cost.amount, [Validators.required, Validators.min(1)]],
          categoryId: [cost.category.id, [Validators.required]],
          date: [cost.date]
        });
        this.loading = false;
      });
  }

  public trackByFn(index: number, item: CategoryDto): string {
    return item.id;
  }

  public save(): void {
    const category = this.categories.find((category: CategoryDto) => category.id === this.formGroup.value.categoryId);
    this.costsService
      .update({
        id: this.formGroup.value.id,
        title: this.formGroup.value.title,
        date: this.formGroup.value.date,
        amount: this.formGroup.value.amount,
        category: category
      })
      .subscribe(() => {
        const momentDate = moment(this.formGroup.value.date);
        this.router.navigate(["/", momentDate.format("MMMM"), momentDate.format("D")]);
      });
  }

  public doAction(action: string): void {
    switch (action) {
      case this.actions.CALENDAR:
        const momentDate = moment(this.formGroup.value.date);
        this.router.navigate(["/", momentDate.format("MMMM")]);
        break;
    }
  }
}
