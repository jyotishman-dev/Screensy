
const API_URL = "http://localhost:4001/api/v1"


export const getWallpapers = async () => {
    const token = localStorage.getItem("token")

    const response = await fetch(`${API_URL}/wallpapers`, {
        method: "GET",
      
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(
            data.error || data.message || "Failed to get wallpapers"
        )
    }

    return data
}


export const createWallpaper = async (
    title: string,
    imageUrl: string
) => {
    const token = localStorage.getItem("token")

    const response = await fetch(`${API_URL}/wallpapers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
    
        },
        body: JSON.stringify({
            title,
            imageUrl
        })
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(
            data.error || data.message || "Failed to create wallpaper"
        )
    }

    return data
}


export const deleteWallpaper = async (id: string) => {
    const token = localStorage.getItem("token")

    const response = await fetch(`${API_URL}/wallpapers/${id}`, {
        method: "DELETE",
       
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(
            data.error || data.message || "Failed to delete wallpaper"
        )
    }

    return data
}
