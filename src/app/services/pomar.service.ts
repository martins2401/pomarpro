import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class pomarService {

  constructor(private http:HttpClient) { }


  public addPomar(info:any):Observable<any>{
return this.http.post('http://localhost:3000/pomar/add',
  {info},
  {observe:'response'}
) 

  }

  //Função de busca de usúarios
public getPomar():Observable<any>{
  return this.http.get('http://localhost:3000/pomar/buscaTodos',
    {observe:'response'})
  
}




}
