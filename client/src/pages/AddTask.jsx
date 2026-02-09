import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTask } from "../context/TaskContext";

export default function AddTask(){

  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");

  const { addTask } = useTask();
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();
    addTask(title, deadline);
    navigate("/dashboard");
  };

  return(
    <div className="page-center">
      <form className="app-card" onSubmit={handleAdd}>

        <div className="app-title">Create task</div>
        <div className="app-subtitle">
          Add a new task with deadline
        </div>

        <div className="form-field">
          <input
            className="app-input"
            placeholder="Task title"
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

        <button className="app-btn">Create</button>

      </form>
    </div>
  );
}
