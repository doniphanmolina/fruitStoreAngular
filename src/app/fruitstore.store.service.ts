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

  public getCats(): any {
    this.store.dispatch(FruitStoreActions.GetCats());
  }

  public setContainers(containers: any[]): void {
    this.store.dispatch(FruitStoreActions.SetContainers({containers: containers}));
  }
  public setFruits(fruits: any[]): void {
    this.store.dispatch(FruitStoreActions.SetFruits({fruits: fruits}));
  }

  // public updateCat(newCat: Cat): any {
  //   this.store.dispatch(CatActions.UpdateCat({cat: newCat}));
  // }
  //
  // public addCat(newCat: Cat): any {
  //   this.store.dispatch(CatActions.AddCat({cat: newCat}));
  // }

  public getContainersList(): Observable<any> {
    return this.store.pipe(select(selectors.selectContainers));
  }

  public getFruitsList(): Observable<any> {
    return this.store.pipe(select(selectors.selectFruits));
  }

  public getSelectedCat(): Observable<any> {
    return this.store.pipe(select(selectors.getSelectedCat));
  }

  // public setSelectedCat(cat: Cat): void {Å

}
