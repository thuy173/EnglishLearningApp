const TOKEN_COOKIE_NAME = "tk_oc";
const REFRESH_TOKEN_COOKIE_NAME = "rftk_oc";

export const setTokenCookie = (token: string) => {
    const expirationTime = 1 * 60 * 60 * 1000; // 1 hour
    const expirationDate = new Date(Date.now() + expirationTime).toUTCString();
    document.cookie = `${TOKEN_COOKIE_NAME}=${token}; path=/; expires=${expirationDate}; SameSite=Lax;`;
};

export const setRefreshTokenCookie = (refreshToken: string) => {
    const expirationTime = 7 * 24 * 60 * 60 * 1000; // 7 days
    const expirationDate = new Date(Date.now() + expirationTime).toUTCString();
    document.cookie = `${REFRESH_TOKEN_COOKIE_NAME}=${refreshToken}; path=/; expires=${expirationDate}; SameSite=Lax;`;
};

const getCookieValue = (name: string): string | null => {
    const cookieString = decodeURIComponent(document.cookie);
    const cookies = cookieString.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
};

function getCookie(cname: string) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export const getTokenFromCookie = (): string | null => {
    return getCookieValue(TOKEN_COOKIE_NAME);
};

export const getRefreshTokenFromCookie = (): string | null => {
    return getCookie(REFRESH_TOKEN_COOKIE_NAME);
};

export const deleteTokenCookie = () => {
    document.cookie = `${TOKEN_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax;`;
};

export const deleteRefreshTokenCookie = () => {
    document.cookie = `${REFRESH_TOKEN_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax;`;
};