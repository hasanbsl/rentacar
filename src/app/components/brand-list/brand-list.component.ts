import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  constructor(private brandService: BrandService) { }

  ngOnInit(): void {
    this.getBrands();
  }
  brands : Brand[]
  getBrands(){
    this.brandService.getCategorys().subscribe(response => {
    this.brands = response.data;
  })
}

}
