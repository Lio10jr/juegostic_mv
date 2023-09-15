import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablaPosicionesPageRoutingModule } from './tabla-posiciones-routing.module';

import { TablaPosicionesPage } from './tabla-posiciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablaPosicionesPageRoutingModule
  ],
  declarations: [TablaPosicionesPage]
})
export class TablaPosicionesPageModule {}
