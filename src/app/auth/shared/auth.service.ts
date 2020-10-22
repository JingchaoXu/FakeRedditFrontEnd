import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignupRequiredPayload} from '../sign-up/signup-required.payload';
import {Observable} from 'rxjs';
import {LoginRequestPayload} from '../login/login.request.payload';
import {LoginResponsePayload} from '../login/login.response.payload';
import {map, tap} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  };

  constructor(private httpClient: HttpClient,
              private localStorage: LocalStorageService) {}


  signup(signupRequestPayload: SignupRequiredPayload ): Observable<any>{
     return this.httpClient.post('http://localhost:8080/api/auth/signup', signupRequestPayload, {responseType: 'text'});
}

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
   return this.httpClient.post<LoginResponsePayload>('http://localhost:8080/api/auth/login',
      loginRequestPayload).pipe(map(data => {
      this.localStorage.store('authenticationToken', data.authenticationToken);
      this.localStorage.store('username', data.username);
      this.localStorage.store('refreshToken', data.refreshToken);
      this.localStorage.store('expiresAt', data.expiresAt);

      return true;
      }
      ));
  }

  // tslint:disable-next-line:typedef
  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  // tslint:disable-next-line:typedef
  refreshToken() {

    return this.httpClient.post<LoginResponsePayload>('http://localhost:8080/api/auth/refresh/token',
      this.refreshTokenPayload)
      .pipe(tap(response => {

        this.localStorage.store('authenticationToken',
          response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  // tslint:disable-next-line:typedef
  getUserName() {
    return this.localStorage.retrieve('username');
  }
  // tslint:disable-next-line:typedef
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }
}
