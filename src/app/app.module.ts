import { NgModule, NO_ERRORS_SCHEMA, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { MaterialModule } from '@angular/material';
import { AccordionModule } from 'ngx-accordion';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Ng2CompleterModule } from 'ng2-completer';

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
import { SearchHistoryService } from '@services/search-history.service';
import { ProductCardComponent } from './product-card/product-card.component';
import { PersonalComponent } from './personal/personal.component';
import { PaginatorPanel } from '@lib/paginator-panel/paginator-panel';
import { GlobalErrorHandler } from '@services/global.error.handler';
import { Messenger, MessengerComponent } from '@services/messenger';
import { WaitSpinner } from '@services/wait-spinner';
import { Logger } from '@services/logger';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent,
    BasketComponent,
    ProductCardDialogComponent,
    ProductCardComponent,
    PersonalComponent,
    MessengerComponent,
    PaginatorPanel
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
    HttpClientModule,
    Ng2CompleterModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    AuthGuard, 
    UserService, 
    ProductService, 
    BasketService, 
    OrderService, 
    ProductHistoryService,
    SearchHistoryService,
    Messenger,
    WaitSpinner,
    Logger
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent],
  entryComponents: [MessengerComponent, ProductCardDialogComponent]
})
export class AppModule { }
