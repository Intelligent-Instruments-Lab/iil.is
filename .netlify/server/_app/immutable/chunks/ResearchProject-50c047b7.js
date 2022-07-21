import { c as create_ssr_component, a as subscribe, h as set_store_value, v as validate_component, e as escape } from "./index-85307065.js";
import { s as seo } from "./seo-f675d5d9.js";
import { L as Layout } from "./pages-b2802677.js";
import { M as Menu } from "./Menu-d2b189d9.js";
import { C as CaptionedImage } from "./CaptionedImage-6bbb271e.js";
const ResearchProject = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  let { title } = $$props;
  let { description } = $$props;
  let { layout } = $$props;
  let { date } = $$props;
  let { authors } = $$props;
  let { highlight_image } = $$props;
  let { highlight_caption } = $$props;
  set_store_value(seo, $seo.title = title, $seo);
  set_store_value(seo, $seo.description = description, $seo);
  set_store_value(seo, $seo.url = "/research", $seo);
  const methods = {
    authorString: (authors2) => {
      if (authors2.length === 1)
        return authors2[0];
      else if (authors2.length === 2)
        return authors2[0] + " and " + authors2[1];
      else {
        let s = "";
        for (var i = 0; i < authors2.length; i++) {
          if (i < authors2.length - 2)
            s = s + authors2[i] + ", ";
          else
            s = s + " and " + authors2[i];
        }
        return s;
      }
    }
  };
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  if ($$props.authors === void 0 && $$bindings.authors && authors !== void 0)
    $$bindings.authors(authors);
  if ($$props.highlight_image === void 0 && $$bindings.highlight_image && highlight_image !== void 0)
    $$bindings.highlight_image(highlight_image);
  if ($$props.highlight_caption === void 0 && $$bindings.highlight_caption && highlight_caption !== void 0)
    $$bindings.highlight_caption(highlight_caption);
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><div class="${"p-4 sm:p-6 mt-2 font-hauser uppercase text-md sm:text-lg text-white"}"><a href="${"/research"}">${escape("<-")} Back to Research</a></div>
    <div class="${"px-4 md:px-10 sm:px-12 md:px-14 max-w-3xl"}"><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mt-2 mb-2 sm:mb-4"}">${escape(title)}</h1>
      <div class="${"px-2 sm:px-4 pt-4 pb-2 sm:pb-0 text-primary-700"}">${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
    src: highlight_image,
    alt: highlight_caption,
    caption: highlight_caption
  }, {}, {})}
        <div class="${"font-hauser uppercase"}"><div class="${"text-md sm:text-lg md:text-xl"}">${escape(description)}<br></div>
          <div class="${"text-sm sm:text-md md:text-lg mt-2"}">By ${escape(methods.authorString(authors))}</div></div></div>
      <div class="${"p-2 sm:p-4"}">${slots.default ? slots.default({}) : ``}</div></div>
    <div class="${"p-4 sm:p-6 mt-2 font-hauser uppercase text-md sm:text-lg text-white"}"><a href="${"/research"}">${escape("<-")} Back to Research</a></div></div>`}`;
});
export {
  ResearchProject as R
};
