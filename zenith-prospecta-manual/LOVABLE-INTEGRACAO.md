# Zenith Prospecta Pro — implementação no Lovable

## Situação em 31/10/2026
- A Zenith Prospecta atual permanece publicada como HTML em `zenith-prospecta-manual/index.html`. **Não substituir nem editar a versão de produção** até os testes da nova.
- O usuário relatou que autorizou o WhatsApp Business na Meta e conectou o Google Maps, mas **o estado da autorização por projeto não pôde ser confirmado** pelos conectores consultados.
- Catálogo do Lovable oferece **WhatsApp Business** e **Google Maps Platform** em ambas as áreas de trabalho; isso não comprova que credenciais e permissões do projeto estejam validadas.
- Tentativa de criar projeto em ambas as áreas em 31/10/2026: Lovable retornou **sem créditos**. Nenhum projeto novo foi criado.

## Objetivo
Criar **novo projeto** Zenith Prospecta Pro no Lovable, sem alterar o atual, para prospecção comercial responsável e atendimento de clientes com consentimento.

## Telas
1. **Dashboard**: oportunidades por etapa, conversas reais, propostas e fechamentos.
2. **Empresas**: contato, localização, segmento, canal de origem, notas, consentimento, site *A verificar*, etapa e tags. Importar CSV/JSON; exportar, backups; evitar duplicações.
3. **Busca de empresas**: Google Maps Platform/Places oficial, se autorizado; filtro por cidade e segmento (SP, RJ, BH). Respeitar termos, atribuições, limites de uso e evitar coleta em massa indevida. Se não conectado, abrir pesquisa manual no Maps.
4. **Roteiro**: seis etapas (abordagem, conhecer o negócio, entender a necessidade, apresentar solução, proposta, fechamento), duas opcionais (retorno respeitoso e pós-venda); personalizar por empresa; editar, copiar, salvar, marcar progresso manualmente.
5. **Caixa de entrada WhatsApp Business**: somente conversas reais com integração oficial confirmada, histórico, mensagens recebidas, fila e status; sem inventar respostas. Permitir responder manualmente, revisar o texto antes de enviar.
6. **Configurações**: estado real das integrações "Conectado"/"Precisa conectar"/"Falha", painel de permissões, status de verificação e de custos, sem expor credenciais.
7. **Importação da Zenith anterior**: aceitar o JSON exportado e preservar `contacts`, `searches`, `templates`, `seller`, e em cada contato `name`, `phone`, `city`, `segment`, `stage`, `site`, `notes`, `address`, `maps`, `created`, `sequenceDone`, `sequenceCustom`. Como o site atual usa localStorage em outro domínio, a importação precisa acontecer pelo arquivo que o usuário exportar na versão antiga; não alegar sincronização direta.

## WhatsApp / conformidade
- Priorizar integração **WhatsApp Business** disponível no Lovable; **verificar no projeto** antes de habilitar os botões de envio.
- Autenticação Meta e autorizações via fluxo oficial; tokens e credenciais somente no servidor, nunca em JS público.
- Receber webhooks com assinatura validada, deduplicação de eventos e sincronização com dados privados.
- Observar janela de atendimento, templates aprovados e regras de opt-in. A opção de iniciar contato por template não deve ser habilitada sem permissão e autorização reais.
- **Nenhuma mensagem automática ou em massa a desconhecidos**. Na interface, um botão manual "Revisar e enviar" deve ter confirmação explícita.
- Fallback seguro: "Abrir WhatsApp Business" por Android intent já implementado no site anterior. Não enviar testes a números de clientes.

## Dados e qualidade
- Backend com autenticação, autorização por usuário/empresa, RLS, logs e controle de erros. Nenhuma conversa particular exposta em página pública.
- Mobile-first, cores azul escuro e azul, fonte das mensagens 18–20 px, acessível no Android.
- Teste end-to-end somente com conta/número autorizado do proprietário; não usar clientes reais para testes sem permissão.
- Conferir custos Google Maps/Meta/Lovable antes de qualquer ativação que consuma valores.
- Publicação separada após validação; versão antiga fica disponível em paralelo.

## Prompt para iniciar quando houver créditos
"Crie um novo aplicativo Zenith Prospecta Pro mantendo o site antigo intacto. Use o arquivo zenith-prospecta-manual/index.html deste repositório como referência de marca e funcionalidades. Implemente as sete telas acima, banco de dados seguro, importação fiel do backup JSON antigo, integração oficial com WhatsApp Business do Lovable somente quando autorizada de verdade e Google Maps Platform somente com credenciais e limites confirmados. Mostre status real das integrações; não simule conversas como reais. Nunca envie mensagens automaticamente nem em massa. Faça primeiro a versão de homologação para eu testar no Android antes da publicação."
