import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { MaterialModule } from '@angular/material';
import { AccordionModule } from 'ngx-accordion';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AuthGuard } from './auth-guard';
import { LoginComponent } from './login/login.component';
import { UserService } from '@services/user.service';
import { ListComponent } from './list/list.component';
import { ProductService } from '@services/product.service';
import { BasketComponent } from './basket/basket.component';
import { BasketService } from '@services/basket.service';
import { ProductCardDialogComponent } from './product-card-dialog/product-card-dialog.component';
import { OrderService } from '@services/order.service';
import { ProductHistoryService } from '@services/product-history.service';
import { OrderSuccessDialogComponent } from './basket/order-success-dialog/order-success-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent,
    BasketComponent,
    ProductCardDialogComponent,
    OrderSuccessDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    routing,
    BrowserAnimationsModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    MaterialModule,
    AccordionModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [AuthGuard, UserService, ProductService, BasketService, OrderService, ProductHistoryService],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent],
  entryComponents: [ProductCardDialogComponent, OrderSuccessDialogComponent]
})
export class AppModule { }
