import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTask } from "../context/TaskContext";

export default function EditTask(){

  const { id } = useParams();
  const { tasks, updateTask } = useTask();

  const task = tasks.find(t => t.id === Number(id));

  const [title, setTitle] = useState(task?.title || "");
  const [deadline, setDeadline] = useState(task?.deadline || "");

  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    updateTask(Number(id), title, deadline);
    navigate("/dashboard");
  };

  return(
    <div className="page-center">
      <form className="app-card" onSubmit={handleUpdate}>

        <div className="app-title">Edit task</div>
        <div className="app-subtitle">
          Update title and deadline
        </div>

        <div className="form-field">
          <input
            className="app-input"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <input
            type="date"
            className="app-input"
            value={deadline}
            onChange={(e)=>setDeadline(e.target.value)}
            required
          />
        </div>

        <button className="app-btn">Save</button>

      </form>
    </div>
  );
}
