import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MediaDetailsComponent } from './components/media-details/media-details.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:':mediaType/:id', component:MediaDetailsComponent}
];
