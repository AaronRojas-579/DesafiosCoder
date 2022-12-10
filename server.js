const app = require("./app")
require("dotenv").config()
const cluster = require("cluster")

const modo = process.argv.slice(2)[1] || "FORK"

const PORT = (process.argv.slice(2))[0]||8080;

if(modo == "CLUSTER" && cluster.isPrimary){
    const numCPUs = require("os").cpus().length
    console.log(`Numero de procesadores ${numCPUs}`)
    console.log(`PID MASTER ${process.pid}`)
    for(let i = 0; i < numCPUs ; i++){
        cluster.fork()
    }
    cluster.on("exit",worker=>{
        console.log(`Worker `, worker.process.pid, ` died`, new Date().toLocaleString())
    })
}else{
    try{
        app.listen(PORT,()=>{
            console.log(`Server listen on port ${PORT}`)
        })
        console.log(`Worker ${process.pid} started`)
    }catch(error){
        console.log(error)
    }
}

app.get("/datos",(req,res)=>{
    res.send(`Servidor Express - PORT ${PORT} - PID ${process.pid} - Fecha: ${new Date().toLocaleString()}` )
})