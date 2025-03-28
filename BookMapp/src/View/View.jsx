import { useEffect, useState } from "react";
function ViewBooks() {
  const [data, setData] = useState([]);
  //Full elements with related data one for each user
  const [item, setItem] = useState([]);
  //Used to reload the useeffect telling function to run and load the tabs
  const [Datafetched, setDataFetched] = useState(false);
  //The amount of tabs loaded
  const [LoadedAmount, setLoadedAmount] = useState(8);
  //Gets the shared data from the server based on usernames
  async function fetchData() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/getBookData`,
        options
      );
      const data = await response.json();
      console.log("Fetched data:", data);
      setItem(data);
    } catch (error) {
      console.error(error);
    }
  }
  //Helper adds an item to the grid
  function AddItem(Name, HeartRate, Days, TotalTime, Avgzone, Cal) {
    setItem((prevItems) => [
      ...prevItems,
      {
        id: prevItems.length,
        Name: Name,
        HeartRate: HeartRate,
        Days: Days,
        TotalTime: TotalTime,
        Avgzone: Avgzone,
        Cal: Cal,
      },
    ]);
  }

  useEffect(() => {
    console.log(item);
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Item updated:", item);
  }, [item]);

  return (
    <div className="ShareContainer">
      {item.map((item) => (
        <div className="Item" key={item.BookId}>
          <h1>{item.BookName}</h1>
          <h3>{item.Description}</h3>
        </div>
      ))}
    </div>
  );
}
export default ViewBooks;
