import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampeonatosService } from 'src/app/api/campeonatos.service';
import { EquiposService } from 'src/app/api/equipos.service';
import { environment } from 'src/app/environment/environment';
import { AlertController } from '@ionic/angular';
import { PlayersService } from 'src/app/api/players.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.page.html',
  styleUrls: ['./equipos.page.scss'],
})
export class EquiposPage implements OnInit {
  protected apiUrlImg: string = environment.apiUrlImg;

  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  EquipoArray: any[] = [];
  EquiposFiltrados: any[] = [];
  CampeonatoArray: any[] = [];
  CampeonatoArrayFiltrado: any[] = [];
  isResultLoaded = false;
  idCampeonatoActivo = '';
  campeonatoSelect: any; 
  opcionSeleccionadaCamp = '';
  alertInputs: any[] = [];
  constructor( 
    private tsE: EquiposService, 
    private tsC: CampeonatosService,
    private tsP: PlayersService,
    private alertController: AlertController
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
    this.tsE.getEquipoCampeonato(campeonatoActivoId).subscribe((resultData: any) => {
      this.isResultLoaded = true;
      if (resultData && resultData.length > 0) {
        this.EquipoArray = resultData;
        this.EquiposFiltrados = resultData;
      } else {
        this.EquipoArray = [];
        this.EquiposFiltrados = [];
      }
    });
    this.isResultLoaded = false;
  }

  onSelectCampeonato(event: any) {
    this.opcionSeleccionadaCamp = event.target.value;

    if (this.opcionSeleccionadaCamp != '') {
      this.isResultLoaded = true;
      const camp = this.CampeonatoArray.filter((campeonato => campeonato.pk_idcamp === this.opcionSeleccionadaCamp));
      this.idCampeonatoActivo = camp[0].pk_idcamp;
      this.campeonatoSelect = camp[0];
      this.cargarDatos(camp[0].pk_idcamp);
    } else {
      this.EquiposFiltrados = [];
      this.EquipoArray = [];
    }
  }

  async verJugadores(name_equipo: string, id_equipo: any) {
    this.tsP.getAllPlayersEquipo(id_equipo).subscribe(async (result: any) => {
      if (result && result.length > 0) {
        const array: any[] = result;
        this.alertInputs = [];
        array.forEach( player => {
          const dato = {
            label: player.nombre + ' ' + player.apellido,
            type: 'radio',
            value: player.pk_ced,
            disabled: 'true'
          }
          this.alertInputs.push(dato);
        });
        const alert = await this.alertController.create({
          header: 'Lista de Jugadores de ' + name_equipo,
          inputs: this.alertInputs,
          buttons: ['OK'],
        });
    
        await alert.present();
      } else {
        this.alertInputs = [];
      }
    })
  }
}
