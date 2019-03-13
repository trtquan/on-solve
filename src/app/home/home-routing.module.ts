import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { CharactersListComponent } from './characters-list/characters-list.component';

const routes: Routes = [
  {
    path: 'home',
    component: CharactersListComponent
  },
  { path: 'detail/:id', component: CharacterDetailComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
