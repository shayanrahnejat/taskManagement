import { useEffect, useState } from "react";
import { ctx } from "./Contex";
import { useContext } from "react";

function Task({ taskName, desc, done, index }) {
  const [isDone, changeDone] = useState(done);
  const { update, isServerAvailable, updateTaskLocally, deleteTaskLocally } =
    useContext(ctx);
  const [edit, setEdit] = useState(false);

  async function Done() {
    const newDoneState = !isDone;
    changeDone(newDoneState);

    if (isServerAvailable) {
      fetch(`http://localhost:4000/Tasks/${index}`, {
        method: "PUT",
        body: JSON.stringify({
          name: taskName,
          description: desc,
          done: newDoneState,
        }),
        headers: { "Content-Type": "application/json" },
      }).catch((error) => {
        console.log("Error updating task:", error);
        updateTaskLocally(index, { done: newDoneState });
      });
    } else {
      updateTaskLocally(index, { done: newDoneState });
    }
    isServerAvailable && update((prev) => prev + 1);
  }

  async function Delete() {
    if (isServerAvailable) {
      fetch(`http://localhost:4000/Tasks/${index}`, { method: "DELETE" }).catch(
        (error) => {
          console.log("Error deleting task:", error);
          deleteTaskLocally(index);
        }
      );
    } else {
      deleteTaskLocally(index);
    }
    isServerAvailable && update((prev) => prev + 1);
  }

  async function Edit() {
    setEdit(true);
  }

  async function saveEdit() {
    const name = document.getElementById("taskNameEdit").value;
    const description = document.getElementById("descriptionEdit").value;

    if (!name.trim() || !description.trim()) {
      alert("Please fill in both fields");
      return;
    }

    if (isServerAvailable) {
      fetch(`http://localhost:4000/Tasks/${index}`, {
        method: "PUT",
        body: JSON.stringify({
          name: name,
          description: description,
          done: isDone,
        }),
        headers: { "Content-Type": "application/json" },
      }).catch((error) => {
        console.log("Error saving task:", error);
        updateTaskLocally(index, { name: name, description: description });
      });
    } else {
      updateTaskLocally(index, { name: name, description: description });
    }

    setEdit(false);
    isServerAvailable && update((prev) => prev + 1);
  }

  return (
    <div className="flex gap-2 border-b-2 py-3 w-[90%]">
      <div className="flex gap-2 px-3 justify-between w-full">
        <div className="flex gap-5">
          {edit ? (
            <input
              className="border-[1px] outline-0 rounded-[4px]"
              defaultValue={taskName}
              placeholder="Name of task"
              type="text"
              name="taskName"
              id="taskNameEdit"
            />
          ) : (
            <h2 className="text-[20px] font-bold ">{taskName}</h2>
          )}
          {edit ? (
            <input
              className="border-[1px] outline-0 rounded-[4px]"
              defaultValue={desc}
              placeholder="description"
              type="text"
              name="description"
              id="descriptionEdit"
            />
          ) : (
            <p className="text-[15px] font-[400] text-amber-600 leading-4 self-center">
              {desc}
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <button
            className="text-[15px] font-[400] text-red-600 leading-4 self-center hover:text-black"
            onClick={Delete}
          >
            delete
          </button>
          <button
            className="text-[15px] font-[400] text-red-600 leading-4 self-center hover:text-black"
            onClick={edit ? saveEdit : Edit}
          >
            {edit ? "save" : "edit"}
          </button>
          <input
            onChange={Done}
            type="checkbox"
            name="taskStat"
            id="taskStat"
            checked={isDone}
          />
        </div>
      </div>
    </div>
  );
}

export default function Tasks() {
  const { task, done, isServerAvailable } = useContext(ctx);

  return (
    <div className="flex flex-col p-5">
      <h1 className="font-bold text-[44px]">Tasks</h1>
      {!isServerAvailable && (
        <p className="text-orange-600 font-semibold mb-2">
          ⚠️ Working offline - changes are saved locally
        </p>
      )}
      <div className="flex justify-between px-4 w-[90%]">
        <p>tasks: {task.length}</p>
        <p>done: {done}</p>
      </div>
      <div className="flex flex-col">
        {task.map((item) => (
          <Task
            key={item.id}
            taskName={item.name}
            desc={item.description}
            done={item.done}
            index={item.id}
          />
        ))}
      </div>
    </div>
  );
}
