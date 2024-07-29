const express = require('express');
const router = express.Router();
const { instructors, courses } = require('../data/data');

// Get all instructors with optional name filtering
router.get('/', (req, res) => {
  const departments = req.query.department ? req.query.department.split(',') : [];
  const nameFilter = req.query.name ? req.query.name.split(",") : null;

  let filteredInstructors = instructors;

  if (departments.length > 0) {
    filteredInstructors = filteredInstructors.filter(instructor =>
      departments.includes(instructor.department.toLowerCase())
    );
  }

  if (nameFilter) {
    filteredInstructors = filteredInstructors.filter(instructor =>
      nameFilter.some(name => instructor.name.toLowerCase().includes(name.toLowerCase()))
    );
  }

  res.status(200).json({ instructors: filteredInstructors });
});

// Get instructor by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const instructor = instructors.find(inst => inst.instructor_id == id);

  if (instructor) {
    res.status(200).json({ instructor });
  } else {
    res.status(404).json({ message: "Instructor not found" });
  }
});

// Get courses taught by a specific instructor
router.get('/:id/courses', (req, res) => {
  const id = req.params.id;
  const instructor = instructors.find(inst => inst.instructor_id == id);

  if (instructor) {
    const existingCourses = courses.filter(course =>
      course.instructors.includes(instructor.name)
    );
    res.status(200).json({ courses: existingCourses });
  } else {
    res.status(404).json({ message: "Instructor not found" });
  }
});

// Get a specific course taught by a specific instructor
router.get('/:id/courses/:courseId', (req, res) => {
  const id = req.params.id;
  const courseId = req.params.courseId;
  const instructor = instructors.find(inst => inst.instructor_id == id);

  if (instructor) {
    const existingCourses = courses.filter(course =>
      course.instructors.includes(instructor.name)
    );

    const course = existingCourses.find(course => course.course_id == courseId);

    if (course) {
      res.status(200).json({ course });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } else {
    res.status(404).json({ message: "Instructor not found" });
  }
});

module.exports = router;
  