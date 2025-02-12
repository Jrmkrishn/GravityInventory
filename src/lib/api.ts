import { toast } from "sonner";

export const fetchInventory = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/inventory`)
    if (!response.ok) {
        throw new Error("Error fetching inventory data")
    }
    const { message, data } = await response.json()
    toast.success(message)
    return data
}
export const fetchGraphData = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/graphData`)
    if (!response.ok) {
        throw new Error("Error fetching inventory data")
    }
    const { message, data } = await response.json()
    toast.success(message)
    return data
}
export const loginUser = async (userData: { username: string, password: string }) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/login`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Error logging in");
    }

    const { message, token } = await response.json();

    localStorage.setItem("authToken", token);

    toast.success(message);
    return token;
}

export const createUser = async (userData: { username: string, password: string }) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/create-user`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Error creating user");
    }

    const { message } = await response.json();

    toast.success(message);
    return true;

}

