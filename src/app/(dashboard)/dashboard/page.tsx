"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Clock, Pizza, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  const { data: session } = useSession()

  const stats = [
    {
      title: "Total Orders",
      value: "24",
      description: "+12% from last month",
      icon: Pizza,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Active Orders",
      value: "8",
      description: "Currently being prepared",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Revenue",
      value: "$1,234",
      description: "+8% from last month",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ]

  return (
    <div className="p-0">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16 border-2 border-white">
                  <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                  <AvatarFallback className="bg-white text-orange-600 text-xl font-bold">
                    {session?.user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold">Hello, {session?.user?.name?.split(" ")[0] || "User"}! 👋</h1>
                  <p className="text-orange-100 mt-1">
                    Welcome back to your pizza dashboard. Here's what's happening today.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest pizza orders and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "New order received", time: "2 minutes ago", status: "new" },
                  { action: "Order #PZA023 delivered", time: "15 minutes ago", status: "completed" },
                  { action: "Order #PZA022 out for delivery", time: "32 minutes ago", status: "delivery" },
                  { action: "Order #PZA021 being prepared", time: "1 hour ago", status: "preparing" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.status === "new"
                          ? "bg-blue-500"
                          : activity.status === "completed"
                            ? "bg-green-500"
                            : activity.status === "delivery"
                              ? "bg-orange-500"
                              : "bg-yellow-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="flex items-center space-x-3">
                    <Pizza className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-medium">View All Orders</p>
                      <p className="text-sm text-muted-foreground">Manage your pizza orders</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="flex items-center space-x-3">
                    <CalendarDays className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Today's Schedule</p>
                      <p className="text-sm text-muted-foreground">Check delivery schedule</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Sales Report</p>
                      <p className="text-sm text-muted-foreground">View performance metrics</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
