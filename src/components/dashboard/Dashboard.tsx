import { useQuery } from "@tanstack/react-query"
import { Card } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useEffect, useState } from "react"
import { fetchInventory } from "@/lib/api"
import { Skeleton } from "../ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { ArrowDown01, ArrowDownAZ, ArrowUp01, ArrowUpAZ, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"

interface Product {
  id: string
  name: string
  inventory: number
}

const Dashboard = () => {
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState<"name" | "inventory">("name")

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const username = !!localStorage.getItem("user_name")
  const { data, isLoading } = useQuery({
    queryKey: ["inventory", page],
    queryFn: () => fetchInventory(page),
    enabled: username,
    staleTime: 5 * 60 * 1000, // Fresh for 5 min
    refetchOnMount: false, // No unnecessary refetching
    refetchOnWindowFocus: false, // Doesn't refetch on tab switch
    refetchOnReconnect: true, // Only refetch when the internet is back
  }
  )
  const sortedProducts = data?.data ? [...data.data].sort((a, b) => {
    if (sortBy == "name") {
      return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    } else {
      return sortOrder === "asc" ? a.inventory - b.inventory : b.inventory - a.inventory
    }
  })
    : []
  useEffect(() => {
    const username = localStorage.getItem("user_name")
    localStorage.setItem(`${username}-lastPage`, "dashboard")
  }, [])

  return (
    <div className="flex flex-col p-8 space-y-6">
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl gradient-title">Product Inventory</h1>
          <p className="text-slate-600 mt-2">Overview of current product stock levels</p>
        </div>
        <div className="max-w-sm  w-full flex flex-col md:flex-row  gap-2 space-y-2">
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as "name" | "inventory")}>
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name" >Product Name</SelectItem>
              <SelectItem value="inventory" >Inventory</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as 'asc' | 'desc')}>
            <SelectTrigger>
              <SelectValue placeholder="Select graph type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">
                {sortBy == "name" ?
                  <ArrowDownAZ />
                  :
                  <ArrowDown01 />
                }
              </SelectItem>
              <SelectItem value="desc">
                {sortBy == "name" ?
                  <ArrowUpAZ />
                  :
                  <ArrowUp01 />
                }
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Card className="overflow-hidden h-[60vh] border-0">
        {isLoading ?
          <div className="space-y-2 p-2">
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
          </div> :
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  Product Name
                </TableHead>
                <TableHead>
                  Inventory
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody >
              {sortedProducts && sortedProducts.map((product: Product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium w-2/3">{product.name}</TableCell>
                  <TableCell className="w-1/3">{product.inventory}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
      </Card>
      <div className="flex items-center gap-4 mx-auto mt-2">
        <Button disabled={page == 1} size={"icon"} onClick={() => setPage(prev => prev - 1)}>
          <ChevronLeft />
        </Button>
        <Button size={"icon"}>{data?.currentPage}</Button>
        <Button disabled={data?.currentPage == data?.totalPages} size={"icon"} onClick={() => setPage(prev => prev + 1)}>
          <ChevronRight />
        </Button>
      </div>
    </div >
  )
}

export default Dashboard