import { Input } from "@nextui-org/react";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

// The action function to handle form submissions
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");

  try {
    // Make the API request to add the user
    const response = await fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName }),
    });

    const result = await response.json();

    if (response.ok) {
      // Optionally, redirect to another page or return success datareturnredirect("/success"); // Adjust this path as needed
    } else {
      // Return an error responsereturnjson({ error: "Failed to add user" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error adding user:", error);
    return json({ error: "Error adding user" }, { status: 500 });
  }
};

const CreateUser = () =>{
  return(
    <div>
      <Form method="post" className="flex items-center justify-center gap-2 h-[100vh] w-full">
        <div className="flex flex-col gap-4 w-80">
          <Input
            placeholder="First Name"
            name="firstName"
            required
          /><Input
            placeholder="Last Name"
            name="lastName"
            required
          /><button type="submit" className="bg-primary text-white">
            Submit
          </button>
        </div>
      </Form>

    </div>
  )
}

export default CreateUser
