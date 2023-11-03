import { app } from "./app.js";
import { dbconnect } from "./db/database.js";

dbconnect()



app.listen(process.env.PORT, () => {
    console.log(`Server is running  on port: ${process.env.PORT} in ${process.env.NODE_ENV} Mode`);
})