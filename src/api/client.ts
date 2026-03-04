/**
 * API client for KyberNode forms.
 * Uses relative paths so it works on the same Netlify domain.
 * In local dev, Vite proxy or netlify dev handles routing.
 */

export type ContactPayload = {
  name: string
  email: string
  spend: string
  message: string
}

export type SubscribePayload = {
  email: string
}

export async function submitContact(data: ContactPayload): Promise<{ ok: boolean; message?: string }> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(json.error || json.detail || 'Failed to send message')
  }
  return json
}

export async function submitSubscribe(data: SubscribePayload): Promise<{ ok: boolean; message?: string }> {
  const res = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(json.error || json.detail || 'Failed to subscribe')
  }
  return json
}
