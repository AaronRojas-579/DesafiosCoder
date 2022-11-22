const {faker} = require ("@faker-js/faker");
faker.locale = "es";

function generarProducto(){
    return {
        nombre: faker.name.jobDescriptor(),
        precio: faker.finance.creditCardNumber(),
        foto: faker.image.avatar(),
    }
}

const apiProductos = ()=>{
    const api = [];
    for(let i = 0 ; i < 5 ; i++){
        let newProduct = generarProducto();
        api.push(newProduct);
    }
    return api;
}

module.exports =  {apiProductos};