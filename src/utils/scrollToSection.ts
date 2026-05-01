const NAVBAR_OFFSET = 112;

export function scrollToSection(sectionId: string, behavior: ScrollBehavior = 'smooth') {
  const element = document.getElementById(sectionId);

  if (!element) {
    return false;
  }

  const top = element.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
  window.scrollTo({ top: Math.max(top, 0), behavior });
  return true;
}
