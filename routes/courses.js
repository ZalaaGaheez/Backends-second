const express = require('express');
   const router = express.Router();
   const { courses } = require('../data/data');

   router.get('/', (req, res) => {
     res.status(200).json({ courses });
   });

   router.get('/:id', (req, res) => {
     const id = parseInt(req.params.id);
     const course = courses.find(course => course.course_id === id);
     
     if (course) {
       res.status(200).json({ course });
     } else {
       res.status(404).json({ message: 'Course not found' });
     }
   });

   router.get('/level/:level', (req, res) => {
     const level = req.params.level;
     const filteredCourses = courses.filter(course => course.level.toLowerCase() === level.toLowerCase());
     
     if (filteredCourses.length > 0) {
       res.status(200).json({ courses: filteredCourses });
     } else {
       res.status(404).json({ message: 'No courses found for the specified level' });
     }
   });

   module.exports = router;
   