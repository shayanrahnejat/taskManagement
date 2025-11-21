import { createPortal } from "react-dom";
import { useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import { ctx } from "./Contex";

export default function Header() {
  const { update, isServerAvailable, addTaskLocally } = useContext(ctx);
  const [show, setShow] = useState(false);
  function AddTasks() {
    function addTaskToJson(e) {
      e.preventDefault();
      const taskName = document.getElementById("taskName").value;
      const taskDesc = document.getElementById("taskdesc").value;

      if (!taskName.trim() || !taskDesc.trim()) {
        alert("Please fill in both fields");
        return;
      }

      if (isServerAvailable) {
        fetch("http://localhost:4000/Tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: taskName,
            description: taskDesc,
            done: false,
          }),
        }).catch((error) => {
          console.log("Error adding task:", error);
          addTaskLocally(taskName, taskDesc);
        });
      } else {
        addTaskLocally(taskName, taskDesc);
      }

      document.getElementById("taskName").value = "";
      document.getElementById("taskdesc").value = "";
      setShow(false);
      isServerAvailable &&  update((prev) => prev + 1);
    }

    return createPortal(
      <dialog
        className="flex flex-col gap-4 justify-center m-auto absolute translate-y-[-50%] border-2 p-5"
        style={{ display: show ? "flex" : "none", top: "50%" }}
      >
        <h2 className="text-center">Create New Task</h2>
        <form onSubmit={addTaskToJson} className="flex flex-col gap-3">
          <div className="flex gap-3 justify-between">
            <label htmlFor="taskName">Name:</label>
            <input
              className="border-b-[2px] outline-0 "
              type="text"
              name="Task Name"
              id="taskName"
              autoFocus
            />
          </div>
          <div className="flex gap-3">
            <label htmlFor="taskdesc">Description:</label>
            <input
              className="border-b-[2px] outline-0"
              type="text"
              name="Task Description"
              id="taskdesc"
            />
          </div>
          <input
            type="submit"
            value="Add"
            className="justify-center border-b-[2px]  px-4 py-1.5 hover:bg-black hover:text-white"
          />
        </form>
      </dialog>,
      document.getElementById("form")
    );
  }
  return (
    <header className="flex justify-between p-4">
      <div
        className="flex border-2 px-2 "
        onClick={() => (show ? setShow(false) : setShow(true))}
      >
        <button className="flex gap-3" onClick={AddTasks} title="Add Tasks">
          <svg
            className="self-center"
            width="30px"
            height="30px"
            viewBox="0 0 32 32"
            id="i-plus"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentcolor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path d="M16 2 L16 30 M2 16 L30 16" />
          </svg>{" "}
          <p className="self-center leading-[40px]">Add</p>
        </button>
      </div>

      <AddTasks />
    </header>
  );
}
