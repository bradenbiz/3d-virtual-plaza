import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MallDirectoryComponent } from './shared/mall-directory/mall-directory.component';
import { HomeComponent } from './pages/home/home.component';
import { FreelanceComponent } from './pages/freelance/freelance.component';

@NgModule({
  declarations: [
    AppComponent,
    MallDirectoryComponent,
    HomeComponent,
    FreelanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
