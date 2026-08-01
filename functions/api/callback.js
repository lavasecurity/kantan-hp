// Decap CMS OAuth proxy — Cloudflare Pages Functions
// Adapted from https://github.com/i40west/netlify-cms-cloudflare-pages
// (BSD-3-Clause). Exchanges the GitHub auth code for an access token and
// hands it back to the Decap CMS login window via postMessage.

function renderBody(status, content, origin) {
  // JSON.stringify then escape so the payload is a safe single-quoted JS string
  // literal: error messages can contain apostrophes (e.g. "Unexpected token '<'").
  const payload = JSON.stringify(content)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'");
  const html = `
    <script>
      // Only ever hand the token back to a message from this site's own origin.
      // Decap's login window is on the same origin as /api/callback; a malicious
      // site that opened this popup first would otherwise become our opener and
      // could receive the token by replying to the authorizing handshake.
      const ORIGIN = ${JSON.stringify(origin)};
      const receiveMessage = (message) => {
        if (message.origin !== ORIGIN) return;
        window.opener.postMessage(
          'authorization:github:${status}:${payload}',
          ORIGIN
        );
        window.removeEventListener("message", receiveMessage, false);
      };
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    </script>
  `;
  return new Blob([html]);
}

export async function onRequest(context) {
  const { OAUTH_GITHUB_CLIENT_ID: client_id, OAUTH_GITHUB_CLIENT_SECRET: client_secret } =
    context.env;

  if (!client_id || !client_secret) {
    return new Response(
      'Missing OAUTH_GITHUB_CLIENT_ID / OAUTH_GITHUB_CLIENT_SECRET. Set them in the Cloudflare Pages project settings under "Environment variables".',
      { status: 500 },
    );
  }

  const url = new URL(context.request.url);
  const origin = url.origin;

  try {
    const code = url.searchParams.get('code');
    const returnedState = url.searchParams.get('state');

    // Verify the state matches the one /api/auth stored in a SameSite cookie,
    // so an authorization code that was not initiated by this site is rejected.
    const cookies = context.request.headers.get('cookie') || '';
    const match = cookies.match(/(?:^|;\s*)decap_oauth_state=([^;]+)/);
    if (!match || match[1] !== returnedState) {
      return new Response(renderBody('error', { message: 'Invalid OAuth state' }, origin), {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
        status: 403,
      });
    }

    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'user-agent': 'cloudflare-pages-decap-cms-oauth',
        accept: 'application/json',
      },
      body: JSON.stringify({ client_id, client_secret, code }),
    });
    const result = await response.json();
    const clearState = 'decap_oauth_state=; Path=/api; HttpOnly; SameSite=Lax; Secure; Max-Age=0';
    const headers = {
      'content-type': 'text/html;charset=UTF-8',
      'Set-Cookie': clearState,
    };
    if (result.error) {
      return new Response(renderBody('error', result, origin), { headers, status: 401 });
    }
    return new Response(
      renderBody('success', { token: result.access_token, provider: 'github' }, origin),
      { headers, status: 200 },
    );
  } catch (error) {
    console.error(error);
    return new Response(renderBody('error', { message: error.message }, origin), {
      headers: { 'content-type': 'text/html;charset=UTF-8' },
      status: 500,
    });
  }
}
