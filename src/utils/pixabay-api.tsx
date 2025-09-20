const API_KEY: string = '22701944-f8f056c666d70ac6de5e1d35b';

function linkSlug(query, page, limits = 12) {
  return `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${limits}`;
}

export function fetchData(query, page, limits) {
  try {
    return fetch(linkSlug(query, page, limits)).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    });
  } catch (error) {
    throw error;
  }
}
