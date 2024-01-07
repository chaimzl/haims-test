import { Component, forwardRef, Input } from '@angular/core';
import {  FormControl } from '@angular/forms';
import { map, mergeMap, startWith } from 'rxjs';
import { CurrencyService } from '../../services/currency.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'currency-picker',
  templateUrl: './currency-picker.component.html',
  styleUrl: './currency-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyPickerComponent),
      multi: true
    }
  ]
})
export class CurrencyPickerComponent implements ControlValueAccessor {
  constructor( private _currencyService:CurrencyService) {}
  @Input({ required: true }) label!: string;
  public onChange = (_: any) => { };
  writeValue(value: string): void {
    this.currenciesControl.setValue(value );
  }
  registerOnChange(fn: any): void {
    this.onChange = fn; 
  }
  registerOnTouched(fn: any): void {
      //todo
  }
  setDisabledState?(isDisabled: boolean): void {
      //todo
  }
  filterObs$=(source:string[])=> {
    return this.currenciesControl.valueChanges.pipe(
      startWith(''),
      map(value => source.filter(option =>  (!value)|| option.toLowerCase().includes(value))),
    )
  }
  currenciesControl = new FormControl('');
  allCurrencies$=this._currencyService.getAllCurrencies$().pipe(mergeMap(source=> this.filterObs$(source)))
   
  onSelected=(value:string)=>{
    this.onChange(value);
 }

 
 
}
