export abstract class Art{
    constructor(
        protected author : string,
        protected type : string,
        protected createdAt : Date,
    ){}

}

export class Paint extends Art {
    constructor(
        author : string,
        type : string,
        createdAt : Date
    ){
        super( author, type, createdAt );
    }
}