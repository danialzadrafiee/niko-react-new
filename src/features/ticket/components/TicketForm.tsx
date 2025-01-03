import React, { useState } from "react"
import { useTickets } from "../hooks/useTickets"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"

const TicketForm: React.FC = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const { createTicket, loading } = useTickets()

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("submit")
    e.preventDefault()
    await createTicket({ title, description })
    setTitle("")
    setDescription("")
  }

  return (
    <Card className="w-full rtl shadow-lg">
      <CardHeader className="rounded-t-lg bg-cyan-500 text-white">
        <CardTitle className="text-2xl">ایجاد تیکت جدید</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit} id="ticket-form">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-lg font-semibold">
                عنوان
              </Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
                className="border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-lg font-semibold">
                توضیحات
              </Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                rows={3} 
                required 
                className="border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200" 
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50">
          <Button 
            type="submit"
            disabled={loading} 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            {loading ? "در حال ایجاد..." : "ایجاد تیکت"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default TicketForm