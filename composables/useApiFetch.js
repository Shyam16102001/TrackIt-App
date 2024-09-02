export const useApiFetch = (url, options = {}) => {
  const baseUrl = useRuntimeConfig().public.apiBaseUrl;
  
  const csrfToken = useCookie("XSRF-TOKEN").value;

  const fetchUrl = `${baseUrl}${url}`;

  options.headers = {
    ...options.headers,
    "X-XSRF-TOKEN": csrfToken,
  };

  return $fetch(fetchUrl, {
    ...options,
    credentials: "include",
  });
};
