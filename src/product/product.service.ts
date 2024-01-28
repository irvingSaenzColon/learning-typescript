import { faker } from "@faker-js/faker";
import Product from "./product.model";
import { CreateProductDTO, SearchProductDTO, UpdateProductDTO } from "./product.dto";

export const addProduct = ( data : CreateProductDTO, productList : Array< Product > ) : Product => {
  //Validation if needed
  const newProduct = {
    ...data,
    id: faker.string.uuid(),
    createdAt: faker.date.recent(),
    updatedAt: null,
    category: {
      id: data.categoryId,
      name: faker.commerce.department(),
      description: faker.lorem.lines(1),
      createdAt: faker.date.recent(),
      updatedAt: null
    }
  }

  productList.push( newProduct );

  return newProduct;
}

export const updateProduct = ( id : string | number, newData : UpdateProductDTO, products : Product[]) : Product => {
  //Validations if needed
  const index = products.findIndex( (prod) => prod.id === id );
  const prevData = products[ index ];

  const updatedData = {
    ...prevData,
    ...newData
  }

  return updatedData;
}

export const searchProduct = ( dto : SearchProductDTO ) : Product[] => {
  // code

  return [];
}
