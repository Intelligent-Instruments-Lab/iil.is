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
  s: () => seo
});
module.exports = __toCommonJS(stdin_exports);
var import_pages_b2802677 = require("./pages-b2802677.js");
const seo = (0, import_pages_b2802677.w)({
  title: "Intelligent Instruments Lab",
  description: "The Intelligent Instruments Lab designs instruments embedded with creative AI for musical performance. Our aim is to understand ourselves as users of intelligent technologies.",
  url: "/",
  image: "/seo/ogimage.jpg"
});
