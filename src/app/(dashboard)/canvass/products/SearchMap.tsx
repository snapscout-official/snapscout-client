"use client"

import { inter700 } from "@/app/ui/fonts";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic"
import { useMemo } from "react";
import { Marker, Popup } from "react-leaflet";
import { useSearchParams } from "next/navigation";
import MapCenter from "../../maps/MapCenter";

type SearchMapProps = {
    locations?: LocationType[]
    forDialog?: boolean
    nextDistance: string
    search: string | string[]
}
export default function SearchMap({ locations, forDialog, nextDistance, search }: SearchMapProps) {
    const searchParams = useSearchParams()

    const LazyMap = useMemo(
        () =>
            dynamic(() => import("@/componentUtils/LeafletMap"), {
                ssr: false,
            }),
        [],
    );

    return (

        <div >
            <div className={`${inter700.className} text-[#64748B] font-bold flex justify-between items-center ${!forDialog ? "text-xs" : "text-2xl"}`}>
                <p>{locations ? `Found ${locations.length} Results` : null}</p>
                <Button variant="link" className={`${!forDialog ? "text-xs" : "text-2xl"}`} asChild onClick={() => {
                }}>
                    <a href={`/canvass/products?search=${search}&distance=${nextDistance}`}>Expand Radius to {nextDistance}km</a>
                </Button>
            </div>
            <LazyMap className={`w-full rounded-lg ${forDialog ? "h-full" : "h-[300px] mt-2"}`}>
                {locations ? <>
                    {locations.map((location, idx) => (
                        <Marker key={idx} position={[location.latitude, location.longitude]}>
                            <Popup>{location.location}</Popup>
                        </Marker>
                    ))}
                    <MapCenter position={[locations[0].latitude, locations[0].longitude]} />
                </> : null}

            </LazyMap>
        </div >
    )
}
