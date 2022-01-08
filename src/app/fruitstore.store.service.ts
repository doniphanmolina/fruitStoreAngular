import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';


import { AppState } from './app.reducers';
import * as FruitStoreActions from './store/actions'
import {Container, Fruit} from "./models";
import * as selectors from './store/selectors';

@Injectable({
  providedIn: 'root'
})

export class FruitstoreStoreService {
  constructor(private store: Store<AppState>) {}


  public setContainers(containers: any[]): void {
    this.store.dispatch(FruitStoreActions.SetContainers({containers: containers}));
  }
  public setFruits(fruits: any[]): void {
    this.store.dispatch(FruitStoreActions.SetFruits({fruits: fruits}));
  }

  public getContainersList(): Observable<any> {
    return this.store.pipe(select(selectors.selectContainers));
  }

  public getFruitsList(): Observable<any> {
    return this.store.pipe(select(selectors.selectFruits));
  }

}
