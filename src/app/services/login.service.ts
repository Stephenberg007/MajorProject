import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../dto/login';
import { AppConstants } from '../../app.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private httpClient: HttpClient) { }

  loginUser(login : Login) :Observable<any>{
    return this.httpClient.post<Login>(AppConstants.LOGIN_ENDPOINT,login)
  }
}


