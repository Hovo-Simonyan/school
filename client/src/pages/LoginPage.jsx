import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from './../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

function LoginPage() {

    const { currentAdmin, login } = useAuth();

    if (currentAdmin) {
        return <Navigate to='/' />
    }

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row className="justify-content-center w-75">
                <Col md={4}>
                    <h2 className='text-center'>Login</h2>
                    <LoginForm login={login} />
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;