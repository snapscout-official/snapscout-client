export type States = {
  firstName: string | null;
  lastName: string | null;
  password: string | null;
  confirmPassword: string | null;
  agency: string | null;
  contactNumber: string | null;
};
export type StageTwoFormData = {
  agency: string;
  contactNumber: string;
};
export type StageOneFormData = {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

export interface StageComponentProps {
  handleNextStep: (formValues: StageTwoFormData | StageOneFormData) => void;
}
