import { useQuery } from "@tanstack/react-query"
import { Card } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useEffect } from "react"
import { fetchInventory } from "@/lib/api"
import { Skeleton } from "../ui/skeleton"

interface Product {
  id: string
  name: string
  inventory: number
}

const Dashboard = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["inventory"],
    queryFn: fetchInventory,
    staleTime: 5 * 60 * 1000, // Fresh for 5 min
    refetchOnMount: false, // No unnecessary refetching
    refetchOnWindowFocus: false, // Doesn't refetch on tab switch
    refetchOnReconnect: true, // Only refetch when the internet is back
  }
  )
  useEffect(() => {
    const username = localStorage.getItem("user_name")
    localStorage.setItem(`${username}-lastPage`, "dashboard")
  }, [])

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-4xl gradient-title">Product Inventory</h1>
        <p className="text-slate-600 mt-2">Overview of current product stock levels</p>
      </div>
      <Card className="overflow-hidden">
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
          <Table >
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
            <TableBody>
              {products && products.map((product: Product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.inventory}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
      </Card>
    </div>
  )
}

export default Dashboard