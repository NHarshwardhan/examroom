import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

const materialComponent = [
  MatDialogModule,MatSelectModule,MatFormFieldModule,MatInputModule
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    materialComponent
  ]
})
export class AngularMaterialModule { }
