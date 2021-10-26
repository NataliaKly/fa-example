import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from "@angular/core";
import { MatDatepicker } from "@angular/material/datepicker";
import { ActionEnum } from "../../enums/action.enum";
import { ViewModeEnum } from "../../enums/view-mode.enum";

@Component({
  selector: "fa-title",
  templateUrl: "./title.component.html",
  styleUrls: ["./title.component.less"]
})
export class TitleComponent implements OnInit {
  @HostBinding("class.fa-title")
  private hostClass: boolean = true;

  @Input()
  public mode: ViewModeEnum;

  @Input()
  public title: string = "";

  @Input()
  public icon: string = "";

  @Output()
  public arrowClick: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public selectDate: EventEmitter<Date> = new EventEmitter<Date>();

  @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;

  public viewMode: typeof ViewModeEnum = ViewModeEnum;
  public actions: typeof ActionEnum = ActionEnum;

  constructor() {}

  ngOnInit(): void {}

  public onArrowClick(action: string): void {
    this.arrowClick.emit(action);
  }

  public changeMonth(date: Date): void {
    this.datepicker.close();
    this.selectDate.emit(date);
  }
}
