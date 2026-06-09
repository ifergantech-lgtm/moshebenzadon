const GITHUB_API = 'https://api.github.com';

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'method not allowed' });
  }

  // Parse body — Vercel may pre-parse it or leave it as a string
  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ ok: false, error: 'invalid json body' });
  }

  const { password, content, images } = body ?? {};

  // Auth
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ ok: false, error: 'unauthorized' });
  }

  // Validate content shape
  if (
    !content ||
    typeof content !== 'object' ||
    typeof content.settings !== 'object' ||
    !Array.isArray(content.listings)
  ) {
    return res.status(400).json({ ok: false, error: 'invalid content' });
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';

  // Helper: read existing file sha, then PUT the file
  async function putFile(path, base64Content, message) {
    const headers = {
      Authorization: `Bearer ${token}`,
      'User-Agent': 'cjr-admin',
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    };

    // GET to retrieve existing sha (needed for updates; omit for new files)
    let sha;
    const getRes = await fetch(
      `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
      { headers }
    );
    if (getRes.ok) {
      const existing = await getRes.json();
      sha = existing.sha;
    } else if (getRes.status !== 404) {
      const errBody = await getRes.json().catch(() => ({}));
      throw new Error(errBody.message || `GitHub GET failed: ${getRes.status}`);
    }

    // PUT to create or update
    const putBody = { message, content: base64Content, branch };
    if (sha) putBody.sha = sha;

    const putRes = await fetch(
      `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`,
      { method: 'PUT', headers, body: JSON.stringify(putBody) }
    );
    if (!putRes.ok) {
      const errBody = await putRes.json().catch(() => ({}));
      throw new Error(errBody.message || `GitHub PUT failed: ${putRes.status}`);
    }
  }

  try {
    // Commit images first (if provided)
    if (Array.isArray(images)) {
      for (const img of images) {
        if (!img || typeof img.path !== 'string' || typeof img.dataBase64 !== 'string') {
          continue;
        }
        // Strip data URL prefix if present: "data:<mime>;base64,<data>"
        const raw = img.dataBase64.replace(/^data:[^;]+;base64,/, '');
        await putFile(img.path, raw, 'admin: upload image');
      }
    }

    // Commit content.json
    const json = JSON.stringify(content, null, 2);
    const base64Json = Buffer.from(json, 'utf8').toString('base64');
    await putFile('public/data/content.json', base64Json, 'admin: update site content');

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err.message || err) });
  }
}
