import { Marker } from "@react-google-maps/api";
import markerIcon from "../icons/currentLocationMarker.svg";

export const CurrentLocationMarker = ({ position }) => {
  return <Marker position={position} icon={markerIcon} />;
};
