import { Component } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
constructor(public _globalService:GlobalService){}
historyList$=this._globalService.getHistory$()

}
