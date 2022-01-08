import { Component, OnDestroy, OnInit } from '@angular/core';
import { Container } from "../../models";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { FruitstoreService } from "../../fruitstore.service";
import { MatDialog } from "@angular/material/dialog";
import { AdminDialogComponent } from "../../admin-dialog/admin-dialog.component";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { FruitstoreStoreService } from "../../fruitstore.store.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-front-store-page',
  templateUrl: './frontstore.page.html',
  styleUrls: ['./frontstore.page.scss']
})
export class FrontstorePage implements OnInit, OnDestroy {

  catsNumber: number = 0;
  catsSubscription: Subscription;
  containersList$: Observable<any>;
  fruitsList$: Observable<any>;

  constructor(private firestore: AngularFirestore,
              private catsService: FruitstoreService,
              private router: Router,
              private store: Store<{frontStore: { containers: Container[] }}>,
              private fruitstoreStoreService: FruitstoreStoreService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fruitstoreStoreService.getCats();
    this.containersList$ = this.fruitstoreStoreService.getContainersList();
    this.fruitsList$ = this.fruitstoreStoreService.getFruitsList();
  }

  addCatDialog() {
    this.dialog.open(AdminDialogComponent, {
      data: {editMode: false}
    });
  }

  ngOnDestroy(): void {
  }

}
