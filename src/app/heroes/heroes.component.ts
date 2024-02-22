import { MessageService } from './../message.service';
import { Component } from '@angular/core';
import { Hero } from '../hero';
import {  NgFor, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeroService } from '../hero.service';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [UpperCasePipe, FormsModule, NgFor, HeroDetailComponent, RouterLink],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  heroes: Hero[] = [];
  selectedHero?: Hero;

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = structuredClone(hero);
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  add(name: string): void {
    name = name.trim();
    if(!name) return;

    this.heroService.addHero({name} as Hero).subscribe(
      hero => this.heroes.push(hero)
    );
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero.id).subscribe(
      () => this.getHeroes()
    )
  }


}
