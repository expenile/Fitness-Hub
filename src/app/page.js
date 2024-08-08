import Link from "next/link";
import Navbar from "../app/components/navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <header className="d-flex flex-column justify-content-center align-items-center text-center bg-primary text-light flex-grow-1" style={{ backgroundColor: "#1e88e5", padding: "60px 15px" }}>
        <h1 className="display-3 fw-bold mb-4">Achieve Your Fitness Goals</h1>
        <p className="lead mb-4">Track your health and fitness with our comprehensive tools and stay motivated.</p>
        <div className="d-flex flex-wrap justify-content-center">
          <Link href="/fitness-challenge-tracker" className="btn btn-light btn-lg mx-2 mb-2 mb-md-0">
            Fitness Challenge Tracker
          </Link>
          <Link href="/calorie-tracker" className="btn btn-light btn-lg mx-2 mb-2 mb-md-0">
            Nutrition Meter
          </Link>
          <Link href="/health-tracker" className="btn btn-light btn-lg mx-2 mb-2 mb-md-0">
            Health Tracker
          </Link>
        </div>
      </header>
      <footer className="bg-dark text-light text-center py-3">
        <div className="container">
          <p className="mb-0">&copy; 2024 Fitness Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
