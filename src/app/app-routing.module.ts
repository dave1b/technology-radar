import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTechnologyComponent } from './add-technology/add-technology.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { EditTechnologyComponent } from './edit-technology/edit-technology.component';
import { LoginComponent } from './login/login.component';
import { PanelContainerComponent } from './panel-container/panel-container.component';
import { UnpublishedComponent } from './unpublished/unpublished.component';


const routes: Routes = [
  { path: 'technologies/:name', component: DetailViewComponent },
  { path: 'edit/:name', component: EditTechnologyComponent },
  { path: '', component: PanelContainerComponent },
  { path: 'addTechnology', component: AddTechnologyComponent, canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'unpublished', component: UnpublishedComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
