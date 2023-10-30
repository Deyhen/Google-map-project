import { useJsApiLoader } from "@react-google-maps/api";
import { Map } from "./components/Map/Map";
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

  const onPlaceSelect = useCallback((coordinates) => {
    setCenter(coordinates);
  }, []);

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
        <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect} />
      </div>
      {isLoaded ? <Map center={center} /> : <h2>Loading</h2>}
    </div>
  );
}

export default App;
