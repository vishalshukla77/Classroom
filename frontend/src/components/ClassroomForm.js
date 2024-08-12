import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const ClassroomForm = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    startTime: '',
    endTime: '',
    days: '',
    teacherId: '',
    studentIds: [],
  });

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('https://classroombackend-2kdy.onrender.com/api/teachers', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await axios.get('https://classroombackend-2kdy.onrender.com/api/students', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchTeachers();
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => {
        const studentIds = [...prevData.studentIds];
        if (checked) {
          studentIds.push(value);
        } else {
          const index = studentIds.indexOf(value);
          if (index > -1) {
            studentIds.splice(index, 1);
          }
        }
        return {
          ...prevData,
          [name]: studentIds,
        };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://classroombackend-2kdy.onrender.com/api/classrooms', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 201) {
        alert('Classroom created and assigned to teacher with students');
        setFormData({
          name: '',
          startTime: '',
          endTime: '',
          days: '',
          teacherId: '',
          studentIds: [],
        });
      } else {
        alert('Classroom creation failed. Please try again.');
      }
    } catch (error) {
      console.error('Error creating classroom:', error);
      alert('Classroom creation failed. Please try again.');
    }
  };

  return (
    <Container>
      <h2 className="text-center my-4">Create Classroom</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="classroomName">
          <Form.Label column sm={3} className="text-end">
            Classroom Name:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter classroom name"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="startTime">
          <Form.Label column sm={3} className="text-end">
            Start Time:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="endTime">
          <Form.Label column sm={3} className="text-end">
            End Time:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="days">
          <Form.Label column sm={3} className="text-end">
            Days:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="days"
              value={formData.days}
              onChange={handleChange}
              placeholder="e.g., Monday, Wednesday, Friday"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="teacherId">
          <Form.Label column sm={3} className="text-end">
            Assign Teacher:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              as="select"
              name="teacherId"
              value={formData.teacherId}
              onChange={handleChange}
              required
            >
              <option value="">Select a teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="studentIds">
          <Form.Label column sm={3} className="text-end">
            Select Students:
          </Form.Label>
          <Col sm={9}>
            {students.map((student) => (
              <Form.Check
                key={student._id}
                type="checkbox"
                name="studentIds"
                value={student._id}
                label={student.name}
                checked={formData.studentIds.includes(student._id)}
                onChange={handleChange}
                className="mb-2"
              />
            ))}
          </Col>
        </Form.Group>

        <Row>
          <Col className="text-center">
            <Button variant="primary" type="submit" className="mt-3">
              Create Classroom
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ClassroomForm;
