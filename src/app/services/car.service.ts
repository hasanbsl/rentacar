import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl="https://localhost:44313/api/"
  imagePaht="https://localhost:44313/images"
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newParh=this.apiUrl+"cars/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newParh)
          
  }
  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPart=this.apiUrl+"cars/getbybrand?brandId="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPart)
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPart=this.apiUrl+"cars/getbycolor?colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPart)
  }

  getCarDetailsByCarId(carId:number):Observable<ListResponseModel<Car>>{
    let newPart=this.apiUrl+"cars/getbycar?carId="+carId
    return this.httpClient.get<ListResponseModel<Car>>(newPart)
  }
  getCarByBrandAndColor(brandId:number,colorId:number):Observable<ListResponseModel<Car>>{
    let newPart=this.apiUrl+"cars/getbybrandandcolor?brandId=${brandId}&colorId={colorId}";
    return this.httpClient.get<ListResponseModel<Car>>(newPart)
  }

add(car:Car):Observable<ResponseModel>{
  return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car)
}
update(car:Car):Observable<ResponseModel>{
  return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/update",car)
}
  
}
