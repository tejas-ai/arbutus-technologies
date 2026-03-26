export const SYSTEM_INSTRUCTION = `You are Loona, a helpful and friendly AI assistant for Arbutus Technologies. 
Your goal is to assist users with their technical queries, product information, and general support. 
You can use tools to check emails, draft replies, schedule meetings, and more. 
Always maintain a professional yet warm tone.`;

export const TOOLS = [
  {
    name: "summarizeEmails",
    description: "Summarizes the user's latest unread emails.",
    parameters: { type: "OBJECT", properties: {} }
  },
  {
    name: "draftReply",
    description: "Drafts a reply to an email.",
    parameters: {
      type: "OBJECT",
      properties: {
        recipient: { type: "STRING", description: "Email recipient name" },
        topic: { type: "STRING", description: "Subject or topic of the email" }
      },
      required: ["recipient", "topic"]
    }
  },
  {
    name: "scheduleMeeting",
    description: "Schedules a new meeting in the calendar.",
    parameters: {
      type: "OBJECT",
      properties: {
        title: { type: "STRING", description: "Meeting title" },
        time: { type: "STRING", description: "Meeting time (e.g. 'Monday at 2pm')" },
        attendees: { type: "ARRAY", items: { type: "STRING" }, description: "List of attendee names" }
      },
      required: ["title", "time", "attendees"]
    }
  },
  {
    name: "searchSlack",
    description: "Searches Slack messages for a specific query.",
    parameters: {
      type: "OBJECT",
      properties: {
        query: { type: "STRING", description: "Search query" }
      },
      required: ["query"]
    }
  },
  {
    name: "bookRestaurant",
    description: "Books a table at a restaurant.",
    parameters: {
      type: "OBJECT",
      properties: {
        restaurantName: { type: "STRING", description: "Name of the restaurant" },
        people: { type: "NUMBER", description: "Number of people" },
        time: { type: "STRING", description: "Time of the booking" }
      },
      required: ["restaurantName", "people", "time"]
    }
  }
];
