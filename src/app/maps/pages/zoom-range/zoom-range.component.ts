import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
//
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .map-container {
        width: 100%;
        height: 100%;
      }

      .row {
        font-weight: bold;
        background-color: lightblue;
        width: 400px;
        position: fixed;
        bottom: 50px;
        left: 50px;
        padding: 8px;
        border-radius: 5px;
        z-index: 99;
      }
    `,
  ],
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') mapDiv!: ElementRef;
  map!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [-7.6765, 33.5663];

  constructor() {}

  // ngOnInit(): void {
  //   this.mapbox();
  // }

  ngAfterViewInit() {
    this.mapbox();
    this.mapZoomLevel();
    this.mapMoveCenter();
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

  mapZoomLevel() {
    this.map.on('zoom', () => {
      this.zoomLevel = this.map.getZoom();
    });
  }
  mapMoveCenter() {
    this.map.on('move', (event) => {
      const target = event.target;
      const { lng, lat } = target.getCenter();
      this.center = [lng, lat];
    });
  }

  zoomIn() {
    this.map.zoomIn();
  }

  zoomOut() {
    this.map.zoomOut();
  }

  zoomChanged(value: string) {
    this.map.zoomTo(Number(value));
  }

  ngOnDestroy(): void {
    this.map.off('move', () => {});
    this.map.off('zoom', () => {});
  }
}
