import { BaseModel } from "../base.model";
import { Category } from "../category/category.model";

type Size  = 'S' | 'M' | 'L' | 'X';

export default interface Product extends BaseModel {
  title : string;
  image : string;
  description : string;
  stock : number;
  color : string;
  price: number;
  category : Category;
  size ?: Size;
  isNew : boolean;
  tags : string[];
}
