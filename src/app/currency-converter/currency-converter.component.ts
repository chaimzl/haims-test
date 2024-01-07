import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { mergeMap, shareReplay, skip, startWith, tap } from 'rxjs';
import { CurrencyService } from '../services/currency.service';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss'
})
export class CurrencyConverterComponent {
  constructor(private _fb: FormBuilder, private _currencyService: CurrencyService, private _globalService: GlobalService) { }
  form = this._fb.nonNullable.group({ fromCurrenciesControl: 'USD', toCurrenciesControl: 'ILS', amountCurrenciesControl: 1 });
  calcResult$ = this.form.valueChanges.pipe(shareReplay(),startWith(this.form.value), mergeMap(formData => this._currencyService.getCalcResult$(formData.amountCurrenciesControl || 0, formData.fromCurrenciesControl || '', formData.toCurrenciesControl || '')), tap((data) =>  this._globalService.pushHistory(this.getHistoryString(data))))

  getHistoryString = (res: number) => {
    return `${new Date().toISOString()}: ${this.form.value.amountCurrenciesControl}  ${this.form.value.fromCurrenciesControl} = ${res} ${this.form.value.toCurrenciesControl} `
  }
}
