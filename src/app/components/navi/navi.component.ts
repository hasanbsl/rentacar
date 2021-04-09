import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  loginCheck=false;
  user:User;
  constructor(private authService:AuthService,
    private userService:UserService,
    private activatedRoute:ActivatedRoute,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["email"]) {
       
        this.getUserMail(params["email"])
        
      }
    })
      
    
    this.chech();
  }

  chech(){
    if (this.authService.isAuthenticated()){
      this.loginCheck=true;
    }
  }

  getUserMail(email:string){
this.userService.getUserMail(email).subscribe((reponse)=>{
this.user=reponse.data
})
  }

}
