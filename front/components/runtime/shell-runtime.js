var zL = Object.defineProperty;
var UL = (_, l, s) => l in _ ? zL(_, l, { enumerable: !0, configurable: !0, writable: !0, value: s }) : _[l] = s;
var tp = (_, l, s) => UL(_, typeof l != "symbol" ? l + "" : l, s);
let ZT = !1;
const ex = () => {
  const _ = document.querySelector(".header");
  if (_) {
    if (window.scrollY > 20) {
      _.classList.add("scrolled");
      return;
    }
    _.classList.remove("scrolled");
  }
}, FL = () => {
  ZT || (ZT = !0, window.addEventListener("scroll", ex), ex());
}, PL = () => {
  document.querySelectorAll(".nav-item").forEach((l) => {
    if (l.dataset.megaHoverBound === "true")
      return;
    const s = l.querySelector(".mega-dropdown");
    s && (l.dataset.megaHoverBound = "true", l.addEventListener("mouseenter", () => {
      document.querySelectorAll(".mega-dropdown.active").forEach((f) => {
        f !== s && f.classList.remove("active");
      }), s.classList.add("active");
    }), l.addEventListener("mouseleave", () => {
      setTimeout(() => {
        l.matches(":hover") || s.classList.remove("active");
      }, 200);
    }));
  });
}, jL = () => {
  document.querySelectorAll(".mega-menu-item").forEach((l) => {
    l.dataset.previewHoverBound !== "true" && (l.dataset.previewHoverBound = "true", l.addEventListener("mouseenter", () => {
      const s = l.closest(".mega-dropdown"), f = l.getAttribute("data-preview"), p = f ? document.getElementById(f) : null;
      if (!s || !p)
        return;
      s.querySelectorAll(".preview-image").forEach((h) => {
        h.classList.remove("active");
      }), p.classList.add("active");
      const y = s.querySelector(".preview-loader");
      y && (y.style.display = "none");
    }));
  });
}, HL = () => {
  document.querySelectorAll(".mega-dropdown").forEach((_) => {
    if (_.dataset.previewInit === "true")
      return;
    _.dataset.previewInit = "true";
    const l = _.querySelector(".preview-image");
    l && l.classList.add("active");
  });
}, KE = () => {
  FL(), PL(), jL(), HL();
};
let tx = !1;
const nx = (_, l) => {
  const s = document.createElement("span");
  return s.className = l, s.setAttribute("aria-hidden", l.includes("clone") ? "true" : "false"), _.split("").forEach((f, p) => {
    const y = document.createElement("span");
    y.className = "stagger-char", y.textContent = f === " " ? " " : f, y.style.transitionDelay = `${p * 30}ms`, s.appendChild(y);
  }), s;
}, qg = () => {
  document.querySelectorAll(".nav-link").forEach((l) => {
    var E;
    if (l.querySelector(".stagger-wrapper"))
      return;
    const s = l.querySelector("span[data-lang]") || l.querySelector("span");
    if (!s)
      return;
    const f = ((E = s.textContent) == null ? void 0 : E.trim()) ?? "";
    if (!f)
      return;
    const p = document.createElement("span");
    p.className = "stagger-wrapper", p.appendChild(nx(f, "stagger-original")), p.appendChild(nx(f, "stagger-clone")), s.textContent = "", s.appendChild(p);
    let y = !1, h = !1;
    l.addEventListener("mouseenter", () => {
      if (h = !0, y)
        return;
      y = !0, l.classList.add("is-animating");
      const T = f.length * 30 + 300 + 50;
      setTimeout(() => {
        y = !1, h || l.classList.remove("is-animating");
      }, T);
    }), l.addEventListener("mouseleave", () => {
      h = !1, y || l.classList.remove("is-animating");
    });
  });
}, BL = () => {
  tx || (tx = !0, document.addEventListener("mainHeaderLoaded", qg));
}, JE = () => {
  var f;
  const _ = new URL("../../", import.meta.url).href;
  if ((f = window.__JEJU_ROUTE_NAVIGATOR__) != null && f.appRoot)
    return new URL(window.__JEJU_ROUTE_NAVIGATOR__.appRoot, window.location.href).href;
  const l = document.currentScript;
  if (l != null && l.src)
    return new URL("../", l.src).href;
  const s = Array.from(document.getElementsByTagName("script"));
  for (const p of s) {
    const y = p.src || p.getAttribute("src");
    if (y && (y.includes("components/layout/component_loader.js") || y.includes("components/layout/hotel_component_loader.js") || y.includes("components/runtime/shell-runtime.js")))
      return new URL("../../", y).href;
  }
  return _;
}, Yl = (_) => new URL(_, JE()).href, ZE = "userSession", VL = "jeju:session-updated";
let rx = !1, yE = !1;
const Yx = () => document.getElementById("header") || document.querySelector(".header"), ax = () => {
  const _ = Yx();
  if (_) {
    if (window.scrollY > 50) {
      _.classList.add("scrolled");
      return;
    }
    _.classList.remove("scrolled");
  }
}, IL = () => {
  rx || (rx = !0, window.addEventListener("scroll", ax), ax());
}, YL = () => {
  document.querySelectorAll(".mega-menu-item").forEach((l) => {
    l.dataset.previewBound !== "true" && (l.dataset.previewBound = "true", l.addEventListener("mouseenter", () => {
      const s = l.dataset.preview, f = l.closest(".mega-dropdown");
      if (!s || !f)
        return;
      const p = f.querySelector(".mega-menu-preview");
      p && p.querySelectorAll(".preview-image").forEach((y) => {
        y.classList.toggle("active", y.id === s);
      });
    }));
  });
}, WL = () => {
  const _ = document.getElementById("mobileMenuBtn"), l = document.getElementById("mobileNav");
  !_ || !l || _.dataset.mobileToggleBound !== "true" && (_.dataset.mobileToggleBound = "true", _.addEventListener("click", () => {
    l.classList.toggle("active");
  }));
}, $L = () => document.getElementById("headerLoginBtn") || document.getElementById("indexLoginBtn"), GL = async (_) => {
  const l = _.querySelector("span");
  l ? l.textContent = "로그아웃" : _.textContent = "로그아웃";
  const s = _.querySelector("i");
  s && s.setAttribute("data-lucide", "log-out"), "href" in _ && (_.href = "#"), _.removeAttribute("data-route"), _.dataset.logoutBound !== "true" && (_.dataset.logoutBound = "true", _.addEventListener("click", async (f) => {
    f.preventDefault(), f.stopPropagation();
    try {
      const y = await import(Yl("core/auth/session_manager.js"));
      typeof y.logoutSession == "function" && await y.logoutSession();
    } catch {
      localStorage.removeItem(ZE);
    }
    window.location.reload();
  }));
}, QL = (_) => {
  if (_.querySelector('[data-route="ADMIN.DASHBOARD"]'))
    return;
  const l = document.createElement("a");
  l.id = "indexAdminBtn", l.href = "#", l.className = "util-link route-link", l.setAttribute("data-route", "ADMIN.DASHBOARD"), l.style.color = "#FF5000", l.style.fontWeight = "700", l.textContent = "관리자 페이지";
  const s = document.createElement("span");
  s.className = "util-divider", s.textContent = "|", _.prepend(l, s);
}, qL = async () => {
  try {
    const l = await import(Yl("core/auth/session_manager.js"));
    if (typeof l.resolveSession == "function")
      return await l.resolveSession();
  } catch {
  }
  try {
    const _ = localStorage.getItem(ZE);
    return _ ? JSON.parse(_) : null;
  } catch {
    return null;
  }
}, XL = async () => {
  try {
    const l = await import(Yl("core/auth/local_admin.js"));
    return typeof l.isLocalFrontEnvironment == "function" && l.isLocalFrontEnvironment();
  } catch {
    return !1;
  }
}, KL = async () => {
  var y;
  const _ = document.getElementById("headerAdminBtn"), l = $L(), s = document.getElementById("index-header-util"), [f, p] = await Promise.all([qL(), XL()]);
  f && l && await GL(l), p && _ && (_.style.display = "flex"), p && s && QL(s), (y = window.lucide) != null && y.createIcons && window.lucide.createIcons();
}, LE = () => {
  yE || (yE = !0, setTimeout(async () => {
    yE = !1, await KL();
  }, 0));
}, Fv = () => {
  Yx() && (IL(), YL(), WL(), KE(), qg(), LE());
}, JL = () => {
  document.addEventListener("mainHeaderLoaded", () => {
    Fv();
  }), window.addEventListener("storage", (_) => {
    _.key === ZE && LE();
  }), window.addEventListener(VL, () => {
    LE();
  });
}, ix = (_, l = "shell-runtime") => {
  var s;
  if ((s = window.__JEJU_ROUTE_NAVIGATOR__) != null && s.safeNavigate) {
    window.__JEJU_ROUTE_NAVIGATOR__.safeNavigate(_, l);
    return;
  }
  window.location.assign(_);
}, ZL = () => {
  var _;
  return (_ = window.__JEJU_ROUTE_NAVIGATOR__) != null && _.homeUrl ? window.__JEJU_ROUTE_NAVIGATOR__.homeUrl : new URL("index.html", JE()).href;
}, eN = (_) => {
  const l = _.getAttribute("data-route-params");
  if (!l)
    return {};
  try {
    const s = JSON.parse(l);
    return s && typeof s == "object" && !Array.isArray(s) ? s : {};
  } catch {
    return {};
  }
}, tN = async (_) => {
  const l = _.getAttribute("data-route");
  if (l)
    try {
      const p = (await import(Yl("core/utils/path_resolver.js"))).resolveRoute(l, eN(_));
      ix(p, "shell-runtime-fallback");
    } catch {
      ix(ZL(), "shell-runtime-fallback-home");
    }
};
let lx = !1;
const nN = async () => {
  if (!lx) {
    lx = !0;
    try {
      (await import(Yl("core/utils/router_binder.js"))).initRouterBinder();
      return;
    } catch (_) {
      console.warn("[ShellRuntime] router binder load failed", _);
    }
    document.body.addEventListener("click", async (_) => {
      var s;
      const l = (s = _.target) == null ? void 0 : s.closest("[data-route]");
      l && (_.preventDefault(), await tN(l));
    });
  }
};
var NE = { exports: {} }, Sv = {}, Mg = { exports: {} }, Dt = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ox;
function rN() {
  if (ox) return Dt;
  ox = 1;
  var _ = Symbol.for("react.element"), l = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), p = Symbol.for("react.profiler"), y = Symbol.for("react.provider"), h = Symbol.for("react.context"), E = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), R = Symbol.for("react.lazy"), O = Symbol.iterator;
  function A(P) {
    return P === null || typeof P != "object" ? null : (P = O && P[O] || P["@@iterator"], typeof P == "function" ? P : null);
  }
  var M = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, V = Object.assign, L = {};
  function I(P, te, Fe) {
    this.props = P, this.context = te, this.refs = L, this.updater = Fe || M;
  }
  I.prototype.isReactComponent = {}, I.prototype.setState = function(P, te) {
    if (typeof P != "object" && typeof P != "function" && P != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, P, te, "setState");
  }, I.prototype.forceUpdate = function(P) {
    this.updater.enqueueForceUpdate(this, P, "forceUpdate");
  };
  function ne() {
  }
  ne.prototype = I.prototype;
  function ee(P, te, Fe) {
    this.props = P, this.context = te, this.refs = L, this.updater = Fe || M;
  }
  var Q = ee.prototype = new ne();
  Q.constructor = ee, V(Q, I.prototype), Q.isPureReactComponent = !0;
  var ie = Array.isArray, Y = Object.prototype.hasOwnProperty, fe = { current: null }, ae = { key: !0, ref: !0, __self: !0, __source: !0 };
  function ge(P, te, Fe) {
    var xe, Qe = {}, it = null, rt = null;
    if (te != null) for (xe in te.ref !== void 0 && (rt = te.ref), te.key !== void 0 && (it = "" + te.key), te) Y.call(te, xe) && !ae.hasOwnProperty(xe) && (Qe[xe] = te[xe]);
    var ct = arguments.length - 2;
    if (ct === 1) Qe.children = Fe;
    else if (1 < ct) {
      for (var wt = Array(ct), Qt = 0; Qt < ct; Qt++) wt[Qt] = arguments[Qt + 2];
      Qe.children = wt;
    }
    if (P && P.defaultProps) for (xe in ct = P.defaultProps, ct) Qe[xe] === void 0 && (Qe[xe] = ct[xe]);
    return { $$typeof: _, type: P, key: it, ref: rt, props: Qe, _owner: fe.current };
  }
  function se(P, te) {
    return { $$typeof: _, type: P.type, key: te, ref: P.ref, props: P.props, _owner: P._owner };
  }
  function Ie(P) {
    return typeof P == "object" && P !== null && P.$$typeof === _;
  }
  function Ke(P) {
    var te = { "=": "=0", ":": "=2" };
    return "$" + P.replace(/[=:]/g, function(Fe) {
      return te[Fe];
    });
  }
  var $e = /\/+/g;
  function be(P, te) {
    return typeof P == "object" && P !== null && P.key != null ? Ke("" + P.key) : te.toString(36);
  }
  function ut(P, te, Fe, xe, Qe) {
    var it = typeof P;
    (it === "undefined" || it === "boolean") && (P = null);
    var rt = !1;
    if (P === null) rt = !0;
    else switch (it) {
      case "string":
      case "number":
        rt = !0;
        break;
      case "object":
        switch (P.$$typeof) {
          case _:
          case l:
            rt = !0;
        }
    }
    if (rt) return rt = P, Qe = Qe(rt), P = xe === "" ? "." + be(rt, 0) : xe, ie(Qe) ? (Fe = "", P != null && (Fe = P.replace($e, "$&/") + "/"), ut(Qe, te, Fe, "", function(Qt) {
      return Qt;
    })) : Qe != null && (Ie(Qe) && (Qe = se(Qe, Fe + (!Qe.key || rt && rt.key === Qe.key ? "" : ("" + Qe.key).replace($e, "$&/") + "/") + P)), te.push(Qe)), 1;
    if (rt = 0, xe = xe === "" ? "." : xe + ":", ie(P)) for (var ct = 0; ct < P.length; ct++) {
      it = P[ct];
      var wt = xe + be(it, ct);
      rt += ut(it, te, Fe, wt, Qe);
    }
    else if (wt = A(P), typeof wt == "function") for (P = wt.call(P), ct = 0; !(it = P.next()).done; ) it = it.value, wt = xe + be(it, ct++), rt += ut(it, te, Fe, wt, Qe);
    else if (it === "object") throw te = String(P), Error("Objects are not valid as a React child (found: " + (te === "[object Object]" ? "object with keys {" + Object.keys(P).join(", ") + "}" : te) + "). If you meant to render a collection of children, use an array instead.");
    return rt;
  }
  function Ge(P, te, Fe) {
    if (P == null) return P;
    var xe = [], Qe = 0;
    return ut(P, xe, "", "", function(it) {
      return te.call(Fe, it, Qe++);
    }), xe;
  }
  function pe(P) {
    if (P._status === -1) {
      var te = P._result;
      te = te(), te.then(function(Fe) {
        (P._status === 0 || P._status === -1) && (P._status = 1, P._result = Fe);
      }, function(Fe) {
        (P._status === 0 || P._status === -1) && (P._status = 2, P._result = Fe);
      }), P._status === -1 && (P._status = 0, P._result = te);
    }
    if (P._status === 1) return P._result.default;
    throw P._result;
  }
  var ce = { current: null }, le = { transition: null }, Te = { ReactCurrentDispatcher: ce, ReactCurrentBatchConfig: le, ReactCurrentOwner: fe };
  function me() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return Dt.Children = { map: Ge, forEach: function(P, te, Fe) {
    Ge(P, function() {
      te.apply(this, arguments);
    }, Fe);
  }, count: function(P) {
    var te = 0;
    return Ge(P, function() {
      te++;
    }), te;
  }, toArray: function(P) {
    return Ge(P, function(te) {
      return te;
    }) || [];
  }, only: function(P) {
    if (!Ie(P)) throw Error("React.Children.only expected to receive a single React element child.");
    return P;
  } }, Dt.Component = I, Dt.Fragment = s, Dt.Profiler = p, Dt.PureComponent = ee, Dt.StrictMode = f, Dt.Suspense = T, Dt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Te, Dt.act = me, Dt.cloneElement = function(P, te, Fe) {
    if (P == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + P + ".");
    var xe = V({}, P.props), Qe = P.key, it = P.ref, rt = P._owner;
    if (te != null) {
      if (te.ref !== void 0 && (it = te.ref, rt = fe.current), te.key !== void 0 && (Qe = "" + te.key), P.type && P.type.defaultProps) var ct = P.type.defaultProps;
      for (wt in te) Y.call(te, wt) && !ae.hasOwnProperty(wt) && (xe[wt] = te[wt] === void 0 && ct !== void 0 ? ct[wt] : te[wt]);
    }
    var wt = arguments.length - 2;
    if (wt === 1) xe.children = Fe;
    else if (1 < wt) {
      ct = Array(wt);
      for (var Qt = 0; Qt < wt; Qt++) ct[Qt] = arguments[Qt + 2];
      xe.children = ct;
    }
    return { $$typeof: _, type: P.type, key: Qe, ref: it, props: xe, _owner: rt };
  }, Dt.createContext = function(P) {
    return P = { $$typeof: h, _currentValue: P, _currentValue2: P, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, P.Provider = { $$typeof: y, _context: P }, P.Consumer = P;
  }, Dt.createElement = ge, Dt.createFactory = function(P) {
    var te = ge.bind(null, P);
    return te.type = P, te;
  }, Dt.createRef = function() {
    return { current: null };
  }, Dt.forwardRef = function(P) {
    return { $$typeof: E, render: P };
  }, Dt.isValidElement = Ie, Dt.lazy = function(P) {
    return { $$typeof: R, _payload: { _status: -1, _result: P }, _init: pe };
  }, Dt.memo = function(P, te) {
    return { $$typeof: x, type: P, compare: te === void 0 ? null : te };
  }, Dt.startTransition = function(P) {
    var te = le.transition;
    le.transition = {};
    try {
      P();
    } finally {
      le.transition = te;
    }
  }, Dt.unstable_act = me, Dt.useCallback = function(P, te) {
    return ce.current.useCallback(P, te);
  }, Dt.useContext = function(P) {
    return ce.current.useContext(P);
  }, Dt.useDebugValue = function() {
  }, Dt.useDeferredValue = function(P) {
    return ce.current.useDeferredValue(P);
  }, Dt.useEffect = function(P, te) {
    return ce.current.useEffect(P, te);
  }, Dt.useId = function() {
    return ce.current.useId();
  }, Dt.useImperativeHandle = function(P, te, Fe) {
    return ce.current.useImperativeHandle(P, te, Fe);
  }, Dt.useInsertionEffect = function(P, te) {
    return ce.current.useInsertionEffect(P, te);
  }, Dt.useLayoutEffect = function(P, te) {
    return ce.current.useLayoutEffect(P, te);
  }, Dt.useMemo = function(P, te) {
    return ce.current.useMemo(P, te);
  }, Dt.useReducer = function(P, te, Fe) {
    return ce.current.useReducer(P, te, Fe);
  }, Dt.useRef = function(P) {
    return ce.current.useRef(P);
  }, Dt.useState = function(P) {
    return ce.current.useState(P);
  }, Dt.useSyncExternalStore = function(P, te, Fe) {
    return ce.current.useSyncExternalStore(P, te, Fe);
  }, Dt.useTransition = function() {
    return ce.current.useTransition();
  }, Dt.version = "18.3.1", Dt;
}
var wv = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
wv.exports;
var ux;
function aN() {
  return ux || (ux = 1, function(_, l) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var s = "18.3.1", f = Symbol.for("react.element"), p = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), h = Symbol.for("react.strict_mode"), E = Symbol.for("react.profiler"), T = Symbol.for("react.provider"), x = Symbol.for("react.context"), R = Symbol.for("react.forward_ref"), O = Symbol.for("react.suspense"), A = Symbol.for("react.suspense_list"), M = Symbol.for("react.memo"), V = Symbol.for("react.lazy"), L = Symbol.for("react.offscreen"), I = Symbol.iterator, ne = "@@iterator";
      function ee(w) {
        if (w === null || typeof w != "object")
          return null;
        var z = I && w[I] || w[ne];
        return typeof z == "function" ? z : null;
      }
      var Q = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, ie = {
        transition: null
      }, Y = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, fe = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, ae = {}, ge = null;
      function se(w) {
        ge = w;
      }
      ae.setExtraStackFrame = function(w) {
        ge = w;
      }, ae.getCurrentStack = null, ae.getStackAddendum = function() {
        var w = "";
        ge && (w += ge);
        var z = ae.getCurrentStack;
        return z && (w += z() || ""), w;
      };
      var Ie = !1, Ke = !1, $e = !1, be = !1, ut = !1, Ge = {
        ReactCurrentDispatcher: Q,
        ReactCurrentBatchConfig: ie,
        ReactCurrentOwner: fe
      };
      Ge.ReactDebugCurrentFrame = ae, Ge.ReactCurrentActQueue = Y;
      function pe(w) {
        {
          for (var z = arguments.length, K = new Array(z > 1 ? z - 1 : 0), re = 1; re < z; re++)
            K[re - 1] = arguments[re];
          le("warn", w, K);
        }
      }
      function ce(w) {
        {
          for (var z = arguments.length, K = new Array(z > 1 ? z - 1 : 0), re = 1; re < z; re++)
            K[re - 1] = arguments[re];
          le("error", w, K);
        }
      }
      function le(w, z, K) {
        {
          var re = Ge.ReactDebugCurrentFrame, we = re.getStackAddendum();
          we !== "" && (z += "%s", K = K.concat([we]));
          var tt = K.map(function(De) {
            return String(De);
          });
          tt.unshift("Warning: " + z), Function.prototype.apply.call(console[w], console, tt);
        }
      }
      var Te = {};
      function me(w, z) {
        {
          var K = w.constructor, re = K && (K.displayName || K.name) || "ReactClass", we = re + "." + z;
          if (Te[we])
            return;
          ce("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", z, re), Te[we] = !0;
        }
      }
      var P = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(w) {
          return !1;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function(w, z, K) {
          me(w, "forceUpdate");
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function(w, z, K, re) {
          me(w, "replaceState");
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function(w, z, K, re) {
          me(w, "setState");
        }
      }, te = Object.assign, Fe = {};
      Object.freeze(Fe);
      function xe(w, z, K) {
        this.props = w, this.context = z, this.refs = Fe, this.updater = K || P;
      }
      xe.prototype.isReactComponent = {}, xe.prototype.setState = function(w, z) {
        if (typeof w != "object" && typeof w != "function" && w != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, w, z, "setState");
      }, xe.prototype.forceUpdate = function(w) {
        this.updater.enqueueForceUpdate(this, w, "forceUpdate");
      };
      {
        var Qe = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, it = function(w, z) {
          Object.defineProperty(xe.prototype, w, {
            get: function() {
              pe("%s(...) is deprecated in plain JavaScript React classes. %s", z[0], z[1]);
            }
          });
        };
        for (var rt in Qe)
          Qe.hasOwnProperty(rt) && it(rt, Qe[rt]);
      }
      function ct() {
      }
      ct.prototype = xe.prototype;
      function wt(w, z, K) {
        this.props = w, this.context = z, this.refs = Fe, this.updater = K || P;
      }
      var Qt = wt.prototype = new ct();
      Qt.constructor = wt, te(Qt, xe.prototype), Qt.isPureReactComponent = !0;
      function Pn() {
        var w = {
          current: null
        };
        return Object.seal(w), w;
      }
      var Fr = Array.isArray;
      function bn(w) {
        return Fr(w);
      }
      function pr(w) {
        {
          var z = typeof Symbol == "function" && Symbol.toStringTag, K = z && w[Symbol.toStringTag] || w.constructor.name || "Object";
          return K;
        }
      }
      function Xn(w) {
        try {
          return Kn(w), !1;
        } catch {
          return !0;
        }
      }
      function Kn(w) {
        return "" + w;
      }
      function ra(w) {
        if (Xn(w))
          return ce("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", pr(w)), Kn(w);
      }
      function Fi(w, z, K) {
        var re = w.displayName;
        if (re)
          return re;
        var we = z.displayName || z.name || "";
        return we !== "" ? K + "(" + we + ")" : K;
      }
      function wa(w) {
        return w.displayName || "Context";
      }
      function ir(w) {
        if (w == null)
          return null;
        if (typeof w.tag == "number" && ce("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof w == "function")
          return w.displayName || w.name || null;
        if (typeof w == "string")
          return w;
        switch (w) {
          case y:
            return "Fragment";
          case p:
            return "Portal";
          case E:
            return "Profiler";
          case h:
            return "StrictMode";
          case O:
            return "Suspense";
          case A:
            return "SuspenseList";
        }
        if (typeof w == "object")
          switch (w.$$typeof) {
            case x:
              var z = w;
              return wa(z) + ".Consumer";
            case T:
              var K = w;
              return wa(K._context) + ".Provider";
            case R:
              return Fi(w, w.render, "ForwardRef");
            case M:
              var re = w.displayName || null;
              return re !== null ? re : ir(w.type) || "Memo";
            case V: {
              var we = w, tt = we._payload, De = we._init;
              try {
                return ir(De(tt));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var Rn = Object.prototype.hasOwnProperty, Jn = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, Dr, fi, jn;
      jn = {};
      function Or(w) {
        if (Rn.call(w, "ref")) {
          var z = Object.getOwnPropertyDescriptor(w, "ref").get;
          if (z && z.isReactWarning)
            return !1;
        }
        return w.ref !== void 0;
      }
      function Ta(w) {
        if (Rn.call(w, "key")) {
          var z = Object.getOwnPropertyDescriptor(w, "key").get;
          if (z && z.isReactWarning)
            return !1;
        }
        return w.key !== void 0;
      }
      function di(w, z) {
        var K = function() {
          Dr || (Dr = !0, ce("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", z));
        };
        K.isReactWarning = !0, Object.defineProperty(w, "key", {
          get: K,
          configurable: !0
        });
      }
      function Pi(w, z) {
        var K = function() {
          fi || (fi = !0, ce("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", z));
        };
        K.isReactWarning = !0, Object.defineProperty(w, "ref", {
          get: K,
          configurable: !0
        });
      }
      function Re(w) {
        if (typeof w.ref == "string" && fe.current && w.__self && fe.current.stateNode !== w.__self) {
          var z = ir(fe.current.type);
          jn[z] || (ce('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', z, w.ref), jn[z] = !0);
        }
      }
      var qe = function(w, z, K, re, we, tt, De) {
        var lt = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: f,
          // Built-in properties that belong on the element
          type: w,
          key: z,
          ref: K,
          props: De,
          // Record the component responsible for creating this element.
          _owner: tt
        };
        return lt._store = {}, Object.defineProperty(lt._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(lt, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: re
        }), Object.defineProperty(lt, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: we
        }), Object.freeze && (Object.freeze(lt.props), Object.freeze(lt)), lt;
      };
      function Et(w, z, K) {
        var re, we = {}, tt = null, De = null, lt = null, Rt = null;
        if (z != null) {
          Or(z) && (De = z.ref, Re(z)), Ta(z) && (ra(z.key), tt = "" + z.key), lt = z.__self === void 0 ? null : z.__self, Rt = z.__source === void 0 ? null : z.__source;
          for (re in z)
            Rn.call(z, re) && !Jn.hasOwnProperty(re) && (we[re] = z[re]);
        }
        var zt = arguments.length - 2;
        if (zt === 1)
          we.children = K;
        else if (zt > 1) {
          for (var un = Array(zt), Jt = 0; Jt < zt; Jt++)
            un[Jt] = arguments[Jt + 2];
          Object.freeze && Object.freeze(un), we.children = un;
        }
        if (w && w.defaultProps) {
          var Ct = w.defaultProps;
          for (re in Ct)
            we[re] === void 0 && (we[re] = Ct[re]);
        }
        if (tt || De) {
          var Zt = typeof w == "function" ? w.displayName || w.name || "Unknown" : w;
          tt && di(we, Zt), De && Pi(we, Zt);
        }
        return qe(w, tt, De, lt, Rt, fe.current, we);
      }
      function Wt(w, z) {
        var K = qe(w.type, z, w.ref, w._self, w._source, w._owner, w.props);
        return K;
      }
      function an(w, z, K) {
        if (w == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + w + ".");
        var re, we = te({}, w.props), tt = w.key, De = w.ref, lt = w._self, Rt = w._source, zt = w._owner;
        if (z != null) {
          Or(z) && (De = z.ref, zt = fe.current), Ta(z) && (ra(z.key), tt = "" + z.key);
          var un;
          w.type && w.type.defaultProps && (un = w.type.defaultProps);
          for (re in z)
            Rn.call(z, re) && !Jn.hasOwnProperty(re) && (z[re] === void 0 && un !== void 0 ? we[re] = un[re] : we[re] = z[re]);
        }
        var Jt = arguments.length - 2;
        if (Jt === 1)
          we.children = K;
        else if (Jt > 1) {
          for (var Ct = Array(Jt), Zt = 0; Zt < Jt; Zt++)
            Ct[Zt] = arguments[Zt + 2];
          we.children = Ct;
        }
        return qe(w.type, tt, De, lt, Rt, zt, we);
      }
      function gn(w) {
        return typeof w == "object" && w !== null && w.$$typeof === f;
      }
      var cn = ".", lr = ":";
      function ln(w) {
        var z = /[=:]/g, K = {
          "=": "=0",
          ":": "=2"
        }, re = w.replace(z, function(we) {
          return K[we];
        });
        return "$" + re;
      }
      var qt = !1, Xt = /\/+/g;
      function xa(w) {
        return w.replace(Xt, "$&/");
      }
      function Mr(w, z) {
        return typeof w == "object" && w !== null && w.key != null ? (ra(w.key), ln("" + w.key)) : z.toString(36);
      }
      function ja(w, z, K, re, we) {
        var tt = typeof w;
        (tt === "undefined" || tt === "boolean") && (w = null);
        var De = !1;
        if (w === null)
          De = !0;
        else
          switch (tt) {
            case "string":
            case "number":
              De = !0;
              break;
            case "object":
              switch (w.$$typeof) {
                case f:
                case p:
                  De = !0;
              }
          }
        if (De) {
          var lt = w, Rt = we(lt), zt = re === "" ? cn + Mr(lt, 0) : re;
          if (bn(Rt)) {
            var un = "";
            zt != null && (un = xa(zt) + "/"), ja(Rt, z, un, "", function(gp) {
              return gp;
            });
          } else Rt != null && (gn(Rt) && (Rt.key && (!lt || lt.key !== Rt.key) && ra(Rt.key), Rt = Wt(
            Rt,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            K + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (Rt.key && (!lt || lt.key !== Rt.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              xa("" + Rt.key) + "/"
            ) : "") + zt
          )), z.push(Rt));
          return 1;
        }
        var Jt, Ct, Zt = 0, _n = re === "" ? cn : re + lr;
        if (bn(w))
          for (var eo = 0; eo < w.length; eo++)
            Jt = w[eo], Ct = _n + Mr(Jt, eo), Zt += ja(Jt, z, K, Ct, we);
        else {
          var $s = ee(w);
          if (typeof $s == "function") {
            var _l = w;
            $s === _l.entries && (qt || pe("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), qt = !0);
            for (var Gs = $s.call(_l), Wo, yp = 0; !(Wo = Gs.next()).done; )
              Jt = Wo.value, Ct = _n + Mr(Jt, yp++), Zt += ja(Jt, z, K, Ct, we);
          } else if (tt === "object") {
            var gf = String(w);
            throw new Error("Objects are not valid as a React child (found: " + (gf === "[object Object]" ? "object with keys {" + Object.keys(w).join(", ") + "}" : gf) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return Zt;
      }
      function ml(w, z, K) {
        if (w == null)
          return w;
        var re = [], we = 0;
        return ja(w, re, "", "", function(tt) {
          return z.call(K, tt, we++);
        }), re;
      }
      function Uo(w) {
        var z = 0;
        return ml(w, function() {
          z++;
        }), z;
      }
      function Fo(w, z, K) {
        ml(w, function() {
          z.apply(this, arguments);
        }, K);
      }
      function Wl(w) {
        return ml(w, function(z) {
          return z;
        }) || [];
      }
      function $l(w) {
        if (!gn(w))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return w;
      }
      function Po(w) {
        var z = {
          $$typeof: x,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: w,
          _currentValue2: w,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null,
          // Add these to use same hidden class in VM as ServerContext
          _defaultValue: null,
          _globalName: null
        };
        z.Provider = {
          $$typeof: T,
          _context: z
        };
        var K = !1, re = !1, we = !1;
        {
          var tt = {
            $$typeof: x,
            _context: z
          };
          Object.defineProperties(tt, {
            Provider: {
              get: function() {
                return re || (re = !0, ce("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), z.Provider;
              },
              set: function(De) {
                z.Provider = De;
              }
            },
            _currentValue: {
              get: function() {
                return z._currentValue;
              },
              set: function(De) {
                z._currentValue = De;
              }
            },
            _currentValue2: {
              get: function() {
                return z._currentValue2;
              },
              set: function(De) {
                z._currentValue2 = De;
              }
            },
            _threadCount: {
              get: function() {
                return z._threadCount;
              },
              set: function(De) {
                z._threadCount = De;
              }
            },
            Consumer: {
              get: function() {
                return K || (K = !0, ce("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), z.Consumer;
              }
            },
            displayName: {
              get: function() {
                return z.displayName;
              },
              set: function(De) {
                we || (pe("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", De), we = !0);
              }
            }
          }), z.Consumer = tt;
        }
        return z._currentRenderer = null, z._currentRenderer2 = null, z;
      }
      var Pr = -1, jr = 0, hr = 1, ji = 2;
      function pi(w) {
        if (w._status === Pr) {
          var z = w._result, K = z();
          if (K.then(function(tt) {
            if (w._status === jr || w._status === Pr) {
              var De = w;
              De._status = hr, De._result = tt;
            }
          }, function(tt) {
            if (w._status === jr || w._status === Pr) {
              var De = w;
              De._status = ji, De._result = tt;
            }
          }), w._status === Pr) {
            var re = w;
            re._status = jr, re._result = K;
          }
        }
        if (w._status === hr) {
          var we = w._result;
          return we === void 0 && ce(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, we), "default" in we || ce(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, we), we.default;
        } else
          throw w._result;
      }
      function Hi(w) {
        var z = {
          // We use these fields to store the result.
          _status: Pr,
          _result: w
        }, K = {
          $$typeof: V,
          _payload: z,
          _init: pi
        };
        {
          var re, we;
          Object.defineProperties(K, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return re;
              },
              set: function(tt) {
                ce("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), re = tt, Object.defineProperty(K, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return we;
              },
              set: function(tt) {
                ce("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), we = tt, Object.defineProperty(K, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return K;
      }
      function Bi(w) {
        w != null && w.$$typeof === M ? ce("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof w != "function" ? ce("forwardRef requires a render function but was given %s.", w === null ? "null" : typeof w) : w.length !== 0 && w.length !== 2 && ce("forwardRef render functions accept exactly two parameters: props and ref. %s", w.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), w != null && (w.defaultProps != null || w.propTypes != null) && ce("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var z = {
          $$typeof: R,
          render: w
        };
        {
          var K;
          Object.defineProperty(z, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return K;
            },
            set: function(re) {
              K = re, !w.name && !w.displayName && (w.displayName = re);
            }
          });
        }
        return z;
      }
      var U;
      U = Symbol.for("react.module.reference");
      function he(w) {
        return !!(typeof w == "string" || typeof w == "function" || w === y || w === E || ut || w === h || w === O || w === A || be || w === L || Ie || Ke || $e || typeof w == "object" && w !== null && (w.$$typeof === V || w.$$typeof === M || w.$$typeof === T || w.$$typeof === x || w.$$typeof === R || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        w.$$typeof === U || w.getModuleId !== void 0));
      }
      function Oe(w, z) {
        he(w) || ce("memo: The first argument must be a component. Instead received: %s", w === null ? "null" : typeof w);
        var K = {
          $$typeof: M,
          type: w,
          compare: z === void 0 ? null : z
        };
        {
          var re;
          Object.defineProperty(K, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return re;
            },
            set: function(we) {
              re = we, !w.name && !w.displayName && (w.displayName = we);
            }
          });
        }
        return K;
      }
      function je() {
        var w = Q.current;
        return w === null && ce(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), w;
      }
      function yt(w) {
        var z = je();
        if (w._context !== void 0) {
          var K = w._context;
          K.Consumer === w ? ce("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : K.Provider === w && ce("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return z.useContext(w);
      }
      function ht(w) {
        var z = je();
        return z.useState(w);
      }
      function bt(w, z, K) {
        var re = je();
        return re.useReducer(w, z, K);
      }
      function Tt(w) {
        var z = je();
        return z.useRef(w);
      }
      function kn(w, z) {
        var K = je();
        return K.useEffect(w, z);
      }
      function on(w, z) {
        var K = je();
        return K.useInsertionEffect(w, z);
      }
      function fn(w, z) {
        var K = je();
        return K.useLayoutEffect(w, z);
      }
      function vr(w, z) {
        var K = je();
        return K.useCallback(w, z);
      }
      function hi(w, z) {
        var K = je();
        return K.useMemo(w, z);
      }
      function vi(w, z, K) {
        var re = je();
        return re.useImperativeHandle(w, z, K);
      }
      function gt(w, z) {
        {
          var K = je();
          return K.useDebugValue(w, z);
        }
      }
      function St() {
        var w = je();
        return w.useTransition();
      }
      function mi(w) {
        var z = je();
        return z.useDeferredValue(w);
      }
      function jo() {
        var w = je();
        return w.useId();
      }
      function Ho(w, z, K) {
        var re = je();
        return re.useSyncExternalStore(w, z, K);
      }
      var Gl = 0, Au, Ql, aa, Vs, Hr, mf, yf;
      function zu() {
      }
      zu.__reactDisabledLog = !0;
      function ql() {
        {
          if (Gl === 0) {
            Au = console.log, Ql = console.info, aa = console.warn, Vs = console.error, Hr = console.group, mf = console.groupCollapsed, yf = console.groupEnd;
            var w = {
              configurable: !0,
              enumerable: !0,
              value: zu,
              writable: !0
            };
            Object.defineProperties(console, {
              info: w,
              log: w,
              warn: w,
              error: w,
              group: w,
              groupCollapsed: w,
              groupEnd: w
            });
          }
          Gl++;
        }
      }
      function ba() {
        {
          if (Gl--, Gl === 0) {
            var w = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: te({}, w, {
                value: Au
              }),
              info: te({}, w, {
                value: Ql
              }),
              warn: te({}, w, {
                value: aa
              }),
              error: te({}, w, {
                value: Vs
              }),
              group: te({}, w, {
                value: Hr
              }),
              groupCollapsed: te({}, w, {
                value: mf
              }),
              groupEnd: te({}, w, {
                value: yf
              })
            });
          }
          Gl < 0 && ce("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var yi = Ge.ReactCurrentDispatcher, gi;
      function Uu(w, z, K) {
        {
          if (gi === void 0)
            try {
              throw Error();
            } catch (we) {
              var re = we.stack.trim().match(/\n( *(at )?)/);
              gi = re && re[1] || "";
            }
          return `
` + gi + w;
        }
      }
      var Bo = !1, Xl;
      {
        var Fu = typeof WeakMap == "function" ? WeakMap : Map;
        Xl = new Fu();
      }
      function Pu(w, z) {
        if (!w || Bo)
          return "";
        {
          var K = Xl.get(w);
          if (K !== void 0)
            return K;
        }
        var re;
        Bo = !0;
        var we = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var tt;
        tt = yi.current, yi.current = null, ql();
        try {
          if (z) {
            var De = function() {
              throw Error();
            };
            if (Object.defineProperty(De.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(De, []);
              } catch (_n) {
                re = _n;
              }
              Reflect.construct(w, [], De);
            } else {
              try {
                De.call();
              } catch (_n) {
                re = _n;
              }
              w.call(De.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (_n) {
              re = _n;
            }
            w();
          }
        } catch (_n) {
          if (_n && re && typeof _n.stack == "string") {
            for (var lt = _n.stack.split(`
`), Rt = re.stack.split(`
`), zt = lt.length - 1, un = Rt.length - 1; zt >= 1 && un >= 0 && lt[zt] !== Rt[un]; )
              un--;
            for (; zt >= 1 && un >= 0; zt--, un--)
              if (lt[zt] !== Rt[un]) {
                if (zt !== 1 || un !== 1)
                  do
                    if (zt--, un--, un < 0 || lt[zt] !== Rt[un]) {
                      var Jt = `
` + lt[zt].replace(" at new ", " at ");
                      return w.displayName && Jt.includes("<anonymous>") && (Jt = Jt.replace("<anonymous>", w.displayName)), typeof w == "function" && Xl.set(w, Jt), Jt;
                    }
                  while (zt >= 1 && un >= 0);
                break;
              }
          }
        } finally {
          Bo = !1, yi.current = tt, ba(), Error.prepareStackTrace = we;
        }
        var Ct = w ? w.displayName || w.name : "", Zt = Ct ? Uu(Ct) : "";
        return typeof w == "function" && Xl.set(w, Zt), Zt;
      }
      function yl(w, z, K) {
        return Pu(w, !1);
      }
      function vp(w) {
        var z = w.prototype;
        return !!(z && z.isReactComponent);
      }
      function gl(w, z, K) {
        if (w == null)
          return "";
        if (typeof w == "function")
          return Pu(w, vp(w));
        if (typeof w == "string")
          return Uu(w);
        switch (w) {
          case O:
            return Uu("Suspense");
          case A:
            return Uu("SuspenseList");
        }
        if (typeof w == "object")
          switch (w.$$typeof) {
            case R:
              return yl(w.render);
            case M:
              return gl(w.type, z, K);
            case V: {
              var re = w, we = re._payload, tt = re._init;
              try {
                return gl(tt(we), z, K);
              } catch {
              }
            }
          }
        return "";
      }
      var Pt = {}, ju = Ge.ReactDebugCurrentFrame;
      function At(w) {
        if (w) {
          var z = w._owner, K = gl(w.type, w._source, z ? z.type : null);
          ju.setExtraStackFrame(K);
        } else
          ju.setExtraStackFrame(null);
      }
      function Is(w, z, K, re, we) {
        {
          var tt = Function.call.bind(Rn);
          for (var De in w)
            if (tt(w, De)) {
              var lt = void 0;
              try {
                if (typeof w[De] != "function") {
                  var Rt = Error((re || "React class") + ": " + K + " type `" + De + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof w[De] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw Rt.name = "Invariant Violation", Rt;
                }
                lt = w[De](z, De, re, K, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (zt) {
                lt = zt;
              }
              lt && !(lt instanceof Error) && (At(we), ce("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", re || "React class", K, De, typeof lt), At(null)), lt instanceof Error && !(lt.message in Pt) && (Pt[lt.message] = !0, At(we), ce("Failed %s type: %s", K, lt.message), At(null));
            }
        }
      }
      function Vi(w) {
        if (w) {
          var z = w._owner, K = gl(w.type, w._source, z ? z.type : null);
          se(K);
        } else
          se(null);
      }
      var pt;
      pt = !1;
      function Hu() {
        if (fe.current) {
          var w = ir(fe.current.type);
          if (w)
            return `

Check the render method of \`` + w + "`.";
        }
        return "";
      }
      function mr(w) {
        if (w !== void 0) {
          var z = w.fileName.replace(/^.*[\\\/]/, ""), K = w.lineNumber;
          return `

Check your code at ` + z + ":" + K + ".";
        }
        return "";
      }
      function Ii(w) {
        return w != null ? mr(w.__source) : "";
      }
      var Br = {};
      function Yi(w) {
        var z = Hu();
        if (!z) {
          var K = typeof w == "string" ? w : w.displayName || w.name;
          K && (z = `

Check the top-level render call using <` + K + ">.");
        }
        return z;
      }
      function dn(w, z) {
        if (!(!w._store || w._store.validated || w.key != null)) {
          w._store.validated = !0;
          var K = Yi(z);
          if (!Br[K]) {
            Br[K] = !0;
            var re = "";
            w && w._owner && w._owner !== fe.current && (re = " It was passed a child from " + ir(w._owner.type) + "."), Vi(w), ce('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', K, re), Vi(null);
          }
        }
      }
      function Kt(w, z) {
        if (typeof w == "object") {
          if (bn(w))
            for (var K = 0; K < w.length; K++) {
              var re = w[K];
              gn(re) && dn(re, z);
            }
          else if (gn(w))
            w._store && (w._store.validated = !0);
          else if (w) {
            var we = ee(w);
            if (typeof we == "function" && we !== w.entries)
              for (var tt = we.call(w), De; !(De = tt.next()).done; )
                gn(De.value) && dn(De.value, z);
          }
        }
      }
      function Kl(w) {
        {
          var z = w.type;
          if (z == null || typeof z == "string")
            return;
          var K;
          if (typeof z == "function")
            K = z.propTypes;
          else if (typeof z == "object" && (z.$$typeof === R || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          z.$$typeof === M))
            K = z.propTypes;
          else
            return;
          if (K) {
            var re = ir(z);
            Is(K, w.props, "prop", re, w);
          } else if (z.PropTypes !== void 0 && !pt) {
            pt = !0;
            var we = ir(z);
            ce("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", we || "Unknown");
          }
          typeof z.getDefaultProps == "function" && !z.getDefaultProps.isReactClassApproved && ce("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Zn(w) {
        {
          for (var z = Object.keys(w.props), K = 0; K < z.length; K++) {
            var re = z[K];
            if (re !== "children" && re !== "key") {
              Vi(w), ce("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", re), Vi(null);
              break;
            }
          }
          w.ref !== null && (Vi(w), ce("Invalid attribute `ref` supplied to `React.Fragment`."), Vi(null));
        }
      }
      function Vr(w, z, K) {
        var re = he(w);
        if (!re) {
          var we = "";
          (w === void 0 || typeof w == "object" && w !== null && Object.keys(w).length === 0) && (we += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var tt = Ii(z);
          tt ? we += tt : we += Hu();
          var De;
          w === null ? De = "null" : bn(w) ? De = "array" : w !== void 0 && w.$$typeof === f ? (De = "<" + (ir(w.type) || "Unknown") + " />", we = " Did you accidentally export a JSX literal instead of a component?") : De = typeof w, ce("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", De, we);
        }
        var lt = Et.apply(this, arguments);
        if (lt == null)
          return lt;
        if (re)
          for (var Rt = 2; Rt < arguments.length; Rt++)
            Kt(arguments[Rt], w);
        return w === y ? Zn(lt) : Kl(lt), lt;
      }
      var Ha = !1;
      function Vo(w) {
        var z = Vr.bind(null, w);
        return z.type = w, Ha || (Ha = !0, pe("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(z, "type", {
          enumerable: !1,
          get: function() {
            return pe("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: w
            }), w;
          }
        }), z;
      }
      function Ys(w, z, K) {
        for (var re = an.apply(this, arguments), we = 2; we < arguments.length; we++)
          Kt(arguments[we], re.type);
        return Kl(re), re;
      }
      function Ws(w, z) {
        var K = ie.transition;
        ie.transition = {};
        var re = ie.transition;
        ie.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          w();
        } finally {
          if (ie.transition = K, K === null && re._updatedFibers) {
            var we = re._updatedFibers.size;
            we > 10 && pe("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), re._updatedFibers.clear();
          }
        }
      }
      var Jl = !1, Io = null;
      function mp(w) {
        if (Io === null)
          try {
            var z = ("require" + Math.random()).slice(0, 7), K = _ && _[z];
            Io = K.call(_, "timers").setImmediate;
          } catch {
            Io = function(we) {
              Jl === !1 && (Jl = !0, typeof MessageChannel > "u" && ce("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var tt = new MessageChannel();
              tt.port1.onmessage = we, tt.port2.postMessage(void 0);
            };
          }
        return Io(w);
      }
      var Ba = 0, _i = !1;
      function Wi(w) {
        {
          var z = Ba;
          Ba++, Y.current === null && (Y.current = []);
          var K = Y.isBatchingLegacy, re;
          try {
            if (Y.isBatchingLegacy = !0, re = w(), !K && Y.didScheduleLegacyUpdate) {
              var we = Y.current;
              we !== null && (Y.didScheduleLegacyUpdate = !1, Zl(we));
            }
          } catch (Ct) {
            throw Va(z), Ct;
          } finally {
            Y.isBatchingLegacy = K;
          }
          if (re !== null && typeof re == "object" && typeof re.then == "function") {
            var tt = re, De = !1, lt = {
              then: function(Ct, Zt) {
                De = !0, tt.then(function(_n) {
                  Va(z), Ba === 0 ? Bu(_n, Ct, Zt) : Ct(_n);
                }, function(_n) {
                  Va(z), Zt(_n);
                });
              }
            };
            return !_i && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              De || (_i = !0, ce("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), lt;
          } else {
            var Rt = re;
            if (Va(z), Ba === 0) {
              var zt = Y.current;
              zt !== null && (Zl(zt), Y.current = null);
              var un = {
                then: function(Ct, Zt) {
                  Y.current === null ? (Y.current = [], Bu(Rt, Ct, Zt)) : Ct(Rt);
                }
              };
              return un;
            } else {
              var Jt = {
                then: function(Ct, Zt) {
                  Ct(Rt);
                }
              };
              return Jt;
            }
          }
        }
      }
      function Va(w) {
        w !== Ba - 1 && ce("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Ba = w;
      }
      function Bu(w, z, K) {
        {
          var re = Y.current;
          if (re !== null)
            try {
              Zl(re), mp(function() {
                re.length === 0 ? (Y.current = null, z(w)) : Bu(w, z, K);
              });
            } catch (we) {
              K(we);
            }
          else
            z(w);
        }
      }
      var Vu = !1;
      function Zl(w) {
        if (!Vu) {
          Vu = !0;
          var z = 0;
          try {
            for (; z < w.length; z++) {
              var K = w[z];
              do
                K = K(!0);
              while (K !== null);
            }
            w.length = 0;
          } catch (re) {
            throw w = w.slice(z + 1), re;
          } finally {
            Vu = !1;
          }
        }
      }
      var Yo = Vr, Iu = Ys, Yu = Vo, Si = {
        map: ml,
        forEach: Fo,
        count: Uo,
        toArray: Wl,
        only: $l
      };
      l.Children = Si, l.Component = xe, l.Fragment = y, l.Profiler = E, l.PureComponent = wt, l.StrictMode = h, l.Suspense = O, l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ge, l.act = Wi, l.cloneElement = Iu, l.createContext = Po, l.createElement = Yo, l.createFactory = Yu, l.createRef = Pn, l.forwardRef = Bi, l.isValidElement = gn, l.lazy = Hi, l.memo = Oe, l.startTransition = Ws, l.unstable_act = Wi, l.useCallback = vr, l.useContext = yt, l.useDebugValue = gt, l.useDeferredValue = mi, l.useEffect = kn, l.useId = jo, l.useImperativeHandle = vi, l.useInsertionEffect = on, l.useLayoutEffect = fn, l.useMemo = hi, l.useReducer = bt, l.useRef = Tt, l.useState = ht, l.useSyncExternalStore = Ho, l.useTransition = St, l.version = s, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(wv, wv.exports)), wv.exports;
}
var sx;
function Pv() {
  return sx || (sx = 1, process.env.NODE_ENV === "production" ? Mg.exports = rN() : Mg.exports = aN()), Mg.exports;
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cx;
function iN() {
  if (cx) return Sv;
  cx = 1;
  var _ = Pv(), l = Symbol.for("react.element"), s = Symbol.for("react.fragment"), f = Object.prototype.hasOwnProperty, p = _.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, y = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(E, T, x) {
    var R, O = {}, A = null, M = null;
    x !== void 0 && (A = "" + x), T.key !== void 0 && (A = "" + T.key), T.ref !== void 0 && (M = T.ref);
    for (R in T) f.call(T, R) && !y.hasOwnProperty(R) && (O[R] = T[R]);
    if (E && E.defaultProps) for (R in T = E.defaultProps, T) O[R] === void 0 && (O[R] = T[R]);
    return { $$typeof: l, type: E, key: A, ref: M, props: O, _owner: p.current };
  }
  return Sv.Fragment = s, Sv.jsx = h, Sv.jsxs = h, Sv;
}
var Ev = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fx;
function lN() {
  return fx || (fx = 1, process.env.NODE_ENV !== "production" && function() {
    var _ = Pv(), l = Symbol.for("react.element"), s = Symbol.for("react.portal"), f = Symbol.for("react.fragment"), p = Symbol.for("react.strict_mode"), y = Symbol.for("react.profiler"), h = Symbol.for("react.provider"), E = Symbol.for("react.context"), T = Symbol.for("react.forward_ref"), x = Symbol.for("react.suspense"), R = Symbol.for("react.suspense_list"), O = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), M = Symbol.for("react.offscreen"), V = Symbol.iterator, L = "@@iterator";
    function I(U) {
      if (U === null || typeof U != "object")
        return null;
      var he = V && U[V] || U[L];
      return typeof he == "function" ? he : null;
    }
    var ne = _.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function ee(U) {
      {
        for (var he = arguments.length, Oe = new Array(he > 1 ? he - 1 : 0), je = 1; je < he; je++)
          Oe[je - 1] = arguments[je];
        Q("error", U, Oe);
      }
    }
    function Q(U, he, Oe) {
      {
        var je = ne.ReactDebugCurrentFrame, yt = je.getStackAddendum();
        yt !== "" && (he += "%s", Oe = Oe.concat([yt]));
        var ht = Oe.map(function(bt) {
          return String(bt);
        });
        ht.unshift("Warning: " + he), Function.prototype.apply.call(console[U], console, ht);
      }
    }
    var ie = !1, Y = !1, fe = !1, ae = !1, ge = !1, se;
    se = Symbol.for("react.module.reference");
    function Ie(U) {
      return !!(typeof U == "string" || typeof U == "function" || U === f || U === y || ge || U === p || U === x || U === R || ae || U === M || ie || Y || fe || typeof U == "object" && U !== null && (U.$$typeof === A || U.$$typeof === O || U.$$typeof === h || U.$$typeof === E || U.$$typeof === T || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      U.$$typeof === se || U.getModuleId !== void 0));
    }
    function Ke(U, he, Oe) {
      var je = U.displayName;
      if (je)
        return je;
      var yt = he.displayName || he.name || "";
      return yt !== "" ? Oe + "(" + yt + ")" : Oe;
    }
    function $e(U) {
      return U.displayName || "Context";
    }
    function be(U) {
      if (U == null)
        return null;
      if (typeof U.tag == "number" && ee("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof U == "function")
        return U.displayName || U.name || null;
      if (typeof U == "string")
        return U;
      switch (U) {
        case f:
          return "Fragment";
        case s:
          return "Portal";
        case y:
          return "Profiler";
        case p:
          return "StrictMode";
        case x:
          return "Suspense";
        case R:
          return "SuspenseList";
      }
      if (typeof U == "object")
        switch (U.$$typeof) {
          case E:
            var he = U;
            return $e(he) + ".Consumer";
          case h:
            var Oe = U;
            return $e(Oe._context) + ".Provider";
          case T:
            return Ke(U, U.render, "ForwardRef");
          case O:
            var je = U.displayName || null;
            return je !== null ? je : be(U.type) || "Memo";
          case A: {
            var yt = U, ht = yt._payload, bt = yt._init;
            try {
              return be(bt(ht));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var ut = Object.assign, Ge = 0, pe, ce, le, Te, me, P, te;
    function Fe() {
    }
    Fe.__reactDisabledLog = !0;
    function xe() {
      {
        if (Ge === 0) {
          pe = console.log, ce = console.info, le = console.warn, Te = console.error, me = console.group, P = console.groupCollapsed, te = console.groupEnd;
          var U = {
            configurable: !0,
            enumerable: !0,
            value: Fe,
            writable: !0
          };
          Object.defineProperties(console, {
            info: U,
            log: U,
            warn: U,
            error: U,
            group: U,
            groupCollapsed: U,
            groupEnd: U
          });
        }
        Ge++;
      }
    }
    function Qe() {
      {
        if (Ge--, Ge === 0) {
          var U = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: ut({}, U, {
              value: pe
            }),
            info: ut({}, U, {
              value: ce
            }),
            warn: ut({}, U, {
              value: le
            }),
            error: ut({}, U, {
              value: Te
            }),
            group: ut({}, U, {
              value: me
            }),
            groupCollapsed: ut({}, U, {
              value: P
            }),
            groupEnd: ut({}, U, {
              value: te
            })
          });
        }
        Ge < 0 && ee("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var it = ne.ReactCurrentDispatcher, rt;
    function ct(U, he, Oe) {
      {
        if (rt === void 0)
          try {
            throw Error();
          } catch (yt) {
            var je = yt.stack.trim().match(/\n( *(at )?)/);
            rt = je && je[1] || "";
          }
        return `
` + rt + U;
      }
    }
    var wt = !1, Qt;
    {
      var Pn = typeof WeakMap == "function" ? WeakMap : Map;
      Qt = new Pn();
    }
    function Fr(U, he) {
      if (!U || wt)
        return "";
      {
        var Oe = Qt.get(U);
        if (Oe !== void 0)
          return Oe;
      }
      var je;
      wt = !0;
      var yt = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var ht;
      ht = it.current, it.current = null, xe();
      try {
        if (he) {
          var bt = function() {
            throw Error();
          };
          if (Object.defineProperty(bt.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(bt, []);
            } catch (gt) {
              je = gt;
            }
            Reflect.construct(U, [], bt);
          } else {
            try {
              bt.call();
            } catch (gt) {
              je = gt;
            }
            U.call(bt.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (gt) {
            je = gt;
          }
          U();
        }
      } catch (gt) {
        if (gt && je && typeof gt.stack == "string") {
          for (var Tt = gt.stack.split(`
`), kn = je.stack.split(`
`), on = Tt.length - 1, fn = kn.length - 1; on >= 1 && fn >= 0 && Tt[on] !== kn[fn]; )
            fn--;
          for (; on >= 1 && fn >= 0; on--, fn--)
            if (Tt[on] !== kn[fn]) {
              if (on !== 1 || fn !== 1)
                do
                  if (on--, fn--, fn < 0 || Tt[on] !== kn[fn]) {
                    var vr = `
` + Tt[on].replace(" at new ", " at ");
                    return U.displayName && vr.includes("<anonymous>") && (vr = vr.replace("<anonymous>", U.displayName)), typeof U == "function" && Qt.set(U, vr), vr;
                  }
                while (on >= 1 && fn >= 0);
              break;
            }
        }
      } finally {
        wt = !1, it.current = ht, Qe(), Error.prepareStackTrace = yt;
      }
      var hi = U ? U.displayName || U.name : "", vi = hi ? ct(hi) : "";
      return typeof U == "function" && Qt.set(U, vi), vi;
    }
    function bn(U, he, Oe) {
      return Fr(U, !1);
    }
    function pr(U) {
      var he = U.prototype;
      return !!(he && he.isReactComponent);
    }
    function Xn(U, he, Oe) {
      if (U == null)
        return "";
      if (typeof U == "function")
        return Fr(U, pr(U));
      if (typeof U == "string")
        return ct(U);
      switch (U) {
        case x:
          return ct("Suspense");
        case R:
          return ct("SuspenseList");
      }
      if (typeof U == "object")
        switch (U.$$typeof) {
          case T:
            return bn(U.render);
          case O:
            return Xn(U.type, he, Oe);
          case A: {
            var je = U, yt = je._payload, ht = je._init;
            try {
              return Xn(ht(yt), he, Oe);
            } catch {
            }
          }
        }
      return "";
    }
    var Kn = Object.prototype.hasOwnProperty, ra = {}, Fi = ne.ReactDebugCurrentFrame;
    function wa(U) {
      if (U) {
        var he = U._owner, Oe = Xn(U.type, U._source, he ? he.type : null);
        Fi.setExtraStackFrame(Oe);
      } else
        Fi.setExtraStackFrame(null);
    }
    function ir(U, he, Oe, je, yt) {
      {
        var ht = Function.call.bind(Kn);
        for (var bt in U)
          if (ht(U, bt)) {
            var Tt = void 0;
            try {
              if (typeof U[bt] != "function") {
                var kn = Error((je || "React class") + ": " + Oe + " type `" + bt + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof U[bt] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw kn.name = "Invariant Violation", kn;
              }
              Tt = U[bt](he, bt, je, Oe, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (on) {
              Tt = on;
            }
            Tt && !(Tt instanceof Error) && (wa(yt), ee("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", je || "React class", Oe, bt, typeof Tt), wa(null)), Tt instanceof Error && !(Tt.message in ra) && (ra[Tt.message] = !0, wa(yt), ee("Failed %s type: %s", Oe, Tt.message), wa(null));
          }
      }
    }
    var Rn = Array.isArray;
    function Jn(U) {
      return Rn(U);
    }
    function Dr(U) {
      {
        var he = typeof Symbol == "function" && Symbol.toStringTag, Oe = he && U[Symbol.toStringTag] || U.constructor.name || "Object";
        return Oe;
      }
    }
    function fi(U) {
      try {
        return jn(U), !1;
      } catch {
        return !0;
      }
    }
    function jn(U) {
      return "" + U;
    }
    function Or(U) {
      if (fi(U))
        return ee("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Dr(U)), jn(U);
    }
    var Ta = ne.ReactCurrentOwner, di = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Pi, Re;
    function qe(U) {
      if (Kn.call(U, "ref")) {
        var he = Object.getOwnPropertyDescriptor(U, "ref").get;
        if (he && he.isReactWarning)
          return !1;
      }
      return U.ref !== void 0;
    }
    function Et(U) {
      if (Kn.call(U, "key")) {
        var he = Object.getOwnPropertyDescriptor(U, "key").get;
        if (he && he.isReactWarning)
          return !1;
      }
      return U.key !== void 0;
    }
    function Wt(U, he) {
      typeof U.ref == "string" && Ta.current;
    }
    function an(U, he) {
      {
        var Oe = function() {
          Pi || (Pi = !0, ee("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", he));
        };
        Oe.isReactWarning = !0, Object.defineProperty(U, "key", {
          get: Oe,
          configurable: !0
        });
      }
    }
    function gn(U, he) {
      {
        var Oe = function() {
          Re || (Re = !0, ee("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", he));
        };
        Oe.isReactWarning = !0, Object.defineProperty(U, "ref", {
          get: Oe,
          configurable: !0
        });
      }
    }
    var cn = function(U, he, Oe, je, yt, ht, bt) {
      var Tt = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: l,
        // Built-in properties that belong on the element
        type: U,
        key: he,
        ref: Oe,
        props: bt,
        // Record the component responsible for creating this element.
        _owner: ht
      };
      return Tt._store = {}, Object.defineProperty(Tt._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(Tt, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: je
      }), Object.defineProperty(Tt, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: yt
      }), Object.freeze && (Object.freeze(Tt.props), Object.freeze(Tt)), Tt;
    };
    function lr(U, he, Oe, je, yt) {
      {
        var ht, bt = {}, Tt = null, kn = null;
        Oe !== void 0 && (Or(Oe), Tt = "" + Oe), Et(he) && (Or(he.key), Tt = "" + he.key), qe(he) && (kn = he.ref, Wt(he, yt));
        for (ht in he)
          Kn.call(he, ht) && !di.hasOwnProperty(ht) && (bt[ht] = he[ht]);
        if (U && U.defaultProps) {
          var on = U.defaultProps;
          for (ht in on)
            bt[ht] === void 0 && (bt[ht] = on[ht]);
        }
        if (Tt || kn) {
          var fn = typeof U == "function" ? U.displayName || U.name || "Unknown" : U;
          Tt && an(bt, fn), kn && gn(bt, fn);
        }
        return cn(U, Tt, kn, yt, je, Ta.current, bt);
      }
    }
    var ln = ne.ReactCurrentOwner, qt = ne.ReactDebugCurrentFrame;
    function Xt(U) {
      if (U) {
        var he = U._owner, Oe = Xn(U.type, U._source, he ? he.type : null);
        qt.setExtraStackFrame(Oe);
      } else
        qt.setExtraStackFrame(null);
    }
    var xa;
    xa = !1;
    function Mr(U) {
      return typeof U == "object" && U !== null && U.$$typeof === l;
    }
    function ja() {
      {
        if (ln.current) {
          var U = be(ln.current.type);
          if (U)
            return `

Check the render method of \`` + U + "`.";
        }
        return "";
      }
    }
    function ml(U) {
      return "";
    }
    var Uo = {};
    function Fo(U) {
      {
        var he = ja();
        if (!he) {
          var Oe = typeof U == "string" ? U : U.displayName || U.name;
          Oe && (he = `

Check the top-level render call using <` + Oe + ">.");
        }
        return he;
      }
    }
    function Wl(U, he) {
      {
        if (!U._store || U._store.validated || U.key != null)
          return;
        U._store.validated = !0;
        var Oe = Fo(he);
        if (Uo[Oe])
          return;
        Uo[Oe] = !0;
        var je = "";
        U && U._owner && U._owner !== ln.current && (je = " It was passed a child from " + be(U._owner.type) + "."), Xt(U), ee('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', Oe, je), Xt(null);
      }
    }
    function $l(U, he) {
      {
        if (typeof U != "object")
          return;
        if (Jn(U))
          for (var Oe = 0; Oe < U.length; Oe++) {
            var je = U[Oe];
            Mr(je) && Wl(je, he);
          }
        else if (Mr(U))
          U._store && (U._store.validated = !0);
        else if (U) {
          var yt = I(U);
          if (typeof yt == "function" && yt !== U.entries)
            for (var ht = yt.call(U), bt; !(bt = ht.next()).done; )
              Mr(bt.value) && Wl(bt.value, he);
        }
      }
    }
    function Po(U) {
      {
        var he = U.type;
        if (he == null || typeof he == "string")
          return;
        var Oe;
        if (typeof he == "function")
          Oe = he.propTypes;
        else if (typeof he == "object" && (he.$$typeof === T || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        he.$$typeof === O))
          Oe = he.propTypes;
        else
          return;
        if (Oe) {
          var je = be(he);
          ir(Oe, U.props, "prop", je, U);
        } else if (he.PropTypes !== void 0 && !xa) {
          xa = !0;
          var yt = be(he);
          ee("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", yt || "Unknown");
        }
        typeof he.getDefaultProps == "function" && !he.getDefaultProps.isReactClassApproved && ee("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Pr(U) {
      {
        for (var he = Object.keys(U.props), Oe = 0; Oe < he.length; Oe++) {
          var je = he[Oe];
          if (je !== "children" && je !== "key") {
            Xt(U), ee("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", je), Xt(null);
            break;
          }
        }
        U.ref !== null && (Xt(U), ee("Invalid attribute `ref` supplied to `React.Fragment`."), Xt(null));
      }
    }
    var jr = {};
    function hr(U, he, Oe, je, yt, ht) {
      {
        var bt = Ie(U);
        if (!bt) {
          var Tt = "";
          (U === void 0 || typeof U == "object" && U !== null && Object.keys(U).length === 0) && (Tt += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var kn = ml();
          kn ? Tt += kn : Tt += ja();
          var on;
          U === null ? on = "null" : Jn(U) ? on = "array" : U !== void 0 && U.$$typeof === l ? (on = "<" + (be(U.type) || "Unknown") + " />", Tt = " Did you accidentally export a JSX literal instead of a component?") : on = typeof U, ee("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", on, Tt);
        }
        var fn = lr(U, he, Oe, yt, ht);
        if (fn == null)
          return fn;
        if (bt) {
          var vr = he.children;
          if (vr !== void 0)
            if (je)
              if (Jn(vr)) {
                for (var hi = 0; hi < vr.length; hi++)
                  $l(vr[hi], U);
                Object.freeze && Object.freeze(vr);
              } else
                ee("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              $l(vr, U);
        }
        if (Kn.call(he, "key")) {
          var vi = be(U), gt = Object.keys(he).filter(function(jo) {
            return jo !== "key";
          }), St = gt.length > 0 ? "{key: someKey, " + gt.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!jr[vi + St]) {
            var mi = gt.length > 0 ? "{" + gt.join(": ..., ") + ": ...}" : "{}";
            ee(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, St, vi, mi, vi), jr[vi + St] = !0;
          }
        }
        return U === f ? Pr(fn) : Po(fn), fn;
      }
    }
    function ji(U, he, Oe) {
      return hr(U, he, Oe, !0);
    }
    function pi(U, he, Oe) {
      return hr(U, he, Oe, !1);
    }
    var Hi = pi, Bi = ji;
    Ev.Fragment = f, Ev.jsx = Hi, Ev.jsxs = Bi;
  }()), Ev;
}
process.env.NODE_ENV === "production" ? NE.exports = iN() : NE.exports = lN();
var Ye = NE.exports, AE = { exports: {} }, ai = {}, Lg = { exports: {} }, gE = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dx;
function oN() {
  return dx || (dx = 1, function(_) {
    function l(le, Te) {
      var me = le.length;
      le.push(Te);
      e: for (; 0 < me; ) {
        var P = me - 1 >>> 1, te = le[P];
        if (0 < p(te, Te)) le[P] = Te, le[me] = te, me = P;
        else break e;
      }
    }
    function s(le) {
      return le.length === 0 ? null : le[0];
    }
    function f(le) {
      if (le.length === 0) return null;
      var Te = le[0], me = le.pop();
      if (me !== Te) {
        le[0] = me;
        e: for (var P = 0, te = le.length, Fe = te >>> 1; P < Fe; ) {
          var xe = 2 * (P + 1) - 1, Qe = le[xe], it = xe + 1, rt = le[it];
          if (0 > p(Qe, me)) it < te && 0 > p(rt, Qe) ? (le[P] = rt, le[it] = me, P = it) : (le[P] = Qe, le[xe] = me, P = xe);
          else if (it < te && 0 > p(rt, me)) le[P] = rt, le[it] = me, P = it;
          else break e;
        }
      }
      return Te;
    }
    function p(le, Te) {
      var me = le.sortIndex - Te.sortIndex;
      return me !== 0 ? me : le.id - Te.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var y = performance;
      _.unstable_now = function() {
        return y.now();
      };
    } else {
      var h = Date, E = h.now();
      _.unstable_now = function() {
        return h.now() - E;
      };
    }
    var T = [], x = [], R = 1, O = null, A = 3, M = !1, V = !1, L = !1, I = typeof setTimeout == "function" ? setTimeout : null, ne = typeof clearTimeout == "function" ? clearTimeout : null, ee = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Q(le) {
      for (var Te = s(x); Te !== null; ) {
        if (Te.callback === null) f(x);
        else if (Te.startTime <= le) f(x), Te.sortIndex = Te.expirationTime, l(T, Te);
        else break;
        Te = s(x);
      }
    }
    function ie(le) {
      if (L = !1, Q(le), !V) if (s(T) !== null) V = !0, pe(Y);
      else {
        var Te = s(x);
        Te !== null && ce(ie, Te.startTime - le);
      }
    }
    function Y(le, Te) {
      V = !1, L && (L = !1, ne(ge), ge = -1), M = !0;
      var me = A;
      try {
        for (Q(Te), O = s(T); O !== null && (!(O.expirationTime > Te) || le && !Ke()); ) {
          var P = O.callback;
          if (typeof P == "function") {
            O.callback = null, A = O.priorityLevel;
            var te = P(O.expirationTime <= Te);
            Te = _.unstable_now(), typeof te == "function" ? O.callback = te : O === s(T) && f(T), Q(Te);
          } else f(T);
          O = s(T);
        }
        if (O !== null) var Fe = !0;
        else {
          var xe = s(x);
          xe !== null && ce(ie, xe.startTime - Te), Fe = !1;
        }
        return Fe;
      } finally {
        O = null, A = me, M = !1;
      }
    }
    var fe = !1, ae = null, ge = -1, se = 5, Ie = -1;
    function Ke() {
      return !(_.unstable_now() - Ie < se);
    }
    function $e() {
      if (ae !== null) {
        var le = _.unstable_now();
        Ie = le;
        var Te = !0;
        try {
          Te = ae(!0, le);
        } finally {
          Te ? be() : (fe = !1, ae = null);
        }
      } else fe = !1;
    }
    var be;
    if (typeof ee == "function") be = function() {
      ee($e);
    };
    else if (typeof MessageChannel < "u") {
      var ut = new MessageChannel(), Ge = ut.port2;
      ut.port1.onmessage = $e, be = function() {
        Ge.postMessage(null);
      };
    } else be = function() {
      I($e, 0);
    };
    function pe(le) {
      ae = le, fe || (fe = !0, be());
    }
    function ce(le, Te) {
      ge = I(function() {
        le(_.unstable_now());
      }, Te);
    }
    _.unstable_IdlePriority = 5, _.unstable_ImmediatePriority = 1, _.unstable_LowPriority = 4, _.unstable_NormalPriority = 3, _.unstable_Profiling = null, _.unstable_UserBlockingPriority = 2, _.unstable_cancelCallback = function(le) {
      le.callback = null;
    }, _.unstable_continueExecution = function() {
      V || M || (V = !0, pe(Y));
    }, _.unstable_forceFrameRate = function(le) {
      0 > le || 125 < le ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : se = 0 < le ? Math.floor(1e3 / le) : 5;
    }, _.unstable_getCurrentPriorityLevel = function() {
      return A;
    }, _.unstable_getFirstCallbackNode = function() {
      return s(T);
    }, _.unstable_next = function(le) {
      switch (A) {
        case 1:
        case 2:
        case 3:
          var Te = 3;
          break;
        default:
          Te = A;
      }
      var me = A;
      A = Te;
      try {
        return le();
      } finally {
        A = me;
      }
    }, _.unstable_pauseExecution = function() {
    }, _.unstable_requestPaint = function() {
    }, _.unstable_runWithPriority = function(le, Te) {
      switch (le) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          le = 3;
      }
      var me = A;
      A = le;
      try {
        return Te();
      } finally {
        A = me;
      }
    }, _.unstable_scheduleCallback = function(le, Te, me) {
      var P = _.unstable_now();
      switch (typeof me == "object" && me !== null ? (me = me.delay, me = typeof me == "number" && 0 < me ? P + me : P) : me = P, le) {
        case 1:
          var te = -1;
          break;
        case 2:
          te = 250;
          break;
        case 5:
          te = 1073741823;
          break;
        case 4:
          te = 1e4;
          break;
        default:
          te = 5e3;
      }
      return te = me + te, le = { id: R++, callback: Te, priorityLevel: le, startTime: me, expirationTime: te, sortIndex: -1 }, me > P ? (le.sortIndex = me, l(x, le), s(T) === null && le === s(x) && (L ? (ne(ge), ge = -1) : L = !0, ce(ie, me - P))) : (le.sortIndex = te, l(T, le), V || M || (V = !0, pe(Y))), le;
    }, _.unstable_shouldYield = Ke, _.unstable_wrapCallback = function(le) {
      var Te = A;
      return function() {
        var me = A;
        A = Te;
        try {
          return le.apply(this, arguments);
        } finally {
          A = me;
        }
      };
    };
  }(gE)), gE;
}
var _E = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var px;
function uN() {
  return px || (px = 1, function(_) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var l = !1, s = 5;
      function f(Re, qe) {
        var Et = Re.length;
        Re.push(qe), h(Re, qe, Et);
      }
      function p(Re) {
        return Re.length === 0 ? null : Re[0];
      }
      function y(Re) {
        if (Re.length === 0)
          return null;
        var qe = Re[0], Et = Re.pop();
        return Et !== qe && (Re[0] = Et, E(Re, Et, 0)), qe;
      }
      function h(Re, qe, Et) {
        for (var Wt = Et; Wt > 0; ) {
          var an = Wt - 1 >>> 1, gn = Re[an];
          if (T(gn, qe) > 0)
            Re[an] = qe, Re[Wt] = gn, Wt = an;
          else
            return;
        }
      }
      function E(Re, qe, Et) {
        for (var Wt = Et, an = Re.length, gn = an >>> 1; Wt < gn; ) {
          var cn = (Wt + 1) * 2 - 1, lr = Re[cn], ln = cn + 1, qt = Re[ln];
          if (T(lr, qe) < 0)
            ln < an && T(qt, lr) < 0 ? (Re[Wt] = qt, Re[ln] = qe, Wt = ln) : (Re[Wt] = lr, Re[cn] = qe, Wt = cn);
          else if (ln < an && T(qt, qe) < 0)
            Re[Wt] = qt, Re[ln] = qe, Wt = ln;
          else
            return;
        }
      }
      function T(Re, qe) {
        var Et = Re.sortIndex - qe.sortIndex;
        return Et !== 0 ? Et : Re.id - qe.id;
      }
      var x = 1, R = 2, O = 3, A = 4, M = 5;
      function V(Re, qe) {
      }
      var L = typeof performance == "object" && typeof performance.now == "function";
      if (L) {
        var I = performance;
        _.unstable_now = function() {
          return I.now();
        };
      } else {
        var ne = Date, ee = ne.now();
        _.unstable_now = function() {
          return ne.now() - ee;
        };
      }
      var Q = 1073741823, ie = -1, Y = 250, fe = 5e3, ae = 1e4, ge = Q, se = [], Ie = [], Ke = 1, $e = null, be = O, ut = !1, Ge = !1, pe = !1, ce = typeof setTimeout == "function" ? setTimeout : null, le = typeof clearTimeout == "function" ? clearTimeout : null, Te = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function me(Re) {
        for (var qe = p(Ie); qe !== null; ) {
          if (qe.callback === null)
            y(Ie);
          else if (qe.startTime <= Re)
            y(Ie), qe.sortIndex = qe.expirationTime, f(se, qe);
          else
            return;
          qe = p(Ie);
        }
      }
      function P(Re) {
        if (pe = !1, me(Re), !Ge)
          if (p(se) !== null)
            Ge = !0, jn(te);
          else {
            var qe = p(Ie);
            qe !== null && Or(P, qe.startTime - Re);
          }
      }
      function te(Re, qe) {
        Ge = !1, pe && (pe = !1, Ta()), ut = !0;
        var Et = be;
        try {
          var Wt;
          if (!l) return Fe(Re, qe);
        } finally {
          $e = null, be = Et, ut = !1;
        }
      }
      function Fe(Re, qe) {
        var Et = qe;
        for (me(Et), $e = p(se); $e !== null && !($e.expirationTime > Et && (!Re || Fi())); ) {
          var Wt = $e.callback;
          if (typeof Wt == "function") {
            $e.callback = null, be = $e.priorityLevel;
            var an = $e.expirationTime <= Et, gn = Wt(an);
            Et = _.unstable_now(), typeof gn == "function" ? $e.callback = gn : $e === p(se) && y(se), me(Et);
          } else
            y(se);
          $e = p(se);
        }
        if ($e !== null)
          return !0;
        var cn = p(Ie);
        return cn !== null && Or(P, cn.startTime - Et), !1;
      }
      function xe(Re, qe) {
        switch (Re) {
          case x:
          case R:
          case O:
          case A:
          case M:
            break;
          default:
            Re = O;
        }
        var Et = be;
        be = Re;
        try {
          return qe();
        } finally {
          be = Et;
        }
      }
      function Qe(Re) {
        var qe;
        switch (be) {
          case x:
          case R:
          case O:
            qe = O;
            break;
          default:
            qe = be;
            break;
        }
        var Et = be;
        be = qe;
        try {
          return Re();
        } finally {
          be = Et;
        }
      }
      function it(Re) {
        var qe = be;
        return function() {
          var Et = be;
          be = qe;
          try {
            return Re.apply(this, arguments);
          } finally {
            be = Et;
          }
        };
      }
      function rt(Re, qe, Et) {
        var Wt = _.unstable_now(), an;
        if (typeof Et == "object" && Et !== null) {
          var gn = Et.delay;
          typeof gn == "number" && gn > 0 ? an = Wt + gn : an = Wt;
        } else
          an = Wt;
        var cn;
        switch (Re) {
          case x:
            cn = ie;
            break;
          case R:
            cn = Y;
            break;
          case M:
            cn = ge;
            break;
          case A:
            cn = ae;
            break;
          case O:
          default:
            cn = fe;
            break;
        }
        var lr = an + cn, ln = {
          id: Ke++,
          callback: qe,
          priorityLevel: Re,
          startTime: an,
          expirationTime: lr,
          sortIndex: -1
        };
        return an > Wt ? (ln.sortIndex = an, f(Ie, ln), p(se) === null && ln === p(Ie) && (pe ? Ta() : pe = !0, Or(P, an - Wt))) : (ln.sortIndex = lr, f(se, ln), !Ge && !ut && (Ge = !0, jn(te))), ln;
      }
      function ct() {
      }
      function wt() {
        !Ge && !ut && (Ge = !0, jn(te));
      }
      function Qt() {
        return p(se);
      }
      function Pn(Re) {
        Re.callback = null;
      }
      function Fr() {
        return be;
      }
      var bn = !1, pr = null, Xn = -1, Kn = s, ra = -1;
      function Fi() {
        var Re = _.unstable_now() - ra;
        return !(Re < Kn);
      }
      function wa() {
      }
      function ir(Re) {
        if (Re < 0 || Re > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        Re > 0 ? Kn = Math.floor(1e3 / Re) : Kn = s;
      }
      var Rn = function() {
        if (pr !== null) {
          var Re = _.unstable_now();
          ra = Re;
          var qe = !0, Et = !0;
          try {
            Et = pr(qe, Re);
          } finally {
            Et ? Jn() : (bn = !1, pr = null);
          }
        } else
          bn = !1;
      }, Jn;
      if (typeof Te == "function")
        Jn = function() {
          Te(Rn);
        };
      else if (typeof MessageChannel < "u") {
        var Dr = new MessageChannel(), fi = Dr.port2;
        Dr.port1.onmessage = Rn, Jn = function() {
          fi.postMessage(null);
        };
      } else
        Jn = function() {
          ce(Rn, 0);
        };
      function jn(Re) {
        pr = Re, bn || (bn = !0, Jn());
      }
      function Or(Re, qe) {
        Xn = ce(function() {
          Re(_.unstable_now());
        }, qe);
      }
      function Ta() {
        le(Xn), Xn = -1;
      }
      var di = wa, Pi = null;
      _.unstable_IdlePriority = M, _.unstable_ImmediatePriority = x, _.unstable_LowPriority = A, _.unstable_NormalPriority = O, _.unstable_Profiling = Pi, _.unstable_UserBlockingPriority = R, _.unstable_cancelCallback = Pn, _.unstable_continueExecution = wt, _.unstable_forceFrameRate = ir, _.unstable_getCurrentPriorityLevel = Fr, _.unstable_getFirstCallbackNode = Qt, _.unstable_next = Qe, _.unstable_pauseExecution = ct, _.unstable_requestPaint = di, _.unstable_runWithPriority = xe, _.unstable_scheduleCallback = rt, _.unstable_shouldYield = Fi, _.unstable_wrapCallback = it, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(_E)), _E;
}
var hx;
function Wx() {
  return hx || (hx = 1, process.env.NODE_ENV === "production" ? Lg.exports = oN() : Lg.exports = uN()), Lg.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vx;
function sN() {
  if (vx) return ai;
  vx = 1;
  var _ = Pv(), l = Wx();
  function s(n) {
    for (var r = "https://reactjs.org/docs/error-decoder.html?invariant=" + n, o = 1; o < arguments.length; o++) r += "&args[]=" + encodeURIComponent(arguments[o]);
    return "Minified React error #" + n + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var f = /* @__PURE__ */ new Set(), p = {};
  function y(n, r) {
    h(n, r), h(n + "Capture", r);
  }
  function h(n, r) {
    for (p[n] = r, n = 0; n < r.length; n++) f.add(r[n]);
  }
  var E = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), T = Object.prototype.hasOwnProperty, x = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, R = {}, O = {};
  function A(n) {
    return T.call(O, n) ? !0 : T.call(R, n) ? !1 : x.test(n) ? O[n] = !0 : (R[n] = !0, !1);
  }
  function M(n, r, o, c) {
    if (o !== null && o.type === 0) return !1;
    switch (typeof r) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return c ? !1 : o !== null ? !o.acceptsBooleans : (n = n.toLowerCase().slice(0, 5), n !== "data-" && n !== "aria-");
      default:
        return !1;
    }
  }
  function V(n, r, o, c) {
    if (r === null || typeof r > "u" || M(n, r, o, c)) return !0;
    if (c) return !1;
    if (o !== null) switch (o.type) {
      case 3:
        return !r;
      case 4:
        return r === !1;
      case 5:
        return isNaN(r);
      case 6:
        return isNaN(r) || 1 > r;
    }
    return !1;
  }
  function L(n, r, o, c, v, g, b) {
    this.acceptsBooleans = r === 2 || r === 3 || r === 4, this.attributeName = c, this.attributeNamespace = v, this.mustUseProperty = o, this.propertyName = n, this.type = r, this.sanitizeURL = g, this.removeEmptyString = b;
  }
  var I = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n) {
    I[n] = new L(n, 0, !1, n, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
    var r = n[0];
    I[r] = new L(r, 1, !1, n[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
    I[n] = new L(n, 2, !1, n.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
    I[n] = new L(n, 2, !1, n, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n) {
    I[n] = new L(n, 3, !1, n.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(n) {
    I[n] = new L(n, 3, !0, n, null, !1, !1);
  }), ["capture", "download"].forEach(function(n) {
    I[n] = new L(n, 4, !1, n, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(n) {
    I[n] = new L(n, 6, !1, n, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(n) {
    I[n] = new L(n, 5, !1, n.toLowerCase(), null, !1, !1);
  });
  var ne = /[\-:]([a-z])/g;
  function ee(n) {
    return n[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n) {
    var r = n.replace(
      ne,
      ee
    );
    I[r] = new L(r, 1, !1, n, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n) {
    var r = n.replace(ne, ee);
    I[r] = new L(r, 1, !1, n, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(n) {
    var r = n.replace(ne, ee);
    I[r] = new L(r, 1, !1, n, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(n) {
    I[n] = new L(n, 1, !1, n.toLowerCase(), null, !1, !1);
  }), I.xlinkHref = new L("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(n) {
    I[n] = new L(n, 1, !1, n.toLowerCase(), null, !0, !0);
  });
  function Q(n, r, o, c) {
    var v = I.hasOwnProperty(r) ? I[r] : null;
    (v !== null ? v.type !== 0 : c || !(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (V(r, o, v, c) && (o = null), c || v === null ? A(r) && (o === null ? n.removeAttribute(r) : n.setAttribute(r, "" + o)) : v.mustUseProperty ? n[v.propertyName] = o === null ? v.type === 3 ? !1 : "" : o : (r = v.attributeName, c = v.attributeNamespace, o === null ? n.removeAttribute(r) : (v = v.type, o = v === 3 || v === 4 && o === !0 ? "" : "" + o, c ? n.setAttributeNS(c, r, o) : n.setAttribute(r, o))));
  }
  var ie = _.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Y = Symbol.for("react.element"), fe = Symbol.for("react.portal"), ae = Symbol.for("react.fragment"), ge = Symbol.for("react.strict_mode"), se = Symbol.for("react.profiler"), Ie = Symbol.for("react.provider"), Ke = Symbol.for("react.context"), $e = Symbol.for("react.forward_ref"), be = Symbol.for("react.suspense"), ut = Symbol.for("react.suspense_list"), Ge = Symbol.for("react.memo"), pe = Symbol.for("react.lazy"), ce = Symbol.for("react.offscreen"), le = Symbol.iterator;
  function Te(n) {
    return n === null || typeof n != "object" ? null : (n = le && n[le] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var me = Object.assign, P;
  function te(n) {
    if (P === void 0) try {
      throw Error();
    } catch (o) {
      var r = o.stack.trim().match(/\n( *(at )?)/);
      P = r && r[1] || "";
    }
    return `
` + P + n;
  }
  var Fe = !1;
  function xe(n, r) {
    if (!n || Fe) return "";
    Fe = !0;
    var o = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (r) if (r = function() {
        throw Error();
      }, Object.defineProperty(r.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(r, []);
        } catch (J) {
          var c = J;
        }
        Reflect.construct(n, [], r);
      } else {
        try {
          r.call();
        } catch (J) {
          c = J;
        }
        n.call(r.prototype);
      }
      else {
        try {
          throw Error();
        } catch (J) {
          c = J;
        }
        n();
      }
    } catch (J) {
      if (J && c && typeof J.stack == "string") {
        for (var v = J.stack.split(`
`), g = c.stack.split(`
`), b = v.length - 1, N = g.length - 1; 1 <= b && 0 <= N && v[b] !== g[N]; ) N--;
        for (; 1 <= b && 0 <= N; b--, N--) if (v[b] !== g[N]) {
          if (b !== 1 || N !== 1)
            do
              if (b--, N--, 0 > N || v[b] !== g[N]) {
                var F = `
` + v[b].replace(" at new ", " at ");
                return n.displayName && F.includes("<anonymous>") && (F = F.replace("<anonymous>", n.displayName)), F;
              }
            while (1 <= b && 0 <= N);
          break;
        }
      }
    } finally {
      Fe = !1, Error.prepareStackTrace = o;
    }
    return (n = n ? n.displayName || n.name : "") ? te(n) : "";
  }
  function Qe(n) {
    switch (n.tag) {
      case 5:
        return te(n.type);
      case 16:
        return te("Lazy");
      case 13:
        return te("Suspense");
      case 19:
        return te("SuspenseList");
      case 0:
      case 2:
      case 15:
        return n = xe(n.type, !1), n;
      case 11:
        return n = xe(n.type.render, !1), n;
      case 1:
        return n = xe(n.type, !0), n;
      default:
        return "";
    }
  }
  function it(n) {
    if (n == null) return null;
    if (typeof n == "function") return n.displayName || n.name || null;
    if (typeof n == "string") return n;
    switch (n) {
      case ae:
        return "Fragment";
      case fe:
        return "Portal";
      case se:
        return "Profiler";
      case ge:
        return "StrictMode";
      case be:
        return "Suspense";
      case ut:
        return "SuspenseList";
    }
    if (typeof n == "object") switch (n.$$typeof) {
      case Ke:
        return (n.displayName || "Context") + ".Consumer";
      case Ie:
        return (n._context.displayName || "Context") + ".Provider";
      case $e:
        var r = n.render;
        return n = n.displayName, n || (n = r.displayName || r.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
      case Ge:
        return r = n.displayName || null, r !== null ? r : it(n.type) || "Memo";
      case pe:
        r = n._payload, n = n._init;
        try {
          return it(n(r));
        } catch {
        }
    }
    return null;
  }
  function rt(n) {
    var r = n.type;
    switch (n.tag) {
      case 24:
        return "Cache";
      case 9:
        return (r.displayName || "Context") + ".Consumer";
      case 10:
        return (r._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return n = r.render, n = n.displayName || n.name || "", r.displayName || (n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return r;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return it(r);
      case 8:
        return r === ge ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof r == "function") return r.displayName || r.name || null;
        if (typeof r == "string") return r;
    }
    return null;
  }
  function ct(n) {
    switch (typeof n) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return n;
      case "object":
        return n;
      default:
        return "";
    }
  }
  function wt(n) {
    var r = n.type;
    return (n = n.nodeName) && n.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
  }
  function Qt(n) {
    var r = wt(n) ? "checked" : "value", o = Object.getOwnPropertyDescriptor(n.constructor.prototype, r), c = "" + n[r];
    if (!n.hasOwnProperty(r) && typeof o < "u" && typeof o.get == "function" && typeof o.set == "function") {
      var v = o.get, g = o.set;
      return Object.defineProperty(n, r, { configurable: !0, get: function() {
        return v.call(this);
      }, set: function(b) {
        c = "" + b, g.call(this, b);
      } }), Object.defineProperty(n, r, { enumerable: o.enumerable }), { getValue: function() {
        return c;
      }, setValue: function(b) {
        c = "" + b;
      }, stopTracking: function() {
        n._valueTracker = null, delete n[r];
      } };
    }
  }
  function Pn(n) {
    n._valueTracker || (n._valueTracker = Qt(n));
  }
  function Fr(n) {
    if (!n) return !1;
    var r = n._valueTracker;
    if (!r) return !0;
    var o = r.getValue(), c = "";
    return n && (c = wt(n) ? n.checked ? "true" : "false" : n.value), n = c, n !== o ? (r.setValue(n), !0) : !1;
  }
  function bn(n) {
    if (n = n || (typeof document < "u" ? document : void 0), typeof n > "u") return null;
    try {
      return n.activeElement || n.body;
    } catch {
      return n.body;
    }
  }
  function pr(n, r) {
    var o = r.checked;
    return me({}, r, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: o ?? n._wrapperState.initialChecked });
  }
  function Xn(n, r) {
    var o = r.defaultValue == null ? "" : r.defaultValue, c = r.checked != null ? r.checked : r.defaultChecked;
    o = ct(r.value != null ? r.value : o), n._wrapperState = { initialChecked: c, initialValue: o, controlled: r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null };
  }
  function Kn(n, r) {
    r = r.checked, r != null && Q(n, "checked", r, !1);
  }
  function ra(n, r) {
    Kn(n, r);
    var o = ct(r.value), c = r.type;
    if (o != null) c === "number" ? (o === 0 && n.value === "" || n.value != o) && (n.value = "" + o) : n.value !== "" + o && (n.value = "" + o);
    else if (c === "submit" || c === "reset") {
      n.removeAttribute("value");
      return;
    }
    r.hasOwnProperty("value") ? wa(n, r.type, o) : r.hasOwnProperty("defaultValue") && wa(n, r.type, ct(r.defaultValue)), r.checked == null && r.defaultChecked != null && (n.defaultChecked = !!r.defaultChecked);
  }
  function Fi(n, r, o) {
    if (r.hasOwnProperty("value") || r.hasOwnProperty("defaultValue")) {
      var c = r.type;
      if (!(c !== "submit" && c !== "reset" || r.value !== void 0 && r.value !== null)) return;
      r = "" + n._wrapperState.initialValue, o || r === n.value || (n.value = r), n.defaultValue = r;
    }
    o = n.name, o !== "" && (n.name = ""), n.defaultChecked = !!n._wrapperState.initialChecked, o !== "" && (n.name = o);
  }
  function wa(n, r, o) {
    (r !== "number" || bn(n.ownerDocument) !== n) && (o == null ? n.defaultValue = "" + n._wrapperState.initialValue : n.defaultValue !== "" + o && (n.defaultValue = "" + o));
  }
  var ir = Array.isArray;
  function Rn(n, r, o, c) {
    if (n = n.options, r) {
      r = {};
      for (var v = 0; v < o.length; v++) r["$" + o[v]] = !0;
      for (o = 0; o < n.length; o++) v = r.hasOwnProperty("$" + n[o].value), n[o].selected !== v && (n[o].selected = v), v && c && (n[o].defaultSelected = !0);
    } else {
      for (o = "" + ct(o), r = null, v = 0; v < n.length; v++) {
        if (n[v].value === o) {
          n[v].selected = !0, c && (n[v].defaultSelected = !0);
          return;
        }
        r !== null || n[v].disabled || (r = n[v]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function Jn(n, r) {
    if (r.dangerouslySetInnerHTML != null) throw Error(s(91));
    return me({}, r, { value: void 0, defaultValue: void 0, children: "" + n._wrapperState.initialValue });
  }
  function Dr(n, r) {
    var o = r.value;
    if (o == null) {
      if (o = r.children, r = r.defaultValue, o != null) {
        if (r != null) throw Error(s(92));
        if (ir(o)) {
          if (1 < o.length) throw Error(s(93));
          o = o[0];
        }
        r = o;
      }
      r == null && (r = ""), o = r;
    }
    n._wrapperState = { initialValue: ct(o) };
  }
  function fi(n, r) {
    var o = ct(r.value), c = ct(r.defaultValue);
    o != null && (o = "" + o, o !== n.value && (n.value = o), r.defaultValue == null && n.defaultValue !== o && (n.defaultValue = o)), c != null && (n.defaultValue = "" + c);
  }
  function jn(n) {
    var r = n.textContent;
    r === n._wrapperState.initialValue && r !== "" && r !== null && (n.value = r);
  }
  function Or(n) {
    switch (n) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Ta(n, r) {
    return n == null || n === "http://www.w3.org/1999/xhtml" ? Or(r) : n === "http://www.w3.org/2000/svg" && r === "foreignObject" ? "http://www.w3.org/1999/xhtml" : n;
  }
  var di, Pi = function(n) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(r, o, c, v) {
      MSApp.execUnsafeLocalFunction(function() {
        return n(r, o, c, v);
      });
    } : n;
  }(function(n, r) {
    if (n.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in n) n.innerHTML = r;
    else {
      for (di = di || document.createElement("div"), di.innerHTML = "<svg>" + r.valueOf().toString() + "</svg>", r = di.firstChild; n.firstChild; ) n.removeChild(n.firstChild);
      for (; r.firstChild; ) n.appendChild(r.firstChild);
    }
  });
  function Re(n, r) {
    if (r) {
      var o = n.firstChild;
      if (o && o === n.lastChild && o.nodeType === 3) {
        o.nodeValue = r;
        return;
      }
    }
    n.textContent = r;
  }
  var qe = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, Et = ["Webkit", "ms", "Moz", "O"];
  Object.keys(qe).forEach(function(n) {
    Et.forEach(function(r) {
      r = r + n.charAt(0).toUpperCase() + n.substring(1), qe[r] = qe[n];
    });
  });
  function Wt(n, r, o) {
    return r == null || typeof r == "boolean" || r === "" ? "" : o || typeof r != "number" || r === 0 || qe.hasOwnProperty(n) && qe[n] ? ("" + r).trim() : r + "px";
  }
  function an(n, r) {
    n = n.style;
    for (var o in r) if (r.hasOwnProperty(o)) {
      var c = o.indexOf("--") === 0, v = Wt(o, r[o], c);
      o === "float" && (o = "cssFloat"), c ? n.setProperty(o, v) : n[o] = v;
    }
  }
  var gn = me({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function cn(n, r) {
    if (r) {
      if (gn[n] && (r.children != null || r.dangerouslySetInnerHTML != null)) throw Error(s(137, n));
      if (r.dangerouslySetInnerHTML != null) {
        if (r.children != null) throw Error(s(60));
        if (typeof r.dangerouslySetInnerHTML != "object" || !("__html" in r.dangerouslySetInnerHTML)) throw Error(s(61));
      }
      if (r.style != null && typeof r.style != "object") throw Error(s(62));
    }
  }
  function lr(n, r) {
    if (n.indexOf("-") === -1) return typeof r.is == "string";
    switch (n) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var ln = null;
  function qt(n) {
    return n = n.target || n.srcElement || window, n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === 3 ? n.parentNode : n;
  }
  var Xt = null, xa = null, Mr = null;
  function ja(n) {
    if (n = Ze(n)) {
      if (typeof Xt != "function") throw Error(s(280));
      var r = n.stateNode;
      r && (r = Sn(r), Xt(n.stateNode, n.type, r));
    }
  }
  function ml(n) {
    xa ? Mr ? Mr.push(n) : Mr = [n] : xa = n;
  }
  function Uo() {
    if (xa) {
      var n = xa, r = Mr;
      if (Mr = xa = null, ja(n), r) for (n = 0; n < r.length; n++) ja(r[n]);
    }
  }
  function Fo(n, r) {
    return n(r);
  }
  function Wl() {
  }
  var $l = !1;
  function Po(n, r, o) {
    if ($l) return n(r, o);
    $l = !0;
    try {
      return Fo(n, r, o);
    } finally {
      $l = !1, (xa !== null || Mr !== null) && (Wl(), Uo());
    }
  }
  function Pr(n, r) {
    var o = n.stateNode;
    if (o === null) return null;
    var c = Sn(o);
    if (c === null) return null;
    o = c[r];
    e: switch (r) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (c = !c.disabled) || (n = n.type, c = !(n === "button" || n === "input" || n === "select" || n === "textarea")), n = !c;
        break e;
      default:
        n = !1;
    }
    if (n) return null;
    if (o && typeof o != "function") throw Error(s(231, r, typeof o));
    return o;
  }
  var jr = !1;
  if (E) try {
    var hr = {};
    Object.defineProperty(hr, "passive", { get: function() {
      jr = !0;
    } }), window.addEventListener("test", hr, hr), window.removeEventListener("test", hr, hr);
  } catch {
    jr = !1;
  }
  function ji(n, r, o, c, v, g, b, N, F) {
    var J = Array.prototype.slice.call(arguments, 3);
    try {
      r.apply(o, J);
    } catch (_e) {
      this.onError(_e);
    }
  }
  var pi = !1, Hi = null, Bi = !1, U = null, he = { onError: function(n) {
    pi = !0, Hi = n;
  } };
  function Oe(n, r, o, c, v, g, b, N, F) {
    pi = !1, Hi = null, ji.apply(he, arguments);
  }
  function je(n, r, o, c, v, g, b, N, F) {
    if (Oe.apply(this, arguments), pi) {
      if (pi) {
        var J = Hi;
        pi = !1, Hi = null;
      } else throw Error(s(198));
      Bi || (Bi = !0, U = J);
    }
  }
  function yt(n) {
    var r = n, o = n;
    if (n.alternate) for (; r.return; ) r = r.return;
    else {
      n = r;
      do
        r = n, r.flags & 4098 && (o = r.return), n = r.return;
      while (n);
    }
    return r.tag === 3 ? o : null;
  }
  function ht(n) {
    if (n.tag === 13) {
      var r = n.memoizedState;
      if (r === null && (n = n.alternate, n !== null && (r = n.memoizedState)), r !== null) return r.dehydrated;
    }
    return null;
  }
  function bt(n) {
    if (yt(n) !== n) throw Error(s(188));
  }
  function Tt(n) {
    var r = n.alternate;
    if (!r) {
      if (r = yt(n), r === null) throw Error(s(188));
      return r !== n ? null : n;
    }
    for (var o = n, c = r; ; ) {
      var v = o.return;
      if (v === null) break;
      var g = v.alternate;
      if (g === null) {
        if (c = v.return, c !== null) {
          o = c;
          continue;
        }
        break;
      }
      if (v.child === g.child) {
        for (g = v.child; g; ) {
          if (g === o) return bt(v), n;
          if (g === c) return bt(v), r;
          g = g.sibling;
        }
        throw Error(s(188));
      }
      if (o.return !== c.return) o = v, c = g;
      else {
        for (var b = !1, N = v.child; N; ) {
          if (N === o) {
            b = !0, o = v, c = g;
            break;
          }
          if (N === c) {
            b = !0, c = v, o = g;
            break;
          }
          N = N.sibling;
        }
        if (!b) {
          for (N = g.child; N; ) {
            if (N === o) {
              b = !0, o = g, c = v;
              break;
            }
            if (N === c) {
              b = !0, c = g, o = v;
              break;
            }
            N = N.sibling;
          }
          if (!b) throw Error(s(189));
        }
      }
      if (o.alternate !== c) throw Error(s(190));
    }
    if (o.tag !== 3) throw Error(s(188));
    return o.stateNode.current === o ? n : r;
  }
  function kn(n) {
    return n = Tt(n), n !== null ? on(n) : null;
  }
  function on(n) {
    if (n.tag === 5 || n.tag === 6) return n;
    for (n = n.child; n !== null; ) {
      var r = on(n);
      if (r !== null) return r;
      n = n.sibling;
    }
    return null;
  }
  var fn = l.unstable_scheduleCallback, vr = l.unstable_cancelCallback, hi = l.unstable_shouldYield, vi = l.unstable_requestPaint, gt = l.unstable_now, St = l.unstable_getCurrentPriorityLevel, mi = l.unstable_ImmediatePriority, jo = l.unstable_UserBlockingPriority, Ho = l.unstable_NormalPriority, Gl = l.unstable_LowPriority, Au = l.unstable_IdlePriority, Ql = null, aa = null;
  function Vs(n) {
    if (aa && typeof aa.onCommitFiberRoot == "function") try {
      aa.onCommitFiberRoot(Ql, n, void 0, (n.current.flags & 128) === 128);
    } catch {
    }
  }
  var Hr = Math.clz32 ? Math.clz32 : zu, mf = Math.log, yf = Math.LN2;
  function zu(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (mf(n) / yf | 0) | 0;
  }
  var ql = 64, ba = 4194304;
  function yi(n) {
    switch (n & -n) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return n & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return n;
    }
  }
  function gi(n, r) {
    var o = n.pendingLanes;
    if (o === 0) return 0;
    var c = 0, v = n.suspendedLanes, g = n.pingedLanes, b = o & 268435455;
    if (b !== 0) {
      var N = b & ~v;
      N !== 0 ? c = yi(N) : (g &= b, g !== 0 && (c = yi(g)));
    } else b = o & ~v, b !== 0 ? c = yi(b) : g !== 0 && (c = yi(g));
    if (c === 0) return 0;
    if (r !== 0 && r !== c && !(r & v) && (v = c & -c, g = r & -r, v >= g || v === 16 && (g & 4194240) !== 0)) return r;
    if (c & 4 && (c |= o & 16), r = n.entangledLanes, r !== 0) for (n = n.entanglements, r &= c; 0 < r; ) o = 31 - Hr(r), v = 1 << o, c |= n[o], r &= ~v;
    return c;
  }
  function Uu(n, r) {
    switch (n) {
      case 1:
      case 2:
      case 4:
        return r + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return r + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Bo(n, r) {
    for (var o = n.suspendedLanes, c = n.pingedLanes, v = n.expirationTimes, g = n.pendingLanes; 0 < g; ) {
      var b = 31 - Hr(g), N = 1 << b, F = v[b];
      F === -1 ? (!(N & o) || N & c) && (v[b] = Uu(N, r)) : F <= r && (n.expiredLanes |= N), g &= ~N;
    }
  }
  function Xl(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function Fu() {
    var n = ql;
    return ql <<= 1, !(ql & 4194240) && (ql = 64), n;
  }
  function Pu(n) {
    for (var r = [], o = 0; 31 > o; o++) r.push(n);
    return r;
  }
  function yl(n, r, o) {
    n.pendingLanes |= r, r !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, r = 31 - Hr(r), n[r] = o;
  }
  function vp(n, r) {
    var o = n.pendingLanes & ~r;
    n.pendingLanes = r, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= r, n.mutableReadLanes &= r, n.entangledLanes &= r, r = n.entanglements;
    var c = n.eventTimes;
    for (n = n.expirationTimes; 0 < o; ) {
      var v = 31 - Hr(o), g = 1 << v;
      r[v] = 0, c[v] = -1, n[v] = -1, o &= ~g;
    }
  }
  function gl(n, r) {
    var o = n.entangledLanes |= r;
    for (n = n.entanglements; o; ) {
      var c = 31 - Hr(o), v = 1 << c;
      v & r | n[c] & r && (n[c] |= r), o &= ~v;
    }
  }
  var Pt = 0;
  function ju(n) {
    return n &= -n, 1 < n ? 4 < n ? n & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var At, Is, Vi, pt, Hu, mr = !1, Ii = [], Br = null, Yi = null, dn = null, Kt = /* @__PURE__ */ new Map(), Kl = /* @__PURE__ */ new Map(), Zn = [], Vr = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Ha(n, r) {
    switch (n) {
      case "focusin":
      case "focusout":
        Br = null;
        break;
      case "dragenter":
      case "dragleave":
        Yi = null;
        break;
      case "mouseover":
      case "mouseout":
        dn = null;
        break;
      case "pointerover":
      case "pointerout":
        Kt.delete(r.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Kl.delete(r.pointerId);
    }
  }
  function Vo(n, r, o, c, v, g) {
    return n === null || n.nativeEvent !== g ? (n = { blockedOn: r, domEventName: o, eventSystemFlags: c, nativeEvent: g, targetContainers: [v] }, r !== null && (r = Ze(r), r !== null && Is(r)), n) : (n.eventSystemFlags |= c, r = n.targetContainers, v !== null && r.indexOf(v) === -1 && r.push(v), n);
  }
  function Ys(n, r, o, c, v) {
    switch (r) {
      case "focusin":
        return Br = Vo(Br, n, r, o, c, v), !0;
      case "dragenter":
        return Yi = Vo(Yi, n, r, o, c, v), !0;
      case "mouseover":
        return dn = Vo(dn, n, r, o, c, v), !0;
      case "pointerover":
        var g = v.pointerId;
        return Kt.set(g, Vo(Kt.get(g) || null, n, r, o, c, v)), !0;
      case "gotpointercapture":
        return g = v.pointerId, Kl.set(g, Vo(Kl.get(g) || null, n, r, o, c, v)), !0;
    }
    return !1;
  }
  function Ws(n) {
    var r = Ko(n.target);
    if (r !== null) {
      var o = yt(r);
      if (o !== null) {
        if (r = o.tag, r === 13) {
          if (r = ht(o), r !== null) {
            n.blockedOn = r, Hu(n.priority, function() {
              Vi(o);
            });
            return;
          }
        } else if (r === 3 && o.stateNode.current.memoizedState.isDehydrated) {
          n.blockedOn = o.tag === 3 ? o.stateNode.containerInfo : null;
          return;
        }
      }
    }
    n.blockedOn = null;
  }
  function Jl(n) {
    if (n.blockedOn !== null) return !1;
    for (var r = n.targetContainers; 0 < r.length; ) {
      var o = Iu(n.domEventName, n.eventSystemFlags, r[0], n.nativeEvent);
      if (o === null) {
        o = n.nativeEvent;
        var c = new o.constructor(o.type, o);
        ln = c, o.target.dispatchEvent(c), ln = null;
      } else return r = Ze(o), r !== null && Is(r), n.blockedOn = o, !1;
      r.shift();
    }
    return !0;
  }
  function Io(n, r, o) {
    Jl(n) && o.delete(r);
  }
  function mp() {
    mr = !1, Br !== null && Jl(Br) && (Br = null), Yi !== null && Jl(Yi) && (Yi = null), dn !== null && Jl(dn) && (dn = null), Kt.forEach(Io), Kl.forEach(Io);
  }
  function Ba(n, r) {
    n.blockedOn === r && (n.blockedOn = null, mr || (mr = !0, l.unstable_scheduleCallback(l.unstable_NormalPriority, mp)));
  }
  function _i(n) {
    function r(v) {
      return Ba(v, n);
    }
    if (0 < Ii.length) {
      Ba(Ii[0], n);
      for (var o = 1; o < Ii.length; o++) {
        var c = Ii[o];
        c.blockedOn === n && (c.blockedOn = null);
      }
    }
    for (Br !== null && Ba(Br, n), Yi !== null && Ba(Yi, n), dn !== null && Ba(dn, n), Kt.forEach(r), Kl.forEach(r), o = 0; o < Zn.length; o++) c = Zn[o], c.blockedOn === n && (c.blockedOn = null);
    for (; 0 < Zn.length && (o = Zn[0], o.blockedOn === null); ) Ws(o), o.blockedOn === null && Zn.shift();
  }
  var Wi = ie.ReactCurrentBatchConfig, Va = !0;
  function Bu(n, r, o, c) {
    var v = Pt, g = Wi.transition;
    Wi.transition = null;
    try {
      Pt = 1, Zl(n, r, o, c);
    } finally {
      Pt = v, Wi.transition = g;
    }
  }
  function Vu(n, r, o, c) {
    var v = Pt, g = Wi.transition;
    Wi.transition = null;
    try {
      Pt = 4, Zl(n, r, o, c);
    } finally {
      Pt = v, Wi.transition = g;
    }
  }
  function Zl(n, r, o, c) {
    if (Va) {
      var v = Iu(n, r, o, c);
      if (v === null) Df(n, r, c, Yo, o), Ha(n, c);
      else if (Ys(v, n, r, o, c)) c.stopPropagation();
      else if (Ha(n, c), r & 4 && -1 < Vr.indexOf(n)) {
        for (; v !== null; ) {
          var g = Ze(v);
          if (g !== null && At(g), g = Iu(n, r, o, c), g === null && Df(n, r, c, Yo, o), g === v) break;
          v = g;
        }
        v !== null && c.stopPropagation();
      } else Df(n, r, c, null, o);
    }
  }
  var Yo = null;
  function Iu(n, r, o, c) {
    if (Yo = null, n = qt(c), n = Ko(n), n !== null) if (r = yt(n), r === null) n = null;
    else if (o = r.tag, o === 13) {
      if (n = ht(r), n !== null) return n;
      n = null;
    } else if (o === 3) {
      if (r.stateNode.current.memoizedState.isDehydrated) return r.tag === 3 ? r.stateNode.containerInfo : null;
      n = null;
    } else r !== n && (n = null);
    return Yo = n, null;
  }
  function Yu(n) {
    switch (n) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (St()) {
          case mi:
            return 1;
          case jo:
            return 4;
          case Ho:
          case Gl:
            return 16;
          case Au:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Si = null, w = null, z = null;
  function K() {
    if (z) return z;
    var n, r = w, o = r.length, c, v = "value" in Si ? Si.value : Si.textContent, g = v.length;
    for (n = 0; n < o && r[n] === v[n]; n++) ;
    var b = o - n;
    for (c = 1; c <= b && r[o - c] === v[g - c]; c++) ;
    return z = v.slice(n, 1 < c ? 1 - c : void 0);
  }
  function re(n) {
    var r = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && r === 13 && (n = 13)) : n = r, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function we() {
    return !0;
  }
  function tt() {
    return !1;
  }
  function De(n) {
    function r(o, c, v, g, b) {
      this._reactName = o, this._targetInst = v, this.type = c, this.nativeEvent = g, this.target = b, this.currentTarget = null;
      for (var N in n) n.hasOwnProperty(N) && (o = n[N], this[N] = o ? o(g) : g[N]);
      return this.isDefaultPrevented = (g.defaultPrevented != null ? g.defaultPrevented : g.returnValue === !1) ? we : tt, this.isPropagationStopped = tt, this;
    }
    return me(r.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var o = this.nativeEvent;
      o && (o.preventDefault ? o.preventDefault() : typeof o.returnValue != "unknown" && (o.returnValue = !1), this.isDefaultPrevented = we);
    }, stopPropagation: function() {
      var o = this.nativeEvent;
      o && (o.stopPropagation ? o.stopPropagation() : typeof o.cancelBubble != "unknown" && (o.cancelBubble = !0), this.isPropagationStopped = we);
    }, persist: function() {
    }, isPersistent: we }), r;
  }
  var lt = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(n) {
    return n.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Rt = De(lt), zt = me({}, lt, { view: 0, detail: 0 }), un = De(zt), Jt, Ct, Zt, _n = me({}, zt, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Ep, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== Zt && (Zt && n.type === "mousemove" ? (Jt = n.screenX - Zt.screenX, Ct = n.screenY - Zt.screenY) : Ct = Jt = 0, Zt = n), Jt);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : Ct;
  } }), eo = De(_n), $s = me({}, _n, { dataTransfer: 0 }), _l = De($s), Gs = me({}, zt, { relatedTarget: 0 }), Wo = De(Gs), yp = me({}, lt, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), gf = De(yp), gp = me({}, lt, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), Hv = De(gp), _p = me({}, lt, { data: 0 }), Sp = De(_p), Bv = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Vv = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, t0 = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Sl(n) {
    var r = this.nativeEvent;
    return r.getModifierState ? r.getModifierState(n) : (n = t0[n]) ? !!r[n] : !1;
  }
  function Ep() {
    return Sl;
  }
  var Cp = me({}, zt, { key: function(n) {
    if (n.key) {
      var r = Bv[n.key] || n.key;
      if (r !== "Unidentified") return r;
    }
    return n.type === "keypress" ? (n = re(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? Vv[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Ep, charCode: function(n) {
    return n.type === "keypress" ? re(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? re(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), wp = De(Cp), Tp = me({}, _n, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Iv = De(Tp), _f = me({}, zt, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Ep }), Yv = De(_f), ia = me({}, lt, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), El = De(ia), Hn = me({}, _n, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Cl = De(Hn), xp = [9, 13, 27, 32], Wu = E && "CompositionEvent" in window, Qs = null;
  E && "documentMode" in document && (Qs = document.documentMode);
  var qs = E && "TextEvent" in window && !Qs, Wv = E && (!Wu || Qs && 8 < Qs && 11 >= Qs), $v = " ", Sf = !1;
  function Gv(n, r) {
    switch (n) {
      case "keyup":
        return xp.indexOf(r.keyCode) !== -1;
      case "keydown":
        return r.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Qv(n) {
    return n = n.detail, typeof n == "object" && "data" in n ? n.data : null;
  }
  var $u = !1;
  function qv(n, r) {
    switch (n) {
      case "compositionend":
        return Qv(r);
      case "keypress":
        return r.which !== 32 ? null : (Sf = !0, $v);
      case "textInput":
        return n = r.data, n === $v && Sf ? null : n;
      default:
        return null;
    }
  }
  function n0(n, r) {
    if ($u) return n === "compositionend" || !Wu && Gv(n, r) ? (n = K(), z = w = Si = null, $u = !1, n) : null;
    switch (n) {
      case "paste":
        return null;
      case "keypress":
        if (!(r.ctrlKey || r.altKey || r.metaKey) || r.ctrlKey && r.altKey) {
          if (r.char && 1 < r.char.length) return r.char;
          if (r.which) return String.fromCharCode(r.which);
        }
        return null;
      case "compositionend":
        return Wv && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var r0 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Xv(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r === "input" ? !!r0[n.type] : r === "textarea";
  }
  function bp(n, r, o, c) {
    ml(c), r = tc(r, "onChange"), 0 < r.length && (o = new Rt("onChange", "change", null, o, c), n.push({ event: o, listeners: r }));
  }
  var $i = null, $o = null;
  function Kv(n) {
    qo(n, 0);
  }
  function Xs(n) {
    var r = Ci(n);
    if (Fr(r)) return n;
  }
  function a0(n, r) {
    if (n === "change") return r;
  }
  var Jv = !1;
  if (E) {
    var Rp;
    if (E) {
      var kp = "oninput" in document;
      if (!kp) {
        var Zv = document.createElement("div");
        Zv.setAttribute("oninput", "return;"), kp = typeof Zv.oninput == "function";
      }
      Rp = kp;
    } else Rp = !1;
    Jv = Rp && (!document.documentMode || 9 < document.documentMode);
  }
  function em() {
    $i && ($i.detachEvent("onpropertychange", tm), $o = $i = null);
  }
  function tm(n) {
    if (n.propertyName === "value" && Xs($o)) {
      var r = [];
      bp(r, $o, n, qt(n)), Po(Kv, r);
    }
  }
  function i0(n, r, o) {
    n === "focusin" ? (em(), $i = r, $o = o, $i.attachEvent("onpropertychange", tm)) : n === "focusout" && em();
  }
  function nm(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown") return Xs($o);
  }
  function l0(n, r) {
    if (n === "click") return Xs(r);
  }
  function rm(n, r) {
    if (n === "input" || n === "change") return Xs(r);
  }
  function o0(n, r) {
    return n === r && (n !== 0 || 1 / n === 1 / r) || n !== n && r !== r;
  }
  var Ei = typeof Object.is == "function" ? Object.is : o0;
  function Ks(n, r) {
    if (Ei(n, r)) return !0;
    if (typeof n != "object" || n === null || typeof r != "object" || r === null) return !1;
    var o = Object.keys(n), c = Object.keys(r);
    if (o.length !== c.length) return !1;
    for (c = 0; c < o.length; c++) {
      var v = o[c];
      if (!T.call(r, v) || !Ei(n[v], r[v])) return !1;
    }
    return !0;
  }
  function am(n) {
    for (; n && n.firstChild; ) n = n.firstChild;
    return n;
  }
  function Ef(n, r) {
    var o = am(n);
    n = 0;
    for (var c; o; ) {
      if (o.nodeType === 3) {
        if (c = n + o.textContent.length, n <= r && c >= r) return { node: o, offset: r - n };
        n = c;
      }
      e: {
        for (; o; ) {
          if (o.nextSibling) {
            o = o.nextSibling;
            break e;
          }
          o = o.parentNode;
        }
        o = void 0;
      }
      o = am(o);
    }
  }
  function to(n, r) {
    return n && r ? n === r ? !0 : n && n.nodeType === 3 ? !1 : r && r.nodeType === 3 ? to(n, r.parentNode) : "contains" in n ? n.contains(r) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(r) & 16) : !1 : !1;
  }
  function Js() {
    for (var n = window, r = bn(); r instanceof n.HTMLIFrameElement; ) {
      try {
        var o = typeof r.contentWindow.location.href == "string";
      } catch {
        o = !1;
      }
      if (o) n = r.contentWindow;
      else break;
      r = bn(n.document);
    }
    return r;
  }
  function Cf(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r && (r === "input" && (n.type === "text" || n.type === "search" || n.type === "tel" || n.type === "url" || n.type === "password") || r === "textarea" || n.contentEditable === "true");
  }
  function Gu(n) {
    var r = Js(), o = n.focusedElem, c = n.selectionRange;
    if (r !== o && o && o.ownerDocument && to(o.ownerDocument.documentElement, o)) {
      if (c !== null && Cf(o)) {
        if (r = c.start, n = c.end, n === void 0 && (n = r), "selectionStart" in o) o.selectionStart = r, o.selectionEnd = Math.min(n, o.value.length);
        else if (n = (r = o.ownerDocument || document) && r.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var v = o.textContent.length, g = Math.min(c.start, v);
          c = c.end === void 0 ? g : Math.min(c.end, v), !n.extend && g > c && (v = c, c = g, g = v), v = Ef(o, g);
          var b = Ef(
            o,
            c
          );
          v && b && (n.rangeCount !== 1 || n.anchorNode !== v.node || n.anchorOffset !== v.offset || n.focusNode !== b.node || n.focusOffset !== b.offset) && (r = r.createRange(), r.setStart(v.node, v.offset), n.removeAllRanges(), g > c ? (n.addRange(r), n.extend(b.node, b.offset)) : (r.setEnd(b.node, b.offset), n.addRange(r)));
        }
      }
      for (r = [], n = o; n = n.parentNode; ) n.nodeType === 1 && r.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof o.focus == "function" && o.focus(), o = 0; o < r.length; o++) n = r[o], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
    }
  }
  var u0 = E && "documentMode" in document && 11 >= document.documentMode, Qu = null, Dp = null, Zs = null, Op = !1;
  function Mp(n, r, o) {
    var c = o.window === o ? o.document : o.nodeType === 9 ? o : o.ownerDocument;
    Op || Qu == null || Qu !== bn(c) || (c = Qu, "selectionStart" in c && Cf(c) ? c = { start: c.selectionStart, end: c.selectionEnd } : (c = (c.ownerDocument && c.ownerDocument.defaultView || window).getSelection(), c = { anchorNode: c.anchorNode, anchorOffset: c.anchorOffset, focusNode: c.focusNode, focusOffset: c.focusOffset }), Zs && Ks(Zs, c) || (Zs = c, c = tc(Dp, "onSelect"), 0 < c.length && (r = new Rt("onSelect", "select", null, r, o), n.push({ event: r, listeners: c }), r.target = Qu)));
  }
  function wf(n, r) {
    var o = {};
    return o[n.toLowerCase()] = r.toLowerCase(), o["Webkit" + n] = "webkit" + r, o["Moz" + n] = "moz" + r, o;
  }
  var Go = { animationend: wf("Animation", "AnimationEnd"), animationiteration: wf("Animation", "AnimationIteration"), animationstart: wf("Animation", "AnimationStart"), transitionend: wf("Transition", "TransitionEnd") }, yr = {}, Lp = {};
  E && (Lp = document.createElement("div").style, "AnimationEvent" in window || (delete Go.animationend.animation, delete Go.animationiteration.animation, delete Go.animationstart.animation), "TransitionEvent" in window || delete Go.transitionend.transition);
  function Tf(n) {
    if (yr[n]) return yr[n];
    if (!Go[n]) return n;
    var r = Go[n], o;
    for (o in r) if (r.hasOwnProperty(o) && o in Lp) return yr[n] = r[o];
    return n;
  }
  var im = Tf("animationend"), lm = Tf("animationiteration"), om = Tf("animationstart"), um = Tf("transitionend"), Np = /* @__PURE__ */ new Map(), xf = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function Ia(n, r) {
    Np.set(n, r), y(r, [n]);
  }
  for (var Ap = 0; Ap < xf.length; Ap++) {
    var Qo = xf[Ap], s0 = Qo.toLowerCase(), c0 = Qo[0].toUpperCase() + Qo.slice(1);
    Ia(s0, "on" + c0);
  }
  Ia(im, "onAnimationEnd"), Ia(lm, "onAnimationIteration"), Ia(om, "onAnimationStart"), Ia("dblclick", "onDoubleClick"), Ia("focusin", "onFocus"), Ia("focusout", "onBlur"), Ia(um, "onTransitionEnd"), h("onMouseEnter", ["mouseout", "mouseover"]), h("onMouseLeave", ["mouseout", "mouseover"]), h("onPointerEnter", ["pointerout", "pointerover"]), h("onPointerLeave", ["pointerout", "pointerover"]), y("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), y("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), y("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), y("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), y("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), y("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var ec = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), zp = new Set("cancel close invalid load scroll toggle".split(" ").concat(ec));
  function bf(n, r, o) {
    var c = n.type || "unknown-event";
    n.currentTarget = o, je(c, r, void 0, n), n.currentTarget = null;
  }
  function qo(n, r) {
    r = (r & 4) !== 0;
    for (var o = 0; o < n.length; o++) {
      var c = n[o], v = c.event;
      c = c.listeners;
      e: {
        var g = void 0;
        if (r) for (var b = c.length - 1; 0 <= b; b--) {
          var N = c[b], F = N.instance, J = N.currentTarget;
          if (N = N.listener, F !== g && v.isPropagationStopped()) break e;
          bf(v, N, J), g = F;
        }
        else for (b = 0; b < c.length; b++) {
          if (N = c[b], F = N.instance, J = N.currentTarget, N = N.listener, F !== g && v.isPropagationStopped()) break e;
          bf(v, N, J), g = F;
        }
      }
    }
    if (Bi) throw n = U, Bi = !1, U = null, n;
  }
  function $t(n, r) {
    var o = r[ac];
    o === void 0 && (o = r[ac] = /* @__PURE__ */ new Set());
    var c = n + "__bubble";
    o.has(c) || (sm(r, n, 2, !1), o.add(c));
  }
  function Rf(n, r, o) {
    var c = 0;
    r && (c |= 4), sm(o, n, c, r);
  }
  var kf = "_reactListening" + Math.random().toString(36).slice(2);
  function qu(n) {
    if (!n[kf]) {
      n[kf] = !0, f.forEach(function(o) {
        o !== "selectionchange" && (zp.has(o) || Rf(o, !1, n), Rf(o, !0, n));
      });
      var r = n.nodeType === 9 ? n : n.ownerDocument;
      r === null || r[kf] || (r[kf] = !0, Rf("selectionchange", !1, r));
    }
  }
  function sm(n, r, o, c) {
    switch (Yu(r)) {
      case 1:
        var v = Bu;
        break;
      case 4:
        v = Vu;
        break;
      default:
        v = Zl;
    }
    o = v.bind(null, r, o, n), v = void 0, !jr || r !== "touchstart" && r !== "touchmove" && r !== "wheel" || (v = !0), c ? v !== void 0 ? n.addEventListener(r, o, { capture: !0, passive: v }) : n.addEventListener(r, o, !0) : v !== void 0 ? n.addEventListener(r, o, { passive: v }) : n.addEventListener(r, o, !1);
  }
  function Df(n, r, o, c, v) {
    var g = c;
    if (!(r & 1) && !(r & 2) && c !== null) e: for (; ; ) {
      if (c === null) return;
      var b = c.tag;
      if (b === 3 || b === 4) {
        var N = c.stateNode.containerInfo;
        if (N === v || N.nodeType === 8 && N.parentNode === v) break;
        if (b === 4) for (b = c.return; b !== null; ) {
          var F = b.tag;
          if ((F === 3 || F === 4) && (F = b.stateNode.containerInfo, F === v || F.nodeType === 8 && F.parentNode === v)) return;
          b = b.return;
        }
        for (; N !== null; ) {
          if (b = Ko(N), b === null) return;
          if (F = b.tag, F === 5 || F === 6) {
            c = g = b;
            continue e;
          }
          N = N.parentNode;
        }
      }
      c = c.return;
    }
    Po(function() {
      var J = g, _e = qt(o), Ee = [];
      e: {
        var ye = Np.get(n);
        if (ye !== void 0) {
          var Ae = Rt, He = n;
          switch (n) {
            case "keypress":
              if (re(o) === 0) break e;
            case "keydown":
            case "keyup":
              Ae = wp;
              break;
            case "focusin":
              He = "focus", Ae = Wo;
              break;
            case "focusout":
              He = "blur", Ae = Wo;
              break;
            case "beforeblur":
            case "afterblur":
              Ae = Wo;
              break;
            case "click":
              if (o.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              Ae = eo;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              Ae = _l;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              Ae = Yv;
              break;
            case im:
            case lm:
            case om:
              Ae = gf;
              break;
            case um:
              Ae = El;
              break;
            case "scroll":
              Ae = un;
              break;
            case "wheel":
              Ae = Cl;
              break;
            case "copy":
            case "cut":
            case "paste":
              Ae = Hv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              Ae = Iv;
          }
          var We = (r & 4) !== 0, Nn = !We && n === "scroll", W = We ? ye !== null ? ye + "Capture" : null : ye;
          We = [];
          for (var H = J, q; H !== null; ) {
            q = H;
            var Se = q.stateNode;
            if (q.tag === 5 && Se !== null && (q = Se, W !== null && (Se = Pr(H, W), Se != null && We.push(Xu(H, Se, q)))), Nn) break;
            H = H.return;
          }
          0 < We.length && (ye = new Ae(ye, He, null, o, _e), Ee.push({ event: ye, listeners: We }));
        }
      }
      if (!(r & 7)) {
        e: {
          if (ye = n === "mouseover" || n === "pointerover", Ae = n === "mouseout" || n === "pointerout", ye && o !== ln && (He = o.relatedTarget || o.fromElement) && (Ko(He) || He[wl])) break e;
          if ((Ae || ye) && (ye = _e.window === _e ? _e : (ye = _e.ownerDocument) ? ye.defaultView || ye.parentWindow : window, Ae ? (He = o.relatedTarget || o.toElement, Ae = J, He = He ? Ko(He) : null, He !== null && (Nn = yt(He), He !== Nn || He.tag !== 5 && He.tag !== 6) && (He = null)) : (Ae = null, He = J), Ae !== He)) {
            if (We = eo, Se = "onMouseLeave", W = "onMouseEnter", H = "mouse", (n === "pointerout" || n === "pointerover") && (We = Iv, Se = "onPointerLeave", W = "onPointerEnter", H = "pointer"), Nn = Ae == null ? ye : Ci(Ae), q = He == null ? ye : Ci(He), ye = new We(Se, H + "leave", Ae, o, _e), ye.target = Nn, ye.relatedTarget = q, Se = null, Ko(_e) === J && (We = new We(W, H + "enter", He, o, _e), We.target = q, We.relatedTarget = Nn, Se = We), Nn = Se, Ae && He) t: {
              for (We = Ae, W = He, H = 0, q = We; q; q = no(q)) H++;
              for (q = 0, Se = W; Se; Se = no(Se)) q++;
              for (; 0 < H - q; ) We = no(We), H--;
              for (; 0 < q - H; ) W = no(W), q--;
              for (; H--; ) {
                if (We === W || W !== null && We === W.alternate) break t;
                We = no(We), W = no(W);
              }
              We = null;
            }
            else We = null;
            Ae !== null && cm(Ee, ye, Ae, We, !1), He !== null && Nn !== null && cm(Ee, Nn, He, We, !0);
          }
        }
        e: {
          if (ye = J ? Ci(J) : window, Ae = ye.nodeName && ye.nodeName.toLowerCase(), Ae === "select" || Ae === "input" && ye.type === "file") var Be = a0;
          else if (Xv(ye)) if (Jv) Be = rm;
          else {
            Be = nm;
            var at = i0;
          }
          else (Ae = ye.nodeName) && Ae.toLowerCase() === "input" && (ye.type === "checkbox" || ye.type === "radio") && (Be = l0);
          if (Be && (Be = Be(n, J))) {
            bp(Ee, Be, o, _e);
            break e;
          }
          at && at(n, ye, J), n === "focusout" && (at = ye._wrapperState) && at.controlled && ye.type === "number" && wa(ye, "number", ye.value);
        }
        switch (at = J ? Ci(J) : window, n) {
          case "focusin":
            (Xv(at) || at.contentEditable === "true") && (Qu = at, Dp = J, Zs = null);
            break;
          case "focusout":
            Zs = Dp = Qu = null;
            break;
          case "mousedown":
            Op = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Op = !1, Mp(Ee, o, _e);
            break;
          case "selectionchange":
            if (u0) break;
          case "keydown":
          case "keyup":
            Mp(Ee, o, _e);
        }
        var ot;
        if (Wu) e: {
          switch (n) {
            case "compositionstart":
              var dt = "onCompositionStart";
              break e;
            case "compositionend":
              dt = "onCompositionEnd";
              break e;
            case "compositionupdate":
              dt = "onCompositionUpdate";
              break e;
          }
          dt = void 0;
        }
        else $u ? Gv(n, o) && (dt = "onCompositionEnd") : n === "keydown" && o.keyCode === 229 && (dt = "onCompositionStart");
        dt && (Wv && o.locale !== "ko" && ($u || dt !== "onCompositionStart" ? dt === "onCompositionEnd" && $u && (ot = K()) : (Si = _e, w = "value" in Si ? Si.value : Si.textContent, $u = !0)), at = tc(J, dt), 0 < at.length && (dt = new Sp(dt, n, null, o, _e), Ee.push({ event: dt, listeners: at }), ot ? dt.data = ot : (ot = Qv(o), ot !== null && (dt.data = ot)))), (ot = qs ? qv(n, o) : n0(n, o)) && (J = tc(J, "onBeforeInput"), 0 < J.length && (_e = new Sp("onBeforeInput", "beforeinput", null, o, _e), Ee.push({ event: _e, listeners: J }), _e.data = ot));
      }
      qo(Ee, r);
    });
  }
  function Xu(n, r, o) {
    return { instance: n, listener: r, currentTarget: o };
  }
  function tc(n, r) {
    for (var o = r + "Capture", c = []; n !== null; ) {
      var v = n, g = v.stateNode;
      v.tag === 5 && g !== null && (v = g, g = Pr(n, o), g != null && c.unshift(Xu(n, g, v)), g = Pr(n, r), g != null && c.push(Xu(n, g, v))), n = n.return;
    }
    return c;
  }
  function no(n) {
    if (n === null) return null;
    do
      n = n.return;
    while (n && n.tag !== 5);
    return n || null;
  }
  function cm(n, r, o, c, v) {
    for (var g = r._reactName, b = []; o !== null && o !== c; ) {
      var N = o, F = N.alternate, J = N.stateNode;
      if (F !== null && F === c) break;
      N.tag === 5 && J !== null && (N = J, v ? (F = Pr(o, g), F != null && b.unshift(Xu(o, F, N))) : v || (F = Pr(o, g), F != null && b.push(Xu(o, F, N)))), o = o.return;
    }
    b.length !== 0 && n.push({ event: r, listeners: b });
  }
  var fm = /\r\n?/g, f0 = /\u0000|\uFFFD/g;
  function dm(n) {
    return (typeof n == "string" ? n : "" + n).replace(fm, `
`).replace(f0, "");
  }
  function Of(n, r, o) {
    if (r = dm(r), dm(n) !== r && o) throw Error(s(425));
  }
  function ro() {
  }
  var nc = null, Xo = null;
  function Mf(n, r) {
    return n === "textarea" || n === "noscript" || typeof r.children == "string" || typeof r.children == "number" || typeof r.dangerouslySetInnerHTML == "object" && r.dangerouslySetInnerHTML !== null && r.dangerouslySetInnerHTML.__html != null;
  }
  var Lf = typeof setTimeout == "function" ? setTimeout : void 0, Up = typeof clearTimeout == "function" ? clearTimeout : void 0, pm = typeof Promise == "function" ? Promise : void 0, Ku = typeof queueMicrotask == "function" ? queueMicrotask : typeof pm < "u" ? function(n) {
    return pm.resolve(null).then(n).catch(Nf);
  } : Lf;
  function Nf(n) {
    setTimeout(function() {
      throw n;
    });
  }
  function Ju(n, r) {
    var o = r, c = 0;
    do {
      var v = o.nextSibling;
      if (n.removeChild(o), v && v.nodeType === 8) if (o = v.data, o === "/$") {
        if (c === 0) {
          n.removeChild(v), _i(r);
          return;
        }
        c--;
      } else o !== "$" && o !== "$?" && o !== "$!" || c++;
      o = v;
    } while (o);
    _i(r);
  }
  function Gi(n) {
    for (; n != null; n = n.nextSibling) {
      var r = n.nodeType;
      if (r === 1 || r === 3) break;
      if (r === 8) {
        if (r = n.data, r === "$" || r === "$!" || r === "$?") break;
        if (r === "/$") return null;
      }
    }
    return n;
  }
  function hm(n) {
    n = n.previousSibling;
    for (var r = 0; n; ) {
      if (n.nodeType === 8) {
        var o = n.data;
        if (o === "$" || o === "$!" || o === "$?") {
          if (r === 0) return n;
          r--;
        } else o === "/$" && r++;
      }
      n = n.previousSibling;
    }
    return null;
  }
  var ao = Math.random().toString(36).slice(2), Qi = "__reactFiber$" + ao, rc = "__reactProps$" + ao, wl = "__reactContainer$" + ao, ac = "__reactEvents$" + ao, Zu = "__reactListeners$" + ao, d0 = "__reactHandles$" + ao;
  function Ko(n) {
    var r = n[Qi];
    if (r) return r;
    for (var o = n.parentNode; o; ) {
      if (r = o[wl] || o[Qi]) {
        if (o = r.alternate, r.child !== null || o !== null && o.child !== null) for (n = hm(n); n !== null; ) {
          if (o = n[Qi]) return o;
          n = hm(n);
        }
        return r;
      }
      n = o, o = n.parentNode;
    }
    return null;
  }
  function Ze(n) {
    return n = n[Qi] || n[wl], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
  }
  function Ci(n) {
    if (n.tag === 5 || n.tag === 6) return n.stateNode;
    throw Error(s(33));
  }
  function Sn(n) {
    return n[rc] || null;
  }
  var Ot = [], Ya = -1;
  function Wa(n) {
    return { current: n };
  }
  function sn(n) {
    0 > Ya || (n.current = Ot[Ya], Ot[Ya] = null, Ya--);
  }
  function Je(n, r) {
    Ya++, Ot[Ya] = n.current, n.current = r;
  }
  var Lr = {}, Tn = Wa(Lr), er = Wa(!1), la = Lr;
  function oa(n, r) {
    var o = n.type.contextTypes;
    if (!o) return Lr;
    var c = n.stateNode;
    if (c && c.__reactInternalMemoizedUnmaskedChildContext === r) return c.__reactInternalMemoizedMaskedChildContext;
    var v = {}, g;
    for (g in o) v[g] = r[g];
    return c && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = r, n.__reactInternalMemoizedMaskedChildContext = v), v;
  }
  function Bn(n) {
    return n = n.childContextTypes, n != null;
  }
  function es() {
    sn(er), sn(Tn);
  }
  function vm(n, r, o) {
    if (Tn.current !== Lr) throw Error(s(168));
    Je(Tn, r), Je(er, o);
  }
  function ic(n, r, o) {
    var c = n.stateNode;
    if (r = r.childContextTypes, typeof c.getChildContext != "function") return o;
    c = c.getChildContext();
    for (var v in c) if (!(v in r)) throw Error(s(108, rt(n) || "Unknown", v));
    return me({}, o, c);
  }
  function or(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || Lr, la = Tn.current, Je(Tn, n), Je(er, er.current), !0;
  }
  function Af(n, r, o) {
    var c = n.stateNode;
    if (!c) throw Error(s(169));
    o ? (n = ic(n, r, la), c.__reactInternalMemoizedMergedChildContext = n, sn(er), sn(Tn), Je(Tn, n)) : sn(er), Je(er, o);
  }
  var qi = null, ts = !1, Tl = !1;
  function zf(n) {
    qi === null ? qi = [n] : qi.push(n);
  }
  function io(n) {
    ts = !0, zf(n);
  }
  function Xi() {
    if (!Tl && qi !== null) {
      Tl = !0;
      var n = 0, r = Pt;
      try {
        var o = qi;
        for (Pt = 1; n < o.length; n++) {
          var c = o[n];
          do
            c = c(!0);
          while (c !== null);
        }
        qi = null, ts = !1;
      } catch (v) {
        throw qi !== null && (qi = qi.slice(n + 1)), fn(mi, Xi), v;
      } finally {
        Pt = r, Tl = !1;
      }
    }
    return null;
  }
  var lo = [], oo = 0, uo = null, xl = 0, Vn = [], $a = 0, Ra = null, Ki = 1, Ji = "";
  function Jo(n, r) {
    lo[oo++] = xl, lo[oo++] = uo, uo = n, xl = r;
  }
  function mm(n, r, o) {
    Vn[$a++] = Ki, Vn[$a++] = Ji, Vn[$a++] = Ra, Ra = n;
    var c = Ki;
    n = Ji;
    var v = 32 - Hr(c) - 1;
    c &= ~(1 << v), o += 1;
    var g = 32 - Hr(r) + v;
    if (30 < g) {
      var b = v - v % 5;
      g = (c & (1 << b) - 1).toString(32), c >>= b, v -= b, Ki = 1 << 32 - Hr(r) + v | o << v | c, Ji = g + n;
    } else Ki = 1 << g | o << v | c, Ji = n;
  }
  function Uf(n) {
    n.return !== null && (Jo(n, 1), mm(n, 1, 0));
  }
  function Ff(n) {
    for (; n === uo; ) uo = lo[--oo], lo[oo] = null, xl = lo[--oo], lo[oo] = null;
    for (; n === Ra; ) Ra = Vn[--$a], Vn[$a] = null, Ji = Vn[--$a], Vn[$a] = null, Ki = Vn[--$a], Vn[$a] = null;
  }
  var ua = null, sa = null, mn = !1, Ga = null;
  function Fp(n, r) {
    var o = Ja(5, null, null, 0);
    o.elementType = "DELETED", o.stateNode = r, o.return = n, r = n.deletions, r === null ? (n.deletions = [o], n.flags |= 16) : r.push(o);
  }
  function ym(n, r) {
    switch (n.tag) {
      case 5:
        var o = n.type;
        return r = r.nodeType !== 1 || o.toLowerCase() !== r.nodeName.toLowerCase() ? null : r, r !== null ? (n.stateNode = r, ua = n, sa = Gi(r.firstChild), !0) : !1;
      case 6:
        return r = n.pendingProps === "" || r.nodeType !== 3 ? null : r, r !== null ? (n.stateNode = r, ua = n, sa = null, !0) : !1;
      case 13:
        return r = r.nodeType !== 8 ? null : r, r !== null ? (o = Ra !== null ? { id: Ki, overflow: Ji } : null, n.memoizedState = { dehydrated: r, treeContext: o, retryLane: 1073741824 }, o = Ja(18, null, null, 0), o.stateNode = r, o.return = n, n.child = o, ua = n, sa = null, !0) : !1;
      default:
        return !1;
    }
  }
  function Pp(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function jp(n) {
    if (mn) {
      var r = sa;
      if (r) {
        var o = r;
        if (!ym(n, r)) {
          if (Pp(n)) throw Error(s(418));
          r = Gi(o.nextSibling);
          var c = ua;
          r && ym(n, r) ? Fp(c, o) : (n.flags = n.flags & -4097 | 2, mn = !1, ua = n);
        }
      } else {
        if (Pp(n)) throw Error(s(418));
        n.flags = n.flags & -4097 | 2, mn = !1, ua = n;
      }
    }
  }
  function tr(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; ) n = n.return;
    ua = n;
  }
  function Pf(n) {
    if (n !== ua) return !1;
    if (!mn) return tr(n), mn = !0, !1;
    var r;
    if ((r = n.tag !== 3) && !(r = n.tag !== 5) && (r = n.type, r = r !== "head" && r !== "body" && !Mf(n.type, n.memoizedProps)), r && (r = sa)) {
      if (Pp(n)) throw lc(), Error(s(418));
      for (; r; ) Fp(n, r), r = Gi(r.nextSibling);
    }
    if (tr(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(s(317));
      e: {
        for (n = n.nextSibling, r = 0; n; ) {
          if (n.nodeType === 8) {
            var o = n.data;
            if (o === "/$") {
              if (r === 0) {
                sa = Gi(n.nextSibling);
                break e;
              }
              r--;
            } else o !== "$" && o !== "$!" && o !== "$?" || r++;
          }
          n = n.nextSibling;
        }
        sa = null;
      }
    } else sa = ua ? Gi(n.stateNode.nextSibling) : null;
    return !0;
  }
  function lc() {
    for (var n = sa; n; ) n = Gi(n.nextSibling);
  }
  function so() {
    sa = ua = null, mn = !1;
  }
  function bl(n) {
    Ga === null ? Ga = [n] : Ga.push(n);
  }
  var p0 = ie.ReactCurrentBatchConfig;
  function Zo(n, r, o) {
    if (n = o.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (o._owner) {
        if (o = o._owner, o) {
          if (o.tag !== 1) throw Error(s(309));
          var c = o.stateNode;
        }
        if (!c) throw Error(s(147, n));
        var v = c, g = "" + n;
        return r !== null && r.ref !== null && typeof r.ref == "function" && r.ref._stringRef === g ? r.ref : (r = function(b) {
          var N = v.refs;
          b === null ? delete N[g] : N[g] = b;
        }, r._stringRef = g, r);
      }
      if (typeof n != "string") throw Error(s(284));
      if (!o._owner) throw Error(s(290, n));
    }
    return n;
  }
  function jf(n, r) {
    throw n = Object.prototype.toString.call(r), Error(s(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n));
  }
  function gm(n) {
    var r = n._init;
    return r(n._payload);
  }
  function eu(n) {
    function r(W, H) {
      if (n) {
        var q = W.deletions;
        q === null ? (W.deletions = [H], W.flags |= 16) : q.push(H);
      }
    }
    function o(W, H) {
      if (!n) return null;
      for (; H !== null; ) r(W, H), H = H.sibling;
      return null;
    }
    function c(W, H) {
      for (W = /* @__PURE__ */ new Map(); H !== null; ) H.key !== null ? W.set(H.key, H) : W.set(H.index, H), H = H.sibling;
      return W;
    }
    function v(W, H) {
      return W = go(W, H), W.index = 0, W.sibling = null, W;
    }
    function g(W, H, q) {
      return W.index = q, n ? (q = W.alternate, q !== null ? (q = q.index, q < H ? (W.flags |= 2, H) : q) : (W.flags |= 2, H)) : (W.flags |= 1048576, H);
    }
    function b(W) {
      return n && W.alternate === null && (W.flags |= 2), W;
    }
    function N(W, H, q, Se) {
      return H === null || H.tag !== 6 ? (H = mh(q, W.mode, Se), H.return = W, H) : (H = v(H, q), H.return = W, H);
    }
    function F(W, H, q, Se) {
      var Be = q.type;
      return Be === ae ? _e(W, H, q.props.children, Se, q.key) : H !== null && (H.elementType === Be || typeof Be == "object" && Be !== null && Be.$$typeof === pe && gm(Be) === H.type) ? (Se = v(H, q.props), Se.ref = Zo(W, H, q), Se.return = W, Se) : (Se = Uc(q.type, q.key, q.props, null, W.mode, Se), Se.ref = Zo(W, H, q), Se.return = W, Se);
    }
    function J(W, H, q, Se) {
      return H === null || H.tag !== 4 || H.stateNode.containerInfo !== q.containerInfo || H.stateNode.implementation !== q.implementation ? (H = gd(q, W.mode, Se), H.return = W, H) : (H = v(H, q.children || []), H.return = W, H);
    }
    function _e(W, H, q, Se, Be) {
      return H === null || H.tag !== 7 ? (H = Ll(q, W.mode, Se, Be), H.return = W, H) : (H = v(H, q), H.return = W, H);
    }
    function Ee(W, H, q) {
      if (typeof H == "string" && H !== "" || typeof H == "number") return H = mh("" + H, W.mode, q), H.return = W, H;
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case Y:
            return q = Uc(H.type, H.key, H.props, null, W.mode, q), q.ref = Zo(W, null, H), q.return = W, q;
          case fe:
            return H = gd(H, W.mode, q), H.return = W, H;
          case pe:
            var Se = H._init;
            return Ee(W, Se(H._payload), q);
        }
        if (ir(H) || Te(H)) return H = Ll(H, W.mode, q, null), H.return = W, H;
        jf(W, H);
      }
      return null;
    }
    function ye(W, H, q, Se) {
      var Be = H !== null ? H.key : null;
      if (typeof q == "string" && q !== "" || typeof q == "number") return Be !== null ? null : N(W, H, "" + q, Se);
      if (typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case Y:
            return q.key === Be ? F(W, H, q, Se) : null;
          case fe:
            return q.key === Be ? J(W, H, q, Se) : null;
          case pe:
            return Be = q._init, ye(
              W,
              H,
              Be(q._payload),
              Se
            );
        }
        if (ir(q) || Te(q)) return Be !== null ? null : _e(W, H, q, Se, null);
        jf(W, q);
      }
      return null;
    }
    function Ae(W, H, q, Se, Be) {
      if (typeof Se == "string" && Se !== "" || typeof Se == "number") return W = W.get(q) || null, N(H, W, "" + Se, Be);
      if (typeof Se == "object" && Se !== null) {
        switch (Se.$$typeof) {
          case Y:
            return W = W.get(Se.key === null ? q : Se.key) || null, F(H, W, Se, Be);
          case fe:
            return W = W.get(Se.key === null ? q : Se.key) || null, J(H, W, Se, Be);
          case pe:
            var at = Se._init;
            return Ae(W, H, q, at(Se._payload), Be);
        }
        if (ir(Se) || Te(Se)) return W = W.get(q) || null, _e(H, W, Se, Be, null);
        jf(H, Se);
      }
      return null;
    }
    function He(W, H, q, Se) {
      for (var Be = null, at = null, ot = H, dt = H = 0, cr = null; ot !== null && dt < q.length; dt++) {
        ot.index > dt ? (cr = ot, ot = null) : cr = ot.sibling;
        var Bt = ye(W, ot, q[dt], Se);
        if (Bt === null) {
          ot === null && (ot = cr);
          break;
        }
        n && ot && Bt.alternate === null && r(W, ot), H = g(Bt, H, dt), at === null ? Be = Bt : at.sibling = Bt, at = Bt, ot = cr;
      }
      if (dt === q.length) return o(W, ot), mn && Jo(W, dt), Be;
      if (ot === null) {
        for (; dt < q.length; dt++) ot = Ee(W, q[dt], Se), ot !== null && (H = g(ot, H, dt), at === null ? Be = ot : at.sibling = ot, at = ot);
        return mn && Jo(W, dt), Be;
      }
      for (ot = c(W, ot); dt < q.length; dt++) cr = Ae(ot, W, dt, q[dt], Se), cr !== null && (n && cr.alternate !== null && ot.delete(cr.key === null ? dt : cr.key), H = g(cr, H, dt), at === null ? Be = cr : at.sibling = cr, at = cr);
      return n && ot.forEach(function(Eo) {
        return r(W, Eo);
      }), mn && Jo(W, dt), Be;
    }
    function We(W, H, q, Se) {
      var Be = Te(q);
      if (typeof Be != "function") throw Error(s(150));
      if (q = Be.call(q), q == null) throw Error(s(151));
      for (var at = Be = null, ot = H, dt = H = 0, cr = null, Bt = q.next(); ot !== null && !Bt.done; dt++, Bt = q.next()) {
        ot.index > dt ? (cr = ot, ot = null) : cr = ot.sibling;
        var Eo = ye(W, ot, Bt.value, Se);
        if (Eo === null) {
          ot === null && (ot = cr);
          break;
        }
        n && ot && Eo.alternate === null && r(W, ot), H = g(Eo, H, dt), at === null ? Be = Eo : at.sibling = Eo, at = Eo, ot = cr;
      }
      if (Bt.done) return o(
        W,
        ot
      ), mn && Jo(W, dt), Be;
      if (ot === null) {
        for (; !Bt.done; dt++, Bt = q.next()) Bt = Ee(W, Bt.value, Se), Bt !== null && (H = g(Bt, H, dt), at === null ? Be = Bt : at.sibling = Bt, at = Bt);
        return mn && Jo(W, dt), Be;
      }
      for (ot = c(W, ot); !Bt.done; dt++, Bt = q.next()) Bt = Ae(ot, W, dt, Bt.value, Se), Bt !== null && (n && Bt.alternate !== null && ot.delete(Bt.key === null ? dt : Bt.key), H = g(Bt, H, dt), at === null ? Be = Bt : at.sibling = Bt, at = Bt);
      return n && ot.forEach(function(ey) {
        return r(W, ey);
      }), mn && Jo(W, dt), Be;
    }
    function Nn(W, H, q, Se) {
      if (typeof q == "object" && q !== null && q.type === ae && q.key === null && (q = q.props.children), typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case Y:
            e: {
              for (var Be = q.key, at = H; at !== null; ) {
                if (at.key === Be) {
                  if (Be = q.type, Be === ae) {
                    if (at.tag === 7) {
                      o(W, at.sibling), H = v(at, q.props.children), H.return = W, W = H;
                      break e;
                    }
                  } else if (at.elementType === Be || typeof Be == "object" && Be !== null && Be.$$typeof === pe && gm(Be) === at.type) {
                    o(W, at.sibling), H = v(at, q.props), H.ref = Zo(W, at, q), H.return = W, W = H;
                    break e;
                  }
                  o(W, at);
                  break;
                } else r(W, at);
                at = at.sibling;
              }
              q.type === ae ? (H = Ll(q.props.children, W.mode, Se, q.key), H.return = W, W = H) : (Se = Uc(q.type, q.key, q.props, null, W.mode, Se), Se.ref = Zo(W, H, q), Se.return = W, W = Se);
            }
            return b(W);
          case fe:
            e: {
              for (at = q.key; H !== null; ) {
                if (H.key === at) if (H.tag === 4 && H.stateNode.containerInfo === q.containerInfo && H.stateNode.implementation === q.implementation) {
                  o(W, H.sibling), H = v(H, q.children || []), H.return = W, W = H;
                  break e;
                } else {
                  o(W, H);
                  break;
                }
                else r(W, H);
                H = H.sibling;
              }
              H = gd(q, W.mode, Se), H.return = W, W = H;
            }
            return b(W);
          case pe:
            return at = q._init, Nn(W, H, at(q._payload), Se);
        }
        if (ir(q)) return He(W, H, q, Se);
        if (Te(q)) return We(W, H, q, Se);
        jf(W, q);
      }
      return typeof q == "string" && q !== "" || typeof q == "number" ? (q = "" + q, H !== null && H.tag === 6 ? (o(W, H.sibling), H = v(H, q), H.return = W, W = H) : (o(W, H), H = mh(q, W.mode, Se), H.return = W, W = H), b(W)) : o(W, H);
    }
    return Nn;
  }
  var Dn = eu(!0), Me = eu(!1), ka = Wa(null), ca = null, ns = null, Hp = null;
  function Bp() {
    Hp = ns = ca = null;
  }
  function Vp(n) {
    var r = ka.current;
    sn(ka), n._currentValue = r;
  }
  function Ip(n, r, o) {
    for (; n !== null; ) {
      var c = n.alternate;
      if ((n.childLanes & r) !== r ? (n.childLanes |= r, c !== null && (c.childLanes |= r)) : c !== null && (c.childLanes & r) !== r && (c.childLanes |= r), n === o) break;
      n = n.return;
    }
  }
  function En(n, r) {
    ca = n, Hp = ns = null, n = n.dependencies, n !== null && n.firstContext !== null && (n.lanes & r && (Yn = !0), n.firstContext = null);
  }
  function Qa(n) {
    var r = n._currentValue;
    if (Hp !== n) if (n = { context: n, memoizedValue: r, next: null }, ns === null) {
      if (ca === null) throw Error(s(308));
      ns = n, ca.dependencies = { lanes: 0, firstContext: n };
    } else ns = ns.next = n;
    return r;
  }
  var tu = null;
  function Yp(n) {
    tu === null ? tu = [n] : tu.push(n);
  }
  function Wp(n, r, o, c) {
    var v = r.interleaved;
    return v === null ? (o.next = o, Yp(r)) : (o.next = v.next, v.next = o), r.interleaved = o, Da(n, c);
  }
  function Da(n, r) {
    n.lanes |= r;
    var o = n.alternate;
    for (o !== null && (o.lanes |= r), o = n, n = n.return; n !== null; ) n.childLanes |= r, o = n.alternate, o !== null && (o.childLanes |= r), o = n, n = n.return;
    return o.tag === 3 ? o.stateNode : null;
  }
  var Oa = !1;
  function $p(n) {
    n.updateQueue = { baseState: n.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function _m(n, r) {
    n = n.updateQueue, r.updateQueue === n && (r.updateQueue = { baseState: n.baseState, firstBaseUpdate: n.firstBaseUpdate, lastBaseUpdate: n.lastBaseUpdate, shared: n.shared, effects: n.effects });
  }
  function Rl(n, r) {
    return { eventTime: n, lane: r, tag: 0, payload: null, callback: null, next: null };
  }
  function co(n, r, o) {
    var c = n.updateQueue;
    if (c === null) return null;
    if (c = c.shared, Mt & 2) {
      var v = c.pending;
      return v === null ? r.next = r : (r.next = v.next, v.next = r), c.pending = r, Da(n, o);
    }
    return v = c.interleaved, v === null ? (r.next = r, Yp(c)) : (r.next = v.next, v.next = r), c.interleaved = r, Da(n, o);
  }
  function Hf(n, r, o) {
    if (r = r.updateQueue, r !== null && (r = r.shared, (o & 4194240) !== 0)) {
      var c = r.lanes;
      c &= n.pendingLanes, o |= c, r.lanes = o, gl(n, o);
    }
  }
  function Sm(n, r) {
    var o = n.updateQueue, c = n.alternate;
    if (c !== null && (c = c.updateQueue, o === c)) {
      var v = null, g = null;
      if (o = o.firstBaseUpdate, o !== null) {
        do {
          var b = { eventTime: o.eventTime, lane: o.lane, tag: o.tag, payload: o.payload, callback: o.callback, next: null };
          g === null ? v = g = b : g = g.next = b, o = o.next;
        } while (o !== null);
        g === null ? v = g = r : g = g.next = r;
      } else v = g = r;
      o = { baseState: c.baseState, firstBaseUpdate: v, lastBaseUpdate: g, shared: c.shared, effects: c.effects }, n.updateQueue = o;
      return;
    }
    n = o.lastBaseUpdate, n === null ? o.firstBaseUpdate = r : n.next = r, o.lastBaseUpdate = r;
  }
  function oc(n, r, o, c) {
    var v = n.updateQueue;
    Oa = !1;
    var g = v.firstBaseUpdate, b = v.lastBaseUpdate, N = v.shared.pending;
    if (N !== null) {
      v.shared.pending = null;
      var F = N, J = F.next;
      F.next = null, b === null ? g = J : b.next = J, b = F;
      var _e = n.alternate;
      _e !== null && (_e = _e.updateQueue, N = _e.lastBaseUpdate, N !== b && (N === null ? _e.firstBaseUpdate = J : N.next = J, _e.lastBaseUpdate = F));
    }
    if (g !== null) {
      var Ee = v.baseState;
      b = 0, _e = J = F = null, N = g;
      do {
        var ye = N.lane, Ae = N.eventTime;
        if ((c & ye) === ye) {
          _e !== null && (_e = _e.next = {
            eventTime: Ae,
            lane: 0,
            tag: N.tag,
            payload: N.payload,
            callback: N.callback,
            next: null
          });
          e: {
            var He = n, We = N;
            switch (ye = r, Ae = o, We.tag) {
              case 1:
                if (He = We.payload, typeof He == "function") {
                  Ee = He.call(Ae, Ee, ye);
                  break e;
                }
                Ee = He;
                break e;
              case 3:
                He.flags = He.flags & -65537 | 128;
              case 0:
                if (He = We.payload, ye = typeof He == "function" ? He.call(Ae, Ee, ye) : He, ye == null) break e;
                Ee = me({}, Ee, ye);
                break e;
              case 2:
                Oa = !0;
            }
          }
          N.callback !== null && N.lane !== 0 && (n.flags |= 64, ye = v.effects, ye === null ? v.effects = [N] : ye.push(N));
        } else Ae = { eventTime: Ae, lane: ye, tag: N.tag, payload: N.payload, callback: N.callback, next: null }, _e === null ? (J = _e = Ae, F = Ee) : _e = _e.next = Ae, b |= ye;
        if (N = N.next, N === null) {
          if (N = v.shared.pending, N === null) break;
          ye = N, N = ye.next, ye.next = null, v.lastBaseUpdate = ye, v.shared.pending = null;
        }
      } while (!0);
      if (_e === null && (F = Ee), v.baseState = F, v.firstBaseUpdate = J, v.lastBaseUpdate = _e, r = v.shared.interleaved, r !== null) {
        v = r;
        do
          b |= v.lane, v = v.next;
        while (v !== r);
      } else g === null && (v.shared.lanes = 0);
      rl |= b, n.lanes = b, n.memoizedState = Ee;
    }
  }
  function Gp(n, r, o) {
    if (n = r.effects, r.effects = null, n !== null) for (r = 0; r < n.length; r++) {
      var c = n[r], v = c.callback;
      if (v !== null) {
        if (c.callback = null, c = o, typeof v != "function") throw Error(s(191, v));
        v.call(c);
      }
    }
  }
  var uc = {}, Zi = Wa(uc), sc = Wa(uc), cc = Wa(uc);
  function nu(n) {
    if (n === uc) throw Error(s(174));
    return n;
  }
  function Qp(n, r) {
    switch (Je(cc, r), Je(sc, n), Je(Zi, uc), n = r.nodeType, n) {
      case 9:
      case 11:
        r = (r = r.documentElement) ? r.namespaceURI : Ta(null, "");
        break;
      default:
        n = n === 8 ? r.parentNode : r, r = n.namespaceURI || null, n = n.tagName, r = Ta(r, n);
    }
    sn(Zi), Je(Zi, r);
  }
  function ru() {
    sn(Zi), sn(sc), sn(cc);
  }
  function Em(n) {
    nu(cc.current);
    var r = nu(Zi.current), o = Ta(r, n.type);
    r !== o && (Je(sc, n), Je(Zi, o));
  }
  function Bf(n) {
    sc.current === n && (sn(Zi), sn(sc));
  }
  var Cn = Wa(0);
  function Vf(n) {
    for (var r = n; r !== null; ) {
      if (r.tag === 13) {
        var o = r.memoizedState;
        if (o !== null && (o = o.dehydrated, o === null || o.data === "$?" || o.data === "$!")) return r;
      } else if (r.tag === 19 && r.memoizedProps.revealOrder !== void 0) {
        if (r.flags & 128) return r;
      } else if (r.child !== null) {
        r.child.return = r, r = r.child;
        continue;
      }
      if (r === n) break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === n) return null;
        r = r.return;
      }
      r.sibling.return = r.return, r = r.sibling;
    }
    return null;
  }
  var fc = [];
  function et() {
    for (var n = 0; n < fc.length; n++) fc[n]._workInProgressVersionPrimary = null;
    fc.length = 0;
  }
  var xt = ie.ReactCurrentDispatcher, jt = ie.ReactCurrentBatchConfig, en = 0, Ht = null, In = null, ur = null, If = !1, dc = !1, au = 0, ve = 0;
  function Ut() {
    throw Error(s(321));
  }
  function st(n, r) {
    if (r === null) return !1;
    for (var o = 0; o < r.length && o < n.length; o++) if (!Ei(n[o], r[o])) return !1;
    return !0;
  }
  function fo(n, r, o, c, v, g) {
    if (en = g, Ht = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, xt.current = n === null || n.memoizedState === null ? ad : gc, n = o(c, v), dc) {
      g = 0;
      do {
        if (dc = !1, au = 0, 25 <= g) throw Error(s(301));
        g += 1, ur = In = null, r.updateQueue = null, xt.current = id, n = o(c, v);
      } while (dc);
    }
    if (xt.current = su, r = In !== null && In.next !== null, en = 0, ur = In = Ht = null, If = !1, r) throw Error(s(300));
    return n;
  }
  function wi() {
    var n = au !== 0;
    return au = 0, n;
  }
  function Nr() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return ur === null ? Ht.memoizedState = ur = n : ur = ur.next = n, ur;
  }
  function On() {
    if (In === null) {
      var n = Ht.alternate;
      n = n !== null ? n.memoizedState : null;
    } else n = In.next;
    var r = ur === null ? Ht.memoizedState : ur.next;
    if (r !== null) ur = r, In = n;
    else {
      if (n === null) throw Error(s(310));
      In = n, n = { memoizedState: In.memoizedState, baseState: In.baseState, baseQueue: In.baseQueue, queue: In.queue, next: null }, ur === null ? Ht.memoizedState = ur = n : ur = ur.next = n;
    }
    return ur;
  }
  function kl(n, r) {
    return typeof r == "function" ? r(n) : r;
  }
  function po(n) {
    var r = On(), o = r.queue;
    if (o === null) throw Error(s(311));
    o.lastRenderedReducer = n;
    var c = In, v = c.baseQueue, g = o.pending;
    if (g !== null) {
      if (v !== null) {
        var b = v.next;
        v.next = g.next, g.next = b;
      }
      c.baseQueue = v = g, o.pending = null;
    }
    if (v !== null) {
      g = v.next, c = c.baseState;
      var N = b = null, F = null, J = g;
      do {
        var _e = J.lane;
        if ((en & _e) === _e) F !== null && (F = F.next = { lane: 0, action: J.action, hasEagerState: J.hasEagerState, eagerState: J.eagerState, next: null }), c = J.hasEagerState ? J.eagerState : n(c, J.action);
        else {
          var Ee = {
            lane: _e,
            action: J.action,
            hasEagerState: J.hasEagerState,
            eagerState: J.eagerState,
            next: null
          };
          F === null ? (N = F = Ee, b = c) : F = F.next = Ee, Ht.lanes |= _e, rl |= _e;
        }
        J = J.next;
      } while (J !== null && J !== g);
      F === null ? b = c : F.next = N, Ei(c, r.memoizedState) || (Yn = !0), r.memoizedState = c, r.baseState = b, r.baseQueue = F, o.lastRenderedState = c;
    }
    if (n = o.interleaved, n !== null) {
      v = n;
      do
        g = v.lane, Ht.lanes |= g, rl |= g, v = v.next;
      while (v !== n);
    } else v === null && (o.lanes = 0);
    return [r.memoizedState, o.dispatch];
  }
  function iu(n) {
    var r = On(), o = r.queue;
    if (o === null) throw Error(s(311));
    o.lastRenderedReducer = n;
    var c = o.dispatch, v = o.pending, g = r.memoizedState;
    if (v !== null) {
      o.pending = null;
      var b = v = v.next;
      do
        g = n(g, b.action), b = b.next;
      while (b !== v);
      Ei(g, r.memoizedState) || (Yn = !0), r.memoizedState = g, r.baseQueue === null && (r.baseState = g), o.lastRenderedState = g;
    }
    return [g, c];
  }
  function Yf() {
  }
  function Wf(n, r) {
    var o = Ht, c = On(), v = r(), g = !Ei(c.memoizedState, v);
    if (g && (c.memoizedState = v, Yn = !0), c = c.queue, pc(Qf.bind(null, o, c, n), [n]), c.getSnapshot !== r || g || ur !== null && ur.memoizedState.tag & 1) {
      if (o.flags |= 2048, lu(9, Gf.bind(null, o, c, v, r), void 0, null), nr === null) throw Error(s(349));
      en & 30 || $f(o, r, v);
    }
    return v;
  }
  function $f(n, r, o) {
    n.flags |= 16384, n = { getSnapshot: r, value: o }, r = Ht.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Ht.updateQueue = r, r.stores = [n]) : (o = r.stores, o === null ? r.stores = [n] : o.push(n));
  }
  function Gf(n, r, o, c) {
    r.value = o, r.getSnapshot = c, qf(r) && Xf(n);
  }
  function Qf(n, r, o) {
    return o(function() {
      qf(r) && Xf(n);
    });
  }
  function qf(n) {
    var r = n.getSnapshot;
    n = n.value;
    try {
      var o = r();
      return !Ei(n, o);
    } catch {
      return !0;
    }
  }
  function Xf(n) {
    var r = Da(n, 1);
    r !== null && $r(r, n, 1, -1);
  }
  function Kf(n) {
    var r = Nr();
    return typeof n == "function" && (n = n()), r.memoizedState = r.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: kl, lastRenderedState: n }, r.queue = n, n = n.dispatch = uu.bind(null, Ht, n), [r.memoizedState, n];
  }
  function lu(n, r, o, c) {
    return n = { tag: n, create: r, destroy: o, deps: c, next: null }, r = Ht.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Ht.updateQueue = r, r.lastEffect = n.next = n) : (o = r.lastEffect, o === null ? r.lastEffect = n.next = n : (c = o.next, o.next = n, n.next = c, r.lastEffect = n)), n;
  }
  function Jf() {
    return On().memoizedState;
  }
  function rs(n, r, o, c) {
    var v = Nr();
    Ht.flags |= n, v.memoizedState = lu(1 | r, o, void 0, c === void 0 ? null : c);
  }
  function as(n, r, o, c) {
    var v = On();
    c = c === void 0 ? null : c;
    var g = void 0;
    if (In !== null) {
      var b = In.memoizedState;
      if (g = b.destroy, c !== null && st(c, b.deps)) {
        v.memoizedState = lu(r, o, g, c);
        return;
      }
    }
    Ht.flags |= n, v.memoizedState = lu(1 | r, o, g, c);
  }
  function Zf(n, r) {
    return rs(8390656, 8, n, r);
  }
  function pc(n, r) {
    return as(2048, 8, n, r);
  }
  function ed(n, r) {
    return as(4, 2, n, r);
  }
  function hc(n, r) {
    return as(4, 4, n, r);
  }
  function ou(n, r) {
    if (typeof r == "function") return n = n(), r(n), function() {
      r(null);
    };
    if (r != null) return n = n(), r.current = n, function() {
      r.current = null;
    };
  }
  function td(n, r, o) {
    return o = o != null ? o.concat([n]) : null, as(4, 4, ou.bind(null, r, n), o);
  }
  function vc() {
  }
  function nd(n, r) {
    var o = On();
    r = r === void 0 ? null : r;
    var c = o.memoizedState;
    return c !== null && r !== null && st(r, c[1]) ? c[0] : (o.memoizedState = [n, r], n);
  }
  function rd(n, r) {
    var o = On();
    r = r === void 0 ? null : r;
    var c = o.memoizedState;
    return c !== null && r !== null && st(r, c[1]) ? c[0] : (n = n(), o.memoizedState = [n, r], n);
  }
  function qp(n, r, o) {
    return en & 21 ? (Ei(o, r) || (o = Fu(), Ht.lanes |= o, rl |= o, n.baseState = !0), r) : (n.baseState && (n.baseState = !1, Yn = !0), n.memoizedState = o);
  }
  function mc(n, r) {
    var o = Pt;
    Pt = o !== 0 && 4 > o ? o : 4, n(!0);
    var c = jt.transition;
    jt.transition = {};
    try {
      n(!1), r();
    } finally {
      Pt = o, jt.transition = c;
    }
  }
  function Xp() {
    return On().memoizedState;
  }
  function yc(n, r, o) {
    var c = al(n);
    if (o = { lane: c, action: o, hasEagerState: !1, eagerState: null, next: null }, fa(n)) Cm(r, o);
    else if (o = Wp(n, r, o, c), o !== null) {
      var v = Gn();
      $r(o, n, c, v), rn(o, r, c);
    }
  }
  function uu(n, r, o) {
    var c = al(n), v = { lane: c, action: o, hasEagerState: !1, eagerState: null, next: null };
    if (fa(n)) Cm(r, v);
    else {
      var g = n.alternate;
      if (n.lanes === 0 && (g === null || g.lanes === 0) && (g = r.lastRenderedReducer, g !== null)) try {
        var b = r.lastRenderedState, N = g(b, o);
        if (v.hasEagerState = !0, v.eagerState = N, Ei(N, b)) {
          var F = r.interleaved;
          F === null ? (v.next = v, Yp(r)) : (v.next = F.next, F.next = v), r.interleaved = v;
          return;
        }
      } catch {
      } finally {
      }
      o = Wp(n, r, v, c), o !== null && (v = Gn(), $r(o, n, c, v), rn(o, r, c));
    }
  }
  function fa(n) {
    var r = n.alternate;
    return n === Ht || r !== null && r === Ht;
  }
  function Cm(n, r) {
    dc = If = !0;
    var o = n.pending;
    o === null ? r.next = r : (r.next = o.next, o.next = r), n.pending = r;
  }
  function rn(n, r, o) {
    if (o & 4194240) {
      var c = r.lanes;
      c &= n.pendingLanes, o |= c, r.lanes = o, gl(n, o);
    }
  }
  var su = { readContext: Qa, useCallback: Ut, useContext: Ut, useEffect: Ut, useImperativeHandle: Ut, useInsertionEffect: Ut, useLayoutEffect: Ut, useMemo: Ut, useReducer: Ut, useRef: Ut, useState: Ut, useDebugValue: Ut, useDeferredValue: Ut, useTransition: Ut, useMutableSource: Ut, useSyncExternalStore: Ut, useId: Ut, unstable_isNewReconciler: !1 }, ad = { readContext: Qa, useCallback: function(n, r) {
    return Nr().memoizedState = [n, r === void 0 ? null : r], n;
  }, useContext: Qa, useEffect: Zf, useImperativeHandle: function(n, r, o) {
    return o = o != null ? o.concat([n]) : null, rs(
      4194308,
      4,
      ou.bind(null, r, n),
      o
    );
  }, useLayoutEffect: function(n, r) {
    return rs(4194308, 4, n, r);
  }, useInsertionEffect: function(n, r) {
    return rs(4, 2, n, r);
  }, useMemo: function(n, r) {
    var o = Nr();
    return r = r === void 0 ? null : r, n = n(), o.memoizedState = [n, r], n;
  }, useReducer: function(n, r, o) {
    var c = Nr();
    return r = o !== void 0 ? o(r) : r, c.memoizedState = c.baseState = r, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: r }, c.queue = n, n = n.dispatch = yc.bind(null, Ht, n), [c.memoizedState, n];
  }, useRef: function(n) {
    var r = Nr();
    return n = { current: n }, r.memoizedState = n;
  }, useState: Kf, useDebugValue: vc, useDeferredValue: function(n) {
    return Nr().memoizedState = n;
  }, useTransition: function() {
    var n = Kf(!1), r = n[0];
    return n = mc.bind(null, n[1]), Nr().memoizedState = n, [r, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, r, o) {
    var c = Ht, v = Nr();
    if (mn) {
      if (o === void 0) throw Error(s(407));
      o = o();
    } else {
      if (o = r(), nr === null) throw Error(s(349));
      en & 30 || $f(c, r, o);
    }
    v.memoizedState = o;
    var g = { value: o, getSnapshot: r };
    return v.queue = g, Zf(Qf.bind(
      null,
      c,
      g,
      n
    ), [n]), c.flags |= 2048, lu(9, Gf.bind(null, c, g, o, r), void 0, null), o;
  }, useId: function() {
    var n = Nr(), r = nr.identifierPrefix;
    if (mn) {
      var o = Ji, c = Ki;
      o = (c & ~(1 << 32 - Hr(c) - 1)).toString(32) + o, r = ":" + r + "R" + o, o = au++, 0 < o && (r += "H" + o.toString(32)), r += ":";
    } else o = ve++, r = ":" + r + "r" + o.toString(32) + ":";
    return n.memoizedState = r;
  }, unstable_isNewReconciler: !1 }, gc = {
    readContext: Qa,
    useCallback: nd,
    useContext: Qa,
    useEffect: pc,
    useImperativeHandle: td,
    useInsertionEffect: ed,
    useLayoutEffect: hc,
    useMemo: rd,
    useReducer: po,
    useRef: Jf,
    useState: function() {
      return po(kl);
    },
    useDebugValue: vc,
    useDeferredValue: function(n) {
      var r = On();
      return qp(r, In.memoizedState, n);
    },
    useTransition: function() {
      var n = po(kl)[0], r = On().memoizedState;
      return [n, r];
    },
    useMutableSource: Yf,
    useSyncExternalStore: Wf,
    useId: Xp,
    unstable_isNewReconciler: !1
  }, id = { readContext: Qa, useCallback: nd, useContext: Qa, useEffect: pc, useImperativeHandle: td, useInsertionEffect: ed, useLayoutEffect: hc, useMemo: rd, useReducer: iu, useRef: Jf, useState: function() {
    return iu(kl);
  }, useDebugValue: vc, useDeferredValue: function(n) {
    var r = On();
    return In === null ? r.memoizedState = n : qp(r, In.memoizedState, n);
  }, useTransition: function() {
    var n = iu(kl)[0], r = On().memoizedState;
    return [n, r];
  }, useMutableSource: Yf, useSyncExternalStore: Wf, useId: Xp, unstable_isNewReconciler: !1 };
  function Ti(n, r) {
    if (n && n.defaultProps) {
      r = me({}, r), n = n.defaultProps;
      for (var o in n) r[o] === void 0 && (r[o] = n[o]);
      return r;
    }
    return r;
  }
  function Kp(n, r, o, c) {
    r = n.memoizedState, o = o(c, r), o = o == null ? r : me({}, r, o), n.memoizedState = o, n.lanes === 0 && (n.updateQueue.baseState = o);
  }
  var ld = { isMounted: function(n) {
    return (n = n._reactInternals) ? yt(n) === n : !1;
  }, enqueueSetState: function(n, r, o) {
    n = n._reactInternals;
    var c = Gn(), v = al(n), g = Rl(c, v);
    g.payload = r, o != null && (g.callback = o), r = co(n, g, v), r !== null && ($r(r, n, v, c), Hf(r, n, v));
  }, enqueueReplaceState: function(n, r, o) {
    n = n._reactInternals;
    var c = Gn(), v = al(n), g = Rl(c, v);
    g.tag = 1, g.payload = r, o != null && (g.callback = o), r = co(n, g, v), r !== null && ($r(r, n, v, c), Hf(r, n, v));
  }, enqueueForceUpdate: function(n, r) {
    n = n._reactInternals;
    var o = Gn(), c = al(n), v = Rl(o, c);
    v.tag = 2, r != null && (v.callback = r), r = co(n, v, c), r !== null && ($r(r, n, c, o), Hf(r, n, c));
  } };
  function wm(n, r, o, c, v, g, b) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(c, g, b) : r.prototype && r.prototype.isPureReactComponent ? !Ks(o, c) || !Ks(v, g) : !0;
  }
  function od(n, r, o) {
    var c = !1, v = Lr, g = r.contextType;
    return typeof g == "object" && g !== null ? g = Qa(g) : (v = Bn(r) ? la : Tn.current, c = r.contextTypes, g = (c = c != null) ? oa(n, v) : Lr), r = new r(o, g), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = ld, n.stateNode = r, r._reactInternals = n, c && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = v, n.__reactInternalMemoizedMaskedChildContext = g), r;
  }
  function Tm(n, r, o, c) {
    n = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(o, c), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(o, c), r.state !== n && ld.enqueueReplaceState(r, r.state, null);
  }
  function _c(n, r, o, c) {
    var v = n.stateNode;
    v.props = o, v.state = n.memoizedState, v.refs = {}, $p(n);
    var g = r.contextType;
    typeof g == "object" && g !== null ? v.context = Qa(g) : (g = Bn(r) ? la : Tn.current, v.context = oa(n, g)), v.state = n.memoizedState, g = r.getDerivedStateFromProps, typeof g == "function" && (Kp(n, r, g, o), v.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof v.getSnapshotBeforeUpdate == "function" || typeof v.UNSAFE_componentWillMount != "function" && typeof v.componentWillMount != "function" || (r = v.state, typeof v.componentWillMount == "function" && v.componentWillMount(), typeof v.UNSAFE_componentWillMount == "function" && v.UNSAFE_componentWillMount(), r !== v.state && ld.enqueueReplaceState(v, v.state, null), oc(n, o, v, c), v.state = n.memoizedState), typeof v.componentDidMount == "function" && (n.flags |= 4194308);
  }
  function cu(n, r) {
    try {
      var o = "", c = r;
      do
        o += Qe(c), c = c.return;
      while (c);
      var v = o;
    } catch (g) {
      v = `
Error generating stack: ` + g.message + `
` + g.stack;
    }
    return { value: n, source: r, stack: v, digest: null };
  }
  function Jp(n, r, o) {
    return { value: n, source: null, stack: o ?? null, digest: r ?? null };
  }
  function Zp(n, r) {
    try {
      console.error(r.value);
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  var ud = typeof WeakMap == "function" ? WeakMap : Map;
  function xm(n, r, o) {
    o = Rl(-1, o), o.tag = 3, o.payload = { element: null };
    var c = r.value;
    return o.callback = function() {
      cs || (cs = !0, pu = c), Zp(n, r);
    }, o;
  }
  function eh(n, r, o) {
    o = Rl(-1, o), o.tag = 3;
    var c = n.type.getDerivedStateFromError;
    if (typeof c == "function") {
      var v = r.value;
      o.payload = function() {
        return c(v);
      }, o.callback = function() {
        Zp(n, r);
      };
    }
    var g = n.stateNode;
    return g !== null && typeof g.componentDidCatch == "function" && (o.callback = function() {
      Zp(n, r), typeof c != "function" && (mo === null ? mo = /* @__PURE__ */ new Set([this]) : mo.add(this));
      var b = r.stack;
      this.componentDidCatch(r.value, { componentStack: b !== null ? b : "" });
    }), o;
  }
  function th(n, r, o) {
    var c = n.pingCache;
    if (c === null) {
      c = n.pingCache = new ud();
      var v = /* @__PURE__ */ new Set();
      c.set(r, v);
    } else v = c.get(r), v === void 0 && (v = /* @__PURE__ */ new Set(), c.set(r, v));
    v.has(o) || (v.add(o), n = S0.bind(null, n, r, o), r.then(n, n));
  }
  function bm(n) {
    do {
      var r;
      if ((r = n.tag === 13) && (r = n.memoizedState, r = r !== null ? r.dehydrated !== null : !0), r) return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function ho(n, r, o, c, v) {
    return n.mode & 1 ? (n.flags |= 65536, n.lanes = v, n) : (n === r ? n.flags |= 65536 : (n.flags |= 128, o.flags |= 131072, o.flags &= -52805, o.tag === 1 && (o.alternate === null ? o.tag = 17 : (r = Rl(-1, 1), r.tag = 2, co(o, r, 1))), o.lanes |= 1), n);
  }
  var Sc = ie.ReactCurrentOwner, Yn = !1;
  function gr(n, r, o, c) {
    r.child = n === null ? Me(r, null, o, c) : Dn(r, n.child, o, c);
  }
  function da(n, r, o, c, v) {
    o = o.render;
    var g = r.ref;
    return En(r, v), c = fo(n, r, o, c, g, v), o = wi(), n !== null && !Yn ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~v, Xa(n, r, v)) : (mn && o && Uf(r), r.flags |= 1, gr(n, r, c, v), r.child);
  }
  function fu(n, r, o, c, v) {
    if (n === null) {
      var g = o.type;
      return typeof g == "function" && !vh(g) && g.defaultProps === void 0 && o.compare === null && o.defaultProps === void 0 ? (r.tag = 15, r.type = g, _t(n, r, g, c, v)) : (n = Uc(o.type, null, c, r, r.mode, v), n.ref = r.ref, n.return = r, r.child = n);
    }
    if (g = n.child, !(n.lanes & v)) {
      var b = g.memoizedProps;
      if (o = o.compare, o = o !== null ? o : Ks, o(b, c) && n.ref === r.ref) return Xa(n, r, v);
    }
    return r.flags |= 1, n = go(g, c), n.ref = r.ref, n.return = r, r.child = n;
  }
  function _t(n, r, o, c, v) {
    if (n !== null) {
      var g = n.memoizedProps;
      if (Ks(g, c) && n.ref === r.ref) if (Yn = !1, r.pendingProps = c = g, (n.lanes & v) !== 0) n.flags & 131072 && (Yn = !0);
      else return r.lanes = n.lanes, Xa(n, r, v);
    }
    return Rm(n, r, o, c, v);
  }
  function Ec(n, r, o) {
    var c = r.pendingProps, v = c.children, g = n !== null ? n.memoizedState : null;
    if (c.mode === "hidden") if (!(r.mode & 1)) r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Je(os, Ma), Ma |= o;
    else {
      if (!(o & 1073741824)) return n = g !== null ? g.baseLanes | o : o, r.lanes = r.childLanes = 1073741824, r.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, r.updateQueue = null, Je(os, Ma), Ma |= n, null;
      r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, c = g !== null ? g.baseLanes : o, Je(os, Ma), Ma |= c;
    }
    else g !== null ? (c = g.baseLanes | o, r.memoizedState = null) : c = o, Je(os, Ma), Ma |= c;
    return gr(n, r, v, o), r.child;
  }
  function nh(n, r) {
    var o = r.ref;
    (n === null && o !== null || n !== null && n.ref !== o) && (r.flags |= 512, r.flags |= 2097152);
  }
  function Rm(n, r, o, c, v) {
    var g = Bn(o) ? la : Tn.current;
    return g = oa(r, g), En(r, v), o = fo(n, r, o, c, g, v), c = wi(), n !== null && !Yn ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~v, Xa(n, r, v)) : (mn && c && Uf(r), r.flags |= 1, gr(n, r, o, v), r.child);
  }
  function km(n, r, o, c, v) {
    if (Bn(o)) {
      var g = !0;
      or(r);
    } else g = !1;
    if (En(r, v), r.stateNode === null) qa(n, r), od(r, o, c), _c(r, o, c, v), c = !0;
    else if (n === null) {
      var b = r.stateNode, N = r.memoizedProps;
      b.props = N;
      var F = b.context, J = o.contextType;
      typeof J == "object" && J !== null ? J = Qa(J) : (J = Bn(o) ? la : Tn.current, J = oa(r, J));
      var _e = o.getDerivedStateFromProps, Ee = typeof _e == "function" || typeof b.getSnapshotBeforeUpdate == "function";
      Ee || typeof b.UNSAFE_componentWillReceiveProps != "function" && typeof b.componentWillReceiveProps != "function" || (N !== c || F !== J) && Tm(r, b, c, J), Oa = !1;
      var ye = r.memoizedState;
      b.state = ye, oc(r, c, b, v), F = r.memoizedState, N !== c || ye !== F || er.current || Oa ? (typeof _e == "function" && (Kp(r, o, _e, c), F = r.memoizedState), (N = Oa || wm(r, o, N, c, ye, F, J)) ? (Ee || typeof b.UNSAFE_componentWillMount != "function" && typeof b.componentWillMount != "function" || (typeof b.componentWillMount == "function" && b.componentWillMount(), typeof b.UNSAFE_componentWillMount == "function" && b.UNSAFE_componentWillMount()), typeof b.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof b.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = c, r.memoizedState = F), b.props = c, b.state = F, b.context = J, c = N) : (typeof b.componentDidMount == "function" && (r.flags |= 4194308), c = !1);
    } else {
      b = r.stateNode, _m(n, r), N = r.memoizedProps, J = r.type === r.elementType ? N : Ti(r.type, N), b.props = J, Ee = r.pendingProps, ye = b.context, F = o.contextType, typeof F == "object" && F !== null ? F = Qa(F) : (F = Bn(o) ? la : Tn.current, F = oa(r, F));
      var Ae = o.getDerivedStateFromProps;
      (_e = typeof Ae == "function" || typeof b.getSnapshotBeforeUpdate == "function") || typeof b.UNSAFE_componentWillReceiveProps != "function" && typeof b.componentWillReceiveProps != "function" || (N !== Ee || ye !== F) && Tm(r, b, c, F), Oa = !1, ye = r.memoizedState, b.state = ye, oc(r, c, b, v);
      var He = r.memoizedState;
      N !== Ee || ye !== He || er.current || Oa ? (typeof Ae == "function" && (Kp(r, o, Ae, c), He = r.memoizedState), (J = Oa || wm(r, o, J, c, ye, He, F) || !1) ? (_e || typeof b.UNSAFE_componentWillUpdate != "function" && typeof b.componentWillUpdate != "function" || (typeof b.componentWillUpdate == "function" && b.componentWillUpdate(c, He, F), typeof b.UNSAFE_componentWillUpdate == "function" && b.UNSAFE_componentWillUpdate(c, He, F)), typeof b.componentDidUpdate == "function" && (r.flags |= 4), typeof b.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof b.componentDidUpdate != "function" || N === n.memoizedProps && ye === n.memoizedState || (r.flags |= 4), typeof b.getSnapshotBeforeUpdate != "function" || N === n.memoizedProps && ye === n.memoizedState || (r.flags |= 1024), r.memoizedProps = c, r.memoizedState = He), b.props = c, b.state = He, b.context = F, c = J) : (typeof b.componentDidUpdate != "function" || N === n.memoizedProps && ye === n.memoizedState || (r.flags |= 4), typeof b.getSnapshotBeforeUpdate != "function" || N === n.memoizedProps && ye === n.memoizedState || (r.flags |= 1024), c = !1);
    }
    return Cc(n, r, o, c, g, v);
  }
  function Cc(n, r, o, c, v, g) {
    nh(n, r);
    var b = (r.flags & 128) !== 0;
    if (!c && !b) return v && Af(r, o, !1), Xa(n, r, g);
    c = r.stateNode, Sc.current = r;
    var N = b && typeof o.getDerivedStateFromError != "function" ? null : c.render();
    return r.flags |= 1, n !== null && b ? (r.child = Dn(r, n.child, null, g), r.child = Dn(r, null, N, g)) : gr(n, r, N, g), r.memoizedState = c.state, v && Af(r, o, !0), r.child;
  }
  function is(n) {
    var r = n.stateNode;
    r.pendingContext ? vm(n, r.pendingContext, r.pendingContext !== r.context) : r.context && vm(n, r.context, !1), Qp(n, r.containerInfo);
  }
  function Dm(n, r, o, c, v) {
    return so(), bl(v), r.flags |= 256, gr(n, r, o, c), r.child;
  }
  var sd = { dehydrated: null, treeContext: null, retryLane: 0 };
  function rh(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function cd(n, r, o) {
    var c = r.pendingProps, v = Cn.current, g = !1, b = (r.flags & 128) !== 0, N;
    if ((N = b) || (N = n !== null && n.memoizedState === null ? !1 : (v & 2) !== 0), N ? (g = !0, r.flags &= -129) : (n === null || n.memoizedState !== null) && (v |= 1), Je(Cn, v & 1), n === null)
      return jp(r), n = r.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? (r.mode & 1 ? n.data === "$!" ? r.lanes = 8 : r.lanes = 1073741824 : r.lanes = 1, null) : (b = c.children, n = c.fallback, g ? (c = r.mode, g = r.child, b = { mode: "hidden", children: b }, !(c & 1) && g !== null ? (g.childLanes = 0, g.pendingProps = b) : g = _o(b, c, 0, null), n = Ll(n, c, o, null), g.return = r, n.return = r, g.sibling = n, r.child = g, r.child.memoizedState = rh(o), r.memoizedState = sd, n) : ah(r, b));
    if (v = n.memoizedState, v !== null && (N = v.dehydrated, N !== null)) return Om(n, r, b, c, N, v, o);
    if (g) {
      g = c.fallback, b = r.mode, v = n.child, N = v.sibling;
      var F = { mode: "hidden", children: c.children };
      return !(b & 1) && r.child !== v ? (c = r.child, c.childLanes = 0, c.pendingProps = F, r.deletions = null) : (c = go(v, F), c.subtreeFlags = v.subtreeFlags & 14680064), N !== null ? g = go(N, g) : (g = Ll(g, b, o, null), g.flags |= 2), g.return = r, c.return = r, c.sibling = g, r.child = c, c = g, g = r.child, b = n.child.memoizedState, b = b === null ? rh(o) : { baseLanes: b.baseLanes | o, cachePool: null, transitions: b.transitions }, g.memoizedState = b, g.childLanes = n.childLanes & ~o, r.memoizedState = sd, c;
    }
    return g = n.child, n = g.sibling, c = go(g, { mode: "visible", children: c.children }), !(r.mode & 1) && (c.lanes = o), c.return = r, c.sibling = null, n !== null && (o = r.deletions, o === null ? (r.deletions = [n], r.flags |= 16) : o.push(n)), r.child = c, r.memoizedState = null, c;
  }
  function ah(n, r) {
    return r = _o({ mode: "visible", children: r }, n.mode, 0, null), r.return = n, n.child = r;
  }
  function wc(n, r, o, c) {
    return c !== null && bl(c), Dn(r, n.child, null, o), n = ah(r, r.pendingProps.children), n.flags |= 2, r.memoizedState = null, n;
  }
  function Om(n, r, o, c, v, g, b) {
    if (o)
      return r.flags & 256 ? (r.flags &= -257, c = Jp(Error(s(422))), wc(n, r, b, c)) : r.memoizedState !== null ? (r.child = n.child, r.flags |= 128, null) : (g = c.fallback, v = r.mode, c = _o({ mode: "visible", children: c.children }, v, 0, null), g = Ll(g, v, b, null), g.flags |= 2, c.return = r, g.return = r, c.sibling = g, r.child = c, r.mode & 1 && Dn(r, n.child, null, b), r.child.memoizedState = rh(b), r.memoizedState = sd, g);
    if (!(r.mode & 1)) return wc(n, r, b, null);
    if (v.data === "$!") {
      if (c = v.nextSibling && v.nextSibling.dataset, c) var N = c.dgst;
      return c = N, g = Error(s(419)), c = Jp(g, c, void 0), wc(n, r, b, c);
    }
    if (N = (b & n.childLanes) !== 0, Yn || N) {
      if (c = nr, c !== null) {
        switch (b & -b) {
          case 4:
            v = 2;
            break;
          case 16:
            v = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            v = 32;
            break;
          case 536870912:
            v = 268435456;
            break;
          default:
            v = 0;
        }
        v = v & (c.suspendedLanes | b) ? 0 : v, v !== 0 && v !== g.retryLane && (g.retryLane = v, Da(n, v), $r(c, n, v, -1));
      }
      return hh(), c = Jp(Error(s(421))), wc(n, r, b, c);
    }
    return v.data === "$?" ? (r.flags |= 128, r.child = n.child, r = E0.bind(null, n), v._reactRetry = r, null) : (n = g.treeContext, sa = Gi(v.nextSibling), ua = r, mn = !0, Ga = null, n !== null && (Vn[$a++] = Ki, Vn[$a++] = Ji, Vn[$a++] = Ra, Ki = n.id, Ji = n.overflow, Ra = r), r = ah(r, c.children), r.flags |= 4096, r);
  }
  function ih(n, r, o) {
    n.lanes |= r;
    var c = n.alternate;
    c !== null && (c.lanes |= r), Ip(n.return, r, o);
  }
  function Ir(n, r, o, c, v) {
    var g = n.memoizedState;
    g === null ? n.memoizedState = { isBackwards: r, rendering: null, renderingStartTime: 0, last: c, tail: o, tailMode: v } : (g.isBackwards = r, g.rendering = null, g.renderingStartTime = 0, g.last = c, g.tail = o, g.tailMode = v);
  }
  function el(n, r, o) {
    var c = r.pendingProps, v = c.revealOrder, g = c.tail;
    if (gr(n, r, c.children, o), c = Cn.current, c & 2) c = c & 1 | 2, r.flags |= 128;
    else {
      if (n !== null && n.flags & 128) e: for (n = r.child; n !== null; ) {
        if (n.tag === 13) n.memoizedState !== null && ih(n, o, r);
        else if (n.tag === 19) ih(n, o, r);
        else if (n.child !== null) {
          n.child.return = n, n = n.child;
          continue;
        }
        if (n === r) break e;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === r) break e;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
      c &= 1;
    }
    if (Je(Cn, c), !(r.mode & 1)) r.memoizedState = null;
    else switch (v) {
      case "forwards":
        for (o = r.child, v = null; o !== null; ) n = o.alternate, n !== null && Vf(n) === null && (v = o), o = o.sibling;
        o = v, o === null ? (v = r.child, r.child = null) : (v = o.sibling, o.sibling = null), Ir(r, !1, v, o, g);
        break;
      case "backwards":
        for (o = null, v = r.child, r.child = null; v !== null; ) {
          if (n = v.alternate, n !== null && Vf(n) === null) {
            r.child = v;
            break;
          }
          n = v.sibling, v.sibling = o, o = v, v = n;
        }
        Ir(r, !0, o, null, g);
        break;
      case "together":
        Ir(r, !1, null, null, void 0);
        break;
      default:
        r.memoizedState = null;
    }
    return r.child;
  }
  function qa(n, r) {
    !(r.mode & 1) && n !== null && (n.alternate = null, r.alternate = null, r.flags |= 2);
  }
  function Xa(n, r, o) {
    if (n !== null && (r.dependencies = n.dependencies), rl |= r.lanes, !(o & r.childLanes)) return null;
    if (n !== null && r.child !== n.child) throw Error(s(153));
    if (r.child !== null) {
      for (n = r.child, o = go(n, n.pendingProps), r.child = o, o.return = r; n.sibling !== null; ) n = n.sibling, o = o.sibling = go(n, n.pendingProps), o.return = r;
      o.sibling = null;
    }
    return r.child;
  }
  function Tc(n, r, o) {
    switch (r.tag) {
      case 3:
        is(r), so();
        break;
      case 5:
        Em(r);
        break;
      case 1:
        Bn(r.type) && or(r);
        break;
      case 4:
        Qp(r, r.stateNode.containerInfo);
        break;
      case 10:
        var c = r.type._context, v = r.memoizedProps.value;
        Je(ka, c._currentValue), c._currentValue = v;
        break;
      case 13:
        if (c = r.memoizedState, c !== null)
          return c.dehydrated !== null ? (Je(Cn, Cn.current & 1), r.flags |= 128, null) : o & r.child.childLanes ? cd(n, r, o) : (Je(Cn, Cn.current & 1), n = Xa(n, r, o), n !== null ? n.sibling : null);
        Je(Cn, Cn.current & 1);
        break;
      case 19:
        if (c = (o & r.childLanes) !== 0, n.flags & 128) {
          if (c) return el(n, r, o);
          r.flags |= 128;
        }
        if (v = r.memoizedState, v !== null && (v.rendering = null, v.tail = null, v.lastEffect = null), Je(Cn, Cn.current), c) break;
        return null;
      case 22:
      case 23:
        return r.lanes = 0, Ec(n, r, o);
    }
    return Xa(n, r, o);
  }
  var Ka, Wn, Mm, Lm;
  Ka = function(n, r) {
    for (var o = r.child; o !== null; ) {
      if (o.tag === 5 || o.tag === 6) n.appendChild(o.stateNode);
      else if (o.tag !== 4 && o.child !== null) {
        o.child.return = o, o = o.child;
        continue;
      }
      if (o === r) break;
      for (; o.sibling === null; ) {
        if (o.return === null || o.return === r) return;
        o = o.return;
      }
      o.sibling.return = o.return, o = o.sibling;
    }
  }, Wn = function() {
  }, Mm = function(n, r, o, c) {
    var v = n.memoizedProps;
    if (v !== c) {
      n = r.stateNode, nu(Zi.current);
      var g = null;
      switch (o) {
        case "input":
          v = pr(n, v), c = pr(n, c), g = [];
          break;
        case "select":
          v = me({}, v, { value: void 0 }), c = me({}, c, { value: void 0 }), g = [];
          break;
        case "textarea":
          v = Jn(n, v), c = Jn(n, c), g = [];
          break;
        default:
          typeof v.onClick != "function" && typeof c.onClick == "function" && (n.onclick = ro);
      }
      cn(o, c);
      var b;
      o = null;
      for (J in v) if (!c.hasOwnProperty(J) && v.hasOwnProperty(J) && v[J] != null) if (J === "style") {
        var N = v[J];
        for (b in N) N.hasOwnProperty(b) && (o || (o = {}), o[b] = "");
      } else J !== "dangerouslySetInnerHTML" && J !== "children" && J !== "suppressContentEditableWarning" && J !== "suppressHydrationWarning" && J !== "autoFocus" && (p.hasOwnProperty(J) ? g || (g = []) : (g = g || []).push(J, null));
      for (J in c) {
        var F = c[J];
        if (N = v != null ? v[J] : void 0, c.hasOwnProperty(J) && F !== N && (F != null || N != null)) if (J === "style") if (N) {
          for (b in N) !N.hasOwnProperty(b) || F && F.hasOwnProperty(b) || (o || (o = {}), o[b] = "");
          for (b in F) F.hasOwnProperty(b) && N[b] !== F[b] && (o || (o = {}), o[b] = F[b]);
        } else o || (g || (g = []), g.push(
          J,
          o
        )), o = F;
        else J === "dangerouslySetInnerHTML" ? (F = F ? F.__html : void 0, N = N ? N.__html : void 0, F != null && N !== F && (g = g || []).push(J, F)) : J === "children" ? typeof F != "string" && typeof F != "number" || (g = g || []).push(J, "" + F) : J !== "suppressContentEditableWarning" && J !== "suppressHydrationWarning" && (p.hasOwnProperty(J) ? (F != null && J === "onScroll" && $t("scroll", n), g || N === F || (g = [])) : (g = g || []).push(J, F));
      }
      o && (g = g || []).push("style", o);
      var J = g;
      (r.updateQueue = J) && (r.flags |= 4);
    }
  }, Lm = function(n, r, o, c) {
    o !== c && (r.flags |= 4);
  };
  function xc(n, r) {
    if (!mn) switch (n.tailMode) {
      case "hidden":
        r = n.tail;
        for (var o = null; r !== null; ) r.alternate !== null && (o = r), r = r.sibling;
        o === null ? n.tail = null : o.sibling = null;
        break;
      case "collapsed":
        o = n.tail;
        for (var c = null; o !== null; ) o.alternate !== null && (c = o), o = o.sibling;
        c === null ? r || n.tail === null ? n.tail = null : n.tail.sibling = null : c.sibling = null;
    }
  }
  function sr(n) {
    var r = n.alternate !== null && n.alternate.child === n.child, o = 0, c = 0;
    if (r) for (var v = n.child; v !== null; ) o |= v.lanes | v.childLanes, c |= v.subtreeFlags & 14680064, c |= v.flags & 14680064, v.return = n, v = v.sibling;
    else for (v = n.child; v !== null; ) o |= v.lanes | v.childLanes, c |= v.subtreeFlags, c |= v.flags, v.return = n, v = v.sibling;
    return n.subtreeFlags |= c, n.childLanes = o, r;
  }
  function Nm(n, r, o) {
    var c = r.pendingProps;
    switch (Ff(r), r.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return sr(r), null;
      case 1:
        return Bn(r.type) && es(), sr(r), null;
      case 3:
        return c = r.stateNode, ru(), sn(er), sn(Tn), et(), c.pendingContext && (c.context = c.pendingContext, c.pendingContext = null), (n === null || n.child === null) && (Pf(r) ? r.flags |= 4 : n === null || n.memoizedState.isDehydrated && !(r.flags & 256) || (r.flags |= 1024, Ga !== null && (hu(Ga), Ga = null))), Wn(n, r), sr(r), null;
      case 5:
        Bf(r);
        var v = nu(cc.current);
        if (o = r.type, n !== null && r.stateNode != null) Mm(n, r, o, c, v), n.ref !== r.ref && (r.flags |= 512, r.flags |= 2097152);
        else {
          if (!c) {
            if (r.stateNode === null) throw Error(s(166));
            return sr(r), null;
          }
          if (n = nu(Zi.current), Pf(r)) {
            c = r.stateNode, o = r.type;
            var g = r.memoizedProps;
            switch (c[Qi] = r, c[rc] = g, n = (r.mode & 1) !== 0, o) {
              case "dialog":
                $t("cancel", c), $t("close", c);
                break;
              case "iframe":
              case "object":
              case "embed":
                $t("load", c);
                break;
              case "video":
              case "audio":
                for (v = 0; v < ec.length; v++) $t(ec[v], c);
                break;
              case "source":
                $t("error", c);
                break;
              case "img":
              case "image":
              case "link":
                $t(
                  "error",
                  c
                ), $t("load", c);
                break;
              case "details":
                $t("toggle", c);
                break;
              case "input":
                Xn(c, g), $t("invalid", c);
                break;
              case "select":
                c._wrapperState = { wasMultiple: !!g.multiple }, $t("invalid", c);
                break;
              case "textarea":
                Dr(c, g), $t("invalid", c);
            }
            cn(o, g), v = null;
            for (var b in g) if (g.hasOwnProperty(b)) {
              var N = g[b];
              b === "children" ? typeof N == "string" ? c.textContent !== N && (g.suppressHydrationWarning !== !0 && Of(c.textContent, N, n), v = ["children", N]) : typeof N == "number" && c.textContent !== "" + N && (g.suppressHydrationWarning !== !0 && Of(
                c.textContent,
                N,
                n
              ), v = ["children", "" + N]) : p.hasOwnProperty(b) && N != null && b === "onScroll" && $t("scroll", c);
            }
            switch (o) {
              case "input":
                Pn(c), Fi(c, g, !0);
                break;
              case "textarea":
                Pn(c), jn(c);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof g.onClick == "function" && (c.onclick = ro);
            }
            c = v, r.updateQueue = c, c !== null && (r.flags |= 4);
          } else {
            b = v.nodeType === 9 ? v : v.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = Or(o)), n === "http://www.w3.org/1999/xhtml" ? o === "script" ? (n = b.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof c.is == "string" ? n = b.createElement(o, { is: c.is }) : (n = b.createElement(o), o === "select" && (b = n, c.multiple ? b.multiple = !0 : c.size && (b.size = c.size))) : n = b.createElementNS(n, o), n[Qi] = r, n[rc] = c, Ka(n, r, !1, !1), r.stateNode = n;
            e: {
              switch (b = lr(o, c), o) {
                case "dialog":
                  $t("cancel", n), $t("close", n), v = c;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  $t("load", n), v = c;
                  break;
                case "video":
                case "audio":
                  for (v = 0; v < ec.length; v++) $t(ec[v], n);
                  v = c;
                  break;
                case "source":
                  $t("error", n), v = c;
                  break;
                case "img":
                case "image":
                case "link":
                  $t(
                    "error",
                    n
                  ), $t("load", n), v = c;
                  break;
                case "details":
                  $t("toggle", n), v = c;
                  break;
                case "input":
                  Xn(n, c), v = pr(n, c), $t("invalid", n);
                  break;
                case "option":
                  v = c;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!c.multiple }, v = me({}, c, { value: void 0 }), $t("invalid", n);
                  break;
                case "textarea":
                  Dr(n, c), v = Jn(n, c), $t("invalid", n);
                  break;
                default:
                  v = c;
              }
              cn(o, v), N = v;
              for (g in N) if (N.hasOwnProperty(g)) {
                var F = N[g];
                g === "style" ? an(n, F) : g === "dangerouslySetInnerHTML" ? (F = F ? F.__html : void 0, F != null && Pi(n, F)) : g === "children" ? typeof F == "string" ? (o !== "textarea" || F !== "") && Re(n, F) : typeof F == "number" && Re(n, "" + F) : g !== "suppressContentEditableWarning" && g !== "suppressHydrationWarning" && g !== "autoFocus" && (p.hasOwnProperty(g) ? F != null && g === "onScroll" && $t("scroll", n) : F != null && Q(n, g, F, b));
              }
              switch (o) {
                case "input":
                  Pn(n), Fi(n, c, !1);
                  break;
                case "textarea":
                  Pn(n), jn(n);
                  break;
                case "option":
                  c.value != null && n.setAttribute("value", "" + ct(c.value));
                  break;
                case "select":
                  n.multiple = !!c.multiple, g = c.value, g != null ? Rn(n, !!c.multiple, g, !1) : c.defaultValue != null && Rn(
                    n,
                    !!c.multiple,
                    c.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof v.onClick == "function" && (n.onclick = ro);
              }
              switch (o) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  c = !!c.autoFocus;
                  break e;
                case "img":
                  c = !0;
                  break e;
                default:
                  c = !1;
              }
            }
            c && (r.flags |= 4);
          }
          r.ref !== null && (r.flags |= 512, r.flags |= 2097152);
        }
        return sr(r), null;
      case 6:
        if (n && r.stateNode != null) Lm(n, r, n.memoizedProps, c);
        else {
          if (typeof c != "string" && r.stateNode === null) throw Error(s(166));
          if (o = nu(cc.current), nu(Zi.current), Pf(r)) {
            if (c = r.stateNode, o = r.memoizedProps, c[Qi] = r, (g = c.nodeValue !== o) && (n = ua, n !== null)) switch (n.tag) {
              case 3:
                Of(c.nodeValue, o, (n.mode & 1) !== 0);
                break;
              case 5:
                n.memoizedProps.suppressHydrationWarning !== !0 && Of(c.nodeValue, o, (n.mode & 1) !== 0);
            }
            g && (r.flags |= 4);
          } else c = (o.nodeType === 9 ? o : o.ownerDocument).createTextNode(c), c[Qi] = r, r.stateNode = c;
        }
        return sr(r), null;
      case 13:
        if (sn(Cn), c = r.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (mn && sa !== null && r.mode & 1 && !(r.flags & 128)) lc(), so(), r.flags |= 98560, g = !1;
          else if (g = Pf(r), c !== null && c.dehydrated !== null) {
            if (n === null) {
              if (!g) throw Error(s(318));
              if (g = r.memoizedState, g = g !== null ? g.dehydrated : null, !g) throw Error(s(317));
              g[Qi] = r;
            } else so(), !(r.flags & 128) && (r.memoizedState = null), r.flags |= 4;
            sr(r), g = !1;
          } else Ga !== null && (hu(Ga), Ga = null), g = !0;
          if (!g) return r.flags & 65536 ? r : null;
        }
        return r.flags & 128 ? (r.lanes = o, r) : (c = c !== null, c !== (n !== null && n.memoizedState !== null) && c && (r.child.flags |= 8192, r.mode & 1 && (n === null || Cn.current & 1 ? Ln === 0 && (Ln = 3) : hh())), r.updateQueue !== null && (r.flags |= 4), sr(r), null);
      case 4:
        return ru(), Wn(n, r), n === null && qu(r.stateNode.containerInfo), sr(r), null;
      case 10:
        return Vp(r.type._context), sr(r), null;
      case 17:
        return Bn(r.type) && es(), sr(r), null;
      case 19:
        if (sn(Cn), g = r.memoizedState, g === null) return sr(r), null;
        if (c = (r.flags & 128) !== 0, b = g.rendering, b === null) if (c) xc(g, !1);
        else {
          if (Ln !== 0 || n !== null && n.flags & 128) for (n = r.child; n !== null; ) {
            if (b = Vf(n), b !== null) {
              for (r.flags |= 128, xc(g, !1), c = b.updateQueue, c !== null && (r.updateQueue = c, r.flags |= 4), r.subtreeFlags = 0, c = o, o = r.child; o !== null; ) g = o, n = c, g.flags &= 14680066, b = g.alternate, b === null ? (g.childLanes = 0, g.lanes = n, g.child = null, g.subtreeFlags = 0, g.memoizedProps = null, g.memoizedState = null, g.updateQueue = null, g.dependencies = null, g.stateNode = null) : (g.childLanes = b.childLanes, g.lanes = b.lanes, g.child = b.child, g.subtreeFlags = 0, g.deletions = null, g.memoizedProps = b.memoizedProps, g.memoizedState = b.memoizedState, g.updateQueue = b.updateQueue, g.type = b.type, n = b.dependencies, g.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), o = o.sibling;
              return Je(Cn, Cn.current & 1 | 2), r.child;
            }
            n = n.sibling;
          }
          g.tail !== null && gt() > ss && (r.flags |= 128, c = !0, xc(g, !1), r.lanes = 4194304);
        }
        else {
          if (!c) if (n = Vf(b), n !== null) {
            if (r.flags |= 128, c = !0, o = n.updateQueue, o !== null && (r.updateQueue = o, r.flags |= 4), xc(g, !0), g.tail === null && g.tailMode === "hidden" && !b.alternate && !mn) return sr(r), null;
          } else 2 * gt() - g.renderingStartTime > ss && o !== 1073741824 && (r.flags |= 128, c = !0, xc(g, !1), r.lanes = 4194304);
          g.isBackwards ? (b.sibling = r.child, r.child = b) : (o = g.last, o !== null ? o.sibling = b : r.child = b, g.last = b);
        }
        return g.tail !== null ? (r = g.tail, g.rendering = r, g.tail = r.sibling, g.renderingStartTime = gt(), r.sibling = null, o = Cn.current, Je(Cn, c ? o & 1 | 2 : o & 1), r) : (sr(r), null);
      case 22:
      case 23:
        return ph(), c = r.memoizedState !== null, n !== null && n.memoizedState !== null !== c && (r.flags |= 8192), c && r.mode & 1 ? Ma & 1073741824 && (sr(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : sr(r), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(s(156, r.tag));
  }
  function fd(n, r) {
    switch (Ff(r), r.tag) {
      case 1:
        return Bn(r.type) && es(), n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 3:
        return ru(), sn(er), sn(Tn), et(), n = r.flags, n & 65536 && !(n & 128) ? (r.flags = n & -65537 | 128, r) : null;
      case 5:
        return Bf(r), null;
      case 13:
        if (sn(Cn), n = r.memoizedState, n !== null && n.dehydrated !== null) {
          if (r.alternate === null) throw Error(s(340));
          so();
        }
        return n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 19:
        return sn(Cn), null;
      case 4:
        return ru(), null;
      case 10:
        return Vp(r.type._context), null;
      case 22:
      case 23:
        return ph(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var bc = !1, Ar = !1, h0 = typeof WeakSet == "function" ? WeakSet : Set, Pe = null;
  function ls(n, r) {
    var o = n.ref;
    if (o !== null) if (typeof o == "function") try {
      o(null);
    } catch (c) {
      yn(n, r, c);
    }
    else o.current = null;
  }
  function dd(n, r, o) {
    try {
      o();
    } catch (c) {
      yn(n, r, c);
    }
  }
  var Am = !1;
  function zm(n, r) {
    if (nc = Va, n = Js(), Cf(n)) {
      if ("selectionStart" in n) var o = { start: n.selectionStart, end: n.selectionEnd };
      else e: {
        o = (o = n.ownerDocument) && o.defaultView || window;
        var c = o.getSelection && o.getSelection();
        if (c && c.rangeCount !== 0) {
          o = c.anchorNode;
          var v = c.anchorOffset, g = c.focusNode;
          c = c.focusOffset;
          try {
            o.nodeType, g.nodeType;
          } catch {
            o = null;
            break e;
          }
          var b = 0, N = -1, F = -1, J = 0, _e = 0, Ee = n, ye = null;
          t: for (; ; ) {
            for (var Ae; Ee !== o || v !== 0 && Ee.nodeType !== 3 || (N = b + v), Ee !== g || c !== 0 && Ee.nodeType !== 3 || (F = b + c), Ee.nodeType === 3 && (b += Ee.nodeValue.length), (Ae = Ee.firstChild) !== null; )
              ye = Ee, Ee = Ae;
            for (; ; ) {
              if (Ee === n) break t;
              if (ye === o && ++J === v && (N = b), ye === g && ++_e === c && (F = b), (Ae = Ee.nextSibling) !== null) break;
              Ee = ye, ye = Ee.parentNode;
            }
            Ee = Ae;
          }
          o = N === -1 || F === -1 ? null : { start: N, end: F };
        } else o = null;
      }
      o = o || { start: 0, end: 0 };
    } else o = null;
    for (Xo = { focusedElem: n, selectionRange: o }, Va = !1, Pe = r; Pe !== null; ) if (r = Pe, n = r.child, (r.subtreeFlags & 1028) !== 0 && n !== null) n.return = r, Pe = n;
    else for (; Pe !== null; ) {
      r = Pe;
      try {
        var He = r.alternate;
        if (r.flags & 1024) switch (r.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (He !== null) {
              var We = He.memoizedProps, Nn = He.memoizedState, W = r.stateNode, H = W.getSnapshotBeforeUpdate(r.elementType === r.type ? We : Ti(r.type, We), Nn);
              W.__reactInternalSnapshotBeforeUpdate = H;
            }
            break;
          case 3:
            var q = r.stateNode.containerInfo;
            q.nodeType === 1 ? q.textContent = "" : q.nodeType === 9 && q.documentElement && q.removeChild(q.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(s(163));
        }
      } catch (Se) {
        yn(r, r.return, Se);
      }
      if (n = r.sibling, n !== null) {
        n.return = r.return, Pe = n;
        break;
      }
      Pe = r.return;
    }
    return He = Am, Am = !1, He;
  }
  function Rc(n, r, o) {
    var c = r.updateQueue;
    if (c = c !== null ? c.lastEffect : null, c !== null) {
      var v = c = c.next;
      do {
        if ((v.tag & n) === n) {
          var g = v.destroy;
          v.destroy = void 0, g !== void 0 && dd(r, o, g);
        }
        v = v.next;
      } while (v !== c);
    }
  }
  function kc(n, r) {
    if (r = r.updateQueue, r = r !== null ? r.lastEffect : null, r !== null) {
      var o = r = r.next;
      do {
        if ((o.tag & n) === n) {
          var c = o.create;
          o.destroy = c();
        }
        o = o.next;
      } while (o !== r);
    }
  }
  function lh(n) {
    var r = n.ref;
    if (r !== null) {
      var o = n.stateNode;
      switch (n.tag) {
        case 5:
          n = o;
          break;
        default:
          n = o;
      }
      typeof r == "function" ? r(n) : r.current = n;
    }
  }
  function pd(n) {
    var r = n.alternate;
    r !== null && (n.alternate = null, pd(r)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (r = n.stateNode, r !== null && (delete r[Qi], delete r[rc], delete r[ac], delete r[Zu], delete r[d0])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function Dc(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function Dl(n) {
    e: for (; ; ) {
      for (; n.sibling === null; ) {
        if (n.return === null || Dc(n.return)) return null;
        n = n.return;
      }
      for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
        if (n.flags & 2 || n.child === null || n.tag === 4) continue e;
        n.child.return = n, n = n.child;
      }
      if (!(n.flags & 2)) return n.stateNode;
    }
  }
  function tl(n, r, o) {
    var c = n.tag;
    if (c === 5 || c === 6) n = n.stateNode, r ? o.nodeType === 8 ? o.parentNode.insertBefore(n, r) : o.insertBefore(n, r) : (o.nodeType === 8 ? (r = o.parentNode, r.insertBefore(n, o)) : (r = o, r.appendChild(n)), o = o._reactRootContainer, o != null || r.onclick !== null || (r.onclick = ro));
    else if (c !== 4 && (n = n.child, n !== null)) for (tl(n, r, o), n = n.sibling; n !== null; ) tl(n, r, o), n = n.sibling;
  }
  function nl(n, r, o) {
    var c = n.tag;
    if (c === 5 || c === 6) n = n.stateNode, r ? o.insertBefore(n, r) : o.appendChild(n);
    else if (c !== 4 && (n = n.child, n !== null)) for (nl(n, r, o), n = n.sibling; n !== null; ) nl(n, r, o), n = n.sibling;
  }
  var Mn = null, Yr = !1;
  function Wr(n, r, o) {
    for (o = o.child; o !== null; ) Um(n, r, o), o = o.sibling;
  }
  function Um(n, r, o) {
    if (aa && typeof aa.onCommitFiberUnmount == "function") try {
      aa.onCommitFiberUnmount(Ql, o);
    } catch {
    }
    switch (o.tag) {
      case 5:
        Ar || ls(o, r);
      case 6:
        var c = Mn, v = Yr;
        Mn = null, Wr(n, r, o), Mn = c, Yr = v, Mn !== null && (Yr ? (n = Mn, o = o.stateNode, n.nodeType === 8 ? n.parentNode.removeChild(o) : n.removeChild(o)) : Mn.removeChild(o.stateNode));
        break;
      case 18:
        Mn !== null && (Yr ? (n = Mn, o = o.stateNode, n.nodeType === 8 ? Ju(n.parentNode, o) : n.nodeType === 1 && Ju(n, o), _i(n)) : Ju(Mn, o.stateNode));
        break;
      case 4:
        c = Mn, v = Yr, Mn = o.stateNode.containerInfo, Yr = !0, Wr(n, r, o), Mn = c, Yr = v;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Ar && (c = o.updateQueue, c !== null && (c = c.lastEffect, c !== null))) {
          v = c = c.next;
          do {
            var g = v, b = g.destroy;
            g = g.tag, b !== void 0 && (g & 2 || g & 4) && dd(o, r, b), v = v.next;
          } while (v !== c);
        }
        Wr(n, r, o);
        break;
      case 1:
        if (!Ar && (ls(o, r), c = o.stateNode, typeof c.componentWillUnmount == "function")) try {
          c.props = o.memoizedProps, c.state = o.memoizedState, c.componentWillUnmount();
        } catch (N) {
          yn(o, r, N);
        }
        Wr(n, r, o);
        break;
      case 21:
        Wr(n, r, o);
        break;
      case 22:
        o.mode & 1 ? (Ar = (c = Ar) || o.memoizedState !== null, Wr(n, r, o), Ar = c) : Wr(n, r, o);
        break;
      default:
        Wr(n, r, o);
    }
  }
  function Fm(n) {
    var r = n.updateQueue;
    if (r !== null) {
      n.updateQueue = null;
      var o = n.stateNode;
      o === null && (o = n.stateNode = new h0()), r.forEach(function(c) {
        var v = $m.bind(null, n, c);
        o.has(c) || (o.add(c), c.then(v, v));
      });
    }
  }
  function xi(n, r) {
    var o = r.deletions;
    if (o !== null) for (var c = 0; c < o.length; c++) {
      var v = o[c];
      try {
        var g = n, b = r, N = b;
        e: for (; N !== null; ) {
          switch (N.tag) {
            case 5:
              Mn = N.stateNode, Yr = !1;
              break e;
            case 3:
              Mn = N.stateNode.containerInfo, Yr = !0;
              break e;
            case 4:
              Mn = N.stateNode.containerInfo, Yr = !0;
              break e;
          }
          N = N.return;
        }
        if (Mn === null) throw Error(s(160));
        Um(g, b, v), Mn = null, Yr = !1;
        var F = v.alternate;
        F !== null && (F.return = null), v.return = null;
      } catch (J) {
        yn(v, r, J);
      }
    }
    if (r.subtreeFlags & 12854) for (r = r.child; r !== null; ) oh(r, n), r = r.sibling;
  }
  function oh(n, r) {
    var o = n.alternate, c = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (xi(r, n), pa(n), c & 4) {
          try {
            Rc(3, n, n.return), kc(3, n);
          } catch (We) {
            yn(n, n.return, We);
          }
          try {
            Rc(5, n, n.return);
          } catch (We) {
            yn(n, n.return, We);
          }
        }
        break;
      case 1:
        xi(r, n), pa(n), c & 512 && o !== null && ls(o, o.return);
        break;
      case 5:
        if (xi(r, n), pa(n), c & 512 && o !== null && ls(o, o.return), n.flags & 32) {
          var v = n.stateNode;
          try {
            Re(v, "");
          } catch (We) {
            yn(n, n.return, We);
          }
        }
        if (c & 4 && (v = n.stateNode, v != null)) {
          var g = n.memoizedProps, b = o !== null ? o.memoizedProps : g, N = n.type, F = n.updateQueue;
          if (n.updateQueue = null, F !== null) try {
            N === "input" && g.type === "radio" && g.name != null && Kn(v, g), lr(N, b);
            var J = lr(N, g);
            for (b = 0; b < F.length; b += 2) {
              var _e = F[b], Ee = F[b + 1];
              _e === "style" ? an(v, Ee) : _e === "dangerouslySetInnerHTML" ? Pi(v, Ee) : _e === "children" ? Re(v, Ee) : Q(v, _e, Ee, J);
            }
            switch (N) {
              case "input":
                ra(v, g);
                break;
              case "textarea":
                fi(v, g);
                break;
              case "select":
                var ye = v._wrapperState.wasMultiple;
                v._wrapperState.wasMultiple = !!g.multiple;
                var Ae = g.value;
                Ae != null ? Rn(v, !!g.multiple, Ae, !1) : ye !== !!g.multiple && (g.defaultValue != null ? Rn(
                  v,
                  !!g.multiple,
                  g.defaultValue,
                  !0
                ) : Rn(v, !!g.multiple, g.multiple ? [] : "", !1));
            }
            v[rc] = g;
          } catch (We) {
            yn(n, n.return, We);
          }
        }
        break;
      case 6:
        if (xi(r, n), pa(n), c & 4) {
          if (n.stateNode === null) throw Error(s(162));
          v = n.stateNode, g = n.memoizedProps;
          try {
            v.nodeValue = g;
          } catch (We) {
            yn(n, n.return, We);
          }
        }
        break;
      case 3:
        if (xi(r, n), pa(n), c & 4 && o !== null && o.memoizedState.isDehydrated) try {
          _i(r.containerInfo);
        } catch (We) {
          yn(n, n.return, We);
        }
        break;
      case 4:
        xi(r, n), pa(n);
        break;
      case 13:
        xi(r, n), pa(n), v = n.child, v.flags & 8192 && (g = v.memoizedState !== null, v.stateNode.isHidden = g, !g || v.alternate !== null && v.alternate.memoizedState !== null || (ch = gt())), c & 4 && Fm(n);
        break;
      case 22:
        if (_e = o !== null && o.memoizedState !== null, n.mode & 1 ? (Ar = (J = Ar) || _e, xi(r, n), Ar = J) : xi(r, n), pa(n), c & 8192) {
          if (J = n.memoizedState !== null, (n.stateNode.isHidden = J) && !_e && n.mode & 1) for (Pe = n, _e = n.child; _e !== null; ) {
            for (Ee = Pe = _e; Pe !== null; ) {
              switch (ye = Pe, Ae = ye.child, ye.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Rc(4, ye, ye.return);
                  break;
                case 1:
                  ls(ye, ye.return);
                  var He = ye.stateNode;
                  if (typeof He.componentWillUnmount == "function") {
                    c = ye, o = ye.return;
                    try {
                      r = c, He.props = r.memoizedProps, He.state = r.memoizedState, He.componentWillUnmount();
                    } catch (We) {
                      yn(c, o, We);
                    }
                  }
                  break;
                case 5:
                  ls(ye, ye.return);
                  break;
                case 22:
                  if (ye.memoizedState !== null) {
                    Oc(Ee);
                    continue;
                  }
              }
              Ae !== null ? (Ae.return = ye, Pe = Ae) : Oc(Ee);
            }
            _e = _e.sibling;
          }
          e: for (_e = null, Ee = n; ; ) {
            if (Ee.tag === 5) {
              if (_e === null) {
                _e = Ee;
                try {
                  v = Ee.stateNode, J ? (g = v.style, typeof g.setProperty == "function" ? g.setProperty("display", "none", "important") : g.display = "none") : (N = Ee.stateNode, F = Ee.memoizedProps.style, b = F != null && F.hasOwnProperty("display") ? F.display : null, N.style.display = Wt("display", b));
                } catch (We) {
                  yn(n, n.return, We);
                }
              }
            } else if (Ee.tag === 6) {
              if (_e === null) try {
                Ee.stateNode.nodeValue = J ? "" : Ee.memoizedProps;
              } catch (We) {
                yn(n, n.return, We);
              }
            } else if ((Ee.tag !== 22 && Ee.tag !== 23 || Ee.memoizedState === null || Ee === n) && Ee.child !== null) {
              Ee.child.return = Ee, Ee = Ee.child;
              continue;
            }
            if (Ee === n) break e;
            for (; Ee.sibling === null; ) {
              if (Ee.return === null || Ee.return === n) break e;
              _e === Ee && (_e = null), Ee = Ee.return;
            }
            _e === Ee && (_e = null), Ee.sibling.return = Ee.return, Ee = Ee.sibling;
          }
        }
        break;
      case 19:
        xi(r, n), pa(n), c & 4 && Fm(n);
        break;
      case 21:
        break;
      default:
        xi(
          r,
          n
        ), pa(n);
    }
  }
  function pa(n) {
    var r = n.flags;
    if (r & 2) {
      try {
        e: {
          for (var o = n.return; o !== null; ) {
            if (Dc(o)) {
              var c = o;
              break e;
            }
            o = o.return;
          }
          throw Error(s(160));
        }
        switch (c.tag) {
          case 5:
            var v = c.stateNode;
            c.flags & 32 && (Re(v, ""), c.flags &= -33);
            var g = Dl(n);
            nl(n, g, v);
            break;
          case 3:
          case 4:
            var b = c.stateNode.containerInfo, N = Dl(n);
            tl(n, N, b);
            break;
          default:
            throw Error(s(161));
        }
      } catch (F) {
        yn(n, n.return, F);
      }
      n.flags &= -3;
    }
    r & 4096 && (n.flags &= -4097);
  }
  function v0(n, r, o) {
    Pe = n, uh(n);
  }
  function uh(n, r, o) {
    for (var c = (n.mode & 1) !== 0; Pe !== null; ) {
      var v = Pe, g = v.child;
      if (v.tag === 22 && c) {
        var b = v.memoizedState !== null || bc;
        if (!b) {
          var N = v.alternate, F = N !== null && N.memoizedState !== null || Ar;
          N = bc;
          var J = Ar;
          if (bc = b, (Ar = F) && !J) for (Pe = v; Pe !== null; ) b = Pe, F = b.child, b.tag === 22 && b.memoizedState !== null ? sh(v) : F !== null ? (F.return = b, Pe = F) : sh(v);
          for (; g !== null; ) Pe = g, uh(g), g = g.sibling;
          Pe = v, bc = N, Ar = J;
        }
        Pm(n);
      } else v.subtreeFlags & 8772 && g !== null ? (g.return = v, Pe = g) : Pm(n);
    }
  }
  function Pm(n) {
    for (; Pe !== null; ) {
      var r = Pe;
      if (r.flags & 8772) {
        var o = r.alternate;
        try {
          if (r.flags & 8772) switch (r.tag) {
            case 0:
            case 11:
            case 15:
              Ar || kc(5, r);
              break;
            case 1:
              var c = r.stateNode;
              if (r.flags & 4 && !Ar) if (o === null) c.componentDidMount();
              else {
                var v = r.elementType === r.type ? o.memoizedProps : Ti(r.type, o.memoizedProps);
                c.componentDidUpdate(v, o.memoizedState, c.__reactInternalSnapshotBeforeUpdate);
              }
              var g = r.updateQueue;
              g !== null && Gp(r, g, c);
              break;
            case 3:
              var b = r.updateQueue;
              if (b !== null) {
                if (o = null, r.child !== null) switch (r.child.tag) {
                  case 5:
                    o = r.child.stateNode;
                    break;
                  case 1:
                    o = r.child.stateNode;
                }
                Gp(r, b, o);
              }
              break;
            case 5:
              var N = r.stateNode;
              if (o === null && r.flags & 4) {
                o = N;
                var F = r.memoizedProps;
                switch (r.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    F.autoFocus && o.focus();
                    break;
                  case "img":
                    F.src && (o.src = F.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (r.memoizedState === null) {
                var J = r.alternate;
                if (J !== null) {
                  var _e = J.memoizedState;
                  if (_e !== null) {
                    var Ee = _e.dehydrated;
                    Ee !== null && _i(Ee);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(s(163));
          }
          Ar || r.flags & 512 && lh(r);
        } catch (ye) {
          yn(r, r.return, ye);
        }
      }
      if (r === n) {
        Pe = null;
        break;
      }
      if (o = r.sibling, o !== null) {
        o.return = r.return, Pe = o;
        break;
      }
      Pe = r.return;
    }
  }
  function Oc(n) {
    for (; Pe !== null; ) {
      var r = Pe;
      if (r === n) {
        Pe = null;
        break;
      }
      var o = r.sibling;
      if (o !== null) {
        o.return = r.return, Pe = o;
        break;
      }
      Pe = r.return;
    }
  }
  function sh(n) {
    for (; Pe !== null; ) {
      var r = Pe;
      try {
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            var o = r.return;
            try {
              kc(4, r);
            } catch (F) {
              yn(r, o, F);
            }
            break;
          case 1:
            var c = r.stateNode;
            if (typeof c.componentDidMount == "function") {
              var v = r.return;
              try {
                c.componentDidMount();
              } catch (F) {
                yn(r, v, F);
              }
            }
            var g = r.return;
            try {
              lh(r);
            } catch (F) {
              yn(r, g, F);
            }
            break;
          case 5:
            var b = r.return;
            try {
              lh(r);
            } catch (F) {
              yn(r, b, F);
            }
        }
      } catch (F) {
        yn(r, r.return, F);
      }
      if (r === n) {
        Pe = null;
        break;
      }
      var N = r.sibling;
      if (N !== null) {
        N.return = r.return, Pe = N;
        break;
      }
      Pe = r.return;
    }
  }
  var m0 = Math.ceil, vo = ie.ReactCurrentDispatcher, du = ie.ReactCurrentOwner, _r = ie.ReactCurrentBatchConfig, Mt = 0, nr = null, $n = null, Sr = 0, Ma = 0, os = Wa(0), Ln = 0, Mc = null, rl = 0, us = 0, hd = 0, Lc = null, ha = null, ch = 0, ss = 1 / 0, La = null, cs = !1, pu = null, mo = null, vd = !1, Ol = null, Nc = 0, yo = 0, fs = null, Ac = -1, zr = 0;
  function Gn() {
    return Mt & 6 ? gt() : Ac !== -1 ? Ac : Ac = gt();
  }
  function al(n) {
    return n.mode & 1 ? Mt & 2 && Sr !== 0 ? Sr & -Sr : p0.transition !== null ? (zr === 0 && (zr = Fu()), zr) : (n = Pt, n !== 0 || (n = window.event, n = n === void 0 ? 16 : Yu(n.type)), n) : 1;
  }
  function $r(n, r, o, c) {
    if (50 < yo) throw yo = 0, fs = null, Error(s(185));
    yl(n, o, c), (!(Mt & 2) || n !== nr) && (n === nr && (!(Mt & 2) && (us |= o), Ln === 4 && bi(n, Sr)), va(n, c), o === 1 && Mt === 0 && !(r.mode & 1) && (ss = gt() + 500, ts && Xi()));
  }
  function va(n, r) {
    var o = n.callbackNode;
    Bo(n, r);
    var c = gi(n, n === nr ? Sr : 0);
    if (c === 0) o !== null && vr(o), n.callbackNode = null, n.callbackPriority = 0;
    else if (r = c & -c, n.callbackPriority !== r) {
      if (o != null && vr(o), r === 1) n.tag === 0 ? io(fh.bind(null, n)) : zf(fh.bind(null, n)), Ku(function() {
        !(Mt & 6) && Xi();
      }), o = null;
      else {
        switch (ju(c)) {
          case 1:
            o = mi;
            break;
          case 4:
            o = jo;
            break;
          case 16:
            o = Ho;
            break;
          case 536870912:
            o = Au;
            break;
          default:
            o = Ho;
        }
        o = Qm(o, md.bind(null, n));
      }
      n.callbackPriority = r, n.callbackNode = o;
    }
  }
  function md(n, r) {
    if (Ac = -1, zr = 0, Mt & 6) throw Error(s(327));
    var o = n.callbackNode;
    if (ds() && n.callbackNode !== o) return null;
    var c = gi(n, n === nr ? Sr : 0);
    if (c === 0) return null;
    if (c & 30 || c & n.expiredLanes || r) r = yd(n, c);
    else {
      r = c;
      var v = Mt;
      Mt |= 2;
      var g = Hm();
      (nr !== n || Sr !== r) && (La = null, ss = gt() + 500, Ml(n, r));
      do
        try {
          Bm();
          break;
        } catch (N) {
          jm(n, N);
        }
      while (!0);
      Bp(), vo.current = g, Mt = v, $n !== null ? r = 0 : (nr = null, Sr = 0, r = Ln);
    }
    if (r !== 0) {
      if (r === 2 && (v = Xl(n), v !== 0 && (c = v, r = zc(n, v))), r === 1) throw o = Mc, Ml(n, 0), bi(n, c), va(n, gt()), o;
      if (r === 6) bi(n, c);
      else {
        if (v = n.current.alternate, !(c & 30) && !y0(v) && (r = yd(n, c), r === 2 && (g = Xl(n), g !== 0 && (c = g, r = zc(n, g))), r === 1)) throw o = Mc, Ml(n, 0), bi(n, c), va(n, gt()), o;
        switch (n.finishedWork = v, n.finishedLanes = c, r) {
          case 0:
          case 1:
            throw Error(s(345));
          case 2:
            mu(n, ha, La);
            break;
          case 3:
            if (bi(n, c), (c & 130023424) === c && (r = ch + 500 - gt(), 10 < r)) {
              if (gi(n, 0) !== 0) break;
              if (v = n.suspendedLanes, (v & c) !== c) {
                Gn(), n.pingedLanes |= n.suspendedLanes & v;
                break;
              }
              n.timeoutHandle = Lf(mu.bind(null, n, ha, La), r);
              break;
            }
            mu(n, ha, La);
            break;
          case 4:
            if (bi(n, c), (c & 4194240) === c) break;
            for (r = n.eventTimes, v = -1; 0 < c; ) {
              var b = 31 - Hr(c);
              g = 1 << b, b = r[b], b > v && (v = b), c &= ~g;
            }
            if (c = v, c = gt() - c, c = (120 > c ? 120 : 480 > c ? 480 : 1080 > c ? 1080 : 1920 > c ? 1920 : 3e3 > c ? 3e3 : 4320 > c ? 4320 : 1960 * m0(c / 1960)) - c, 10 < c) {
              n.timeoutHandle = Lf(mu.bind(null, n, ha, La), c);
              break;
            }
            mu(n, ha, La);
            break;
          case 5:
            mu(n, ha, La);
            break;
          default:
            throw Error(s(329));
        }
      }
    }
    return va(n, gt()), n.callbackNode === o ? md.bind(null, n) : null;
  }
  function zc(n, r) {
    var o = Lc;
    return n.current.memoizedState.isDehydrated && (Ml(n, r).flags |= 256), n = yd(n, r), n !== 2 && (r = ha, ha = o, r !== null && hu(r)), n;
  }
  function hu(n) {
    ha === null ? ha = n : ha.push.apply(ha, n);
  }
  function y0(n) {
    for (var r = n; ; ) {
      if (r.flags & 16384) {
        var o = r.updateQueue;
        if (o !== null && (o = o.stores, o !== null)) for (var c = 0; c < o.length; c++) {
          var v = o[c], g = v.getSnapshot;
          v = v.value;
          try {
            if (!Ei(g(), v)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (o = r.child, r.subtreeFlags & 16384 && o !== null) o.return = r, r = o;
      else {
        if (r === n) break;
        for (; r.sibling === null; ) {
          if (r.return === null || r.return === n) return !0;
          r = r.return;
        }
        r.sibling.return = r.return, r = r.sibling;
      }
    }
    return !0;
  }
  function bi(n, r) {
    for (r &= ~hd, r &= ~us, n.suspendedLanes |= r, n.pingedLanes &= ~r, n = n.expirationTimes; 0 < r; ) {
      var o = 31 - Hr(r), c = 1 << o;
      n[o] = -1, r &= ~c;
    }
  }
  function fh(n) {
    if (Mt & 6) throw Error(s(327));
    ds();
    var r = gi(n, 0);
    if (!(r & 1)) return va(n, gt()), null;
    var o = yd(n, r);
    if (n.tag !== 0 && o === 2) {
      var c = Xl(n);
      c !== 0 && (r = c, o = zc(n, c));
    }
    if (o === 1) throw o = Mc, Ml(n, 0), bi(n, r), va(n, gt()), o;
    if (o === 6) throw Error(s(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = r, mu(n, ha, La), va(n, gt()), null;
  }
  function dh(n, r) {
    var o = Mt;
    Mt |= 1;
    try {
      return n(r);
    } finally {
      Mt = o, Mt === 0 && (ss = gt() + 500, ts && Xi());
    }
  }
  function vu(n) {
    Ol !== null && Ol.tag === 0 && !(Mt & 6) && ds();
    var r = Mt;
    Mt |= 1;
    var o = _r.transition, c = Pt;
    try {
      if (_r.transition = null, Pt = 1, n) return n();
    } finally {
      Pt = c, _r.transition = o, Mt = r, !(Mt & 6) && Xi();
    }
  }
  function ph() {
    Ma = os.current, sn(os);
  }
  function Ml(n, r) {
    n.finishedWork = null, n.finishedLanes = 0;
    var o = n.timeoutHandle;
    if (o !== -1 && (n.timeoutHandle = -1, Up(o)), $n !== null) for (o = $n.return; o !== null; ) {
      var c = o;
      switch (Ff(c), c.tag) {
        case 1:
          c = c.type.childContextTypes, c != null && es();
          break;
        case 3:
          ru(), sn(er), sn(Tn), et();
          break;
        case 5:
          Bf(c);
          break;
        case 4:
          ru();
          break;
        case 13:
          sn(Cn);
          break;
        case 19:
          sn(Cn);
          break;
        case 10:
          Vp(c.type._context);
          break;
        case 22:
        case 23:
          ph();
      }
      o = o.return;
    }
    if (nr = n, $n = n = go(n.current, null), Sr = Ma = r, Ln = 0, Mc = null, hd = us = rl = 0, ha = Lc = null, tu !== null) {
      for (r = 0; r < tu.length; r++) if (o = tu[r], c = o.interleaved, c !== null) {
        o.interleaved = null;
        var v = c.next, g = o.pending;
        if (g !== null) {
          var b = g.next;
          g.next = v, c.next = b;
        }
        o.pending = c;
      }
      tu = null;
    }
    return n;
  }
  function jm(n, r) {
    do {
      var o = $n;
      try {
        if (Bp(), xt.current = su, If) {
          for (var c = Ht.memoizedState; c !== null; ) {
            var v = c.queue;
            v !== null && (v.pending = null), c = c.next;
          }
          If = !1;
        }
        if (en = 0, ur = In = Ht = null, dc = !1, au = 0, du.current = null, o === null || o.return === null) {
          Ln = 1, Mc = r, $n = null;
          break;
        }
        e: {
          var g = n, b = o.return, N = o, F = r;
          if (r = Sr, N.flags |= 32768, F !== null && typeof F == "object" && typeof F.then == "function") {
            var J = F, _e = N, Ee = _e.tag;
            if (!(_e.mode & 1) && (Ee === 0 || Ee === 11 || Ee === 15)) {
              var ye = _e.alternate;
              ye ? (_e.updateQueue = ye.updateQueue, _e.memoizedState = ye.memoizedState, _e.lanes = ye.lanes) : (_e.updateQueue = null, _e.memoizedState = null);
            }
            var Ae = bm(b);
            if (Ae !== null) {
              Ae.flags &= -257, ho(Ae, b, N, g, r), Ae.mode & 1 && th(g, J, r), r = Ae, F = J;
              var He = r.updateQueue;
              if (He === null) {
                var We = /* @__PURE__ */ new Set();
                We.add(F), r.updateQueue = We;
              } else He.add(F);
              break e;
            } else {
              if (!(r & 1)) {
                th(g, J, r), hh();
                break e;
              }
              F = Error(s(426));
            }
          } else if (mn && N.mode & 1) {
            var Nn = bm(b);
            if (Nn !== null) {
              !(Nn.flags & 65536) && (Nn.flags |= 256), ho(Nn, b, N, g, r), bl(cu(F, N));
              break e;
            }
          }
          g = F = cu(F, N), Ln !== 4 && (Ln = 2), Lc === null ? Lc = [g] : Lc.push(g), g = b;
          do {
            switch (g.tag) {
              case 3:
                g.flags |= 65536, r &= -r, g.lanes |= r;
                var W = xm(g, F, r);
                Sm(g, W);
                break e;
              case 1:
                N = F;
                var H = g.type, q = g.stateNode;
                if (!(g.flags & 128) && (typeof H.getDerivedStateFromError == "function" || q !== null && typeof q.componentDidCatch == "function" && (mo === null || !mo.has(q)))) {
                  g.flags |= 65536, r &= -r, g.lanes |= r;
                  var Se = eh(g, N, r);
                  Sm(g, Se);
                  break e;
                }
            }
            g = g.return;
          } while (g !== null);
        }
        Im(o);
      } catch (Be) {
        r = Be, $n === o && o !== null && ($n = o = o.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Hm() {
    var n = vo.current;
    return vo.current = su, n === null ? su : n;
  }
  function hh() {
    (Ln === 0 || Ln === 3 || Ln === 2) && (Ln = 4), nr === null || !(rl & 268435455) && !(us & 268435455) || bi(nr, Sr);
  }
  function yd(n, r) {
    var o = Mt;
    Mt |= 2;
    var c = Hm();
    (nr !== n || Sr !== r) && (La = null, Ml(n, r));
    do
      try {
        g0();
        break;
      } catch (v) {
        jm(n, v);
      }
    while (!0);
    if (Bp(), Mt = o, vo.current = c, $n !== null) throw Error(s(261));
    return nr = null, Sr = 0, Ln;
  }
  function g0() {
    for (; $n !== null; ) Vm($n);
  }
  function Bm() {
    for (; $n !== null && !hi(); ) Vm($n);
  }
  function Vm(n) {
    var r = Gm(n.alternate, n, Ma);
    n.memoizedProps = n.pendingProps, r === null ? Im(n) : $n = r, du.current = null;
  }
  function Im(n) {
    var r = n;
    do {
      var o = r.alternate;
      if (n = r.return, r.flags & 32768) {
        if (o = fd(o, r), o !== null) {
          o.flags &= 32767, $n = o;
          return;
        }
        if (n !== null) n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null;
        else {
          Ln = 6, $n = null;
          return;
        }
      } else if (o = Nm(o, r, Ma), o !== null) {
        $n = o;
        return;
      }
      if (r = r.sibling, r !== null) {
        $n = r;
        return;
      }
      $n = r = n;
    } while (r !== null);
    Ln === 0 && (Ln = 5);
  }
  function mu(n, r, o) {
    var c = Pt, v = _r.transition;
    try {
      _r.transition = null, Pt = 1, _0(n, r, o, c);
    } finally {
      _r.transition = v, Pt = c;
    }
    return null;
  }
  function _0(n, r, o, c) {
    do
      ds();
    while (Ol !== null);
    if (Mt & 6) throw Error(s(327));
    o = n.finishedWork;
    var v = n.finishedLanes;
    if (o === null) return null;
    if (n.finishedWork = null, n.finishedLanes = 0, o === n.current) throw Error(s(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var g = o.lanes | o.childLanes;
    if (vp(n, g), n === nr && ($n = nr = null, Sr = 0), !(o.subtreeFlags & 2064) && !(o.flags & 2064) || vd || (vd = !0, Qm(Ho, function() {
      return ds(), null;
    })), g = (o.flags & 15990) !== 0, o.subtreeFlags & 15990 || g) {
      g = _r.transition, _r.transition = null;
      var b = Pt;
      Pt = 1;
      var N = Mt;
      Mt |= 4, du.current = null, zm(n, o), oh(o, n), Gu(Xo), Va = !!nc, Xo = nc = null, n.current = o, v0(o), vi(), Mt = N, Pt = b, _r.transition = g;
    } else n.current = o;
    if (vd && (vd = !1, Ol = n, Nc = v), g = n.pendingLanes, g === 0 && (mo = null), Vs(o.stateNode), va(n, gt()), r !== null) for (c = n.onRecoverableError, o = 0; o < r.length; o++) v = r[o], c(v.value, { componentStack: v.stack, digest: v.digest });
    if (cs) throw cs = !1, n = pu, pu = null, n;
    return Nc & 1 && n.tag !== 0 && ds(), g = n.pendingLanes, g & 1 ? n === fs ? yo++ : (yo = 0, fs = n) : yo = 0, Xi(), null;
  }
  function ds() {
    if (Ol !== null) {
      var n = ju(Nc), r = _r.transition, o = Pt;
      try {
        if (_r.transition = null, Pt = 16 > n ? 16 : n, Ol === null) var c = !1;
        else {
          if (n = Ol, Ol = null, Nc = 0, Mt & 6) throw Error(s(331));
          var v = Mt;
          for (Mt |= 4, Pe = n.current; Pe !== null; ) {
            var g = Pe, b = g.child;
            if (Pe.flags & 16) {
              var N = g.deletions;
              if (N !== null) {
                for (var F = 0; F < N.length; F++) {
                  var J = N[F];
                  for (Pe = J; Pe !== null; ) {
                    var _e = Pe;
                    switch (_e.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Rc(8, _e, g);
                    }
                    var Ee = _e.child;
                    if (Ee !== null) Ee.return = _e, Pe = Ee;
                    else for (; Pe !== null; ) {
                      _e = Pe;
                      var ye = _e.sibling, Ae = _e.return;
                      if (pd(_e), _e === J) {
                        Pe = null;
                        break;
                      }
                      if (ye !== null) {
                        ye.return = Ae, Pe = ye;
                        break;
                      }
                      Pe = Ae;
                    }
                  }
                }
                var He = g.alternate;
                if (He !== null) {
                  var We = He.child;
                  if (We !== null) {
                    He.child = null;
                    do {
                      var Nn = We.sibling;
                      We.sibling = null, We = Nn;
                    } while (We !== null);
                  }
                }
                Pe = g;
              }
            }
            if (g.subtreeFlags & 2064 && b !== null) b.return = g, Pe = b;
            else e: for (; Pe !== null; ) {
              if (g = Pe, g.flags & 2048) switch (g.tag) {
                case 0:
                case 11:
                case 15:
                  Rc(9, g, g.return);
              }
              var W = g.sibling;
              if (W !== null) {
                W.return = g.return, Pe = W;
                break e;
              }
              Pe = g.return;
            }
          }
          var H = n.current;
          for (Pe = H; Pe !== null; ) {
            b = Pe;
            var q = b.child;
            if (b.subtreeFlags & 2064 && q !== null) q.return = b, Pe = q;
            else e: for (b = H; Pe !== null; ) {
              if (N = Pe, N.flags & 2048) try {
                switch (N.tag) {
                  case 0:
                  case 11:
                  case 15:
                    kc(9, N);
                }
              } catch (Be) {
                yn(N, N.return, Be);
              }
              if (N === b) {
                Pe = null;
                break e;
              }
              var Se = N.sibling;
              if (Se !== null) {
                Se.return = N.return, Pe = Se;
                break e;
              }
              Pe = N.return;
            }
          }
          if (Mt = v, Xi(), aa && typeof aa.onPostCommitFiberRoot == "function") try {
            aa.onPostCommitFiberRoot(Ql, n);
          } catch {
          }
          c = !0;
        }
        return c;
      } finally {
        Pt = o, _r.transition = r;
      }
    }
    return !1;
  }
  function Ym(n, r, o) {
    r = cu(o, r), r = xm(n, r, 1), n = co(n, r, 1), r = Gn(), n !== null && (yl(n, 1, r), va(n, r));
  }
  function yn(n, r, o) {
    if (n.tag === 3) Ym(n, n, o);
    else for (; r !== null; ) {
      if (r.tag === 3) {
        Ym(r, n, o);
        break;
      } else if (r.tag === 1) {
        var c = r.stateNode;
        if (typeof r.type.getDerivedStateFromError == "function" || typeof c.componentDidCatch == "function" && (mo === null || !mo.has(c))) {
          n = cu(o, n), n = eh(r, n, 1), r = co(r, n, 1), n = Gn(), r !== null && (yl(r, 1, n), va(r, n));
          break;
        }
      }
      r = r.return;
    }
  }
  function S0(n, r, o) {
    var c = n.pingCache;
    c !== null && c.delete(r), r = Gn(), n.pingedLanes |= n.suspendedLanes & o, nr === n && (Sr & o) === o && (Ln === 4 || Ln === 3 && (Sr & 130023424) === Sr && 500 > gt() - ch ? Ml(n, 0) : hd |= o), va(n, r);
  }
  function Wm(n, r) {
    r === 0 && (n.mode & 1 ? (r = ba, ba <<= 1, !(ba & 130023424) && (ba = 4194304)) : r = 1);
    var o = Gn();
    n = Da(n, r), n !== null && (yl(n, r, o), va(n, o));
  }
  function E0(n) {
    var r = n.memoizedState, o = 0;
    r !== null && (o = r.retryLane), Wm(n, o);
  }
  function $m(n, r) {
    var o = 0;
    switch (n.tag) {
      case 13:
        var c = n.stateNode, v = n.memoizedState;
        v !== null && (o = v.retryLane);
        break;
      case 19:
        c = n.stateNode;
        break;
      default:
        throw Error(s(314));
    }
    c !== null && c.delete(r), Wm(n, o);
  }
  var Gm;
  Gm = function(n, r, o) {
    if (n !== null) if (n.memoizedProps !== r.pendingProps || er.current) Yn = !0;
    else {
      if (!(n.lanes & o) && !(r.flags & 128)) return Yn = !1, Tc(n, r, o);
      Yn = !!(n.flags & 131072);
    }
    else Yn = !1, mn && r.flags & 1048576 && mm(r, xl, r.index);
    switch (r.lanes = 0, r.tag) {
      case 2:
        var c = r.type;
        qa(n, r), n = r.pendingProps;
        var v = oa(r, Tn.current);
        En(r, o), v = fo(null, r, c, n, v, o);
        var g = wi();
        return r.flags |= 1, typeof v == "object" && v !== null && typeof v.render == "function" && v.$$typeof === void 0 ? (r.tag = 1, r.memoizedState = null, r.updateQueue = null, Bn(c) ? (g = !0, or(r)) : g = !1, r.memoizedState = v.state !== null && v.state !== void 0 ? v.state : null, $p(r), v.updater = ld, r.stateNode = v, v._reactInternals = r, _c(r, c, n, o), r = Cc(null, r, c, !0, g, o)) : (r.tag = 0, mn && g && Uf(r), gr(null, r, v, o), r = r.child), r;
      case 16:
        c = r.elementType;
        e: {
          switch (qa(n, r), n = r.pendingProps, v = c._init, c = v(c._payload), r.type = c, v = r.tag = w0(c), n = Ti(c, n), v) {
            case 0:
              r = Rm(null, r, c, n, o);
              break e;
            case 1:
              r = km(null, r, c, n, o);
              break e;
            case 11:
              r = da(null, r, c, n, o);
              break e;
            case 14:
              r = fu(null, r, c, Ti(c.type, n), o);
              break e;
          }
          throw Error(s(
            306,
            c,
            ""
          ));
        }
        return r;
      case 0:
        return c = r.type, v = r.pendingProps, v = r.elementType === c ? v : Ti(c, v), Rm(n, r, c, v, o);
      case 1:
        return c = r.type, v = r.pendingProps, v = r.elementType === c ? v : Ti(c, v), km(n, r, c, v, o);
      case 3:
        e: {
          if (is(r), n === null) throw Error(s(387));
          c = r.pendingProps, g = r.memoizedState, v = g.element, _m(n, r), oc(r, c, null, o);
          var b = r.memoizedState;
          if (c = b.element, g.isDehydrated) if (g = { element: c, isDehydrated: !1, cache: b.cache, pendingSuspenseBoundaries: b.pendingSuspenseBoundaries, transitions: b.transitions }, r.updateQueue.baseState = g, r.memoizedState = g, r.flags & 256) {
            v = cu(Error(s(423)), r), r = Dm(n, r, c, o, v);
            break e;
          } else if (c !== v) {
            v = cu(Error(s(424)), r), r = Dm(n, r, c, o, v);
            break e;
          } else for (sa = Gi(r.stateNode.containerInfo.firstChild), ua = r, mn = !0, Ga = null, o = Me(r, null, c, o), r.child = o; o; ) o.flags = o.flags & -3 | 4096, o = o.sibling;
          else {
            if (so(), c === v) {
              r = Xa(n, r, o);
              break e;
            }
            gr(n, r, c, o);
          }
          r = r.child;
        }
        return r;
      case 5:
        return Em(r), n === null && jp(r), c = r.type, v = r.pendingProps, g = n !== null ? n.memoizedProps : null, b = v.children, Mf(c, v) ? b = null : g !== null && Mf(c, g) && (r.flags |= 32), nh(n, r), gr(n, r, b, o), r.child;
      case 6:
        return n === null && jp(r), null;
      case 13:
        return cd(n, r, o);
      case 4:
        return Qp(r, r.stateNode.containerInfo), c = r.pendingProps, n === null ? r.child = Dn(r, null, c, o) : gr(n, r, c, o), r.child;
      case 11:
        return c = r.type, v = r.pendingProps, v = r.elementType === c ? v : Ti(c, v), da(n, r, c, v, o);
      case 7:
        return gr(n, r, r.pendingProps, o), r.child;
      case 8:
        return gr(n, r, r.pendingProps.children, o), r.child;
      case 12:
        return gr(n, r, r.pendingProps.children, o), r.child;
      case 10:
        e: {
          if (c = r.type._context, v = r.pendingProps, g = r.memoizedProps, b = v.value, Je(ka, c._currentValue), c._currentValue = b, g !== null) if (Ei(g.value, b)) {
            if (g.children === v.children && !er.current) {
              r = Xa(n, r, o);
              break e;
            }
          } else for (g = r.child, g !== null && (g.return = r); g !== null; ) {
            var N = g.dependencies;
            if (N !== null) {
              b = g.child;
              for (var F = N.firstContext; F !== null; ) {
                if (F.context === c) {
                  if (g.tag === 1) {
                    F = Rl(-1, o & -o), F.tag = 2;
                    var J = g.updateQueue;
                    if (J !== null) {
                      J = J.shared;
                      var _e = J.pending;
                      _e === null ? F.next = F : (F.next = _e.next, _e.next = F), J.pending = F;
                    }
                  }
                  g.lanes |= o, F = g.alternate, F !== null && (F.lanes |= o), Ip(
                    g.return,
                    o,
                    r
                  ), N.lanes |= o;
                  break;
                }
                F = F.next;
              }
            } else if (g.tag === 10) b = g.type === r.type ? null : g.child;
            else if (g.tag === 18) {
              if (b = g.return, b === null) throw Error(s(341));
              b.lanes |= o, N = b.alternate, N !== null && (N.lanes |= o), Ip(b, o, r), b = g.sibling;
            } else b = g.child;
            if (b !== null) b.return = g;
            else for (b = g; b !== null; ) {
              if (b === r) {
                b = null;
                break;
              }
              if (g = b.sibling, g !== null) {
                g.return = b.return, b = g;
                break;
              }
              b = b.return;
            }
            g = b;
          }
          gr(n, r, v.children, o), r = r.child;
        }
        return r;
      case 9:
        return v = r.type, c = r.pendingProps.children, En(r, o), v = Qa(v), c = c(v), r.flags |= 1, gr(n, r, c, o), r.child;
      case 14:
        return c = r.type, v = Ti(c, r.pendingProps), v = Ti(c.type, v), fu(n, r, c, v, o);
      case 15:
        return _t(n, r, r.type, r.pendingProps, o);
      case 17:
        return c = r.type, v = r.pendingProps, v = r.elementType === c ? v : Ti(c, v), qa(n, r), r.tag = 1, Bn(c) ? (n = !0, or(r)) : n = !1, En(r, o), od(r, c, v), _c(r, c, v, o), Cc(null, r, c, !0, n, o);
      case 19:
        return el(n, r, o);
      case 22:
        return Ec(n, r, o);
    }
    throw Error(s(156, r.tag));
  };
  function Qm(n, r) {
    return fn(n, r);
  }
  function C0(n, r, o, c) {
    this.tag = n, this.key = o, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = c, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ja(n, r, o, c) {
    return new C0(n, r, o, c);
  }
  function vh(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function w0(n) {
    if (typeof n == "function") return vh(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === $e) return 11;
      if (n === Ge) return 14;
    }
    return 2;
  }
  function go(n, r) {
    var o = n.alternate;
    return o === null ? (o = Ja(n.tag, r, n.key, n.mode), o.elementType = n.elementType, o.type = n.type, o.stateNode = n.stateNode, o.alternate = n, n.alternate = o) : (o.pendingProps = r, o.type = n.type, o.flags = 0, o.subtreeFlags = 0, o.deletions = null), o.flags = n.flags & 14680064, o.childLanes = n.childLanes, o.lanes = n.lanes, o.child = n.child, o.memoizedProps = n.memoizedProps, o.memoizedState = n.memoizedState, o.updateQueue = n.updateQueue, r = n.dependencies, o.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }, o.sibling = n.sibling, o.index = n.index, o.ref = n.ref, o;
  }
  function Uc(n, r, o, c, v, g) {
    var b = 2;
    if (c = n, typeof n == "function") vh(n) && (b = 1);
    else if (typeof n == "string") b = 5;
    else e: switch (n) {
      case ae:
        return Ll(o.children, v, g, r);
      case ge:
        b = 8, v |= 8;
        break;
      case se:
        return n = Ja(12, o, r, v | 2), n.elementType = se, n.lanes = g, n;
      case be:
        return n = Ja(13, o, r, v), n.elementType = be, n.lanes = g, n;
      case ut:
        return n = Ja(19, o, r, v), n.elementType = ut, n.lanes = g, n;
      case ce:
        return _o(o, v, g, r);
      default:
        if (typeof n == "object" && n !== null) switch (n.$$typeof) {
          case Ie:
            b = 10;
            break e;
          case Ke:
            b = 9;
            break e;
          case $e:
            b = 11;
            break e;
          case Ge:
            b = 14;
            break e;
          case pe:
            b = 16, c = null;
            break e;
        }
        throw Error(s(130, n == null ? n : typeof n, ""));
    }
    return r = Ja(b, o, r, v), r.elementType = n, r.type = c, r.lanes = g, r;
  }
  function Ll(n, r, o, c) {
    return n = Ja(7, n, c, r), n.lanes = o, n;
  }
  function _o(n, r, o, c) {
    return n = Ja(22, n, c, r), n.elementType = ce, n.lanes = o, n.stateNode = { isHidden: !1 }, n;
  }
  function mh(n, r, o) {
    return n = Ja(6, n, null, r), n.lanes = o, n;
  }
  function gd(n, r, o) {
    return r = Ja(4, n.children !== null ? n.children : [], n.key, r), r.lanes = o, r.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, r;
  }
  function qm(n, r, o, c, v) {
    this.tag = r, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Pu(0), this.expirationTimes = Pu(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Pu(0), this.identifierPrefix = c, this.onRecoverableError = v, this.mutableSourceEagerHydrationData = null;
  }
  function _d(n, r, o, c, v, g, b, N, F) {
    return n = new qm(n, r, o, N, F), r === 1 ? (r = 1, g === !0 && (r |= 8)) : r = 0, g = Ja(3, null, null, r), n.current = g, g.stateNode = n, g.memoizedState = { element: c, isDehydrated: o, cache: null, transitions: null, pendingSuspenseBoundaries: null }, $p(g), n;
  }
  function T0(n, r, o) {
    var c = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: fe, key: c == null ? null : "" + c, children: n, containerInfo: r, implementation: o };
  }
  function yh(n) {
    if (!n) return Lr;
    n = n._reactInternals;
    e: {
      if (yt(n) !== n || n.tag !== 1) throw Error(s(170));
      var r = n;
      do {
        switch (r.tag) {
          case 3:
            r = r.stateNode.context;
            break e;
          case 1:
            if (Bn(r.type)) {
              r = r.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        r = r.return;
      } while (r !== null);
      throw Error(s(171));
    }
    if (n.tag === 1) {
      var o = n.type;
      if (Bn(o)) return ic(n, o, r);
    }
    return r;
  }
  function Xm(n, r, o, c, v, g, b, N, F) {
    return n = _d(o, c, !0, n, v, g, b, N, F), n.context = yh(null), o = n.current, c = Gn(), v = al(o), g = Rl(c, v), g.callback = r ?? null, co(o, g, v), n.current.lanes = v, yl(n, v, c), va(n, c), n;
  }
  function Sd(n, r, o, c) {
    var v = r.current, g = Gn(), b = al(v);
    return o = yh(o), r.context === null ? r.context = o : r.pendingContext = o, r = Rl(g, b), r.payload = { element: n }, c = c === void 0 ? null : c, c !== null && (r.callback = c), n = co(v, r, b), n !== null && ($r(n, v, b, g), Hf(n, v, b)), b;
  }
  function Ed(n) {
    if (n = n.current, !n.child) return null;
    switch (n.child.tag) {
      case 5:
        return n.child.stateNode;
      default:
        return n.child.stateNode;
    }
  }
  function gh(n, r) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var o = n.retryLane;
      n.retryLane = o !== 0 && o < r ? o : r;
    }
  }
  function Cd(n, r) {
    gh(n, r), (n = n.alternate) && gh(n, r);
  }
  function Km() {
    return null;
  }
  var yu = typeof reportError == "function" ? reportError : function(n) {
    console.error(n);
  };
  function _h(n) {
    this._internalRoot = n;
  }
  wd.prototype.render = _h.prototype.render = function(n) {
    var r = this._internalRoot;
    if (r === null) throw Error(s(409));
    Sd(n, r, null, null);
  }, wd.prototype.unmount = _h.prototype.unmount = function() {
    var n = this._internalRoot;
    if (n !== null) {
      this._internalRoot = null;
      var r = n.containerInfo;
      vu(function() {
        Sd(null, n, null, null);
      }), r[wl] = null;
    }
  };
  function wd(n) {
    this._internalRoot = n;
  }
  wd.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var r = pt();
      n = { blockedOn: null, target: n, priority: r };
      for (var o = 0; o < Zn.length && r !== 0 && r < Zn[o].priority; o++) ;
      Zn.splice(o, 0, n), o === 0 && Ws(n);
    }
  };
  function Sh(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11);
  }
  function Td(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11 && (n.nodeType !== 8 || n.nodeValue !== " react-mount-point-unstable "));
  }
  function Jm() {
  }
  function x0(n, r, o, c, v) {
    if (v) {
      if (typeof c == "function") {
        var g = c;
        c = function() {
          var J = Ed(b);
          g.call(J);
        };
      }
      var b = Xm(r, c, n, 0, null, !1, !1, "", Jm);
      return n._reactRootContainer = b, n[wl] = b.current, qu(n.nodeType === 8 ? n.parentNode : n), vu(), b;
    }
    for (; v = n.lastChild; ) n.removeChild(v);
    if (typeof c == "function") {
      var N = c;
      c = function() {
        var J = Ed(F);
        N.call(J);
      };
    }
    var F = _d(n, 0, !1, null, null, !1, !1, "", Jm);
    return n._reactRootContainer = F, n[wl] = F.current, qu(n.nodeType === 8 ? n.parentNode : n), vu(function() {
      Sd(r, F, o, c);
    }), F;
  }
  function Fc(n, r, o, c, v) {
    var g = o._reactRootContainer;
    if (g) {
      var b = g;
      if (typeof v == "function") {
        var N = v;
        v = function() {
          var F = Ed(b);
          N.call(F);
        };
      }
      Sd(r, b, n, v);
    } else b = x0(o, r, n, v, c);
    return Ed(b);
  }
  At = function(n) {
    switch (n.tag) {
      case 3:
        var r = n.stateNode;
        if (r.current.memoizedState.isDehydrated) {
          var o = yi(r.pendingLanes);
          o !== 0 && (gl(r, o | 1), va(r, gt()), !(Mt & 6) && (ss = gt() + 500, Xi()));
        }
        break;
      case 13:
        vu(function() {
          var c = Da(n, 1);
          if (c !== null) {
            var v = Gn();
            $r(c, n, 1, v);
          }
        }), Cd(n, 1);
    }
  }, Is = function(n) {
    if (n.tag === 13) {
      var r = Da(n, 134217728);
      if (r !== null) {
        var o = Gn();
        $r(r, n, 134217728, o);
      }
      Cd(n, 134217728);
    }
  }, Vi = function(n) {
    if (n.tag === 13) {
      var r = al(n), o = Da(n, r);
      if (o !== null) {
        var c = Gn();
        $r(o, n, r, c);
      }
      Cd(n, r);
    }
  }, pt = function() {
    return Pt;
  }, Hu = function(n, r) {
    var o = Pt;
    try {
      return Pt = n, r();
    } finally {
      Pt = o;
    }
  }, Xt = function(n, r, o) {
    switch (r) {
      case "input":
        if (ra(n, o), r = o.name, o.type === "radio" && r != null) {
          for (o = n; o.parentNode; ) o = o.parentNode;
          for (o = o.querySelectorAll("input[name=" + JSON.stringify("" + r) + '][type="radio"]'), r = 0; r < o.length; r++) {
            var c = o[r];
            if (c !== n && c.form === n.form) {
              var v = Sn(c);
              if (!v) throw Error(s(90));
              Fr(c), ra(c, v);
            }
          }
        }
        break;
      case "textarea":
        fi(n, o);
        break;
      case "select":
        r = o.value, r != null && Rn(n, !!o.multiple, r, !1);
    }
  }, Fo = dh, Wl = vu;
  var b0 = { usingClientEntryPoint: !1, Events: [Ze, Ci, Sn, ml, Uo, dh] }, Pc = { findFiberByHostInstance: Ko, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Zm = { bundleType: Pc.bundleType, version: Pc.version, rendererPackageName: Pc.rendererPackageName, rendererConfig: Pc.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ie.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = kn(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: Pc.findFiberByHostInstance || Km, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var So = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!So.isDisabled && So.supportsFiber) try {
      Ql = So.inject(Zm), aa = So;
    } catch {
    }
  }
  return ai.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = b0, ai.createPortal = function(n, r) {
    var o = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Sh(r)) throw Error(s(200));
    return T0(n, r, null, o);
  }, ai.createRoot = function(n, r) {
    if (!Sh(n)) throw Error(s(299));
    var o = !1, c = "", v = yu;
    return r != null && (r.unstable_strictMode === !0 && (o = !0), r.identifierPrefix !== void 0 && (c = r.identifierPrefix), r.onRecoverableError !== void 0 && (v = r.onRecoverableError)), r = _d(n, 1, !1, null, null, o, !1, c, v), n[wl] = r.current, qu(n.nodeType === 8 ? n.parentNode : n), new _h(r);
  }, ai.findDOMNode = function(n) {
    if (n == null) return null;
    if (n.nodeType === 1) return n;
    var r = n._reactInternals;
    if (r === void 0)
      throw typeof n.render == "function" ? Error(s(188)) : (n = Object.keys(n).join(","), Error(s(268, n)));
    return n = kn(r), n = n === null ? null : n.stateNode, n;
  }, ai.flushSync = function(n) {
    return vu(n);
  }, ai.hydrate = function(n, r, o) {
    if (!Td(r)) throw Error(s(200));
    return Fc(null, n, r, !0, o);
  }, ai.hydrateRoot = function(n, r, o) {
    if (!Sh(n)) throw Error(s(405));
    var c = o != null && o.hydratedSources || null, v = !1, g = "", b = yu;
    if (o != null && (o.unstable_strictMode === !0 && (v = !0), o.identifierPrefix !== void 0 && (g = o.identifierPrefix), o.onRecoverableError !== void 0 && (b = o.onRecoverableError)), r = Xm(r, null, n, 1, o ?? null, v, !1, g, b), n[wl] = r.current, qu(n), c) for (n = 0; n < c.length; n++) o = c[n], v = o._getVersion, v = v(o._source), r.mutableSourceEagerHydrationData == null ? r.mutableSourceEagerHydrationData = [o, v] : r.mutableSourceEagerHydrationData.push(
      o,
      v
    );
    return new wd(r);
  }, ai.render = function(n, r, o) {
    if (!Td(r)) throw Error(s(200));
    return Fc(null, n, r, !1, o);
  }, ai.unmountComponentAtNode = function(n) {
    if (!Td(n)) throw Error(s(40));
    return n._reactRootContainer ? (vu(function() {
      Fc(null, null, n, !1, function() {
        n._reactRootContainer = null, n[wl] = null;
      });
    }), !0) : !1;
  }, ai.unstable_batchedUpdates = dh, ai.unstable_renderSubtreeIntoContainer = function(n, r, o, c) {
    if (!Td(o)) throw Error(s(200));
    if (n == null || n._reactInternals === void 0) throw Error(s(38));
    return Fc(n, r, o, !1, c);
  }, ai.version = "18.3.1-next-f1338f8080-20240426", ai;
}
var ii = {};
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var mx;
function cN() {
  return mx || (mx = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var _ = Pv(), l = Wx(), s = _.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, f = !1;
    function p(e) {
      f = e;
    }
    function y(e) {
      if (!f) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        E("warn", e, a);
      }
    }
    function h(e) {
      if (!f) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        E("error", e, a);
      }
    }
    function E(e, t, a) {
      {
        var i = s.ReactDebugCurrentFrame, u = i.getStackAddendum();
        u !== "" && (t += "%s", a = a.concat([u]));
        var d = a.map(function(m) {
          return String(m);
        });
        d.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, d);
      }
    }
    var T = 0, x = 1, R = 2, O = 3, A = 4, M = 5, V = 6, L = 7, I = 8, ne = 9, ee = 10, Q = 11, ie = 12, Y = 13, fe = 14, ae = 15, ge = 16, se = 17, Ie = 18, Ke = 19, $e = 21, be = 22, ut = 23, Ge = 24, pe = 25, ce = !0, le = !1, Te = !1, me = !1, P = !1, te = !0, Fe = !0, xe = !0, Qe = !0, it = /* @__PURE__ */ new Set(), rt = {}, ct = {};
    function wt(e, t) {
      Qt(e, t), Qt(e + "Capture", t);
    }
    function Qt(e, t) {
      rt[e] && h("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), rt[e] = t;
      {
        var a = e.toLowerCase();
        ct[a] = e, e === "onDoubleClick" && (ct.ondblclick = e);
      }
      for (var i = 0; i < t.length; i++)
        it.add(t[i]);
    }
    var Pn = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Fr = Object.prototype.hasOwnProperty;
    function bn(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function pr(e) {
      try {
        return Xn(e), !1;
      } catch {
        return !0;
      }
    }
    function Xn(e) {
      return "" + e;
    }
    function Kn(e, t) {
      if (pr(e))
        return h("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, bn(e)), Xn(e);
    }
    function ra(e) {
      if (pr(e))
        return h("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", bn(e)), Xn(e);
    }
    function Fi(e, t) {
      if (pr(e))
        return h("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, bn(e)), Xn(e);
    }
    function wa(e, t) {
      if (pr(e))
        return h("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, bn(e)), Xn(e);
    }
    function ir(e) {
      if (pr(e))
        return h("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", bn(e)), Xn(e);
    }
    function Rn(e) {
      if (pr(e))
        return h("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", bn(e)), Xn(e);
    }
    var Jn = 0, Dr = 1, fi = 2, jn = 3, Or = 4, Ta = 5, di = 6, Pi = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", Re = Pi + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", qe = new RegExp("^[" + Pi + "][" + Re + "]*$"), Et = {}, Wt = {};
    function an(e) {
      return Fr.call(Wt, e) ? !0 : Fr.call(Et, e) ? !1 : qe.test(e) ? (Wt[e] = !0, !0) : (Et[e] = !0, h("Invalid attribute name: `%s`", e), !1);
    }
    function gn(e, t, a) {
      return t !== null ? t.type === Jn : a ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function cn(e, t, a, i) {
      if (a !== null && a.type === Jn)
        return !1;
      switch (typeof t) {
        case "function":
        case "symbol":
          return !0;
        case "boolean": {
          if (i)
            return !1;
          if (a !== null)
            return !a.acceptsBooleans;
          var u = e.toLowerCase().slice(0, 5);
          return u !== "data-" && u !== "aria-";
        }
        default:
          return !1;
      }
    }
    function lr(e, t, a, i) {
      if (t === null || typeof t > "u" || cn(e, t, a, i))
        return !0;
      if (i)
        return !1;
      if (a !== null)
        switch (a.type) {
          case jn:
            return !t;
          case Or:
            return t === !1;
          case Ta:
            return isNaN(t);
          case di:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function ln(e) {
      return Xt.hasOwnProperty(e) ? Xt[e] : null;
    }
    function qt(e, t, a, i, u, d, m) {
      this.acceptsBooleans = t === fi || t === jn || t === Or, this.attributeName = i, this.attributeNamespace = u, this.mustUseProperty = a, this.propertyName = e, this.type = t, this.sanitizeURL = d, this.removeEmptyString = m;
    }
    var Xt = {}, xa = [
      "children",
      "dangerouslySetInnerHTML",
      // TODO: This prevents the assignment of defaultValue to regular
      // elements (not just inputs). Now that ReactDOMInput assigns to the
      // defaultValue property -- do we need this?
      "defaultValue",
      "defaultChecked",
      "innerHTML",
      "suppressContentEditableWarning",
      "suppressHydrationWarning",
      "style"
    ];
    xa.forEach(function(e) {
      Xt[e] = new qt(
        e,
        Jn,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
      var t = e[0], a = e[1];
      Xt[t] = new qt(
        t,
        Dr,
        !1,
        // mustUseProperty
        a,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
      Xt[e] = new qt(
        e,
        fi,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
      Xt[e] = new qt(
        e,
        fi,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "allowFullScreen",
      "async",
      // Note: there is a special case that prevents it from being written to the DOM
      // on the client side because the browsers are inconsistent. Instead we call focus().
      "autoFocus",
      "autoPlay",
      "controls",
      "default",
      "defer",
      "disabled",
      "disablePictureInPicture",
      "disableRemotePlayback",
      "formNoValidate",
      "hidden",
      "loop",
      "noModule",
      "noValidate",
      "open",
      "playsInline",
      "readOnly",
      "required",
      "reversed",
      "scoped",
      "seamless",
      // Microdata
      "itemScope"
    ].forEach(function(e) {
      Xt[e] = new qt(
        e,
        jn,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "checked",
      // Note: `option.selected` is not updated if `select.multiple` is
      // disabled with `removeAttribute`. We have special logic for handling this.
      "multiple",
      "muted",
      "selected"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      Xt[e] = new qt(
        e,
        jn,
        !0,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "capture",
      "download"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      Xt[e] = new qt(
        e,
        Or,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "cols",
      "rows",
      "size",
      "span"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      Xt[e] = new qt(
        e,
        di,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["rowSpan", "start"].forEach(function(e) {
      Xt[e] = new qt(
        e,
        Ta,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var Mr = /[\-\:]([a-z])/g, ja = function(e) {
      return e[1].toUpperCase();
    };
    [
      "accent-height",
      "alignment-baseline",
      "arabic-form",
      "baseline-shift",
      "cap-height",
      "clip-path",
      "clip-rule",
      "color-interpolation",
      "color-interpolation-filters",
      "color-profile",
      "color-rendering",
      "dominant-baseline",
      "enable-background",
      "fill-opacity",
      "fill-rule",
      "flood-color",
      "flood-opacity",
      "font-family",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-style",
      "font-variant",
      "font-weight",
      "glyph-name",
      "glyph-orientation-horizontal",
      "glyph-orientation-vertical",
      "horiz-adv-x",
      "horiz-origin-x",
      "image-rendering",
      "letter-spacing",
      "lighting-color",
      "marker-end",
      "marker-mid",
      "marker-start",
      "overline-position",
      "overline-thickness",
      "paint-order",
      "panose-1",
      "pointer-events",
      "rendering-intent",
      "shape-rendering",
      "stop-color",
      "stop-opacity",
      "strikethrough-position",
      "strikethrough-thickness",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke-width",
      "text-anchor",
      "text-decoration",
      "text-rendering",
      "underline-position",
      "underline-thickness",
      "unicode-bidi",
      "unicode-range",
      "units-per-em",
      "v-alphabetic",
      "v-hanging",
      "v-ideographic",
      "v-mathematical",
      "vector-effect",
      "vert-adv-y",
      "vert-origin-x",
      "vert-origin-y",
      "word-spacing",
      "writing-mode",
      "xmlns:xlink",
      "x-height"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(Mr, ja);
      Xt[t] = new qt(
        t,
        Dr,
        !1,
        // mustUseProperty
        e,
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xlink:actuate",
      "xlink:arcrole",
      "xlink:role",
      "xlink:show",
      "xlink:title",
      "xlink:type"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(Mr, ja);
      Xt[t] = new qt(
        t,
        Dr,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/1999/xlink",
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xml:base",
      "xml:lang",
      "xml:space"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(Mr, ja);
      Xt[t] = new qt(
        t,
        Dr,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      Xt[e] = new qt(
        e,
        Dr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var ml = "xlinkHref";
    Xt[ml] = new qt(
      "xlinkHref",
      Dr,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      Xt[e] = new qt(
        e,
        Dr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !0,
        // sanitizeURL
        !0
      );
    });
    var Uo = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, Fo = !1;
    function Wl(e) {
      !Fo && Uo.test(e) && (Fo = !0, h("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function $l(e, t, a, i) {
      if (i.mustUseProperty) {
        var u = i.propertyName;
        return e[u];
      } else {
        Kn(a, t), i.sanitizeURL && Wl("" + a);
        var d = i.attributeName, m = null;
        if (i.type === Or) {
          if (e.hasAttribute(d)) {
            var S = e.getAttribute(d);
            return S === "" ? !0 : lr(t, a, i, !1) ? S : S === "" + a ? a : S;
          }
        } else if (e.hasAttribute(d)) {
          if (lr(t, a, i, !1))
            return e.getAttribute(d);
          if (i.type === jn)
            return a;
          m = e.getAttribute(d);
        }
        return lr(t, a, i, !1) ? m === null ? a : m : m === "" + a ? a : m;
      }
    }
    function Po(e, t, a, i) {
      {
        if (!an(t))
          return;
        if (!e.hasAttribute(t))
          return a === void 0 ? void 0 : null;
        var u = e.getAttribute(t);
        return Kn(a, t), u === "" + a ? a : u;
      }
    }
    function Pr(e, t, a, i) {
      var u = ln(t);
      if (!gn(t, u, i)) {
        if (lr(t, a, u, i) && (a = null), i || u === null) {
          if (an(t)) {
            var d = t;
            a === null ? e.removeAttribute(d) : (Kn(a, t), e.setAttribute(d, "" + a));
          }
          return;
        }
        var m = u.mustUseProperty;
        if (m) {
          var S = u.propertyName;
          if (a === null) {
            var C = u.type;
            e[S] = C === jn ? !1 : "";
          } else
            e[S] = a;
          return;
        }
        var k = u.attributeName, D = u.attributeNamespace;
        if (a === null)
          e.removeAttribute(k);
        else {
          var B = u.type, j;
          B === jn || B === Or && a === !0 ? j = "" : (Kn(a, k), j = "" + a, u.sanitizeURL && Wl(j.toString())), D ? e.setAttributeNS(D, k, j) : e.setAttribute(k, j);
        }
      }
    }
    var jr = Symbol.for("react.element"), hr = Symbol.for("react.portal"), ji = Symbol.for("react.fragment"), pi = Symbol.for("react.strict_mode"), Hi = Symbol.for("react.profiler"), Bi = Symbol.for("react.provider"), U = Symbol.for("react.context"), he = Symbol.for("react.forward_ref"), Oe = Symbol.for("react.suspense"), je = Symbol.for("react.suspense_list"), yt = Symbol.for("react.memo"), ht = Symbol.for("react.lazy"), bt = Symbol.for("react.scope"), Tt = Symbol.for("react.debug_trace_mode"), kn = Symbol.for("react.offscreen"), on = Symbol.for("react.legacy_hidden"), fn = Symbol.for("react.cache"), vr = Symbol.for("react.tracing_marker"), hi = Symbol.iterator, vi = "@@iterator";
    function gt(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = hi && e[hi] || e[vi];
      return typeof t == "function" ? t : null;
    }
    var St = Object.assign, mi = 0, jo, Ho, Gl, Au, Ql, aa, Vs;
    function Hr() {
    }
    Hr.__reactDisabledLog = !0;
    function mf() {
      {
        if (mi === 0) {
          jo = console.log, Ho = console.info, Gl = console.warn, Au = console.error, Ql = console.group, aa = console.groupCollapsed, Vs = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Hr,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        mi++;
      }
    }
    function yf() {
      {
        if (mi--, mi === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: St({}, e, {
              value: jo
            }),
            info: St({}, e, {
              value: Ho
            }),
            warn: St({}, e, {
              value: Gl
            }),
            error: St({}, e, {
              value: Au
            }),
            group: St({}, e, {
              value: Ql
            }),
            groupCollapsed: St({}, e, {
              value: aa
            }),
            groupEnd: St({}, e, {
              value: Vs
            })
          });
        }
        mi < 0 && h("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var zu = s.ReactCurrentDispatcher, ql;
    function ba(e, t, a) {
      {
        if (ql === void 0)
          try {
            throw Error();
          } catch (u) {
            var i = u.stack.trim().match(/\n( *(at )?)/);
            ql = i && i[1] || "";
          }
        return `
` + ql + e;
      }
    }
    var yi = !1, gi;
    {
      var Uu = typeof WeakMap == "function" ? WeakMap : Map;
      gi = new Uu();
    }
    function Bo(e, t) {
      if (!e || yi)
        return "";
      {
        var a = gi.get(e);
        if (a !== void 0)
          return a;
      }
      var i;
      yi = !0;
      var u = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var d;
      d = zu.current, zu.current = null, mf();
      try {
        if (t) {
          var m = function() {
            throw Error();
          };
          if (Object.defineProperty(m.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(m, []);
            } catch (Z) {
              i = Z;
            }
            Reflect.construct(e, [], m);
          } else {
            try {
              m.call();
            } catch (Z) {
              i = Z;
            }
            e.call(m.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Z) {
            i = Z;
          }
          e();
        }
      } catch (Z) {
        if (Z && i && typeof Z.stack == "string") {
          for (var S = Z.stack.split(`
`), C = i.stack.split(`
`), k = S.length - 1, D = C.length - 1; k >= 1 && D >= 0 && S[k] !== C[D]; )
            D--;
          for (; k >= 1 && D >= 0; k--, D--)
            if (S[k] !== C[D]) {
              if (k !== 1 || D !== 1)
                do
                  if (k--, D--, D < 0 || S[k] !== C[D]) {
                    var B = `
` + S[k].replace(" at new ", " at ");
                    return e.displayName && B.includes("<anonymous>") && (B = B.replace("<anonymous>", e.displayName)), typeof e == "function" && gi.set(e, B), B;
                  }
                while (k >= 1 && D >= 0);
              break;
            }
        }
      } finally {
        yi = !1, zu.current = d, yf(), Error.prepareStackTrace = u;
      }
      var j = e ? e.displayName || e.name : "", X = j ? ba(j) : "";
      return typeof e == "function" && gi.set(e, X), X;
    }
    function Xl(e, t, a) {
      return Bo(e, !0);
    }
    function Fu(e, t, a) {
      return Bo(e, !1);
    }
    function Pu(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function yl(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Bo(e, Pu(e));
      if (typeof e == "string")
        return ba(e);
      switch (e) {
        case Oe:
          return ba("Suspense");
        case je:
          return ba("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case he:
            return Fu(e.render);
          case yt:
            return yl(e.type, t, a);
          case ht: {
            var i = e, u = i._payload, d = i._init;
            try {
              return yl(d(u), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    function vp(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case M:
          return ba(e.type);
        case ge:
          return ba("Lazy");
        case Y:
          return ba("Suspense");
        case Ke:
          return ba("SuspenseList");
        case T:
        case R:
        case ae:
          return Fu(e.type);
        case Q:
          return Fu(e.type.render);
        case x:
          return Xl(e.type);
        default:
          return "";
      }
    }
    function gl(e) {
      try {
        var t = "", a = e;
        do
          t += vp(a), a = a.return;
        while (a);
        return t;
      } catch (i) {
        return `
Error generating stack: ` + i.message + `
` + i.stack;
      }
    }
    function Pt(e, t, a) {
      var i = e.displayName;
      if (i)
        return i;
      var u = t.displayName || t.name || "";
      return u !== "" ? a + "(" + u + ")" : a;
    }
    function ju(e) {
      return e.displayName || "Context";
    }
    function At(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && h("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case ji:
          return "Fragment";
        case hr:
          return "Portal";
        case Hi:
          return "Profiler";
        case pi:
          return "StrictMode";
        case Oe:
          return "Suspense";
        case je:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case U:
            var t = e;
            return ju(t) + ".Consumer";
          case Bi:
            var a = e;
            return ju(a._context) + ".Provider";
          case he:
            return Pt(e, e.render, "ForwardRef");
          case yt:
            var i = e.displayName || null;
            return i !== null ? i : At(e.type) || "Memo";
          case ht: {
            var u = e, d = u._payload, m = u._init;
            try {
              return At(m(d));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function Is(e, t, a) {
      var i = t.displayName || t.name || "";
      return e.displayName || (i !== "" ? a + "(" + i + ")" : a);
    }
    function Vi(e) {
      return e.displayName || "Context";
    }
    function pt(e) {
      var t = e.tag, a = e.type;
      switch (t) {
        case Ge:
          return "Cache";
        case ne:
          var i = a;
          return Vi(i) + ".Consumer";
        case ee:
          var u = a;
          return Vi(u._context) + ".Provider";
        case Ie:
          return "DehydratedFragment";
        case Q:
          return Is(a, a.render, "ForwardRef");
        case L:
          return "Fragment";
        case M:
          return a;
        case A:
          return "Portal";
        case O:
          return "Root";
        case V:
          return "Text";
        case ge:
          return At(a);
        case I:
          return a === pi ? "StrictMode" : "Mode";
        case be:
          return "Offscreen";
        case ie:
          return "Profiler";
        case $e:
          return "Scope";
        case Y:
          return "Suspense";
        case Ke:
          return "SuspenseList";
        case pe:
          return "TracingMarker";
        case x:
        case T:
        case se:
        case R:
        case fe:
        case ae:
          if (typeof a == "function")
            return a.displayName || a.name || null;
          if (typeof a == "string")
            return a;
          break;
      }
      return null;
    }
    var Hu = s.ReactDebugCurrentFrame, mr = null, Ii = !1;
    function Br() {
      {
        if (mr === null)
          return null;
        var e = mr._debugOwner;
        if (e !== null && typeof e < "u")
          return pt(e);
      }
      return null;
    }
    function Yi() {
      return mr === null ? "" : gl(mr);
    }
    function dn() {
      Hu.getCurrentStack = null, mr = null, Ii = !1;
    }
    function Kt(e) {
      Hu.getCurrentStack = e === null ? null : Yi, mr = e, Ii = !1;
    }
    function Kl() {
      return mr;
    }
    function Zn(e) {
      Ii = e;
    }
    function Vr(e) {
      return "" + e;
    }
    function Ha(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return Rn(e), e;
        default:
          return "";
      }
    }
    var Vo = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function Ys(e, t) {
      Vo[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || h("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || h("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function Ws(e) {
      var t = e.type, a = e.nodeName;
      return a && a.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function Jl(e) {
      return e._valueTracker;
    }
    function Io(e) {
      e._valueTracker = null;
    }
    function mp(e) {
      var t = "";
      return e && (Ws(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
    }
    function Ba(e) {
      var t = Ws(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      Rn(e[t]);
      var i = "" + e[t];
      if (!(e.hasOwnProperty(t) || typeof a > "u" || typeof a.get != "function" || typeof a.set != "function")) {
        var u = a.get, d = a.set;
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return u.call(this);
          },
          set: function(S) {
            Rn(S), i = "" + S, d.call(this, S);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        });
        var m = {
          getValue: function() {
            return i;
          },
          setValue: function(S) {
            Rn(S), i = "" + S;
          },
          stopTracking: function() {
            Io(e), delete e[t];
          }
        };
        return m;
      }
    }
    function _i(e) {
      Jl(e) || (e._valueTracker = Ba(e));
    }
    function Wi(e) {
      if (!e)
        return !1;
      var t = Jl(e);
      if (!t)
        return !0;
      var a = t.getValue(), i = mp(e);
      return i !== a ? (t.setValue(i), !0) : !1;
    }
    function Va(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var Bu = !1, Vu = !1, Zl = !1, Yo = !1;
    function Iu(e) {
      var t = e.type === "checkbox" || e.type === "radio";
      return t ? e.checked != null : e.value != null;
    }
    function Yu(e, t) {
      var a = e, i = t.checked, u = St({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: i ?? a._wrapperState.initialChecked
      });
      return u;
    }
    function Si(e, t) {
      Ys("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !Vu && (h("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Br() || "A component", t.type), Vu = !0), t.value !== void 0 && t.defaultValue !== void 0 && !Bu && (h("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Br() || "A component", t.type), Bu = !0);
      var a = e, i = t.defaultValue == null ? "" : t.defaultValue;
      a._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: Ha(t.value != null ? t.value : i),
        controlled: Iu(t)
      };
    }
    function w(e, t) {
      var a = e, i = t.checked;
      i != null && Pr(a, "checked", i, !1);
    }
    function z(e, t) {
      var a = e;
      {
        var i = Iu(t);
        !a._wrapperState.controlled && i && !Yo && (h("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Yo = !0), a._wrapperState.controlled && !i && !Zl && (h("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Zl = !0);
      }
      w(e, t);
      var u = Ha(t.value), d = t.type;
      if (u != null)
        d === "number" ? (u === 0 && a.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        a.value != u) && (a.value = Vr(u)) : a.value !== Vr(u) && (a.value = Vr(u));
      else if (d === "submit" || d === "reset") {
        a.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? tt(a, t.type, u) : t.hasOwnProperty("defaultValue") && tt(a, t.type, Ha(t.defaultValue)), t.checked == null && t.defaultChecked != null && (a.defaultChecked = !!t.defaultChecked);
    }
    function K(e, t, a) {
      var i = e;
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var u = t.type, d = u === "submit" || u === "reset";
        if (d && (t.value === void 0 || t.value === null))
          return;
        var m = Vr(i._wrapperState.initialValue);
        a || m !== i.value && (i.value = m), i.defaultValue = m;
      }
      var S = i.name;
      S !== "" && (i.name = ""), i.defaultChecked = !i.defaultChecked, i.defaultChecked = !!i._wrapperState.initialChecked, S !== "" && (i.name = S);
    }
    function re(e, t) {
      var a = e;
      z(a, t), we(a, t);
    }
    function we(e, t) {
      var a = t.name;
      if (t.type === "radio" && a != null) {
        for (var i = e; i.parentNode; )
          i = i.parentNode;
        Kn(a, "name");
        for (var u = i.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), d = 0; d < u.length; d++) {
          var m = u[d];
          if (!(m === e || m.form !== e.form)) {
            var S = yy(m);
            if (!S)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            Wi(m), z(m, S);
          }
        }
      }
    }
    function tt(e, t, a) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || Va(e.ownerDocument) !== e) && (a == null ? e.defaultValue = Vr(e._wrapperState.initialValue) : e.defaultValue !== Vr(a) && (e.defaultValue = Vr(a)));
    }
    var De = !1, lt = !1, Rt = !1;
    function zt(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? _.Children.forEach(t.children, function(a) {
        a != null && (typeof a == "string" || typeof a == "number" || lt || (lt = !0, h("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (Rt || (Rt = !0, h("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !De && (h("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), De = !0);
    }
    function un(e, t) {
      t.value != null && e.setAttribute("value", Vr(Ha(t.value)));
    }
    var Jt = Array.isArray;
    function Ct(e) {
      return Jt(e);
    }
    var Zt;
    Zt = !1;
    function _n() {
      var e = Br();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var eo = ["value", "defaultValue"];
    function $s(e) {
      {
        Ys("select", e);
        for (var t = 0; t < eo.length; t++) {
          var a = eo[t];
          if (e[a] != null) {
            var i = Ct(e[a]);
            e.multiple && !i ? h("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", a, _n()) : !e.multiple && i && h("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", a, _n());
          }
        }
      }
    }
    function _l(e, t, a, i) {
      var u = e.options;
      if (t) {
        for (var d = a, m = {}, S = 0; S < d.length; S++)
          m["$" + d[S]] = !0;
        for (var C = 0; C < u.length; C++) {
          var k = m.hasOwnProperty("$" + u[C].value);
          u[C].selected !== k && (u[C].selected = k), k && i && (u[C].defaultSelected = !0);
        }
      } else {
        for (var D = Vr(Ha(a)), B = null, j = 0; j < u.length; j++) {
          if (u[j].value === D) {
            u[j].selected = !0, i && (u[j].defaultSelected = !0);
            return;
          }
          B === null && !u[j].disabled && (B = u[j]);
        }
        B !== null && (B.selected = !0);
      }
    }
    function Gs(e, t) {
      return St({}, t, {
        value: void 0
      });
    }
    function Wo(e, t) {
      var a = e;
      $s(t), a._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !Zt && (h("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Zt = !0);
    }
    function yp(e, t) {
      var a = e;
      a.multiple = !!t.multiple;
      var i = t.value;
      i != null ? _l(a, !!t.multiple, i, !1) : t.defaultValue != null && _l(a, !!t.multiple, t.defaultValue, !0);
    }
    function gf(e, t) {
      var a = e, i = a._wrapperState.wasMultiple;
      a._wrapperState.wasMultiple = !!t.multiple;
      var u = t.value;
      u != null ? _l(a, !!t.multiple, u, !1) : i !== !!t.multiple && (t.defaultValue != null ? _l(a, !!t.multiple, t.defaultValue, !0) : _l(a, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function gp(e, t) {
      var a = e, i = t.value;
      i != null && _l(a, !!t.multiple, i, !1);
    }
    var Hv = !1;
    function _p(e, t) {
      var a = e;
      if (t.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var i = St({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: Vr(a._wrapperState.initialValue)
      });
      return i;
    }
    function Sp(e, t) {
      var a = e;
      Ys("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Hv && (h("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Br() || "A component"), Hv = !0);
      var i = t.value;
      if (i == null) {
        var u = t.children, d = t.defaultValue;
        if (u != null) {
          h("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (d != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (Ct(u)) {
              if (u.length > 1)
                throw new Error("<textarea> can only have at most one child.");
              u = u[0];
            }
            d = u;
          }
        }
        d == null && (d = ""), i = d;
      }
      a._wrapperState = {
        initialValue: Ha(i)
      };
    }
    function Bv(e, t) {
      var a = e, i = Ha(t.value), u = Ha(t.defaultValue);
      if (i != null) {
        var d = Vr(i);
        d !== a.value && (a.value = d), t.defaultValue == null && a.defaultValue !== d && (a.defaultValue = d);
      }
      u != null && (a.defaultValue = Vr(u));
    }
    function Vv(e, t) {
      var a = e, i = a.textContent;
      i === a._wrapperState.initialValue && i !== "" && i !== null && (a.value = i);
    }
    function t0(e, t) {
      Bv(e, t);
    }
    var Sl = "http://www.w3.org/1999/xhtml", Ep = "http://www.w3.org/1998/Math/MathML", Cp = "http://www.w3.org/2000/svg";
    function wp(e) {
      switch (e) {
        case "svg":
          return Cp;
        case "math":
          return Ep;
        default:
          return Sl;
      }
    }
    function Tp(e, t) {
      return e == null || e === Sl ? wp(t) : e === Cp && t === "foreignObject" ? Sl : e;
    }
    var Iv = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, a, i, u) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, a, i, u);
        });
      } : e;
    }, _f, Yv = Iv(function(e, t) {
      if (e.namespaceURI === Cp && !("innerHTML" in e)) {
        _f = _f || document.createElement("div"), _f.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var a = _f.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; a.firstChild; )
          e.appendChild(a.firstChild);
        return;
      }
      e.innerHTML = t;
    }), ia = 1, El = 3, Hn = 8, Cl = 9, xp = 11, Wu = function(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === El) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, Qs = {
      animation: ["animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction"],
      background: ["backgroundAttachment", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize"],
      backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
      border: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderBlockEnd: ["borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"],
      borderBlockStart: ["borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"],
      borderBottom: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth"],
      borderColor: ["borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor"],
      borderImage: ["borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth"],
      borderInlineEnd: ["borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"],
      borderInlineStart: ["borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"],
      borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
      borderRadius: ["borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"],
      borderRight: ["borderRightColor", "borderRightStyle", "borderRightWidth"],
      borderStyle: ["borderBottomStyle", "borderLeftStyle", "borderRightStyle", "borderTopStyle"],
      borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderWidth: ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth"],
      columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
      columns: ["columnCount", "columnWidth"],
      flex: ["flexBasis", "flexGrow", "flexShrink"],
      flexFlow: ["flexDirection", "flexWrap"],
      font: ["fontFamily", "fontFeatureSettings", "fontKerning", "fontLanguageOverride", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition", "fontWeight", "lineHeight"],
      fontVariant: ["fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition"],
      gap: ["columnGap", "rowGap"],
      grid: ["gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      gridArea: ["gridColumnEnd", "gridColumnStart", "gridRowEnd", "gridRowStart"],
      gridColumn: ["gridColumnEnd", "gridColumnStart"],
      gridColumnGap: ["columnGap"],
      gridGap: ["columnGap", "rowGap"],
      gridRow: ["gridRowEnd", "gridRowStart"],
      gridRowGap: ["rowGap"],
      gridTemplate: ["gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
      margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
      marker: ["markerEnd", "markerMid", "markerStart"],
      mask: ["maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPositionX", "maskPositionY", "maskRepeat", "maskSize"],
      maskPosition: ["maskPositionX", "maskPositionY"],
      outline: ["outlineColor", "outlineStyle", "outlineWidth"],
      overflow: ["overflowX", "overflowY"],
      padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
      placeContent: ["alignContent", "justifyContent"],
      placeItems: ["alignItems", "justifyItems"],
      placeSelf: ["alignSelf", "justifySelf"],
      textDecoration: ["textDecorationColor", "textDecorationLine", "textDecorationStyle"],
      textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
      transition: ["transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction"],
      wordWrap: ["overflowWrap"]
    }, qs = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      // SVG-related properties
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    };
    function Wv(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var $v = ["Webkit", "ms", "Moz", "O"];
    Object.keys(qs).forEach(function(e) {
      $v.forEach(function(t) {
        qs[Wv(t, e)] = qs[e];
      });
    });
    function Sf(e, t, a) {
      var i = t == null || typeof t == "boolean" || t === "";
      return i ? "" : !a && typeof t == "number" && t !== 0 && !(qs.hasOwnProperty(e) && qs[e]) ? t + "px" : (wa(t, e), ("" + t).trim());
    }
    var Gv = /([A-Z])/g, Qv = /^ms-/;
    function $u(e) {
      return e.replace(Gv, "-$1").toLowerCase().replace(Qv, "-ms-");
    }
    var qv = function() {
    };
    {
      var n0 = /^(?:webkit|moz|o)[A-Z]/, r0 = /^-ms-/, Xv = /-(.)/g, bp = /;\s*$/, $i = {}, $o = {}, Kv = !1, Xs = !1, a0 = function(e) {
        return e.replace(Xv, function(t, a) {
          return a.toUpperCase();
        });
      }, Jv = function(e) {
        $i.hasOwnProperty(e) && $i[e] || ($i[e] = !0, h(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          a0(e.replace(r0, "ms-"))
        ));
      }, Rp = function(e) {
        $i.hasOwnProperty(e) && $i[e] || ($i[e] = !0, h("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, kp = function(e, t) {
        $o.hasOwnProperty(t) && $o[t] || ($o[t] = !0, h(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(bp, "")));
      }, Zv = function(e, t) {
        Kv || (Kv = !0, h("`NaN` is an invalid value for the `%s` css style property.", e));
      }, em = function(e, t) {
        Xs || (Xs = !0, h("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      qv = function(e, t) {
        e.indexOf("-") > -1 ? Jv(e) : n0.test(e) ? Rp(e) : bp.test(t) && kp(e, t), typeof t == "number" && (isNaN(t) ? Zv(e, t) : isFinite(t) || em(e, t));
      };
    }
    var tm = qv;
    function i0(e) {
      {
        var t = "", a = "";
        for (var i in e)
          if (e.hasOwnProperty(i)) {
            var u = e[i];
            if (u != null) {
              var d = i.indexOf("--") === 0;
              t += a + (d ? i : $u(i)) + ":", t += Sf(i, u, d), a = ";";
            }
          }
        return t || null;
      }
    }
    function nm(e, t) {
      var a = e.style;
      for (var i in t)
        if (t.hasOwnProperty(i)) {
          var u = i.indexOf("--") === 0;
          u || tm(i, t[i]);
          var d = Sf(i, t[i], u);
          i === "float" && (i = "cssFloat"), u ? a.setProperty(i, d) : a[i] = d;
        }
    }
    function l0(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function rm(e) {
      var t = {};
      for (var a in e)
        for (var i = Qs[a] || [a], u = 0; u < i.length; u++)
          t[i[u]] = a;
      return t;
    }
    function o0(e, t) {
      {
        if (!t)
          return;
        var a = rm(e), i = rm(t), u = {};
        for (var d in a) {
          var m = a[d], S = i[d];
          if (S && m !== S) {
            var C = m + "," + S;
            if (u[C])
              continue;
            u[C] = !0, h("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", l0(e[m]) ? "Removing" : "Updating", m, S);
          }
        }
      }
    }
    var Ei = {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0
      // NOTE: menuitem's close tag should be omitted, but that causes problems.
    }, Ks = St({
      menuitem: !0
    }, Ei), am = "__html";
    function Ef(e, t) {
      if (t) {
        if (Ks[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(am in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && h("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function to(e, t) {
      if (e.indexOf("-") === -1)
        return typeof t.is == "string";
      switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var Js = {
      // HTML
      accept: "accept",
      acceptcharset: "acceptCharset",
      "accept-charset": "acceptCharset",
      accesskey: "accessKey",
      action: "action",
      allowfullscreen: "allowFullScreen",
      alt: "alt",
      as: "as",
      async: "async",
      autocapitalize: "autoCapitalize",
      autocomplete: "autoComplete",
      autocorrect: "autoCorrect",
      autofocus: "autoFocus",
      autoplay: "autoPlay",
      autosave: "autoSave",
      capture: "capture",
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      challenge: "challenge",
      charset: "charSet",
      checked: "checked",
      children: "children",
      cite: "cite",
      class: "className",
      classid: "classID",
      classname: "className",
      cols: "cols",
      colspan: "colSpan",
      content: "content",
      contenteditable: "contentEditable",
      contextmenu: "contextMenu",
      controls: "controls",
      controlslist: "controlsList",
      coords: "coords",
      crossorigin: "crossOrigin",
      dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
      data: "data",
      datetime: "dateTime",
      default: "default",
      defaultchecked: "defaultChecked",
      defaultvalue: "defaultValue",
      defer: "defer",
      dir: "dir",
      disabled: "disabled",
      disablepictureinpicture: "disablePictureInPicture",
      disableremoteplayback: "disableRemotePlayback",
      download: "download",
      draggable: "draggable",
      enctype: "encType",
      enterkeyhint: "enterKeyHint",
      for: "htmlFor",
      form: "form",
      formmethod: "formMethod",
      formaction: "formAction",
      formenctype: "formEncType",
      formnovalidate: "formNoValidate",
      formtarget: "formTarget",
      frameborder: "frameBorder",
      headers: "headers",
      height: "height",
      hidden: "hidden",
      high: "high",
      href: "href",
      hreflang: "hrefLang",
      htmlfor: "htmlFor",
      httpequiv: "httpEquiv",
      "http-equiv": "httpEquiv",
      icon: "icon",
      id: "id",
      imagesizes: "imageSizes",
      imagesrcset: "imageSrcSet",
      innerhtml: "innerHTML",
      inputmode: "inputMode",
      integrity: "integrity",
      is: "is",
      itemid: "itemID",
      itemprop: "itemProp",
      itemref: "itemRef",
      itemscope: "itemScope",
      itemtype: "itemType",
      keyparams: "keyParams",
      keytype: "keyType",
      kind: "kind",
      label: "label",
      lang: "lang",
      list: "list",
      loop: "loop",
      low: "low",
      manifest: "manifest",
      marginwidth: "marginWidth",
      marginheight: "marginHeight",
      max: "max",
      maxlength: "maxLength",
      media: "media",
      mediagroup: "mediaGroup",
      method: "method",
      min: "min",
      minlength: "minLength",
      multiple: "multiple",
      muted: "muted",
      name: "name",
      nomodule: "noModule",
      nonce: "nonce",
      novalidate: "noValidate",
      open: "open",
      optimum: "optimum",
      pattern: "pattern",
      placeholder: "placeholder",
      playsinline: "playsInline",
      poster: "poster",
      preload: "preload",
      profile: "profile",
      radiogroup: "radioGroup",
      readonly: "readOnly",
      referrerpolicy: "referrerPolicy",
      rel: "rel",
      required: "required",
      reversed: "reversed",
      role: "role",
      rows: "rows",
      rowspan: "rowSpan",
      sandbox: "sandbox",
      scope: "scope",
      scoped: "scoped",
      scrolling: "scrolling",
      seamless: "seamless",
      selected: "selected",
      shape: "shape",
      size: "size",
      sizes: "sizes",
      span: "span",
      spellcheck: "spellCheck",
      src: "src",
      srcdoc: "srcDoc",
      srclang: "srcLang",
      srcset: "srcSet",
      start: "start",
      step: "step",
      style: "style",
      summary: "summary",
      tabindex: "tabIndex",
      target: "target",
      title: "title",
      type: "type",
      usemap: "useMap",
      value: "value",
      width: "width",
      wmode: "wmode",
      wrap: "wrap",
      // SVG
      about: "about",
      accentheight: "accentHeight",
      "accent-height": "accentHeight",
      accumulate: "accumulate",
      additive: "additive",
      alignmentbaseline: "alignmentBaseline",
      "alignment-baseline": "alignmentBaseline",
      allowreorder: "allowReorder",
      alphabetic: "alphabetic",
      amplitude: "amplitude",
      arabicform: "arabicForm",
      "arabic-form": "arabicForm",
      ascent: "ascent",
      attributename: "attributeName",
      attributetype: "attributeType",
      autoreverse: "autoReverse",
      azimuth: "azimuth",
      basefrequency: "baseFrequency",
      baselineshift: "baselineShift",
      "baseline-shift": "baselineShift",
      baseprofile: "baseProfile",
      bbox: "bbox",
      begin: "begin",
      bias: "bias",
      by: "by",
      calcmode: "calcMode",
      capheight: "capHeight",
      "cap-height": "capHeight",
      clip: "clip",
      clippath: "clipPath",
      "clip-path": "clipPath",
      clippathunits: "clipPathUnits",
      cliprule: "clipRule",
      "clip-rule": "clipRule",
      color: "color",
      colorinterpolation: "colorInterpolation",
      "color-interpolation": "colorInterpolation",
      colorinterpolationfilters: "colorInterpolationFilters",
      "color-interpolation-filters": "colorInterpolationFilters",
      colorprofile: "colorProfile",
      "color-profile": "colorProfile",
      colorrendering: "colorRendering",
      "color-rendering": "colorRendering",
      contentscripttype: "contentScriptType",
      contentstyletype: "contentStyleType",
      cursor: "cursor",
      cx: "cx",
      cy: "cy",
      d: "d",
      datatype: "datatype",
      decelerate: "decelerate",
      descent: "descent",
      diffuseconstant: "diffuseConstant",
      direction: "direction",
      display: "display",
      divisor: "divisor",
      dominantbaseline: "dominantBaseline",
      "dominant-baseline": "dominantBaseline",
      dur: "dur",
      dx: "dx",
      dy: "dy",
      edgemode: "edgeMode",
      elevation: "elevation",
      enablebackground: "enableBackground",
      "enable-background": "enableBackground",
      end: "end",
      exponent: "exponent",
      externalresourcesrequired: "externalResourcesRequired",
      fill: "fill",
      fillopacity: "fillOpacity",
      "fill-opacity": "fillOpacity",
      fillrule: "fillRule",
      "fill-rule": "fillRule",
      filter: "filter",
      filterres: "filterRes",
      filterunits: "filterUnits",
      floodopacity: "floodOpacity",
      "flood-opacity": "floodOpacity",
      floodcolor: "floodColor",
      "flood-color": "floodColor",
      focusable: "focusable",
      fontfamily: "fontFamily",
      "font-family": "fontFamily",
      fontsize: "fontSize",
      "font-size": "fontSize",
      fontsizeadjust: "fontSizeAdjust",
      "font-size-adjust": "fontSizeAdjust",
      fontstretch: "fontStretch",
      "font-stretch": "fontStretch",
      fontstyle: "fontStyle",
      "font-style": "fontStyle",
      fontvariant: "fontVariant",
      "font-variant": "fontVariant",
      fontweight: "fontWeight",
      "font-weight": "fontWeight",
      format: "format",
      from: "from",
      fx: "fx",
      fy: "fy",
      g1: "g1",
      g2: "g2",
      glyphname: "glyphName",
      "glyph-name": "glyphName",
      glyphorientationhorizontal: "glyphOrientationHorizontal",
      "glyph-orientation-horizontal": "glyphOrientationHorizontal",
      glyphorientationvertical: "glyphOrientationVertical",
      "glyph-orientation-vertical": "glyphOrientationVertical",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      hanging: "hanging",
      horizadvx: "horizAdvX",
      "horiz-adv-x": "horizAdvX",
      horizoriginx: "horizOriginX",
      "horiz-origin-x": "horizOriginX",
      ideographic: "ideographic",
      imagerendering: "imageRendering",
      "image-rendering": "imageRendering",
      in2: "in2",
      in: "in",
      inlist: "inlist",
      intercept: "intercept",
      k1: "k1",
      k2: "k2",
      k3: "k3",
      k4: "k4",
      k: "k",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      kerning: "kerning",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      letterspacing: "letterSpacing",
      "letter-spacing": "letterSpacing",
      lightingcolor: "lightingColor",
      "lighting-color": "lightingColor",
      limitingconeangle: "limitingConeAngle",
      local: "local",
      markerend: "markerEnd",
      "marker-end": "markerEnd",
      markerheight: "markerHeight",
      markermid: "markerMid",
      "marker-mid": "markerMid",
      markerstart: "markerStart",
      "marker-start": "markerStart",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      mask: "mask",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      mathematical: "mathematical",
      mode: "mode",
      numoctaves: "numOctaves",
      offset: "offset",
      opacity: "opacity",
      operator: "operator",
      order: "order",
      orient: "orient",
      orientation: "orientation",
      origin: "origin",
      overflow: "overflow",
      overlineposition: "overlinePosition",
      "overline-position": "overlinePosition",
      overlinethickness: "overlineThickness",
      "overline-thickness": "overlineThickness",
      paintorder: "paintOrder",
      "paint-order": "paintOrder",
      panose1: "panose1",
      "panose-1": "panose1",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointerevents: "pointerEvents",
      "pointer-events": "pointerEvents",
      points: "points",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      prefix: "prefix",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      property: "property",
      r: "r",
      radius: "radius",
      refx: "refX",
      refy: "refY",
      renderingintent: "renderingIntent",
      "rendering-intent": "renderingIntent",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      resource: "resource",
      restart: "restart",
      result: "result",
      results: "results",
      rotate: "rotate",
      rx: "rx",
      ry: "ry",
      scale: "scale",
      security: "security",
      seed: "seed",
      shaperendering: "shapeRendering",
      "shape-rendering": "shapeRendering",
      slope: "slope",
      spacing: "spacing",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      speed: "speed",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stemh: "stemh",
      stemv: "stemv",
      stitchtiles: "stitchTiles",
      stopcolor: "stopColor",
      "stop-color": "stopColor",
      stopopacity: "stopOpacity",
      "stop-opacity": "stopOpacity",
      strikethroughposition: "strikethroughPosition",
      "strikethrough-position": "strikethroughPosition",
      strikethroughthickness: "strikethroughThickness",
      "strikethrough-thickness": "strikethroughThickness",
      string: "string",
      stroke: "stroke",
      strokedasharray: "strokeDasharray",
      "stroke-dasharray": "strokeDasharray",
      strokedashoffset: "strokeDashoffset",
      "stroke-dashoffset": "strokeDashoffset",
      strokelinecap: "strokeLinecap",
      "stroke-linecap": "strokeLinecap",
      strokelinejoin: "strokeLinejoin",
      "stroke-linejoin": "strokeLinejoin",
      strokemiterlimit: "strokeMiterlimit",
      "stroke-miterlimit": "strokeMiterlimit",
      strokewidth: "strokeWidth",
      "stroke-width": "strokeWidth",
      strokeopacity: "strokeOpacity",
      "stroke-opacity": "strokeOpacity",
      suppresscontenteditablewarning: "suppressContentEditableWarning",
      suppresshydrationwarning: "suppressHydrationWarning",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textanchor: "textAnchor",
      "text-anchor": "textAnchor",
      textdecoration: "textDecoration",
      "text-decoration": "textDecoration",
      textlength: "textLength",
      textrendering: "textRendering",
      "text-rendering": "textRendering",
      to: "to",
      transform: "transform",
      typeof: "typeof",
      u1: "u1",
      u2: "u2",
      underlineposition: "underlinePosition",
      "underline-position": "underlinePosition",
      underlinethickness: "underlineThickness",
      "underline-thickness": "underlineThickness",
      unicode: "unicode",
      unicodebidi: "unicodeBidi",
      "unicode-bidi": "unicodeBidi",
      unicoderange: "unicodeRange",
      "unicode-range": "unicodeRange",
      unitsperem: "unitsPerEm",
      "units-per-em": "unitsPerEm",
      unselectable: "unselectable",
      valphabetic: "vAlphabetic",
      "v-alphabetic": "vAlphabetic",
      values: "values",
      vectoreffect: "vectorEffect",
      "vector-effect": "vectorEffect",
      version: "version",
      vertadvy: "vertAdvY",
      "vert-adv-y": "vertAdvY",
      vertoriginx: "vertOriginX",
      "vert-origin-x": "vertOriginX",
      vertoriginy: "vertOriginY",
      "vert-origin-y": "vertOriginY",
      vhanging: "vHanging",
      "v-hanging": "vHanging",
      videographic: "vIdeographic",
      "v-ideographic": "vIdeographic",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      visibility: "visibility",
      vmathematical: "vMathematical",
      "v-mathematical": "vMathematical",
      vocab: "vocab",
      widths: "widths",
      wordspacing: "wordSpacing",
      "word-spacing": "wordSpacing",
      writingmode: "writingMode",
      "writing-mode": "writingMode",
      x1: "x1",
      x2: "x2",
      x: "x",
      xchannelselector: "xChannelSelector",
      xheight: "xHeight",
      "x-height": "xHeight",
      xlinkactuate: "xlinkActuate",
      "xlink:actuate": "xlinkActuate",
      xlinkarcrole: "xlinkArcrole",
      "xlink:arcrole": "xlinkArcrole",
      xlinkhref: "xlinkHref",
      "xlink:href": "xlinkHref",
      xlinkrole: "xlinkRole",
      "xlink:role": "xlinkRole",
      xlinkshow: "xlinkShow",
      "xlink:show": "xlinkShow",
      xlinktitle: "xlinkTitle",
      "xlink:title": "xlinkTitle",
      xlinktype: "xlinkType",
      "xlink:type": "xlinkType",
      xmlbase: "xmlBase",
      "xml:base": "xmlBase",
      xmllang: "xmlLang",
      "xml:lang": "xmlLang",
      xmlns: "xmlns",
      "xml:space": "xmlSpace",
      xmlnsxlink: "xmlnsXlink",
      "xmlns:xlink": "xmlnsXlink",
      xmlspace: "xmlSpace",
      y1: "y1",
      y2: "y2",
      y: "y",
      ychannelselector: "yChannelSelector",
      z: "z",
      zoomandpan: "zoomAndPan"
    }, Cf = {
      "aria-current": 0,
      // state
      "aria-description": 0,
      "aria-details": 0,
      "aria-disabled": 0,
      // state
      "aria-hidden": 0,
      // state
      "aria-invalid": 0,
      // state
      "aria-keyshortcuts": 0,
      "aria-label": 0,
      "aria-roledescription": 0,
      // Widget Attributes
      "aria-autocomplete": 0,
      "aria-checked": 0,
      "aria-expanded": 0,
      "aria-haspopup": 0,
      "aria-level": 0,
      "aria-modal": 0,
      "aria-multiline": 0,
      "aria-multiselectable": 0,
      "aria-orientation": 0,
      "aria-placeholder": 0,
      "aria-pressed": 0,
      "aria-readonly": 0,
      "aria-required": 0,
      "aria-selected": 0,
      "aria-sort": 0,
      "aria-valuemax": 0,
      "aria-valuemin": 0,
      "aria-valuenow": 0,
      "aria-valuetext": 0,
      // Live Region Attributes
      "aria-atomic": 0,
      "aria-busy": 0,
      "aria-live": 0,
      "aria-relevant": 0,
      // Drag-and-Drop Attributes
      "aria-dropeffect": 0,
      "aria-grabbed": 0,
      // Relationship Attributes
      "aria-activedescendant": 0,
      "aria-colcount": 0,
      "aria-colindex": 0,
      "aria-colspan": 0,
      "aria-controls": 0,
      "aria-describedby": 0,
      "aria-errormessage": 0,
      "aria-flowto": 0,
      "aria-labelledby": 0,
      "aria-owns": 0,
      "aria-posinset": 0,
      "aria-rowcount": 0,
      "aria-rowindex": 0,
      "aria-rowspan": 0,
      "aria-setsize": 0
    }, Gu = {}, u0 = new RegExp("^(aria)-[" + Re + "]*$"), Qu = new RegExp("^(aria)[A-Z][" + Re + "]*$");
    function Dp(e, t) {
      {
        if (Fr.call(Gu, t) && Gu[t])
          return !0;
        if (Qu.test(t)) {
          var a = "aria-" + t.slice(4).toLowerCase(), i = Cf.hasOwnProperty(a) ? a : null;
          if (i == null)
            return h("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), Gu[t] = !0, !0;
          if (t !== i)
            return h("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, i), Gu[t] = !0, !0;
        }
        if (u0.test(t)) {
          var u = t.toLowerCase(), d = Cf.hasOwnProperty(u) ? u : null;
          if (d == null)
            return Gu[t] = !0, !1;
          if (t !== d)
            return h("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, d), Gu[t] = !0, !0;
        }
      }
      return !0;
    }
    function Zs(e, t) {
      {
        var a = [];
        for (var i in t) {
          var u = Dp(e, i);
          u || a.push(i);
        }
        var d = a.map(function(m) {
          return "`" + m + "`";
        }).join(", ");
        a.length === 1 ? h("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", d, e) : a.length > 1 && h("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", d, e);
      }
    }
    function Op(e, t) {
      to(e, t) || Zs(e, t);
    }
    var Mp = !1;
    function wf(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !Mp && (Mp = !0, e === "select" && t.multiple ? h("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : h("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var Go = function() {
    };
    {
      var yr = {}, Lp = /^on./, Tf = /^on[^A-Z]/, im = new RegExp("^(aria)-[" + Re + "]*$"), lm = new RegExp("^(aria)[A-Z][" + Re + "]*$");
      Go = function(e, t, a, i) {
        if (Fr.call(yr, t) && yr[t])
          return !0;
        var u = t.toLowerCase();
        if (u === "onfocusin" || u === "onfocusout")
          return h("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), yr[t] = !0, !0;
        if (i != null) {
          var d = i.registrationNameDependencies, m = i.possibleRegistrationNames;
          if (d.hasOwnProperty(t))
            return !0;
          var S = m.hasOwnProperty(u) ? m[u] : null;
          if (S != null)
            return h("Invalid event handler property `%s`. Did you mean `%s`?", t, S), yr[t] = !0, !0;
          if (Lp.test(t))
            return h("Unknown event handler property `%s`. It will be ignored.", t), yr[t] = !0, !0;
        } else if (Lp.test(t))
          return Tf.test(t) && h("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), yr[t] = !0, !0;
        if (im.test(t) || lm.test(t))
          return !0;
        if (u === "innerhtml")
          return h("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), yr[t] = !0, !0;
        if (u === "aria")
          return h("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), yr[t] = !0, !0;
        if (u === "is" && a !== null && a !== void 0 && typeof a != "string")
          return h("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof a), yr[t] = !0, !0;
        if (typeof a == "number" && isNaN(a))
          return h("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), yr[t] = !0, !0;
        var C = ln(t), k = C !== null && C.type === Jn;
        if (Js.hasOwnProperty(u)) {
          var D = Js[u];
          if (D !== t)
            return h("Invalid DOM property `%s`. Did you mean `%s`?", t, D), yr[t] = !0, !0;
        } else if (!k && t !== u)
          return h("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, u), yr[t] = !0, !0;
        return typeof a == "boolean" && cn(t, a, C, !1) ? (a ? h('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', a, t, t, a, t) : h('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', a, t, t, a, t, t, t), yr[t] = !0, !0) : k ? !0 : cn(t, a, C, !1) ? (yr[t] = !0, !1) : ((a === "false" || a === "true") && C !== null && C.type === jn && (h("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", a, t, a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, a), yr[t] = !0), !0);
      };
    }
    var om = function(e, t, a) {
      {
        var i = [];
        for (var u in t) {
          var d = Go(e, u, t[u], a);
          d || i.push(u);
        }
        var m = i.map(function(S) {
          return "`" + S + "`";
        }).join(", ");
        i.length === 1 ? h("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", m, e) : i.length > 1 && h("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", m, e);
      }
    };
    function um(e, t, a) {
      to(e, t) || om(e, t, a);
    }
    var Np = 1, xf = 2, Ia = 4, Ap = Np | xf | Ia, Qo = null;
    function s0(e) {
      Qo !== null && h("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Qo = e;
    }
    function c0() {
      Qo === null && h("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Qo = null;
    }
    function ec(e) {
      return e === Qo;
    }
    function zp(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === El ? t.parentNode : t;
    }
    var bf = null, qo = null, $t = null;
    function Rf(e) {
      var t = vs(e);
      if (t) {
        if (typeof bf != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var a = t.stateNode;
        if (a) {
          var i = yy(a);
          bf(t.stateNode, t.type, i);
        }
      }
    }
    function kf(e) {
      bf = e;
    }
    function qu(e) {
      qo ? $t ? $t.push(e) : $t = [e] : qo = e;
    }
    function sm() {
      return qo !== null || $t !== null;
    }
    function Df() {
      if (qo) {
        var e = qo, t = $t;
        if (qo = null, $t = null, Rf(e), t)
          for (var a = 0; a < t.length; a++)
            Rf(t[a]);
      }
    }
    var Xu = function(e, t) {
      return e(t);
    }, tc = function() {
    }, no = !1;
    function cm() {
      var e = sm();
      e && (tc(), Df());
    }
    function fm(e, t, a) {
      if (no)
        return e(t, a);
      no = !0;
      try {
        return Xu(e, t, a);
      } finally {
        no = !1, cm();
      }
    }
    function f0(e, t, a) {
      Xu = e, tc = a;
    }
    function dm(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function Of(e, t, a) {
      switch (e) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          return !!(a.disabled && dm(t));
        default:
          return !1;
      }
    }
    function ro(e, t) {
      var a = e.stateNode;
      if (a === null)
        return null;
      var i = yy(a);
      if (i === null)
        return null;
      var u = i[t];
      if (Of(t, e.type, i))
        return null;
      if (u && typeof u != "function")
        throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof u + "` type.");
      return u;
    }
    var nc = !1;
    if (Pn)
      try {
        var Xo = {};
        Object.defineProperty(Xo, "passive", {
          get: function() {
            nc = !0;
          }
        }), window.addEventListener("test", Xo, Xo), window.removeEventListener("test", Xo, Xo);
      } catch {
        nc = !1;
      }
    function Mf(e, t, a, i, u, d, m, S, C) {
      var k = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(a, k);
      } catch (D) {
        this.onError(D);
      }
    }
    var Lf = Mf;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var Up = document.createElement("react");
      Lf = function(t, a, i, u, d, m, S, C, k) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var D = document.createEvent("Event"), B = !1, j = !0, X = window.event, Z = Object.getOwnPropertyDescriptor(window, "event");
        function oe() {
          Up.removeEventListener(ue, nt, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = X);
        }
        var Le = Array.prototype.slice.call(arguments, 3);
        function nt() {
          B = !0, oe(), a.apply(i, Le), j = !1;
        }
        var Xe, Nt = !1, kt = !1;
        function $(G) {
          if (Xe = G.error, Nt = !0, Xe === null && G.colno === 0 && G.lineno === 0 && (kt = !0), G.defaultPrevented && Xe != null && typeof Xe == "object")
            try {
              Xe._suppressLogging = !0;
            } catch {
            }
        }
        var ue = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", $), Up.addEventListener(ue, nt, !1), D.initEvent(ue, !1, !1), Up.dispatchEvent(D), Z && Object.defineProperty(window, "event", Z), B && j && (Nt ? kt && (Xe = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : Xe = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(Xe)), window.removeEventListener("error", $), !B)
          return oe(), Mf.apply(this, arguments);
      };
    }
    var pm = Lf, Ku = !1, Nf = null, Ju = !1, Gi = null, hm = {
      onError: function(e) {
        Ku = !0, Nf = e;
      }
    };
    function ao(e, t, a, i, u, d, m, S, C) {
      Ku = !1, Nf = null, pm.apply(hm, arguments);
    }
    function Qi(e, t, a, i, u, d, m, S, C) {
      if (ao.apply(this, arguments), Ku) {
        var k = ac();
        Ju || (Ju = !0, Gi = k);
      }
    }
    function rc() {
      if (Ju) {
        var e = Gi;
        throw Ju = !1, Gi = null, e;
      }
    }
    function wl() {
      return Ku;
    }
    function ac() {
      if (Ku) {
        var e = Nf;
        return Ku = !1, Nf = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function Zu(e) {
      return e._reactInternals;
    }
    function d0(e) {
      return e._reactInternals !== void 0;
    }
    function Ko(e, t) {
      e._reactInternals = t;
    }
    var Ze = (
      /*                      */
      0
    ), Ci = (
      /*                */
      1
    ), Sn = (
      /*                    */
      2
    ), Ot = (
      /*                       */
      4
    ), Ya = (
      /*                */
      16
    ), Wa = (
      /*                 */
      32
    ), sn = (
      /*                     */
      64
    ), Je = (
      /*                   */
      128
    ), Lr = (
      /*            */
      256
    ), Tn = (
      /*                          */
      512
    ), er = (
      /*                     */
      1024
    ), la = (
      /*                      */
      2048
    ), oa = (
      /*                    */
      4096
    ), Bn = (
      /*                   */
      8192
    ), es = (
      /*             */
      16384
    ), vm = (
      /*               */
      32767
    ), ic = (
      /*                   */
      32768
    ), or = (
      /*                */
      65536
    ), Af = (
      /* */
      131072
    ), qi = (
      /*                       */
      1048576
    ), ts = (
      /*                    */
      2097152
    ), Tl = (
      /*                 */
      4194304
    ), zf = (
      /*                */
      8388608
    ), io = (
      /*               */
      16777216
    ), Xi = (
      /*              */
      33554432
    ), lo = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      Ot | er | 0
    ), oo = Sn | Ot | Ya | Wa | Tn | oa | Bn, uo = Ot | sn | Tn | Bn, xl = la | Ya, Vn = Tl | zf | ts, $a = s.ReactCurrentOwner;
    function Ra(e) {
      var t = e, a = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var i = t;
        do
          t = i, (t.flags & (Sn | oa)) !== Ze && (a = t.return), i = t.return;
        while (i);
      }
      return t.tag === O ? a : null;
    }
    function Ki(e) {
      if (e.tag === Y) {
        var t = e.memoizedState;
        if (t === null) {
          var a = e.alternate;
          a !== null && (t = a.memoizedState);
        }
        if (t !== null)
          return t.dehydrated;
      }
      return null;
    }
    function Ji(e) {
      return e.tag === O ? e.stateNode.containerInfo : null;
    }
    function Jo(e) {
      return Ra(e) === e;
    }
    function mm(e) {
      {
        var t = $a.current;
        if (t !== null && t.tag === x) {
          var a = t, i = a.stateNode;
          i._warnedAboutRefsInRender || h("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", pt(a) || "A component"), i._warnedAboutRefsInRender = !0;
        }
      }
      var u = Zu(e);
      return u ? Ra(u) === u : !1;
    }
    function Uf(e) {
      if (Ra(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function Ff(e) {
      var t = e.alternate;
      if (!t) {
        var a = Ra(e);
        if (a === null)
          throw new Error("Unable to find node on an unmounted component.");
        return a !== e ? null : e;
      }
      for (var i = e, u = t; ; ) {
        var d = i.return;
        if (d === null)
          break;
        var m = d.alternate;
        if (m === null) {
          var S = d.return;
          if (S !== null) {
            i = u = S;
            continue;
          }
          break;
        }
        if (d.child === m.child) {
          for (var C = d.child; C; ) {
            if (C === i)
              return Uf(d), e;
            if (C === u)
              return Uf(d), t;
            C = C.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (i.return !== u.return)
          i = d, u = m;
        else {
          for (var k = !1, D = d.child; D; ) {
            if (D === i) {
              k = !0, i = d, u = m;
              break;
            }
            if (D === u) {
              k = !0, u = d, i = m;
              break;
            }
            D = D.sibling;
          }
          if (!k) {
            for (D = m.child; D; ) {
              if (D === i) {
                k = !0, i = m, u = d;
                break;
              }
              if (D === u) {
                k = !0, u = m, i = d;
                break;
              }
              D = D.sibling;
            }
            if (!k)
              throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
          }
        }
        if (i.alternate !== u)
          throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
      }
      if (i.tag !== O)
        throw new Error("Unable to find node on an unmounted component.");
      return i.stateNode.current === i ? e : t;
    }
    function ua(e) {
      var t = Ff(e);
      return t !== null ? sa(t) : null;
    }
    function sa(e) {
      if (e.tag === M || e.tag === V)
        return e;
      for (var t = e.child; t !== null; ) {
        var a = sa(t);
        if (a !== null)
          return a;
        t = t.sibling;
      }
      return null;
    }
    function mn(e) {
      var t = Ff(e);
      return t !== null ? Ga(t) : null;
    }
    function Ga(e) {
      if (e.tag === M || e.tag === V)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== A) {
          var a = Ga(t);
          if (a !== null)
            return a;
        }
        t = t.sibling;
      }
      return null;
    }
    var Fp = l.unstable_scheduleCallback, ym = l.unstable_cancelCallback, Pp = l.unstable_shouldYield, jp = l.unstable_requestPaint, tr = l.unstable_now, Pf = l.unstable_getCurrentPriorityLevel, lc = l.unstable_ImmediatePriority, so = l.unstable_UserBlockingPriority, bl = l.unstable_NormalPriority, p0 = l.unstable_LowPriority, Zo = l.unstable_IdlePriority, jf = l.unstable_yieldValue, gm = l.unstable_setDisableYieldValue, eu = null, Dn = null, Me = null, ka = !1, ca = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function ns(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return h("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        Fe && (e = St({}, e, {
          getLaneLabelMap: tu,
          injectProfilingHooks: Qa
        })), eu = t.inject(e), Dn = t;
      } catch (a) {
        h("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function Hp(e, t) {
      if (Dn && typeof Dn.onScheduleFiberRoot == "function")
        try {
          Dn.onScheduleFiberRoot(eu, e, t);
        } catch (a) {
          ka || (ka = !0, h("React instrumentation encountered an error: %s", a));
        }
    }
    function Bp(e, t) {
      if (Dn && typeof Dn.onCommitFiberRoot == "function")
        try {
          var a = (e.current.flags & Je) === Je;
          if (xe) {
            var i;
            switch (t) {
              case Ir:
                i = lc;
                break;
              case el:
                i = so;
                break;
              case qa:
                i = bl;
                break;
              case Xa:
                i = Zo;
                break;
              default:
                i = bl;
                break;
            }
            Dn.onCommitFiberRoot(eu, e, i, a);
          }
        } catch (u) {
          ka || (ka = !0, h("React instrumentation encountered an error: %s", u));
        }
    }
    function Vp(e) {
      if (Dn && typeof Dn.onPostCommitFiberRoot == "function")
        try {
          Dn.onPostCommitFiberRoot(eu, e);
        } catch (t) {
          ka || (ka = !0, h("React instrumentation encountered an error: %s", t));
        }
    }
    function Ip(e) {
      if (Dn && typeof Dn.onCommitFiberUnmount == "function")
        try {
          Dn.onCommitFiberUnmount(eu, e);
        } catch (t) {
          ka || (ka = !0, h("React instrumentation encountered an error: %s", t));
        }
    }
    function En(e) {
      if (typeof jf == "function" && (gm(e), p(e)), Dn && typeof Dn.setStrictMode == "function")
        try {
          Dn.setStrictMode(eu, e);
        } catch (t) {
          ka || (ka = !0, h("React instrumentation encountered an error: %s", t));
        }
    }
    function Qa(e) {
      Me = e;
    }
    function tu() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; a < au; a++) {
          var i = Cm(t);
          e.set(t, i), t *= 2;
        }
        return e;
      }
    }
    function Yp(e) {
      Me !== null && typeof Me.markCommitStarted == "function" && Me.markCommitStarted(e);
    }
    function Wp() {
      Me !== null && typeof Me.markCommitStopped == "function" && Me.markCommitStopped();
    }
    function Da(e) {
      Me !== null && typeof Me.markComponentRenderStarted == "function" && Me.markComponentRenderStarted(e);
    }
    function Oa() {
      Me !== null && typeof Me.markComponentRenderStopped == "function" && Me.markComponentRenderStopped();
    }
    function $p(e) {
      Me !== null && typeof Me.markComponentPassiveEffectMountStarted == "function" && Me.markComponentPassiveEffectMountStarted(e);
    }
    function _m() {
      Me !== null && typeof Me.markComponentPassiveEffectMountStopped == "function" && Me.markComponentPassiveEffectMountStopped();
    }
    function Rl(e) {
      Me !== null && typeof Me.markComponentPassiveEffectUnmountStarted == "function" && Me.markComponentPassiveEffectUnmountStarted(e);
    }
    function co() {
      Me !== null && typeof Me.markComponentPassiveEffectUnmountStopped == "function" && Me.markComponentPassiveEffectUnmountStopped();
    }
    function Hf(e) {
      Me !== null && typeof Me.markComponentLayoutEffectMountStarted == "function" && Me.markComponentLayoutEffectMountStarted(e);
    }
    function Sm() {
      Me !== null && typeof Me.markComponentLayoutEffectMountStopped == "function" && Me.markComponentLayoutEffectMountStopped();
    }
    function oc(e) {
      Me !== null && typeof Me.markComponentLayoutEffectUnmountStarted == "function" && Me.markComponentLayoutEffectUnmountStarted(e);
    }
    function Gp() {
      Me !== null && typeof Me.markComponentLayoutEffectUnmountStopped == "function" && Me.markComponentLayoutEffectUnmountStopped();
    }
    function uc(e, t, a) {
      Me !== null && typeof Me.markComponentErrored == "function" && Me.markComponentErrored(e, t, a);
    }
    function Zi(e, t, a) {
      Me !== null && typeof Me.markComponentSuspended == "function" && Me.markComponentSuspended(e, t, a);
    }
    function sc(e) {
      Me !== null && typeof Me.markLayoutEffectsStarted == "function" && Me.markLayoutEffectsStarted(e);
    }
    function cc() {
      Me !== null && typeof Me.markLayoutEffectsStopped == "function" && Me.markLayoutEffectsStopped();
    }
    function nu(e) {
      Me !== null && typeof Me.markPassiveEffectsStarted == "function" && Me.markPassiveEffectsStarted(e);
    }
    function Qp() {
      Me !== null && typeof Me.markPassiveEffectsStopped == "function" && Me.markPassiveEffectsStopped();
    }
    function ru(e) {
      Me !== null && typeof Me.markRenderStarted == "function" && Me.markRenderStarted(e);
    }
    function Em() {
      Me !== null && typeof Me.markRenderYielded == "function" && Me.markRenderYielded();
    }
    function Bf() {
      Me !== null && typeof Me.markRenderStopped == "function" && Me.markRenderStopped();
    }
    function Cn(e) {
      Me !== null && typeof Me.markRenderScheduled == "function" && Me.markRenderScheduled(e);
    }
    function Vf(e, t) {
      Me !== null && typeof Me.markForceUpdateScheduled == "function" && Me.markForceUpdateScheduled(e, t);
    }
    function fc(e, t) {
      Me !== null && typeof Me.markStateUpdateScheduled == "function" && Me.markStateUpdateScheduled(e, t);
    }
    var et = (
      /*                         */
      0
    ), xt = (
      /*                 */
      1
    ), jt = (
      /*                    */
      2
    ), en = (
      /*               */
      8
    ), Ht = (
      /*              */
      16
    ), In = Math.clz32 ? Math.clz32 : dc, ur = Math.log, If = Math.LN2;
    function dc(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (ur(t) / If | 0) | 0;
    }
    var au = 31, ve = (
      /*                        */
      0
    ), Ut = (
      /*                          */
      0
    ), st = (
      /*                        */
      1
    ), fo = (
      /*    */
      2
    ), wi = (
      /*             */
      4
    ), Nr = (
      /*            */
      8
    ), On = (
      /*                     */
      16
    ), kl = (
      /*                */
      32
    ), po = (
      /*                       */
      4194240
    ), iu = (
      /*                        */
      64
    ), Yf = (
      /*                        */
      128
    ), Wf = (
      /*                        */
      256
    ), $f = (
      /*                        */
      512
    ), Gf = (
      /*                        */
      1024
    ), Qf = (
      /*                        */
      2048
    ), qf = (
      /*                        */
      4096
    ), Xf = (
      /*                        */
      8192
    ), Kf = (
      /*                        */
      16384
    ), lu = (
      /*                       */
      32768
    ), Jf = (
      /*                       */
      65536
    ), rs = (
      /*                       */
      131072
    ), as = (
      /*                       */
      262144
    ), Zf = (
      /*                       */
      524288
    ), pc = (
      /*                       */
      1048576
    ), ed = (
      /*                       */
      2097152
    ), hc = (
      /*                            */
      130023424
    ), ou = (
      /*                             */
      4194304
    ), td = (
      /*                             */
      8388608
    ), vc = (
      /*                             */
      16777216
    ), nd = (
      /*                             */
      33554432
    ), rd = (
      /*                             */
      67108864
    ), qp = ou, mc = (
      /*          */
      134217728
    ), Xp = (
      /*                          */
      268435455
    ), yc = (
      /*               */
      268435456
    ), uu = (
      /*                        */
      536870912
    ), fa = (
      /*                   */
      1073741824
    );
    function Cm(e) {
      {
        if (e & st)
          return "Sync";
        if (e & fo)
          return "InputContinuousHydration";
        if (e & wi)
          return "InputContinuous";
        if (e & Nr)
          return "DefaultHydration";
        if (e & On)
          return "Default";
        if (e & kl)
          return "TransitionHydration";
        if (e & po)
          return "Transition";
        if (e & hc)
          return "Retry";
        if (e & mc)
          return "SelectiveHydration";
        if (e & yc)
          return "IdleHydration";
        if (e & uu)
          return "Idle";
        if (e & fa)
          return "Offscreen";
      }
    }
    var rn = -1, su = iu, ad = ou;
    function gc(e) {
      switch (ho(e)) {
        case st:
          return st;
        case fo:
          return fo;
        case wi:
          return wi;
        case Nr:
          return Nr;
        case On:
          return On;
        case kl:
          return kl;
        case iu:
        case Yf:
        case Wf:
        case $f:
        case Gf:
        case Qf:
        case qf:
        case Xf:
        case Kf:
        case lu:
        case Jf:
        case rs:
        case as:
        case Zf:
        case pc:
        case ed:
          return e & po;
        case ou:
        case td:
        case vc:
        case nd:
        case rd:
          return e & hc;
        case mc:
          return mc;
        case yc:
          return yc;
        case uu:
          return uu;
        case fa:
          return fa;
        default:
          return h("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function id(e, t) {
      var a = e.pendingLanes;
      if (a === ve)
        return ve;
      var i = ve, u = e.suspendedLanes, d = e.pingedLanes, m = a & Xp;
      if (m !== ve) {
        var S = m & ~u;
        if (S !== ve)
          i = gc(S);
        else {
          var C = m & d;
          C !== ve && (i = gc(C));
        }
      } else {
        var k = a & ~u;
        k !== ve ? i = gc(k) : d !== ve && (i = gc(d));
      }
      if (i === ve)
        return ve;
      if (t !== ve && t !== i && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & u) === ve) {
        var D = ho(i), B = ho(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          D >= B || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          D === On && (B & po) !== ve
        )
          return t;
      }
      (i & wi) !== ve && (i |= a & On);
      var j = e.entangledLanes;
      if (j !== ve)
        for (var X = e.entanglements, Z = i & j; Z > 0; ) {
          var oe = Yn(Z), Le = 1 << oe;
          i |= X[oe], Z &= ~Le;
        }
      return i;
    }
    function Ti(e, t) {
      for (var a = e.eventTimes, i = rn; t > 0; ) {
        var u = Yn(t), d = 1 << u, m = a[u];
        m > i && (i = m), t &= ~d;
      }
      return i;
    }
    function Kp(e, t) {
      switch (e) {
        case st:
        case fo:
        case wi:
          return t + 250;
        case Nr:
        case On:
        case kl:
        case iu:
        case Yf:
        case Wf:
        case $f:
        case Gf:
        case Qf:
        case qf:
        case Xf:
        case Kf:
        case lu:
        case Jf:
        case rs:
        case as:
        case Zf:
        case pc:
        case ed:
          return t + 5e3;
        case ou:
        case td:
        case vc:
        case nd:
        case rd:
          return rn;
        case mc:
        case yc:
        case uu:
        case fa:
          return rn;
        default:
          return h("Should have found matching lanes. This is a bug in React."), rn;
      }
    }
    function ld(e, t) {
      for (var a = e.pendingLanes, i = e.suspendedLanes, u = e.pingedLanes, d = e.expirationTimes, m = a; m > 0; ) {
        var S = Yn(m), C = 1 << S, k = d[S];
        k === rn ? ((C & i) === ve || (C & u) !== ve) && (d[S] = Kp(C, t)) : k <= t && (e.expiredLanes |= C), m &= ~C;
      }
    }
    function wm(e) {
      return gc(e.pendingLanes);
    }
    function od(e) {
      var t = e.pendingLanes & ~fa;
      return t !== ve ? t : t & fa ? fa : ve;
    }
    function Tm(e) {
      return (e & st) !== ve;
    }
    function _c(e) {
      return (e & Xp) !== ve;
    }
    function cu(e) {
      return (e & hc) === e;
    }
    function Jp(e) {
      var t = st | wi | On;
      return (e & t) === ve;
    }
    function Zp(e) {
      return (e & po) === e;
    }
    function ud(e, t) {
      var a = fo | wi | Nr | On;
      return (t & a) !== ve;
    }
    function xm(e, t) {
      return (t & e.expiredLanes) !== ve;
    }
    function eh(e) {
      return (e & po) !== ve;
    }
    function th() {
      var e = su;
      return su <<= 1, (su & po) === ve && (su = iu), e;
    }
    function bm() {
      var e = ad;
      return ad <<= 1, (ad & hc) === ve && (ad = ou), e;
    }
    function ho(e) {
      return e & -e;
    }
    function Sc(e) {
      return ho(e);
    }
    function Yn(e) {
      return 31 - In(e);
    }
    function gr(e) {
      return Yn(e);
    }
    function da(e, t) {
      return (e & t) !== ve;
    }
    function fu(e, t) {
      return (e & t) === t;
    }
    function _t(e, t) {
      return e | t;
    }
    function Ec(e, t) {
      return e & ~t;
    }
    function nh(e, t) {
      return e & t;
    }
    function Rm(e) {
      return e;
    }
    function km(e, t) {
      return e !== Ut && e < t ? e : t;
    }
    function Cc(e) {
      for (var t = [], a = 0; a < au; a++)
        t.push(e);
      return t;
    }
    function is(e, t, a) {
      e.pendingLanes |= t, t !== uu && (e.suspendedLanes = ve, e.pingedLanes = ve);
      var i = e.eventTimes, u = gr(t);
      i[u] = a;
    }
    function Dm(e, t) {
      e.suspendedLanes |= t, e.pingedLanes &= ~t;
      for (var a = e.expirationTimes, i = t; i > 0; ) {
        var u = Yn(i), d = 1 << u;
        a[u] = rn, i &= ~d;
      }
    }
    function sd(e, t, a) {
      e.pingedLanes |= e.suspendedLanes & t;
    }
    function rh(e, t) {
      var a = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = ve, e.pingedLanes = ve, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var i = e.entanglements, u = e.eventTimes, d = e.expirationTimes, m = a; m > 0; ) {
        var S = Yn(m), C = 1 << S;
        i[S] = ve, u[S] = rn, d[S] = rn, m &= ~C;
      }
    }
    function cd(e, t) {
      for (var a = e.entangledLanes |= t, i = e.entanglements, u = a; u; ) {
        var d = Yn(u), m = 1 << d;
        // Is this one of the newly entangled lanes?
        m & t | // Is this lane transitively entangled with the newly entangled lanes?
        i[d] & t && (i[d] |= t), u &= ~m;
      }
    }
    function ah(e, t) {
      var a = ho(t), i;
      switch (a) {
        case wi:
          i = fo;
          break;
        case On:
          i = Nr;
          break;
        case iu:
        case Yf:
        case Wf:
        case $f:
        case Gf:
        case Qf:
        case qf:
        case Xf:
        case Kf:
        case lu:
        case Jf:
        case rs:
        case as:
        case Zf:
        case pc:
        case ed:
        case ou:
        case td:
        case vc:
        case nd:
        case rd:
          i = kl;
          break;
        case uu:
          i = yc;
          break;
        default:
          i = Ut;
          break;
      }
      return (i & (e.suspendedLanes | t)) !== Ut ? Ut : i;
    }
    function wc(e, t, a) {
      if (ca)
        for (var i = e.pendingUpdatersLaneMap; a > 0; ) {
          var u = gr(a), d = 1 << u, m = i[u];
          m.add(t), a &= ~d;
        }
    }
    function Om(e, t) {
      if (ca)
        for (var a = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; t > 0; ) {
          var u = gr(t), d = 1 << u, m = a[u];
          m.size > 0 && (m.forEach(function(S) {
            var C = S.alternate;
            (C === null || !i.has(C)) && i.add(S);
          }), m.clear()), t &= ~d;
        }
    }
    function ih(e, t) {
      return null;
    }
    var Ir = st, el = wi, qa = On, Xa = uu, Tc = Ut;
    function Ka() {
      return Tc;
    }
    function Wn(e) {
      Tc = e;
    }
    function Mm(e, t) {
      var a = Tc;
      try {
        return Tc = e, t();
      } finally {
        Tc = a;
      }
    }
    function Lm(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function xc(e, t) {
      return e > t ? e : t;
    }
    function sr(e, t) {
      return e !== 0 && e < t;
    }
    function Nm(e) {
      var t = ho(e);
      return sr(Ir, t) ? sr(el, t) ? _c(t) ? qa : Xa : el : Ir;
    }
    function fd(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var bc;
    function Ar(e) {
      bc = e;
    }
    function h0(e) {
      bc(e);
    }
    var Pe;
    function ls(e) {
      Pe = e;
    }
    var dd;
    function Am(e) {
      dd = e;
    }
    var zm;
    function Rc(e) {
      zm = e;
    }
    var kc;
    function lh(e) {
      kc = e;
    }
    var pd = !1, Dc = [], Dl = null, tl = null, nl = null, Mn = /* @__PURE__ */ new Map(), Yr = /* @__PURE__ */ new Map(), Wr = [], Um = [
      "mousedown",
      "mouseup",
      "touchcancel",
      "touchend",
      "touchstart",
      "auxclick",
      "dblclick",
      "pointercancel",
      "pointerdown",
      "pointerup",
      "dragend",
      "dragstart",
      "drop",
      "compositionend",
      "compositionstart",
      "keydown",
      "keypress",
      "keyup",
      "input",
      "textInput",
      // Intentionally camelCase
      "copy",
      "cut",
      "paste",
      "click",
      "change",
      "contextmenu",
      "reset",
      "submit"
    ];
    function Fm(e) {
      return Um.indexOf(e) > -1;
    }
    function xi(e, t, a, i, u) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: a,
        nativeEvent: u,
        targetContainers: [i]
      };
    }
    function oh(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          Dl = null;
          break;
        case "dragenter":
        case "dragleave":
          tl = null;
          break;
        case "mouseover":
        case "mouseout":
          nl = null;
          break;
        case "pointerover":
        case "pointerout": {
          var a = t.pointerId;
          Mn.delete(a);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var i = t.pointerId;
          Yr.delete(i);
          break;
        }
      }
    }
    function pa(e, t, a, i, u, d) {
      if (e === null || e.nativeEvent !== d) {
        var m = xi(t, a, i, u, d);
        if (t !== null) {
          var S = vs(t);
          S !== null && Pe(S);
        }
        return m;
      }
      e.eventSystemFlags |= i;
      var C = e.targetContainers;
      return u !== null && C.indexOf(u) === -1 && C.push(u), e;
    }
    function v0(e, t, a, i, u) {
      switch (t) {
        case "focusin": {
          var d = u;
          return Dl = pa(Dl, e, t, a, i, d), !0;
        }
        case "dragenter": {
          var m = u;
          return tl = pa(tl, e, t, a, i, m), !0;
        }
        case "mouseover": {
          var S = u;
          return nl = pa(nl, e, t, a, i, S), !0;
        }
        case "pointerover": {
          var C = u, k = C.pointerId;
          return Mn.set(k, pa(Mn.get(k) || null, e, t, a, i, C)), !0;
        }
        case "gotpointercapture": {
          var D = u, B = D.pointerId;
          return Yr.set(B, pa(Yr.get(B) || null, e, t, a, i, D)), !0;
        }
      }
      return !1;
    }
    function uh(e) {
      var t = Bc(e.target);
      if (t !== null) {
        var a = Ra(t);
        if (a !== null) {
          var i = a.tag;
          if (i === Y) {
            var u = Ki(a);
            if (u !== null) {
              e.blockedOn = u, kc(e.priority, function() {
                dd(a);
              });
              return;
            }
          } else if (i === O) {
            var d = a.stateNode;
            if (fd(d)) {
              e.blockedOn = Ji(a);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function Pm(e) {
      for (var t = zm(), a = {
        blockedOn: null,
        target: e,
        priority: t
      }, i = 0; i < Wr.length && sr(t, Wr[i].priority); i++)
        ;
      Wr.splice(i, 0, a), i === 0 && uh(a);
    }
    function Oc(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var a = t[0], i = us(e.domEventName, e.eventSystemFlags, a, e.nativeEvent);
        if (i === null) {
          var u = e.nativeEvent, d = new u.constructor(u.type, u);
          s0(d), u.target.dispatchEvent(d), c0();
        } else {
          var m = vs(i);
          return m !== null && Pe(m), e.blockedOn = i, !1;
        }
        t.shift();
      }
      return !0;
    }
    function sh(e, t, a) {
      Oc(e) && a.delete(t);
    }
    function m0() {
      pd = !1, Dl !== null && Oc(Dl) && (Dl = null), tl !== null && Oc(tl) && (tl = null), nl !== null && Oc(nl) && (nl = null), Mn.forEach(sh), Yr.forEach(sh);
    }
    function vo(e, t) {
      e.blockedOn === t && (e.blockedOn = null, pd || (pd = !0, l.unstable_scheduleCallback(l.unstable_NormalPriority, m0)));
    }
    function du(e) {
      if (Dc.length > 0) {
        vo(Dc[0], e);
        for (var t = 1; t < Dc.length; t++) {
          var a = Dc[t];
          a.blockedOn === e && (a.blockedOn = null);
        }
      }
      Dl !== null && vo(Dl, e), tl !== null && vo(tl, e), nl !== null && vo(nl, e);
      var i = function(S) {
        return vo(S, e);
      };
      Mn.forEach(i), Yr.forEach(i);
      for (var u = 0; u < Wr.length; u++) {
        var d = Wr[u];
        d.blockedOn === e && (d.blockedOn = null);
      }
      for (; Wr.length > 0; ) {
        var m = Wr[0];
        if (m.blockedOn !== null)
          break;
        uh(m), m.blockedOn === null && Wr.shift();
      }
    }
    var _r = s.ReactCurrentBatchConfig, Mt = !0;
    function nr(e) {
      Mt = !!e;
    }
    function $n() {
      return Mt;
    }
    function Sr(e, t, a) {
      var i = hd(t), u;
      switch (i) {
        case Ir:
          u = Ma;
          break;
        case el:
          u = os;
          break;
        case qa:
        default:
          u = Ln;
          break;
      }
      return u.bind(null, t, a, e);
    }
    function Ma(e, t, a, i) {
      var u = Ka(), d = _r.transition;
      _r.transition = null;
      try {
        Wn(Ir), Ln(e, t, a, i);
      } finally {
        Wn(u), _r.transition = d;
      }
    }
    function os(e, t, a, i) {
      var u = Ka(), d = _r.transition;
      _r.transition = null;
      try {
        Wn(el), Ln(e, t, a, i);
      } finally {
        Wn(u), _r.transition = d;
      }
    }
    function Ln(e, t, a, i) {
      Mt && Mc(e, t, a, i);
    }
    function Mc(e, t, a, i) {
      var u = us(e, t, a, i);
      if (u === null) {
        N0(e, t, i, rl, a), oh(e, i);
        return;
      }
      if (v0(u, e, t, a, i)) {
        i.stopPropagation();
        return;
      }
      if (oh(e, i), t & Ia && Fm(e)) {
        for (; u !== null; ) {
          var d = vs(u);
          d !== null && h0(d);
          var m = us(e, t, a, i);
          if (m === null && N0(e, t, i, rl, a), m === u)
            break;
          u = m;
        }
        u !== null && i.stopPropagation();
        return;
      }
      N0(e, t, i, null, a);
    }
    var rl = null;
    function us(e, t, a, i) {
      rl = null;
      var u = zp(i), d = Bc(u);
      if (d !== null) {
        var m = Ra(d);
        if (m === null)
          d = null;
        else {
          var S = m.tag;
          if (S === Y) {
            var C = Ki(m);
            if (C !== null)
              return C;
            d = null;
          } else if (S === O) {
            var k = m.stateNode;
            if (fd(k))
              return Ji(m);
            d = null;
          } else m !== d && (d = null);
        }
      }
      return rl = d, null;
    }
    function hd(e) {
      switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return Ir;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return el;
        case "message": {
          var t = Pf();
          switch (t) {
            case lc:
              return Ir;
            case so:
              return el;
            case bl:
            case p0:
              return qa;
            case Zo:
              return Xa;
            default:
              return qa;
          }
        }
        default:
          return qa;
      }
    }
    function Lc(e, t, a) {
      return e.addEventListener(t, a, !1), a;
    }
    function ha(e, t, a) {
      return e.addEventListener(t, a, !0), a;
    }
    function ch(e, t, a, i) {
      return e.addEventListener(t, a, {
        capture: !0,
        passive: i
      }), a;
    }
    function ss(e, t, a, i) {
      return e.addEventListener(t, a, {
        passive: i
      }), a;
    }
    var La = null, cs = null, pu = null;
    function mo(e) {
      return La = e, cs = Nc(), !0;
    }
    function vd() {
      La = null, cs = null, pu = null;
    }
    function Ol() {
      if (pu)
        return pu;
      var e, t = cs, a = t.length, i, u = Nc(), d = u.length;
      for (e = 0; e < a && t[e] === u[e]; e++)
        ;
      var m = a - e;
      for (i = 1; i <= m && t[a - i] === u[d - i]; i++)
        ;
      var S = i > 1 ? 1 - i : void 0;
      return pu = u.slice(e, S), pu;
    }
    function Nc() {
      return "value" in La ? La.value : La.textContent;
    }
    function yo(e) {
      var t, a = e.keyCode;
      return "charCode" in e ? (t = e.charCode, t === 0 && a === 13 && (t = 13)) : t = a, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
    }
    function fs() {
      return !0;
    }
    function Ac() {
      return !1;
    }
    function zr(e) {
      function t(a, i, u, d, m) {
        this._reactName = a, this._targetInst = u, this.type = i, this.nativeEvent = d, this.target = m, this.currentTarget = null;
        for (var S in e)
          if (e.hasOwnProperty(S)) {
            var C = e[S];
            C ? this[S] = C(d) : this[S] = d[S];
          }
        var k = d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1;
        return k ? this.isDefaultPrevented = fs : this.isDefaultPrevented = Ac, this.isPropagationStopped = Ac, this;
      }
      return St(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = fs);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = fs);
        },
        /**
         * We release all dispatched `SyntheticEvent`s after each event loop, adding
         * them back into the pool. This allows a way to hold onto a reference that
         * won't be added back into the pool.
         */
        persist: function() {
        },
        /**
         * Checks if this event should be released back into the pool.
         *
         * @return {boolean} True if this should not be released, false otherwise.
         */
        isPersistent: fs
      }), t;
    }
    var Gn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, al = zr(Gn), $r = St({}, Gn, {
      view: 0,
      detail: 0
    }), va = zr($r), md, zc, hu;
    function y0(e) {
      e !== hu && (hu && e.type === "mousemove" ? (md = e.screenX - hu.screenX, zc = e.screenY - hu.screenY) : (md = 0, zc = 0), hu = e);
    }
    var bi = St({}, $r, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: yn,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (y0(e), md);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : zc;
      }
    }), fh = zr(bi), dh = St({}, bi, {
      dataTransfer: 0
    }), vu = zr(dh), ph = St({}, $r, {
      relatedTarget: 0
    }), Ml = zr(ph), jm = St({}, Gn, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Hm = zr(jm), hh = St({}, Gn, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), yd = zr(hh), g0 = St({}, Gn, {
      data: 0
    }), Bm = zr(g0), Vm = Bm, Im = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    }, mu = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    };
    function _0(e) {
      if (e.key) {
        var t = Im[e.key] || e.key;
        if (t !== "Unidentified")
          return t;
      }
      if (e.type === "keypress") {
        var a = yo(e);
        return a === 13 ? "Enter" : String.fromCharCode(a);
      }
      return e.type === "keydown" || e.type === "keyup" ? mu[e.keyCode] || "Unidentified" : "";
    }
    var ds = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function Ym(e) {
      var t = this, a = t.nativeEvent;
      if (a.getModifierState)
        return a.getModifierState(e);
      var i = ds[e];
      return i ? !!a[i] : !1;
    }
    function yn(e) {
      return Ym;
    }
    var S0 = St({}, $r, {
      key: _0,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: yn,
      // Legacy Interface
      charCode: function(e) {
        return e.type === "keypress" ? yo(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? yo(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), Wm = zr(S0), E0 = St({}, bi, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), $m = zr(E0), Gm = St({}, $r, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: yn
    }), Qm = zr(Gm), C0 = St({}, Gn, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Ja = zr(C0), vh = St({}, bi, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : (
          // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
          "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        );
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : (
          // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
          "wheelDeltaY" in e ? -e.wheelDeltaY : (
            // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
            "wheelDelta" in e ? -e.wheelDelta : 0
          )
        );
      },
      deltaZ: 0,
      // Browsers without "deltaMode" is reporting in raw wheel delta where one
      // notch on the scroll is always +/- 120, roughly equivalent to pixels.
      // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
      // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
      deltaMode: 0
    }), w0 = zr(vh), go = [9, 13, 27, 32], Uc = 229, Ll = Pn && "CompositionEvent" in window, _o = null;
    Pn && "documentMode" in document && (_o = document.documentMode);
    var mh = Pn && "TextEvent" in window && !_o, gd = Pn && (!Ll || _o && _o > 8 && _o <= 11), qm = 32, _d = String.fromCharCode(qm);
    function T0() {
      wt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), wt("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), wt("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), wt("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var yh = !1;
    function Xm(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function Sd(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function Ed(e, t) {
      return e === "keydown" && t.keyCode === Uc;
    }
    function gh(e, t) {
      switch (e) {
        case "keyup":
          return go.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== Uc;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function Cd(e) {
      var t = e.detail;
      return typeof t == "object" && "data" in t ? t.data : null;
    }
    function Km(e) {
      return e.locale === "ko";
    }
    var yu = !1;
    function _h(e, t, a, i, u) {
      var d, m;
      if (Ll ? d = Sd(t) : yu ? gh(t, i) && (d = "onCompositionEnd") : Ed(t, i) && (d = "onCompositionStart"), !d)
        return null;
      gd && !Km(i) && (!yu && d === "onCompositionStart" ? yu = mo(u) : d === "onCompositionEnd" && yu && (m = Ol()));
      var S = ay(a, d);
      if (S.length > 0) {
        var C = new Bm(d, t, null, i, u);
        if (e.push({
          event: C,
          listeners: S
        }), m)
          C.data = m;
        else {
          var k = Cd(i);
          k !== null && (C.data = k);
        }
      }
    }
    function wd(e, t) {
      switch (e) {
        case "compositionend":
          return Cd(t);
        case "keypress":
          var a = t.which;
          return a !== qm ? null : (yh = !0, _d);
        case "textInput":
          var i = t.data;
          return i === _d && yh ? null : i;
        default:
          return null;
      }
    }
    function Sh(e, t) {
      if (yu) {
        if (e === "compositionend" || !Ll && gh(e, t)) {
          var a = Ol();
          return vd(), yu = !1, a;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!Xm(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return gd && !Km(t) ? null : t.data;
        default:
          return null;
      }
    }
    function Td(e, t, a, i, u) {
      var d;
      if (mh ? d = wd(t, i) : d = Sh(t, i), !d)
        return null;
      var m = ay(a, "onBeforeInput");
      if (m.length > 0) {
        var S = new Vm("onBeforeInput", "beforeinput", null, i, u);
        e.push({
          event: S,
          listeners: m
        }), S.data = d;
      }
    }
    function Jm(e, t, a, i, u, d, m) {
      _h(e, t, a, i, u), Td(e, t, a, i, u);
    }
    var x0 = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0
    };
    function Fc(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!x0[e.type] : t === "textarea";
    }
    /**
     * Checks if an event is supported in the current execution environment.
     *
     * NOTE: This will not work correctly for non-generic events such as `change`,
     * `reset`, `load`, `error`, and `select`.
     *
     * Borrows from Modernizr.
     *
     * @param {string} eventNameSuffix Event name, e.g. "click".
     * @return {boolean} True if the event is supported.
     * @internal
     * @license Modernizr 3.0.0pre (Custom Build) | MIT
     */
    function b0(e) {
      if (!Pn)
        return !1;
      var t = "on" + e, a = t in document;
      if (!a) {
        var i = document.createElement("div");
        i.setAttribute(t, "return;"), a = typeof i[t] == "function";
      }
      return a;
    }
    function Pc() {
      wt("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function Zm(e, t, a, i) {
      qu(i);
      var u = ay(t, "onChange");
      if (u.length > 0) {
        var d = new al("onChange", "change", null, a, i);
        e.push({
          event: d,
          listeners: u
        });
      }
    }
    var So = null, n = null;
    function r(e) {
      var t = e.nodeName && e.nodeName.toLowerCase();
      return t === "select" || t === "input" && e.type === "file";
    }
    function o(e) {
      var t = [];
      Zm(t, n, e, zp(e)), fm(c, t);
    }
    function c(e) {
      OC(e, 0);
    }
    function v(e) {
      var t = Od(e);
      if (Wi(t))
        return e;
    }
    function g(e, t) {
      if (e === "change")
        return t;
    }
    var b = !1;
    Pn && (b = b0("input") && (!document.documentMode || document.documentMode > 9));
    function N(e, t) {
      So = e, n = t, So.attachEvent("onpropertychange", J);
    }
    function F() {
      So && (So.detachEvent("onpropertychange", J), So = null, n = null);
    }
    function J(e) {
      e.propertyName === "value" && v(n) && o(e);
    }
    function _e(e, t, a) {
      e === "focusin" ? (F(), N(t, a)) : e === "focusout" && F();
    }
    function Ee(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return v(n);
    }
    function ye(e) {
      var t = e.nodeName;
      return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function Ae(e, t) {
      if (e === "click")
        return v(t);
    }
    function He(e, t) {
      if (e === "input" || e === "change")
        return v(t);
    }
    function We(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || tt(e, "number", e.value);
    }
    function Nn(e, t, a, i, u, d, m) {
      var S = a ? Od(a) : window, C, k;
      if (r(S) ? C = g : Fc(S) ? b ? C = He : (C = Ee, k = _e) : ye(S) && (C = Ae), C) {
        var D = C(t, a);
        if (D) {
          Zm(e, D, i, u);
          return;
        }
      }
      k && k(t, S, a), t === "focusout" && We(S);
    }
    function W() {
      Qt("onMouseEnter", ["mouseout", "mouseover"]), Qt("onMouseLeave", ["mouseout", "mouseover"]), Qt("onPointerEnter", ["pointerout", "pointerover"]), Qt("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function H(e, t, a, i, u, d, m) {
      var S = t === "mouseover" || t === "pointerover", C = t === "mouseout" || t === "pointerout";
      if (S && !ec(i)) {
        var k = i.relatedTarget || i.fromElement;
        if (k && (Bc(k) || Ah(k)))
          return;
      }
      if (!(!C && !S)) {
        var D;
        if (u.window === u)
          D = u;
        else {
          var B = u.ownerDocument;
          B ? D = B.defaultView || B.parentWindow : D = window;
        }
        var j, X;
        if (C) {
          var Z = i.relatedTarget || i.toElement;
          if (j = a, X = Z ? Bc(Z) : null, X !== null) {
            var oe = Ra(X);
            (X !== oe || X.tag !== M && X.tag !== V) && (X = null);
          }
        } else
          j = null, X = a;
        if (j !== X) {
          var Le = fh, nt = "onMouseLeave", Xe = "onMouseEnter", Nt = "mouse";
          (t === "pointerout" || t === "pointerover") && (Le = $m, nt = "onPointerLeave", Xe = "onPointerEnter", Nt = "pointer");
          var kt = j == null ? D : Od(j), $ = X == null ? D : Od(X), ue = new Le(nt, Nt + "leave", j, i, u);
          ue.target = kt, ue.relatedTarget = $;
          var G = null, Ce = Bc(u);
          if (Ce === a) {
            var Ue = new Le(Xe, Nt + "enter", X, i, u);
            Ue.target = $, Ue.relatedTarget = kt, G = Ue;
          }
          pR(e, ue, G, j, X);
        }
      }
    }
    function q(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var Se = typeof Object.is == "function" ? Object.is : q;
    function Be(e, t) {
      if (Se(e, t))
        return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), i = Object.keys(t);
      if (a.length !== i.length)
        return !1;
      for (var u = 0; u < a.length; u++) {
        var d = a[u];
        if (!Fr.call(t, d) || !Se(e[d], t[d]))
          return !1;
      }
      return !0;
    }
    function at(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function ot(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function dt(e, t) {
      for (var a = at(e), i = 0, u = 0; a; ) {
        if (a.nodeType === El) {
          if (u = i + a.textContent.length, i <= t && u >= t)
            return {
              node: a,
              offset: t - i
            };
          i = u;
        }
        a = at(ot(a));
      }
    }
    function cr(e) {
      var t = e.ownerDocument, a = t && t.defaultView || window, i = a.getSelection && a.getSelection();
      if (!i || i.rangeCount === 0)
        return null;
      var u = i.anchorNode, d = i.anchorOffset, m = i.focusNode, S = i.focusOffset;
      try {
        u.nodeType, m.nodeType;
      } catch {
        return null;
      }
      return Bt(e, u, d, m, S);
    }
    function Bt(e, t, a, i, u) {
      var d = 0, m = -1, S = -1, C = 0, k = 0, D = e, B = null;
      e: for (; ; ) {
        for (var j = null; D === t && (a === 0 || D.nodeType === El) && (m = d + a), D === i && (u === 0 || D.nodeType === El) && (S = d + u), D.nodeType === El && (d += D.nodeValue.length), (j = D.firstChild) !== null; )
          B = D, D = j;
        for (; ; ) {
          if (D === e)
            break e;
          if (B === t && ++C === a && (m = d), B === i && ++k === u && (S = d), (j = D.nextSibling) !== null)
            break;
          D = B, B = D.parentNode;
        }
        D = j;
      }
      return m === -1 || S === -1 ? null : {
        start: m,
        end: S
      };
    }
    function Eo(e, t) {
      var a = e.ownerDocument || document, i = a && a.defaultView || window;
      if (i.getSelection) {
        var u = i.getSelection(), d = e.textContent.length, m = Math.min(t.start, d), S = t.end === void 0 ? m : Math.min(t.end, d);
        if (!u.extend && m > S) {
          var C = S;
          S = m, m = C;
        }
        var k = dt(e, m), D = dt(e, S);
        if (k && D) {
          if (u.rangeCount === 1 && u.anchorNode === k.node && u.anchorOffset === k.offset && u.focusNode === D.node && u.focusOffset === D.offset)
            return;
          var B = a.createRange();
          B.setStart(k.node, k.offset), u.removeAllRanges(), m > S ? (u.addRange(B), u.extend(D.node, D.offset)) : (B.setEnd(D.node, D.offset), u.addRange(B));
        }
      }
    }
    function ey(e) {
      return e && e.nodeType === El;
    }
    function _C(e, t) {
      return !e || !t ? !1 : e === t ? !0 : ey(e) ? !1 : ey(t) ? _C(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function qb(e) {
      return e && e.ownerDocument && _C(e.ownerDocument.documentElement, e);
    }
    function Xb(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function SC() {
      for (var e = window, t = Va(); t instanceof e.HTMLIFrameElement; ) {
        if (Xb(t))
          e = t.contentWindow;
        else
          return t;
        t = Va(e.document);
      }
      return t;
    }
    function R0(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function Kb() {
      var e = SC();
      return {
        focusedElem: e,
        selectionRange: R0(e) ? Zb(e) : null
      };
    }
    function Jb(e) {
      var t = SC(), a = e.focusedElem, i = e.selectionRange;
      if (t !== a && qb(a)) {
        i !== null && R0(a) && eR(a, i);
        for (var u = [], d = a; d = d.parentNode; )
          d.nodeType === ia && u.push({
            element: d,
            left: d.scrollLeft,
            top: d.scrollTop
          });
        typeof a.focus == "function" && a.focus();
        for (var m = 0; m < u.length; m++) {
          var S = u[m];
          S.element.scrollLeft = S.left, S.element.scrollTop = S.top;
        }
      }
    }
    function Zb(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = cr(e), t || {
        start: 0,
        end: 0
      };
    }
    function eR(e, t) {
      var a = t.start, i = t.end;
      i === void 0 && (i = a), "selectionStart" in e ? (e.selectionStart = a, e.selectionEnd = Math.min(i, e.value.length)) : Eo(e, t);
    }
    var tR = Pn && "documentMode" in document && document.documentMode <= 11;
    function nR() {
      wt("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var xd = null, k0 = null, Eh = null, D0 = !1;
    function rR(e) {
      if ("selectionStart" in e && R0(e))
        return {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      var t = e.ownerDocument && e.ownerDocument.defaultView || window, a = t.getSelection();
      return {
        anchorNode: a.anchorNode,
        anchorOffset: a.anchorOffset,
        focusNode: a.focusNode,
        focusOffset: a.focusOffset
      };
    }
    function aR(e) {
      return e.window === e ? e.document : e.nodeType === Cl ? e : e.ownerDocument;
    }
    function EC(e, t, a) {
      var i = aR(a);
      if (!(D0 || xd == null || xd !== Va(i))) {
        var u = rR(xd);
        if (!Eh || !Be(Eh, u)) {
          Eh = u;
          var d = ay(k0, "onSelect");
          if (d.length > 0) {
            var m = new al("onSelect", "select", null, t, a);
            e.push({
              event: m,
              listeners: d
            }), m.target = xd;
          }
        }
      }
    }
    function iR(e, t, a, i, u, d, m) {
      var S = a ? Od(a) : window;
      switch (t) {
        case "focusin":
          (Fc(S) || S.contentEditable === "true") && (xd = S, k0 = a, Eh = null);
          break;
        case "focusout":
          xd = null, k0 = null, Eh = null;
          break;
        case "mousedown":
          D0 = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          D0 = !1, EC(e, i, u);
          break;
        case "selectionchange":
          if (tR)
            break;
        case "keydown":
        case "keyup":
          EC(e, i, u);
      }
    }
    function ty(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var bd = {
      animationend: ty("Animation", "AnimationEnd"),
      animationiteration: ty("Animation", "AnimationIteration"),
      animationstart: ty("Animation", "AnimationStart"),
      transitionend: ty("Transition", "TransitionEnd")
    }, O0 = {}, CC = {};
    Pn && (CC = document.createElement("div").style, "AnimationEvent" in window || (delete bd.animationend.animation, delete bd.animationiteration.animation, delete bd.animationstart.animation), "TransitionEvent" in window || delete bd.transitionend.transition);
    function ny(e) {
      if (O0[e])
        return O0[e];
      if (!bd[e])
        return e;
      var t = bd[e];
      for (var a in t)
        if (t.hasOwnProperty(a) && a in CC)
          return O0[e] = t[a];
      return e;
    }
    var wC = ny("animationend"), TC = ny("animationiteration"), xC = ny("animationstart"), bC = ny("transitionend"), RC = /* @__PURE__ */ new Map(), kC = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function ps(e, t) {
      RC.set(e, t), wt(t, [e]);
    }
    function lR() {
      for (var e = 0; e < kC.length; e++) {
        var t = kC[e], a = t.toLowerCase(), i = t[0].toUpperCase() + t.slice(1);
        ps(a, "on" + i);
      }
      ps(wC, "onAnimationEnd"), ps(TC, "onAnimationIteration"), ps(xC, "onAnimationStart"), ps("dblclick", "onDoubleClick"), ps("focusin", "onFocus"), ps("focusout", "onBlur"), ps(bC, "onTransitionEnd");
    }
    function oR(e, t, a, i, u, d, m) {
      var S = RC.get(t);
      if (S !== void 0) {
        var C = al, k = t;
        switch (t) {
          case "keypress":
            if (yo(i) === 0)
              return;
          case "keydown":
          case "keyup":
            C = Wm;
            break;
          case "focusin":
            k = "focus", C = Ml;
            break;
          case "focusout":
            k = "blur", C = Ml;
            break;
          case "beforeblur":
          case "afterblur":
            C = Ml;
            break;
          case "click":
            if (i.button === 2)
              return;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            C = fh;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            C = vu;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            C = Qm;
            break;
          case wC:
          case TC:
          case xC:
            C = Hm;
            break;
          case bC:
            C = Ja;
            break;
          case "scroll":
            C = va;
            break;
          case "wheel":
            C = w0;
            break;
          case "copy":
          case "cut":
          case "paste":
            C = yd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            C = $m;
            break;
        }
        var D = (d & Ia) !== 0;
        {
          var B = !D && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", j = fR(a, S, i.type, D, B);
          if (j.length > 0) {
            var X = new C(S, k, null, i, u);
            e.push({
              event: X,
              listeners: j
            });
          }
        }
      }
    }
    lR(), W(), Pc(), nR(), T0();
    function uR(e, t, a, i, u, d, m) {
      oR(e, t, a, i, u, d);
      var S = (d & Ap) === 0;
      S && (H(e, t, a, i, u), Nn(e, t, a, i, u), iR(e, t, a, i, u), Jm(e, t, a, i, u));
    }
    var Ch = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], M0 = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Ch));
    function DC(e, t, a) {
      var i = e.type || "unknown-event";
      e.currentTarget = a, Qi(i, t, void 0, e), e.currentTarget = null;
    }
    function sR(e, t, a) {
      var i;
      if (a)
        for (var u = t.length - 1; u >= 0; u--) {
          var d = t[u], m = d.instance, S = d.currentTarget, C = d.listener;
          if (m !== i && e.isPropagationStopped())
            return;
          DC(e, C, S), i = m;
        }
      else
        for (var k = 0; k < t.length; k++) {
          var D = t[k], B = D.instance, j = D.currentTarget, X = D.listener;
          if (B !== i && e.isPropagationStopped())
            return;
          DC(e, X, j), i = B;
        }
    }
    function OC(e, t) {
      for (var a = (t & Ia) !== 0, i = 0; i < e.length; i++) {
        var u = e[i], d = u.event, m = u.listeners;
        sR(d, m, a);
      }
      rc();
    }
    function cR(e, t, a, i, u) {
      var d = zp(a), m = [];
      uR(m, e, i, a, d, t), OC(m, t);
    }
    function wn(e, t) {
      M0.has(e) || h('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var a = !1, i = Hk(t), u = hR(e);
      i.has(u) || (MC(t, e, xf, a), i.add(u));
    }
    function L0(e, t, a) {
      M0.has(e) && !t && h('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var i = 0;
      t && (i |= Ia), MC(a, e, i, t);
    }
    var ry = "_reactListening" + Math.random().toString(36).slice(2);
    function wh(e) {
      if (!e[ry]) {
        e[ry] = !0, it.forEach(function(a) {
          a !== "selectionchange" && (M0.has(a) || L0(a, !1, e), L0(a, !0, e));
        });
        var t = e.nodeType === Cl ? e : e.ownerDocument;
        t !== null && (t[ry] || (t[ry] = !0, L0("selectionchange", !1, t)));
      }
    }
    function MC(e, t, a, i, u) {
      var d = Sr(e, t, a), m = void 0;
      nc && (t === "touchstart" || t === "touchmove" || t === "wheel") && (m = !0), e = e, i ? m !== void 0 ? ch(e, t, d, m) : ha(e, t, d) : m !== void 0 ? ss(e, t, d, m) : Lc(e, t, d);
    }
    function LC(e, t) {
      return e === t || e.nodeType === Hn && e.parentNode === t;
    }
    function N0(e, t, a, i, u) {
      var d = i;
      if (!(t & Np) && !(t & xf)) {
        var m = u;
        if (i !== null) {
          var S = i;
          e: for (; ; ) {
            if (S === null)
              return;
            var C = S.tag;
            if (C === O || C === A) {
              var k = S.stateNode.containerInfo;
              if (LC(k, m))
                break;
              if (C === A)
                for (var D = S.return; D !== null; ) {
                  var B = D.tag;
                  if (B === O || B === A) {
                    var j = D.stateNode.containerInfo;
                    if (LC(j, m))
                      return;
                  }
                  D = D.return;
                }
              for (; k !== null; ) {
                var X = Bc(k);
                if (X === null)
                  return;
                var Z = X.tag;
                if (Z === M || Z === V) {
                  S = d = X;
                  continue e;
                }
                k = k.parentNode;
              }
            }
            S = S.return;
          }
        }
      }
      fm(function() {
        return cR(e, t, a, d);
      });
    }
    function Th(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function fR(e, t, a, i, u, d) {
      for (var m = t !== null ? t + "Capture" : null, S = i ? m : t, C = [], k = e, D = null; k !== null; ) {
        var B = k, j = B.stateNode, X = B.tag;
        if (X === M && j !== null && (D = j, S !== null)) {
          var Z = ro(k, S);
          Z != null && C.push(Th(k, Z, D));
        }
        if (u)
          break;
        k = k.return;
      }
      return C;
    }
    function ay(e, t) {
      for (var a = t + "Capture", i = [], u = e; u !== null; ) {
        var d = u, m = d.stateNode, S = d.tag;
        if (S === M && m !== null) {
          var C = m, k = ro(u, a);
          k != null && i.unshift(Th(u, k, C));
          var D = ro(u, t);
          D != null && i.push(Th(u, D, C));
        }
        u = u.return;
      }
      return i;
    }
    function Rd(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== M);
      return e || null;
    }
    function dR(e, t) {
      for (var a = e, i = t, u = 0, d = a; d; d = Rd(d))
        u++;
      for (var m = 0, S = i; S; S = Rd(S))
        m++;
      for (; u - m > 0; )
        a = Rd(a), u--;
      for (; m - u > 0; )
        i = Rd(i), m--;
      for (var C = u; C--; ) {
        if (a === i || i !== null && a === i.alternate)
          return a;
        a = Rd(a), i = Rd(i);
      }
      return null;
    }
    function NC(e, t, a, i, u) {
      for (var d = t._reactName, m = [], S = a; S !== null && S !== i; ) {
        var C = S, k = C.alternate, D = C.stateNode, B = C.tag;
        if (k !== null && k === i)
          break;
        if (B === M && D !== null) {
          var j = D;
          if (u) {
            var X = ro(S, d);
            X != null && m.unshift(Th(S, X, j));
          } else if (!u) {
            var Z = ro(S, d);
            Z != null && m.push(Th(S, Z, j));
          }
        }
        S = S.return;
      }
      m.length !== 0 && e.push({
        event: t,
        listeners: m
      });
    }
    function pR(e, t, a, i, u) {
      var d = i && u ? dR(i, u) : null;
      i !== null && NC(e, t, i, d, !1), u !== null && a !== null && NC(e, a, u, d, !0);
    }
    function hR(e, t) {
      return e + "__bubble";
    }
    var Za = !1, xh = "dangerouslySetInnerHTML", iy = "suppressContentEditableWarning", hs = "suppressHydrationWarning", AC = "autoFocus", jc = "children", Hc = "style", ly = "__html", A0, oy, bh, zC, uy, UC, FC;
    A0 = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, oy = function(e, t) {
      Op(e, t), wf(e, t), um(e, t, {
        registrationNameDependencies: rt,
        possibleRegistrationNames: ct
      });
    }, UC = Pn && !document.documentMode, bh = function(e, t, a) {
      if (!Za) {
        var i = sy(a), u = sy(t);
        u !== i && (Za = !0, h("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(u), JSON.stringify(i)));
      }
    }, zC = function(e) {
      if (!Za) {
        Za = !0;
        var t = [];
        e.forEach(function(a) {
          t.push(a);
        }), h("Extra attributes from the server: %s", t);
      }
    }, uy = function(e, t) {
      t === !1 ? h("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : h("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, FC = function(e, t) {
      var a = e.namespaceURI === Sl ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return a.innerHTML = t, a.innerHTML;
    };
    var vR = /\r\n?/g, mR = /\u0000|\uFFFD/g;
    function sy(e) {
      ir(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace(vR, `
`).replace(mR, "");
    }
    function cy(e, t, a, i) {
      var u = sy(t), d = sy(e);
      if (d !== u && (i && (Za || (Za = !0, h('Text content did not match. Server: "%s" Client: "%s"', d, u))), a && ce))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function PC(e) {
      return e.nodeType === Cl ? e : e.ownerDocument;
    }
    function yR() {
    }
    function fy(e) {
      e.onclick = yR;
    }
    function gR(e, t, a, i, u) {
      for (var d in i)
        if (i.hasOwnProperty(d)) {
          var m = i[d];
          if (d === Hc)
            m && Object.freeze(m), nm(t, m);
          else if (d === xh) {
            var S = m ? m[ly] : void 0;
            S != null && Yv(t, S);
          } else if (d === jc)
            if (typeof m == "string") {
              var C = e !== "textarea" || m !== "";
              C && Wu(t, m);
            } else typeof m == "number" && Wu(t, "" + m);
          else d === iy || d === hs || d === AC || (rt.hasOwnProperty(d) ? m != null && (typeof m != "function" && uy(d, m), d === "onScroll" && wn("scroll", t)) : m != null && Pr(t, d, m, u));
        }
    }
    function _R(e, t, a, i) {
      for (var u = 0; u < t.length; u += 2) {
        var d = t[u], m = t[u + 1];
        d === Hc ? nm(e, m) : d === xh ? Yv(e, m) : d === jc ? Wu(e, m) : Pr(e, d, m, i);
      }
    }
    function SR(e, t, a, i) {
      var u, d = PC(a), m, S = i;
      if (S === Sl && (S = wp(e)), S === Sl) {
        if (u = to(e, t), !u && e !== e.toLowerCase() && h("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var C = d.createElement("div");
          C.innerHTML = "<script><\/script>";
          var k = C.firstChild;
          m = C.removeChild(k);
        } else if (typeof t.is == "string")
          m = d.createElement(e, {
            is: t.is
          });
        else if (m = d.createElement(e), e === "select") {
          var D = m;
          t.multiple ? D.multiple = !0 : t.size && (D.size = t.size);
        }
      } else
        m = d.createElementNS(S, e);
      return S === Sl && !u && Object.prototype.toString.call(m) === "[object HTMLUnknownElement]" && !Fr.call(A0, e) && (A0[e] = !0, h("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), m;
    }
    function ER(e, t) {
      return PC(t).createTextNode(e);
    }
    function CR(e, t, a, i) {
      var u = to(t, a);
      oy(t, a);
      var d;
      switch (t) {
        case "dialog":
          wn("cancel", e), wn("close", e), d = a;
          break;
        case "iframe":
        case "object":
        case "embed":
          wn("load", e), d = a;
          break;
        case "video":
        case "audio":
          for (var m = 0; m < Ch.length; m++)
            wn(Ch[m], e);
          d = a;
          break;
        case "source":
          wn("error", e), d = a;
          break;
        case "img":
        case "image":
        case "link":
          wn("error", e), wn("load", e), d = a;
          break;
        case "details":
          wn("toggle", e), d = a;
          break;
        case "input":
          Si(e, a), d = Yu(e, a), wn("invalid", e);
          break;
        case "option":
          zt(e, a), d = a;
          break;
        case "select":
          Wo(e, a), d = Gs(e, a), wn("invalid", e);
          break;
        case "textarea":
          Sp(e, a), d = _p(e, a), wn("invalid", e);
          break;
        default:
          d = a;
      }
      switch (Ef(t, d), gR(t, e, i, d, u), t) {
        case "input":
          _i(e), K(e, a, !1);
          break;
        case "textarea":
          _i(e), Vv(e);
          break;
        case "option":
          un(e, a);
          break;
        case "select":
          yp(e, a);
          break;
        default:
          typeof d.onClick == "function" && fy(e);
          break;
      }
    }
    function wR(e, t, a, i, u) {
      oy(t, i);
      var d = null, m, S;
      switch (t) {
        case "input":
          m = Yu(e, a), S = Yu(e, i), d = [];
          break;
        case "select":
          m = Gs(e, a), S = Gs(e, i), d = [];
          break;
        case "textarea":
          m = _p(e, a), S = _p(e, i), d = [];
          break;
        default:
          m = a, S = i, typeof m.onClick != "function" && typeof S.onClick == "function" && fy(e);
          break;
      }
      Ef(t, S);
      var C, k, D = null;
      for (C in m)
        if (!(S.hasOwnProperty(C) || !m.hasOwnProperty(C) || m[C] == null))
          if (C === Hc) {
            var B = m[C];
            for (k in B)
              B.hasOwnProperty(k) && (D || (D = {}), D[k] = "");
          } else C === xh || C === jc || C === iy || C === hs || C === AC || (rt.hasOwnProperty(C) ? d || (d = []) : (d = d || []).push(C, null));
      for (C in S) {
        var j = S[C], X = m != null ? m[C] : void 0;
        if (!(!S.hasOwnProperty(C) || j === X || j == null && X == null))
          if (C === Hc)
            if (j && Object.freeze(j), X) {
              for (k in X)
                X.hasOwnProperty(k) && (!j || !j.hasOwnProperty(k)) && (D || (D = {}), D[k] = "");
              for (k in j)
                j.hasOwnProperty(k) && X[k] !== j[k] && (D || (D = {}), D[k] = j[k]);
            } else
              D || (d || (d = []), d.push(C, D)), D = j;
          else if (C === xh) {
            var Z = j ? j[ly] : void 0, oe = X ? X[ly] : void 0;
            Z != null && oe !== Z && (d = d || []).push(C, Z);
          } else C === jc ? (typeof j == "string" || typeof j == "number") && (d = d || []).push(C, "" + j) : C === iy || C === hs || (rt.hasOwnProperty(C) ? (j != null && (typeof j != "function" && uy(C, j), C === "onScroll" && wn("scroll", e)), !d && X !== j && (d = [])) : (d = d || []).push(C, j));
      }
      return D && (o0(D, S[Hc]), (d = d || []).push(Hc, D)), d;
    }
    function TR(e, t, a, i, u) {
      a === "input" && u.type === "radio" && u.name != null && w(e, u);
      var d = to(a, i), m = to(a, u);
      switch (_R(e, t, d, m), a) {
        case "input":
          z(e, u);
          break;
        case "textarea":
          Bv(e, u);
          break;
        case "select":
          gf(e, u);
          break;
      }
    }
    function xR(e) {
      {
        var t = e.toLowerCase();
        return Js.hasOwnProperty(t) && Js[t] || null;
      }
    }
    function bR(e, t, a, i, u, d, m) {
      var S, C;
      switch (S = to(t, a), oy(t, a), t) {
        case "dialog":
          wn("cancel", e), wn("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          wn("load", e);
          break;
        case "video":
        case "audio":
          for (var k = 0; k < Ch.length; k++)
            wn(Ch[k], e);
          break;
        case "source":
          wn("error", e);
          break;
        case "img":
        case "image":
        case "link":
          wn("error", e), wn("load", e);
          break;
        case "details":
          wn("toggle", e);
          break;
        case "input":
          Si(e, a), wn("invalid", e);
          break;
        case "option":
          zt(e, a);
          break;
        case "select":
          Wo(e, a), wn("invalid", e);
          break;
        case "textarea":
          Sp(e, a), wn("invalid", e);
          break;
      }
      Ef(t, a);
      {
        C = /* @__PURE__ */ new Set();
        for (var D = e.attributes, B = 0; B < D.length; B++) {
          var j = D[B].name.toLowerCase();
          switch (j) {
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              C.add(D[B].name);
          }
        }
      }
      var X = null;
      for (var Z in a)
        if (a.hasOwnProperty(Z)) {
          var oe = a[Z];
          if (Z === jc)
            typeof oe == "string" ? e.textContent !== oe && (a[hs] !== !0 && cy(e.textContent, oe, d, m), X = [jc, oe]) : typeof oe == "number" && e.textContent !== "" + oe && (a[hs] !== !0 && cy(e.textContent, oe, d, m), X = [jc, "" + oe]);
          else if (rt.hasOwnProperty(Z))
            oe != null && (typeof oe != "function" && uy(Z, oe), Z === "onScroll" && wn("scroll", e));
          else if (m && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof S == "boolean") {
            var Le = void 0, nt = ln(Z);
            if (a[hs] !== !0) {
              if (!(Z === iy || Z === hs || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              Z === "value" || Z === "checked" || Z === "selected")) {
                if (Z === xh) {
                  var Xe = e.innerHTML, Nt = oe ? oe[ly] : void 0;
                  if (Nt != null) {
                    var kt = FC(e, Nt);
                    kt !== Xe && bh(Z, Xe, kt);
                  }
                } else if (Z === Hc) {
                  if (C.delete(Z), UC) {
                    var $ = i0(oe);
                    Le = e.getAttribute("style"), $ !== Le && bh(Z, Le, $);
                  }
                } else if (S && !P)
                  C.delete(Z.toLowerCase()), Le = Po(e, Z, oe), oe !== Le && bh(Z, Le, oe);
                else if (!gn(Z, nt, S) && !lr(Z, oe, nt, S)) {
                  var ue = !1;
                  if (nt !== null)
                    C.delete(nt.attributeName), Le = $l(e, Z, oe, nt);
                  else {
                    var G = i;
                    if (G === Sl && (G = wp(t)), G === Sl)
                      C.delete(Z.toLowerCase());
                    else {
                      var Ce = xR(Z);
                      Ce !== null && Ce !== Z && (ue = !0, C.delete(Ce)), C.delete(Z);
                    }
                    Le = Po(e, Z, oe);
                  }
                  var Ue = P;
                  !Ue && oe !== Le && !ue && bh(Z, Le, oe);
                }
              }
            }
          }
        }
      switch (m && // $FlowFixMe - Should be inferred as not undefined.
      C.size > 0 && a[hs] !== !0 && zC(C), t) {
        case "input":
          _i(e), K(e, a, !0);
          break;
        case "textarea":
          _i(e), Vv(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof a.onClick == "function" && fy(e);
          break;
      }
      return X;
    }
    function RR(e, t, a) {
      var i = e.nodeValue !== t;
      return i;
    }
    function z0(e, t) {
      {
        if (Za)
          return;
        Za = !0, h("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function U0(e, t) {
      {
        if (Za)
          return;
        Za = !0, h('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function F0(e, t, a) {
      {
        if (Za)
          return;
        Za = !0, h("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function P0(e, t) {
      {
        if (t === "" || Za)
          return;
        Za = !0, h('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function kR(e, t, a) {
      switch (t) {
        case "input":
          re(e, a);
          return;
        case "textarea":
          t0(e, a);
          return;
        case "select":
          gp(e, a);
          return;
      }
    }
    var Rh = function() {
    }, kh = function() {
    };
    {
      var DR = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], jC = [
        "applet",
        "caption",
        "html",
        "table",
        "td",
        "th",
        "marquee",
        "object",
        "template",
        // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
        // TODO: Distinguish by namespace here -- for <title>, including it here
        // errs on the side of fewer warnings
        "foreignObject",
        "desc",
        "title"
      ], OR = jC.concat(["button"]), MR = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], HC = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      kh = function(e, t) {
        var a = St({}, e || HC), i = {
          tag: t
        };
        return jC.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), OR.indexOf(t) !== -1 && (a.pTagInButtonScope = null), DR.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = i, t === "form" && (a.formTag = i), t === "a" && (a.aTagInScope = i), t === "button" && (a.buttonTagInScope = i), t === "nobr" && (a.nobrTagInScope = i), t === "p" && (a.pTagInButtonScope = i), t === "li" && (a.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = i), a;
      };
      var LR = function(e, t) {
        switch (t) {
          case "select":
            return e === "option" || e === "optgroup" || e === "#text";
          case "optgroup":
            return e === "option" || e === "#text";
          case "option":
            return e === "#text";
          case "tr":
            return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
          case "tbody":
          case "thead":
          case "tfoot":
            return e === "tr" || e === "style" || e === "script" || e === "template";
          case "colgroup":
            return e === "col" || e === "template";
          case "table":
            return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
          case "head":
            return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
          case "html":
            return e === "head" || e === "body" || e === "frameset";
          case "frameset":
            return e === "frame";
          case "#document":
            return e === "html";
        }
        switch (e) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
          case "rp":
          case "rt":
            return MR.indexOf(t) === -1;
          case "body":
          case "caption":
          case "col":
          case "colgroup":
          case "frameset":
          case "frame":
          case "head":
          case "html":
          case "tbody":
          case "td":
          case "tfoot":
          case "th":
          case "thead":
          case "tr":
            return t == null;
        }
        return !0;
      }, NR = function(e, t) {
        switch (e) {
          case "address":
          case "article":
          case "aside":
          case "blockquote":
          case "center":
          case "details":
          case "dialog":
          case "dir":
          case "div":
          case "dl":
          case "fieldset":
          case "figcaption":
          case "figure":
          case "footer":
          case "header":
          case "hgroup":
          case "main":
          case "menu":
          case "nav":
          case "ol":
          case "p":
          case "section":
          case "summary":
          case "ul":
          case "pre":
          case "listing":
          case "table":
          case "hr":
          case "xmp":
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t.pTagInButtonScope;
          case "form":
            return t.formTag || t.pTagInButtonScope;
          case "li":
            return t.listItemTagAutoclosing;
          case "dd":
          case "dt":
            return t.dlItemTagAutoclosing;
          case "button":
            return t.buttonTagInScope;
          case "a":
            return t.aTagInScope;
          case "nobr":
            return t.nobrTagInScope;
        }
        return null;
      }, BC = {};
      Rh = function(e, t, a) {
        a = a || HC;
        var i = a.current, u = i && i.tag;
        t != null && (e != null && h("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var d = LR(e, u) ? null : i, m = d ? null : NR(e, a), S = d || m;
        if (S) {
          var C = S.tag, k = !!d + "|" + e + "|" + C;
          if (!BC[k]) {
            BC[k] = !0;
            var D = e, B = "";
            if (e === "#text" ? /\S/.test(t) ? D = "Text nodes" : (D = "Whitespace text nodes", B = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : D = "<" + e + ">", d) {
              var j = "";
              C === "table" && e === "tr" && (j += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), h("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", D, C, B, j);
            } else
              h("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", D, C);
          }
        }
      };
    }
    var dy = "suppressHydrationWarning", py = "$", hy = "/$", Dh = "$?", Oh = "$!", AR = "style", j0 = null, H0 = null;
    function zR(e) {
      var t, a, i = e.nodeType;
      switch (i) {
        case Cl:
        case xp: {
          t = i === Cl ? "#document" : "#fragment";
          var u = e.documentElement;
          a = u ? u.namespaceURI : Tp(null, "");
          break;
        }
        default: {
          var d = i === Hn ? e.parentNode : e, m = d.namespaceURI || null;
          t = d.tagName, a = Tp(m, t);
          break;
        }
      }
      {
        var S = t.toLowerCase(), C = kh(null, S);
        return {
          namespace: a,
          ancestorInfo: C
        };
      }
    }
    function UR(e, t, a) {
      {
        var i = e, u = Tp(i.namespace, t), d = kh(i.ancestorInfo, t);
        return {
          namespace: u,
          ancestorInfo: d
        };
      }
    }
    function _A(e) {
      return e;
    }
    function FR(e) {
      j0 = $n(), H0 = Kb();
      var t = null;
      return nr(!1), t;
    }
    function PR(e) {
      Jb(H0), nr(j0), j0 = null, H0 = null;
    }
    function jR(e, t, a, i, u) {
      var d;
      {
        var m = i;
        if (Rh(e, null, m.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var S = "" + t.children, C = kh(m.ancestorInfo, e);
          Rh(null, S, C);
        }
        d = m.namespace;
      }
      var k = SR(e, t, a, d);
      return Nh(u, k), Q0(k, t), k;
    }
    function HR(e, t) {
      e.appendChild(t);
    }
    function BR(e, t, a, i, u) {
      switch (CR(e, t, a, i), t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!a.autoFocus;
        case "img":
          return !0;
        default:
          return !1;
      }
    }
    function VR(e, t, a, i, u, d) {
      {
        var m = d;
        if (typeof i.children != typeof a.children && (typeof i.children == "string" || typeof i.children == "number")) {
          var S = "" + i.children, C = kh(m.ancestorInfo, t);
          Rh(null, S, C);
        }
      }
      return wR(e, t, a, i);
    }
    function B0(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function IR(e, t, a, i) {
      {
        var u = a;
        Rh(null, e, u.ancestorInfo);
      }
      var d = ER(e, t);
      return Nh(i, d), d;
    }
    function YR() {
      var e = window.event;
      return e === void 0 ? qa : hd(e.type);
    }
    var V0 = typeof setTimeout == "function" ? setTimeout : void 0, WR = typeof clearTimeout == "function" ? clearTimeout : void 0, I0 = -1, VC = typeof Promise == "function" ? Promise : void 0, $R = typeof queueMicrotask == "function" ? queueMicrotask : typeof VC < "u" ? function(e) {
      return VC.resolve(null).then(e).catch(GR);
    } : V0;
    function GR(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function QR(e, t, a, i) {
      switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          return;
        case "img": {
          a.src && (e.src = a.src);
          return;
        }
      }
    }
    function qR(e, t, a, i, u, d) {
      TR(e, t, a, i, u), Q0(e, u);
    }
    function IC(e) {
      Wu(e, "");
    }
    function XR(e, t, a) {
      e.nodeValue = a;
    }
    function KR(e, t) {
      e.appendChild(t);
    }
    function JR(e, t) {
      var a;
      e.nodeType === Hn ? (a = e.parentNode, a.insertBefore(t, e)) : (a = e, a.appendChild(t));
      var i = e._reactRootContainer;
      i == null && a.onclick === null && fy(a);
    }
    function ZR(e, t, a) {
      e.insertBefore(t, a);
    }
    function ek(e, t, a) {
      e.nodeType === Hn ? e.parentNode.insertBefore(t, a) : e.insertBefore(t, a);
    }
    function tk(e, t) {
      e.removeChild(t);
    }
    function nk(e, t) {
      e.nodeType === Hn ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function Y0(e, t) {
      var a = t, i = 0;
      do {
        var u = a.nextSibling;
        if (e.removeChild(a), u && u.nodeType === Hn) {
          var d = u.data;
          if (d === hy)
            if (i === 0) {
              e.removeChild(u), du(t);
              return;
            } else
              i--;
          else (d === py || d === Dh || d === Oh) && i++;
        }
        a = u;
      } while (a);
      du(t);
    }
    function rk(e, t) {
      e.nodeType === Hn ? Y0(e.parentNode, t) : e.nodeType === ia && Y0(e, t), du(e);
    }
    function ak(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function ik(e) {
      e.nodeValue = "";
    }
    function lk(e, t) {
      e = e;
      var a = t[AR], i = a != null && a.hasOwnProperty("display") ? a.display : null;
      e.style.display = Sf("display", i);
    }
    function ok(e, t) {
      e.nodeValue = t;
    }
    function uk(e) {
      e.nodeType === ia ? e.textContent = "" : e.nodeType === Cl && e.documentElement && e.removeChild(e.documentElement);
    }
    function sk(e, t, a) {
      return e.nodeType !== ia || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function ck(e, t) {
      return t === "" || e.nodeType !== El ? null : e;
    }
    function fk(e) {
      return e.nodeType !== Hn ? null : e;
    }
    function YC(e) {
      return e.data === Dh;
    }
    function W0(e) {
      return e.data === Oh;
    }
    function dk(e) {
      var t = e.nextSibling && e.nextSibling.dataset, a, i, u;
      return t && (a = t.dgst, i = t.msg, u = t.stck), {
        message: i,
        digest: a,
        stack: u
      };
    }
    function pk(e, t) {
      e._reactRetry = t;
    }
    function vy(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === ia || t === El)
          break;
        if (t === Hn) {
          var a = e.data;
          if (a === py || a === Oh || a === Dh)
            break;
          if (a === hy)
            return null;
        }
      }
      return e;
    }
    function Mh(e) {
      return vy(e.nextSibling);
    }
    function hk(e) {
      return vy(e.firstChild);
    }
    function vk(e) {
      return vy(e.firstChild);
    }
    function mk(e) {
      return vy(e.nextSibling);
    }
    function yk(e, t, a, i, u, d, m) {
      Nh(d, e), Q0(e, a);
      var S;
      {
        var C = u;
        S = C.namespace;
      }
      var k = (d.mode & xt) !== et;
      return bR(e, t, a, S, i, k, m);
    }
    function gk(e, t, a, i) {
      return Nh(a, e), a.mode & xt, RR(e, t);
    }
    function _k(e, t) {
      Nh(t, e);
    }
    function Sk(e) {
      for (var t = e.nextSibling, a = 0; t; ) {
        if (t.nodeType === Hn) {
          var i = t.data;
          if (i === hy) {
            if (a === 0)
              return Mh(t);
            a--;
          } else (i === py || i === Oh || i === Dh) && a++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function WC(e) {
      for (var t = e.previousSibling, a = 0; t; ) {
        if (t.nodeType === Hn) {
          var i = t.data;
          if (i === py || i === Oh || i === Dh) {
            if (a === 0)
              return t;
            a--;
          } else i === hy && a++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function Ek(e) {
      du(e);
    }
    function Ck(e) {
      du(e);
    }
    function wk(e) {
      return e !== "head" && e !== "body";
    }
    function Tk(e, t, a, i) {
      var u = !0;
      cy(t.nodeValue, a, i, u);
    }
    function xk(e, t, a, i, u, d) {
      if (t[dy] !== !0) {
        var m = !0;
        cy(i.nodeValue, u, d, m);
      }
    }
    function bk(e, t) {
      t.nodeType === ia ? z0(e, t) : t.nodeType === Hn || U0(e, t);
    }
    function Rk(e, t) {
      {
        var a = e.parentNode;
        a !== null && (t.nodeType === ia ? z0(a, t) : t.nodeType === Hn || U0(a, t));
      }
    }
    function kk(e, t, a, i, u) {
      (u || t[dy] !== !0) && (i.nodeType === ia ? z0(a, i) : i.nodeType === Hn || U0(a, i));
    }
    function Dk(e, t, a) {
      F0(e, t);
    }
    function Ok(e, t) {
      P0(e, t);
    }
    function Mk(e, t, a) {
      {
        var i = e.parentNode;
        i !== null && F0(i, t);
      }
    }
    function Lk(e, t) {
      {
        var a = e.parentNode;
        a !== null && P0(a, t);
      }
    }
    function Nk(e, t, a, i, u, d) {
      (d || t[dy] !== !0) && F0(a, i);
    }
    function Ak(e, t, a, i, u) {
      (u || t[dy] !== !0) && P0(a, i);
    }
    function zk(e) {
      h("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function Uk(e) {
      wh(e);
    }
    var kd = Math.random().toString(36).slice(2), Dd = "__reactFiber$" + kd, $0 = "__reactProps$" + kd, Lh = "__reactContainer$" + kd, G0 = "__reactEvents$" + kd, Fk = "__reactListeners$" + kd, Pk = "__reactHandles$" + kd;
    function jk(e) {
      delete e[Dd], delete e[$0], delete e[G0], delete e[Fk], delete e[Pk];
    }
    function Nh(e, t) {
      t[Dd] = e;
    }
    function my(e, t) {
      t[Lh] = e;
    }
    function $C(e) {
      e[Lh] = null;
    }
    function Ah(e) {
      return !!e[Lh];
    }
    function Bc(e) {
      var t = e[Dd];
      if (t)
        return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[Lh] || a[Dd], t) {
          var i = t.alternate;
          if (t.child !== null || i !== null && i.child !== null)
            for (var u = WC(e); u !== null; ) {
              var d = u[Dd];
              if (d)
                return d;
              u = WC(u);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function vs(e) {
      var t = e[Dd] || e[Lh];
      return t && (t.tag === M || t.tag === V || t.tag === Y || t.tag === O) ? t : null;
    }
    function Od(e) {
      if (e.tag === M || e.tag === V)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function yy(e) {
      return e[$0] || null;
    }
    function Q0(e, t) {
      e[$0] = t;
    }
    function Hk(e) {
      var t = e[G0];
      return t === void 0 && (t = e[G0] = /* @__PURE__ */ new Set()), t;
    }
    var GC = {}, QC = s.ReactDebugCurrentFrame;
    function gy(e) {
      if (e) {
        var t = e._owner, a = yl(e.type, e._source, t ? t.type : null);
        QC.setExtraStackFrame(a);
      } else
        QC.setExtraStackFrame(null);
    }
    function Nl(e, t, a, i, u) {
      {
        var d = Function.call.bind(Fr);
        for (var m in e)
          if (d(e, m)) {
            var S = void 0;
            try {
              if (typeof e[m] != "function") {
                var C = Error((i || "React class") + ": " + a + " type `" + m + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[m] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw C.name = "Invariant Violation", C;
              }
              S = e[m](t, m, i, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (k) {
              S = k;
            }
            S && !(S instanceof Error) && (gy(u), h("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", a, m, typeof S), gy(null)), S instanceof Error && !(S.message in GC) && (GC[S.message] = !0, gy(u), h("Failed %s type: %s", a, S.message), gy(null));
          }
      }
    }
    var q0 = [], _y;
    _y = [];
    var gu = -1;
    function ms(e) {
      return {
        current: e
      };
    }
    function ma(e, t) {
      if (gu < 0) {
        h("Unexpected pop.");
        return;
      }
      t !== _y[gu] && h("Unexpected Fiber popped."), e.current = q0[gu], q0[gu] = null, _y[gu] = null, gu--;
    }
    function ya(e, t, a) {
      gu++, q0[gu] = e.current, _y[gu] = a, e.current = t;
    }
    var X0;
    X0 = {};
    var Ri = {};
    Object.freeze(Ri);
    var _u = ms(Ri), Co = ms(!1), K0 = Ri;
    function Md(e, t, a) {
      return a && wo(t) ? K0 : _u.current;
    }
    function qC(e, t, a) {
      {
        var i = e.stateNode;
        i.__reactInternalMemoizedUnmaskedChildContext = t, i.__reactInternalMemoizedMaskedChildContext = a;
      }
    }
    function Ld(e, t) {
      {
        var a = e.type, i = a.contextTypes;
        if (!i)
          return Ri;
        var u = e.stateNode;
        if (u && u.__reactInternalMemoizedUnmaskedChildContext === t)
          return u.__reactInternalMemoizedMaskedChildContext;
        var d = {};
        for (var m in i)
          d[m] = t[m];
        {
          var S = pt(e) || "Unknown";
          Nl(i, d, "context", S);
        }
        return u && qC(e, t, d), d;
      }
    }
    function Sy() {
      return Co.current;
    }
    function wo(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function Ey(e) {
      ma(Co, e), ma(_u, e);
    }
    function J0(e) {
      ma(Co, e), ma(_u, e);
    }
    function XC(e, t, a) {
      {
        if (_u.current !== Ri)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        ya(_u, t, e), ya(Co, a, e);
      }
    }
    function KC(e, t, a) {
      {
        var i = e.stateNode, u = t.childContextTypes;
        if (typeof i.getChildContext != "function") {
          {
            var d = pt(e) || "Unknown";
            X0[d] || (X0[d] = !0, h("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", d, d));
          }
          return a;
        }
        var m = i.getChildContext();
        for (var S in m)
          if (!(S in u))
            throw new Error((pt(e) || "Unknown") + '.getChildContext(): key "' + S + '" is not defined in childContextTypes.');
        {
          var C = pt(e) || "Unknown";
          Nl(u, m, "child context", C);
        }
        return St({}, a, m);
      }
    }
    function Cy(e) {
      {
        var t = e.stateNode, a = t && t.__reactInternalMemoizedMergedChildContext || Ri;
        return K0 = _u.current, ya(_u, a, e), ya(Co, Co.current, e), !0;
      }
    }
    function JC(e, t, a) {
      {
        var i = e.stateNode;
        if (!i)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (a) {
          var u = KC(e, t, K0);
          i.__reactInternalMemoizedMergedChildContext = u, ma(Co, e), ma(_u, e), ya(_u, u, e), ya(Co, a, e);
        } else
          ma(Co, e), ya(Co, a, e);
      }
    }
    function Bk(e) {
      {
        if (!Jo(e) || e.tag !== x)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case O:
              return t.stateNode.context;
            case x: {
              var a = t.type;
              if (wo(a))
                return t.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          t = t.return;
        } while (t !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var ys = 0, wy = 1, Su = null, Z0 = !1, e_ = !1;
    function ZC(e) {
      Su === null ? Su = [e] : Su.push(e);
    }
    function Vk(e) {
      Z0 = !0, ZC(e);
    }
    function e1() {
      Z0 && gs();
    }
    function gs() {
      if (!e_ && Su !== null) {
        e_ = !0;
        var e = 0, t = Ka();
        try {
          var a = !0, i = Su;
          for (Wn(Ir); e < i.length; e++) {
            var u = i[e];
            do
              u = u(a);
            while (u !== null);
          }
          Su = null, Z0 = !1;
        } catch (d) {
          throw Su !== null && (Su = Su.slice(e + 1)), Fp(lc, gs), d;
        } finally {
          Wn(t), e_ = !1;
        }
      }
      return null;
    }
    var Nd = [], Ad = 0, Ty = null, xy = 0, il = [], ll = 0, Vc = null, Eu = 1, Cu = "";
    function Ik(e) {
      return Yc(), (e.flags & qi) !== Ze;
    }
    function Yk(e) {
      return Yc(), xy;
    }
    function Wk() {
      var e = Cu, t = Eu, a = t & ~$k(t);
      return a.toString(32) + e;
    }
    function Ic(e, t) {
      Yc(), Nd[Ad++] = xy, Nd[Ad++] = Ty, Ty = e, xy = t;
    }
    function t1(e, t, a) {
      Yc(), il[ll++] = Eu, il[ll++] = Cu, il[ll++] = Vc, Vc = e;
      var i = Eu, u = Cu, d = by(i) - 1, m = i & ~(1 << d), S = a + 1, C = by(t) + d;
      if (C > 30) {
        var k = d - d % 5, D = (1 << k) - 1, B = (m & D).toString(32), j = m >> k, X = d - k, Z = by(t) + X, oe = S << X, Le = oe | j, nt = B + u;
        Eu = 1 << Z | Le, Cu = nt;
      } else {
        var Xe = S << d, Nt = Xe | m, kt = u;
        Eu = 1 << C | Nt, Cu = kt;
      }
    }
    function t_(e) {
      Yc();
      var t = e.return;
      if (t !== null) {
        var a = 1, i = 0;
        Ic(e, a), t1(e, a, i);
      }
    }
    function by(e) {
      return 32 - In(e);
    }
    function $k(e) {
      return 1 << by(e) - 1;
    }
    function n_(e) {
      for (; e === Ty; )
        Ty = Nd[--Ad], Nd[Ad] = null, xy = Nd[--Ad], Nd[Ad] = null;
      for (; e === Vc; )
        Vc = il[--ll], il[ll] = null, Cu = il[--ll], il[ll] = null, Eu = il[--ll], il[ll] = null;
    }
    function Gk() {
      return Yc(), Vc !== null ? {
        id: Eu,
        overflow: Cu
      } : null;
    }
    function Qk(e, t) {
      Yc(), il[ll++] = Eu, il[ll++] = Cu, il[ll++] = Vc, Eu = t.id, Cu = t.overflow, Vc = e;
    }
    function Yc() {
      Qr() || h("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var Gr = null, ol = null, Al = !1, Wc = !1, _s = null;
    function qk() {
      Al && h("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function n1() {
      Wc = !0;
    }
    function Xk() {
      return Wc;
    }
    function Kk(e) {
      var t = e.stateNode.containerInfo;
      return ol = vk(t), Gr = e, Al = !0, _s = null, Wc = !1, !0;
    }
    function Jk(e, t, a) {
      return ol = mk(t), Gr = e, Al = !0, _s = null, Wc = !1, a !== null && Qk(e, a), !0;
    }
    function r1(e, t) {
      switch (e.tag) {
        case O: {
          bk(e.stateNode.containerInfo, t);
          break;
        }
        case M: {
          var a = (e.mode & xt) !== et;
          kk(
            e.type,
            e.memoizedProps,
            e.stateNode,
            t,
            // TODO: Delete this argument when we remove the legacy root API.
            a
          );
          break;
        }
        case Y: {
          var i = e.memoizedState;
          i.dehydrated !== null && Rk(i.dehydrated, t);
          break;
        }
      }
    }
    function a1(e, t) {
      r1(e, t);
      var a = nL();
      a.stateNode = t, a.return = e;
      var i = e.deletions;
      i === null ? (e.deletions = [a], e.flags |= Ya) : i.push(a);
    }
    function r_(e, t) {
      {
        if (Wc)
          return;
        switch (e.tag) {
          case O: {
            var a = e.stateNode.containerInfo;
            switch (t.tag) {
              case M:
                var i = t.type;
                t.pendingProps, Dk(a, i);
                break;
              case V:
                var u = t.pendingProps;
                Ok(a, u);
                break;
            }
            break;
          }
          case M: {
            var d = e.type, m = e.memoizedProps, S = e.stateNode;
            switch (t.tag) {
              case M: {
                var C = t.type, k = t.pendingProps, D = (e.mode & xt) !== et;
                Nk(
                  d,
                  m,
                  S,
                  C,
                  k,
                  // TODO: Delete this argument when we remove the legacy root API.
                  D
                );
                break;
              }
              case V: {
                var B = t.pendingProps, j = (e.mode & xt) !== et;
                Ak(
                  d,
                  m,
                  S,
                  B,
                  // TODO: Delete this argument when we remove the legacy root API.
                  j
                );
                break;
              }
            }
            break;
          }
          case Y: {
            var X = e.memoizedState, Z = X.dehydrated;
            if (Z !== null) switch (t.tag) {
              case M:
                var oe = t.type;
                t.pendingProps, Mk(Z, oe);
                break;
              case V:
                var Le = t.pendingProps;
                Lk(Z, Le);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function i1(e, t) {
      t.flags = t.flags & ~oa | Sn, r_(e, t);
    }
    function l1(e, t) {
      switch (e.tag) {
        case M: {
          var a = e.type;
          e.pendingProps;
          var i = sk(t, a);
          return i !== null ? (e.stateNode = i, Gr = e, ol = hk(i), !0) : !1;
        }
        case V: {
          var u = e.pendingProps, d = ck(t, u);
          return d !== null ? (e.stateNode = d, Gr = e, ol = null, !0) : !1;
        }
        case Y: {
          var m = fk(t);
          if (m !== null) {
            var S = {
              dehydrated: m,
              treeContext: Gk(),
              retryLane: fa
            };
            e.memoizedState = S;
            var C = rL(m);
            return C.return = e, e.child = C, Gr = e, ol = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function a_(e) {
      return (e.mode & xt) !== et && (e.flags & Je) === Ze;
    }
    function i_(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function l_(e) {
      if (Al) {
        var t = ol;
        if (!t) {
          a_(e) && (r_(Gr, e), i_()), i1(Gr, e), Al = !1, Gr = e;
          return;
        }
        var a = t;
        if (!l1(e, t)) {
          a_(e) && (r_(Gr, e), i_()), t = Mh(a);
          var i = Gr;
          if (!t || !l1(e, t)) {
            i1(Gr, e), Al = !1, Gr = e;
            return;
          }
          a1(i, a);
        }
      }
    }
    function Zk(e, t, a) {
      var i = e.stateNode, u = !Wc, d = yk(i, e.type, e.memoizedProps, t, a, e, u);
      return e.updateQueue = d, d !== null;
    }
    function eD(e) {
      var t = e.stateNode, a = e.memoizedProps, i = gk(t, a, e);
      if (i) {
        var u = Gr;
        if (u !== null)
          switch (u.tag) {
            case O: {
              var d = u.stateNode.containerInfo, m = (u.mode & xt) !== et;
              Tk(
                d,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                m
              );
              break;
            }
            case M: {
              var S = u.type, C = u.memoizedProps, k = u.stateNode, D = (u.mode & xt) !== et;
              xk(
                S,
                C,
                k,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                D
              );
              break;
            }
          }
      }
      return i;
    }
    function tD(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      _k(a, e);
    }
    function nD(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return Sk(a);
    }
    function o1(e) {
      for (var t = e.return; t !== null && t.tag !== M && t.tag !== O && t.tag !== Y; )
        t = t.return;
      Gr = t;
    }
    function Ry(e) {
      if (e !== Gr)
        return !1;
      if (!Al)
        return o1(e), Al = !0, !1;
      if (e.tag !== O && (e.tag !== M || wk(e.type) && !B0(e.type, e.memoizedProps))) {
        var t = ol;
        if (t)
          if (a_(e))
            u1(e), i_();
          else
            for (; t; )
              a1(e, t), t = Mh(t);
      }
      return o1(e), e.tag === Y ? ol = nD(e) : ol = Gr ? Mh(e.stateNode) : null, !0;
    }
    function rD() {
      return Al && ol !== null;
    }
    function u1(e) {
      for (var t = ol; t; )
        r1(e, t), t = Mh(t);
    }
    function zd() {
      Gr = null, ol = null, Al = !1, Wc = !1;
    }
    function s1() {
      _s !== null && (nT(_s), _s = null);
    }
    function Qr() {
      return Al;
    }
    function o_(e) {
      _s === null ? _s = [e] : _s.push(e);
    }
    var aD = s.ReactCurrentBatchConfig, iD = null;
    function lD() {
      return aD.transition;
    }
    var zl = {
      recordUnsafeLifecycleWarnings: function(e, t) {
      },
      flushPendingUnsafeLifecycleWarnings: function() {
      },
      recordLegacyContextWarning: function(e, t) {
      },
      flushLegacyContextWarning: function() {
      },
      discardPendingWarnings: function() {
      }
    };
    {
      var oD = function(e) {
        for (var t = null, a = e; a !== null; )
          a.mode & en && (t = a), a = a.return;
        return t;
      }, $c = function(e) {
        var t = [];
        return e.forEach(function(a) {
          t.push(a);
        }), t.sort().join(", ");
      }, zh = [], Uh = [], Fh = [], Ph = [], jh = [], Hh = [], Gc = /* @__PURE__ */ new Set();
      zl.recordUnsafeLifecycleWarnings = function(e, t) {
        Gc.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && zh.push(e), e.mode & en && typeof t.UNSAFE_componentWillMount == "function" && Uh.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && Fh.push(e), e.mode & en && typeof t.UNSAFE_componentWillReceiveProps == "function" && Ph.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && jh.push(e), e.mode & en && typeof t.UNSAFE_componentWillUpdate == "function" && Hh.push(e));
      }, zl.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        zh.length > 0 && (zh.forEach(function(j) {
          e.add(pt(j) || "Component"), Gc.add(j.type);
        }), zh = []);
        var t = /* @__PURE__ */ new Set();
        Uh.length > 0 && (Uh.forEach(function(j) {
          t.add(pt(j) || "Component"), Gc.add(j.type);
        }), Uh = []);
        var a = /* @__PURE__ */ new Set();
        Fh.length > 0 && (Fh.forEach(function(j) {
          a.add(pt(j) || "Component"), Gc.add(j.type);
        }), Fh = []);
        var i = /* @__PURE__ */ new Set();
        Ph.length > 0 && (Ph.forEach(function(j) {
          i.add(pt(j) || "Component"), Gc.add(j.type);
        }), Ph = []);
        var u = /* @__PURE__ */ new Set();
        jh.length > 0 && (jh.forEach(function(j) {
          u.add(pt(j) || "Component"), Gc.add(j.type);
        }), jh = []);
        var d = /* @__PURE__ */ new Set();
        if (Hh.length > 0 && (Hh.forEach(function(j) {
          d.add(pt(j) || "Component"), Gc.add(j.type);
        }), Hh = []), t.size > 0) {
          var m = $c(t);
          h(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, m);
        }
        if (i.size > 0) {
          var S = $c(i);
          h(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, S);
        }
        if (d.size > 0) {
          var C = $c(d);
          h(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, C);
        }
        if (e.size > 0) {
          var k = $c(e);
          y(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, k);
        }
        if (a.size > 0) {
          var D = $c(a);
          y(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, D);
        }
        if (u.size > 0) {
          var B = $c(u);
          y(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, B);
        }
      };
      var ky = /* @__PURE__ */ new Map(), c1 = /* @__PURE__ */ new Set();
      zl.recordLegacyContextWarning = function(e, t) {
        var a = oD(e);
        if (a === null) {
          h("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!c1.has(e.type)) {
          var i = ky.get(a);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], ky.set(a, i)), i.push(e));
        }
      }, zl.flushLegacyContextWarning = function() {
        ky.forEach(function(e, t) {
          if (e.length !== 0) {
            var a = e[0], i = /* @__PURE__ */ new Set();
            e.forEach(function(d) {
              i.add(pt(d) || "Component"), c1.add(d.type);
            });
            var u = $c(i);
            try {
              Kt(a), h(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u);
            } finally {
              dn();
            }
          }
        });
      }, zl.discardPendingWarnings = function() {
        zh = [], Uh = [], Fh = [], Ph = [], jh = [], Hh = [], ky = /* @__PURE__ */ new Map();
      };
    }
    var u_, s_, c_, f_, d_, f1 = function(e, t) {
    };
    u_ = !1, s_ = !1, c_ = {}, f_ = {}, d_ = {}, f1 = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var a = pt(t) || "Component";
        f_[a] || (f_[a] = !0, h('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function uD(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function Bh(e, t, a) {
      var i = a.ref;
      if (i !== null && typeof i != "function" && typeof i != "object") {
        if ((e.mode & en || te) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(a._owner && a._self && a._owner.stateNode !== a._self) && // Will already throw with "Function components cannot have string refs"
        !(a._owner && a._owner.tag !== x) && // Will already warn with "Function components cannot be given refs"
        !(typeof a.type == "function" && !uD(a.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        a._owner) {
          var u = pt(e) || "Component";
          c_[u] || (h('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', u, i), c_[u] = !0);
        }
        if (a._owner) {
          var d = a._owner, m;
          if (d) {
            var S = d;
            if (S.tag !== x)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            m = S.stateNode;
          }
          if (!m)
            throw new Error("Missing owner for string ref " + i + ". This error is likely caused by a bug in React. Please file an issue.");
          var C = m;
          Fi(i, "ref");
          var k = "" + i;
          if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === k)
            return t.ref;
          var D = function(B) {
            var j = C.refs;
            B === null ? delete j[k] : j[k] = B;
          };
          return D._stringRef = k, D;
        } else {
          if (typeof i != "string")
            throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
          if (!a._owner)
            throw new Error("Element ref was specified as a string (" + i + `) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`);
        }
      }
      return i;
    }
    function Dy(e, t) {
      var a = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
    }
    function Oy(e) {
      {
        var t = pt(e) || "Component";
        if (d_[t])
          return;
        d_[t] = !0, h("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function d1(e) {
      var t = e._payload, a = e._init;
      return a(t);
    }
    function p1(e) {
      function t($, ue) {
        if (e) {
          var G = $.deletions;
          G === null ? ($.deletions = [ue], $.flags |= Ya) : G.push(ue);
        }
      }
      function a($, ue) {
        if (!e)
          return null;
        for (var G = ue; G !== null; )
          t($, G), G = G.sibling;
        return null;
      }
      function i($, ue) {
        for (var G = /* @__PURE__ */ new Map(), Ce = ue; Ce !== null; )
          Ce.key !== null ? G.set(Ce.key, Ce) : G.set(Ce.index, Ce), Ce = Ce.sibling;
        return G;
      }
      function u($, ue) {
        var G = nf($, ue);
        return G.index = 0, G.sibling = null, G;
      }
      function d($, ue, G) {
        if ($.index = G, !e)
          return $.flags |= qi, ue;
        var Ce = $.alternate;
        if (Ce !== null) {
          var Ue = Ce.index;
          return Ue < ue ? ($.flags |= Sn, ue) : Ue;
        } else
          return $.flags |= Sn, ue;
      }
      function m($) {
        return e && $.alternate === null && ($.flags |= Sn), $;
      }
      function S($, ue, G, Ce) {
        if (ue === null || ue.tag !== V) {
          var Ue = oE(G, $.mode, Ce);
          return Ue.return = $, Ue;
        } else {
          var Ne = u(ue, G);
          return Ne.return = $, Ne;
        }
      }
      function C($, ue, G, Ce) {
        var Ue = G.type;
        if (Ue === ji)
          return D($, ue, G.props.children, Ce, G.key);
        if (ue !== null && (ue.elementType === Ue || // Keep this check inline so it only runs on the false path:
        gT(ue, G) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof Ue == "object" && Ue !== null && Ue.$$typeof === ht && d1(Ue) === ue.type)) {
          var Ne = u(ue, G.props);
          return Ne.ref = Bh($, ue, G), Ne.return = $, Ne._debugSource = G._source, Ne._debugOwner = G._owner, Ne;
        }
        var ft = lE(G, $.mode, Ce);
        return ft.ref = Bh($, ue, G), ft.return = $, ft;
      }
      function k($, ue, G, Ce) {
        if (ue === null || ue.tag !== A || ue.stateNode.containerInfo !== G.containerInfo || ue.stateNode.implementation !== G.implementation) {
          var Ue = uE(G, $.mode, Ce);
          return Ue.return = $, Ue;
        } else {
          var Ne = u(ue, G.children || []);
          return Ne.return = $, Ne;
        }
      }
      function D($, ue, G, Ce, Ue) {
        if (ue === null || ue.tag !== L) {
          var Ne = Os(G, $.mode, Ce, Ue);
          return Ne.return = $, Ne;
        } else {
          var ft = u(ue, G);
          return ft.return = $, ft;
        }
      }
      function B($, ue, G) {
        if (typeof ue == "string" && ue !== "" || typeof ue == "number") {
          var Ce = oE("" + ue, $.mode, G);
          return Ce.return = $, Ce;
        }
        if (typeof ue == "object" && ue !== null) {
          switch (ue.$$typeof) {
            case jr: {
              var Ue = lE(ue, $.mode, G);
              return Ue.ref = Bh($, null, ue), Ue.return = $, Ue;
            }
            case hr: {
              var Ne = uE(ue, $.mode, G);
              return Ne.return = $, Ne;
            }
            case ht: {
              var ft = ue._payload, mt = ue._init;
              return B($, mt(ft), G);
            }
          }
          if (Ct(ue) || gt(ue)) {
            var nn = Os(ue, $.mode, G, null);
            return nn.return = $, nn;
          }
          Dy($, ue);
        }
        return typeof ue == "function" && Oy($), null;
      }
      function j($, ue, G, Ce) {
        var Ue = ue !== null ? ue.key : null;
        if (typeof G == "string" && G !== "" || typeof G == "number")
          return Ue !== null ? null : S($, ue, "" + G, Ce);
        if (typeof G == "object" && G !== null) {
          switch (G.$$typeof) {
            case jr:
              return G.key === Ue ? C($, ue, G, Ce) : null;
            case hr:
              return G.key === Ue ? k($, ue, G, Ce) : null;
            case ht: {
              var Ne = G._payload, ft = G._init;
              return j($, ue, ft(Ne), Ce);
            }
          }
          if (Ct(G) || gt(G))
            return Ue !== null ? null : D($, ue, G, Ce, null);
          Dy($, G);
        }
        return typeof G == "function" && Oy($), null;
      }
      function X($, ue, G, Ce, Ue) {
        if (typeof Ce == "string" && Ce !== "" || typeof Ce == "number") {
          var Ne = $.get(G) || null;
          return S(ue, Ne, "" + Ce, Ue);
        }
        if (typeof Ce == "object" && Ce !== null) {
          switch (Ce.$$typeof) {
            case jr: {
              var ft = $.get(Ce.key === null ? G : Ce.key) || null;
              return C(ue, ft, Ce, Ue);
            }
            case hr: {
              var mt = $.get(Ce.key === null ? G : Ce.key) || null;
              return k(ue, mt, Ce, Ue);
            }
            case ht:
              var nn = Ce._payload, Vt = Ce._init;
              return X($, ue, G, Vt(nn), Ue);
          }
          if (Ct(Ce) || gt(Ce)) {
            var rr = $.get(G) || null;
            return D(ue, rr, Ce, Ue, null);
          }
          Dy(ue, Ce);
        }
        return typeof Ce == "function" && Oy(ue), null;
      }
      function Z($, ue, G) {
        {
          if (typeof $ != "object" || $ === null)
            return ue;
          switch ($.$$typeof) {
            case jr:
            case hr:
              f1($, G);
              var Ce = $.key;
              if (typeof Ce != "string")
                break;
              if (ue === null) {
                ue = /* @__PURE__ */ new Set(), ue.add(Ce);
                break;
              }
              if (!ue.has(Ce)) {
                ue.add(Ce);
                break;
              }
              h("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", Ce);
              break;
            case ht:
              var Ue = $._payload, Ne = $._init;
              Z(Ne(Ue), ue, G);
              break;
          }
        }
        return ue;
      }
      function oe($, ue, G, Ce) {
        for (var Ue = null, Ne = 0; Ne < G.length; Ne++) {
          var ft = G[Ne];
          Ue = Z(ft, Ue, $);
        }
        for (var mt = null, nn = null, Vt = ue, rr = 0, It = 0, Qn = null; Vt !== null && It < G.length; It++) {
          Vt.index > It ? (Qn = Vt, Vt = null) : Qn = Vt.sibling;
          var _a = j($, Vt, G[It], Ce);
          if (_a === null) {
            Vt === null && (Vt = Qn);
            break;
          }
          e && Vt && _a.alternate === null && t($, Vt), rr = d(_a, rr, It), nn === null ? mt = _a : nn.sibling = _a, nn = _a, Vt = Qn;
        }
        if (It === G.length) {
          if (a($, Vt), Qr()) {
            var ta = It;
            Ic($, ta);
          }
          return mt;
        }
        if (Vt === null) {
          for (; It < G.length; It++) {
            var Di = B($, G[It], Ce);
            Di !== null && (rr = d(Di, rr, It), nn === null ? mt = Di : nn.sibling = Di, nn = Di);
          }
          if (Qr()) {
            var Ua = It;
            Ic($, Ua);
          }
          return mt;
        }
        for (var Fa = i($, Vt); It < G.length; It++) {
          var Sa = X(Fa, $, It, G[It], Ce);
          Sa !== null && (e && Sa.alternate !== null && Fa.delete(Sa.key === null ? It : Sa.key), rr = d(Sa, rr, It), nn === null ? mt = Sa : nn.sibling = Sa, nn = Sa);
        }
        if (e && Fa.forEach(function(ep) {
          return t($, ep);
        }), Qr()) {
          var Du = It;
          Ic($, Du);
        }
        return mt;
      }
      function Le($, ue, G, Ce) {
        var Ue = gt(G);
        if (typeof Ue != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          G[Symbol.toStringTag] === "Generator" && (s_ || h("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), s_ = !0), G.entries === Ue && (u_ || h("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), u_ = !0);
          var Ne = Ue.call(G);
          if (Ne)
            for (var ft = null, mt = Ne.next(); !mt.done; mt = Ne.next()) {
              var nn = mt.value;
              ft = Z(nn, ft, $);
            }
        }
        var Vt = Ue.call(G);
        if (Vt == null)
          throw new Error("An iterable object provided no iterator.");
        for (var rr = null, It = null, Qn = ue, _a = 0, ta = 0, Di = null, Ua = Vt.next(); Qn !== null && !Ua.done; ta++, Ua = Vt.next()) {
          Qn.index > ta ? (Di = Qn, Qn = null) : Di = Qn.sibling;
          var Fa = j($, Qn, Ua.value, Ce);
          if (Fa === null) {
            Qn === null && (Qn = Di);
            break;
          }
          e && Qn && Fa.alternate === null && t($, Qn), _a = d(Fa, _a, ta), It === null ? rr = Fa : It.sibling = Fa, It = Fa, Qn = Di;
        }
        if (Ua.done) {
          if (a($, Qn), Qr()) {
            var Sa = ta;
            Ic($, Sa);
          }
          return rr;
        }
        if (Qn === null) {
          for (; !Ua.done; ta++, Ua = Vt.next()) {
            var Du = B($, Ua.value, Ce);
            Du !== null && (_a = d(Du, _a, ta), It === null ? rr = Du : It.sibling = Du, It = Du);
          }
          if (Qr()) {
            var ep = ta;
            Ic($, ep);
          }
          return rr;
        }
        for (var _v = i($, Qn); !Ua.done; ta++, Ua = Vt.next()) {
          var Mo = X(_v, $, ta, Ua.value, Ce);
          Mo !== null && (e && Mo.alternate !== null && _v.delete(Mo.key === null ? ta : Mo.key), _a = d(Mo, _a, ta), It === null ? rr = Mo : It.sibling = Mo, It = Mo);
        }
        if (e && _v.forEach(function(AL) {
          return t($, AL);
        }), Qr()) {
          var NL = ta;
          Ic($, NL);
        }
        return rr;
      }
      function nt($, ue, G, Ce) {
        if (ue !== null && ue.tag === V) {
          a($, ue.sibling);
          var Ue = u(ue, G);
          return Ue.return = $, Ue;
        }
        a($, ue);
        var Ne = oE(G, $.mode, Ce);
        return Ne.return = $, Ne;
      }
      function Xe($, ue, G, Ce) {
        for (var Ue = G.key, Ne = ue; Ne !== null; ) {
          if (Ne.key === Ue) {
            var ft = G.type;
            if (ft === ji) {
              if (Ne.tag === L) {
                a($, Ne.sibling);
                var mt = u(Ne, G.props.children);
                return mt.return = $, mt._debugSource = G._source, mt._debugOwner = G._owner, mt;
              }
            } else if (Ne.elementType === ft || // Keep this check inline so it only runs on the false path:
            gT(Ne, G) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof ft == "object" && ft !== null && ft.$$typeof === ht && d1(ft) === Ne.type) {
              a($, Ne.sibling);
              var nn = u(Ne, G.props);
              return nn.ref = Bh($, Ne, G), nn.return = $, nn._debugSource = G._source, nn._debugOwner = G._owner, nn;
            }
            a($, Ne);
            break;
          } else
            t($, Ne);
          Ne = Ne.sibling;
        }
        if (G.type === ji) {
          var Vt = Os(G.props.children, $.mode, Ce, G.key);
          return Vt.return = $, Vt;
        } else {
          var rr = lE(G, $.mode, Ce);
          return rr.ref = Bh($, ue, G), rr.return = $, rr;
        }
      }
      function Nt($, ue, G, Ce) {
        for (var Ue = G.key, Ne = ue; Ne !== null; ) {
          if (Ne.key === Ue)
            if (Ne.tag === A && Ne.stateNode.containerInfo === G.containerInfo && Ne.stateNode.implementation === G.implementation) {
              a($, Ne.sibling);
              var ft = u(Ne, G.children || []);
              return ft.return = $, ft;
            } else {
              a($, Ne);
              break;
            }
          else
            t($, Ne);
          Ne = Ne.sibling;
        }
        var mt = uE(G, $.mode, Ce);
        return mt.return = $, mt;
      }
      function kt($, ue, G, Ce) {
        var Ue = typeof G == "object" && G !== null && G.type === ji && G.key === null;
        if (Ue && (G = G.props.children), typeof G == "object" && G !== null) {
          switch (G.$$typeof) {
            case jr:
              return m(Xe($, ue, G, Ce));
            case hr:
              return m(Nt($, ue, G, Ce));
            case ht:
              var Ne = G._payload, ft = G._init;
              return kt($, ue, ft(Ne), Ce);
          }
          if (Ct(G))
            return oe($, ue, G, Ce);
          if (gt(G))
            return Le($, ue, G, Ce);
          Dy($, G);
        }
        return typeof G == "string" && G !== "" || typeof G == "number" ? m(nt($, ue, "" + G, Ce)) : (typeof G == "function" && Oy($), a($, ue));
      }
      return kt;
    }
    var Ud = p1(!0), h1 = p1(!1);
    function sD(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var a = t.child, i = nf(a, a.pendingProps);
        for (t.child = i, i.return = t; a.sibling !== null; )
          a = a.sibling, i = i.sibling = nf(a, a.pendingProps), i.return = t;
        i.sibling = null;
      }
    }
    function cD(e, t) {
      for (var a = e.child; a !== null; )
        KM(a, t), a = a.sibling;
    }
    var p_ = ms(null), h_;
    h_ = {};
    var My = null, Fd = null, v_ = null, Ly = !1;
    function Ny() {
      My = null, Fd = null, v_ = null, Ly = !1;
    }
    function v1() {
      Ly = !0;
    }
    function m1() {
      Ly = !1;
    }
    function y1(e, t, a) {
      ya(p_, t._currentValue, e), t._currentValue = a, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== h_ && h("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = h_;
    }
    function m_(e, t) {
      var a = p_.current;
      ma(p_, t), e._currentValue = a;
    }
    function y_(e, t, a) {
      for (var i = e; i !== null; ) {
        var u = i.alternate;
        if (fu(i.childLanes, t) ? u !== null && !fu(u.childLanes, t) && (u.childLanes = _t(u.childLanes, t)) : (i.childLanes = _t(i.childLanes, t), u !== null && (u.childLanes = _t(u.childLanes, t))), i === a)
          break;
        i = i.return;
      }
      i !== a && h("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function fD(e, t, a) {
      dD(e, t, a);
    }
    function dD(e, t, a) {
      var i = e.child;
      for (i !== null && (i.return = e); i !== null; ) {
        var u = void 0, d = i.dependencies;
        if (d !== null) {
          u = i.child;
          for (var m = d.firstContext; m !== null; ) {
            if (m.context === t) {
              if (i.tag === x) {
                var S = Sc(a), C = wu(rn, S);
                C.tag = zy;
                var k = i.updateQueue;
                if (k !== null) {
                  var D = k.shared, B = D.pending;
                  B === null ? C.next = C : (C.next = B.next, B.next = C), D.pending = C;
                }
              }
              i.lanes = _t(i.lanes, a);
              var j = i.alternate;
              j !== null && (j.lanes = _t(j.lanes, a)), y_(i.return, a, e), d.lanes = _t(d.lanes, a);
              break;
            }
            m = m.next;
          }
        } else if (i.tag === ee)
          u = i.type === e.type ? null : i.child;
        else if (i.tag === Ie) {
          var X = i.return;
          if (X === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          X.lanes = _t(X.lanes, a);
          var Z = X.alternate;
          Z !== null && (Z.lanes = _t(Z.lanes, a)), y_(X, a, e), u = i.sibling;
        } else
          u = i.child;
        if (u !== null)
          u.return = i;
        else
          for (u = i; u !== null; ) {
            if (u === e) {
              u = null;
              break;
            }
            var oe = u.sibling;
            if (oe !== null) {
              oe.return = u.return, u = oe;
              break;
            }
            u = u.return;
          }
        i = u;
      }
    }
    function Pd(e, t) {
      My = e, Fd = null, v_ = null;
      var a = e.dependencies;
      if (a !== null) {
        var i = a.firstContext;
        i !== null && (da(a.lanes, t) && nv(), a.firstContext = null);
      }
    }
    function fr(e) {
      Ly && h("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (v_ !== e) {
        var a = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (Fd === null) {
          if (My === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          Fd = a, My.dependencies = {
            lanes: ve,
            firstContext: a
          };
        } else
          Fd = Fd.next = a;
      }
      return t;
    }
    var Qc = null;
    function g_(e) {
      Qc === null ? Qc = [e] : Qc.push(e);
    }
    function pD() {
      if (Qc !== null) {
        for (var e = 0; e < Qc.length; e++) {
          var t = Qc[e], a = t.interleaved;
          if (a !== null) {
            t.interleaved = null;
            var i = a.next, u = t.pending;
            if (u !== null) {
              var d = u.next;
              u.next = i, a.next = d;
            }
            t.pending = a;
          }
        }
        Qc = null;
      }
    }
    function g1(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, g_(t)) : (a.next = u.next, u.next = a), t.interleaved = a, Ay(e, i);
    }
    function hD(e, t, a, i) {
      var u = t.interleaved;
      u === null ? (a.next = a, g_(t)) : (a.next = u.next, u.next = a), t.interleaved = a;
    }
    function vD(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, g_(t)) : (a.next = u.next, u.next = a), t.interleaved = a, Ay(e, i);
    }
    function ei(e, t) {
      return Ay(e, t);
    }
    var mD = Ay;
    function Ay(e, t) {
      e.lanes = _t(e.lanes, t);
      var a = e.alternate;
      a !== null && (a.lanes = _t(a.lanes, t)), a === null && (e.flags & (Sn | oa)) !== Ze && hT(e);
      for (var i = e, u = e.return; u !== null; )
        u.childLanes = _t(u.childLanes, t), a = u.alternate, a !== null ? a.childLanes = _t(a.childLanes, t) : (u.flags & (Sn | oa)) !== Ze && hT(e), i = u, u = u.return;
      if (i.tag === O) {
        var d = i.stateNode;
        return d;
      } else
        return null;
    }
    var _1 = 0, S1 = 1, zy = 2, __ = 3, Uy = !1, S_, Fy;
    S_ = !1, Fy = null;
    function E_(e) {
      var t = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: ve
        },
        effects: null
      };
      e.updateQueue = t;
    }
    function E1(e, t) {
      var a = t.updateQueue, i = e.updateQueue;
      if (a === i) {
        var u = {
          baseState: i.baseState,
          firstBaseUpdate: i.firstBaseUpdate,
          lastBaseUpdate: i.lastBaseUpdate,
          shared: i.shared,
          effects: i.effects
        };
        t.updateQueue = u;
      }
    }
    function wu(e, t) {
      var a = {
        eventTime: e,
        lane: t,
        tag: _1,
        payload: null,
        callback: null,
        next: null
      };
      return a;
    }
    function Ss(e, t, a) {
      var i = e.updateQueue;
      if (i === null)
        return null;
      var u = i.shared;
      if (Fy === u && !S_ && (h("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), S_ = !0), hM()) {
        var d = u.pending;
        return d === null ? t.next = t : (t.next = d.next, d.next = t), u.pending = t, mD(e, a);
      } else
        return vD(e, u, t, a);
    }
    function Py(e, t, a) {
      var i = t.updateQueue;
      if (i !== null) {
        var u = i.shared;
        if (eh(a)) {
          var d = u.lanes;
          d = nh(d, e.pendingLanes);
          var m = _t(d, a);
          u.lanes = m, cd(e, m);
        }
      }
    }
    function C_(e, t) {
      var a = e.updateQueue, i = e.alternate;
      if (i !== null) {
        var u = i.updateQueue;
        if (a === u) {
          var d = null, m = null, S = a.firstBaseUpdate;
          if (S !== null) {
            var C = S;
            do {
              var k = {
                eventTime: C.eventTime,
                lane: C.lane,
                tag: C.tag,
                payload: C.payload,
                callback: C.callback,
                next: null
              };
              m === null ? d = m = k : (m.next = k, m = k), C = C.next;
            } while (C !== null);
            m === null ? d = m = t : (m.next = t, m = t);
          } else
            d = m = t;
          a = {
            baseState: u.baseState,
            firstBaseUpdate: d,
            lastBaseUpdate: m,
            shared: u.shared,
            effects: u.effects
          }, e.updateQueue = a;
          return;
        }
      }
      var D = a.lastBaseUpdate;
      D === null ? a.firstBaseUpdate = t : D.next = t, a.lastBaseUpdate = t;
    }
    function yD(e, t, a, i, u, d) {
      switch (a.tag) {
        case S1: {
          var m = a.payload;
          if (typeof m == "function") {
            v1();
            var S = m.call(d, i, u);
            {
              if (e.mode & en) {
                En(!0);
                try {
                  m.call(d, i, u);
                } finally {
                  En(!1);
                }
              }
              m1();
            }
            return S;
          }
          return m;
        }
        case __:
          e.flags = e.flags & ~or | Je;
        case _1: {
          var C = a.payload, k;
          if (typeof C == "function") {
            v1(), k = C.call(d, i, u);
            {
              if (e.mode & en) {
                En(!0);
                try {
                  C.call(d, i, u);
                } finally {
                  En(!1);
                }
              }
              m1();
            }
          } else
            k = C;
          return k == null ? i : St({}, i, k);
        }
        case zy:
          return Uy = !0, i;
      }
      return i;
    }
    function jy(e, t, a, i) {
      var u = e.updateQueue;
      Uy = !1, Fy = u.shared;
      var d = u.firstBaseUpdate, m = u.lastBaseUpdate, S = u.shared.pending;
      if (S !== null) {
        u.shared.pending = null;
        var C = S, k = C.next;
        C.next = null, m === null ? d = k : m.next = k, m = C;
        var D = e.alternate;
        if (D !== null) {
          var B = D.updateQueue, j = B.lastBaseUpdate;
          j !== m && (j === null ? B.firstBaseUpdate = k : j.next = k, B.lastBaseUpdate = C);
        }
      }
      if (d !== null) {
        var X = u.baseState, Z = ve, oe = null, Le = null, nt = null, Xe = d;
        do {
          var Nt = Xe.lane, kt = Xe.eventTime;
          if (fu(i, Nt)) {
            if (nt !== null) {
              var ue = {
                eventTime: kt,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Ut,
                tag: Xe.tag,
                payload: Xe.payload,
                callback: Xe.callback,
                next: null
              };
              nt = nt.next = ue;
            }
            X = yD(e, u, Xe, X, t, a);
            var G = Xe.callback;
            if (G !== null && // If the update was already committed, we should not queue its
            // callback again.
            Xe.lane !== Ut) {
              e.flags |= sn;
              var Ce = u.effects;
              Ce === null ? u.effects = [Xe] : Ce.push(Xe);
            }
          } else {
            var $ = {
              eventTime: kt,
              lane: Nt,
              tag: Xe.tag,
              payload: Xe.payload,
              callback: Xe.callback,
              next: null
            };
            nt === null ? (Le = nt = $, oe = X) : nt = nt.next = $, Z = _t(Z, Nt);
          }
          if (Xe = Xe.next, Xe === null) {
            if (S = u.shared.pending, S === null)
              break;
            var Ue = S, Ne = Ue.next;
            Ue.next = null, Xe = Ne, u.lastBaseUpdate = Ue, u.shared.pending = null;
          }
        } while (!0);
        nt === null && (oe = X), u.baseState = oe, u.firstBaseUpdate = Le, u.lastBaseUpdate = nt;
        var ft = u.shared.interleaved;
        if (ft !== null) {
          var mt = ft;
          do
            Z = _t(Z, mt.lane), mt = mt.next;
          while (mt !== ft);
        } else d === null && (u.shared.lanes = ve);
        hv(Z), e.lanes = Z, e.memoizedState = X;
      }
      Fy = null;
    }
    function gD(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function C1() {
      Uy = !1;
    }
    function Hy() {
      return Uy;
    }
    function w1(e, t, a) {
      var i = t.effects;
      if (t.effects = null, i !== null)
        for (var u = 0; u < i.length; u++) {
          var d = i[u], m = d.callback;
          m !== null && (d.callback = null, gD(m, a));
        }
    }
    var Vh = {}, Es = ms(Vh), Ih = ms(Vh), By = ms(Vh);
    function Vy(e) {
      if (e === Vh)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function T1() {
      var e = Vy(By.current);
      return e;
    }
    function w_(e, t) {
      ya(By, t, e), ya(Ih, e, e), ya(Es, Vh, e);
      var a = zR(t);
      ma(Es, e), ya(Es, a, e);
    }
    function jd(e) {
      ma(Es, e), ma(Ih, e), ma(By, e);
    }
    function T_() {
      var e = Vy(Es.current);
      return e;
    }
    function x1(e) {
      Vy(By.current);
      var t = Vy(Es.current), a = UR(t, e.type);
      t !== a && (ya(Ih, e, e), ya(Es, a, e));
    }
    function x_(e) {
      Ih.current === e && (ma(Es, e), ma(Ih, e));
    }
    var _D = 0, b1 = 1, R1 = 1, Yh = 2, Ul = ms(_D);
    function b_(e, t) {
      return (e & t) !== 0;
    }
    function Hd(e) {
      return e & b1;
    }
    function R_(e, t) {
      return e & b1 | t;
    }
    function SD(e, t) {
      return e | t;
    }
    function Cs(e, t) {
      ya(Ul, t, e);
    }
    function Bd(e) {
      ma(Ul, e);
    }
    function ED(e, t) {
      var a = e.memoizedState;
      return a !== null ? a.dehydrated !== null : (e.memoizedProps, !0);
    }
    function Iy(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === Y) {
          var a = t.memoizedState;
          if (a !== null) {
            var i = a.dehydrated;
            if (i === null || YC(i) || W0(i))
              return t;
          }
        } else if (t.tag === Ke && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        t.memoizedProps.revealOrder !== void 0) {
          var u = (t.flags & Je) !== Ze;
          if (u)
            return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e)
          return null;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    var ti = (
      /*   */
      0
    ), Er = (
      /* */
      1
    ), To = (
      /*  */
      2
    ), Cr = (
      /*    */
      4
    ), qr = (
      /*   */
      8
    ), k_ = [];
    function D_() {
      for (var e = 0; e < k_.length; e++) {
        var t = k_[e];
        t._workInProgressVersionPrimary = null;
      }
      k_.length = 0;
    }
    function CD(e, t) {
      var a = t._getVersion, i = a(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, i] : e.mutableSourceEagerHydrationData.push(t, i);
    }
    var ze = s.ReactCurrentDispatcher, Wh = s.ReactCurrentBatchConfig, O_, Vd;
    O_ = /* @__PURE__ */ new Set();
    var qc = ve, tn = null, wr = null, Tr = null, Yy = !1, $h = !1, Gh = 0, wD = 0, TD = 25, de = null, ul = null, ws = -1, M_ = !1;
    function Gt() {
      {
        var e = de;
        ul === null ? ul = [e] : ul.push(e);
      }
    }
    function ke() {
      {
        var e = de;
        ul !== null && (ws++, ul[ws] !== e && xD(e));
      }
    }
    function Id(e) {
      e != null && !Ct(e) && h("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", de, typeof e);
    }
    function xD(e) {
      {
        var t = pt(tn);
        if (!O_.has(t) && (O_.add(t), ul !== null)) {
          for (var a = "", i = 30, u = 0; u <= ws; u++) {
            for (var d = ul[u], m = u === ws ? e : d, S = u + 1 + ". " + d; S.length < i; )
              S += " ";
            S += m + `
`, a += S;
          }
          h(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, a);
        }
      }
    }
    function ga() {
      throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    }
    function L_(e, t) {
      if (M_)
        return !1;
      if (t === null)
        return h("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", de), !1;
      e.length !== t.length && h(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, de, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!Se(e[a], t[a]))
          return !1;
      return !0;
    }
    function Yd(e, t, a, i, u, d) {
      qc = d, tn = t, ul = e !== null ? e._debugHookTypes : null, ws = -1, M_ = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = ve, e !== null && e.memoizedState !== null ? ze.current = q1 : ul !== null ? ze.current = Q1 : ze.current = G1;
      var m = a(i, u);
      if ($h) {
        var S = 0;
        do {
          if ($h = !1, Gh = 0, S >= TD)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          S += 1, M_ = !1, wr = null, Tr = null, t.updateQueue = null, ws = -1, ze.current = X1, m = a(i, u);
        } while ($h);
      }
      ze.current = rg, t._debugHookTypes = ul;
      var C = wr !== null && wr.next !== null;
      if (qc = ve, tn = null, wr = null, Tr = null, de = null, ul = null, ws = -1, e !== null && (e.flags & Vn) !== (t.flags & Vn) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & xt) !== et && h("Internal React error: Expected static flag was missing. Please notify the React team."), Yy = !1, C)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return m;
    }
    function Wd() {
      var e = Gh !== 0;
      return Gh = 0, e;
    }
    function k1(e, t, a) {
      t.updateQueue = e.updateQueue, (t.mode & Ht) !== et ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = Ec(e.lanes, a);
    }
    function D1() {
      if (ze.current = rg, Yy) {
        for (var e = tn.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        Yy = !1;
      }
      qc = ve, tn = null, wr = null, Tr = null, ul = null, ws = -1, de = null, V1 = !1, $h = !1, Gh = 0;
    }
    function xo() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return Tr === null ? tn.memoizedState = Tr = e : Tr = Tr.next = e, Tr;
    }
    function sl() {
      var e;
      if (wr === null) {
        var t = tn.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = wr.next;
      var a;
      if (Tr === null ? a = tn.memoizedState : a = Tr.next, a !== null)
        Tr = a, a = Tr.next, wr = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        wr = e;
        var i = {
          memoizedState: wr.memoizedState,
          baseState: wr.baseState,
          baseQueue: wr.baseQueue,
          queue: wr.queue,
          next: null
        };
        Tr === null ? tn.memoizedState = Tr = i : Tr = Tr.next = i;
      }
      return Tr;
    }
    function O1() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function N_(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function A_(e, t, a) {
      var i = xo(), u;
      a !== void 0 ? u = a(t) : u = t, i.memoizedState = i.baseState = u;
      var d = {
        pending: null,
        interleaved: null,
        lanes: ve,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      };
      i.queue = d;
      var m = d.dispatch = DD.bind(null, tn, d);
      return [i.memoizedState, m];
    }
    function z_(e, t, a) {
      var i = sl(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var d = wr, m = d.baseQueue, S = u.pending;
      if (S !== null) {
        if (m !== null) {
          var C = m.next, k = S.next;
          m.next = k, S.next = C;
        }
        d.baseQueue !== m && h("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), d.baseQueue = m = S, u.pending = null;
      }
      if (m !== null) {
        var D = m.next, B = d.baseState, j = null, X = null, Z = null, oe = D;
        do {
          var Le = oe.lane;
          if (fu(qc, Le)) {
            if (Z !== null) {
              var Xe = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Ut,
                action: oe.action,
                hasEagerState: oe.hasEagerState,
                eagerState: oe.eagerState,
                next: null
              };
              Z = Z.next = Xe;
            }
            if (oe.hasEagerState)
              B = oe.eagerState;
            else {
              var Nt = oe.action;
              B = e(B, Nt);
            }
          } else {
            var nt = {
              lane: Le,
              action: oe.action,
              hasEagerState: oe.hasEagerState,
              eagerState: oe.eagerState,
              next: null
            };
            Z === null ? (X = Z = nt, j = B) : Z = Z.next = nt, tn.lanes = _t(tn.lanes, Le), hv(Le);
          }
          oe = oe.next;
        } while (oe !== null && oe !== D);
        Z === null ? j = B : Z.next = X, Se(B, i.memoizedState) || nv(), i.memoizedState = B, i.baseState = j, i.baseQueue = Z, u.lastRenderedState = B;
      }
      var kt = u.interleaved;
      if (kt !== null) {
        var $ = kt;
        do {
          var ue = $.lane;
          tn.lanes = _t(tn.lanes, ue), hv(ue), $ = $.next;
        } while ($ !== kt);
      } else m === null && (u.lanes = ve);
      var G = u.dispatch;
      return [i.memoizedState, G];
    }
    function U_(e, t, a) {
      var i = sl(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var d = u.dispatch, m = u.pending, S = i.memoizedState;
      if (m !== null) {
        u.pending = null;
        var C = m.next, k = C;
        do {
          var D = k.action;
          S = e(S, D), k = k.next;
        } while (k !== C);
        Se(S, i.memoizedState) || nv(), i.memoizedState = S, i.baseQueue === null && (i.baseState = S), u.lastRenderedState = S;
      }
      return [S, d];
    }
    function SA(e, t, a) {
    }
    function EA(e, t, a) {
    }
    function F_(e, t, a) {
      var i = tn, u = xo(), d, m = Qr();
      if (m) {
        if (a === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        d = a(), Vd || d !== a() && (h("The result of getServerSnapshot should be cached to avoid an infinite loop"), Vd = !0);
      } else {
        if (d = t(), !Vd) {
          var S = t();
          Se(d, S) || (h("The result of getSnapshot should be cached to avoid an infinite loop"), Vd = !0);
        }
        var C = Cg();
        if (C === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        ud(C, qc) || M1(i, t, d);
      }
      u.memoizedState = d;
      var k = {
        value: d,
        getSnapshot: t
      };
      return u.queue = k, qy(N1.bind(null, i, k, e), [e]), i.flags |= la, Qh(Er | qr, L1.bind(null, i, k, d, t), void 0, null), d;
    }
    function Wy(e, t, a) {
      var i = tn, u = sl(), d = t();
      if (!Vd) {
        var m = t();
        Se(d, m) || (h("The result of getSnapshot should be cached to avoid an infinite loop"), Vd = !0);
      }
      var S = u.memoizedState, C = !Se(S, d);
      C && (u.memoizedState = d, nv());
      var k = u.queue;
      if (Xh(N1.bind(null, i, k, e), [e]), k.getSnapshot !== t || C || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      Tr !== null && Tr.memoizedState.tag & Er) {
        i.flags |= la, Qh(Er | qr, L1.bind(null, i, k, d, t), void 0, null);
        var D = Cg();
        if (D === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        ud(D, qc) || M1(i, t, d);
      }
      return d;
    }
    function M1(e, t, a) {
      e.flags |= es;
      var i = {
        getSnapshot: t,
        value: a
      }, u = tn.updateQueue;
      if (u === null)
        u = O1(), tn.updateQueue = u, u.stores = [i];
      else {
        var d = u.stores;
        d === null ? u.stores = [i] : d.push(i);
      }
    }
    function L1(e, t, a, i) {
      t.value = a, t.getSnapshot = i, A1(t) && z1(e);
    }
    function N1(e, t, a) {
      var i = function() {
        A1(t) && z1(e);
      };
      return a(i);
    }
    function A1(e) {
      var t = e.getSnapshot, a = e.value;
      try {
        var i = t();
        return !Se(a, i);
      } catch {
        return !0;
      }
    }
    function z1(e) {
      var t = ei(e, st);
      t !== null && kr(t, e, st, rn);
    }
    function $y(e) {
      var t = xo();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        interleaved: null,
        lanes: ve,
        dispatch: null,
        lastRenderedReducer: N_,
        lastRenderedState: e
      };
      t.queue = a;
      var i = a.dispatch = OD.bind(null, tn, a);
      return [t.memoizedState, i];
    }
    function P_(e) {
      return z_(N_);
    }
    function j_(e) {
      return U_(N_);
    }
    function Qh(e, t, a, i) {
      var u = {
        tag: e,
        create: t,
        destroy: a,
        deps: i,
        // Circular
        next: null
      }, d = tn.updateQueue;
      if (d === null)
        d = O1(), tn.updateQueue = d, d.lastEffect = u.next = u;
      else {
        var m = d.lastEffect;
        if (m === null)
          d.lastEffect = u.next = u;
        else {
          var S = m.next;
          m.next = u, u.next = S, d.lastEffect = u;
        }
      }
      return u;
    }
    function H_(e) {
      var t = xo();
      {
        var a = {
          current: e
        };
        return t.memoizedState = a, a;
      }
    }
    function Gy(e) {
      var t = sl();
      return t.memoizedState;
    }
    function qh(e, t, a, i) {
      var u = xo(), d = i === void 0 ? null : i;
      tn.flags |= e, u.memoizedState = Qh(Er | t, a, void 0, d);
    }
    function Qy(e, t, a, i) {
      var u = sl(), d = i === void 0 ? null : i, m = void 0;
      if (wr !== null) {
        var S = wr.memoizedState;
        if (m = S.destroy, d !== null) {
          var C = S.deps;
          if (L_(d, C)) {
            u.memoizedState = Qh(t, a, m, d);
            return;
          }
        }
      }
      tn.flags |= e, u.memoizedState = Qh(Er | t, a, m, d);
    }
    function qy(e, t) {
      return (tn.mode & Ht) !== et ? qh(Xi | la | zf, qr, e, t) : qh(la | zf, qr, e, t);
    }
    function Xh(e, t) {
      return Qy(la, qr, e, t);
    }
    function B_(e, t) {
      return qh(Ot, To, e, t);
    }
    function Xy(e, t) {
      return Qy(Ot, To, e, t);
    }
    function V_(e, t) {
      var a = Ot;
      return a |= Tl, (tn.mode & Ht) !== et && (a |= io), qh(a, Cr, e, t);
    }
    function Ky(e, t) {
      return Qy(Ot, Cr, e, t);
    }
    function U1(e, t) {
      if (typeof t == "function") {
        var a = t, i = e();
        return a(i), function() {
          a(null);
        };
      } else if (t != null) {
        var u = t;
        u.hasOwnProperty("current") || h("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(u).join(", ") + "}");
        var d = e();
        return u.current = d, function() {
          u.current = null;
        };
      }
    }
    function I_(e, t, a) {
      typeof t != "function" && h("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null, u = Ot;
      return u |= Tl, (tn.mode & Ht) !== et && (u |= io), qh(u, Cr, U1.bind(null, t, e), i);
    }
    function Jy(e, t, a) {
      typeof t != "function" && h("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null;
      return Qy(Ot, Cr, U1.bind(null, t, e), i);
    }
    function bD(e, t) {
    }
    var Zy = bD;
    function Y_(e, t) {
      var a = xo(), i = t === void 0 ? null : t;
      return a.memoizedState = [e, i], e;
    }
    function eg(e, t) {
      var a = sl(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var d = u[1];
        if (L_(i, d))
          return u[0];
      }
      return a.memoizedState = [e, i], e;
    }
    function W_(e, t) {
      var a = xo(), i = t === void 0 ? null : t, u = e();
      return a.memoizedState = [u, i], u;
    }
    function tg(e, t) {
      var a = sl(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var d = u[1];
        if (L_(i, d))
          return u[0];
      }
      var m = e();
      return a.memoizedState = [m, i], m;
    }
    function $_(e) {
      var t = xo();
      return t.memoizedState = e, e;
    }
    function F1(e) {
      var t = sl(), a = wr, i = a.memoizedState;
      return j1(t, i, e);
    }
    function P1(e) {
      var t = sl();
      if (wr === null)
        return t.memoizedState = e, e;
      var a = wr.memoizedState;
      return j1(t, a, e);
    }
    function j1(e, t, a) {
      var i = !Jp(qc);
      if (i) {
        if (!Se(a, t)) {
          var u = th();
          tn.lanes = _t(tn.lanes, u), hv(u), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, nv()), e.memoizedState = a, a;
    }
    function RD(e, t, a) {
      var i = Ka();
      Wn(Lm(i, el)), e(!0);
      var u = Wh.transition;
      Wh.transition = {};
      var d = Wh.transition;
      Wh.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if (Wn(i), Wh.transition = u, u === null && d._updatedFibers) {
          var m = d._updatedFibers.size;
          m > 10 && y("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), d._updatedFibers.clear();
        }
      }
    }
    function G_() {
      var e = $y(!1), t = e[0], a = e[1], i = RD.bind(null, a), u = xo();
      return u.memoizedState = i, [t, i];
    }
    function H1() {
      var e = P_(), t = e[0], a = sl(), i = a.memoizedState;
      return [t, i];
    }
    function B1() {
      var e = j_(), t = e[0], a = sl(), i = a.memoizedState;
      return [t, i];
    }
    var V1 = !1;
    function kD() {
      return V1;
    }
    function Q_() {
      var e = xo(), t = Cg(), a = t.identifierPrefix, i;
      if (Qr()) {
        var u = Wk();
        i = ":" + a + "R" + u;
        var d = Gh++;
        d > 0 && (i += "H" + d.toString(32)), i += ":";
      } else {
        var m = wD++;
        i = ":" + a + "r" + m.toString(32) + ":";
      }
      return e.memoizedState = i, i;
    }
    function ng() {
      var e = sl(), t = e.memoizedState;
      return t;
    }
    function DD(e, t, a) {
      typeof arguments[3] == "function" && h("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = ks(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (I1(e))
        Y1(t, u);
      else {
        var d = g1(e, t, u, i);
        if (d !== null) {
          var m = za();
          kr(d, e, i, m), W1(d, t, i);
        }
      }
      $1(e, i);
    }
    function OD(e, t, a) {
      typeof arguments[3] == "function" && h("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = ks(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (I1(e))
        Y1(t, u);
      else {
        var d = e.alternate;
        if (e.lanes === ve && (d === null || d.lanes === ve)) {
          var m = t.lastRenderedReducer;
          if (m !== null) {
            var S;
            S = ze.current, ze.current = Fl;
            try {
              var C = t.lastRenderedState, k = m(C, a);
              if (u.hasEagerState = !0, u.eagerState = k, Se(k, C)) {
                hD(e, t, u, i);
                return;
              }
            } catch {
            } finally {
              ze.current = S;
            }
          }
        }
        var D = g1(e, t, u, i);
        if (D !== null) {
          var B = za();
          kr(D, e, i, B), W1(D, t, i);
        }
      }
      $1(e, i);
    }
    function I1(e) {
      var t = e.alternate;
      return e === tn || t !== null && t === tn;
    }
    function Y1(e, t) {
      $h = Yy = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function W1(e, t, a) {
      if (eh(a)) {
        var i = t.lanes;
        i = nh(i, e.pendingLanes);
        var u = _t(i, a);
        t.lanes = u, cd(e, u);
      }
    }
    function $1(e, t, a) {
      fc(e, t);
    }
    var rg = {
      readContext: fr,
      useCallback: ga,
      useContext: ga,
      useEffect: ga,
      useImperativeHandle: ga,
      useInsertionEffect: ga,
      useLayoutEffect: ga,
      useMemo: ga,
      useReducer: ga,
      useRef: ga,
      useState: ga,
      useDebugValue: ga,
      useDeferredValue: ga,
      useTransition: ga,
      useMutableSource: ga,
      useSyncExternalStore: ga,
      useId: ga,
      unstable_isNewReconciler: le
    }, G1 = null, Q1 = null, q1 = null, X1 = null, bo = null, Fl = null, ag = null;
    {
      var q_ = function() {
        h("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, vt = function() {
        h("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      G1 = {
        readContext: function(e) {
          return fr(e);
        },
        useCallback: function(e, t) {
          return de = "useCallback", Gt(), Id(t), Y_(e, t);
        },
        useContext: function(e) {
          return de = "useContext", Gt(), fr(e);
        },
        useEffect: function(e, t) {
          return de = "useEffect", Gt(), Id(t), qy(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return de = "useImperativeHandle", Gt(), Id(a), I_(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return de = "useInsertionEffect", Gt(), Id(t), B_(e, t);
        },
        useLayoutEffect: function(e, t) {
          return de = "useLayoutEffect", Gt(), Id(t), V_(e, t);
        },
        useMemo: function(e, t) {
          de = "useMemo", Gt(), Id(t);
          var a = ze.current;
          ze.current = bo;
          try {
            return W_(e, t);
          } finally {
            ze.current = a;
          }
        },
        useReducer: function(e, t, a) {
          de = "useReducer", Gt();
          var i = ze.current;
          ze.current = bo;
          try {
            return A_(e, t, a);
          } finally {
            ze.current = i;
          }
        },
        useRef: function(e) {
          return de = "useRef", Gt(), H_(e);
        },
        useState: function(e) {
          de = "useState", Gt();
          var t = ze.current;
          ze.current = bo;
          try {
            return $y(e);
          } finally {
            ze.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return de = "useDebugValue", Gt(), void 0;
        },
        useDeferredValue: function(e) {
          return de = "useDeferredValue", Gt(), $_(e);
        },
        useTransition: function() {
          return de = "useTransition", Gt(), G_();
        },
        useMutableSource: function(e, t, a) {
          return de = "useMutableSource", Gt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return de = "useSyncExternalStore", Gt(), F_(e, t, a);
        },
        useId: function() {
          return de = "useId", Gt(), Q_();
        },
        unstable_isNewReconciler: le
      }, Q1 = {
        readContext: function(e) {
          return fr(e);
        },
        useCallback: function(e, t) {
          return de = "useCallback", ke(), Y_(e, t);
        },
        useContext: function(e) {
          return de = "useContext", ke(), fr(e);
        },
        useEffect: function(e, t) {
          return de = "useEffect", ke(), qy(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return de = "useImperativeHandle", ke(), I_(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return de = "useInsertionEffect", ke(), B_(e, t);
        },
        useLayoutEffect: function(e, t) {
          return de = "useLayoutEffect", ke(), V_(e, t);
        },
        useMemo: function(e, t) {
          de = "useMemo", ke();
          var a = ze.current;
          ze.current = bo;
          try {
            return W_(e, t);
          } finally {
            ze.current = a;
          }
        },
        useReducer: function(e, t, a) {
          de = "useReducer", ke();
          var i = ze.current;
          ze.current = bo;
          try {
            return A_(e, t, a);
          } finally {
            ze.current = i;
          }
        },
        useRef: function(e) {
          return de = "useRef", ke(), H_(e);
        },
        useState: function(e) {
          de = "useState", ke();
          var t = ze.current;
          ze.current = bo;
          try {
            return $y(e);
          } finally {
            ze.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return de = "useDebugValue", ke(), void 0;
        },
        useDeferredValue: function(e) {
          return de = "useDeferredValue", ke(), $_(e);
        },
        useTransition: function() {
          return de = "useTransition", ke(), G_();
        },
        useMutableSource: function(e, t, a) {
          return de = "useMutableSource", ke(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return de = "useSyncExternalStore", ke(), F_(e, t, a);
        },
        useId: function() {
          return de = "useId", ke(), Q_();
        },
        unstable_isNewReconciler: le
      }, q1 = {
        readContext: function(e) {
          return fr(e);
        },
        useCallback: function(e, t) {
          return de = "useCallback", ke(), eg(e, t);
        },
        useContext: function(e) {
          return de = "useContext", ke(), fr(e);
        },
        useEffect: function(e, t) {
          return de = "useEffect", ke(), Xh(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return de = "useImperativeHandle", ke(), Jy(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return de = "useInsertionEffect", ke(), Xy(e, t);
        },
        useLayoutEffect: function(e, t) {
          return de = "useLayoutEffect", ke(), Ky(e, t);
        },
        useMemo: function(e, t) {
          de = "useMemo", ke();
          var a = ze.current;
          ze.current = Fl;
          try {
            return tg(e, t);
          } finally {
            ze.current = a;
          }
        },
        useReducer: function(e, t, a) {
          de = "useReducer", ke();
          var i = ze.current;
          ze.current = Fl;
          try {
            return z_(e, t, a);
          } finally {
            ze.current = i;
          }
        },
        useRef: function(e) {
          return de = "useRef", ke(), Gy();
        },
        useState: function(e) {
          de = "useState", ke();
          var t = ze.current;
          ze.current = Fl;
          try {
            return P_(e);
          } finally {
            ze.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return de = "useDebugValue", ke(), Zy();
        },
        useDeferredValue: function(e) {
          return de = "useDeferredValue", ke(), F1(e);
        },
        useTransition: function() {
          return de = "useTransition", ke(), H1();
        },
        useMutableSource: function(e, t, a) {
          return de = "useMutableSource", ke(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return de = "useSyncExternalStore", ke(), Wy(e, t);
        },
        useId: function() {
          return de = "useId", ke(), ng();
        },
        unstable_isNewReconciler: le
      }, X1 = {
        readContext: function(e) {
          return fr(e);
        },
        useCallback: function(e, t) {
          return de = "useCallback", ke(), eg(e, t);
        },
        useContext: function(e) {
          return de = "useContext", ke(), fr(e);
        },
        useEffect: function(e, t) {
          return de = "useEffect", ke(), Xh(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return de = "useImperativeHandle", ke(), Jy(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return de = "useInsertionEffect", ke(), Xy(e, t);
        },
        useLayoutEffect: function(e, t) {
          return de = "useLayoutEffect", ke(), Ky(e, t);
        },
        useMemo: function(e, t) {
          de = "useMemo", ke();
          var a = ze.current;
          ze.current = ag;
          try {
            return tg(e, t);
          } finally {
            ze.current = a;
          }
        },
        useReducer: function(e, t, a) {
          de = "useReducer", ke();
          var i = ze.current;
          ze.current = ag;
          try {
            return U_(e, t, a);
          } finally {
            ze.current = i;
          }
        },
        useRef: function(e) {
          return de = "useRef", ke(), Gy();
        },
        useState: function(e) {
          de = "useState", ke();
          var t = ze.current;
          ze.current = ag;
          try {
            return j_(e);
          } finally {
            ze.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return de = "useDebugValue", ke(), Zy();
        },
        useDeferredValue: function(e) {
          return de = "useDeferredValue", ke(), P1(e);
        },
        useTransition: function() {
          return de = "useTransition", ke(), B1();
        },
        useMutableSource: function(e, t, a) {
          return de = "useMutableSource", ke(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return de = "useSyncExternalStore", ke(), Wy(e, t);
        },
        useId: function() {
          return de = "useId", ke(), ng();
        },
        unstable_isNewReconciler: le
      }, bo = {
        readContext: function(e) {
          return q_(), fr(e);
        },
        useCallback: function(e, t) {
          return de = "useCallback", vt(), Gt(), Y_(e, t);
        },
        useContext: function(e) {
          return de = "useContext", vt(), Gt(), fr(e);
        },
        useEffect: function(e, t) {
          return de = "useEffect", vt(), Gt(), qy(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return de = "useImperativeHandle", vt(), Gt(), I_(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return de = "useInsertionEffect", vt(), Gt(), B_(e, t);
        },
        useLayoutEffect: function(e, t) {
          return de = "useLayoutEffect", vt(), Gt(), V_(e, t);
        },
        useMemo: function(e, t) {
          de = "useMemo", vt(), Gt();
          var a = ze.current;
          ze.current = bo;
          try {
            return W_(e, t);
          } finally {
            ze.current = a;
          }
        },
        useReducer: function(e, t, a) {
          de = "useReducer", vt(), Gt();
          var i = ze.current;
          ze.current = bo;
          try {
            return A_(e, t, a);
          } finally {
            ze.current = i;
          }
        },
        useRef: function(e) {
          return de = "useRef", vt(), Gt(), H_(e);
        },
        useState: function(e) {
          de = "useState", vt(), Gt();
          var t = ze.current;
          ze.current = bo;
          try {
            return $y(e);
          } finally {
            ze.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return de = "useDebugValue", vt(), Gt(), void 0;
        },
        useDeferredValue: function(e) {
          return de = "useDeferredValue", vt(), Gt(), $_(e);
        },
        useTransition: function() {
          return de = "useTransition", vt(), Gt(), G_();
        },
        useMutableSource: function(e, t, a) {
          return de = "useMutableSource", vt(), Gt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return de = "useSyncExternalStore", vt(), Gt(), F_(e, t, a);
        },
        useId: function() {
          return de = "useId", vt(), Gt(), Q_();
        },
        unstable_isNewReconciler: le
      }, Fl = {
        readContext: function(e) {
          return q_(), fr(e);
        },
        useCallback: function(e, t) {
          return de = "useCallback", vt(), ke(), eg(e, t);
        },
        useContext: function(e) {
          return de = "useContext", vt(), ke(), fr(e);
        },
        useEffect: function(e, t) {
          return de = "useEffect", vt(), ke(), Xh(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return de = "useImperativeHandle", vt(), ke(), Jy(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return de = "useInsertionEffect", vt(), ke(), Xy(e, t);
        },
        useLayoutEffect: function(e, t) {
          return de = "useLayoutEffect", vt(), ke(), Ky(e, t);
        },
        useMemo: function(e, t) {
          de = "useMemo", vt(), ke();
          var a = ze.current;
          ze.current = Fl;
          try {
            return tg(e, t);
          } finally {
            ze.current = a;
          }
        },
        useReducer: function(e, t, a) {
          de = "useReducer", vt(), ke();
          var i = ze.current;
          ze.current = Fl;
          try {
            return z_(e, t, a);
          } finally {
            ze.current = i;
          }
        },
        useRef: function(e) {
          return de = "useRef", vt(), ke(), Gy();
        },
        useState: function(e) {
          de = "useState", vt(), ke();
          var t = ze.current;
          ze.current = Fl;
          try {
            return P_(e);
          } finally {
            ze.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return de = "useDebugValue", vt(), ke(), Zy();
        },
        useDeferredValue: function(e) {
          return de = "useDeferredValue", vt(), ke(), F1(e);
        },
        useTransition: function() {
          return de = "useTransition", vt(), ke(), H1();
        },
        useMutableSource: function(e, t, a) {
          return de = "useMutableSource", vt(), ke(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return de = "useSyncExternalStore", vt(), ke(), Wy(e, t);
        },
        useId: function() {
          return de = "useId", vt(), ke(), ng();
        },
        unstable_isNewReconciler: le
      }, ag = {
        readContext: function(e) {
          return q_(), fr(e);
        },
        useCallback: function(e, t) {
          return de = "useCallback", vt(), ke(), eg(e, t);
        },
        useContext: function(e) {
          return de = "useContext", vt(), ke(), fr(e);
        },
        useEffect: function(e, t) {
          return de = "useEffect", vt(), ke(), Xh(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return de = "useImperativeHandle", vt(), ke(), Jy(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return de = "useInsertionEffect", vt(), ke(), Xy(e, t);
        },
        useLayoutEffect: function(e, t) {
          return de = "useLayoutEffect", vt(), ke(), Ky(e, t);
        },
        useMemo: function(e, t) {
          de = "useMemo", vt(), ke();
          var a = ze.current;
          ze.current = Fl;
          try {
            return tg(e, t);
          } finally {
            ze.current = a;
          }
        },
        useReducer: function(e, t, a) {
          de = "useReducer", vt(), ke();
          var i = ze.current;
          ze.current = Fl;
          try {
            return U_(e, t, a);
          } finally {
            ze.current = i;
          }
        },
        useRef: function(e) {
          return de = "useRef", vt(), ke(), Gy();
        },
        useState: function(e) {
          de = "useState", vt(), ke();
          var t = ze.current;
          ze.current = Fl;
          try {
            return j_(e);
          } finally {
            ze.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return de = "useDebugValue", vt(), ke(), Zy();
        },
        useDeferredValue: function(e) {
          return de = "useDeferredValue", vt(), ke(), P1(e);
        },
        useTransition: function() {
          return de = "useTransition", vt(), ke(), B1();
        },
        useMutableSource: function(e, t, a) {
          return de = "useMutableSource", vt(), ke(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return de = "useSyncExternalStore", vt(), ke(), Wy(e, t);
        },
        useId: function() {
          return de = "useId", vt(), ke(), ng();
        },
        unstable_isNewReconciler: le
      };
    }
    var Ts = l.unstable_now, K1 = 0, ig = -1, Kh = -1, lg = -1, X_ = !1, og = !1;
    function J1() {
      return X_;
    }
    function MD() {
      og = !0;
    }
    function LD() {
      X_ = !1, og = !1;
    }
    function ND() {
      X_ = og, og = !1;
    }
    function Z1() {
      return K1;
    }
    function ew() {
      K1 = Ts();
    }
    function K_(e) {
      Kh = Ts(), e.actualStartTime < 0 && (e.actualStartTime = Ts());
    }
    function tw(e) {
      Kh = -1;
    }
    function ug(e, t) {
      if (Kh >= 0) {
        var a = Ts() - Kh;
        e.actualDuration += a, t && (e.selfBaseDuration = a), Kh = -1;
      }
    }
    function Ro(e) {
      if (ig >= 0) {
        var t = Ts() - ig;
        ig = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case O:
              var i = a.stateNode;
              i.effectDuration += t;
              return;
            case ie:
              var u = a.stateNode;
              u.effectDuration += t;
              return;
          }
          a = a.return;
        }
      }
    }
    function J_(e) {
      if (lg >= 0) {
        var t = Ts() - lg;
        lg = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case O:
              var i = a.stateNode;
              i !== null && (i.passiveEffectDuration += t);
              return;
            case ie:
              var u = a.stateNode;
              u !== null && (u.passiveEffectDuration += t);
              return;
          }
          a = a.return;
        }
      }
    }
    function ko() {
      ig = Ts();
    }
    function Z_() {
      lg = Ts();
    }
    function eS(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function Pl(e, t) {
      if (e && e.defaultProps) {
        var a = St({}, t), i = e.defaultProps;
        for (var u in i)
          a[u] === void 0 && (a[u] = i[u]);
        return a;
      }
      return t;
    }
    var tS = {}, nS, rS, aS, iS, lS, nw, sg, oS, uS, sS, Jh;
    {
      nS = /* @__PURE__ */ new Set(), rS = /* @__PURE__ */ new Set(), aS = /* @__PURE__ */ new Set(), iS = /* @__PURE__ */ new Set(), oS = /* @__PURE__ */ new Set(), lS = /* @__PURE__ */ new Set(), uS = /* @__PURE__ */ new Set(), sS = /* @__PURE__ */ new Set(), Jh = /* @__PURE__ */ new Set();
      var rw = /* @__PURE__ */ new Set();
      sg = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var a = t + "_" + e;
          rw.has(a) || (rw.add(a), h("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, nw = function(e, t) {
        if (t === void 0) {
          var a = At(e) || "Component";
          lS.has(a) || (lS.add(a), h("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", a));
        }
      }, Object.defineProperty(tS, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(tS);
    }
    function cS(e, t, a, i) {
      var u = e.memoizedState, d = a(i, u);
      {
        if (e.mode & en) {
          En(!0);
          try {
            d = a(i, u);
          } finally {
            En(!1);
          }
        }
        nw(t, d);
      }
      var m = d == null ? u : St({}, u, d);
      if (e.memoizedState = m, e.lanes === ve) {
        var S = e.updateQueue;
        S.baseState = m;
      }
    }
    var fS = {
      isMounted: mm,
      enqueueSetState: function(e, t, a) {
        var i = Zu(e), u = za(), d = ks(i), m = wu(u, d);
        m.payload = t, a != null && (sg(a, "setState"), m.callback = a);
        var S = Ss(i, m, d);
        S !== null && (kr(S, i, d, u), Py(S, i, d)), fc(i, d);
      },
      enqueueReplaceState: function(e, t, a) {
        var i = Zu(e), u = za(), d = ks(i), m = wu(u, d);
        m.tag = S1, m.payload = t, a != null && (sg(a, "replaceState"), m.callback = a);
        var S = Ss(i, m, d);
        S !== null && (kr(S, i, d, u), Py(S, i, d)), fc(i, d);
      },
      enqueueForceUpdate: function(e, t) {
        var a = Zu(e), i = za(), u = ks(a), d = wu(i, u);
        d.tag = zy, t != null && (sg(t, "forceUpdate"), d.callback = t);
        var m = Ss(a, d, u);
        m !== null && (kr(m, a, u, i), Py(m, a, u)), Vf(a, u);
      }
    };
    function aw(e, t, a, i, u, d, m) {
      var S = e.stateNode;
      if (typeof S.shouldComponentUpdate == "function") {
        var C = S.shouldComponentUpdate(i, d, m);
        {
          if (e.mode & en) {
            En(!0);
            try {
              C = S.shouldComponentUpdate(i, d, m);
            } finally {
              En(!1);
            }
          }
          C === void 0 && h("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", At(t) || "Component");
        }
        return C;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !Be(a, i) || !Be(u, d) : !0;
    }
    function AD(e, t, a) {
      var i = e.stateNode;
      {
        var u = At(t) || "Component", d = i.render;
        d || (t.prototype && typeof t.prototype.render == "function" ? h("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", u) : h("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", u)), i.getInitialState && !i.getInitialState.isReactClassApproved && !i.state && h("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", u), i.getDefaultProps && !i.getDefaultProps.isReactClassApproved && h("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", u), i.propTypes && h("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", u), i.contextType && h("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", u), t.childContextTypes && !Jh.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & en) === et && (Jh.add(t), h(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), t.contextTypes && !Jh.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & en) === et && (Jh.add(t), h(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), i.contextTypes && h("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", u), t.contextType && t.contextTypes && !uS.has(t) && (uS.add(t), h("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", u)), typeof i.componentShouldUpdate == "function" && h("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", u), t.prototype && t.prototype.isPureReactComponent && typeof i.shouldComponentUpdate < "u" && h("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", At(t) || "A pure component"), typeof i.componentDidUnmount == "function" && h("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", u), typeof i.componentDidReceiveProps == "function" && h("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", u), typeof i.componentWillRecieveProps == "function" && h("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", u), typeof i.UNSAFE_componentWillRecieveProps == "function" && h("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", u);
        var m = i.props !== a;
        i.props !== void 0 && m && h("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", u, u), i.defaultProps && h("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", u, u), typeof i.getSnapshotBeforeUpdate == "function" && typeof i.componentDidUpdate != "function" && !aS.has(t) && (aS.add(t), h("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", At(t))), typeof i.getDerivedStateFromProps == "function" && h("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof i.getDerivedStateFromError == "function" && h("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof t.getSnapshotBeforeUpdate == "function" && h("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", u);
        var S = i.state;
        S && (typeof S != "object" || Ct(S)) && h("%s.state: must be set to an object or null", u), typeof i.getChildContext == "function" && typeof t.childContextTypes != "object" && h("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", u);
      }
    }
    function iw(e, t) {
      t.updater = fS, e.stateNode = t, Ko(t, e), t._reactInternalInstance = tS;
    }
    function lw(e, t, a) {
      var i = !1, u = Ri, d = Ri, m = t.contextType;
      if ("contextType" in t) {
        var S = (
          // Allow null for conditional declaration
          m === null || m !== void 0 && m.$$typeof === U && m._context === void 0
        );
        if (!S && !sS.has(t)) {
          sS.add(t);
          var C = "";
          m === void 0 ? C = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof m != "object" ? C = " However, it is set to a " + typeof m + "." : m.$$typeof === Bi ? C = " Did you accidentally pass the Context.Provider instead?" : m._context !== void 0 ? C = " Did you accidentally pass the Context.Consumer instead?" : C = " However, it is set to an object with keys {" + Object.keys(m).join(", ") + "}.", h("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", At(t) || "Component", C);
        }
      }
      if (typeof m == "object" && m !== null)
        d = fr(m);
      else {
        u = Md(e, t, !0);
        var k = t.contextTypes;
        i = k != null, d = i ? Ld(e, u) : Ri;
      }
      var D = new t(a, d);
      if (e.mode & en) {
        En(!0);
        try {
          D = new t(a, d);
        } finally {
          En(!1);
        }
      }
      var B = e.memoizedState = D.state !== null && D.state !== void 0 ? D.state : null;
      iw(e, D);
      {
        if (typeof t.getDerivedStateFromProps == "function" && B === null) {
          var j = At(t) || "Component";
          rS.has(j) || (rS.add(j), h("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", j, D.state === null ? "null" : "undefined", j));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof D.getSnapshotBeforeUpdate == "function") {
          var X = null, Z = null, oe = null;
          if (typeof D.componentWillMount == "function" && D.componentWillMount.__suppressDeprecationWarning !== !0 ? X = "componentWillMount" : typeof D.UNSAFE_componentWillMount == "function" && (X = "UNSAFE_componentWillMount"), typeof D.componentWillReceiveProps == "function" && D.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? Z = "componentWillReceiveProps" : typeof D.UNSAFE_componentWillReceiveProps == "function" && (Z = "UNSAFE_componentWillReceiveProps"), typeof D.componentWillUpdate == "function" && D.componentWillUpdate.__suppressDeprecationWarning !== !0 ? oe = "componentWillUpdate" : typeof D.UNSAFE_componentWillUpdate == "function" && (oe = "UNSAFE_componentWillUpdate"), X !== null || Z !== null || oe !== null) {
            var Le = At(t) || "Component", nt = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            iS.has(Le) || (iS.add(Le), h(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, Le, nt, X !== null ? `
  ` + X : "", Z !== null ? `
  ` + Z : "", oe !== null ? `
  ` + oe : ""));
          }
        }
      }
      return i && qC(e, u, d), D;
    }
    function zD(e, t) {
      var a = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), a !== t.state && (h("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", pt(e) || "Component"), fS.enqueueReplaceState(t, t.state, null));
    }
    function ow(e, t, a, i) {
      var u = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== u) {
        {
          var d = pt(e) || "Component";
          nS.has(d) || (nS.add(d), h("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", d));
        }
        fS.enqueueReplaceState(t, t.state, null);
      }
    }
    function dS(e, t, a, i) {
      AD(e, t, a);
      var u = e.stateNode;
      u.props = a, u.state = e.memoizedState, u.refs = {}, E_(e);
      var d = t.contextType;
      if (typeof d == "object" && d !== null)
        u.context = fr(d);
      else {
        var m = Md(e, t, !0);
        u.context = Ld(e, m);
      }
      {
        if (u.state === a) {
          var S = At(t) || "Component";
          oS.has(S) || (oS.add(S), h("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", S));
        }
        e.mode & en && zl.recordLegacyContextWarning(e, u), zl.recordUnsafeLifecycleWarnings(e, u);
      }
      u.state = e.memoizedState;
      var C = t.getDerivedStateFromProps;
      if (typeof C == "function" && (cS(e, t, C, a), u.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof u.getSnapshotBeforeUpdate != "function" && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (zD(e, u), jy(e, a, u, i), u.state = e.memoizedState), typeof u.componentDidMount == "function") {
        var k = Ot;
        k |= Tl, (e.mode & Ht) !== et && (k |= io), e.flags |= k;
      }
    }
    function UD(e, t, a, i) {
      var u = e.stateNode, d = e.memoizedProps;
      u.props = d;
      var m = u.context, S = t.contextType, C = Ri;
      if (typeof S == "object" && S !== null)
        C = fr(S);
      else {
        var k = Md(e, t, !0);
        C = Ld(e, k);
      }
      var D = t.getDerivedStateFromProps, B = typeof D == "function" || typeof u.getSnapshotBeforeUpdate == "function";
      !B && (typeof u.UNSAFE_componentWillReceiveProps == "function" || typeof u.componentWillReceiveProps == "function") && (d !== a || m !== C) && ow(e, u, a, C), C1();
      var j = e.memoizedState, X = u.state = j;
      if (jy(e, a, u, i), X = e.memoizedState, d === a && j === X && !Sy() && !Hy()) {
        if (typeof u.componentDidMount == "function") {
          var Z = Ot;
          Z |= Tl, (e.mode & Ht) !== et && (Z |= io), e.flags |= Z;
        }
        return !1;
      }
      typeof D == "function" && (cS(e, t, D, a), X = e.memoizedState);
      var oe = Hy() || aw(e, t, d, a, j, X, C);
      if (oe) {
        if (!B && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function") {
          var Le = Ot;
          Le |= Tl, (e.mode & Ht) !== et && (Le |= io), e.flags |= Le;
        }
      } else {
        if (typeof u.componentDidMount == "function") {
          var nt = Ot;
          nt |= Tl, (e.mode & Ht) !== et && (nt |= io), e.flags |= nt;
        }
        e.memoizedProps = a, e.memoizedState = X;
      }
      return u.props = a, u.state = X, u.context = C, oe;
    }
    function FD(e, t, a, i, u) {
      var d = t.stateNode;
      E1(e, t);
      var m = t.memoizedProps, S = t.type === t.elementType ? m : Pl(t.type, m);
      d.props = S;
      var C = t.pendingProps, k = d.context, D = a.contextType, B = Ri;
      if (typeof D == "object" && D !== null)
        B = fr(D);
      else {
        var j = Md(t, a, !0);
        B = Ld(t, j);
      }
      var X = a.getDerivedStateFromProps, Z = typeof X == "function" || typeof d.getSnapshotBeforeUpdate == "function";
      !Z && (typeof d.UNSAFE_componentWillReceiveProps == "function" || typeof d.componentWillReceiveProps == "function") && (m !== C || k !== B) && ow(t, d, i, B), C1();
      var oe = t.memoizedState, Le = d.state = oe;
      if (jy(t, i, d, u), Le = t.memoizedState, m === C && oe === Le && !Sy() && !Hy() && !Te)
        return typeof d.componentDidUpdate == "function" && (m !== e.memoizedProps || oe !== e.memoizedState) && (t.flags |= Ot), typeof d.getSnapshotBeforeUpdate == "function" && (m !== e.memoizedProps || oe !== e.memoizedState) && (t.flags |= er), !1;
      typeof X == "function" && (cS(t, a, X, i), Le = t.memoizedState);
      var nt = Hy() || aw(t, a, S, i, oe, Le, B) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      Te;
      return nt ? (!Z && (typeof d.UNSAFE_componentWillUpdate == "function" || typeof d.componentWillUpdate == "function") && (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(i, Le, B), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(i, Le, B)), typeof d.componentDidUpdate == "function" && (t.flags |= Ot), typeof d.getSnapshotBeforeUpdate == "function" && (t.flags |= er)) : (typeof d.componentDidUpdate == "function" && (m !== e.memoizedProps || oe !== e.memoizedState) && (t.flags |= Ot), typeof d.getSnapshotBeforeUpdate == "function" && (m !== e.memoizedProps || oe !== e.memoizedState) && (t.flags |= er), t.memoizedProps = i, t.memoizedState = Le), d.props = i, d.state = Le, d.context = B, nt;
    }
    function Xc(e, t) {
      return {
        value: e,
        source: t,
        stack: gl(t),
        digest: null
      };
    }
    function pS(e, t, a) {
      return {
        value: e,
        source: null,
        stack: a ?? null,
        digest: t ?? null
      };
    }
    function PD(e, t) {
      return !0;
    }
    function hS(e, t) {
      try {
        var a = PD(e, t);
        if (a === !1)
          return;
        var i = t.value, u = t.source, d = t.stack, m = d !== null ? d : "";
        if (i != null && i._suppressLogging) {
          if (e.tag === x)
            return;
          console.error(i);
        }
        var S = u ? pt(u) : null, C = S ? "The above error occurred in the <" + S + "> component:" : "The above error occurred in one of your React components:", k;
        if (e.tag === O)
          k = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var D = pt(e) || "Anonymous";
          k = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + D + ".");
        }
        var B = C + `
` + m + `

` + ("" + k);
        console.error(B);
      } catch (j) {
        setTimeout(function() {
          throw j;
        });
      }
    }
    var jD = typeof WeakMap == "function" ? WeakMap : Map;
    function uw(e, t, a) {
      var i = wu(rn, a);
      i.tag = __, i.payload = {
        element: null
      };
      var u = t.value;
      return i.callback = function() {
        MM(u), hS(e, t);
      }, i;
    }
    function vS(e, t, a) {
      var i = wu(rn, a);
      i.tag = __;
      var u = e.type.getDerivedStateFromError;
      if (typeof u == "function") {
        var d = t.value;
        i.payload = function() {
          return u(d);
        }, i.callback = function() {
          _T(e), hS(e, t);
        };
      }
      var m = e.stateNode;
      return m !== null && typeof m.componentDidCatch == "function" && (i.callback = function() {
        _T(e), hS(e, t), typeof u != "function" && DM(this);
        var C = t.value, k = t.stack;
        this.componentDidCatch(C, {
          componentStack: k !== null ? k : ""
        }), typeof u != "function" && (da(e.lanes, st) || h("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", pt(e) || "Unknown"));
      }), i;
    }
    function sw(e, t, a) {
      var i = e.pingCache, u;
      if (i === null ? (i = e.pingCache = new jD(), u = /* @__PURE__ */ new Set(), i.set(t, u)) : (u = i.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), i.set(t, u))), !u.has(a)) {
        u.add(a);
        var d = LM.bind(null, e, t, a);
        ca && vv(e, a), t.then(d, d);
      }
    }
    function HD(e, t, a, i) {
      var u = e.updateQueue;
      if (u === null) {
        var d = /* @__PURE__ */ new Set();
        d.add(a), e.updateQueue = d;
      } else
        u.add(a);
    }
    function BD(e, t) {
      var a = e.tag;
      if ((e.mode & xt) === et && (a === T || a === Q || a === ae)) {
        var i = e.alternate;
        i ? (e.updateQueue = i.updateQueue, e.memoizedState = i.memoizedState, e.lanes = i.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function cw(e) {
      var t = e;
      do {
        if (t.tag === Y && ED(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function fw(e, t, a, i, u) {
      if ((e.mode & xt) === et) {
        if (e === t)
          e.flags |= or;
        else {
          if (e.flags |= Je, a.flags |= Af, a.flags &= -52805, a.tag === x) {
            var d = a.alternate;
            if (d === null)
              a.tag = se;
            else {
              var m = wu(rn, st);
              m.tag = zy, Ss(a, m, st);
            }
          }
          a.lanes = _t(a.lanes, st);
        }
        return e;
      }
      return e.flags |= or, e.lanes = u, e;
    }
    function VD(e, t, a, i, u) {
      if (a.flags |= ic, ca && vv(e, u), i !== null && typeof i == "object" && typeof i.then == "function") {
        var d = i;
        BD(a), Qr() && a.mode & xt && n1();
        var m = cw(t);
        if (m !== null) {
          m.flags &= ~Lr, fw(m, t, a, e, u), m.mode & xt && sw(e, d, u), HD(m, e, d);
          return;
        } else {
          if (!Tm(u)) {
            sw(e, d, u), QS();
            return;
          }
          var S = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          i = S;
        }
      } else if (Qr() && a.mode & xt) {
        n1();
        var C = cw(t);
        if (C !== null) {
          (C.flags & or) === Ze && (C.flags |= Lr), fw(C, t, a, e, u), o_(Xc(i, a));
          return;
        }
      }
      i = Xc(i, a), EM(i);
      var k = t;
      do {
        switch (k.tag) {
          case O: {
            var D = i;
            k.flags |= or;
            var B = Sc(u);
            k.lanes = _t(k.lanes, B);
            var j = uw(k, D, B);
            C_(k, j);
            return;
          }
          case x:
            var X = i, Z = k.type, oe = k.stateNode;
            if ((k.flags & Je) === Ze && (typeof Z.getDerivedStateFromError == "function" || oe !== null && typeof oe.componentDidCatch == "function" && !cT(oe))) {
              k.flags |= or;
              var Le = Sc(u);
              k.lanes = _t(k.lanes, Le);
              var nt = vS(k, X, Le);
              C_(k, nt);
              return;
            }
            break;
        }
        k = k.return;
      } while (k !== null);
    }
    function ID() {
      return null;
    }
    var Zh = s.ReactCurrentOwner, jl = !1, mS, ev, yS, gS, _S, Kc, SS, cg, tv;
    mS = {}, ev = {}, yS = {}, gS = {}, _S = {}, Kc = !1, SS = {}, cg = {}, tv = {};
    function Na(e, t, a, i) {
      e === null ? t.child = h1(t, null, a, i) : t.child = Ud(t, e.child, a, i);
    }
    function YD(e, t, a, i) {
      t.child = Ud(t, e.child, null, i), t.child = Ud(t, null, a, i);
    }
    function dw(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var d = a.propTypes;
        d && Nl(
          d,
          i,
          // Resolved props
          "prop",
          At(a)
        );
      }
      var m = a.render, S = t.ref, C, k;
      Pd(t, u), Da(t);
      {
        if (Zh.current = t, Zn(!0), C = Yd(e, t, m, i, S, u), k = Wd(), t.mode & en) {
          En(!0);
          try {
            C = Yd(e, t, m, i, S, u), k = Wd();
          } finally {
            En(!1);
          }
        }
        Zn(!1);
      }
      return Oa(), e !== null && !jl ? (k1(e, t, u), Tu(e, t, u)) : (Qr() && k && t_(t), t.flags |= Ci, Na(e, t, C, u), t.child);
    }
    function pw(e, t, a, i, u) {
      if (e === null) {
        var d = a.type;
        if (qM(d) && a.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        a.defaultProps === void 0) {
          var m = d;
          return m = Zd(d), t.tag = ae, t.type = m, wS(t, d), hw(e, t, m, i, u);
        }
        {
          var S = d.propTypes;
          if (S && Nl(
            S,
            i,
            // Resolved props
            "prop",
            At(d)
          ), a.defaultProps !== void 0) {
            var C = At(d) || "Unknown";
            tv[C] || (h("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", C), tv[C] = !0);
          }
        }
        var k = iE(a.type, null, i, t, t.mode, u);
        return k.ref = t.ref, k.return = t, t.child = k, k;
      }
      {
        var D = a.type, B = D.propTypes;
        B && Nl(
          B,
          i,
          // Resolved props
          "prop",
          At(D)
        );
      }
      var j = e.child, X = DS(e, u);
      if (!X) {
        var Z = j.memoizedProps, oe = a.compare;
        if (oe = oe !== null ? oe : Be, oe(Z, i) && e.ref === t.ref)
          return Tu(e, t, u);
      }
      t.flags |= Ci;
      var Le = nf(j, i);
      return Le.ref = t.ref, Le.return = t, t.child = Le, Le;
    }
    function hw(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var d = t.elementType;
        if (d.$$typeof === ht) {
          var m = d, S = m._payload, C = m._init;
          try {
            d = C(S);
          } catch {
            d = null;
          }
          var k = d && d.propTypes;
          k && Nl(
            k,
            i,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            At(d)
          );
        }
      }
      if (e !== null) {
        var D = e.memoizedProps;
        if (Be(D, i) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (jl = !1, t.pendingProps = i = D, DS(e, u))
            (e.flags & Af) !== Ze && (jl = !0);
          else return t.lanes = e.lanes, Tu(e, t, u);
      }
      return ES(e, t, a, i, u);
    }
    function vw(e, t, a) {
      var i = t.pendingProps, u = i.children, d = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden" || me)
        if ((t.mode & xt) === et) {
          var m = {
            baseLanes: ve,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = m, wg(t, a);
        } else if (da(a, fa)) {
          var B = {
            baseLanes: ve,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = B;
          var j = d !== null ? d.baseLanes : a;
          wg(t, j);
        } else {
          var S = null, C;
          if (d !== null) {
            var k = d.baseLanes;
            C = _t(k, a);
          } else
            C = a;
          t.lanes = t.childLanes = fa;
          var D = {
            baseLanes: C,
            cachePool: S,
            transitions: null
          };
          return t.memoizedState = D, t.updateQueue = null, wg(t, C), null;
        }
      else {
        var X;
        d !== null ? (X = _t(d.baseLanes, a), t.memoizedState = null) : X = a, wg(t, X);
      }
      return Na(e, t, u, a), t.child;
    }
    function WD(e, t, a) {
      var i = t.pendingProps;
      return Na(e, t, i, a), t.child;
    }
    function $D(e, t, a) {
      var i = t.pendingProps.children;
      return Na(e, t, i, a), t.child;
    }
    function GD(e, t, a) {
      {
        t.flags |= Ot;
        {
          var i = t.stateNode;
          i.effectDuration = 0, i.passiveEffectDuration = 0;
        }
      }
      var u = t.pendingProps, d = u.children;
      return Na(e, t, d, a), t.child;
    }
    function mw(e, t) {
      var a = t.ref;
      (e === null && a !== null || e !== null && e.ref !== a) && (t.flags |= Tn, t.flags |= ts);
    }
    function ES(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var d = a.propTypes;
        d && Nl(
          d,
          i,
          // Resolved props
          "prop",
          At(a)
        );
      }
      var m;
      {
        var S = Md(t, a, !0);
        m = Ld(t, S);
      }
      var C, k;
      Pd(t, u), Da(t);
      {
        if (Zh.current = t, Zn(!0), C = Yd(e, t, a, i, m, u), k = Wd(), t.mode & en) {
          En(!0);
          try {
            C = Yd(e, t, a, i, m, u), k = Wd();
          } finally {
            En(!1);
          }
        }
        Zn(!1);
      }
      return Oa(), e !== null && !jl ? (k1(e, t, u), Tu(e, t, u)) : (Qr() && k && t_(t), t.flags |= Ci, Na(e, t, C, u), t.child);
    }
    function yw(e, t, a, i, u) {
      {
        switch (cL(t)) {
          case !1: {
            var d = t.stateNode, m = t.type, S = new m(t.memoizedProps, d.context), C = S.state;
            d.updater.enqueueSetState(d, C, null);
            break;
          }
          case !0: {
            t.flags |= Je, t.flags |= or;
            var k = new Error("Simulated error coming from DevTools"), D = Sc(u);
            t.lanes = _t(t.lanes, D);
            var B = vS(t, Xc(k, t), D);
            C_(t, B);
            break;
          }
        }
        if (t.type !== t.elementType) {
          var j = a.propTypes;
          j && Nl(
            j,
            i,
            // Resolved props
            "prop",
            At(a)
          );
        }
      }
      var X;
      wo(a) ? (X = !0, Cy(t)) : X = !1, Pd(t, u);
      var Z = t.stateNode, oe;
      Z === null ? (dg(e, t), lw(t, a, i), dS(t, a, i, u), oe = !0) : e === null ? oe = UD(t, a, i, u) : oe = FD(e, t, a, i, u);
      var Le = CS(e, t, a, oe, X, u);
      {
        var nt = t.stateNode;
        oe && nt.props !== i && (Kc || h("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", pt(t) || "a component"), Kc = !0);
      }
      return Le;
    }
    function CS(e, t, a, i, u, d) {
      mw(e, t);
      var m = (t.flags & Je) !== Ze;
      if (!i && !m)
        return u && JC(t, a, !1), Tu(e, t, d);
      var S = t.stateNode;
      Zh.current = t;
      var C;
      if (m && typeof a.getDerivedStateFromError != "function")
        C = null, tw();
      else {
        Da(t);
        {
          if (Zn(!0), C = S.render(), t.mode & en) {
            En(!0);
            try {
              S.render();
            } finally {
              En(!1);
            }
          }
          Zn(!1);
        }
        Oa();
      }
      return t.flags |= Ci, e !== null && m ? YD(e, t, C, d) : Na(e, t, C, d), t.memoizedState = S.state, u && JC(t, a, !0), t.child;
    }
    function gw(e) {
      var t = e.stateNode;
      t.pendingContext ? XC(e, t.pendingContext, t.pendingContext !== t.context) : t.context && XC(e, t.context, !1), w_(e, t.containerInfo);
    }
    function QD(e, t, a) {
      if (gw(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var i = t.pendingProps, u = t.memoizedState, d = u.element;
      E1(e, t), jy(t, i, null, a);
      var m = t.memoizedState;
      t.stateNode;
      var S = m.element;
      if (u.isDehydrated) {
        var C = {
          element: S,
          isDehydrated: !1,
          cache: m.cache,
          pendingSuspenseBoundaries: m.pendingSuspenseBoundaries,
          transitions: m.transitions
        }, k = t.updateQueue;
        if (k.baseState = C, t.memoizedState = C, t.flags & Lr) {
          var D = Xc(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return _w(e, t, S, a, D);
        } else if (S !== d) {
          var B = Xc(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return _w(e, t, S, a, B);
        } else {
          Kk(t);
          var j = h1(t, null, S, a);
          t.child = j;
          for (var X = j; X; )
            X.flags = X.flags & ~Sn | oa, X = X.sibling;
        }
      } else {
        if (zd(), S === d)
          return Tu(e, t, a);
        Na(e, t, S, a);
      }
      return t.child;
    }
    function _w(e, t, a, i, u) {
      return zd(), o_(u), t.flags |= Lr, Na(e, t, a, i), t.child;
    }
    function qD(e, t, a) {
      x1(t), e === null && l_(t);
      var i = t.type, u = t.pendingProps, d = e !== null ? e.memoizedProps : null, m = u.children, S = B0(i, u);
      return S ? m = null : d !== null && B0(i, d) && (t.flags |= Wa), mw(e, t), Na(e, t, m, a), t.child;
    }
    function XD(e, t) {
      return e === null && l_(t), null;
    }
    function KD(e, t, a, i) {
      dg(e, t);
      var u = t.pendingProps, d = a, m = d._payload, S = d._init, C = S(m);
      t.type = C;
      var k = t.tag = XM(C), D = Pl(C, u), B;
      switch (k) {
        case T:
          return wS(t, C), t.type = C = Zd(C), B = ES(null, t, C, D, i), B;
        case x:
          return t.type = C = ZS(C), B = yw(null, t, C, D, i), B;
        case Q:
          return t.type = C = eE(C), B = dw(null, t, C, D, i), B;
        case fe: {
          if (t.type !== t.elementType) {
            var j = C.propTypes;
            j && Nl(
              j,
              D,
              // Resolved for outer only
              "prop",
              At(C)
            );
          }
          return B = pw(
            null,
            t,
            C,
            Pl(C.type, D),
            // The inner type can have defaults too
            i
          ), B;
        }
      }
      var X = "";
      throw C !== null && typeof C == "object" && C.$$typeof === ht && (X = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + C + ". " + ("Lazy element type must resolve to a class or function." + X));
    }
    function JD(e, t, a, i, u) {
      dg(e, t), t.tag = x;
      var d;
      return wo(a) ? (d = !0, Cy(t)) : d = !1, Pd(t, u), lw(t, a, i), dS(t, a, i, u), CS(null, t, a, !0, d, u);
    }
    function ZD(e, t, a, i) {
      dg(e, t);
      var u = t.pendingProps, d;
      {
        var m = Md(t, a, !1);
        d = Ld(t, m);
      }
      Pd(t, i);
      var S, C;
      Da(t);
      {
        if (a.prototype && typeof a.prototype.render == "function") {
          var k = At(a) || "Unknown";
          mS[k] || (h("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", k, k), mS[k] = !0);
        }
        t.mode & en && zl.recordLegacyContextWarning(t, null), Zn(!0), Zh.current = t, S = Yd(null, t, a, u, d, i), C = Wd(), Zn(!1);
      }
      if (Oa(), t.flags |= Ci, typeof S == "object" && S !== null && typeof S.render == "function" && S.$$typeof === void 0) {
        var D = At(a) || "Unknown";
        ev[D] || (h("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", D, D, D), ev[D] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof S == "object" && S !== null && typeof S.render == "function" && S.$$typeof === void 0
      ) {
        {
          var B = At(a) || "Unknown";
          ev[B] || (h("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", B, B, B), ev[B] = !0);
        }
        t.tag = x, t.memoizedState = null, t.updateQueue = null;
        var j = !1;
        return wo(a) ? (j = !0, Cy(t)) : j = !1, t.memoizedState = S.state !== null && S.state !== void 0 ? S.state : null, E_(t), iw(t, S), dS(t, a, u, i), CS(null, t, a, !0, j, i);
      } else {
        if (t.tag = T, t.mode & en) {
          En(!0);
          try {
            S = Yd(null, t, a, u, d, i), C = Wd();
          } finally {
            En(!1);
          }
        }
        return Qr() && C && t_(t), Na(null, t, S, i), wS(t, a), t.child;
      }
    }
    function wS(e, t) {
      {
        if (t && t.childContextTypes && h("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var a = "", i = Br();
          i && (a += `

Check the render method of \`` + i + "`.");
          var u = i || "", d = e._debugSource;
          d && (u = d.fileName + ":" + d.lineNumber), _S[u] || (_S[u] = !0, h("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", a));
        }
        if (t.defaultProps !== void 0) {
          var m = At(t) || "Unknown";
          tv[m] || (h("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", m), tv[m] = !0);
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var S = At(t) || "Unknown";
          gS[S] || (h("%s: Function components do not support getDerivedStateFromProps.", S), gS[S] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var C = At(t) || "Unknown";
          yS[C] || (h("%s: Function components do not support contextType.", C), yS[C] = !0);
        }
      }
    }
    var TS = {
      dehydrated: null,
      treeContext: null,
      retryLane: Ut
    };
    function xS(e) {
      return {
        baseLanes: e,
        cachePool: ID(),
        transitions: null
      };
    }
    function eO(e, t) {
      var a = null;
      return {
        baseLanes: _t(e.baseLanes, t),
        cachePool: a,
        transitions: e.transitions
      };
    }
    function tO(e, t, a, i) {
      if (t !== null) {
        var u = t.memoizedState;
        if (u === null)
          return !1;
      }
      return b_(e, Yh);
    }
    function nO(e, t) {
      return Ec(e.childLanes, t);
    }
    function Sw(e, t, a) {
      var i = t.pendingProps;
      fL(t) && (t.flags |= Je);
      var u = Ul.current, d = !1, m = (t.flags & Je) !== Ze;
      if (m || tO(u, e) ? (d = !0, t.flags &= ~Je) : (e === null || e.memoizedState !== null) && (u = SD(u, R1)), u = Hd(u), Cs(t, u), e === null) {
        l_(t);
        var S = t.memoizedState;
        if (S !== null) {
          var C = S.dehydrated;
          if (C !== null)
            return oO(t, C);
        }
        var k = i.children, D = i.fallback;
        if (d) {
          var B = rO(t, k, D, a), j = t.child;
          return j.memoizedState = xS(a), t.memoizedState = TS, B;
        } else
          return bS(t, k);
      } else {
        var X = e.memoizedState;
        if (X !== null) {
          var Z = X.dehydrated;
          if (Z !== null)
            return uO(e, t, m, i, Z, X, a);
        }
        if (d) {
          var oe = i.fallback, Le = i.children, nt = iO(e, t, Le, oe, a), Xe = t.child, Nt = e.child.memoizedState;
          return Xe.memoizedState = Nt === null ? xS(a) : eO(Nt, a), Xe.childLanes = nO(e, a), t.memoizedState = TS, nt;
        } else {
          var kt = i.children, $ = aO(e, t, kt, a);
          return t.memoizedState = null, $;
        }
      }
    }
    function bS(e, t, a) {
      var i = e.mode, u = {
        mode: "visible",
        children: t
      }, d = RS(u, i);
      return d.return = e, e.child = d, d;
    }
    function rO(e, t, a, i) {
      var u = e.mode, d = e.child, m = {
        mode: "hidden",
        children: t
      }, S, C;
      return (u & xt) === et && d !== null ? (S = d, S.childLanes = ve, S.pendingProps = m, e.mode & jt && (S.actualDuration = 0, S.actualStartTime = -1, S.selfBaseDuration = 0, S.treeBaseDuration = 0), C = Os(a, u, i, null)) : (S = RS(m, u), C = Os(a, u, i, null)), S.return = e, C.return = e, S.sibling = C, e.child = S, C;
    }
    function RS(e, t, a) {
      return ET(e, t, ve, null);
    }
    function Ew(e, t) {
      return nf(e, t);
    }
    function aO(e, t, a, i) {
      var u = e.child, d = u.sibling, m = Ew(u, {
        mode: "visible",
        children: a
      });
      if ((t.mode & xt) === et && (m.lanes = i), m.return = t, m.sibling = null, d !== null) {
        var S = t.deletions;
        S === null ? (t.deletions = [d], t.flags |= Ya) : S.push(d);
      }
      return t.child = m, m;
    }
    function iO(e, t, a, i, u) {
      var d = t.mode, m = e.child, S = m.sibling, C = {
        mode: "hidden",
        children: a
      }, k;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (d & xt) === et && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== m
      ) {
        var D = t.child;
        k = D, k.childLanes = ve, k.pendingProps = C, t.mode & jt && (k.actualDuration = 0, k.actualStartTime = -1, k.selfBaseDuration = m.selfBaseDuration, k.treeBaseDuration = m.treeBaseDuration), t.deletions = null;
      } else
        k = Ew(m, C), k.subtreeFlags = m.subtreeFlags & Vn;
      var B;
      return S !== null ? B = nf(S, i) : (B = Os(i, d, u, null), B.flags |= Sn), B.return = t, k.return = t, k.sibling = B, t.child = k, B;
    }
    function fg(e, t, a, i) {
      i !== null && o_(i), Ud(t, e.child, null, a);
      var u = t.pendingProps, d = u.children, m = bS(t, d);
      return m.flags |= Sn, t.memoizedState = null, m;
    }
    function lO(e, t, a, i, u) {
      var d = t.mode, m = {
        mode: "visible",
        children: a
      }, S = RS(m, d), C = Os(i, d, u, null);
      return C.flags |= Sn, S.return = t, C.return = t, S.sibling = C, t.child = S, (t.mode & xt) !== et && Ud(t, e.child, null, u), C;
    }
    function oO(e, t, a) {
      return (e.mode & xt) === et ? (h("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = st) : W0(t) ? e.lanes = Nr : e.lanes = fa, null;
    }
    function uO(e, t, a, i, u, d, m) {
      if (a)
        if (t.flags & Lr) {
          t.flags &= ~Lr;
          var $ = pS(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return fg(e, t, m, $);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= Je, null;
          var ue = i.children, G = i.fallback, Ce = lO(e, t, ue, G, m), Ue = t.child;
          return Ue.memoizedState = xS(m), t.memoizedState = TS, Ce;
        }
      else {
        if (qk(), (t.mode & xt) === et)
          return fg(
            e,
            t,
            m,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (W0(u)) {
          var S, C, k;
          {
            var D = dk(u);
            S = D.digest, C = D.message, k = D.stack;
          }
          var B;
          C ? B = new Error(C) : B = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var j = pS(B, S, k);
          return fg(e, t, m, j);
        }
        var X = da(m, e.childLanes);
        if (jl || X) {
          var Z = Cg();
          if (Z !== null) {
            var oe = ah(Z, m);
            if (oe !== Ut && oe !== d.retryLane) {
              d.retryLane = oe;
              var Le = rn;
              ei(e, oe), kr(Z, e, oe, Le);
            }
          }
          QS();
          var nt = pS(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return fg(e, t, m, nt);
        } else if (YC(u)) {
          t.flags |= Je, t.child = e.child;
          var Xe = NM.bind(null, e);
          return pk(u, Xe), null;
        } else {
          Jk(t, u, d.treeContext);
          var Nt = i.children, kt = bS(t, Nt);
          return kt.flags |= oa, kt;
        }
      }
    }
    function Cw(e, t, a) {
      e.lanes = _t(e.lanes, t);
      var i = e.alternate;
      i !== null && (i.lanes = _t(i.lanes, t)), y_(e.return, t, a);
    }
    function sO(e, t, a) {
      for (var i = t; i !== null; ) {
        if (i.tag === Y) {
          var u = i.memoizedState;
          u !== null && Cw(i, a, e);
        } else if (i.tag === Ke)
          Cw(i, a, e);
        else if (i.child !== null) {
          i.child.return = i, i = i.child;
          continue;
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          i = i.return;
        }
        i.sibling.return = i.return, i = i.sibling;
      }
    }
    function cO(e) {
      for (var t = e, a = null; t !== null; ) {
        var i = t.alternate;
        i !== null && Iy(i) === null && (a = t), t = t.sibling;
      }
      return a;
    }
    function fO(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !SS[e])
        if (SS[e] = !0, typeof e == "string")
          switch (e.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards": {
              h('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
              break;
            }
            case "forward":
            case "backward": {
              h('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
              break;
            }
            default:
              h('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
              break;
          }
        else
          h('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
    }
    function dO(e, t) {
      e !== void 0 && !cg[e] && (e !== "collapsed" && e !== "hidden" ? (cg[e] = !0, h('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (cg[e] = !0, h('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function ww(e, t) {
      {
        var a = Ct(e), i = !a && typeof gt(e) == "function";
        if (a || i) {
          var u = a ? "array" : "iterable";
          return h("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", u, t, u), !1;
        }
      }
      return !0;
    }
    function pO(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (Ct(e)) {
          for (var a = 0; a < e.length; a++)
            if (!ww(e[a], a))
              return;
        } else {
          var i = gt(e);
          if (typeof i == "function") {
            var u = i.call(e);
            if (u)
              for (var d = u.next(), m = 0; !d.done; d = u.next()) {
                if (!ww(d.value, m))
                  return;
                m++;
              }
          } else
            h('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
        }
    }
    function kS(e, t, a, i, u) {
      var d = e.memoizedState;
      d === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: a,
        tailMode: u
      } : (d.isBackwards = t, d.rendering = null, d.renderingStartTime = 0, d.last = i, d.tail = a, d.tailMode = u);
    }
    function Tw(e, t, a) {
      var i = t.pendingProps, u = i.revealOrder, d = i.tail, m = i.children;
      fO(u), dO(d, u), pO(m, u), Na(e, t, m, a);
      var S = Ul.current, C = b_(S, Yh);
      if (C)
        S = R_(S, Yh), t.flags |= Je;
      else {
        var k = e !== null && (e.flags & Je) !== Ze;
        k && sO(t, t.child, a), S = Hd(S);
      }
      if (Cs(t, S), (t.mode & xt) === et)
        t.memoizedState = null;
      else
        switch (u) {
          case "forwards": {
            var D = cO(t.child), B;
            D === null ? (B = t.child, t.child = null) : (B = D.sibling, D.sibling = null), kS(
              t,
              !1,
              // isBackwards
              B,
              D,
              d
            );
            break;
          }
          case "backwards": {
            var j = null, X = t.child;
            for (t.child = null; X !== null; ) {
              var Z = X.alternate;
              if (Z !== null && Iy(Z) === null) {
                t.child = X;
                break;
              }
              var oe = X.sibling;
              X.sibling = j, j = X, X = oe;
            }
            kS(
              t,
              !0,
              // isBackwards
              j,
              null,
              // last
              d
            );
            break;
          }
          case "together": {
            kS(
              t,
              !1,
              // isBackwards
              null,
              // tail
              null,
              // last
              void 0
            );
            break;
          }
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function hO(e, t, a) {
      w_(t, t.stateNode.containerInfo);
      var i = t.pendingProps;
      return e === null ? t.child = Ud(t, null, i, a) : Na(e, t, i, a), t.child;
    }
    var xw = !1;
    function vO(e, t, a) {
      var i = t.type, u = i._context, d = t.pendingProps, m = t.memoizedProps, S = d.value;
      {
        "value" in d || xw || (xw = !0, h("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var C = t.type.propTypes;
        C && Nl(C, d, "prop", "Context.Provider");
      }
      if (y1(t, u, S), m !== null) {
        var k = m.value;
        if (Se(k, S)) {
          if (m.children === d.children && !Sy())
            return Tu(e, t, a);
        } else
          fD(t, u, a);
      }
      var D = d.children;
      return Na(e, t, D, a), t.child;
    }
    var bw = !1;
    function mO(e, t, a) {
      var i = t.type;
      i._context === void 0 ? i !== i.Consumer && (bw || (bw = !0, h("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : i = i._context;
      var u = t.pendingProps, d = u.children;
      typeof d != "function" && h("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Pd(t, a);
      var m = fr(i);
      Da(t);
      var S;
      return Zh.current = t, Zn(!0), S = d(m), Zn(!1), Oa(), t.flags |= Ci, Na(e, t, S, a), t.child;
    }
    function nv() {
      jl = !0;
    }
    function dg(e, t) {
      (t.mode & xt) === et && e !== null && (e.alternate = null, t.alternate = null, t.flags |= Sn);
    }
    function Tu(e, t, a) {
      return e !== null && (t.dependencies = e.dependencies), tw(), hv(t.lanes), da(a, t.childLanes) ? (sD(e, t), t.child) : null;
    }
    function yO(e, t, a) {
      {
        var i = t.return;
        if (i === null)
          throw new Error("Cannot swap the root fiber.");
        if (e.alternate = null, t.alternate = null, a.index = t.index, a.sibling = t.sibling, a.return = t.return, a.ref = t.ref, t === i.child)
          i.child = a;
        else {
          var u = i.child;
          if (u === null)
            throw new Error("Expected parent to have a child.");
          for (; u.sibling !== t; )
            if (u = u.sibling, u === null)
              throw new Error("Expected to find the previous sibling.");
          u.sibling = a;
        }
        var d = i.deletions;
        return d === null ? (i.deletions = [e], i.flags |= Ya) : d.push(e), a.flags |= Sn, a;
      }
    }
    function DS(e, t) {
      var a = e.lanes;
      return !!da(a, t);
    }
    function gO(e, t, a) {
      switch (t.tag) {
        case O:
          gw(t), t.stateNode, zd();
          break;
        case M:
          x1(t);
          break;
        case x: {
          var i = t.type;
          wo(i) && Cy(t);
          break;
        }
        case A:
          w_(t, t.stateNode.containerInfo);
          break;
        case ee: {
          var u = t.memoizedProps.value, d = t.type._context;
          y1(t, d, u);
          break;
        }
        case ie:
          {
            var m = da(a, t.childLanes);
            m && (t.flags |= Ot);
            {
              var S = t.stateNode;
              S.effectDuration = 0, S.passiveEffectDuration = 0;
            }
          }
          break;
        case Y: {
          var C = t.memoizedState;
          if (C !== null) {
            if (C.dehydrated !== null)
              return Cs(t, Hd(Ul.current)), t.flags |= Je, null;
            var k = t.child, D = k.childLanes;
            if (da(a, D))
              return Sw(e, t, a);
            Cs(t, Hd(Ul.current));
            var B = Tu(e, t, a);
            return B !== null ? B.sibling : null;
          } else
            Cs(t, Hd(Ul.current));
          break;
        }
        case Ke: {
          var j = (e.flags & Je) !== Ze, X = da(a, t.childLanes);
          if (j) {
            if (X)
              return Tw(e, t, a);
            t.flags |= Je;
          }
          var Z = t.memoizedState;
          if (Z !== null && (Z.rendering = null, Z.tail = null, Z.lastEffect = null), Cs(t, Ul.current), X)
            break;
          return null;
        }
        case be:
        case ut:
          return t.lanes = ve, vw(e, t, a);
      }
      return Tu(e, t, a);
    }
    function Rw(e, t, a) {
      if (t._debugNeedsRemount && e !== null)
        return yO(e, t, iE(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var i = e.memoizedProps, u = t.pendingProps;
        if (i !== u || Sy() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          jl = !0;
        else {
          var d = DS(e, a);
          if (!d && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & Je) === Ze)
            return jl = !1, gO(e, t, a);
          (e.flags & Af) !== Ze ? jl = !0 : jl = !1;
        }
      } else if (jl = !1, Qr() && Ik(t)) {
        var m = t.index, S = Yk();
        t1(t, S, m);
      }
      switch (t.lanes = ve, t.tag) {
        case R:
          return ZD(e, t, t.type, a);
        case ge: {
          var C = t.elementType;
          return KD(e, t, C, a);
        }
        case T: {
          var k = t.type, D = t.pendingProps, B = t.elementType === k ? D : Pl(k, D);
          return ES(e, t, k, B, a);
        }
        case x: {
          var j = t.type, X = t.pendingProps, Z = t.elementType === j ? X : Pl(j, X);
          return yw(e, t, j, Z, a);
        }
        case O:
          return QD(e, t, a);
        case M:
          return qD(e, t, a);
        case V:
          return XD(e, t);
        case Y:
          return Sw(e, t, a);
        case A:
          return hO(e, t, a);
        case Q: {
          var oe = t.type, Le = t.pendingProps, nt = t.elementType === oe ? Le : Pl(oe, Le);
          return dw(e, t, oe, nt, a);
        }
        case L:
          return WD(e, t, a);
        case I:
          return $D(e, t, a);
        case ie:
          return GD(e, t, a);
        case ee:
          return vO(e, t, a);
        case ne:
          return mO(e, t, a);
        case fe: {
          var Xe = t.type, Nt = t.pendingProps, kt = Pl(Xe, Nt);
          if (t.type !== t.elementType) {
            var $ = Xe.propTypes;
            $ && Nl(
              $,
              kt,
              // Resolved for outer only
              "prop",
              At(Xe)
            );
          }
          return kt = Pl(Xe.type, kt), pw(e, t, Xe, kt, a);
        }
        case ae:
          return hw(e, t, t.type, t.pendingProps, a);
        case se: {
          var ue = t.type, G = t.pendingProps, Ce = t.elementType === ue ? G : Pl(ue, G);
          return JD(e, t, ue, Ce, a);
        }
        case Ke:
          return Tw(e, t, a);
        case $e:
          break;
        case be:
          return vw(e, t, a);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function $d(e) {
      e.flags |= Ot;
    }
    function kw(e) {
      e.flags |= Tn, e.flags |= ts;
    }
    var Dw, OS, Ow, Mw;
    Dw = function(e, t, a, i) {
      for (var u = t.child; u !== null; ) {
        if (u.tag === M || u.tag === V)
          HR(e, u.stateNode);
        else if (u.tag !== A) {
          if (u.child !== null) {
            u.child.return = u, u = u.child;
            continue;
          }
        }
        if (u === t)
          return;
        for (; u.sibling === null; ) {
          if (u.return === null || u.return === t)
            return;
          u = u.return;
        }
        u.sibling.return = u.return, u = u.sibling;
      }
    }, OS = function(e, t) {
    }, Ow = function(e, t, a, i, u) {
      var d = e.memoizedProps;
      if (d !== i) {
        var m = t.stateNode, S = T_(), C = VR(m, a, d, i, u, S);
        t.updateQueue = C, C && $d(t);
      }
    }, Mw = function(e, t, a, i) {
      a !== i && $d(t);
    };
    function rv(e, t) {
      if (!Qr())
        switch (e.tailMode) {
          case "hidden": {
            for (var a = e.tail, i = null; a !== null; )
              a.alternate !== null && (i = a), a = a.sibling;
            i === null ? e.tail = null : i.sibling = null;
            break;
          }
          case "collapsed": {
            for (var u = e.tail, d = null; u !== null; )
              u.alternate !== null && (d = u), u = u.sibling;
            d === null ? !t && e.tail !== null ? e.tail.sibling = null : e.tail = null : d.sibling = null;
            break;
          }
        }
    }
    function Xr(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = ve, i = Ze;
      if (t) {
        if ((e.mode & jt) !== et) {
          for (var C = e.selfBaseDuration, k = e.child; k !== null; )
            a = _t(a, _t(k.lanes, k.childLanes)), i |= k.subtreeFlags & Vn, i |= k.flags & Vn, C += k.treeBaseDuration, k = k.sibling;
          e.treeBaseDuration = C;
        } else
          for (var D = e.child; D !== null; )
            a = _t(a, _t(D.lanes, D.childLanes)), i |= D.subtreeFlags & Vn, i |= D.flags & Vn, D.return = e, D = D.sibling;
        e.subtreeFlags |= i;
      } else {
        if ((e.mode & jt) !== et) {
          for (var u = e.actualDuration, d = e.selfBaseDuration, m = e.child; m !== null; )
            a = _t(a, _t(m.lanes, m.childLanes)), i |= m.subtreeFlags, i |= m.flags, u += m.actualDuration, d += m.treeBaseDuration, m = m.sibling;
          e.actualDuration = u, e.treeBaseDuration = d;
        } else
          for (var S = e.child; S !== null; )
            a = _t(a, _t(S.lanes, S.childLanes)), i |= S.subtreeFlags, i |= S.flags, S.return = e, S = S.sibling;
        e.subtreeFlags |= i;
      }
      return e.childLanes = a, t;
    }
    function _O(e, t, a) {
      if (rD() && (t.mode & xt) !== et && (t.flags & Je) === Ze)
        return u1(t), zd(), t.flags |= Lr | ic | or, !1;
      var i = Ry(t);
      if (a !== null && a.dehydrated !== null)
        if (e === null) {
          if (!i)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (tD(t), Xr(t), (t.mode & jt) !== et) {
            var u = a !== null;
            if (u) {
              var d = t.child;
              d !== null && (t.treeBaseDuration -= d.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (zd(), (t.flags & Je) === Ze && (t.memoizedState = null), t.flags |= Ot, Xr(t), (t.mode & jt) !== et) {
            var m = a !== null;
            if (m) {
              var S = t.child;
              S !== null && (t.treeBaseDuration -= S.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return s1(), !0;
    }
    function Lw(e, t, a) {
      var i = t.pendingProps;
      switch (n_(t), t.tag) {
        case R:
        case ge:
        case ae:
        case T:
        case Q:
        case L:
        case I:
        case ie:
        case ne:
        case fe:
          return Xr(t), null;
        case x: {
          var u = t.type;
          return wo(u) && Ey(t), Xr(t), null;
        }
        case O: {
          var d = t.stateNode;
          if (jd(t), J0(t), D_(), d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null), e === null || e.child === null) {
            var m = Ry(t);
            if (m)
              $d(t);
            else if (e !== null) {
              var S = e.memoizedState;
              // Check if this is a client root
              (!S.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & Lr) !== Ze) && (t.flags |= er, s1());
            }
          }
          return OS(e, t), Xr(t), null;
        }
        case M: {
          x_(t);
          var C = T1(), k = t.type;
          if (e !== null && t.stateNode != null)
            Ow(e, t, k, i, C), e.ref !== t.ref && kw(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return Xr(t), null;
            }
            var D = T_(), B = Ry(t);
            if (B)
              Zk(t, C, D) && $d(t);
            else {
              var j = jR(k, i, C, D, t);
              Dw(j, t, !1, !1), t.stateNode = j, BR(j, k, i, C) && $d(t);
            }
            t.ref !== null && kw(t);
          }
          return Xr(t), null;
        }
        case V: {
          var X = i;
          if (e && t.stateNode != null) {
            var Z = e.memoizedProps;
            Mw(e, t, Z, X);
          } else {
            if (typeof X != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var oe = T1(), Le = T_(), nt = Ry(t);
            nt ? eD(t) && $d(t) : t.stateNode = IR(X, oe, Le, t);
          }
          return Xr(t), null;
        }
        case Y: {
          Bd(t);
          var Xe = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var Nt = _O(e, t, Xe);
            if (!Nt)
              return t.flags & or ? t : null;
          }
          if ((t.flags & Je) !== Ze)
            return t.lanes = a, (t.mode & jt) !== et && eS(t), t;
          var kt = Xe !== null, $ = e !== null && e.memoizedState !== null;
          if (kt !== $ && kt) {
            var ue = t.child;
            if (ue.flags |= Bn, (t.mode & xt) !== et) {
              var G = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
              G || b_(Ul.current, R1) ? SM() : QS();
            }
          }
          var Ce = t.updateQueue;
          if (Ce !== null && (t.flags |= Ot), Xr(t), (t.mode & jt) !== et && kt) {
            var Ue = t.child;
            Ue !== null && (t.treeBaseDuration -= Ue.treeBaseDuration);
          }
          return null;
        }
        case A:
          return jd(t), OS(e, t), e === null && Uk(t.stateNode.containerInfo), Xr(t), null;
        case ee:
          var Ne = t.type._context;
          return m_(Ne, t), Xr(t), null;
        case se: {
          var ft = t.type;
          return wo(ft) && Ey(t), Xr(t), null;
        }
        case Ke: {
          Bd(t);
          var mt = t.memoizedState;
          if (mt === null)
            return Xr(t), null;
          var nn = (t.flags & Je) !== Ze, Vt = mt.rendering;
          if (Vt === null)
            if (nn)
              rv(mt, !1);
            else {
              var rr = CM() && (e === null || (e.flags & Je) === Ze);
              if (!rr)
                for (var It = t.child; It !== null; ) {
                  var Qn = Iy(It);
                  if (Qn !== null) {
                    nn = !0, t.flags |= Je, rv(mt, !1);
                    var _a = Qn.updateQueue;
                    return _a !== null && (t.updateQueue = _a, t.flags |= Ot), t.subtreeFlags = Ze, cD(t, a), Cs(t, R_(Ul.current, Yh)), t.child;
                  }
                  It = It.sibling;
                }
              mt.tail !== null && tr() > Zw() && (t.flags |= Je, nn = !0, rv(mt, !1), t.lanes = qp);
            }
          else {
            if (!nn) {
              var ta = Iy(Vt);
              if (ta !== null) {
                t.flags |= Je, nn = !0;
                var Di = ta.updateQueue;
                if (Di !== null && (t.updateQueue = Di, t.flags |= Ot), rv(mt, !0), mt.tail === null && mt.tailMode === "hidden" && !Vt.alternate && !Qr())
                  return Xr(t), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              tr() * 2 - mt.renderingStartTime > Zw() && a !== fa && (t.flags |= Je, nn = !0, rv(mt, !1), t.lanes = qp);
            }
            if (mt.isBackwards)
              Vt.sibling = t.child, t.child = Vt;
            else {
              var Ua = mt.last;
              Ua !== null ? Ua.sibling = Vt : t.child = Vt, mt.last = Vt;
            }
          }
          if (mt.tail !== null) {
            var Fa = mt.tail;
            mt.rendering = Fa, mt.tail = Fa.sibling, mt.renderingStartTime = tr(), Fa.sibling = null;
            var Sa = Ul.current;
            return nn ? Sa = R_(Sa, Yh) : Sa = Hd(Sa), Cs(t, Sa), Fa;
          }
          return Xr(t), null;
        }
        case $e:
          break;
        case be:
        case ut: {
          GS(t);
          var Du = t.memoizedState, ep = Du !== null;
          if (e !== null) {
            var _v = e.memoizedState, Mo = _v !== null;
            Mo !== ep && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !me && (t.flags |= Bn);
          }
          return !ep || (t.mode & xt) === et ? Xr(t) : da(Oo, fa) && (Xr(t), t.subtreeFlags & (Sn | Ot) && (t.flags |= Bn)), null;
        }
        case Ge:
          return null;
        case pe:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function SO(e, t, a) {
      switch (n_(t), t.tag) {
        case x: {
          var i = t.type;
          wo(i) && Ey(t);
          var u = t.flags;
          return u & or ? (t.flags = u & ~or | Je, (t.mode & jt) !== et && eS(t), t) : null;
        }
        case O: {
          t.stateNode, jd(t), J0(t), D_();
          var d = t.flags;
          return (d & or) !== Ze && (d & Je) === Ze ? (t.flags = d & ~or | Je, t) : null;
        }
        case M:
          return x_(t), null;
        case Y: {
          Bd(t);
          var m = t.memoizedState;
          if (m !== null && m.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            zd();
          }
          var S = t.flags;
          return S & or ? (t.flags = S & ~or | Je, (t.mode & jt) !== et && eS(t), t) : null;
        }
        case Ke:
          return Bd(t), null;
        case A:
          return jd(t), null;
        case ee:
          var C = t.type._context;
          return m_(C, t), null;
        case be:
        case ut:
          return GS(t), null;
        case Ge:
          return null;
        default:
          return null;
      }
    }
    function Nw(e, t, a) {
      switch (n_(t), t.tag) {
        case x: {
          var i = t.type.childContextTypes;
          i != null && Ey(t);
          break;
        }
        case O: {
          t.stateNode, jd(t), J0(t), D_();
          break;
        }
        case M: {
          x_(t);
          break;
        }
        case A:
          jd(t);
          break;
        case Y:
          Bd(t);
          break;
        case Ke:
          Bd(t);
          break;
        case ee:
          var u = t.type._context;
          m_(u, t);
          break;
        case be:
        case ut:
          GS(t);
          break;
      }
    }
    var Aw = null;
    Aw = /* @__PURE__ */ new Set();
    var pg = !1, Kr = !1, EO = typeof WeakSet == "function" ? WeakSet : Set, Ve = null, Gd = null, Qd = null;
    function CO(e) {
      ao(null, function() {
        throw e;
      }), ac();
    }
    var wO = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & jt)
        try {
          ko(), t.componentWillUnmount();
        } finally {
          Ro(e);
        }
      else
        t.componentWillUnmount();
    };
    function zw(e, t) {
      try {
        xs(Cr, e);
      } catch (a) {
        pn(e, t, a);
      }
    }
    function MS(e, t, a) {
      try {
        wO(e, a);
      } catch (i) {
        pn(e, t, i);
      }
    }
    function TO(e, t, a) {
      try {
        a.componentDidMount();
      } catch (i) {
        pn(e, t, i);
      }
    }
    function Uw(e, t) {
      try {
        Pw(e);
      } catch (a) {
        pn(e, t, a);
      }
    }
    function qd(e, t) {
      var a = e.ref;
      if (a !== null)
        if (typeof a == "function") {
          var i;
          try {
            if (xe && Qe && e.mode & jt)
              try {
                ko(), i = a(null);
              } finally {
                Ro(e);
              }
            else
              i = a(null);
          } catch (u) {
            pn(e, t, u);
          }
          typeof i == "function" && h("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", pt(e));
        } else
          a.current = null;
    }
    function hg(e, t, a) {
      try {
        a();
      } catch (i) {
        pn(e, t, i);
      }
    }
    var Fw = !1;
    function xO(e, t) {
      FR(e.containerInfo), Ve = t, bO();
      var a = Fw;
      return Fw = !1, a;
    }
    function bO() {
      for (; Ve !== null; ) {
        var e = Ve, t = e.child;
        (e.subtreeFlags & lo) !== Ze && t !== null ? (t.return = e, Ve = t) : RO();
      }
    }
    function RO() {
      for (; Ve !== null; ) {
        var e = Ve;
        Kt(e);
        try {
          kO(e);
        } catch (a) {
          pn(e, e.return, a);
        }
        dn();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Ve = t;
          return;
        }
        Ve = e.return;
      }
    }
    function kO(e) {
      var t = e.alternate, a = e.flags;
      if ((a & er) !== Ze) {
        switch (Kt(e), e.tag) {
          case T:
          case Q:
          case ae:
            break;
          case x: {
            if (t !== null) {
              var i = t.memoizedProps, u = t.memoizedState, d = e.stateNode;
              e.type === e.elementType && !Kc && (d.props !== e.memoizedProps && h("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", pt(e) || "instance"), d.state !== e.memoizedState && h("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", pt(e) || "instance"));
              var m = d.getSnapshotBeforeUpdate(e.elementType === e.type ? i : Pl(e.type, i), u);
              {
                var S = Aw;
                m === void 0 && !S.has(e.type) && (S.add(e.type), h("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", pt(e)));
              }
              d.__reactInternalSnapshotBeforeUpdate = m;
            }
            break;
          }
          case O: {
            {
              var C = e.stateNode;
              uk(C.containerInfo);
            }
            break;
          }
          case M:
          case V:
          case A:
          case se:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        dn();
      }
    }
    function Hl(e, t, a) {
      var i = t.updateQueue, u = i !== null ? i.lastEffect : null;
      if (u !== null) {
        var d = u.next, m = d;
        do {
          if ((m.tag & e) === e) {
            var S = m.destroy;
            m.destroy = void 0, S !== void 0 && ((e & qr) !== ti ? Rl(t) : (e & Cr) !== ti && oc(t), (e & To) !== ti && mv(!0), hg(t, a, S), (e & To) !== ti && mv(!1), (e & qr) !== ti ? co() : (e & Cr) !== ti && Gp());
          }
          m = m.next;
        } while (m !== d);
      }
    }
    function xs(e, t) {
      var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var u = i.next, d = u;
        do {
          if ((d.tag & e) === e) {
            (e & qr) !== ti ? $p(t) : (e & Cr) !== ti && Hf(t);
            var m = d.create;
            (e & To) !== ti && mv(!0), d.destroy = m(), (e & To) !== ti && mv(!1), (e & qr) !== ti ? _m() : (e & Cr) !== ti && Sm();
            {
              var S = d.destroy;
              if (S !== void 0 && typeof S != "function") {
                var C = void 0;
                (d.tag & Cr) !== Ze ? C = "useLayoutEffect" : (d.tag & To) !== Ze ? C = "useInsertionEffect" : C = "useEffect";
                var k = void 0;
                S === null ? k = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof S.then == "function" ? k = `

It looks like you wrote ` + C + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + C + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : k = " You returned: " + S, h("%s must not return anything besides a function, which is used for clean-up.%s", C, k);
              }
            }
          }
          d = d.next;
        } while (d !== u);
      }
    }
    function DO(e, t) {
      if ((t.flags & Ot) !== Ze)
        switch (t.tag) {
          case ie: {
            var a = t.stateNode.passiveEffectDuration, i = t.memoizedProps, u = i.id, d = i.onPostCommit, m = Z1(), S = t.alternate === null ? "mount" : "update";
            J1() && (S = "nested-update"), typeof d == "function" && d(u, S, a, m);
            var C = t.return;
            e: for (; C !== null; ) {
              switch (C.tag) {
                case O:
                  var k = C.stateNode;
                  k.passiveEffectDuration += a;
                  break e;
                case ie:
                  var D = C.stateNode;
                  D.passiveEffectDuration += a;
                  break e;
              }
              C = C.return;
            }
            break;
          }
        }
    }
    function OO(e, t, a, i) {
      if ((a.flags & uo) !== Ze)
        switch (a.tag) {
          case T:
          case Q:
          case ae: {
            if (!Kr)
              if (a.mode & jt)
                try {
                  ko(), xs(Cr | Er, a);
                } finally {
                  Ro(a);
                }
              else
                xs(Cr | Er, a);
            break;
          }
          case x: {
            var u = a.stateNode;
            if (a.flags & Ot && !Kr)
              if (t === null)
                if (a.type === a.elementType && !Kc && (u.props !== a.memoizedProps && h("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", pt(a) || "instance"), u.state !== a.memoizedState && h("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", pt(a) || "instance")), a.mode & jt)
                  try {
                    ko(), u.componentDidMount();
                  } finally {
                    Ro(a);
                  }
                else
                  u.componentDidMount();
              else {
                var d = a.elementType === a.type ? t.memoizedProps : Pl(a.type, t.memoizedProps), m = t.memoizedState;
                if (a.type === a.elementType && !Kc && (u.props !== a.memoizedProps && h("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", pt(a) || "instance"), u.state !== a.memoizedState && h("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", pt(a) || "instance")), a.mode & jt)
                  try {
                    ko(), u.componentDidUpdate(d, m, u.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    Ro(a);
                  }
                else
                  u.componentDidUpdate(d, m, u.__reactInternalSnapshotBeforeUpdate);
              }
            var S = a.updateQueue;
            S !== null && (a.type === a.elementType && !Kc && (u.props !== a.memoizedProps && h("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", pt(a) || "instance"), u.state !== a.memoizedState && h("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", pt(a) || "instance")), w1(a, S, u));
            break;
          }
          case O: {
            var C = a.updateQueue;
            if (C !== null) {
              var k = null;
              if (a.child !== null)
                switch (a.child.tag) {
                  case M:
                    k = a.child.stateNode;
                    break;
                  case x:
                    k = a.child.stateNode;
                    break;
                }
              w1(a, C, k);
            }
            break;
          }
          case M: {
            var D = a.stateNode;
            if (t === null && a.flags & Ot) {
              var B = a.type, j = a.memoizedProps;
              QR(D, B, j);
            }
            break;
          }
          case V:
            break;
          case A:
            break;
          case ie: {
            {
              var X = a.memoizedProps, Z = X.onCommit, oe = X.onRender, Le = a.stateNode.effectDuration, nt = Z1(), Xe = t === null ? "mount" : "update";
              J1() && (Xe = "nested-update"), typeof oe == "function" && oe(a.memoizedProps.id, Xe, a.actualDuration, a.treeBaseDuration, a.actualStartTime, nt);
              {
                typeof Z == "function" && Z(a.memoizedProps.id, Xe, Le, nt), RM(a);
                var Nt = a.return;
                e: for (; Nt !== null; ) {
                  switch (Nt.tag) {
                    case O:
                      var kt = Nt.stateNode;
                      kt.effectDuration += Le;
                      break e;
                    case ie:
                      var $ = Nt.stateNode;
                      $.effectDuration += Le;
                      break e;
                  }
                  Nt = Nt.return;
                }
              }
            }
            break;
          }
          case Y: {
            PO(e, a);
            break;
          }
          case Ke:
          case se:
          case $e:
          case be:
          case ut:
          case pe:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      Kr || a.flags & Tn && Pw(a);
    }
    function MO(e) {
      switch (e.tag) {
        case T:
        case Q:
        case ae: {
          if (e.mode & jt)
            try {
              ko(), zw(e, e.return);
            } finally {
              Ro(e);
            }
          else
            zw(e, e.return);
          break;
        }
        case x: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && TO(e, e.return, t), Uw(e, e.return);
          break;
        }
        case M: {
          Uw(e, e.return);
          break;
        }
      }
    }
    function LO(e, t) {
      for (var a = null, i = e; ; ) {
        if (i.tag === M) {
          if (a === null) {
            a = i;
            try {
              var u = i.stateNode;
              t ? ak(u) : lk(i.stateNode, i.memoizedProps);
            } catch (m) {
              pn(e, e.return, m);
            }
          }
        } else if (i.tag === V) {
          if (a === null)
            try {
              var d = i.stateNode;
              t ? ik(d) : ok(d, i.memoizedProps);
            } catch (m) {
              pn(e, e.return, m);
            }
        } else if (!((i.tag === be || i.tag === ut) && i.memoizedState !== null && i !== e)) {
          if (i.child !== null) {
            i.child.return = i, i = i.child;
            continue;
          }
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          a === i && (a = null), i = i.return;
        }
        a === i && (a = null), i.sibling.return = i.return, i = i.sibling;
      }
    }
    function Pw(e) {
      var t = e.ref;
      if (t !== null) {
        var a = e.stateNode, i;
        switch (e.tag) {
          case M:
            i = a;
            break;
          default:
            i = a;
        }
        if (typeof t == "function") {
          var u;
          if (e.mode & jt)
            try {
              ko(), u = t(i);
            } finally {
              Ro(e);
            }
          else
            u = t(i);
          typeof u == "function" && h("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", pt(e));
        } else
          t.hasOwnProperty("current") || h("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", pt(e)), t.current = i;
      }
    }
    function NO(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function jw(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, jw(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === M) {
          var a = e.stateNode;
          a !== null && jk(a);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function AO(e) {
      for (var t = e.return; t !== null; ) {
        if (Hw(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function Hw(e) {
      return e.tag === M || e.tag === O || e.tag === A;
    }
    function Bw(e) {
      var t = e;
      e: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || Hw(t.return))
            return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== M && t.tag !== V && t.tag !== Ie; ) {
          if (t.flags & Sn || t.child === null || t.tag === A)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & Sn))
          return t.stateNode;
      }
    }
    function zO(e) {
      var t = AO(e);
      switch (t.tag) {
        case M: {
          var a = t.stateNode;
          t.flags & Wa && (IC(a), t.flags &= ~Wa);
          var i = Bw(e);
          NS(e, i, a);
          break;
        }
        case O:
        case A: {
          var u = t.stateNode.containerInfo, d = Bw(e);
          LS(e, d, u);
          break;
        }
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function LS(e, t, a) {
      var i = e.tag, u = i === M || i === V;
      if (u) {
        var d = e.stateNode;
        t ? ek(a, d, t) : JR(a, d);
      } else if (i !== A) {
        var m = e.child;
        if (m !== null) {
          LS(m, t, a);
          for (var S = m.sibling; S !== null; )
            LS(S, t, a), S = S.sibling;
        }
      }
    }
    function NS(e, t, a) {
      var i = e.tag, u = i === M || i === V;
      if (u) {
        var d = e.stateNode;
        t ? ZR(a, d, t) : KR(a, d);
      } else if (i !== A) {
        var m = e.child;
        if (m !== null) {
          NS(m, t, a);
          for (var S = m.sibling; S !== null; )
            NS(S, t, a), S = S.sibling;
        }
      }
    }
    var Jr = null, Bl = !1;
    function UO(e, t, a) {
      {
        var i = t;
        e: for (; i !== null; ) {
          switch (i.tag) {
            case M: {
              Jr = i.stateNode, Bl = !1;
              break e;
            }
            case O: {
              Jr = i.stateNode.containerInfo, Bl = !0;
              break e;
            }
            case A: {
              Jr = i.stateNode.containerInfo, Bl = !0;
              break e;
            }
          }
          i = i.return;
        }
        if (Jr === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        Vw(e, t, a), Jr = null, Bl = !1;
      }
      NO(a);
    }
    function bs(e, t, a) {
      for (var i = a.child; i !== null; )
        Vw(e, t, i), i = i.sibling;
    }
    function Vw(e, t, a) {
      switch (Ip(a), a.tag) {
        case M:
          Kr || qd(a, t);
        case V: {
          {
            var i = Jr, u = Bl;
            Jr = null, bs(e, t, a), Jr = i, Bl = u, Jr !== null && (Bl ? nk(Jr, a.stateNode) : tk(Jr, a.stateNode));
          }
          return;
        }
        case Ie: {
          Jr !== null && (Bl ? rk(Jr, a.stateNode) : Y0(Jr, a.stateNode));
          return;
        }
        case A: {
          {
            var d = Jr, m = Bl;
            Jr = a.stateNode.containerInfo, Bl = !0, bs(e, t, a), Jr = d, Bl = m;
          }
          return;
        }
        case T:
        case Q:
        case fe:
        case ae: {
          if (!Kr) {
            var S = a.updateQueue;
            if (S !== null) {
              var C = S.lastEffect;
              if (C !== null) {
                var k = C.next, D = k;
                do {
                  var B = D, j = B.destroy, X = B.tag;
                  j !== void 0 && ((X & To) !== ti ? hg(a, t, j) : (X & Cr) !== ti && (oc(a), a.mode & jt ? (ko(), hg(a, t, j), Ro(a)) : hg(a, t, j), Gp())), D = D.next;
                } while (D !== k);
              }
            }
          }
          bs(e, t, a);
          return;
        }
        case x: {
          if (!Kr) {
            qd(a, t);
            var Z = a.stateNode;
            typeof Z.componentWillUnmount == "function" && MS(a, t, Z);
          }
          bs(e, t, a);
          return;
        }
        case $e: {
          bs(e, t, a);
          return;
        }
        case be: {
          if (
            // TODO: Remove this dead flag
            a.mode & xt
          ) {
            var oe = Kr;
            Kr = oe || a.memoizedState !== null, bs(e, t, a), Kr = oe;
          } else
            bs(e, t, a);
          break;
        }
        default: {
          bs(e, t, a);
          return;
        }
      }
    }
    function FO(e) {
      e.memoizedState;
    }
    function PO(e, t) {
      var a = t.memoizedState;
      if (a === null) {
        var i = t.alternate;
        if (i !== null) {
          var u = i.memoizedState;
          if (u !== null) {
            var d = u.dehydrated;
            d !== null && Ck(d);
          }
        }
      }
    }
    function Iw(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var a = e.stateNode;
        a === null && (a = e.stateNode = new EO()), t.forEach(function(i) {
          var u = AM.bind(null, e, i);
          if (!a.has(i)) {
            if (a.add(i), ca)
              if (Gd !== null && Qd !== null)
                vv(Qd, Gd);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            i.then(u, u);
          }
        });
      }
    }
    function jO(e, t, a) {
      Gd = a, Qd = e, Kt(t), Yw(t, e), Kt(t), Gd = null, Qd = null;
    }
    function Vl(e, t, a) {
      var i = t.deletions;
      if (i !== null)
        for (var u = 0; u < i.length; u++) {
          var d = i[u];
          try {
            UO(e, t, d);
          } catch (C) {
            pn(d, t, C);
          }
        }
      var m = Kl();
      if (t.subtreeFlags & oo)
        for (var S = t.child; S !== null; )
          Kt(S), Yw(S, e), S = S.sibling;
      Kt(m);
    }
    function Yw(e, t, a) {
      var i = e.alternate, u = e.flags;
      switch (e.tag) {
        case T:
        case Q:
        case fe:
        case ae: {
          if (Vl(t, e), Do(e), u & Ot) {
            try {
              Hl(To | Er, e, e.return), xs(To | Er, e);
            } catch (ft) {
              pn(e, e.return, ft);
            }
            if (e.mode & jt) {
              try {
                ko(), Hl(Cr | Er, e, e.return);
              } catch (ft) {
                pn(e, e.return, ft);
              }
              Ro(e);
            } else
              try {
                Hl(Cr | Er, e, e.return);
              } catch (ft) {
                pn(e, e.return, ft);
              }
          }
          return;
        }
        case x: {
          Vl(t, e), Do(e), u & Tn && i !== null && qd(i, i.return);
          return;
        }
        case M: {
          Vl(t, e), Do(e), u & Tn && i !== null && qd(i, i.return);
          {
            if (e.flags & Wa) {
              var d = e.stateNode;
              try {
                IC(d);
              } catch (ft) {
                pn(e, e.return, ft);
              }
            }
            if (u & Ot) {
              var m = e.stateNode;
              if (m != null) {
                var S = e.memoizedProps, C = i !== null ? i.memoizedProps : S, k = e.type, D = e.updateQueue;
                if (e.updateQueue = null, D !== null)
                  try {
                    qR(m, D, k, C, S, e);
                  } catch (ft) {
                    pn(e, e.return, ft);
                  }
              }
            }
          }
          return;
        }
        case V: {
          if (Vl(t, e), Do(e), u & Ot) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var B = e.stateNode, j = e.memoizedProps, X = i !== null ? i.memoizedProps : j;
            try {
              XR(B, X, j);
            } catch (ft) {
              pn(e, e.return, ft);
            }
          }
          return;
        }
        case O: {
          if (Vl(t, e), Do(e), u & Ot && i !== null) {
            var Z = i.memoizedState;
            if (Z.isDehydrated)
              try {
                Ek(t.containerInfo);
              } catch (ft) {
                pn(e, e.return, ft);
              }
          }
          return;
        }
        case A: {
          Vl(t, e), Do(e);
          return;
        }
        case Y: {
          Vl(t, e), Do(e);
          var oe = e.child;
          if (oe.flags & Bn) {
            var Le = oe.stateNode, nt = oe.memoizedState, Xe = nt !== null;
            if (Le.isHidden = Xe, Xe) {
              var Nt = oe.alternate !== null && oe.alternate.memoizedState !== null;
              Nt || _M();
            }
          }
          if (u & Ot) {
            try {
              FO(e);
            } catch (ft) {
              pn(e, e.return, ft);
            }
            Iw(e);
          }
          return;
        }
        case be: {
          var kt = i !== null && i.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & xt
          ) {
            var $ = Kr;
            Kr = $ || kt, Vl(t, e), Kr = $;
          } else
            Vl(t, e);
          if (Do(e), u & Bn) {
            var ue = e.stateNode, G = e.memoizedState, Ce = G !== null, Ue = e;
            if (ue.isHidden = Ce, Ce && !kt && (Ue.mode & xt) !== et) {
              Ve = Ue;
              for (var Ne = Ue.child; Ne !== null; )
                Ve = Ne, BO(Ne), Ne = Ne.sibling;
            }
            LO(Ue, Ce);
          }
          return;
        }
        case Ke: {
          Vl(t, e), Do(e), u & Ot && Iw(e);
          return;
        }
        case $e:
          return;
        default: {
          Vl(t, e), Do(e);
          return;
        }
      }
    }
    function Do(e) {
      var t = e.flags;
      if (t & Sn) {
        try {
          zO(e);
        } catch (a) {
          pn(e, e.return, a);
        }
        e.flags &= ~Sn;
      }
      t & oa && (e.flags &= ~oa);
    }
    function HO(e, t, a) {
      Gd = a, Qd = t, Ve = e, Ww(e, t, a), Gd = null, Qd = null;
    }
    function Ww(e, t, a) {
      for (var i = (e.mode & xt) !== et; Ve !== null; ) {
        var u = Ve, d = u.child;
        if (u.tag === be && i) {
          var m = u.memoizedState !== null, S = m || pg;
          if (S) {
            AS(e, t, a);
            continue;
          } else {
            var C = u.alternate, k = C !== null && C.memoizedState !== null, D = k || Kr, B = pg, j = Kr;
            pg = S, Kr = D, Kr && !j && (Ve = u, VO(u));
            for (var X = d; X !== null; )
              Ve = X, Ww(
                X,
                // New root; bubble back up to here and stop.
                t,
                a
              ), X = X.sibling;
            Ve = u, pg = B, Kr = j, AS(e, t, a);
            continue;
          }
        }
        (u.subtreeFlags & uo) !== Ze && d !== null ? (d.return = u, Ve = d) : AS(e, t, a);
      }
    }
    function AS(e, t, a) {
      for (; Ve !== null; ) {
        var i = Ve;
        if ((i.flags & uo) !== Ze) {
          var u = i.alternate;
          Kt(i);
          try {
            OO(t, u, i, a);
          } catch (m) {
            pn(i, i.return, m);
          }
          dn();
        }
        if (i === e) {
          Ve = null;
          return;
        }
        var d = i.sibling;
        if (d !== null) {
          d.return = i.return, Ve = d;
          return;
        }
        Ve = i.return;
      }
    }
    function BO(e) {
      for (; Ve !== null; ) {
        var t = Ve, a = t.child;
        switch (t.tag) {
          case T:
          case Q:
          case fe:
          case ae: {
            if (t.mode & jt)
              try {
                ko(), Hl(Cr, t, t.return);
              } finally {
                Ro(t);
              }
            else
              Hl(Cr, t, t.return);
            break;
          }
          case x: {
            qd(t, t.return);
            var i = t.stateNode;
            typeof i.componentWillUnmount == "function" && MS(t, t.return, i);
            break;
          }
          case M: {
            qd(t, t.return);
            break;
          }
          case be: {
            var u = t.memoizedState !== null;
            if (u) {
              $w(e);
              continue;
            }
            break;
          }
        }
        a !== null ? (a.return = t, Ve = a) : $w(e);
      }
    }
    function $w(e) {
      for (; Ve !== null; ) {
        var t = Ve;
        if (t === e) {
          Ve = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, Ve = a;
          return;
        }
        Ve = t.return;
      }
    }
    function VO(e) {
      for (; Ve !== null; ) {
        var t = Ve, a = t.child;
        if (t.tag === be) {
          var i = t.memoizedState !== null;
          if (i) {
            Gw(e);
            continue;
          }
        }
        a !== null ? (a.return = t, Ve = a) : Gw(e);
      }
    }
    function Gw(e) {
      for (; Ve !== null; ) {
        var t = Ve;
        Kt(t);
        try {
          MO(t);
        } catch (i) {
          pn(t, t.return, i);
        }
        if (dn(), t === e) {
          Ve = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, Ve = a;
          return;
        }
        Ve = t.return;
      }
    }
    function IO(e, t, a, i) {
      Ve = t, YO(t, e, a, i);
    }
    function YO(e, t, a, i) {
      for (; Ve !== null; ) {
        var u = Ve, d = u.child;
        (u.subtreeFlags & xl) !== Ze && d !== null ? (d.return = u, Ve = d) : WO(e, t, a, i);
      }
    }
    function WO(e, t, a, i) {
      for (; Ve !== null; ) {
        var u = Ve;
        if ((u.flags & la) !== Ze) {
          Kt(u);
          try {
            $O(t, u, a, i);
          } catch (m) {
            pn(u, u.return, m);
          }
          dn();
        }
        if (u === e) {
          Ve = null;
          return;
        }
        var d = u.sibling;
        if (d !== null) {
          d.return = u.return, Ve = d;
          return;
        }
        Ve = u.return;
      }
    }
    function $O(e, t, a, i) {
      switch (t.tag) {
        case T:
        case Q:
        case ae: {
          if (t.mode & jt) {
            Z_();
            try {
              xs(qr | Er, t);
            } finally {
              J_(t);
            }
          } else
            xs(qr | Er, t);
          break;
        }
      }
    }
    function GO(e) {
      Ve = e, QO();
    }
    function QO() {
      for (; Ve !== null; ) {
        var e = Ve, t = e.child;
        if ((Ve.flags & Ya) !== Ze) {
          var a = e.deletions;
          if (a !== null) {
            for (var i = 0; i < a.length; i++) {
              var u = a[i];
              Ve = u, KO(u, e);
            }
            {
              var d = e.alternate;
              if (d !== null) {
                var m = d.child;
                if (m !== null) {
                  d.child = null;
                  do {
                    var S = m.sibling;
                    m.sibling = null, m = S;
                  } while (m !== null);
                }
              }
            }
            Ve = e;
          }
        }
        (e.subtreeFlags & xl) !== Ze && t !== null ? (t.return = e, Ve = t) : qO();
      }
    }
    function qO() {
      for (; Ve !== null; ) {
        var e = Ve;
        (e.flags & la) !== Ze && (Kt(e), XO(e), dn());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Ve = t;
          return;
        }
        Ve = e.return;
      }
    }
    function XO(e) {
      switch (e.tag) {
        case T:
        case Q:
        case ae: {
          e.mode & jt ? (Z_(), Hl(qr | Er, e, e.return), J_(e)) : Hl(qr | Er, e, e.return);
          break;
        }
      }
    }
    function KO(e, t) {
      for (; Ve !== null; ) {
        var a = Ve;
        Kt(a), ZO(a, t), dn();
        var i = a.child;
        i !== null ? (i.return = a, Ve = i) : JO(e);
      }
    }
    function JO(e) {
      for (; Ve !== null; ) {
        var t = Ve, a = t.sibling, i = t.return;
        if (jw(t), t === e) {
          Ve = null;
          return;
        }
        if (a !== null) {
          a.return = i, Ve = a;
          return;
        }
        Ve = i;
      }
    }
    function ZO(e, t) {
      switch (e.tag) {
        case T:
        case Q:
        case ae: {
          e.mode & jt ? (Z_(), Hl(qr, e, t), J_(e)) : Hl(qr, e, t);
          break;
        }
      }
    }
    function eM(e) {
      switch (e.tag) {
        case T:
        case Q:
        case ae: {
          try {
            xs(Cr | Er, e);
          } catch (a) {
            pn(e, e.return, a);
          }
          break;
        }
        case x: {
          var t = e.stateNode;
          try {
            t.componentDidMount();
          } catch (a) {
            pn(e, e.return, a);
          }
          break;
        }
      }
    }
    function tM(e) {
      switch (e.tag) {
        case T:
        case Q:
        case ae: {
          try {
            xs(qr | Er, e);
          } catch (t) {
            pn(e, e.return, t);
          }
          break;
        }
      }
    }
    function nM(e) {
      switch (e.tag) {
        case T:
        case Q:
        case ae: {
          try {
            Hl(Cr | Er, e, e.return);
          } catch (a) {
            pn(e, e.return, a);
          }
          break;
        }
        case x: {
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && MS(e, e.return, t);
          break;
        }
      }
    }
    function rM(e) {
      switch (e.tag) {
        case T:
        case Q:
        case ae:
          try {
            Hl(qr | Er, e, e.return);
          } catch (t) {
            pn(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var av = Symbol.for;
      av("selector.component"), av("selector.has_pseudo_class"), av("selector.role"), av("selector.test_id"), av("selector.text");
    }
    var aM = [];
    function iM() {
      aM.forEach(function(e) {
        return e();
      });
    }
    var lM = s.ReactCurrentActQueue;
    function oM(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), a = typeof jest < "u";
        return a && t !== !1;
      }
    }
    function Qw() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && lM.current !== null && h("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var uM = Math.ceil, zS = s.ReactCurrentDispatcher, US = s.ReactCurrentOwner, Zr = s.ReactCurrentBatchConfig, Il = s.ReactCurrentActQueue, xr = (
      /*             */
      0
    ), qw = (
      /*               */
      1
    ), ea = (
      /*                */
      2
    ), cl = (
      /*                */
      4
    ), xu = 0, iv = 1, Jc = 2, vg = 3, lv = 4, Xw = 5, FS = 6, Lt = xr, Aa = null, An = null, br = ve, Oo = ve, PS = ms(ve), Rr = xu, ov = null, mg = ve, uv = ve, yg = ve, sv = null, ni = null, jS = 0, Kw = 500, Jw = 1 / 0, sM = 500, bu = null;
    function cv() {
      Jw = tr() + sM;
    }
    function Zw() {
      return Jw;
    }
    var gg = !1, HS = null, Xd = null, Zc = !1, Rs = null, fv = ve, BS = [], VS = null, cM = 50, dv = 0, IS = null, YS = !1, _g = !1, fM = 50, Kd = 0, Sg = null, pv = rn, Eg = ve, eT = !1;
    function Cg() {
      return Aa;
    }
    function za() {
      return (Lt & (ea | cl)) !== xr ? tr() : (pv !== rn || (pv = tr()), pv);
    }
    function ks(e) {
      var t = e.mode;
      if ((t & xt) === et)
        return st;
      if ((Lt & ea) !== xr && br !== ve)
        return Sc(br);
      var a = lD() !== iD;
      if (a) {
        if (Zr.transition !== null) {
          var i = Zr.transition;
          i._updatedFibers || (i._updatedFibers = /* @__PURE__ */ new Set()), i._updatedFibers.add(e);
        }
        return Eg === Ut && (Eg = th()), Eg;
      }
      var u = Ka();
      if (u !== Ut)
        return u;
      var d = YR();
      return d;
    }
    function dM(e) {
      var t = e.mode;
      return (t & xt) === et ? st : bm();
    }
    function kr(e, t, a, i) {
      UM(), eT && h("useInsertionEffect must not schedule updates."), YS && (_g = !0), is(e, a, i), (Lt & ea) !== ve && e === Aa ? jM(t) : (ca && wc(e, t, a), HM(t), e === Aa && ((Lt & ea) === xr && (uv = _t(uv, a)), Rr === lv && Ds(e, br)), ri(e, i), a === st && Lt === xr && (t.mode & xt) === et && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Il.isBatchingLegacy && (cv(), e1()));
    }
    function pM(e, t, a) {
      var i = e.current;
      i.lanes = t, is(e, t, a), ri(e, a);
    }
    function hM(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (Lt & ea) !== xr
      );
    }
    function ri(e, t) {
      var a = e.callbackNode;
      ld(e, t);
      var i = id(e, e === Aa ? br : ve);
      if (i === ve) {
        a !== null && mT(a), e.callbackNode = null, e.callbackPriority = Ut;
        return;
      }
      var u = ho(i), d = e.callbackPriority;
      if (d === u && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(Il.current !== null && a !== KS)) {
        a == null && d !== st && h("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      a != null && mT(a);
      var m;
      if (u === st)
        e.tag === ys ? (Il.isBatchingLegacy !== null && (Il.didScheduleLegacyUpdate = !0), Vk(rT.bind(null, e))) : ZC(rT.bind(null, e)), Il.current !== null ? Il.current.push(gs) : $R(function() {
          (Lt & (ea | cl)) === xr && gs();
        }), m = null;
      else {
        var S;
        switch (Nm(i)) {
          case Ir:
            S = lc;
            break;
          case el:
            S = so;
            break;
          case qa:
            S = bl;
            break;
          case Xa:
            S = Zo;
            break;
          default:
            S = bl;
            break;
        }
        m = JS(S, tT.bind(null, e));
      }
      e.callbackPriority = u, e.callbackNode = m;
    }
    function tT(e, t) {
      if (LD(), pv = rn, Eg = ve, (Lt & (ea | cl)) !== xr)
        throw new Error("Should not already be working.");
      var a = e.callbackNode, i = ku();
      if (i && e.callbackNode !== a)
        return null;
      var u = id(e, e === Aa ? br : ve);
      if (u === ve)
        return null;
      var d = !ud(e, u) && !xm(e, u) && !t, m = d ? TM(e, u) : Tg(e, u);
      if (m !== xu) {
        if (m === Jc) {
          var S = od(e);
          S !== ve && (u = S, m = WS(e, S));
        }
        if (m === iv) {
          var C = ov;
          throw ef(e, ve), Ds(e, u), ri(e, tr()), C;
        }
        if (m === FS)
          Ds(e, u);
        else {
          var k = !ud(e, u), D = e.current.alternate;
          if (k && !mM(D)) {
            if (m = Tg(e, u), m === Jc) {
              var B = od(e);
              B !== ve && (u = B, m = WS(e, B));
            }
            if (m === iv) {
              var j = ov;
              throw ef(e, ve), Ds(e, u), ri(e, tr()), j;
            }
          }
          e.finishedWork = D, e.finishedLanes = u, vM(e, m, u);
        }
      }
      return ri(e, tr()), e.callbackNode === a ? tT.bind(null, e) : null;
    }
    function WS(e, t) {
      var a = sv;
      if (fd(e)) {
        var i = ef(e, t);
        i.flags |= Lr, zk(e.containerInfo);
      }
      var u = Tg(e, t);
      if (u !== Jc) {
        var d = ni;
        ni = a, d !== null && nT(d);
      }
      return u;
    }
    function nT(e) {
      ni === null ? ni = e : ni.push.apply(ni, e);
    }
    function vM(e, t, a) {
      switch (t) {
        case xu:
        case iv:
          throw new Error("Root did not complete. This is a bug in React.");
        case Jc: {
          tf(e, ni, bu);
          break;
        }
        case vg: {
          if (Ds(e, a), cu(a) && // do not delay if we're inside an act() scope
          !yT()) {
            var i = jS + Kw - tr();
            if (i > 10) {
              var u = id(e, ve);
              if (u !== ve)
                break;
              var d = e.suspendedLanes;
              if (!fu(d, a)) {
                za(), sd(e, d);
                break;
              }
              e.timeoutHandle = V0(tf.bind(null, e, ni, bu), i);
              break;
            }
          }
          tf(e, ni, bu);
          break;
        }
        case lv: {
          if (Ds(e, a), Zp(a))
            break;
          if (!yT()) {
            var m = Ti(e, a), S = m, C = tr() - S, k = zM(C) - C;
            if (k > 10) {
              e.timeoutHandle = V0(tf.bind(null, e, ni, bu), k);
              break;
            }
          }
          tf(e, ni, bu);
          break;
        }
        case Xw: {
          tf(e, ni, bu);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function mM(e) {
      for (var t = e; ; ) {
        if (t.flags & es) {
          var a = t.updateQueue;
          if (a !== null) {
            var i = a.stores;
            if (i !== null)
              for (var u = 0; u < i.length; u++) {
                var d = i[u], m = d.getSnapshot, S = d.value;
                try {
                  if (!Se(m(), S))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var C = t.child;
        if (t.subtreeFlags & es && C !== null) {
          C.return = t, t = C;
          continue;
        }
        if (t === e)
          return !0;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return !0;
    }
    function Ds(e, t) {
      t = Ec(t, yg), t = Ec(t, uv), Dm(e, t);
    }
    function rT(e) {
      if (ND(), (Lt & (ea | cl)) !== xr)
        throw new Error("Should not already be working.");
      ku();
      var t = id(e, ve);
      if (!da(t, st))
        return ri(e, tr()), null;
      var a = Tg(e, t);
      if (e.tag !== ys && a === Jc) {
        var i = od(e);
        i !== ve && (t = i, a = WS(e, i));
      }
      if (a === iv) {
        var u = ov;
        throw ef(e, ve), Ds(e, t), ri(e, tr()), u;
      }
      if (a === FS)
        throw new Error("Root did not complete. This is a bug in React.");
      var d = e.current.alternate;
      return e.finishedWork = d, e.finishedLanes = t, tf(e, ni, bu), ri(e, tr()), null;
    }
    function yM(e, t) {
      t !== ve && (cd(e, _t(t, st)), ri(e, tr()), (Lt & (ea | cl)) === xr && (cv(), gs()));
    }
    function $S(e, t) {
      var a = Lt;
      Lt |= qw;
      try {
        return e(t);
      } finally {
        Lt = a, Lt === xr && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !Il.isBatchingLegacy && (cv(), e1());
      }
    }
    function gM(e, t, a, i, u) {
      var d = Ka(), m = Zr.transition;
      try {
        return Zr.transition = null, Wn(Ir), e(t, a, i, u);
      } finally {
        Wn(d), Zr.transition = m, Lt === xr && cv();
      }
    }
    function Ru(e) {
      Rs !== null && Rs.tag === ys && (Lt & (ea | cl)) === xr && ku();
      var t = Lt;
      Lt |= qw;
      var a = Zr.transition, i = Ka();
      try {
        return Zr.transition = null, Wn(Ir), e ? e() : void 0;
      } finally {
        Wn(i), Zr.transition = a, Lt = t, (Lt & (ea | cl)) === xr && gs();
      }
    }
    function aT() {
      return (Lt & (ea | cl)) !== xr;
    }
    function wg(e, t) {
      ya(PS, Oo, e), Oo = _t(Oo, t);
    }
    function GS(e) {
      Oo = PS.current, ma(PS, e);
    }
    function ef(e, t) {
      e.finishedWork = null, e.finishedLanes = ve;
      var a = e.timeoutHandle;
      if (a !== I0 && (e.timeoutHandle = I0, WR(a)), An !== null)
        for (var i = An.return; i !== null; ) {
          var u = i.alternate;
          Nw(u, i), i = i.return;
        }
      Aa = e;
      var d = nf(e.current, null);
      return An = d, br = Oo = t, Rr = xu, ov = null, mg = ve, uv = ve, yg = ve, sv = null, ni = null, pD(), zl.discardPendingWarnings(), d;
    }
    function iT(e, t) {
      do {
        var a = An;
        try {
          if (Ny(), D1(), dn(), US.current = null, a === null || a.return === null) {
            Rr = iv, ov = t, An = null;
            return;
          }
          if (xe && a.mode & jt && ug(a, !0), Fe)
            if (Oa(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var i = t;
              Zi(a, i, br);
            } else
              uc(a, t, br);
          VD(e, a.return, a, t, br), sT(a);
        } catch (u) {
          t = u, An === a && a !== null ? (a = a.return, An = a) : a = An;
          continue;
        }
        return;
      } while (!0);
    }
    function lT() {
      var e = zS.current;
      return zS.current = rg, e === null ? rg : e;
    }
    function oT(e) {
      zS.current = e;
    }
    function _M() {
      jS = tr();
    }
    function hv(e) {
      mg = _t(e, mg);
    }
    function SM() {
      Rr === xu && (Rr = vg);
    }
    function QS() {
      (Rr === xu || Rr === vg || Rr === Jc) && (Rr = lv), Aa !== null && (_c(mg) || _c(uv)) && Ds(Aa, br);
    }
    function EM(e) {
      Rr !== lv && (Rr = Jc), sv === null ? sv = [e] : sv.push(e);
    }
    function CM() {
      return Rr === xu;
    }
    function Tg(e, t) {
      var a = Lt;
      Lt |= ea;
      var i = lT();
      if (Aa !== e || br !== t) {
        if (ca) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (vv(e, br), u.clear()), Om(e, t);
        }
        bu = ih(), ef(e, t);
      }
      ru(t);
      do
        try {
          wM();
          break;
        } catch (d) {
          iT(e, d);
        }
      while (!0);
      if (Ny(), Lt = a, oT(i), An !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return Bf(), Aa = null, br = ve, Rr;
    }
    function wM() {
      for (; An !== null; )
        uT(An);
    }
    function TM(e, t) {
      var a = Lt;
      Lt |= ea;
      var i = lT();
      if (Aa !== e || br !== t) {
        if (ca) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (vv(e, br), u.clear()), Om(e, t);
        }
        bu = ih(), cv(), ef(e, t);
      }
      ru(t);
      do
        try {
          xM();
          break;
        } catch (d) {
          iT(e, d);
        }
      while (!0);
      return Ny(), oT(i), Lt = a, An !== null ? (Em(), xu) : (Bf(), Aa = null, br = ve, Rr);
    }
    function xM() {
      for (; An !== null && !Pp(); )
        uT(An);
    }
    function uT(e) {
      var t = e.alternate;
      Kt(e);
      var a;
      (e.mode & jt) !== et ? (K_(e), a = qS(t, e, Oo), ug(e, !0)) : a = qS(t, e, Oo), dn(), e.memoizedProps = e.pendingProps, a === null ? sT(e) : An = a, US.current = null;
    }
    function sT(e) {
      var t = e;
      do {
        var a = t.alternate, i = t.return;
        if ((t.flags & ic) === Ze) {
          Kt(t);
          var u = void 0;
          if ((t.mode & jt) === et ? u = Lw(a, t, Oo) : (K_(t), u = Lw(a, t, Oo), ug(t, !1)), dn(), u !== null) {
            An = u;
            return;
          }
        } else {
          var d = SO(a, t);
          if (d !== null) {
            d.flags &= vm, An = d;
            return;
          }
          if ((t.mode & jt) !== et) {
            ug(t, !1);
            for (var m = t.actualDuration, S = t.child; S !== null; )
              m += S.actualDuration, S = S.sibling;
            t.actualDuration = m;
          }
          if (i !== null)
            i.flags |= ic, i.subtreeFlags = Ze, i.deletions = null;
          else {
            Rr = FS, An = null;
            return;
          }
        }
        var C = t.sibling;
        if (C !== null) {
          An = C;
          return;
        }
        t = i, An = t;
      } while (t !== null);
      Rr === xu && (Rr = Xw);
    }
    function tf(e, t, a) {
      var i = Ka(), u = Zr.transition;
      try {
        Zr.transition = null, Wn(Ir), bM(e, t, a, i);
      } finally {
        Zr.transition = u, Wn(i);
      }
      return null;
    }
    function bM(e, t, a, i) {
      do
        ku();
      while (Rs !== null);
      if (FM(), (Lt & (ea | cl)) !== xr)
        throw new Error("Should not already be working.");
      var u = e.finishedWork, d = e.finishedLanes;
      if (Yp(d), u === null)
        return Wp(), null;
      if (d === ve && h("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = ve, u === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = Ut;
      var m = _t(u.lanes, u.childLanes);
      rh(e, m), e === Aa && (Aa = null, An = null, br = ve), ((u.subtreeFlags & xl) !== Ze || (u.flags & xl) !== Ze) && (Zc || (Zc = !0, VS = a, JS(bl, function() {
        return ku(), null;
      })));
      var S = (u.subtreeFlags & (lo | oo | uo | xl)) !== Ze, C = (u.flags & (lo | oo | uo | xl)) !== Ze;
      if (S || C) {
        var k = Zr.transition;
        Zr.transition = null;
        var D = Ka();
        Wn(Ir);
        var B = Lt;
        Lt |= cl, US.current = null, xO(e, u), ew(), jO(e, u, d), PR(e.containerInfo), e.current = u, sc(d), HO(u, e, d), cc(), jp(), Lt = B, Wn(D), Zr.transition = k;
      } else
        e.current = u, ew();
      var j = Zc;
      if (Zc ? (Zc = !1, Rs = e, fv = d) : (Kd = 0, Sg = null), m = e.pendingLanes, m === ve && (Xd = null), j || pT(e.current, !1), Bp(u.stateNode, i), ca && e.memoizedUpdaters.clear(), iM(), ri(e, tr()), t !== null)
        for (var X = e.onRecoverableError, Z = 0; Z < t.length; Z++) {
          var oe = t[Z], Le = oe.stack, nt = oe.digest;
          X(oe.value, {
            componentStack: Le,
            digest: nt
          });
        }
      if (gg) {
        gg = !1;
        var Xe = HS;
        throw HS = null, Xe;
      }
      return da(fv, st) && e.tag !== ys && ku(), m = e.pendingLanes, da(m, st) ? (MD(), e === IS ? dv++ : (dv = 0, IS = e)) : dv = 0, gs(), Wp(), null;
    }
    function ku() {
      if (Rs !== null) {
        var e = Nm(fv), t = xc(qa, e), a = Zr.transition, i = Ka();
        try {
          return Zr.transition = null, Wn(t), kM();
        } finally {
          Wn(i), Zr.transition = a;
        }
      }
      return !1;
    }
    function RM(e) {
      BS.push(e), Zc || (Zc = !0, JS(bl, function() {
        return ku(), null;
      }));
    }
    function kM() {
      if (Rs === null)
        return !1;
      var e = VS;
      VS = null;
      var t = Rs, a = fv;
      if (Rs = null, fv = ve, (Lt & (ea | cl)) !== xr)
        throw new Error("Cannot flush passive effects while already rendering.");
      YS = !0, _g = !1, nu(a);
      var i = Lt;
      Lt |= cl, GO(t.current), IO(t, t.current, a, e);
      {
        var u = BS;
        BS = [];
        for (var d = 0; d < u.length; d++) {
          var m = u[d];
          DO(t, m);
        }
      }
      Qp(), pT(t.current, !0), Lt = i, gs(), _g ? t === Sg ? Kd++ : (Kd = 0, Sg = t) : Kd = 0, YS = !1, _g = !1, Vp(t);
      {
        var S = t.current.stateNode;
        S.effectDuration = 0, S.passiveEffectDuration = 0;
      }
      return !0;
    }
    function cT(e) {
      return Xd !== null && Xd.has(e);
    }
    function DM(e) {
      Xd === null ? Xd = /* @__PURE__ */ new Set([e]) : Xd.add(e);
    }
    function OM(e) {
      gg || (gg = !0, HS = e);
    }
    var MM = OM;
    function fT(e, t, a) {
      var i = Xc(a, t), u = uw(e, i, st), d = Ss(e, u, st), m = za();
      d !== null && (is(d, st, m), ri(d, m));
    }
    function pn(e, t, a) {
      if (CO(a), mv(!1), e.tag === O) {
        fT(e, e, a);
        return;
      }
      var i = null;
      for (i = t; i !== null; ) {
        if (i.tag === O) {
          fT(i, e, a);
          return;
        } else if (i.tag === x) {
          var u = i.type, d = i.stateNode;
          if (typeof u.getDerivedStateFromError == "function" || typeof d.componentDidCatch == "function" && !cT(d)) {
            var m = Xc(a, e), S = vS(i, m, st), C = Ss(i, S, st), k = za();
            C !== null && (is(C, st, k), ri(C, k));
            return;
          }
        }
        i = i.return;
      }
      h(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, a);
    }
    function LM(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t);
      var u = za();
      sd(e, a), BM(e), Aa === e && fu(br, a) && (Rr === lv || Rr === vg && cu(br) && tr() - jS < Kw ? ef(e, ve) : yg = _t(yg, a)), ri(e, u);
    }
    function dT(e, t) {
      t === Ut && (t = dM(e));
      var a = za(), i = ei(e, t);
      i !== null && (is(i, t, a), ri(i, a));
    }
    function NM(e) {
      var t = e.memoizedState, a = Ut;
      t !== null && (a = t.retryLane), dT(e, a);
    }
    function AM(e, t) {
      var a = Ut, i;
      switch (e.tag) {
        case Y:
          i = e.stateNode;
          var u = e.memoizedState;
          u !== null && (a = u.retryLane);
          break;
        case Ke:
          i = e.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      i !== null && i.delete(t), dT(e, a);
    }
    function zM(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : uM(e / 1960) * 1960;
    }
    function UM() {
      if (dv > cM)
        throw dv = 0, IS = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      Kd > fM && (Kd = 0, Sg = null, h("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function FM() {
      zl.flushLegacyContextWarning(), zl.flushPendingUnsafeLifecycleWarnings();
    }
    function pT(e, t) {
      Kt(e), xg(e, io, nM), t && xg(e, Xi, rM), xg(e, io, eM), t && xg(e, Xi, tM), dn();
    }
    function xg(e, t, a) {
      for (var i = e, u = null; i !== null; ) {
        var d = i.subtreeFlags & t;
        i !== u && i.child !== null && d !== Ze ? i = i.child : ((i.flags & t) !== Ze && a(i), i.sibling !== null ? i = i.sibling : i = u = i.return);
      }
    }
    var bg = null;
    function hT(e) {
      {
        if ((Lt & ea) !== xr || !(e.mode & xt))
          return;
        var t = e.tag;
        if (t !== R && t !== O && t !== x && t !== T && t !== Q && t !== fe && t !== ae)
          return;
        var a = pt(e) || "ReactComponent";
        if (bg !== null) {
          if (bg.has(a))
            return;
          bg.add(a);
        } else
          bg = /* @__PURE__ */ new Set([a]);
        var i = mr;
        try {
          Kt(e), h("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          i ? Kt(e) : dn();
        }
      }
    }
    var qS;
    {
      var PM = null;
      qS = function(e, t, a) {
        var i = CT(PM, t);
        try {
          return Rw(e, t, a);
        } catch (d) {
          if (Xk() || d !== null && typeof d == "object" && typeof d.then == "function")
            throw d;
          if (Ny(), D1(), Nw(e, t), CT(t, i), t.mode & jt && K_(t), ao(null, Rw, null, e, t, a), wl()) {
            var u = ac();
            typeof u == "object" && u !== null && u._suppressLogging && typeof d == "object" && d !== null && !d._suppressLogging && (d._suppressLogging = !0);
          }
          throw d;
        }
      };
    }
    var vT = !1, XS;
    XS = /* @__PURE__ */ new Set();
    function jM(e) {
      if (Ii && !kD())
        switch (e.tag) {
          case T:
          case Q:
          case ae: {
            var t = An && pt(An) || "Unknown", a = t;
            if (!XS.has(a)) {
              XS.add(a);
              var i = pt(e) || "Unknown";
              h("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", i, t, t);
            }
            break;
          }
          case x: {
            vT || (h("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), vT = !0);
            break;
          }
        }
    }
    function vv(e, t) {
      if (ca) {
        var a = e.memoizedUpdaters;
        a.forEach(function(i) {
          wc(e, i, t);
        });
      }
    }
    var KS = {};
    function JS(e, t) {
      {
        var a = Il.current;
        return a !== null ? (a.push(t), KS) : Fp(e, t);
      }
    }
    function mT(e) {
      if (e !== KS)
        return ym(e);
    }
    function yT() {
      return Il.current !== null;
    }
    function HM(e) {
      {
        if (e.mode & xt) {
          if (!Qw())
            return;
        } else if (!oM() || Lt !== xr || e.tag !== T && e.tag !== Q && e.tag !== ae)
          return;
        if (Il.current === null) {
          var t = mr;
          try {
            Kt(e), h(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, pt(e));
          } finally {
            t ? Kt(e) : dn();
          }
        }
      }
    }
    function BM(e) {
      e.tag !== ys && Qw() && Il.current === null && h(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function mv(e) {
      eT = e;
    }
    var fl = null, Jd = null, VM = function(e) {
      fl = e;
    };
    function Zd(e) {
      {
        if (fl === null)
          return e;
        var t = fl(e);
        return t === void 0 ? e : t.current;
      }
    }
    function ZS(e) {
      return Zd(e);
    }
    function eE(e) {
      {
        if (fl === null)
          return e;
        var t = fl(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var a = Zd(e.render);
            if (e.render !== a) {
              var i = {
                $$typeof: he,
                render: a
              };
              return e.displayName !== void 0 && (i.displayName = e.displayName), i;
            }
          }
          return e;
        }
        return t.current;
      }
    }
    function gT(e, t) {
      {
        if (fl === null)
          return !1;
        var a = e.elementType, i = t.type, u = !1, d = typeof i == "object" && i !== null ? i.$$typeof : null;
        switch (e.tag) {
          case x: {
            typeof i == "function" && (u = !0);
            break;
          }
          case T: {
            (typeof i == "function" || d === ht) && (u = !0);
            break;
          }
          case Q: {
            (d === he || d === ht) && (u = !0);
            break;
          }
          case fe:
          case ae: {
            (d === yt || d === ht) && (u = !0);
            break;
          }
          default:
            return !1;
        }
        if (u) {
          var m = fl(a);
          if (m !== void 0 && m === fl(i))
            return !0;
        }
        return !1;
      }
    }
    function _T(e) {
      {
        if (fl === null || typeof WeakSet != "function")
          return;
        Jd === null && (Jd = /* @__PURE__ */ new WeakSet()), Jd.add(e);
      }
    }
    var IM = function(e, t) {
      {
        if (fl === null)
          return;
        var a = t.staleFamilies, i = t.updatedFamilies;
        ku(), Ru(function() {
          tE(e.current, i, a);
        });
      }
    }, YM = function(e, t) {
      {
        if (e.context !== Ri)
          return;
        ku(), Ru(function() {
          yv(t, e, null, null);
        });
      }
    };
    function tE(e, t, a) {
      {
        var i = e.alternate, u = e.child, d = e.sibling, m = e.tag, S = e.type, C = null;
        switch (m) {
          case T:
          case ae:
          case x:
            C = S;
            break;
          case Q:
            C = S.render;
            break;
        }
        if (fl === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var k = !1, D = !1;
        if (C !== null) {
          var B = fl(C);
          B !== void 0 && (a.has(B) ? D = !0 : t.has(B) && (m === x ? D = !0 : k = !0));
        }
        if (Jd !== null && (Jd.has(e) || i !== null && Jd.has(i)) && (D = !0), D && (e._debugNeedsRemount = !0), D || k) {
          var j = ei(e, st);
          j !== null && kr(j, e, st, rn);
        }
        u !== null && !D && tE(u, t, a), d !== null && tE(d, t, a);
      }
    }
    var WM = function(e, t) {
      {
        var a = /* @__PURE__ */ new Set(), i = new Set(t.map(function(u) {
          return u.current;
        }));
        return nE(e.current, i, a), a;
      }
    };
    function nE(e, t, a) {
      {
        var i = e.child, u = e.sibling, d = e.tag, m = e.type, S = null;
        switch (d) {
          case T:
          case ae:
          case x:
            S = m;
            break;
          case Q:
            S = m.render;
            break;
        }
        var C = !1;
        S !== null && t.has(S) && (C = !0), C ? $M(e, a) : i !== null && nE(i, t, a), u !== null && nE(u, t, a);
      }
    }
    function $M(e, t) {
      {
        var a = GM(e, t);
        if (a)
          return;
        for (var i = e; ; ) {
          switch (i.tag) {
            case M:
              t.add(i.stateNode);
              return;
            case A:
              t.add(i.stateNode.containerInfo);
              return;
            case O:
              t.add(i.stateNode.containerInfo);
              return;
          }
          if (i.return === null)
            throw new Error("Expected to reach root first.");
          i = i.return;
        }
      }
    }
    function GM(e, t) {
      for (var a = e, i = !1; ; ) {
        if (a.tag === M)
          i = !0, t.add(a.stateNode);
        else if (a.child !== null) {
          a.child.return = a, a = a.child;
          continue;
        }
        if (a === e)
          return i;
        for (; a.sibling === null; ) {
          if (a.return === null || a.return === e)
            return i;
          a = a.return;
        }
        a.sibling.return = a.return, a = a.sibling;
      }
      return !1;
    }
    var rE;
    {
      rE = !1;
      try {
        var ST = Object.preventExtensions({});
      } catch {
        rE = !0;
      }
    }
    function QM(e, t, a, i) {
      this.tag = e, this.key = a, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = i, this.flags = Ze, this.subtreeFlags = Ze, this.deletions = null, this.lanes = ve, this.childLanes = ve, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !rE && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var ki = function(e, t, a, i) {
      return new QM(e, t, a, i);
    };
    function aE(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function qM(e) {
      return typeof e == "function" && !aE(e) && e.defaultProps === void 0;
    }
    function XM(e) {
      if (typeof e == "function")
        return aE(e) ? x : T;
      if (e != null) {
        var t = e.$$typeof;
        if (t === he)
          return Q;
        if (t === yt)
          return fe;
      }
      return R;
    }
    function nf(e, t) {
      var a = e.alternate;
      a === null ? (a = ki(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugSource = e._debugSource, a._debugOwner = e._debugOwner, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = Ze, a.subtreeFlags = Ze, a.deletions = null, a.actualDuration = 0, a.actualStartTime = -1), a.flags = e.flags & Vn, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue;
      var i = e.dependencies;
      switch (a.dependencies = i === null ? null : {
        lanes: i.lanes,
        firstContext: i.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case R:
        case T:
        case ae:
          a.type = Zd(e.type);
          break;
        case x:
          a.type = ZS(e.type);
          break;
        case Q:
          a.type = eE(e.type);
          break;
      }
      return a;
    }
    function KM(e, t) {
      e.flags &= Vn | Sn;
      var a = e.alternate;
      if (a === null)
        e.childLanes = ve, e.lanes = t, e.child = null, e.subtreeFlags = Ze, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = Ze, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type;
        var i = a.dependencies;
        e.dependencies = i === null ? null : {
          lanes: i.lanes,
          firstContext: i.firstContext
        }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration;
      }
      return e;
    }
    function JM(e, t, a) {
      var i;
      return e === wy ? (i = xt, t === !0 && (i |= en, i |= Ht)) : i = et, ca && (i |= jt), ki(O, null, null, i);
    }
    function iE(e, t, a, i, u, d) {
      var m = R, S = e;
      if (typeof e == "function")
        aE(e) ? (m = x, S = ZS(S)) : S = Zd(S);
      else if (typeof e == "string")
        m = M;
      else
        e: switch (e) {
          case ji:
            return Os(a.children, u, d, t);
          case pi:
            m = I, u |= en, (u & xt) !== et && (u |= Ht);
            break;
          case Hi:
            return ZM(a, u, d, t);
          case Oe:
            return eL(a, u, d, t);
          case je:
            return tL(a, u, d, t);
          case kn:
            return ET(a, u, d, t);
          case on:
          case bt:
          case fn:
          case vr:
          case Tt:
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case Bi:
                  m = ee;
                  break e;
                case U:
                  m = ne;
                  break e;
                case he:
                  m = Q, S = eE(S);
                  break e;
                case yt:
                  m = fe;
                  break e;
                case ht:
                  m = ge, S = null;
                  break e;
              }
            var C = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (C += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var k = i ? pt(i) : null;
              k && (C += `

Check the render method of \`` + k + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + C));
          }
        }
      var D = ki(m, a, t, u);
      return D.elementType = e, D.type = S, D.lanes = d, D._debugOwner = i, D;
    }
    function lE(e, t, a) {
      var i = null;
      i = e._owner;
      var u = e.type, d = e.key, m = e.props, S = iE(u, d, m, i, t, a);
      return S._debugSource = e._source, S._debugOwner = e._owner, S;
    }
    function Os(e, t, a, i) {
      var u = ki(L, e, i, t);
      return u.lanes = a, u;
    }
    function ZM(e, t, a, i) {
      typeof e.id != "string" && h('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var u = ki(ie, e, i, t | jt);
      return u.elementType = Hi, u.lanes = a, u.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, u;
    }
    function eL(e, t, a, i) {
      var u = ki(Y, e, i, t);
      return u.elementType = Oe, u.lanes = a, u;
    }
    function tL(e, t, a, i) {
      var u = ki(Ke, e, i, t);
      return u.elementType = je, u.lanes = a, u;
    }
    function ET(e, t, a, i) {
      var u = ki(be, e, i, t);
      u.elementType = kn, u.lanes = a;
      var d = {
        isHidden: !1
      };
      return u.stateNode = d, u;
    }
    function oE(e, t, a) {
      var i = ki(V, e, null, t);
      return i.lanes = a, i;
    }
    function nL() {
      var e = ki(M, null, null, et);
      return e.elementType = "DELETED", e;
    }
    function rL(e) {
      var t = ki(Ie, null, null, et);
      return t.stateNode = e, t;
    }
    function uE(e, t, a) {
      var i = e.children !== null ? e.children : [], u = ki(A, i, e.key, t);
      return u.lanes = a, u.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, u;
    }
    function CT(e, t) {
      return e === null && (e = ki(R, null, null, et)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function aL(e, t, a, i, u) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = I0, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Ut, this.eventTimes = Cc(ve), this.expirationTimes = Cc(rn), this.pendingLanes = ve, this.suspendedLanes = ve, this.pingedLanes = ve, this.expiredLanes = ve, this.mutableReadLanes = ve, this.finishedLanes = ve, this.entangledLanes = ve, this.entanglements = Cc(ve), this.identifierPrefix = i, this.onRecoverableError = u, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var d = this.pendingUpdatersLaneMap = [], m = 0; m < au; m++)
          d.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case wy:
          this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
          break;
        case ys:
          this._debugRootType = a ? "hydrate()" : "render()";
          break;
      }
    }
    function wT(e, t, a, i, u, d, m, S, C, k) {
      var D = new aL(e, t, a, S, C), B = JM(t, d);
      D.current = B, B.stateNode = D;
      {
        var j = {
          element: i,
          isDehydrated: a,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        B.memoizedState = j;
      }
      return E_(B), D;
    }
    var sE = "18.3.1";
    function iL(e, t, a) {
      var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return ra(i), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: hr,
        key: i == null ? null : "" + i,
        children: e,
        containerInfo: t,
        implementation: a
      };
    }
    var cE, fE;
    cE = !1, fE = {};
    function TT(e) {
      if (!e)
        return Ri;
      var t = Zu(e), a = Bk(t);
      if (t.tag === x) {
        var i = t.type;
        if (wo(i))
          return KC(t, i, a);
      }
      return a;
    }
    function lL(e, t) {
      {
        var a = Zu(e);
        if (a === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var i = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + i);
        }
        var u = ua(a);
        if (u === null)
          return null;
        if (u.mode & en) {
          var d = pt(a) || "Component";
          if (!fE[d]) {
            fE[d] = !0;
            var m = mr;
            try {
              Kt(u), a.mode & en ? h("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, d) : h("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, d);
            } finally {
              m ? Kt(m) : dn();
            }
          }
        }
        return u.stateNode;
      }
    }
    function xT(e, t, a, i, u, d, m, S) {
      var C = !1, k = null;
      return wT(e, t, C, k, a, i, u, d, m);
    }
    function bT(e, t, a, i, u, d, m, S, C, k) {
      var D = !0, B = wT(a, i, D, e, u, d, m, S, C);
      B.context = TT(null);
      var j = B.current, X = za(), Z = ks(j), oe = wu(X, Z);
      return oe.callback = t ?? null, Ss(j, oe, Z), pM(B, Z, X), B;
    }
    function yv(e, t, a, i) {
      Hp(t, e);
      var u = t.current, d = za(), m = ks(u);
      Cn(m);
      var S = TT(a);
      t.context === null ? t.context = S : t.pendingContext = S, Ii && mr !== null && !cE && (cE = !0, h(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, pt(mr) || "Unknown"));
      var C = wu(d, m);
      C.payload = {
        element: e
      }, i = i === void 0 ? null : i, i !== null && (typeof i != "function" && h("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", i), C.callback = i);
      var k = Ss(u, C, m);
      return k !== null && (kr(k, u, m, d), Py(k, u, m)), m;
    }
    function Rg(e) {
      var t = e.current;
      if (!t.child)
        return null;
      switch (t.child.tag) {
        case M:
          return t.child.stateNode;
        default:
          return t.child.stateNode;
      }
    }
    function oL(e) {
      switch (e.tag) {
        case O: {
          var t = e.stateNode;
          if (fd(t)) {
            var a = wm(t);
            yM(t, a);
          }
          break;
        }
        case Y: {
          Ru(function() {
            var u = ei(e, st);
            if (u !== null) {
              var d = za();
              kr(u, e, st, d);
            }
          });
          var i = st;
          dE(e, i);
          break;
        }
      }
    }
    function RT(e, t) {
      var a = e.memoizedState;
      a !== null && a.dehydrated !== null && (a.retryLane = km(a.retryLane, t));
    }
    function dE(e, t) {
      RT(e, t);
      var a = e.alternate;
      a && RT(a, t);
    }
    function uL(e) {
      if (e.tag === Y) {
        var t = mc, a = ei(e, t);
        if (a !== null) {
          var i = za();
          kr(a, e, t, i);
        }
        dE(e, t);
      }
    }
    function sL(e) {
      if (e.tag === Y) {
        var t = ks(e), a = ei(e, t);
        if (a !== null) {
          var i = za();
          kr(a, e, t, i);
        }
        dE(e, t);
      }
    }
    function kT(e) {
      var t = mn(e);
      return t === null ? null : t.stateNode;
    }
    var DT = function(e) {
      return null;
    };
    function cL(e) {
      return DT(e);
    }
    var OT = function(e) {
      return !1;
    };
    function fL(e) {
      return OT(e);
    }
    var MT = null, LT = null, NT = null, AT = null, zT = null, UT = null, FT = null, PT = null, jT = null;
    {
      var HT = function(e, t, a) {
        var i = t[a], u = Ct(e) ? e.slice() : St({}, e);
        return a + 1 === t.length ? (Ct(u) ? u.splice(i, 1) : delete u[i], u) : (u[i] = HT(e[i], t, a + 1), u);
      }, BT = function(e, t) {
        return HT(e, t, 0);
      }, VT = function(e, t, a, i) {
        var u = t[i], d = Ct(e) ? e.slice() : St({}, e);
        if (i + 1 === t.length) {
          var m = a[i];
          d[m] = d[u], Ct(d) ? d.splice(u, 1) : delete d[u];
        } else
          d[u] = VT(
            // $FlowFixMe number or string is fine here
            e[u],
            t,
            a,
            i + 1
          );
        return d;
      }, IT = function(e, t, a) {
        if (t.length !== a.length) {
          y("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var i = 0; i < a.length - 1; i++)
            if (t[i] !== a[i]) {
              y("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return VT(e, t, a, 0);
      }, YT = function(e, t, a, i) {
        if (a >= t.length)
          return i;
        var u = t[a], d = Ct(e) ? e.slice() : St({}, e);
        return d[u] = YT(e[u], t, a + 1, i), d;
      }, WT = function(e, t, a) {
        return YT(e, t, 0, a);
      }, pE = function(e, t) {
        for (var a = e.memoizedState; a !== null && t > 0; )
          a = a.next, t--;
        return a;
      };
      MT = function(e, t, a, i) {
        var u = pE(e, t);
        if (u !== null) {
          var d = WT(u.memoizedState, a, i);
          u.memoizedState = d, u.baseState = d, e.memoizedProps = St({}, e.memoizedProps);
          var m = ei(e, st);
          m !== null && kr(m, e, st, rn);
        }
      }, LT = function(e, t, a) {
        var i = pE(e, t);
        if (i !== null) {
          var u = BT(i.memoizedState, a);
          i.memoizedState = u, i.baseState = u, e.memoizedProps = St({}, e.memoizedProps);
          var d = ei(e, st);
          d !== null && kr(d, e, st, rn);
        }
      }, NT = function(e, t, a, i) {
        var u = pE(e, t);
        if (u !== null) {
          var d = IT(u.memoizedState, a, i);
          u.memoizedState = d, u.baseState = d, e.memoizedProps = St({}, e.memoizedProps);
          var m = ei(e, st);
          m !== null && kr(m, e, st, rn);
        }
      }, AT = function(e, t, a) {
        e.pendingProps = WT(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = ei(e, st);
        i !== null && kr(i, e, st, rn);
      }, zT = function(e, t) {
        e.pendingProps = BT(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var a = ei(e, st);
        a !== null && kr(a, e, st, rn);
      }, UT = function(e, t, a) {
        e.pendingProps = IT(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = ei(e, st);
        i !== null && kr(i, e, st, rn);
      }, FT = function(e) {
        var t = ei(e, st);
        t !== null && kr(t, e, st, rn);
      }, PT = function(e) {
        DT = e;
      }, jT = function(e) {
        OT = e;
      };
    }
    function dL(e) {
      var t = ua(e);
      return t === null ? null : t.stateNode;
    }
    function pL(e) {
      return null;
    }
    function hL() {
      return mr;
    }
    function vL(e) {
      var t = e.findFiberByHostInstance, a = s.ReactCurrentDispatcher;
      return ns({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: MT,
        overrideHookStateDeletePath: LT,
        overrideHookStateRenamePath: NT,
        overrideProps: AT,
        overridePropsDeletePath: zT,
        overridePropsRenamePath: UT,
        setErrorHandler: PT,
        setSuspenseHandler: jT,
        scheduleUpdate: FT,
        currentDispatcherRef: a,
        findHostInstanceByFiber: dL,
        findFiberByHostInstance: t || pL,
        // React Refresh
        findHostInstancesForRefresh: WM,
        scheduleRefresh: IM,
        scheduleRoot: YM,
        setRefreshHandler: VM,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: hL,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: sE
      });
    }
    var $T = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function hE(e) {
      this._internalRoot = e;
    }
    kg.prototype.render = hE.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? h("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : Dg(arguments[1]) ? h("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && h("You passed a second argument to root.render(...) but it only accepts one argument.");
        var a = t.containerInfo;
        if (a.nodeType !== Hn) {
          var i = kT(t.current);
          i && i.parentNode !== a && h("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      yv(e, t, null, null);
    }, kg.prototype.unmount = hE.prototype.unmount = function() {
      typeof arguments[0] == "function" && h("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        aT() && h("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Ru(function() {
          yv(null, e, null, null);
        }), $C(t);
      }
    };
    function mL(e, t) {
      if (!Dg(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      GT(e);
      var a = !1, i = !1, u = "", d = $T;
      t != null && (t.hydrate ? y("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === jr && h(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (u = t.identifierPrefix), t.onRecoverableError !== void 0 && (d = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var m = xT(e, wy, null, a, i, u, d);
      my(m.current, e);
      var S = e.nodeType === Hn ? e.parentNode : e;
      return wh(S), new hE(m);
    }
    function kg(e) {
      this._internalRoot = e;
    }
    function yL(e) {
      e && Pm(e);
    }
    kg.prototype.unstable_scheduleHydration = yL;
    function gL(e, t, a) {
      if (!Dg(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      GT(e), t === void 0 && h("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var i = a ?? null, u = a != null && a.hydratedSources || null, d = !1, m = !1, S = "", C = $T;
      a != null && (a.unstable_strictMode === !0 && (d = !0), a.identifierPrefix !== void 0 && (S = a.identifierPrefix), a.onRecoverableError !== void 0 && (C = a.onRecoverableError));
      var k = bT(t, null, e, wy, i, d, m, S, C);
      if (my(k.current, e), wh(e), u)
        for (var D = 0; D < u.length; D++) {
          var B = u[D];
          CD(k, B);
        }
      return new kg(k);
    }
    function Dg(e) {
      return !!(e && (e.nodeType === ia || e.nodeType === Cl || e.nodeType === xp));
    }
    function gv(e) {
      return !!(e && (e.nodeType === ia || e.nodeType === Cl || e.nodeType === xp || e.nodeType === Hn && e.nodeValue === " react-mount-point-unstable "));
    }
    function GT(e) {
      e.nodeType === ia && e.tagName && e.tagName.toUpperCase() === "BODY" && h("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), Ah(e) && (e._reactRootContainer ? h("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : h("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var _L = s.ReactCurrentOwner, QT;
    QT = function(e) {
      if (e._reactRootContainer && e.nodeType !== Hn) {
        var t = kT(e._reactRootContainer.current);
        t && t.parentNode !== e && h("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var a = !!e._reactRootContainer, i = vE(e), u = !!(i && vs(i));
      u && !a && h("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === ia && e.tagName && e.tagName.toUpperCase() === "BODY" && h("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function vE(e) {
      return e ? e.nodeType === Cl ? e.documentElement : e.firstChild : null;
    }
    function qT() {
    }
    function SL(e, t, a, i, u) {
      if (u) {
        if (typeof i == "function") {
          var d = i;
          i = function() {
            var j = Rg(m);
            d.call(j);
          };
        }
        var m = bT(
          t,
          i,
          e,
          ys,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          qT
        );
        e._reactRootContainer = m, my(m.current, e);
        var S = e.nodeType === Hn ? e.parentNode : e;
        return wh(S), Ru(), m;
      } else {
        for (var C; C = e.lastChild; )
          e.removeChild(C);
        if (typeof i == "function") {
          var k = i;
          i = function() {
            var j = Rg(D);
            k.call(j);
          };
        }
        var D = xT(
          e,
          ys,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          qT
        );
        e._reactRootContainer = D, my(D.current, e);
        var B = e.nodeType === Hn ? e.parentNode : e;
        return wh(B), Ru(function() {
          yv(t, D, a, i);
        }), D;
      }
    }
    function EL(e, t) {
      e !== null && typeof e != "function" && h("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function Og(e, t, a, i, u) {
      QT(a), EL(u === void 0 ? null : u, "render");
      var d = a._reactRootContainer, m;
      if (!d)
        m = SL(a, t, e, u, i);
      else {
        if (m = d, typeof u == "function") {
          var S = u;
          u = function() {
            var C = Rg(m);
            S.call(C);
          };
        }
        yv(t, m, e, u);
      }
      return Rg(m);
    }
    var XT = !1;
    function CL(e) {
      {
        XT || (XT = !0, h("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var t = _L.current;
        if (t !== null && t.stateNode !== null) {
          var a = t.stateNode._warnedAboutRefsInRender;
          a || h("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", At(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === ia ? e : lL(e, "findDOMNode");
    }
    function wL(e, t, a) {
      if (h("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !gv(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = Ah(t) && t._reactRootContainer === void 0;
        i && h("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return Og(null, e, t, !0, a);
    }
    function TL(e, t, a) {
      if (h("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !gv(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = Ah(t) && t._reactRootContainer === void 0;
        i && h("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return Og(null, e, t, !1, a);
    }
    function xL(e, t, a, i) {
      if (h("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !gv(a))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !d0(e))
        throw new Error("parentComponent must be a valid React Component");
      return Og(e, t, a, !1, i);
    }
    var KT = !1;
    function bL(e) {
      if (KT || (KT = !0, h("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !gv(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = Ah(e) && e._reactRootContainer === void 0;
        t && h("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var a = vE(e), i = a && !vs(a);
          i && h("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return Ru(function() {
          Og(null, null, e, !1, function() {
            e._reactRootContainer = null, $C(e);
          });
        }), !0;
      } else {
        {
          var u = vE(e), d = !!(u && vs(u)), m = e.nodeType === ia && gv(e.parentNode) && !!e.parentNode._reactRootContainer;
          d && h("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", m ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    Ar(oL), ls(uL), Am(sL), Rc(Ka), lh(Mm), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && h("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), kf(kR), f0($S, gM, Ru);
    function RL(e, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!Dg(t))
        throw new Error("Target container is not a DOM element.");
      return iL(e, t, null, a);
    }
    function kL(e, t, a, i) {
      return xL(e, t, a, i);
    }
    var mE = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [vs, Od, yy, qu, Df, $S]
    };
    function DL(e, t) {
      return mE.usingClientEntryPoint || h('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), mL(e, t);
    }
    function OL(e, t, a) {
      return mE.usingClientEntryPoint || h('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), gL(e, t, a);
    }
    function ML(e) {
      return aT() && h("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Ru(e);
    }
    var LL = vL({
      findFiberByHostInstance: Bc,
      bundleType: 1,
      version: sE,
      rendererPackageName: "react-dom"
    });
    if (!LL && Pn && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var JT = window.location.protocol;
      /^(https?|file):$/.test(JT) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (JT === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    ii.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = mE, ii.createPortal = RL, ii.createRoot = DL, ii.findDOMNode = CL, ii.flushSync = ML, ii.hydrate = wL, ii.hydrateRoot = OL, ii.render = TL, ii.unmountComponentAtNode = bL, ii.unstable_batchedUpdates = $S, ii.unstable_renderSubtreeIntoContainer = kL, ii.version = sE, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), ii;
}
function $x() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
    if (process.env.NODE_ENV !== "production")
      throw new Error("^_^");
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE($x);
    } catch (_) {
      console.error(_);
    }
  }
}
process.env.NODE_ENV === "production" ? ($x(), AE.exports = sN()) : AE.exports = cN();
var fN = AE.exports, Dv, Ng = fN;
if (process.env.NODE_ENV === "production")
  Dv = Ng.createRoot, Ng.hydrateRoot;
else {
  var yx = Ng.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  Dv = function(_, l) {
    yx.usingClientEntryPoint = !0;
    try {
      return Ng.createRoot(_, l);
    } finally {
      yx.usingClientEntryPoint = !1;
    }
  };
}
var Yt = Pv();
const dN = async (_, l) => {
  const s = await fetch(_);
  if (!s.ok)
    throw new Error(`Failed to load template: ${_}`);
  return (await s.text()).replace(/\{BASE_PATH\}/g, l);
}, pN = ({ path: _, basePath: l, onLoaded: s }) => {
  const [f, p] = Yt.useState("");
  return Yt.useEffect(() => {
    let y = !0;
    return (async () => {
      try {
        const E = await dN(_, l);
        if (!y)
          return;
        p(E), s == null || s();
      } catch (E) {
        console.error("[ShellRuntime] template load failed", E);
      }
    })().catch(() => {
    }), () => {
      y = !1;
    };
  }, [_, l, s]), /* @__PURE__ */ Ye.jsx("div", { dangerouslySetInnerHTML: { __html: f } });
}, Xg = () => {
  typeof console < "u" && console.log("Footer interaction initialized");
}, gx = /* @__PURE__ */ new Map(), jg = (_, l, s) => {
  const f = document.getElementById(_);
  if (!f)
    return;
  const p = gx.get(_);
  p && p.unmount();
  const y = Dv(f);
  gx.set(_, y), y.render(
    /* @__PURE__ */ Ye.jsx(
      pN,
      {
        path: l,
        basePath: JE(),
        onLoaded: () => {
          Promise.resolve(s == null ? void 0 : s()).catch((h) => {
            console.error("[ShellRuntime] onLoaded failed", h);
          });
        }
      }
    )
  );
}, Hg = (_) => {
  document.dispatchEvent(new Event(_));
}, Bg = () => {
  const _ = window.lucide;
  _ != null && _.createIcons && _.createIcons();
}, hN = async () => {
  const _ = Yl("components/layout/header/main_header.html"), l = Yl("components/layout/footer/main_footer.html");
  jg("main-header-placeholder", _, async () => {
    Fv(), Bg(), Hg("mainHeaderLoaded");
  }), jg("main-footer-placeholder", l, async () => {
    Xg(), Bg(), Hg("mainFooterLoaded");
  });
}, vN = async () => {
  const _ = Yl("components/layout/header/header.html"), l = Yl("components/layout/footer/footer.html");
  jg("hotel-header-placeholder", _, async () => {
    Fv(), Bg(), Hg("mainHeaderLoaded");
  }), jg("hotel-footer-placeholder", l, async () => {
    Xg(), Bg(), Hg("mainFooterLoaded");
  });
};
class mN {
  constructor() {
    tp(this, "isInitialized", !1);
    tp(this, "isOpen", !1);
    tp(this, "backdrop", null);
    tp(this, "panel", null);
    tp(this, "closeButton", null);
  }
  async ensureMarkup() {
    if (this.isInitialized)
      return;
    const l = new URL("components/ui/reservation_drawer/drawer.css", Yl("./")).href;
    if (!Array.from(document.querySelectorAll("link")).some((E) => E.href === l)) {
      const E = document.createElement("link");
      E.rel = "stylesheet", E.href = l, document.head.appendChild(E);
    }
    const f = Yl("components/ui/reservation_drawer/drawer.html"), y = await (await fetch(f)).text();
    if (!document.getElementById("reservation-drawer-container")) {
      const E = document.createElement("div");
      E.id = "reservation-drawer-container", E.innerHTML = y, document.body.appendChild(E);
    }
    this.backdrop = document.getElementById("resDrawerBackdrop"), this.panel = document.getElementById("resDrawerPanel"), this.closeButton = document.getElementById("resDrawerClose"), this.bindEvents(), this.isInitialized = !0;
  }
  bindEvents() {
    if (!this.backdrop || !this.panel || !this.closeButton)
      return;
    this.closeButton.addEventListener("click", () => this.close()), this.backdrop.addEventListener("click", () => this.close()), window.addEventListener("popstate", (s) => {
      const f = s.state;
      this.isOpen && (f == null ? void 0 : f.modal) !== "reservation" && this.close(!0);
    }), document.addEventListener("keydown", (s) => {
      s.key === "Escape" && this.isOpen && this.close();
    });
    const l = document.getElementById("resDrawerForm");
    l && l.addEventListener("submit", (s) => {
      s.preventDefault(), alert("예약 API 연동 전 임시 폼 상태");
    }), this.panel.addEventListener("click", (s) => {
      var p;
      ((p = s.target) == null ? void 0 : p.closest("[data-route]")) && this.close();
    });
  }
  async open() {
    await this.ensureMarkup(), !(this.isOpen || !this.backdrop || !this.panel) && (this.isOpen = !0, history.pushState({ modal: "reservation" }, "", "#reservation"), this.backdrop.offsetHeight, requestAnimationFrame(() => {
      var l, s;
      (l = this.backdrop) == null || l.classList.add("active"), (s = this.panel) == null || s.classList.add("active");
    }), document.body.style.overflow = "hidden");
  }
  close(l = !1) {
    var s, f, p;
    this.isOpen && (this.isOpen = !1, (s = this.backdrop) == null || s.classList.remove("active"), (f = this.panel) == null || f.classList.remove("active"), document.body.style.overflow = "", !l && ((p = history.state) == null ? void 0 : p.modal) === "reservation" && history.back());
  }
}
const Kg = new mN();
function Ou(_) {
  if (_ === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return _;
}
function Gx(_, l) {
  _.prototype = Object.create(l.prototype), _.prototype.constructor = _, _.__proto__ = l;
}
/*!
 * GSAP 3.14.2
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Ai = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, sp = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, eC, na, xn, pl = 1e8, vn = 1 / pl, zE = Math.PI * 2, yN = zE / 4, gN = 0, Qx = Math.sqrt, _N = Math.cos, SN = Math.sin, Ur = function(l) {
  return typeof l == "string";
}, qn = function(l) {
  return typeof l == "function";
}, Lu = function(l) {
  return typeof l == "number";
}, tC = function(l) {
  return typeof l > "u";
}, zo = function(l) {
  return typeof l == "object";
}, li = function(l) {
  return l !== !1;
}, nC = function() {
  return typeof window < "u";
}, Ag = function(l) {
  return qn(l) || Ur(l);
}, qx = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, Ca = Array.isArray, EN = /random\([^)]+\)/g, CN = /,\s*/g, _x = /(?:-?\.?\d|\.)+/gi, Xx = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, ap = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, SE = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Kx = /[+-]=-?[.\d]+/, wN = /[^,'"\[\]\s]+/gi, TN = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, Un, Lo, UE, rC, zi = {}, Vg = {}, Jx, Zx = function(l) {
  return (Vg = cp(l, zi)) && ci;
}, aC = function(l, s) {
  return console.warn("Invalid property", l, "set to", s, "Missing plugin? gsap.registerPlugin()");
}, Ov = function(l, s) {
  return !s && console.warn(l);
}, eb = function(l, s) {
  return l && (zi[l] = s) && Vg && (Vg[l] = s) || zi;
}, Mv = function() {
  return 0;
}, xN = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, Ug = {
  suppressEvents: !0,
  kill: !1
}, bN = {
  suppressEvents: !0
}, iC = {}, Us = [], FE = {}, tb, Oi = {}, EE = {}, Sx = 30, Fg = [], lC = "", oC = function(l) {
  var s = l[0], f, p;
  if (zo(s) || qn(s) || (l = [l]), !(f = (s._gsap || {}).harness)) {
    for (p = Fg.length; p-- && !Fg[p].targetTest(s); )
      ;
    f = Fg[p];
  }
  for (p = l.length; p--; )
    l[p] && (l[p]._gsap || (l[p]._gsap = new xb(l[p], f))) || l.splice(p, 1);
  return l;
}, cf = function(l) {
  return l._gsap || oC(hl(l))[0]._gsap;
}, nb = function(l, s, f) {
  return (f = l[s]) && qn(f) ? l[s]() : tC(f) && l.getAttribute && l.getAttribute(s) || f;
}, oi = function(l, s) {
  return (l = l.split(",")).forEach(s) || l;
}, ar = function(l) {
  return Math.round(l * 1e5) / 1e5 || 0;
}, zn = function(l) {
  return Math.round(l * 1e7) / 1e7 || 0;
}, lp = function(l, s) {
  var f = s.charAt(0), p = parseFloat(s.substr(2));
  return l = parseFloat(l), f === "+" ? l + p : f === "-" ? l - p : f === "*" ? l * p : l / p;
}, RN = function(l, s) {
  for (var f = s.length, p = 0; l.indexOf(s[p]) < 0 && ++p < f; )
    ;
  return p < f;
}, Ig = function() {
  var l = Us.length, s = Us.slice(0), f, p;
  for (FE = {}, Us.length = 0, f = 0; f < l; f++)
    p = s[f], p && p._lazy && (p.render(p._lazy[0], p._lazy[1], !0)._lazy = 0);
}, uC = function(l) {
  return !!(l._initted || l._startAt || l.add);
}, rb = function(l, s, f, p) {
  Us.length && !na && Ig(), l.render(s, f, !!(na && s < 0 && uC(l))), Us.length && !na && Ig();
}, ab = function(l) {
  var s = parseFloat(l);
  return (s || s === 0) && (l + "").match(wN).length < 2 ? s : Ur(l) ? l.trim() : l;
}, ib = function(l) {
  return l;
}, Ui = function(l, s) {
  for (var f in s)
    f in l || (l[f] = s[f]);
  return l;
}, kN = function(l) {
  return function(s, f) {
    for (var p in f)
      p in s || p === "duration" && l || p === "ease" || (s[p] = f[p]);
  };
}, cp = function(l, s) {
  for (var f in s)
    l[f] = s[f];
  return l;
}, Ex = function _(l, s) {
  for (var f in s)
    f !== "__proto__" && f !== "constructor" && f !== "prototype" && (l[f] = zo(s[f]) ? _(l[f] || (l[f] = {}), s[f]) : s[f]);
  return l;
}, Yg = function(l, s) {
  var f = {}, p;
  for (p in l)
    p in s || (f[p] = l[p]);
  return f;
}, bv = function(l) {
  var s = l.parent || Un, f = l.keyframes ? kN(Ca(l.keyframes)) : Ui;
  if (li(l.inherit))
    for (; s; )
      f(l, s.vars.defaults), s = s.parent || s._dp;
  return l;
}, DN = function(l, s) {
  for (var f = l.length, p = f === s.length; p && f-- && l[f] === s[f]; )
    ;
  return f < 0;
}, lb = function(l, s, f, p, y) {
  var h = l[p], E;
  if (y)
    for (E = s[y]; h && h[y] > E; )
      h = h._prev;
  return h ? (s._next = h._next, h._next = s) : (s._next = l[f], l[f] = s), s._next ? s._next._prev = s : l[p] = s, s._prev = h, s.parent = s._dp = l, s;
}, Jg = function(l, s, f, p) {
  f === void 0 && (f = "_first"), p === void 0 && (p = "_last");
  var y = s._prev, h = s._next;
  y ? y._next = h : l[f] === s && (l[f] = h), h ? h._prev = y : l[p] === s && (l[p] = y), s._next = s._prev = s.parent = null;
}, Ps = function(l, s) {
  l.parent && (!s || l.parent.autoRemoveChildren) && l.parent.remove && l.parent.remove(l), l._act = 0;
}, ff = function(l, s) {
  if (l && (!s || s._end > l._dur || s._start < 0))
    for (var f = l; f; )
      f._dirty = 1, f = f.parent;
  return l;
}, ON = function(l) {
  for (var s = l.parent; s && s.parent; )
    s._dirty = 1, s.totalDuration(), s = s.parent;
  return l;
}, PE = function(l, s, f, p) {
  return l._startAt && (na ? l._startAt.revert(Ug) : l.vars.immediateRender && !l.vars.autoRevert || l._startAt.render(s, !0, p));
}, MN = function _(l) {
  return !l || l._ts && _(l.parent);
}, Cx = function(l) {
  return l._repeat ? fp(l._tTime, l = l.duration() + l._rDelay) * l : 0;
}, fp = function(l, s) {
  var f = Math.floor(l = zn(l / s));
  return l && f === l ? f - 1 : f;
}, Wg = function(l, s) {
  return (l - s._start) * s._ts + (s._ts >= 0 ? 0 : s._dirty ? s.totalDuration() : s._tDur);
}, Zg = function(l) {
  return l._end = zn(l._start + (l._tDur / Math.abs(l._ts || l._rts || vn) || 0));
}, e0 = function(l, s) {
  var f = l._dp;
  return f && f.smoothChildTiming && l._ts && (l._start = zn(f._time - (l._ts > 0 ? s / l._ts : ((l._dirty ? l.totalDuration() : l._tDur) - s) / -l._ts)), Zg(l), f._dirty || ff(f, l)), l;
}, ob = function(l, s) {
  var f;
  if ((s._time || !s._dur && s._initted || s._start < l._time && (s._dur || !s.add)) && (f = Wg(l.rawTime(), s), (!s._dur || jv(0, s.totalDuration(), f) - s._tTime > vn) && s.render(f, !0)), ff(l, s)._dp && l._initted && l._time >= l._dur && l._ts) {
    if (l._dur < l.duration())
      for (f = l; f._dp; )
        f.rawTime() >= 0 && f.totalTime(f._tTime), f = f._dp;
    l._zTime = -vn;
  }
}, No = function(l, s, f, p) {
  return s.parent && Ps(s), s._start = zn((Lu(f) ? f : f || l !== Un ? dl(l, f, s) : l._time) + s._delay), s._end = zn(s._start + (s.totalDuration() / Math.abs(s.timeScale()) || 0)), lb(l, s, "_first", "_last", l._sort ? "_start" : 0), jE(s) || (l._recent = s), p || ob(l, s), l._ts < 0 && e0(l, l._tTime), l;
}, ub = function(l, s) {
  return (zi.ScrollTrigger || aC("scrollTrigger", s)) && zi.ScrollTrigger.create(s, l);
}, sb = function(l, s, f, p, y) {
  if (cC(l, s, y), !l._initted)
    return 1;
  if (!f && l._pt && !na && (l._dur && l.vars.lazy !== !1 || !l._dur && l.vars.lazy) && tb !== Mi.frame)
    return Us.push(l), l._lazy = [y, p], 1;
}, LN = function _(l) {
  var s = l.parent;
  return s && s._ts && s._initted && !s._lock && (s.rawTime() < 0 || _(s));
}, jE = function(l) {
  var s = l.data;
  return s === "isFromStart" || s === "isStart";
}, NN = function(l, s, f, p) {
  var y = l.ratio, h = s < 0 || !s && (!l._start && LN(l) && !(!l._initted && jE(l)) || (l._ts < 0 || l._dp._ts < 0) && !jE(l)) ? 0 : 1, E = l._rDelay, T = 0, x, R, O;
  if (E && l._repeat && (T = jv(0, l._tDur, s), R = fp(T, E), l._yoyo && R & 1 && (h = 1 - h), R !== fp(l._tTime, E) && (y = 1 - h, l.vars.repeatRefresh && l._initted && l.invalidate())), h !== y || na || p || l._zTime === vn || !s && l._zTime) {
    if (!l._initted && sb(l, s, p, f, T))
      return;
    for (O = l._zTime, l._zTime = s || (f ? vn : 0), f || (f = s && !O), l.ratio = h, l._from && (h = 1 - h), l._time = 0, l._tTime = T, x = l._pt; x; )
      x.r(h, x.d), x = x._next;
    s < 0 && PE(l, s, f, !0), l._onUpdate && !f && Li(l, "onUpdate"), T && l._repeat && !f && l.parent && Li(l, "onRepeat"), (s >= l._tDur || s < 0) && l.ratio === h && (h && Ps(l, 1), !f && !na && (Li(l, h ? "onComplete" : "onReverseComplete", !0), l._prom && l._prom()));
  } else l._zTime || (l._zTime = s);
}, AN = function(l, s, f) {
  var p;
  if (f > s)
    for (p = l._first; p && p._start <= f; ) {
      if (p.data === "isPause" && p._start > s)
        return p;
      p = p._next;
    }
  else
    for (p = l._last; p && p._start >= f; ) {
      if (p.data === "isPause" && p._start < s)
        return p;
      p = p._prev;
    }
}, dp = function(l, s, f, p) {
  var y = l._repeat, h = zn(s) || 0, E = l._tTime / l._tDur;
  return E && !p && (l._time *= h / l._dur), l._dur = h, l._tDur = y ? y < 0 ? 1e10 : zn(h * (y + 1) + l._rDelay * y) : h, E > 0 && !p && e0(l, l._tTime = l._tDur * E), l.parent && Zg(l), f || ff(l.parent, l), l;
}, wx = function(l) {
  return l instanceof Pa ? ff(l) : dp(l, l._dur);
}, zN = {
  _start: 0,
  endTime: Mv,
  totalDuration: Mv
}, dl = function _(l, s, f) {
  var p = l.labels, y = l._recent || zN, h = l.duration() >= pl ? y.endTime(!1) : l._dur, E, T, x;
  return Ur(s) && (isNaN(s) || s in p) ? (T = s.charAt(0), x = s.substr(-1) === "%", E = s.indexOf("="), T === "<" || T === ">" ? (E >= 0 && (s = s.replace(/=/, "")), (T === "<" ? y._start : y.endTime(y._repeat >= 0)) + (parseFloat(s.substr(1)) || 0) * (x ? (E < 0 ? y : f).totalDuration() / 100 : 1)) : E < 0 ? (s in p || (p[s] = h), p[s]) : (T = parseFloat(s.charAt(E - 1) + s.substr(E + 1)), x && f && (T = T / 100 * (Ca(f) ? f[0] : f).totalDuration()), E > 1 ? _(l, s.substr(0, E - 1), f) + T : h + T)) : s == null ? h : +s;
}, Rv = function(l, s, f) {
  var p = Lu(s[1]), y = (p ? 2 : 1) + (l < 2 ? 0 : 1), h = s[y], E, T;
  if (p && (h.duration = s[1]), h.parent = f, l) {
    for (E = h, T = f; T && !("immediateRender" in E); )
      E = T.vars.defaults || {}, T = li(T.vars.inherit) && T.parent;
    h.immediateRender = li(E.immediateRender), l < 2 ? h.runBackwards = 1 : h.startAt = s[y - 1];
  }
  return new dr(s[0], h, s[y + 1]);
}, Bs = function(l, s) {
  return l || l === 0 ? s(l) : s;
}, jv = function(l, s, f) {
  return f < l ? l : f > s ? s : f;
}, Ea = function(l, s) {
  return !Ur(l) || !(s = TN.exec(l)) ? "" : s[1];
}, UN = function(l, s, f) {
  return Bs(f, function(p) {
    return jv(l, s, p);
  });
}, HE = [].slice, cb = function(l, s) {
  return l && zo(l) && "length" in l && (!s && !l.length || l.length - 1 in l && zo(l[0])) && !l.nodeType && l !== Lo;
}, FN = function(l, s, f) {
  return f === void 0 && (f = []), l.forEach(function(p) {
    var y;
    return Ur(p) && !s || cb(p, 1) ? (y = f).push.apply(y, hl(p)) : f.push(p);
  }) || f;
}, hl = function(l, s, f) {
  return xn && !s && xn.selector ? xn.selector(l) : Ur(l) && !f && (UE || !pp()) ? HE.call((s || rC).querySelectorAll(l), 0) : Ca(l) ? FN(l, f) : cb(l) ? HE.call(l, 0) : l ? [l] : [];
}, BE = function(l) {
  return l = hl(l)[0] || Ov("Invalid scope") || {}, function(s) {
    var f = l.current || l.nativeElement || l;
    return hl(s, f.querySelectorAll ? f : f === l ? Ov("Invalid scope") || rC.createElement("div") : l);
  };
}, fb = function(l) {
  return l.sort(function() {
    return 0.5 - Math.random();
  });
}, db = function(l) {
  if (qn(l))
    return l;
  var s = zo(l) ? l : {
    each: l
  }, f = df(s.ease), p = s.from || 0, y = parseFloat(s.base) || 0, h = {}, E = p > 0 && p < 1, T = isNaN(p) || E, x = s.axis, R = p, O = p;
  return Ur(p) ? R = O = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[p] || 0 : !E && T && (R = p[0], O = p[1]), function(A, M, V) {
    var L = (V || s).length, I = h[L], ne, ee, Q, ie, Y, fe, ae, ge, se;
    if (!I) {
      if (se = s.grid === "auto" ? 0 : (s.grid || [1, pl])[1], !se) {
        for (ae = -pl; ae < (ae = V[se++].getBoundingClientRect().left) && se < L; )
          ;
        se < L && se--;
      }
      for (I = h[L] = [], ne = T ? Math.min(se, L) * R - 0.5 : p % se, ee = se === pl ? 0 : T ? L * O / se - 0.5 : p / se | 0, ae = 0, ge = pl, fe = 0; fe < L; fe++)
        Q = fe % se - ne, ie = ee - (fe / se | 0), I[fe] = Y = x ? Math.abs(x === "y" ? ie : Q) : Qx(Q * Q + ie * ie), Y > ae && (ae = Y), Y < ge && (ge = Y);
      p === "random" && fb(I), I.max = ae - ge, I.min = ge, I.v = L = (parseFloat(s.amount) || parseFloat(s.each) * (se > L ? L - 1 : x ? x === "y" ? L / se : se : Math.max(se, L / se)) || 0) * (p === "edges" ? -1 : 1), I.b = L < 0 ? y - L : y, I.u = Ea(s.amount || s.each) || 0, f = f && L < 0 ? Cb(f) : f;
    }
    return L = (I[A] - I.min) / I.max || 0, zn(I.b + (f ? f(L) : L) * I.v) + I.u;
  };
}, VE = function(l) {
  var s = Math.pow(10, ((l + "").split(".")[1] || "").length);
  return function(f) {
    var p = zn(Math.round(parseFloat(f) / l) * l * s);
    return (p - p % 1) / s + (Lu(f) ? 0 : Ea(f));
  };
}, pb = function(l, s) {
  var f = Ca(l), p, y;
  return !f && zo(l) && (p = f = l.radius || pl, l.values ? (l = hl(l.values), (y = !Lu(l[0])) && (p *= p)) : l = VE(l.increment)), Bs(s, f ? qn(l) ? function(h) {
    return y = l(h), Math.abs(y - h) <= p ? y : h;
  } : function(h) {
    for (var E = parseFloat(y ? h.x : h), T = parseFloat(y ? h.y : 0), x = pl, R = 0, O = l.length, A, M; O--; )
      y ? (A = l[O].x - E, M = l[O].y - T, A = A * A + M * M) : A = Math.abs(l[O] - E), A < x && (x = A, R = O);
    return R = !p || x <= p ? l[R] : h, y || R === h || Lu(h) ? R : R + Ea(h);
  } : VE(l));
}, hb = function(l, s, f, p) {
  return Bs(Ca(l) ? !s : f === !0 ? !!(f = 0) : !p, function() {
    return Ca(l) ? l[~~(Math.random() * l.length)] : (f = f || 1e-5) && (p = f < 1 ? Math.pow(10, (f + "").length - 2) : 1) && Math.floor(Math.round((l - f / 2 + Math.random() * (s - l + f * 0.99)) / f) * f * p) / p;
  });
}, PN = function() {
  for (var l = arguments.length, s = new Array(l), f = 0; f < l; f++)
    s[f] = arguments[f];
  return function(p) {
    return s.reduce(function(y, h) {
      return h(y);
    }, p);
  };
}, jN = function(l, s) {
  return function(f) {
    return l(parseFloat(f)) + (s || Ea(f));
  };
}, HN = function(l, s, f) {
  return mb(l, s, 0, 1, f);
}, vb = function(l, s, f) {
  return Bs(f, function(p) {
    return l[~~s(p)];
  });
}, BN = function _(l, s, f) {
  var p = s - l;
  return Ca(l) ? vb(l, _(0, l.length), s) : Bs(f, function(y) {
    return (p + (y - l) % p) % p + l;
  });
}, VN = function _(l, s, f) {
  var p = s - l, y = p * 2;
  return Ca(l) ? vb(l, _(0, l.length - 1), s) : Bs(f, function(h) {
    return h = (y + (h - l) % y) % y || 0, l + (h > p ? y - h : h);
  });
}, Lv = function(l) {
  return l.replace(EN, function(s) {
    var f = s.indexOf("[") + 1, p = s.substring(f || 7, f ? s.indexOf("]") : s.length - 1).split(CN);
    return hb(f ? p : +p[0], f ? 0 : +p[1], +p[2] || 1e-5);
  });
}, mb = function(l, s, f, p, y) {
  var h = s - l, E = p - f;
  return Bs(y, function(T) {
    return f + ((T - l) / h * E || 0);
  });
}, IN = function _(l, s, f, p) {
  var y = isNaN(l + s) ? 0 : function(M) {
    return (1 - M) * l + M * s;
  };
  if (!y) {
    var h = Ur(l), E = {}, T, x, R, O, A;
    if (f === !0 && (p = 1) && (f = null), h)
      l = {
        p: l
      }, s = {
        p: s
      };
    else if (Ca(l) && !Ca(s)) {
      for (R = [], O = l.length, A = O - 2, x = 1; x < O; x++)
        R.push(_(l[x - 1], l[x]));
      O--, y = function(V) {
        V *= O;
        var L = Math.min(A, ~~V);
        return R[L](V - L);
      }, f = s;
    } else p || (l = cp(Ca(l) ? [] : {}, l));
    if (!R) {
      for (T in s)
        sC.call(E, l, T, "get", s[T]);
      y = function(V) {
        return pC(V, E) || (h ? l.p : l);
      };
    }
  }
  return Bs(f, y);
}, Tx = function(l, s, f) {
  var p = l.labels, y = pl, h, E, T;
  for (h in p)
    E = p[h] - s, E < 0 == !!f && E && y > (E = Math.abs(E)) && (T = h, y = E);
  return T;
}, Li = function(l, s, f) {
  var p = l.vars, y = p[s], h = xn, E = l._ctx, T, x, R;
  if (y)
    return T = p[s + "Params"], x = p.callbackScope || l, f && Us.length && Ig(), E && (xn = E), R = T ? y.apply(x, T) : y.call(x), xn = h, R;
}, Tv = function(l) {
  return Ps(l), l.scrollTrigger && l.scrollTrigger.kill(!!na), l.progress() < 1 && Li(l, "onInterrupt"), l;
}, ip, yb = [], gb = function(l) {
  if (l)
    if (l = !l.name && l.default || l, nC() || l.headless) {
      var s = l.name, f = qn(l), p = s && !f && l.init ? function() {
        this._props = [];
      } : l, y = {
        init: Mv,
        render: pC,
        add: sC,
        kill: i2,
        modifier: a2,
        rawVars: 0
      }, h = {
        targetTest: 0,
        get: 0,
        getSetter: dC,
        aliases: {},
        register: 0
      };
      if (pp(), l !== p) {
        if (Oi[s])
          return;
        Ui(p, Ui(Yg(l, y), h)), cp(p.prototype, cp(y, Yg(l, h))), Oi[p.prop = s] = p, l.targetTest && (Fg.push(p), iC[s] = 1), s = (s === "css" ? "CSS" : s.charAt(0).toUpperCase() + s.substr(1)) + "Plugin";
      }
      eb(s, p), l.register && l.register(ci, p, ui);
    } else
      yb.push(l);
}, hn = 255, xv = {
  aqua: [0, hn, hn],
  lime: [0, hn, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, hn],
  navy: [0, 0, 128],
  white: [hn, hn, hn],
  olive: [128, 128, 0],
  yellow: [hn, hn, 0],
  orange: [hn, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [hn, 0, 0],
  pink: [hn, 192, 203],
  cyan: [0, hn, hn],
  transparent: [hn, hn, hn, 0]
}, CE = function(l, s, f) {
  return l += l < 0 ? 1 : l > 1 ? -1 : 0, (l * 6 < 1 ? s + (f - s) * l * 6 : l < 0.5 ? f : l * 3 < 2 ? s + (f - s) * (2 / 3 - l) * 6 : s) * hn + 0.5 | 0;
}, _b = function(l, s, f) {
  var p = l ? Lu(l) ? [l >> 16, l >> 8 & hn, l & hn] : 0 : xv.black, y, h, E, T, x, R, O, A, M, V;
  if (!p) {
    if (l.substr(-1) === "," && (l = l.substr(0, l.length - 1)), xv[l])
      p = xv[l];
    else if (l.charAt(0) === "#") {
      if (l.length < 6 && (y = l.charAt(1), h = l.charAt(2), E = l.charAt(3), l = "#" + y + y + h + h + E + E + (l.length === 5 ? l.charAt(4) + l.charAt(4) : "")), l.length === 9)
        return p = parseInt(l.substr(1, 6), 16), [p >> 16, p >> 8 & hn, p & hn, parseInt(l.substr(7), 16) / 255];
      l = parseInt(l.substr(1), 16), p = [l >> 16, l >> 8 & hn, l & hn];
    } else if (l.substr(0, 3) === "hsl") {
      if (p = V = l.match(_x), !s)
        T = +p[0] % 360 / 360, x = +p[1] / 100, R = +p[2] / 100, h = R <= 0.5 ? R * (x + 1) : R + x - R * x, y = R * 2 - h, p.length > 3 && (p[3] *= 1), p[0] = CE(T + 1 / 3, y, h), p[1] = CE(T, y, h), p[2] = CE(T - 1 / 3, y, h);
      else if (~l.indexOf("="))
        return p = l.match(Xx), f && p.length < 4 && (p[3] = 1), p;
    } else
      p = l.match(_x) || xv.transparent;
    p = p.map(Number);
  }
  return s && !V && (y = p[0] / hn, h = p[1] / hn, E = p[2] / hn, O = Math.max(y, h, E), A = Math.min(y, h, E), R = (O + A) / 2, O === A ? T = x = 0 : (M = O - A, x = R > 0.5 ? M / (2 - O - A) : M / (O + A), T = O === y ? (h - E) / M + (h < E ? 6 : 0) : O === h ? (E - y) / M + 2 : (y - h) / M + 4, T *= 60), p[0] = ~~(T + 0.5), p[1] = ~~(x * 100 + 0.5), p[2] = ~~(R * 100 + 0.5)), f && p.length < 4 && (p[3] = 1), p;
}, Sb = function(l) {
  var s = [], f = [], p = -1;
  return l.split(Fs).forEach(function(y) {
    var h = y.match(ap) || [];
    s.push.apply(s, h), f.push(p += h.length + 1);
  }), s.c = f, s;
}, xx = function(l, s, f) {
  var p = "", y = (l + p).match(Fs), h = s ? "hsla(" : "rgba(", E = 0, T, x, R, O;
  if (!y)
    return l;
  if (y = y.map(function(A) {
    return (A = _b(A, s, 1)) && h + (s ? A[0] + "," + A[1] + "%," + A[2] + "%," + A[3] : A.join(",")) + ")";
  }), f && (R = Sb(l), T = f.c, T.join(p) !== R.c.join(p)))
    for (x = l.replace(Fs, "1").split(ap), O = x.length - 1; E < O; E++)
      p += x[E] + (~T.indexOf(E) ? y.shift() || h + "0,0,0,0)" : (R.length ? R : y.length ? y : f).shift());
  if (!x)
    for (x = l.split(Fs), O = x.length - 1; E < O; E++)
      p += x[E] + y[E];
  return p + x[O];
}, Fs = function() {
  var _ = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", l;
  for (l in xv)
    _ += "|" + l + "\\b";
  return new RegExp(_ + ")", "gi");
}(), YN = /hsl[a]?\(/, Eb = function(l) {
  var s = l.join(" "), f;
  if (Fs.lastIndex = 0, Fs.test(s))
    return f = YN.test(s), l[1] = xx(l[1], f), l[0] = xx(l[0], f, Sb(l[1])), !0;
}, Nv, Mi = function() {
  var _ = Date.now, l = 500, s = 33, f = _(), p = f, y = 1e3 / 240, h = y, E = [], T, x, R, O, A, M, V = function L(I) {
    var ne = _() - p, ee = I === !0, Q, ie, Y, fe;
    if ((ne > l || ne < 0) && (f += ne - s), p += ne, Y = p - f, Q = Y - h, (Q > 0 || ee) && (fe = ++O.frame, A = Y - O.time * 1e3, O.time = Y = Y / 1e3, h += Q + (Q >= y ? 4 : y - Q), ie = 1), ee || (T = x(L)), ie)
      for (M = 0; M < E.length; M++)
        E[M](Y, A, fe, I);
  };
  return O = {
    time: 0,
    frame: 0,
    tick: function() {
      V(!0);
    },
    deltaRatio: function(I) {
      return A / (1e3 / (I || 60));
    },
    wake: function() {
      Jx && (!UE && nC() && (Lo = UE = window, rC = Lo.document || {}, zi.gsap = ci, (Lo.gsapVersions || (Lo.gsapVersions = [])).push(ci.version), Zx(Vg || Lo.GreenSockGlobals || !Lo.gsap && Lo || {}), yb.forEach(gb)), R = typeof requestAnimationFrame < "u" && requestAnimationFrame, T && O.sleep(), x = R || function(I) {
        return setTimeout(I, h - O.time * 1e3 + 1 | 0);
      }, Nv = 1, V(2));
    },
    sleep: function() {
      (R ? cancelAnimationFrame : clearTimeout)(T), Nv = 0, x = Mv;
    },
    lagSmoothing: function(I, ne) {
      l = I || 1 / 0, s = Math.min(ne || 33, l);
    },
    fps: function(I) {
      y = 1e3 / (I || 240), h = O.time * 1e3 + y;
    },
    add: function(I, ne, ee) {
      var Q = ne ? function(ie, Y, fe, ae) {
        I(ie, Y, fe, ae), O.remove(Q);
      } : I;
      return O.remove(I), E[ee ? "unshift" : "push"](Q), pp(), Q;
    },
    remove: function(I, ne) {
      ~(ne = E.indexOf(I)) && E.splice(ne, 1) && M >= ne && M--;
    },
    _listeners: E
  }, O;
}(), pp = function() {
  return !Nv && Mi.wake();
}, Ft = {}, WN = /^[\d.\-M][\d.\-,\s]/, $N = /["']/g, GN = function(l) {
  for (var s = {}, f = l.substr(1, l.length - 3).split(":"), p = f[0], y = 1, h = f.length, E, T, x; y < h; y++)
    T = f[y], E = y !== h - 1 ? T.lastIndexOf(",") : T.length, x = T.substr(0, E), s[p] = isNaN(x) ? x.replace($N, "").trim() : +x, p = T.substr(E + 1).trim();
  return s;
}, QN = function(l) {
  var s = l.indexOf("(") + 1, f = l.indexOf(")"), p = l.indexOf("(", s);
  return l.substring(s, ~p && p < f ? l.indexOf(")", f + 1) : f);
}, qN = function(l) {
  var s = (l + "").split("("), f = Ft[s[0]];
  return f && s.length > 1 && f.config ? f.config.apply(null, ~l.indexOf("{") ? [GN(s[1])] : QN(l).split(",").map(ab)) : Ft._CE && WN.test(l) ? Ft._CE("", l) : f;
}, Cb = function(l) {
  return function(s) {
    return 1 - l(1 - s);
  };
}, wb = function _(l, s) {
  for (var f = l._first, p; f; )
    f instanceof Pa ? _(f, s) : f.vars.yoyoEase && (!f._yoyo || !f._repeat) && f._yoyo !== s && (f.timeline ? _(f.timeline, s) : (p = f._ease, f._ease = f._yEase, f._yEase = p, f._yoyo = s)), f = f._next;
}, df = function(l, s) {
  return l && (qn(l) ? l : Ft[l] || qN(l)) || s;
}, hf = function(l, s, f, p) {
  f === void 0 && (f = function(T) {
    return 1 - s(1 - T);
  }), p === void 0 && (p = function(T) {
    return T < 0.5 ? s(T * 2) / 2 : 1 - s((1 - T) * 2) / 2;
  });
  var y = {
    easeIn: s,
    easeOut: f,
    easeInOut: p
  }, h;
  return oi(l, function(E) {
    Ft[E] = zi[E] = y, Ft[h = E.toLowerCase()] = f;
    for (var T in y)
      Ft[h + (T === "easeIn" ? ".in" : T === "easeOut" ? ".out" : ".inOut")] = Ft[E + "." + T] = y[T];
  }), y;
}, Tb = function(l) {
  return function(s) {
    return s < 0.5 ? (1 - l(1 - s * 2)) / 2 : 0.5 + l((s - 0.5) * 2) / 2;
  };
}, wE = function _(l, s, f) {
  var p = s >= 1 ? s : 1, y = (f || (l ? 0.3 : 0.45)) / (s < 1 ? s : 1), h = y / zE * (Math.asin(1 / p) || 0), E = function(R) {
    return R === 1 ? 1 : p * Math.pow(2, -10 * R) * SN((R - h) * y) + 1;
  }, T = l === "out" ? E : l === "in" ? function(x) {
    return 1 - E(1 - x);
  } : Tb(E);
  return y = zE / y, T.config = function(x, R) {
    return _(l, x, R);
  }, T;
}, TE = function _(l, s) {
  s === void 0 && (s = 1.70158);
  var f = function(h) {
    return h ? --h * h * ((s + 1) * h + s) + 1 : 0;
  }, p = l === "out" ? f : l === "in" ? function(y) {
    return 1 - f(1 - y);
  } : Tb(f);
  return p.config = function(y) {
    return _(l, y);
  }, p;
};
oi("Linear,Quad,Cubic,Quart,Quint,Strong", function(_, l) {
  var s = l < 5 ? l + 1 : l;
  hf(_ + ",Power" + (s - 1), l ? function(f) {
    return Math.pow(f, s);
  } : function(f) {
    return f;
  }, function(f) {
    return 1 - Math.pow(1 - f, s);
  }, function(f) {
    return f < 0.5 ? Math.pow(f * 2, s) / 2 : 1 - Math.pow((1 - f) * 2, s) / 2;
  });
});
Ft.Linear.easeNone = Ft.none = Ft.Linear.easeIn;
hf("Elastic", wE("in"), wE("out"), wE());
(function(_, l) {
  var s = 1 / l, f = 2 * s, p = 2.5 * s, y = function(E) {
    return E < s ? _ * E * E : E < f ? _ * Math.pow(E - 1.5 / l, 2) + 0.75 : E < p ? _ * (E -= 2.25 / l) * E + 0.9375 : _ * Math.pow(E - 2.625 / l, 2) + 0.984375;
  };
  hf("Bounce", function(h) {
    return 1 - y(1 - h);
  }, y);
})(7.5625, 2.75);
hf("Expo", function(_) {
  return Math.pow(2, 10 * (_ - 1)) * _ + _ * _ * _ * _ * _ * _ * (1 - _);
});
hf("Circ", function(_) {
  return -(Qx(1 - _ * _) - 1);
});
hf("Sine", function(_) {
  return _ === 1 ? 1 : -_N(_ * yN) + 1;
});
hf("Back", TE("in"), TE("out"), TE());
Ft.SteppedEase = Ft.steps = zi.SteppedEase = {
  config: function(l, s) {
    l === void 0 && (l = 1);
    var f = 1 / l, p = l + (s ? 0 : 1), y = s ? 1 : 0, h = 1 - vn;
    return function(E) {
      return ((p * jv(0, h, E) | 0) + y) * f;
    };
  }
};
sp.ease = Ft["quad.out"];
oi("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(_) {
  return lC += _ + "," + _ + "Params,";
});
var xb = function(l, s) {
  this.id = gN++, l._gsap = this, this.target = l, this.harness = s, this.get = s ? s.get : nb, this.set = s ? s.getSetter : dC;
}, Av = /* @__PURE__ */ function() {
  function _(s) {
    this.vars = s, this._delay = +s.delay || 0, (this._repeat = s.repeat === 1 / 0 ? -2 : s.repeat || 0) && (this._rDelay = s.repeatDelay || 0, this._yoyo = !!s.yoyo || !!s.yoyoEase), this._ts = 1, dp(this, +s.duration, 1, 1), this.data = s.data, xn && (this._ctx = xn, xn.data.push(this)), Nv || Mi.wake();
  }
  var l = _.prototype;
  return l.delay = function(f) {
    return f || f === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + f - this._delay), this._delay = f, this) : this._delay;
  }, l.duration = function(f) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? f + (f + this._rDelay) * this._repeat : f) : this.totalDuration() && this._dur;
  }, l.totalDuration = function(f) {
    return arguments.length ? (this._dirty = 0, dp(this, this._repeat < 0 ? f : (f - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, l.totalTime = function(f, p) {
    if (pp(), !arguments.length)
      return this._tTime;
    var y = this._dp;
    if (y && y.smoothChildTiming && this._ts) {
      for (e0(this, f), !y._dp || y.parent || ob(y, this); y && y.parent; )
        y.parent._time !== y._start + (y._ts >= 0 ? y._tTime / y._ts : (y.totalDuration() - y._tTime) / -y._ts) && y.totalTime(y._tTime, !0), y = y.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && f < this._tDur || this._ts < 0 && f > 0 || !this._tDur && !f) && No(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== f || !this._dur && !p || this._initted && Math.abs(this._zTime) === vn || !this._initted && this._dur && f || !f && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = f), rb(this, f, p)), this;
  }, l.time = function(f, p) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), f + Cx(this)) % (this._dur + this._rDelay) || (f ? this._dur : 0), p) : this._time;
  }, l.totalProgress = function(f, p) {
    return arguments.length ? this.totalTime(this.totalDuration() * f, p) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, l.progress = function(f, p) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - f : f) + Cx(this), p) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, l.iteration = function(f, p) {
    var y = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (f - 1) * y, p) : this._repeat ? fp(this._tTime, y) + 1 : 1;
  }, l.timeScale = function(f, p) {
    if (!arguments.length)
      return this._rts === -vn ? 0 : this._rts;
    if (this._rts === f)
      return this;
    var y = this.parent && this._ts ? Wg(this.parent._time, this) : this._tTime;
    return this._rts = +f || 0, this._ts = this._ps || f === -vn ? 0 : this._rts, this.totalTime(jv(-Math.abs(this._delay), this.totalDuration(), y), p !== !1), Zg(this), ON(this);
  }, l.paused = function(f) {
    return arguments.length ? (this._ps !== f && (this._ps = f, f ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (pp(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== vn && (this._tTime -= vn)))), this) : this._ps;
  }, l.startTime = function(f) {
    if (arguments.length) {
      this._start = zn(f);
      var p = this.parent || this._dp;
      return p && (p._sort || !this.parent) && No(p, this, this._start - this._delay), this;
    }
    return this._start;
  }, l.endTime = function(f) {
    return this._start + (li(f) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, l.rawTime = function(f) {
    var p = this.parent || this._dp;
    return p ? f && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Wg(p.rawTime(f), this) : this._tTime : this._tTime;
  }, l.revert = function(f) {
    f === void 0 && (f = bN);
    var p = na;
    return na = f, uC(this) && (this.timeline && this.timeline.revert(f), this.totalTime(-0.01, f.suppressEvents)), this.data !== "nested" && f.kill !== !1 && this.kill(), na = p, this;
  }, l.globalTime = function(f) {
    for (var p = this, y = arguments.length ? f : p.rawTime(); p; )
      y = p._start + y / (Math.abs(p._ts) || 1), p = p._dp;
    return !this.parent && this._sat ? this._sat.globalTime(f) : y;
  }, l.repeat = function(f) {
    return arguments.length ? (this._repeat = f === 1 / 0 ? -2 : f, wx(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, l.repeatDelay = function(f) {
    if (arguments.length) {
      var p = this._time;
      return this._rDelay = f, wx(this), p ? this.time(p) : this;
    }
    return this._rDelay;
  }, l.yoyo = function(f) {
    return arguments.length ? (this._yoyo = f, this) : this._yoyo;
  }, l.seek = function(f, p) {
    return this.totalTime(dl(this, f), li(p));
  }, l.restart = function(f, p) {
    return this.play().totalTime(f ? -this._delay : 0, li(p)), this._dur || (this._zTime = -vn), this;
  }, l.play = function(f, p) {
    return f != null && this.seek(f, p), this.reversed(!1).paused(!1);
  }, l.reverse = function(f, p) {
    return f != null && this.seek(f || this.totalDuration(), p), this.reversed(!0).paused(!1);
  }, l.pause = function(f, p) {
    return f != null && this.seek(f, p), this.paused(!0);
  }, l.resume = function() {
    return this.paused(!1);
  }, l.reversed = function(f) {
    return arguments.length ? (!!f !== this.reversed() && this.timeScale(-this._rts || (f ? -vn : 0)), this) : this._rts < 0;
  }, l.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -vn, this;
  }, l.isActive = function() {
    var f = this.parent || this._dp, p = this._start, y;
    return !!(!f || this._ts && this._initted && f.isActive() && (y = f.rawTime(!0)) >= p && y < this.endTime(!0) - vn);
  }, l.eventCallback = function(f, p, y) {
    var h = this.vars;
    return arguments.length > 1 ? (p ? (h[f] = p, y && (h[f + "Params"] = y), f === "onUpdate" && (this._onUpdate = p)) : delete h[f], this) : h[f];
  }, l.then = function(f) {
    var p = this, y = p._prom;
    return new Promise(function(h) {
      var E = qn(f) ? f : ib, T = function() {
        var R = p.then;
        p.then = null, y && y(), qn(E) && (E = E(p)) && (E.then || E === p) && (p.then = R), h(E), p.then = R;
      };
      p._initted && p.totalProgress() === 1 && p._ts >= 0 || !p._tTime && p._ts < 0 ? T() : p._prom = T;
    });
  }, l.kill = function() {
    Tv(this);
  }, _;
}();
Ui(Av.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -vn,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var Pa = /* @__PURE__ */ function(_) {
  Gx(l, _);
  function l(f, p) {
    var y;
    return f === void 0 && (f = {}), y = _.call(this, f) || this, y.labels = {}, y.smoothChildTiming = !!f.smoothChildTiming, y.autoRemoveChildren = !!f.autoRemoveChildren, y._sort = li(f.sortChildren), Un && No(f.parent || Un, Ou(y), p), f.reversed && y.reverse(), f.paused && y.paused(!0), f.scrollTrigger && ub(Ou(y), f.scrollTrigger), y;
  }
  var s = l.prototype;
  return s.to = function(p, y, h) {
    return Rv(0, arguments, this), this;
  }, s.from = function(p, y, h) {
    return Rv(1, arguments, this), this;
  }, s.fromTo = function(p, y, h, E) {
    return Rv(2, arguments, this), this;
  }, s.set = function(p, y, h) {
    return y.duration = 0, y.parent = this, bv(y).repeatDelay || (y.repeat = 0), y.immediateRender = !!y.immediateRender, new dr(p, y, dl(this, h), 1), this;
  }, s.call = function(p, y, h) {
    return No(this, dr.delayedCall(0, p, y), h);
  }, s.staggerTo = function(p, y, h, E, T, x, R) {
    return h.duration = y, h.stagger = h.stagger || E, h.onComplete = x, h.onCompleteParams = R, h.parent = this, new dr(p, h, dl(this, T)), this;
  }, s.staggerFrom = function(p, y, h, E, T, x, R) {
    return h.runBackwards = 1, bv(h).immediateRender = li(h.immediateRender), this.staggerTo(p, y, h, E, T, x, R);
  }, s.staggerFromTo = function(p, y, h, E, T, x, R, O) {
    return E.startAt = h, bv(E).immediateRender = li(E.immediateRender), this.staggerTo(p, y, E, T, x, R, O);
  }, s.render = function(p, y, h) {
    var E = this._time, T = this._dirty ? this.totalDuration() : this._tDur, x = this._dur, R = p <= 0 ? 0 : zn(p), O = this._zTime < 0 != p < 0 && (this._initted || !x), A, M, V, L, I, ne, ee, Q, ie, Y, fe, ae;
    if (this !== Un && R > T && p >= 0 && (R = T), R !== this._tTime || h || O) {
      if (E !== this._time && x && (R += this._time - E, p += this._time - E), A = R, ie = this._start, Q = this._ts, ne = !Q, O && (x || (E = this._zTime), (p || !y) && (this._zTime = p)), this._repeat) {
        if (fe = this._yoyo, I = x + this._rDelay, this._repeat < -1 && p < 0)
          return this.totalTime(I * 100 + p, y, h);
        if (A = zn(R % I), R === T ? (L = this._repeat, A = x) : (Y = zn(R / I), L = ~~Y, L && L === Y && (A = x, L--), A > x && (A = x)), Y = fp(this._tTime, I), !E && this._tTime && Y !== L && this._tTime - Y * I - this._dur <= 0 && (Y = L), fe && L & 1 && (A = x - A, ae = 1), L !== Y && !this._lock) {
          var ge = fe && Y & 1, se = ge === (fe && L & 1);
          if (L < Y && (ge = !ge), E = ge ? 0 : R % x ? x : R, this._lock = 1, this.render(E || (ae ? 0 : zn(L * I)), y, !x)._lock = 0, this._tTime = R, !y && this.parent && Li(this, "onRepeat"), this.vars.repeatRefresh && !ae && (this.invalidate()._lock = 1, Y = L), E && E !== this._time || ne !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (x = this._dur, T = this._tDur, se && (this._lock = 2, E = ge ? x : -1e-4, this.render(E, !0), this.vars.repeatRefresh && !ae && this.invalidate()), this._lock = 0, !this._ts && !ne)
            return this;
          wb(this, ae);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (ee = AN(this, zn(E), zn(A)), ee && (R -= A - (A = ee._start))), this._tTime = R, this._time = A, this._act = !Q, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = p, E = 0), !E && R && x && !y && !Y && (Li(this, "onStart"), this._tTime !== R))
        return this;
      if (A >= E && p >= 0)
        for (M = this._first; M; ) {
          if (V = M._next, (M._act || A >= M._start) && M._ts && ee !== M) {
            if (M.parent !== this)
              return this.render(p, y, h);
            if (M.render(M._ts > 0 ? (A - M._start) * M._ts : (M._dirty ? M.totalDuration() : M._tDur) + (A - M._start) * M._ts, y, h), A !== this._time || !this._ts && !ne) {
              ee = 0, V && (R += this._zTime = -vn);
              break;
            }
          }
          M = V;
        }
      else {
        M = this._last;
        for (var Ie = p < 0 ? p : A; M; ) {
          if (V = M._prev, (M._act || Ie <= M._end) && M._ts && ee !== M) {
            if (M.parent !== this)
              return this.render(p, y, h);
            if (M.render(M._ts > 0 ? (Ie - M._start) * M._ts : (M._dirty ? M.totalDuration() : M._tDur) + (Ie - M._start) * M._ts, y, h || na && uC(M)), A !== this._time || !this._ts && !ne) {
              ee = 0, V && (R += this._zTime = Ie ? -vn : vn);
              break;
            }
          }
          M = V;
        }
      }
      if (ee && !y && (this.pause(), ee.render(A >= E ? 0 : -vn)._zTime = A >= E ? 1 : -1, this._ts))
        return this._start = ie, Zg(this), this.render(p, y, h);
      this._onUpdate && !y && Li(this, "onUpdate", !0), (R === T && this._tTime >= this.totalDuration() || !R && E) && (ie === this._start || Math.abs(Q) !== Math.abs(this._ts)) && (this._lock || ((p || !x) && (R === T && this._ts > 0 || !R && this._ts < 0) && Ps(this, 1), !y && !(p < 0 && !E) && (R || E || !T) && (Li(this, R === T && p >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(R < T && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, s.add = function(p, y) {
    var h = this;
    if (Lu(y) || (y = dl(this, y, p)), !(p instanceof Av)) {
      if (Ca(p))
        return p.forEach(function(E) {
          return h.add(E, y);
        }), this;
      if (Ur(p))
        return this.addLabel(p, y);
      if (qn(p))
        p = dr.delayedCall(0, p);
      else
        return this;
    }
    return this !== p ? No(this, p, y) : this;
  }, s.getChildren = function(p, y, h, E) {
    p === void 0 && (p = !0), y === void 0 && (y = !0), h === void 0 && (h = !0), E === void 0 && (E = -pl);
    for (var T = [], x = this._first; x; )
      x._start >= E && (x instanceof dr ? y && T.push(x) : (h && T.push(x), p && T.push.apply(T, x.getChildren(!0, y, h)))), x = x._next;
    return T;
  }, s.getById = function(p) {
    for (var y = this.getChildren(1, 1, 1), h = y.length; h--; )
      if (y[h].vars.id === p)
        return y[h];
  }, s.remove = function(p) {
    return Ur(p) ? this.removeLabel(p) : qn(p) ? this.killTweensOf(p) : (p.parent === this && Jg(this, p), p === this._recent && (this._recent = this._last), ff(this));
  }, s.totalTime = function(p, y) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = zn(Mi.time - (this._ts > 0 ? p / this._ts : (this.totalDuration() - p) / -this._ts))), _.prototype.totalTime.call(this, p, y), this._forcing = 0, this) : this._tTime;
  }, s.addLabel = function(p, y) {
    return this.labels[p] = dl(this, y), this;
  }, s.removeLabel = function(p) {
    return delete this.labels[p], this;
  }, s.addPause = function(p, y, h) {
    var E = dr.delayedCall(0, y || Mv, h);
    return E.data = "isPause", this._hasPause = 1, No(this, E, dl(this, p));
  }, s.removePause = function(p) {
    var y = this._first;
    for (p = dl(this, p); y; )
      y._start === p && y.data === "isPause" && Ps(y), y = y._next;
  }, s.killTweensOf = function(p, y, h) {
    for (var E = this.getTweensOf(p, h), T = E.length; T--; )
      Ls !== E[T] && E[T].kill(p, y);
    return this;
  }, s.getTweensOf = function(p, y) {
    for (var h = [], E = hl(p), T = this._first, x = Lu(y), R; T; )
      T instanceof dr ? RN(T._targets, E) && (x ? (!Ls || T._initted && T._ts) && T.globalTime(0) <= y && T.globalTime(T.totalDuration()) > y : !y || T.isActive()) && h.push(T) : (R = T.getTweensOf(E, y)).length && h.push.apply(h, R), T = T._next;
    return h;
  }, s.tweenTo = function(p, y) {
    y = y || {};
    var h = this, E = dl(h, p), T = y, x = T.startAt, R = T.onStart, O = T.onStartParams, A = T.immediateRender, M, V = dr.to(h, Ui({
      ease: y.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: E,
      overwrite: "auto",
      duration: y.duration || Math.abs((E - (x && "time" in x ? x.time : h._time)) / h.timeScale()) || vn,
      onStart: function() {
        if (h.pause(), !M) {
          var I = y.duration || Math.abs((E - (x && "time" in x ? x.time : h._time)) / h.timeScale());
          V._dur !== I && dp(V, I, 0, 1).render(V._time, !0, !0), M = 1;
        }
        R && R.apply(V, O || []);
      }
    }, y));
    return A ? V.render(0) : V;
  }, s.tweenFromTo = function(p, y, h) {
    return this.tweenTo(y, Ui({
      startAt: {
        time: dl(this, p)
      }
    }, h));
  }, s.recent = function() {
    return this._recent;
  }, s.nextLabel = function(p) {
    return p === void 0 && (p = this._time), Tx(this, dl(this, p));
  }, s.previousLabel = function(p) {
    return p === void 0 && (p = this._time), Tx(this, dl(this, p), 1);
  }, s.currentLabel = function(p) {
    return arguments.length ? this.seek(p, !0) : this.previousLabel(this._time + vn);
  }, s.shiftChildren = function(p, y, h) {
    h === void 0 && (h = 0);
    var E = this._first, T = this.labels, x;
    for (p = zn(p); E; )
      E._start >= h && (E._start += p, E._end += p), E = E._next;
    if (y)
      for (x in T)
        T[x] >= h && (T[x] += p);
    return ff(this);
  }, s.invalidate = function(p) {
    var y = this._first;
    for (this._lock = 0; y; )
      y.invalidate(p), y = y._next;
    return _.prototype.invalidate.call(this, p);
  }, s.clear = function(p) {
    p === void 0 && (p = !0);
    for (var y = this._first, h; y; )
      h = y._next, this.remove(y), y = h;
    return this._dp && (this._time = this._tTime = this._pTime = 0), p && (this.labels = {}), ff(this);
  }, s.totalDuration = function(p) {
    var y = 0, h = this, E = h._last, T = pl, x, R, O;
    if (arguments.length)
      return h.timeScale((h._repeat < 0 ? h.duration() : h.totalDuration()) / (h.reversed() ? -p : p));
    if (h._dirty) {
      for (O = h.parent; E; )
        x = E._prev, E._dirty && E.totalDuration(), R = E._start, R > T && h._sort && E._ts && !h._lock ? (h._lock = 1, No(h, E, R - E._delay, 1)._lock = 0) : T = R, R < 0 && E._ts && (y -= R, (!O && !h._dp || O && O.smoothChildTiming) && (h._start += zn(R / h._ts), h._time -= R, h._tTime -= R), h.shiftChildren(-R, !1, -1 / 0), T = 0), E._end > y && E._ts && (y = E._end), E = x;
      dp(h, h === Un && h._time > y ? h._time : y, 1, 1), h._dirty = 0;
    }
    return h._tDur;
  }, l.updateRoot = function(p) {
    if (Un._ts && (rb(Un, Wg(p, Un)), tb = Mi.frame), Mi.frame >= Sx) {
      Sx += Ai.autoSleep || 120;
      var y = Un._first;
      if ((!y || !y._ts) && Ai.autoSleep && Mi._listeners.length < 2) {
        for (; y && !y._ts; )
          y = y._next;
        y || Mi.sleep();
      }
    }
  }, l;
}(Av);
Ui(Pa.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var XN = function(l, s, f, p, y, h, E) {
  var T = new ui(this._pt, l, s, 0, 1, Mb, null, y), x = 0, R = 0, O, A, M, V, L, I, ne, ee;
  for (T.b = f, T.e = p, f += "", p += "", (ne = ~p.indexOf("random(")) && (p = Lv(p)), h && (ee = [f, p], h(ee, l, s), f = ee[0], p = ee[1]), A = f.match(SE) || []; O = SE.exec(p); )
    V = O[0], L = p.substring(x, O.index), M ? M = (M + 1) % 5 : L.substr(-5) === "rgba(" && (M = 1), V !== A[R++] && (I = parseFloat(A[R - 1]) || 0, T._pt = {
      _next: T._pt,
      p: L || R === 1 ? L : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: I,
      c: V.charAt(1) === "=" ? lp(I, V) - I : parseFloat(V) - I,
      m: M && M < 4 ? Math.round : 0
    }, x = SE.lastIndex);
  return T.c = x < p.length ? p.substring(x, p.length) : "", T.fp = E, (Kx.test(p) || ne) && (T.e = 0), this._pt = T, T;
}, sC = function(l, s, f, p, y, h, E, T, x, R) {
  qn(p) && (p = p(y || 0, l, h));
  var O = l[s], A = f !== "get" ? f : qn(O) ? x ? l[s.indexOf("set") || !qn(l["get" + s.substr(3)]) ? s : "get" + s.substr(3)](x) : l[s]() : O, M = qn(O) ? x ? t2 : Db : fC, V;
  if (Ur(p) && (~p.indexOf("random(") && (p = Lv(p)), p.charAt(1) === "=" && (V = lp(A, p) + (Ea(A) || 0), (V || V === 0) && (p = V))), !R || A !== p || IE)
    return !isNaN(A * p) && p !== "" ? (V = new ui(this._pt, l, s, +A || 0, p - (A || 0), typeof O == "boolean" ? r2 : Ob, 0, M), x && (V.fp = x), E && V.modifier(E, this, l), this._pt = V) : (!O && !(s in l) && aC(s, p), XN.call(this, l, s, A, p, M, T || Ai.stringFilter, x));
}, KN = function(l, s, f, p, y) {
  if (qn(l) && (l = kv(l, y, s, f, p)), !zo(l) || l.style && l.nodeType || Ca(l) || qx(l))
    return Ur(l) ? kv(l, y, s, f, p) : l;
  var h = {}, E;
  for (E in l)
    h[E] = kv(l[E], y, s, f, p);
  return h;
}, bb = function(l, s, f, p, y, h) {
  var E, T, x, R;
  if (Oi[l] && (E = new Oi[l]()).init(y, E.rawVars ? s[l] : KN(s[l], p, y, h, f), f, p, h) !== !1 && (f._pt = T = new ui(f._pt, y, l, 0, 1, E.render, E, 0, E.priority), f !== ip))
    for (x = f._ptLookup[f._targets.indexOf(y)], R = E._props.length; R--; )
      x[E._props[R]] = T;
  return E;
}, Ls, IE, cC = function _(l, s, f) {
  var p = l.vars, y = p.ease, h = p.startAt, E = p.immediateRender, T = p.lazy, x = p.onUpdate, R = p.runBackwards, O = p.yoyoEase, A = p.keyframes, M = p.autoRevert, V = l._dur, L = l._startAt, I = l._targets, ne = l.parent, ee = ne && ne.data === "nested" ? ne.vars.targets : I, Q = l._overwrite === "auto" && !eC, ie = l.timeline, Y, fe, ae, ge, se, Ie, Ke, $e, be, ut, Ge, pe, ce;
  if (ie && (!A || !y) && (y = "none"), l._ease = df(y, sp.ease), l._yEase = O ? Cb(df(O === !0 ? y : O, sp.ease)) : 0, O && l._yoyo && !l._repeat && (O = l._yEase, l._yEase = l._ease, l._ease = O), l._from = !ie && !!p.runBackwards, !ie || A && !p.stagger) {
    if ($e = I[0] ? cf(I[0]).harness : 0, pe = $e && p[$e.prop], Y = Yg(p, iC), L && (L._zTime < 0 && L.progress(1), s < 0 && R && E && !M ? L.render(-1, !0) : L.revert(R && V ? Ug : xN), L._lazy = 0), h) {
      if (Ps(l._startAt = dr.set(I, Ui({
        data: "isStart",
        overwrite: !1,
        parent: ne,
        immediateRender: !0,
        lazy: !L && li(T),
        startAt: null,
        delay: 0,
        onUpdate: x && function() {
          return Li(l, "onUpdate");
        },
        stagger: 0
      }, h))), l._startAt._dp = 0, l._startAt._sat = l, s < 0 && (na || !E && !M) && l._startAt.revert(Ug), E && V && s <= 0 && f <= 0) {
        s && (l._zTime = s);
        return;
      }
    } else if (R && V && !L) {
      if (s && (E = !1), ae = Ui({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: E && !L && li(T),
        immediateRender: E,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: ne
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, Y), pe && (ae[$e.prop] = pe), Ps(l._startAt = dr.set(I, ae)), l._startAt._dp = 0, l._startAt._sat = l, s < 0 && (na ? l._startAt.revert(Ug) : l._startAt.render(-1, !0)), l._zTime = s, !E)
        _(l._startAt, vn, vn);
      else if (!s)
        return;
    }
    for (l._pt = l._ptCache = 0, T = V && li(T) || T && !V, fe = 0; fe < I.length; fe++) {
      if (se = I[fe], Ke = se._gsap || oC(I)[fe]._gsap, l._ptLookup[fe] = ut = {}, FE[Ke.id] && Us.length && Ig(), Ge = ee === I ? fe : ee.indexOf(se), $e && (be = new $e()).init(se, pe || Y, l, Ge, ee) !== !1 && (l._pt = ge = new ui(l._pt, se, be.name, 0, 1, be.render, be, 0, be.priority), be._props.forEach(function(le) {
        ut[le] = ge;
      }), be.priority && (Ie = 1)), !$e || pe)
        for (ae in Y)
          Oi[ae] && (be = bb(ae, Y, l, Ge, se, ee)) ? be.priority && (Ie = 1) : ut[ae] = ge = sC.call(l, se, ae, "get", Y[ae], Ge, ee, 0, p.stringFilter);
      l._op && l._op[fe] && l.kill(se, l._op[fe]), Q && l._pt && (Ls = l, Un.killTweensOf(se, ut, l.globalTime(s)), ce = !l.parent, Ls = 0), l._pt && T && (FE[Ke.id] = 1);
    }
    Ie && Lb(l), l._onInit && l._onInit(l);
  }
  l._onUpdate = x, l._initted = (!l._op || l._pt) && !ce, A && s <= 0 && ie.render(pl, !0, !0);
}, JN = function(l, s, f, p, y, h, E, T) {
  var x = (l._pt && l._ptCache || (l._ptCache = {}))[s], R, O, A, M;
  if (!x)
    for (x = l._ptCache[s] = [], A = l._ptLookup, M = l._targets.length; M--; ) {
      if (R = A[M][s], R && R.d && R.d._pt)
        for (R = R.d._pt; R && R.p !== s && R.fp !== s; )
          R = R._next;
      if (!R)
        return IE = 1, l.vars[s] = "+=0", cC(l, E), IE = 0, T ? Ov(s + " not eligible for reset") : 1;
      x.push(R);
    }
  for (M = x.length; M--; )
    O = x[M], R = O._pt || O, R.s = (p || p === 0) && !y ? p : R.s + (p || 0) + h * R.c, R.c = f - R.s, O.e && (O.e = ar(f) + Ea(O.e)), O.b && (O.b = R.s + Ea(O.b));
}, ZN = function(l, s) {
  var f = l[0] ? cf(l[0]).harness : 0, p = f && f.aliases, y, h, E, T;
  if (!p)
    return s;
  y = cp({}, s);
  for (h in p)
    if (h in y)
      for (T = p[h].split(","), E = T.length; E--; )
        y[T[E]] = y[h];
  return y;
}, e2 = function(l, s, f, p) {
  var y = s.ease || p || "power1.inOut", h, E;
  if (Ca(s))
    E = f[l] || (f[l] = []), s.forEach(function(T, x) {
      return E.push({
        t: x / (s.length - 1) * 100,
        v: T,
        e: y
      });
    });
  else
    for (h in s)
      E = f[h] || (f[h] = []), h === "ease" || E.push({
        t: parseFloat(l),
        v: s[h],
        e: y
      });
}, kv = function(l, s, f, p, y) {
  return qn(l) ? l.call(s, f, p, y) : Ur(l) && ~l.indexOf("random(") ? Lv(l) : l;
}, Rb = lC + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", kb = {};
oi(Rb + ",id,stagger,delay,duration,paused,scrollTrigger", function(_) {
  return kb[_] = 1;
});
var dr = /* @__PURE__ */ function(_) {
  Gx(l, _);
  function l(f, p, y, h) {
    var E;
    typeof p == "number" && (y.duration = p, p = y, y = null), E = _.call(this, h ? p : bv(p)) || this;
    var T = E.vars, x = T.duration, R = T.delay, O = T.immediateRender, A = T.stagger, M = T.overwrite, V = T.keyframes, L = T.defaults, I = T.scrollTrigger, ne = T.yoyoEase, ee = p.parent || Un, Q = (Ca(f) || qx(f) ? Lu(f[0]) : "length" in p) ? [f] : hl(f), ie, Y, fe, ae, ge, se, Ie, Ke;
    if (E._targets = Q.length ? oC(Q) : Ov("GSAP target " + f + " not found. https://gsap.com", !Ai.nullTargetWarn) || [], E._ptLookup = [], E._overwrite = M, V || A || Ag(x) || Ag(R)) {
      if (p = E.vars, ie = E.timeline = new Pa({
        data: "nested",
        defaults: L || {},
        targets: ee && ee.data === "nested" ? ee.vars.targets : Q
      }), ie.kill(), ie.parent = ie._dp = Ou(E), ie._start = 0, A || Ag(x) || Ag(R)) {
        if (ae = Q.length, Ie = A && db(A), zo(A))
          for (ge in A)
            ~Rb.indexOf(ge) && (Ke || (Ke = {}), Ke[ge] = A[ge]);
        for (Y = 0; Y < ae; Y++)
          fe = Yg(p, kb), fe.stagger = 0, ne && (fe.yoyoEase = ne), Ke && cp(fe, Ke), se = Q[Y], fe.duration = +kv(x, Ou(E), Y, se, Q), fe.delay = (+kv(R, Ou(E), Y, se, Q) || 0) - E._delay, !A && ae === 1 && fe.delay && (E._delay = R = fe.delay, E._start += R, fe.delay = 0), ie.to(se, fe, Ie ? Ie(Y, se, Q) : 0), ie._ease = Ft.none;
        ie.duration() ? x = R = 0 : E.timeline = 0;
      } else if (V) {
        bv(Ui(ie.vars.defaults, {
          ease: "none"
        })), ie._ease = df(V.ease || p.ease || "none");
        var $e = 0, be, ut, Ge;
        if (Ca(V))
          V.forEach(function(pe) {
            return ie.to(Q, pe, ">");
          }), ie.duration();
        else {
          fe = {};
          for (ge in V)
            ge === "ease" || ge === "easeEach" || e2(ge, V[ge], fe, V.easeEach);
          for (ge in fe)
            for (be = fe[ge].sort(function(pe, ce) {
              return pe.t - ce.t;
            }), $e = 0, Y = 0; Y < be.length; Y++)
              ut = be[Y], Ge = {
                ease: ut.e,
                duration: (ut.t - (Y ? be[Y - 1].t : 0)) / 100 * x
              }, Ge[ge] = ut.v, ie.to(Q, Ge, $e), $e += Ge.duration;
          ie.duration() < x && ie.to({}, {
            duration: x - ie.duration()
          });
        }
      }
      x || E.duration(x = ie.duration());
    } else
      E.timeline = 0;
    return M === !0 && !eC && (Ls = Ou(E), Un.killTweensOf(Q), Ls = 0), No(ee, Ou(E), y), p.reversed && E.reverse(), p.paused && E.paused(!0), (O || !x && !V && E._start === zn(ee._time) && li(O) && MN(Ou(E)) && ee.data !== "nested") && (E._tTime = -vn, E.render(Math.max(0, -R) || 0)), I && ub(Ou(E), I), E;
  }
  var s = l.prototype;
  return s.render = function(p, y, h) {
    var E = this._time, T = this._tDur, x = this._dur, R = p < 0, O = p > T - vn && !R ? T : p < vn ? 0 : p, A, M, V, L, I, ne, ee, Q, ie;
    if (!x)
      NN(this, p, y, h);
    else if (O !== this._tTime || !p || h || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== R || this._lazy) {
      if (A = O, Q = this.timeline, this._repeat) {
        if (L = x + this._rDelay, this._repeat < -1 && R)
          return this.totalTime(L * 100 + p, y, h);
        if (A = zn(O % L), O === T ? (V = this._repeat, A = x) : (I = zn(O / L), V = ~~I, V && V === I ? (A = x, V--) : A > x && (A = x)), ne = this._yoyo && V & 1, ne && (ie = this._yEase, A = x - A), I = fp(this._tTime, L), A === E && !h && this._initted && V === I)
          return this._tTime = O, this;
        V !== I && (Q && this._yEase && wb(Q, ne), this.vars.repeatRefresh && !ne && !this._lock && A !== L && this._initted && (this._lock = h = 1, this.render(zn(L * V), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (sb(this, R ? p : A, h, y, O))
          return this._tTime = 0, this;
        if (E !== this._time && !(h && this.vars.repeatRefresh && V !== I))
          return this;
        if (x !== this._dur)
          return this.render(p, y, h);
      }
      if (this._tTime = O, this._time = A, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = ee = (ie || this._ease)(A / x), this._from && (this.ratio = ee = 1 - ee), !E && O && !y && !I && (Li(this, "onStart"), this._tTime !== O))
        return this;
      for (M = this._pt; M; )
        M.r(ee, M.d), M = M._next;
      Q && Q.render(p < 0 ? p : Q._dur * Q._ease(A / this._dur), y, h) || this._startAt && (this._zTime = p), this._onUpdate && !y && (R && PE(this, p, y, h), Li(this, "onUpdate")), this._repeat && V !== I && this.vars.onRepeat && !y && this.parent && Li(this, "onRepeat"), (O === this._tDur || !O) && this._tTime === O && (R && !this._onUpdate && PE(this, p, !0, !0), (p || !x) && (O === this._tDur && this._ts > 0 || !O && this._ts < 0) && Ps(this, 1), !y && !(R && !E) && (O || E || ne) && (Li(this, O === T ? "onComplete" : "onReverseComplete", !0), this._prom && !(O < T && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, s.targets = function() {
    return this._targets;
  }, s.invalidate = function(p) {
    return (!p || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(p), _.prototype.invalidate.call(this, p);
  }, s.resetTo = function(p, y, h, E, T) {
    Nv || Mi.wake(), this._ts || this.play();
    var x = Math.min(this._dur, (this._dp._time - this._start) * this._ts), R;
    return this._initted || cC(this, x), R = this._ease(x / this._dur), JN(this, p, y, h, E, R, x, T) ? this.resetTo(p, y, h, E, 1) : (e0(this, 0), this.parent || lb(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, s.kill = function(p, y) {
    if (y === void 0 && (y = "all"), !p && (!y || y === "all"))
      return this._lazy = this._pt = 0, this.parent ? Tv(this) : this.scrollTrigger && this.scrollTrigger.kill(!!na), this;
    if (this.timeline) {
      var h = this.timeline.totalDuration();
      return this.timeline.killTweensOf(p, y, Ls && Ls.vars.overwrite !== !0)._first || Tv(this), this.parent && h !== this.timeline.totalDuration() && dp(this, this._dur * this.timeline._tDur / h, 0, 1), this;
    }
    var E = this._targets, T = p ? hl(p) : E, x = this._ptLookup, R = this._pt, O, A, M, V, L, I, ne;
    if ((!y || y === "all") && DN(E, T))
      return y === "all" && (this._pt = 0), Tv(this);
    for (O = this._op = this._op || [], y !== "all" && (Ur(y) && (L = {}, oi(y, function(ee) {
      return L[ee] = 1;
    }), y = L), y = ZN(E, y)), ne = E.length; ne--; )
      if (~T.indexOf(E[ne])) {
        A = x[ne], y === "all" ? (O[ne] = y, V = A, M = {}) : (M = O[ne] = O[ne] || {}, V = y);
        for (L in V)
          I = A && A[L], I && ((!("kill" in I.d) || I.d.kill(L) === !0) && Jg(this, I, "_pt"), delete A[L]), M !== "all" && (M[L] = 1);
      }
    return this._initted && !this._pt && R && Tv(this), this;
  }, l.to = function(p, y) {
    return new l(p, y, arguments[2]);
  }, l.from = function(p, y) {
    return Rv(1, arguments);
  }, l.delayedCall = function(p, y, h, E) {
    return new l(y, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: p,
      onComplete: y,
      onReverseComplete: y,
      onCompleteParams: h,
      onReverseCompleteParams: h,
      callbackScope: E
    });
  }, l.fromTo = function(p, y, h) {
    return Rv(2, arguments);
  }, l.set = function(p, y) {
    return y.duration = 0, y.repeatDelay || (y.repeat = 0), new l(p, y);
  }, l.killTweensOf = function(p, y, h) {
    return Un.killTweensOf(p, y, h);
  }, l;
}(Av);
Ui(dr.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
oi("staggerTo,staggerFrom,staggerFromTo", function(_) {
  dr[_] = function() {
    var l = new Pa(), s = HE.call(arguments, 0);
    return s.splice(_ === "staggerFromTo" ? 5 : 4, 0, 0), l[_].apply(l, s);
  };
});
var fC = function(l, s, f) {
  return l[s] = f;
}, Db = function(l, s, f) {
  return l[s](f);
}, t2 = function(l, s, f, p) {
  return l[s](p.fp, f);
}, n2 = function(l, s, f) {
  return l.setAttribute(s, f);
}, dC = function(l, s) {
  return qn(l[s]) ? Db : tC(l[s]) && l.setAttribute ? n2 : fC;
}, Ob = function(l, s) {
  return s.set(s.t, s.p, Math.round((s.s + s.c * l) * 1e6) / 1e6, s);
}, r2 = function(l, s) {
  return s.set(s.t, s.p, !!(s.s + s.c * l), s);
}, Mb = function(l, s) {
  var f = s._pt, p = "";
  if (!l && s.b)
    p = s.b;
  else if (l === 1 && s.e)
    p = s.e;
  else {
    for (; f; )
      p = f.p + (f.m ? f.m(f.s + f.c * l) : Math.round((f.s + f.c * l) * 1e4) / 1e4) + p, f = f._next;
    p += s.c;
  }
  s.set(s.t, s.p, p, s);
}, pC = function(l, s) {
  for (var f = s._pt; f; )
    f.r(l, f.d), f = f._next;
}, a2 = function(l, s, f, p) {
  for (var y = this._pt, h; y; )
    h = y._next, y.p === p && y.modifier(l, s, f), y = h;
}, i2 = function(l) {
  for (var s = this._pt, f, p; s; )
    p = s._next, s.p === l && !s.op || s.op === l ? Jg(this, s, "_pt") : s.dep || (f = 1), s = p;
  return !f;
}, l2 = function(l, s, f, p) {
  p.mSet(l, s, p.m.call(p.tween, f, p.mt), p);
}, Lb = function(l) {
  for (var s = l._pt, f, p, y, h; s; ) {
    for (f = s._next, p = y; p && p.pr > s.pr; )
      p = p._next;
    (s._prev = p ? p._prev : h) ? s._prev._next = s : y = s, (s._next = p) ? p._prev = s : h = s, s = f;
  }
  l._pt = y;
}, ui = /* @__PURE__ */ function() {
  function _(s, f, p, y, h, E, T, x, R) {
    this.t = f, this.s = y, this.c = h, this.p = p, this.r = E || Ob, this.d = T || this, this.set = x || fC, this.pr = R || 0, this._next = s, s && (s._prev = this);
  }
  var l = _.prototype;
  return l.modifier = function(f, p, y) {
    this.mSet = this.mSet || this.set, this.set = l2, this.m = f, this.mt = y, this.tween = p;
  }, _;
}();
oi(lC + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(_) {
  return iC[_] = 1;
});
zi.TweenMax = zi.TweenLite = dr;
zi.TimelineLite = zi.TimelineMax = Pa;
Un = new Pa({
  sortChildren: !1,
  defaults: sp,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
Ai.stringFilter = Eb;
var pf = [], Pg = {}, o2 = [], bx = 0, u2 = 0, xE = function(l) {
  return (Pg[l] || o2).map(function(s) {
    return s();
  });
}, YE = function() {
  var l = Date.now(), s = [];
  l - bx > 2 && (xE("matchMediaInit"), pf.forEach(function(f) {
    var p = f.queries, y = f.conditions, h, E, T, x;
    for (E in p)
      h = Lo.matchMedia(p[E]).matches, h && (T = 1), h !== y[E] && (y[E] = h, x = 1);
    x && (f.revert(), T && s.push(f));
  }), xE("matchMediaRevert"), s.forEach(function(f) {
    return f.onMatch(f, function(p) {
      return f.add(null, p);
    });
  }), bx = l, xE("matchMedia"));
}, Nb = /* @__PURE__ */ function() {
  function _(s, f) {
    this.selector = f && BE(f), this.data = [], this._r = [], this.isReverted = !1, this.id = u2++, s && this.add(s);
  }
  var l = _.prototype;
  return l.add = function(f, p, y) {
    qn(f) && (y = p, p = f, f = qn);
    var h = this, E = function() {
      var x = xn, R = h.selector, O;
      return x && x !== h && x.data.push(h), y && (h.selector = BE(y)), xn = h, O = p.apply(h, arguments), qn(O) && h._r.push(O), xn = x, h.selector = R, h.isReverted = !1, O;
    };
    return h.last = E, f === qn ? E(h, function(T) {
      return h.add(null, T);
    }) : f ? h[f] = E : E;
  }, l.ignore = function(f) {
    var p = xn;
    xn = null, f(this), xn = p;
  }, l.getTweens = function() {
    var f = [];
    return this.data.forEach(function(p) {
      return p instanceof _ ? f.push.apply(f, p.getTweens()) : p instanceof dr && !(p.parent && p.parent.data === "nested") && f.push(p);
    }), f;
  }, l.clear = function() {
    this._r.length = this.data.length = 0;
  }, l.kill = function(f, p) {
    var y = this;
    if (f ? function() {
      for (var E = y.getTweens(), T = y.data.length, x; T--; )
        x = y.data[T], x.data === "isFlip" && (x.revert(), x.getChildren(!0, !0, !1).forEach(function(R) {
          return E.splice(E.indexOf(R), 1);
        }));
      for (E.map(function(R) {
        return {
          g: R._dur || R._delay || R._sat && !R._sat.vars.immediateRender ? R.globalTime(0) : -1 / 0,
          t: R
        };
      }).sort(function(R, O) {
        return O.g - R.g || -1 / 0;
      }).forEach(function(R) {
        return R.t.revert(f);
      }), T = y.data.length; T--; )
        x = y.data[T], x instanceof Pa ? x.data !== "nested" && (x.scrollTrigger && x.scrollTrigger.revert(), x.kill()) : !(x instanceof dr) && x.revert && x.revert(f);
      y._r.forEach(function(R) {
        return R(f, y);
      }), y.isReverted = !0;
    }() : this.data.forEach(function(E) {
      return E.kill && E.kill();
    }), this.clear(), p)
      for (var h = pf.length; h--; )
        pf[h].id === this.id && pf.splice(h, 1);
  }, l.revert = function(f) {
    this.kill(f || {});
  }, _;
}(), s2 = /* @__PURE__ */ function() {
  function _(s) {
    this.contexts = [], this.scope = s, xn && xn.data.push(this);
  }
  var l = _.prototype;
  return l.add = function(f, p, y) {
    zo(f) || (f = {
      matches: f
    });
    var h = new Nb(0, y || this.scope), E = h.conditions = {}, T, x, R;
    xn && !h.selector && (h.selector = xn.selector), this.contexts.push(h), p = h.add("onMatch", p), h.queries = f;
    for (x in f)
      x === "all" ? R = 1 : (T = Lo.matchMedia(f[x]), T && (pf.indexOf(h) < 0 && pf.push(h), (E[x] = T.matches) && (R = 1), T.addListener ? T.addListener(YE) : T.addEventListener("change", YE)));
    return R && p(h, function(O) {
      return h.add(null, O);
    }), this;
  }, l.revert = function(f) {
    this.kill(f || {});
  }, l.kill = function(f) {
    this.contexts.forEach(function(p) {
      return p.kill(f, !0);
    });
  }, _;
}(), $g = {
  registerPlugin: function() {
    for (var l = arguments.length, s = new Array(l), f = 0; f < l; f++)
      s[f] = arguments[f];
    s.forEach(function(p) {
      return gb(p);
    });
  },
  timeline: function(l) {
    return new Pa(l);
  },
  getTweensOf: function(l, s) {
    return Un.getTweensOf(l, s);
  },
  getProperty: function(l, s, f, p) {
    Ur(l) && (l = hl(l)[0]);
    var y = cf(l || {}).get, h = f ? ib : ab;
    return f === "native" && (f = ""), l && (s ? h((Oi[s] && Oi[s].get || y)(l, s, f, p)) : function(E, T, x) {
      return h((Oi[E] && Oi[E].get || y)(l, E, T, x));
    });
  },
  quickSetter: function(l, s, f) {
    if (l = hl(l), l.length > 1) {
      var p = l.map(function(R) {
        return ci.quickSetter(R, s, f);
      }), y = p.length;
      return function(R) {
        for (var O = y; O--; )
          p[O](R);
      };
    }
    l = l[0] || {};
    var h = Oi[s], E = cf(l), T = E.harness && (E.harness.aliases || {})[s] || s, x = h ? function(R) {
      var O = new h();
      ip._pt = 0, O.init(l, f ? R + f : R, ip, 0, [l]), O.render(1, O), ip._pt && pC(1, ip);
    } : E.set(l, T);
    return h ? x : function(R) {
      return x(l, T, f ? R + f : R, E, 1);
    };
  },
  quickTo: function(l, s, f) {
    var p, y = ci.to(l, Ui((p = {}, p[s] = "+=0.1", p.paused = !0, p.stagger = 0, p), f || {})), h = function(T, x, R) {
      return y.resetTo(s, T, x, R);
    };
    return h.tween = y, h;
  },
  isTweening: function(l) {
    return Un.getTweensOf(l, !0).length > 0;
  },
  defaults: function(l) {
    return l && l.ease && (l.ease = df(l.ease, sp.ease)), Ex(sp, l || {});
  },
  config: function(l) {
    return Ex(Ai, l || {});
  },
  registerEffect: function(l) {
    var s = l.name, f = l.effect, p = l.plugins, y = l.defaults, h = l.extendTimeline;
    (p || "").split(",").forEach(function(E) {
      return E && !Oi[E] && !zi[E] && Ov(s + " effect requires " + E + " plugin.");
    }), EE[s] = function(E, T, x) {
      return f(hl(E), Ui(T || {}, y), x);
    }, h && (Pa.prototype[s] = function(E, T, x) {
      return this.add(EE[s](E, zo(T) ? T : (x = T) && {}, this), x);
    });
  },
  registerEase: function(l, s) {
    Ft[l] = df(s);
  },
  parseEase: function(l, s) {
    return arguments.length ? df(l, s) : Ft;
  },
  getById: function(l) {
    return Un.getById(l);
  },
  exportRoot: function(l, s) {
    l === void 0 && (l = {});
    var f = new Pa(l), p, y;
    for (f.smoothChildTiming = li(l.smoothChildTiming), Un.remove(f), f._dp = 0, f._time = f._tTime = Un._time, p = Un._first; p; )
      y = p._next, (s || !(!p._dur && p instanceof dr && p.vars.onComplete === p._targets[0])) && No(f, p, p._start - p._delay), p = y;
    return No(Un, f, 0), f;
  },
  context: function(l, s) {
    return l ? new Nb(l, s) : xn;
  },
  matchMedia: function(l) {
    return new s2(l);
  },
  matchMediaRefresh: function() {
    return pf.forEach(function(l) {
      var s = l.conditions, f, p;
      for (p in s)
        s[p] && (s[p] = !1, f = 1);
      f && l.revert();
    }) || YE();
  },
  addEventListener: function(l, s) {
    var f = Pg[l] || (Pg[l] = []);
    ~f.indexOf(s) || f.push(s);
  },
  removeEventListener: function(l, s) {
    var f = Pg[l], p = f && f.indexOf(s);
    p >= 0 && f.splice(p, 1);
  },
  utils: {
    wrap: BN,
    wrapYoyo: VN,
    distribute: db,
    random: hb,
    snap: pb,
    normalize: HN,
    getUnit: Ea,
    clamp: UN,
    splitColor: _b,
    toArray: hl,
    selector: BE,
    mapRange: mb,
    pipe: PN,
    unitize: jN,
    interpolate: IN,
    shuffle: fb
  },
  install: Zx,
  effects: EE,
  ticker: Mi,
  updateRoot: Pa.updateRoot,
  plugins: Oi,
  globalTimeline: Un,
  core: {
    PropTween: ui,
    globals: eb,
    Tween: dr,
    Timeline: Pa,
    Animation: Av,
    getCache: cf,
    _removeLinkedListItem: Jg,
    reverting: function() {
      return na;
    },
    context: function(l) {
      return l && xn && (xn.data.push(l), l._ctx = xn), xn;
    },
    suppressOverwrites: function(l) {
      return eC = l;
    }
  }
};
oi("to,from,fromTo,delayedCall,set,killTweensOf", function(_) {
  return $g[_] = dr[_];
});
Mi.add(Pa.updateRoot);
ip = $g.to({}, {
  duration: 0
});
var c2 = function(l, s) {
  for (var f = l._pt; f && f.p !== s && f.op !== s && f.fp !== s; )
    f = f._next;
  return f;
}, f2 = function(l, s) {
  var f = l._targets, p, y, h;
  for (p in s)
    for (y = f.length; y--; )
      h = l._ptLookup[y][p], h && (h = h.d) && (h._pt && (h = c2(h, p)), h && h.modifier && h.modifier(s[p], l, f[y], p));
}, bE = function(l, s) {
  return {
    name: l,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(p, y, h) {
      h._onInit = function(E) {
        var T, x;
        if (Ur(y) && (T = {}, oi(y, function(R) {
          return T[R] = 1;
        }), y = T), s) {
          T = {};
          for (x in y)
            T[x] = s(y[x]);
          y = T;
        }
        f2(E, y);
      };
    }
  };
}, ci = $g.registerPlugin({
  name: "attr",
  init: function(l, s, f, p, y) {
    var h, E, T;
    this.tween = f;
    for (h in s)
      T = l.getAttribute(h) || "", E = this.add(l, "setAttribute", (T || 0) + "", s[h], p, y, 0, 0, h), E.op = h, E.b = T, this._props.push(h);
  },
  render: function(l, s) {
    for (var f = s._pt; f; )
      na ? f.set(f.t, f.p, f.b, f) : f.r(l, f.d), f = f._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(l, s) {
    for (var f = s.length; f--; )
      this.add(l, f, l[f] || 0, s[f], 0, 0, 0, 0, 0, 1);
  }
}, bE("roundProps", VE), bE("modifiers"), bE("snap", pb)) || $g;
dr.version = Pa.version = ci.version = "3.14.2";
Jx = 1;
nC() && pp();
Ft.Power0;
Ft.Power1;
Ft.Power2;
Ft.Power3;
Ft.Power4;
Ft.Linear;
Ft.Quad;
Ft.Cubic;
Ft.Quart;
Ft.Quint;
Ft.Strong;
Ft.Elastic;
Ft.Back;
Ft.SteppedEase;
Ft.Bounce;
Ft.Sine;
Ft.Expo;
Ft.Circ;
/*!
 * CSSPlugin 3.14.2
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Rx, Ns, op, hC, uf, kx, vC, d2 = function() {
  return typeof window < "u";
}, Nu = {}, of = 180 / Math.PI, up = Math.PI / 180, np = Math.atan2, Dx = 1e8, mC = /([A-Z])/g, p2 = /(left|right|width|margin|padding|x)/i, h2 = /[\s,\(]\S/, Ao = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, WE = function(l, s) {
  return s.set(s.t, s.p, Math.round((s.s + s.c * l) * 1e4) / 1e4 + s.u, s);
}, v2 = function(l, s) {
  return s.set(s.t, s.p, l === 1 ? s.e : Math.round((s.s + s.c * l) * 1e4) / 1e4 + s.u, s);
}, m2 = function(l, s) {
  return s.set(s.t, s.p, l ? Math.round((s.s + s.c * l) * 1e4) / 1e4 + s.u : s.b, s);
}, y2 = function(l, s) {
  return s.set(s.t, s.p, l === 1 ? s.e : l ? Math.round((s.s + s.c * l) * 1e4) / 1e4 + s.u : s.b, s);
}, g2 = function(l, s) {
  var f = s.s + s.c * l;
  s.set(s.t, s.p, ~~(f + (f < 0 ? -0.5 : 0.5)) + s.u, s);
}, Ab = function(l, s) {
  return s.set(s.t, s.p, l ? s.e : s.b, s);
}, zb = function(l, s) {
  return s.set(s.t, s.p, l !== 1 ? s.b : s.e, s);
}, _2 = function(l, s, f) {
  return l.style[s] = f;
}, S2 = function(l, s, f) {
  return l.style.setProperty(s, f);
}, E2 = function(l, s, f) {
  return l._gsap[s] = f;
}, C2 = function(l, s, f) {
  return l._gsap.scaleX = l._gsap.scaleY = f;
}, w2 = function(l, s, f, p, y) {
  var h = l._gsap;
  h.scaleX = h.scaleY = f, h.renderTransform(y, h);
}, T2 = function(l, s, f, p, y) {
  var h = l._gsap;
  h[s] = f, h.renderTransform(y, h);
}, Fn = "transform", si = Fn + "Origin", x2 = function _(l, s) {
  var f = this, p = this.target, y = p.style, h = p._gsap;
  if (l in Nu && y) {
    if (this.tfm = this.tfm || {}, l !== "transform")
      l = Ao[l] || l, ~l.indexOf(",") ? l.split(",").forEach(function(E) {
        return f.tfm[E] = Mu(p, E);
      }) : this.tfm[l] = h.x ? h[l] : Mu(p, l), l === si && (this.tfm.zOrigin = h.zOrigin);
    else
      return Ao.transform.split(",").forEach(function(E) {
        return _.call(f, E, s);
      });
    if (this.props.indexOf(Fn) >= 0)
      return;
    h.svg && (this.svgo = p.getAttribute("data-svg-origin"), this.props.push(si, s, "")), l = Fn;
  }
  (y || s) && this.props.push(l, s, y[l]);
}, Ub = function(l) {
  l.translate && (l.removeProperty("translate"), l.removeProperty("scale"), l.removeProperty("rotate"));
}, b2 = function() {
  var l = this.props, s = this.target, f = s.style, p = s._gsap, y, h;
  for (y = 0; y < l.length; y += 3)
    l[y + 1] ? l[y + 1] === 2 ? s[l[y]](l[y + 2]) : s[l[y]] = l[y + 2] : l[y + 2] ? f[l[y]] = l[y + 2] : f.removeProperty(l[y].substr(0, 2) === "--" ? l[y] : l[y].replace(mC, "-$1").toLowerCase());
  if (this.tfm) {
    for (h in this.tfm)
      p[h] = this.tfm[h];
    p.svg && (p.renderTransform(), s.setAttribute("data-svg-origin", this.svgo || "")), y = vC(), (!y || !y.isStart) && !f[Fn] && (Ub(f), p.zOrigin && f[si] && (f[si] += " " + p.zOrigin + "px", p.zOrigin = 0, p.renderTransform()), p.uncache = 1);
  }
}, Fb = function(l, s) {
  var f = {
    target: l,
    props: [],
    revert: b2,
    save: x2
  };
  return l._gsap || ci.core.getCache(l), s && l.style && l.nodeType && s.split(",").forEach(function(p) {
    return f.save(p);
  }), f;
}, Pb, $E = function(l, s) {
  var f = Ns.createElementNS ? Ns.createElementNS((s || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), l) : Ns.createElement(l);
  return f && f.style ? f : Ns.createElement(l);
}, Ni = function _(l, s, f) {
  var p = getComputedStyle(l);
  return p[s] || p.getPropertyValue(s.replace(mC, "-$1").toLowerCase()) || p.getPropertyValue(s) || !f && _(l, hp(s) || s, 1) || "";
}, Ox = "O,Moz,ms,Ms,Webkit".split(","), hp = function(l, s, f) {
  var p = s || uf, y = p.style, h = 5;
  if (l in y && !f)
    return l;
  for (l = l.charAt(0).toUpperCase() + l.substr(1); h-- && !(Ox[h] + l in y); )
    ;
  return h < 0 ? null : (h === 3 ? "ms" : h >= 0 ? Ox[h] : "") + l;
}, GE = function() {
  d2() && window.document && (Rx = window, Ns = Rx.document, op = Ns.documentElement, uf = $E("div") || {
    style: {}
  }, $E("div"), Fn = hp(Fn), si = Fn + "Origin", uf.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Pb = !!hp("perspective"), vC = ci.core.reverting, hC = 1);
}, Mx = function(l) {
  var s = l.ownerSVGElement, f = $E("svg", s && s.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), p = l.cloneNode(!0), y;
  p.style.display = "block", f.appendChild(p), op.appendChild(f);
  try {
    y = p.getBBox();
  } catch {
  }
  return f.removeChild(p), op.removeChild(f), y;
}, Lx = function(l, s) {
  for (var f = s.length; f--; )
    if (l.hasAttribute(s[f]))
      return l.getAttribute(s[f]);
}, jb = function(l) {
  var s, f;
  try {
    s = l.getBBox();
  } catch {
    s = Mx(l), f = 1;
  }
  return s && (s.width || s.height) || f || (s = Mx(l)), s && !s.width && !s.x && !s.y ? {
    x: +Lx(l, ["x", "cx", "x1"]) || 0,
    y: +Lx(l, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : s;
}, Hb = function(l) {
  return !!(l.getCTM && (!l.parentNode || l.ownerSVGElement) && jb(l));
}, js = function(l, s) {
  if (s) {
    var f = l.style, p;
    s in Nu && s !== si && (s = Fn), f.removeProperty ? (p = s.substr(0, 2), (p === "ms" || s.substr(0, 6) === "webkit") && (s = "-" + s), f.removeProperty(p === "--" ? s : s.replace(mC, "-$1").toLowerCase())) : f.removeAttribute(s);
  }
}, As = function(l, s, f, p, y, h) {
  var E = new ui(l._pt, s, f, 0, 1, h ? zb : Ab);
  return l._pt = E, E.b = p, E.e = y, l._props.push(f), E;
}, Nx = {
  deg: 1,
  rad: 1,
  turn: 1
}, R2 = {
  grid: 1,
  flex: 1
}, Hs = function _(l, s, f, p) {
  var y = parseFloat(f) || 0, h = (f + "").trim().substr((y + "").length) || "px", E = uf.style, T = p2.test(s), x = l.tagName.toLowerCase() === "svg", R = (x ? "client" : "offset") + (T ? "Width" : "Height"), O = 100, A = p === "px", M = p === "%", V, L, I, ne;
  if (p === h || !y || Nx[p] || Nx[h])
    return y;
  if (h !== "px" && !A && (y = _(l, s, f, "px")), ne = l.getCTM && Hb(l), (M || h === "%") && (Nu[s] || ~s.indexOf("adius")))
    return V = ne ? l.getBBox()[T ? "width" : "height"] : l[R], ar(M ? y / V * O : y / 100 * V);
  if (E[T ? "width" : "height"] = O + (A ? h : p), L = p !== "rem" && ~s.indexOf("adius") || p === "em" && l.appendChild && !x ? l : l.parentNode, ne && (L = (l.ownerSVGElement || {}).parentNode), (!L || L === Ns || !L.appendChild) && (L = Ns.body), I = L._gsap, I && M && I.width && T && I.time === Mi.time && !I.uncache)
    return ar(y / I.width * O);
  if (M && (s === "height" || s === "width")) {
    var ee = l.style[s];
    l.style[s] = O + p, V = l[R], ee ? l.style[s] = ee : js(l, s);
  } else
    (M || h === "%") && !R2[Ni(L, "display")] && (E.position = Ni(l, "position")), L === l && (E.position = "static"), L.appendChild(uf), V = uf[R], L.removeChild(uf), E.position = "absolute";
  return T && M && (I = cf(L), I.time = Mi.time, I.width = L[R]), ar(A ? V * y / O : V && y ? O / V * y : 0);
}, Mu = function(l, s, f, p) {
  var y;
  return hC || GE(), s in Ao && s !== "transform" && (s = Ao[s], ~s.indexOf(",") && (s = s.split(",")[0])), Nu[s] && s !== "transform" ? (y = Uv(l, p), y = s !== "transformOrigin" ? y[s] : y.svg ? y.origin : Qg(Ni(l, si)) + " " + y.zOrigin + "px") : (y = l.style[s], (!y || y === "auto" || p || ~(y + "").indexOf("calc(")) && (y = Gg[s] && Gg[s](l, s, f) || Ni(l, s) || nb(l, s) || (s === "opacity" ? 1 : 0))), f && !~(y + "").trim().indexOf(" ") ? Hs(l, s, y, f) + f : y;
}, k2 = function(l, s, f, p) {
  if (!f || f === "none") {
    var y = hp(s, l, 1), h = y && Ni(l, y, 1);
    h && h !== f ? (s = y, f = h) : s === "borderColor" && (f = Ni(l, "borderTopColor"));
  }
  var E = new ui(this._pt, l.style, s, 0, 1, Mb), T = 0, x = 0, R, O, A, M, V, L, I, ne, ee, Q, ie, Y;
  if (E.b = f, E.e = p, f += "", p += "", p.substring(0, 6) === "var(--" && (p = Ni(l, p.substring(4, p.indexOf(")")))), p === "auto" && (L = l.style[s], l.style[s] = p, p = Ni(l, s) || p, L ? l.style[s] = L : js(l, s)), R = [f, p], Eb(R), f = R[0], p = R[1], A = f.match(ap) || [], Y = p.match(ap) || [], Y.length) {
    for (; O = ap.exec(p); )
      I = O[0], ee = p.substring(T, O.index), V ? V = (V + 1) % 5 : (ee.substr(-5) === "rgba(" || ee.substr(-5) === "hsla(") && (V = 1), I !== (L = A[x++] || "") && (M = parseFloat(L) || 0, ie = L.substr((M + "").length), I.charAt(1) === "=" && (I = lp(M, I) + ie), ne = parseFloat(I), Q = I.substr((ne + "").length), T = ap.lastIndex - Q.length, Q || (Q = Q || Ai.units[s] || ie, T === p.length && (p += Q, E.e += Q)), ie !== Q && (M = Hs(l, s, L, Q) || 0), E._pt = {
        _next: E._pt,
        p: ee || x === 1 ? ee : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: M,
        c: ne - M,
        m: V && V < 4 || s === "zIndex" ? Math.round : 0
      });
    E.c = T < p.length ? p.substring(T, p.length) : "";
  } else
    E.r = s === "display" && p === "none" ? zb : Ab;
  return Kx.test(p) && (E.e = 0), this._pt = E, E;
}, Ax = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, D2 = function(l) {
  var s = l.split(" "), f = s[0], p = s[1] || "50%";
  return (f === "top" || f === "bottom" || p === "left" || p === "right") && (l = f, f = p, p = l), s[0] = Ax[f] || f, s[1] = Ax[p] || p, s.join(" ");
}, O2 = function(l, s) {
  if (s.tween && s.tween._time === s.tween._dur) {
    var f = s.t, p = f.style, y = s.u, h = f._gsap, E, T, x;
    if (y === "all" || y === !0)
      p.cssText = "", T = 1;
    else
      for (y = y.split(","), x = y.length; --x > -1; )
        E = y[x], Nu[E] && (T = 1, E = E === "transformOrigin" ? si : Fn), js(f, E);
    T && (js(f, Fn), h && (h.svg && f.removeAttribute("transform"), p.scale = p.rotate = p.translate = "none", Uv(f, 1), h.uncache = 1, Ub(p)));
  }
}, Gg = {
  clearProps: function(l, s, f, p, y) {
    if (y.data !== "isFromStart") {
      var h = l._pt = new ui(l._pt, s, f, 0, 0, O2);
      return h.u = p, h.pr = -10, h.tween = y, l._props.push(f), 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */
}, zv = [1, 0, 0, 1, 0, 0], Bb = {}, Vb = function(l) {
  return l === "matrix(1, 0, 0, 1, 0, 0)" || l === "none" || !l;
}, zx = function(l) {
  var s = Ni(l, Fn);
  return Vb(s) ? zv : s.substr(7).match(Xx).map(ar);
}, yC = function(l, s) {
  var f = l._gsap || cf(l), p = l.style, y = zx(l), h, E, T, x;
  return f.svg && l.getAttribute("transform") ? (T = l.transform.baseVal.consolidate().matrix, y = [T.a, T.b, T.c, T.d, T.e, T.f], y.join(",") === "1,0,0,1,0,0" ? zv : y) : (y === zv && !l.offsetParent && l !== op && !f.svg && (T = p.display, p.display = "block", h = l.parentNode, (!h || !l.offsetParent && !l.getBoundingClientRect().width) && (x = 1, E = l.nextElementSibling, op.appendChild(l)), y = zx(l), T ? p.display = T : js(l, "display"), x && (E ? h.insertBefore(l, E) : h ? h.appendChild(l) : op.removeChild(l))), s && y.length > 6 ? [y[0], y[1], y[4], y[5], y[12], y[13]] : y);
}, QE = function(l, s, f, p, y, h) {
  var E = l._gsap, T = y || yC(l, !0), x = E.xOrigin || 0, R = E.yOrigin || 0, O = E.xOffset || 0, A = E.yOffset || 0, M = T[0], V = T[1], L = T[2], I = T[3], ne = T[4], ee = T[5], Q = s.split(" "), ie = parseFloat(Q[0]) || 0, Y = parseFloat(Q[1]) || 0, fe, ae, ge, se;
  f ? T !== zv && (ae = M * I - V * L) && (ge = ie * (I / ae) + Y * (-L / ae) + (L * ee - I * ne) / ae, se = ie * (-V / ae) + Y * (M / ae) - (M * ee - V * ne) / ae, ie = ge, Y = se) : (fe = jb(l), ie = fe.x + (~Q[0].indexOf("%") ? ie / 100 * fe.width : ie), Y = fe.y + (~(Q[1] || Q[0]).indexOf("%") ? Y / 100 * fe.height : Y)), p || p !== !1 && E.smooth ? (ne = ie - x, ee = Y - R, E.xOffset = O + (ne * M + ee * L) - ne, E.yOffset = A + (ne * V + ee * I) - ee) : E.xOffset = E.yOffset = 0, E.xOrigin = ie, E.yOrigin = Y, E.smooth = !!p, E.origin = s, E.originIsAbsolute = !!f, l.style[si] = "0px 0px", h && (As(h, E, "xOrigin", x, ie), As(h, E, "yOrigin", R, Y), As(h, E, "xOffset", O, E.xOffset), As(h, E, "yOffset", A, E.yOffset)), l.setAttribute("data-svg-origin", ie + " " + Y);
}, Uv = function(l, s) {
  var f = l._gsap || new xb(l);
  if ("x" in f && !s && !f.uncache)
    return f;
  var p = l.style, y = f.scaleX < 0, h = "px", E = "deg", T = getComputedStyle(l), x = Ni(l, si) || "0", R, O, A, M, V, L, I, ne, ee, Q, ie, Y, fe, ae, ge, se, Ie, Ke, $e, be, ut, Ge, pe, ce, le, Te, me, P, te, Fe, xe, Qe;
  return R = O = A = L = I = ne = ee = Q = ie = 0, M = V = 1, f.svg = !!(l.getCTM && Hb(l)), T.translate && ((T.translate !== "none" || T.scale !== "none" || T.rotate !== "none") && (p[Fn] = (T.translate !== "none" ? "translate3d(" + (T.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (T.rotate !== "none" ? "rotate(" + T.rotate + ") " : "") + (T.scale !== "none" ? "scale(" + T.scale.split(" ").join(",") + ") " : "") + (T[Fn] !== "none" ? T[Fn] : "")), p.scale = p.rotate = p.translate = "none"), ae = yC(l, f.svg), f.svg && (f.uncache ? (le = l.getBBox(), x = f.xOrigin - le.x + "px " + (f.yOrigin - le.y) + "px", ce = "") : ce = !s && l.getAttribute("data-svg-origin"), QE(l, ce || x, !!ce || f.originIsAbsolute, f.smooth !== !1, ae)), Y = f.xOrigin || 0, fe = f.yOrigin || 0, ae !== zv && (Ke = ae[0], $e = ae[1], be = ae[2], ut = ae[3], R = Ge = ae[4], O = pe = ae[5], ae.length === 6 ? (M = Math.sqrt(Ke * Ke + $e * $e), V = Math.sqrt(ut * ut + be * be), L = Ke || $e ? np($e, Ke) * of : 0, ee = be || ut ? np(be, ut) * of + L : 0, ee && (V *= Math.abs(Math.cos(ee * up))), f.svg && (R -= Y - (Y * Ke + fe * be), O -= fe - (Y * $e + fe * ut))) : (Qe = ae[6], Fe = ae[7], me = ae[8], P = ae[9], te = ae[10], xe = ae[11], R = ae[12], O = ae[13], A = ae[14], ge = np(Qe, te), I = ge * of, ge && (se = Math.cos(-ge), Ie = Math.sin(-ge), ce = Ge * se + me * Ie, le = pe * se + P * Ie, Te = Qe * se + te * Ie, me = Ge * -Ie + me * se, P = pe * -Ie + P * se, te = Qe * -Ie + te * se, xe = Fe * -Ie + xe * se, Ge = ce, pe = le, Qe = Te), ge = np(-be, te), ne = ge * of, ge && (se = Math.cos(-ge), Ie = Math.sin(-ge), ce = Ke * se - me * Ie, le = $e * se - P * Ie, Te = be * se - te * Ie, xe = ut * Ie + xe * se, Ke = ce, $e = le, be = Te), ge = np($e, Ke), L = ge * of, ge && (se = Math.cos(ge), Ie = Math.sin(ge), ce = Ke * se + $e * Ie, le = Ge * se + pe * Ie, $e = $e * se - Ke * Ie, pe = pe * se - Ge * Ie, Ke = ce, Ge = le), I && Math.abs(I) + Math.abs(L) > 359.9 && (I = L = 0, ne = 180 - ne), M = ar(Math.sqrt(Ke * Ke + $e * $e + be * be)), V = ar(Math.sqrt(pe * pe + Qe * Qe)), ge = np(Ge, pe), ee = Math.abs(ge) > 2e-4 ? ge * of : 0, ie = xe ? 1 / (xe < 0 ? -xe : xe) : 0), f.svg && (ce = l.getAttribute("transform"), f.forceCSS = l.setAttribute("transform", "") || !Vb(Ni(l, Fn)), ce && l.setAttribute("transform", ce))), Math.abs(ee) > 90 && Math.abs(ee) < 270 && (y ? (M *= -1, ee += L <= 0 ? 180 : -180, L += L <= 0 ? 180 : -180) : (V *= -1, ee += ee <= 0 ? 180 : -180)), s = s || f.uncache, f.x = R - ((f.xPercent = R && (!s && f.xPercent || (Math.round(l.offsetWidth / 2) === Math.round(-R) ? -50 : 0))) ? l.offsetWidth * f.xPercent / 100 : 0) + h, f.y = O - ((f.yPercent = O && (!s && f.yPercent || (Math.round(l.offsetHeight / 2) === Math.round(-O) ? -50 : 0))) ? l.offsetHeight * f.yPercent / 100 : 0) + h, f.z = A + h, f.scaleX = ar(M), f.scaleY = ar(V), f.rotation = ar(L) + E, f.rotationX = ar(I) + E, f.rotationY = ar(ne) + E, f.skewX = ee + E, f.skewY = Q + E, f.transformPerspective = ie + h, (f.zOrigin = parseFloat(x.split(" ")[2]) || !s && f.zOrigin || 0) && (p[si] = Qg(x)), f.xOffset = f.yOffset = 0, f.force3D = Ai.force3D, f.renderTransform = f.svg ? L2 : Pb ? Ib : M2, f.uncache = 0, f;
}, Qg = function(l) {
  return (l = l.split(" "))[0] + " " + l[1];
}, RE = function(l, s, f) {
  var p = Ea(s);
  return ar(parseFloat(s) + parseFloat(Hs(l, "x", f + "px", p))) + p;
}, M2 = function(l, s) {
  s.z = "0px", s.rotationY = s.rotationX = "0deg", s.force3D = 0, Ib(l, s);
}, rf = "0deg", Cv = "0px", af = ") ", Ib = function(l, s) {
  var f = s || this, p = f.xPercent, y = f.yPercent, h = f.x, E = f.y, T = f.z, x = f.rotation, R = f.rotationY, O = f.rotationX, A = f.skewX, M = f.skewY, V = f.scaleX, L = f.scaleY, I = f.transformPerspective, ne = f.force3D, ee = f.target, Q = f.zOrigin, ie = "", Y = ne === "auto" && l && l !== 1 || ne === !0;
  if (Q && (O !== rf || R !== rf)) {
    var fe = parseFloat(R) * up, ae = Math.sin(fe), ge = Math.cos(fe), se;
    fe = parseFloat(O) * up, se = Math.cos(fe), h = RE(ee, h, ae * se * -Q), E = RE(ee, E, -Math.sin(fe) * -Q), T = RE(ee, T, ge * se * -Q + Q);
  }
  I !== Cv && (ie += "perspective(" + I + af), (p || y) && (ie += "translate(" + p + "%, " + y + "%) "), (Y || h !== Cv || E !== Cv || T !== Cv) && (ie += T !== Cv || Y ? "translate3d(" + h + ", " + E + ", " + T + ") " : "translate(" + h + ", " + E + af), x !== rf && (ie += "rotate(" + x + af), R !== rf && (ie += "rotateY(" + R + af), O !== rf && (ie += "rotateX(" + O + af), (A !== rf || M !== rf) && (ie += "skew(" + A + ", " + M + af), (V !== 1 || L !== 1) && (ie += "scale(" + V + ", " + L + af), ee.style[Fn] = ie || "translate(0, 0)";
}, L2 = function(l, s) {
  var f = s || this, p = f.xPercent, y = f.yPercent, h = f.x, E = f.y, T = f.rotation, x = f.skewX, R = f.skewY, O = f.scaleX, A = f.scaleY, M = f.target, V = f.xOrigin, L = f.yOrigin, I = f.xOffset, ne = f.yOffset, ee = f.forceCSS, Q = parseFloat(h), ie = parseFloat(E), Y, fe, ae, ge, se;
  T = parseFloat(T), x = parseFloat(x), R = parseFloat(R), R && (R = parseFloat(R), x += R, T += R), T || x ? (T *= up, x *= up, Y = Math.cos(T) * O, fe = Math.sin(T) * O, ae = Math.sin(T - x) * -A, ge = Math.cos(T - x) * A, x && (R *= up, se = Math.tan(x - R), se = Math.sqrt(1 + se * se), ae *= se, ge *= se, R && (se = Math.tan(R), se = Math.sqrt(1 + se * se), Y *= se, fe *= se)), Y = ar(Y), fe = ar(fe), ae = ar(ae), ge = ar(ge)) : (Y = O, ge = A, fe = ae = 0), (Q && !~(h + "").indexOf("px") || ie && !~(E + "").indexOf("px")) && (Q = Hs(M, "x", h, "px"), ie = Hs(M, "y", E, "px")), (V || L || I || ne) && (Q = ar(Q + V - (V * Y + L * ae) + I), ie = ar(ie + L - (V * fe + L * ge) + ne)), (p || y) && (se = M.getBBox(), Q = ar(Q + p / 100 * se.width), ie = ar(ie + y / 100 * se.height)), se = "matrix(" + Y + "," + fe + "," + ae + "," + ge + "," + Q + "," + ie + ")", M.setAttribute("transform", se), ee && (M.style[Fn] = se);
}, N2 = function(l, s, f, p, y) {
  var h = 360, E = Ur(y), T = parseFloat(y) * (E && ~y.indexOf("rad") ? of : 1), x = T - p, R = p + x + "deg", O, A;
  return E && (O = y.split("_")[1], O === "short" && (x %= h, x !== x % (h / 2) && (x += x < 0 ? h : -h)), O === "cw" && x < 0 ? x = (x + h * Dx) % h - ~~(x / h) * h : O === "ccw" && x > 0 && (x = (x - h * Dx) % h - ~~(x / h) * h)), l._pt = A = new ui(l._pt, s, f, p, x, v2), A.e = R, A.u = "deg", l._props.push(f), A;
}, Ux = function(l, s) {
  for (var f in s)
    l[f] = s[f];
  return l;
}, A2 = function(l, s, f) {
  var p = Ux({}, f._gsap), y = "perspective,force3D,transformOrigin,svgOrigin", h = f.style, E, T, x, R, O, A, M, V;
  p.svg ? (x = f.getAttribute("transform"), f.setAttribute("transform", ""), h[Fn] = s, E = Uv(f, 1), js(f, Fn), f.setAttribute("transform", x)) : (x = getComputedStyle(f)[Fn], h[Fn] = s, E = Uv(f, 1), h[Fn] = x);
  for (T in Nu)
    x = p[T], R = E[T], x !== R && y.indexOf(T) < 0 && (M = Ea(x), V = Ea(R), O = M !== V ? Hs(f, T, x, V) : parseFloat(x), A = parseFloat(R), l._pt = new ui(l._pt, E, T, O, A - O, WE), l._pt.u = V || 0, l._props.push(T));
  Ux(E, p);
};
oi("padding,margin,Width,Radius", function(_, l) {
  var s = "Top", f = "Right", p = "Bottom", y = "Left", h = (l < 3 ? [s, f, p, y] : [s + y, s + f, p + f, p + y]).map(function(E) {
    return l < 2 ? _ + E : "border" + E + _;
  });
  Gg[l > 1 ? "border" + _ : _] = function(E, T, x, R, O) {
    var A, M;
    if (arguments.length < 4)
      return A = h.map(function(V) {
        return Mu(E, V, x);
      }), M = A.join(" "), M.split(A[0]).length === 5 ? A[0] : M;
    A = (R + "").split(" "), M = {}, h.forEach(function(V, L) {
      return M[V] = A[L] = A[L] || A[(L - 1) / 2 | 0];
    }), E.init(T, M, O);
  };
});
var Yb = {
  name: "css",
  register: GE,
  targetTest: function(l) {
    return l.style && l.nodeType;
  },
  init: function(l, s, f, p, y) {
    var h = this._props, E = l.style, T = f.vars.startAt, x, R, O, A, M, V, L, I, ne, ee, Q, ie, Y, fe, ae, ge, se;
    hC || GE(), this.styles = this.styles || Fb(l), ge = this.styles.props, this.tween = f;
    for (L in s)
      if (L !== "autoRound" && (R = s[L], !(Oi[L] && bb(L, s, f, p, l, y)))) {
        if (M = typeof R, V = Gg[L], M === "function" && (R = R.call(f, p, l, y), M = typeof R), M === "string" && ~R.indexOf("random(") && (R = Lv(R)), V)
          V(this, l, L, R, f) && (ae = 1);
        else if (L.substr(0, 2) === "--")
          x = (getComputedStyle(l).getPropertyValue(L) + "").trim(), R += "", Fs.lastIndex = 0, Fs.test(x) || (I = Ea(x), ne = Ea(R), ne ? I !== ne && (x = Hs(l, L, x, ne) + ne) : I && (R += I)), this.add(E, "setProperty", x, R, p, y, 0, 0, L), h.push(L), ge.push(L, 0, E[L]);
        else if (M !== "undefined") {
          if (T && L in T ? (x = typeof T[L] == "function" ? T[L].call(f, p, l, y) : T[L], Ur(x) && ~x.indexOf("random(") && (x = Lv(x)), Ea(x + "") || x === "auto" || (x += Ai.units[L] || Ea(Mu(l, L)) || ""), (x + "").charAt(1) === "=" && (x = Mu(l, L))) : x = Mu(l, L), A = parseFloat(x), ee = M === "string" && R.charAt(1) === "=" && R.substr(0, 2), ee && (R = R.substr(2)), O = parseFloat(R), L in Ao && (L === "autoAlpha" && (A === 1 && Mu(l, "visibility") === "hidden" && O && (A = 0), ge.push("visibility", 0, E.visibility), As(this, E, "visibility", A ? "inherit" : "hidden", O ? "inherit" : "hidden", !O)), L !== "scale" && L !== "transform" && (L = Ao[L], ~L.indexOf(",") && (L = L.split(",")[0]))), Q = L in Nu, Q) {
            if (this.styles.save(L), se = R, M === "string" && R.substring(0, 6) === "var(--") {
              if (R = Ni(l, R.substring(4, R.indexOf(")"))), R.substring(0, 5) === "calc(") {
                var Ie = l.style.perspective;
                l.style.perspective = R, R = Ni(l, "perspective"), Ie ? l.style.perspective = Ie : js(l, "perspective");
              }
              O = parseFloat(R);
            }
            if (ie || (Y = l._gsap, Y.renderTransform && !s.parseTransform || Uv(l, s.parseTransform), fe = s.smoothOrigin !== !1 && Y.smooth, ie = this._pt = new ui(this._pt, E, Fn, 0, 1, Y.renderTransform, Y, 0, -1), ie.dep = 1), L === "scale")
              this._pt = new ui(this._pt, Y, "scaleY", Y.scaleY, (ee ? lp(Y.scaleY, ee + O) : O) - Y.scaleY || 0, WE), this._pt.u = 0, h.push("scaleY", L), L += "X";
            else if (L === "transformOrigin") {
              ge.push(si, 0, E[si]), R = D2(R), Y.svg ? QE(l, R, 0, fe, 0, this) : (ne = parseFloat(R.split(" ")[2]) || 0, ne !== Y.zOrigin && As(this, Y, "zOrigin", Y.zOrigin, ne), As(this, E, L, Qg(x), Qg(R)));
              continue;
            } else if (L === "svgOrigin") {
              QE(l, R, 1, fe, 0, this);
              continue;
            } else if (L in Bb) {
              N2(this, Y, L, A, ee ? lp(A, ee + R) : R);
              continue;
            } else if (L === "smoothOrigin") {
              As(this, Y, "smooth", Y.smooth, R);
              continue;
            } else if (L === "force3D") {
              Y[L] = R;
              continue;
            } else if (L === "transform") {
              A2(this, R, l);
              continue;
            }
          } else L in E || (L = hp(L) || L);
          if (Q || (O || O === 0) && (A || A === 0) && !h2.test(R) && L in E)
            I = (x + "").substr((A + "").length), O || (O = 0), ne = Ea(R) || (L in Ai.units ? Ai.units[L] : I), I !== ne && (A = Hs(l, L, x, ne)), this._pt = new ui(this._pt, Q ? Y : E, L, A, (ee ? lp(A, ee + O) : O) - A, !Q && (ne === "px" || L === "zIndex") && s.autoRound !== !1 ? g2 : WE), this._pt.u = ne || 0, Q && se !== R ? (this._pt.b = x, this._pt.e = se, this._pt.r = y2) : I !== ne && ne !== "%" && (this._pt.b = x, this._pt.r = m2);
          else if (L in E)
            k2.call(this, l, L, x, ee ? ee + R : R);
          else if (L in l)
            this.add(l, L, x || l[L], ee ? ee + R : R, p, y);
          else if (L !== "parseTransform") {
            aC(L, R);
            continue;
          }
          Q || (L in E ? ge.push(L, 0, E[L]) : typeof l[L] == "function" ? ge.push(L, 2, l[L]()) : ge.push(L, 1, x || l[L])), h.push(L);
        }
      }
    ae && Lb(this);
  },
  render: function(l, s) {
    if (s.tween._time || !vC())
      for (var f = s._pt; f; )
        f.r(l, f.d), f = f._next;
    else
      s.styles.revert();
  },
  get: Mu,
  aliases: Ao,
  getSetter: function(l, s, f) {
    var p = Ao[s];
    return p && p.indexOf(",") < 0 && (s = p), s in Nu && s !== si && (l._gsap.x || Mu(l, "x")) ? f && kx === f ? s === "scale" ? C2 : E2 : (kx = f || {}) && (s === "scale" ? w2 : T2) : l.style && !tC(l.style[s]) ? _2 : ~s.indexOf("-") ? S2 : dC(l, s);
  },
  core: {
    _removeProperty: js,
    _getMatrix: yC
  }
};
ci.utils.checkPrefix = hp;
ci.core.getStyleSaver = Fb;
(function(_, l, s, f) {
  var p = oi(_ + "," + l + "," + s, function(y) {
    Nu[y] = 1;
  });
  oi(l, function(y) {
    Ai.units[y] = "deg", Bb[y] = 1;
  }), Ao[p[13]] = _ + "," + l, oi(f, function(y) {
    var h = y.split(":");
    Ao[h[1]] = p[h[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
oi("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(_) {
  Ai.units[_] = "px";
});
ci.registerPlugin(Yb);
var Ms = ci.registerPlugin(Yb) || ci;
Ms.core.Tween;
/*!
 * @gsap/react 2.1.2
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
let Fx = typeof document < "u" ? Yt.useLayoutEffect : Yt.useEffect, Px = (_) => _ && !Array.isArray(_) && typeof _ == "object", zg = [], z2 = {}, Wb = Ms;
const gC = (_, l = zg) => {
  let s = z2;
  Px(_) ? (s = _, _ = null, l = "dependencies" in s ? s.dependencies : zg) : Px(l) && (s = l, l = "dependencies" in s ? s.dependencies : zg), _ && typeof _ != "function" && console.warn("First parameter must be a function or config object");
  const { scope: f, revertOnUpdate: p } = s, y = Yt.useRef(!1), h = Yt.useRef(Wb.context(() => {
  }, f)), E = Yt.useRef((x) => h.current.add(null, x)), T = l && l.length && !p;
  return T && Fx(() => (y.current = !0, () => h.current.revert()), zg), Fx(() => {
    if (_ && h.current.add(_, f), !T || !y.current)
      return () => h.current.revert();
  }, l), { context: h.current, contextSafe: E.current };
};
gC.register = (_) => {
  Wb = _;
};
gC.headless = !0;
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U2 = (_) => _.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), $b = (..._) => _.filter((l, s, f) => !!l && l.trim() !== "" && f.indexOf(l) === s).join(" ").trim();
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var F2 = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const P2 = Yt.forwardRef(
  ({
    color: _ = "currentColor",
    size: l = 24,
    strokeWidth: s = 2,
    absoluteStrokeWidth: f,
    className: p = "",
    children: y,
    iconNode: h,
    ...E
  }, T) => Yt.createElement(
    "svg",
    {
      ref: T,
      ...F2,
      width: l,
      height: l,
      stroke: _,
      strokeWidth: f ? Number(s) * 24 / Number(l) : s,
      className: $b("lucide", p),
      ...E
    },
    [
      ...h.map(([x, R]) => Yt.createElement(x, R)),
      ...Array.isArray(y) ? y : [y]
    ]
  )
);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vf = (_, l) => {
  const s = Yt.forwardRef(
    ({ className: f, ...p }, y) => Yt.createElement(P2, {
      ref: y,
      iconNode: l,
      className: $b(`lucide-${U2(_)}`, f),
      ...p
    })
  );
  return s.displayName = `${_}`, s;
};
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j2 = vf("ArrowUp", [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const H2 = vf("Globe", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B2 = vf("HeartOff", [
  ["line", { x1: "2", y1: "2", x2: "22", y2: "22", key: "1w4vcy" }],
  [
    "path",
    { d: "M16.5 16.5 12 21l-7-7c-1.5-1.45-3-3.2-3-5.5a5.5 5.5 0 0 1 2.14-4.35", key: "3mpagl" }
  ],
  [
    "path",
    {
      d: "M8.76 3.1c1.15.22 2.13.78 3.24 1.9 1.5-1.5 2.74-2 4.5-2A5.5 5.5 0 0 1 22 8.5c0 2.12-1.3 3.78-2.67 5.17",
      key: "1gh3v3"
    }
  ]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V2 = vf("Heart", [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I2 = vf("House", [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y2 = vf("MessageCircle", [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const W2 = vf("Trash2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
]), rp = Yt.forwardRef(
  ({ id: _, className: l, label: s, icon: f, badgeCount: p, onClick: y, onMouseEnter: h, onMouseLeave: E }, T) => /* @__PURE__ */ Ye.jsxs(
    "div",
    {
      id: _,
      ref: T,
      className: `fab-card ${l}`,
      onClick: y,
      onMouseEnter: h,
      onMouseLeave: E,
      children: [
        /* @__PURE__ */ Ye.jsx(f, { className: "card-icon" }),
        /* @__PURE__ */ Ye.jsx("span", { className: "card-label", children: s }),
        p !== void 0 && p > 0 && /* @__PURE__ */ Ye.jsx("span", { className: "fab-badge", children: p })
      ]
    }
  )
);
rp.displayName = "ActionCard";
function $2({ isOpen: _, wishlist: l, onClose: s, onRemove: f }) {
  return /* @__PURE__ */ Ye.jsxs(Ye.Fragment, { children: [
    /* @__PURE__ */ Ye.jsx(
      "div",
      {
        className: `modal-overlay ${_ ? "active" : ""}`,
        onClick: s
      }
    ),
    /* @__PURE__ */ Ye.jsxs("div", { className: `wishlist-window ${_ ? "is-active" : ""}`, children: [
      /* @__PURE__ */ Ye.jsxs("div", { className: "wishlist-header", children: [
        /* @__PURE__ */ Ye.jsx("h3", { children: "MY STAY PICK" }),
        /* @__PURE__ */ Ye.jsx("button", { className: "close-wishlist", onClick: s, children: "×" })
      ] }),
      /* @__PURE__ */ Ye.jsx("div", { className: "wishlist-content", children: l.length === 0 ? /* @__PURE__ */ Ye.jsxs("div", { className: "wishlist-empty", children: [
        /* @__PURE__ */ Ye.jsx(B2, { size: 48, className: "text-slate-300 mb-4" }),
        /* @__PURE__ */ Ye.jsx("p", { children: "저장된 숙소가 없습니다." }),
        /* @__PURE__ */ Ye.jsx(
          "button",
          {
            className: "btn-explore",
            onClick: s,
            children: "숙소 둘러보기"
          }
        )
      ] }) : l.map((p) => /* @__PURE__ */ Ye.jsxs("div", { className: "wishlist-item-card", children: [
        /* @__PURE__ */ Ye.jsx("img", { src: p.image, alt: p.name, className: "wishlist-thumb" }),
        /* @__PURE__ */ Ye.jsxs("div", { className: "wishlist-info", children: [
          /* @__PURE__ */ Ye.jsxs("div", { className: "wishlist-top", children: [
            /* @__PURE__ */ Ye.jsx("span", { className: "wishlist-location", children: p.location }),
            /* @__PURE__ */ Ye.jsx(
              "button",
              {
                className: "wishlist-remove",
                onClick: () => f(p.id),
                children: /* @__PURE__ */ Ye.jsx(W2, { size: 14 })
              }
            )
          ] }),
          /* @__PURE__ */ Ye.jsx("h4", { className: "wishlist-title", children: p.name }),
          /* @__PURE__ */ Ye.jsx("div", { className: "wishlist-price", children: p.price })
        ] })
      ] }, p.id)) })
    ] })
  ] });
}
function G2({ onClick: _, isOpen: l }) {
  return /* @__PURE__ */ Ye.jsxs("div", { className: "card-holder", onClick: _, children: [
    /* @__PURE__ */ Ye.jsx("div", { className: "fab-peek" }),
    /* @__PURE__ */ Ye.jsx("div", { className: "fab-body" })
  ] });
}
function Q2() {
  const _ = Yt.useRef(null), [l, s] = Yt.useState(!1), [f, p] = Yt.useState(() => {
    try {
      return JSON.parse(localStorage.getItem("jeju_wishlist") || "[]");
    } catch {
      return [];
    }
  }), [y, h] = Yt.useState(() => localStorage.getItem("jeju_fab_currency") || "KRW"), [E, T] = Yt.useState(!1), [x, R] = Yt.useState(!1);
  Yt.useEffect(() => {
    const I = (ne) => p(ne.detail);
    return document.addEventListener("fabWishlistUpdated", I), () => document.removeEventListener("fabWishlistUpdated", I);
  }, []);
  const { contextSafe: O } = gC({ scope: _ }), A = O(() => {
    if (x) return;
    R(!0), setTimeout(() => R(!1), 1600);
    const I = Ms.timeline(), ne = ".fab-card", ee = ".card-holder";
    l ? (Ms.set(ne, { pointerEvents: "none" }), I.to(".card-0", { x: -225, duration: 0.15, ease: "power2.in" }).to([".card-0", ".card-1"], { x: -150, duration: 0.15, ease: "power2.in" }).to([".card-0", ".card-1", ".card-2"], { x: -75, duration: 0.15, ease: "power2.in" }).to([".card-0", ".card-1", ".card-2", ".card-3"], { x: 0, duration: 0.15, ease: "power2.in" }).to(ne, { y: 20, opacity: 0, duration: 0.3, ease: "power3.in" }), Ms.to(ee, { y: 0, opacity: 1, duration: 0.3 })) : (Ms.set(ne, { opacity: 1, pointerEvents: "auto", display: "flex" }), I.fromTo(
      ne,
      { y: 20, opacity: 0 },
      { y: -100, opacity: 1, duration: 0.6, ease: "power3.out" }
    ).to(".card-0", { x: -300, duration: 1, ease: "elastic.out(1.2, 0.5)" }).to(".card-1", { x: -225, duration: 1, ease: "elastic.out(1.2, 0.5)" }, "-=0.85").to(".card-2", { x: -150, duration: 1, ease: "elastic.out(1.2, 0.5)" }, "-=0.9").to(".card-3", { x: -75, duration: 1, ease: "elastic.out(1.2, 0.5)" }, "-=0.9").to(".card-4", { x: 0, duration: 1, ease: "elastic.out(1.2, 0.5)" }, "-=0.9"), Ms.to(ee, { y: 5, opacity: 0.9, duration: 0.3 })), s(!l);
  }), M = O((I, ne) => {
    l && Ms.to(I, {
      y: ne ? -110 : -100,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto"
    });
  }), V = () => {
    const I = y === "KRW" ? "USD" : "KRW";
    h(I), localStorage.setItem("jeju_fab_currency", I), document.dispatchEvent(new CustomEvent("fabCurrencyChanged", { detail: I }));
  }, L = (I) => {
    const ne = f.filter((ee) => ee.id !== I);
    p(ne), localStorage.setItem("jeju_wishlist", JSON.stringify(ne)), document.dispatchEvent(new CustomEvent("fabWishlistUpdated", { detail: ne }));
  };
  return /* @__PURE__ */ Ye.jsxs("div", { ref: _, className: "original-fab-system", children: [
    /* @__PURE__ */ Ye.jsx(
      $2,
      {
        isOpen: E,
        wishlist: f,
        onClose: () => T(!1),
        onRemove: L
      }
    ),
    /* @__PURE__ */ Ye.jsxs("div", { className: "fab-wrapper", children: [
      /* @__PURE__ */ Ye.jsx(G2, { onClick: A, isOpen: l }),
      /* @__PURE__ */ Ye.jsxs("div", { className: "fab-cards-container", children: [
        /* @__PURE__ */ Ye.jsx(
          rp,
          {
            id: "fabHome",
            className: "card-0",
            label: "HOME",
            icon: I2,
            onClick: () => window.location.href = "/",
            onMouseEnter: () => M(".card-0", !0),
            onMouseLeave: () => M(".card-0", !1)
          }
        ),
        /* @__PURE__ */ Ye.jsx(
          rp,
          {
            id: "fabTop",
            className: "card-1",
            label: "TOP",
            icon: j2,
            onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
            onMouseEnter: () => M(".card-1", !0),
            onMouseLeave: () => M(".card-1", !1)
          }
        ),
        /* @__PURE__ */ Ye.jsx(
          rp,
          {
            id: "fabCurrency",
            className: "card-2",
            label: y === "KRW" ? "KOR" : "ENG",
            icon: H2,
            onClick: V,
            onMouseEnter: () => M(".card-2", !0),
            onMouseLeave: () => M(".card-2", !1)
          }
        ),
        /* @__PURE__ */ Ye.jsx(
          rp,
          {
            id: "fabWishlist",
            className: "card-3",
            label: "PICK",
            icon: V2,
            badgeCount: f.length,
            onClick: () => T(!0),
            onMouseEnter: () => M(".card-3", !0),
            onMouseLeave: () => M(".card-3", !1)
          }
        ),
        /* @__PURE__ */ Ye.jsx(
          rp,
          {
            id: "fabChatbot",
            className: "card-4",
            label: "CHAT",
            icon: Y2,
            onMouseEnter: () => M(".card-4", !0),
            onMouseLeave: () => M(".card-4", !1)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ Ye.jsx("style", { children: `
        /* 원본 CSS 로직 그대로 유지 */
        .fab-wrapper { position: fixed; bottom: 40px; right: 40px; z-index: 9999; }
        .card-holder { position: absolute; bottom: 0; right: 0; width: 60px; height: 80px; z-index: 10001; cursor: pointer; }
        .fab-peek { position: absolute; top: -12px; left: 5px; width: 50px; height: 30px; background: linear-gradient(145deg, #ffffff 0%, #f9f9f9 100%); border-radius: 8px 8px 0 0; border: 1px solid rgba(0,0,0,0.06); }
        .fab-peek::before { content: ''; position: absolute; top: 12px; left: 6px; width: 12px; height: 9px; border-radius: 2px; background: repeating-linear-gradient(90deg, transparent 0, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 3px), linear-gradient(135deg, #e6c13b 0%, #f0d575 50%, #c49f18 100%); }
        .fab-body { position: absolute; bottom: 0; width: 60px; height: 80px; background-color: #FF5000; border-radius: 8px; z-index: 1; outline: 1.5px dashed rgba(255,255,255,0.9); outline-offset: -4px; border-top: 2px solid #E05000; box-shadow: 0 4px 0 rgba(0,0,0,0.1), inset 0 3px 6px rgba(0,0,0,0.15); }
        .fab-body::after { content: 'JEJU GROUP'; white-space: pre; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 11px; text-transform: uppercase; font-weight: 800; text-align: center; line-height: 1.2; color: #FFFFFF; }
        .fab-cards-container { position: absolute; bottom: 0; right: 0; width: 65px; height: 95px; z-index: 10000; pointer-events: none; clip-path: inset(-200% -200% 0 -600%); }
        .fab-card { position: absolute; bottom: 0; left: 0; width: 65px; height: 95px; background: linear-gradient(145deg, #ffffff 0%, #f9f9f9 100%); border-radius: 10px; box-shadow: 0 10px 20px rgba(0,0,0,0.1); display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; opacity: 0; pointer-events: none; border: 1px solid rgba(0,0,0,0.06); }
        .fab-card::before { content: ''; position: absolute; top: 10px; left: 8px; width: 12px; height: 9px; border-radius: 2px; background: repeating-linear-gradient(90deg, transparent 0, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 3px), linear-gradient(135deg, #e6c13b 0%, #f0d575 50%, #c49f18 100%); }
        .fab-card::after { content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 4px; background: #FF5C00; }
        .card-icon { width: 20px; height: 20px; color: #333; margin-bottom: 3px; stroke-width: 2.5px; }
        .card-label { font-size: 10.5px; font-weight: 700; color: #333; text-transform: uppercase; letter-spacing: 1.2px; }
        .fab-badge { position: absolute; top: 6px; right: 6px; background: #FF5C00; color: white; font-size: 9px; font-weight: bold; min-width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .wishlist-window { position: fixed; z-index: 10002; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(15px); border-radius: 10px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.2); display: none; flex-direction: column; transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1); }
        .wishlist-window.is-active { display: flex; top: 50% !important; left: 50% !important; width: 400px !important; height: 500px !important; transform: translate(-50%, -50%) !important; border-radius: 20px; }
        .wishlist-header { background: #FF5C00; color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center; border-radius: 20px 20px 0 0; }
        .wishlist-header h3 { margin: 0; font-size: 18px; font-weight: 900; }
        .wishlist-content { padding: 20px; flex: 1; overflow-y: auto; }
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.6); z-index: 10001; opacity: 0; pointer-events: none; transition: opacity 0.4s ease; }
        .modal-overlay.active { opacity: 1; pointer-events: auto; }
        .wishlist-item-card { display: flex; gap: 12px; padding: 12px; border-bottom: 1px solid #eee; background: #fff; border-radius: 8px; margin-bottom: 10px; }
        .wishlist-thumb { width: 80px; height: 80px; border-radius: 6px; object-fit: cover; }
        .wishlist-info { flex: 1; display: flex; flex-direction: column; justify-content: center; }
        .wishlist-title { margin: 0 0 4px 0; font-size: 14px; font-weight: 800; }
        .wishlist-price { font-size: 14px; font-weight: 900; color: #FF5C00; }
      ` })
  ] });
}
const q2 = () => {
  try {
    const _ = localStorage.getItem("jeju_wishlist") ?? "[]", l = JSON.parse(_);
    return Array.isArray(l) ? l : [];
  } catch {
    return [];
  }
}, X2 = () => localStorage.getItem("jeju_fab_currency") === "USD" ? "USD" : "KRW", K2 = () => localStorage.getItem("jeju_fab_lang") === "en" ? "en" : "ko", J2 = () => ({
  currency: X2(),
  language: K2(),
  wishlist: q2(),
  drawerOpen: !1,
  chatbotOpen: !1,
  weatherOpen: !1
}), kE = (_, l) => typeof l == "boolean" ? l : !_, Z2 = (_, l) => {
  switch (l.type) {
    case "SET_CURRENCY":
      return { ..._, currency: l.payload };
    case "SET_LANGUAGE":
      return { ..._, language: l.payload };
    case "SET_WISHLIST":
      return { ..._, wishlist: [...l.payload] };
    case "TOGGLE_DRAWER":
      return { ..._, drawerOpen: kE(_.drawerOpen, l.payload) };
    case "TOGGLE_CHATBOT":
      return { ..._, chatbotOpen: kE(_.chatbotOpen, l.payload) };
    case "TOGGLE_WEATHER":
      return { ..._, weatherOpen: kE(_.weatherOpen, l.payload) };
    default:
      return _;
  }
}, eA = Yt.createContext(null), tA = ({ children: _ }) => {
  const [l, s] = Yt.useReducer(Z2, void 0, J2), f = Yt.useMemo(
    () => ({
      state: l,
      dispatch: s
    }),
    [l]
  );
  return /* @__PURE__ */ Ye.jsx(eA.Provider, { value: f, children: _ });
};
let DE = null;
const nA = () => localStorage.getItem("jeju_fab_currency") === "USD" ? "USD" : "KRW", rA = () => localStorage.getItem("jeju_fab_lang") === "en" ? "en" : "ko", aA = () => {
  try {
    const _ = localStorage.getItem("jeju_wishlist") ?? "[]", l = JSON.parse(_);
    return Array.isArray(l) ? l : [];
  } catch {
    return [];
  }
}, OE = (_, l, s) => {
  document.dispatchEvent(new CustomEvent("fabCurrencyChanged", { detail: _ })), document.dispatchEvent(new CustomEvent("fabLanguageChanged", { detail: l })), document.dispatchEvent(new CustomEvent("fabWishlistUpdated", { detail: s }));
}, iA = () => {
  if (window.FABState)
    return;
  const _ = {
    currency: nA(),
    language: rA(),
    wishlist: aA(),
    setCurrencyAndLang: (l, s) => {
      _.currency = l, _.language = s, localStorage.setItem("jeju_fab_currency", l), localStorage.setItem("jeju_fab_lang", s), OE(l, s, _.wishlist);
    },
    addToWishlist: (l) => {
      const s = [..._.wishlist], f = Number(l.id), p = s.findIndex((y) => Number(y.id) === f);
      p === -1 ? s.push(l) : s.splice(p, 1), _.wishlist = s, localStorage.setItem("jeju_wishlist", JSON.stringify(s)), OE(_.currency, _.language, s);
    },
    removeFromWishlist: (l) => {
      const s = _.wishlist.filter((f) => Number(f.id) !== l);
      _.wishlist = s, localStorage.setItem("jeju_wishlist", JSON.stringify(s)), OE(_.currency, _.language, s);
    },
    isInWishlist: (l) => _.wishlist.some((s) => Number(s.id) === l)
  };
  window.FABState = _, document.addEventListener("fabCurrencyChanged", (l) => {
    const s = l;
    _.currency = s.detail === "USD" ? "USD" : "KRW";
  }), document.addEventListener("fabLanguageChanged", (l) => {
    const s = l;
    _.language = s.detail === "en" ? "en" : "ko";
  }), document.addEventListener("fabWishlistUpdated", (l) => {
    const s = l;
    _.wishlist = Array.isArray(s.detail) ? [...s.detail] : [];
  });
}, lA = () => {
  const _ = "jeju-fab-root";
  let l = document.getElementById(_);
  l || (l = document.createElement("div"), l.id = _, document.body.appendChild(l)), DE || (DE = Dv(l)), DE.render(
    /* @__PURE__ */ Ye.jsx(tA, { children: /* @__PURE__ */ Ye.jsx(Q2, {}) })
  ), iA();
}, oA = (_) => {
  const l = _ ?? {};
  return {
    checkIn: l.checkIn ?? null,
    checkOut: l.checkOut ?? null,
    tempCheckIn: l.tempCheckIn ?? null,
    tempCheckOut: l.tempCheckOut ?? null
  };
}, Gb = (_) => {
  const l = {
    fieldId: "checkInField",
    popupId: "calendarPopup",
    monthsContainerId: "calendarMonths",
    dayPickerContainerId: "dayPickerContainer",
    prevButtonId: "prevMonth",
    nextButtonId: "nextMonth",
    clearButtonId: "btn-clear",
    confirmButtonId: "btn-confirm",
    tabCalendarId: "tab-calendar",
    tabFlexibleId: "tab-flexible",
    panelCalendarId: "panel-calendar",
    panelFlexibleId: "panel-flexible",
    flexibleOptionSelector: ".Flexible-Option",
    weekStartsOn: "monday",
    weekdayLabels: null,
    monthLabelFormatter: null,
    dayLabelFormatter: null,
    monthsToRender: 2,
    showHoverRange: !0,
    enableTabs: !0,
    enableFlexibleOptions: !0,
    toggleMode: "toggle",
    cancelOnToggleClose: !1,
    toggleFieldActiveClass: !1,
    openingClass: "",
    openingClassDurationMs: 0,
    closeAllPopups: null,
    onOpen: null,
    onClose: null,
    onCancel: null,
    onClear: null,
    onTempChange: null,
    onBeforeConfirm: null,
    onConfirm: null,
    state: null,
    initialMonth: null,
    ..._ ?? {}
  }, s = oA(l.state);
  let f = l.initialMonth ? new Date(l.initialMonth) : /* @__PURE__ */ new Date(), p = null, y = !1, h = null, E = null;
  const T = () => E || (E = {
    field: document.getElementById(l.fieldId),
    popup: document.getElementById(l.popupId),
    monthsContainer: document.getElementById(l.monthsContainerId),
    dayPickerContainer: document.getElementById(l.dayPickerContainerId),
    prevButton: document.getElementById(l.prevButtonId),
    nextButton: document.getElementById(l.nextButtonId),
    clearButton: document.getElementById(l.clearButtonId),
    confirmButton: document.getElementById(l.confirmButtonId),
    tabCalendar: document.getElementById(l.tabCalendarId),
    tabFlexible: document.getElementById(l.tabFlexibleId),
    panelCalendar: document.getElementById(l.panelCalendarId),
    panelFlexible: document.getElementById(l.panelFlexibleId)
  }, E), x = (pe) => {
    pe == null || pe.stopPropagation();
  }, R = (pe, ce) => {
    typeof pe == "function" && pe(s, Ge, ce);
  }, O = () => Array.isArray(l.weekdayLabels) && l.weekdayLabels.length === 7 ? l.weekdayLabels : l.weekStartsOn === "sunday" ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], A = (pe) => {
    const ce = new Date(pe);
    return ce.setHours(0, 0, 0, 0), ce.getTime();
  }, M = (pe) => l.weekStartsOn === "monday" ? pe === 0 ? 6 : pe - 1 : pe, V = () => s.tempCheckIn || s.checkIn, L = () => s.tempCheckOut || s.checkOut, I = (pe) => typeof l.monthLabelFormatter == "function" ? l.monthLabelFormatter(pe, s, Ge) : `${pe.getFullYear()}-${String(pe.getMonth() + 1).padStart(2, "0")}`, ne = (pe, ce) => typeof l.dayLabelFormatter == "function" ? l.dayLabelFormatter(pe, ce, s, Ge) : String(pe), ee = (pe) => {
    const ce = pe.getFullYear(), le = pe.getMonth(), Te = new Date(ce, le, 1).getDay(), me = M(Te), P = new Date(ce, le + 1, 0).getDate(), te = A(/* @__PURE__ */ new Date()), Fe = V(), xe = L();
    let Qe = "";
    for (let it = 0; it < me; it += 1)
      Qe += '<div class="DayPicker-Day DayPicker-Day--outside"></div>';
    for (let it = 1; it <= P; it += 1) {
      const rt = new Date(ce, le, it).getTime(), ct = ["DayPicker-Day"];
      rt < te && ct.push("DayPicker-Day--disabled"), rt === te && ct.push("DayPicker-Day--today"), Fe && rt === Fe && ct.push("DayPicker-Day--selected", "DayPicker-Day--checkIn", "DayPicker-Day--hasRange"), xe && rt === xe && ct.push("DayPicker-Day--selected", "DayPicker-Day--checkOut", "DayPicker-Day--hasRange"), Fe && xe && rt > Fe && rt < xe && ct.push("DayPicker-Day--inRange"), l.showHoverRange && Fe && !xe && p && rt > Fe && rt <= p && ct.push("DayPicker-Day--hoverRange"), Qe += `<div class="${ct.join(" ")}" data-timestamp="${rt}" data-day="${it}">${ne(it, rt)}</div>`;
    }
    return Qe;
  }, Q = () => {
    const { popup: pe } = T();
    pe && pe.querySelectorAll(".DayPicker-Day").forEach((ce) => {
      if (ce.classList.remove("DayPicker-Day--hoverRange"), !l.showHoverRange)
        return;
      const le = Number.parseInt(ce.dataset.timestamp ?? "", 10);
      Number.isFinite(le) && s.tempCheckIn && !s.tempCheckOut && p && le > s.tempCheckIn && le <= p && ce.classList.add("DayPicker-Day--hoverRange");
    });
  }, ie = (pe) => {
    !s.tempCheckIn || s.tempCheckIn && s.tempCheckOut ? (s.tempCheckIn = pe, s.tempCheckOut = null, p = null) : pe < s.tempCheckIn ? (s.tempCheckIn = pe, p = null) : pe > s.tempCheckIn && (s.tempCheckOut = pe, p = null), R(l.onTempChange ?? null), Ke();
  }, Y = () => {
    const { popup: pe, dayPickerContainer: ce } = T();
    pe && (pe.querySelectorAll(".DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside)").forEach((le) => {
      le.addEventListener("click", (Te) => {
        x(Te);
        const me = Number.parseInt(le.dataset.timestamp ?? "", 10);
        Number.isFinite(me) && ie(me);
      }), l.showHoverRange && le.addEventListener("mouseenter", () => {
        const Te = Number.parseInt(le.dataset.timestamp ?? "", 10);
        Number.isFinite(Te) && s.tempCheckIn && !s.tempCheckOut && Te > s.tempCheckIn && (p = Te, Q());
      });
    }), ce && l.showHoverRange && (ce.onmouseleave = () => {
      p && (p = null, Q());
    }));
  }, fe = (pe) => {
    const { tabCalendar: ce, tabFlexible: le, panelCalendar: Te, panelFlexible: me } = T();
    [ce, le].forEach((P) => {
      P && (P.classList.remove("active"), P.setAttribute("aria-selected", "false"));
    }), [Te, me].forEach((P) => {
      P && (P.classList.remove("active"), P.style.display = "none");
    }), pe && (pe.classList.add("active"), pe.setAttribute("aria-selected", "true"), pe === ce && Te && (Te.classList.add("active"), Te.style.display = "block"), pe === le && me && (me.classList.add("active"), me.style.display = "block"));
  }, ae = () => {
    const { field: pe, popup: ce } = T();
    !pe || !ce || (typeof l.closeAllPopups == "function" && l.closeAllPopups(l.popupId), s.tempCheckIn = s.checkIn, s.tempCheckOut = s.checkOut, p = null, ce.classList.add("active"), l.toggleFieldActiveClass && pe.classList.add("active"), l.openingClass && (ce.classList.add(l.openingClass), h && window.clearTimeout(h), l.openingClassDurationMs > 0 && (h = window.setTimeout(() => {
      ce.classList.remove(l.openingClass);
    }, l.openingClassDurationMs))), R(l.onTempChange ?? null), Ke(), R(l.onOpen ?? null));
  }, ge = (pe) => {
    const { field: ce, popup: le } = T();
    le && (le.classList.remove("active"), l.openingClass && le.classList.remove(l.openingClass), l.toggleFieldActiveClass && ce && ce.classList.remove("active"), R(l.onClose ?? null, pe));
  }, se = (pe) => {
    s.tempCheckIn = null, s.tempCheckOut = null, p = null, R(l.onTempChange ?? null), R(l.onCancel ?? null, pe);
  }, Ie = (pe) => {
    if (x(pe), !(typeof l.onBeforeConfirm == "function" && l.onBeforeConfirm(s, Ge) === !1)) {
      if (s.checkIn = s.tempCheckIn, s.checkOut = s.tempCheckOut, R(l.onConfirm ?? null), typeof l.closeAllPopups == "function") {
        l.closeAllPopups();
        const { field: ce } = T();
        l.toggleFieldActiveClass && ce && ce.classList.remove("active");
        return;
      }
      ge({ reason: "confirm" });
    }
  }, Ke = () => {
    const { monthsContainer: pe } = T();
    if (!pe)
      return;
    pe.innerHTML = "";
    const ce = O();
    for (let le = 0; le < l.monthsToRender; le += 1) {
      const Te = new Date(f.getFullYear(), f.getMonth() + le, 1), me = document.createElement("div");
      me.className = "DayPicker-Month";
      const P = document.createElement("div");
      P.className = "DayPicker-Caption", P.textContent = I(Te), me.appendChild(P);
      const te = document.createElement("div");
      te.className = "DayPicker-Weekdays", ce.forEach((xe) => {
        const Qe = document.createElement("div");
        Qe.className = "DayPicker-Weekday", Qe.textContent = xe, te.appendChild(Qe);
      }), me.appendChild(te);
      const Fe = document.createElement("div");
      Fe.className = "DayPicker-Body", Fe.innerHTML = ee(Te), me.appendChild(Fe), pe.appendChild(me);
    }
    Y();
  }, Ge = {
    init: () => {
      if (y)
        return Ge;
      const { field: pe, popup: ce, prevButton: le, nextButton: Te, clearButton: me, confirmButton: P, tabCalendar: te, tabFlexible: Fe } = T();
      return !pe || !ce || (pe.addEventListener("click", (xe) => {
        if (x(xe), !ce.classList.contains("active")) {
          ae();
          return;
        }
        l.toggleMode === "toggle" && (l.cancelOnToggleClose && se({ reason: "toggle" }), ge({ reason: "toggle" }));
      }), ce.addEventListener("click", x), le == null || le.addEventListener("click", (xe) => {
        x(xe), f.setMonth(f.getMonth() - 1), Ke();
      }), Te == null || Te.addEventListener("click", (xe) => {
        x(xe), f.setMonth(f.getMonth() + 1), Ke();
      }), me == null || me.addEventListener("click", (xe) => {
        x(xe), s.checkIn = null, s.checkOut = null, s.tempCheckIn = null, s.tempCheckOut = null, p = null, R(l.onTempChange ?? null), Ke(), R(l.onClear ?? null);
      }), P == null || P.addEventListener("click", Ie), l.enableTabs && (te == null || te.addEventListener("click", (xe) => {
        x(xe), fe(te);
      }), Fe == null || Fe.addEventListener("click", (xe) => {
        x(xe), fe(Fe);
      })), l.enableFlexibleOptions && ce.querySelectorAll(l.flexibleOptionSelector).forEach((xe) => {
        xe.addEventListener("click", (Qe) => {
          x(Qe), ce.querySelectorAll(l.flexibleOptionSelector).forEach((it) => {
            it.classList.remove("active");
          }), xe.classList.add("active");
        });
      }), y = !0), Ge;
    },
    renderCalendar: Ke,
    openCalendar: ae,
    closeCalendar: ge,
    cancelSelection: se,
    getState: () => s,
    getMonth: () => new Date(f),
    setMonth: (pe) => {
      f = new Date(pe), Ke();
    }
  };
  return Ge;
}, uA = () => {
  window.JJRangeCalendar = {
    createRangeCalendar: (_) => Gb(_)
  };
}, sA = (_) => _ === "en" ? "Hello, I am your Jeju Group assistant" : "안녕 제주그룹 도우미 상태", cA = ({ isOpen: _, onOpen: l, onClose: s, language: f, onLanguageChange: p }) => {
  const [y, h] = Yt.useState([]), [E, T] = Yt.useState(""), [x, R] = Yt.useState(!1), [O, A] = Yt.useState(0), M = Yt.useRef(null);
  Yt.useEffect(() => {
    const Q = {
      id: Date.now(),
      type: "bot",
      content: sA(f),
      timestamp: /* @__PURE__ */ new Date()
    };
    h([Q]);
  }, []), Yt.useEffect(() => {
    const Q = (ie) => {
      const fe = ie.detail;
      (fe === "en" || fe === "ko") && p(fe);
    };
    return document.addEventListener("fabLanguageChanged", Q), () => {
      document.removeEventListener("fabLanguageChanged", Q);
    };
  }, [p]), Yt.useEffect(() => {
    M.current && (M.current.scrollTop = M.current.scrollHeight);
  }, [y, _]);
  const V = Yt.useCallback((Q, ie) => {
    A((Y) => Y + 1), h((Y) => [
      ...Y,
      {
        id: Date.now() + O,
        type: Q,
        content: ie,
        timestamp: /* @__PURE__ */ new Date()
      }
    ]);
  }, [O]), L = Yt.useMemo(
    () => y.map((Q) => ({ role: Q.type === "user" ? "user" : "assistant", content: Q.content })),
    [y]
  ), I = Yt.useCallback(async () => {
    var ie, Y, fe;
    const Q = E.trim();
    if (!(!Q || x)) {
      V("user", Q), T(""), R(!0);
      try {
        const ae = await fetch("https://jejugroup.alwaysdata.net/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content: f === "en" ? "You are Jeju Group assistant" : "너는 제주그룹 안내 도우미"
              },
              ...L,
              {
                role: "user",
                content: Q
              }
            ]
          })
        });
        if (!ae.ok)
          throw new Error(`Chat API failed: ${ae.status}`);
        const ge = await ae.json(), se = ((fe = (Y = (ie = ge == null ? void 0 : ge.choices) == null ? void 0 : ie[0]) == null ? void 0 : Y.message) == null ? void 0 : fe.content) ?? "응답 실패 상태";
        V("bot", String(se));
      } catch (ae) {
        V("bot", `오류 상태: ${ae.message}`);
      } finally {
        R(!1);
      }
    }
  }, [V, L, E, f, x]), ne = (Q) => {
    Q.preventDefault(), I().catch(() => {
    });
  }, ee = (Q) => {
    Q.key === "Enter" && (Q.preventDefault(), I().catch(() => {
    }));
  };
  return /* @__PURE__ */ Ye.jsxs(Ye.Fragment, { children: [
    /* @__PURE__ */ Ye.jsx(
      "button",
      {
        className: `chatbot-toggle-btn ${_ ? "hidden" : ""}`,
        "aria-label": f === "en" ? "Open chatbot" : "챗봇 열기",
        onClick: l,
        children: /* @__PURE__ */ Ye.jsx("i", { "data-lucide": "message-circle" })
      }
    ),
    /* @__PURE__ */ Ye.jsxs("div", { className: `chatbot-container ${_ ? "active" : ""}`, children: [
      /* @__PURE__ */ Ye.jsxs("div", { className: "chatbot-header", children: [
        /* @__PURE__ */ Ye.jsx("h3", { children: f === "en" ? "Jeju Chatbot" : "제주 챗봇" }),
        /* @__PURE__ */ Ye.jsx("button", { className: "chatbot-close-btn", onClick: s, children: "×" })
      ] }),
      /* @__PURE__ */ Ye.jsxs("div", { className: "chatbot-messages", ref: M, children: [
        y.map((Q) => /* @__PURE__ */ Ye.jsxs("div", { className: `message ${Q.type}`, children: [
          /* @__PURE__ */ Ye.jsx("div", { className: "message-bubble", children: Q.content }),
          /* @__PURE__ */ Ye.jsx("div", { className: "message-time", children: Q.timestamp.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }) })
        ] }, Q.id)),
        x ? /* @__PURE__ */ Ye.jsx("div", { className: "message bot", children: /* @__PURE__ */ Ye.jsxs("div", { className: "typing-indicator", children: [
          /* @__PURE__ */ Ye.jsx("div", { className: "typing-dot" }),
          /* @__PURE__ */ Ye.jsx("div", { className: "typing-dot" }),
          /* @__PURE__ */ Ye.jsx("div", { className: "typing-dot" })
        ] }) }) : null
      ] }),
      /* @__PURE__ */ Ye.jsxs("form", { className: "chatbot-input-area", onSubmit: ne, children: [
        /* @__PURE__ */ Ye.jsx(
          "input",
          {
            value: E,
            onChange: (Q) => T(Q.target.value),
            onKeyDown: ee,
            placeholder: f === "en" ? "Type a message" : "메시지 입력"
          }
        ),
        /* @__PURE__ */ Ye.jsx("button", { type: "submit", disabled: x, children: f === "en" ? "Send" : "전송" })
      ] })
    ] })
  ] });
};
let qE = null, lf = null, sf = !1, XE = localStorage.getItem("jeju_fab_lang") === "en" ? "en" : "ko";
const zs = () => {
  qE && qE.render(
    /* @__PURE__ */ Ye.jsx(
      cA,
      {
        isOpen: sf,
        onOpen: () => {
          sf = !0, zs();
        },
        onClose: () => {
          sf = !1, zs();
        },
        language: XE,
        onLanguageChange: (_) => {
          XE = _, localStorage.setItem("jeju_fab_lang", _), zs();
        }
      }
    )
  );
}, fA = () => {
  lf || (lf = document.getElementById("jeju-chatbot-root"), lf || (lf = document.createElement("div"), lf.id = "jeju-chatbot-root", document.body.appendChild(lf)), qE = Dv(lf), zs());
}, dA = () => {
  fA(), window.hotelChatbot = {
    openChatbot: () => {
      sf = !0, zs();
    },
    closeChatbot: () => {
      sf = !1, zs();
    },
    toggleChatbot: () => {
      sf = !sf, zs();
    },
    updateLanguage: (_) => {
      XE = _, localStorage.setItem("jeju_fab_lang", _), zs();
    }
  };
};
let jx = !1;
const pA = 37.5665, hA = 126.978, Qb = (_, l = "small") => {
  const s = {
    "01": ["fa-sun", "#ffbd00"],
    "02": ["fa-cloud-sun", "#ffbd00"],
    "03": ["fa-cloud", "#cbd5e1"],
    "04": ["fa-cloud", "#94a3b8"],
    "09": ["fa-cloud-showers-heavy", "#60a5fa"],
    10: ["fa-cloud-rain", "#60a5fa"],
    11: ["fa-bolt", "#fde047"],
    13: ["fa-snowflake", "#99f6e4"],
    50: ["fa-smog", "#94a3b8"]
  }, f = _.slice(0, 2), [p, y] = s[f] ?? ["fa-cloud", "#cbd5e1"];
  return l === "large" ? `<i class="fa-solid ${p} weather-detail-icon-fa" style="color:${y};"></i>` : `<i class="fa-solid ${p}" style="color:${y};margin-right:4px;"></i>`;
}, vA = async (_, l) => {
  const s = await fetch(`https://jejugroup.alwaysdata.net/api/weather?type=current&lat=${_}&lon=${l}`);
  if (!s.ok)
    throw new Error(`weather fetch failed: ${s.status}`);
  return s.json();
}, Hx = async (_, l) => {
  const s = await fetch(`https://jejugroup.alwaysdata.net/api/weather?type=pollution&lat=${_}&lon=${l}`);
  if (!s.ok)
    throw new Error(`pollution fetch failed: ${s.status}`);
  return s.json();
}, mA = async () => new Promise((_, l) => {
  if (!navigator.geolocation) {
    l(new Error("geolocation unavailable"));
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (s) => {
      _({
        lat: s.coords.latitude,
        lon: s.coords.longitude
      });
    },
    (s) => l(s)
  );
}), Bx = (_, l) => {
  var p, y;
  const s = Math.round(l.main.temp), f = ((y = (p = l.weather) == null ? void 0 : p[0]) == null ? void 0 : y.icon) ?? "03d";
  _.innerHTML = `${Qb(f, "small")}<span>${s}°</span>`;
}, ME = (_, l, s) => {
  var T, x, R, O, A, M, V, L, I, ne, ee;
  const f = ((R = (x = (T = s == null ? void 0 : s.list) == null ? void 0 : T[0]) == null ? void 0 : x.main) == null ? void 0 : R.aqi) ?? 1, p = {
    1: ["좋음", "good"],
    2: ["보통", "fair"],
    3: ["나쁨", "poor"],
    4: ["매우나쁨", "very-poor"],
    5: ["매우나쁨", "very-poor"]
  }, [y, h] = p[f] ?? ["정보없음", ""], E = Qb(((A = (O = l.weather) == null ? void 0 : O[0]) == null ? void 0 : A.icon) ?? "03d", "large");
  _.innerHTML = `
    <div class="weather-detail-main">
      <p class="weather-detail-city">${l.name ?? "도시"}</p>
      <div class="weather-detail-info">
        ${E}
        <h2 class="weather-detail-temp">${Math.round(((M = l.main) == null ? void 0 : M.temp) ?? 0)}°</h2>
        <p class="weather-detail-desc">${((L = (V = l.weather) == null ? void 0 : V[0]) == null ? void 0 : L.description) ?? ""}</p>
      </div>
    </div>
    <div class="weather-detail-grid">
      <div class="weather-detail-item">
        <span class="item-label">체감온도</span>
        <span class="item-value">${Math.round(((I = l.main) == null ? void 0 : I.feels_like) ?? 0)}°</span>
      </div>
      <div class="weather-detail-item weather-detail-dust ${h}">
        <span class="item-label">미세먼지</span>
        <span class="item-value">${y}</span>
      </div>
      <div class="weather-detail-item">
        <span class="item-label">습도</span>
        <span class="item-value">${((ne = l.main) == null ? void 0 : ne.humidity) ?? 0}%</span>
      </div>
      <div class="weather-detail-item">
        <span class="item-label">풍속</span>
        <span class="item-value">${((ee = l.wind) == null ? void 0 : ee.speed) ?? 0}m/s</span>
      </div>
    </div>
  `;
}, yA = () => {
  if (jx)
    return;
  const _ = document.getElementById("weather-open-btn"), l = document.getElementById("weather-overlay"), s = document.getElementById("weather-close-btn"), f = document.getElementById("weather-detail-container"), p = document.getElementById("weather-search-input"), y = document.getElementById("weather-search-btn");
  if (!_ || !l || !s || !f)
    return;
  let h = null, E = null;
  const T = async (O, A) => {
    const [M, V] = await Promise.all([vA(O, A), Hx(O, A)]);
    h = M, E = V, Bx(_, M), l.classList.contains("active") && ME(f, M, V);
  };
  _.addEventListener("click", () => {
    l.classList.add("active"), h && E && ME(f, h, E);
  }), s.addEventListener("click", () => {
    l.classList.remove("active");
  }), l.addEventListener("click", (O) => {
    O.target === l && l.classList.remove("active");
  });
  const x = async () => {
    const O = p == null ? void 0 : p.value.trim();
    if (O)
      try {
        const A = await fetch(`https://jejugroup.alwaysdata.net/api/weather?type=search&q=${encodeURIComponent(O)}`);
        if (!A.ok)
          throw new Error(`city weather failed: ${A.status}`);
        const M = await A.json(), V = await Hx(M.coord.lat, M.coord.lon);
        h = M, E = V, Bx(_, M), ME(f, M, V);
      } catch (A) {
        f.innerHTML = `<div class="weather-loading-large"><p>조회 실패: ${A.message}</p></div>`;
      }
  };
  y == null || y.addEventListener("click", () => {
    x().catch(() => {
    });
  }), p == null || p.addEventListener("keydown", (O) => {
    O.key === "Enter" && (O.preventDefault(), x().catch(() => {
    }));
  }), (async () => {
    try {
      const O = await mA();
      await T(O.lat, O.lon);
    } catch {
      await T(pA, hA);
    }
  })().catch(() => {
  }), jx = !0;
};
let Vx = !1, Ix = !1;
const gA = () => {
  Ix || (Ix = !0, document.body.addEventListener("click", async (_) => {
    var s;
    (s = _.target) != null && s.closest('[data-action="OPEN_RESERVATION_DRAWER"]') && (_.preventDefault(), await Kg.open());
  }));
}, vl = () => {
  Vx || (Vx = !0, window.initHeader = () => Fv(), window.initFooter = () => Xg(), window.initMegaMenu = () => KE(), window.initStaggerNav = () => qg(), uA(), JL(), BL(), gA(), nN());
}, wA = async () => {
  vl(), await hN();
}, TA = async () => {
  vl(), await vN();
}, xA = () => {
  vl(), Fv();
}, bA = () => {
  vl(), Xg();
}, RA = () => {
  vl(), KE();
}, kA = () => {
  vl(), qg();
}, DA = async () => {
  vl(), await Kg.open();
}, OA = () => {
  vl(), Kg.close();
}, MA = () => {
  vl(), lA();
}, LA = () => {
  vl(), dA();
}, NA = () => {
  vl(), yA();
}, AA = (_) => (vl(), Gb(_)), zA = Kg;
export {
  OA as closeReservationDrawer,
  AA as createRangeCalendarRuntime,
  bA as ensureFooterBehavior,
  xA as ensureHeaderBehavior,
  RA as ensureMegaMenuBehavior,
  kA as ensureStaggerNavBehavior,
  vl as installLegacyGlobals,
  TA as mountHotelShellRuntime,
  wA as mountMainShellRuntime,
  DA as openReservationDrawer,
  zA as runtimeReservationDrawer,
  LA as setupLegacyChatbotRuntime,
  MA as setupLegacyFabRuntime,
  NA as setupWeatherWidgetRuntime
};
