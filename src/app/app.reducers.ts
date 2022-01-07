import { ActionReducerMap } from '@ngrx/store';
import * as catsList from './store';

const FRUITS_STORE = 'fruitsStore';
const FRUIT_STORE = 'fruitStore';

export interface AppState {
  [FRUITS_STORE]: catsList.State;
  [FRUIT_STORE]: catsList.CatState;
}

export const reducers: ActionReducerMap<AppState> = {
  [FRUITS_STORE]: catsList.catsListReducer,
  [FRUIT_STORE]: catsList.selectedCatReducer
};
