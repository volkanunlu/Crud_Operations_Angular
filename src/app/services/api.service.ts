import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postObjective(data:any){
    return this.http.post<any>("http://localhost:3000/objectiveList/",data);

  }
  getObjectives(){
    return this.http.get<any>("http://localhost:3000/objectiveList/");

  }
  
  putObjectives(data:any, id:number){

    return this.http.put<any>("http://localhost:3000/objectiveList/"+id,data);


  }

  deleteObjectives(id:number){
    return this.http.delete<any>("http://localhost:3000/objectiveList/"+id);
  }

}
