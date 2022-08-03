import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosPage } from './datos.page';

const routes: Routes = [
  {
    path: '',
    component: DatosPage
  },
   {
    path: 'create-datos',
    loadChildren: () => import('./create-datos/create-datos.module').then( m => m.CreateDatosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosPageRoutingModule {}
