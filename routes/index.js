
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/", (req, res) => {
  let url = "https://elearning-aueb.herokuapp.com/categories";

  fetch(url)
    .then(function (u) {
      return u.json();
    })
    .then(function (courses) {
      res.render("index", { title: "Home Page", courses });
    });
});

router.get("/courses:id", (req, res) => {
  const id = parseInt(req.query.category);

  let url =
    "https://elearning-aueb.herokuapp.com/courses/search?category=" + id;
  let url1 = "https://elearning-aueb.herokuapp.com/categories";

  var category = "";

  // Call the API
  fetch(url1)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (data) {
      // Store the category data to a variable
      category = data[id - 1].title;

      // Fetch another API
      return fetch(url);
    })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (jsondata) {
      res.render("courses", { title: "Courses Page", jsondata, category });
    })
    .catch(function (error) {
      console.warn(error);
    });
});

module.exports = router;
