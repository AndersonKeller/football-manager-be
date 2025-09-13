import app from "./app";
import { AppDataSource } from "./data-source";
// import { http } from "./socket";
import { Pool } from "pg";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");
    app.listen(process.env.PORT, () => {
      console.log("Server is running!");
    });
    // http.listen(3131, () => {
    //   console.log("Socket running in 3131");
    // });
  })
  .catch((err) => {
    console.log(err);
  });
