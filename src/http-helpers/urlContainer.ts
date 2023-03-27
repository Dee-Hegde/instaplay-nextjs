export const urlContainer: {
  requestToken: string;
  login: string;
  dashboard: string;
  search: string;
} = {
  requestToken: "https://api.themoviedb.org/3/authentication/token/new?api_key=019085ae8fd360fcd800ae1d44592de2",
  login: "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=019085ae8fd360fcd800ae1d44592de2",
  dashboard: "https://api.themoviedb.org/3/trending/movie/day?api_key=d0605f7c77a7e9ffd22f6f77c12e0f8f",
  search: "https://api.themoviedb.org/3/search/movie?api_key=d0605f7c77a7e9ffd22f6f77c12e0f8f",
};
Object.freeze(urlContainer);
