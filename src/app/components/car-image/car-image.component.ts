import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css']
})
export class CarImageComponent implements OnInit {
  
  cars:Car[]=[]
  carImages:CarImage[]
  urlPath:string="https://localhost:44313/images"
  rentals:Rental[]=[]

  dataCarId:number
  dataDate:Rental
  dataDailyPrice:number

  constructor(
    private carImageService:CarImageService ,
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private rentalService:RentalService) {

  
    this.activatedRoute.params.subscribe((params=>{
      if(params['carId']){
        this.getCarImages(params['carId']);
        this.getCarDetails(params["carId"])
        this.getRentalDetails(params['carId'])
        this.dataCarId=params['carId']
        
        


      }
    }))
  }
    ngOnInit(): void {
  }

  getRentalDetails(carId:number){
    let date:Date=new Date(Date.now())
  this.rentalService.getRentalByCarId(carId).subscribe((response)=>{
    this.rentals=response.data
    response.data.forEach((p)=>{
      if((new Date(p.returnDate))>(new Date(date.toJSON())))
      {
        this.dataDate=p
      }
    })
  })
    
}

  getCarImages(carId:number){
    this.carImageService.getCarImages(carId).subscribe((response)=>{
      this.carImages=response.data
      
    })

  }
  getCarDetails(carId:number){
    this.carService.getCarDetailsByCarId(carId).subscribe((response)=>{
      this.cars=response.data
      response.data.forEach((p)=>{
        if(p.carId==carId)
        {
          this.dataDailyPrice=p.dailyPrice
        }
      })
    })
  }

  getSliderClassName(index: Number) {
    if (index == 0) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }
  
}
