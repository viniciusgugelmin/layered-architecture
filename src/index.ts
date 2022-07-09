import app from "./app/app.js";
import "./app/setup.js";

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`);
});
