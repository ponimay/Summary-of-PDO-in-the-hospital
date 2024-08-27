
import PropTypes from 'prop-types';
import './index.css';

const ReportForm = ({ report, onChange, onSubmit, onCancel }) => {
    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="DepartmentName" placeholder="Department " value={report.DepartmentName} onChange={onChange} required />
            <input type="number" name="PreviousDayCount" placeholder="It consisted at 07:00 before. of the day" value={report.PreviousDayCount} onChange={onChange} required />
            <input type="number" name="Admissions" placeholder="I'm turning" value={report.Admissions} onChange={onChange} required />
            <input type="number" name="Hospitalizations" placeholder="Hospitalization in the department" value={report.Hospitalizations} onChange={onChange} required />
            <input type="number" name="Refusals" placeholder="Refusals" value={report.Refusals} onChange={onChange} required />
            <input type="number" name="Discharges" placeholder="Discharged" value={report.Discharges} onChange={onChange} required />
            <input type="number" name="Deaths" placeholder="Died" value={report.Deaths} onChange={onChange} required />
            <input type="number" name="CurrentDayCount" placeholder="Consists at 07:00 of the current day" value={report.CurrentDayCount} onChange={onChange} required />
            <input type="date" name="ReportDateFrom" placeholder="Date Start" value={report.ReportDateFrom} onChange={onChange} required />
            <input type="date" name="ReportDateTo" placeholder="Date End" value={report.ReportDateTo} onChange={onChange} required />
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
}

ReportForm.propTypes = {
    report: PropTypes.shape({
        DepartmentName: PropTypes.string.isRequired,
        PreviousDayCount: PropTypes.number.isRequired,
        Admissions: PropTypes.number.isRequired,
        Hospitalizations: PropTypes.number.isRequired,
        Refusals: PropTypes.number.isRequired,
        Discharges: PropTypes.number.isRequired,
        Deaths: PropTypes.number.isRequired,
        CurrentDayCount: PropTypes.number.isRequired,
        ReportDateFrom: PropTypes.string.isRequired,
        ReportDateTo: PropTypes.string.isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default ReportForm;
