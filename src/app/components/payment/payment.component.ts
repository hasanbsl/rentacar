import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarRental } from 'src/app/models/car-rental';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  customers:Customer[];
  customerId:Number;
  rentcar:CarRental
 returnDate:Date
 rentDate:Date
 datecheck=false;
 amountOfPayment:number
 totalDays:number
 

 @Input() data:number;
 @Input() dataPrice:number;
 @Input() datarental:Rental;
  
  constructor( 
    private activatedRoute:ActivatedRoute,
    private carDetailService:CarService,
    private router:Router,
    private toastrService: ToastrService,
     private paymentService:PaymentService,
     private rentalService:RentalService,
     private customerService:CustomerService
    ) { }

    ngOnInit(): void {
      this.getCustomer();
    }

    getCustomer(){
      this.customerService.getCustomer().subscribe(response => {
        this.customers = response.data;
        //this.dataLoaded = true;
      })
    }

    getRentMinDate() {
      var date = new Date();
      date.setDate(date.getDate() + 1);
      return date.toISOString().slice(0, 10);
    }
  
    getReturnMinDate() {
      var date = new Date();
      date.setDate(date.getDate() + 1);
      return date.toISOString().slice(0, 10);
    }
  
    rentacar() {
      if (!this.datarental) {
        if (
          new Date(this.rentDate) >= new Date(Date.now()) &&
          new Date(this.returnDate) > new Date(Date.now())
        ) {
          this.toastrService.success("??deme Sayfas??na Y??nlendiriliyorsunuz")
          console.log('??deme y??nlendirliyirosunuza');
          this.datecheck = true;
          //toplam miktar ??deme i??lemi
          var returnD = new Date(this.returnDate);
        var rentD = new Date(this.rentDate);
        var difference = returnD.getTime() - rentD.getTime();
      
        var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24)); 
        this.totalDays=numberOfDays
        
          let total:number = numberOfDays *this.dataPrice;
       
          this.amountOfPayment=total
          
        
       
         ////////////////
        } else {
          this.toastrService.error("L??tfen Tarih Se??iniz")
          console.log('tarih se?? ulan');
        }
      } else {
        if (
          new Date(this.datarental.returnDate) < new Date(this.rentDate) &&
          this.rentDate < this.rentDate
        ) {
         
          console.log('??demeye gidiliyor');
          this.datecheck = true;
        } else {
          this.toastrService.error("Bu Tarihler Aras??nda Kiralayamazs??n??z")
         
        }
     
      }
      
    }
  
    payment() {
      if (true) {
        this.rentalcar()
        this.toastrService.success('Kiralama i??lemi tamamland??.');
        console.log('Kiraland??..');
      }
      
    }
  
    rentalcar() {
  
      this.rentcar = {
        carId: parseInt(this.data.toString()),
        customerId: parseInt(this.customerId.toString()),
        rentDate: new Date(this.rentDate),
        returnDate: new Date(this.returnDate),
      };
  
      let rentcarobject = Object.assign({},this.rentcar  )
      
      
      this.rentalService.rentalAdd(rentcarobject).subscribe((data) => {
        console.log(data);
      });
    }

   
     

      
    
      
    
  }
