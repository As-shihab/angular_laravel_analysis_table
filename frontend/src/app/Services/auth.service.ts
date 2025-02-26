import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lodata_url , api } from '../environments/globalurl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
Signup : any = {
  name:"",
  email:"",
  password:""
}
  constructor(private http:HttpClient) { }
  api = api;
  post(path : string , data: any ){
    return this.http.post( api+path , data);
  }


  Create_Customer(customer : any){
   return this.http.post(lodata_url + "Customars" , customer);
  }

  Get_Customars(){
    return this.http.get(lodata_url+"Customars"+"?orderby=created_at desc");
  }

  Delete_Customer(id: any){
    return this.http.delete(lodata_url+ "Customars/"+ id);
  }

IsAuthenticated(): boolean{
  const token = localStorage.getItem('user-token');
  return  token !==null
}


}
