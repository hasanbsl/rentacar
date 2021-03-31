import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  
  carId: number;
  brands : Brand[];
  colors : Color[];
carUpdateForm:FormGroup

  constructor(
    private formBuilder:FormBuilder,
    private carService:CarService,
    private brandService:BrandService,
    private colorService:ColorService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createCarUpdateFrom()
    this.getBrands();
    this.getColors();

  
    this.activatedRoute.params
    .subscribe((param) => {
      if(param["carId"]){
        this.carId = param["carId"];
      }
    })
  }
  createCarUpdateFrom(){
    this.carUpdateForm=this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],

    })
  }

  getBrands(){
    this.brandService.getCategorys()
      .subscribe((response) => {
        this.brands = response.data;
      })
  }

  getColors(){
    this.colorService.getColor()
      .subscribe((response) => {
        this.colors = response.data;
      })
  }

  update(){
    if (this.carUpdateForm.valid) {
      let carModel=Object.assign({},this.carUpdateForm.value)
      carModel.id=this.carId;

      if(typeof(carModel.brandId) == "string"){
        carModel.brandId = parseInt(carModel.brandId);
      }

      if(typeof(carModel.colorId) == "string"){
        carModel.colorId = parseInt(carModel.colorId);
      }
      if(typeof(carModel.id) == "string"){
        carModel.id = parseInt(carModel.id);
      }


    
      this.carService.update(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
        if (responseError.error.ValidationErrors.length>0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
          this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama hatası")
            
          }
          
        }
      })
    }
     
    
  }


}
