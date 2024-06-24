import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import { ADD_TEACHER } from '../../mutations/teacher';

const AddTeacherModal = ({ addModal, setAddModal, refetch }) => {

    const [addTeacher] = useMutation(ADD_TEACHER);
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleCloseModal = () => {
        setName('')
        setAddModal(false)
    };

    const handleSave = () => {

        if (!name) {
            return setError('Name is required')
        }

        addTeacher({
            variables: {
                name
            }
        }).then(() => {
            refetch()
        }).catch((error) => {
            console.log(error);
        })
        handleCloseModal();
    }




    return (
        <Modal show={addModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add Teacher</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                </Form>
                {
                    error && <Alert className='mt-3' variant={'danger'}>
                        {error}
                    </Alert>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddTeacherModal;
