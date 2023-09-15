import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/pages/home/Inicio', icon: 'home' },
    { title: 'Equipos', url: '/pages/equipos/Equipos', icon: 'shield' },
    { title: 'Tabla posiciones', url: '/pages/tabla-posiciones/Tabla Posiciones', icon: 'football' },
    { title: 'Resultados', url: '/pages/resultados/Resultados', icon: 'reader' },
    { title: 'Encuentros', url: '/pages/encuentros/Encuentros', icon: 'calendar' },
  ];
  constructor() {}
}
