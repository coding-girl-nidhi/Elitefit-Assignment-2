import React from "react";
import { TaskDetail } from "./TaskDetail";

export const TasksList = ({ taskList, setTaskList }) => {
  return (
    <div className="table-container">
      <table className="task-table">
        <thead>
          <tr>
            <td>SNo.</td>
            <td>Title</td>
            <td>Description</td>
            <td>Priority</td>
            <td>Deadline</td>
            <td>status</td>
            <td>Completed</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {taskList.length ? (
            taskList?.map((el, index) => (
              <TaskDetail
                {...el}
                Sno={index + 1}
                setTaskList={setTaskList}
                key={el.id}
                taskList={taskList}
              />
            ))
          ) : (
            <p className="empty-message">No tasks available.</p>
          )}
        </tbody>
      </table>
    </div>
  );
};
