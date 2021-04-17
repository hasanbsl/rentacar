import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';
import {FormGroup,FormBuilder, FormControl, Validators} from "@angular/forms"
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  
@Input() rentals:Rental[]=[]

  constructor(
    private rentalService:RentalService,
    private toastrService:ToastrService,
     private activatedRoute:ActivatedRoute,
     private formBuilder:FormBuilder
    ) { }

  ngOnInit(): void {
  this.getRental()
  } 
getRental(){
  this.rentalService.getRental().subscribe(response=>{
    this.rentals=response.data
   
  })
   }
   
   returnDateCheck(rental:Rental):string {
     let date:Date=new Date()
     if(rental.returnDate.toString()<date.toJSON().toString()){
      return 'table-secondary'
      
     }
    return 'table-danger'
   }
}
