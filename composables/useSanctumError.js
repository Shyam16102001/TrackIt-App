import { FetchError } from "ofetch";

const VALIDATION_ERROR_CODE = 422;
const SERVER_ERROR_CODE = 500;

function mapLaravelErrorsIntoFormErrors(errors) {
  return Object.entries(errors).reduce((acc, [key, messages]) => {
    acc[key] = messages[0] ?? "";
    return acc;
  }, {});
}

export const useSanctumError = (error) => {
  const isFetchError = error instanceof FetchError;
  const isValidationError =
    isFetchError && error.response?.status === VALIDATION_ERROR_CODE;

  const code = isFetchError ? error.response?.status : SERVER_ERROR_CODE;

  const bag = isValidationError
    ? mapLaravelErrorsIntoFormErrors(error.response?._data.errors)
    : [];

  return {
    isValidationError,
    code,
    bag,
  };
};
