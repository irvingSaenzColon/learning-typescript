import { CustomService } from "./singleton";

const service1 = CustomService.create();
const service2 = CustomService.create();
const service3 = CustomService.create();

console.log('comparando los servicios 1 y 2: ', service1 === service2);
console.log('comparando los servicios 1 y 3: ', service1 === service3);
