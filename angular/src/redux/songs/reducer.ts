import {AddSongAction, ADD_SONG} from './actions';
import { Action } from 'redux';
import { SongsState } from './datatypes'

const defaultState : SongsState = {
  'furi': {
    name: 'Furi 01',
    src: [
      './assets/furi01.mp3'
    ],
    loops: [
      {start: 7674, end: 11505, name: 'intro'},
      {start: 19444, end: 19458, name: 'silence'},
      {start: 19563, end: 27196, name: 'build up'},
      {start: 34818, end: 50085, name: 'battle'},
      {start: 57432, end: 61255, name: 'cooldown'}
    ],
    uuid: 'furi'
  }
}

export default function(state: SongsState = defaultState, action: Action): SongsState {
  if(action.type !== ADD_SONG)
    return state;
  
  let act:AddSongAction = action as AddSongAction;

  return {
    ...state,
    [act.song.uuid]: act.song
  }
}