require("dotenv").config();
const app = require("./app/app")
const { connect } = require("mongoose");
const { MONGO_URL, PORT } = require("./config");

connect(MONGO_URL);

app.listen(process.env.PORT || 8080,() => {
    
    console.log(`Server is up on port ${PORT}`);
});
