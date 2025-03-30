import { useState, useContext, useRef } from "react";
import { sendTaskData } from "../../services/ApiNonAuth";

function BookCreater() {
  //User Id thats saved in Login.jsx and sent to the server when creating new tasks
  const [BookName, setBookName] = useState("");
  const [BookDes, setBookDes] = useState("");
  const token = localStorage.getItem("token");

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

    await sendTaskData(newTask, token);
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
        <div className="Creator">
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
