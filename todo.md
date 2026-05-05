# Jitsi Meeting Manager - TODO

## Fase 1: Estrutura e Dados
- [x] Implementar modelo de dados (Meeting interface com id, titulo, data_hora, slug_jitsi, cor_hex, concluida)
- [x] Criar dados fictícios com 5 reuniões em datas diferentes
- [x] Implementar estado global com Context API + useReducer
- [x] Configurar persistência com AsyncStorage

## Fase 2: Componentes de UI
- [x] Criar componente MeetingItem com borda colorida
- [x] Criar componente DateHeader para cabeçalhos de data
- [x] Criar componente SearchBar com ícone de lupa
- [x] Criar componente ColorFilter (seletor horizontal de cores)
- [x] Criar componente MeetingList com agrupamento por data

## Fase 3: Lógica de Filtro
- [x] Implementar função de busca em tempo real (filtra por título)
- [x] Implementar filtro por cor
- [x] Implementar combinação de filtros (busca + cor)
- [x] Implementar função de ordenação por data (decrescente)

## Fase 4: Integração Jitsi
- [x] Implementar geração de URL Jitsi (https://meet.jit.si/[slug])
- [x] Implementar abertura de reunião via WebView
- [x] Implementar deep linking para reuniões
- [x] Testar abertura de reunião no navegador

## Fase 5: Funcionalidades Adicionais
- [ ] Criar tela de detalhes da reunião
- [x] Implementar criar/editar reunião
- [ ] Implementar marcar reunião como concluída
- [x] Implementar deletar reunião
- [x] Adicionar ícones e branding

## Fase 9: Novas Funcionalidades (Segunda Rodada de Melhorias)
- [x] Implementar exclusão de reuniões com confirmação
- [x] Melhorar mensagem de sucesso ao criar reunião
- [x] Adicionar seção de histórico de chamadas na home screen
- [x] Rastrear histórico de reuniões concluídas/passadas

## Fase 10: Botão Cancelar em Tarefas
- [x] Adicionar botão de cancelar/deletar em cada item de reunião
- [x] Implementar confirmação ao deletar diretamente da lista
- [x] Atualizar visual do MeetingItem com botão de delete

## Fase 11: Aba de Histórico Separada
- [ ] Criar aba "Histórico" ao lado da aba "Home"
- [ ] Mover reuniões deletadas/passadas para o histórico
- [ ] Remover seção de histórico da home screen
- [ ] Atualizar lógica de deleção para mover para histórico em vez de deletar

## Fase 8: Novas Melhorias (Solicitado pelo Usuário)
- [x] Adicionar nomes descritivos para as cores (Azul, Vermelho, Amarelo, etc.)
- [x] Criar tela de criar/editar reunião com formulário completo
- [x] Implementar date picker para seleção de data e hora
- [x] Implementar color picker visual com nomes das cores
- [x] Adicionar botão "+" no header para criar nova reunião
- [x] Implementar navegação para tela de criar/editar
- [x] Corrigir funcionalidade dos botões Criar/Atualizar
- [x] Corrigir date picker e time picker para funcionar em iOS e Android
- [x] Adicionar botão "Confirmar" para iOS nos date/time pickers

## Fase 6: Estilização e Polish
- [x] Aplicar tema Google Tasks (cores, tipografia, espaçamento)
- [x] Implementar dark mode
- [x] Adicionar feedback visual (press states, haptics)
- [x] Testar responsividade em diferentes tamanhos de tela

## Fase 7: Testes e Entrega
- [x] Testar todos os fluxos de usuário
- [x] Testar em iOS e Android
- [x] Criar checkpoint final
- [x] Entregar aplicativo ao usuário
