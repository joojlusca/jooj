# Descobertas e Restrições (findings.md)

Este arquivo registra as informações extraídas dos PDFs de referência dos projetos criados e as especificações técnicas gerais.

## 1. Projetos a Serem Exibidos

### A. BarberFlow — Agendamento Premium para Barbearias
*   **Propósito:** Agendamento online fluido e otimizado para barbearias de alto padrão.
*   **Identidade Visual:** Fundo escuro com acentos em laranja/âmbar quente, tipografia com serifas itálicas elegantes nos títulos secundários ("próximo nível", "sucesso diário", "experiência do cliente").
*   **Seções Principais:**
    *   **Hero:** "Eleve sua barbearia para o próximo nível" com CTA "Cadastrar Barbearia Grátis" e "Ver Recursos".
    *   **Recursos/Funcionalidades:** Módulo Admin, Fluxo em Tempo Real (Logs de sistema), Agendamento em 4 Passos (Interface do cliente).
    *   **Filosofia:** "Nós focamos na experiência do cliente e na fluidez do seu negócio."
    *   **Protocolo:** Passo 1: Registre sua Barbearia -> Passo 2: Compartilhe o Link -> Passo 3: Monitore sua Agenda.
    *   **Preços:** Plano unificado de R$ 95,50/mês.

### B. Cosa Nostra Company — Streetwear de Verdade
*   **Propósito:** Marca underground de streetwear com drops limitados e foco na cultura de rua.
*   **Identidade Visual:** Cores preto, vermelho vibrante e branco. Estilo brutalista, fontes grossas sem serifa (Impact/Inter Extra Bold) e grafismo urbano.
*   **Seções Principais:**
    *   **Hero:** "RESPECT THE FAMILY." com imagem do mascote da marca (desenho clássico gangster).
    *   **Drops (Lançamentos):** Calça Baggy Preta Estonada (R$ 129,90), Camiseta Cortez Brasil (R$ 79,90), Camiseta Essentials (R$ 129,00), Short Tactel NK (R$ 64,90).
    *   **Filosofia/Manifesto:** "NOT JUST A BRAND. A CREW." Underground Exclusivity, Raw Industrial Design, The Mob Mentality.
    *   **Área de Vendas (Catálogo):** Filtros por categoria (Todos, Calçados, Roupas, Acessórios, Promoção) e grade de itens com preços e descontos.

### C. ML Estética — Estética Avançada & Personalizada
*   **Propósito:** Clínica de estética avançada e atendimento personalizado de Maria Luisa.
*   **Identidade Visual:** Elegante, tons de roxo/magenta escuro, dourado/champagne e rosa pastel. Clima premium, clínico-boutique.
*   **Seções Principais:**
    *   **Hero:** "Estética Avançada é a Transformação."
    *   **Sobre Maria Luisa:** "+300 clientes satisfeitas" e "5 anos de experiência".
    *   **Procedimentos:** Limpeza de Pele, Drenagem Linfática, Microagulhamento, LED Terapêutico, Ultrassom, Massagens, Sobrancelhas, Lipedema.
    *   **Protocolo ML:** Passo 1: Diagnóstico Facial Integrado -> Passo 2: Protocolo Personalizado -> Passo 3: Aplicação & Acompanhamento.
    *   **Depoimentos:** Avaliações de 5 estrelas de clientes como Ana Paula Silva, Beatriz Oliveira e Fernanda Costa.

---

## 2. Restrições e Requisitos Técnicos
*   **Stack:** React 19, Tailwind CSS v3.4.17, GSAP 3 (com ScrollTrigger), Lucide React.
*   **Preset do Portfólio:** Midnight Luxe (Obsidiana, Champagne, Marfim).
*   **Overlay de Ruído:** Filtro SVG `<feTurbulence>` com opacidade 0.05.
*   **Showrooms:** Precisam ser funcionais (widgets simulados que reagem a ações reais do usuário).
