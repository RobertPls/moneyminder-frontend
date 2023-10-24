import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/app/Core/models/Account';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private url = environment.url + "/Account";

  constructor(private http: HttpClient) { }

  registerAccount(account: Account): Observable<any> {
    return this.http.post<any>(this.url, account);
  }

  getAccounts(): Observable<any> {
    return this.http.get<any>(this.url+'/search');
  }

  deleteAccount(id: string): Observable<any> {
    const options = {
      body: {
        accountId: id
      }
    };
    return this.http.delete<any>(this.url, options);
  }

  editAccount(id: String, name: String, description: String): Observable<any> {
    const options = {
      accountId: id,
      name:name,
      description: description
    };
    return this.http.put<any>(this.url, options);
  }
}
