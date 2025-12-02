import {Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DataService} from '../../../../services/data-service';
import {CurrencyPipe} from '@angular/common';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faEdit, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {FormValidators} from '../../../../../../../api-cosmeticos/src/validators/FormValidators';
import {NgbToast} from '@ng-bootstrap/ng-bootstrap';
import {Toast} from '../../../../common/interfaces';

@Component({
  selector: 'app-juguetes-detail',
  imports: [
    CurrencyPipe,
    FaIconComponent,
    ReactiveFormsModule,
    NgbToast
  ],
  templateUrl: './juguetes-detail.html',
  styleUrl: './juguetes-detail.css',
})
export class JuguetesDetail implements OnInit {
@Input('id') idJuguete !:string;
private readonly  dataService: DataService= inject(DataService);
private readonly  formBuilder: FormBuilder =inject(FormBuilder);
formJuguete: FormGroup= this.formBuilder.group({
  _id:[''],
  nombre:['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), FormValidators.notOnlyWhiteSpace, FormValidators.forbiddenWord('sex')]],
  imagen:['', [Validators.required, Validators.minLength(7)]],
  categoria:['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
  edadMinima:[0, [Validators.required, Validators.min(0), Validators.max(55)]],
  precio:[0, [Validators.required, Validators.min(0)]],
});
//Aqui los getters para rellenar o editar en nuestro objeto formulario de nuestro objeto
 loaded = false;
  private router: Router = inject(Router);
get _id():any{
  return this.formJuguete.get('_id')
}
get nombre():any{
  return this.formJuguete.get('nombre')
}
get imagen():any{
  return this.formJuguete.get('imagen')
}
get categoria():any{
  return this.formJuguete.get('categoria')
}
get edadMinima():any{
  return this.formJuguete.get('edadMinima')
}
get precio():any{
  return this.formJuguete.get('precio')
}

show = false;
toast: Toast ={text:'', className:'' }



ngOnInit(){
  this.loadJuguete();

}

  private loadJuguete() {

    if (this.idJuguete) {
      //Editando el juguete
      this.dataService.getOneJuguete(this.idJuguete).subscribe(
        {
          next: data => {
            this.formJuguete.setValue(data);
            console.log(this.formJuguete);
            this.loaded = true;
            this.toast.text = 'Cosmético: '+ data.nombre+' cargado';
            this.toast.className= 'bg-success text-light';
            this.show = true;
          },
          error: err => {
            console.log(err)
          }

        })
    } else {
      //Creanod el juguete
      this.formJuguete.reset();
      this.loaded = true;

    }
  }

  protected readonly faTrashCan = faTrashCan;
  protected readonly faEdit = faEdit;
  protected readonly onsubmit = onsubmit;

  onSubmit() {
    if(this.formJuguete.invalid) {
      this.formJuguete.markAllAsTouched();
      return;
    }
    if(this.idJuguete) {
      //PUT
      this.dataService.putJuguete(this.formJuguete.value).subscribe(
        {
          next: data => {
              alert(data.message);

              this.toast.text = data.message;
              this.toast.className= 'bg-success text-light';
              this.show = true;

            setTimeout(() =>{
              this.show = false;
              this.router.navigateByUrl('/juguetes/list');
            },1000)

          },
          error: err => {
            console.log(err)
          }
        }
      )

    }else{
      //POST
      this.dataService.postJuguete(this.formJuguete.value).subscribe(
        {
          next: data => {

              alert(data.message);

              this.toast.text = data.message;
              this.toast.className= 'bg-success text-light';
              this.show = true;
            setTimeout(() =>{
              this.show = false;
              this.router.navigateByUrl('/juguetes/list');
            },1000)
          },
          error: err => {
            console.log(err)
          }
        }
      )

    }
  }
}
