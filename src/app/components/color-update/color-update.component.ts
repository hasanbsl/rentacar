import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  colorUpdateForm: FormGroup;
  color:Color;
  dataLoaded=false;

  constructor(
    private formBuilder:FormBuilder,
    private colorService:ColorService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId']) {
        this.getColor(params['colorId']);
        this.createColorUpdateForm();
      }
    });
  }
  createColorUpdateForm(){

    this.colorUpdateForm = this.formBuilder.group({
      colorName : ["", Validators.required]
    });

  }
  getColor(colorId:number){
    this.colorService.getByColorId(colorId).subscribe(response=>{
      this.color=response.data
     this.dataLoaded=true
    })
  }

  updateColor(){

    if(this.colorUpdateForm.valid){

      let colorModel = Object.assign({colorId:this.color.colorId}, this.colorUpdateForm.value);
      this.colorService.updateColor(colorModel)
        .subscribe((response) => {
          this.toastrService.success(response.message, "Başarılı!")
        }, responseError => {

          if(responseError.error.Errors.length > 0){

            for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
              
              this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Hata!");
              
            }
          }

        })
    }
    else{
      this.toastrService.error("Lütfen ilgili yerleri doldurunuz.", "Hata!");
    }

  }


}
