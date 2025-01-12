export const navbarQuery = `
  *[_type == "navbar"][0] {
    logo,
    navLinks[] {
      label,
      href
    },
    button {
      text,
      url
    }
  }
`;
