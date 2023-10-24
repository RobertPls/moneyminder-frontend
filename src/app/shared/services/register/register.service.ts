import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private url = environment.url;

  constructor(private http: HttpClient) { }

  register(username: string, firstName: string, lastName: string, password: string, email: string): Observable<any> {
    const body = { userName: username, firstName: firstName, lastName: lastName, password: password, email: email };
    return this.http.post<any>(`${this.url}/Security/register`, body);
  }
}
