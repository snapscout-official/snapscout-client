import { type ReactElement } from "react"

export default async function Cacheable() {

    async function fetchDummyData() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/v1/dummy`)
        const data = await response.json()
        const messages: string[] = data.messages
        return messages
    }
    const messages: string[] = await fetchDummyData()
    return (
        <div>
            {messages.map((message) => (
                <div>
                    {message}
                </div>
            ))}
        </div>

    )
}
