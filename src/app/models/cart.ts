export interface Cart {
    name: string;
    address: string;
    note: string;
    phoneNo: string;
    email: string;
    UserId: string;
    type: string;
    purchaseDetails: [
        {
            productName: string,
            productId: string,
            unit: number,
            price: number,
            brand: string,
            productImage: string
        }
    ]

}