import Product from "../models/product";

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> { categoryId : number };

export interface UpdateProductDTO extends Partial< CreateProductDTO >{}
export interface SearchProductDTO extends Readonly< Partial< CreateProductDTO > >{}
