import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const Timetable = ({ timetable, setTimetable, classroomId }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [subject, setSubject] = useState('');

  const handleCreateTimetable = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`http://localhost:5000/api/teachers/timetable/${classroomId}`, {
        day,
        startTime,
        endTime,
        subject
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTimetable([...timetable, { day, startTime, endTime, subject }]);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating timetable:', error);
    }
  };

  return (
    <div>
      <h2>Timetable</h2>
      <Button variant="primary" onClick={() => setShowCreateModal(true)}>Create Timetable</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Day</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          {timetable.map((entry, index) => (
            <tr key={index}>
              <td>{entry.day}</td>
              <td>{entry.startTime}</td>
              <td>{entry.endTime}</td>
              <td>{entry.subject}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Create Timetable Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Timetable</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="day">
              <Form.Label>Day</Form.Label>
              <Form.Control
                type="text"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="Enter day"
              />
            </Form.Group>
            <Form.Group controlId="startTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="endTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateTimetable}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Timetable;
