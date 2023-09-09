/**
 * Remember: fetch API is re-defined in react-native.
 * It may be a little different from our familiar one.
 */
type Method = "GET" | "POST";

interface FetchProps {
  url: string;
  method: Method;
  headers?: HeadersInit_;
  body?: object;
}

/**
 *
 * @param props if `body` field is specified, automatically add
 *              "Content-Type: application/json" to headers.
 * @returns fetch response
 */
export async function request(props: FetchProps) {
  const { url, method, body: params } = props;
  let headers = props.headers;
  if (params) {
    headers = { ...headers, "Content-Type": "application/json" };
  }
  const response = await fetch(url, {
    method: method,
    headers: headers,
    ...(params && { body: JSON.stringify(params) }),
  });
  return response;
}

/**
 * This function is an alias of {@link request} , since React Native automatically
 * handles the cookie.
 * @param props see {@link request}
 * @returns see {@link request}
 */
export async function requestWithCookie(props: FetchProps) {
  return await request(props);
}
