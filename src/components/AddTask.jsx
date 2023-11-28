import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { nanoid } from "nanoid";
const initialVal = {
  title: "",
  description: "",
  deadline: "",
  priority: "low",
  status: "pending",
};
export const AddTask = ({ taskList, setTaskList }) => {
  const [formData, setFormData] = useState(initialVal);
  const futureDateError = () => toast.error("Deadline should be future time");

  const handleChange = (e) => {
    setFormData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new Date(formData.deadline) <= new Date()) {
      futureDateError();
      return;
    }
    console.log("new Date():", new Date());
    console.log(new Date(formData.deadline));
    const id = nanoid();
    console.log("formData:", formData);
    setTaskList((pre) => [...pre, { ...formData, id }]);
    localStorage.setItem(
      "Tasks",
      JSON.stringify([...taskList, { ...formData, id }])
    );
    setFormData(initialVal);
  };

  return (
    <div className="form-container">
      <Toaster position="top-center" reverseOrder={false} />
      <form action="#" onSubmit={handleSubmit}>
        <label className="form-label" for="title">Title:</label>
        <input
          className="form-input"
          onChange={handleChange}
          value={formData.title}
          type="text"
          name="title"
          required
        />
  
        <label className="form-label" for="description">Description:</label>
        <input
          className="form-input"
          onChange={handleChange}
          type="text"
          name="description"
          value={formData.description}
          required
        />
  
        <label className="form-label" for="priority">Priority Level:</label>
        <select
          className="form-select"
          onChange={handleChange}
          name="priority"
          value={formData.priority}
          required
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
  
        <label className="form-label" for="deadline">Date and Time:</label>
        <input
          className="form-input"
          onChange={handleChange}
          value={formData.deadline}
          type="datetime-local"
          name="deadline"
          required
        />
  
        <input className="form-submit" type="submit" value="Submit" />
      </form>
    </div>
  );
  
};
