// Enums

export enum FormFieldElementsEnum {
  INPUT = "Input",
  TEXT_AREA = "Text Area",
  LABEL = "Label",
}

export enum FormInputTypesEnum {
  TEXT = "text",
  NUMBER = "number",
  DATE = "date",
  PASSWORD = "password",
  EMAIL = "email",
  RADIA = "radio",
  FILE = "file",
  SEARCH = "search",
}

// Field Input Configs
interface FormElementConfigModel {
  elementType: FormFieldElementsEnum;
  id?: string;
}

interface LabelConfigModel extends FormElementConfigModel {
  for: string;
  innerText: string;
}

interface InputConfigModel extends FormElementConfigModel {
  name: string;
  type: string;
  placeholder: string;
}

interface OptionConfigModel extends FormElementConfigModel {
  value: string;
  innerText: string;
}

interface SelectConfigModel extends FormElementConfigModel {
  name: string;
  optionsConfigArray: OptionConfigModel[];
}

// Form Element Containers

interface FormFieldConfigModel {
  label: LabelConfigModel;
  input?: InputConfigModel;
  select?: SelectConfigModel;
}

export interface FormBoxConfigModel {
  formFieldArray: FormFieldConfigModel[];
}
