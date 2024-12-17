import { json, redirect } from "@remix-run/node";
import Events from "~/modal/events";
import { getSession } from "~/session";

class EventController {
    // Function to create events
    async CreateEvents(request: Request, name: string, date: string, location: string, description: string, email: string) {
        try {
            // Check if user is logged in
            const session = await getSession(request.headers.get("Cookie"));
            const token = session.get("email");

            if (!token) {
                return redirect("/login");
            }

            // Check if event exists
            const eventExist = await Events.findOne({ email: token, name: name });
            if (eventExist) {
                return json({ message: "Event already exists", success: false }, { status: 200 });
            }

            // Create a new event
            const newEvent = new Events({ name, date, location, description, email: token });
            const response = await newEvent.save();

            if (response) {
                return json({ message: "Event created successfully", success: true }, { status: 200 });
            } else {
                return json({ message: "An error occurred while saving the event", success: false }, { status: 500 });
            }

        } catch (error: any) {
            return json({ message: error.message || "An unknown error occurred", success: false }, { status: 500 });
        }
    }

    // function to fetch events
    // function to fetch events
    async fetchEvents(request: Request) {
        try {
            // Get session and token
            const session = await getSession(request.headers.get("Cookie"));
            const token = session.get("email");
    
            // Check if token exists
            if (!token) {
                throw new Error("User is not logged in"); // Handle this error appropriately
            }
    
            // Fetch events associated with the email token
            const events = await Events.find({ email: token });
    
            // Return an object containing both events and the token
            return { events, token };
        } catch (error: any) {
            throw new Error(`Error fetching events: ${error.message}`);
        }
    }
}

const eventscontroller = new EventController();
export default eventscontroller