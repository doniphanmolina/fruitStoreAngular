
export interface FruitStoreModel {
  containers: Array<Container>
}


export interface Container{
  capacity: number;
  price: number;
  title: string;
  type: number;
  filling: number;
  fruits: Array<Fruit>,
  id: string
}

export interface Fruit {
  type: number;
  name: string;
  price: number;
}
