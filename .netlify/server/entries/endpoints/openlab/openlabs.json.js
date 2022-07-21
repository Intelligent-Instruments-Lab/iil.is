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
  const imports = Object.assign({ "./1.md": () => Promise.resolve().then(() => __toESM(require("../../pages/openlab/1.md.js"))), "./10.md": () => Promise.resolve().then(() => __toESM(require("../../pages/openlab/10.md.js"))), "./11.md": () => Promise.resolve().then(() => __toESM(require("../../pages/openlab/11.md.js"))), "./12.md": () => Promise.resolve().then(() => __toESM(require("../../pages/openlab/12.md.js"))), "./13.md": () => Promise.resolve().then(() => __toESM(require("../../pages/openlab/13.md.js"))), "./14.md": () => Promise.resolve().then(() => __toESM(require("../../pages/openlab/14.md.js"))), "./15.md": () => Promise.resolve().then(() => __toESM(require("../../pages/openlab/15.md.js"))), "./16.md": () => Promise.resolve().then(() => __toESM(require("../../pages/openlab/16.md.js"))), "./17.md": () => Promise.resolve().then(() => __toESM(require("../../pages/openlab/17.md.js"))), "./18.md": () => Promise.resolve().then(() => __toESM(require("../../pages/openlab/18.md.js"))), "./19.md": () => Promise.resolve().then(() => __toESM(require("../../pages/openlab/19.md.js"))), "./2.md": () => Promise.resolve().then(() => __toESM(require("../../pages/openlab/2.md.js"))), "./20.md": () => Promise.resolve().then(() => __toESM(require("../../pages/openlab/20.md.js"))), "./21.md": () => Promise.resolve().then(() => __toESM(require("../../pages/openlab/21.md.js"))), "./3.md": () => Promise.resolve().then(() => __toESM(require("../../pages/openlab/3.md.js"))), "./4.md": () => Promise.resolve().then(() => __toESM(require("../../pages/openlab/4.md.js"))), "./5.md": () => Promise.resolve().then(() => __toESM(require("../../pages/openlab/5.md.js"))), "./6.md": () => Promise.resolve().then(() => __toESM(require("../../pages/openlab/6.md.js"))), "./7.md": () => Promise.resolve().then(() => __toESM(require("../../pages/openlab/7.md.js"))), "./8.md": () => Promise.resolve().then(() => __toESM(require("../../pages/openlab/8.md.js"))), "./9.md": () => Promise.resolve().then(() => __toESM(require("../../pages/openlab/9.md.js"))) });
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
