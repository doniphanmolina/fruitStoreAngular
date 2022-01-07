import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cat } from "../../cat.model";
import { Shelf } from "../../cat.model";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { CatsService } from "../../cats.service";
import { MatDialog } from "@angular/material/dialog";
import { AddCatDialogComponent } from "../../add-cat-dialog/add-cat-dialog.component";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { CatsStoreService } from "../../cats.store.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-header-page',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss']
})
export class HeaderPage implements OnInit, OnDestroy {

  shelves: Shelf[] = [];
  catsNumber: number = 0;
  catsSubscription: Subscription;
  shelvesList$: Observable<any>;
  containersList$: Observable<any>;

  constructor(private firestore: AngularFirestore,
              private catsService: CatsService,
              private router: Router,
              private store: Store<{catsList: { shelves: Shelf[] }}>,
              private catsStoreService: CatsStoreService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.catsService.fetchCats();
    this.catsService.fetchFruits();
    this.catsStoreService.getCats();
    this.shelvesList$ = this.catsStoreService.getShelvesList();
    this.containersList$ = this.catsStoreService.getContainersList();
  }

  addCatDialog() {
    this.dialog.open(AddCatDialogComponent, {
      data: {editMode: false}
    });
  }

  ngOnDestroy(): void {
  }

}
