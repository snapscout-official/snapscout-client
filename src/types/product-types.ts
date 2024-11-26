export type LinksProp = {
  active: boolean;
  label: string;
  url?: string;
};
//merchant information should be added for every product
export type ProductType = {
  _id: string;
  barcode: number;
  created_at: string;
  is_available: boolean;
  merchant_id?: number;
  price: number;
  product_name: string;
  quantity: number;
  specs?: Array<String>;
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
  status: "unread" | "seen" | "sending";
};
export type ConversationType = {
  uuid: string;
  participants_data: {
    id: string;
    name: string;
  }[];
  participants: number[];
  created_at: Date;
  updated_at: Date;
  image: string;
  recent_message: MessageType;
};
export type ProductSearchResultType = {
  products: string[];
  merchants: { merchant_id: number; business_name: string }[];
};
