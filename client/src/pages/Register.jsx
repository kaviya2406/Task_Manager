import { Link } from "react-router-dom";

export default function Register(){
  return(
    <div className="page-center">
      <div className="app-card">
        <div className="app-title">Create account</div>
        <div className="app-subtitle">
          Registration UI only
        </div>

        <Link to="/" className="app-link">Back to login</Link>
      </div>
    </div>
  );
}
