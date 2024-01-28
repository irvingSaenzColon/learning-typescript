import Product from "./product.model";

export interface CreateProductDTO extends Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'category'> {
  categoryId : number | string
};

export interface UpdateProductDTO extends Partial< CreateProductDTO >{}
export interface SearchProductDTO extends Readonly< Partial< CreateProductDTO > >{}
