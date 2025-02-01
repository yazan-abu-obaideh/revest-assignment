import { ASSIGNMENT_SAMPLE_DATA } from "./sample_data";

function parseFormElement(elementData: {
  id: number;
  name: string;
  fieldType: string;
  defaultValue: string;
  required: boolean;
  listOfValues1?: string[];
  minLength?: number;
  maxLength?: number;
}) {
  switch (elementData.fieldType) {
    case "TEXT":
      return (
        <>
          <input
            required={elementData.required}
            name={elementData.name}
            defaultValue={elementData.defaultValue}
          ></input>
          <label htmlFor={elementData.name}> {elementData.name} </label>
        </>
      );
    case "LIST":
      const options = elementData.listOfValues1 || [];
      const dataListName = elementData.name;
      return (
        <>
          <input required={elementData.required} list={dataListName} name={dataListName}></input>
          <label htmlFor={dataListName}>{dataListName}</label>
          <datalist id={dataListName}>
            {options.map((option) => (
              <option value={option} />
            ))}
          </datalist>
        </>
      );
    case "RADIO":
      return <></>;
    default:
      return <>Unknown form element</>;
  }
}

export const DynamicForm: React.FC = () => {
  return (
    <>
      {ASSIGNMENT_SAMPLE_DATA.data.map((elementData) => (
        <div>{parseFormElement(elementData)}</div>
      ))}
    </>
  );
};
