import * as ShopActions from './actions'
import { Container, Fruit} from "../models";
import { createReducer, on } from '@ngrx/store';
import * as _ from 'lodash';
import {AppState} from "../app.reducers";

export interface State {
  frontStore: {
      containers: Container[]
  }
}

export const initialState: State = {
    frontStore: {
        containers: []
  },

};

export const frontStoreReducer = createReducer(
  initialState,
  on(ShopActions.SetContainers, (state, action) => {
    const updatedContainers =  [
            ...action.containers
          ];
    return _.setWith(_.clone(state), 'frontStore.containers', updatedContainers, _.clone);
  }),
    on(ShopActions.SetFruits, (state, action) => {
        const updatedFruits =  [
                ...action.fruits
            ];
        return _.setWith(_.clone(state), 'frontStore.fruits', updatedFruits, _.clone);
    }),


);