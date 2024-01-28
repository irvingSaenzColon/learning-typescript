import { Fish, Animal } from "./herencia";

const fish = new Fish( 'Pez globo' );
const animal = new Animal('Humano');

console.log(`The animal ${fish.name} is ${fish.move()}`);
console.log(`The animal ${animal.name} is ${animal.move()}`);
