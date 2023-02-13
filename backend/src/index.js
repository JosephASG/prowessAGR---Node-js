import app from "./app.js";
import config from "./config.js"
import "./databases/databaseMongoDB.js";
import "./databases/databaseCloudinary.js";

//server listening
app.listen(config.PORT, () => {
  console.log(`Server at: http://localhost:${config.PORT}`);
});
