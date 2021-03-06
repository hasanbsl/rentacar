import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/car-image/:carId", component:CarImageComponent},
  {path:"cars/filter/:brandId/:colorId",component:CarComponent},
  {path:"cars/rental/:carId",component:RentalComponent},
  {path:"cars/payment/:carId",component:PaymentComponent,canActivate:[LoginGuard]},
  {path:"cars/add",component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"cars/update/:carId",component:CarUpdateComponent,canActivate:[LoginGuard]},
  {path:"brands/update/:brandId",component:BrandUpdateComponent,canActivate:[LoginGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"brands/add",component:BrandAddComponent,canActivate:[LoginGuard]},
  {path:"colors/add",component:ColorAddComponent,canActivate:[LoginGuard]},
  {path:"colors/update/:colorId", component:ColorUpdateComponent},
  {path:"profile",component:ProfileComponent},

  {path:"brand/list",component:BrandListComponent},
  {path:"color/list",component:ColorListComponent}
 
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
