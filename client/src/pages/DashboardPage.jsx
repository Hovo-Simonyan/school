import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Teachers from '../components/teacher/Teachers';
import Subjects from '../components/subject/Subject';
import Pupils from '../components/pupil/Pupil';
import { useAuth } from './../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { currentAdmin, logout } = useAuth();
  if (!currentAdmin) {
    return <Navigate to='/login' />
  }
  return (
    <Container>
      <Row className='mb-5'>
        <Col>
          <h1>Admin Dashboard</h1>
          <p>{currentAdmin.email}</p>
          <Button variant="danger" onClick={logout}>Logout</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Teachers />
        </Col>
      </Row>
      <Row>
        <Col>
          <Subjects />
        </Col>
      </Row>
      <Row>
        <Col>
          <Pupils />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;