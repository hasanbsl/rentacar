import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
brands:Brand[]=[]
currentBrand:Brand
defaultBrand: Brand = { brandId: -1, brandName: 'default' };
brandFilterText=""
dataLoaded=false

  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.getBrand()
  }

  getBrand(){
    this.brandService.getCategorys().subscribe(response=>{
      this.brands=response.data
      this.dataLoaded=true;
      
    })

  }
  setCurrentBrand(brand:Brand){
    this.currentBrand=brand;
    if(brand.brandId !=-1){
      this.defaultBrand.brandId=0;
    }

  }
  getCurrentBrandClass(brand:Brand){
    if(brand.brandId ==-1){
      return "list-group-item active"
    }
    if(brand==this.currentBrand){
      return "list-group-item active"
    }
    else{
      return "list-group-item  "
    }
  }

  getAllBrandClass(){
    if(!this.currentBrand){
      return "list-group-item "
    }
    else{
      return "list-group-item active"
    }
  }

}
