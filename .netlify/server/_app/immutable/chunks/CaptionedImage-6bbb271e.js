import { c as create_ssr_component, b as add_attribute, e as escape } from "./index-85307065.js";
const CaptionedImage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { src } = $$props;
  let { caption } = $$props;
  let { alt } = $$props;
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.caption === void 0 && $$bindings.caption && caption !== void 0)
    $$bindings.caption(caption);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
    $$bindings.alt(alt);
  return `<div class="${"py-2 my-4"}"><img class="${"max-h-96 object-cover object-center"}"${add_attribute("src", "/images/" + src, 0)}${add_attribute("alt", alt, 0)}>
  <p class="${"text-primary-800 mt-2 text-sm"}">${escape(caption)}</p></div>`;
});
export {
  CaptionedImage as C
};
