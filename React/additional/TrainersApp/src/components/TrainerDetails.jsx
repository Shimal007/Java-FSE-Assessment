import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { trainers } from '../TrainersMock';

function TrainerDetails() {
    const { id } = useParams();
    const trainer = trainers.find((t) => t.id === parseInt(id));

    if (!trainer) {
        return (
            <div>
                <h2>Trainer Details</h2>
                <p>Trainer with ID {id} not found.</p>
                <Link to="/trainers">Back to Trainers List</Link>
            </div>
        );
    }

    return (
        <div>
            <h2>Trainer Details</h2>
            <p><strong>ID:</strong> {trainer.id}</p>
            <p><strong>Name:</strong> {trainer.name}</p>
            <p><strong>Email:</strong> {trainer.email}</p>
            <p><strong>Phone:</strong> {trainer.phone}</p>
            <p><strong>Skill:</strong> {trainer.skill}</p>
            <br />
            <Link to="/trainers">Back to Trainers List</Link>
        </div>
    );
}

export default TrainerDetails;
