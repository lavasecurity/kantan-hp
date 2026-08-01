// Decap CMS OAuth proxy — Cloudflare Pages Functions
// Adapted from https://github.com/i40west/netlify-cms-cloudflare-pages
// (BSD-3-Clause). Redirects the editor to GitHub's OAuth authorize page.

export async function onRequest(context) {
  const client_id = context.env.OAUTH_GITHUB_CLIENT_ID;

  if (!client_id) {
    return new Response(
      'Missing OAUTH_GITHUB_CLIENT_ID. Set it in the Cloudflare Pages project settings under "Environment variables".',
      { status: 500 },
    );
  }

  try {
    const url = new URL(context.request.url);
    const redirectUrl = new URL('https://github.com/login/oauth/authorize');
    redirectUrl.searchParams.set('client_id', client_id);
    redirectUrl.searchParams.set('redirect_uri', url.origin + '/api/callback');
    redirectUrl.searchParams.set('scope', 'repo');
    const state = crypto.randomUUID().replaceAll('-', '');
    redirectUrl.searchParams.set('state', state);

    // Persist state in a SameSite/HttpOnly cookie so /api/callback can verify
    // that the authorization code it receives was initiated by this site
    // (CSRF / login-confusion protection).
    const stateCookie = `decap_oauth_state=${state}; Path=/api; HttpOnly; SameSite=Lax; Secure; Max-Age=600`;

    return new Response(null, {
      status: 302,
      headers: {
        Location: redirectUrl.href,
        'Set-Cookie': stateCookie,
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }
}
