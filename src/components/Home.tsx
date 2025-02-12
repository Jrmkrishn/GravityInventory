import { Outlet, useLocation, useNavigate } from "react-router"
import Siderbar from "./Siderbar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useEffect } from "react"

const Home = () => {
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        localStorage.setItem("lastPage", location.pathname)
        const lastPage = localStorage.getItem("lastPage")
        if (lastPage && location.pathname === "/") {
            navigate(lastPage)
        }
    }, [location.pathname, navigate])
    return (
        <SidebarProvider defaultOpen={true}>
            <Siderbar />
            <SidebarInset className="bg-background">
                <header className="w-full h-16 shrink-0 border-b p-4">
                    <SidebarTrigger className="-ml-1" />
                </header>
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Home