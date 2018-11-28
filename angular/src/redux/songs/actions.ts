import {Action,ActionCreator} from 'redux';
import {Song} from './datatypes';

// Add user
export const ADD_SONG = '[Song] Add';

export interface AddSongAction extends Action {
  song: Song;
}

export const addSong: ActionCreator<AddSongAction> =
  (song: Song) => ({
    type: ADD_SONG,
    song: song
  });
