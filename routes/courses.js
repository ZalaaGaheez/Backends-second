const express = require('express');
const router = express.Router();
const { courses, students } = require('../data/data');

// Get all courses with optional filtering by tags and level
router.get('/', (req, res) => {
  const tags = req.query.tags ? req.query.tags.split(',') : [];
  const level = req.query.level;

  let filteredCourses = courses;

  if (tags.length > 0) {
    filteredCourses = filteredCourses.filter(course =>
      course.tags.some(tag => tags.includes(tag))
    );
  }

  if (level) {
    filteredCourses = filteredCourses.filter(course =>
      course.level.toLowerCase() === level.toLowerCase()
    );
  }

  res.status(200).json({ courses: filteredCourses });
});

// Get a course by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const course = courses.find(course => course.course_id === id);

  if (course) {
    res.status(200).json({ course });
  } else {
    res.status(404).json({ message: `Invalid course id: ${id}` });
  }
});

// Get courses by level
router.get('/level/:level', (req, res) => {
  const level = req.params.level;
  const filteredCourses = courses.filter(course => course.level.toLowerCase() === level.toLowerCase());

  if (filteredCourses.length > 0) {
    res.status(200).json({ courses: filteredCourses });
  } else {
    res.status(200).json({ courses: [] }); // Return an empty array
  }
});

// Get instructors for a specific course
router.get('/:id/instructors', (req, res) => {
  const id = parseInt(req.params.id);
  const course = courses.find(course => course.course_id === id);

  if (course) {
    res.status(200).json({ instructors: course.instructors });
  } else {
    res.status(404).json({ message: `Invalid course id: ${id}` });
  }
});

// Get students for a specific course
router.get('/:id/students', (req, res) => {
  const id = parseInt(req.params.id);
  const course = courses.find(course => course.course_id === id);

  if (course) {
    const studentsInCourse = students.filter(student =>
      student.courses.includes(course.course_name)
    );
    res.status(200).json({ students: studentsInCourse });
  } else {
    res.status(404).json({ message: `Invalid course id: ${id}` });
  }
});

module.exports = router;