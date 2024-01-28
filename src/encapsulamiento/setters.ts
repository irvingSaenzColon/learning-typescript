export class Movie {
  constructor(
    private _name : string,
    private _createdAt : Date = new Date(),
    private _genre : string,
    private _price : number,
  ){}

  get name() { return this._name; }
  get genre(){ return this._genre; }
  get price(){ return this._price; }
  get createdAt(){ return this._createdAt; }

  set name( name : string ) { this._name = name; }
  set genre( genre : string ){ this._genre = genre; }
  set price( price : number ){
    if(price > 0)
      this._price = price;
    else
      throw new Error('The price of a movie must not be negative or cero');
   }
}
