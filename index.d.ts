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
type MyUser = {
  id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  tin_number: string;
  gender: string;
  phone_number: string;
  email: string;
  email_verified_at?: string | unknown;
  created_at: string;
  updated_at: string;
  role_id: number;
  role: string;
  sub?: string;
};

type Session = {
  apiToken: string;
  user: MyUser;
};
type Role = "merchant" | "agency";
