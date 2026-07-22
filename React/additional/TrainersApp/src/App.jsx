import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import TrainersList from './components/TrainersList';
import TrainerDetails from './components/TrainerDetails';

function App() {
    return (
        <Router>
            <div>
                <nav style={{ padding: '10px', backgroundColor: '#e2e8f0', marginBottom: '20px' }}>
                    <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
                    <Link to="/trainers">Trainers List</Link>
                </nav>
                <div style={{ padding: '10px' }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/trainers" element={<TrainersList />} />
                        <Route path="/trainers/:id" element={<TrainerDetails />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
