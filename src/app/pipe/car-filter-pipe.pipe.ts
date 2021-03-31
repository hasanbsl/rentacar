import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'carFilterPipe'
})
export class CarFilterPipePipe implements PipeTransform {

  transform(value: Car[], carFilterText:string): Car[] {
   carFilterText=carFilterText?carFilterText.toLocaleLowerCase():""
   return carFilterText?value.filter((c:Car)=>c.brandName.toLocaleLowerCase().indexOf(carFilterText)!==-1):value;
  }

}
