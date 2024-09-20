export const useApiFetch = (url, options = {}) => {  
  const csrfToken = useCookie("XSRF-TOKEN").value;

  options.headers = {
    ...options.headers,
    "X-XSRF-TOKEN": csrfToken,
  };

  return $fetch(url, {
    ...options,
    credentials: "include",
  });
};
