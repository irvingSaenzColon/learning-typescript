import { Category } from "./category"

export default interface Product{
  id : number,
  title: string,
  price : number,
  description : string,
  category : Category,
  images : Array< string >
}
