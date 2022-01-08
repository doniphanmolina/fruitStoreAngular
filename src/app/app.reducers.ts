import { ActionReducerMap } from '@ngrx/store';
import * as frontStore from './store';

const FRUITS_STORE = 'fruitsStore';
const FRUIT_STORE = 'fruitStore';

export interface AppState {
  [FRUITS_STORE]: frontStore.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [FRUITS_STORE]: frontStore.frontStoreReducer
};
