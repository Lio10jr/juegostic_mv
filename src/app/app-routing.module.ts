import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages/home/Inicio',
    pathMatch: 'full'
  },
  {
    path: 'pages/encuentros/:id',
    loadChildren: () => import('./pages/encuentros/encuentros.module').then( m => m.EncuentrosPageModule)
  },
  {
    path: 'pages/resultados/:id',
    loadChildren: () => import('./pages/resultados/resultados.module').then( m => m.ResultadosPageModule)
  },
  {
    path: 'pages/tabla-posiciones/:id',
    loadChildren: () => import('./pages/tabla-posiciones/tabla-posiciones.module').then( m => m.TablaPosicionesPageModule)
  },
  {
    path: 'pages/home/:id',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'pages/equipos/:id',
    loadChildren: () => import('./pages/equipos/equipos.module').then( m => m.EquiposPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
