export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageExists: boolean;
    imageUrl: string | null;
}