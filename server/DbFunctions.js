import { pool, dateGet } from "./server.js";

//Sees if the username is already in use
async function checkUsername(username) {
  try {
    const [results] = await pool.query(
      `SELECT * FROM login WHERE UserName = ?`,
      [username]
    );
    if (results.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

//Get user id function
async function GetUserId(username, password) {
  try {
    const [results] = await pool.query(
      `SELECT UserId FROM login WHERE UserName = ? AND Pass_word = ?`,
      [username, password]
    );
    if (results.length > 0) {
      return results[0].UserId;
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.error("Database query failed", error);
    throw error;
  }
}

async function AddBook(BookData, UId) {
  try {
    const { BookId, BookName, Description } = BookData;
    const [result] = await pool.query(
      `INSERT INTO books (BookId, BookName, Description, UserId) VALUES (?, ?, ?, ?)`,
      [BookId, BookName, Description, dateGet]
    );
    return result;
  } catch (error) {
    console.error("Error inserting book into database:", error);
    throw error;
  }
}

export { checkUsername, GetUserId, AddBook };
