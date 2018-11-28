import {
  Component,
  Inject,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import * as Redux from 'redux';

import { AppStore } from 'redux/store';
import {
  AppState
} from 'redux/reducer';

@Component({
  selector: 'redux-state',
  templateUrl: './redux-state.html',
  styleUrls: ['./redux-state.css']
})
export class ReduxStateComponent {
  stateString: String
  showState: Boolean
  update: Boolean

  constructor(@Inject(AppStore) private store: Redux.Store<AppState>,
              private el: ElementRef, private ref: ChangeDetectorRef) {
    store.subscribe(() => this.updateState() );
    this.updateState();

    this.showState = false
    this.update = false
  }

  toggleState() {
    this.showState = !this.showState
  }

  updateState() {
    const state = this.store.getState();
    this.stateString = JSON.stringify(state, null, 2);

    if(this.update)
      this.ref.detectChanges()
  }

  ngAfterViewInit(){
    this.update = true;
  }
}
