export * from './actions';
export * from './reducers';
// export * from './cats.selectors';

import * as actions from './actions';
import { frontStoreReducer, initialState } from './reducers';
// import * as selectors from './cats.selectors';
// import { CatEffects } from './cats.effects';
// import { CatsState } from '../model/layout.model';
export {
  // CatsState,
  actions,
  initialState,
  frontStoreReducer,
  // selectors,
  // CatEffects,
};
