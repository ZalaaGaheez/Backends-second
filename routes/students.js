const express = require('express');
const router = express.Router();
const { students } = require('../data/data');

router.get('/', (req, res) => {
  res.status(200).json({ students });
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(student => student.student_id === id);
  
  if (student) {
    res.status(200).json({ student });
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

router.get('/major/:major', (req, res) => {
  const major = req.params.major;
  const filteredStudents = students.filter(student => student.major.toLowerCase() === major.toLowerCase());
  
  if (filteredStudents.length > 0) {
    res.status(200).json({ students: filteredStudents });
  } else {
    res.status(404).json({ message: 'No students found for the specified major' });
  }
});

module.exports = router;
