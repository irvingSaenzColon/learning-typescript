import ProductHttpService from "./app/services/productHttp";
(async () => {

  const prodService = new ProductHttpService();
  const prod = await prodService.find( 178 );
  console.log( prod );
})();
