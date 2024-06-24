import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { UPDATE_SUBJECT } from '../../mutations/subject';
const EditSubjectModal = ({ editModal, setEditModal, refetch, editSubject }) => {
    const [updateSubject] = useMutation(UPDATE_SUBJECT);

    const [name, setName] = useState(editSubject.name);
    const [teacherId, setTeacherId] = useState(editSubject.teacher.id);

    const handleCloseModal = () => {
        setEditModal(false);
        setName('');
    };

    const handleSave = () => {
        updateSubject({
            variables: {
                id: editSubject.id,
                name,
                teacherId: parseInt(teacherId)
            }
        }).then(() => {
            refetch()
        }).catch((error) => {
            console.log(error.message);
        })


        handleCloseModal();
    };



    return (

        <Modal show={editModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Subject</Modal.Title>
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

export default EditSubjectModal;
