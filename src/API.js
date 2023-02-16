import { APIURL } from ".";

export const signup = async (username, password) => {
  const response = await fetch(`${APIURL}api/users/register`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,

    }),
  });
  const json = await response.json();
  if (json.error) {
    throw json.error;
  }
  console.log(json.token)
  return json.token;
};
