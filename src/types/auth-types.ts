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
export interface LoginStates {
  email: string;
  password: string;
}
export interface StageComponentProps {
  handleNextStep: (formValues: StageTwoFormData | StageOneFormData) => void;
}
