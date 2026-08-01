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
    return Response.redirect(redirectUrl.href, 302);
  } catch (error) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }
}
