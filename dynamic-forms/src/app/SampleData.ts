import { FormDescription } from "./FormData";

export const ASSIGNMENT_SAMPLE_DATA: FormDescription = {
  formLabel: "Assignment sample data",
  data: [
    {
      id: 1,
      name: "Full Name",
      fieldType: "TEXT",
      minLength: 1,
      maxLength: 100,
      defaultValue: "John Doe",
      required: true,
    },
    {
      id: 2,
      name: "Email",
      fieldType: "TEXT",
      minLength: 1,
      maxLength: 50,
      defaultValue: "hello@mail.com",
      required: true,
    },
    {
      id: 6,
      name: "Gender",
      fieldType: "LIST",
      defaultValue: "1",
      required: true,
      listOfValues1: ["Male", "Female", "Others"],
    },
    {
      id: 7,
      name: "Love React?",
      fieldType: "RADIO",
      defaultValue: "1",
      required: true,
      listOfValues1: ["Yes", "No"],
    },
  ],
};
