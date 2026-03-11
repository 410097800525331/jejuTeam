function r(t) {
  if (typeof t != "string") return t;
  const n = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };
  return t.replace(/[&<>"']/g, function(e) {
    return n[e];
  });
}
function a(t) {
  return /[<>'";\(\)={}]/.test(t) ? (console.warn("Security Warning: Invalid parameter detected"), !1) : !0;
}
export {
  r as sanitizeHTML,
  a as validateParam
};
