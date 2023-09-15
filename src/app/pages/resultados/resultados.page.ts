import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampeonatosService } from 'src/app/api/campeonatos.service';
import { EncuentrosService } from 'src/app/api/encuentros.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  isResultLoaded = false;
  idCampeonatoActivo = '';
  campeonatoSelect: any; 
  opcionSeleccionadaCamp = '';
  CampeonatoArray: any[] = [];
  CampeonatoArrayFiltrado: any[] = [];
  EncuentrosArray: any[] = [];
  EncuentrosArrayFiltro: any[] = [];
  constructor(
    private tsC: CampeonatosService,
    private tsE: EncuentrosService
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
          this.cargarDatos(campeonatoActivo[0]);
        }
      } 
    });
  }

  cargarDatos(campeonatoActivo: any) {
    this.tsE.getAllViewEncuentrosByCamp(campeonatoActivo.name_camp).subscribe((resultData: any) => {
      this.isResultLoaded = true;
      const result: any[] = resultData;
      if (result.length === 0) {
        this.EncuentrosArray = [];
        this.EncuentrosArrayFiltro = [];
      } else {
        result.forEach(encuentro => {
          const fase = encuentro.nombre_fase;
          if (fase === "Fase de Grupos") {
            if (!this.EncuentrosArray[1]) {
              this.EncuentrosArray[1] = [];
            }
            this.EncuentrosArray[1].push(encuentro);
          } else if (fase === "Octavos de Final") {
            if (!this.EncuentrosArray[2]) {
              this.EncuentrosArray[2] = [];
            }
            this.EncuentrosArray[2].push(encuentro);
          } else if (fase === "Cuartos de Final") {
            if (!this.EncuentrosArray[3]) {
              this.EncuentrosArray[3] = [];
            }
            this.EncuentrosArray[3].push(encuentro);
          } else if (fase === "SemiFinal") {
            if (!this.EncuentrosArray[4]) {
              this.EncuentrosArray[4] = [];
            }
            this.EncuentrosArray[4].push(encuentro);
          } else if (fase === "Final") {
            if (!this.EncuentrosArray[5]) {
              this.EncuentrosArray[5] = [];
            }
            this.EncuentrosArray[5].push(encuentro);
          }
        });
        this.EncuentrosArrayFiltro = this.EncuentrosArray;
      }
    });
  }

  onSelectCampeonato(event: any) {
    this.opcionSeleccionadaCamp = event.target.value;

    if (this.opcionSeleccionadaCamp != '') {
      this.isResultLoaded = true;
      const camp = this.CampeonatoArray.filter((campeonato => campeonato.pk_idcamp === this.opcionSeleccionadaCamp));
      this.EncuentrosArray = [];
      this.EncuentrosArrayFiltro = [];
      this.idCampeonatoActivo = camp[0].pk_idcamp;
      this.campeonatoSelect = camp[0];
      this.cargarDatos(camp[0]);
    } else {
      this.EncuentrosArray = [];
      this.EncuentrosArrayFiltro = [];
    }
  }
}