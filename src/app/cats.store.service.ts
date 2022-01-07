import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';


import { AppState } from './app.reducers';
import * as CatActions from './store/cats.actions'
import {Cat, Fruit, Shelf} from "./cat.model";
import * as selectors from './store/cats.selectors';

@Injectable({
  providedIn: 'root'
})

export class CatsStoreService {
  constructor(private store: Store<AppState>) {}

  public getCats(): any {
    this.store.dispatch(CatActions.GetCats());
  }

  public setShelves(shelves: Shelf[]): void {
    this.store.dispatch(CatActions.SetShelves({shelves: shelves}));
  }
  public setFruits(fruits: Fruit[]): void {
    this.store.dispatch(CatActions.SetFruits({fruits: fruits}));
  }

  public updateCat(newCat: Cat): any {
    this.store.dispatch(CatActions.UpdateCat({cat: newCat}));
  }

  public addCat(newCat: Cat): any {
    this.store.dispatch(CatActions.AddCat({cat: newCat}));
  }

  public getShelvesList(): Observable<any> {
    return this.store.pipe(select(selectors.selectShelves));
  }

  public getContainersList(): Observable<any> {
    return this.store.pipe(select(selectors.selectContainers));
  }

  public getSelectedCat(): Observable<any> {
    return this.store.pipe(select(selectors.getSelectedCat));
  }

  public setSelectedCat(cat: Cat): void {
    return this.store.dispatch(CatActions.SetSelectedCat({cat: cat}));
  }

}
