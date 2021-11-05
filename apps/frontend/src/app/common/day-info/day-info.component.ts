import { Component, HostBinding, OnInit } from "@angular/core";
import { CostsService } from "../../service/costs.service";
import { ActivatedRoute, Router } from "@angular/router";
import moment from "moment";
import { CostDto } from "@fa-example/models/cost.dto";
import { CategoryDto } from "@fa-example/models/category.dto";
import { ViewModeEnum } from "../../enums/view-mode.enum";
import { ActionEnum } from "../../enums/action.enum";
import { NavigationService } from "../../service/navigation.service";

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
  public year: string = "";
  public day: string = "";
  public date: moment.Moment = moment();
  public loading: boolean = false;
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
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.month = params?.month;
      this.year = params.year;
      this.day = params?.day;
      this.date = moment(this.year + "-" + this.month + "-" + this.day, "YYYY-MMMM-D");
      this.loadList();
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
        this.navigationService.goToMonth(this.date);
        break;
      case this.actions.EDIT:
        this.router.navigate(["/cost", this.selectedCost.id]);
        break;
      case this.actions.ADD:
        this.router.navigate(["/", this.year, this.month, this.day, "add-info"]);
        break;
      case this.actions.REMOVE:
        this.removeCost();
        break;
    }
  }

  private loadList(): void {
    this.calendarService.getDayInfo(this.date.format("MM-DD-YYYY")).subscribe((costs: CostDto[]) => {
      this.loading = false;
      this.costs = costs;
      this.groupedCosts = this.groupByCategory();
    });
  }

  private removeCost(): void {
    this.calendarService.removeCost(this.selectedCost.id).subscribe(() => {
      this.selectedCost = null;
      this.loading = true;
      this.loadList();
    });
  }
}
