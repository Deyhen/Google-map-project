import { useJsApiLoader } from "@react-google-maps/api";
import { Map } from "./components/Map/Map";
import { Autocomplete } from "./components/Autocomplete/Autocomplete";
import { useCallback, useState } from "react";
import s from "./App.module.css";

const API_KEY = process.env.REACT_APP_API_KEY;
console.log(API_KEY);

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};

const libraries = ["places"];

function App() {
  const [center, setCenter] = useState(defaultCenter);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const onPlaceSelect = useCallback((coordinates) => {
    setCenter(coordinates);
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
