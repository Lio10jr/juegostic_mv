import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampeonatosService } from 'src/app/api/campeonatos.service';
import { TablaService } from 'src/app/api/tabla.service';

@Component({
  selector: 'app-tabla-posiciones',
  templateUrl: './tabla-posiciones.page.html',
  styleUrls: ['./tabla-posiciones.page.scss'],
})
export class TablaPosicionesPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  numGrupos: number = 3;
  isResultLoaded = false;
  idCampeonatoActivo = '';
  campeonatoSelect: any; 
  opcionSeleccionadaCamp = '';
  CampeonatoArray: any[] = [];
  CampeonatoArrayFiltrado: any[] = [];
  TablaPArray: any[] = [];
  TablaPFiltrados: any[] = [];

  constructor(
    private tsC: CampeonatosService,
    private tsTP: TablaService,
  ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.tsC.getAllCampeonato().subscribe((resultData: any) => {
      this.isResultLoaded = true;
      if (resultData && resultData.length > 0) {
        let arrayResult: any[] = resultData;
        this.CampeonatoArray = arrayResult;
        const campeonatoActivo = arrayResult.filter(campeonato => campeonato.estado === true);
        if (campeonatoActivo && campeonatoActivo.length > 0) {
          this.campeonatoSelect = campeonatoActivo[0];
          this.CampeonatoArrayFiltrado = campeonatoActivo;
          const campeonatoActivoId = campeonatoActivo[0].pk_idcamp;
          this.idCampeonatoActivo = campeonatoActivoId;
          this.cargarDatos(campeonatoActivoId);
        }
      } 
    });
  }

  cargarDatos(campeonatoActivoId: any) {
    this.tsTP.getPosicionesByCampView(campeonatoActivoId).subscribe((resultData: any) => {
      this.isResultLoaded = true;
      if (resultData && resultData.length > 0) {
        this.TablaPArray = resultData.sort(this.criterioDeOrden);
        let tabla: any[] = resultData.sort(this.criterioDeOrden);
    
        tabla.forEach((elemento) => {
          const numgrupo = elemento.numgrupo;
          if (!this.TablaPFiltrados[numgrupo]) {
            this.TablaPFiltrados[numgrupo] = [];
          }
          this.TablaPFiltrados[numgrupo].push(elemento);
        });
      } else {
        // Si resultData es vacío, inicializa los arrays como vacíos
        this.TablaPArray = [];
        this.TablaPFiltrados = [];
      }
    });
  }

  criterioDeOrden(equipoA: any, equipoB: any): number {
    if (equipoA.pts !== equipoB.pts) {
      return equipoB.pts - equipoA.pts;
    }
    if (equipoA.gd !== equipoB.gd) {
      return equipoB.gd - equipoA.gd;
    }
    return equipoB.pg - equipoA.pg;
  }

  onSelectCampeonato(event: any) {
    this.opcionSeleccionadaCamp = event.target.value;

    if (this.opcionSeleccionadaCamp != '') {
      this.isResultLoaded = true;
      const camp = this.CampeonatoArray.filter((campeonato => campeonato.pk_idcamp === this.opcionSeleccionadaCamp));
      this.TablaPArray = [];
      this.TablaPFiltrados = [];
      this.idCampeonatoActivo = camp[0].pk_idcamp;
      this.campeonatoSelect = camp[0];
      this.cargarDatos(camp[0].pk_idcamp);
    } else {
      this.TablaPArray = [];
      this.TablaPFiltrados = [];
    }
  }
}
