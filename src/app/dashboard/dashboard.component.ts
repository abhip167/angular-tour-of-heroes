import { Component } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroSearchComponent } from '../hero-search/hero-search.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, RouterLink, HeroSearchComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private heroService: HeroService) {}

  heroes: Hero[] = [];

  ngOnInit() {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

}
