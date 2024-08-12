// src/pages/PrincipalDashboard.js
import React, { useState } from 'react';
import { Tab, Tabs, Container } from 'react-bootstrap';
import TeacherList from '../components/TeacherList';
import StudentList from '../components/StudentList';
import ClassroomForm from '../components/ClassroomForm';
import TimetableForm from '../components/TimetableForm';
import CreateuserByPrincipal from'../components/CreateuserByPrincipal';

const PrincipalDashboard = () => {
  const [activeKey, setActiveKey] = useState('teachers');

  return (
    <Container>
      <h1 className="my-4">Principal Dashboard</h1>
      <Tabs
        id="dashboard-tabs"
        activeKey={activeKey}
        onSelect={(k) => setActiveKey(k)}
        className="mb-3"
      >
        <Tab eventKey="teachers" title="Teachers">
          <TeacherList />
        </Tab>
        <Tab eventKey="students" title="Students">
          <StudentList />
        </Tab>
        <Tab eventKey="classrooms" title="Classrooms">
          <ClassroomForm />
        </Tab>
        { /* Optional Tab for Timetables */ }
        <Tab eventKey="timetables" title="Timetables">
          <TimetableForm />
        </Tab>
        <Tab eventKey="createuserbyprincipal" title="Create New User">
          <CreateuserByPrincipal />
        </Tab>

      </Tabs>
    </Container>
  );
};

export default PrincipalDashboard;
