import { app } from "./app";

// use definition port
const port = process.env.PORT || 3333;

// init server
app.listen(port, () => console.log(`🚀 Server is running! - 🛂 :${port}`));