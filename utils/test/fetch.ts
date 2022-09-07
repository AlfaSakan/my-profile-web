export const fetchMock = (response: any) =>
  (fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve({ json: () => Promise.resolve(response) })
  );

export const fetchMockGlobal = (response: any) => {
  const fetchMock = jest.spyOn(global, 'fetch') as jest.Mock;

  return fetchMock.mockImplementation(() =>
    Promise.resolve({ json: () => Promise.resolve(response) })
  );
};
