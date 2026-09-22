import { Component, inject } from '@angular/core';
import { CovidService } from './services/covid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.html'
})
export class App {

  private covidService = inject(CovidService);

  datosCovid: any[] = [];
  cargando = true;

  constructor() {
    this.obtenerDatos();
  }

  obtenerDatos(): void {
    this.covidService.obtenerDatos().subscribe({
      next: (datos) => {
        this.datosCovid = datos;
        this.cargando = false;

        Swal.fire({
          title: 'Datos cargados',
          text: 'Los datos de COVID se obtuvieron correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      },

      error: (error) => {
        console.error(error);
        this.cargando = false;

        Swal.fire({
          title: 'Error',
          text: 'No se pudieron obtener los datos de COVID.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
}