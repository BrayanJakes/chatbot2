import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages/pages.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { ComponentsRoutingModule } from './components.routing';
import { ElementModule } from '../element.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    ElementModule
  ],
  
  declarations: [DashboardComponent, PagesComponent, ToolbarComponent, SidebarComponent, FooterComponent],

  exports: [
    DashboardComponent, ComponentsRoutingModule, PagesComponent
  ]
})
export class ComponentsModule { }
