import { Character, Team } from "./public";

enum EnemyType {
  Range,
  Melee
}

export class Enemy extends Character {
  type : EnemyType

  constructor(health : number, speed: number, poise : number, type : EnemyType){
    super( health, speed, poise );
    this.type = type;
    this.team = Team.Enemy
  }
}
