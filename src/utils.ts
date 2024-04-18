export const dateParseragGrid = (params: any) => {
  try {
    if (params.newValue instanceof Date) {
      return params.newValue;
    }
    return stringToDate(params.newValue, "dd/mm/yyyy", "/");
  } catch (ex) {
    console.error(
      `Error parsing the date value: ${params.newValue} and node : `,
      params.node
    );
    return null;
  }
};

export const shortDateFormatteragGrid = (params: any): any => {
  try {
    if (params.value) {
      return shortDateFormatter.format(params.value);
    }
  } catch (ex) {
    console.error(
      `Error formatting the date for value: ${params.value} and node : `,
      params.node
    );
  }
  return null;
};

const stringToDate = (date: any, format: any, delimiter: any) => {
  const formatLowerCase = format.toLowerCase();
  const formatItems = formatLowerCase.split(delimiter);
  const dateItems = date.split(delimiter);
  const monthIndex = formatItems.indexOf("mm");
  const dayIndex = formatItems.indexOf("dd");
  const yearIndex = formatItems.indexOf("yyyy");
  let month = parseInt(dateItems[monthIndex], 10);
  month -= 1;
  const formatedDate = new Date(
    parseInt(dateItems[yearIndex], 10),
    month,
    parseInt(dateItems[dayIndex], 10)
  );
  return formatedDate;
};

const shortDateFormatter = new Intl.DateTimeFormat("en-GB");
