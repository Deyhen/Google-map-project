import { InfoWindow, Marker } from "@react-google-maps/api";
import { useState } from "react";
import { Button } from "rsuite";

export const CustomMarker = ({ position, onDelete }) => {
  const [isClicked, setIsClicked] = useState(false);
  const onClick = () => {
    setIsClicked(!isClicked);
  };
  return (
    <>
      <Marker position={position} onClick={onClick}>
        {isClicked && (
          <InfoWindow onCloseClick={onClick}>
            <div className="w-full flex flex-col justify-center items-center">
              <div>
                <p>
                  width: {position.lng} <br /> long: {position.lat}
                </p>
              </div>
              <Button
                onClick={() => {
                  onDelete(position);
                }}
                className="flex items-center justify-center h-6 w-full  mt-2 p-2 bg-slate-300 hover:bg-slate-200"
              >
                <>Delete</>
              </Button>
            </div>
          </InfoWindow>
        )}
      </Marker>
    </>
  );
};
