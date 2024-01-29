export interface DatabaseDriver {
  database : string;
  password : string;
  port : number;
}

class PostgressDriver implements DatabaseDriver {

  constructor(
    public database : string,
    public password : string,
    public port : number
  ){}
}
