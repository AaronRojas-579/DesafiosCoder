const express = require("express")
const {Router} = express
const routerInfo= Router()
//aplicamos compression gzip, primero la requerimos
const compression = require("compression")

//Requerimos los Loggers
const {loggerConsola,loggerWarn,loggerError} = require("../logger")

//Requerimos Fork
const {fork} = require("child_process")

//Requerimos la función de calculo para la ruta de /randoms
const calculo = require("../controllers/calculo")
//Objeto de la información del servidor
const objInfo = {
    "Cantidad de hilos de ejecució":require("os").cpus().length,
    "Argumentos de entrada":process.argv.slice(2),
    "Path de ejecución":process.argv[0],
    "Carpeta del Proyecto":process.argv[1],
    "Directorio actual de Trabajo":process.cwd(),
    "Id del proceso":process.pid,
    "Version de Node":process.version,
    "Título del proceso":process.title,
    "Sistema Operativo":process.platform,
    "Memoria Total Reservada":process.memoryUsage().rss
};

routerInfo.get("/",(req,res)=>{
    //Sin usar el logger , usando el console.log para analizarlos
    //Sincronico
    console.log(objInfo)
    res.json(objInfo)
})

routerInfo.get("/logger",(req,res)=>{
    //Sin usar el logger , usando el console.log para analizarlos
    //Asincronico
    loggerConsola.info(objInfo)
    res.json(objInfo)
})

routerInfo.get("/compression",compression(),(req,res)=>{
    //Usando el logger
    loggerConsola.info(objInfo)
    res.json(objInfo)
})


// //Desactivamos el child_process
// routerInfo.get("/api/randoms",(req,res)=>{
//     const cant = parseInt(req.query.cant)||100000000;
//     let obj = fork("./controllers/calculo.js")
//     obj.send(cant);
//     obj.on("message",mensaje=>{
//         res.json(mensaje)
//     })
// })

routerInfo.get("/api/randoms",(req,res)=>{
    const cant = parseInt(req.query.cant)||100000000;
    let obj = calculo(cant);
    res.send(obj)
})


module.exports = {routerInfo};