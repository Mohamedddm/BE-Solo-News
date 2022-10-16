const app = require("./app.js");

const { PORT = 9090 } = process.env;

app.listen(PORT, (err) => {
  if (err) throw Error("Lol it's messed up");
  console.log(`Listening on ${PORT}...`);
});
