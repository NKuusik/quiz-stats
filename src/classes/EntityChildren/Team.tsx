import {Entity} from '../Entity';
import {Season} from './Season';

export class Team extends Entity {
    rankings: {[seasonName: string]: number} | undefined;
    results: {[seasonName: string]: any[]} | undefined;
    teamSeasons: {[seasonName: string]: Season};
    totalScore: {[seasonName: string]: number} | undefined;

    constructor(name: string) {
      super(name);
    }
  }