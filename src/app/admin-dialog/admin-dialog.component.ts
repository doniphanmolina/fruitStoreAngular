import {Component, Inject, OnInit} from '@angular/core';
import {Container, Fruit, FruitStoreModel} from "../models";
import {
  FormControl,
  FormGroupDirective,
  FormGroup,
  NgForm,
  Validators,
  AbstractControl,
  ValidatorFn
} from '@angular/forms';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router} from "@angular/router";
import {FruitstoreStoreService} from "../fruitstore.store.service";
import {FruitstoreService} from "../fruitstore.service";

@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.scss']
})
export class AdminDialogComponent implements OnInit {

  maxDate: Date;
  frontstoreForm: FormGroup;
  errorMessage: string = 'Value is required and accepts only numbers';
  // private containerDoc: AngularFirestoreDocument<Container>;

  constructor(private firestore: AngularFirestore,
              private router: Router,
              private fruitStoreService: FruitstoreService,
              @Inject(MAT_DIALOG_DATA) public data: {fruitStore: FruitStoreModel, editMode: boolean},
              private fruitStoreStoreService: FruitstoreStoreService,
              public dialogRef: MatDialogRef<AdminDialogComponent>) { }

  ngOnInit(): void {
    this.frontstoreForm = new FormGroup({
      orangeContainers: new FormControl('', [
        Validators.required, this.patternValidator()
      ]),
      orangeContainersCapacity: new FormControl( '', [
        Validators.required, this.patternValidator()
      ]),
      appleContainers: new FormControl(   '', [
        Validators.required, this.patternValidator()
      ]),
      appleContainersCapacity: new FormControl( '', [
        Validators.required, this.patternValidator()
      ]),
      fruitPrice: new FormControl( '', [
        Validators.required, this.patternValidator()
      ])
    });
  }


  updateStore(): void {
    const newStore = this.buildStore();
    this.fruitStoreService.initData(newStore);
    this.closeDialog();
  }

  fillFruits(containerCapacity: number, fruitType: number, price: number): Fruit[] {
    let fruitAux: Fruit[] = [];
    for(let j = 0; j < containerCapacity; j++ ) {
      fruitAux.push({
        type: fruitType,
        name: fruitType === 1 ? "Valencia Orange" : "Red Delicious Apple",
        price: price
      })
    }
    return fruitAux;
  }

  buildContainers(containersCapacity: number, containersAmount: number, containersType: number, containersPrice: number): Container[] {
    let containersAux: any[] = [];
    for(let i = 0; i < containersAmount; i++ ) {
      containersAux.push({
        capacity: containersCapacity,
        type: containersType,
        filling: 0,
        fruits: this.fillFruits(
            containersCapacity,
            containersType,
            containersPrice
        ),
        price: containersPrice
      })
    }


    return containersAux;
  }

  buildStore(): any {

    let fruitsAux: any[] = [];

    let orangeContainers = this.buildContainers(
        Number(this.frontstoreForm.get('orangeContainersCapacity').value),
        Number(this.frontstoreForm.get('orangeContainers').value),
        1,
        Number(this.frontstoreForm.get('fruitPrice').value)
        );
    let appleContainers = this.buildContainers(
        Number(this.frontstoreForm.get('appleContainersCapacity').value),
        Number(this.frontstoreForm.get('appleContainers').value),
        2,
        Number(this.frontstoreForm.get('fruitPrice').value)
    );
    let totalContainers = [...orangeContainers, ...appleContainers];

    return  {
      containers: totalContainers,
      fruits: fruitsAux,
    }
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

  closeDialog(): void {
    this.dialogRef.close();
  }
}
