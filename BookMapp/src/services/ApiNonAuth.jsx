export async function sendTaskData(datatosend, token) {
  console.log(datatosend, "Data sent to the server");
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
    const responseData = await response.json();
    console.log(responseData, "Response from addBook");
    if (!response.ok) {
      alert(responseData.message || "Error adding book");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function fetchData(token) {
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
    if (!response.ok) {
      alert(response.message || "Error fetching data");
      return;
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteBook(id, token) {
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
      alert(response.message || "Error deleting book");
      return;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function updateBook(id, field, value, token) {
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
      alert(response.message || "Error updating book");
      return;
    }
  } catch (error) {
    console.error(error);
  }
}
