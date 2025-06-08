/**
 * Retrieves a specific cookie value by name
 * @param {string} name - The name of the cookie to retrieve
 * @returns {string|null} - The cookie value if found, null otherwise
 */
export const getCookies = (name) => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
};

/**
 * Sets a cookie with the given name, value and optional parameters
 * @param {string} name - The name of the cookie
 * @param {string} value - The value to store in the cookie
 * @param {Object} options - Optional cookie parameters (expires, path, domain, secure)
 */
export const setCookie = (name, value, options = {}) => {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    
    if (options.expires) {
        const date = new Date();
        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
        cookieString += `; expires=${date.toUTCString()}`;
    }
    
    if (options.path) cookieString += `; path=${options.path}`;
    if (options.domain) cookieString += `; domain=${options.domain}`;
    if (options.secure) cookieString += '; secure';
    if (options.httpOnly) cookieString += '; httpOnly';
    
    document.cookie = cookieString;
};

/**
 * Deletes a cookie by setting its expiration date to the past
 * @param {string} name - The name of the cookie to delete
 * @param {Object} options - Optional cookie parameters (path, domain)
 */
export const deleteCookie = (name, options = {}) => {
    setCookie(name, '', { ...options, expires: -1 });
};
