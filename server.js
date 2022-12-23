const app = require("./app")
require("dotenv").config()
const cluster = require("cluster")

const modo = process.argv.slice(2)[1] || "FORK"

//Requerimos dotenv para acceder a las variables de entorno
require("dotenv").config()
const PORT = process.env.PORT||8080;

//Requerimos los Loggers
const {loggerConsola,loggerWarn,loggerError} = require("./logger")

if(modo == "CLUSTER" && cluster.isPrimary){
    const numCPUs = require("os").cpus().length
    loggerConsola.info(`Numero de procesadores ${numCPUs}`)
    loggerConsola.info(`PID MASTER ${process.pid}`)
    for(let i = 0; i < numCPUs ; i++){
        cluster.fork()
    }
    cluster.on("exit",worker=>{
        loggerConsola.info(`Worker `, worker.process.pid, ` died`, new Date().toLocaleString())
    })
}else{
    try{
        app.listen(PORT,()=>{
            loggerConsola.info(`Server listen on port ${PORT}`)
        })
        loggerConsola.info(`Worker ${process.pid} started`)
    }catch(error){
        loggerError.error(error)
    }
}

app.get("/datos",(req,res)=>{
    res.send(`Servidor Express - PORT ${PORT} - PID ${process.pid} - Fecha: ${new Date().toLocaleString()}` )
})