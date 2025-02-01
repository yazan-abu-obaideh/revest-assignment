import { useState } from "react";
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
      return TextFormElement(elementData);
    case "LIST":
      const options = elementData.listOfValues1 || [];
      const dataListName = elementData.name;
      return (
        <>
          <input
            className="form-control"
            required={elementData.required}
            list={dataListName}
            name={dataListName}
          ></input>
          <label htmlFor={dataListName}>{dataListName}</label>
          <datalist id={dataListName}>
            {options.map((option) => (
              <option value={option} />
            ))}
          </datalist>
        </>
      );
    case "RADIO":
      return RadioFormElement();
    default:
      return <>Unknown form element</>;
  }

  function RadioFormElement() {
    const [selected, setSelected] = useState(elementData.defaultValue);
    const radioOptions = elementData.listOfValues1 ?? [];
    return (
      <>
        <label className="form-label" htmlFor={elementData.name}>
          {elementData.name}
        </label>
        {radioOptions.map((option, index) => {
          return (
            <>
              <div className="form-check">
                <input
                  onClick={() => {
                    setSelected(index.toString());
                  }}
                  className="form-check-input"
                  type="radio"
                  name={option}
                  id={option}
                  value={index}
                  checked={index.toString() === selected}
                />
                <label className="form-check-label" htmlFor="customRadio1">
                  {option}
                </label>
              </div>
            </>
          );
        })}
      </>
    );
  }
}

export const DynamicForm: React.FC = () => {
  return (
    <div className="container d-flex justify-content-center m-5">
      <form className="w-50">
        {ASSIGNMENT_SAMPLE_DATA.data.map((elementData) => (
          <div className="row mb-3" key={elementData.id}>
            {parseFormElement(elementData)}
          </div>
        ))}
      </form>
    </div>
  );
};
function TextFormElement(elementData: {
  id: number;
  name: string;
  fieldType: string;
  defaultValue: string;
  required: boolean;
  listOfValues1?: string[];
  minLength?: number;
  maxLength?: number;
}) {
  return (
    <>
      <input
        className="form-control"
        required={elementData.required}
        name={elementData.name}
        defaultValue={elementData.defaultValue}
        type="text"
      ></input>
      <label htmlFor={elementData.name}> {elementData.name} </label>
    </>
  );
}
