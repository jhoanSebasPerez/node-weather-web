const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Path to serve up static and templates
const pathPublicDir = path.join(__dirname, "../public");
const pathViewDir = path.join(__dirname, "../templates/views");
const pathPartialsDir = path.join(__dirname, "../templates/partials");

//Setup config templates
app.set("view engine", "hbs");
app.set("views", pathViewDir);

hbs.registerPartials(pathPartialsDir);

//Setup static directory to serve
app.use(express.static(pathPublicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Jhoan Perez",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "John Doe",
  });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help page", name: "Jhoan Perez" });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: "You must provide address",
    });
  }

  geocode(address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    const { longitud, latitud, place } = data;
    forecast(latitud, longitud, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      return res.send({
        forecast: forecastData,
        place,
        address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", { error: "Help article not found" });
});

app.get("*", (req, res) => {
  res.render("404", { error: "Page not found" });
});

app.listen(4000, () => {
  console.log("Server is up and running in 3000 port");
});
