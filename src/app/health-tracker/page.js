"use client";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HealthTracker() {
    const [form, setForm] = useState({
        weight: "",
        exercise: "",
        sleep: "",
        water: "",
        heartRate: "",
        bloodPressure: "",
        bloodSugar: "",
        caloriesBurned: "",
    });
    const [logs, setLogs] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        for (let key in form) {
            if (form[key] === "") {
                setError("All fields must be filled.");
                return;
            }
        }

        setError("");

        const newLog = {
            ...form,
            date: new Date().toISOString().split("T")[0],
        };

        if (editIndex !== null) {
            const updatedLogs = logs.map((log, index) =>
                index === editIndex ? newLog : log
            );
            setLogs(updatedLogs);
            setEditIndex(null);
        } else {
            setLogs([...logs, newLog]);
        }

        setForm({
            weight: "",
            exercise: "",
            sleep: "",
            water: "",
            heartRate: "",
            bloodPressure: "",
            bloodSugar: "",
            caloriesBurned: "",
        });
    };

    const handleEdit = (index) => {
        setForm(logs[index]);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const updatedLogs = logs.filter((_, i) => i !== index);
        setLogs(updatedLogs);
    };

    const handleDeleteAll = () => {
        setLogs([]);
    };

    useEffect(() => {
        const savedLogs = JSON.parse(localStorage.getItem("logs") || "[]");
        setLogs(savedLogs);
    }, []);

    useEffect(() => {
        localStorage.setItem("logs", JSON.stringify(logs));
    }, [logs]);

    return (
        <div className="container mt-4" style={{ backgroundColor: "#e8f5e9", padding: "20px", borderRadius: "10px" }}>
            <h1 style={{ color: "#1b5e20", textShadow: "1px 1px #a5d6a7" }}>Health Tracker</h1>
            <div className="card p-4" style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col-12 col-md-6 col-lg-4">
                            <label className="form-label" style={{ color: "#388e3c" }}>Weight</label>
                            <input
                                type="number"
                                name="weight"
                                className="form-control"
                                value={form.weight}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <label className="form-label" style={{ color: "#388e3c" }}>Exercise Duration (minutes)</label>
                            <input
                                type="number"
                                name="exercise"
                                className="form-control"
                                value={form.exercise}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <label className="form-label" style={{ color: "#388e3c" }}>Sleep (hours)</label>
                            <input
                                type="number"
                                name="sleep"
                                className="form-control"
                                value={form.sleep}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12 col-md-6 col-lg-4">
                            <label className="form-label" style={{ color: "#388e3c" }}>Water Intake (liters)</label>
                            <input
                                type="number"
                                name="water"
                                className="form-control"
                                value={form.water}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <label className="form-label" style={{ color: "#388e3c" }}>Heart Rate (bpm)</label>
                            <input
                                type="number"
                                name="heartRate"
                                className="form-control"
                                value={form.heartRate}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <label className="form-label" style={{ color: "#388e3c" }}>Blood Pressure (mmHg)</label>
                            <input
                                type="text"
                                name="bloodPressure"
                                className="form-control"
                                value={form.bloodPressure}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12 col-md-6 col-lg-4">
                            <label className="form-label" style={{ color: "#388e3c" }}>Blood Sugar Levels (mg/dL)</label>
                            <input
                                type="number"
                                name="bloodSugar"
                                className="form-control"
                                value={form.bloodSugar}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <label className="form-label" style={{ color: "#388e3c" }}>Calories Burned</label>
                            <input
                                type="number"
                                name="caloriesBurned"
                                className="form-control"
                                value={form.caloriesBurned}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    {error && <div className="alert alert-danger" style={{ backgroundColor: "#ffcdd2", color: "#c62828", borderColor: "#e53935" }}>{error}</div>}
                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#43a047", borderColor: "#388e3c" }}>
                        {editIndex !== null ? "Update" : "Submit"}
                    </button>
                </form>
            </div>
            <h2 className="mt-4" style={{ color: "#1b5e20", textShadow: "1px 1px #a5d6a7" }}>Monitor Progress</h2>
            {logs.length > 0 ? (
                <div className="card p-4 mt-4" style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
                    <div className="table-responsive">
                        <table className="table">
                            <thead style={{ backgroundColor: "#a5d6a7", color: "#2e7d32" }}>
                                <tr>
                                    <th>Date</th>
                                    <th>Weight</th>
                                    <th>Exercise Duration</th>
                                    <th>Sleep</th>
                                    <th>Water Intake</th>
                                    <th>Heart Rate</th>
                                    <th>Blood Pressure</th>
                                    <th>Blood Sugar Levels</th>
                                    <th>Calories Burned</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map((entry, index) => (
                                    <tr key={index} style={{ backgroundColor: "#f1f8e9" }}>
                                        <td>{entry.date}</td>
                                        <td>{entry.weight}</td>
                                        <td>{entry.exercise}</td>
                                        <td>{entry.sleep}</td>
                                        <td>{entry.water}</td>
                                        <td>{entry.heartRate}</td>
                                        <td>{entry.bloodPressure}</td>
                                        <td>{entry.bloodSugar}</td>
                                        <td>{entry.caloriesBurned}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning me-2"
                                                style={{ backgroundColor: "#f9a825", borderColor: "#f9a825", color: "#fff" }}
                                                onClick={() => handleEdit(index)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                style={{ backgroundColor: "#e53935", borderColor: "#e53935" }}
                                                onClick={() => handleDelete(index)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p>No logs to display</p>
            )}
        </div>
    );
}
