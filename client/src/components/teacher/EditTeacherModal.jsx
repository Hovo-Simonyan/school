import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import { UPDATE_TEACHER } from '../../mutations/teacher';
const EditTeacherModal = ({ editModal, setEditModal, refetch, editTeacher }) => {
  const [updateTeacher] = useMutation(UPDATE_TEACHER);
  const [error, setError] = useState('');

  const [name, setName] = useState(editTeacher.name);

  const handleCloseModal = () => {
    setEditModal(false);
    setName('');
  };

  const handleSave = () => {
    if (!name) {
      return setError('Name is required')
    }

    updateTeacher({
      variables: {
        id: editTeacher.id,
        name
      }
    }).then(() => {
      refetch()
    }).catch((error) => {
      console.log(error);
    })


    handleCloseModal();
  };



  return (

    <Modal show={editModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Teacher</Modal.Title>
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

export default EditTeacherModal;
