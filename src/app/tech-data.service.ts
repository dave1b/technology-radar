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

  public getAllPublishedByCategory(technology: string) :Observable<[Technology]> {
    return this.http.get<[Technology]>(this.baseURL+"getAllPublishedByCategory/"+technology);
  }
  
  public getByName(name: string) :Observable<Technology> {
    console.log("in get by name");
    return this.http.get<Technology>(this.baseURL+"getByName/"+name);
  }

  public changeStatusById(id: number, newStatus: string){
    return this.http.post(this.baseURL+id, newStatus);
  }

  public addNewTechnology(newTechnology: Technology) {
    this.http.post(this.baseURL+'addNewTechnology', newTechnology).subscribe(data => {
      console.log(data);
    })
  }

  public changeTechnologyByName( name?: string, category?: string, description?: string){
    var obj = { 
      name: name,  
      category: category,  
      description: description,  
   };
    return this.http.post(this.baseURL+"changeTechnologyById", obj);
  }









}
