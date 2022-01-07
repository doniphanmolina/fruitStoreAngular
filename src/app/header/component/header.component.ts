import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {Cat, Container, Fruit, Shelf} from "../../cat.model";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { CatsService } from "../../cats.service";
import { MatDialog } from "@angular/material/dialog";
import { AddCatDialogComponent } from "../../add-cat-dialog/add-cat-dialog.component";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { CatsStoreService } from "../../cats.store.service";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  catListCount: number;
  shelves: Shelf[];
  containers: Container[];
  fruitContainers: Container[];
  fruits: Fruit[];

  catsSubscription: Subscription;
  private readonly destroy$: Subject<void> = new Subject();

  @Input('shelves') set _shelvesRef(catsStore: any) {
    console.log(catsStore)
    this.shelves = catsStore?.slice().sort((a: Shelf,b: Shelf)=>{
      return b.stack - a.stack;
    });
    console.log(this.shelves)
  }

  @Input('fruits') set _containersRef(fruits: any) {
    // this.fruits = fruits.slice().sort((a: Shelf,b: Shelf)=>{
    //   return b.stack - a.stack;
    // });
    // console.log(this.fruits)
    // this.fillFruits();
  }

  constructor(private firestore: AngularFirestore,
              private catsService: CatsService,
              public router: Router,
              private store: Store<{catsList: { cats: Cat[] }}>,
              private catsStoreService: CatsStoreService,
              private activeRoute: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  fillFruits(): void{
    const containersArray: Container[] = [];
    //
    console.log('fruits--------------', this.fruits)
    this.containers.forEach(container => {
      for(var i = 0; i < this.fruits.length; i++){
        while(this.fruits[i].quantity > 0) {
          const newContainer = {...container};
          newContainer.fruits = {
            type: this.fruits[i].type,
            name: this.fruits[i].name,
            price: this.fruits[i].price,
            quantity: 0
          }

          if(this.fruits[i].quantity >= newContainer.capacity) { // there's more fruits left than container capacity
            newContainer.fruits.quantity += newContainer.capacity; // fill whole container
            newContainer.filling += newContainer.capacity
            this.fruits[i].quantity -= newContainer.capacity; // subtracts used fruits

          } else
          if(this.fruits[i].quantity < newContainer.capacity) { // there's less fruits left than container capacity
            newContainer.fruits.quantity += this.fruits[i].quantity; //fill with fruits left
            newContainer.filling += newContainer.capacity
            this.fruits[i].quantity = 0; //there's no more fruits in inventory
          }

          containersArray.push({...newContainer});
          // debugger
        }
      }
    })
    console.log('containersArray+++++++++++++++++',containersArray)
    // fillFruitsContainers(containersArray);
  }


  addCatDialog() {
    this.dialog.open(AddCatDialogComponent, {
      data: {editMode: false}
    });
  }

  gotoCatDetail( cat: Cat): void {
    // this.router.navigate(['/cat', id]).then(r => {});
    this.catsStoreService.setSelectedCat(cat);
  }

  ngOnDestroy(): void {
    this.catsSubscription.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

}
