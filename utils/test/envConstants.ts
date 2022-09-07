export const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL;

export const HEADER = {
  headers: { Authorization: undefined, 'X-Refresh': undefined },
  method: 'GET',
};

export const HEADER_DELETE = {
  headers: { Authorization: undefined, 'X-Refresh': undefined },
  method: 'DELETE',
};

export const headerPost = (body: object) => {
  return {
    headers: { Authorization: undefined, 'X-Refresh': undefined },
    method: 'POST',
    body: JSON.stringify(body),
  };
};

export const headerPatch = (body: object) => {
  return {
    headers: { Authorization: undefined, 'X-Refresh': undefined },
    method: 'PATCH',
    body: JSON.stringify(body),
  };
};
