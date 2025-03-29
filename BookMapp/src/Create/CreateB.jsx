import { useState, useContext, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Context } from "../Provider";

function BookCreater() {
  //User Id thats saved in Login.jsx and sent to the server when creating new tasks
  const { isSignedIn, setIsSignedIn } = useContext(Context);
  const [BookName, setBookName] = useState("");
  const [BookDes, setBookDes] = useState("");
  const token = localStorage.getItem("token");
  if (!token) {
    setIsSignedIn(false);
    alert("You need to be signed in to create a book");
  }
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
    const newTask = {
      BookName: task,
      Description: description,
    };
    // Data sent to the server
    if (isSignedIn) {
      await sendTaskData(newTask);
    }
  }
  async function sendTaskData(datatosend) {
    console.log("Token:", token);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(datatosend),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/addBook`,
        options
      );
      console.log("Response status:", response.status);
      const responseData = await response.json();
      console.log("Response data:", responseData);

      if (!response.ok) {
        alert(responseData.message);
        console.error("Error:", responseData.message);
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
