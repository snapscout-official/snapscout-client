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
  cart_name: string;
  items: CartItem[];
}
export interface CartItem {
  quantity: number;
  product_id: string;
}

export type Order = {
  order_id: string;
  merchant_name: string;
  agency_id: number;
  merchant_id: number;
  status: string;
  order_items: ProductType[];
};

export type Notification = {
  id: string;
  notification_data: { order_id: string } | { quote_id: string };
  notification_type: string;
  description: string;
  sender: number;
  receiver: number;
  opened: boolean;
  created_at: string;
  updated_at: string;
  data: Order;
};

export type MessageType = {
  content: string;
  creator: number;
  sending: boolean;
};
