import React from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const StudentListofTeacher = ({ students, setStudents }) => {
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState(null);
  const [newName, setNewName] = React.useState('');

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setNewName(student.name);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/teachers/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(students.filter(student => student._id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:5000/api/teachers/students/${selectedStudent._id}`, {
        name: newName
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(students.map(student =>
        student._id === selectedStudent._id ? { ...student, name: newName } : student
      ));
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div>
      <h2>Student List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>
                <Button variant="info" onClick={() => handleEdit(student)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(student._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Student Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="studentName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter student name"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudentListofTeacher;
