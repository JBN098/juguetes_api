import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponseDeleteJuguete, ApiResponseJuguetesByPage, Juguete} from '../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly  http: HttpClient=inject(HttpClient);
  private readonly urlBase='https://api-juguetes.vercel.app/api/v2/juguete/'

  getJuguetesByPage(page: number): Observable<ApiResponseJuguetesByPage>{
    return this.http.get<ApiResponseJuguetesByPage>(this.urlBase + 'juguetes?page=' + page);
  }
  getOneJuguete(id: string): Observable<Juguete>{
    return this.http.get<Juguete>(this.urlBase + 'juguete/' + id);
  }
  postJuguete(juguete: Juguete): Observable<any>{
    return this.http.post<any>(this.urlBase + 'juguetes', juguete);
  }
  putJuguete(juguete: Juguete): Observable<any>{
    return this.http.patch<any>(this.urlBase + 'update/'+ juguete._id, juguete);
  }
  deleteJuguete(id: string): Observable<ApiResponseDeleteJuguete>{
    return this.http.delete<ApiResponseDeleteJuguete>(this.urlBase + 'delete/' + id);
  }

}
