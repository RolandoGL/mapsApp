import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl'


interface MarkerAndColor{
  color: string,
  marker: Marker
}

interface PlainMarker{
  color: string,
  lngLat: number[]
}
@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit {
  @ViewChild('map') public divMap?: ElementRef
  public zoom: number = 14
  public map?: Map
  public lngLat: LngLat = new LngLat(-99.2291839, 19.2827403)
  public markers: MarkerAndColor[] = []
  ngAfterViewInit(): void {

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.readFromLocalStorage()
    // const marker = new Marker({
    //                   // color: 'black',
    //                   // element: markerElement
    //                 })
    //                 .setLngLat( this.lngLat )
    //                 .addTo( this.map )
  }
  public addMarker(lngLat: LngLat, color: string = 'green'):void{
    if( !this.map ) return

    const marker = new Marker({ color, draggable: true })
                  .setLngLat( lngLat )
                  .addTo( this.map )

    this.markers.push( { color, marker} )
    this.saveToLocalStorage()
    marker.on('dragend', ()=> this.saveToLocalStorage() )
  }

  public createMarker(){
    if( !this.map ) return

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lgnLat = this.map!.getCenter()
    this.addMarker(lgnLat, color)
  }

  public deleteMarker( i: number ):void{
    this.markers[i].marker.remove()
    this.markers.splice(i, 1)
  }
  public flyTo( marker: Marker ):void{
    this.map?.flyTo({
      zoom:19,
      center: marker.getLngLat()
    })
  }

  public saveToLocalStorage():void{
    const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    })
    localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ))
  }

  public readFromLocalStorage():void{
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? ''

    const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString )

    // this.markers = plainMarkers
    plainMarkers.forEach( ({color, lngLat}) => {
      const [ lng, lat ] = lngLat
      const coords = new LngLat( lng, lat)
      this.addMarker( coords, color)
    });
  }
}


