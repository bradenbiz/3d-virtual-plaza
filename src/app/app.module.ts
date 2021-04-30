import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './locations/home/home.component';
import {SandboxComponent} from './locations/sandbox/sandbox.component';
import {MenuComponent} from './shared/menu/menu.component';
import {MallMapComponent} from './3d-components/mall-map/mall-map.component';
import {CameraControlsService} from './services/camera-controls.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    MallMapComponent,
    HomeComponent,
    SandboxComponent,
    MenuComponent,
    MallMapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [CameraControlsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
