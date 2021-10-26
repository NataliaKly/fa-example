import { NgModule } from "@angular/core";
import { CommonModule as NgCommonModule } from "@angular/common";
import { AngularSvgIconModule } from "angular-svg-icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "../app-routing.module";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatExpansionModule } from "@angular/material/expansion";
import { CalendarComponent } from "./calendar/calendar.component";
import { DayInfoComponent } from "./day-info/day-info.component";
import { TitleComponent } from "./title/title.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { NewDayInfoComponent } from "./new-day-info/new-day-info.component";
import { ActionPanelComponent } from "./action-panel/action-panel.component";
import { EditCostComponent } from "./edit-cost/edit-cost.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { CategoriesComponent } from "./categories/categories.component";

const components = [
  CalendarComponent,
  DayInfoComponent,
  TitleComponent,
  NewDayInfoComponent,
  EditCostComponent,
  ActionPanelComponent,
  CategoriesComponent
];

@NgModule({
  imports: [
    NgCommonModule,
    AngularSvgIconModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: components,
  exports: components
})
export class CommonModule {}
