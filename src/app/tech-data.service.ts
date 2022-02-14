import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Technology, Change } from './technology';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TechDataService {

  baseURL: string = 'http://localhost:4566/'

  constructor(private http: HttpClient) { }

  public getAllByCategory(technology: string) :Observable<[Technology]> {
    return this.http.get<[Technology]>(this.baseURL+"getAllByCategory/"+technology);
  }

  public changeStatusById(id: number, newStatus: string){
    return this.http.post(this.baseURL+id, newStatus);
  }

  public addNewTechnology(newTechnology: object){
    return this.http.post(this.baseURL+"addTechnology", newTechnology);
  }

  public changeTechnologyById(id: number, name?: string, category?: string, description?: string){
    var obj = { 
      id: id, //scalar value 
      name: name,  
      category: category,  
      description: description,  
   };
    return this.http.post(this.baseURL+"changeTechnologyById", obj);
  }









}
