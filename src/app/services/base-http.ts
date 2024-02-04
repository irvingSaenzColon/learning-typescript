import axios from "axios";

export class BaseHttpService< T > {
  private _data : Array< T > = [];
  private url : string = '';

  constructor( url : string ){
    this.url = url;
  }

  async getAll() : Promise< Array< T > > {
    const output = await axios.get< Array< T > >( this.url );
    this._data = output.data;
    return output.data;
  }

  async create< DTO >( data : DTO ) {
    const output = await axios.post( this.url, data );

    return output.data;
  }

  async update<ID, DTO>(  id : ID ,data : DTO ){
    const output = axios.put( `${this.url}/${id}`, data );
    return output;
  }

  async delete< ID >( id : ID ){
    const output = await axios.delete( `${this.url}/${id}` );
    return output.data;
  }

  get dat(){return this._data}

}
