
import './App.css';

const Home = () => {
    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to Kazan City Hospital #7</h1>
            <p className="home-subtitle">Patient Movement Summary in the Emergency Department</p>
            <a href="/reports" className="home-link">
                Go to Reports
            </a>
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Created by n1katio</p>
            </footer>
        </div>
    );
}

export default Home;
