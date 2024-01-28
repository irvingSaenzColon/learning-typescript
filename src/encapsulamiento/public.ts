enum MovementType {
  Walk,
  Jogg,
  Run,
  Idle
}

export enum Team{
  Friendly,
  Neutral,
  Enemy
}

export class Character{
  protected health : number;
  protected speed: number;
  protected poise: number;
  protected movement : MovementType;
  protected team : Team

  constructor(health : number, speed : number, poise: number){
    this.health = health;
    this.speed = speed;
    this.poise = poise;

    this.movement = MovementType.Idle;
    this.team = Team.Neutral;
  }

  public move ( velocity : number ) : MovementType{
    if(velocity >= 50)
      this.movement = MovementType.Jogg;
    else if( velocity >= 100 )
      this.movement = MovementType.Run
    else if ( velocity < 50 && velocity > 10 )
      this.movement = MovementType.Walk
    else
      this.movement = MovementType.Idle

    return this.movement
  }
}
