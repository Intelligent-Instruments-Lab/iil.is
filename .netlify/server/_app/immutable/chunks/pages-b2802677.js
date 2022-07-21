import { f as noop, g as safe_not_equal } from "./index-85307065.js";
const subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
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
  function subscribe(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
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
export {
  Layout as L,
  pages as p,
  writable as w
};
