import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './components/home/home.module';
import { ListModule } from './components/list/list.module';
import { OptionsModule } from './components/options/options.module';
import { MediaDetailsModule } from './components/media-details/media-details.module';
import { TmdbService } from './services/tmdb.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HomeModule,
    ListModule,
    OptionsModule,
    MediaDetailsModule,
    HttpClientModule
  ],
  providers: [
    TmdbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
