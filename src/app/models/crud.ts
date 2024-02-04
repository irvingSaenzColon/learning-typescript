import Product from "./product";
import { CreateProductDTO } from "../dto/product";

export default interface BasicCRUD{
  getAll() : Array< Product > | Promise< Array<Product > >;
  update( id : number, data : unknown ) : Product | Promise< Product | undefined >;
  find( id : number ) : Product | Promise< Product | undefined > | undefined;
  create( data : CreateProductDTO ) : Product | Promise< Product > ;
}
