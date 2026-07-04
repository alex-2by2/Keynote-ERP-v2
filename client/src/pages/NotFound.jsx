// client/src/pages/NotFound.jsx

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page">
      <h1>Page not found</h1>

      <p>The page you're looking for doesn't exist.</p>

      <Link to="/app">Back to Dashboard</Link>
    </div>
  );
}
