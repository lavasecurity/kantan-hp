// Decap CMS OAuth proxy — Cloudflare Pages Functions
// Adapted from https://github.com/i40west/netlify-cms-cloudflare-pages
// (BSD-3-Clause). Exchanges the GitHub auth code for an access token and
// hands it back to the Decap CMS login window via postMessage.

function renderBody(status, content, origin) {
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
          'authorization:github:${status}:${JSON.stringify(content)}',
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

  try {
    const url = new URL(context.request.url);
    const origin = url.origin;
    const code = url.searchParams.get('code');
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
    if (result.error) {
      return new Response(renderBody('error', result, origin), {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
        status: 401,
      });
    }
    return new Response(renderBody('success', { token: result.access_token, provider: 'github' }, origin), {
      headers: { 'content-type': 'text/html;charset=UTF-8' },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(renderBody('error', { message: error.message }, origin), {
      headers: { 'content-type': 'text/html;charset=UTF-8' },
      status: 500,
    });
  }
}
