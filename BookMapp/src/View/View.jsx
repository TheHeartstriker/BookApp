import { useEffect, useState } from "react";
function ViewBooks() {
  const [data, setData] = useState([]);
  //Full elements with related data one for each user
  const [item, setItem] = useState([]);
  //Used to reload the useeffect telling function to run and load the tabs
  const [Datafetched, setDataFetched] = useState(false);
  //The amount of tabs loaded
  const [LoadedAmount, setLoadedAmount] = useState(8);
  const token = localStorage.getItem("token");
  //Gets the shared data from the server based on usernames
  async function fetchData() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/getBooks`,
        options
      );
      const data = await response.json();
      console.log("Response data:", data);
      if (!response.ok) {
        alert("Error fetching data");
        return;
      }
      setItem(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteBook(id) {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify({
        BookId: id,
      }),
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/deleteBook`,
        options
      );
      if (!response.ok) {
        alert("Error deleting book");
        return;
      }
      setItem((prevItems) => prevItems.filter((item) => item.BookId !== id));
    } catch (error) {
      console.error(error);
    }
  }

  async function updateBook(id, field, value) {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify({
        BookId: id,
        field: field,
        value: value,
      }),
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/updateBook`,
        options
      );
      if (!response.ok) {
        alert("Error updating book");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  //Updates book takes | id, hashkey, and value
  function handleEdit(id, field, value) {
    setItem((prevItems) =>
      prevItems.map((item) =>
        item.BookId === id ? { ...item, [field]: value } : item
      )
    );
    updateBook(id, field, value);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="ShareContainer">
      {item.map((item) => (
        <div className="Item" key={item.BookId}>
          <h1
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              handleEdit(item.BookId, "BookName", e.target.textContent)
            }
          >
            {item.BookName}
          </h1>
          <h3
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              handleEdit(item.BookId, "Description", e.target.textContent)
            }
          >
            {item.Description}
          </h3>
          <button
            className="DeleteBook"
            onClick={() => {
              deleteBook(item.BookId);
            }}
          ></button>
        </div>
      ))}
    </div>
  );
}

export default ViewBooks;
