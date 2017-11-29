import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './auth-guard';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { BasketComponent } from './basket/basket.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { PersonalComponent } from './personal/personal.component';
import { PersonalModule } from './personal/personal.module';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'list',
    component: ListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'card',
    component: ProductCardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'basket',
    component: BasketComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'personal',
    loadChildren: './personal/personal.module#PersonalModule',
    canActivate: [AuthGuard]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
