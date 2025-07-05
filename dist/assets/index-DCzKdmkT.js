(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l);
  new MutationObserver((l) => {
    for (const o of l)
      if (o.type === 'childList')
        for (const i of o.addedNodes)
          i.tagName === 'LINK' && i.rel === 'modulepreload' && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(l) {
    const o = {};
    return (
      l.integrity && (o.integrity = l.integrity),
      l.referrerPolicy && (o.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === 'use-credentials'
        ? (o.credentials = 'include')
        : l.crossOrigin === 'anonymous'
          ? (o.credentials = 'omit')
          : (o.credentials = 'same-origin'),
      o
    );
  }
  function r(l) {
    if (l.ep) return;
    l.ep = !0;
    const o = n(l);
    fetch(l.href, o);
  }
})();
function Qc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default')
    ? e.default
    : e;
}
var Ss = { exports: {} },
  Sl = {},
  xs = { exports: {} },
  O = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var dr = Symbol.for('react.element'),
  Gc = Symbol.for('react.portal'),
  Kc = Symbol.for('react.fragment'),
  Yc = Symbol.for('react.strict_mode'),
  Xc = Symbol.for('react.profiler'),
  Zc = Symbol.for('react.provider'),
  Jc = Symbol.for('react.context'),
  qc = Symbol.for('react.forward_ref'),
  bc = Symbol.for('react.suspense'),
  ef = Symbol.for('react.memo'),
  tf = Symbol.for('react.lazy'),
  ou = Symbol.iterator;
function nf(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (ou && e[ou]) || e['@@iterator']),
      typeof e == 'function' ? e : null);
}
var Es = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Cs = Object.assign,
  _s = {};
function xn(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = _s),
    (this.updater = n || Es));
}
xn.prototype.isReactComponent = {};
xn.prototype.setState = function (e, t) {
  if (typeof e != 'object' && typeof e != 'function' && e != null)
    throw Error(
      'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
    );
  this.updater.enqueueSetState(this, e, t, 'setState');
};
xn.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
};
function zs() {}
zs.prototype = xn.prototype;
function ai(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = _s),
    (this.updater = n || Es));
}
var ci = (ai.prototype = new zs());
ci.constructor = ai;
Cs(ci, xn.prototype);
ci.isPureReactComponent = !0;
var iu = Array.isArray,
  Ps = Object.prototype.hasOwnProperty,
  fi = { current: null },
  Ns = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ts(e, t, n) {
  var r,
    l = {},
    o = null,
    i = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (i = t.ref),
    t.key !== void 0 && (o = '' + t.key),
    t))
      Ps.call(t, r) && !Ns.hasOwnProperty(r) && (l[r] = t[r]);
  var u = arguments.length - 2;
  if (u === 1) l.children = n;
  else if (1 < u) {
    for (var s = Array(u), c = 0; c < u; c++) s[c] = arguments[c + 2];
    l.children = s;
  }
  if (e && e.defaultProps)
    for (r in ((u = e.defaultProps), u)) l[r] === void 0 && (l[r] = u[r]);
  return {
    $$typeof: dr,
    type: e,
    key: o,
    ref: i,
    props: l,
    _owner: fi.current,
  };
}
function rf(e, t) {
  return {
    $$typeof: dr,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function di(e) {
  return typeof e == 'object' && e !== null && e.$$typeof === dr;
}
function lf(e) {
  var t = { '=': '=0', ':': '=2' };
  return (
    '$' +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var uu = /\/+/g;
function Al(e, t) {
  return typeof e == 'object' && e !== null && e.key != null
    ? lf('' + e.key)
    : t.toString(36);
}
function Ur(e, t, n, r, l) {
  var o = typeof e;
  (o === 'undefined' || o === 'boolean') && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else
    switch (o) {
      case 'string':
      case 'number':
        i = !0;
        break;
      case 'object':
        switch (e.$$typeof) {
          case dr:
          case Gc:
            i = !0;
        }
    }
  if (i)
    return (
      (i = e),
      (l = l(i)),
      (e = r === '' ? '.' + Al(i, 0) : r),
      iu(l)
        ? ((n = ''),
          e != null && (n = e.replace(uu, '$&/') + '/'),
          Ur(l, t, n, '', function (c) {
            return c;
          }))
        : l != null &&
          (di(l) &&
            (l = rf(
              l,
              n +
                (!l.key || (i && i.key === l.key)
                  ? ''
                  : ('' + l.key).replace(uu, '$&/') + '/') +
                e
            )),
          t.push(l)),
      1
    );
  if (((i = 0), (r = r === '' ? '.' : r + ':'), iu(e)))
    for (var u = 0; u < e.length; u++) {
      o = e[u];
      var s = r + Al(o, u);
      i += Ur(o, t, n, s, l);
    }
  else if (((s = nf(e)), typeof s == 'function'))
    for (e = s.call(e), u = 0; !(o = e.next()).done; )
      ((o = o.value), (s = r + Al(o, u++)), (i += Ur(o, t, n, s, l)));
  else if (o === 'object')
    throw (
      (t = String(e)),
      Error(
        'Objects are not valid as a React child (found: ' +
          (t === '[object Object]'
            ? 'object with keys {' + Object.keys(e).join(', ') + '}'
            : t) +
          '). If you meant to render a collection of children, use an array instead.'
      )
    );
  return i;
}
function kr(e, t, n) {
  if (e == null) return e;
  var r = [],
    l = 0;
  return (
    Ur(e, r, '', '', function (o) {
      return t.call(n, o, l++);
    }),
    r
  );
}
function of(e) {
  if (e._status === -1) {
    var t = e._result;
    ((t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t)));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var me = { current: null },
  Vr = { transition: null },
  uf = {
    ReactCurrentDispatcher: me,
    ReactCurrentBatchConfig: Vr,
    ReactCurrentOwner: fi,
  };
function Ls() {
  throw Error('act(...) is not supported in production builds of React.');
}
O.Children = {
  map: kr,
  forEach: function (e, t, n) {
    kr(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      kr(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      kr(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!di(e))
      throw Error(
        'React.Children.only expected to receive a single React element child.'
      );
    return e;
  },
};
O.Component = xn;
O.Fragment = Kc;
O.Profiler = Xc;
O.PureComponent = ai;
O.StrictMode = Yc;
O.Suspense = bc;
O.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = uf;
O.act = Ls;
O.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      'React.cloneElement(...): The argument must be a React element, but you passed ' +
        e +
        '.'
    );
  var r = Cs({}, e.props),
    l = e.key,
    o = e.ref,
    i = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (i = fi.current)),
      t.key !== void 0 && (l = '' + t.key),
      e.type && e.type.defaultProps)
    )
      var u = e.type.defaultProps;
    for (s in t)
      Ps.call(t, s) &&
        !Ns.hasOwnProperty(s) &&
        (r[s] = t[s] === void 0 && u !== void 0 ? u[s] : t[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) r.children = n;
  else if (1 < s) {
    u = Array(s);
    for (var c = 0; c < s; c++) u[c] = arguments[c + 2];
    r.children = u;
  }
  return { $$typeof: dr, type: e.type, key: l, ref: o, props: r, _owner: i };
};
O.createContext = function (e) {
  return (
    (e = {
      $$typeof: Jc,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Zc, _context: e }),
    (e.Consumer = e)
  );
};
O.createElement = Ts;
O.createFactory = function (e) {
  var t = Ts.bind(null, e);
  return ((t.type = e), t);
};
O.createRef = function () {
  return { current: null };
};
O.forwardRef = function (e) {
  return { $$typeof: qc, render: e };
};
O.isValidElement = di;
O.lazy = function (e) {
  return { $$typeof: tf, _payload: { _status: -1, _result: e }, _init: of };
};
O.memo = function (e, t) {
  return { $$typeof: ef, type: e, compare: t === void 0 ? null : t };
};
O.startTransition = function (e) {
  var t = Vr.transition;
  Vr.transition = {};
  try {
    e();
  } finally {
    Vr.transition = t;
  }
};
O.unstable_act = Ls;
O.useCallback = function (e, t) {
  return me.current.useCallback(e, t);
};
O.useContext = function (e) {
  return me.current.useContext(e);
};
O.useDebugValue = function () {};
O.useDeferredValue = function (e) {
  return me.current.useDeferredValue(e);
};
O.useEffect = function (e, t) {
  return me.current.useEffect(e, t);
};
O.useId = function () {
  return me.current.useId();
};
O.useImperativeHandle = function (e, t, n) {
  return me.current.useImperativeHandle(e, t, n);
};
O.useInsertionEffect = function (e, t) {
  return me.current.useInsertionEffect(e, t);
};
O.useLayoutEffect = function (e, t) {
  return me.current.useLayoutEffect(e, t);
};
O.useMemo = function (e, t) {
  return me.current.useMemo(e, t);
};
O.useReducer = function (e, t, n) {
  return me.current.useReducer(e, t, n);
};
O.useRef = function (e) {
  return me.current.useRef(e);
};
O.useState = function (e) {
  return me.current.useState(e);
};
O.useSyncExternalStore = function (e, t, n) {
  return me.current.useSyncExternalStore(e, t, n);
};
O.useTransition = function () {
  return me.current.useTransition();
};
O.version = '18.3.1';
xs.exports = O;
var oe = xs.exports;
const sf = Qc(oe);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var af = oe,
  cf = Symbol.for('react.element'),
  ff = Symbol.for('react.fragment'),
  df = Object.prototype.hasOwnProperty,
  pf = af.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  mf = { key: !0, ref: !0, __self: !0, __source: !0 };
function Rs(e, t, n) {
  var r,
    l = {},
    o = null,
    i = null;
  (n !== void 0 && (o = '' + n),
    t.key !== void 0 && (o = '' + t.key),
    t.ref !== void 0 && (i = t.ref));
  for (r in t) df.call(t, r) && !mf.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) l[r] === void 0 && (l[r] = t[r]);
  return {
    $$typeof: cf,
    type: e,
    key: o,
    ref: i,
    props: l,
    _owner: pf.current,
  };
}
Sl.Fragment = ff;
Sl.jsx = Rs;
Sl.jsxs = Rs;
Ss.exports = Sl;
var be = Ss.exports,
  po = {},
  Ms = { exports: {} },
  Pe = {},
  Os = { exports: {} },
  Is = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(v, T) {
    var L = v.length;
    v.push(T);
    e: for (; 0 < L; ) {
      var $ = (L - 1) >>> 1,
        K = v[$];
      if (0 < l(K, T)) ((v[$] = T), (v[L] = K), (L = $));
      else break e;
    }
  }
  function n(v) {
    return v.length === 0 ? null : v[0];
  }
  function r(v) {
    if (v.length === 0) return null;
    var T = v[0],
      L = v.pop();
    if (L !== T) {
      v[0] = L;
      e: for (var $ = 0, K = v.length, J = K >>> 1; $ < J; ) {
        var X = 2 * ($ + 1) - 1,
          ct = v[X],
          He = X + 1,
          W = v[He];
        if (0 > l(ct, L))
          He < K && 0 > l(W, ct)
            ? ((v[$] = W), (v[He] = L), ($ = He))
            : ((v[$] = ct), (v[X] = L), ($ = X));
        else if (He < K && 0 > l(W, L)) ((v[$] = W), (v[He] = L), ($ = He));
        else break e;
      }
    }
    return T;
  }
  function l(v, T) {
    var L = v.sortIndex - T.sortIndex;
    return L !== 0 ? L : v.id - T.id;
  }
  if (typeof performance == 'object' && typeof performance.now == 'function') {
    var o = performance;
    e.unstable_now = function () {
      return o.now();
    };
  } else {
    var i = Date,
      u = i.now();
    e.unstable_now = function () {
      return i.now() - u;
    };
  }
  var s = [],
    c = [],
    m = 1,
    h = null,
    p = 3,
    S = !1,
    k = !1,
    x = !1,
    I = typeof setTimeout == 'function' ? setTimeout : null,
    f = typeof clearTimeout == 'function' ? clearTimeout : null,
    a = typeof setImmediate < 'u' ? setImmediate : null;
  typeof navigator < 'u' &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function d(v) {
    for (var T = n(c); T !== null; ) {
      if (T.callback === null) r(c);
      else if (T.startTime <= v)
        (r(c), (T.sortIndex = T.expirationTime), t(s, T));
      else break;
      T = n(c);
    }
  }
  function g(v) {
    if (((x = !1), d(v), !k))
      if (n(s) !== null) ((k = !0), xe(E));
      else {
        var T = n(c);
        T !== null && je(g, T.startTime - v);
      }
  }
  function E(v, T) {
    ((k = !1), x && ((x = !1), f(y), (y = -1)), (S = !0));
    var L = p;
    try {
      for (
        d(T), h = n(s);
        h !== null && (!(h.expirationTime > T) || (v && !ve()));

      ) {
        var $ = h.callback;
        if (typeof $ == 'function') {
          ((h.callback = null), (p = h.priorityLevel));
          var K = $(h.expirationTime <= T);
          ((T = e.unstable_now()),
            typeof K == 'function' ? (h.callback = K) : h === n(s) && r(s),
            d(T));
        } else r(s);
        h = n(s);
      }
      if (h !== null) var J = !0;
      else {
        var X = n(c);
        (X !== null && je(g, X.startTime - T), (J = !1));
      }
      return J;
    } finally {
      ((h = null), (p = L), (S = !1));
    }
  }
  var _ = !1,
    N = null,
    y = -1,
    F = 5,
    M = -1;
  function ve() {
    return !(e.unstable_now() - M < F);
  }
  function We() {
    if (N !== null) {
      var v = e.unstable_now();
      M = v;
      var T = !0;
      try {
        T = N(!0, v);
      } finally {
        T ? st() : ((_ = !1), (N = null));
      }
    } else _ = !1;
  }
  var st;
  if (typeof a == 'function')
    st = function () {
      a(We);
    };
  else if (typeof MessageChannel < 'u') {
    var Kt = new MessageChannel(),
      at = Kt.port2;
    ((Kt.port1.onmessage = We),
      (st = function () {
        at.postMessage(null);
      }));
  } else
    st = function () {
      I(We, 0);
    };
  function xe(v) {
    ((N = v), _ || ((_ = !0), st()));
  }
  function je(v, T) {
    y = I(function () {
      v(e.unstable_now());
    }, T);
  }
  ((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (v) {
      v.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      k || S || ((k = !0), xe(E));
    }),
    (e.unstable_forceFrameRate = function (v) {
      0 > v || 125 < v
        ? console.error(
            'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
          )
        : (F = 0 < v ? Math.floor(1e3 / v) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return p;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(s);
    }),
    (e.unstable_next = function (v) {
      switch (p) {
        case 1:
        case 2:
        case 3:
          var T = 3;
          break;
        default:
          T = p;
      }
      var L = p;
      p = T;
      try {
        return v();
      } finally {
        p = L;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (v, T) {
      switch (v) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          v = 3;
      }
      var L = p;
      p = v;
      try {
        return T();
      } finally {
        p = L;
      }
    }),
    (e.unstable_scheduleCallback = function (v, T, L) {
      var $ = e.unstable_now();
      switch (
        (typeof L == 'object' && L !== null
          ? ((L = L.delay), (L = typeof L == 'number' && 0 < L ? $ + L : $))
          : (L = $),
        v)
      ) {
        case 1:
          var K = -1;
          break;
        case 2:
          K = 250;
          break;
        case 5:
          K = 1073741823;
          break;
        case 4:
          K = 1e4;
          break;
        default:
          K = 5e3;
      }
      return (
        (K = L + K),
        (v = {
          id: m++,
          callback: T,
          priorityLevel: v,
          startTime: L,
          expirationTime: K,
          sortIndex: -1,
        }),
        L > $
          ? ((v.sortIndex = L),
            t(c, v),
            n(s) === null &&
              v === n(c) &&
              (x ? (f(y), (y = -1)) : (x = !0), je(g, L - $)))
          : ((v.sortIndex = K), t(s, v), k || S || ((k = !0), xe(E))),
        v
      );
    }),
    (e.unstable_shouldYield = ve),
    (e.unstable_wrapCallback = function (v) {
      var T = p;
      return function () {
        var L = p;
        p = T;
        try {
          return v.apply(this, arguments);
        } finally {
          p = L;
        }
      };
    }));
})(Is);
Os.exports = Is;
var hf = Os.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var vf = oe,
  ze = hf;
function w(e) {
  for (
    var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e, n = 1;
    n < arguments.length;
    n++
  )
    t += '&args[]=' + encodeURIComponent(arguments[n]);
  return (
    'Minified React error #' +
    e +
    '; visit ' +
    t +
    ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
  );
}
var js = new Set(),
  Xn = {};
function Qt(e, t) {
  (hn(e, t), hn(e + 'Capture', t));
}
function hn(e, t) {
  for (Xn[e] = t, e = 0; e < t.length; e++) js.add(t[e]);
}
var rt = !(
    typeof window > 'u' ||
    typeof window.document > 'u' ||
    typeof window.document.createElement > 'u'
  ),
  mo = Object.prototype.hasOwnProperty,
  gf =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  su = {},
  au = {};
function yf(e) {
  return mo.call(au, e)
    ? !0
    : mo.call(su, e)
      ? !1
      : gf.test(e)
        ? (au[e] = !0)
        : ((su[e] = !0), !1);
}
function wf(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case 'function':
    case 'symbol':
      return !0;
    case 'boolean':
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== 'data-' && e !== 'aria-');
    default:
      return !1;
  }
}
function kf(e, t, n, r) {
  if (t === null || typeof t > 'u' || wf(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function he(e, t, n, r, l, o, i) {
  ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = l),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = i));
}
var ue = {};
'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
  .split(' ')
  .forEach(function (e) {
    ue[e] = new he(e, 0, !1, e, null, !1, !1);
  });
[
  ['acceptCharset', 'accept-charset'],
  ['className', 'class'],
  ['htmlFor', 'for'],
  ['httpEquiv', 'http-equiv'],
].forEach(function (e) {
  var t = e[0];
  ue[t] = new he(t, 1, !1, e[1], null, !1, !1);
});
['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (e) {
  ue[e] = new he(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  'autoReverse',
  'externalResourcesRequired',
  'focusable',
  'preserveAlpha',
].forEach(function (e) {
  ue[e] = new he(e, 2, !1, e, null, !1, !1);
});
'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
  .split(' ')
  .forEach(function (e) {
    ue[e] = new he(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
  ue[e] = new he(e, 3, !0, e, null, !1, !1);
});
['capture', 'download'].forEach(function (e) {
  ue[e] = new he(e, 4, !1, e, null, !1, !1);
});
['cols', 'rows', 'size', 'span'].forEach(function (e) {
  ue[e] = new he(e, 6, !1, e, null, !1, !1);
});
['rowSpan', 'start'].forEach(function (e) {
  ue[e] = new he(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var pi = /[\-:]([a-z])/g;
function mi(e) {
  return e[1].toUpperCase();
}
'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(pi, mi);
    ue[t] = new he(t, 1, !1, e, null, !1, !1);
  });
'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(pi, mi);
    ue[t] = new he(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
  });
['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
  var t = e.replace(pi, mi);
  ue[t] = new he(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1);
});
['tabIndex', 'crossOrigin'].forEach(function (e) {
  ue[e] = new he(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ue.xlinkHref = new he(
  'xlinkHref',
  1,
  !1,
  'xlink:href',
  'http://www.w3.org/1999/xlink',
  !0,
  !1
);
['src', 'href', 'action', 'formAction'].forEach(function (e) {
  ue[e] = new he(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function hi(e, t, n, r) {
  var l = ue.hasOwnProperty(t) ? ue[t] : null;
  (l !== null
    ? l.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== 'o' && t[0] !== 'O') ||
      (t[1] !== 'n' && t[1] !== 'N')) &&
    (kf(t, n, l, r) && (n = null),
    r || l === null
      ? yf(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, '' + n))
      : l.mustUseProperty
        ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : '') : n)
        : ((t = l.attributeName),
          (r = l.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((l = l.type),
              (n = l === 3 || (l === 4 && n === !0) ? '' : '' + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var ut = vf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Sr = Symbol.for('react.element'),
  Zt = Symbol.for('react.portal'),
  Jt = Symbol.for('react.fragment'),
  vi = Symbol.for('react.strict_mode'),
  ho = Symbol.for('react.profiler'),
  Fs = Symbol.for('react.provider'),
  Ds = Symbol.for('react.context'),
  gi = Symbol.for('react.forward_ref'),
  vo = Symbol.for('react.suspense'),
  go = Symbol.for('react.suspense_list'),
  yi = Symbol.for('react.memo'),
  pt = Symbol.for('react.lazy'),
  As = Symbol.for('react.offscreen'),
  cu = Symbol.iterator;
function Pn(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (cu && e[cu]) || e['@@iterator']),
      typeof e == 'function' ? e : null);
}
var G = Object.assign,
  Ul;
function Fn(e) {
  if (Ul === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Ul = (t && t[1]) || '';
    }
  return (
    `
` +
    Ul +
    e
  );
}
var Vl = !1;
function $l(e, t) {
  if (!e || Vl) return '';
  Vl = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, 'props', {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == 'object' && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (c) {
          var r = c;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (c) {
          r = c;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (c) {
        r = c;
      }
      e();
    }
  } catch (c) {
    if (c && r && typeof c.stack == 'string') {
      for (
        var l = c.stack.split(`
`),
          o = r.stack.split(`
`),
          i = l.length - 1,
          u = o.length - 1;
        1 <= i && 0 <= u && l[i] !== o[u];

      )
        u--;
      for (; 1 <= i && 0 <= u; i--, u--)
        if (l[i] !== o[u]) {
          if (i !== 1 || u !== 1)
            do
              if ((i--, u--, 0 > u || l[i] !== o[u])) {
                var s =
                  `
` + l[i].replace(' at new ', ' at ');
                return (
                  e.displayName &&
                    s.includes('<anonymous>') &&
                    (s = s.replace('<anonymous>', e.displayName)),
                  s
                );
              }
            while (1 <= i && 0 <= u);
          break;
        }
    }
  } finally {
    ((Vl = !1), (Error.prepareStackTrace = n));
  }
  return (e = e ? e.displayName || e.name : '') ? Fn(e) : '';
}
function Sf(e) {
  switch (e.tag) {
    case 5:
      return Fn(e.type);
    case 16:
      return Fn('Lazy');
    case 13:
      return Fn('Suspense');
    case 19:
      return Fn('SuspenseList');
    case 0:
    case 2:
    case 15:
      return ((e = $l(e.type, !1)), e);
    case 11:
      return ((e = $l(e.type.render, !1)), e);
    case 1:
      return ((e = $l(e.type, !0)), e);
    default:
      return '';
  }
}
function yo(e) {
  if (e == null) return null;
  if (typeof e == 'function') return e.displayName || e.name || null;
  if (typeof e == 'string') return e;
  switch (e) {
    case Jt:
      return 'Fragment';
    case Zt:
      return 'Portal';
    case ho:
      return 'Profiler';
    case vi:
      return 'StrictMode';
    case vo:
      return 'Suspense';
    case go:
      return 'SuspenseList';
  }
  if (typeof e == 'object')
    switch (e.$$typeof) {
      case Ds:
        return (e.displayName || 'Context') + '.Consumer';
      case Fs:
        return (e._context.displayName || 'Context') + '.Provider';
      case gi:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ''),
            (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
          e
        );
      case yi:
        return (
          (t = e.displayName || null),
          t !== null ? t : yo(e.type) || 'Memo'
        );
      case pt:
        ((t = e._payload), (e = e._init));
        try {
          return yo(e(t));
        } catch {}
    }
  return null;
}
function xf(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return 'Cache';
    case 9:
      return (t.displayName || 'Context') + '.Consumer';
    case 10:
      return (t._context.displayName || 'Context') + '.Provider';
    case 18:
      return 'DehydratedFragment';
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ''),
        t.displayName || (e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')
      );
    case 7:
      return 'Fragment';
    case 5:
      return t;
    case 4:
      return 'Portal';
    case 3:
      return 'Root';
    case 6:
      return 'Text';
    case 16:
      return yo(t);
    case 8:
      return t === vi ? 'StrictMode' : 'Mode';
    case 22:
      return 'Offscreen';
    case 12:
      return 'Profiler';
    case 21:
      return 'Scope';
    case 13:
      return 'Suspense';
    case 19:
      return 'SuspenseList';
    case 25:
      return 'TracingMarker';
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == 'function') return t.displayName || t.name || null;
      if (typeof t == 'string') return t;
  }
  return null;
}
function Pt(e) {
  switch (typeof e) {
    case 'boolean':
    case 'number':
    case 'string':
    case 'undefined':
      return e;
    case 'object':
      return e;
    default:
      return '';
  }
}
function Us(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === 'input' &&
    (t === 'checkbox' || t === 'radio')
  );
}
function Ef(e) {
  var t = Us(e) ? 'checked' : 'value',
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = '' + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < 'u' &&
    typeof n.get == 'function' &&
    typeof n.set == 'function'
  ) {
    var l = n.get,
      o = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return l.call(this);
        },
        set: function (i) {
          ((r = '' + i), o.call(this, i));
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (i) {
          r = '' + i;
        },
        stopTracking: function () {
          ((e._valueTracker = null), delete e[t]);
        },
      }
    );
  }
}
function xr(e) {
  e._valueTracker || (e._valueTracker = Ef(e));
}
function Vs(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = '';
  return (
    e && (r = Us(e) ? (e.checked ? 'true' : 'false') : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Jr(e) {
  if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u'))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function wo(e, t) {
  var n = t.checked;
  return G({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function fu(e, t) {
  var n = t.defaultValue == null ? '' : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  ((n = Pt(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === 'checkbox' || t.type === 'radio'
          ? t.checked != null
          : t.value != null,
    }));
}
function $s(e, t) {
  ((t = t.checked), t != null && hi(e, 'checked', t, !1));
}
function ko(e, t) {
  $s(e, t);
  var n = Pt(t.value),
    r = t.type;
  if (n != null)
    r === 'number'
      ? ((n === 0 && e.value === '') || e.value != n) && (e.value = '' + n)
      : e.value !== '' + n && (e.value = '' + n);
  else if (r === 'submit' || r === 'reset') {
    e.removeAttribute('value');
    return;
  }
  (t.hasOwnProperty('value')
    ? So(e, t.type, n)
    : t.hasOwnProperty('defaultValue') && So(e, t.type, Pt(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked));
}
function du(e, t, n) {
  if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
    var r = t.type;
    if (
      !(
        (r !== 'submit' && r !== 'reset') ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    ((t = '' + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t));
  }
  ((n = e.name),
    n !== '' && (e.name = ''),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== '' && (e.name = n));
}
function So(e, t, n) {
  (t !== 'number' || Jr(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = '' + e._wrapperState.initialValue)
      : e.defaultValue !== '' + n && (e.defaultValue = '' + n));
}
var Dn = Array.isArray;
function an(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var l = 0; l < n.length; l++) t['$' + n[l]] = !0;
    for (n = 0; n < e.length; n++)
      ((l = t.hasOwnProperty('$' + e[n].value)),
        e[n].selected !== l && (e[n].selected = l),
        l && r && (e[n].defaultSelected = !0));
  } else {
    for (n = '' + Pt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        ((e[l].selected = !0), r && (e[l].defaultSelected = !0));
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function xo(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(w(91));
  return G({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: '' + e._wrapperState.initialValue,
  });
}
function pu(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(w(92));
      if (Dn(n)) {
        if (1 < n.length) throw Error(w(93));
        n = n[0];
      }
      t = n;
    }
    (t == null && (t = ''), (n = t));
  }
  e._wrapperState = { initialValue: Pt(n) };
}
function Bs(e, t) {
  var n = Pt(t.value),
    r = Pt(t.defaultValue);
  (n != null &&
    ((n = '' + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = '' + r));
}
function mu(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== '' && t !== null && (e.value = t);
}
function Ws(e) {
  switch (e) {
    case 'svg':
      return 'http://www.w3.org/2000/svg';
    case 'math':
      return 'http://www.w3.org/1998/Math/MathML';
    default:
      return 'http://www.w3.org/1999/xhtml';
  }
}
function Eo(e, t) {
  return e == null || e === 'http://www.w3.org/1999/xhtml'
    ? Ws(t)
    : e === 'http://www.w3.org/2000/svg' && t === 'foreignObject'
      ? 'http://www.w3.org/1999/xhtml'
      : e;
}
var Er,
  Hs = (function (e) {
    return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, l) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, l);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in e)
      e.innerHTML = t;
    else {
      for (
        Er = Er || document.createElement('div'),
          Er.innerHTML = '<svg>' + t.valueOf().toString() + '</svg>',
          t = Er.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Zn(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Vn = {
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
    strokeWidth: !0,
  },
  Cf = ['Webkit', 'ms', 'Moz', 'O'];
Object.keys(Vn).forEach(function (e) {
  Cf.forEach(function (t) {
    ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Vn[t] = Vn[e]));
  });
});
function Qs(e, t, n) {
  return t == null || typeof t == 'boolean' || t === ''
    ? ''
    : n || typeof t != 'number' || t === 0 || (Vn.hasOwnProperty(e) && Vn[e])
      ? ('' + t).trim()
      : t + 'px';
}
function Gs(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf('--') === 0,
        l = Qs(n, t[n], r);
      (n === 'float' && (n = 'cssFloat'), r ? e.setProperty(n, l) : (e[n] = l));
    }
}
var _f = G(
  { menuitem: !0 },
  {
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
    wbr: !0,
  }
);
function Co(e, t) {
  if (t) {
    if (_f[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(w(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(w(60));
      if (
        typeof t.dangerouslySetInnerHTML != 'object' ||
        !('__html' in t.dangerouslySetInnerHTML)
      )
        throw Error(w(61));
    }
    if (t.style != null && typeof t.style != 'object') throw Error(w(62));
  }
}
function _o(e, t) {
  if (e.indexOf('-') === -1) return typeof t.is == 'string';
  switch (e) {
    case 'annotation-xml':
    case 'color-profile':
    case 'font-face':
    case 'font-face-src':
    case 'font-face-uri':
    case 'font-face-format':
    case 'font-face-name':
    case 'missing-glyph':
      return !1;
    default:
      return !0;
  }
}
var zo = null;
function wi(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Po = null,
  cn = null,
  fn = null;
function hu(e) {
  if ((e = hr(e))) {
    if (typeof Po != 'function') throw Error(w(280));
    var t = e.stateNode;
    t && ((t = zl(t)), Po(e.stateNode, e.type, t));
  }
}
function Ks(e) {
  cn ? (fn ? fn.push(e) : (fn = [e])) : (cn = e);
}
function Ys() {
  if (cn) {
    var e = cn,
      t = fn;
    if (((fn = cn = null), hu(e), t)) for (e = 0; e < t.length; e++) hu(t[e]);
  }
}
function Xs(e, t) {
  return e(t);
}
function Zs() {}
var Bl = !1;
function Js(e, t, n) {
  if (Bl) return e(t, n);
  Bl = !0;
  try {
    return Xs(e, t, n);
  } finally {
    ((Bl = !1), (cn !== null || fn !== null) && (Zs(), Ys()));
  }
}
function Jn(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = zl(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case 'onClick':
    case 'onClickCapture':
    case 'onDoubleClick':
    case 'onDoubleClickCapture':
    case 'onMouseDown':
    case 'onMouseDownCapture':
    case 'onMouseMove':
    case 'onMouseMoveCapture':
    case 'onMouseUp':
    case 'onMouseUpCapture':
    case 'onMouseEnter':
      ((r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === 'button' ||
          e === 'input' ||
          e === 'select' ||
          e === 'textarea'
        ))),
        (e = !r));
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != 'function') throw Error(w(231, t, typeof n));
  return n;
}
var No = !1;
if (rt)
  try {
    var Nn = {};
    (Object.defineProperty(Nn, 'passive', {
      get: function () {
        No = !0;
      },
    }),
      window.addEventListener('test', Nn, Nn),
      window.removeEventListener('test', Nn, Nn));
  } catch {
    No = !1;
  }
function zf(e, t, n, r, l, o, i, u, s) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (m) {
    this.onError(m);
  }
}
var $n = !1,
  qr = null,
  br = !1,
  To = null,
  Pf = {
    onError: function (e) {
      (($n = !0), (qr = e));
    },
  };
function Nf(e, t, n, r, l, o, i, u, s) {
  (($n = !1), (qr = null), zf.apply(Pf, arguments));
}
function Tf(e, t, n, r, l, o, i, u, s) {
  if ((Nf.apply(this, arguments), $n)) {
    if ($n) {
      var c = qr;
      (($n = !1), (qr = null));
    } else throw Error(w(198));
    br || ((br = !0), (To = c));
  }
}
function Gt(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return));
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function qs(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function vu(e) {
  if (Gt(e) !== e) throw Error(w(188));
}
function Lf(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Gt(e)), t === null)) throw Error(w(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var o = l.alternate;
    if (o === null) {
      if (((r = l.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === o.child) {
      for (o = l.child; o; ) {
        if (o === n) return (vu(l), e);
        if (o === r) return (vu(l), t);
        o = o.sibling;
      }
      throw Error(w(188));
    }
    if (n.return !== r.return) ((n = l), (r = o));
    else {
      for (var i = !1, u = l.child; u; ) {
        if (u === n) {
          ((i = !0), (n = l), (r = o));
          break;
        }
        if (u === r) {
          ((i = !0), (r = l), (n = o));
          break;
        }
        u = u.sibling;
      }
      if (!i) {
        for (u = o.child; u; ) {
          if (u === n) {
            ((i = !0), (n = o), (r = l));
            break;
          }
          if (u === r) {
            ((i = !0), (r = o), (n = l));
            break;
          }
          u = u.sibling;
        }
        if (!i) throw Error(w(189));
      }
    }
    if (n.alternate !== r) throw Error(w(190));
  }
  if (n.tag !== 3) throw Error(w(188));
  return n.stateNode.current === n ? e : t;
}
function bs(e) {
  return ((e = Lf(e)), e !== null ? ea(e) : null);
}
function ea(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = ea(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var ta = ze.unstable_scheduleCallback,
  gu = ze.unstable_cancelCallback,
  Rf = ze.unstable_shouldYield,
  Mf = ze.unstable_requestPaint,
  Z = ze.unstable_now,
  Of = ze.unstable_getCurrentPriorityLevel,
  ki = ze.unstable_ImmediatePriority,
  na = ze.unstable_UserBlockingPriority,
  el = ze.unstable_NormalPriority,
  If = ze.unstable_LowPriority,
  ra = ze.unstable_IdlePriority,
  xl = null,
  Ye = null;
function jf(e) {
  if (Ye && typeof Ye.onCommitFiberRoot == 'function')
    try {
      Ye.onCommitFiberRoot(xl, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Ve = Math.clz32 ? Math.clz32 : Af,
  Ff = Math.log,
  Df = Math.LN2;
function Af(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((Ff(e) / Df) | 0)) | 0);
}
var Cr = 64,
  _r = 4194304;
function An(e) {
  switch (e & -e) {
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
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function tl(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    l = e.suspendedLanes,
    o = e.pingedLanes,
    i = n & 268435455;
  if (i !== 0) {
    var u = i & ~l;
    u !== 0 ? (r = An(u)) : ((o &= i), o !== 0 && (r = An(o)));
  } else ((i = n & ~l), i !== 0 ? (r = An(i)) : o !== 0 && (r = An(o)));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & l) &&
    ((l = r & -r), (o = t & -t), l >= o || (l === 16 && (o & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      ((n = 31 - Ve(t)), (l = 1 << n), (r |= e[n]), (t &= ~l));
  return r;
}
function Uf(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
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
      return t + 5e3;
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
function Vf(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      l = e.expirationTimes,
      o = e.pendingLanes;
    0 < o;

  ) {
    var i = 31 - Ve(o),
      u = 1 << i,
      s = l[i];
    (s === -1
      ? (!(u & n) || u & r) && (l[i] = Uf(u, t))
      : s <= t && (e.expiredLanes |= u),
      (o &= ~u));
  }
}
function Lo(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function la() {
  var e = Cr;
  return ((Cr <<= 1), !(Cr & 4194240) && (Cr = 64), e);
}
function Wl(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function pr(e, t, n) {
  ((e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Ve(t)),
    (e[t] = n));
}
function $f(e, t) {
  var n = e.pendingLanes & ~t;
  ((e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements));
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Ve(n),
      o = 1 << l;
    ((t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~o));
  }
}
function Si(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Ve(n),
      l = 1 << r;
    ((l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l));
  }
}
var D = 0;
function oa(e) {
  return (
    (e &= -e),
    1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
  );
}
var ia,
  xi,
  ua,
  sa,
  aa,
  Ro = !1,
  zr = [],
  wt = null,
  kt = null,
  St = null,
  qn = new Map(),
  bn = new Map(),
  ht = [],
  Bf =
    'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
      ' '
    );
function yu(e, t) {
  switch (e) {
    case 'focusin':
    case 'focusout':
      wt = null;
      break;
    case 'dragenter':
    case 'dragleave':
      kt = null;
      break;
    case 'mouseover':
    case 'mouseout':
      St = null;
      break;
    case 'pointerover':
    case 'pointerout':
      qn.delete(t.pointerId);
      break;
    case 'gotpointercapture':
    case 'lostpointercapture':
      bn.delete(t.pointerId);
  }
}
function Tn(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [l],
      }),
      t !== null && ((t = hr(t)), t !== null && xi(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      l !== null && t.indexOf(l) === -1 && t.push(l),
      e);
}
function Wf(e, t, n, r, l) {
  switch (t) {
    case 'focusin':
      return ((wt = Tn(wt, e, t, n, r, l)), !0);
    case 'dragenter':
      return ((kt = Tn(kt, e, t, n, r, l)), !0);
    case 'mouseover':
      return ((St = Tn(St, e, t, n, r, l)), !0);
    case 'pointerover':
      var o = l.pointerId;
      return (qn.set(o, Tn(qn.get(o) || null, e, t, n, r, l)), !0);
    case 'gotpointercapture':
      return (
        (o = l.pointerId),
        bn.set(o, Tn(bn.get(o) || null, e, t, n, r, l)),
        !0
      );
  }
  return !1;
}
function ca(e) {
  var t = jt(e.target);
  if (t !== null) {
    var n = Gt(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = qs(n)), t !== null)) {
          ((e.blockedOn = t),
            aa(e.priority, function () {
              ua(n);
            }));
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function $r(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Mo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      ((zo = r), n.target.dispatchEvent(r), (zo = null));
    } else return ((t = hr(n)), t !== null && xi(t), (e.blockedOn = n), !1);
    t.shift();
  }
  return !0;
}
function wu(e, t, n) {
  $r(e) && n.delete(t);
}
function Hf() {
  ((Ro = !1),
    wt !== null && $r(wt) && (wt = null),
    kt !== null && $r(kt) && (kt = null),
    St !== null && $r(St) && (St = null),
    qn.forEach(wu),
    bn.forEach(wu));
}
function Ln(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Ro ||
      ((Ro = !0),
      ze.unstable_scheduleCallback(ze.unstable_NormalPriority, Hf)));
}
function er(e) {
  function t(l) {
    return Ln(l, e);
  }
  if (0 < zr.length) {
    Ln(zr[0], e);
    for (var n = 1; n < zr.length; n++) {
      var r = zr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    wt !== null && Ln(wt, e),
      kt !== null && Ln(kt, e),
      St !== null && Ln(St, e),
      qn.forEach(t),
      bn.forEach(t),
      n = 0;
    n < ht.length;
    n++
  )
    ((r = ht[n]), r.blockedOn === e && (r.blockedOn = null));
  for (; 0 < ht.length && ((n = ht[0]), n.blockedOn === null); )
    (ca(n), n.blockedOn === null && ht.shift());
}
var dn = ut.ReactCurrentBatchConfig,
  nl = !0;
function Qf(e, t, n, r) {
  var l = D,
    o = dn.transition;
  dn.transition = null;
  try {
    ((D = 1), Ei(e, t, n, r));
  } finally {
    ((D = l), (dn.transition = o));
  }
}
function Gf(e, t, n, r) {
  var l = D,
    o = dn.transition;
  dn.transition = null;
  try {
    ((D = 4), Ei(e, t, n, r));
  } finally {
    ((D = l), (dn.transition = o));
  }
}
function Ei(e, t, n, r) {
  if (nl) {
    var l = Mo(e, t, n, r);
    if (l === null) (bl(e, t, r, rl, n), yu(e, r));
    else if (Wf(l, e, t, n, r)) r.stopPropagation();
    else if ((yu(e, r), t & 4 && -1 < Bf.indexOf(e))) {
      for (; l !== null; ) {
        var o = hr(l);
        if (
          (o !== null && ia(o),
          (o = Mo(e, t, n, r)),
          o === null && bl(e, t, r, rl, n),
          o === l)
        )
          break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else bl(e, t, r, null, n);
  }
}
var rl = null;
function Mo(e, t, n, r) {
  if (((rl = null), (e = wi(r)), (e = jt(e)), e !== null))
    if (((t = Gt(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = qs(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return ((rl = e), null);
}
function fa(e) {
  switch (e) {
    case 'cancel':
    case 'click':
    case 'close':
    case 'contextmenu':
    case 'copy':
    case 'cut':
    case 'auxclick':
    case 'dblclick':
    case 'dragend':
    case 'dragstart':
    case 'drop':
    case 'focusin':
    case 'focusout':
    case 'input':
    case 'invalid':
    case 'keydown':
    case 'keypress':
    case 'keyup':
    case 'mousedown':
    case 'mouseup':
    case 'paste':
    case 'pause':
    case 'play':
    case 'pointercancel':
    case 'pointerdown':
    case 'pointerup':
    case 'ratechange':
    case 'reset':
    case 'resize':
    case 'seeked':
    case 'submit':
    case 'touchcancel':
    case 'touchend':
    case 'touchstart':
    case 'volumechange':
    case 'change':
    case 'selectionchange':
    case 'textInput':
    case 'compositionstart':
    case 'compositionend':
    case 'compositionupdate':
    case 'beforeblur':
    case 'afterblur':
    case 'beforeinput':
    case 'blur':
    case 'fullscreenchange':
    case 'focus':
    case 'hashchange':
    case 'popstate':
    case 'select':
    case 'selectstart':
      return 1;
    case 'drag':
    case 'dragenter':
    case 'dragexit':
    case 'dragleave':
    case 'dragover':
    case 'mousemove':
    case 'mouseout':
    case 'mouseover':
    case 'pointermove':
    case 'pointerout':
    case 'pointerover':
    case 'scroll':
    case 'toggle':
    case 'touchmove':
    case 'wheel':
    case 'mouseenter':
    case 'mouseleave':
    case 'pointerenter':
    case 'pointerleave':
      return 4;
    case 'message':
      switch (Of()) {
        case ki:
          return 1;
        case na:
          return 4;
        case el:
        case If:
          return 16;
        case ra:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var gt = null,
  Ci = null,
  Br = null;
function da() {
  if (Br) return Br;
  var e,
    t = Ci,
    n = t.length,
    r,
    l = 'value' in gt ? gt.value : gt.textContent,
    o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++);
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++);
  return (Br = l.slice(e, 1 < r ? 1 - r : void 0));
}
function Wr(e) {
  var t = e.keyCode;
  return (
    'charCode' in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Pr() {
  return !0;
}
function ku() {
  return !1;
}
function Ne(e) {
  function t(n, r, l, o, i) {
    ((this._reactName = n),
      (this._targetInst = l),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = i),
      (this.currentTarget = null));
    for (var u in e)
      e.hasOwnProperty(u) && ((n = e[u]), (this[u] = n ? n(o) : o[u]));
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? Pr
        : ku),
      (this.isPropagationStopped = ku),
      this
    );
  }
  return (
    G(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != 'unknown' && (n.returnValue = !1),
          (this.isDefaultPrevented = Pr));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != 'unknown' && (n.cancelBubble = !0),
          (this.isPropagationStopped = Pr));
      },
      persist: function () {},
      isPersistent: Pr,
    }),
    t
  );
}
var En = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  _i = Ne(En),
  mr = G({}, En, { view: 0, detail: 0 }),
  Kf = Ne(mr),
  Hl,
  Ql,
  Rn,
  El = G({}, mr, {
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
    getModifierState: zi,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return 'movementX' in e
        ? e.movementX
        : (e !== Rn &&
            (Rn && e.type === 'mousemove'
              ? ((Hl = e.screenX - Rn.screenX), (Ql = e.screenY - Rn.screenY))
              : (Ql = Hl = 0),
            (Rn = e)),
          Hl);
    },
    movementY: function (e) {
      return 'movementY' in e ? e.movementY : Ql;
    },
  }),
  Su = Ne(El),
  Yf = G({}, El, { dataTransfer: 0 }),
  Xf = Ne(Yf),
  Zf = G({}, mr, { relatedTarget: 0 }),
  Gl = Ne(Zf),
  Jf = G({}, En, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  qf = Ne(Jf),
  bf = G({}, En, {
    clipboardData: function (e) {
      return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
    },
  }),
  ed = Ne(bf),
  td = G({}, En, { data: 0 }),
  xu = Ne(td),
  nd = {
    Esc: 'Escape',
    Spacebar: ' ',
    Left: 'ArrowLeft',
    Up: 'ArrowUp',
    Right: 'ArrowRight',
    Down: 'ArrowDown',
    Del: 'Delete',
    Win: 'OS',
    Menu: 'ContextMenu',
    Apps: 'ContextMenu',
    Scroll: 'ScrollLock',
    MozPrintableKey: 'Unidentified',
  },
  rd = {
    8: 'Backspace',
    9: 'Tab',
    12: 'Clear',
    13: 'Enter',
    16: 'Shift',
    17: 'Control',
    18: 'Alt',
    19: 'Pause',
    20: 'CapsLock',
    27: 'Escape',
    32: ' ',
    33: 'PageUp',
    34: 'PageDown',
    35: 'End',
    36: 'Home',
    37: 'ArrowLeft',
    38: 'ArrowUp',
    39: 'ArrowRight',
    40: 'ArrowDown',
    45: 'Insert',
    46: 'Delete',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    144: 'NumLock',
    145: 'ScrollLock',
    224: 'Meta',
  },
  ld = {
    Alt: 'altKey',
    Control: 'ctrlKey',
    Meta: 'metaKey',
    Shift: 'shiftKey',
  };
function od(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = ld[e]) ? !!t[e] : !1;
}
function zi() {
  return od;
}
var id = G({}, mr, {
    key: function (e) {
      if (e.key) {
        var t = nd[e.key] || e.key;
        if (t !== 'Unidentified') return t;
      }
      return e.type === 'keypress'
        ? ((e = Wr(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
        : e.type === 'keydown' || e.type === 'keyup'
          ? rd[e.keyCode] || 'Unidentified'
          : '';
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: zi,
    charCode: function (e) {
      return e.type === 'keypress' ? Wr(e) : 0;
    },
    keyCode: function (e) {
      return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === 'keypress'
        ? Wr(e)
        : e.type === 'keydown' || e.type === 'keyup'
          ? e.keyCode
          : 0;
    },
  }),
  ud = Ne(id),
  sd = G({}, El, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Eu = Ne(sd),
  ad = G({}, mr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: zi,
  }),
  cd = Ne(ad),
  fd = G({}, En, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  dd = Ne(fd),
  pd = G({}, El, {
    deltaX: function (e) {
      return 'deltaX' in e ? e.deltaX : 'wheelDeltaX' in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return 'deltaY' in e
        ? e.deltaY
        : 'wheelDeltaY' in e
          ? -e.wheelDeltaY
          : 'wheelDelta' in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  md = Ne(pd),
  hd = [9, 13, 27, 32],
  Pi = rt && 'CompositionEvent' in window,
  Bn = null;
rt && 'documentMode' in document && (Bn = document.documentMode);
var vd = rt && 'TextEvent' in window && !Bn,
  pa = rt && (!Pi || (Bn && 8 < Bn && 11 >= Bn)),
  Cu = ' ',
  _u = !1;
function ma(e, t) {
  switch (e) {
    case 'keyup':
      return hd.indexOf(t.keyCode) !== -1;
    case 'keydown':
      return t.keyCode !== 229;
    case 'keypress':
    case 'mousedown':
    case 'focusout':
      return !0;
    default:
      return !1;
  }
}
function ha(e) {
  return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
}
var qt = !1;
function gd(e, t) {
  switch (e) {
    case 'compositionend':
      return ha(t);
    case 'keypress':
      return t.which !== 32 ? null : ((_u = !0), Cu);
    case 'textInput':
      return ((e = t.data), e === Cu && _u ? null : e);
    default:
      return null;
  }
}
function yd(e, t) {
  if (qt)
    return e === 'compositionend' || (!Pi && ma(e, t))
      ? ((e = da()), (Br = Ci = gt = null), (qt = !1), e)
      : null;
  switch (e) {
    case 'paste':
      return null;
    case 'keypress':
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case 'compositionend':
      return pa && t.locale !== 'ko' ? null : t.data;
    default:
      return null;
  }
}
var wd = {
  color: !0,
  date: !0,
  datetime: !0,
  'datetime-local': !0,
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
  week: !0,
};
function zu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === 'input' ? !!wd[e.type] : t === 'textarea';
}
function va(e, t, n, r) {
  (Ks(r),
    (t = ll(t, 'onChange')),
    0 < t.length &&
      ((n = new _i('onChange', 'change', null, n, r)),
      e.push({ event: n, listeners: t })));
}
var Wn = null,
  tr = null;
function kd(e) {
  Pa(e, 0);
}
function Cl(e) {
  var t = tn(e);
  if (Vs(t)) return e;
}
function Sd(e, t) {
  if (e === 'change') return t;
}
var ga = !1;
if (rt) {
  var Kl;
  if (rt) {
    var Yl = 'oninput' in document;
    if (!Yl) {
      var Pu = document.createElement('div');
      (Pu.setAttribute('oninput', 'return;'),
        (Yl = typeof Pu.oninput == 'function'));
    }
    Kl = Yl;
  } else Kl = !1;
  ga = Kl && (!document.documentMode || 9 < document.documentMode);
}
function Nu() {
  Wn && (Wn.detachEvent('onpropertychange', ya), (tr = Wn = null));
}
function ya(e) {
  if (e.propertyName === 'value' && Cl(tr)) {
    var t = [];
    (va(t, tr, e, wi(e)), Js(kd, t));
  }
}
function xd(e, t, n) {
  e === 'focusin'
    ? (Nu(), (Wn = t), (tr = n), Wn.attachEvent('onpropertychange', ya))
    : e === 'focusout' && Nu();
}
function Ed(e) {
  if (e === 'selectionchange' || e === 'keyup' || e === 'keydown')
    return Cl(tr);
}
function Cd(e, t) {
  if (e === 'click') return Cl(t);
}
function _d(e, t) {
  if (e === 'input' || e === 'change') return Cl(t);
}
function zd(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Be = typeof Object.is == 'function' ? Object.is : zd;
function nr(e, t) {
  if (Be(e, t)) return !0;
  if (typeof e != 'object' || e === null || typeof t != 'object' || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!mo.call(t, l) || !Be(e[l], t[l])) return !1;
  }
  return !0;
}
function Tu(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Lu(e, t) {
  var n = Tu(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Tu(n);
  }
}
function wa(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? wa(e, t.parentNode)
          : 'contains' in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function ka() {
  for (var e = window, t = Jr(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == 'string';
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Jr(e.document);
  }
  return t;
}
function Ni(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === 'input' &&
      (e.type === 'text' ||
        e.type === 'search' ||
        e.type === 'tel' ||
        e.type === 'url' ||
        e.type === 'password')) ||
      t === 'textarea' ||
      e.contentEditable === 'true')
  );
}
function Pd(e) {
  var t = ka(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    wa(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && Ni(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        'selectionStart' in n)
      )
        ((n.selectionStart = t),
          (n.selectionEnd = Math.min(e, n.value.length)));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var l = n.textContent.length,
          o = Math.min(r.start, l);
        ((r = r.end === void 0 ? o : Math.min(r.end, l)),
          !e.extend && o > r && ((l = r), (r = o), (o = l)),
          (l = Lu(n, o)));
        var i = Lu(n, r);
        l &&
          i &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== l.node ||
            e.anchorOffset !== l.offset ||
            e.focusNode !== i.node ||
            e.focusOffset !== i.offset) &&
          ((t = t.createRange()),
          t.setStart(l.node, l.offset),
          e.removeAllRanges(),
          o > r
            ? (e.addRange(t), e.extend(i.node, i.offset))
            : (t.setEnd(i.node, i.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == 'function' && n.focus(), n = 0; n < t.length; n++)
      ((e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top));
  }
}
var Nd = rt && 'documentMode' in document && 11 >= document.documentMode,
  bt = null,
  Oo = null,
  Hn = null,
  Io = !1;
function Ru(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Io ||
    bt == null ||
    bt !== Jr(r) ||
    ((r = bt),
    'selectionStart' in r && Ni(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (Hn && nr(Hn, r)) ||
      ((Hn = r),
      (r = ll(Oo, 'onSelect')),
      0 < r.length &&
        ((t = new _i('onSelect', 'select', null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = bt))));
}
function Nr(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n['Webkit' + e] = 'webkit' + t),
    (n['Moz' + e] = 'moz' + t),
    n
  );
}
var en = {
    animationend: Nr('Animation', 'AnimationEnd'),
    animationiteration: Nr('Animation', 'AnimationIteration'),
    animationstart: Nr('Animation', 'AnimationStart'),
    transitionend: Nr('Transition', 'TransitionEnd'),
  },
  Xl = {},
  Sa = {};
rt &&
  ((Sa = document.createElement('div').style),
  'AnimationEvent' in window ||
    (delete en.animationend.animation,
    delete en.animationiteration.animation,
    delete en.animationstart.animation),
  'TransitionEvent' in window || delete en.transitionend.transition);
function _l(e) {
  if (Xl[e]) return Xl[e];
  if (!en[e]) return e;
  var t = en[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Sa) return (Xl[e] = t[n]);
  return e;
}
var xa = _l('animationend'),
  Ea = _l('animationiteration'),
  Ca = _l('animationstart'),
  _a = _l('transitionend'),
  za = new Map(),
  Mu =
    'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
      ' '
    );
function Tt(e, t) {
  (za.set(e, t), Qt(t, [e]));
}
for (var Zl = 0; Zl < Mu.length; Zl++) {
  var Jl = Mu[Zl],
    Td = Jl.toLowerCase(),
    Ld = Jl[0].toUpperCase() + Jl.slice(1);
  Tt(Td, 'on' + Ld);
}
Tt(xa, 'onAnimationEnd');
Tt(Ea, 'onAnimationIteration');
Tt(Ca, 'onAnimationStart');
Tt('dblclick', 'onDoubleClick');
Tt('focusin', 'onFocus');
Tt('focusout', 'onBlur');
Tt(_a, 'onTransitionEnd');
hn('onMouseEnter', ['mouseout', 'mouseover']);
hn('onMouseLeave', ['mouseout', 'mouseover']);
hn('onPointerEnter', ['pointerout', 'pointerover']);
hn('onPointerLeave', ['pointerout', 'pointerover']);
Qt(
  'onChange',
  'change click focusin focusout input keydown keyup selectionchange'.split(' ')
);
Qt(
  'onSelect',
  'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
    ' '
  )
);
Qt('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']);
Qt(
  'onCompositionEnd',
  'compositionend focusout keydown keypress keyup mousedown'.split(' ')
);
Qt(
  'onCompositionStart',
  'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
);
Qt(
  'onCompositionUpdate',
  'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
);
var Un =
    'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
      ' '
    ),
  Rd = new Set('cancel close invalid load scroll toggle'.split(' ').concat(Un));
function Ou(e, t, n) {
  var r = e.type || 'unknown-event';
  ((e.currentTarget = n), Tf(r, t, void 0, e), (e.currentTarget = null));
}
function Pa(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var i = r.length - 1; 0 <= i; i--) {
          var u = r[i],
            s = u.instance,
            c = u.currentTarget;
          if (((u = u.listener), s !== o && l.isPropagationStopped())) break e;
          (Ou(l, u, c), (o = s));
        }
      else
        for (i = 0; i < r.length; i++) {
          if (
            ((u = r[i]),
            (s = u.instance),
            (c = u.currentTarget),
            (u = u.listener),
            s !== o && l.isPropagationStopped())
          )
            break e;
          (Ou(l, u, c), (o = s));
        }
    }
  }
  if (br) throw ((e = To), (br = !1), (To = null), e);
}
function U(e, t) {
  var n = t[Uo];
  n === void 0 && (n = t[Uo] = new Set());
  var r = e + '__bubble';
  n.has(r) || (Na(t, e, 2, !1), n.add(r));
}
function ql(e, t, n) {
  var r = 0;
  (t && (r |= 4), Na(n, e, r, t));
}
var Tr = '_reactListening' + Math.random().toString(36).slice(2);
function rr(e) {
  if (!e[Tr]) {
    ((e[Tr] = !0),
      js.forEach(function (n) {
        n !== 'selectionchange' && (Rd.has(n) || ql(n, !1, e), ql(n, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Tr] || ((t[Tr] = !0), ql('selectionchange', !1, t));
  }
}
function Na(e, t, n, r) {
  switch (fa(t)) {
    case 1:
      var l = Qf;
      break;
    case 4:
      l = Gf;
      break;
    default:
      l = Ei;
  }
  ((n = l.bind(null, t, n, e)),
    (l = void 0),
    !No ||
      (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') ||
      (l = !0),
    r
      ? l !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: l })
        : e.addEventListener(t, n, !0)
      : l !== void 0
        ? e.addEventListener(t, n, { passive: l })
        : e.addEventListener(t, n, !1));
}
function bl(e, t, n, r, l) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var i = r.tag;
      if (i === 3 || i === 4) {
        var u = r.stateNode.containerInfo;
        if (u === l || (u.nodeType === 8 && u.parentNode === l)) break;
        if (i === 4)
          for (i = r.return; i !== null; ) {
            var s = i.tag;
            if (
              (s === 3 || s === 4) &&
              ((s = i.stateNode.containerInfo),
              s === l || (s.nodeType === 8 && s.parentNode === l))
            )
              return;
            i = i.return;
          }
        for (; u !== null; ) {
          if (((i = jt(u)), i === null)) return;
          if (((s = i.tag), s === 5 || s === 6)) {
            r = o = i;
            continue e;
          }
          u = u.parentNode;
        }
      }
      r = r.return;
    }
  Js(function () {
    var c = o,
      m = wi(n),
      h = [];
    e: {
      var p = za.get(e);
      if (p !== void 0) {
        var S = _i,
          k = e;
        switch (e) {
          case 'keypress':
            if (Wr(n) === 0) break e;
          case 'keydown':
          case 'keyup':
            S = ud;
            break;
          case 'focusin':
            ((k = 'focus'), (S = Gl));
            break;
          case 'focusout':
            ((k = 'blur'), (S = Gl));
            break;
          case 'beforeblur':
          case 'afterblur':
            S = Gl;
            break;
          case 'click':
            if (n.button === 2) break e;
          case 'auxclick':
          case 'dblclick':
          case 'mousedown':
          case 'mousemove':
          case 'mouseup':
          case 'mouseout':
          case 'mouseover':
          case 'contextmenu':
            S = Su;
            break;
          case 'drag':
          case 'dragend':
          case 'dragenter':
          case 'dragexit':
          case 'dragleave':
          case 'dragover':
          case 'dragstart':
          case 'drop':
            S = Xf;
            break;
          case 'touchcancel':
          case 'touchend':
          case 'touchmove':
          case 'touchstart':
            S = cd;
            break;
          case xa:
          case Ea:
          case Ca:
            S = qf;
            break;
          case _a:
            S = dd;
            break;
          case 'scroll':
            S = Kf;
            break;
          case 'wheel':
            S = md;
            break;
          case 'copy':
          case 'cut':
          case 'paste':
            S = ed;
            break;
          case 'gotpointercapture':
          case 'lostpointercapture':
          case 'pointercancel':
          case 'pointerdown':
          case 'pointermove':
          case 'pointerout':
          case 'pointerover':
          case 'pointerup':
            S = Eu;
        }
        var x = (t & 4) !== 0,
          I = !x && e === 'scroll',
          f = x ? (p !== null ? p + 'Capture' : null) : p;
        x = [];
        for (var a = c, d; a !== null; ) {
          d = a;
          var g = d.stateNode;
          if (
            (d.tag === 5 &&
              g !== null &&
              ((d = g),
              f !== null && ((g = Jn(a, f)), g != null && x.push(lr(a, g, d)))),
            I)
          )
            break;
          a = a.return;
        }
        0 < x.length &&
          ((p = new S(p, k, null, n, m)), h.push({ event: p, listeners: x }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((p = e === 'mouseover' || e === 'pointerover'),
          (S = e === 'mouseout' || e === 'pointerout'),
          p &&
            n !== zo &&
            (k = n.relatedTarget || n.fromElement) &&
            (jt(k) || k[lt]))
        )
          break e;
        if (
          (S || p) &&
          ((p =
            m.window === m
              ? m
              : (p = m.ownerDocument)
                ? p.defaultView || p.parentWindow
                : window),
          S
            ? ((k = n.relatedTarget || n.toElement),
              (S = c),
              (k = k ? jt(k) : null),
              k !== null &&
                ((I = Gt(k)), k !== I || (k.tag !== 5 && k.tag !== 6)) &&
                (k = null))
            : ((S = null), (k = c)),
          S !== k)
        ) {
          if (
            ((x = Su),
            (g = 'onMouseLeave'),
            (f = 'onMouseEnter'),
            (a = 'mouse'),
            (e === 'pointerout' || e === 'pointerover') &&
              ((x = Eu),
              (g = 'onPointerLeave'),
              (f = 'onPointerEnter'),
              (a = 'pointer')),
            (I = S == null ? p : tn(S)),
            (d = k == null ? p : tn(k)),
            (p = new x(g, a + 'leave', S, n, m)),
            (p.target = I),
            (p.relatedTarget = d),
            (g = null),
            jt(m) === c &&
              ((x = new x(f, a + 'enter', k, n, m)),
              (x.target = d),
              (x.relatedTarget = I),
              (g = x)),
            (I = g),
            S && k)
          )
            t: {
              for (x = S, f = k, a = 0, d = x; d; d = Yt(d)) a++;
              for (d = 0, g = f; g; g = Yt(g)) d++;
              for (; 0 < a - d; ) ((x = Yt(x)), a--);
              for (; 0 < d - a; ) ((f = Yt(f)), d--);
              for (; a--; ) {
                if (x === f || (f !== null && x === f.alternate)) break t;
                ((x = Yt(x)), (f = Yt(f)));
              }
              x = null;
            }
          else x = null;
          (S !== null && Iu(h, p, S, x, !1),
            k !== null && I !== null && Iu(h, I, k, x, !0));
        }
      }
      e: {
        if (
          ((p = c ? tn(c) : window),
          (S = p.nodeName && p.nodeName.toLowerCase()),
          S === 'select' || (S === 'input' && p.type === 'file'))
        )
          var E = Sd;
        else if (zu(p))
          if (ga) E = _d;
          else {
            E = Ed;
            var _ = xd;
          }
        else
          (S = p.nodeName) &&
            S.toLowerCase() === 'input' &&
            (p.type === 'checkbox' || p.type === 'radio') &&
            (E = Cd);
        if (E && (E = E(e, c))) {
          va(h, E, n, m);
          break e;
        }
        (_ && _(e, p, c),
          e === 'focusout' &&
            (_ = p._wrapperState) &&
            _.controlled &&
            p.type === 'number' &&
            So(p, 'number', p.value));
      }
      switch (((_ = c ? tn(c) : window), e)) {
        case 'focusin':
          (zu(_) || _.contentEditable === 'true') &&
            ((bt = _), (Oo = c), (Hn = null));
          break;
        case 'focusout':
          Hn = Oo = bt = null;
          break;
        case 'mousedown':
          Io = !0;
          break;
        case 'contextmenu':
        case 'mouseup':
        case 'dragend':
          ((Io = !1), Ru(h, n, m));
          break;
        case 'selectionchange':
          if (Nd) break;
        case 'keydown':
        case 'keyup':
          Ru(h, n, m);
      }
      var N;
      if (Pi)
        e: {
          switch (e) {
            case 'compositionstart':
              var y = 'onCompositionStart';
              break e;
            case 'compositionend':
              y = 'onCompositionEnd';
              break e;
            case 'compositionupdate':
              y = 'onCompositionUpdate';
              break e;
          }
          y = void 0;
        }
      else
        qt
          ? ma(e, n) && (y = 'onCompositionEnd')
          : e === 'keydown' && n.keyCode === 229 && (y = 'onCompositionStart');
      (y &&
        (pa &&
          n.locale !== 'ko' &&
          (qt || y !== 'onCompositionStart'
            ? y === 'onCompositionEnd' && qt && (N = da())
            : ((gt = m),
              (Ci = 'value' in gt ? gt.value : gt.textContent),
              (qt = !0))),
        (_ = ll(c, y)),
        0 < _.length &&
          ((y = new xu(y, e, null, n, m)),
          h.push({ event: y, listeners: _ }),
          N ? (y.data = N) : ((N = ha(n)), N !== null && (y.data = N)))),
        (N = vd ? gd(e, n) : yd(e, n)) &&
          ((c = ll(c, 'onBeforeInput')),
          0 < c.length &&
            ((m = new xu('onBeforeInput', 'beforeinput', null, n, m)),
            h.push({ event: m, listeners: c }),
            (m.data = N))));
    }
    Pa(h, t);
  });
}
function lr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function ll(e, t) {
  for (var n = t + 'Capture', r = []; e !== null; ) {
    var l = e,
      o = l.stateNode;
    (l.tag === 5 &&
      o !== null &&
      ((l = o),
      (o = Jn(e, n)),
      o != null && r.unshift(lr(e, o, l)),
      (o = Jn(e, t)),
      o != null && r.push(lr(e, o, l))),
      (e = e.return));
  }
  return r;
}
function Yt(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Iu(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var u = n,
      s = u.alternate,
      c = u.stateNode;
    if (s !== null && s === r) break;
    (u.tag === 5 &&
      c !== null &&
      ((u = c),
      l
        ? ((s = Jn(n, o)), s != null && i.unshift(lr(n, s, u)))
        : l || ((s = Jn(n, o)), s != null && i.push(lr(n, s, u)))),
      (n = n.return));
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var Md = /\r\n?/g,
  Od = /\u0000|\uFFFD/g;
function ju(e) {
  return (typeof e == 'string' ? e : '' + e)
    .replace(
      Md,
      `
`
    )
    .replace(Od, '');
}
function Lr(e, t, n) {
  if (((t = ju(t)), ju(e) !== t && n)) throw Error(w(425));
}
function ol() {}
var jo = null,
  Fo = null;
function Do(e, t) {
  return (
    e === 'textarea' ||
    e === 'noscript' ||
    typeof t.children == 'string' ||
    typeof t.children == 'number' ||
    (typeof t.dangerouslySetInnerHTML == 'object' &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Ao = typeof setTimeout == 'function' ? setTimeout : void 0,
  Id = typeof clearTimeout == 'function' ? clearTimeout : void 0,
  Fu = typeof Promise == 'function' ? Promise : void 0,
  jd =
    typeof queueMicrotask == 'function'
      ? queueMicrotask
      : typeof Fu < 'u'
        ? function (e) {
            return Fu.resolve(null).then(e).catch(Fd);
          }
        : Ao;
function Fd(e) {
  setTimeout(function () {
    throw e;
  });
}
function eo(e, t) {
  var n = t,
    r = 0;
  do {
    var l = n.nextSibling;
    if ((e.removeChild(n), l && l.nodeType === 8))
      if (((n = l.data), n === '/$')) {
        if (r === 0) {
          (e.removeChild(l), er(t));
          return;
        }
        r--;
      } else (n !== '$' && n !== '$?' && n !== '$!') || r++;
    n = l;
  } while (n);
  er(t);
}
function xt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === '$' || t === '$!' || t === '$?')) break;
      if (t === '/$') return null;
    }
  }
  return e;
}
function Du(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === '$' || n === '$!' || n === '$?') {
        if (t === 0) return e;
        t--;
      } else n === '/$' && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Cn = Math.random().toString(36).slice(2),
  Ke = '__reactFiber$' + Cn,
  or = '__reactProps$' + Cn,
  lt = '__reactContainer$' + Cn,
  Uo = '__reactEvents$' + Cn,
  Dd = '__reactListeners$' + Cn,
  Ad = '__reactHandles$' + Cn;
function jt(e) {
  var t = e[Ke];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[lt] || n[Ke])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = Du(e); e !== null; ) {
          if ((n = e[Ke])) return n;
          e = Du(e);
        }
      return t;
    }
    ((e = n), (n = e.parentNode));
  }
  return null;
}
function hr(e) {
  return (
    (e = e[Ke] || e[lt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function tn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(w(33));
}
function zl(e) {
  return e[or] || null;
}
var Vo = [],
  nn = -1;
function Lt(e) {
  return { current: e };
}
function V(e) {
  0 > nn || ((e.current = Vo[nn]), (Vo[nn] = null), nn--);
}
function A(e, t) {
  (nn++, (Vo[nn] = e.current), (e.current = t));
}
var Nt = {},
  fe = Lt(Nt),
  we = Lt(!1),
  Vt = Nt;
function vn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Nt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var l = {},
    o;
  for (o in n) l[o] = t[o];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    l
  );
}
function ke(e) {
  return ((e = e.childContextTypes), e != null);
}
function il() {
  (V(we), V(fe));
}
function Au(e, t, n) {
  if (fe.current !== Nt) throw Error(w(168));
  (A(fe, t), A(we, n));
}
function Ta(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != 'function'))
    return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(w(108, xf(e) || 'Unknown', l));
  return G({}, n, r);
}
function ul(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Nt),
    (Vt = fe.current),
    A(fe, e),
    A(we, we.current),
    !0
  );
}
function Uu(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(w(169));
  (n
    ? ((e = Ta(e, t, Vt)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      V(we),
      V(fe),
      A(fe, e))
    : V(we),
    A(we, n));
}
var qe = null,
  Pl = !1,
  to = !1;
function La(e) {
  qe === null ? (qe = [e]) : qe.push(e);
}
function Ud(e) {
  ((Pl = !0), La(e));
}
function Rt() {
  if (!to && qe !== null) {
    to = !0;
    var e = 0,
      t = D;
    try {
      var n = qe;
      for (D = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      ((qe = null), (Pl = !1));
    } catch (l) {
      throw (qe !== null && (qe = qe.slice(e + 1)), ta(ki, Rt), l);
    } finally {
      ((D = t), (to = !1));
    }
  }
  return null;
}
var rn = [],
  ln = 0,
  sl = null,
  al = 0,
  Te = [],
  Le = 0,
  $t = null,
  et = 1,
  tt = '';
function Ot(e, t) {
  ((rn[ln++] = al), (rn[ln++] = sl), (sl = e), (al = t));
}
function Ra(e, t, n) {
  ((Te[Le++] = et), (Te[Le++] = tt), (Te[Le++] = $t), ($t = e));
  var r = et;
  e = tt;
  var l = 32 - Ve(r) - 1;
  ((r &= ~(1 << l)), (n += 1));
  var o = 32 - Ve(t) + l;
  if (30 < o) {
    var i = l - (l % 5);
    ((o = (r & ((1 << i) - 1)).toString(32)),
      (r >>= i),
      (l -= i),
      (et = (1 << (32 - Ve(t) + l)) | (n << l) | r),
      (tt = o + e));
  } else ((et = (1 << o) | (n << l) | r), (tt = e));
}
function Ti(e) {
  e.return !== null && (Ot(e, 1), Ra(e, 1, 0));
}
function Li(e) {
  for (; e === sl; )
    ((sl = rn[--ln]), (rn[ln] = null), (al = rn[--ln]), (rn[ln] = null));
  for (; e === $t; )
    (($t = Te[--Le]),
      (Te[Le] = null),
      (tt = Te[--Le]),
      (Te[Le] = null),
      (et = Te[--Le]),
      (Te[Le] = null));
}
var _e = null,
  Ce = null,
  B = !1,
  Ue = null;
function Ma(e, t) {
  var n = Re(5, null, null, 0);
  ((n.elementType = 'DELETED'),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
}
function Vu(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (_e = e), (Ce = xt(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === '' || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (_e = e), (Ce = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = $t !== null ? { id: et, overflow: tt } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Re(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (_e = e),
            (Ce = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function $o(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Bo(e) {
  if (B) {
    var t = Ce;
    if (t) {
      var n = t;
      if (!Vu(e, t)) {
        if ($o(e)) throw Error(w(418));
        t = xt(n.nextSibling);
        var r = _e;
        t && Vu(e, t)
          ? Ma(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (B = !1), (_e = e));
      }
    } else {
      if ($o(e)) throw Error(w(418));
      ((e.flags = (e.flags & -4097) | 2), (B = !1), (_e = e));
    }
  }
}
function $u(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  _e = e;
}
function Rr(e) {
  if (e !== _e) return !1;
  if (!B) return ($u(e), (B = !0), !1);
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== 'head' && t !== 'body' && !Do(e.type, e.memoizedProps))),
    t && (t = Ce))
  ) {
    if ($o(e)) throw (Oa(), Error(w(418)));
    for (; t; ) (Ma(e, t), (t = xt(t.nextSibling)));
  }
  if (($u(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(w(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === '/$') {
            if (t === 0) {
              Ce = xt(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== '$' && n !== '$!' && n !== '$?') || t++;
        }
        e = e.nextSibling;
      }
      Ce = null;
    }
  } else Ce = _e ? xt(e.stateNode.nextSibling) : null;
  return !0;
}
function Oa() {
  for (var e = Ce; e; ) e = xt(e.nextSibling);
}
function gn() {
  ((Ce = _e = null), (B = !1));
}
function Ri(e) {
  Ue === null ? (Ue = [e]) : Ue.push(e);
}
var Vd = ut.ReactCurrentBatchConfig;
function Mn(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != 'function' && typeof e != 'object')
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(w(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(w(147, e));
      var l = r,
        o = '' + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == 'function' &&
        t.ref._stringRef === o
        ? t.ref
        : ((t = function (i) {
            var u = l.refs;
            i === null ? delete u[o] : (u[o] = i);
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != 'string') throw Error(w(284));
    if (!n._owner) throw Error(w(290, e));
  }
  return e;
}
function Mr(e, t) {
  throw (
    (e = Object.prototype.toString.call(t)),
    Error(
      w(
        31,
        e === '[object Object]'
          ? 'object with keys {' + Object.keys(t).join(', ') + '}'
          : e
      )
    )
  );
}
function Bu(e) {
  var t = e._init;
  return t(e._payload);
}
function Ia(e) {
  function t(f, a) {
    if (e) {
      var d = f.deletions;
      d === null ? ((f.deletions = [a]), (f.flags |= 16)) : d.push(a);
    }
  }
  function n(f, a) {
    if (!e) return null;
    for (; a !== null; ) (t(f, a), (a = a.sibling));
    return null;
  }
  function r(f, a) {
    for (f = new Map(); a !== null; )
      (a.key !== null ? f.set(a.key, a) : f.set(a.index, a), (a = a.sibling));
    return f;
  }
  function l(f, a) {
    return ((f = zt(f, a)), (f.index = 0), (f.sibling = null), f);
  }
  function o(f, a, d) {
    return (
      (f.index = d),
      e
        ? ((d = f.alternate),
          d !== null
            ? ((d = d.index), d < a ? ((f.flags |= 2), a) : d)
            : ((f.flags |= 2), a))
        : ((f.flags |= 1048576), a)
    );
  }
  function i(f) {
    return (e && f.alternate === null && (f.flags |= 2), f);
  }
  function u(f, a, d, g) {
    return a === null || a.tag !== 6
      ? ((a = so(d, f.mode, g)), (a.return = f), a)
      : ((a = l(a, d)), (a.return = f), a);
  }
  function s(f, a, d, g) {
    var E = d.type;
    return E === Jt
      ? m(f, a, d.props.children, g, d.key)
      : a !== null &&
          (a.elementType === E ||
            (typeof E == 'object' &&
              E !== null &&
              E.$$typeof === pt &&
              Bu(E) === a.type))
        ? ((g = l(a, d.props)), (g.ref = Mn(f, a, d)), (g.return = f), g)
        : ((g = Zr(d.type, d.key, d.props, null, f.mode, g)),
          (g.ref = Mn(f, a, d)),
          (g.return = f),
          g);
  }
  function c(f, a, d, g) {
    return a === null ||
      a.tag !== 4 ||
      a.stateNode.containerInfo !== d.containerInfo ||
      a.stateNode.implementation !== d.implementation
      ? ((a = ao(d, f.mode, g)), (a.return = f), a)
      : ((a = l(a, d.children || [])), (a.return = f), a);
  }
  function m(f, a, d, g, E) {
    return a === null || a.tag !== 7
      ? ((a = Ut(d, f.mode, g, E)), (a.return = f), a)
      : ((a = l(a, d)), (a.return = f), a);
  }
  function h(f, a, d) {
    if ((typeof a == 'string' && a !== '') || typeof a == 'number')
      return ((a = so('' + a, f.mode, d)), (a.return = f), a);
    if (typeof a == 'object' && a !== null) {
      switch (a.$$typeof) {
        case Sr:
          return (
            (d = Zr(a.type, a.key, a.props, null, f.mode, d)),
            (d.ref = Mn(f, null, a)),
            (d.return = f),
            d
          );
        case Zt:
          return ((a = ao(a, f.mode, d)), (a.return = f), a);
        case pt:
          var g = a._init;
          return h(f, g(a._payload), d);
      }
      if (Dn(a) || Pn(a))
        return ((a = Ut(a, f.mode, d, null)), (a.return = f), a);
      Mr(f, a);
    }
    return null;
  }
  function p(f, a, d, g) {
    var E = a !== null ? a.key : null;
    if ((typeof d == 'string' && d !== '') || typeof d == 'number')
      return E !== null ? null : u(f, a, '' + d, g);
    if (typeof d == 'object' && d !== null) {
      switch (d.$$typeof) {
        case Sr:
          return d.key === E ? s(f, a, d, g) : null;
        case Zt:
          return d.key === E ? c(f, a, d, g) : null;
        case pt:
          return ((E = d._init), p(f, a, E(d._payload), g));
      }
      if (Dn(d) || Pn(d)) return E !== null ? null : m(f, a, d, g, null);
      Mr(f, d);
    }
    return null;
  }
  function S(f, a, d, g, E) {
    if ((typeof g == 'string' && g !== '') || typeof g == 'number')
      return ((f = f.get(d) || null), u(a, f, '' + g, E));
    if (typeof g == 'object' && g !== null) {
      switch (g.$$typeof) {
        case Sr:
          return (
            (f = f.get(g.key === null ? d : g.key) || null),
            s(a, f, g, E)
          );
        case Zt:
          return (
            (f = f.get(g.key === null ? d : g.key) || null),
            c(a, f, g, E)
          );
        case pt:
          var _ = g._init;
          return S(f, a, d, _(g._payload), E);
      }
      if (Dn(g) || Pn(g)) return ((f = f.get(d) || null), m(a, f, g, E, null));
      Mr(a, g);
    }
    return null;
  }
  function k(f, a, d, g) {
    for (
      var E = null, _ = null, N = a, y = (a = 0), F = null;
      N !== null && y < d.length;
      y++
    ) {
      N.index > y ? ((F = N), (N = null)) : (F = N.sibling);
      var M = p(f, N, d[y], g);
      if (M === null) {
        N === null && (N = F);
        break;
      }
      (e && N && M.alternate === null && t(f, N),
        (a = o(M, a, y)),
        _ === null ? (E = M) : (_.sibling = M),
        (_ = M),
        (N = F));
    }
    if (y === d.length) return (n(f, N), B && Ot(f, y), E);
    if (N === null) {
      for (; y < d.length; y++)
        ((N = h(f, d[y], g)),
          N !== null &&
            ((a = o(N, a, y)),
            _ === null ? (E = N) : (_.sibling = N),
            (_ = N)));
      return (B && Ot(f, y), E);
    }
    for (N = r(f, N); y < d.length; y++)
      ((F = S(N, f, y, d[y], g)),
        F !== null &&
          (e && F.alternate !== null && N.delete(F.key === null ? y : F.key),
          (a = o(F, a, y)),
          _ === null ? (E = F) : (_.sibling = F),
          (_ = F)));
    return (
      e &&
        N.forEach(function (ve) {
          return t(f, ve);
        }),
      B && Ot(f, y),
      E
    );
  }
  function x(f, a, d, g) {
    var E = Pn(d);
    if (typeof E != 'function') throw Error(w(150));
    if (((d = E.call(d)), d == null)) throw Error(w(151));
    for (
      var _ = (E = null), N = a, y = (a = 0), F = null, M = d.next();
      N !== null && !M.done;
      y++, M = d.next()
    ) {
      N.index > y ? ((F = N), (N = null)) : (F = N.sibling);
      var ve = p(f, N, M.value, g);
      if (ve === null) {
        N === null && (N = F);
        break;
      }
      (e && N && ve.alternate === null && t(f, N),
        (a = o(ve, a, y)),
        _ === null ? (E = ve) : (_.sibling = ve),
        (_ = ve),
        (N = F));
    }
    if (M.done) return (n(f, N), B && Ot(f, y), E);
    if (N === null) {
      for (; !M.done; y++, M = d.next())
        ((M = h(f, M.value, g)),
          M !== null &&
            ((a = o(M, a, y)),
            _ === null ? (E = M) : (_.sibling = M),
            (_ = M)));
      return (B && Ot(f, y), E);
    }
    for (N = r(f, N); !M.done; y++, M = d.next())
      ((M = S(N, f, y, M.value, g)),
        M !== null &&
          (e && M.alternate !== null && N.delete(M.key === null ? y : M.key),
          (a = o(M, a, y)),
          _ === null ? (E = M) : (_.sibling = M),
          (_ = M)));
    return (
      e &&
        N.forEach(function (We) {
          return t(f, We);
        }),
      B && Ot(f, y),
      E
    );
  }
  function I(f, a, d, g) {
    if (
      (typeof d == 'object' &&
        d !== null &&
        d.type === Jt &&
        d.key === null &&
        (d = d.props.children),
      typeof d == 'object' && d !== null)
    ) {
      switch (d.$$typeof) {
        case Sr:
          e: {
            for (var E = d.key, _ = a; _ !== null; ) {
              if (_.key === E) {
                if (((E = d.type), E === Jt)) {
                  if (_.tag === 7) {
                    (n(f, _.sibling),
                      (a = l(_, d.props.children)),
                      (a.return = f),
                      (f = a));
                    break e;
                  }
                } else if (
                  _.elementType === E ||
                  (typeof E == 'object' &&
                    E !== null &&
                    E.$$typeof === pt &&
                    Bu(E) === _.type)
                ) {
                  (n(f, _.sibling),
                    (a = l(_, d.props)),
                    (a.ref = Mn(f, _, d)),
                    (a.return = f),
                    (f = a));
                  break e;
                }
                n(f, _);
                break;
              } else t(f, _);
              _ = _.sibling;
            }
            d.type === Jt
              ? ((a = Ut(d.props.children, f.mode, g, d.key)),
                (a.return = f),
                (f = a))
              : ((g = Zr(d.type, d.key, d.props, null, f.mode, g)),
                (g.ref = Mn(f, a, d)),
                (g.return = f),
                (f = g));
          }
          return i(f);
        case Zt:
          e: {
            for (_ = d.key; a !== null; ) {
              if (a.key === _)
                if (
                  a.tag === 4 &&
                  a.stateNode.containerInfo === d.containerInfo &&
                  a.stateNode.implementation === d.implementation
                ) {
                  (n(f, a.sibling),
                    (a = l(a, d.children || [])),
                    (a.return = f),
                    (f = a));
                  break e;
                } else {
                  n(f, a);
                  break;
                }
              else t(f, a);
              a = a.sibling;
            }
            ((a = ao(d, f.mode, g)), (a.return = f), (f = a));
          }
          return i(f);
        case pt:
          return ((_ = d._init), I(f, a, _(d._payload), g));
      }
      if (Dn(d)) return k(f, a, d, g);
      if (Pn(d)) return x(f, a, d, g);
      Mr(f, d);
    }
    return (typeof d == 'string' && d !== '') || typeof d == 'number'
      ? ((d = '' + d),
        a !== null && a.tag === 6
          ? (n(f, a.sibling), (a = l(a, d)), (a.return = f), (f = a))
          : (n(f, a), (a = so(d, f.mode, g)), (a.return = f), (f = a)),
        i(f))
      : n(f, a);
  }
  return I;
}
var yn = Ia(!0),
  ja = Ia(!1),
  cl = Lt(null),
  fl = null,
  on = null,
  Mi = null;
function Oi() {
  Mi = on = fl = null;
}
function Ii(e) {
  var t = cl.current;
  (V(cl), (e._currentValue = t));
}
function Wo(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function pn(e, t) {
  ((fl = e),
    (Mi = on = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (ye = !0), (e.firstContext = null)));
}
function Oe(e) {
  var t = e._currentValue;
  if (Mi !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), on === null)) {
      if (fl === null) throw Error(w(308));
      ((on = e), (fl.dependencies = { lanes: 0, firstContext: e }));
    } else on = on.next = e;
  return t;
}
var Ft = null;
function ji(e) {
  Ft === null ? (Ft = [e]) : Ft.push(e);
}
function Fa(e, t, n, r) {
  var l = t.interleaved;
  return (
    l === null ? ((n.next = n), ji(t)) : ((n.next = l.next), (l.next = n)),
    (t.interleaved = n),
    ot(e, r)
  );
}
function ot(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    ((e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return));
  return n.tag === 3 ? n.stateNode : null;
}
var mt = !1;
function Fi(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Da(e, t) {
  ((e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      }));
}
function nt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function Et(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), j & 2)) {
    var l = r.pending;
    return (
      l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (r.pending = t),
      ot(e, n)
    );
  }
  return (
    (l = r.interleaved),
    l === null ? ((t.next = t), ji(r)) : ((t.next = l.next), (l.next = t)),
    (r.interleaved = t),
    ot(e, n)
  );
}
function Hr(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Si(e, n));
  }
}
function Wu(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var l = null,
      o = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var i = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        (o === null ? (l = o = i) : (o = o.next = i), (n = n.next));
      } while (n !== null);
      o === null ? (l = o = t) : (o = o.next = t);
    } else l = o = t;
    ((n = {
      baseState: r.baseState,
      firstBaseUpdate: l,
      lastBaseUpdate: o,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n));
    return;
  }
  ((e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t));
}
function dl(e, t, n, r) {
  var l = e.updateQueue;
  mt = !1;
  var o = l.firstBaseUpdate,
    i = l.lastBaseUpdate,
    u = l.shared.pending;
  if (u !== null) {
    l.shared.pending = null;
    var s = u,
      c = s.next;
    ((s.next = null), i === null ? (o = c) : (i.next = c), (i = s));
    var m = e.alternate;
    m !== null &&
      ((m = m.updateQueue),
      (u = m.lastBaseUpdate),
      u !== i &&
        (u === null ? (m.firstBaseUpdate = c) : (u.next = c),
        (m.lastBaseUpdate = s)));
  }
  if (o !== null) {
    var h = l.baseState;
    ((i = 0), (m = c = s = null), (u = o));
    do {
      var p = u.lane,
        S = u.eventTime;
      if ((r & p) === p) {
        m !== null &&
          (m = m.next =
            {
              eventTime: S,
              lane: 0,
              tag: u.tag,
              payload: u.payload,
              callback: u.callback,
              next: null,
            });
        e: {
          var k = e,
            x = u;
          switch (((p = t), (S = n), x.tag)) {
            case 1:
              if (((k = x.payload), typeof k == 'function')) {
                h = k.call(S, h, p);
                break e;
              }
              h = k;
              break e;
            case 3:
              k.flags = (k.flags & -65537) | 128;
            case 0:
              if (
                ((k = x.payload),
                (p = typeof k == 'function' ? k.call(S, h, p) : k),
                p == null)
              )
                break e;
              h = G({}, h, p);
              break e;
            case 2:
              mt = !0;
          }
        }
        u.callback !== null &&
          u.lane !== 0 &&
          ((e.flags |= 64),
          (p = l.effects),
          p === null ? (l.effects = [u]) : p.push(u));
      } else
        ((S = {
          eventTime: S,
          lane: p,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null,
        }),
          m === null ? ((c = m = S), (s = h)) : (m = m.next = S),
          (i |= p));
      if (((u = u.next), u === null)) {
        if (((u = l.shared.pending), u === null)) break;
        ((p = u),
          (u = p.next),
          (p.next = null),
          (l.lastBaseUpdate = p),
          (l.shared.pending = null));
      }
    } while (!0);
    if (
      (m === null && (s = h),
      (l.baseState = s),
      (l.firstBaseUpdate = c),
      (l.lastBaseUpdate = m),
      (t = l.shared.interleaved),
      t !== null)
    ) {
      l = t;
      do ((i |= l.lane), (l = l.next));
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    ((Wt |= i), (e.lanes = i), (e.memoizedState = h));
  }
}
function Hu(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        l = r.callback;
      if (l !== null) {
        if (((r.callback = null), (r = n), typeof l != 'function'))
          throw Error(w(191, l));
        l.call(r);
      }
    }
}
var vr = {},
  Xe = Lt(vr),
  ir = Lt(vr),
  ur = Lt(vr);
function Dt(e) {
  if (e === vr) throw Error(w(174));
  return e;
}
function Di(e, t) {
  switch ((A(ur, t), A(ir, e), A(Xe, vr), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Eo(null, '');
      break;
    default:
      ((e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Eo(t, e)));
  }
  (V(Xe), A(Xe, t));
}
function wn() {
  (V(Xe), V(ir), V(ur));
}
function Aa(e) {
  Dt(ur.current);
  var t = Dt(Xe.current),
    n = Eo(t, e.type);
  t !== n && (A(ir, e), A(Xe, n));
}
function Ai(e) {
  ir.current === e && (V(Xe), V(ir));
}
var H = Lt(0);
function pl(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === '$?' || n.data === '$!')
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      ((t.child.return = t), (t = t.child));
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    ((t.sibling.return = t.return), (t = t.sibling));
  }
  return null;
}
var no = [];
function Ui() {
  for (var e = 0; e < no.length; e++)
    no[e]._workInProgressVersionPrimary = null;
  no.length = 0;
}
var Qr = ut.ReactCurrentDispatcher,
  ro = ut.ReactCurrentBatchConfig,
  Bt = 0,
  Q = null,
  ee = null,
  ne = null,
  ml = !1,
  Qn = !1,
  sr = 0,
  $d = 0;
function se() {
  throw Error(w(321));
}
function Vi(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!Be(e[n], t[n])) return !1;
  return !0;
}
function $i(e, t, n, r, l, o) {
  if (
    ((Bt = o),
    (Q = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Qr.current = e === null || e.memoizedState === null ? Qd : Gd),
    (e = n(r, l)),
    Qn)
  ) {
    o = 0;
    do {
      if (((Qn = !1), (sr = 0), 25 <= o)) throw Error(w(301));
      ((o += 1),
        (ne = ee = null),
        (t.updateQueue = null),
        (Qr.current = Kd),
        (e = n(r, l)));
    } while (Qn);
  }
  if (
    ((Qr.current = hl),
    (t = ee !== null && ee.next !== null),
    (Bt = 0),
    (ne = ee = Q = null),
    (ml = !1),
    t)
  )
    throw Error(w(300));
  return e;
}
function Bi() {
  var e = sr !== 0;
  return ((sr = 0), e);
}
function Ge() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return (ne === null ? (Q.memoizedState = ne = e) : (ne = ne.next = e), ne);
}
function Ie() {
  if (ee === null) {
    var e = Q.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ee.next;
  var t = ne === null ? Q.memoizedState : ne.next;
  if (t !== null) ((ne = t), (ee = e));
  else {
    if (e === null) throw Error(w(310));
    ((ee = e),
      (e = {
        memoizedState: ee.memoizedState,
        baseState: ee.baseState,
        baseQueue: ee.baseQueue,
        queue: ee.queue,
        next: null,
      }),
      ne === null ? (Q.memoizedState = ne = e) : (ne = ne.next = e));
  }
  return ne;
}
function ar(e, t) {
  return typeof t == 'function' ? t(e) : t;
}
function lo(e) {
  var t = Ie(),
    n = t.queue;
  if (n === null) throw Error(w(311));
  n.lastRenderedReducer = e;
  var r = ee,
    l = r.baseQueue,
    o = n.pending;
  if (o !== null) {
    if (l !== null) {
      var i = l.next;
      ((l.next = o.next), (o.next = i));
    }
    ((r.baseQueue = l = o), (n.pending = null));
  }
  if (l !== null) {
    ((o = l.next), (r = r.baseState));
    var u = (i = null),
      s = null,
      c = o;
    do {
      var m = c.lane;
      if ((Bt & m) === m)
        (s !== null &&
          (s = s.next =
            {
              lane: 0,
              action: c.action,
              hasEagerState: c.hasEagerState,
              eagerState: c.eagerState,
              next: null,
            }),
          (r = c.hasEagerState ? c.eagerState : e(r, c.action)));
      else {
        var h = {
          lane: m,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null,
        };
        (s === null ? ((u = s = h), (i = r)) : (s = s.next = h),
          (Q.lanes |= m),
          (Wt |= m));
      }
      c = c.next;
    } while (c !== null && c !== o);
    (s === null ? (i = r) : (s.next = u),
      Be(r, t.memoizedState) || (ye = !0),
      (t.memoizedState = r),
      (t.baseState = i),
      (t.baseQueue = s),
      (n.lastRenderedState = r));
  }
  if (((e = n.interleaved), e !== null)) {
    l = e;
    do ((o = l.lane), (Q.lanes |= o), (Wt |= o), (l = l.next));
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function oo(e) {
  var t = Ie(),
    n = t.queue;
  if (n === null) throw Error(w(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    l = n.pending,
    o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var i = (l = l.next);
    do ((o = e(o, i.action)), (i = i.next));
    while (i !== l);
    (Be(o, t.memoizedState) || (ye = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (n.lastRenderedState = o));
  }
  return [o, r];
}
function Ua() {}
function Va(e, t) {
  var n = Q,
    r = Ie(),
    l = t(),
    o = !Be(r.memoizedState, l);
  if (
    (o && ((r.memoizedState = l), (ye = !0)),
    (r = r.queue),
    Wi(Wa.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (ne !== null && ne.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      cr(9, Ba.bind(null, n, r, l, t), void 0, null),
      re === null)
    )
      throw Error(w(349));
    Bt & 30 || $a(n, t, l);
  }
  return l;
}
function $a(e, t, n) {
  ((e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = Q.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Q.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
}
function Ba(e, t, n, r) {
  ((t.value = n), (t.getSnapshot = r), Ha(t) && Qa(e));
}
function Wa(e, t, n) {
  return n(function () {
    Ha(t) && Qa(e);
  });
}
function Ha(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Be(e, n);
  } catch {
    return !0;
  }
}
function Qa(e) {
  var t = ot(e, 1);
  t !== null && $e(t, e, 1, -1);
}
function Qu(e) {
  var t = Ge();
  return (
    typeof e == 'function' && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ar,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Hd.bind(null, Q, e)),
    [t.memoizedState, e]
  );
}
function cr(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = Q.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Q.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function Ga() {
  return Ie().memoizedState;
}
function Gr(e, t, n, r) {
  var l = Ge();
  ((Q.flags |= e),
    (l.memoizedState = cr(1 | t, n, void 0, r === void 0 ? null : r)));
}
function Nl(e, t, n, r) {
  var l = Ie();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (ee !== null) {
    var i = ee.memoizedState;
    if (((o = i.destroy), r !== null && Vi(r, i.deps))) {
      l.memoizedState = cr(t, n, o, r);
      return;
    }
  }
  ((Q.flags |= e), (l.memoizedState = cr(1 | t, n, o, r)));
}
function Gu(e, t) {
  return Gr(8390656, 8, e, t);
}
function Wi(e, t) {
  return Nl(2048, 8, e, t);
}
function Ka(e, t) {
  return Nl(4, 2, e, t);
}
function Ya(e, t) {
  return Nl(4, 4, e, t);
}
function Xa(e, t) {
  if (typeof t == 'function')
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function Za(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null),
    Nl(4, 4, Xa.bind(null, t, e), n)
  );
}
function Hi() {}
function Ja(e, t) {
  var n = Ie();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Vi(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function qa(e, t) {
  var n = Ie();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Vi(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function ba(e, t, n) {
  return Bt & 21
    ? (Be(n, t) || ((n = la()), (Q.lanes |= n), (Wt |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (ye = !0)), (e.memoizedState = n));
}
function Bd(e, t) {
  var n = D;
  ((D = n !== 0 && 4 > n ? n : 4), e(!0));
  var r = ro.transition;
  ro.transition = {};
  try {
    (e(!1), t());
  } finally {
    ((D = n), (ro.transition = r));
  }
}
function ec() {
  return Ie().memoizedState;
}
function Wd(e, t, n) {
  var r = _t(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    tc(e))
  )
    nc(t, n);
  else if (((n = Fa(e, t, n, r)), n !== null)) {
    var l = pe();
    ($e(n, e, r, l), rc(n, t, r));
  }
}
function Hd(e, t, n) {
  var r = _t(e),
    l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (tc(e)) nc(t, l);
  else {
    var o = e.alternate;
    if (
      e.lanes === 0 &&
      (o === null || o.lanes === 0) &&
      ((o = t.lastRenderedReducer), o !== null)
    )
      try {
        var i = t.lastRenderedState,
          u = o(i, n);
        if (((l.hasEagerState = !0), (l.eagerState = u), Be(u, i))) {
          var s = t.interleaved;
          (s === null
            ? ((l.next = l), ji(t))
            : ((l.next = s.next), (s.next = l)),
            (t.interleaved = l));
          return;
        }
      } catch {
      } finally {
      }
    ((n = Fa(e, t, l, r)),
      n !== null && ((l = pe()), $e(n, e, r, l), rc(n, t, r)));
  }
}
function tc(e) {
  var t = e.alternate;
  return e === Q || (t !== null && t === Q);
}
function nc(e, t) {
  Qn = ml = !0;
  var n = e.pending;
  (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t));
}
function rc(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Si(e, n));
  }
}
var hl = {
    readContext: Oe,
    useCallback: se,
    useContext: se,
    useEffect: se,
    useImperativeHandle: se,
    useInsertionEffect: se,
    useLayoutEffect: se,
    useMemo: se,
    useReducer: se,
    useRef: se,
    useState: se,
    useDebugValue: se,
    useDeferredValue: se,
    useTransition: se,
    useMutableSource: se,
    useSyncExternalStore: se,
    useId: se,
    unstable_isNewReconciler: !1,
  },
  Qd = {
    readContext: Oe,
    useCallback: function (e, t) {
      return ((Ge().memoizedState = [e, t === void 0 ? null : t]), e);
    },
    useContext: Oe,
    useEffect: Gu,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Gr(4194308, 4, Xa.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Gr(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Gr(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = Ge();
      return (
        (t = t === void 0 ? null : t),
        (e = e()),
        (n.memoizedState = [e, t]),
        e
      );
    },
    useReducer: function (e, t, n) {
      var r = Ge();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = Wd.bind(null, Q, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Ge();
      return ((e = { current: e }), (t.memoizedState = e));
    },
    useState: Qu,
    useDebugValue: Hi,
    useDeferredValue: function (e) {
      return (Ge().memoizedState = e);
    },
    useTransition: function () {
      var e = Qu(!1),
        t = e[0];
      return ((e = Bd.bind(null, e[1])), (Ge().memoizedState = e), [t, e]);
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = Q,
        l = Ge();
      if (B) {
        if (n === void 0) throw Error(w(407));
        n = n();
      } else {
        if (((n = t()), re === null)) throw Error(w(349));
        Bt & 30 || $a(r, t, n);
      }
      l.memoizedState = n;
      var o = { value: n, getSnapshot: t };
      return (
        (l.queue = o),
        Gu(Wa.bind(null, r, o, e), [e]),
        (r.flags |= 2048),
        cr(9, Ba.bind(null, r, o, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = Ge(),
        t = re.identifierPrefix;
      if (B) {
        var n = tt,
          r = et;
        ((n = (r & ~(1 << (32 - Ve(r) - 1))).toString(32) + n),
          (t = ':' + t + 'R' + n),
          (n = sr++),
          0 < n && (t += 'H' + n.toString(32)),
          (t += ':'));
      } else ((n = $d++), (t = ':' + t + 'r' + n.toString(32) + ':'));
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  Gd = {
    readContext: Oe,
    useCallback: Ja,
    useContext: Oe,
    useEffect: Wi,
    useImperativeHandle: Za,
    useInsertionEffect: Ka,
    useLayoutEffect: Ya,
    useMemo: qa,
    useReducer: lo,
    useRef: Ga,
    useState: function () {
      return lo(ar);
    },
    useDebugValue: Hi,
    useDeferredValue: function (e) {
      var t = Ie();
      return ba(t, ee.memoizedState, e);
    },
    useTransition: function () {
      var e = lo(ar)[0],
        t = Ie().memoizedState;
      return [e, t];
    },
    useMutableSource: Ua,
    useSyncExternalStore: Va,
    useId: ec,
    unstable_isNewReconciler: !1,
  },
  Kd = {
    readContext: Oe,
    useCallback: Ja,
    useContext: Oe,
    useEffect: Wi,
    useImperativeHandle: Za,
    useInsertionEffect: Ka,
    useLayoutEffect: Ya,
    useMemo: qa,
    useReducer: oo,
    useRef: Ga,
    useState: function () {
      return oo(ar);
    },
    useDebugValue: Hi,
    useDeferredValue: function (e) {
      var t = Ie();
      return ee === null ? (t.memoizedState = e) : ba(t, ee.memoizedState, e);
    },
    useTransition: function () {
      var e = oo(ar)[0],
        t = Ie().memoizedState;
      return [e, t];
    },
    useMutableSource: Ua,
    useSyncExternalStore: Va,
    useId: ec,
    unstable_isNewReconciler: !1,
  };
function De(e, t) {
  if (e && e.defaultProps) {
    ((t = G({}, t)), (e = e.defaultProps));
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Ho(e, t, n, r) {
  ((t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : G({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n));
}
var Tl = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Gt(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = pe(),
      l = _t(e),
      o = nt(r, l);
    ((o.payload = t),
      n != null && (o.callback = n),
      (t = Et(e, o, l)),
      t !== null && ($e(t, e, l, r), Hr(t, e, l)));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = pe(),
      l = _t(e),
      o = nt(r, l);
    ((o.tag = 1),
      (o.payload = t),
      n != null && (o.callback = n),
      (t = Et(e, o, l)),
      t !== null && ($e(t, e, l, r), Hr(t, e, l)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = pe(),
      r = _t(e),
      l = nt(n, r);
    ((l.tag = 2),
      t != null && (l.callback = t),
      (t = Et(e, l, r)),
      t !== null && ($e(t, e, r, n), Hr(t, e, r)));
  },
};
function Ku(e, t, n, r, l, o, i) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == 'function'
      ? e.shouldComponentUpdate(r, o, i)
      : t.prototype && t.prototype.isPureReactComponent
        ? !nr(n, r) || !nr(l, o)
        : !0
  );
}
function lc(e, t, n) {
  var r = !1,
    l = Nt,
    o = t.contextType;
  return (
    typeof o == 'object' && o !== null
      ? (o = Oe(o))
      : ((l = ke(t) ? Vt : fe.current),
        (r = t.contextTypes),
        (o = (r = r != null) ? vn(e, l) : Nt)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Tl),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = l),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function Yu(e, t, n, r) {
  ((e = t.state),
    typeof t.componentWillReceiveProps == 'function' &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Tl.enqueueReplaceState(t, t.state, null));
}
function Qo(e, t, n, r) {
  var l = e.stateNode;
  ((l.props = n), (l.state = e.memoizedState), (l.refs = {}), Fi(e));
  var o = t.contextType;
  (typeof o == 'object' && o !== null
    ? (l.context = Oe(o))
    : ((o = ke(t) ? Vt : fe.current), (l.context = vn(e, o))),
    (l.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == 'function' && (Ho(e, t, o, n), (l.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == 'function' ||
      typeof l.getSnapshotBeforeUpdate == 'function' ||
      (typeof l.UNSAFE_componentWillMount != 'function' &&
        typeof l.componentWillMount != 'function') ||
      ((t = l.state),
      typeof l.componentWillMount == 'function' && l.componentWillMount(),
      typeof l.UNSAFE_componentWillMount == 'function' &&
        l.UNSAFE_componentWillMount(),
      t !== l.state && Tl.enqueueReplaceState(l, l.state, null),
      dl(e, n, l, r),
      (l.state = e.memoizedState)),
    typeof l.componentDidMount == 'function' && (e.flags |= 4194308));
}
function kn(e, t) {
  try {
    var n = '',
      r = t;
    do ((n += Sf(r)), (r = r.return));
    while (r);
    var l = n;
  } catch (o) {
    l =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function io(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Go(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Yd = typeof WeakMap == 'function' ? WeakMap : Map;
function oc(e, t, n) {
  ((n = nt(-1, n)), (n.tag = 3), (n.payload = { element: null }));
  var r = t.value;
  return (
    (n.callback = function () {
      (gl || ((gl = !0), (ni = r)), Go(e, t));
    }),
    n
  );
}
function ic(e, t, n) {
  ((n = nt(-1, n)), (n.tag = 3));
  var r = e.type.getDerivedStateFromError;
  if (typeof r == 'function') {
    var l = t.value;
    ((n.payload = function () {
      return r(l);
    }),
      (n.callback = function () {
        Go(e, t);
      }));
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == 'function' &&
      (n.callback = function () {
        (Go(e, t),
          typeof r != 'function' &&
            (Ct === null ? (Ct = new Set([this])) : Ct.add(this)));
        var i = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: i !== null ? i : '',
        });
      }),
    n
  );
}
function Xu(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Yd();
    var l = new Set();
    r.set(t, l);
  } else ((l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l)));
  l.has(n) || (l.add(n), (e = sp.bind(null, e, t, n)), t.then(e, e));
}
function Zu(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Ju(e, t, n, r, l) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = l), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = nt(-1, 1)), (t.tag = 2), Et(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Xd = ut.ReactCurrentOwner,
  ye = !1;
function de(e, t, n, r) {
  t.child = e === null ? ja(t, null, n, r) : yn(t, e.child, n, r);
}
function qu(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return (
    pn(t, l),
    (r = $i(e, t, n, r, o, l)),
    (n = Bi()),
    e !== null && !ye
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        it(e, t, l))
      : (B && n && Ti(t), (t.flags |= 1), de(e, t, r, l), t.child)
  );
}
function bu(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == 'function' &&
      !qi(o) &&
      o.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), uc(e, t, o, r, l))
      : ((e = Zr(n.type, null, r, t, t.mode, l)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((o = e.child), !(e.lanes & l))) {
    var i = o.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : nr), n(i, r) && e.ref === t.ref)
    )
      return it(e, t, l);
  }
  return (
    (t.flags |= 1),
    (e = zt(o, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function uc(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (nr(o, r) && e.ref === t.ref)
      if (((ye = !1), (t.pendingProps = r = o), (e.lanes & l) !== 0))
        e.flags & 131072 && (ye = !0);
      else return ((t.lanes = e.lanes), it(e, t, l));
  }
  return Ko(e, t, n, r, l);
}
function sc(e, t, n) {
  var r = t.pendingProps,
    l = r.children,
    o = e !== null ? e.memoizedState : null;
  if (r.mode === 'hidden')
    if (!(t.mode & 1))
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        A(sn, Ee),
        (Ee |= n));
    else {
      if (!(n & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          A(sn, Ee),
          (Ee |= e),
          null
        );
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = o !== null ? o.baseLanes : n),
        A(sn, Ee),
        (Ee |= r));
    }
  else
    (o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n),
      A(sn, Ee),
      (Ee |= r));
  return (de(e, t, l, n), t.child);
}
function ac(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function Ko(e, t, n, r, l) {
  var o = ke(n) ? Vt : fe.current;
  return (
    (o = vn(t, o)),
    pn(t, l),
    (n = $i(e, t, n, r, o, l)),
    (r = Bi()),
    e !== null && !ye
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        it(e, t, l))
      : (B && r && Ti(t), (t.flags |= 1), de(e, t, n, l), t.child)
  );
}
function es(e, t, n, r, l) {
  if (ke(n)) {
    var o = !0;
    ul(t);
  } else o = !1;
  if ((pn(t, l), t.stateNode === null))
    (Kr(e, t), lc(t, n, r), Qo(t, n, r, l), (r = !0));
  else if (e === null) {
    var i = t.stateNode,
      u = t.memoizedProps;
    i.props = u;
    var s = i.context,
      c = n.contextType;
    typeof c == 'object' && c !== null
      ? (c = Oe(c))
      : ((c = ke(n) ? Vt : fe.current), (c = vn(t, c)));
    var m = n.getDerivedStateFromProps,
      h =
        typeof m == 'function' ||
        typeof i.getSnapshotBeforeUpdate == 'function';
    (h ||
      (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof i.componentWillReceiveProps != 'function') ||
      ((u !== r || s !== c) && Yu(t, i, r, c)),
      (mt = !1));
    var p = t.memoizedState;
    ((i.state = p),
      dl(t, r, i, l),
      (s = t.memoizedState),
      u !== r || p !== s || we.current || mt
        ? (typeof m == 'function' && (Ho(t, n, m, r), (s = t.memoizedState)),
          (u = mt || Ku(t, n, u, r, p, s, c))
            ? (h ||
                (typeof i.UNSAFE_componentWillMount != 'function' &&
                  typeof i.componentWillMount != 'function') ||
                (typeof i.componentWillMount == 'function' &&
                  i.componentWillMount(),
                typeof i.UNSAFE_componentWillMount == 'function' &&
                  i.UNSAFE_componentWillMount()),
              typeof i.componentDidMount == 'function' && (t.flags |= 4194308))
            : (typeof i.componentDidMount == 'function' && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = s)),
          (i.props = r),
          (i.state = s),
          (i.context = c),
          (r = u))
        : (typeof i.componentDidMount == 'function' && (t.flags |= 4194308),
          (r = !1)));
  } else {
    ((i = t.stateNode),
      Da(e, t),
      (u = t.memoizedProps),
      (c = t.type === t.elementType ? u : De(t.type, u)),
      (i.props = c),
      (h = t.pendingProps),
      (p = i.context),
      (s = n.contextType),
      typeof s == 'object' && s !== null
        ? (s = Oe(s))
        : ((s = ke(n) ? Vt : fe.current), (s = vn(t, s))));
    var S = n.getDerivedStateFromProps;
    ((m =
      typeof S == 'function' ||
      typeof i.getSnapshotBeforeUpdate == 'function') ||
      (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof i.componentWillReceiveProps != 'function') ||
      ((u !== h || p !== s) && Yu(t, i, r, s)),
      (mt = !1),
      (p = t.memoizedState),
      (i.state = p),
      dl(t, r, i, l));
    var k = t.memoizedState;
    u !== h || p !== k || we.current || mt
      ? (typeof S == 'function' && (Ho(t, n, S, r), (k = t.memoizedState)),
        (c = mt || Ku(t, n, c, r, p, k, s) || !1)
          ? (m ||
              (typeof i.UNSAFE_componentWillUpdate != 'function' &&
                typeof i.componentWillUpdate != 'function') ||
              (typeof i.componentWillUpdate == 'function' &&
                i.componentWillUpdate(r, k, s),
              typeof i.UNSAFE_componentWillUpdate == 'function' &&
                i.UNSAFE_componentWillUpdate(r, k, s)),
            typeof i.componentDidUpdate == 'function' && (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
          : (typeof i.componentDidUpdate != 'function' ||
              (u === e.memoizedProps && p === e.memoizedState) ||
              (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != 'function' ||
              (u === e.memoizedProps && p === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = k)),
        (i.props = r),
        (i.state = k),
        (i.context = s),
        (r = c))
      : (typeof i.componentDidUpdate != 'function' ||
          (u === e.memoizedProps && p === e.memoizedState) ||
          (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != 'function' ||
          (u === e.memoizedProps && p === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Yo(e, t, n, r, o, l);
}
function Yo(e, t, n, r, l, o) {
  ac(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return (l && Uu(t, n, !1), it(e, t, o));
  ((r = t.stateNode), (Xd.current = t));
  var u =
    i && typeof n.getDerivedStateFromError != 'function' ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && i
      ? ((t.child = yn(t, e.child, null, o)), (t.child = yn(t, null, u, o)))
      : de(e, t, u, o),
    (t.memoizedState = r.state),
    l && Uu(t, n, !0),
    t.child
  );
}
function cc(e) {
  var t = e.stateNode;
  (t.pendingContext
    ? Au(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Au(e, t.context, !1),
    Di(e, t.containerInfo));
}
function ts(e, t, n, r, l) {
  return (gn(), Ri(l), (t.flags |= 256), de(e, t, n, r), t.child);
}
var Xo = { dehydrated: null, treeContext: null, retryLane: 0 };
function Zo(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function fc(e, t, n) {
  var r = t.pendingProps,
    l = H.current,
    o = !1,
    i = (t.flags & 128) !== 0,
    u;
  if (
    ((u = i) ||
      (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    u
      ? ((o = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (l |= 1),
    A(H, l & 1),
    e === null)
  )
    return (
      Bo(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === '$!'
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((i = r.children),
          (e = r.fallback),
          o
            ? ((r = t.mode),
              (o = t.child),
              (i = { mode: 'hidden', children: i }),
              !(r & 1) && o !== null
                ? ((o.childLanes = 0), (o.pendingProps = i))
                : (o = Ml(i, r, 0, null)),
              (e = Ut(e, r, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = Zo(n)),
              (t.memoizedState = Xo),
              e)
            : Qi(t, i))
    );
  if (((l = e.memoizedState), l !== null && ((u = l.dehydrated), u !== null)))
    return Zd(e, t, i, r, u, l, n);
  if (o) {
    ((o = r.fallback), (i = t.mode), (l = e.child), (u = l.sibling));
    var s = { mode: 'hidden', children: r.children };
    return (
      !(i & 1) && t.child !== l
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = s),
          (t.deletions = null))
        : ((r = zt(l, s)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
      u !== null ? (o = zt(u, o)) : ((o = Ut(o, i, n, null)), (o.flags |= 2)),
      (o.return = t),
      (r.return = t),
      (r.sibling = o),
      (t.child = r),
      (r = o),
      (o = t.child),
      (i = e.child.memoizedState),
      (i =
        i === null
          ? Zo(n)
          : {
              baseLanes: i.baseLanes | n,
              cachePool: null,
              transitions: i.transitions,
            }),
      (o.memoizedState = i),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = Xo),
      r
    );
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (r = zt(o, { mode: 'visible', children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function Qi(e, t) {
  return (
    (t = Ml({ mode: 'visible', children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Or(e, t, n, r) {
  return (
    r !== null && Ri(r),
    yn(t, e.child, null, n),
    (e = Qi(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function Zd(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = io(Error(w(422)))), Or(e, t, i, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((o = r.fallback),
          (l = t.mode),
          (r = Ml({ mode: 'visible', children: r.children }, l, 0, null)),
          (o = Ut(o, l, i, null)),
          (o.flags |= 2),
          (r.return = t),
          (o.return = t),
          (r.sibling = o),
          (t.child = r),
          t.mode & 1 && yn(t, e.child, null, i),
          (t.child.memoizedState = Zo(i)),
          (t.memoizedState = Xo),
          o);
  if (!(t.mode & 1)) return Or(e, t, i, null);
  if (l.data === '$!') {
    if (((r = l.nextSibling && l.nextSibling.dataset), r)) var u = r.dgst;
    return (
      (r = u),
      (o = Error(w(419))),
      (r = io(o, r, void 0)),
      Or(e, t, i, r)
    );
  }
  if (((u = (i & e.childLanes) !== 0), ye || u)) {
    if (((r = re), r !== null)) {
      switch (i & -i) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
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
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      ((l = l & (r.suspendedLanes | i) ? 0 : l),
        l !== 0 &&
          l !== o.retryLane &&
          ((o.retryLane = l), ot(e, l), $e(r, e, l, -1)));
    }
    return (Ji(), (r = io(Error(w(421)))), Or(e, t, i, r));
  }
  return l.data === '$?'
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = ap.bind(null, e)),
      (l._reactRetry = t),
      null)
    : ((e = o.treeContext),
      (Ce = xt(l.nextSibling)),
      (_e = t),
      (B = !0),
      (Ue = null),
      e !== null &&
        ((Te[Le++] = et),
        (Te[Le++] = tt),
        (Te[Le++] = $t),
        (et = e.id),
        (tt = e.overflow),
        ($t = t)),
      (t = Qi(t, r.children)),
      (t.flags |= 4096),
      t);
}
function ns(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  (r !== null && (r.lanes |= t), Wo(e.return, t, n));
}
function uo(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = r),
      (o.tail = n),
      (o.tailMode = l));
}
function dc(e, t, n) {
  var r = t.pendingProps,
    l = r.revealOrder,
    o = r.tail;
  if ((de(e, t, r.children, n), (r = H.current), r & 2))
    ((r = (r & 1) | 2), (t.flags |= 128));
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && ns(e, n, t);
        else if (e.tag === 19) ns(e, n, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    r &= 1;
  }
  if ((A(H, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (l) {
      case 'forwards':
        for (n = t.child, l = null; n !== null; )
          ((e = n.alternate),
            e !== null && pl(e) === null && (l = n),
            (n = n.sibling));
        ((n = l),
          n === null
            ? ((l = t.child), (t.child = null))
            : ((l = n.sibling), (n.sibling = null)),
          uo(t, !1, l, n, o));
        break;
      case 'backwards':
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && pl(e) === null)) {
            t.child = l;
            break;
          }
          ((e = l.sibling), (l.sibling = n), (n = l), (l = e));
        }
        uo(t, !0, n, null, o);
        break;
      case 'together':
        uo(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Kr(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function it(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Wt |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(w(153));
  if (t.child !== null) {
    for (
      e = t.child, n = zt(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      ((e = e.sibling),
        (n = n.sibling = zt(e, e.pendingProps)),
        (n.return = t));
    n.sibling = null;
  }
  return t.child;
}
function Jd(e, t, n) {
  switch (t.tag) {
    case 3:
      (cc(t), gn());
      break;
    case 5:
      Aa(t);
      break;
    case 1:
      ke(t.type) && ul(t);
      break;
    case 4:
      Di(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        l = t.memoizedProps.value;
      (A(cl, r._currentValue), (r._currentValue = l));
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (A(H, H.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? fc(e, t, n)
            : (A(H, H.current & 1),
              (e = it(e, t, n)),
              e !== null ? e.sibling : null);
      A(H, H.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return dc(e, t, n);
        t.flags |= 128;
      }
      if (
        ((l = t.memoizedState),
        l !== null &&
          ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
        A(H, H.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return ((t.lanes = 0), sc(e, t, n));
  }
  return it(e, t, n);
}
var pc, Jo, mc, hc;
pc = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      ((n.child.return = n), (n = n.child));
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    ((n.sibling.return = n.return), (n = n.sibling));
  }
};
Jo = function () {};
mc = function (e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    ((e = t.stateNode), Dt(Xe.current));
    var o = null;
    switch (n) {
      case 'input':
        ((l = wo(e, l)), (r = wo(e, r)), (o = []));
        break;
      case 'select':
        ((l = G({}, l, { value: void 0 })),
          (r = G({}, r, { value: void 0 })),
          (o = []));
        break;
      case 'textarea':
        ((l = xo(e, l)), (r = xo(e, r)), (o = []));
        break;
      default:
        typeof l.onClick != 'function' &&
          typeof r.onClick == 'function' &&
          (e.onclick = ol);
    }
    Co(n, r);
    var i;
    n = null;
    for (c in l)
      if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null)
        if (c === 'style') {
          var u = l[c];
          for (i in u) u.hasOwnProperty(i) && (n || (n = {}), (n[i] = ''));
        } else
          c !== 'dangerouslySetInnerHTML' &&
            c !== 'children' &&
            c !== 'suppressContentEditableWarning' &&
            c !== 'suppressHydrationWarning' &&
            c !== 'autoFocus' &&
            (Xn.hasOwnProperty(c)
              ? o || (o = [])
              : (o = o || []).push(c, null));
    for (c in r) {
      var s = r[c];
      if (
        ((u = l != null ? l[c] : void 0),
        r.hasOwnProperty(c) && s !== u && (s != null || u != null))
      )
        if (c === 'style')
          if (u) {
            for (i in u)
              !u.hasOwnProperty(i) ||
                (s && s.hasOwnProperty(i)) ||
                (n || (n = {}), (n[i] = ''));
            for (i in s)
              s.hasOwnProperty(i) &&
                u[i] !== s[i] &&
                (n || (n = {}), (n[i] = s[i]));
          } else (n || (o || (o = []), o.push(c, n)), (n = s));
        else
          c === 'dangerouslySetInnerHTML'
            ? ((s = s ? s.__html : void 0),
              (u = u ? u.__html : void 0),
              s != null && u !== s && (o = o || []).push(c, s))
            : c === 'children'
              ? (typeof s != 'string' && typeof s != 'number') ||
                (o = o || []).push(c, '' + s)
              : c !== 'suppressContentEditableWarning' &&
                c !== 'suppressHydrationWarning' &&
                (Xn.hasOwnProperty(c)
                  ? (s != null && c === 'onScroll' && U('scroll', e),
                    o || u === s || (o = []))
                  : (o = o || []).push(c, s));
    }
    n && (o = o || []).push('style', n);
    var c = o;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
hc = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function On(e, t) {
  if (!B)
    switch (e.tailMode) {
      case 'hidden':
        t = e.tail;
        for (var n = null; t !== null; )
          (t.alternate !== null && (n = t), (t = t.sibling));
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case 'collapsed':
        n = e.tail;
        for (var r = null; n !== null; )
          (n.alternate !== null && (r = n), (n = n.sibling));
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function ae(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var l = e.child; l !== null; )
      ((n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags & 14680064),
        (r |= l.flags & 14680064),
        (l.return = e),
        (l = l.sibling));
  else
    for (l = e.child; l !== null; )
      ((n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags),
        (r |= l.flags),
        (l.return = e),
        (l = l.sibling));
  return ((e.subtreeFlags |= r), (e.childLanes = n), t);
}
function qd(e, t, n) {
  var r = t.pendingProps;
  switch ((Li(t), t.tag)) {
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
      return (ae(t), null);
    case 1:
      return (ke(t.type) && il(), ae(t), null);
    case 3:
      return (
        (r = t.stateNode),
        wn(),
        V(we),
        V(fe),
        Ui(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Rr(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Ue !== null && (oi(Ue), (Ue = null)))),
        Jo(e, t),
        ae(t),
        null
      );
    case 5:
      Ai(t);
      var l = Dt(ur.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        (mc(e, t, n, r, l),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(w(166));
          return (ae(t), null);
        }
        if (((e = Dt(Xe.current)), Rr(t))) {
          ((r = t.stateNode), (n = t.type));
          var o = t.memoizedProps;
          switch (((r[Ke] = t), (r[or] = o), (e = (t.mode & 1) !== 0), n)) {
            case 'dialog':
              (U('cancel', r), U('close', r));
              break;
            case 'iframe':
            case 'object':
            case 'embed':
              U('load', r);
              break;
            case 'video':
            case 'audio':
              for (l = 0; l < Un.length; l++) U(Un[l], r);
              break;
            case 'source':
              U('error', r);
              break;
            case 'img':
            case 'image':
            case 'link':
              (U('error', r), U('load', r));
              break;
            case 'details':
              U('toggle', r);
              break;
            case 'input':
              (fu(r, o), U('invalid', r));
              break;
            case 'select':
              ((r._wrapperState = { wasMultiple: !!o.multiple }),
                U('invalid', r));
              break;
            case 'textarea':
              (pu(r, o), U('invalid', r));
          }
          (Co(n, o), (l = null));
          for (var i in o)
            if (o.hasOwnProperty(i)) {
              var u = o[i];
              i === 'children'
                ? typeof u == 'string'
                  ? r.textContent !== u &&
                    (o.suppressHydrationWarning !== !0 &&
                      Lr(r.textContent, u, e),
                    (l = ['children', u]))
                  : typeof u == 'number' &&
                    r.textContent !== '' + u &&
                    (o.suppressHydrationWarning !== !0 &&
                      Lr(r.textContent, u, e),
                    (l = ['children', '' + u]))
                : Xn.hasOwnProperty(i) &&
                  u != null &&
                  i === 'onScroll' &&
                  U('scroll', r);
            }
          switch (n) {
            case 'input':
              (xr(r), du(r, o, !0));
              break;
            case 'textarea':
              (xr(r), mu(r));
              break;
            case 'select':
            case 'option':
              break;
            default:
              typeof o.onClick == 'function' && (r.onclick = ol);
          }
          ((r = l), (t.updateQueue = r), r !== null && (t.flags |= 4));
        } else {
          ((i = l.nodeType === 9 ? l : l.ownerDocument),
            e === 'http://www.w3.org/1999/xhtml' && (e = Ws(n)),
            e === 'http://www.w3.org/1999/xhtml'
              ? n === 'script'
                ? ((e = i.createElement('div')),
                  (e.innerHTML = '<script><\/script>'),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == 'string'
                  ? (e = i.createElement(n, { is: r.is }))
                  : ((e = i.createElement(n)),
                    n === 'select' &&
                      ((i = e),
                      r.multiple
                        ? (i.multiple = !0)
                        : r.size && (i.size = r.size)))
              : (e = i.createElementNS(e, n)),
            (e[Ke] = t),
            (e[or] = r),
            pc(e, t, !1, !1),
            (t.stateNode = e));
          e: {
            switch (((i = _o(n, r)), n)) {
              case 'dialog':
                (U('cancel', e), U('close', e), (l = r));
                break;
              case 'iframe':
              case 'object':
              case 'embed':
                (U('load', e), (l = r));
                break;
              case 'video':
              case 'audio':
                for (l = 0; l < Un.length; l++) U(Un[l], e);
                l = r;
                break;
              case 'source':
                (U('error', e), (l = r));
                break;
              case 'img':
              case 'image':
              case 'link':
                (U('error', e), U('load', e), (l = r));
                break;
              case 'details':
                (U('toggle', e), (l = r));
                break;
              case 'input':
                (fu(e, r), (l = wo(e, r)), U('invalid', e));
                break;
              case 'option':
                l = r;
                break;
              case 'select':
                ((e._wrapperState = { wasMultiple: !!r.multiple }),
                  (l = G({}, r, { value: void 0 })),
                  U('invalid', e));
                break;
              case 'textarea':
                (pu(e, r), (l = xo(e, r)), U('invalid', e));
                break;
              default:
                l = r;
            }
            (Co(n, l), (u = l));
            for (o in u)
              if (u.hasOwnProperty(o)) {
                var s = u[o];
                o === 'style'
                  ? Gs(e, s)
                  : o === 'dangerouslySetInnerHTML'
                    ? ((s = s ? s.__html : void 0), s != null && Hs(e, s))
                    : o === 'children'
                      ? typeof s == 'string'
                        ? (n !== 'textarea' || s !== '') && Zn(e, s)
                        : typeof s == 'number' && Zn(e, '' + s)
                      : o !== 'suppressContentEditableWarning' &&
                        o !== 'suppressHydrationWarning' &&
                        o !== 'autoFocus' &&
                        (Xn.hasOwnProperty(o)
                          ? s != null && o === 'onScroll' && U('scroll', e)
                          : s != null && hi(e, o, s, i));
              }
            switch (n) {
              case 'input':
                (xr(e), du(e, r, !1));
                break;
              case 'textarea':
                (xr(e), mu(e));
                break;
              case 'option':
                r.value != null && e.setAttribute('value', '' + Pt(r.value));
                break;
              case 'select':
                ((e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null
                    ? an(e, !!r.multiple, o, !1)
                    : r.defaultValue != null &&
                      an(e, !!r.multiple, r.defaultValue, !0));
                break;
              default:
                typeof l.onClick == 'function' && (e.onclick = ol);
            }
            switch (n) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                r = !!r.autoFocus;
                break e;
              case 'img':
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return (ae(t), null);
    case 6:
      if (e && t.stateNode != null) hc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != 'string' && t.stateNode === null) throw Error(w(166));
        if (((n = Dt(ur.current)), Dt(Xe.current), Rr(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[Ke] = t),
            (o = r.nodeValue !== n) && ((e = _e), e !== null))
          )
            switch (e.tag) {
              case 3:
                Lr(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Lr(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[Ke] = t),
            (t.stateNode = r));
      }
      return (ae(t), null);
    case 13:
      if (
        (V(H),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (B && Ce !== null && t.mode & 1 && !(t.flags & 128))
          (Oa(), gn(), (t.flags |= 98560), (o = !1));
        else if (((o = Rr(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(w(318));
            if (
              ((o = t.memoizedState),
              (o = o !== null ? o.dehydrated : null),
              !o)
            )
              throw Error(w(317));
            o[Ke] = t;
          } else
            (gn(),
              !(t.flags & 128) && (t.memoizedState = null),
              (t.flags |= 4));
          (ae(t), (o = !1));
        } else (Ue !== null && (oi(Ue), (Ue = null)), (o = !0));
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || H.current & 1 ? te === 0 && (te = 3) : Ji())),
          t.updateQueue !== null && (t.flags |= 4),
          ae(t),
          null);
    case 4:
      return (
        wn(),
        Jo(e, t),
        e === null && rr(t.stateNode.containerInfo),
        ae(t),
        null
      );
    case 10:
      return (Ii(t.type._context), ae(t), null);
    case 17:
      return (ke(t.type) && il(), ae(t), null);
    case 19:
      if ((V(H), (o = t.memoizedState), o === null)) return (ae(t), null);
      if (((r = (t.flags & 128) !== 0), (i = o.rendering), i === null))
        if (r) On(o, !1);
        else {
          if (te !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((i = pl(e)), i !== null)) {
                for (
                  t.flags |= 128,
                    On(o, !1),
                    r = i.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  ((o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (i = o.alternate),
                    i === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = i.childLanes),
                        (o.lanes = i.lanes),
                        (o.child = i.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = i.memoizedProps),
                        (o.memoizedState = i.memoizedState),
                        (o.updateQueue = i.updateQueue),
                        (o.type = i.type),
                        (e = i.dependencies),
                        (o.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling));
                return (A(H, (H.current & 1) | 2), t.child);
              }
              e = e.sibling;
            }
          o.tail !== null &&
            Z() > Sn &&
            ((t.flags |= 128), (r = !0), On(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = pl(i)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              On(o, !0),
              o.tail === null && o.tailMode === 'hidden' && !i.alternate && !B)
            )
              return (ae(t), null);
          } else
            2 * Z() - o.renderingStartTime > Sn &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), On(o, !1), (t.lanes = 4194304));
        o.isBackwards
          ? ((i.sibling = t.child), (t.child = i))
          : ((n = o.last),
            n !== null ? (n.sibling = i) : (t.child = i),
            (o.last = i));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = Z()),
          (t.sibling = null),
          (n = H.current),
          A(H, r ? (n & 1) | 2 : n & 1),
          t)
        : (ae(t), null);
    case 22:
    case 23:
      return (
        Zi(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Ee & 1073741824 && (ae(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : ae(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(w(156, t.tag));
}
function bd(e, t) {
  switch ((Li(t), t.tag)) {
    case 1:
      return (
        ke(t.type) && il(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        wn(),
        V(we),
        V(fe),
        Ui(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return (Ai(t), null);
    case 13:
      if ((V(H), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(w(340));
        gn();
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return (V(H), null);
    case 4:
      return (wn(), null);
    case 10:
      return (Ii(t.type._context), null);
    case 22:
    case 23:
      return (Zi(), null);
    case 24:
      return null;
    default:
      return null;
  }
}
var Ir = !1,
  ce = !1,
  ep = typeof WeakSet == 'function' ? WeakSet : Set,
  C = null;
function un(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == 'function')
      try {
        n(null);
      } catch (r) {
        Y(e, t, r);
      }
    else n.current = null;
}
function qo(e, t, n) {
  try {
    n();
  } catch (r) {
    Y(e, t, r);
  }
}
var rs = !1;
function tp(e, t) {
  if (((jo = nl), (e = ka()), Ni(e))) {
    if ('selectionStart' in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var l = r.anchorOffset,
            o = r.focusNode;
          r = r.focusOffset;
          try {
            (n.nodeType, o.nodeType);
          } catch {
            n = null;
            break e;
          }
          var i = 0,
            u = -1,
            s = -1,
            c = 0,
            m = 0,
            h = e,
            p = null;
          t: for (;;) {
            for (
              var S;
              h !== n || (l !== 0 && h.nodeType !== 3) || (u = i + l),
                h !== o || (r !== 0 && h.nodeType !== 3) || (s = i + r),
                h.nodeType === 3 && (i += h.nodeValue.length),
                (S = h.firstChild) !== null;

            )
              ((p = h), (h = S));
            for (;;) {
              if (h === e) break t;
              if (
                (p === n && ++c === l && (u = i),
                p === o && ++m === r && (s = i),
                (S = h.nextSibling) !== null)
              )
                break;
              ((h = p), (p = h.parentNode));
            }
            h = S;
          }
          n = u === -1 || s === -1 ? null : { start: u, end: s };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Fo = { focusedElem: e, selectionRange: n }, nl = !1, C = t; C !== null; )
    if (((t = C), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      ((e.return = t), (C = e));
    else
      for (; C !== null; ) {
        t = C;
        try {
          var k = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (k !== null) {
                  var x = k.memoizedProps,
                    I = k.memoizedState,
                    f = t.stateNode,
                    a = f.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? x : De(t.type, x),
                      I
                    );
                  f.__reactInternalSnapshotBeforeUpdate = a;
                }
                break;
              case 3:
                var d = t.stateNode.containerInfo;
                d.nodeType === 1
                  ? (d.textContent = '')
                  : d.nodeType === 9 &&
                    d.documentElement &&
                    d.removeChild(d.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(w(163));
            }
        } catch (g) {
          Y(t, t.return, g);
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (C = e));
          break;
        }
        C = t.return;
      }
  return ((k = rs), (rs = !1), k);
}
function Gn(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var l = (r = r.next);
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        ((l.destroy = void 0), o !== void 0 && qo(t, n, o));
      }
      l = l.next;
    } while (l !== r);
  }
}
function Ll(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function bo(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == 'function' ? t(e) : (t.current = e);
  }
}
function vc(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), vc(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[Ke], delete t[or], delete t[Uo], delete t[Dd], delete t[Ad])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
function gc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function ls(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || gc(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      ((e.child.return = e), (e = e.child));
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function ei(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = ol)));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (ei(e, t, n), e = e.sibling; e !== null; )
      (ei(e, t, n), (e = e.sibling));
}
function ti(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (ti(e, t, n), e = e.sibling; e !== null; )
      (ti(e, t, n), (e = e.sibling));
}
var le = null,
  Ae = !1;
function ft(e, t, n) {
  for (n = n.child; n !== null; ) (yc(e, t, n), (n = n.sibling));
}
function yc(e, t, n) {
  if (Ye && typeof Ye.onCommitFiberUnmount == 'function')
    try {
      Ye.onCommitFiberUnmount(xl, n);
    } catch {}
  switch (n.tag) {
    case 5:
      ce || un(n, t);
    case 6:
      var r = le,
        l = Ae;
      ((le = null),
        ft(e, t, n),
        (le = r),
        (Ae = l),
        le !== null &&
          (Ae
            ? ((e = le),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : le.removeChild(n.stateNode)));
      break;
    case 18:
      le !== null &&
        (Ae
          ? ((e = le),
            (n = n.stateNode),
            e.nodeType === 8
              ? eo(e.parentNode, n)
              : e.nodeType === 1 && eo(e, n),
            er(e))
          : eo(le, n.stateNode));
      break;
    case 4:
      ((r = le),
        (l = Ae),
        (le = n.stateNode.containerInfo),
        (Ae = !0),
        ft(e, t, n),
        (le = r),
        (Ae = l));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !ce &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        l = r = r.next;
        do {
          var o = l,
            i = o.destroy;
          ((o = o.tag),
            i !== void 0 && (o & 2 || o & 4) && qo(n, t, i),
            (l = l.next));
        } while (l !== r);
      }
      ft(e, t, n);
      break;
    case 1:
      if (
        !ce &&
        (un(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == 'function')
      )
        try {
          ((r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount());
        } catch (u) {
          Y(n, t, u);
        }
      ft(e, t, n);
      break;
    case 21:
      ft(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((ce = (r = ce) || n.memoizedState !== null), ft(e, t, n), (ce = r))
        : ft(e, t, n);
      break;
    default:
      ft(e, t, n);
  }
}
function os(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    (n === null && (n = e.stateNode = new ep()),
      t.forEach(function (r) {
        var l = cp.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(l, l));
      }));
  }
}
function Fe(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var o = e,
          i = t,
          u = i;
        e: for (; u !== null; ) {
          switch (u.tag) {
            case 5:
              ((le = u.stateNode), (Ae = !1));
              break e;
            case 3:
              ((le = u.stateNode.containerInfo), (Ae = !0));
              break e;
            case 4:
              ((le = u.stateNode.containerInfo), (Ae = !0));
              break e;
          }
          u = u.return;
        }
        if (le === null) throw Error(w(160));
        (yc(o, i, l), (le = null), (Ae = !1));
        var s = l.alternate;
        (s !== null && (s.return = null), (l.return = null));
      } catch (c) {
        Y(l, t, c);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) (wc(t, e), (t = t.sibling));
}
function wc(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Fe(t, e), Qe(e), r & 4)) {
        try {
          (Gn(3, e, e.return), Ll(3, e));
        } catch (x) {
          Y(e, e.return, x);
        }
        try {
          Gn(5, e, e.return);
        } catch (x) {
          Y(e, e.return, x);
        }
      }
      break;
    case 1:
      (Fe(t, e), Qe(e), r & 512 && n !== null && un(n, n.return));
      break;
    case 5:
      if (
        (Fe(t, e),
        Qe(e),
        r & 512 && n !== null && un(n, n.return),
        e.flags & 32)
      ) {
        var l = e.stateNode;
        try {
          Zn(l, '');
        } catch (x) {
          Y(e, e.return, x);
        }
      }
      if (r & 4 && ((l = e.stateNode), l != null)) {
        var o = e.memoizedProps,
          i = n !== null ? n.memoizedProps : o,
          u = e.type,
          s = e.updateQueue;
        if (((e.updateQueue = null), s !== null))
          try {
            (u === 'input' && o.type === 'radio' && o.name != null && $s(l, o),
              _o(u, i));
            var c = _o(u, o);
            for (i = 0; i < s.length; i += 2) {
              var m = s[i],
                h = s[i + 1];
              m === 'style'
                ? Gs(l, h)
                : m === 'dangerouslySetInnerHTML'
                  ? Hs(l, h)
                  : m === 'children'
                    ? Zn(l, h)
                    : hi(l, m, h, c);
            }
            switch (u) {
              case 'input':
                ko(l, o);
                break;
              case 'textarea':
                Bs(l, o);
                break;
              case 'select':
                var p = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!o.multiple;
                var S = o.value;
                S != null
                  ? an(l, !!o.multiple, S, !1)
                  : p !== !!o.multiple &&
                    (o.defaultValue != null
                      ? an(l, !!o.multiple, o.defaultValue, !0)
                      : an(l, !!o.multiple, o.multiple ? [] : '', !1));
            }
            l[or] = o;
          } catch (x) {
            Y(e, e.return, x);
          }
      }
      break;
    case 6:
      if ((Fe(t, e), Qe(e), r & 4)) {
        if (e.stateNode === null) throw Error(w(162));
        ((l = e.stateNode), (o = e.memoizedProps));
        try {
          l.nodeValue = o;
        } catch (x) {
          Y(e, e.return, x);
        }
      }
      break;
    case 3:
      if (
        (Fe(t, e), Qe(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          er(t.containerInfo);
        } catch (x) {
          Y(e, e.return, x);
        }
      break;
    case 4:
      (Fe(t, e), Qe(e));
      break;
    case 13:
      (Fe(t, e),
        Qe(e),
        (l = e.child),
        l.flags & 8192 &&
          ((o = l.memoizedState !== null),
          (l.stateNode.isHidden = o),
          !o ||
            (l.alternate !== null && l.alternate.memoizedState !== null) ||
            (Yi = Z())),
        r & 4 && os(e));
      break;
    case 22:
      if (
        ((m = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((ce = (c = ce) || m), Fe(t, e), (ce = c)) : Fe(t, e),
        Qe(e),
        r & 8192)
      ) {
        if (
          ((c = e.memoizedState !== null),
          (e.stateNode.isHidden = c) && !m && e.mode & 1)
        )
          for (C = e, m = e.child; m !== null; ) {
            for (h = C = m; C !== null; ) {
              switch (((p = C), (S = p.child), p.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Gn(4, p, p.return);
                  break;
                case 1:
                  un(p, p.return);
                  var k = p.stateNode;
                  if (typeof k.componentWillUnmount == 'function') {
                    ((r = p), (n = p.return));
                    try {
                      ((t = r),
                        (k.props = t.memoizedProps),
                        (k.state = t.memoizedState),
                        k.componentWillUnmount());
                    } catch (x) {
                      Y(r, n, x);
                    }
                  }
                  break;
                case 5:
                  un(p, p.return);
                  break;
                case 22:
                  if (p.memoizedState !== null) {
                    us(h);
                    continue;
                  }
              }
              S !== null ? ((S.return = p), (C = S)) : us(h);
            }
            m = m.sibling;
          }
        e: for (m = null, h = e; ; ) {
          if (h.tag === 5) {
            if (m === null) {
              m = h;
              try {
                ((l = h.stateNode),
                  c
                    ? ((o = l.style),
                      typeof o.setProperty == 'function'
                        ? o.setProperty('display', 'none', 'important')
                        : (o.display = 'none'))
                    : ((u = h.stateNode),
                      (s = h.memoizedProps.style),
                      (i =
                        s != null && s.hasOwnProperty('display')
                          ? s.display
                          : null),
                      (u.style.display = Qs('display', i))));
              } catch (x) {
                Y(e, e.return, x);
              }
            }
          } else if (h.tag === 6) {
            if (m === null)
              try {
                h.stateNode.nodeValue = c ? '' : h.memoizedProps;
              } catch (x) {
                Y(e, e.return, x);
              }
          } else if (
            ((h.tag !== 22 && h.tag !== 23) ||
              h.memoizedState === null ||
              h === e) &&
            h.child !== null
          ) {
            ((h.child.return = h), (h = h.child));
            continue;
          }
          if (h === e) break e;
          for (; h.sibling === null; ) {
            if (h.return === null || h.return === e) break e;
            (m === h && (m = null), (h = h.return));
          }
          (m === h && (m = null),
            (h.sibling.return = h.return),
            (h = h.sibling));
        }
      }
      break;
    case 19:
      (Fe(t, e), Qe(e), r & 4 && os(e));
      break;
    case 21:
      break;
    default:
      (Fe(t, e), Qe(e));
  }
}
function Qe(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (gc(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(w(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Zn(l, ''), (r.flags &= -33));
          var o = ls(e);
          ti(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo,
            u = ls(e);
          ei(e, u, i);
          break;
        default:
          throw Error(w(161));
      }
    } catch (s) {
      Y(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function np(e, t, n) {
  ((C = e), kc(e));
}
function kc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; C !== null; ) {
    var l = C,
      o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || Ir;
      if (!i) {
        var u = l.alternate,
          s = (u !== null && u.memoizedState !== null) || ce;
        u = Ir;
        var c = ce;
        if (((Ir = i), (ce = s) && !c))
          for (C = l; C !== null; )
            ((i = C),
              (s = i.child),
              i.tag === 22 && i.memoizedState !== null
                ? ss(l)
                : s !== null
                  ? ((s.return = i), (C = s))
                  : ss(l));
        for (; o !== null; ) ((C = o), kc(o), (o = o.sibling));
        ((C = l), (Ir = u), (ce = c));
      }
      is(e);
    } else
      l.subtreeFlags & 8772 && o !== null ? ((o.return = l), (C = o)) : is(e);
  }
}
function is(e) {
  for (; C !== null; ) {
    var t = C;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              ce || Ll(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !ce)
                if (n === null) r.componentDidMount();
                else {
                  var l =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : De(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    l,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var o = t.updateQueue;
              o !== null && Hu(t, o, r);
              break;
            case 3:
              var i = t.updateQueue;
              if (i !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Hu(t, i, n);
              }
              break;
            case 5:
              var u = t.stateNode;
              if (n === null && t.flags & 4) {
                n = u;
                var s = t.memoizedProps;
                switch (t.type) {
                  case 'button':
                  case 'input':
                  case 'select':
                  case 'textarea':
                    s.autoFocus && n.focus();
                    break;
                  case 'img':
                    s.src && (n.src = s.src);
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
              if (t.memoizedState === null) {
                var c = t.alternate;
                if (c !== null) {
                  var m = c.memoizedState;
                  if (m !== null) {
                    var h = m.dehydrated;
                    h !== null && er(h);
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
              throw Error(w(163));
          }
        ce || (t.flags & 512 && bo(t));
      } catch (p) {
        Y(t, t.return, p);
      }
    }
    if (t === e) {
      C = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      ((n.return = t.return), (C = n));
      break;
    }
    C = t.return;
  }
}
function us(e) {
  for (; C !== null; ) {
    var t = C;
    if (t === e) {
      C = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      ((n.return = t.return), (C = n));
      break;
    }
    C = t.return;
  }
}
function ss(e) {
  for (; C !== null; ) {
    var t = C;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Ll(4, t);
          } catch (s) {
            Y(t, n, s);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == 'function') {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (s) {
              Y(t, l, s);
            }
          }
          var o = t.return;
          try {
            bo(t);
          } catch (s) {
            Y(t, o, s);
          }
          break;
        case 5:
          var i = t.return;
          try {
            bo(t);
          } catch (s) {
            Y(t, i, s);
          }
      }
    } catch (s) {
      Y(t, t.return, s);
    }
    if (t === e) {
      C = null;
      break;
    }
    var u = t.sibling;
    if (u !== null) {
      ((u.return = t.return), (C = u));
      break;
    }
    C = t.return;
  }
}
var rp = Math.ceil,
  vl = ut.ReactCurrentDispatcher,
  Gi = ut.ReactCurrentOwner,
  Me = ut.ReactCurrentBatchConfig,
  j = 0,
  re = null,
  q = null,
  ie = 0,
  Ee = 0,
  sn = Lt(0),
  te = 0,
  fr = null,
  Wt = 0,
  Rl = 0,
  Ki = 0,
  Kn = null,
  ge = null,
  Yi = 0,
  Sn = 1 / 0,
  Je = null,
  gl = !1,
  ni = null,
  Ct = null,
  jr = !1,
  yt = null,
  yl = 0,
  Yn = 0,
  ri = null,
  Yr = -1,
  Xr = 0;
function pe() {
  return j & 6 ? Z() : Yr !== -1 ? Yr : (Yr = Z());
}
function _t(e) {
  return e.mode & 1
    ? j & 2 && ie !== 0
      ? ie & -ie
      : Vd.transition !== null
        ? (Xr === 0 && (Xr = la()), Xr)
        : ((e = D),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : fa(e.type))),
          e)
    : 1;
}
function $e(e, t, n, r) {
  if (50 < Yn) throw ((Yn = 0), (ri = null), Error(w(185)));
  (pr(e, n, r),
    (!(j & 2) || e !== re) &&
      (e === re && (!(j & 2) && (Rl |= n), te === 4 && vt(e, ie)),
      Se(e, r),
      n === 1 && j === 0 && !(t.mode & 1) && ((Sn = Z() + 500), Pl && Rt())));
}
function Se(e, t) {
  var n = e.callbackNode;
  Vf(e, t);
  var r = tl(e, e === re ? ie : 0);
  if (r === 0)
    (n !== null && gu(n), (e.callbackNode = null), (e.callbackPriority = 0));
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && gu(n), t === 1))
      (e.tag === 0 ? Ud(as.bind(null, e)) : La(as.bind(null, e)),
        jd(function () {
          !(j & 6) && Rt();
        }),
        (n = null));
    else {
      switch (oa(r)) {
        case 1:
          n = ki;
          break;
        case 4:
          n = na;
          break;
        case 16:
          n = el;
          break;
        case 536870912:
          n = ra;
          break;
        default:
          n = el;
      }
      n = Nc(n, Sc.bind(null, e));
    }
    ((e.callbackPriority = t), (e.callbackNode = n));
  }
}
function Sc(e, t) {
  if (((Yr = -1), (Xr = 0), j & 6)) throw Error(w(327));
  var n = e.callbackNode;
  if (mn() && e.callbackNode !== n) return null;
  var r = tl(e, e === re ? ie : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = wl(e, r);
  else {
    t = r;
    var l = j;
    j |= 2;
    var o = Ec();
    (re !== e || ie !== t) && ((Je = null), (Sn = Z() + 500), At(e, t));
    do
      try {
        ip();
        break;
      } catch (u) {
        xc(e, u);
      }
    while (!0);
    (Oi(),
      (vl.current = o),
      (j = l),
      q !== null ? (t = 0) : ((re = null), (ie = 0), (t = te)));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((l = Lo(e)), l !== 0 && ((r = l), (t = li(e, l)))), t === 1)
    )
      throw ((n = fr), At(e, 0), vt(e, r), Se(e, Z()), n);
    if (t === 6) vt(e, r);
    else {
      if (
        ((l = e.current.alternate),
        !(r & 30) &&
          !lp(l) &&
          ((t = wl(e, r)),
          t === 2 && ((o = Lo(e)), o !== 0 && ((r = o), (t = li(e, o)))),
          t === 1))
      )
        throw ((n = fr), At(e, 0), vt(e, r), Se(e, Z()), n);
      switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(w(345));
        case 2:
          It(e, ge, Je);
          break;
        case 3:
          if (
            (vt(e, r), (r & 130023424) === r && ((t = Yi + 500 - Z()), 10 < t))
          ) {
            if (tl(e, 0) !== 0) break;
            if (((l = e.suspendedLanes), (l & r) !== r)) {
              (pe(), (e.pingedLanes |= e.suspendedLanes & l));
              break;
            }
            e.timeoutHandle = Ao(It.bind(null, e, ge, Je), t);
            break;
          }
          It(e, ge, Je);
          break;
        case 4:
          if ((vt(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - Ve(r);
            ((o = 1 << i), (i = t[i]), i > l && (l = i), (r &= ~o));
          }
          if (
            ((r = l),
            (r = Z() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * rp(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Ao(It.bind(null, e, ge, Je), r);
            break;
          }
          It(e, ge, Je);
          break;
        case 5:
          It(e, ge, Je);
          break;
        default:
          throw Error(w(329));
      }
    }
  }
  return (Se(e, Z()), e.callbackNode === n ? Sc.bind(null, e) : null);
}
function li(e, t) {
  var n = Kn;
  return (
    e.current.memoizedState.isDehydrated && (At(e, t).flags |= 256),
    (e = wl(e, t)),
    e !== 2 && ((t = ge), (ge = n), t !== null && oi(t)),
    e
  );
}
function oi(e) {
  ge === null ? (ge = e) : ge.push.apply(ge, e);
}
function lp(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r],
            o = l.getSnapshot;
          l = l.value;
          try {
            if (!Be(o(), l)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      ((n.return = t), (t = n));
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
  }
  return !0;
}
function vt(e, t) {
  for (
    t &= ~Ki,
      t &= ~Rl,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - Ve(t),
      r = 1 << n;
    ((e[n] = -1), (t &= ~r));
  }
}
function as(e) {
  if (j & 6) throw Error(w(327));
  mn();
  var t = tl(e, 0);
  if (!(t & 1)) return (Se(e, Z()), null);
  var n = wl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Lo(e);
    r !== 0 && ((t = r), (n = li(e, r)));
  }
  if (n === 1) throw ((n = fr), At(e, 0), vt(e, t), Se(e, Z()), n);
  if (n === 6) throw Error(w(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    It(e, ge, Je),
    Se(e, Z()),
    null
  );
}
function Xi(e, t) {
  var n = j;
  j |= 1;
  try {
    return e(t);
  } finally {
    ((j = n), j === 0 && ((Sn = Z() + 500), Pl && Rt()));
  }
}
function Ht(e) {
  yt !== null && yt.tag === 0 && !(j & 6) && mn();
  var t = j;
  j |= 1;
  var n = Me.transition,
    r = D;
  try {
    if (((Me.transition = null), (D = 1), e)) return e();
  } finally {
    ((D = r), (Me.transition = n), (j = t), !(j & 6) && Rt());
  }
}
function Zi() {
  ((Ee = sn.current), V(sn));
}
function At(e, t) {
  ((e.finishedWork = null), (e.finishedLanes = 0));
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), Id(n)), q !== null))
    for (n = q.return; n !== null; ) {
      var r = n;
      switch ((Li(r), r.tag)) {
        case 1:
          ((r = r.type.childContextTypes), r != null && il());
          break;
        case 3:
          (wn(), V(we), V(fe), Ui());
          break;
        case 5:
          Ai(r);
          break;
        case 4:
          wn();
          break;
        case 13:
          V(H);
          break;
        case 19:
          V(H);
          break;
        case 10:
          Ii(r.type._context);
          break;
        case 22:
        case 23:
          Zi();
      }
      n = n.return;
    }
  if (
    ((re = e),
    (q = e = zt(e.current, null)),
    (ie = Ee = t),
    (te = 0),
    (fr = null),
    (Ki = Rl = Wt = 0),
    (ge = Kn = null),
    Ft !== null)
  ) {
    for (t = 0; t < Ft.length; t++)
      if (((n = Ft[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var l = r.next,
          o = n.pending;
        if (o !== null) {
          var i = o.next;
          ((o.next = l), (r.next = i));
        }
        n.pending = r;
      }
    Ft = null;
  }
  return e;
}
function xc(e, t) {
  do {
    var n = q;
    try {
      if ((Oi(), (Qr.current = hl), ml)) {
        for (var r = Q.memoizedState; r !== null; ) {
          var l = r.queue;
          (l !== null && (l.pending = null), (r = r.next));
        }
        ml = !1;
      }
      if (
        ((Bt = 0),
        (ne = ee = Q = null),
        (Qn = !1),
        (sr = 0),
        (Gi.current = null),
        n === null || n.return === null)
      ) {
        ((te = 1), (fr = t), (q = null));
        break;
      }
      e: {
        var o = e,
          i = n.return,
          u = n,
          s = t;
        if (
          ((t = ie),
          (u.flags |= 32768),
          s !== null && typeof s == 'object' && typeof s.then == 'function')
        ) {
          var c = s,
            m = u,
            h = m.tag;
          if (!(m.mode & 1) && (h === 0 || h === 11 || h === 15)) {
            var p = m.alternate;
            p
              ? ((m.updateQueue = p.updateQueue),
                (m.memoizedState = p.memoizedState),
                (m.lanes = p.lanes))
              : ((m.updateQueue = null), (m.memoizedState = null));
          }
          var S = Zu(i);
          if (S !== null) {
            ((S.flags &= -257),
              Ju(S, i, u, o, t),
              S.mode & 1 && Xu(o, c, t),
              (t = S),
              (s = c));
            var k = t.updateQueue;
            if (k === null) {
              var x = new Set();
              (x.add(s), (t.updateQueue = x));
            } else k.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              (Xu(o, c, t), Ji());
              break e;
            }
            s = Error(w(426));
          }
        } else if (B && u.mode & 1) {
          var I = Zu(i);
          if (I !== null) {
            (!(I.flags & 65536) && (I.flags |= 256),
              Ju(I, i, u, o, t),
              Ri(kn(s, u)));
            break e;
          }
        }
        ((o = s = kn(s, u)),
          te !== 4 && (te = 2),
          Kn === null ? (Kn = [o]) : Kn.push(o),
          (o = i));
        do {
          switch (o.tag) {
            case 3:
              ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
              var f = oc(o, s, t);
              Wu(o, f);
              break e;
            case 1:
              u = s;
              var a = o.type,
                d = o.stateNode;
              if (
                !(o.flags & 128) &&
                (typeof a.getDerivedStateFromError == 'function' ||
                  (d !== null &&
                    typeof d.componentDidCatch == 'function' &&
                    (Ct === null || !Ct.has(d))))
              ) {
                ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
                var g = ic(o, u, t);
                Wu(o, g);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      _c(n);
    } catch (E) {
      ((t = E), q === n && n !== null && (q = n = n.return));
      continue;
    }
    break;
  } while (!0);
}
function Ec() {
  var e = vl.current;
  return ((vl.current = hl), e === null ? hl : e);
}
function Ji() {
  ((te === 0 || te === 3 || te === 2) && (te = 4),
    re === null || (!(Wt & 268435455) && !(Rl & 268435455)) || vt(re, ie));
}
function wl(e, t) {
  var n = j;
  j |= 2;
  var r = Ec();
  (re !== e || ie !== t) && ((Je = null), At(e, t));
  do
    try {
      op();
      break;
    } catch (l) {
      xc(e, l);
    }
  while (!0);
  if ((Oi(), (j = n), (vl.current = r), q !== null)) throw Error(w(261));
  return ((re = null), (ie = 0), te);
}
function op() {
  for (; q !== null; ) Cc(q);
}
function ip() {
  for (; q !== null && !Rf(); ) Cc(q);
}
function Cc(e) {
  var t = Pc(e.alternate, e, Ee);
  ((e.memoizedProps = e.pendingProps),
    t === null ? _c(e) : (q = t),
    (Gi.current = null));
}
function _c(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = bd(n, t)), n !== null)) {
        ((n.flags &= 32767), (q = n));
        return;
      }
      if (e !== null)
        ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
      else {
        ((te = 6), (q = null));
        return;
      }
    } else if (((n = qd(n, t, Ee)), n !== null)) {
      q = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      q = t;
      return;
    }
    q = t = e;
  } while (t !== null);
  te === 0 && (te = 5);
}
function It(e, t, n) {
  var r = D,
    l = Me.transition;
  try {
    ((Me.transition = null), (D = 1), up(e, t, n, r));
  } finally {
    ((Me.transition = l), (D = r));
  }
  return null;
}
function up(e, t, n, r) {
  do mn();
  while (yt !== null);
  if (j & 6) throw Error(w(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(w(177));
  ((e.callbackNode = null), (e.callbackPriority = 0));
  var o = n.lanes | n.childLanes;
  if (
    ($f(e, o),
    e === re && ((q = re = null), (ie = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      jr ||
      ((jr = !0),
      Nc(el, function () {
        return (mn(), null);
      })),
    (o = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || o)
  ) {
    ((o = Me.transition), (Me.transition = null));
    var i = D;
    D = 1;
    var u = j;
    ((j |= 4),
      (Gi.current = null),
      tp(e, n),
      wc(n, e),
      Pd(Fo),
      (nl = !!jo),
      (Fo = jo = null),
      (e.current = n),
      np(n),
      Mf(),
      (j = u),
      (D = i),
      (Me.transition = o));
  } else e.current = n;
  if (
    (jr && ((jr = !1), (yt = e), (yl = l)),
    (o = e.pendingLanes),
    o === 0 && (Ct = null),
    jf(n.stateNode),
    Se(e, Z()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      ((l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest }));
  if (gl) throw ((gl = !1), (e = ni), (ni = null), e);
  return (
    yl & 1 && e.tag !== 0 && mn(),
    (o = e.pendingLanes),
    o & 1 ? (e === ri ? Yn++ : ((Yn = 0), (ri = e))) : (Yn = 0),
    Rt(),
    null
  );
}
function mn() {
  if (yt !== null) {
    var e = oa(yl),
      t = Me.transition,
      n = D;
    try {
      if (((Me.transition = null), (D = 16 > e ? 16 : e), yt === null))
        var r = !1;
      else {
        if (((e = yt), (yt = null), (yl = 0), j & 6)) throw Error(w(331));
        var l = j;
        for (j |= 4, C = e.current; C !== null; ) {
          var o = C,
            i = o.child;
          if (C.flags & 16) {
            var u = o.deletions;
            if (u !== null) {
              for (var s = 0; s < u.length; s++) {
                var c = u[s];
                for (C = c; C !== null; ) {
                  var m = C;
                  switch (m.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Gn(8, m, o);
                  }
                  var h = m.child;
                  if (h !== null) ((h.return = m), (C = h));
                  else
                    for (; C !== null; ) {
                      m = C;
                      var p = m.sibling,
                        S = m.return;
                      if ((vc(m), m === c)) {
                        C = null;
                        break;
                      }
                      if (p !== null) {
                        ((p.return = S), (C = p));
                        break;
                      }
                      C = S;
                    }
                }
              }
              var k = o.alternate;
              if (k !== null) {
                var x = k.child;
                if (x !== null) {
                  k.child = null;
                  do {
                    var I = x.sibling;
                    ((x.sibling = null), (x = I));
                  } while (x !== null);
                }
              }
              C = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) ((i.return = o), (C = i));
          else
            e: for (; C !== null; ) {
              if (((o = C), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Gn(9, o, o.return);
                }
              var f = o.sibling;
              if (f !== null) {
                ((f.return = o.return), (C = f));
                break e;
              }
              C = o.return;
            }
        }
        var a = e.current;
        for (C = a; C !== null; ) {
          i = C;
          var d = i.child;
          if (i.subtreeFlags & 2064 && d !== null) ((d.return = i), (C = d));
          else
            e: for (i = a; C !== null; ) {
              if (((u = C), u.flags & 2048))
                try {
                  switch (u.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ll(9, u);
                  }
                } catch (E) {
                  Y(u, u.return, E);
                }
              if (u === i) {
                C = null;
                break e;
              }
              var g = u.sibling;
              if (g !== null) {
                ((g.return = u.return), (C = g));
                break e;
              }
              C = u.return;
            }
        }
        if (
          ((j = l), Rt(), Ye && typeof Ye.onPostCommitFiberRoot == 'function')
        )
          try {
            Ye.onPostCommitFiberRoot(xl, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      ((D = n), (Me.transition = t));
    }
  }
  return !1;
}
function cs(e, t, n) {
  ((t = kn(n, t)),
    (t = oc(e, t, 1)),
    (e = Et(e, t, 1)),
    (t = pe()),
    e !== null && (pr(e, 1, t), Se(e, t)));
}
function Y(e, t, n) {
  if (e.tag === 3) cs(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        cs(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == 'function' ||
          (typeof r.componentDidCatch == 'function' &&
            (Ct === null || !Ct.has(r)))
        ) {
          ((e = kn(n, e)),
            (e = ic(t, e, 1)),
            (t = Et(t, e, 1)),
            (e = pe()),
            t !== null && (pr(t, 1, e), Se(t, e)));
          break;
        }
      }
      t = t.return;
    }
}
function sp(e, t, n) {
  var r = e.pingCache;
  (r !== null && r.delete(t),
    (t = pe()),
    (e.pingedLanes |= e.suspendedLanes & n),
    re === e &&
      (ie & n) === n &&
      (te === 4 || (te === 3 && (ie & 130023424) === ie && 500 > Z() - Yi)
        ? At(e, 0)
        : (Ki |= n)),
    Se(e, t));
}
function zc(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = _r), (_r <<= 1), !(_r & 130023424) && (_r = 4194304))
      : (t = 1));
  var n = pe();
  ((e = ot(e, t)), e !== null && (pr(e, t, n), Se(e, n)));
}
function ap(e) {
  var t = e.memoizedState,
    n = 0;
  (t !== null && (n = t.retryLane), zc(e, n));
}
function cp(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(w(314));
  }
  (r !== null && r.delete(t), zc(e, n));
}
var Pc;
Pc = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || we.current) ye = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return ((ye = !1), Jd(e, t, n));
      ye = !!(e.flags & 131072);
    }
  else ((ye = !1), B && t.flags & 1048576 && Ra(t, al, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      (Kr(e, t), (e = t.pendingProps));
      var l = vn(t, fe.current);
      (pn(t, n), (l = $i(null, t, r, e, l, n)));
      var o = Bi();
      return (
        (t.flags |= 1),
        typeof l == 'object' &&
        l !== null &&
        typeof l.render == 'function' &&
        l.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            ke(r) ? ((o = !0), ul(t)) : (o = !1),
            (t.memoizedState =
              l.state !== null && l.state !== void 0 ? l.state : null),
            Fi(t),
            (l.updater = Tl),
            (t.stateNode = l),
            (l._reactInternals = t),
            Qo(t, r, e, n),
            (t = Yo(null, t, r, !0, o, n)))
          : ((t.tag = 0), B && o && Ti(t), de(null, t, l, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Kr(e, t),
          (e = t.pendingProps),
          (l = r._init),
          (r = l(r._payload)),
          (t.type = r),
          (l = t.tag = dp(r)),
          (e = De(r, e)),
          l)
        ) {
          case 0:
            t = Ko(null, t, r, e, n);
            break e;
          case 1:
            t = es(null, t, r, e, n);
            break e;
          case 11:
            t = qu(null, t, r, e, n);
            break e;
          case 14:
            t = bu(null, t, r, De(r.type, e), n);
            break e;
        }
        throw Error(w(306, r, ''));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : De(r, l)),
        Ko(e, t, r, l, n)
      );
    case 1:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : De(r, l)),
        es(e, t, r, l, n)
      );
    case 3:
      e: {
        if ((cc(t), e === null)) throw Error(w(387));
        ((r = t.pendingProps),
          (o = t.memoizedState),
          (l = o.element),
          Da(e, t),
          dl(t, r, null, n));
        var i = t.memoizedState;
        if (((r = i.element), o.isDehydrated))
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: i.cache,
              pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
              transitions: i.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            ((l = kn(Error(w(423)), t)), (t = ts(e, t, r, n, l)));
            break e;
          } else if (r !== l) {
            ((l = kn(Error(w(424)), t)), (t = ts(e, t, r, n, l)));
            break e;
          } else
            for (
              Ce = xt(t.stateNode.containerInfo.firstChild),
                _e = t,
                B = !0,
                Ue = null,
                n = ja(t, null, r, n),
                t.child = n;
              n;

            )
              ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
        else {
          if ((gn(), r === l)) {
            t = it(e, t, n);
            break e;
          }
          de(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Aa(t),
        e === null && Bo(t),
        (r = t.type),
        (l = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (i = l.children),
        Do(r, l) ? (i = null) : o !== null && Do(r, o) && (t.flags |= 32),
        ac(e, t),
        de(e, t, i, n),
        t.child
      );
    case 6:
      return (e === null && Bo(t), null);
    case 13:
      return fc(e, t, n);
    case 4:
      return (
        Di(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = yn(t, null, r, n)) : de(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : De(r, l)),
        qu(e, t, r, l, n)
      );
    case 7:
      return (de(e, t, t.pendingProps, n), t.child);
    case 8:
      return (de(e, t, t.pendingProps.children, n), t.child);
    case 12:
      return (de(e, t, t.pendingProps.children, n), t.child);
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (l = t.pendingProps),
          (o = t.memoizedProps),
          (i = l.value),
          A(cl, r._currentValue),
          (r._currentValue = i),
          o !== null)
        )
          if (Be(o.value, i)) {
            if (o.children === l.children && !we.current) {
              t = it(e, t, n);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var u = o.dependencies;
              if (u !== null) {
                i = o.child;
                for (var s = u.firstContext; s !== null; ) {
                  if (s.context === r) {
                    if (o.tag === 1) {
                      ((s = nt(-1, n & -n)), (s.tag = 2));
                      var c = o.updateQueue;
                      if (c !== null) {
                        c = c.shared;
                        var m = c.pending;
                        (m === null
                          ? (s.next = s)
                          : ((s.next = m.next), (m.next = s)),
                          (c.pending = s));
                      }
                    }
                    ((o.lanes |= n),
                      (s = o.alternate),
                      s !== null && (s.lanes |= n),
                      Wo(o.return, n, t),
                      (u.lanes |= n));
                    break;
                  }
                  s = s.next;
                }
              } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((i = o.return), i === null)) throw Error(w(341));
                ((i.lanes |= n),
                  (u = i.alternate),
                  u !== null && (u.lanes |= n),
                  Wo(i, n, t),
                  (i = o.sibling));
              } else i = o.child;
              if (i !== null) i.return = o;
              else
                for (i = o; i !== null; ) {
                  if (i === t) {
                    i = null;
                    break;
                  }
                  if (((o = i.sibling), o !== null)) {
                    ((o.return = i.return), (i = o));
                    break;
                  }
                  i = i.return;
                }
              o = i;
            }
        (de(e, t, l.children, n), (t = t.child));
      }
      return t;
    case 9:
      return (
        (l = t.type),
        (r = t.pendingProps.children),
        pn(t, n),
        (l = Oe(l)),
        (r = r(l)),
        (t.flags |= 1),
        de(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (l = De(r, t.pendingProps)),
        (l = De(r.type, l)),
        bu(e, t, r, l, n)
      );
    case 15:
      return uc(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : De(r, l)),
        Kr(e, t),
        (t.tag = 1),
        ke(r) ? ((e = !0), ul(t)) : (e = !1),
        pn(t, n),
        lc(t, r, l),
        Qo(t, r, l, n),
        Yo(null, t, r, !0, e, n)
      );
    case 19:
      return dc(e, t, n);
    case 22:
      return sc(e, t, n);
  }
  throw Error(w(156, t.tag));
};
function Nc(e, t) {
  return ta(e, t);
}
function fp(e, t, n, r) {
  ((this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function Re(e, t, n, r) {
  return new fp(e, t, n, r);
}
function qi(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function dp(e) {
  if (typeof e == 'function') return qi(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === gi)) return 11;
    if (e === yi) return 14;
  }
  return 2;
}
function zt(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Re(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function Zr(e, t, n, r, l, o) {
  var i = 2;
  if (((r = e), typeof e == 'function')) qi(e) && (i = 1);
  else if (typeof e == 'string') i = 5;
  else
    e: switch (e) {
      case Jt:
        return Ut(n.children, l, o, t);
      case vi:
        ((i = 8), (l |= 8));
        break;
      case ho:
        return (
          (e = Re(12, n, t, l | 2)),
          (e.elementType = ho),
          (e.lanes = o),
          e
        );
      case vo:
        return ((e = Re(13, n, t, l)), (e.elementType = vo), (e.lanes = o), e);
      case go:
        return ((e = Re(19, n, t, l)), (e.elementType = go), (e.lanes = o), e);
      case As:
        return Ml(n, l, o, t);
      default:
        if (typeof e == 'object' && e !== null)
          switch (e.$$typeof) {
            case Fs:
              i = 10;
              break e;
            case Ds:
              i = 9;
              break e;
            case gi:
              i = 11;
              break e;
            case yi:
              i = 14;
              break e;
            case pt:
              ((i = 16), (r = null));
              break e;
          }
        throw Error(w(130, e == null ? e : typeof e, ''));
    }
  return (
    (t = Re(i, n, t, l)),
    (t.elementType = e),
    (t.type = r),
    (t.lanes = o),
    t
  );
}
function Ut(e, t, n, r) {
  return ((e = Re(7, e, r, t)), (e.lanes = n), e);
}
function Ml(e, t, n, r) {
  return (
    (e = Re(22, e, r, t)),
    (e.elementType = As),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function so(e, t, n) {
  return ((e = Re(6, e, null, t)), (e.lanes = n), e);
}
function ao(e, t, n) {
  return (
    (t = Re(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function pp(e, t, n, r, l) {
  ((this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Wl(0)),
    (this.expirationTimes = Wl(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Wl(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = l),
    (this.mutableSourceEagerHydrationData = null));
}
function bi(e, t, n, r, l, o, i, u, s) {
  return (
    (e = new pp(e, t, n, u, s)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = Re(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Fi(o),
    e
  );
}
function mp(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Zt,
    key: r == null ? null : '' + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function Tc(e) {
  if (!e) return Nt;
  e = e._reactInternals;
  e: {
    if (Gt(e) !== e || e.tag !== 1) throw Error(w(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (ke(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(w(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (ke(n)) return Ta(e, n, t);
  }
  return t;
}
function Lc(e, t, n, r, l, o, i, u, s) {
  return (
    (e = bi(n, r, !0, e, l, o, i, u, s)),
    (e.context = Tc(null)),
    (n = e.current),
    (r = pe()),
    (l = _t(n)),
    (o = nt(r, l)),
    (o.callback = t ?? null),
    Et(n, o, l),
    (e.current.lanes = l),
    pr(e, l, r),
    Se(e, r),
    e
  );
}
function Ol(e, t, n, r) {
  var l = t.current,
    o = pe(),
    i = _t(l);
  return (
    (n = Tc(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = nt(o, i)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = Et(l, t, i)),
    e !== null && ($e(e, l, i, o), Hr(e, l, i)),
    i
  );
}
function kl(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function fs(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function eu(e, t) {
  (fs(e, t), (e = e.alternate) && fs(e, t));
}
function hp() {
  return null;
}
var Rc =
  typeof reportError == 'function'
    ? reportError
    : function (e) {
        console.error(e);
      };
function tu(e) {
  this._internalRoot = e;
}
Il.prototype.render = tu.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(w(409));
  Ol(e, t, null, null);
};
Il.prototype.unmount = tu.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    (Ht(function () {
      Ol(null, e, null, null);
    }),
      (t[lt] = null));
  }
};
function Il(e) {
  this._internalRoot = e;
}
Il.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = sa();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < ht.length && t !== 0 && t < ht[n].priority; n++);
    (ht.splice(n, 0, e), n === 0 && ca(e));
  }
};
function nu(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function jl(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== ' react-mount-point-unstable '))
  );
}
function ds() {}
function vp(e, t, n, r, l) {
  if (l) {
    if (typeof r == 'function') {
      var o = r;
      r = function () {
        var c = kl(i);
        o.call(c);
      };
    }
    var i = Lc(t, r, e, 0, null, !1, !1, '', ds);
    return (
      (e._reactRootContainer = i),
      (e[lt] = i.current),
      rr(e.nodeType === 8 ? e.parentNode : e),
      Ht(),
      i
    );
  }
  for (; (l = e.lastChild); ) e.removeChild(l);
  if (typeof r == 'function') {
    var u = r;
    r = function () {
      var c = kl(s);
      u.call(c);
    };
  }
  var s = bi(e, 0, !1, null, null, !1, !1, '', ds);
  return (
    (e._reactRootContainer = s),
    (e[lt] = s.current),
    rr(e.nodeType === 8 ? e.parentNode : e),
    Ht(function () {
      Ol(t, s, n, r);
    }),
    s
  );
}
function Fl(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == 'function') {
      var u = l;
      l = function () {
        var s = kl(i);
        u.call(s);
      };
    }
    Ol(t, i, e, l);
  } else i = vp(n, t, e, l, r);
  return kl(i);
}
ia = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = An(t.pendingLanes);
        n !== 0 &&
          (Si(t, n | 1), Se(t, Z()), !(j & 6) && ((Sn = Z() + 500), Rt()));
      }
      break;
    case 13:
      (Ht(function () {
        var r = ot(e, 1);
        if (r !== null) {
          var l = pe();
          $e(r, e, 1, l);
        }
      }),
        eu(e, 1));
  }
};
xi = function (e) {
  if (e.tag === 13) {
    var t = ot(e, 134217728);
    if (t !== null) {
      var n = pe();
      $e(t, e, 134217728, n);
    }
    eu(e, 134217728);
  }
};
ua = function (e) {
  if (e.tag === 13) {
    var t = _t(e),
      n = ot(e, t);
    if (n !== null) {
      var r = pe();
      $e(n, e, t, r);
    }
    eu(e, t);
  }
};
sa = function () {
  return D;
};
aa = function (e, t) {
  var n = D;
  try {
    return ((D = e), t());
  } finally {
    D = n;
  }
};
Po = function (e, t, n) {
  switch (t) {
    case 'input':
      if ((ko(e, n), (t = n.name), n.type === 'radio' && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            'input[name=' + JSON.stringify('' + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = zl(r);
            if (!l) throw Error(w(90));
            (Vs(r), ko(r, l));
          }
        }
      }
      break;
    case 'textarea':
      Bs(e, n);
      break;
    case 'select':
      ((t = n.value), t != null && an(e, !!n.multiple, t, !1));
  }
};
Xs = Xi;
Zs = Ht;
var gp = { usingClientEntryPoint: !1, Events: [hr, tn, zl, Ks, Ys, Xi] },
  In = {
    findFiberByHostInstance: jt,
    bundleType: 0,
    version: '18.3.1',
    rendererPackageName: 'react-dom',
  },
  yp = {
    bundleType: In.bundleType,
    version: In.version,
    rendererPackageName: In.rendererPackageName,
    rendererConfig: In.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: ut.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return ((e = bs(e)), e === null ? null : e.stateNode);
    },
    findFiberByHostInstance: In.findFiberByHostInstance || hp,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
  var Fr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Fr.isDisabled && Fr.supportsFiber)
    try {
      ((xl = Fr.inject(yp)), (Ye = Fr));
    } catch {}
}
Pe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = gp;
Pe.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!nu(t)) throw Error(w(200));
  return mp(e, t, null, n);
};
Pe.createRoot = function (e, t) {
  if (!nu(e)) throw Error(w(299));
  var n = !1,
    r = '',
    l = Rc;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    (t = bi(e, 1, !1, null, null, n, !1, r, l)),
    (e[lt] = t.current),
    rr(e.nodeType === 8 ? e.parentNode : e),
    new tu(t)
  );
};
Pe.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == 'function'
      ? Error(w(188))
      : ((e = Object.keys(e).join(',')), Error(w(268, e)));
  return ((e = bs(t)), (e = e === null ? null : e.stateNode), e);
};
Pe.flushSync = function (e) {
  return Ht(e);
};
Pe.hydrate = function (e, t, n) {
  if (!jl(t)) throw Error(w(200));
  return Fl(null, e, t, !0, n);
};
Pe.hydrateRoot = function (e, t, n) {
  if (!nu(e)) throw Error(w(405));
  var r = (n != null && n.hydratedSources) || null,
    l = !1,
    o = '',
    i = Rc;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (l = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
    (t = Lc(t, null, e, 1, n ?? null, l, !1, o, i)),
    (e[lt] = t.current),
    rr(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      ((n = r[e]),
        (l = n._getVersion),
        (l = l(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, l])
          : t.mutableSourceEagerHydrationData.push(n, l));
  return new Il(t);
};
Pe.render = function (e, t, n) {
  if (!jl(t)) throw Error(w(200));
  return Fl(null, e, t, !1, n);
};
Pe.unmountComponentAtNode = function (e) {
  if (!jl(e)) throw Error(w(40));
  return e._reactRootContainer
    ? (Ht(function () {
        Fl(null, null, e, !1, function () {
          ((e._reactRootContainer = null), (e[lt] = null));
        });
      }),
      !0)
    : !1;
};
Pe.unstable_batchedUpdates = Xi;
Pe.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!jl(n)) throw Error(w(200));
  if (e == null || e._reactInternals === void 0) throw Error(w(38));
  return Fl(e, t, n, !1, r);
};
Pe.version = '18.3.1-next-f1338f8080-20240426';
function Mc() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Mc);
    } catch (e) {
      console.error(e);
    }
}
(Mc(), (Ms.exports = Pe));
var wp = Ms.exports,
  ps = wp;
((po.createRoot = ps.createRoot), (po.hydrateRoot = ps.hydrateRoot));
function ms(e, t) {
  if (typeof e == 'function') return e(t);
  e != null && (e.current = t);
}
function kp(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((l) => {
      const o = ms(l, t);
      return (!n && typeof o == 'function' && (n = !0), o);
    });
    if (n)
      return () => {
        for (let l = 0; l < r.length; l++) {
          const o = r[l];
          typeof o == 'function' ? o() : ms(e[l], null);
        }
      };
  };
}
function Sp(e) {
  const t = Ep(e),
    n = oe.forwardRef((r, l) => {
      const { children: o, ...i } = r,
        u = oe.Children.toArray(o),
        s = u.find(_p);
      if (s) {
        const c = s.props.children,
          m = u.map((h) =>
            h === s
              ? oe.Children.count(c) > 1
                ? oe.Children.only(null)
                : oe.isValidElement(c)
                  ? c.props.children
                  : null
              : h
          );
        return be.jsx(t, {
          ...i,
          ref: l,
          children: oe.isValidElement(c) ? oe.cloneElement(c, void 0, m) : null,
        });
      }
      return be.jsx(t, { ...i, ref: l, children: o });
    });
  return ((n.displayName = `${e}.Slot`), n);
}
var xp = Sp('Slot');
function Ep(e) {
  const t = oe.forwardRef((n, r) => {
    const { children: l, ...o } = n;
    if (oe.isValidElement(l)) {
      const i = Pp(l),
        u = zp(o, l.props);
      return (
        l.type !== oe.Fragment && (u.ref = r ? kp(r, i) : i),
        oe.cloneElement(l, u)
      );
    }
    return oe.Children.count(l) > 1 ? oe.Children.only(null) : null;
  });
  return ((t.displayName = `${e}.SlotClone`), t);
}
var Cp = Symbol('radix.slottable');
function _p(e) {
  return (
    oe.isValidElement(e) &&
    typeof e.type == 'function' &&
    '__radixId' in e.type &&
    e.type.__radixId === Cp
  );
}
function zp(e, t) {
  const n = { ...t };
  for (const r in t) {
    const l = e[r],
      o = t[r];
    /^on[A-Z]/.test(r)
      ? l && o
        ? (n[r] = (...u) => {
            const s = o(...u);
            return (l(...u), s);
          })
        : l && (n[r] = l)
      : r === 'style'
        ? (n[r] = { ...l, ...o })
        : r === 'className' && (n[r] = [l, o].filter(Boolean).join(' '));
  }
  return { ...e, ...n };
}
function Pp(e) {
  var r, l;
  let t =
      (r = Object.getOwnPropertyDescriptor(e.props, 'ref')) == null
        ? void 0
        : r.get,
    n = t && 'isReactWarning' in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t =
        (l = Object.getOwnPropertyDescriptor(e, 'ref')) == null
          ? void 0
          : l.get),
      (n = t && 'isReactWarning' in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
function Oc(e) {
  var t,
    n,
    r = '';
  if (typeof e == 'string' || typeof e == 'number') r += e;
  else if (typeof e == 'object')
    if (Array.isArray(e)) {
      var l = e.length;
      for (t = 0; t < l; t++)
        e[t] && (n = Oc(e[t])) && (r && (r += ' '), (r += n));
    } else for (n in e) e[n] && (r && (r += ' '), (r += n));
  return r;
}
function Ic() {
  for (var e, t, n = 0, r = '', l = arguments.length; n < l; n++)
    (e = arguments[n]) && (t = Oc(e)) && (r && (r += ' '), (r += t));
  return r;
}
const ru = '-',
  Np = (e) => {
    const t = Lp(e),
      { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
    return {
      getClassGroupId: (i) => {
        const u = i.split(ru);
        return (u[0] === '' && u.length !== 1 && u.shift(), jc(u, t) || Tp(i));
      },
      getConflictingClassGroupIds: (i, u) => {
        const s = n[i] || [];
        return u && r[i] ? [...s, ...r[i]] : s;
      },
    };
  },
  jc = (e, t) => {
    var i;
    if (e.length === 0) return t.classGroupId;
    const n = e[0],
      r = t.nextPart.get(n),
      l = r ? jc(e.slice(1), r) : void 0;
    if (l) return l;
    if (t.validators.length === 0) return;
    const o = e.join(ru);
    return (i = t.validators.find(({ validator: u }) => u(o))) == null
      ? void 0
      : i.classGroupId;
  },
  hs = /^\[(.+)\]$/,
  Tp = (e) => {
    if (hs.test(e)) {
      const t = hs.exec(e)[1],
        n = t == null ? void 0 : t.substring(0, t.indexOf(':'));
      if (n) return 'arbitrary..' + n;
    }
  },
  Lp = (e) => {
    const { theme: t, classGroups: n } = e,
      r = { nextPart: new Map(), validators: [] };
    for (const l in n) ii(n[l], r, l, t);
    return r;
  },
  ii = (e, t, n, r) => {
    e.forEach((l) => {
      if (typeof l == 'string') {
        const o = l === '' ? t : vs(t, l);
        o.classGroupId = n;
        return;
      }
      if (typeof l == 'function') {
        if (Rp(l)) {
          ii(l(r), t, n, r);
          return;
        }
        t.validators.push({ validator: l, classGroupId: n });
        return;
      }
      Object.entries(l).forEach(([o, i]) => {
        ii(i, vs(t, o), n, r);
      });
    });
  },
  vs = (e, t) => {
    let n = e;
    return (
      t.split(ru).forEach((r) => {
        (n.nextPart.has(r) ||
          n.nextPart.set(r, { nextPart: new Map(), validators: [] }),
          (n = n.nextPart.get(r)));
      }),
      n
    );
  },
  Rp = (e) => e.isThemeGetter,
  Mp = (e) => {
    if (e < 1) return { get: () => {}, set: () => {} };
    let t = 0,
      n = new Map(),
      r = new Map();
    const l = (o, i) => {
      (n.set(o, i), t++, t > e && ((t = 0), (r = n), (n = new Map())));
    };
    return {
      get(o) {
        let i = n.get(o);
        if (i !== void 0) return i;
        if ((i = r.get(o)) !== void 0) return (l(o, i), i);
      },
      set(o, i) {
        n.has(o) ? n.set(o, i) : l(o, i);
      },
    };
  },
  ui = '!',
  si = ':',
  Op = si.length,
  Ip = (e) => {
    const { prefix: t, experimentalParseClassName: n } = e;
    let r = (l) => {
      const o = [];
      let i = 0,
        u = 0,
        s = 0,
        c;
      for (let k = 0; k < l.length; k++) {
        let x = l[k];
        if (i === 0 && u === 0) {
          if (x === si) {
            (o.push(l.slice(s, k)), (s = k + Op));
            continue;
          }
          if (x === '/') {
            c = k;
            continue;
          }
        }
        x === '[' ? i++ : x === ']' ? i-- : x === '(' ? u++ : x === ')' && u--;
      }
      const m = o.length === 0 ? l : l.substring(s),
        h = jp(m),
        p = h !== m,
        S = c && c > s ? c - s : void 0;
      return {
        modifiers: o,
        hasImportantModifier: p,
        baseClassName: h,
        maybePostfixModifierPosition: S,
      };
    };
    if (t) {
      const l = t + si,
        o = r;
      r = (i) =>
        i.startsWith(l)
          ? o(i.substring(l.length))
          : {
              isExternal: !0,
              modifiers: [],
              hasImportantModifier: !1,
              baseClassName: i,
              maybePostfixModifierPosition: void 0,
            };
    }
    if (n) {
      const l = r;
      r = (o) => n({ className: o, parseClassName: l });
    }
    return r;
  },
  jp = (e) =>
    e.endsWith(ui)
      ? e.substring(0, e.length - 1)
      : e.startsWith(ui)
        ? e.substring(1)
        : e,
  Fp = (e) => {
    const t = Object.fromEntries(e.orderSensitiveModifiers.map((r) => [r, !0]));
    return (r) => {
      if (r.length <= 1) return r;
      const l = [];
      let o = [];
      return (
        r.forEach((i) => {
          i[0] === '[' || t[i] ? (l.push(...o.sort(), i), (o = [])) : o.push(i);
        }),
        l.push(...o.sort()),
        l
      );
    };
  },
  Dp = (e) => ({
    cache: Mp(e.cacheSize),
    parseClassName: Ip(e),
    sortModifiers: Fp(e),
    ...Np(e),
  }),
  Ap = /\s+/,
  Up = (e, t) => {
    const {
        parseClassName: n,
        getClassGroupId: r,
        getConflictingClassGroupIds: l,
        sortModifiers: o,
      } = t,
      i = [],
      u = e.trim().split(Ap);
    let s = '';
    for (let c = u.length - 1; c >= 0; c -= 1) {
      const m = u[c],
        {
          isExternal: h,
          modifiers: p,
          hasImportantModifier: S,
          baseClassName: k,
          maybePostfixModifierPosition: x,
        } = n(m);
      if (h) {
        s = m + (s.length > 0 ? ' ' + s : s);
        continue;
      }
      let I = !!x,
        f = r(I ? k.substring(0, x) : k);
      if (!f) {
        if (!I) {
          s = m + (s.length > 0 ? ' ' + s : s);
          continue;
        }
        if (((f = r(k)), !f)) {
          s = m + (s.length > 0 ? ' ' + s : s);
          continue;
        }
        I = !1;
      }
      const a = o(p).join(':'),
        d = S ? a + ui : a,
        g = d + f;
      if (i.includes(g)) continue;
      i.push(g);
      const E = l(f, I);
      for (let _ = 0; _ < E.length; ++_) {
        const N = E[_];
        i.push(d + N);
      }
      s = m + (s.length > 0 ? ' ' + s : s);
    }
    return s;
  };
function Vp() {
  let e = 0,
    t,
    n,
    r = '';
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Fc(t)) && (r && (r += ' '), (r += n));
  return r;
}
const Fc = (e) => {
  if (typeof e == 'string') return e;
  let t,
    n = '';
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Fc(e[r])) && (n && (n += ' '), (n += t));
  return n;
};
function $p(e, ...t) {
  let n,
    r,
    l,
    o = i;
  function i(s) {
    const c = t.reduce((m, h) => h(m), e());
    return ((n = Dp(c)), (r = n.cache.get), (l = n.cache.set), (o = u), u(s));
  }
  function u(s) {
    const c = r(s);
    if (c) return c;
    const m = Up(s, n);
    return (l(s, m), m);
  }
  return function () {
    return o(Vp.apply(null, arguments));
  };
}
const b = (e) => {
    const t = (n) => n[e] || [];
    return ((t.isThemeGetter = !0), t);
  },
  Dc = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  Ac = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  Bp = /^\d+\/\d+$/,
  Wp = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  Hp =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  Qp = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  Gp = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  Kp =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Xt = (e) => Bp.test(e),
  R = (e) => !!e && !Number.isNaN(Number(e)),
  dt = (e) => !!e && Number.isInteger(Number(e)),
  co = (e) => e.endsWith('%') && R(e.slice(0, -1)),
  Ze = (e) => Wp.test(e),
  Yp = () => !0,
  Xp = (e) => Hp.test(e) && !Qp.test(e),
  Uc = () => !1,
  Zp = (e) => Gp.test(e),
  Jp = (e) => Kp.test(e),
  qp = (e) => !z(e) && !P(e),
  bp = (e) => _n(e, Bc, Uc),
  z = (e) => Dc.test(e),
  Mt = (e) => _n(e, Wc, Xp),
  fo = (e) => _n(e, lm, R),
  gs = (e) => _n(e, Vc, Uc),
  em = (e) => _n(e, $c, Jp),
  Dr = (e) => _n(e, Hc, Zp),
  P = (e) => Ac.test(e),
  jn = (e) => zn(e, Wc),
  tm = (e) => zn(e, om),
  ys = (e) => zn(e, Vc),
  nm = (e) => zn(e, Bc),
  rm = (e) => zn(e, $c),
  Ar = (e) => zn(e, Hc, !0),
  _n = (e, t, n) => {
    const r = Dc.exec(e);
    return r ? (r[1] ? t(r[1]) : n(r[2])) : !1;
  },
  zn = (e, t, n = !1) => {
    const r = Ac.exec(e);
    return r ? (r[1] ? t(r[1]) : n) : !1;
  },
  Vc = (e) => e === 'position' || e === 'percentage',
  $c = (e) => e === 'image' || e === 'url',
  Bc = (e) => e === 'length' || e === 'size' || e === 'bg-size',
  Wc = (e) => e === 'length',
  lm = (e) => e === 'number',
  om = (e) => e === 'family-name',
  Hc = (e) => e === 'shadow',
  im = () => {
    const e = b('color'),
      t = b('font'),
      n = b('text'),
      r = b('font-weight'),
      l = b('tracking'),
      o = b('leading'),
      i = b('breakpoint'),
      u = b('container'),
      s = b('spacing'),
      c = b('radius'),
      m = b('shadow'),
      h = b('inset-shadow'),
      p = b('text-shadow'),
      S = b('drop-shadow'),
      k = b('blur'),
      x = b('perspective'),
      I = b('aspect'),
      f = b('ease'),
      a = b('animate'),
      d = () => [
        'auto',
        'avoid',
        'all',
        'avoid-page',
        'page',
        'left',
        'right',
        'column',
      ],
      g = () => [
        'center',
        'top',
        'bottom',
        'left',
        'right',
        'top-left',
        'left-top',
        'top-right',
        'right-top',
        'bottom-right',
        'right-bottom',
        'bottom-left',
        'left-bottom',
      ],
      E = () => [...g(), P, z],
      _ = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'],
      N = () => ['auto', 'contain', 'none'],
      y = () => [P, z, s],
      F = () => [Xt, 'full', 'auto', ...y()],
      M = () => [dt, 'none', 'subgrid', P, z],
      ve = () => ['auto', { span: ['full', dt, P, z] }, dt, P, z],
      We = () => [dt, 'auto', P, z],
      st = () => ['auto', 'min', 'max', 'fr', P, z],
      Kt = () => [
        'start',
        'end',
        'center',
        'between',
        'around',
        'evenly',
        'stretch',
        'baseline',
        'center-safe',
        'end-safe',
      ],
      at = () => [
        'start',
        'end',
        'center',
        'stretch',
        'center-safe',
        'end-safe',
      ],
      xe = () => ['auto', ...y()],
      je = () => [
        Xt,
        'auto',
        'full',
        'dvw',
        'dvh',
        'lvw',
        'lvh',
        'svw',
        'svh',
        'min',
        'max',
        'fit',
        ...y(),
      ],
      v = () => [e, P, z],
      T = () => [...g(), ys, gs, { position: [P, z] }],
      L = () => ['no-repeat', { repeat: ['', 'x', 'y', 'space', 'round'] }],
      $ = () => ['auto', 'cover', 'contain', nm, bp, { size: [P, z] }],
      K = () => [co, jn, Mt],
      J = () => ['', 'none', 'full', c, P, z],
      X = () => ['', R, jn, Mt],
      ct = () => ['solid', 'dashed', 'dotted', 'double'],
      He = () => [
        'normal',
        'multiply',
        'screen',
        'overlay',
        'darken',
        'lighten',
        'color-dodge',
        'color-burn',
        'hard-light',
        'soft-light',
        'difference',
        'exclusion',
        'hue',
        'saturation',
        'color',
        'luminosity',
      ],
      W = () => [R, co, ys, gs],
      lu = () => ['', 'none', k, P, z],
      gr = () => ['none', R, P, z],
      yr = () => ['none', R, P, z],
      Dl = () => [R, P, z],
      wr = () => [Xt, 'full', ...y()];
    return {
      cacheSize: 500,
      theme: {
        animate: ['spin', 'ping', 'pulse', 'bounce'],
        aspect: ['video'],
        blur: [Ze],
        breakpoint: [Ze],
        color: [Yp],
        container: [Ze],
        'drop-shadow': [Ze],
        ease: ['in', 'out', 'in-out'],
        font: [qp],
        'font-weight': [
          'thin',
          'extralight',
          'light',
          'normal',
          'medium',
          'semibold',
          'bold',
          'extrabold',
          'black',
        ],
        'inset-shadow': [Ze],
        leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
        perspective: [
          'dramatic',
          'near',
          'normal',
          'midrange',
          'distant',
          'none',
        ],
        radius: [Ze],
        shadow: [Ze],
        spacing: ['px', R],
        text: [Ze],
        'text-shadow': [Ze],
        tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'],
      },
      classGroups: {
        aspect: [{ aspect: ['auto', 'square', Xt, z, P, I] }],
        container: ['container'],
        columns: [{ columns: [R, z, P, u] }],
        'break-after': [{ 'break-after': d() }],
        'break-before': [{ 'break-before': d() }],
        'break-inside': [
          { 'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column'] },
        ],
        'box-decoration': [{ 'box-decoration': ['slice', 'clone'] }],
        box: [{ box: ['border', 'content'] }],
        display: [
          'block',
          'inline-block',
          'inline',
          'flex',
          'inline-flex',
          'table',
          'inline-table',
          'table-caption',
          'table-cell',
          'table-column',
          'table-column-group',
          'table-footer-group',
          'table-header-group',
          'table-row-group',
          'table-row',
          'flow-root',
          'grid',
          'inline-grid',
          'contents',
          'list-item',
          'hidden',
        ],
        sr: ['sr-only', 'not-sr-only'],
        float: [{ float: ['right', 'left', 'none', 'start', 'end'] }],
        clear: [{ clear: ['left', 'right', 'both', 'none', 'start', 'end'] }],
        isolation: ['isolate', 'isolation-auto'],
        'object-fit': [
          { object: ['contain', 'cover', 'fill', 'none', 'scale-down'] },
        ],
        'object-position': [{ object: E() }],
        overflow: [{ overflow: _() }],
        'overflow-x': [{ 'overflow-x': _() }],
        'overflow-y': [{ 'overflow-y': _() }],
        overscroll: [{ overscroll: N() }],
        'overscroll-x': [{ 'overscroll-x': N() }],
        'overscroll-y': [{ 'overscroll-y': N() }],
        position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
        inset: [{ inset: F() }],
        'inset-x': [{ 'inset-x': F() }],
        'inset-y': [{ 'inset-y': F() }],
        start: [{ start: F() }],
        end: [{ end: F() }],
        top: [{ top: F() }],
        right: [{ right: F() }],
        bottom: [{ bottom: F() }],
        left: [{ left: F() }],
        visibility: ['visible', 'invisible', 'collapse'],
        z: [{ z: [dt, 'auto', P, z] }],
        basis: [{ basis: [Xt, 'full', 'auto', u, ...y()] }],
        'flex-direction': [
          { flex: ['row', 'row-reverse', 'col', 'col-reverse'] },
        ],
        'flex-wrap': [{ flex: ['nowrap', 'wrap', 'wrap-reverse'] }],
        flex: [{ flex: [R, Xt, 'auto', 'initial', 'none', z] }],
        grow: [{ grow: ['', R, P, z] }],
        shrink: [{ shrink: ['', R, P, z] }],
        order: [{ order: [dt, 'first', 'last', 'none', P, z] }],
        'grid-cols': [{ 'grid-cols': M() }],
        'col-start-end': [{ col: ve() }],
        'col-start': [{ 'col-start': We() }],
        'col-end': [{ 'col-end': We() }],
        'grid-rows': [{ 'grid-rows': M() }],
        'row-start-end': [{ row: ve() }],
        'row-start': [{ 'row-start': We() }],
        'row-end': [{ 'row-end': We() }],
        'grid-flow': [
          { 'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'] },
        ],
        'auto-cols': [{ 'auto-cols': st() }],
        'auto-rows': [{ 'auto-rows': st() }],
        gap: [{ gap: y() }],
        'gap-x': [{ 'gap-x': y() }],
        'gap-y': [{ 'gap-y': y() }],
        'justify-content': [{ justify: [...Kt(), 'normal'] }],
        'justify-items': [{ 'justify-items': [...at(), 'normal'] }],
        'justify-self': [{ 'justify-self': ['auto', ...at()] }],
        'align-content': [{ content: ['normal', ...Kt()] }],
        'align-items': [{ items: [...at(), { baseline: ['', 'last'] }] }],
        'align-self': [{ self: ['auto', ...at(), { baseline: ['', 'last'] }] }],
        'place-content': [{ 'place-content': Kt() }],
        'place-items': [{ 'place-items': [...at(), 'baseline'] }],
        'place-self': [{ 'place-self': ['auto', ...at()] }],
        p: [{ p: y() }],
        px: [{ px: y() }],
        py: [{ py: y() }],
        ps: [{ ps: y() }],
        pe: [{ pe: y() }],
        pt: [{ pt: y() }],
        pr: [{ pr: y() }],
        pb: [{ pb: y() }],
        pl: [{ pl: y() }],
        m: [{ m: xe() }],
        mx: [{ mx: xe() }],
        my: [{ my: xe() }],
        ms: [{ ms: xe() }],
        me: [{ me: xe() }],
        mt: [{ mt: xe() }],
        mr: [{ mr: xe() }],
        mb: [{ mb: xe() }],
        ml: [{ ml: xe() }],
        'space-x': [{ 'space-x': y() }],
        'space-x-reverse': ['space-x-reverse'],
        'space-y': [{ 'space-y': y() }],
        'space-y-reverse': ['space-y-reverse'],
        size: [{ size: je() }],
        w: [{ w: [u, 'screen', ...je()] }],
        'min-w': [{ 'min-w': [u, 'screen', 'none', ...je()] }],
        'max-w': [
          { 'max-w': [u, 'screen', 'none', 'prose', { screen: [i] }, ...je()] },
        ],
        h: [{ h: ['screen', 'lh', ...je()] }],
        'min-h': [{ 'min-h': ['screen', 'lh', 'none', ...je()] }],
        'max-h': [{ 'max-h': ['screen', 'lh', ...je()] }],
        'font-size': [{ text: ['base', n, jn, Mt] }],
        'font-smoothing': ['antialiased', 'subpixel-antialiased'],
        'font-style': ['italic', 'not-italic'],
        'font-weight': [{ font: [r, P, fo] }],
        'font-stretch': [
          {
            'font-stretch': [
              'ultra-condensed',
              'extra-condensed',
              'condensed',
              'semi-condensed',
              'normal',
              'semi-expanded',
              'expanded',
              'extra-expanded',
              'ultra-expanded',
              co,
              z,
            ],
          },
        ],
        'font-family': [{ font: [tm, z, t] }],
        'fvn-normal': ['normal-nums'],
        'fvn-ordinal': ['ordinal'],
        'fvn-slashed-zero': ['slashed-zero'],
        'fvn-figure': ['lining-nums', 'oldstyle-nums'],
        'fvn-spacing': ['proportional-nums', 'tabular-nums'],
        'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
        tracking: [{ tracking: [l, P, z] }],
        'line-clamp': [{ 'line-clamp': [R, 'none', P, fo] }],
        leading: [{ leading: [o, ...y()] }],
        'list-image': [{ 'list-image': ['none', P, z] }],
        'list-style-position': [{ list: ['inside', 'outside'] }],
        'list-style-type': [{ list: ['disc', 'decimal', 'none', P, z] }],
        'text-alignment': [
          { text: ['left', 'center', 'right', 'justify', 'start', 'end'] },
        ],
        'placeholder-color': [{ placeholder: v() }],
        'text-color': [{ text: v() }],
        'text-decoration': [
          'underline',
          'overline',
          'line-through',
          'no-underline',
        ],
        'text-decoration-style': [{ decoration: [...ct(), 'wavy'] }],
        'text-decoration-thickness': [
          { decoration: [R, 'from-font', 'auto', P, Mt] },
        ],
        'text-decoration-color': [{ decoration: v() }],
        'underline-offset': [{ 'underline-offset': [R, 'auto', P, z] }],
        'text-transform': [
          'uppercase',
          'lowercase',
          'capitalize',
          'normal-case',
        ],
        'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
        'text-wrap': [{ text: ['wrap', 'nowrap', 'balance', 'pretty'] }],
        indent: [{ indent: y() }],
        'vertical-align': [
          {
            align: [
              'baseline',
              'top',
              'middle',
              'bottom',
              'text-top',
              'text-bottom',
              'sub',
              'super',
              P,
              z,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              'normal',
              'nowrap',
              'pre',
              'pre-line',
              'pre-wrap',
              'break-spaces',
            ],
          },
        ],
        break: [{ break: ['normal', 'words', 'all', 'keep'] }],
        wrap: [{ wrap: ['break-word', 'anywhere', 'normal'] }],
        hyphens: [{ hyphens: ['none', 'manual', 'auto'] }],
        content: [{ content: ['none', P, z] }],
        'bg-attachment': [{ bg: ['fixed', 'local', 'scroll'] }],
        'bg-clip': [{ 'bg-clip': ['border', 'padding', 'content', 'text'] }],
        'bg-origin': [{ 'bg-origin': ['border', 'padding', 'content'] }],
        'bg-position': [{ bg: T() }],
        'bg-repeat': [{ bg: L() }],
        'bg-size': [{ bg: $() }],
        'bg-image': [
          {
            bg: [
              'none',
              {
                linear: [
                  { to: ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'] },
                  dt,
                  P,
                  z,
                ],
                radial: ['', P, z],
                conic: [dt, P, z],
              },
              rm,
              em,
            ],
          },
        ],
        'bg-color': [{ bg: v() }],
        'gradient-from-pos': [{ from: K() }],
        'gradient-via-pos': [{ via: K() }],
        'gradient-to-pos': [{ to: K() }],
        'gradient-from': [{ from: v() }],
        'gradient-via': [{ via: v() }],
        'gradient-to': [{ to: v() }],
        rounded: [{ rounded: J() }],
        'rounded-s': [{ 'rounded-s': J() }],
        'rounded-e': [{ 'rounded-e': J() }],
        'rounded-t': [{ 'rounded-t': J() }],
        'rounded-r': [{ 'rounded-r': J() }],
        'rounded-b': [{ 'rounded-b': J() }],
        'rounded-l': [{ 'rounded-l': J() }],
        'rounded-ss': [{ 'rounded-ss': J() }],
        'rounded-se': [{ 'rounded-se': J() }],
        'rounded-ee': [{ 'rounded-ee': J() }],
        'rounded-es': [{ 'rounded-es': J() }],
        'rounded-tl': [{ 'rounded-tl': J() }],
        'rounded-tr': [{ 'rounded-tr': J() }],
        'rounded-br': [{ 'rounded-br': J() }],
        'rounded-bl': [{ 'rounded-bl': J() }],
        'border-w': [{ border: X() }],
        'border-w-x': [{ 'border-x': X() }],
        'border-w-y': [{ 'border-y': X() }],
        'border-w-s': [{ 'border-s': X() }],
        'border-w-e': [{ 'border-e': X() }],
        'border-w-t': [{ 'border-t': X() }],
        'border-w-r': [{ 'border-r': X() }],
        'border-w-b': [{ 'border-b': X() }],
        'border-w-l': [{ 'border-l': X() }],
        'divide-x': [{ 'divide-x': X() }],
        'divide-x-reverse': ['divide-x-reverse'],
        'divide-y': [{ 'divide-y': X() }],
        'divide-y-reverse': ['divide-y-reverse'],
        'border-style': [{ border: [...ct(), 'hidden', 'none'] }],
        'divide-style': [{ divide: [...ct(), 'hidden', 'none'] }],
        'border-color': [{ border: v() }],
        'border-color-x': [{ 'border-x': v() }],
        'border-color-y': [{ 'border-y': v() }],
        'border-color-s': [{ 'border-s': v() }],
        'border-color-e': [{ 'border-e': v() }],
        'border-color-t': [{ 'border-t': v() }],
        'border-color-r': [{ 'border-r': v() }],
        'border-color-b': [{ 'border-b': v() }],
        'border-color-l': [{ 'border-l': v() }],
        'divide-color': [{ divide: v() }],
        'outline-style': [{ outline: [...ct(), 'none', 'hidden'] }],
        'outline-offset': [{ 'outline-offset': [R, P, z] }],
        'outline-w': [{ outline: ['', R, jn, Mt] }],
        'outline-color': [{ outline: v() }],
        shadow: [{ shadow: ['', 'none', m, Ar, Dr] }],
        'shadow-color': [{ shadow: v() }],
        'inset-shadow': [{ 'inset-shadow': ['none', h, Ar, Dr] }],
        'inset-shadow-color': [{ 'inset-shadow': v() }],
        'ring-w': [{ ring: X() }],
        'ring-w-inset': ['ring-inset'],
        'ring-color': [{ ring: v() }],
        'ring-offset-w': [{ 'ring-offset': [R, Mt] }],
        'ring-offset-color': [{ 'ring-offset': v() }],
        'inset-ring-w': [{ 'inset-ring': X() }],
        'inset-ring-color': [{ 'inset-ring': v() }],
        'text-shadow': [{ 'text-shadow': ['none', p, Ar, Dr] }],
        'text-shadow-color': [{ 'text-shadow': v() }],
        opacity: [{ opacity: [R, P, z] }],
        'mix-blend': [
          { 'mix-blend': [...He(), 'plus-darker', 'plus-lighter'] },
        ],
        'bg-blend': [{ 'bg-blend': He() }],
        'mask-clip': [
          {
            'mask-clip': [
              'border',
              'padding',
              'content',
              'fill',
              'stroke',
              'view',
            ],
          },
          'mask-no-clip',
        ],
        'mask-composite': [
          { mask: ['add', 'subtract', 'intersect', 'exclude'] },
        ],
        'mask-image-linear-pos': [{ 'mask-linear': [R] }],
        'mask-image-linear-from-pos': [{ 'mask-linear-from': W() }],
        'mask-image-linear-to-pos': [{ 'mask-linear-to': W() }],
        'mask-image-linear-from-color': [{ 'mask-linear-from': v() }],
        'mask-image-linear-to-color': [{ 'mask-linear-to': v() }],
        'mask-image-t-from-pos': [{ 'mask-t-from': W() }],
        'mask-image-t-to-pos': [{ 'mask-t-to': W() }],
        'mask-image-t-from-color': [{ 'mask-t-from': v() }],
        'mask-image-t-to-color': [{ 'mask-t-to': v() }],
        'mask-image-r-from-pos': [{ 'mask-r-from': W() }],
        'mask-image-r-to-pos': [{ 'mask-r-to': W() }],
        'mask-image-r-from-color': [{ 'mask-r-from': v() }],
        'mask-image-r-to-color': [{ 'mask-r-to': v() }],
        'mask-image-b-from-pos': [{ 'mask-b-from': W() }],
        'mask-image-b-to-pos': [{ 'mask-b-to': W() }],
        'mask-image-b-from-color': [{ 'mask-b-from': v() }],
        'mask-image-b-to-color': [{ 'mask-b-to': v() }],
        'mask-image-l-from-pos': [{ 'mask-l-from': W() }],
        'mask-image-l-to-pos': [{ 'mask-l-to': W() }],
        'mask-image-l-from-color': [{ 'mask-l-from': v() }],
        'mask-image-l-to-color': [{ 'mask-l-to': v() }],
        'mask-image-x-from-pos': [{ 'mask-x-from': W() }],
        'mask-image-x-to-pos': [{ 'mask-x-to': W() }],
        'mask-image-x-from-color': [{ 'mask-x-from': v() }],
        'mask-image-x-to-color': [{ 'mask-x-to': v() }],
        'mask-image-y-from-pos': [{ 'mask-y-from': W() }],
        'mask-image-y-to-pos': [{ 'mask-y-to': W() }],
        'mask-image-y-from-color': [{ 'mask-y-from': v() }],
        'mask-image-y-to-color': [{ 'mask-y-to': v() }],
        'mask-image-radial': [{ 'mask-radial': [P, z] }],
        'mask-image-radial-from-pos': [{ 'mask-radial-from': W() }],
        'mask-image-radial-to-pos': [{ 'mask-radial-to': W() }],
        'mask-image-radial-from-color': [{ 'mask-radial-from': v() }],
        'mask-image-radial-to-color': [{ 'mask-radial-to': v() }],
        'mask-image-radial-shape': [{ 'mask-radial': ['circle', 'ellipse'] }],
        'mask-image-radial-size': [
          {
            'mask-radial': [
              { closest: ['side', 'corner'], farthest: ['side', 'corner'] },
            ],
          },
        ],
        'mask-image-radial-pos': [{ 'mask-radial-at': g() }],
        'mask-image-conic-pos': [{ 'mask-conic': [R] }],
        'mask-image-conic-from-pos': [{ 'mask-conic-from': W() }],
        'mask-image-conic-to-pos': [{ 'mask-conic-to': W() }],
        'mask-image-conic-from-color': [{ 'mask-conic-from': v() }],
        'mask-image-conic-to-color': [{ 'mask-conic-to': v() }],
        'mask-mode': [{ mask: ['alpha', 'luminance', 'match'] }],
        'mask-origin': [
          {
            'mask-origin': [
              'border',
              'padding',
              'content',
              'fill',
              'stroke',
              'view',
            ],
          },
        ],
        'mask-position': [{ mask: T() }],
        'mask-repeat': [{ mask: L() }],
        'mask-size': [{ mask: $() }],
        'mask-type': [{ 'mask-type': ['alpha', 'luminance'] }],
        'mask-image': [{ mask: ['none', P, z] }],
        filter: [{ filter: ['', 'none', P, z] }],
        blur: [{ blur: lu() }],
        brightness: [{ brightness: [R, P, z] }],
        contrast: [{ contrast: [R, P, z] }],
        'drop-shadow': [{ 'drop-shadow': ['', 'none', S, Ar, Dr] }],
        'drop-shadow-color': [{ 'drop-shadow': v() }],
        grayscale: [{ grayscale: ['', R, P, z] }],
        'hue-rotate': [{ 'hue-rotate': [R, P, z] }],
        invert: [{ invert: ['', R, P, z] }],
        saturate: [{ saturate: [R, P, z] }],
        sepia: [{ sepia: ['', R, P, z] }],
        'backdrop-filter': [{ 'backdrop-filter': ['', 'none', P, z] }],
        'backdrop-blur': [{ 'backdrop-blur': lu() }],
        'backdrop-brightness': [{ 'backdrop-brightness': [R, P, z] }],
        'backdrop-contrast': [{ 'backdrop-contrast': [R, P, z] }],
        'backdrop-grayscale': [{ 'backdrop-grayscale': ['', R, P, z] }],
        'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [R, P, z] }],
        'backdrop-invert': [{ 'backdrop-invert': ['', R, P, z] }],
        'backdrop-opacity': [{ 'backdrop-opacity': [R, P, z] }],
        'backdrop-saturate': [{ 'backdrop-saturate': [R, P, z] }],
        'backdrop-sepia': [{ 'backdrop-sepia': ['', R, P, z] }],
        'border-collapse': [{ border: ['collapse', 'separate'] }],
        'border-spacing': [{ 'border-spacing': y() }],
        'border-spacing-x': [{ 'border-spacing-x': y() }],
        'border-spacing-y': [{ 'border-spacing-y': y() }],
        'table-layout': [{ table: ['auto', 'fixed'] }],
        caption: [{ caption: ['top', 'bottom'] }],
        transition: [
          {
            transition: [
              '',
              'all',
              'colors',
              'opacity',
              'shadow',
              'transform',
              'none',
              P,
              z,
            ],
          },
        ],
        'transition-behavior': [{ transition: ['normal', 'discrete'] }],
        duration: [{ duration: [R, 'initial', P, z] }],
        ease: [{ ease: ['linear', 'initial', f, P, z] }],
        delay: [{ delay: [R, P, z] }],
        animate: [{ animate: ['none', a, P, z] }],
        backface: [{ backface: ['hidden', 'visible'] }],
        perspective: [{ perspective: [x, P, z] }],
        'perspective-origin': [{ 'perspective-origin': E() }],
        rotate: [{ rotate: gr() }],
        'rotate-x': [{ 'rotate-x': gr() }],
        'rotate-y': [{ 'rotate-y': gr() }],
        'rotate-z': [{ 'rotate-z': gr() }],
        scale: [{ scale: yr() }],
        'scale-x': [{ 'scale-x': yr() }],
        'scale-y': [{ 'scale-y': yr() }],
        'scale-z': [{ 'scale-z': yr() }],
        'scale-3d': ['scale-3d'],
        skew: [{ skew: Dl() }],
        'skew-x': [{ 'skew-x': Dl() }],
        'skew-y': [{ 'skew-y': Dl() }],
        transform: [{ transform: [P, z, '', 'none', 'gpu', 'cpu'] }],
        'transform-origin': [{ origin: E() }],
        'transform-style': [{ transform: ['3d', 'flat'] }],
        translate: [{ translate: wr() }],
        'translate-x': [{ 'translate-x': wr() }],
        'translate-y': [{ 'translate-y': wr() }],
        'translate-z': [{ 'translate-z': wr() }],
        'translate-none': ['translate-none'],
        accent: [{ accent: v() }],
        appearance: [{ appearance: ['none', 'auto'] }],
        'caret-color': [{ caret: v() }],
        'color-scheme': [
          {
            scheme: [
              'normal',
              'dark',
              'light',
              'light-dark',
              'only-dark',
              'only-light',
            ],
          },
        ],
        cursor: [
          {
            cursor: [
              'auto',
              'default',
              'pointer',
              'wait',
              'text',
              'move',
              'help',
              'not-allowed',
              'none',
              'context-menu',
              'progress',
              'cell',
              'crosshair',
              'vertical-text',
              'alias',
              'copy',
              'no-drop',
              'grab',
              'grabbing',
              'all-scroll',
              'col-resize',
              'row-resize',
              'n-resize',
              'e-resize',
              's-resize',
              'w-resize',
              'ne-resize',
              'nw-resize',
              'se-resize',
              'sw-resize',
              'ew-resize',
              'ns-resize',
              'nesw-resize',
              'nwse-resize',
              'zoom-in',
              'zoom-out',
              P,
              z,
            ],
          },
        ],
        'field-sizing': [{ 'field-sizing': ['fixed', 'content'] }],
        'pointer-events': [{ 'pointer-events': ['auto', 'none'] }],
        resize: [{ resize: ['none', '', 'y', 'x'] }],
        'scroll-behavior': [{ scroll: ['auto', 'smooth'] }],
        'scroll-m': [{ 'scroll-m': y() }],
        'scroll-mx': [{ 'scroll-mx': y() }],
        'scroll-my': [{ 'scroll-my': y() }],
        'scroll-ms': [{ 'scroll-ms': y() }],
        'scroll-me': [{ 'scroll-me': y() }],
        'scroll-mt': [{ 'scroll-mt': y() }],
        'scroll-mr': [{ 'scroll-mr': y() }],
        'scroll-mb': [{ 'scroll-mb': y() }],
        'scroll-ml': [{ 'scroll-ml': y() }],
        'scroll-p': [{ 'scroll-p': y() }],
        'scroll-px': [{ 'scroll-px': y() }],
        'scroll-py': [{ 'scroll-py': y() }],
        'scroll-ps': [{ 'scroll-ps': y() }],
        'scroll-pe': [{ 'scroll-pe': y() }],
        'scroll-pt': [{ 'scroll-pt': y() }],
        'scroll-pr': [{ 'scroll-pr': y() }],
        'scroll-pb': [{ 'scroll-pb': y() }],
        'scroll-pl': [{ 'scroll-pl': y() }],
        'snap-align': [{ snap: ['start', 'end', 'center', 'align-none'] }],
        'snap-stop': [{ snap: ['normal', 'always'] }],
        'snap-type': [{ snap: ['none', 'x', 'y', 'both'] }],
        'snap-strictness': [{ snap: ['mandatory', 'proximity'] }],
        touch: [{ touch: ['auto', 'none', 'manipulation'] }],
        'touch-x': [{ 'touch-pan': ['x', 'left', 'right'] }],
        'touch-y': [{ 'touch-pan': ['y', 'up', 'down'] }],
        'touch-pz': ['touch-pinch-zoom'],
        select: [{ select: ['none', 'text', 'all', 'auto'] }],
        'will-change': [
          { 'will-change': ['auto', 'scroll', 'contents', 'transform', P, z] },
        ],
        fill: [{ fill: ['none', ...v()] }],
        'stroke-w': [{ stroke: [R, jn, Mt, fo] }],
        stroke: [{ stroke: ['none', ...v()] }],
        'forced-color-adjust': [{ 'forced-color-adjust': ['auto', 'none'] }],
      },
      conflictingClassGroups: {
        overflow: ['overflow-x', 'overflow-y'],
        overscroll: ['overscroll-x', 'overscroll-y'],
        inset: [
          'inset-x',
          'inset-y',
          'start',
          'end',
          'top',
          'right',
          'bottom',
          'left',
        ],
        'inset-x': ['right', 'left'],
        'inset-y': ['top', 'bottom'],
        flex: ['basis', 'grow', 'shrink'],
        gap: ['gap-x', 'gap-y'],
        p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
        px: ['pr', 'pl'],
        py: ['pt', 'pb'],
        m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
        mx: ['mr', 'ml'],
        my: ['mt', 'mb'],
        size: ['w', 'h'],
        'font-size': ['leading'],
        'fvn-normal': [
          'fvn-ordinal',
          'fvn-slashed-zero',
          'fvn-figure',
          'fvn-spacing',
          'fvn-fraction',
        ],
        'fvn-ordinal': ['fvn-normal'],
        'fvn-slashed-zero': ['fvn-normal'],
        'fvn-figure': ['fvn-normal'],
        'fvn-spacing': ['fvn-normal'],
        'fvn-fraction': ['fvn-normal'],
        'line-clamp': ['display', 'overflow'],
        rounded: [
          'rounded-s',
          'rounded-e',
          'rounded-t',
          'rounded-r',
          'rounded-b',
          'rounded-l',
          'rounded-ss',
          'rounded-se',
          'rounded-ee',
          'rounded-es',
          'rounded-tl',
          'rounded-tr',
          'rounded-br',
          'rounded-bl',
        ],
        'rounded-s': ['rounded-ss', 'rounded-es'],
        'rounded-e': ['rounded-se', 'rounded-ee'],
        'rounded-t': ['rounded-tl', 'rounded-tr'],
        'rounded-r': ['rounded-tr', 'rounded-br'],
        'rounded-b': ['rounded-br', 'rounded-bl'],
        'rounded-l': ['rounded-tl', 'rounded-bl'],
        'border-spacing': ['border-spacing-x', 'border-spacing-y'],
        'border-w': [
          'border-w-x',
          'border-w-y',
          'border-w-s',
          'border-w-e',
          'border-w-t',
          'border-w-r',
          'border-w-b',
          'border-w-l',
        ],
        'border-w-x': ['border-w-r', 'border-w-l'],
        'border-w-y': ['border-w-t', 'border-w-b'],
        'border-color': [
          'border-color-x',
          'border-color-y',
          'border-color-s',
          'border-color-e',
          'border-color-t',
          'border-color-r',
          'border-color-b',
          'border-color-l',
        ],
        'border-color-x': ['border-color-r', 'border-color-l'],
        'border-color-y': ['border-color-t', 'border-color-b'],
        translate: ['translate-x', 'translate-y', 'translate-none'],
        'translate-none': [
          'translate',
          'translate-x',
          'translate-y',
          'translate-z',
        ],
        'scroll-m': [
          'scroll-mx',
          'scroll-my',
          'scroll-ms',
          'scroll-me',
          'scroll-mt',
          'scroll-mr',
          'scroll-mb',
          'scroll-ml',
        ],
        'scroll-mx': ['scroll-mr', 'scroll-ml'],
        'scroll-my': ['scroll-mt', 'scroll-mb'],
        'scroll-p': [
          'scroll-px',
          'scroll-py',
          'scroll-ps',
          'scroll-pe',
          'scroll-pt',
          'scroll-pr',
          'scroll-pb',
          'scroll-pl',
        ],
        'scroll-px': ['scroll-pr', 'scroll-pl'],
        'scroll-py': ['scroll-pt', 'scroll-pb'],
        touch: ['touch-x', 'touch-y', 'touch-pz'],
        'touch-x': ['touch'],
        'touch-y': ['touch'],
        'touch-pz': ['touch'],
      },
      conflictingClassGroupModifiers: { 'font-size': ['leading'] },
      orderSensitiveModifiers: [
        '*',
        '**',
        'after',
        'backdrop',
        'before',
        'details-content',
        'file',
        'first-letter',
        'first-line',
        'marker',
        'placeholder',
        'selection',
      ],
    };
  },
  um = $p(im);
function sm(...e) {
  return um(Ic(e));
}
const ws = (e) => (typeof e == 'boolean' ? `${e}` : e === 0 ? '0' : e),
  ks = Ic,
  am = (e, t) => (n) => {
    var r;
    if ((t == null ? void 0 : t.variants) == null)
      return ks(
        e,
        n == null ? void 0 : n.class,
        n == null ? void 0 : n.className
      );
    const { variants: l, defaultVariants: o } = t,
      i = Object.keys(l).map((c) => {
        const m = n == null ? void 0 : n[c],
          h = o == null ? void 0 : o[c];
        if (m === null) return null;
        const p = ws(m) || ws(h);
        return l[c][p];
      }),
      u =
        n &&
        Object.entries(n).reduce((c, m) => {
          let [h, p] = m;
          return (p === void 0 || (c[h] = p), c);
        }, {}),
      s =
        t == null || (r = t.compoundVariants) === null || r === void 0
          ? void 0
          : r.reduce((c, m) => {
              let { class: h, className: p, ...S } = m;
              return Object.entries(S).every((k) => {
                let [x, I] = k;
                return Array.isArray(I)
                  ? I.includes({ ...o, ...u }[x])
                  : { ...o, ...u }[x] === I;
              })
                ? [...c, h, p]
                : c;
            }, []);
    return ks(
      e,
      i,
      s,
      n == null ? void 0 : n.class,
      n == null ? void 0 : n.className
    );
  },
  cm = am(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
      variants: {
        variant: {
          default:
            'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
          destructive:
            'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
          outline:
            'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
          secondary:
            'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
          ghost:
            'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
          link: 'text-primary underline-offset-4 hover:underline',
        },
        size: {
          default: 'h-9 px-4 py-2 has-[>svg]:px-3',
          sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
          lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
          icon: 'size-9',
        },
      },
      defaultVariants: { variant: 'default', size: 'default' },
    }
  );
function fm({ className: e, variant: t, size: n, asChild: r = !1, ...l }) {
  const o = r ? xp : 'button';
  return be.jsx(o, {
    'data-slot': 'button',
    className: sm(cm({ variant: t, size: n, className: e })),
    ...l,
  });
}
function dm() {
  return be.jsx('div', {
    className: 'min-h-screen bg-background text-foreground',
    children: be.jsxs('div', {
      className:
        'container mx-auto flex min-h-screen flex-col items-center justify-center px-4',
      children: [
        be.jsx('h1', {
          className: 'mb-8 text-4xl font-bold',
          children: 'Paramind LMS bootstrap OK',
        }),
        be.jsx(fm, { variant: 'default', size: 'lg', children: 'Get Started' }),
      ],
    }),
  });
}
po.createRoot(document.getElementById('root')).render(
  be.jsx(sf.StrictMode, { children: be.jsx(dm, {}) })
);
