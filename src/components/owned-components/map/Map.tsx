"use client"

import { type ReactElement } from "react"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from 'leaflet';

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { MyMapComponent } from "./MyMapComponent";

interface MapProps {
    posix: LatLngExpression | LatLngTuple,
    zoom?: number,
}
export default function Map(mapProps: MapProps): ReactElement {
    const { posix, zoom = 12 } = mapProps
    return (
        <MapContainer center={posix} zoom={zoom} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
            <Marker position={posix} draggable={false}>
                <Popup>I am here right now</Popup>
            </Marker>
            <MyMapComponent />
        </MapContainer>

    )
}
