-- Executar em Cloudflare D1 antes de ativar o webhook.
-- NÃO colocar dados reais, chaves ou tokens no repositório.
CREATE TABLE IF NOT EXISTS incoming_messages (
  message_id TEXT PRIMARY KEY,
  phone TEXT NOT NULL,
  sender_name TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL,
  provider_timestamp TEXT NOT NULL DEFAULT '',
  received_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_incoming_messages_phone
  ON incoming_messages(phone, received_at DESC);
