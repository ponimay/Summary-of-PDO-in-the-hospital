/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';


import axios from 'axios';
import './index.css';

const DepartmentSummary = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        axios.get('/api/reports')
            .then(res => setReports(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DepartmentSummary;
