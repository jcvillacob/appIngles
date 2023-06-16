import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IngresoTextoComponent } from './components/ingreso-texto/ingreso-texto.component';
import { LecturaTextoComponent } from './components/lectura-texto/lectura-texto.component';
import { FormsModule } from '@angular/forms';
import { VideoComponent } from './components/video/video.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    IngresoTextoComponent,
    LecturaTextoComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
