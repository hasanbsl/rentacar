import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarRental } from '../models/car-rental';
import { ResponseModel } from '../models/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  appUrl="https://localhost:44313/api/"

  constructor(private httpClient:HttpClient) { }

pay(rental:CarRental,amount:number):Observable<ResponseModel>{
  let newPath=this.appUrl+'rentals/paymentadd';
  
  return this.httpClient.post<ResponseModel>(newPath,{payment:{amount:amount},rental:rental})
}

}
