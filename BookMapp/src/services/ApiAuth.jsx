// This file contains the functions that handle the authentication of the user
// Login function sends the data to the server to be checked if the user exists and if the password is correct
export const handleLogin = async (email, password) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/login`,
      options
    );
    const responseData = await response.json();
    if (response.ok) {
      localStorage.removeItem("token");
      localStorage.setItem("token", responseData.token);
      alert("Login successful!");
    } else {
      alert(responseData.message || "Login failed");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

//Sends the data to the server to be inserted into the database
export const handleSignup = async (email, password, username) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      username,
      password,
      email,
    }),
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/register`,
      options
    );
    const responseData = await response.json();

    if (response.ok) {
      localStorage.setItem("token", responseData.token);
      alert("Registration successful!");
    } else {
      alert(responseData.message || "Registration failed");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Registration failed");
  }
};
