import { Link } from "react-router-dom";
import { useTask } from "../context/TaskContext";

export default function Dashboard(){

  const { tasks } = useTask();

  return(
    <div className="page-center">
      <div className="app-card">

        <div className="dashboard-top">
          <div>
            <div className="app-title">My tasks</div>
            <div className="app-subtitle">
              Personal workspace
            </div>
          </div>

          <Link to="/add" className="app-link">+ New</Link>
        </div>

        <div className="task-list">

          {tasks.length === 0 && (
            <div className="empty-text">No tasks yet</div>
          )}

          {tasks.map(t => (
            <div className="task-item" key={t.id}>
             <div>
  <div>{t.title}</div>
  <small style={{color:"#6b7280"}}>
    Due: {t.deadline}
  </small>
</div>

              <Link to={`/edit/${t.id}`} className="app-link">Edit</Link>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}
