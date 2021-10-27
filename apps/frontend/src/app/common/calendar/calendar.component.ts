import { Component, HostBinding, OnInit } from "@angular/core";
import { CostsService } from "../../service/costs.service";
import moment from "moment";
import { CalendarDto, CalendarItemDto } from "@fa-example/models/calendar-item.dto";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewModeEnum } from "../../enums/view-mode.enum";
import { ActionEnum } from "../../enums/action.enum";

@Component({
  selector: "fa-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.less"]
})
export class CalendarComponent implements OnInit {
  @HostBinding("class.fa-calendar")
  private hostClass: boolean = true;

  public date: moment.Moment = moment();
  public calendar: CalendarDto;
  public calendarCards: CalendarItemDto[];
  public month: string = "";
  public year: string = "";

  public readonly mode = ViewModeEnum.CALENDAR;
  public readonly actions: typeof ActionEnum = ActionEnum;
  public readonly daysTitles: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  public isToday(day: string): boolean {
    const currentMoment = moment();
    return this.year + "-" + this.month + "-" + day === currentMoment.format("YYYY-MMMM-D");
  }

  constructor(public calendarService: CostsService, private router: Router, private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.month = params?.month ?? moment().format("MMMM");
      this.year = params.year ?? moment().format("YYYY");
      this.date = moment(this.month, "MMMM");
      this.date.year(Number(this.year));

      this.calendarService.getCalendar(this.date.format("MM-DD-YYYY")).subscribe((calendar: CalendarDto) => {
        this.calendar = calendar;
        this.calendarCards = calendar.days;
        const firstDayWeekNumber = moment(this.date).date(1).isoWeekday();
        const lastDayWeekNumber = moment(this.date).add(1, "M").subtract(1, "ms").isoWeekday();
        for (let i = 0; i < firstDayWeekNumber - 1; i++) {
          this.calendarCards.unshift({
            day: "",
            costs: []
          });
        }
        for (let i = 0; i < 7 - lastDayWeekNumber; i++) {
          this.calendarCards.push({
            day: "",
            costs: []
          });
        }
      });
    });
  }

  public trackByFn(index: number, item: CalendarItemDto): string {
    return item.day;
  }

  public selectDate(date: Date): void {
    const momentDate: moment.Moment = moment(date);
    this.router.navigate(["/", momentDate.format("YYYY"), momentDate.format("MMMM")]);
  }

  public doAction(action: string): void {
    switch (action) {
      case this.actions.CATEGORY:
        this.router.navigate(["/categories"]);
        break;
      case this.actions.BACK:
        this.router.navigate(["/", this.year, moment(this.date).subtract(1, "M").format("MMMM")]);
        break;
      case this.actions.NEXT:
        this.router.navigate(["/", this.year, moment(this.date).add(1, "M").format("MMMM")]);
        break;
    }
  }
}
