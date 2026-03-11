const n = "https://jejugroup.alwaysdata.net", o = "http://localhost:9090/jeju-web", e = /* @__PURE__ */ new Set(["localhost", "127.0.0.1"]), r = () => {
  const t = new URLSearchParams(window.location.search).get("api");
  if (t === "local") return o;
  if (t === "remote") return n;
  const a = window.location.hostname;
  return e.has(a) && window.location.port !== "9090" ? o : "";
}, c = r();
export {
  c as API_BASE_URL
};
