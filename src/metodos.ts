enum EnemyType {
  Range,
  Melee
}

export class Enemy {
  health : number;
  defense : number;
  damage: number;
  speed: number;
  type : EnemyType;

  constructor(health : number, damage: number, speed: number, type : EnemyType){
    this.health = health;
    this.damage = damage;
    this.speed = speed;
    this.type = type;

    this.defense = this.type === EnemyType.Melee ? 1.5 : 0.6;
  }

  attack() : number{
    return this.type === EnemyType.Melee ? this.damage * 1.2 : this.damage * 1.8;
  }

  takeDamage( damage : number ) : number{
    this.health -= this.defense * damage;

    return this.health;
  }
}
