import { Component, Inject } from '@angular/core';
import * as Redux from 'redux';

import { AppStore } from 'redux/store';
import { AppState } from '../redux/reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(@Inject(AppStore) private store: Redux.Store<AppState>) {

  }
}
