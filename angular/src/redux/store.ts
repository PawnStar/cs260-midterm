import { InjectionToken } from '@angular/core';
import {
  createStore,
  Store,
  compose,
  StoreEnhancer
} from 'redux';

import {
  AppState,
  default as reducer
} from './reducer';

import musicController from './musicController'

export const AppStore = new InjectionToken('App.store');

const devtools: StoreEnhancer<AppState> =
  window['devToolsExtension'] ?
  window['devToolsExtension']() : f => f;

let store: Store<AppState> = null;

export function createAppStore(): Store<AppState> {
  if(!store){
    store = createStore<AppState>(
      reducer,
      compose(devtools)
    );

    store.subscribe(()=>{
      musicController.reduxUpdate(store)
    })
  }

  return store;
}

export const appStoreProviders = [
   { provide: AppStore, useFactory: createAppStore }
];