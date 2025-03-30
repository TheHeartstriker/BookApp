import { useEffect, useState } from "react";
import { fetchData, deleteBook, updateBook } from "../../services/ApiNonAuth";
function ViewBooks() {
  const [data, setData] = useState([]);
  //Full elements with related data one for each user
  const [item, setItem] = useState([]);

  //Used to reload the useeffect telling function to run and load the tabs
  const [Datafetched, setDataFetched] = useState(false);
  //The amount of tabs loaded
  const [LoadedAmount, setLoadedAmount] = useState(8);
  const token = localStorage.getItem("token");

  //Updates book takes | id, hashkey, and value
  async function handleEdit(id, field, value) {
    setItem((prevItems) =>
      prevItems.map((item) =>
        item.BookId === id ? { ...item, [field]: value } : item
      )
    );
    await updateBook(id, field, value, token);
  }

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await fetchData(token);
        console.log(data);
        setItem(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
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
