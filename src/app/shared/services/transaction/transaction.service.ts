import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateTransference } from 'src/app/Core/models/CreateTranserence';
import { Transaction } from 'src/app/Core/models/Transaction';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private url = environment.url + "/Transaction";

  constructor(private http: HttpClient) { }

  searchTransaction(accountId: string, categoryId: string, since: Date, until: Date): Observable<any> {
    return this.http.get<any>(`${this.url}/search?accountId=${accountId}&categoryId=${categoryId}&sinceDate=${since}&untilDate=${until}'`);
  }

  getTransactionByAccount(accountId: string): Observable<any> {
    return this.http.get<any>(`${this.url}/search?accountId=${accountId}`);
  }

  getTransactionBalance(since: Date, until: Date): Observable<any> {
    return this.http.get<any>(`${this.url}/balance/search?sinceDate=${since}&untilDate=${until}'`);
  }

  registrerTransaction(transaction: Transaction): Observable<any> {
    return this.http.post<any>(this.url, transaction);
  }

  registrerTransference(transference: CreateTransference): Observable<any> {
    return this.http.post<any>(this.url+"/transference", transference);
  }

  deleteTransaction(id: string): Observable<any> {
    const options = {
      body: {
        transactionId: id
      }
    };
    return this.http.delete<any>(this.url, options);
  }

  editTransaction
    (transactionId: String, 
    originAccountId: String, 
    categoryId: String, 
    date: Date, 
    amount: Number, 
    description: String, 
    type: Number): 
  Observable<any> {
    const options = {
      transactionId: transactionId,
      originAccountId: originAccountId,
      categoryId: categoryId,
      date: date,
      amount: amount,
      description: description,
      type: type
    };
    console.log(options)
    return this.http.put<any>(this.url, options);
  }
  editTransference
    (transactionId: String, 
    originAccountId: String, 
    destinationAccountId: String,  
    date: Date, 
    amount: Number): 
  Observable<any> {
    const options = {
      transactionId: transactionId,
      originAccountId: originAccountId,
      destinationAccountId: destinationAccountId,
      date: date,
      amount: amount,
      description:"Transference",
      type: null,
      categoryId:null,
    };
    console.log(options)
    return this.http.put<any>(this.url, options);
  }
}
