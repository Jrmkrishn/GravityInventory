import { fetchGraphData } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useEffect, useState } from "react"
import { Card } from "../ui/card"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"
import { Skeleton } from "../ui/skeleton"

type GrapType = "bar" | "line"


const Graph = () => {
  const username = localStorage.getItem("user_name")

  const storedGraphType = localStorage.getItem(`${username}-graphType`) as GrapType | null;
  const [graphType, setGraphType] = useState<GrapType>(storedGraphType ?? "bar")

  const { data: graphData, isLoading } = useQuery({
    queryKey: ["graph"],
    queryFn: fetchGraphData,
    staleTime: 5 * 60 * 1000, // Fresh for 5 min
    refetchOnMount: false, // No unnecessary refetching
    refetchOnWindowFocus: false, // Doesn't refetch on tab switch
    refetchOnReconnect: true, // Only refetch when the internet is back
  }
  )
  useEffect(() => {
    localStorage.setItem(`${username}-lastPage`, "graph")
    localStorage.setItem(`${username}-graphType`, graphType)
  }, [graphType])
  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-4xl gradient-title">Analytics</h1>
          <p className="text-slate-600 mt-2">Monthly performance metrics</p>
        </div>
        <div>
          <Select value={graphType} onValueChange={(value) => setGraphType(value as GrapType)}>
            <SelectTrigger>
              <SelectValue placeholder="Select graph type" />
            </SelectTrigger>
            <SelectContent className="mr-2">
              <SelectItem value="bar">Bar Graph</SelectItem>
              <SelectItem value="line">Line Graph</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Card className="p-4">
        {isLoading ? <Skeleton className="w-full h-96" /> :
          <div className="h-96">
            <ResponsiveContainer width={"100%"} height={"100%"}>
              {graphType == "bar" ?
                <BarChart data={graphData}>
                  <CartesianGrid strokeDasharray={"3 3"} />
                  <XAxis dataKey={"name"} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey={"value"} fill="#6366f1" stroke="#6366f1" />
                </BarChart>
                :
                <LineChart data={graphData}>
                  <CartesianGrid strokeDasharray={"3 3"} />
                  <XAxis dataKey={"name"} />
                  <YAxis />
                  <Tooltip />
                  <Line type={"monotone"} dataKey={"value"} stroke="#6366f1" />
                </LineChart>
              }
            </ResponsiveContainer>
          </div>
        }
      </Card>
    </div>
  )
}

export default Graph