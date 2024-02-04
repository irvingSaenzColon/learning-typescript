import axios from "axios";
import Product from "./product/product.model";

export const API_BASE : string = 'https://api.escuelajs.co/api/v1/products';

(async () => {

  function delay( time : number ){
    const promise = new Promise< boolean >( (resolve ) => {
      setTimeout(() => {
        resolve( true );
      }, 500); });

    return promise;
  }

  async function getProducts() : Promise< Array< Product > > {
    // const promise = axios.get< Array< Product > >( API_BASE );
    const promise = await axios.get( API_BASE );
    const data = promise.data as Array< Product >;

    return data;
  }

  async function getProductsAsync(){
    const output = await axios.get( API_BASE );
    return output.data;
  }

  const output = await getProducts();

  const output2 = await getProductsAsync();

  console.log( output );
  console.log( output2 )
})();
