import { useJsApiLoader } from "@react-google-maps/api";
import { Map, MODES } from "./components/Map/Map";
import { Autocomplete } from "./components/Autocomplete/Autocomplete";
import { useCallback, useEffect, useState } from "react";
import s from "./App.module.css";
import { getBrowserLocation } from "./utils/geo";

const API_KEY = process.env.REACT_APP_API_KEY;

const libraries = ["places"];

function App() {
  const [center, setCenter] = useState();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const [mode, setMode] = useState(MODES.MOVE);
  const [markers, setMarkers] = useState([]);

  const toogleMode = useCallback(() => {
    switch (mode) {
      case MODES.MOVE:
        setMode(MODES.SET_MARKET);
        break;
      case MODES.SET_MARKET:
        setMode(MODES.MOVE);
        break;
      default:
        setMode(MODES.MOVE);
    }
  }, [mode]);

  const clearMarkers = () => {
    setMarkers([]);
  };

  const onPlaceSelect = useCallback((coordinates) => {
    setCenter(coordinates);
  }, []);

  const onMarkerAdd = (coordinates) => {
    setMarkers([...markers, coordinates]);
  };

  useEffect(() => {
    getBrowserLocation()
      .then((curLoc) => {
        setCenter(curLoc);
      })
      .catch((defaultLocation) => setCenter(defaultLocation));
  }, []);

  return (
    <div className="App">
      <div className={s.root}>
        <Autocomplete
          isLoaded={isLoaded}
          onSelect={onPlaceSelect}
          toogleMode={toogleMode}
          mode={mode}
          clearMarkers={clearMarkers}
        />
      </div>
      {isLoaded ? (
        <Map
          center={center}
          mode={mode}
          markers={markers}
          onMarkerAdd={onMarkerAdd}
        />
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
}

export default App;
