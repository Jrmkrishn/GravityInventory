import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

const AuthLayout = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("authToken")
    useEffect(() => {
        if (token) {
            const username = localStorage.getItem("user_name")
            console.log(`${username}-lastPage`);
            const lastPage = localStorage.getItem(`${username}-lastPage`) || "dashboard"
            navigate(lastPage)
        }
    }, [])
    return !token && (
        <div className='w-full h-screen flex justify-center items-center'>
            <Outlet />
        </div>
    )
}

export default AuthLayout