import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TechnologyPanelComponent } from './technology-panel/technology-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { PanelContainerComponent } from './panel-container/panel-container.component';
import { AddTechnologyComponent } from './add-technology/add-technology.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TechnologyPanelComponent,
    DetailViewComponent,
    PanelContainerComponent,
    AddTechnologyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
