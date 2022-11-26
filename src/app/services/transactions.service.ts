import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  apiTransactionURL = environment.apiTransactionsURL;

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<any> {
    return this.http.get<any>(`${this.apiTransactionURL}/all`);
  }

  
  getTransactionsByemployee(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiTransactionURL}/id/${id}`);
  }

  getTxnTypes(): Observable<any> {
    return this.http.get<any>(`${this.apiTransactionURL}/types`);
  }

  addNewtransaction(newtxn: any): Observable<any> {
    return this.http.post<any>(`${this.apiTransactionURL}/add`, newtxn);
  }

  reconcileTransaction(transaction : any): Observable<any> {
    return this.http.put<any>(`${this.apiTransactionURL}/amend`, transaction);
  }

}

