import { CreateProductDTO, UpdateProductDTO } from "../dto/product";
import BasicCRUD from "../models/crud";
import Product from "../models/product";
import axios from "axios";

export default class ProductHttpService implements  BasicCRUD {
  private URL = 'https://api.escuelajs.co/api/v1/products'

  async getAll(): Promise< Array< Product > > {
    try{
      const { data } = await axios.get< Array< Product > >( this.URL );
      return data;
    } catch{
      throw new Error(' Something went wrong while requesting all products ');
    }
  }
  async update(id: number, product: UpdateProductDTO): Promise< Product > {
    try{
      const {data} = await axios.put( `${this.URL}/${id}`, product );

      return data;
    } catch{
      throw new Error("Something went wrong while updateing products");
    }
  }
  async find( id : number ): Promise< Product > {
    try{
      const { data } = await axios.get< Product >( `${this.URL}/${id}` );
      return data;
    } catch{
      throw new Error("Method not implemented.");
    }

  }
  async create(product : CreateProductDTO): Promise< Product > {
    try{
      const { data } = await axios.post( `${this.URL}/`,  product );
      return data;
    } catch{
      throw new Error("Method not implemented.");
    }
  }

}
