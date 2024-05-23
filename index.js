import "dotenv/config"
import { app } from "./server.js";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {console.log(`Server is running on http://localhost:${PORT}/`)});
