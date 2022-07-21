async function GET() {
  const imports = Object.assign({ "./halldorophone.md": () => import("../../pages/research/halldorophone.md.js"), "./langspil.md": () => import("../../pages/research/langspil.md.js"), "./livinglooper.md": () => import("../../pages/research/livinglooper.md.js"), "./stenophone.md": () => import("../../pages/research/stenophone.md.js"), "./threnoscope.md": () => import("../../pages/research/threnoscope.md.js") });
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
