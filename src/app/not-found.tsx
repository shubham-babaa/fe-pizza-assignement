import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Pizza Image */}
        <div className="relative w-64 h-64 mx-auto ">
        
          <div className="absolute -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl animate-bounce">
            🍕
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold text-orange-600 tracking-tight">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Oops! This slice is missing</h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
            {"Looks like this page got eaten! Don't worry, we have plenty more delicious content waiting for you."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
          <Button
            asChild
            size="lg"
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center space-x-4 pt-8 opacity-60">
          <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse delay-100"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
        </div>

        {/* Additional Info */}
        <div className="pt-8 text-sm text-gray-500">
          <p>Error Code: 404 | Page Not Found</p>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-red-200 rounded-full opacity-20 animate-float delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-yellow-200 rounded-full opacity-20 animate-float delay-500"></div>
      </div>
    </div>
  )
}
