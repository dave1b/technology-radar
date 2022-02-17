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

  public getAllUnpublished() :Observable<[Technology]> {
    return this.http.get<[Technology]>(this.baseURL+"getAllUnpublished/");
  }
  
  public getByName(name: string) :Observable<Technology> {
    return this.http.get<Technology>(this.baseURL+"getByName/"+name);
  }

  public changeStatusById(id: number, newStatus: string){
    return this.http.post(this.baseURL+id, newStatus);
  }

  public addNewTechnology(newTechnology: Technology) {
    return this.http.post(this.baseURL+'addNewTechnology', newTechnology);
  }
  
  public editTechnology(edittedTechnology: Technology){
    this.http.post(this.baseURL+'editTechnology', edittedTechnology).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

}