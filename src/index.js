import React from "react";
import ReactDOM from "react-dom";
import Leaflet from "leaflet";
import "./styles.css";

class Livemap extends React.Component {
  constructor(props) {
    super(props)
    this.mapRef = React.createRef();
    this.map = null;
  }
  componentDidMount() {
    this.map = Leaflet.map(this.mapRef.current).setView([44.4759, -73.2121], 13);
    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.map.on('click', this.onMapClick);
  }

  componentWillUnmount() {
    this.map.off("click", this.onMapClick);
    this.map = null;
  }

  onMapClick = (e) => {
    const {lat, lng} = e.latlng;
    Leaflet.marker([lat, lng]).addTo(this.map)
  };

  render() {
    return <div ref={this.mapRef} id="mapid" className="map" />;
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<Livemap />, rootElement);
