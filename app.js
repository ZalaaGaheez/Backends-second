const express = require('express');
const app = express();
const PORT = 3000;

const coursesRoutes = require('./routes/courses');
const studentsRoutes = require('./routes/students');
const instructorsRoutes = require('./routes/instructors');

app.use(express.json()); 
app.use('/courses', coursesRoutes);
app.use('/students', studentsRoutes);
app.use('/instructors', instructorsRoutes);

app.listen(PORT, (error) => {
  if (!error)
    console.log("Server is Successfully Running, and App is listening on port " + PORT);
  else console.log("Error occurred, server can't start", error);

});

