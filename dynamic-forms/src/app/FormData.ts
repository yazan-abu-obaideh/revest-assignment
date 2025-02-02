export type FormDescription = {
  data: ElementData[];
  formLabel: string;
};
export type ElementData = {
  id: number;
  name: string;
  fieldType: string;
  defaultValue: string;
  required: boolean;
  listOfValues1?: string[];
  minLength?: number;
  maxLength?: number;
};
