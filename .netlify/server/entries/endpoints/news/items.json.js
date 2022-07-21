var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  GET: () => GET
});
module.exports = __toCommonJS(stdin_exports);
async function GET() {
  const imports = Object.assign({ "./ICLC2021.md": () => Promise.resolve().then(() => __toESM(require("../../pages/news/ICLC2021.md.js"))), "./good-start.md": () => Promise.resolve().then(() => __toESM(require("../../pages/news/good-start.md.js"))), "./google-summer-of-code.md": () => Promise.resolve().then(() => __toESM(require("../../pages/news/google-summer-of-code.md.js"))), "./gsoc2022.md": () => Promise.resolve().then(() => __toESM(require("../../pages/news/gsoc2022.md.js"))), "./halldorophone-kastljos.md": () => Promise.resolve().then(() => __toESM(require("../../pages/news/halldorophone-kastljos.md.js"))), "./icelandic-news.md": () => Promise.resolve().then(() => __toESM(require("../../pages/news/icelandic-news.md.js"))), "./karl.md": () => Promise.resolve().then(() => __toESM(require("../../pages/news/karl.md.js"))), "./living-algorithms.md": () => Promise.resolve().then(() => __toESM(require("../../pages/news/living-algorithms.md.js"))), "./moving-strings.md": () => Promise.resolve().then(() => __toESM(require("../../pages/news/moving-strings.md.js"))), "./nime-2022-workshop.md": () => Promise.resolve().then(() => __toESM(require("../../pages/news/nime-2022-workshop.md.js"))), "./nordic-popular-music-union.md": () => Promise.resolve().then(() => __toESM(require("../../pages/news/nordic-popular-music-union.md.js"))), "./on-the-fly-residency.md": () => Promise.resolve().then(() => __toESM(require("../../pages/news/on-the-fly-residency.md.js"))), "./phd2-deadline.md": () => Promise.resolve().then(() => __toESM(require("../../pages/news/phd2-deadline.md.js"))), "./phd2.md": () => Promise.resolve().then(() => __toESM(require("../../pages/news/phd2.md.js"))), "./robin.md": () => Promise.resolve().then(() => __toESM(require("../../pages/news/robin.md.js"))), "./root-workshop-2022.md": () => Promise.resolve().then(() => __toESM(require("../../pages/news/root-workshop-2022.md.js"))), "./rusl2022.md": () => Promise.resolve().then(() => __toESM(require("../../pages/news/rusl2022.md.js"))), "./soundworks.md": () => Promise.resolve().then(() => __toESM(require("../../pages/news/soundworks.md.js"))), "./steve-residency.md": () => Promise.resolve().then(() => __toESM(require("../../pages/news/steve-residency.md.js"))), "./summer-interns.md": () => Promise.resolve().then(() => __toESM(require("../../pages/news/summer-interns.md.js"))), "./synthabaeli.md": () => Promise.resolve().then(() => __toESM(require("../../pages/news/synthabaeli.md.js"))), "./trash-workshop.md": () => Promise.resolve().then(() => __toESM(require("../../pages/news/trash-workshop.md.js"))) });
  let body = [];
  for (const path in imports) {
    body.push(imports[path]().then(({ metadata }) => {
      return {
        metadata,
        path
      };
    }));
  }
  const posts = await Promise.all(body);
  return {
    body: JSON.stringify(posts)
  };
}
