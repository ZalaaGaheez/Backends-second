const express = require('express');
const router = express.Router();
const { students } = require('../data/data');

// Get all students
router.get('/', (req, res) => {
  const ageRange = req.query.age ? req.query.age.split('-') : [];
  const major = req.query.major;
  
  let filteredStudents = students;

  if (ageRange.length === 2) {
    const [minAge, maxAge] = ageRange.map(Number);
    filteredStudents = filteredStudents.filter(student =>
      student.age >= minAge && student.age <= maxAge
    );
  }

  if (major) {
    filteredStudents = filteredStudents.filter(student =>
      student.major.toLowerCase() === major.toLowerCase()
    );
  }

  res.status(200).json({ students: filteredStudents });
});

// Get a student by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(student => student.student_id === id);

  if (student) {
    res.status(200).json({ student });
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

// Get students by major
router.get('/major/:major', (req, res) => {
  const major = req.params.major;
  const filteredStudents = students.filter(student => student.major.toLowerCase() === major.toLowerCase());

  if (filteredStudents.length > 0) {
    res.status(200).json({ students: filteredStudents });
  } else {
    res.status(200).json({ students: [] }); // Return an empty array
  }
});


// Create a new student
router.post('/', (req, res) => {
  const newStudent = req.body;
  newStudent.student_id = Math.max(...students.map(stu => stu.student_id)) + 1;

  students.push(newStudent);
  res.status(201).json({ student: newStudent });
});

// Update an existing student
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;
  const studentIndex = students.findIndex(stu => stu.student_id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students[studentIndex] = { ...students[studentIndex], ...updatedData };
  res.status(200).json({ student: students[studentIndex] });
});

// Delete a student
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const studentIndex = students.findIndex(stu => stu.student_id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deletedStudent = students.splice(studentIndex, 1);
  res.status(200).json({ student: deletedStudent[0] });
});

module.exports = router;