import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { ADD_PUPIL } from './../../mutations/pupil';

const AddTeacherModal = ({ addModal, setAddModal, refetch }) => {

    const [addTeacher] = useMutation(ADD_PUPIL);
    const [name, setName] = useState('');
    const [grade, setGrade] = useState('');
    const [subjectIds, setSubjectIds] = useState('');

    const handleCloseModal = () => {
        setAddModal(false)
    };

    const handleSave = () => {
        addTeacher({
            variables: {
                name,
                grade: parseFloat(grade),
                subjectIds: subjectIds.split(',').map((item)=> parseInt(item))
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
                        <Form.Label>Grade</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formName">
                        <Form.Label>Subjects IDs</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={subjectIds}
                            onChange={(e) => setSubjectIds(e.target.value)}
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
