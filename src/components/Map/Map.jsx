import { GoogleMap } from "@react-google-maps/api";
import React, { useCallback, useRef } from "react";
import { defaultTheme } from "./Theme";
import { CurrentLocationMarker } from "../CurrentLocationMarker/CurrentLocationMarker";
import { CustomMarker } from "../CustomMarker/CustomMarker";

const containerStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
};

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateontrol: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: true,
  disableDoubleClickZoom: true,
  fullscreenControl: false,
  styles: defaultTheme,
};

export const MODES = {
  MOVE: 0,
  SET_MARKET: 1,
};

export const Map = ({ center, mode, markers, onMarkerAdd }) => {
  const mapRef = useRef(undefined);

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    mapRef.current = undefined;
  }, []);

  const onClick = useCallback(
    (loc) => {
      if (mode === MODES.SET_MARKET) {
        const lat = loc.latLng.lat();
        const lng = loc.latLng.lng();
        onMarkerAdd({ lat, lng });
      }
    },
    [mode, onMarkerAdd]
  );

  return (
    <div className="w-screen">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
        onClick={onClick}
      >
        <CurrentLocationMarker position={center} />
        {markers.map((pos, index) => {
          return <CustomMarker key={index} position={pos} />;
        })}
      </GoogleMap>
    </div>
  );
};
