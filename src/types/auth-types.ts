export type States = {
  firstName: string | null;
  lastName: string | null;
  password: string | null;
  confirmPassword: string | null;
  agency: string | null;
  contactNumber: string | null;
  gender: string | null;
};
export type StageThreeFormData = {
  buildingName: string;
  street: string;
  barangay: string;
  city: string;
  province: string;
};
export type StageTwoFormData = {
  agency: string;
  contactNumber: string;
  gender: string;
  dateOfBirth: string;
};
export type StageOneFormData = {
  firstName: string;
  email: string;
  lastName: string;
  password: string;
  tinNumber: string;
  confirmPassword: string;
};
export interface MerchantStageTwo {
  businessName: string;
  buildingName: string;
  street: string;
  barangay: string;
  city: string;
  province: string;
  country: string;
}
export interface MerchantStageThree {
  accepts: boolean;
  bussinessPermit: FileList;
  philgeps: FileList;
}
export interface LoginStates {
  email: string;
  password: string;
}
export interface AgencyStageComponentProps {
  handleNextStep: (formValues: StageTwoFormData | StageOneFormData) => void;
}
export interface MerchantStageComponentProps {
  handleNextStep: (
    formData: StageOneFormData | MerchantStageTwo | MerchantStageThree,
  ) => void;
}
