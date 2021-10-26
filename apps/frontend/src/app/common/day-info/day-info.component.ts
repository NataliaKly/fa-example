import { Component, HostBinding, OnInit } from "@angular/core";
import { CostsService } from "../../service/costs.service";
import { ActivatedRoute, Router } from "@angular/router";
import moment from "moment";
import { CostDto } from "@fa-example/models/cost.dto";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CategoryDto } from "@fa-example/models/category.dto";
import { ViewModeEnum } from "../../enums/view-mode.enum";
import { ActionEnum } from "../../enums/action.enum";

@Component({
  selector: "fa-day-info",
  templateUrl: "./day-info.component.html",
  styleUrls: ["./day-info.component.less"]
})
export class DayInfoComponent implements OnInit {
  @HostBinding("class.fa-day-info")
  private hostClass: boolean = true;

  public costs: CostDto[] = [];
  public groupedCosts: any;
  public month: string = "";
  public day: string = "";
  public date: moment.Moment = moment();
  public loading: boolean = false;
  public formGroup: FormGroup;
  public categories: CategoryDto[] = [];
  public selectedCost: CostDto;

  public get dateString(): string {
    return this.date.format("DD.MM.YYYY");
  }

  public readonly mode = ViewModeEnum.DAY;
  public readonly actions: typeof ActionEnum = ActionEnum;

  constructor(
    public calendarService: CostsService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.formGroup = this.formBuilder.group({
      items: this.formBuilder.array([])
    });
    this.route.params.subscribe(params => {
      this.month = params?.month;
      this.day = params?.day;
      this.date = moment(this.month + "-" + this.day, "MMMM-D");
      this.calendarService.getDayInfo(this.date.format("MM-DD-YYYY")).subscribe((costs: CostDto[]) => {
        this.loading = false;
        this.costs = costs;
        this.groupedCosts = this.groupByCategory();
      });
    });
    this.calendarService.getCategories().subscribe((categories: CategoryDto[]) => {
      this.categories = categories;
    });
  }

  public selectCost(cost: CostDto): void {
    this.selectedCost = this.selectedCost?.id === cost.id ? null : cost;
  }

  public trackByFn(index: number, item: CostDto): string {
    return item.id;
  }

  groupByCategory() {
    const groupedCosts = [];
    const groupedCostsObj = this.costs.reduce(function (acc, obj) {
      let key = obj["category"]["title"];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});

    for (const [key, value] of Object.entries(groupedCostsObj)) {
      const total = (value as CostDto[])
        .map((cost: CostDto) => cost.amount)
        .reduce((sum: number, current: number) => sum + current);
      groupedCosts.push({
        title: key,
        costs: value,
        total: total
      });
    }
    return groupedCosts;
  }

  public doAction(action: string): void {
    switch (action) {
      case this.actions.CALENDAR:
        this.router.navigate(["/", this.month]);
        break;
      case this.actions.EDIT:
        this.router.navigate(["/cost", this.selectedCost.id]);
        break;
    }
  }
}
