# TypeScript
Estas son algunas notas que he realizado durante mi aprendizaje de TypeScript

## Readonly properties

En TypeScript podemos escribir propiedades solamente de lectura, esto quiere decir que podemos evitar que una variable de un type o interface poda ser reasignada.

#### Ejemplo:
```
interface User {
  readonly id : Int,
  name : string,
  image : string,
  age : string
}
```

## Utility Types
### DTO
Por sus siglas Data Transfer Object, es utilizado principalmente para transportar datos y con esos datos por lo general se realizan operaciones o transacciones.

### Omit
En ocasiones es importante al momento de pedir información a un API o al crear un nuevo elemento, podemos ver que hay información que no nos son útiles o que no está en nosotros poder llenarlos pues una base de datos es la encargadad de asignarlos, así como lo es un "id"

#### Ejemplo:
   
```
import { BaseModel } from "./base.model";
import { Category } from "./category.model";

export interface Product extends BaseModel {
  title : string;
  image : string;
  description : string;
  stock : number;
  color : string;
  price: string;
  category : Category;
  isNew : boolean;
  tags : string;

}

type CreateProductDTO = Omit<Product, 'id'>;
```

De esta manera podemos omitir los campos que no necesitamos realmente y lo podríamos usar para empezar a manipularlo. En esencia lo que hace es crear un type pero, sin los campos que omitimos. Algo importante que recordar recordemos que las interfaces tienen esta cualidad de poder "extender", por lo que podemos extender de los omit.

#### Ejemplo:
```
import { BaseModel } from "./base.model";
import { Category } from "./category.model";

export interface Product extends BaseModel {
  title : string;
  image : string;
  description : string;
  stock : number;
  color : string;
  price: string;
  category : Category;
  isNew : boolean;
  tags : string;

}

interface CreateProductDTO extends Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'category'> {
  categoryId : string;
}
```

Así es como ahora tenemos una interface mucho más manejable y fácil de utilizar en nuestro código. Además a esa misma interface que he creado podemos asignarle nuevos campos, en el caso anterior le agregué el campo del Id de la categoría porque es lo único que necesito.


## Pick Type
Me permite solamente elegir ciertas propiedades de una interface o type

#### Ejemplo.

```
export interface Product extends BaseModel {
  title : string;
  image : string;
  description : string;
  stock : number;
  color : string;
  price: string;
  category : Category;
  isNew : boolean;
  tags : string;

}

type Clothe = Pick< Product, 'color', | 'size', | 'description' >
```
## Partial Type

Esto nos permite hacer que las propiedades de un type o interface sean opcionales. Gracias a esto no necesitamos mandarle un elemento completo, sino que, mandamos las propiedades que solamente necesitamos.

#### Ejemplo: 
```
//product.model.ts

import { BaseModel } from "./base.model";
import { Category } from "./category.model";

export interface Product{
  title : string;
  image : string;
  description : string;
  stock : number;
  color : string;
  price: string;
  category : Category;
  isNew : boolean;
  tags : string;

}

export interface UpdateProductDTO extends Partial< Product >{}
```
Definimos una interface que necesitemos. Tras esto podemos definir una interface parcial que nos hace los miembros opcionales de otra interface.

```
//product.service.ts
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
```

Desarrollé un pequeño código donde obtenemos el producto en base a un id, aplico los cambios y retorno el producto con los datos nuevos.

```
//main.ts
import { faker } from '@faker-js/faker';
import { addProduct, updateProduct } from './product/product.service';
import Product from './product/product.model';

const products : Array<Product> = [];

//Creating random products using fajkerjs
for(let i = 0; i < 5; i++){
  addProduct({
    title: faker.commerce.productName(),
    image: faker.image.url(),
    stock: Math.floor( (Math.random() * 100) ),
    color: faker.color.human(),
    size: faker.helpers.arrayElement(['S', 'M', 'L', 'X']),
    price: parseFloat( faker.commerce.price( {min: 150, max: 1500} ) ),
    isNew: faker.datatype.boolean(),
    tags: faker.helpers.arrayElements(['Ropa', 'Electrónica', 'Juguetes', 'Videojuegos', 'Otros'], {min: 2, max: 4}),
    description: faker.commerce.productDescription(),
    categoryId: faker.string.uuid()

  }, products);
}


console.log( products );

const product = products[0];
console.log( 'Current Product', product );
const updatedProduct = updateProduct( product.id, {
  title: 'Xbox Series X',
  price: 1500
}, products );

console.log('Updated Product', updatedProduct);

```

Aquí es donde se ve la mágia de los Partial porque al momento de llamar el  método "updateProduct" podemos ver que solamente le mando las propiedades que necesito de esa interface y no todo un objeto completo con propiedades que no necesito.

## Require Type
Al contratrio de **partial type**, require hace obligatoria todas las propiedades de un type o interface. Incluso si tenemos una propiedad en opcional, lo convierte en obligatorio.

#### Ejemplo: 
```
//product.model.ts
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

interface ReProductDTO extends  Require< Product >{}
```

## Readonly Type
Hace que todas las propiedades sean solamente de lectura. Nos otorga la facilidad de otorgar objetos que no sean mutables.


#### Ejemplo: 
```
//product.model.ts
import { BaseModel } from "../base.model";
import { Category } from "../category/category.model";

type Size  = 'S' | 'M' | 'L' | 'X';

export default interface Product {
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

interface SearchProductDTO extends  Readonly< Partial< Product > >{}
```
**nota:** los utility types se pueden anidar

## Acceder al tipado por índice
Si necesitamos acceder al tipado de una propiedad de una interface, por ejemplo: el id de una o varias interfaces, entonces podemos hacer algo como esto:

```
export default interface Product {
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

export const updateProduct = ( id : Product['id'] | number, newData : UpdateProductDTO, products : Product[]) : Product => {
  //Validations if needed
  const index = products.findIndex( (prod) => prod.id === id );
  const prevData = products[ index ];

  const updatedData = {
    ...prevData,
    ...newData
  }

  return updatedData;
}
```
**nota:** No se accede al valor, recuerda que hacemos referencia al tipado.

## Readonly Array
Funciona similar aun array regular, solamente que no podemos mutar el array, es decir, no se puede utilizar push, pop, shift, ni ningún otro método que modifique el array como tal.

#### Ejemplo:
```
  const numbers : ReadonlyArray< number > = [1,2,3,4,5,6,7,8,9];
```


## Clases
Las clases fueron introducidas en ECMAScript 5 (2016), para entender qué es una clase haré uso de una analogía: Podemos ver a las clases como un molde de galletas, las galletas que se hagan con ese molde se les conocerá como **objetos** y al proceso de hacer una galleta se le conoce como **instancia**

>La instancia de un objeto es reservar un espacio de memoria que implementa métodos y/o atributos de una clase

A continuación se muestra cómo definir una clase.
```
class User{

  constructor( ){
  //some code
  }
}

```

Es importante recordar que los atributos de una clase, siempre tienen que estar definidos, ya sea en su declaración o en el constructor.

## Atributos
Los atributos son las variables que definen a nuestra clase, es importante entender que los atributos de una clase tienen que tener sentido con la clase misma para tener un código legible y coherente.
Podemos declarar los atributos dentro de una clase
```
class User{
  id : number;
  name : string;
  gender : string;

  //some code
}

```

## Métodos
Los métodos no son otra cosa que funciones contextualizadas en una clase, es decir, los métodos tienen que tener coherencia con el objeto abstracto o real al que hacemos referencia. Todas las propiedades que aprendimos de las funciones en TypeScript con antelación, también pueden ser aplicadas a los métodos de una clase (tipo de retorno, parámetros).
#### Ejemplo: 
```
enum EnemyType {
  Range,
  Melee
}

export class Enemy {
  health : number;
  defense : number;
  damage: number;
  speed: number;
  type : EnemyType;

  constructor(health : number, damage: number, speed: number, type : EnemyType){
    this.health = health;
    this.damage = damage;
    this.speed = speed;
    this.type = type;

    this.defense = this.type === EnemyType.Melee ? 1.5 : 0.6;
  }

  attack() : number{
    return this.type === EnemyType.Melee ? this.damage * 1.2 : this.damage * 1.8;
  }

  takeDamage( damage : number ) : number{
    this.health -= this.defense * damage;

    return this.health;
  }
}

```

Para definir una función no es necesario escribir **function** o crear una **arrow function** 

## Constructor
Este es un método que siempre se ejecuta al momento de realizar una instancia, es el primero en ejecutarse.
```
enum EnemyType {
  Range,
  Melee
}

export class Enemy {
  health : number;
  defense : number;
  damage: number;
  speed: number;
  type : EnemyType;

  constructor(health : number, damage: number, speed: number, type : EnemyType){
    this.health = health;
    this.damage = damage;
    this.speed = speed;
    this.type = type;

    this.defense = this.type === EnemyType.Melee ? 1.5 : 0.6;
  }

  //More code ...
}

```

Dentro del contructor también podemos definir y declarar nuestros atributos sin la necesidad de hacer tanto código. Usemos el ejemplo anterior para poder demostrarlo

```
enum EnemyType {
  Range,
  Melee
}

export class Enemy {
  private defense : number;

  constructor(
    private health : number, 
    private damage: number, 
    private speed: number, 
    private type : EnemyType){

    this.defense = this.type === EnemyType.Melee ? 1.5 : 0.6;
  }

  //More code ...
}
```
Así es como podemos obviar algunas definiciones y declaraciones de variables. Para que ese tipo de "automatización" se aplique como una definición y declaración, es importante aplicarle el nivel de acceso a cada párametro

## Encapsulamiento : Modificadores de acceso

### Public
Este es el nivel de acceso que tiene por default una clase en TypeScript (no es obligatorio escribir public a los métodos y/o atributos pues ya son públicos por defecto). Esto quiere decir que podemos acceder a cualquier método y/o atributo tras realizar una instancia. La información de la clase es transparente para cualquiera que quiera acceder a ella. Es importante hacer saber que existe la palabra reservada **public**, esto se puede escribir de manera explícita en algun atributo o método que queramos. No cambiará el comportamiento de los mismos, ni su nivel de acceso pues, solamente estamos haciendo enfásis en que los métodos son públicos.

#### Nivel de Acceso
| Clase  | Sub Clase | Cualquiera |
| ------ | --------- |:----------:|
|   ✔   |     ✔     |     ✔     |


#### Ejemplo:

```
enum MovementType {
  Walk,
  Jogg,
  Run,
  Idle
}

export class Character{
  health : number;
  speed: number;
  poise: number;
  movement : MovementType;

  constructor(health : number, speed : number, poise: number){
    this.health = health;
    this.speed = speed;
    this.poise = poise;

    this.movement = MovementType.Idle;
  }

  public move ( velocity : number ) : MovementType{
    if(velocity >= 50)
      this.movement = MovementType.Jogg;
    else if( velocity >= 100 )
      this.movement = MovementType.Run
    else if ( velocity < 50 && velocity > 10 )
      this.movement = MovementType.Walk
    else
      this.movement = MovementType.Idle

    return this.movement
  }
}

```

Como se puede ver en el ejemplo anterior, se define una clase de personaje. Todos sus atributos y métodos son públicos, solamente que en el métodod "move" decimos de manera explícita que es público, sería lo mismo si no le escribimos el nivel de acceso pues el compilador infiere que es público

### Private
Este es un nivel de acceso que nos permite hacer "data hidding" u ocultar los métodos y/o atributos. Nos permite tener una mejor manera de proteger información sensible. Podemos aplicarlo tanto a los métodos como a los atributos.

#### Nivel de Acceso
| Clase  | Sub Clase | Cualquiera |
| ------ | --------- |:----------:|
|   ✔   |     ❌     |     ❌     |

#### Ejemplo

```
export class SimpleDate {
  private year : number;
  private month : number;
  private day : number;

  constructor( year : number, month : number, day : number ){
    this.year = year;
    this.month = month;
    this.day = day;
  }

  public date(){
    return `${ this.formatDigits( this.day ) }/${ this.formatDigits( this.month ) }/${ this.year }`
  }

  private formatDigits( value : number ) : string{
    if( value < 10 )
      return `0${value}`

    return value.toString();
  }

}

```
Los métodos y/o atributos privados, solamente pueden ser accedidos por la misma clase y nada más.

### Getters
Al tener atributos privados no podemos acceder a los mismos por su nivel de acceso pero, podemos acceder al mismo sin comprometer la sensibilidad de la información haciendo uso de un **getter**.

#### Ejemplo
```
//private.ts
export class SimpleDate {

  constructor(
    private _year : number,
    private _month : number,
    private _day : number ){ }

  public date(){
    return `${ this.formatDigits( this._day ) }/${ this.formatDigits( this._month ) }/${ this._year }`
  }

  private formatDigits( value : number ) : string{
    if( value < 10 )
      return `0${value}`

    return value.toString();
  }

  get day(){ return this._day }
  get month(){ return this._month }
  get year(){ return this._year }

}

```
Se recomienda que cuando tengamos atributos privados, coloquemos un **_** antes del nombre del atributo, así podríamos hacer uso del nombre y hacer mucho más amigable la clase para aquellos que la vayan a utilizar. Los getters no solamente podemos utilizarlos para retornar exclusivamente el atributo, también podemos extender el uso de un getter, agregando lógica que modifique el resultado de alguna propiedad. Un getter que podríamos agregar es saber si el año es biciesto o no.
#### Ejemplo:
```
//private.ts
export class SimpleDate {

  constructor(
    private _year : number,
    private _month : number,
    private _day : number ){ }

  public date(){
    return `${ this.formatDigits( this._day ) }/${ this.formatDigits( this._month ) }/${ this._year }`
  }

  private formatDigits( value : number ) : string{
    if( value < 10 )
      return `0${value}`

    return value.toString();
  }

  get day(){ return this._day }
  get month(){ return this._month }
  get year(){ return this._year }
  get isLeapYear() { return this._year % 100 === 0 ? this._year % 400 === 0 : this._year % 4 === 0; }
}

```
**nota:** Todos lo getter *deben retornar* algo, ya sea que si retornarmos un atributo privado o extendemos la definición de un atributo. Puedes ver un ejemplo sencillo de métodos getter en el archivo de ***getters.ts***

#### Setter
Nos permite tener reglas de modificación para nuestros atributos, ya sea una asignación directa o realiar operaciones antes de hacer una asignación a alguna propiedad

#### Ejemplo
```
//setter.ts
export class Movie {
  constructor(
    private _name : string,
    private _createdAt : Date = new Date(),
    private _genre : string,
    private _price : number,
  ){}

  get name() { return this._name; }
  get genre(){ return this._genre; }
  get price(){ return this._price; }
  get createdAt(){ return this._createdAt; }

  set name( name : string ) { this._name = name; }
  set genre( genre : string ){ this._genre = genre; }
  set price( price : number ){
    if(price > 0)
      this._price = price;
    else
      throw new Error('The price of a movie must not be negative or cero');
   }
}

```

La clase anterior asignar el nombre, el género y el precio. En cuanto al precio podemos ver que se  ha agregado una pequeña validación para tener precios positivos mayores a cero.

### Protected
Este nivel de acceso es parecido a **private** pero, con la gran diferencia que los métodos y/o atributos que tengan **protected** su nivel de acceso será dentro de la misma clase y para todas aquellas clases que hereden de la misma (es decir, clases hijas).

#### Nivel de Acceso
| Clase  | Sub Clase | Cualquiera |
| ------ | --------- |:----------:|
|   ✔    |     ✔    |     ❌     |

#### Ejemplo: 
He definido una clase de personaje la cual tendra atributos protegidos como lo son: vida, velocidad, postura, tipo de movimiento, el equipo. Todos esos atributos podrán ser accedidos a aquellas clases que hereden de la misma.
```
//public.ts
enum MovementType {
  Walk,
  Jogg,
  Run,
  Idle
}

export enum Team{
  Friendly,
  Neutral,
  Enemy
}

export class Character{
  protected health : number;
  protected speed: number;
  protected poise: number;
  protected movement : MovementType;
  protected team : Team

  constructor(health : number, speed : number, poise: number){
    this.health = health;
    this.speed = speed;
    this.poise = poise;

    this.movement = MovementType.Idle;
    this.team = Team.Neutral;
  }

  public move ( velocity : number ) : MovementType{
    if(velocity >= 50)
      this.movement = MovementType.Jogg;
    else if( velocity >= 100 )
      this.movement = MovementType.Run
    else if ( velocity < 50 && velocity > 10 )
      this.movement = MovementType.Walk
    else
      this.movement = MovementType.Idle

    return this.movement
  }
}
```
Ahora creamos una clase que sea para enemigos, en ella vamos a **heredar** de la clase **Character** y al hacer eso podremos acceder a todas los atributos de Character, lo podremos modificar, esto gracias al nivel de acceso **protected**.
```
//protected.ts
import { Character, Team } from "./public";

enum EnemyType {
  Range,
  Melee
}

export class Enemy extends Character {
  type : EnemyType

  constructor(health : number, speed: number, poise : number, type : EnemyType){
    super( health, speed, poise );
    this.type = type;
    this.team = Team.Enemy
  }
}

```
No es necesario entender **herencia** justo ahora, pues se hablará de ella más adelante.

## Herencia
Permite crear clases que reutilizan, extienden y modifican el comportamiento definido en otras clases. Las clase cuyo miembro se heredan se denomina clase *clase base* o *clase padre* y la clase que hereda de esos miembros se le llama *clase derivada* o *clase hija*. Para poder heredar de una clase a otra se usa la palabra reservada **extends**.

Cuando se hereda, es necesario ejecutar el constructor padre. Es importante pasarle los parametros del constructor padre através del constructor hijo.

#### Ejemplo:
```
export class Animal {
  constructor(
    protected _name : string
   ){}

   public move() : string {
    return 'walking...';
   }

   public sound() : string {
    return 'speak...';
   }

   get name() { return this._name; }
}

export class Fish extends Animal {
  constructor( name : string){
    super( name );
  }

  public override move() : string{
    return 'swimming...'
  }

  public override sound() : string{
    return 'Glu glu';
   }
}

```

## Miembros Estáticos

Son métodos y propiedades que residen en la clase. Por lo que no es necesario hacer una instancia para poder utilizarlos o ejecutarlos. Un ejemplo sencillo de una clase que tiene miembros estáticos es Math, con Math podemos obtener sus miembros estáticos sin la necesidad de crear una instancia de la misma.

```
console.log( Math.PI ); //output : 3.1415...
console.log( Math.max(1,56,9,8,6,3,3,1,2,4) ) //output 56
```

Para tener miembros estáticos, solamente debemos agregar static antes de la definición de un miembro, de esa forma tenemos de manera automática un miembro estático. Creemos una clase que sea como Math pero, codeado con nosotros.

#### Ejemplo:
```
export class CustomMath{
  static PI : number = 3.1416;

  static max(...numbers : number[]) : number{
    const output = numbers.reduce( (prev, curr) => prev < curr ? curr : prev )
    return output;
  }
}
```

## Interfaces
Una inteface es un contrato que indica qué métodos y/o atributos debe obligatoriamente implementar una clase. Los métodos definidos en una interface deben ser públicos.

#### Ejemplo:
```
export interface DatabaseDriver {
  database : string;
  password : string;
  port : number;

  connect() : boolean;
  close() : void;
  isConnected() : boolean;
}

export class PostgressDriver implements DatabaseDriver {

  constructor(
    public database : string,
    public password : string,
    public port : number
  ){}

  connect(): boolean {
    return true;
  }

  close(): void {
    
  }

  isConnected(): boolean {
    return true;
  }
}
```
**nota:** recuerda qu se deben implementar todas las métodos y los atributos de un a interface, respentando siempre su tipado. Todos los miembros de una interface son públicos, no se le puede establecer un nivel de acces. Si requerimos niveles de acceso, es preferieble utilizar clases.

Una interface puede implementar otras interfaces

## Clases Abstractas
Las clases abstractas son aquellas que son usadas para poder crear otras clases, es decir, están destinadas a ser clases padres, por sí mismas no representan algo específico. Esas cualidades hacen que una clase abstracta no pueda ser instanciada, puede contener  métodos abstractos, los métodos abstractos deben ser sobreescritos por las clases que heredan de la misma.



#### Ejemplo:

## Diferencias entre clase abstracta e interface.
Si vemos las clases abstractas y las interfaces, podemos notar que tiene muchas similitudes, esto hace que en ocasiones sea confuso a la hora de quererlos distinguir.

* Las clases abstractas pueden heredar de otras clases abstractas o clases concretas (solamente puede heredar de una clase indpendientemente del tipo). Las interfaces pueden implementar multiples interfaces pero, no extender de clases.
* Las clases abstractas pueden tener métodos abstractos y métodos concretos, las interfaces solamente pueden tener métodos abstractos.
* Una interface define los métodos y atributos que tendrá aquella cosa que lo implemente. Una clase abstracta contiene algunas definiciones básicas para empezar a desarrollar otras clases que requieran de características similares.


## Constructor Privado: Patrón Singleton
Primero hay que definir qué es un singleton

> Es un patrón de diseño creacional que nos permite asegurarnos de que una clase tenga una única instancia, a la vez que proporciona un punto de acceso global a dicha instancia.

#### Ejemplo: 
```
//singleton.ts
export class CustomService {
    static instance  : CustomService | null = null;
    private constructor(){}

    static create() : CustomService {
        if(CustomService.instance === null)
            CustomService.instance = new CustomService();

        return CustomService.instance;
    }

}
```
Primero definimos una clase sin embargo, está es diferente con las que hemos trabajado porque contiene un constructor privado y un atrubuto del tipo de sí mismo, esto por sí sólo es curiosos. Al ser privado el constructor, recordemos que solamente puede ser accedido por la misma clase por lo que no podremos acceder a él al quererlo instanciar, para ello, haremos uso de un método estático, también recordemos que los miembros estáticos se comparten entre todas las clases, es decir, que si tengo una variable llamada nombre y le asigno "Luna", eso significa que sin importar la cantidad de instancias que tenga, si se manada a llamar, siempre será "Luna" a no ser que se le cambie su valor. En el caso del ejemplo lo que hacemos es que tenemos un atributo que puede almacenar una única estancia de la clase.

```
import { CustomService } from "./singleton";

const service1 = CustomService.create();
const service2 = CustomService.create();
const service3 = CustomService.create();

console.log('comparando los servicios 1 y 2: ', service1 === service2);
console.log('comparando los servicios 1 y 3: ', service1 === service3);
```

Lo único que hacemos aquí es instanciar 3 objetos, a primera impresión parece como si todas hicieran referencia a algo diferente, sin embargo hacen referencia a los mismo ya que comparten la misma dirección de memoria.

## Asincronismo

### Promesas
Una promesa la podemos ver como una acción que se va a realizar en algún momento pero, no sabemos cuándo sucederá. En programación podemos realizar muchas tareas o ejecuciones de tareas que pueden tomar un tiempo "indefinido". Para ello podemos utilizar promesas que nos permiten saber en qué momento esto se pudo hacer o no pudo realizarse.


#### Ejemplo

```
(async () => {
  function regularPromise(  ){
    return new Promise< boolean >( (resolve, reject) => {
      resolve( true )
    } );
  }
})();
```

La manera de definir la promesa es sencilla, La promesa consta de una función de una función que recibe como parametros de "resolve", "reject" y debemos de ejecutar una funcion u otra dependiendo de si realiza lo que necesitamos o no.
Veamos código ligeramente "complicado"

```
( async () => {
  function delay( time : number ){
    const promise = new Promise< boolean >( (resolve ) => {

      setTimeout(() => {
        resolve( true );
      }, 500); });

    return promise;
  }

  const isFinished = await delay( 3000 ); //this function takes 3 seconds
  console.log( isFinished ? 'It is resolved' : 'it could not resolve the promise' );

})();
```
Las promesas también podemos definir el tipado, solamente abrimos el operador de diamante y dentro del mismo definimos el tipo de retorno que tendrá. Siempre es bueno definir el tipo de retorno que realizamos en funciones y más aún si son funciones asíncronas en las que solicitamos recursos en un servidor. 
Pero ¿Cómo relizamos una petición a un endpoint? Con lo que hemos aprendido podemos de interfaces.

```
import axios from "axios";

export const API_BASE : string = 'https://api.escuelajs.co/api/v1/products';

(async () => {

  async function getProducts() {
    const promise = await axios.get( API_BASE );

    return promise;
  }

  const output = await getProducts();

  console.log( output );
})();

```
Para este ejemplo utilizaremos ***axios*** para poder realizar peticiones a un endpoint, en este caso a la fake api de ***platzi***. axios por sí mismo tiene sus métodos y es solamente cuestión de tener la ruta lista. En este caso solicitamos los productos, sin embargo, no sabemos qué contiene o qué tipo de respusta nos dará, el tipo de retorno es Promise< AxiosResponse< any, any>, any >, por lo que no será sencillo poder realizar operaciones usando el analizador de código estático. Para ello usaremos ***interfaces***, para ello veremos la documentación del API para poder realizar la documentación de manera adecuada.
```
//product.ts
import { Category } from "./category"

export interface Product{
  id : number,
  title: string,
  price : number,
  description : string,
  category : Category,
  images : Array<string>
}

```

```
//category.ts
export interface Category {
  id : number,
  name : string,
  image : string
}
```
Teniendo definida una estructura compleja, ahora aplicarlo al tipo de respuesta de la petición.
```
import axios from "axios";

export const API_BASE : string = 'https://api.escuelajs.co/api/v1/products';

(async () => {

   async function getProducts() : Promise< Array< Product > > {
    // const promise = axios.get< Array< Product > >( API_BASE );
    const promise = await axios.get( API_BASE );
    const data = promise.data as Array< Product >;

    return data;
  }


  const output = await getProducts();

  console.log( output );
})();

```
Ahora podemos utilizar los elementos y métodos de la respuesta del resultado de la respuesta de axios, además podemos implementar las funciones de arreglos ya que el tipo de retorno es un arreglo.

## Generics
