import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignupRequiredPayload} from '../sign-up/signup-required.payload';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {}


  signup(signupRequestPayload: SignupRequiredPayload ): Observable<any>{
     return this.httpClient.post('http://localhost:8080/api/auth/signup', signupRequestPayload, {responseType: 'text'});
}


}
