async function GET() {
  const imports = Object.assign({ "./ICLC2021.md": () => import("../../pages/news/ICLC2021.md.js"), "./good-start.md": () => import("../../pages/news/good-start.md.js"), "./google-summer-of-code.md": () => import("../../pages/news/google-summer-of-code.md.js"), "./gsoc2022.md": () => import("../../pages/news/gsoc2022.md.js"), "./halldorophone-kastljos.md": () => import("../../pages/news/halldorophone-kastljos.md.js"), "./icelandic-news.md": () => import("../../pages/news/icelandic-news.md.js"), "./karl.md": () => import("../../pages/news/karl.md.js"), "./living-algorithms.md": () => import("../../pages/news/living-algorithms.md.js"), "./moving-strings.md": () => import("../../pages/news/moving-strings.md.js"), "./nime-2022-workshop.md": () => import("../../pages/news/nime-2022-workshop.md.js"), "./nordic-popular-music-union.md": () => import("../../pages/news/nordic-popular-music-union.md.js"), "./on-the-fly-residency.md": () => import("../../pages/news/on-the-fly-residency.md.js"), "./phd2-deadline.md": () => import("../../pages/news/phd2-deadline.md.js"), "./phd2.md": () => import("../../pages/news/phd2.md.js"), "./robin.md": () => import("../../pages/news/robin.md.js"), "./root-workshop-2022.md": () => import("../../pages/news/root-workshop-2022.md.js"), "./rusl2022.md": () => import("../../pages/news/rusl2022.md.js"), "./soundworks.md": () => import("../../pages/news/soundworks.md.js"), "./steve-residency.md": () => import("../../pages/news/steve-residency.md.js"), "./summer-interns.md": () => import("../../pages/news/summer-interns.md.js"), "./synthabaeli.md": () => import("../../pages/news/synthabaeli.md.js"), "./trash-workshop.md": () => import("../../pages/news/trash-workshop.md.js") });
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
