"use client";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Leaderboard({ leaderboardData }) {
    return (
        <div className="container mt-4">
            <h2 className="text-center text-primary mb-4">Leaderboard</h2>
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-primary">
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Exercise</th>
                            <th>Score</th>
                            <th>Diet Plan</th>
                            <th>Goal</th>
                            <th>Steps</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboardData.length > 0 ? (
                            leaderboardData.map((participant, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{participant.name}</td>
                                    <td>{participant.exercise}</td>
                                    <td>{participant.score}</td>
                                    <td>{participant.diet}</td>
                                    <td>{participant.goal}</td>
                                    <td>{participant.steps}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">No participants yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Leaderboard;
