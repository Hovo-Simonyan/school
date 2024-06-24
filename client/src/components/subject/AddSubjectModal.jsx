import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { ADD_SUBJECT } from '../../mutations/subject';

const AddTeacherModal = ({ addModal, setAddModal, refetch }) => {

    const [addTeacher] = useMutation(ADD_SUBJECT);
    const [name, setName] = useState('');
    const [teacherId, setTeacherId] = useState('');

    const handleCloseModal = () => {
        setName('')
        setAddModal(false)
    };

    const handleSave = () => {
        addTeacher({
            variables: {
                name,
                teacherId: parseInt(teacherId)
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
                <Modal.Title>Add Subject</Modal.Title>
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
                    <Form.Group controlId="formName">
                        <Form.Label>Teacher Id</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={teacherId}
                            onChange={(e) => setTeacherId(e.target.value)}
                        />
                    </Form.Group>
                </Form>
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
