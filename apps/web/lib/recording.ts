const API_URL = "http://localhost:4001/api/v1";



export const  getAllRecordings = async () =>{
    const token  = localStorage.getItem("token")

    const response = await fetch(`${API_URL}/recordings`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })


    const data = await response.json();

      if (!response.ok) {
    throw new Error(data.error || data.message || "Unauthorized");
  }

   return data;

}


export const createRecording = async (title : string , duration: number , wallpaperId:string) =>{
    const token =  localStorage.getItem("token")

    const response = await fetch(`${API_URL}/recordings`, {
        method :"POST",
        headers : {
            Authorization : `Bearer ${token}`,
            "Content-Type": "application/json"

        },

        body : JSON.stringify({
            title,
             duration ,
              wallpaperId
        })
    })

    const data = await response.json()

    if(!response.ok){
        throw new Error (data.error || data.message || "unauth")
    }

    return data 
}


export const getRecordingById = async (id : string) =>{
    const token =localStorage.getItem("token")

    const response = await fetch(`${API_URL}/recordings/${id}` ,{
       headers: {
            Authorization: `Bearer ${token}`
        }
    })
   
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to get recording")
    }

    return data


}


export const deleteRecording = async (id: string) => {
    const token = localStorage.getItem("token")

    const response = await fetch(`${API_URL}/recordings/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to delete recording")
    }

    return data
}
