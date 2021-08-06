// // ℹ️ Gets access to environment variables/settings
// // https://www.npmjs.com/package/dotenv
// require("dotenv/config");

// // ℹ️ Connects to the database
// require("./db");

// // Handles http requests (express is node js framework)
// // https://www.npmjs.com/package/express
// const express = require("express");

// //require express session
// const session = require("express-session");





// // Handles the handlebars
// // https://www.npmjs.com/package/hbs
// const hbs = require("hbs");

// const app = express();

// // ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
// require("./config")(app);

// // default value for title local
// const projectName = "project-management-server";
// const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

// app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// // 👇 Start handling routes here
// const index = require("./routes/index");
// app.use("/", index);

// //It's good practice to prefix with /api here, to show the user things are coming from an API
// const project = require("./routes/project-routes");
// app.use("/api", project);

// // ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
// require("./error-handling")(app);

// const auth = require("./(routes/auth-routes");
// app.use("/api", auth);

// //Re-using this line of code from module2 in the bootcamp
// app.use(
//     session({
//         resave: true,                       //terminal showed resave was depreciated, so we put them in here...
//         saveUninitialized: true,            //terminal showed resave was depreciated, so we put them in here...
//         secret: process.env.SESSION_SECRET, //secret is a line of text the session needs to encrypt
//         cookie: {                           //cookie = object that is stored on the browser
//             sameSite: true,                 //we set this to true becuase front-end and backe-end both run on the same localhost
//             httpOnly: true,                 //also true, because we are not using https
//             maxAge: 6000000,                //specifying how long the session will last in miliseconds
//         },
//         rolling: true,                      //means that if we do something on the site, the maxAge starts counting from 0 again                      
//         }),
// );

// module.exports = app;

// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars

// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware

require("./config")(app);

const session = require("express-session");


app.set("trust proxy", 1); //this is a Heroku requirement
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
      sameSite: "none", //frontend backend both run on localhost, changes as we deploy
      httpOnly: false, //we are not using https, changes to false as we deploy
      secure: true, //this one we added when we deploy
      maxAge: 60000, //session time
    },
    rolling: true,
  })
);
// default value for title local
const projectName = "project-management-server";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();
app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const project = require("./routes/project-routes");
app.use("/api", project);

const auth = require("./routes/auth-routes");
app.use("/api", auth);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);
module.exports = app;
