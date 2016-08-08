
export class PointModel {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  bloodGroup: string;
  longitude: number;
  latitude: number;
  ip: string;

  

  constructor(){

  }

  fromPoint(point){
    this._id = point._id;
    this.firstName = point.firstName;
    this.lastName = point.lastName;
    this.phone = point.phone;
    this.email = point.email;
    this.bloodGroup = point.bloodGroup;
    this.longitude = point.longitude;
    this.latitude = point.latitude;
    this.address = point.address;
    this.ip = point.ip;
  
  }

  fromFeatures(attributes){
    this._id = attributes._id;
    this.firstName = attributes.firstName;
    this.lastName = attributes.lastName;
    this.phone = attributes.phone;
    this.email = attributes.email;
    this.bloodGroup = attributes.bloodGroup;
    this.longitude = attributes.longitude;
    this.latitude = attributes.latitude;
    this.address = attributes.address;
    this.ip = attributes.ip;
    

  }

  between(min, max){
    return min[0]<=this.longitude && this.longitude<=max[0] && min[1]<=this.latitude && this.latitude<=max[1];
  }
}