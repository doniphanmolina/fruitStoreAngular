import * as CatActions from './actions'
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
  // on(CatActions.AddCat, (state: any, action) => {
  //   const updatedCats = [
  //     ...state.catsList.cats,
  //     action.cat
  //   ];
  //   return _.setWith(_.clone(state), 'cats', updatedCats, _.clone);
  //   }),
  on(CatActions.SetContainers, (state, action) => {
      console.log('action',action)
    const updatedContainers =  [
            ...action.containers
          ];
    return _.setWith(_.clone(state), 'frontStore.containers', updatedContainers, _.clone);
  }),
    on(CatActions.SetFruits, (state, action) => {
        console.log(action)
        const updatedFruits =  [
                ...action.fruits
            ];
        return _.setWith(_.clone(state), 'frontStore.fruits', updatedFruits, _.clone);
    }),

  // on(CatActions.UpdateCat, (state, action) => {
  //   const updatedCats = [...state.catsList.shelves];
  //
  //   // for(var i in state.cats) {
  //   //   console.log(state.cats[i].id , action.cat.id)
  //   //   if(state.cats[i].id === action.cat.id) {
  //   //     console.log('found')
  //   //     const cat = state.cats[i];
  //   //   }
  //   // }
  //
  //   // return _.clone(state);
  //   return _.setWith(_.clone(state), 'cats', updatedCats, _.clone);
  // }),
);

// export const selectedCatReducer = createReducer(
//   initialCatState,
  // on(CatActions.SetSelectedCat, (state: any, action: any) => {
  //   const cloneState: CatState = _.cloneDeep(state);
  //   const newState = {
  //     ...cloneState,
  //     selectedCat: action.cat
  //   };
  //   return newState;
  // }),

// );
