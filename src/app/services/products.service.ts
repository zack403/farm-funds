import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  foodLisT = [
    {
      id: 1, foodName: 'Chicken', weight: 1.6, description: 'A full Chicken', foodImage: '../../../../assets/images/about/shop-chicken.jpeg',
      price: [
        { value: 'Chicken Carton (N13,000)' },
        { value: 'Chicken 1KG (N1,300)' },
      ],
      unit: '10 pcs a month', subscription: [
        { value: '1 month 25,000' },
        { value: '3 months 72,000' },
        { value: '6 months 141,000' },
        { value: '1 year 276,000' }
      ]
    },
    {
      id: 2, foodName: 'Gizzard', weight: 1.2, description: 'A Meat', foodImage: '../../../../assets/images/about/shop-gizard.jpeg',
      price: [
        { value: 'Gizzard (N1,200)' }],
      unit: '5 kilos a month', subscription: [
        { value: '1 month 6,000' },
        { value: '3 months 17,700' },
        { value: '6 months 34,500' },
        { value: '1 year 66,000' }
      ]
    },
    {
      id: 3, foodName: 'Eggs', weight: 5.6, description: 'Crates of Egg', foodImage: '../../../../assets/images/about/shop-eggs.jpeg',
      price: [
        { value: 'Egg Per Crate (N800)' },
        { value: 'Egg 50 Crates (Wholesale price) (N750)' },
      ],
      unit: '4 crates a month', subscription: [
        { value: '1 month 7,000' },
        { value: '3 months 20,000' },
        { value: '6 months 40,800' },
        { value: '1 year 79,200' }
      ]

    },
    {
      id: 4, foodName: 'Rice', weight: 50, description: 'A full bag of rice', foodImage: '../../../../assets/images/about/shop-rice.jpeg', price: [
        { value: 'Rice 50KG (N20,000)' },
        { value: 'Rice 25KG (N10,000)' },
        { value: 'Rice 10KG (N4,000)' },
        { value: 'Rice 5KG (N2,000)' }],
      unit: '1 bag a month (25KG)', subscription: [
        { value: '1 month 9,500' },
        { value: '3 months 27,000' },
        { value: '6 months 51,000' },
        { value: '1 year 96,000' }
      ]
    },
    {
      id: 5, foodName: 'Water Pack', weight: 8.0, description: 'A carton of bottle water', foodImage: '../../../../assets/images/about/shop-water.jpeg',
      price: [
        { value: '1 Pack Water (N450)' },
        { value: '50 Packs and Above (N400)' }],
      unit: '20 packs a month', subscription: [
        { value: '1 month 10,800' },
        { value: '3 months 30,000' },
        { value: '6 months 58,800' },
        { value: '1 year 115,200' }
      ]
    },
    {
      id: 6, foodName: 'Yam', weight: 'N/A', description: 'Yam Tuber', foodImage: '../../../../assets/images/about/shop-yam.jpeg',
      price: [
        { value: 'Yam Tuber (N800)' },
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
