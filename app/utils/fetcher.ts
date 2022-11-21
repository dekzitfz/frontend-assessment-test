// Make the `request` function generic
// to specify the return data type:
export default async function fetcher<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  const response = await fetch(url, config);
  return await response.json();
}
