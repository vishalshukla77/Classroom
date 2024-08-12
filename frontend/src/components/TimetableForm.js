// src/components/TimetableForm.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TimetableForm = () => {
  const [timetables, setTimetables] = useState([]);
  const [selectedTimetable, setSelectedTimetable] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Fetch the list of timetables on component mount
    const fetchTimetables = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/timetables');
        setTimetables(response.data);
      } catch (error) {
        console.error('Error fetching timetables:', error);
      }
    };

    fetchTimetables();
  }, []);

  const handleSelectTimetable = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/timetables/${id}`);
      setSelectedTimetable(response.data);
      setFormData(response.data); // Set initial form data
    } catch (error) {
      console.error('Error fetching timetable details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/timetables/${formData._id}`, formData);
      alert('Timetable updated successfully');
      // Optionally refresh the list of timetables
      const response = await axios.get('http://localhost:5000/api/timetables');
      setTimetables(response.data);
    } catch (error) {
      console.error('Error updating timetable:', error);
    }
  };

  return (
    <div>
      <h2>Edit Timetable</h2>
      <div className="mb-3">
        <label htmlFor="timetableSelect" className="form-label">Select Timetable</label>
        <select
          id="timetableSelect"
          className="form-select"
          onChange={(e) => handleSelectTimetable(e.target.value)}
        >
          <option value="">Select a timetable</option>
          {timetables.map((timetable) => (
            <option key={timetable._id} value={timetable._id}>
              {timetable.name}
            </option>
          ))}
        </select>
      </div>

      {selectedTimetable && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Timetable Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="schedule" className="form-label">Schedule</label>
            <textarea
              className="form-control"
              id="schedule"
              name="schedule"
              rows="4"
              value={formData.schedule || ''}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">Update Timetable</button>
        </form>
      )}
    </div>
  );
};

export default TimetableForm;
