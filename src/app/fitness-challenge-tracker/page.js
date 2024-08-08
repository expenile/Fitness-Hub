"use client";

import React, { useState } from 'react';
import Leaderboard from './Leaderboard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [participants, setParticipants] = useState([]);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [exerciseName, setExerciseName] = useState('');
    const [dietPlan, setDietPlan] = useState('');
    const [goal, setGoal] = useState('');
    const [steps, setSteps] = useState(0);

    const addParticipant = (name, score) => {
        const newParticipant = {
            name: name,
            score: score,
            exercise: exerciseName,
            diet: dietPlan,
            goal: goal,
            steps: steps
        };
        setParticipants([...participants, newParticipant]);
    };

    const updateLeaderboard = () => {
        const sortedParticipants = [...participants].sort(
            (a, b) => b.score - a.score);
        setLeaderboardData(sortedParticipants);
    };

    return (
        <div className="App bg-light text-dark">
            <div className="container py-4">
                <h1 className="text-center mb-4 text-primary">Fitness Challenge Tracker</h1>
                <div className="mb-3">
                    <label className="form-label text-success">Select Exercise:</label>
                    <select
                        value={exerciseName}
                        onChange={(e) => setExerciseName(e.target.value)}
                        className="form-select"
                    >
                        <option value="">Select Exercise</option>
                        <option value="Pushup">Pushup</option>
                        <option value="Situp">Situp</option>
                        <option value="Rope">Rope</option>
                        <option value="Squat">Squat</option>
                        <option value="Deadlift">Deadlift</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label text-success">Enter Customized Diet Plan:</label>
                    <input
                        type="text"
                        placeholder="Diet Plan"
                        value={dietPlan}
                        onChange={(e) => setDietPlan(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label text-success">Set Your Goal:</label>
                    <input
                        type="text"
                        placeholder="Goal"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label text-success">Track Number of Steps:</label>
                    <input
                        type="number"
                        placeholder="Steps"
                        value={steps}
                        onChange={(e) => setSteps(e.target.value)}
                        className="form-control"
                    />
                </div>
                <ParticipantForm addParticipant={addParticipant}
                    updateLeaderboard={updateLeaderboard} />
                <Leaderboard leaderboardData={leaderboardData} />
            </div>
        </div>
    );
}

function ParticipantForm({ addParticipant, updateLeaderboard }) {
    const [name, setName] = useState('');
    const [score, setScore] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        addParticipant(name, score);
        updateLeaderboard();
        setName('');
        setScore(0);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Participant Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <input
                    type="number"
                    placeholder="Score"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    required
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-success">
                Add Participant
            </button>
        </form>
    );
}

export default App;
