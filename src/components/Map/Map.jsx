import { GoogleMap } from "@react-google-maps/api";
import React, { useCallback, useRef, useState } from "react";
import { defaultTheme } from "./Theme";
import { CurrentLocationMarker } from "../common/CurrentLocationMarker/CurrentLocationMarker";
import { CustomMarker } from "../common/CustomMarker/CustomMarker";

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

export const Map = ({ center }) => {
  const mapRef = useRef(undefined);

  const [markers, setMarkers] = useState([]);

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    mapRef.current = undefined;
  }, []);

  const onMarkerAdd = useCallback(
    (coordinates) => {
      setMarkers([...markers, { ...coordinates, isActive: false }]);
    },
    [markers]
  );

  const onClick = useCallback(
    (location) => {
      const lat = location.latLng.lat();
      const lng = location.latLng.lng();

      !markers.some((marker) => marker.lat === lat && marker.lng === lng) &&
        onMarkerAdd({ lat, lng });
    },
    [onMarkerAdd, markers]
  );

  const onMarkerDelete = (markerForDelete) => {
    let filteredMarkers = markers.filter(
      (e) => markerForDelete.lat !== e.lat && markerForDelete.lng !== e.lng
    );
    console.log(filteredMarkers);
    setMarkers([...filteredMarkers]);
  };

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
        {markers.map((element, index) => {
          return (
            <CustomMarker
              key={index}
              position={{ lng: element.lng, lat: element.lat }}
              onDelete={onMarkerDelete}
            />
          );
        })}
      </GoogleMap>
    </div>
  );
};
