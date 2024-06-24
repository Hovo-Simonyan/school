import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { UPDATE_PUPIL } from '../../mutations/pupil';
const EditSubjectModal = ({ editModal, setEditModal, refetch, editPupil }) => {
    const [updateSubject] = useMutation(UPDATE_PUPIL);

    const [name, setName] = useState(editPupil.name);
    const [grade, setGrade] = useState(editPupil.grade);
    const [subjectIds, setSubjectIds] = useState(editPupil.subjects.map((subject) => subject.id).join(', '));

    const handleCloseModal = () => {
        setEditModal(false);
    };

    const handleSave = () => {
        updateSubject({
            variables: {
                id: editPupil.id,
                name,
                grade: parseInt(grade),
                subjectIds: subjectIds.split(',').map((item)=> parseInt(item))
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

export default EditSubjectModal;
