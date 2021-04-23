import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FreelanceComponent} from './pages/freelance/freelance.component';
import {HomeComponent} from './pages/home/home.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'freelance', component: FreelanceComponent
  },
  {
    path: "**", redirectTo: '', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
