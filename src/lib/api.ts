import { toast } from "sonner";

export const fetchInventory = async (page: number) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/inventory?page=${page}`,)
    if (!response.ok) {
        throw new Error("Error fetching inventory data")
    }
    const { message, data, totalPages, currentPage } = await response.json()

    toast.success(message)
    return { totalPages, data, currentPage }
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
export const createUser = async (userData: { username: string; password: string }): Promise<boolean | void> => {
    try {
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
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
        } else {
            toast.error("An unexpected error occurred");
        }
    }
};
