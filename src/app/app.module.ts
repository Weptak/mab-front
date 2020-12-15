import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CollectionsComponent } from './Components/collections/collections.component';
import { AllArtefactsComponent } from './Components/all-artefacts/all-artefacts.component';
import { ArtefactsFromCultureComponent } from './Components/artefacts-from-culture/artefacts-from-culture.component';
import { ExpositionsComponent } from './Components/expositions/expositions.component';
import { OldExpositionsComponent } from './Components/old-expositions/old-expositions.component';
import { ArtefactDetailsComponent } from './Components/artefact-details/artefact-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddCultureComponent } from './Components/add-culture/add-culture.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddArtefactComponent } from './Components/add-artefact/add-artefact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddExpositionComponent } from './Components/add-exposition/add-exposition.component';
import { EditArtefactComponent } from './Components/edit-artefact/edit-artefact.component';
import { EditCultureComponent } from './Components/edit-culture/edit-culture.component';
import { EditExpositionComponent } from './Components/edit-exposition/edit-exposition.component';
import { BasketComponent } from './Components/basket/basket.component';
import { LoginComponent } from './Components/login/login.component';
import { JwtInterceptor } from './interceptors/jwt-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomePageComponent,
    CollectionsComponent,
    AllArtefactsComponent,
    ArtefactsFromCultureComponent,
    ExpositionsComponent,
    OldExpositionsComponent,
    ArtefactDetailsComponent,
    AddCultureComponent,
    AddArtefactComponent,
    AddExpositionComponent,
    EditArtefactComponent,
    EditCultureComponent,
    EditExpositionComponent,
    BasketComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
