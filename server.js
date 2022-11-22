const app = require("./app")
require("dotenv").config()

const PORT = process.env.PORT||3300;
app.listen(PORT,()=>{
    console.log(`Server listen on PORT ${PORT}`)
})