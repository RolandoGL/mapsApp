import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl'
@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') public divMap?: ElementRef
  public zoom: number = 10
  public map?: Map
  public lngLat: LngLat = new LngLat(-74.5, 50)
  ngAfterViewInit(): void {

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });
    this.mapListeners()
  }

  ngOnDestroy(): void {
    this.map?.remove()
  }

  public mapListeners(): void {
    if (!this.map) throw new Error(" Map doesn't exist ")
    this.map.on('zoom', (e) => {
      this.zoom = this.map!.getZoom()
    })

    this.map.on('zoomend', (e) => {
      if (this.map!.getZoom() < 18) return
      this.map!.zoomTo(18)
    })

    this.map.on('move', (e) => {
      this.lngLat = this.map!.getCenter()
    })
  }

  public zoomIn(): void {
    this.map?.zoomIn()
  }

  public zoomOut(): void {
    this.map?.zoomOut()
  }

  public zoomChange(value: string): void {
    this.zoom = parseInt(value)
    this.map!.zoomTo(this.zoom)
  }
}
