import {Cat} from "./cat.model";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import {Subject} from "rxjs";
import {Observable, of} from "rxjs";
import { Store } from "@ngrx/store";
import { State } from "./store/cats.reducer"
import * as CatActions from './store/cats.actions'
import {CatsStoreService} from "./cats.store.service";

@Injectable()
export class CatsService {
  catsChanged = new Subject<Cat[]>();
  cats: Cat[] = [];

  constructor(private firestore: AngularFirestore,
              private catsStoreService: CatsStoreService,
              private store: Store<{ui: State}>) { }

  fetchCats(): void {
    this.firestore
      .collection('shelves')
      .snapshotChanges()
      .pipe(map(data => {
          return data.map(shelf => {
            return {
              id: shelf.payload.doc.id,
              ...shelf.payload.doc.data() as {}
            }
          })
        })
      ).subscribe((shelves: any) => {
        this.cats = shelves;
        this.catsStoreService.setShelves(shelves);
        // this.store.dispatch(CatActions.SetCats(cats));
        // this.catsChanged.next([...this.cats])
    });
  }

  fetchFruits(): void {
    this.firestore
        .collection('frutas')
        .snapshotChanges()
        .pipe(map(data => {
              return data.map(fruit => {
                return {
                  id: fruit.payload.doc.id,
                  ...fruit.payload.doc.data() as {}
                }
              })
            })
        ).subscribe((fruits: any) => {
      this.cats = fruits;
      this.catsStoreService.setFruits(fruits);
      // this.store.dispatch(CatActions.SetCats(cats));
      // this.catsChanged.next([...this.cats])
    });
  }

  getCat(id: string | null): Observable<Cat> {
    const cat = this.cats.find(c => c.id === id)!;
    return of(cat);
  }

  addCat(cat: Cat): void {
    this.firestore.collection('cats').add(cat);
  }


}
