import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:'',component:LandingPageComponent
  },
  {
    path:'signin',component:SigninComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'home',component:LandingPageComponent
  },
  {
    path:'user/dashboard',component:DashboardComponent , canActivate:[AuthGuard]
  },
  {
    path:'user/transactions',component:TransactionsComponent , canActivate:[AuthGuard]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
