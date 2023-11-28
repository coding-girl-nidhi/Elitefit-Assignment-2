import React, { useEffect, useState } from "react";
import { TasksList } from "./TasksList";
import { AddTask } from "./AddTask";
const localData = JSON.parse(localStorage.getItem("Tasks")) || [];
let setTimeoutId;
export const Dashboard = () => {
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [taskList, setTaskList] = useState(localData);
  console.log("taskList:", taskList);
  const handleChange = (e) => {
    if (setTimeoutId) {
      clearTimeout(setTimeoutId);
    }
    setTimeoutId = setTimeout(() => {
      setQuery(e.target.value);
    }, 500);
  };

  const filterFunction = () => {};

  const filterBySearch = (val) => {
    const localData = JSON.parse(localStorage.getItem("Tasks")) || [];
    if (val.trim() === "") {
      return setTaskList(localData);
    }
    const filteredArr = localData.filter((el) => {
      return el.title.toLowerCase().includes(val.toLowerCase());
    });
    setTaskList(() => filteredArr);
  };
  const checkStatus = (status, deadline) => {
    if (status === "pending" && new Date() > new Date(deadline)) {
      return "overdue";
    }
    return status;
  };
  useEffect(() => {
    let filteredArr = JSON.parse(localStorage.getItem("Tasks")) || [];
    if (query.trim() !== "") {
      filteredArr = filteredArr.filter((el) => {
        return el.title.toLowerCase().includes(query.toLowerCase());
      });
    }
    if (priority !== "") {
      filteredArr = filteredArr.filter((el) => {
        return el.priority === priority;
      });
    }
    if (status !== "") {
      filteredArr = filteredArr.filter((el) => {
        return checkStatus(el.status, el.deadline) == status;
      });
    }
    setTaskList(filteredArr);
  }, [query, priority, status]);

  return (
    <div>
        <h1>Add Tasks</h1>
      <AddTask taskList={taskList} setTaskList={setTaskList} />
      <div className="filteration_part">
        <input
          type="text"
          placeholder="search by title"
          onChange={handleChange}
        />
        <select
          name="sortByPriority"
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">Select-Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select name="sortByStatus" onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select-Status</option>
          <option value="pending">Pending</option>
          <option value="overdue">Overdue</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <TasksList taskList={taskList} setTaskList={setTaskList} />
    </div>
  );
};
