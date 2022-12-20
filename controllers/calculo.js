const calculo = (cant)=>{
    let obj={};
    for(let i = 0;i<cant;i++){
        let num = Math.floor(Math.random() * 1000 + 1 );
        if(obj[num]){
            obj[num] += 1
        }else{
            obj[num]=1
        }
    }
    return obj;
}
process.on("message",(mensajePadre)=>{
    process.send(calculo(mensajePadre))
})

module.exports = calculo

//objeto[clave] esto devuelve el valor, semejante al objeto.clave, en el caso de no tener nada retorna un undefind 
//este tambien sirve para definir nuevo elementos del objeto, la particularidad de este metodo es que se los guarda con el valor de la variable [clave]