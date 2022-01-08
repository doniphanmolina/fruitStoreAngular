import {Container, Fruit} from "../models";
import { createAction, props } from '@ngrx/store';
import * as _ from 'lodash';

export const SET_CONTAINERS = 'SET_CONTAINERS';
export const SET_FRUITS = 'SET_FRUITS';
export const CREATE_ERROR = 'Create Error';
export const DELETE_ERROR = 'Delete Error';


export const SetContainers = createAction(SET_CONTAINERS, props<{ containers: Container[]}>());

export const SetFruits = createAction(SET_FRUITS, props<{ fruits: Fruit[]}>());


export const CreateError = createAction(CREATE_ERROR, props<{ error: any }>());
export const DeleteError = createAction(DELETE_ERROR, props<{ error: string }>());
