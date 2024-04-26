const handleLinkClick = (event) => {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export default handleLinkClick;
