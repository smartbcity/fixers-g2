import { TFunction } from "i18next";

type PotentialError = string | undefined | Promise<string | undefined>;
type ValidatorFnc = (value: any, values: any) => PotentialError;
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i;

export const requiredFieldValidator = (message: string, value: any) => {
  if (value == undefined || value.length === 0) return message;
  const string = String(value).trim();
  if (!string) return message;
  return;
};

const requiredField =
  (t: TFunction): ValidatorFnc =>
  (value: any) => {
    return requiredFieldValidator(t("fieldRequired"), value);
  };

const requiredFile =
  (t: TFunction, key: string, fileName: string): ValidatorFnc =>
  (value: any, values: any) => {
    if (!!values[`${key}Uploaded`]) return undefined;
    return requiredFieldValidator(
      t("fileRequired", { fileDesc: fileName }),
      value
    );
  };

const nonNegativeNumberValidator = (
  requiredNumberMessage: string,
  above0Message: string,
  positiveMessage: string,
  value: any,
  required: boolean = true,
  zeroIncluded: boolean = false
) => {
  if (value == undefined) return required ? requiredNumberMessage : undefined;
  const number = typeof value === "number" ? value : Number(value);
  if (zeroIncluded && number <= 0) return above0Message;
  if (!zeroIncluded && number < 0) return positiveMessage;
  return;
};

const nonNegativeNumber =
  (
    t: TFunction,
    required: boolean = true,
    zeroIncluded: boolean = false
  ): ValidatorFnc =>
  (value: any) => {
    return nonNegativeNumberValidator(
      t("fieldRequired"),
      t("needFieldAbove0"),
      t("needFieldPositive"),
      value,
      required,
      zeroIncluded
    );
  };

export const phone = (t: TFunction) => (value?: string, values?: any) => {
  const trimmed = (value ?? "").trim().replaceAll(" ", "");
  if (trimmed && (trimmed.length !== 10 || isNaN(Number(trimmed)))) {
    return t("phoneNeedsToHave10Digits");
  }
  return requiredField(t)(value, values);
};

export const email = (t: TFunction) => (value?: string, values?: any) => {
  const error = requiredField(t)(value, values);
  if (error) return error;
  const trimmed = value!.trim();
  if (!emailRegex.test(trimmed)) return t("incorrectEmail");
  return;
};

const street = (t: TFunction) => (value?: string, values?: any) => {
  const city = values.city?.trim();
  const postalCode = values.postalCode?.trim();
  const trimmed = value?.trim();
  if ((!!postalCode || !!city) && !trimmed) return t("requiredStreet");
  return;
};

const postalCode = (t: TFunction) => (value?: string, values?: any) => {
  const street = !!values.street?.trim();
  const city = !!values.city?.trim();
  const trimmed = value?.trim();
  if ((street || city) && !trimmed) return t("requiredPostalCode");
  return;
};

const city = (t: TFunction) => (value?: string, values?: any) => {
  const street = values.street?.trim();
  const postalCode = values.postalCode?.trim();
  const trimmed = value?.trim();
  if ((!!street || !!postalCode) && !trimmed) return t("requiredCity");
  return;
};

export const validators = {
  requiredField,
  requiredFile,
  nonNegativeNumber,
  phone,
  email,
  street,
  postalCode,
  city,
};
