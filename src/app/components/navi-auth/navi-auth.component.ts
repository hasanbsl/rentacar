import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi-auth',
  templateUrl: './navi-auth.component.html',
  styleUrls: ['./navi-auth.component.css']
})
export class NaviAuthComponent implements OnInit {

  constructor(private authService:AuthService,private localStorageService:LocalStorageService) { }

  authStatus:boolean=false;
  fullName:any;
  ngOnInit(): void {
    this.isAuth();
  }

  isAuth(){
    this.authStatus=this.authService.isAuthenticated();
    if (this.authStatus)
    {
      this.fullName=(this.localStorageService.get("fullName") !==null)?this.localStorageService.get("fullName") : "Boş"; 
      //this.fullName=(localStorage.getItem("token") !==null)? localStorage.getItem("token") : "Boş"; 
     
    }
  }

  logout(){
    this.localStorageService.clear();
    this.isAuth();
  }
  

}
