import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddArtefactComponent } from './Components/add-artefact/add-artefact.component';
import { AddCultureComponent } from './Components/add-culture/add-culture.component';
import { AddExpositionComponent } from './Components/add-exposition/add-exposition.component';
import { AllArtefactsComponent } from './Components/all-artefacts/all-artefacts.component';
import { ArtefactDetailsComponent } from './Components/artefact-details/artefact-details.component';
import { ArtefactsFromCultureComponent } from './Components/artefacts-from-culture/artefacts-from-culture.component';
import { CollectionsComponent } from './Components/collections/collections.component';
import { EditArtefactComponent } from './Components/edit-artefact/edit-artefact.component';
import { EditCultureComponent } from './Components/edit-culture/edit-culture.component';
import { ExpositionsComponent } from './Components/expositions/expositions.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { OldExpositionsComponent } from './Components/old-expositions/old-expositions.component';

const routes: Routes = [
  { path: 'welcome', component: HomePageComponent },
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  { path: 'expos', component: ExpositionsComponent },
  { path: 'expos/old', component: OldExpositionsComponent },
  { path: 'newCulture', component: AddCultureComponent },
  { path: 'newArtefact', component: AddArtefactComponent },
  { path: 'newExpo', component: AddExpositionComponent },

  {
    path: 'collections',
    component: CollectionsComponent,
    children: [
      { path: '', component: AllArtefactsComponent },
      { path: ':id', component: ArtefactsFromCultureComponent },
      { path: ':id/editCulture', component: EditCultureComponent },
      { path: 'details/:identification', component: ArtefactDetailsComponent },
      {
        path: ':id/details/:identification',
        redirectTo: 'details/:identification',
      },
      {
        path: 'details/:identification/editArtefact',
        component: EditArtefactComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
