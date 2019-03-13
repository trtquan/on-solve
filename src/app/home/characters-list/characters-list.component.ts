import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { tap, switchMap, map } from 'rxjs/operators';
import { CharacterService } from '../character.service';
@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {
  characters: any;
  query: string = '';
  page: number = 1;
  perPage: number = 20;
  isLoading: boolean = false;

  constructor(
    private characterService: CharacterService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        tap((params) => {
          this.page = params['p'] ? parseInt(params['p'], 10) : 1;
          this.query = params['q'] || '';
        }),
        switchMap(() => {
          this.isLoading = true;
          return this.characterService.getList({
            page: this.page,
            perPage: this.perPage,
            query: this.query
          });
        }),
        )
        .subscribe((characters) => {
          this.isLoading = false;
          this.characters = characters;
          console.log(this.characters);
        });
  }

  getTotalPages() {
    if (this.characters) {
      return Math.ceil(this.characters.data.total / this.perPage);
    }
  }

  onChangePage(newPage) {
    this.router.navigate([{
      p: newPage,
      q: this.query
    }]);
  }

}
