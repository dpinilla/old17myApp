import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateDatosPage } from './create-datos.page';

const routes: Routes = [
  {
    path: '',
    component: CreateDatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateDatosPageRoutingModule {}
