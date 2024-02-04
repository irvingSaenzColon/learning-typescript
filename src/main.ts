import axios from "axios";
import { Product } from './app/model/product';
import { API_BASE } from "./promises";

( async() => {
  async function getProducts() : Promise< Array< Product > > {
    const { data }  = await axios.get< Array< Product > >( API_BASE );

    return data;
  }

  const prods = await getProducts();
  console.log( prods );
} )();
