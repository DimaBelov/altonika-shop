import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalComponent } from './personal.component';
import { OrdersComponent } from './orders/orders.component';
import { FavoritesComponent } from './favorites/favorites.component';

const personalRoutes: Routes = [
    { path: '', redirectTo: 'lk', pathMatch: 'full' },
    {
        path: 'lk',
        component: PersonalComponent,
        children: [
            {
              path: 'orders', 
              component: OrdersComponent,
              outlet: 'personal'
            },
            {
              path: 'fav', 
              component: FavoritesComponent,
              outlet: 'personal'
            }
        ]
      }

    // {
    //     path: '',
    //     redirectTo: 'lk', 
    //     pathMatch: 'full' 
    // },
    // {
    //     path: 'lk',
    //     component: PersonalComponent,
    //     children: [
    //         // {
    //         //     path: '',
    //         //     redirectTo: 'orders', 
    //         //     pathMatch: 'full'
    //         // },
    //         {
    //             path: 'orders',
    //             component: OrdersComponent,
    //             outlet: 'personal-outlet'
    //         },
    //         {
    //           path: 'fav',
    //           component: FavoritesComponent,
    //           outlet: 'personal-outlet'
    //         }
    //     ]
    // }

    // {
    //     path: '',
    //     component: PersonalComponent
    // },
    // {
    //     path: 'orders',
    //     component: OrdersComponent
    // },
    // {
    //   path: 'fav',
    //   component: FavoritesComponent
    // }
];

@NgModule({
    imports: [RouterModule.forChild(personalRoutes)],
    exports: [RouterModule]
})
export class PersonalRoutingModule { }

// export const personalRouting: ModuleWithProviders = RouterModule.forChild(personalRoutes);
