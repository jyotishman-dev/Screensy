const API_URL = "http://localhost:4001/api/v1";


export async function signup(email: string, password: string) {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();
 
  if (!response.ok) {
    throw new Error(data.error || data.message || "Signup failed");
  }

   return data;
}


export async function login (email : string , password : string) {
    const response = await fetch(`${API_URL}/login`,{
         method :"POST",
        headers : {
            
            "Content-Type": "application/json",
},
body : JSON.stringify({
    email,
    password
})



    })

    const data = await response.json()

    if(!response.ok){
        throw new Error(data.error || data.message || "login failed")
    }


     localStorage.setItem("token", data.token);


     return data;

}


export async function getMe() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || "Unauthorized");
  }

  return data;
}

