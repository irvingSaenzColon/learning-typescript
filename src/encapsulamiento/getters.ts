class Car{
  constructor(
    private _color : string,
    private _model : string,
    private _name : string,
  ) {}

  get color(){ return this._color;  }
  get model(){ return this._model; }
  get name(){ return this._name; }
}
