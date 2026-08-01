// Decap CMS OAuth proxy — Cloudflare Pages Functions
// Adapted from https://github.com/i40west/netlify-cms-cloudflare-pages
// (BSD-3-Clause). Exchanges the GitHub auth code for an access token and
// hands it back to the Decap CMS login window via postMessage.

function renderBody(status, content) {
  const html = `
    <script>
      const receiveMessage = (message) => {
        window.opener.postMessage(
          'authorization:github:${status}:${JSON.stringify(content)}',
          message.origin
        );
        window.removeEventListener("message", receiveMessage, false);
      }
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
      return new Response(renderBody('error', result), {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
        status: 401,
      });
    }
    return new Response(renderBody('success', { token: result.access_token, provider: 'github' }), {
      headers: { 'content-type': 'text/html;charset=UTF-8' },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(renderBody('error', { message: error.message }), {
      headers: { 'content-type': 'text/html;charset=UTF-8' },
      status: 500,
    });
  }
}
