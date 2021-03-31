import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  appUrl="https://localhost:44313/api/"
  constructor(private httpClient:HttpClient) { }

  getCarImages(carId:Number):Observable<ListResponseModel<CarImage>>{
    let newPath=this.appUrl+"carimages/getimagesbycarid?id="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getCarImagesAll():Observable<ListResponseModel<CarImage>>{
    let newPath=this.appUrl+"carimages/getall";
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
