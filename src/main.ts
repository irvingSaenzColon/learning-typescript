import { SimpleDate } from "./encapsulamiento/private";


const myDate = new SimpleDate(1999, 4, 28);

console.log( myDate.date() );
console.log( myDate.isLeapYear ? 'Esta fecha fue año biciesto' : 'Esta fecha no fue año biciesto' );


const myDate2 = new SimpleDate(2000, 4, 28);

console.log( myDate2.date() );
console.log( myDate2.isLeapYear ? 'Esta fecha fue año biciesto' : 'Esta fecha no fue año biciesto' );

const myDate3 = new SimpleDate(2001, 4, 28);

console.log( myDate3.date() );
console.log( myDate3.isLeapYear ? 'Esta fecha fue año biciesto' : 'Esta fecha no fue año biciesto' );

const myDate4 = new SimpleDate(2004, 4, 28);

console.log( myDate4.date() );
console.log( myDate4.isLeapYear ? 'Esta fecha fue año biciesto' : 'Esta fecha no fue año biciesto' );
