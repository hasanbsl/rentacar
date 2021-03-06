import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit {

  constructor(private colorService:ColorService) { }
  colors:Color[]
    ngOnInit(): void {
      this.getColors();
    }
  
    getColors(){
      this.colorService.getColor().subscribe(response=>{
        this.colors=response.data;
      })
    }
}
