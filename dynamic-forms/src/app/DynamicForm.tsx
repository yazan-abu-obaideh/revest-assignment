"use client";
import { register } from "module";
import { useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";

type ElementData = {
  id: number;
  name: string;
  fieldType: string;
  defaultValue: string;
  required: boolean;
  listOfValues1?: string[];
  minLength?: number;
  maxLength?: number;
};

function parseFormElement(
  elementData: ElementData,
  register: UseFormRegister<any>
) {
  switch (elementData.fieldType) {
    case "TEXT":
      return <TextFormElement register={register} elementData={elementData} />;
    case "LIST":
      return <ListFormElement register={register} elementData={elementData} />;
    case "RADIO":
      return <RadioFormElement elementData={elementData} register={register} />;
    default:
      return <>Unknown form element</>;
  }
}

const ListFormElement: React.FC<{
  elementData: ElementData;
  register: UseFormRegister<any>;
}> = (props) => {
  const options = props.elementData.listOfValues1 || [];
  const dataListName = props.elementData.name;
  return (
    <>
      <input
        className="form-control"
        required={props.elementData.required}
        list={dataListName}
        name={dataListName}
      ></input>
      <label htmlFor={dataListName}>{dataListName}</label>
      <datalist id={dataListName}>
        {options.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>
    </>
  );
};

const RadioFormElement: React.FC<{
  elementData: ElementData;
  register: UseFormRegister<any>;
}> = (props) => {
  const [selected, setSelected] = useState(props.elementData.defaultValue);
  const radioOptions = props.elementData.listOfValues1 ?? [];
  return (
    <>
      <label className="form-label" htmlFor={props.elementData.name}>
        {props.elementData.name}
      </label>
      {radioOptions.map((option, index) => {
        return (
          <div key={option} className="form-check">
            <input
              {...props.register(props.elementData.name)}
              onChange={() => {
                const selected = index.toString();
                setSelected(selected);
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
        );
      })}
    </>
  );
};

const TextFormElement: React.FC<{
  elementData: ElementData;
  register: UseFormRegister<any>;
}> = (props) => {
  return (
    <>
      <input
        {...props.register(props.elementData.name)}
        className="form-control"
        required={props.elementData.required}
        name={props.elementData.name}
        defaultValue={props.elementData.defaultValue}
        type="text"
      ></input>
      <label htmlFor={props.elementData.name}> {props.elementData.name} </label>
    </>
  );
};

export const DynamicForm: React.FC<{ formDesc: string }> = (props) => {
  const { register, handleSubmit } = useForm();
  const parsed: { data: ElementData[] } = JSON.parse(props.formDesc);

  return (
    <div className="container d-flex justify-content-center m-5">
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
        className="w-50"
      >
        {parsed.data.map((elementData) => (
          <div className="row mb-3" key={elementData.id}>
            {parseFormElement(elementData, register)}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
