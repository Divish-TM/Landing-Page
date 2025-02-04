import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendUserData, updateUserStatus } from "../services/apiServices";
import { setToken, clearToken } from "../redux/tokenSlice";
import { startSession, endSession } from "../redux/sessionSlice";
import { RootState } from "../redux/store";

const LandingPage = () => {
  const dispatch = useDispatch();
  const session = useSelector((state: RootState) => state.session);

  const getUserData = async () => {
    const ip = await (await fetch("https://api64.ipify.org?format=json")).json();
    const browser = navigator.userAgent;
    const timestamp = new Date().toISOString();
    const status = true; // User is online

    const userData = { ip: ip.ip, browser, timestamp, status };

    try {
      const token = await sendUserData(userData);
      dispatch(setToken(token));
      dispatch(startSession({ userId: token, ip: ip.ip, status }));
    } catch (error) {
      console.error("Error collecting user data:", error);
    }
  };

  useEffect(() => {
    getUserData();

    const handleUnload = () => {
      if (session.userId) {
        updateUserStatus(session.userId, false); // User is offline
        dispatch(clearToken());
        dispatch(endSession());
        localStorage.clear();
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return (
    <div>
      <h1>Welcome to the Landing Page</h1>
      <p>Session Status: {session.status ? "LIVE" : "NOT LIVE"}</p>
    </div>
  );
};

export default LandingPage;
