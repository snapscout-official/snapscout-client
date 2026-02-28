import { Card, CardContent } from "@/components/ui/card"
import { NotificationData } from "@/types/product-types"
import { Mail, MessageSquare, ThumbsUp } from "lucide-react"

const iconMap = {
    order: Mail,
    message: MessageSquare,
    quote: ThumbsUp,
}
export default function NotificationCard({ notification }: { notification: NotificationData }) {
    const Icon = iconMap[notification.notification_type]

    return (
        <Card className="transition-all">
            <CardContent className="flex items-center gap-4 p-5">
                {/* Icon */}
                <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-black" strokeWidth={2.5} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-black">{notification.title}</h3>
                    {notification.description && <p className="text-sm text-gray-500 mt-1">{notification.description}</p>}
                </div>

                {/* Status Indicator */}
                <div className="flex-shrink-0">
                    <div className={`h-3 w-3 rounded-full ${notification.opened ? "bg-green-500" : "bg-orange-400"}`} />
                </div>
            </CardContent>
        </Card>
    )
}
