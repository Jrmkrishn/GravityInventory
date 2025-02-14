import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

const AuthLayout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("authToken")
        if (token) {
            const username = localStorage.getItem("user_name")
            console.log(`${username}-lastPage`);
            const lastPage = localStorage.getItem(`${username}-lastPage`) || "dashboard"
            navigate(lastPage)
        }
    }, [])
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <Outlet />
        </div>
    )
}

export default AuthLayout