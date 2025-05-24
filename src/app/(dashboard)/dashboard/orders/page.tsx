"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, ArrowUpDown } from "lucide-react"

// Mock data for pizza orders
const mockOrders = [
  {
    id: "PZA001",
    customerName: "John Doe",
    pizzaType: "Margherita",
    quantity: 2,
    orderDate: "2024-01-15 14:30",
    status: "Delivered",
  },
  {
    id: "PZA002",
    customerName: "Jane Smith",
    pizzaType: "Pepperoni",
    quantity: 1,
    orderDate: "2024-01-15 15:45",
    status: "Out for Delivery",
  },
  {
    id: "PZA003",
    customerName: "Mike Johnson",
    pizzaType: "Veggie Supreme",
    quantity: 3,
    orderDate: "2024-01-15 16:20",
    status: "Preparing",
  },
  {
    id: "PZA004",
    customerName: "Sarah Wilson",
    pizzaType: "Hawaiian",
    quantity: 1,
    orderDate: "2024-01-15 17:10",
    status: "Pending",
  },
  {
    id: "PZA005",
    customerName: "David Brown",
    pizzaType: "Meat Lovers",
    quantity: 2,
    orderDate: "2024-01-15 18:00",
    status: "Cancelled",
  },
  {
    id: "PZA006",
    customerName: "Emily Davis",
    pizzaType: "BBQ Chicken",
    quantity: 1,
    orderDate: "2024-01-15 19:15",
    status: "Preparing",
  },
  {
    id: "PZA007",
    customerName: "Chris Miller",
    pizzaType: "Four Cheese",
    quantity: 2,
    orderDate: "2024-01-15 20:30",
    status: "Pending",
  },
  {
    id: "PZA008",
    customerName: "Lisa Anderson",
    pizzaType: "Margherita",
    quantity: 1,
    orderDate: "2024-01-16 12:45",
    status: "Out for Delivery",
  },
  {
    id: "PZA009",
    customerName: "Tom Wilson",
    pizzaType: "Pepperoni",
    quantity: 3,
    orderDate: "2024-01-16 13:20",
    status: "Delivered",
  },
  {
    id: "PZA010",
    customerName: "Anna Taylor",
    pizzaType: "Veggie Supreme",
    quantity: 1,
    orderDate: "2024-01-16 14:10",
    status: "Preparing",
  },
]

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Preparing: "bg-blue-100 text-blue-800 border-blue-200",
  "Out for Delivery": "bg-orange-100 text-orange-800 border-orange-200",
  Delivered: "bg-green-100 text-green-800 border-green-200",
  Cancelled: "bg-red-100 text-red-800 border-red-200",
}

type SortField = "id" | "customerName" | "orderDate" | "status"
type SortDirection = "asc" | "desc"

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortField, setSortField] = useState<SortField>("orderDate")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  const filteredAndSortedOrders = useMemo(() => {
    const filtered = mockOrders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.pizzaType.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || order.status === statusFilter

      return matchesSearch && matchesStatus
    })

    // Sort the filtered results
    filtered.sort((a, b) => {
      let aValue: string | number = a[sortField]
      let bValue: string | number = b[sortField]

      if (sortField === "orderDate") {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      }

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = (bValue as string).toLowerCase()
      }

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    return filtered
  }, [searchTerm, statusFilter, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const statusCounts = useMemo(() => {
    return mockOrders.reduce(
      (acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
  }, [])

  return (
    <div className="p-0">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Pizza Orders</h1>
          <p className="text-gray-600 mt-2">Manage and track all your pizza orders in one place</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {Object.entries(statusCounts).map(([status, count]) => (
            <Card key={status}>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{count}</div>
                  <div className="text-sm text-muted-foreground">{status}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Search and filter your orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by order ID, customer name, or pizza type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Preparing">Preparing</SelectItem>
                    <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Orders ({filteredAndSortedOrders.length})</CardTitle>
            <CardDescription>
              {filteredAndSortedOrders.length === mockOrders.length
                ? "All orders"
                : `Showing ${filteredAndSortedOrders.length} of ${mockOrders.length} orders`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("id")} className="h-auto p-0 font-semibold">
                        Order ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("customerName")}
                        className="h-auto p-0 font-semibold"
                      >
                        Customer Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Pizza Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("orderDate")}
                        className="h-auto p-0 font-semibold"
                      >
                        Order Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("status")} className="h-auto p-0 font-semibold">
                        Status
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.pizzaType}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.orderDate}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusColors[order.status as keyof typeof statusColors]}>
                          {order.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredAndSortedOrders.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No orders found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
