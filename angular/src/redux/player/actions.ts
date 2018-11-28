import {Action,ActionCreator} from 'redux';
import {PlayerState} from './datatypes';

// Add user
export const PAUSE = '[Player] Pause';
export const PLAY = '[Player] Play';
export const CONTINUE = '[Player] Continue';
export const DURATION = '[Player] SetDuration';
export const POSITION = '[Player] SetPosition';
export const SETPOSITON = '[User] SetPosition';
export const SETLOOP = '[Player] SetLoop';

export interface PlayAction extends Action {}
export interface PauseAction extends Action {}
export interface ContinueAction extends Action {}
export interface DurationAction extends Action {
  duration: number
}
export interface PositionAction extends Action {
  position: number
}
export interface SetPosition extends Action {
  position: number
}
export interface SetLoop extends Action {
  index: number
}

export const play: ActionCreator<PlayAction> = () => ({type: PLAY});
export const pause: ActionCreator<PauseAction> = () => ({type: PAUSE});
export const continueAfterLoop: ActionCreator<ContinueAction> = () => ({type: CONTINUE});
export const setLoop: ActionCreator<SetLoop> = (index) => ({type: SETLOOP, index: index})

export const setDuration: ActionCreator<DurationAction> = (d) => ({type: DURATION, duration: d})
export const setPosition: ActionCreator<PositionAction> = (d) => ({type: POSITION, position: d})
export const userPosition: ActionCreator<SetPosition> = (d) => ({type: SETPOSITON, position: d})
