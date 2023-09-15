import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablaPosicionesPage } from './tabla-posiciones.page';

const routes: Routes = [
  {
    path: '',
    component: TablaPosicionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablaPosicionesPageRoutingModule {}
