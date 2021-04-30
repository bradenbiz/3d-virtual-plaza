import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './locations/home/home.component';
import {SandboxComponent} from './locations/sandbox/sandbox.component';


const routes: Routes = [
  {
    path: '', component: SandboxComponent
  },
  // {
  //   path: 'sandbox', component: SandboxComponent
  // },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
