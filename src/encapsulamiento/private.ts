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

  get day(){ return this._day; }
  get month(){ return this._month; }
  get year(){ return this._year; }
  get isLeapYear() { return this._year % 100 === 0 ? this._year % 400 === 0 : this._year % 4 === 0; }

  set day( day : number ) {
    if( this._month !== 2 && this._day >= 1 && this._day <= 31 )
      this._day = day;
    else if( this._day >=1 && this._day <= 28 && !this.isLeapYear )
      this._day = day;
    else if( this._day >= 1 && this._day <= 29 && this.isLeapYear )
      this._day = day;
    else
      throw new Error('A day should be between 1 or 31 if it is not february and if it is not a leap year');
  }

  set month( month : number ) {
    if( month >= 1 && month <= 12  )
      this._month = month;
    else
      throw new Error('Month must be within 1 or 12');
  }


}
