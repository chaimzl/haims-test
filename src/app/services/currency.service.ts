import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, share, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  _apiUrl = 'https://v6.exchangerate-api.com/v6/6bd28d7449807f8add1cfc58';
  _allCurrenciesObs$=this.http.get<any[]>(`${this._apiUrl}/latest/ILS`).pipe(shareReplay())

  constructor(private http: HttpClient) { }


  getAllCurrencies$(): Observable<string[]> {
    return this._allCurrenciesObs$.pipe(map((x:any)=> Object.keys( x.conversion_rates)));
  }

  getCalcResult$(amount:number, fromCurrency:string, toCurrency:string): Observable<number> {
    return this.http.get<any[]>(`${this._apiUrl}/latest/${fromCurrency}`).pipe(map((data:any)=> data.conversion_rates[toCurrency]*amount))
  }
}
