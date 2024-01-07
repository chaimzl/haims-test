import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private _history = new BehaviorSubject<string[]>([]);
  private _historyObs= this._history.asObservable();
  private _historyQueue: string[]=[]
  
  getHistory$():Observable<string[]> {
    return this._historyObs;
  }
  public pushHistory(value: string) {
    this._historyQueue.push(value);
    this._history.next(this._historyQueue);
  }

  constructor() { }
}
