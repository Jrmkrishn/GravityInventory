import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Link, useNavigate } from "react-router"
import { useMutation } from "@tanstack/react-query"
import { loginUser } from "@/lib/api"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

interface UserProps {
    username: string,
    password: string
}

const Login = () => {
    const navigate = useNavigate()
    const form = useForm<UserProps>({
        defaultValues: {
            username: "",
            password: ""
        }
    })
    const { mutate, isPending } = useMutation({
        mutationKey: ["login-user"],
        mutationFn: loginUser,
        onSuccess: () => {
            localStorage.setItem("user_name", form.getValues("username"))
            const lastPage = localStorage.getItem(`${form.getValues("username")}-lastPage`) || "dashboard"
            navigate(lastPage)
        },
        onError: (error) => {
            console.log(error);
            toast.error(error?.message)
        }
    })

    const onSubmit = (data: UserProps) => {
        mutate(data)
    }
    return (
        <Card className="max-w-sm w-full">
            <CardHeader>
                <CardTitle className="gradient-title text-4xl text-center">
                    Login
                </CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField name="username" control={form.control} rules={{ required: "Username is required" }} render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="username">
                                    Username
                                </FormLabel>
                                <FormControl>
                                    <Input id="username" placeholder="Username" {...field} />
                                </FormControl>
                                <FormMessage >
                                    {form.formState.errors.username?.message}
                                </FormMessage>
                            </FormItem>
                        )}></FormField>
                        <FormField name="password" control={form.control} rules={{ required: "Password is required" }} render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="password">
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input id="password" type="password" placeholder="Password" {...field} />
                                </FormControl>
                                <FormMessage >
                                    {form.formState.errors.password?.message}
                                </FormMessage>
                            </FormItem>
                        )}></FormField>
                        <Button type="submit" className="w-full cursor-pointer">
                            {isPending ? <>
                                <Loader2 className="animate-spin" />
                                Logging In
                            </> : "Login"}
                        </Button>
                        <div className="flex items-center justify-center">
                            <span className="text-sm">
                                Don't have account?
                            </span>
                            <Link to={"/sign-up"}>
                                <Button variant={"link"} size={"sm"} type="submit" className="cursor-pointer px-2">
                                    Create account
                                </Button>
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default Login