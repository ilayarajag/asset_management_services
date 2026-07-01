const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const { sequelize } = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "jade");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

app.get("/", require("./controllers/homeController").dashboard);

app.use("/employees", require("./routes/employee.routes"));
app.use("/assets", require("./routes/asset.routes"));
app.use("/categories", require("./routes/category.routes"));
app.use("/issues", require("./routes/issue.routes"));
app.use("/returns", require("./routes/return.routes"));
app.use("/stock", require("./routes/stock.routes"));
app.use("/history", require("./routes/history.routes"));
app.use("/scrap", require("./routes/scrap.routes"));

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => console.log(`Asset management app running on port ${PORT}`));
}).catch((error) => {
  console.error( error);
  process.exit(1);
});
