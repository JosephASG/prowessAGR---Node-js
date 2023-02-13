//Importing the app file
import app from "./app.js";
//Importing the config file
import config from "./config.js"
//Importing the databaseMongoDB file
import "./databases/databaseMongoDB.js";
//Importing the databaseCloudinary file
import "./databases/databaseCloudinary.js";

//server listening
app.listen(config.PORT, () => {
  console.log(`Server at: http://localhost:${config.PORT}`);
});