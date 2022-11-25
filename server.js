const app = require("./app")
require("dotenv").config()

const PORT = (process.argv.slice(2))[0]||8080;
app.listen(PORT,()=>{
    console.log(`Server listen on PORT ${PORT}`)
})