import { parse, serialize } from "cookie";

/**
 * This sets `cookie` on `res` object
 */
const addCookie = (res, name, value, options = {}) => {
  const stringValue = typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  if ("maxAge" in options) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }

  const isEmpty = obj => Object.entries(obj).length === 0 && obj.constructor === Object;

  let setCookies = res.getHeader("Set-Cookie");
  setCookies = Array.isArray(setCookies) ? setCookies : [setCookies];
  setCookies = setCookies.filter(Boolean);

  res.setHeader("Set-Cookie", [...setCookies, serialize(name, String(stringValue), options)]);
};

/**
 * Adds `addCookie` function on `res.addCookie` to set cookies for response
 */
const cookies = (req, res) => {
  return {
    add: (name, value, options) => addCookie(res, name, value, options),
    get: key => parse(req.headers.cookie || "")[key]
  };
};

export default cookies;
