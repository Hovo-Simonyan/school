import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../mutations/login';
import { useNavigate } from 'react-router-dom';
export default function LoginForm({ login }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const navigate = useNavigate()
    const [loginAdmin] = useMutation(LOGIN);

    
    const handleSubmit = (event) => {
        event.preventDefault();
        loginAdmin({
            variables: {
                email,
                password,
            },
        }).then((res) => {
            login(res.data.login);
            setError('')
            navigate('/')
        }).catch((err) => {
            setError(err.message)
        })
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className='mt-3'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className='mt-4'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
            {
                error && <Alert className='mt-3' variant={'danger'}>
                    {error}
                </Alert>
            }



            <Button variant="primary" type="submit" className='mt-4'>
                Submit
            </Button>
        </Form>
    )
}
