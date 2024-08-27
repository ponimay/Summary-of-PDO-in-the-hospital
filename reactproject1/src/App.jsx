
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Reports from './Reports'; 
import ReportForm from './ReportForm'; 


import './index.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/ReportForm" element={<ReportForm />} /> 

            </Routes>
        </Router>
    );
}

export default App;
