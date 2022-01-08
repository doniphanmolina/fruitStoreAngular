import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Container, Fruit} from "../../models";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { FruitstoreService } from "../../fruitstore.service";
import { MatDialog } from "@angular/material/dialog";
import { AdminDialogComponent } from "../../admin-dialog/admin-dialog.component";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { FruitstoreStoreService } from "../../fruitstore.store.service";
import {Subject} from "rxjs";
import * as _ from "lodash";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-frontstore-component',
  templateUrl: './frontstore.component.html',
  styleUrls: ['./frontstore.component.scss']
})
export class FrontstoreComponent implements OnInit, OnDestroy {

  containers: Container[];
  fruitContainers: Container[];
  totalFruitsAMount: number;
  totalPrice: number = 0;
  fruitsQuantity: number = 0;

  cartForm: FormGroup;
  errorMessage: string;
  showErrorMessage: boolean = false;

  private readonly destroy$: Subject<void> = new Subject();

  @Input('containers') set _containersRef(containers: any) {
    this.containers = _.cloneDeep(containers);
    this.totalFruitsAMount = 0;
    for (let i = 0; i < this.containers.length; i++) {
      this.totalFruitsAMount += this.containers[i].fruits.length;
    }
    console.log(this.containers)
  }


  constructor(private firestore: AngularFirestore,
              private fruitStoreService: FruitstoreService,
              private fruitstoreStoreService: FruitstoreStoreService,
              public router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cartForm = new FormGroup({
      fruitQuantity: new FormControl('', [
        Validators.required, this.patternValidator()
      ])
    });
  }

  updateCartQuantity(quantity: Number) {
    this.fruitsQuantity += Number(quantity);
  }

  subtractFruitQuantity(quantity: Number, array: any) {
    for (let j = 0; j < quantity; j++) {
      array.pop();
    }
  }

  resetForm(value: any){
    this.cartForm?.get('fruitQuantity').patchValue(value);
  }

  addToCart() {
    console.log('this.totalFruitsAMount',this.totalFruitsAMount)
    if(this.cartForm.get('fruitQuantity').value > this.totalFruitsAMount){
      this.errorMessage = 'There\'s not enough fruits in the store to sell that quantity';
      this.showErrorMessage = true;
      return;
    }
    if(!this.cartForm.get('fruitQuantity').value) {
      return;
    }
    this.totalFruitsAMount -= this.cartForm.get('fruitQuantity').value;
    this.totalPrice += (this.cartForm.get('fruitQuantity').value * this.containers[0].price);
    this.updateCartQuantity(this.cartForm.get('fruitQuantity').value);
    this.showErrorMessage = false;
    for (let i = (this.containers.length - 1); i >= 0; i--) {
          if(this.containers[i].fruits.length > 0) {
            if(this.cartForm.get('fruitQuantity').value <= this.containers[i].fruits.length) {
              console.log('price',this.containers[i].fruits[0].price)
              this.subtractFruitQuantity(Number(this.cartForm.get('fruitQuantity').value), this.containers[i].fruits);
              this.resetForm('');
            } else {
              let diff = this.cartForm.get('fruitQuantity').value - this.containers[i].fruits.length;
              if(this.cartForm.get('fruitQuantity').value >= this.containers[i].capacity){
                this.subtractFruitQuantity(this.containers[i].capacity, this.containers[i].fruits);
                console.log('greater than-----', diff)
              } else {
                console.log('++++++++++++not',diff)
                this.subtractFruitQuantity(this.containers[i].fruits.length , this.containers[i].fruits);
              }
              this.resetForm(diff);


            }
          }
      }
    this.fruitstoreStoreService.setContainers(this.containers);
  }

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^[0-9]*$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  openAdminDialog() {
    this.dialog.open(AdminDialogComponent, {
      height: '450px',
      width: '470px',
    });
  }

  refresh(){
    console.log('refresh');
    this.resetForm('');
    this.fruitsQuantity = 0;
    this.fruitStoreService.initData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
