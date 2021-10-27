import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CalendarComponent } from "./common/calendar/calendar.component";
import { DayInfoComponent } from "./common/day-info/day-info.component";
import { NewDayInfoComponent } from "./common/new-day-info/new-day-info.component";
import { EditCostComponent } from "./common/edit-cost/edit-cost.component";
import { CategoriesComponent } from "./common/categories/categories.component";

const routes: Routes = [
  { path: "categories", component: CategoriesComponent },
  { path: "cost/:id", component: EditCostComponent },
  { path: ":year/:month", component: CalendarComponent },
  { path: ":year/:month/:day", component: DayInfoComponent },
  { path: ":year/:month/:day/add-info", component: NewDayInfoComponent },
  { path: "", component: CalendarComponent, pathMatch: "full" }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
