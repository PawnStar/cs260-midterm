/* tslint:disable:typedef */

import { Reducer, combineReducers } from 'redux';

import { SongsState } from './songs/datatypes'
import SongsReducer from './songs/reducer';

import { PlayerState } from './player/datatypes';
import PlayerReducer from './player/reducer';

 
 export interface AppState {
  songs: SongsState,
  player: PlayerState
 }
 
 const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  songs: SongsReducer,
  player: PlayerReducer
 });
 
 export default rootReducer;
 