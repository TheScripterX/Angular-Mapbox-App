import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
//
import * as mapboxgl from 'mapbox-gl';
//
interface MarkerColor {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [number, number];
}

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styles: [
    `
      .map-container {
        width: 100%;
        height: 100%;
      }

      .list-group {
        position: fixed;
        top: 20px;
        right: 15px;
        z-index: 999;
        font-weight: bold;
      }
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class MarkersComponent implements AfterViewInit {
  @ViewChild('map') mapDiv!: ElementRef;
  map!: mapboxgl.Map;
  zoomLevel: number = 16;
  center: [number, number] = [-7.6765, 33.5663];
  markers: MarkerColor[] = [];

  constructor() {}

  ngAfterViewInit() {
    this.mapbox();
    this.markerMap();
    this.readMarkerLS();
  }

  mapbox() {
    this.map = new mapboxgl.Map({
      container: this.mapDiv.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
      minZoom: 0,
      maxZoom: 17,
    });
  }

  markerMap() {
    const divMarker: HTMLElement = document.createElement('div');
    divMarker.innerHTML = 'Hello World';
    new mapboxgl.Marker({
      element: divMarker,
    })
      .setLngLat(this.center)
      .addTo(this.map);
  }

  addMarker() {
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color: color,
    })
      .setLngLat(this.center)
      .addTo(this.map);

    newMarker.on('dragend', () => {
      this.saveMarkerLS();
    });

    this.markers.push({
      color: color,
      marker: newMarker,
    });
    this.saveMarkerLS();
  }

  deleteMarker(i: number) {
    this.markers[i]?.marker?.remove();
    this.markers.splice(i, 1);
    this.saveMarkerLS();
  }

  goToMarker(marker: mapboxgl.Marker) {
    this.map.flyTo({
      center: marker.getLngLat(),
    });
  }

  saveMarkerLS() {
    const lngLatArray: MarkerColor[] = [];

    this.markers.forEach((m) => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      lngLatArray.push({
        color: color,
        center: [lng, lat],
      });
    });
    localStorage.setItem('Markers', JSON.stringify(lngLatArray));
  }

  readMarkerLS() {
    if (!localStorage.getItem('Markers')) {
      return;
    }

    const lngLatArray: MarkerColor[] = JSON.parse(
      localStorage.getItem('Markers')!
    );

    lngLatArray.forEach((m) => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true,
      })
        .setLngLat(m.center!)
        .addTo(this.map);

      this.markers.push({
        marker: newMarker,
        color: m.color,
      });

      newMarker.on('dragend', () => {
        this.saveMarkerLS();
      });
    });
  }
}
