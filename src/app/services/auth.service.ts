import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { ResponseModel } from '../models/ResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';
import { SingleResponseModel } from './singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl="https://localhost:44313/api/auth";
  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel);
  }

  isAuthenticated(){
     if(localStorage.getItem("token")){
       return true;
     }
     else
     {
       return false;
     }
  }

  register(user:User):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"register",user)
  }
}
