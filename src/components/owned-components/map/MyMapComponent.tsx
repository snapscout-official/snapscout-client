import { type ReactElement } from "react"
import { useMapEvents } from "react-leaflet"

export function MyMapComponent(): ReactElement | null {
    const map = useMapEvents({
        click() {
            map.locate()
        },
        locationfound(e) {
            console.log("Here is the location", e.latlng.lat, e.latlng.lng)
        }

    })
    return null
}
