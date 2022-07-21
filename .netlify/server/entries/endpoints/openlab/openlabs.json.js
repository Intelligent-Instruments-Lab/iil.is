async function GET() {
  const imports = Object.assign({ "./1.md": () => import("../../pages/openlab/1.md.js"), "./10.md": () => import("../../pages/openlab/10.md.js"), "./11.md": () => import("../../pages/openlab/11.md.js"), "./12.md": () => import("../../pages/openlab/12.md.js"), "./13.md": () => import("../../pages/openlab/13.md.js"), "./14.md": () => import("../../pages/openlab/14.md.js"), "./15.md": () => import("../../pages/openlab/15.md.js"), "./16.md": () => import("../../pages/openlab/16.md.js"), "./17.md": () => import("../../pages/openlab/17.md.js"), "./18.md": () => import("../../pages/openlab/18.md.js"), "./19.md": () => import("../../pages/openlab/19.md.js"), "./2.md": () => import("../../pages/openlab/2.md.js"), "./20.md": () => import("../../pages/openlab/20.md.js"), "./21.md": () => import("../../pages/openlab/21.md.js"), "./3.md": () => import("../../pages/openlab/3.md.js"), "./4.md": () => import("../../pages/openlab/4.md.js"), "./5.md": () => import("../../pages/openlab/5.md.js"), "./6.md": () => import("../../pages/openlab/6.md.js"), "./7.md": () => import("../../pages/openlab/7.md.js"), "./8.md": () => import("../../pages/openlab/8.md.js"), "./9.md": () => import("../../pages/openlab/9.md.js") });
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
  GET
};
