import React, { useEffect, useState } from "react";

export const TaskDetail = ({
  id,
  title,
  description,
  deadline,
  Sno,
  priority,
  taskList,
  setTaskList,
  status,
}) => {
  const [inputData, setInputData] = useState({
    title,
    description,
    deadline,
    id,
    priority,
    status,
  });
  const [disableEditTask, setDisableEditTask] = useState(true);
  const handleChange = (e) => {
    if(e.target.type==='checkbox'){
        setInputData((pre) => ({ ...pre, status: e.target.checked?"completed":"pending" }));
        return;
    }
    setInputData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const handleSave = () => {
    console.log("inputData:", inputData);
    // return;
    // for state
    setDisableEditTask(true);
    const updatedData = taskList.map((el) => {
      if (el.id !== id) {
        return el;
      }
      return inputData;
    });
    setTaskList(updatedData);
    // for local storage
    const localData = JSON.parse(localStorage.getItem("Tasks")) || [];
    const updatedData2 = localData.map((el) => {
      if (el.id !== id) {
        return el;
      }
      return inputData;
    });
    localStorage.setItem("Tasks", JSON.stringify(updatedData2));
  };
  useEffect(() => {
    console.log("mounted", title);
    return () => {
      console.log("un-mounted", title);
    };
  }, []);
  const handleDelete = () => {
    // for state
    const updatedData = taskList.filter((el) => {
      return el.id !== id;
    });
    setTaskList(updatedData);
    // for local storage
    const localData = JSON.parse(localStorage.getItem("Tasks")) || [];
    const updatedData2 = localData.map((el) => {
      return el.id !== id;
    });
    localStorage.setItem("Tasks", JSON.stringify(updatedData2));
  };
  const checkStatus = (status) => {
    if (status === "pending" && new Date() > new Date(deadline)) {
      return "Overdue";
    }
    return status;
  };
  return (
    <tr>
      <td>{Sno}</td>
      <td>
        <input
          type="text"
          name="title"
          defaultValue={inputData.title}
          disabled={disableEditTask}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="description"
          defaultValue={inputData.description}
          disabled={disableEditTask}
          onChange={handleChange}
        />
      </td>
      <td>
        <select
          onChange={handleChange}
          name="priority"
          defaultValue={inputData.priority}
          disabled={disableEditTask}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </td>
      <td>
        <input
          onChange={handleChange}
          defaultValue={inputData.deadline}
          type="datetime-local"
          name="deadline"
          disabled={disableEditTask}
        />
      </td>
      <td>{checkStatus(status)}</td>
      <td>
        <input
          onChange={handleChange}
          type="checkbox"
          defaultChecked={status==='completed'}
          disabled={disableEditTask}
        />
      </td>
      <td>
        {disableEditTask ? (
          <button onClick={() => setDisableEditTask(false)}>Edit</button>
        ) : (
          <button onClick={handleSave}>Save</button>
        )}
      </td>
      <td>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
};
