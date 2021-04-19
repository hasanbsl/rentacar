import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';

import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/ResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
 appUrl="https://localhost:44313/api/colors/"
  constructor(private httpClient:HttpClient) { }

  getColor():Observable<ListResponseModel<Color>>{
    return this.httpClient.get<ListResponseModel<Color>>(this.appUrl+"getall")
  }
add(color:Color):Observable<ResponseModel>{
  return this.httpClient.post<ResponseModel>(this.appUrl+"add",color)
}

updateColor(color:Color): Observable<ResponseModel>{

  let newApiUrl = this.appUrl + "update";

  return this.httpClient.post<ResponseModel>(newApiUrl, color);
}

getByColorId(colorId:number):Observable<SingleResponseModel<Color>>{
  return this.httpClient.get<SingleResponseModel<Color>>(this.appUrl+"getbyid?colorId="+colorId)
}

}
