import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  loginCheck=false;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.chech();
  }

  chech(){
    if (this.authService.isAuthenticated()){
      this.loginCheck=true;
    }
  }
 

}
