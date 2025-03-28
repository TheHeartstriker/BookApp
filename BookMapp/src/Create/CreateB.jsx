import { useState, useContext, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Context } from "../Provider";

function BookCreater() {
  //User Id thats saved in Login.jsx and sent to the server when creating new tasks
  const { isSignedIn, setIsSignedIn } = useContext(Context);
  const [BookName, setBookName] = useState("");
  const [BookDes, setBookDes] = useState("");
  //Ref for the border ani
  const borderRef = useRef(null);

  //Handles the task name and description changes
  const handleBookName = (event) => {
    if (event.target.value.length > 149) {
      alert("Book name is too long");
      return;
    } else {
      setBookName(event.target.value);
    }
  };

  const handleBookDes = (event) => {
    if (event.target.value.length > 499) {
      alert("Book description is too long");
      return;
    } else {
      setBookDes(event.target.value);
    }
  };

  //Create a book and sends it to the server
  async function addTask(task, description) {
    // Unique id for each task
    const id = uuidv4();
    const newTask = {
      BookId: id,
      BookName: task,
      Description: description,
    };
    // Data sent to the server
    if (isSignedIn) {
      await sendTaskData(newTask);
    }
  }
  //Sends the individual task data to the server
  async function sendTaskData(datatosend) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(datatosend),
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/addBook`,
        options
      );
      if (response.status === 401 || response.status === 400) {
        console.error("Unauthorized access or bad request");
        alert("Failed to create task. Please check your inputs.");
        return;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  //Reset button on click
  const handleReset = () => {
    setTaskName("");
    setTaskDescription("");
  };

  const handleCreate = async () => {
    await addTask(BookName, BookDes);
  };

  return (
    <>
      <div className="CreatorContainer">
        <div className="Creator" ref={borderRef}>
          <input
            type="text"
            className="HeaderTask"
            placeholder="Task Name"
            value={BookName}
            onChange={handleBookName}
          />
          <textarea
            className="DescriptTask"
            placeholder="Task Description"
            value={BookDes}
            onChange={handleBookDes}
          />
          <button className="Add" onClick={handleCreate}>
            Create
          </button>
          <button className="Reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default BookCreater;
