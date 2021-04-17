import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder ,
    private authService:AuthService,
    private userService:UserService,
    private toastrService:ToastrService,
    private router:Router,
    private localStorageService:LocalStorageService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }
 createLoginForm(){
   this.loginForm=this.formBuilder.group({
     email:["",Validators.required],
     password:["",Validators.required]
   })
  }
   login(){
     if(this.loginForm.valid){
       console.log(this.loginForm.value)
       let loginModel=Object.assign({},this.loginForm.value)

       this.authService.login(loginModel).subscribe(response=>{
         this.toastrService.info(response.message,"Giriş Başarılı")
         this.localStorageService.set("token",response.data.token)
        this.getUserDto(this.loginForm.value.email);
         this.router.navigate(["cars"])
        
       },responseError=>{
         this.toastrService.error(responseError.error.message,"Hatalı Giriş");
         
       })
     }
   }

   getUserDto(email:string){
     let userModel=Object.assign({email:email});
     this.userService.getUserMail(userModel).subscribe((response)=>{
       console.log(response);
       this.localStorageService.set("fullName",response.data.firstName+" "+response.data.lastName);
       this.localStorageService.set("email",response.data.email);

     });
   }
 
}
