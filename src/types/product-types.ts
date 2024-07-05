export type LinksProp = {
  active: boolean;
  label: string;
  url?: string;
};
export type ProductType = {
  _id: string;
  barcode: number;
  created_at: string;
  is_available: boolean;
  merchant_id?: number;
  price: number;
  product_name: string;
  quantity: number;
  specs?: Array<String> | null;
  subcategory_id: number;
  updated_at: string;
};
export interface Cart {
  cartName: string;
  items: CartItem[];
}
export interface CartItem {
  quantity: number;
  product: ProductType;
}
