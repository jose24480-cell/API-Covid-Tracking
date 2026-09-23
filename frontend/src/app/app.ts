import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CovidService } from './services/covid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.html'
})
export class App {

  // Servicio para obtener los datos de COVID
  private covidService = inject(CovidService);

  // Permite actualizar la vista de Angular
  private cdr = inject(ChangeDetectorRef);

  // Aquí se guardan los datos recibidos de la API
  datosCovid: any[] = [];

  // Indica si los datos todavía se están cargando
  cargando = true;

  // Constructor
  constructor() {
    this.obtenerDatos();
  }

  // Método para obtener los datos de COVID
  obtenerDatos(): void {

    this.covidService.obtenerDatos().subscribe({

      // Se ejecuta cuando la API responde correctamente
      next: (datos) => {

        console.log('Datos recibidos:', datos);

        // Guardamos los datos recibidos
        this.datosCovid = datos;

        // Terminó la carga
        this.cargando = false;

        // Actualizamos la vista de Angular
        this.cdr.detectChanges();

        console.log('Cargando:', this.cargando);
        console.log('Cantidad de datos:', this.datosCovid.length);

        // Mensaje de éxito
        Swal.fire({
          title: 'Datos cargados',
          text: 'Los datos de COVID se obtuvieron correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      },

      // Se ejecuta si ocurre un error
      error: (error) => {

        console.error('Error:', error);

        // Terminó la carga aunque haya ocurrido un error
        this.cargando = false;

        // Actualizamos la vista
        this.cdr.detectChanges();

        // Mensaje de error
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