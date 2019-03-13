import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HomeRoutingModule } from './home-routing.module';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { PaginationComponent } from './characters-list/pagination/pagination.component';
import { CharacterService } from './character.service';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  providers: [CharacterService],
  declarations: [CharactersListComponent, CharacterDetailComponent, PaginationComponent]
})
export class HomeModule { }
