import { LoaderFunction } from "@remix-run/node";
import axios from"axios";
import { useEffect, useState } from"react";
import { RegistrationInterface } from"~/interfaces/interface";

export default function Dashboard() {
  const [users, setUsers] = useState<RegistrationInterface[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API
        const response = await axios.get('https://dummyjson.com/users');
        // Assuming users data is inside 
        response.data.users,
        setUsers(response.data.users); 
      } catch (error) {
        setError("Failed to fetch users");
        console.error(error); // Log error details for debugging
      }
    };

    fetchData();
  }, []);

  if (error) {
    return<p>{error}</p>;
  }

  if (users.length === 0) {
    return<p>No users found</p>;
  }

  return (
    <div><h1>Dashboard</h1><table><thead><tr><th>First Name</th><th>Last Name</th><th>Email</th></tr></thead><tbody>
          {users.map((user, index) => (
            <tr key={index}><td>{user.firstName}</td><td>{user.lastName}</td><td>{user.email}</td></tr>
          ))}
        </tbody></table></div>
  );
}

