import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { CommonModule } from "./common/common.module";
import { AngularSvgIconModule } from "angular-svg-icon";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule } from "@angular/material/input";
import { CostsService } from "./service/costs.service";
import { NavigationService } from "./service/navigation.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    RouterModule,
    BrowserAnimationsModule,
    MatInputModule
  ],
  providers: [CostsService, NavigationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
