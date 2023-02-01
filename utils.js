/**
 * 
 * @param {string} selector 
 * @returns HTMLElement | HTMLElement[] | null 
 */
const $ = (selector) => {
  const rs = document.querySelectorAll(selector);

  return rs.length > 1 ? [...rs] : rs.length === 1 ? rs[0] : null;
};

export { $ };
