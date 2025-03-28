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
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/getSharedData`,
        options
      );
      const data = await response.json();
      const sortedData = await SortByUserName(data);
      setData(sortedData);
      setDataFetched(true);
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
  return (
    <div className="ShareContainer">
      {item.map((item) => (
        <div className="Item" key={item.id}>
          <h1>{item.Name}</h1>
          <h3>Total Time tracked: {item.TotalTime}</h3>
          <h3>Days tracked: {item.Days}</h3>
          <h3>Avg Zone: {item.Avgzone}</h3>
          <h3>Heart Rate: {item.HeartRate}</h3>
          <h3>Total estimated calories burned: {item.Cal}</h3>
        </div>
      ))}
    </div>
  );
}
export default ViewBooks;
