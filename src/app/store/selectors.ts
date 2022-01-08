
import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducers';
// import { CatsListState } from '../app.reducers';

// export const selectNotificationBrowser = (state: AppState) => state.notificationsBrowser;

export const selectCatsStore = (state: AppState) => state;

// export const selectNotificationBrowserNotifications = (state: AppState) => state.notificationsBrowser.notifications;

export const selectContainers = createSelector(
  selectCatsStore,
  (state: any) => {
      console.log(state)
    const containers = state.fruitsStore.frontStore.containers;
    return containers;
  }
);

export const selectFruits = createSelector(
    selectCatsStore,
    (state: any) => {
        const fruits = state.fruitsStore.frontStore.fruits;
        return fruits;
    }
);

export const getSelectedCat = createSelector(
  selectCatsStore,
  (state: any) => {
    const cat = state.fruitStore.selectedCat;
    return cat;
  }
);

