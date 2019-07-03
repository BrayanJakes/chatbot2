import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



// components

import {PagesComponent} from './pages/pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChatConfigComponent } from '../chat/chat-config/chat-config.component';






const routesPage: Routes = [
    {path: '', component: PagesComponent, children: [
        {path: 'dashboard', component: DashboardComponent},
        {path: 'chatConfig', component: ChatConfigComponent},
        {path: '**', redirectTo: 'dashboard'}
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routesPage)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule {

}