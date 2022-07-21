async function get() {
  const imports = Object.assign({ "./davidbrynjar.md": () => import("../../pages/people/davidbrynjar.md.js"), "./enrike.md": () => import("../../pages/people/enrike.md.js"), "./esther.md": () => import("../../pages/people/esther.md.js"), "./ezra.md": () => import("../../pages/people/ezra.md.js"), "./halldor.md": () => import("../../pages/people/halldor.md.js"), "./jack.md": () => import("../../pages/people/jack.md.js"), "./jon.md": () => import("../../pages/people/jon.md.js"), "./karl.md": () => import("../../pages/people/karl.md.js"), "./kit.md": () => import("../../pages/people/kit.md.js"), "./marco.md": () => import("../../pages/people/marco.md.js"), "./robin.md": () => import("../../pages/people/robin.md.js"), "./sean.md": () => import("../../pages/people/sean.md.js"), "./sigga.md": () => import("../../pages/people/sigga.md.js"), "./steve.md": () => import("../../pages/people/steve.md.js"), "./thor.md": () => import("../../pages/people/thor.md.js"), "./victor.md": () => import("../../pages/people/victor.md.js") });
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
export {
  get
};
