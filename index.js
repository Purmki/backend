const {app, server} = require("./app")
const mongoose = require("mongoose")
const {config} = require("./config")



mongoose.connect(config.MONGO_URL)
.then(()=>{
  console.log("connected to db")
}).catch(error=>{
  console.log(error)
})
const PORT = process.env.PORT || 1006;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});