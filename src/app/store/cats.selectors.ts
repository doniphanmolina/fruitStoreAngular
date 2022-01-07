
import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducers';
// import { CatsListState } from '../app.reducers';

// export const selectNotificationBrowser = (state: AppState) => state.notificationsBrowser;

export const selectCatsStore = (state: AppState) => state;

// export const selectNotificationBrowserNotifications = (state: AppState) => state.notificationsBrowser.notifications;

export const selectShelves = createSelector(
  selectCatsStore,
  (state: any) => {
      console.log(state)
    const shelves = state.fruitsStore.catsList.shelves;
    return shelves;
  }
);

export const selectContainers = createSelector(
    selectCatsStore,
    (state: any) => {
        const containers = state.fruitsStore;
        return containers;
    }
);

export const getSelectedCat = createSelector(
  selectCatsStore,
  (state: any) => {
    const cat = state.fruitStore.selectedCat;
    return cat;
  }
);

