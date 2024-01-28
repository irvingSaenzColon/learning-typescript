export class SimpleDate {

  constructor(
    private _year : number,
    private _month : number,
    private _day : number ){ }

  public date(){
    return `${ this.formatDigits( this._day ) }/${ this.formatDigits( this._month ) }/${ this._year }`
  }

  private formatDigits( value : number ) : string{
    if( value < 10 )
      return `0${value}`

    return value.toString();
  }

  get day(){ return this._day }
  get month(){ return this._month }
  get year(){ return this._year }
  get isLeapYear() { return this._year % 100 === 0 ? this._year % 400 === 0 : this._year % 4 === 0; }
}
