import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateDatosPageRoutingModule } from './create-datos-routing.module';

import { CreateDatosPage } from './create-datos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CreateDatosPageRoutingModule
  ],
  declarations: [CreateDatosPage]
})
export class CreateDatosPageModule {}
