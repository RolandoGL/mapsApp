import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit {

  @Input() public lngLat?: [number, number]
  @ViewChild('map') public divMap?: ElementRef
  public map?: Map
  ngAfterViewInit(): void {
    if( !this.divMap?.nativeElement ) throw new Error('divMap: property doesnot exist');
    if( !this.lngLat ) throw new Error('LngLat: property cannot be null');
    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat,
      zoom: 15,
      interactive: false
    })
    new Marker().setLngLat(this.lngLat).addTo(this.map)
  }
}
