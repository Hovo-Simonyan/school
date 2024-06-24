import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import AddPupilModal from './AddPupilModal'
import EditPupilModal from './EditPupilModal';
import { GET_ALL_PUPILS } from '../../query/pupil';
import { DELETE_PUPIL } from '../../mutations/pupil';
function Subjects() {
    const [sortBy, setSortBy] = useState('');
    const { data, refetch } = useQuery(GET_ALL_PUPILS, {
        variables: { sortBy }
    })
    const [deletePupil] = useMutation(DELETE_PUPIL);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editPupil, setEditPupil] = useState({});


    const handleDelete = (id) => {
        deletePupil({
            variables: {
                id
            }
        }).then(() => {
            refetch()
        }).catch((error) => {
            console.log(error);
        })
    };

    const toggleSort = ()=> {
        if(sortBy === 'asc'){
            setSortBy('desc')
        } else {
            setSortBy('asc')
        }
    }

    return (
        <div>
            <h2>Pupils</h2>
            <Button variant="primary" onClick={() => setAddModal(true)}>
                Add Pupil
            </Button>
            <Table striped bordered hover className='mt-3'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th className='sort' onClick={toggleSort}>Grade {sortBy === 'asc' ? <>&#8595;</> :  <>&#8593;</>}  </th>
                        <th>Subjects</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.pupils.map((pupil, index) => (
                        <tr key={index}>
                            <td>{pupil.id}</td>
                            <td>{pupil.name}</td>
                            <td>{pupil.grade}</td>
                            <td>{pupil.subjects.map((subject) => (
                                <p key={subject.id}>{subject.name}</p>
                            ))}</td>
                            <td>
                                <Button variant="warning" onClick={() => {
                                    setEditPupil(pupil)
                                    setEditModal(true)
                                }}>
                                    Edit
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(pupil.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {addModal && <AddPupilModal refetch={refetch} addModal={addModal} setAddModal={setAddModal} />}
            {editModal && <EditPupilModal refetch={refetch} editModal={editModal} setEditModal={setEditModal} editPupil={editPupil} />}

        </div>
    );
};

export default Subjects;
