/**
 * Zenith Prospecta Pro — Meta webhook ingress (Cloudflare Worker + D1)
 * Não é um servidor ativo até ser publicado com segredos privados e D1.
 * Não há endpoints públicos de envio nem leitura de mensagens privadas.
 */
const MAX_BYTES = 262144;
function reply(body,status=200){
  return new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store","x-content-type-options":"nosniff"}});
}
function asText(value,limit=500){
  return typeof value==="string" ? value.slice(0,limit) : "";
}
function sameText(a,b){
  const x=new TextEncoder().encode(String(a||""));
  const y=new TextEncoder().encode(String(b||""));
  let diff=x.length ^ y.length;
  const max=Math.max(x.length,y.length);
  for(let i=0;i<max;i++)diff|=(x[i]||0)^(y[i]||0);
  return diff===0;
}
async function verifySignature(raw,header,secret){
  if(typeof header!=="string"||!header.startsWith("sha256=")||!secret)return false;
  const hex=header.slice(7);
  if(!/^[0-9a-f]{64}$/i.test(hex))return false;
  const bytes=new Uint8Array(hex.match(/.{2}/g).map(h=>parseInt(h,16)));
  const key=await crypto.subtle.importKey("raw",new TextEncoder().encode(secret),{name:"HMAC",hash:"SHA-256"},false,["verify"]);
  return crypto.subtle.verify("HMAC",key,bytes,raw);
}
async function verifyChallenge(url,env){
  const mode=url.searchParams.get("hub.mode");
  const token=url.searchParams.get("hub.verify_token");
  const challenge=url.searchParams.get("hub.challenge");
  if(mode!=="subscribe"||!env.META_VERIFY_TOKEN||!sameText(token,env.META_VERIFY_TOKEN)||!challenge||challenge.length>256)
    return reply({error:"verification_failed"},403);
  return new Response(challenge,{status:200,headers:{"content-type":"text/plain; charset=utf-8","cache-control":"no-store"}});
}
async function receiveWebhook(request,env){
  if(!env.META_APP_SECRET||!env.DB)return reply({error:"not_configured"},503);
  const stated=Number(request.headers.get("content-length")||0);
  if(stated>MAX_BYTES)return reply({error:"payload_too_large"},413);
  const raw=await request.arrayBuffer();
  if(raw.byteLength>MAX_BYTES)return reply({error:"payload_too_large"},413);
  const ok=await verifySignature(raw,request.headers.get("x-hub-signature-256"),env.META_APP_SECRET);
  if(!ok)return reply({error:"signature_invalid"},401);
  let payload;
  try{payload=JSON.parse(new TextDecoder("utf-8",{fatal:true}).decode(raw))}catch(e){return reply({error:"invalid_json"},400)}
  if(payload?.object!=="whatsapp_business_account")return reply({accepted:true,ignored:true});
  for(const entry of payload.entry||[]){
    for(const change of entry.changes||[]){
      if(change?.field!=="messages")continue;
      const value=change?.value||{};
      for(const message of value.messages||[]){
        const id=asText(message?.id,180);
        const phone=asText(message?.from,25);
        if(!id||!phone)continue;
        // Textos apenas; outros tipos precisam de tratamento específico e consentimento.
        if(message?.type!=="text"||typeof message?.text?.body!=="string")continue;
        const waContact=(value.contacts||[]).find(c=>c?.wa_id===message.from);
        const name=asText(waContact?.profile?.name||"",150);
        const body=asText(message.text.body,4000);
        const stamp=asText(message.timestamp||"",30);
        // INSERÇÃO idempotente: reenvios de eventos da Meta não criam duplicatas.
        await env.DB.prepare("INSERT OR IGNORE INTO incoming_messages (message_id,phone,sender_name,body,provider_timestamp,received_at) VALUES (?,?,?,?,?,?)")
          .bind(id,phone,name,body,stamp,new Date().toISOString()).run();
      }
    }
  }
  return reply({accepted:true},200);
}
export default {
  async fetch(request,env){
    const url=new URL(request.url);
    if(url.pathname==="/health"&&request.method==="GET")
      return reply({service:"zenith-prospecta-pro-webhook",status:"ok"});
    if(url.pathname==="/webhooks/whatsapp"&&request.method==="GET")
      return verifyChallenge(url,env);
    if(url.pathname==="/webhooks/whatsapp"&&request.method==="POST"){
      try{return await receiveWebhook(request,env)}
      catch(e){console.error("Webhook processing error");return reply({error:"processing_failed"},500)}
    }
    return reply({error:"not_found"},404);
  }
};
