import { Routes } from '@angular/router';
import {JuguetesList} from './components/web/juguetes/juguetes-list/juguetes-list';
import {JuguetesDetail} from './components/web/juguetes/juguetes-detail/juguetes-detail';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'juguetes/list',
    pathMatch: 'full'

  },
  {
    path: 'juguetes/list',
    component: JuguetesList
  },
 {
    path: 'juguetes/edit/:id',
    component: JuguetesDetail
  },
  {
    path: 'juguetes/add',
    component: JuguetesDetail
  },
  {
    path: '**',
    redirectTo: 'juguetes/list',
    pathMatch: 'full'

  }

];
