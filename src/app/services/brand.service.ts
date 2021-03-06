import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl="https://localhost:44313/api/brands/"
  constructor(private httpClient:HttpClient) { }

  getCategorys():Observable<ListResponseModel<Brand>>{
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl+"getall")
          
  }
  add(brand:Brand):Observable<ResponseModel>{
   return this.httpClient.post<ResponseModel>(this.apiUrl+"add",brand)
  }

  updateBrand(brand:Brand): Observable<ResponseModel>{

    let newApiUrl = this.apiUrl + "update";

    return this.httpClient.post<ResponseModel>(newApiUrl, brand);
  }
}
