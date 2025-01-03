import React, { useState, useEffect } from "react"
import { useTickets } from "../hooks/useTickets"
import { TicketData, TicketMessage } from "../types"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Send, AlertCircle, CheckCircle, Clock } from "lucide-react"

interface TicketDetailProps {
  ticketId: number
  isAdmin: boolean
}

const TicketDetail: React.FC<TicketDetailProps> = ({ ticketId, isAdmin }) => {
  const { getTicket, updateTicket, addMessage, currentTicket, loading, error } = useTickets()
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    getTicket(ticketId)
  }, [ticketId, getTicket])

  const handleStatusChange = async (newStatus: TicketData["status"]) => {
    if (currentTicket) {
      await updateTicket(currentTicket.id, { status: newStatus })
    }
  }

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() && currentTicket) {
      await addMessage(currentTicket.id, newMessage)
      setNewMessage("")
    }
  }

  if (loading) return <div className="text-right">در حال بارگذاری...</div>
  if (error) return <div className="text-right text-red-500">خطا: {error}</div>
  if (!currentTicket) return <div className="text-right">تیکت یافت نشد</div>

  return (
    <Card className="w-full rtl shadow-lg">
      <CardHeader className="bg-purple-500 rounded-t-lg text-white">
        <CardTitle className="text-2xl">{currentTicket.title}</CardTitle>
        <CardDescription className="text-gray-100">{currentTicket.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-lg font-semibold">
            وضعیت:
            <span className={`ml-2 px-2 py-1 rounded-full ${currentTicket.status === "open" ? "bg-green-100 text-green-800" : currentTicket.status === "in_progress" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
              {currentTicket.status === "open" ? "باز" : currentTicket.status === "in_progress" ? "در حال بررسی" : "بسته شده"}
            </span>
          </p>
          {isAdmin && (
            <div className="space-x-2">
              <Button onClick={() => handleStatusChange("open")} variant="outline" className="bg-green-500 text-white hover:bg-green-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                باز
              </Button>
              {/* <Button onClick={() => handleStatusChange("in_progress")} variant="outline" className="bg-yellow-500 text-white hover:bg-yellow-600">
                <Clock className="w-4 h-4 mr-2" />
                در حال بررسی
              </Button> */}
              <Button onClick={() => handleStatusChange("closed")} variant="outline" className="bg-red-500 text-white hover:bg-red-600">
                <AlertCircle className="w-4 h-4 mr-2" />
                بستن
              </Button>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <MessageCircle className="w-6 h-6 mr-2" />
            پیام‌ها
          </h3>
          {currentTicket.messages?.map((message: TicketMessage) => (
            <Card key={message.id} className="p-4 shadow-md">
              <CardContent>
                <p className="font-semibold text-blue-600">
                  {message.user?.first_name} {message.user?.last_name}:
                </p>
                <p className="mt-2">{message.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50">
        <form onSubmit={handleSubmitMessage} className="w-full space-y-2">
          <Textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="پیام خود را اینجا بنویسید" className="w-full border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200" />
          <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white">
            <Send className="w-4 h-4 mr-2" />
            ارسال پیام
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

export default TicketDetail
