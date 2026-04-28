# ⚔️ Batalha de Modelos & Engenharia de Prompt (XML)

## 📝 Descrição do Projeto
[cite_start]Este projeto consiste em um desafio de **metacognição e análise técnica** voltado para o desenvolvimento Front-end via Inteligência Artificial[cite: 42, 43]. [cite_start]O objetivo central é avaliar a precisão técnica e a conformidade de diferentes **LLMs (Large Language Models)** ao processarem um prompt estruturado em **XML** para a criação de uma página de "Busca Inteligente de Estágios"[cite: 45, 48].

[cite_start]Diferente de uma abordagem estética, o foco da atividade foi medir a fidelidade às instruções: respeito à paleta de cores (#F9FAFB, #3B82F6, #8B5CF6), tipografia específica e implementação de funcionalidades obrigatórias como menus de âncora e soluções de agregação de vagas[cite: 48, 50].
 
## 🚀 Tecnologias e Modelos Testados
[cite_start]A avaliação foi realizada submetendo o mesmo protocolo XML aos seguintes modelos[cite: 47]:
* [cite_start]**Modelos Globais:** ChatGPT (GPT), Gemini, Claude, DeepSeek, Qwen e Grok[cite: 47, 50].
* [cite_start]**Modelo Nacional:** Maritaca[cite: 50].
* [cite_start]**Linguagens Geradas:** HTML5 e CSS3 integrado em formato Single Page[cite: 46, 48].

## 📊 Resultados e Quadro Comparativo
[cite_start]A experiência revelou disparidades significativas na "compreensão" das tags estruturadas e na eficiência de geração de código[cite: 50, 51].

| Critério | ChatGPT | Gemini | DeepSeek | Claude | Maritaca |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Precisão do Prompt** | [cite_start]Péssimo em cativar [cite: 50] | [cite_start]Entregou o solicitado [cite: 50] | [cite_start]**Exatamente o pedido** [cite: 50] | [cite_start]Fugiu do pedido [cite: 50] | [cite_start]Muito ruim [cite: 50] |
| **Qualidade HTML** | [cite_start]Muito simples [cite: 50] | [cite_start]Alguns erros simples [cite: 50] | [cite_start]Fácil de entender [cite: 50] | [cite_start]Muitos caracteres inúteis [cite: 50] | [cite_start]Muitos erros [cite: 50] |
| **Tokens Gastos** | [cite_start]900 a 1.100 [cite: 51] | [cite_start]1.350 [cite: 51] | [cite_start]3.200 [cite: 51] | [cite_start]4.800 [cite: 51] | [cite_start]1.100 [cite: 51] |

### 🧠 Reflexão Crítica
* [cite_start]**Melhor Compreensão XML:** O modelo **DeepSeek** demonstrou a maior capacidade de interpretar e obedecer à estrutura lógica do prompt em XML[cite: 55].
* [cite_start]**Verbosidade:** Notou-se uma diferença drástica no consumo de recursos entre as IAs, variando de $900$ a $4.800$ tokens para o mesmo objetivo[cite: 51, 57].
* [cite_start]**Veredito para Prototipagem:** Com base nos testes, o **DeepSeek** é a ferramenta escolhida tanto para prototipagem rápida quanto para códigos complexos devido à sua alta fidelidade às restrições técnicas[cite: 58, 59].

## 🔧 Exemplo de Estrutura Utilizada (XML)
[cite_start]O prompt foi organizado em tags específicas para garantir que a IA seguisse as diretrizes sem ignorar detalhes[cite: 48]:
```xml
<tarefa>
  <objetivo>Criar uma página HTML5 única com CSS3 interno</objetivo>
  <diretrizes_design>
    <layout>Responsivo e minimalista</layout>
    <paleta_cores>60% #F9FAFB, 30% #3B82F6, 10% #8B5CF6</paleta_cores>
  </diretrizes_design>
</tarefa>
