import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AUTH_CONFIG, AuthConfig} from './configure';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _signedIn: boolean;
  private _idToken: string;
  private _displayName: string;
  private _email: string;
  signedIn$: BehaviorSubject<boolean>;
  idToken$: BehaviorSubject<string>;
  displayName$: BehaviorSubject<string>;
  email$: BehaviorSubject<string>;
  
  constructor(
    private router: Router,
    @Inject(AUTH_CONFIG) private config: AuthConfig
  ) {
    this._idToken = this.loadTokenFromLocalStorage();
    if (this._idToken == null || this._idToken === '') {
      this._signedIn = false;
    } else {
      this._signedIn = true;
    }
    this.idToken$ = new BehaviorSubject<string>(this._idToken);
    this.signedIn$ = new BehaviorSubject<boolean>(this._signedIn);
    this.displayName$ = new BehaviorSubject<string>(this._displayName);
    this.email$ = new BehaviorSubject<string>(this._email);
    
    this.idToken$.subscribe(token => {
      this.saveTokenToLocalStorage(token);
      if (token == null || token === '') {
        this._signedIn = false;
        this._displayName = null;
      } else {
        this.decodeToken(token);
      }
      this.signedIn$.next(this._signedIn);
      this.displayName$.next(this._displayName);
      this.email$.next(this._email);
    });
  }
  
  signOut() {
    this._idToken = '';
    this.idToken$.next(this._idToken);
  }
  
  signIn() {
    // tslint:disable-next-line:max-line-length
    window.location.href = 'https://' +
      this.config.endpointName + '/login?' +
      'response_type=token&' +
      'client_id=' + this.config.clientId + '&' +
      'redirect_uri=' + this.config.redirectUri + '&' +
      'scope=openid+email';
  }
  
  parseToken(hashData) {
    if (hashData.length > 0) {
      const hashs = hashData.split('&');
      const vars = {
        id_token: ''
      };
      for (const hash of hashs) {
        const array = hash.split('=');
        vars[array[0]] = array[1];
      }
      if (vars.id_token !== '') {
        this._idToken = vars.id_token;
        this.idToken$.next(this._idToken);
        this._signedIn = true;
        this.signedIn$.next(this._signedIn);
        this.decodeToken(this._idToken);
        this.router.navigate(['/']);
      }
    }
  }
  
  decodeToken(token) {
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(token);
    window.console.log(decoded);
    this._email = decoded.email;
    window.console.log(this._email);
    this._displayName = decoded['cognito:username'];
    window.console.log(this._displayName);
  }
  
  saveTokenToLocalStorage(token: string) {
    localStorage.setItem('idToken', token);
  }
  
  loadTokenFromLocalStorage(): string {
    if (localStorage.getItem('idToken')) {
      const token = localStorage.getItem('idToken');
      return token;
    } else {
      return '';
    }
  }
  
  get isSignedIn(): Observable<boolean> {
    return this.signedIn$.asObservable();
  }
  
  get displayName(): Observable<string> {
    return this.displayName$.asObservable();
  }
  
  get email(): Observable<string> {
    return this.email$.asObservable();
  }
  
  getToken(): string {
    return this._idToken;
  }
}
