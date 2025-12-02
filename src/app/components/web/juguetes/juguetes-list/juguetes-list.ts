import {Component, inject, OnInit} from '@angular/core';
import {DataService} from '../../../../services/data-service';
import {CurrencyPipe} from '@angular/common';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {ApiResponseJuguetesByPage, Juguete} from '../../../../common/interfaces';
import {faEdit, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-juguetes-list',
  imports: [
    CurrencyPipe,
    FaIconComponent,
    NgbPagination,
    RouterLink
  ],
  templateUrl: './juguetes-list.html',
  styleUrl: './juguetes-list.css',
})
export class JuguetesList implements OnInit {
  private readonly dataService: DataService= inject(DataService);
  jugueteList: Juguete[]=[];
  //obtenemos información de la paginación
  apiData !: ApiResponseJuguetesByPage;
  // esto es para el paginado
  currentPage = 1;
  loaded = false;

  ngOnInit(){
    this.loadJuguetes();
  }

  private loadJuguetes() {
    this.dataService.getJuguetesByPage(this.currentPage).subscribe((
      {
        next: data => {
          this.jugueteList = data.juguetes.juguetes;
          this.apiData=data;
          this.loaded = true;
        },
        error: error => {
          console.error(error);
        }

      }))
  }
  deleteJuguete(juguete: Juguete){
    if (confirm('Deseja eliminar'+ juguete.nombre +'?')) {
      //el data service es el encargado de hacer las funciones que hemos creado ahi
      this.dataService.deleteJuguete(juguete._id).subscribe(({
        next: data => {
          alert(data.message);
          this.loadJuguetes();
        },
        error: error => {
          console.error(error);
        }
      }))

    }

  }

  protected readonly faTrashCan = faTrashCan;
  protected readonly faEdit = faEdit;

  changePage(event: number) {
    this.currentPage = event;
    this.loadJuguetes();

  }
}
