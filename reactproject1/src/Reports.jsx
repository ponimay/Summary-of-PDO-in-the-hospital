
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import axios from 'axios';

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [editingReport, setEditingReport] = useState(null);
    const [newReport, setNewReport] = useState({
        DepartmentName: '',
        PreviousDayCount: '',
        Admissions: '',
        Hospitalizations: '',
        Refusals: '',
        Discharges: '',
        Deaths: '',
        CurrentDayCount: '',
        ReportDateFrom: '',
        ReportDateTo: ''
    });

    useEffect(() => {
        axios.get('/api/reports')
            .then(res => setReports(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewReport(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingReport(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const addReport = (e) => {
        e.preventDefault();
        axios.post('/api/reports', newReport)
            .then(res => {
                setReports([...reports, res.data]);
                setNewReport({
                    DepartmentName: '',
                    PreviousDayCount: '',
                    Admissions: '',
                    Hospitalizations: '',
                    Refusals: '',
                    Discharges: '',
                    Deaths: '',
                    CurrentDayCount: '',
                    ReportDateFrom: '',
                    ReportDateTo: ''
                });
            })
            .catch(err => console.log(err));
    };
    const deleteReport = (id) => {
        axios.delete(`/api/reports/${id}`)
            .then(() => {
                setReports(reports.filter(report => report._id !== id));
            })
            .catch(err => console.log(err));
    };

    const editReport = (id) => {
        axios.put(`/api/reports/${id}`, editingReport)
            .then(res => {
                const updatedReports = reports.map(report =>
                    report._id === id ? res.data : report
                );
                setReports(updatedReports);
                setEditingReport(null);
            })
            .catch(err => console.log(err));
    };


    return (
        <div className="container">
            <h2>Summary of the movement of patients in the emergency department</h2>
            {reports.length > 0 && (
                <p>for the period from {new Date(reports[0].ReportDateFrom).toLocaleString()} to {new Date(reports[0].ReportDateTo).toLocaleString()}</p>
            )}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Department </th>
                        <th>It consisted at 07:00 before. of the day</th>
                        <th>Im turning</th>
                        <th>Hospitalization in the department</th>
                        <th>Refusals</th>
                        <th>Discharged</th>
                        <th>Died</th>
                        <th>Consists at 07:00 of the current day</th>
                        <th>Moved</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map(report => (
                        <tr key={report._id}>
                            <td>{report.DepartmentName}</td>
                            <td>{report.PreviousDayCount}</td>
                            <td>{report.Admissions}</td>
                            <td>{report.Hospitalizations}</td>
                            <td>{report.Refusals}</td>
                            <td>{report.Discharges}</td>
                            <td>{report.Deaths}</td>
                            <td>{report.CurrentDayCount}</td>
                            <td>
                                <button onClick={() => setEditingReport(report)}>Edit</button>
                                <button onClick={() => deleteReport(report._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Add a new report</h3>
            <form onSubmit={addReport}>
                <input type="text" name="DepartmentName" placeholder="Department " value={newReport.DepartmentName} onChange={handleChange} required />
                <input type="number" name="PreviousDayCount" placeholder="It consisted at 07:00 before. of the day" value={newReport.PreviousDayCount} onChange={handleChange} required />
                <input type="number" name="Admissions" placeholder="I'm turning" value={newReport.Admissions} onChange={handleChange} required />
                <input type="number" name="Hospitalizations" placeholder="Hospitalization in the department" value={newReport.Hospitalizations} onChange={handleChange} required />
                <input type="number" name="Refusals" placeholder="Refusals" value={newReport.Refusals} onChange={handleChange} required />
                <input type="number" name="Discharges" placeholder="Discharged" value={newReport.Discharges} onChange={handleChange} required />
                <input type="number" name="Deaths" placeholder="Died" value={newReport.Deaths} onChange={handleChange} required />
                <input type="number" name="CurrentDayCount" placeholder="Consists at 07:00 of the current day" value={newReport.CurrentDayCount} onChange={handleChange} required />
                <input type="date" name="ReportDateFrom" placeholder="Date Start" value={newReport.ReportDateFrom} onChange={handleChange} required />
                <input type="date" name="ReportDateTo" placeholder="Date End" value={newReport.ReportDateTo} onChange={handleChange} required />
                <button type="submit">Add</button>
            </form>

            {editingReport && (
                <div>
                    <h3>Edit the report</h3>
                    <form onSubmit={(e) => { e.preventDefault(); editReport(editingReport._id); }}>
                        <input type="text" name="DepartmentName" placeholder="Department " value={editingReport.DepartmentName} onChange={handleEditChange} required />
                        <input type="number" name="PreviousDayCount" placeholder="It consisted at 07:00 before. of the day" value={editingReport.PreviousDayCount} onChange={handleEditChange} required />
                        <input type="number" name="Admissions" placeholder="I'm turning" value={editingReport.Admissions} onChange={handleEditChange} required />
                        <input type="number" name="Hospitalizations" placeholder="Hospitalization in the department" value={editingReport.Hospitalizations} onChange={handleEditChange} required />
                        <input type="number" name="Refusals" placeholder="Refusals" value={editingReport.Refusals} onChange={handleEditChange} required />
                        <input type="number" name="Discharges" placeholder="Discharged" value={editingReport.Discharges} onChange={handleEditChange} required />
                        <input type="number" name="Deaths" placeholder="Died" value={editingReport.Deaths} onChange={handleEditChange} required />
                        <input type="number" name="CurrentDayCount" placeholder="Consists at 07:00 of the current day" value={editingReport.CurrentDayCount} onChange={handleEditChange} required />
                        <input type="date" name="ReportDateFrom" placeholder="Date Start" value={editingReport.ReportDateFrom} onChange={handleEditChange} required />
                        <input type="date" name="ReportDateTo" placeholder="Date End" value={editingReport.ReportDateTo} onChange={handleEditChange} required />
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setEditingReport(null)}>Cancel</button>
                    </form>
                </div>
            )}
            <footer className="footer reports-footer">
                <p>&copy; {new Date().getFullYear()} Created by n1katio</p>
            </footer>

        </div>
    );
}

export default Reports;
