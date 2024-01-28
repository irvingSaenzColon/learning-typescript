export class Animal {
  constructor(
    protected _name : string
   ){}

   public move() : string {
    return 'walking...';
   }

   public sound() : string {
    return 'speak...';
   }

   get name() { return this._name; }
}

export class Fish extends Animal {
  constructor( name : string){
    super( name );
  }

  public override move() : string{
    return 'swimming...'
  }

  public override sound() : string{
    return 'Glu glu';
   }
}
