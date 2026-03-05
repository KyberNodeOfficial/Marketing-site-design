import type { Handler } from '@netlify/functions'

interface SubscribeBody {
  email: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  let data: SubscribeBody
  try {
    data = JSON.parse(event.body || '{}')
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON' }) }
  }

  const { email } = data
  if (!email?.trim()) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Email is required' }) }
  }
  if (!EMAIL_REGEX.test(email)) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid email address' }) }
  }

  const webhookUrl = process.env.WEBHOOK_URL
  if (!webhookUrl) {
    console.error('WEBHOOK_URL env var is not set')
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server misconfiguration' }) }
  }

  try {
    const payload = {
      type: 'subscribe',
      email: email.trim(),
      subscribed_at: new Date().toISOString(),
      source: 'kybernode-newsletter',
    }

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      console.error('n8n webhook error:', res.status, await res.text())
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({ error: 'Failed to subscribe. Please try again.' }),
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ok: true,
        message: "You're subscribed. Look for our weekly insights.",
      }),
    }
  } catch (err) {
    console.error('n8n webhook fetch error:', err)
    return {
      statusCode: 502,
      headers,
      body: JSON.stringify({ error: 'Failed to subscribe. Please try again.' }),
    }
  }
}

export { handler }
