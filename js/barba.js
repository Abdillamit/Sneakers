const tl = gsap.timeline();

const pageOut = (container) => {
  return tl.to(container, {
    x: 1500,
    duration: 1,
  });
}

barba.init({
  transitions: [
    {
      name: "catalog",
      async leave(data) {
        await pageOut(data.current.container);
        data.current.container.remove();
      },
    },
  ],
});
