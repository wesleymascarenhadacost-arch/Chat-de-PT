# Zenith Prospecta Pro — servidor para o WhatsApp oficial

**Situação:** código preparado, não implantado. A página pública em ../index.html não recebe mensagens da Meta sem um backend autorizado.

## O que já existe

- worker.js: recebe verificações e eventos de webhook da Meta, verifica HMAC SHA-256 com META_APP_SECRET (mantido em segredo do servidor), grava somente mensagens de texto, evita duplicatas.
- schema.sql: tabela privada D1 para mensagens recebidas.
- Nenhuma rota pública para consultar números ou históricos. Nenhum endpoint para disparar mensagens. Nenhum envio automático.

## O que falta para ficar funcional

1. Escolher onde hospedar o backend: Lovable (se houver créditos e backend habilitado) ou Cloudflare Workers/D1. GitHub por si só hospeda código, não executa webhooks.
2. Criar banco D1 e executar schema.sql (somente se escolher Cloudflare). Configurar vinculação DB na plataforma de hospedagem.
3. Configurar META_APP_SECRET e META_VERIFY_TOKEN como segredos na plataforma, nunca no GitHub ou no navegador.
4. Configurar callback oficial /webhooks/whatsapp no painel Meta **apenas depois** de verificar o que a integração existente no Lovable já usa. Não substituir um webhook em uso sem planejar migração.
5. Testar com um número autorizado de teste e verificar assinatura, duplicidade e recebimento.
6. Antes de expor uma caixa de entrada real, implementar login, autorização por usuário, separação de organizações e APIs autenticadas de leitura. Não publicar a tabela de conversas para acesso anônimo.
7. Para envio oficial, implementar fluxo separado com autorização, consentimento, janela de atendimento e modelos aprovados. Nunca disparar mensagens comerciais em lote sem permissão.

## Integração Google Places

A aplicação possui busca manual pelo Google Maps. A API oficial Places ainda não está conectada: configure credenciais e faturamento com limites, use servidor para proteger a chave e respeite os termos sobre retenção e exibição de dados.

## Contatos e backup

O site Pro mantém o formato de contatos da versão anterior, incluindo 30 exemplos de negócios públicos. As anotações de conversas são locais e exportadas com o backup JSON. A importação da versão anterior pode ser feita pelo backup, sem expor conversas na página pública.

## Não publicar segredos

Todas as contas e chaves de Meta, Google Maps e Cloudflare devem ficar no painel privado do serviço escolhido; o GitHub é público. O código não deve afirmar que a integração está ativa até um teste autorizado de ponta a ponta.