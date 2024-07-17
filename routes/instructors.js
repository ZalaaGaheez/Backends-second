const express = require('express');
   const router = express.Router();
   const { instructors, courses } = require('../data/data');

   router.get('/', (req, res) => {
     const nameFilter = req.query.name ? req.query.name.split(",") : null;
     const filteredInstructors = [];
     instructors.map((instructor) => {
       if (nameFilter) {
         for (let name of nameFilter) {
           if (instructor.name.toLowerCase().includes(name.toLowerCase())) {
             filteredInstructors.push(instructor);
           }
         }
       } else {
         filteredInstructors.push(instructor);
       }
     });
     res.status(200).json({ instructors: filteredInstructors });
   });

   router.get('/:id', (req, res) => {
     const id = req.params.id;
     const instructor = instructors.find((inst) => inst.instructor_id == id);

     if (instructor) {
       res.status(200).json({ instructor: instructor });
     } else {
       res.status(404).json({ message: "Instructor not found" });
    }
  });

  router.get('/:id/courses', (req, res) => {
    const id = req.params.id;
    const instructor = instructors.find((inst) => inst.instructor_id == id);
    if (instructor) {
      const existingCourses = courses.filter((course) => {
        return course.instructors.includes(instructor.name);
      });
      res.status(200).json({ courses: existingCourses });
    } else {
      res.status(404).json({ message: "Instructor not found" });
    }
  });

  router.get('/:id/courses/:courseId', (req, res) => {
    const id = req.params.id;
    const courseId = req.params.courseId;
    const instructor = instructors.find((inst) => inst.instructor_id == id);

    if (instructor) {
      const existingCourses = courses.filter((course) =>
        course.instructors.includes(instructor.name)
      );

      const course = existingCourses.find(
        (course) => course.course_id == courseId
      );

      if (course) {
        res.status(200).json({ course: course });
      } else {
        res.status(404).json({ message: "Course not found" });
      }
    } else {
      res.status(404).json({ message: "Instructor not found" });
    }
  });

  module.exports = router;
  