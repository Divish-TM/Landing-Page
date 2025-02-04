export interface UserData {
    ip: string;
    browser: string;
    timestamp: string;
    status: boolean;  // Changed from "online" | "offline" to boolean
  }
  
  export interface TokenState {
    token: string | null;
  }
  
  export interface SessionState {
    userId: string;
    ip: string;
    status: boolean;  // Boolean status
  }
  