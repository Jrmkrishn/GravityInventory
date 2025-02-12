import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { userSchema } from "@/lib/zod"
import { Link } from "react-router"

interface UserProps {
  username: string,
  password: string
}

const SignUp = () => {
  const form = useForm<UserProps>(

    {
      resolver: zodResolver(userSchema),
      defaultValues: {
        username: "",
        password: ""
      }
    })

  const onSubmit = (data: UserProps) => {
    toast.success("Created account successfully!")
    console.log(data);
  }
  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle className="gradient-title text-4xl  text-center">
          Sign Up
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField name="username" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="username">
                  Username
                </FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />

              </FormItem>
            )}></FormField>
            <FormField name="password" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">
                  Password
                </FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />

              </FormItem>
            )}></FormField>
            <Button type="submit" className="w-full cursor-pointer">
              SignUp
            </Button>
            <div className="flex items-center justify-center">
              <span className="text-sm">
                Already have account?
              </span>
              <Link to={"/"}>
                <Button variant={"link"} size={"sm"} type="submit" className="cursor-pointer px-2">
                  Login
                </Button>
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SignUp