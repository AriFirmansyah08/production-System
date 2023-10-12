import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbnormalitasRoutingModule } from './abnormalitas-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import lottie from 'lottie-web';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AddComponent } from './add/add.component';
import { DetailComponent } from './detail/detail.component';
import { NgbDropdownModule, NgbModal, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { SimplebarAngularModule } from 'simplebar-angular';
import { defineElement } from 'lord-icon-element';


// Ng Search 
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ViewComponent } from './view/view.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { ProductionModule } from '../production.module';




@NgModule({
  declarations: [
    AddComponent,
    DetailComponent,
    ViewComponent,
    
  ],
  imports: [
    CommonModule,
    AbnormalitasRoutingModule,
    SharedModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    HttpClientModule,
    FlatpickrModule,
    SharedModule,
    SimplebarAngularModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    DropzoneModule,
    ProductionModule,
    
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AbnormalitasModule {
  constructor() {
    defineElement(lottie.loadAnimation);
    
  }
}
