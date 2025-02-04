import axios from "axios";
import { UserData } from "../types";

const API_URL = "http://localhost:8080/api"; // Java backend URL

export const sendUserData = async (userData: UserData) => {
  try {
    const response = await axios.post(`${API_URL}/collect`, userData);
    return response.data.token; // Token from Java backend
  } catch (error) {
    console.error("Error sending user data:", error);
    throw error;
  }
};

export const updateUserStatus = async (userId: string, status: boolean) => {
  try {
    await axios.post(`${API_URL}/status`, { userId, status });
  } catch (error) {
    console.error("Error updating user status:", error);
  }
}