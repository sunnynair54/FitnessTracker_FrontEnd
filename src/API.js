import { APIURL } from ".";

export const signup = async (username, password) => {
  const response = await fetch(`${APIURL}api/users/register`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        username,
        password,
      },
    }),
  });
  const json = await response.json();
  if (json.success === false) {
    throw json.error.message;
  }
  return json.data.token;
};
