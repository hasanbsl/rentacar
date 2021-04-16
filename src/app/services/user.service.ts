import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/ResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl="https://localhost:44313/api/users"
  constructor(private httpClient:HttpClient) { }

  getUserMail(user:User):Observable<SingleResponseModel<User>>{
    return this.httpClient.post<SingleResponseModel<User>>(this.apiUrl+"/getmail",user)
          
  }

  update(user:User){
    let apiUrl = this.apiUrl +'/update'
    return this.httpClient.post<ResponseModel>(apiUrl,user);
  }
}
