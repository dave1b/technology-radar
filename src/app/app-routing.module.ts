import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTechnologyComponent } from './add-technology/add-technology.component';
import { AppComponent } from './app.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { PanelContainerComponent } from './panel-container/panel-container.component';


const routes: Routes = [
  { path: 'technologies/:name', component: DetailViewComponent },
  { path: '', component: PanelContainerComponent },
  { path: 'addTechnology', component: AddTechnologyComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
