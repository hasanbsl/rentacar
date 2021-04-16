import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  get(key:string){
    return localStorage.getItem(key);
  }

  set(key:string,value:any){
    return localStorage.setItem(key,value);
  }

  remove(key:string){
    return localStorage.removeItem(key);
  }

  clear(){
    localStorage.clear();
  }

}
