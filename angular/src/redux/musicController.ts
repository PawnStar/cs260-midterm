import { Store } from 'redux';
import { AppState } from './reducer';

import { Song } from './songs/datatypes'
import { PlayState } from './player/datatypes'
import { Loop } from './songs/datatypes'
import {Howl, Howler} from 'howler';
import * as playerActions from './player/actions'

let song : Howl;
let currentLoop: Loop;
let currentDuration: number;
let currentPosition: number;
let userPosition: number;
let cache : Store<AppState>;

interface MusicController {
  reduxUpdate: (store: Store<AppState>)=>void,
  checkDuration: ()=>void
}

let controller: MusicController = {
  reduxUpdate: (store: Store<AppState>)=>{
    const state = store.getState();
    const currentSong = state.songs[state.player.currentSong];

    // Preload
    if(state.player.currentSong && !song){
      console.log('loading')
      song = new Howl({
        src: currentSong.src
      })

      song.once('load', ()=>{
        console.log('loaded')
        store.dispatch(playerActions.setDuration(song.duration()))
      })
    }

    /**
     * Play / Pause logic
     */

    // If we were asked to play and we aren't
    if(state.player.state == PlayState.Playing && song && !song.playing())
      song.play();

    // If we were asked to pause and we're playing
    if(state.player.state != PlayState.Playing && song && song.playing())
      song.pause();

    /**
     * Store variables for checkDuration
     */
    currentLoop = currentSong.loops[state.player.currentLoopIndex];
    currentDuration = state.player.duration;
    currentPosition = state.player.position;
    userPosition = state.player.setPosition;

    if(!cache)
      cache = store;
  },

  checkDuration: ()=>{
    window.requestAnimationFrame(controller.checkDuration)

    // Check for user position seek
    if(userPosition){
      // Start playing (unless seeked to 0)
      if(userPosition !== 0)
        cache.dispatch(playerActions.play())

      // Seek to position
      const newPosition = userPosition * currentDuration
      song.seek(newPosition)
      cache.dispatch(playerActions.userPosition(null))

      // Figure out new loop state
      const state = cache.getState()
      const currentSong = state.songs[state.player.currentSong]
      let nextLoop
      for(let index in currentSong.loops){
        const loop = currentSong.loops[index]
        if(loop.end > newPosition * 1000){
          nextLoop = index;
          break;
        }
      }

      cache.dispatch(playerActions.setLoop(nextLoop))
    }

    if(!song || !song.playing())
      return;

    // If song loaded, update UI
    if(currentDuration !== song.duration())
      cache.dispatch(playerActions.setDuration(song.duration()))

    if(currentPosition !== song.seek())
      cache.dispatch(playerActions.setPosition(song.seek()))

    // Check for end of song
    if(currentPosition >= currentDuration - .01){
      console.log('stopping')
      cache.dispatch(playerActions.userPosition(0))
      cache.dispatch(playerActions.pause())
    }

    // If no current loop, don't bother checking to see if we've exceeded it
    if(!currentLoop)
      return;

    const currentMS = song.seek() * 1000
    if(currentMS > currentLoop.end)
      song.seek(currentLoop.start / 1000)
  }
};

window.requestAnimationFrame(controller.checkDuration)

export default controller;
