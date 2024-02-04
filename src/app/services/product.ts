import { faker } from "@faker-js/faker";
import Product from "../models/product";
import { CreateProductDTO, SearchProductDTO, UpdateProductDTO } from "../dto/product";

export default class ProductService{
  private _products : Array< Product > = [];

  create( data : CreateProductDTO ) : Product {
    //Validation if needed
    const newProduct =  {
      ...data,
      id: this._products.length + 1,
      category: {
        id: faker.number.int({min:0, max: 50}),
        name: faker.commerce.department(),
        image: faker.image.url()
      }
    }

    return this.add( newProduct );
  }

  private add = ( product : Product ) => {
    this._products.push( product );
    return product
  }

  update = ( id : string | number, newData : UpdateProductDTO) : Product => {
    //Validations if needed
    const index = this._products.findIndex( (prod) => prod.id === id );
    const prevData = this._products[ index ];

    const updatedData = {
      ...prevData,
      ...newData
    }

    this._products[ index ] = updatedData;

    return updatedData;
  }

  find = ( id : number ) : Product | undefined => {
   return this._products.find( prd =>  prd.id === id );
  }

  search = ( dto : SearchProductDTO ) : Product[] => {


    return [];
  }

  get products() { return this._products; }

}
