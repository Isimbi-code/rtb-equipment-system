export function isTokenExpired(token) {
    if (!token) return true;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // decode base64 payload
      return payload.exp * 1000 < Date.now(); // check if expired (in ms)
    } catch (e) {
      return true; // if error decoding, assume invalid/expired
    }
  }
  