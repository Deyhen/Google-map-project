import { Marker } from "@react-google-maps/api";

export const CustomMarker = ({ position }) => {
  return (
    <>
      <Marker position={position} />
    </>
  );
};
