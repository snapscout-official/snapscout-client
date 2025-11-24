import { type ReactElement } from "react"
import { AlertCircleIcon } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export function NotImplementedAlert(): ReactElement {
    return (
        <div className="grid max-w-xl absolute bottom-0 right-0 transition hover:bg-blue-100 ">
            <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>
                    This feature is not yet implemented
                </AlertTitle>
                <AlertDescription>
                    <p>Please verify your billing information and try again.</p>
                    <ul className="list-inside list-disc text-sm">
                        <li>Check your card details</li>
                        <li>Ensure sufficient funds</li>
                        <li>Verify billing address</li>
                    </ul>
                </AlertDescription>
            </Alert>
        </div>
    )
}
