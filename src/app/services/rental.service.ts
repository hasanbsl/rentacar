import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarRental } from '../models/car-rental';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/ResponseModel';


@Injectable({
  providedIn: 'root'
})
export class RentalService {
appUrl="https://localhost:44313/api/"

  constructor(private httpClient:HttpClient) { }

  getRental():Observable<ListResponseModel<Rental>>{
    let newUrl=this.appUrl+"rentals/getrentaldetails"
   return this.httpClient.get<ListResponseModel<Rental>>(newUrl)
  }

  getRentalByCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let newUrl=this.appUrl+"rentals/getbycarid?carId="+carId
   return this.httpClient.get<ListResponseModel<Rental>>(newUrl)
  }

  rentalAdd(carRental:CarRental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.appUrl+"rentals/add",carRental)
  }
}
