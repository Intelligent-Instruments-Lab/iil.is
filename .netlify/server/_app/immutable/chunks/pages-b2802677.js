var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  L: () => Layout,
  p: () => pages,
  w: () => writable
});
module.exports = __toCommonJS(stdin_exports);
var import_index_85307065 = require("./index-85307065.js");
const subscriber_queue = [];
function writable(value, start = import_index_85307065.f) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if ((0, import_index_85307065.g)(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe(run, invalidate = import_index_85307065.f) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || import_index_85307065.f;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe };
}
const layoutStore = () => {
  let state = {
    menu: false,
    page: "home"
  };
  const { subscribe, set, update } = writable(state);
  const methods = {
    init: () => {
    },
    reset: () => {
      return set(state);
    },
    menuToggle: () => {
      let m;
      update((s) => {
        s.menu = !s.menu;
        m = s.menu;
        return s;
      });
      return m;
    }
  };
  return { subscribe, set, update, ...methods };
};
const Layout = layoutStore();
const pages = [
  {
    label: "About",
    url: "/about",
    style: "default"
  },
  {
    label: "People",
    url: "/people",
    style: "default"
  },
  {
    label: "News",
    url: "/news",
    style: "default"
  },
  {
    label: "Research",
    url: "/research",
    style: "default"
  },
  {
    label: "Outputs",
    url: "/outputs",
    style: "default"
  },
  {
    label: "Open Lab",
    url: "/openlab",
    style: "default"
  },
  {
    label: "Collaborate",
    url: "/collaborate",
    style: "default"
  }
];
