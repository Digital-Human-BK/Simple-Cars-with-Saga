import { Car, NewCar } from '../interfaces/Car';

export default function validateAddCar(carData: NewCar | Car) {
  return Object.values(carData).every((value) => Boolean(value) !== false);
}
