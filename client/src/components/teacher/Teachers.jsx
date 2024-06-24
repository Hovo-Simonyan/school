import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { GET_ALL_TEACHERS } from '../../query/teacher';
import { DELETE_TEACHER } from '../../mutations/teacher';
import AddTeacherModal from './AddTeacherModal'
import EditTeacherModal from './EditTeacherModal';
import { GET_ALL_SUBJECTS } from '../../query/subject';
function Teachers() {
  const { refetch: subjectsRefetch } = useQuery(GET_ALL_SUBJECTS);
  const { data, refetch } = useQuery(GET_ALL_TEACHERS)
  const [deleteTeacher] = useMutation(DELETE_TEACHER);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editTeacher, setEditTeacher] = useState({});

  const handleDelete = (id) => {
    deleteTeacher({
      variables: {
        id
      }
    }).then(() => {
      refetch()
      subjectsRefetch()
    }).catch((error) => {
      console.log(error);
    })
  };

  return (
    <div>
      <h2>Teachers</h2>
      <Button variant="primary" onClick={() => setAddModal(true)}>
        Add Teacher
      </Button>
      <Table striped bordered hover className='mt-3'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {data?.teachers.map((teacher, index) => (
            <tr key={index}>
              <td>{teacher.id}</td>
              <td>{teacher.name}</td>
              <td>
                <Button variant="warning" onClick={() => {
                  setEditTeacher(teacher)
                  setEditModal(true)
                }}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(teacher.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {addModal && <AddTeacherModal refetch={refetch} addModal={addModal} setAddModal={setAddModal} />}
      {editModal && <EditTeacherModal refetch={refetch} editModal={editModal} setEditModal={setEditModal} editTeacher={editTeacher} />}

    </div>
  );
};

export default Teachers;
