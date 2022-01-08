import {Container, Fruit} from "./models";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Subject} from "rxjs";
import {Observable, of} from "rxjs";
import { Store } from "@ngrx/store";
import { State } from "./store/reducers"
import {FruitstoreStoreService} from "./fruitstore.store.service";
import InitialContainers from '../assets/initialContainers.json';

@Injectable()
export class FruitstoreService {
  containers: Container[] = [];
  fruits: Fruit[] = [];

  constructor(private firestore: AngularFirestore,
              private fruitstoreStoreService: FruitstoreStoreService,
              private store: Store<{ui: State}>) {
    this.initData();
  }

  initData(initialData?: any): void {
    console.log('initialData',initialData,InitialContainers)
    let initialContainersdata = initialData ? initialData.containers : InitialContainers.fruitsStore.frontStore.containers;
    this.fruitstoreStoreService.setContainers(initialContainersdata);
  }



}
