export enum ConnectionState {
  DISCONNECTED = "DISCONNECTED",
  CONNECTING = "CONNECTING",
  CONNECTED = "CONNECTED",
  ERROR = "ERROR",
}

export interface ToolCallLog {
  id: string;
  toolName: string;
  args: any;
  status: "pending" | "completed" | "error";
  timestamp: Date;
  result?: any;
}
