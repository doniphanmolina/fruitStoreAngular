
import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducers';

export const selectFruitStore = (state: AppState) => state;

export const selectContainers = createSelector(
  selectFruitStore,
  (state: any) => {
    const containers = state.fruitsStore.frontStore.containers;
    return containers;
  }
);

export const selectFruits = createSelector(
    selectFruitStore,
    (state: any) => {
        const fruits = state.fruitsStore.frontStore.fruits;
        return fruits;
    }
);


