const TOKEN_KEY = 'app-token';

export const getToken = () => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    return JSON.parse(token);
}

export const saveToken = token => {
    window.localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
}

export const destroyToken = () => {
    window.localStorage.removeItem(TOKEN_KEY);
}

export default { getToken, saveToken, destroyToken };