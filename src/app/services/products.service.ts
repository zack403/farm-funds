import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  foodLisT =  [
    {id: 1, foodName: 'Chicken', foodImage: '../../../../assets/images/shop/chicken.png', price: [
      {value: 'Carton Price (12,000)'},
      {value: 'Chicken 1KG (1,300)'},
      {value: 'Chicken 1.5KG (1,800)'},
      {value: 'Chicken 2KG (2,600)'}]
    },
    {
      id: 2, foodName: 'Gizzard', foodImage: '../../../../assets/images/shop/gizzard.png', price: [
        {value: 'Gizzard (1,200)'}]
    },
    {
      id: 3, foodName: 'Eggs', foodImage: '../../../../assets/images/shop/egg.png', price: [
        {value: 'Egg Retail 12s (N730)'},
        {value: 'Egg Retail 6s (N380)'},
        {value: 'Egg Retail 15s (N800)'},
        {value: 'Egg Retail 30s (N1,550)'},
        {value: 'Egg Wholesale Big (N900)'},
        {value: 'Egg Wholesale Medium (N850)'},
        {value: 'Egg Wholesale Small (N750)'}]
    },
    {
      id: 4, foodName: 'Rice', foodImage: '../../../../assets/images/shop/rice.png', price: [
        {value: 'Rice 50KG (N20,000)'},
        {value: 'Rice 25KG (N10,000)'},
        {value: 'Rice 10KG (N4,000)'},
        {value: 'Rice 5KG (N2,000)'}]
    },
    {
      id: 5, foodName: 'Water Pack', foodImage: '../../../../assets/images/shop/water.png', price: [
        {value: '1 Pack Water (N500)'}]
    }
  ]
  constructor() { }

  getFoodList() {
    return this.foodLisT;
  }

  getFoodListById(id: number) {
    return this.foodLisT.find(x => x.id === id);
  }
}
