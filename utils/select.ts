const select = (
  el: string,
  all: boolean = false
): Element[] | Element | null => {
  el = el.trim();
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
  }
};
export default select;
