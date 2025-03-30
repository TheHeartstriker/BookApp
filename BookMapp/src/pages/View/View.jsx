import { useEffect, useState } from "react";
import { fetchData, deleteBook, updateBook } from "../../services/ApiNonAuth";
function ViewBooks() {
  const [item, setItem] = useState([]);

  const token = localStorage.getItem("token");

  //Updates book books | id, hashkey, and value
  async function handleEdit(id, field, value) {
    setItem((prevItems) =>
      prevItems.map((item) =>
        item.BookId === id ? { ...item, [field]: value } : item
      )
    );
    await updateBook(id, field, value, token);
  }
  //Fetches the data from the server and sets it to the item state
  useEffect(() => {
    const fetchDataAsync = async () => {
      const data = await fetchData(token);
      setItem(data);
    };

    fetchDataAsync();
  }, []);

  return (
    <div className="BookContainer">
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
            onClick={async () => {
              await deleteBook(item.BookId, token);
              setItem((prevItems) =>
                prevItems.filter(
                  (currentItem) => currentItem.BookId !== item.BookId
                )
              );
            }}
          ></button>
        </div>
      ))}
    </div>
  );
}

export default ViewBooks;
