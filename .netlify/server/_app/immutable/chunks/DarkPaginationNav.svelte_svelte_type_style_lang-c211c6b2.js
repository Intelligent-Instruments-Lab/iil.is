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
  P: () => PaginationNav,
  p: () => paginate
});
module.exports = __toCommonJS(stdin_exports);
var import_index_85307065 = require("./index-85307065.js");
function paginate({ items, pageSize, currentPage }) {
  return items.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize);
}
const PREVIOUS_PAGE = "PREVIOUS_PAGE";
const NEXT_PAGE = "NEXT_PAGE";
const ELLIPSIS = "ELLIPSIS";
function generateNavigationOptions({ totalItems, pageSize, currentPage, limit = null, showStepOptions = false }) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const limitThreshold = getLimitThreshold({ limit });
  const limited = limit && totalPages > limitThreshold;
  let options = limited ? generateLimitedOptions({ totalPages, limit, currentPage }) : generateUnlimitedOptions({ totalPages });
  return showStepOptions ? addStepOptions({ options, currentPage, totalPages }) : options;
}
function generateUnlimitedOptions({ totalPages }) {
  return new Array(totalPages).fill(null).map((value, index) => ({
    type: "number",
    value: index + 1
  }));
}
function generateLimitedOptions({ totalPages, limit, currentPage }) {
  const boundarySize = limit * 2 + 2;
  const firstBoundary = 1 + boundarySize;
  const lastBoundary = totalPages - boundarySize;
  const totalShownPages = firstBoundary + 2;
  if (currentPage <= firstBoundary - limit) {
    return Array(totalShownPages).fill(null).map((value, index) => {
      if (index === totalShownPages - 1) {
        return {
          type: "number",
          value: totalPages
        };
      } else if (index === totalShownPages - 2) {
        return {
          type: "symbol",
          symbol: ELLIPSIS,
          value: firstBoundary + 1
        };
      }
      return {
        type: "number",
        value: index + 1
      };
    });
  } else if (currentPage >= lastBoundary + limit) {
    return Array(totalShownPages).fill(null).map((value, index) => {
      if (index === 0) {
        return {
          type: "number",
          value: 1
        };
      } else if (index === 1) {
        return {
          type: "symbol",
          symbol: ELLIPSIS,
          value: lastBoundary - 1
        };
      }
      return {
        type: "number",
        value: lastBoundary + index - 2
      };
    });
  } else if (currentPage >= firstBoundary - limit && currentPage <= lastBoundary + limit) {
    return Array(totalShownPages).fill(null).map((value, index) => {
      if (index === 0) {
        return {
          type: "number",
          value: 1
        };
      } else if (index === 1) {
        return {
          type: "symbol",
          symbol: ELLIPSIS,
          value: currentPage - limit + (index - 2)
        };
      } else if (index === totalShownPages - 1) {
        return {
          type: "number",
          value: totalPages
        };
      } else if (index === totalShownPages - 2) {
        return {
          type: "symbol",
          symbol: ELLIPSIS,
          value: currentPage + limit + 1
        };
      }
      return {
        type: "number",
        value: currentPage - limit + (index - 2)
      };
    });
  }
}
function addStepOptions({ options, currentPage, totalPages }) {
  return [
    {
      type: "symbol",
      symbol: PREVIOUS_PAGE,
      value: currentPage <= 1 ? 1 : currentPage - 1
    },
    ...options,
    {
      type: "symbol",
      symbol: NEXT_PAGE,
      value: currentPage >= totalPages ? totalPages : currentPage + 1
    }
  ];
}
function getLimitThreshold({ limit }) {
  const maximumUnlimitedPages = 3;
  const numberOfBoundaryPages = 2;
  return limit * 2 + maximumUnlimitedPages + numberOfBoundaryPages;
}
const PaginationNav = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  let options;
  let totalPages;
  (0, import_index_85307065.i)();
  let { totalItems = 0 } = $$props;
  let { pageSize = 1 } = $$props;
  let { currentPage = 1 } = $$props;
  let { limit = null } = $$props;
  let { showStepOptions = false } = $$props;
  if ($$props.totalItems === void 0 && $$bindings.totalItems && totalItems !== void 0)
    $$bindings.totalItems(totalItems);
  if ($$props.pageSize === void 0 && $$bindings.pageSize && pageSize !== void 0)
    $$bindings.pageSize(pageSize);
  if ($$props.currentPage === void 0 && $$bindings.currentPage && currentPage !== void 0)
    $$bindings.currentPage(currentPage);
  if ($$props.limit === void 0 && $$bindings.limit && limit !== void 0)
    $$bindings.limit(limit);
  if ($$props.showStepOptions === void 0 && $$bindings.showStepOptions && showStepOptions !== void 0)
    $$bindings.showStepOptions(showStepOptions);
  options = generateNavigationOptions({
    totalItems,
    pageSize,
    currentPage,
    limit,
    showStepOptions
  });
  totalPages = Math.ceil(totalItems / pageSize);
  return `<div class="${"pagination-nav"}">${(0, import_index_85307065.d)(options, (option) => {
    return `<span class="${[
      "option",
      (option.type === "number" ? "number" : "") + " " + (option.type === "symbol" && option.symbol === PREVIOUS_PAGE ? "prev" : "") + " " + (option.type === "symbol" && option.symbol === NEXT_PAGE ? "next" : "") + " " + (option.type === "symbol" && option.symbol === NEXT_PAGE && currentPage >= totalPages || option.type === "symbol" && option.symbol === PREVIOUS_PAGE && currentPage <= 1 ? "disabled" : "") + " " + (option.type === "symbol" && option.symbol === ELLIPSIS ? "ellipsis" : "") + " " + (option.type === "number" && option.value === currentPage ? "active" : "")
    ].join(" ").trim()}">${option.type === "number" ? `${slots.number ? slots.number({ value: option.value }) : `
          <span>${(0, import_index_85307065.e)(option.value)}</span>
        `}` : `${option.type === "symbol" && option.symbol === ELLIPSIS ? `${slots.ellipsis ? slots.ellipsis({}) : `
          <span>...</span>
        `}` : `${option.type === "symbol" && option.symbol === PREVIOUS_PAGE ? `${slots.prev ? slots.prev({}) : `
          <svg style="${"width:24px;height:24px"}" viewBox="${"0 0 24 24"}"><path fill="${"#000000"}" d="${"M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"}"></path></svg>
        `}` : `${option.type === "symbol" && option.symbol === NEXT_PAGE ? `${slots.next ? slots.next({}) : `
          <svg style="${"width:24px;height:24px"}" viewBox="${"0 0 24 24"}"><path fill="${"#000000"}" d="${"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"}"></path></svg>
        `}` : ``}`}`}`}
    </span>`;
  })}</div>`;
});
const LightPaginationNav_svelte_svelte_type_style_lang = "";
const DarkPaginationNav_svelte_svelte_type_style_lang = "";
