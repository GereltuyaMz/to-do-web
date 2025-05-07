import { useState } from "react";
import Button from "./components/Button";
import Task from "./components/Task";
import tasks from "./data/todo";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(tasks);
  const [filteredData, setFilteredData] = useState(data);
  const [filterStatus, setFilterStatus] = useState("all");

  const completedNumber = data.filter(
    (task) => task.status === "completed"
  ).length;

  const createTask = () => {
    const newTask = {
      id: Math.random(),
      text: inputValue,
      status: "active",
    };

    const taskData = [...data, newTask];
    setData([...data, newTask]);
    setInputValue("");
    applyFilter(taskData);
  };

  const deleteTask = (id) => {
    const filteredData = data.filter((task) => task.id !== id);
    setData(filteredData);
    setFilteredData(filteredData);
  };

  const toggleStatus = (id) => {
    const changedData = data.map((task) => {
      if (task.id === id) {
        const isDone = task.status === "active" ? false : true;
        task.status = isDone ? "active" : "completed";
      }
      return task;
    });
    setData(changedData);
    setFilteredData(changedData);
    applyFilter(changedData);
  };

  const clearCompleted = () => {
    const filteredData = data.filter((task) => task.status === "active");
    setData(filteredData);
    setFilteredData(filteredData);
  };

  const filterCompleted = () => {
    setFilterStatus("completed");
    applyFilter(data, "completed");
  };

  const filterActive = () => {
    setFilterStatus("active");
    applyFilter(data, "active");
  };

  const clearFilter = () => {
    setFilteredData(data);
    setFilterStatus("all");
  };

  const applyFilter = (taskData, status = filterStatus) => {
    if (status === "active") {
      setFilteredData(taskData.filter((task) => task.status === "active"));
    } else if (status === "completed") {
      setFilteredData(taskData.filter((task) => task.status === "completed"));
    } else {
      setFilteredData(taskData);
    }
  };

  return (
    <div className="flex justify-center bg-[#F3F4F6] h-screen w-scree">
      <div className="w-[377px] size-fit bg-white mt-[60px] shadow-md rounded-md py-[24px] px-[16px] flex flex-col items-center">
        <div className="flex flex-col w-full gap-5 mb-5">
          <h1 className="text-xl font-semibold text-center">To-Do list</h1>
          <div className="flex gap-[6px]">
            <input
              onChange={(event) => {
                setInputValue(event.target.value);
              }}
              value={inputValue}
              className="h-[40px] border w-full border-[#E4E4E7] rounded-md pl-4"
              type="text"
              placeholder="Add a new task..."
            />
            <Button handleClick={createTask} text="Add" />
          </div>
        </div>

        <div className="flex gap-[6px] mb-5">
          <Button
            isActive={filterStatus === "all"}
            isSmall={true}
            text="All"
            handleClick={clearFilter}
          />
          <Button
            isActive={filterStatus === "active"}
            isSmall={true}
            text="Active"
            handleClick={filterActive}
          />
          <Button
            isActive={filterStatus === "completed"}
            isSmall={true}
            text="Completed"
            handleClick={filterCompleted}
          />
        </div>

        {/* tasks */}
        <div className="w-full flex flex-col gap-5">
          {filteredData.map((task) => {
            return (
              <Task
                key={task.id}
                id={task.id}
                text={task.text}
                status={task.status}
                deleteTask={deleteTask}
                toggleStatus={toggleStatus}
              />
            );
          })}
        </div>

        {filteredData.length === 0 && (
          <p className="text-center text-[#6B7280] text-sm my-5">
            No tasks yet. Add one above!
          </p>
        )}

        <div className="border-t border-[#E4E4E7] w-full my-5"></div>

        {/* task bar */}
        <div className="pb-1 flex justify-between text-sm w-full">
          <p className="text-[#6B7280]">
            {completedNumber} of {data.length} tasks completed
          </p>
          <button onClick={clearCompleted} className="text-[#F44444]">
            Clear completed
          </button>
        </div>
        <p className="mt-10 text-xs text-[#6B7280]">
          Powered by
          <a href="www.pinecone.mn" className="text-[#3B73ED] ml-1">
            Pinecone academy
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
