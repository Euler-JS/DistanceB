import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

import { quickSort, quickSortSync, quickSortAsync } from 'ts-sort-quick'; 

import {Coordinate} from "tsgeo/Coordinate";
import {Vincenty}   from "tsgeo/Distance/Vincenty";
import { OrganizarService } from '../services/organizar.service';

import { insertionSort, insertionSortSync, insertionSortAsync } from 'ts-sort-insertion'






declare var google

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {

  dadosNigeria: any[] = []
  dadosP: any[] = []
  
  constructor(public platform: Platform,
              public organizar: OrganizarService) 
  {
    this.platform.ready().then(()=>
    {
     
      //this.ordena()
      //this.calDistance()
      this.ordenaKm()
      //this.ordem()
      
    })
  }

  calDistance(lat1, long1, lat2, long2)
  {
    var gps1 = new google.maps.LatLng(
      lat1,long1
    )

    var gps2 = new google.maps.LatLng(
      lat2, long2
    )

    var distanceInMetre = google.maps.geometry.spherical.computeDistanceBetween
    (gps1, gps2)

    
    //console.log("Metre "+distanceInMetre);

    let calculador = new Vincenty()

    //this.calcMetreToKilometer(distanceInMetre)

    return parseFloat(''+distanceInMetre * 0.001).toFixed(2)
    

  }

  private calcMetreToKilometer(distanceInMetre)
  {

    var gps1 = new Coordinate(
      12.999,33.112
    )

    var gps2 = new Coordinate(
      28.485556906988707, 77.98702201976585
    )

    let x = [12.999,33.112];

    let y = [28.485556906988707, 77.98702201976585];

    let calc = new Vincenty()
    var distanceKilo = 0.001 * distanceInMetre
    var distanceKiloGeo = calc.getDistance(gps1, gps2) * 0.001
    console.log("Kilometro "+distanceKilo +" §§ "+distanceKiloGeo + " §§ ") ;
    
    //alert("Goooo" +distanceKilo)

  }

  private ordena()
  {
    var person = { 
      firstname:"Tom", 
      lastname:"Hanks" 
   }; 

    
    

    
    
   
    quickSort([3,4,57,2,100,27,343],function(data){
      console.log("quickSort cb",data)// output: 2-3-4-27-57-100-343

      quickSortAsync([236.12, 156.3, 196.01, 25.1122, 357.5, 198.90, 420.43, 418, 75, 399, 416, 136, 396, 1, 296, 174, 36, 83,
        128, 97, 491, 259, 411, 340, 62, 373, 57, 497, 440, 168, 492, 22, 153, 44, 225, 258,
        422, 147, 419, 280, 5.2, 4.4, 5.5, 482, 211, 246, 477, 283, 244, 145, 473, 446.1, 222, 108, 133,
        315, 436, 36, 396, 18, 99, 271, 80, 425, 308, 264, 412, 420.3, 147, 171, 320, 215, 25,
        143, 90, 134, 337, 278, 76, 463, 88, 450, 178, 459, 255.4, 393, 398, 237, 336, 321,
        493, 150, 203, 149, 398, 201, 174, 236, 373, 219, 381, 53.2, 236, 156, 196, 25, 357, 198, 420, 418, 75, 399, 416, 136, 396, 1, 296, 174, 36, 83,
        128, 97, 491, 259, 411, 340, 62, 373, 57, 4972, 4401, 1680, 492, 22, 153, 44, 225, 258,
        422, 147, 419, 280, 5, 482, 211, 246, 477, 283, 244, 145, 473, 446, 222, 108, 133,
        315, 436, 36, 396, 18, 99, 271, 80, 425, 308, 264, 412, 420, 147, 171, 320, 215, 25,
        143, 90, 134, 337, 278, 76, 463, 88, 450, 178, 459, 255, 393, 398, 237, 336, 321,
        493, 150, 203, 149, 398, 201, 174, 236, 373, 219, 381, 53]).then((res) => {
        console.log('quickSortASync promise',res) // output: [2,3, 4, 27, 57,100,343]
      }).catch((error) => {
        console.log('err',error)
      })
  })
   

     
  }

  ordenaKm()
  {
    this.organizar.getNigeriaJSON().
    subscribe(
      resultado=>{

          this.dadosNigeria = resultado
          this.percorre(this.dadosNigeria)
          //console.log(this.dadosNigeria[0].longitude);
          
          /*quickSortAsync([new Vincenty().getDistance(this.dadosNigeria[0].longitude, this.dadosNigeria[0].latitude),
          this.dadosNigeria[1].longitude, this.dadosNigeria[1].latitude,this.dadosNigeria[2].longitude, this.dadosNigeria[2].latitude, 196.01, 25.1122, 357.5, 198.90, 420.43, 418, 75, 399, 416, 136, 396, 1, 296, 174, 36, 83,
            128, 97, 491, 259, 411, 340, 62, 373, 57, 497, 440, 168, 492, 22, 153, 44, 225, 258,
            422, 147, 419, 280, 5.2, 4.4, 5.5, 482, 211, 246, 477, 283, 244, 145, 473, 446.1, 222, 108, 133,
            315, 436, 36, 396, 18, 99, 271, 80, 425, 308, 264, 412, 420.3, 147, 171, 320, 215, 25,
            143, 90, 134, 337, 278, 76, 463, 88, 450, 178, 459, 255.4, 393, 398, 237, 336, 321,
            493, 150, 203, 149, 398, 201, 174, 236, 373, 219, 381, 53.2, 236, 156, 196, 25, 357, 198, 420, 418, 75, 399, 416, 136, 396, 1, 296, 174, 36, 83,
            128, 97, 491, 259, 411, 340, 62, 373, 57, 4972, 4401, 1680, 492, 22, 153, 44, 225, 258,
            422, 147, 419, 280, 5, 482, 211, 246, 477, 283, 244, 145, 473, 446, 222, 108, 133,
            315, 436, 36, 396, 18, 99, 271, 80, 425, 308, 264, 412, 420, 147, 171, 320, 215, 25,
            143, 90, 134, 337, 278, 76, 463, 88, 450, 178, 459, 255, 393, 398, 237, 336, 321,
            493, 150, 203, 149, 398, 201, 174, 236, 373, 219, 381, 53]).then((res) => {
            console.log('quickSortASync promise',res) // output: [2,3, 4, 27, 57,100,343]
          }).catch((error) => {
            console.log('err',error)
          })*/
          //console.log("JSON ",this.dadosNigeria)    
        }
      )

      
  } 

  percorre(i)
  { let d
    i.forEach(element => {
      let calc = new Vincenty()
      let obj = {
        "longitude": element.longitude,
        "latitude": element.latitude,
        "Name": element.Name,
        "description": element.description,
        "osm_id": element.osm_id,
        "operator:type": element['operator.type'],
        "healthcare:speciality": element['healthcare.speciality'],
        "addr:full": element['addr.full'],
        "amenity": element.amenity,
        "capacity:persons": element['capacity.persons'],
        "healthcare": element.healthcare,
        "addr:city": element['addr.city'],
        "source": element.source,
        "building": element.building,
        "TestingAvailability": element.TestingAvailability,
        "BedAvailability": element.BedAvailability,
        "VentilatorAvailability": element.VentilatorAvailability,
        "distance" : this.calDistance(12.999,33.112, element.latitude, element.longitude)
       }
       
       this.dadosP.push(obj)
       element = obj
       d = element
      
      
      
    });

    //console.log("D ",this.dadosP);
    

    /*quickSortAsync(this.dadosP).then((res) => {
            console.log('quickSortASync promise',res) // output: [2,3, 4, 27, 57,100,343]
          }).catch((error) => {
            console.log('err',error)
          })*/

          /*quickSort(this.dadosP,function(data){
            console.log("quickSort c",data)// output: 2-3-4-27-57-100-343
        }) 

        /*insertionSort(this.dadosP,function(data){
          console.log("insertionSort cb",data)// output: 2-3-4-27-57-100-343
      })*/

      insertionSortAsync(this.dadosP).then((res) => {
        console.log('insertionSortASync promise',res) // output: [2,3, 4, 27, 57,100,343]
      }).catch((error) => {
        console.log('err',error)
      })

  }

  ordem()
  { let d
   
      let obj = {
        "longitude": 'element.longitude',
        "latitude": 'element.latitude',
        "Name": 'element.Name',
        "description": 'element.description',
        "osm_id": 'element.osm_id',
        "operator:type": '',
        "healthcare:speciality": '',
        "addr:full": '',
        "amenity": 'element.amenity',
        "capacity:persons": 'capacity.persons',
        "healthcare": 'element.healthcare',
        "addr:city": 'addr.city',
        "source": 'element.source',
        "building": 'element.building',
        "TestingAvailability": 'element.TestingAvailability',
        "BedAvailability": 'element.BedAvailability',
        "VentilatorAvailability": 'element.VentilatorAvailability',
        "distance" : 2331
       }

       let obj1 = {
        "longitude": 'element.longitude',
        "latitude": 'element.latitude',
        "Name": 'element.Name',
        "description": 'element.description',
        "osm_id": 'element.osm_id',
        "operator:type": '',
        "healthcare:speciality": '',
        "addr:full": '',
        "amenity": 'element.amenity',
        "capacity:persons": 'capacity.persons',
        "healthcare": 'element.healthcare',
        "addr:city": 'addr.city',
        "source": 'element.source',
        "building": 'element.building',
        "TestingAvailability": 'element.TestingAvailability',
        "BedAvailability": 'element.BedAvailability',
        "VentilatorAvailability": 'element.VentilatorAvailability',
        "distance" : 21000
       }

       let obj2 = {
        "longitude": 'element.longitude',
        "latitude": 'element.latitude',
        "Name": 'element.Name',
        "description": 'element.description',
        "osm_id": 'element.osm_id',
        "operator:type": '',
        "healthcare:speciality": '',
        "addr:full": '',
        "amenity": 'element.amenity',
        "capacity:persons": 'capacity.persons',
        "healthcare": 'element.healthcare',
        "addr:city": 'addr.city',
        "source": 'element.source',
        "building": 'element.building',
        "TestingAvailability": 'element.TestingAvailability',
        "BedAvailability": 'element.BedAvailability',
        "VentilatorAvailability": 'element.VentilatorAvailability',
        "distance" : 100
       }
       
       this.dadosP.push(obj)
       this.dadosP.push(obj1)
       this.dadosP.push(obj2)
       
      
      
      
   

    //console.log("D ",this.dadosP);
    

    /*quickSortAsync(this.dadosP).then((res) => {
            console.log('quickSortASync promise',res) // output: [2,3, 4, 27, 57,100,343]
          }).catch((error) => {
            console.log('err',error)
          })*/

          /*quickSort(this.dadosP,function(data){
            console.log("quickSort cb",data)// output: 2-3-4-27-57-100-343
        })   */
        
        insertionSort(this.dadosP,function(data){
          console.log("insertionSort cb",data)// output: 2-3-4-27-57-100-343
      })

  }


  
}
