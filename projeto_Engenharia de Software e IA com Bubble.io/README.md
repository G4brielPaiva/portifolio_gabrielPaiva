# 🚀 CineFlow: Gestão e Recomendação Inteligente (Engineered on Bubble)

## 📝 Descrição do Projeto
O **CineFlow** evoluiu de um rascunho de IA para uma plataforma web completa de gestão e recomendação, desenvolvida no **Bubble.io**. Diferente de um simples rascunho gerado por IA, este projeto foi refatorado sob os princípios de **Engenharia de Software**, garantindo que a lógica de permissões, a governança de dados e a escalabilidade (otimização de WUs) estejam prontas para o mundo real.

O sistema permite que usuários gerenciem suas bibliotecas de mídia, recebam sugestões personalizadas e mantenham seus dados protegidos através de protocolos de **Privacy by Design**.

---

## 🏗️ Arquitetura de Dados (Mapeamento Prévio)
Para evitar o *hardcode* e garantir a integridade, o banco de dados foi estruturado da seguinte forma:

* **Entidades (Data Types):**
    * `User`: Dados de perfil e credenciais.
    * `Filme`: Título, Gênero (ligado ao Option Set), Capa e Metadados.
    * `Avaliação`: Relação entre Usuário e Filme, contendo a Nota e Comentários.
* **Option Sets (Global Constants):**
    * `Status_Avaliacao`: Pendente, Concluída, Arquivada.
    * `Categorias`: Ação, Drama, Sci-Fi, etc. (Evitando textos soltos no banco).

---

## 🔒 Segurança e Governança (Step 5 & 7)
Implementamos camadas de segurança rigorosas para evitar vazamentos (OWASP Top 10 LCNC):
* **Privacy Rules:** Criada a regra `This Avaliação's Creator is Current User`, garantindo que um usuário jamais visualize as notas ou histórico de outro usuário via busca no lado do cliente.
* **Organização de Workflows:** Lógicas coloridas por categoria (Verde para navegação, Vermelho para exclusão) e documentadas via **Notes** para facilitar a manutenção por outros engenheiros.

---

## 🚀 Diferenciais Técnicos e Otimização
* **Eficiência de Carga (WUs):** Buscas otimizadas em *Repeating Groups* para reduzir o consumo de Unidades de Carga de Trabalho do Bubble.
* **Interface Responsiva:** Refatoração manual do layout gerado pela IA utilizando **Flexbox (Containers e Alinhamentos)** para garantir usabilidade em dispositivos móveis.
* **Prompt Engineering:** Uso de instruções avançadas no Bubble AI para gerar o blueprint inicial, seguido de refatoração humana para lógicas de permissão complexas.

---

## 📉 Estratégia de Saída (Vendor Lock-in Mitigation)
Reconhecendo que o Bubble retém a posse do código-fonte, a estratégia de mitigação para o CineFlow consiste em:
1.  **Data API:** Habilitação da API de Dados para extração de tabelas em formato JSON.
2.  **Modularidade:** Lógicas de negócio documentadas em linguagem natural (Markdown), permitindo a migração para uma arquitetura **React + Node.js** caso o sistema escale para milhões de usuários.

---

## 🔧 Links de Entrega
* **Aplicação em Produção:** [Visualizar CineFlow (Bubble)](https://gabrielaluno321.bubbleapps.io/version-test)
* **Editor/Arquitetura:** [Link do Editor Bubble](https://bubble.io/page?id=gabrielaluno321)
* **Documentação do Banco:** [Acesse o PDF/Planilha aqui]

---
[Voltar ao portfólio](https://github.com/gabriel-cs)