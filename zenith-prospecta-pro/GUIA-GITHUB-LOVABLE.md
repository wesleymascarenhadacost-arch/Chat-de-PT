# Zenith Prospecta Pro — trabalho pelo GitHub e sincronização com Lovable

## Objetivo
Continuar desenvolvendo a Zenith Prospecta Pro **pelo GitHub**, sem gastar créditos de chat do Lovable em cada mudança, e permitir visualização da evolução pelo Lovable **quando** um projeto Lovable estiver conectado por Git Sync.

## Estado real (31/10/2026)
- Código atual: `zenith-prospecta-pro/index.html`, com CRM, 30 contatos iniciais, mensagens e histórico manual por contato.
- Preparação de webhook oficial: `zenith-prospecta-pro/server/worker.js`; NÃO está implantado.
- Site antigo em `zenith-prospecta-manual/index.html` continua funcionando e **não deve ser substituído** sem autorização.
- Este repositório `Chat-de-PT` é um repositório GitHub **existente**, e não está comprovado que seja o repositório Git Sync de algum projeto Lovable.
- O Lovable recusou tentativas recentes de criar um projeto nas duas áreas de trabalho por **falta de créditos**.
- O GitHub não substitui a execução de um servidor, a API oficial do WhatsApp ou a API do Google Maps.

## Caminho A — melhorar pelo GitHub agora
1. O dono pede mudanças na Zenith Prospecta Pro pelo ChatGPT, usando o GitHub conectado.
2. O código é editado diretamente em `zenith-prospecta-pro/index.html` (ou nos arquivos de backend necessários).
3. Testar a nova interface antes de publicar outra versão; não enviar mensagens de teste a clientes.
4. Versionar tudo com commits. Em produção, nunca publicar segredos nem registros privados de WhatsApp no repositório público.

Esta parte já é viável sem chamadas à IA do Lovable.

## Caminho B — importar a Zenith para Lovable, depois ativar Git Sync
De acordo com a documentação oficial do Lovable, **não é possível vincular diretamente um repositório GitHub já existente pelo Git Sync**: ao conectar um projeto, o Lovable cria **um repositório novo**. O fluxo correto é:

1. Ter créditos suficientes para iniciar um projeto/importação. Mesmo que a primeira importação do usuário possa ter primeiro build gratuito, o Lovable exige saldo de créditos disponível.
2. Abrir o Lovable, clicar no `+` junto à entrada e selecionar **Import project to Lovable**, `Everything else` -> `Upload code`. Enviar um ZIP contendo SOMENTE a nova Zenith (sem `.env`, senhas, tokens ou conversas de clientes).
3. Após migrar e conferir o projeto, ir a **Project settings -> Git -> GitHub**, autorizar a conta GitHub e conectar. O Lovable criará novo repositório sincronizado.
4. Obter o nome do novo repositório Lovable. Daí em diante, usar o GitHub para **editar o código desse novo repositório**. Os commits na branch ativa sincronizam de volta para o Lovable.
5. Evitar editar a versão antiga e não misturar branches. Garantir que o backup JSON do CRM possa ser importado. Não assumir que `localStorage` passa entre domínios.
6. Projetos com dados de clientes precisam de autenticação, banco com controle de acesso e backend próprio: não usar dados reais em código estático público.

Documentação:
- https://docs.lovable.dev/integrations/git-sync-overview
- https://docs.lovable.dev/integrations/github
- https://docs.lovable.dev/features/projects/import-project

## Limites e custos reais
- **Git Sync sincroniza código, NÃO prompts de IA.** Enviar um novo pedido ao agente IA do Lovable continua sujeito a créditos.
- Google Places exige credenciais, permissões de uso, limites e pode gerar cobrança. Não fazer scraping de dados restritos.
- O WhatsApp Business/Cloud API exige autorização real, integração com backend, políticas de opt-in e modelos aprovados quando aplicáveis. Não disparar automaticamente para desconhecidos.
- GitHub Actions podem executar testes/deploys de código respeitando limites do GitHub, mas não devem ser usados para fingir que créditos de IA foram pagos nem para contornar restrições de provedores.
- Não colocar tokens da Meta, Google ou Lovable no GitHub público.

## Exemplos de comandos para o ChatGPT usar com @GitHub
- "Na Zenith Prospecta Pro, adicione filtro de empresas por cidade, sem apagar contatos. Teste a interface."
- "Na Zenith Pro, melhore a tela Conversas para celular e mantenha o WhatsApp Business funcionando."
- "Na Zenith Pro, faça importação JSON de backup e preserve status de mensagens."
- "Corrija o erro do formulário de empresas no GitHub e confirme que os 30 contatos aparecem."

Quando houver uma branch sincronizada do Lovable, os arquivos do repositório **dessa branch** serão o lugar de edição; a transferência do código deve ser revisada antes para preservar o estado do projeto.

## Proteção de dados
Não criar issues públicas contendo números privados, tokens, conversas reais, senhas ou credenciais. Realizar qualquer autenticação da Meta, GitHub ou Lovable somente nos respectivos painéis oficiais.
