import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { PersonalRoutingModule } from './personal.routing';
import { PersonalComponent } from './personal.component';
import { OrdersComponent } from './orders/orders.component';
import { FavoritesComponent } from './favorites/favorites.component';

@NgModule({
    imports: [
        CommonModule,
        PersonalRoutingModule,
        MaterialModule,
        FormsModule
    ],
    declarations: [PersonalComponent, OrdersComponent, FavoritesComponent],
    exports: [],
    entryComponents: []
})
export class PersonalModule { }
