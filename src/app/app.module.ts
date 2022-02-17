import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TechnologyPanelComponent } from './technology-panel/technology-panel.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { PanelContainerComponent } from './panel-container/panel-container.component';
import { AddTechnologyComponent } from './add-technology/add-technology.component';
import { LoginComponent } from './login/login.component';
import { UnpublishedComponent } from './unpublished/unpublished.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { EditTechnologyComponent } from './edit-technology/edit-technology.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TechnologyPanelComponent,
    DetailViewComponent,
    PanelContainerComponent,
    AddTechnologyComponent,
    LoginComponent,
    UnpublishedComponent,
    EditTechnologyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthGuard, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
