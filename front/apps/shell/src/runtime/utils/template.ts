export const loadTemplate = async (path: string, basePath: string) => {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load template: ${path}`);
  }

  const html = await response.text();
  return html.replace(/\{BASE_PATH\}/g, basePath);
};
