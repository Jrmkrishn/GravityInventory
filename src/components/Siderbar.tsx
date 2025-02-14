import { ChartBar, LayoutDashboard, LogOutIcon } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import { Link, useLocation, useNavigate } from "react-router"
import { localStorageUtil } from "@/lib/utils"

const Siderbar = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const navLink = [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard
        },
        {
            title: "Chart",
            url: "/graph",
            icon: ChartBar
        },
    ]
    const handleLogout = () => {
        localStorageUtil.remove("authToken")
        localStorageUtil.remove("user_name")
        navigate("/")
    }
    const logoutUrl = {
        title: "Logout",
        onClick: handleLogout,
        icon: LogOutIcon
    }
    return (
        <Sidebar variant="inset">
            <SidebarHeader className="md:text-2xl gradient-title">
                Gravity Inventory
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigations</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navLink.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton size={"lg"} asChild isActive={pathname == item.url} >
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size={"lg"} onClick={logoutUrl.onClick} >
                            <>
                                <logoutUrl.icon />
                                <span>{logoutUrl.title}</span>
                            </>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

export default Siderbar