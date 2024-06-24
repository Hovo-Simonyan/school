import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import AddSubjectModal from './AddSubjectModal'
import EditSubjectModal from './EditSubjectModal';
import { GET_ALL_SUBJECTS } from '../../query/subject';
import { DELETE_SUBJECT } from '../../mutations/subject';
function Subjects() {
    const { data, refetch } = useQuery(GET_ALL_SUBJECTS)
    const [deleteSubject] = useMutation(DELETE_SUBJECT);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editSubject, setEditSubject] = useState({});

    const handleDelete = (id) => {
        deleteSubject({
            variables: {
                id
            }
        }).then(() => {
            refetch()
        }).catch((error) => {
            console.log(error);
        })
    };

    return (
        <div>
            <h2>Subjects</h2>
            <Button variant="primary" onClick={() => setAddModal(true)}>
                Add Subject
            </Button>
            <Table striped bordered hover className='mt-3'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Teacher Name</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.subjects.map((subject, index) => (
                        <tr key={index}>
                            <td>{subject.id}</td>
                            <td>{subject.name}</td>
                            <td>{subject.teacher.name}</td>
                            <td>
                                <Button variant="warning" onClick={() => {
                                    setEditSubject(subject)
                                    setEditModal(true)
                                }}>
                                    Edit
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(subject.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {addModal && <AddSubjectModal refetch={refetch} addModal={addModal} setAddModal={setAddModal} />}
            {editModal && <EditSubjectModal refetch={refetch} editModal={editModal} setEditModal={setEditModal} editSubject={editSubject} />}

        </div>
    );
};

export default Subjects;
