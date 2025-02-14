import { Outlet, useLocation, useNavigate } from "react-router"
import Siderbar from "./Siderbar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useEffect } from "react"
import { ModeToggle } from "./ui/mode-toggle"

const Home = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const token = localStorage.getItem("authToken")

    useEffect(() => {
        if (!token) {
            navigate("/")
        }
    }, [])
    useEffect(() => {
        const username = localStorage.getItem("user_name")
        const lastPage = localStorage.getItem(`${username}-lastPage`) || "dashboard"
        if (lastPage && location.pathname === "/") {
            navigate(lastPage)
        }
    }, [location.pathname, navigate])
    return token && (
        <SidebarProvider defaultOpen={true}>
            <Siderbar />
            <SidebarInset className="bg-background">
                <header className="w-full flex justify-between  h-16 shrink-0 border-b p-4">
                    <SidebarTrigger className="-ml-1" />
                    <ModeToggle />
                </header>
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Home