// Light/dark theme toggle. The FOUC-prevention script in BaseLayout.astro sets
// the initial `data-theme` on <html> before paint; this module only wires the
// toggle button and keeps the choice in localStorage.

const BUTTON_ID = 'theme-toggle';

function reflect(theme: string): void {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem('theme', theme);
  } catch {
    /* private mode / storage unavailable — theme still applies for this page */
  }
}

function setup(): void {
  const button = document.getElementById(BUTTON_ID);
  if (!button) return;
  button.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    reflect(current === 'dark' ? 'light' : 'dark');
  });
}

setup();
