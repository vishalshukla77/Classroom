import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [editTeacherId, setEditTeacherId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('https://classroombackend-2kdy.onrender.com/api/teachers', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  const handleEditClick = (teacher) => {
    setEditTeacherId(teacher._id);
    setEditFormData({ name: teacher.name, email: teacher.email });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditSave = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/teachers/${id}`,
        editFormData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setTeachers((prevTeachers) =>
        prevTeachers.map((teacher) =>
          teacher._id === id ? response.data : teacher
        )
      );
      setEditTeacherId(null);
    } catch (error) {
      console.error('Error updating teacher:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://classroombackend-2kdy.onrender.com/api/teachers/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTeachers((prevTeachers) =>
        prevTeachers.filter((teacher) => teacher._id !== id)
      );
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  return (
    <div>
      <h2>Teacher List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher._id}>
              <td>
                {editTeacherId === teacher._id ? (
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                  />
                ) : (
                  teacher.name
                )}
              </td>
              <td>
                {editTeacherId === teacher._id ? (
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditChange}
                  />
                ) : (
                  teacher.email
                )}
              </td>
              <td>
                {editTeacherId === teacher._id ? (
                  <button
                    className="btn btn-success"
                    onClick={() => handleEditSave(teacher._id)}
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => handleEditClick(teacher)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(teacher._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherList;
