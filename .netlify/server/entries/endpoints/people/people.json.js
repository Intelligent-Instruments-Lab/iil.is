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
  get: () => get
});
module.exports = __toCommonJS(stdin_exports);
async function get() {
  const imports = Object.assign({ "./davidbrynjar.md": () => Promise.resolve().then(() => __toESM(require("../../pages/people/davidbrynjar.md.js"))), "./enrike.md": () => Promise.resolve().then(() => __toESM(require("../../pages/people/enrike.md.js"))), "./esther.md": () => Promise.resolve().then(() => __toESM(require("../../pages/people/esther.md.js"))), "./ezra.md": () => Promise.resolve().then(() => __toESM(require("../../pages/people/ezra.md.js"))), "./halldor.md": () => Promise.resolve().then(() => __toESM(require("../../pages/people/halldor.md.js"))), "./jack.md": () => Promise.resolve().then(() => __toESM(require("../../pages/people/jack.md.js"))), "./jon.md": () => Promise.resolve().then(() => __toESM(require("../../pages/people/jon.md.js"))), "./karl.md": () => Promise.resolve().then(() => __toESM(require("../../pages/people/karl.md.js"))), "./kit.md": () => Promise.resolve().then(() => __toESM(require("../../pages/people/kit.md.js"))), "./marco.md": () => Promise.resolve().then(() => __toESM(require("../../pages/people/marco.md.js"))), "./robin.md": () => Promise.resolve().then(() => __toESM(require("../../pages/people/robin.md.js"))), "./sean.md": () => Promise.resolve().then(() => __toESM(require("../../pages/people/sean.md.js"))), "./sigga.md": () => Promise.resolve().then(() => __toESM(require("../../pages/people/sigga.md.js"))), "./steve.md": () => Promise.resolve().then(() => __toESM(require("../../pages/people/steve.md.js"))), "./thor.md": () => Promise.resolve().then(() => __toESM(require("../../pages/people/thor.md.js"))), "./victor.md": () => Promise.resolve().then(() => __toESM(require("../../pages/people/victor.md.js"))) });
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
