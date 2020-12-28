import { Component, OnInit, ViewChild } from '@angular/core';
import {Loader, LoaderOptions} from 'google-maps';
import { post } from 'selenium-webdriver/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  url="http://localhost:3000";
  Vehicles=[];
  VehiclesPoint=[];
  Vehicle_Number="";
  Driver_Name="";
  Vehicle_Type="";
  Fuel_Type="";

  Vehicle_Number_Point="";
  Latitude="";
  Longitude="";
  add_new_vehicle_msg="";
  add_new_vehicle_point_msg="";

  map: google.maps.Map;
  
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.fetch_all_vehicles();
  }

  loadPoints(index:any)
  {
    this.fetch_all_vehicle_points(this.Vehicles[index].Vehicle_Number); 
  }

  add_new_vehicle_point()
  {
    this.add_new_vehicle_point_msg="";
    var reqObj = {
      API_KEY:"1523sjfj9fmfm03m33df",
      Vehicle_Number:this.Vehicle_Number_Point,
      Latitude:this.Latitude,
      Longitude:this.Longitude
    }

    const headers = new HttpHeaders()
    .set("Content-Type","application/json");

    this.http.post(this.url+"/create/new-vehicle-point",JSON.stringify(reqObj),{headers:headers})
    .subscribe((response)=>{
  
      if(response["message"]=="Success")
      {
        this.add_new_vehicle_point_msg="Added Successfully"
      }
      else if(response["message"]=="Vehicle Not Found")
      {
        this.add_new_vehicle_point_msg = "Vehicle with this Number does not exists";
      }
      else if(response["message"]=="Already Exists")
      {
        this.add_new_vehicle_point_msg = "This point for this vehicle already exists";
      }
      else
      {
        this.add_new_vehicle_point_msg = "Server Problem";
      }
    })
  }

  add_new_vehicle()
  {
    this.add_new_vehicle_msg="";
    var reqObj = {
      API_KEY:"1523sjfj9fmfm03m33df",
      Vehicle_Number:this.Vehicle_Number,
      Driver_Name:this.Driver_Name,
      Vehicle_Type:this.Vehicle_Type,
      Fuel_Type:this.Fuel_Type
    }

    const headers = new HttpHeaders()
    .set("Content-Type","application/json");

    this.http.post(this.url+"/create/new-vehicle",JSON.stringify(reqObj),{headers:headers})
    .subscribe((response)=>{
    
      if(response["message"]=="Success")
      {
        this.fetch_all_vehicles();
        this.add_new_vehicle_msg="Added Successfully";
      }
      else if(response["message"]="Already Exists")
      {  
        this.add_new_vehicle_msg = "Vehicle with this Number Already Exists";
      }
      else
      {
        this.add_new_vehicle_msg = "Server Problem";
      }
    })
  }
  fetch_all_vehicles()
  {
    const reqObj ={
      API_KEY:"1523sjfj9fmfm03m33df"
    };

    const headers = new HttpHeaders()
    .set("Content-Type","application/json");

    this.http.post(this.url+"/fetch/all-vehicle",JSON.stringify(reqObj),{headers:headers})
    .subscribe((response)=>{
      if(response["message"]=="Success")
      {
        this.Vehicles = response["vehicles"];        
      }
      else
        console.log(response);
    })
  }


  fetch_all_vehicle_points(Vehicle_Number)
  {
    const reqObj ={
      API_KEY:"1523sjfj9fmfm03m33df",
      Vehicle_Number:Vehicle_Number
    };
    this.VehiclesPoint=[];
    const headers = new HttpHeaders()
    .set("Content-Type","application/json");

    this.http.post(this.url+"/fetch/vehicle-all-points",JSON.stringify(reqObj),{headers:headers})
    .subscribe((response)=>{
      if(response["message"]=="Success")
      {
        this.VehiclesPoint = response["vehicle_points"];
        this.loadGoogleMap();
      }
      else
        console.log(response);
    })
  }

  loadGoogleMap()
  {
    var mapProp = {
      center: new google.maps.LatLng(parseFloat(this.VehiclesPoint[0].Latitude), parseFloat(this.VehiclesPoint[0].Longitude)),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(document.getElementById("map"), mapProp);
    var ans = [];
    for(var i=0;i<this.VehiclesPoint.length;i++)
    {
      ans.push({
                lat:parseFloat(this.VehiclesPoint[i].Latitude),
                lng:parseFloat(this.VehiclesPoint[i].Longitude)
              });
    }
    
    const flightPlanCoordinates=ans;

    const flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
    flightPath.setMap(this.map);

    const start_markers = new google.maps.Marker({
      position:{lat:parseFloat(this.VehiclesPoint[0].Latitude), lng:parseFloat(this.VehiclesPoint[0].Longitude)} ,
      title: "Start Point!"
    });
    start_markers.setMap(this.map);

    if(this.VehiclesPoint.length>1)
    {
      const end_markers = new google.maps.Marker({
        position:{lat:parseFloat(this.VehiclesPoint[this.VehiclesPoint.length-1].Latitude), lng:parseFloat(this.VehiclesPoint[this.VehiclesPoint.length-1].Longitude)} ,
        title: "End Point"
      });
      end_markers.setMap(this.map);
    }
  }
}
