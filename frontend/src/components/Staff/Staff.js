import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Staff.css';

const Staff = () => {
  const [reports, setReports] = useState([]);
  const [editingReport, setEditingReport] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get('/api/reports');
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const handleEdit = (report) => {
    setEditingReport(report);
  };

  const handleUpdate = async (updatedReport) => {
    try {
      await axios.put(`/api/reports/${updatedReport.id}`, updatedReport);
      setEditingReport(null);
      fetchReports(); // Refresh the reports after updating
    } catch (error) {
      console.error('Error updating report:', error);
    }
  };

  const handleDelete = async (reportId) => {
    try {
      await axios.delete(`/api/reports/${reportId}`);
      fetchReports(); // Refresh the reports after deleting
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  return (
    <div className="table-container">
      <h1>Staff Of University Page</h1>
      <h2>ATK Report Submissions from user</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Photo</th>
            <th>Result</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>
                {editingReport && editingReport.id === report.id ? (
                  <input
                    type="text"
                    value={editingReport.username}
                    onChange={(e) =>
                      setEditingReport({
                        ...editingReport,
                        username: e.target.value,
                      })
                    }
                  />
                ) : (
                  report.username
                )}
              </td>
              <td>
                <img src={report.photoUrl} alt="ATK Test Photo" />
              </td>
              <td>
                {editingReport && editingReport.id === report.id ? (
                  <select
                    value={editingReport.result}
                    onChange={(e) =>
                      setEditingReport({
                        ...editingReport,
                        result: e.target.value,
                      })
                    }
                  >
                    <option value="positive">Positive</option>
                    <option value="negative">Negative</option>
                  </select>
                ) : (
                  report.result
                )}
              </td>
              <td>
                {editingReport && editingReport.id === report.id ? (
                  <>
                    <button onClick={() => handleUpdate(editingReport)}>
                      Save
                    </button>
                    <button onClick={() => setEditingReport(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(report)}>Edit</button>
                    <button onClick={() => handleDelete(report.id)}>
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

export default Staff;