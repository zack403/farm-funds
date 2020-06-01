import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  foodLisT =  [
    {id: 1, foodName: 'Chicken', foodImage: '../../../../assets/images/shop/chicken.png', price: [
      {value: 'Carton Price (N12,000)'},
      {value: 'Chicken 1KG (N1,300)'},
      {value: 'Chicken 1.5KG (N1,800)'},
      {value: 'Chicken 2KG (N2,600)'}],
      unit: '10 pcs a month', subscription:[
        {value: '1 month 25,000'},
        {value: '3 months 72,000'},
        {value: '6 months 141,000'},
        {value: '1 year 276,000'}
      ]
    },
    {
      id: 2, foodName: 'Gizzard', foodImage: '../../../../assets/images/shop/gizzard.png', price: [
        {value: 'Gizzard (N1,200)'}], unit: '5 kilos a month', subscription:[
          {value: '1 month 6,000'},
          {value: '3 months 17,700'},
          {value: '6 months 34,500'},
          {value: '1 year 66,000'}
        ]
    },
    {
      id: 3, foodName: 'Eggs', foodImage: '../../../../assets/images/shop/egg.png', price: [
        {value: 'Egg Retail 12s (N730)'},
        {value: 'Egg Retail 6s (N380)'},
        {value: 'Egg Retail 15s (N800)'},
        {value: 'Egg Retail 30s (N1,550)'},
        {value: 'Egg Wholesale Big (N900)'},
        {value: 'Egg Wholesale Medium (N850)'},
        {value: 'Egg Wholesale Small (N750)'}],
        unit: '4 crates a month', subscription:[
          {value: '1 month 7,000'},
          {value: '3 months 20,000'},
          {value: '6 months 40,800'},
          {value: '1 year 79,200'}
        ]
        
    },
    {
      id: 4, foodName: 'Rice', foodImage: '../../../../assets/images/shop/rice.png', price: [
        {value: 'Rice 50KG (N20,000)'},
        {value: 'Rice 25KG (N10,000)'},
        {value: 'Rice 10KG (N4,000)'},
        {value: 'Rice 5KG (N2,000)'}],
        unit: '1 bag a month (25KG)', subscription:[
          {value: '1 month 9,500'},
          {value: '3 months 27,000'},
          {value: '6 months 51,000'},
          {value: '1 year 96,000'}
        ]
    },
    {
      id: 5, foodName: 'Water Pack', foodImage: '../../../../assets/images/shop/water.png', price: [
        {value: '1 Pack Water (N500)'}],
        unit: '20 packs a month', subscription:[
          {value: '1 month 10,800'},
          {value: '3 months 30,000'},
          {value: '6 months 58,800'},
          {value: '1 year 115,200'}
        ]
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
