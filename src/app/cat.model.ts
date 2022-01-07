export interface Cat {
  id: string;
  name: string;
  age: number;
  gender: string;
  birthDate?: any;
  colors?: Array<string>;
  imgPath: string;
  likes?: string;
  location?: {_lat: number, _long: number};
}

export interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

export interface Fruit {
  type: string;
  name: string;
  price: number;
  quantity: number
}

export interface Container{
  capacity: number;
  type: string;
  filling: number;
  fruits: Fruit,
  id: string
}

export interface Shelf {
  stack: number;
  filling: number;
  capacity: number;
  containers: Array<Container>;
  id: string;
  title: string;
}
