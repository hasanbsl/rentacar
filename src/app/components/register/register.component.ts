import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder ,
    private authService:AuthService,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }
 createRegisterForm(){
   this.registerForm=this.formBuilder.group({
     firstName:["",Validators.required],
     lastName:["",Validators.required],
     email:["",Validators.required],
     password:["",Validators.required]
   })
  }
   register(){
     if(this.registerForm.valid){
       console.log(this.registerForm.value)
       let userModel=Object.assign({},this.registerForm.value)

       this.authService.register(userModel).subscribe(response=>{
        this.toastrService.success(response.message,"Üye Olundu")
      },responseError=>{
        if (responseError.error.ValidationErrors.length>0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
          this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Başarısız")
            
          }
          
        }
      })
     }
   }
 

}