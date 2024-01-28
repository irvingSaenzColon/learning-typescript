export class CustomMath{
  static PI : number = 3.1416;

  static max(...numbers : number[]) : number{
    const output = numbers.reduce( (prev, curr) => prev < curr ? curr : prev )
    return output;
  }
}
