import { Component, OnInit } from '@angular/core';

interface Property {
  title: string;
  description: string;
  lngLat: [number, number];
}
@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styles: [],
})
export class PropertiesComponent implements OnInit {
  properties: Property[] = [
    {
      title: 'Resident house, Canadá',
      description: 'Beautiful property in Katana, Canadá',
      lngLat: [-75.92722289474008, 45.280015511264466],
    },
    {
      title: 'Beach house, México',
      description: 'Beautiful beach house in Acapulco, México',
      lngLat: [-99.91287720907991, 16.828940930185748],
    },
    {
      title: 'Apartment, Argentina',
      description:
        'Luxurious apartment in the heart of Buenos Aires, Argentina',
      lngLat: [-58.430166677283445, -34.57150108832866],
    },
    {
      title: 'Commercial local, España',
      description:
        'Local shopping available in Madrid, Spain, near The Secret Garden.',
      lngLat: [-3.7112735618380177, 40.42567285425766],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
