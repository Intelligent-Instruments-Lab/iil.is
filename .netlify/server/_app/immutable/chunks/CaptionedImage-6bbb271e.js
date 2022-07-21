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
  C: () => CaptionedImage
});
module.exports = __toCommonJS(stdin_exports);
var import_index_85307065 = require("./index-85307065.js");
const CaptionedImage = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  let { src } = $$props;
  let { caption } = $$props;
  let { alt } = $$props;
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.caption === void 0 && $$bindings.caption && caption !== void 0)
    $$bindings.caption(caption);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
    $$bindings.alt(alt);
  return `<div class="${"py-2 my-4"}"><img class="${"max-h-96 object-cover object-center"}"${(0, import_index_85307065.b)("src", "/images/" + src, 0)}${(0, import_index_85307065.b)("alt", alt, 0)}>
  <p class="${"text-primary-800 mt-2 text-sm"}">${(0, import_index_85307065.e)(caption)}</p></div>`;
});
