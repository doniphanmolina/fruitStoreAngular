import {Cat, Fruit, Shelf} from "../cat.model";
import { createAction, props } from '@ngrx/store';
import * as _ from 'lodash';

export const GET_CATS = 'GET_CATS';
export const SET_SHELVES = 'SET_SHELVES';
export const SET_FRUITS = 'SET_FRUITS';
export const ADD_CAT = 'ADD_CAT';
export const UPDATE_CAT = 'UPDATE_CAT';
export const DELETE_CAT = 'DELETE_CAT';
export const SET_SELECTED_CAT = 'SET_SELECTED_CAT';
export const CREATE_ERROR = 'Create Error';
export const DELETE_ERROR = 'Delete Error';

export const GetCats = createAction(GET_CATS);

export const SetShelves = createAction(SET_SHELVES, props<{ shelves: Shelf[]}>());

export const SetFruits = createAction(SET_FRUITS, props<{ fruits: Fruit[]}>());

export const AddCat = createAction(ADD_CAT, props<{ cat: Cat, callback?: () => void }>());

export const UpdateCat = createAction(UPDATE_CAT, props<{ cat: Cat, callback?: () => void }>());

export const SetSelectedCat = createAction(SET_SELECTED_CAT, props<{ cat: Cat }>());



export const CreateError = createAction(CREATE_ERROR, props<{ error: any }>());
export const DeleteError = createAction(DELETE_ERROR, props<{ error: string }>());
