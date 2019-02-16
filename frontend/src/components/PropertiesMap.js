import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster/dist/react-leaflet-markercluster";

export default class PropertiesMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: [-23.551021, -46.633718],
      zoom: 13,
      maxZoom: 19
    };
  }

  invalidCoords(coords) {
    if (
      coords[0] >= -90 &&
      coords[0] <= 90 &&
      coords[1] >= -180 &&
      coords[1] <= 180
    ) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <Map
        center={this.state.position}
        zoom={this.state.zoom}
        maxZoom={this.state.maxZoom}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MarkerClusterGroup>
          {this.props.properties &&
            this.props.properties.data &&
            this.props.properties.data.map(value => {
              const coords = [
                value.location.coordinates[0],
                value.location.coordinates[1]
              ];
              if (this.invalidCoords(coords)) {
                return;
              }
              return (
                <Marker position={coords} key={value._id}>
                  <Tooltip>
                    {value.condominio && <h1>{value.condominio}</h1>}
                    <ul>
                      {value.rua && <li>Rua {value.rua}</li>}
                      {value.bairro && <li>Bairro {value.bairro}</li>}
                      {value.area && <li>Área em M²: {value.area}</li>}
                    </ul>
                  </Tooltip>
                </Marker>
              );
            })}
        </MarkerClusterGroup>
      </Map>
    );
  }
}
