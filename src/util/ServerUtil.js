export const getErrorMessage = (errorData) => {
  var errorMessage = "";
  if (errorData.code === "062") {
    Object.keys(errorData.data).forEach((key) => {
      errorMessage += `${errorData.data[key][0]}\n`;
    });
  } else {
    errorMessage = errorData.message;
  }
  return errorMessage;
};
