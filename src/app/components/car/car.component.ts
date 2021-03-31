import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars:Car[]=[]
  
  carImages:CarImage
  dataLoaded=false
  carFilterText="";
  imagePath1:string="https://localhost:44313/images/"
  

  constructor(
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private carImageService:CarImageService,
    private toastrService:ToastrService
   
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["colorId"] && params["brandId"]){
        this.getCarByFilter(params["brandId"],params["colorId"]);
      }
      else if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }
      else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }
      else{
        this.getCars() 
        
      }
     
      
    })

  }

   
      
  getImageClass(car: number) {}
      
  getCarByFilter(brandId:number, colorId: number) {
    this.carService.getCarByBrandAndColor(brandId,colorId).subscribe(response => {
      this.cars = response.data,
      this.dataLoaded = true
     if(this.cars.length == 0){
        this.toastrService.info('Arama sonuçunuza ait bir araç bulunmamaktadır.', 'Arama Sonucu');
     }
    })
    
  }

  getCars(){
   this.carService.getCars().subscribe(response=>{
     this.cars=response.data;   
     this.dataLoaded=true
   })
          
  }

    getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe((response)=>{
      this.cars=response.data
      this.dataLoaded=true
    })
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe((response)=>{
      this.cars=response.data
      this.dataLoaded=true
    })
  }

  
 
}
