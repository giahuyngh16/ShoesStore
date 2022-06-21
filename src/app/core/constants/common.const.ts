export const PAGE_SIZE: number[] = [5, 10, 20, 40];
export const OPTION_PAGE = [
  { id: 0, value: 5 },
  { id: 1, value: 10 },
  { id: 2, value: 20 },
  { id: 3, value: 40 }
];

export const MESSAGE = {
  COMMON: {
      NO_RESULT: 'No data available in table',
      SUCCESS: 'Success',
      ERROR: 'Error',
      PERMISSION_DENIED: 'Permission denied',
      FIELD_REQUIRED: 'This field is required',
      ONE_FIELD_REQUIRED: 'One of these fields is required',
      FILL_ALL_FIELDS: 'Please fill all below fields',
      INVALID_DATE: 'Invalid date, please enter a valid value',
      INVALID_TIME: 'Incorrect format time, please enter a valid value',
      INVALID_EMAIL: 'Incorrect format email, please enter a valid value',
      INVALID_PHONE: 'Incorrect format phone',
      UN_AUTHORIZED: 'You are not enrolled to the system, please login again',
      LOADING_ERROR: 'Error loading data, please try again',
      COPY_SUCCESS: 'Process link is copied',
      PHONE_COPY_SUCCESS: 'Phone is copied',
      EMAIL_COPY_SUCCESS: 'Email is copied',
      COPY_ERROR: 'Error when copied process link, please try again',
      EXPIRED: 'Expired',
      COMPLETED: 'Completed',
      OVER_TIME: 'Over time',
      NOT_SPECIFIED: 'Not specified',
      SCORE_VALIDATION: 'Must be less than 10, greater than 0, or within decimal x.5 (ex: 5.5)',
      NOT_AVAILABLE: 'N/A',
      DUPLICATE_EMAIL: 'This email is duplicated',
      INVALID_BONUS: 'Total percentage of fees should not more than 100 percent.',
      UNIQUE_MONTH: 'Month should be unique.',
      POSITIVE_VALUE: 'Value should be greater than or equal to zero',
      GREATER_THAN_ZERO: 'Value should be greater than zero',
      INVALID_RECRUITMENTFEE: 'Please make sure these three fields has been filled'
  },
}

export const DISPLAY_DATE = {
  SORT_DATE: 'DD/MM/YYYY',
  LONG_DATE: 'dd MMM yyyy',
  LONG_DATE_UPPER_CASE: 'DD MMM YYYY',
  FULL_DATE: 'DD MMM YYYY HH:mm',
  FULL_DATE_SLASH: 'DD/MMM/YYYY HH:MM',
  FULL_DATE_UNDERCORE_FORMAT: 'DD/MMM/YYYY:HH:mm',
  SUBMIT_DATE: 'YYYY-MM-DD',
};
