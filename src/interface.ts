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
