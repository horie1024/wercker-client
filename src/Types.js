// @flow
type HttpMethod =
  | 'get'
  | 'post';

type dataType =
  | 'qs'
  | 'body';

type Client = {
  userName: string;
  token: string;
}

type Options = {
  url: string;
  headers: Headers;
  [data: dataType]: string | Object;
}

type Headers = {
  'Authorization': string;
  'Content-Type': string;
  'User-Agent': string;
}
