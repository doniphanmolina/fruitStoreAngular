import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AgmCoreModule } from '@agm/core';
import { FrontstoreComponent } from './frontStore/component/frontstore.component';
import { FrontstorePage } from "./frontStore/page/frontstore.page";
import { HomeComponent } from './home/home.component';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireModule } from "@angular/fire/compat";
import { FruitstoreService } from "./fruitstore.service";
import { AdminDialogComponent } from './admin-dialog/admin-dialog.component';
import { MaterialModule } from "./material.module";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./app.reducers";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    FrontstoreComponent,
    FrontstorePage,
    HomeComponent,
    AdminDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    // !environment.production ? StoreDevtoolsModule.instrument() : [],
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC6uuu9_wvrn3DpMy-Yt2P1ZY9OM9vF-qM'
    })
  ],
  providers: [AngularFirestore,FruitstoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
