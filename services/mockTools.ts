import { ToolCallLog } from "../types";

export const executeMockTool = async (
  name: string, 
  args: any, 
  addLog: (log: ToolCallLog) => void
): Promise<any> => {
  const logId = Math.random().toString(36).substring(7);
  
  // Log start
  addLog({
    id: logId,
    toolName: name,
    args,
    status: 'pending',
    timestamp: new Date()
  });

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  let result: any = { success: true };

  switch (name) {
    case 'summarizeEmails':
      result = {
        summary: "You have 3 unread emails. 1. Project Alpha update from Sarah (Action required). 2. Weekly newsletter from Design Weekly. 3. Lunch invite from John.",
        urgent: true
      };
      break;
    case 'draftReply':
      result = {
        draft: `Subject: Re: ${args.topic}\n\nHi ${args.recipient},\n\nThanks for the update on ${args.topic}. I'll review the details and get back to you shortly.\n\nBest,\n[Your Name]`,
        status: "Draft saved in Gmail"
      };
      break;
    case 'scheduleMeeting':
      result = {
        confirmation: `Meeting '${args.title}' scheduled for ${args.time} with ${args.attendees.length} attendees. Invitation sent via Calendly.`
      };
      break;
    case 'searchSlack':
      result = {
        matches: [
          { sender: "Alice", text: `I uploaded the file related to ${args.query} in the #design channel.` },
          { sender: "Bob", text: `Has anyone seen the ${args.query} specs?` }
        ]
      };
      break;
    case 'bookRestaurant':
      result = {
        bookingId: "YELP-12345",
        status: `Confirmed at ${args.restaurantName} for ${args.people} people at ${args.time}.`
      };
      break;
    default:
      result = { error: "Unknown tool" };
  }

  // Update log to completed is handled by the caller updating the UI, 
  // but here we just return the result so the LLM knows what happened.
  return result;
};
