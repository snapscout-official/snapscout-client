type Test = {
  name: number;
};

type ProductType = {
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
type MerchantType = {
  merchant_id: number;
  business_name: string;
  location: LocationType;
};
type LocationType = {
  location_id?: number;
  location?: string;
  display_address: string;
  latitude: number;
  longitude: number;
};
