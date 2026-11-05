# 🕊️ Palavra Diária - App Devocional Evangélico

Um aplicativo evangélico completo (Web, Android, iOS e PC) com devocional diário, bases bíblicas, reflexões motivacionais, narração por voz, criador de artes com Jesus em IA para Instagram Stories/Feed e compartilhamento direto para o WhatsApp.

---

## 📱 Como este aplicativo funciona no celular das pessoas

O **Palavra Diária** já foi desenvolvido com tecnologia **PWA (Progressive Web App)** nativa, o que significa que ele pode ser transformado em aplicativo de 3 formas diferentes, dependendo de como você deseja distribuir:

---

### Opção 1: App Instalável via Link / QR Code (Recomendado, 100% Gratuito)
As pessoas não precisam entrar na Google Play nem pagar nada. Você apenas envia o link no WhatsApp ou coloca na bio do Instagram `@cultodoempreendedoruva`:

1. A pessoa abre o link no celular (Android ou iPhone).
2. Toca no botão **"Baixar App"** no topo da tela ou:
   - **No Android:** clica em *"Instalar aplicativo"* ou *"Adicionar à tela inicial"*.
   - **No iPhone (Safari):** toca no botão de compartilhar (quadrado com a seta para cima) e clica em *"Adicionar à Tela de Início"*.
3. O ícone oficial do **Palavra Diária** aparece na tela inicial do celular.
4. Ele abre em tela cheia (sem cara de site), com carregamento instantâneo e suporte offline!

#### 🚀 Como colocar na internet em 2 minutos (Grátis):
- **Opção A (Mais fácil - Netlify Drop):**
  1. Acesse [app.netlify.com/drop](https://app.netlify.com/drop).
  2. Arraste e solte a pasta `app-devocional-diario` inteira dentro da página.
  3. Em 30 segundos ele gera um link público (ex: `palavra-diaria.netlify.app`) pronto para divulgar!
- **Opção B (Vercel ou GitHub Pages):**
  - Conecte o repositório ou faça upload na Vercel para ter um domínio gratuito e seguro (HTTPS).

---

### Opção 2: Gerar um Arquivo Instalador APK para Android
Se você quiser ter o arquivo `.apk` para enviar diretamente pelo WhatsApp para as pessoas baixarem e instalarem no celular Android:

1. Publique o app na internet (pelo Netlify Drop ou Vercel).
2. Acesse a ferramenta gratuita oficial da Microsoft: [PWABuilder.com](https://www.pwabuilder.com).
3. Cole a URL do seu app publicado e clique em **"Start"**.
4. Clique em **"Android" > "Package"** e baixe o arquivo `.apk` pronto para instalar!

---

### Opção 3: Publicar nas Lojas Oficiais (Google Play Store e Apple App Store)
- O mesmo pacote gerado pelo **PWABuilder** ou empacotado com **Capacitor** pode ser enviado para a Google Play Store (taxa única de $25 da Google) ou Apple App Store ($99/ano da Apple).
- O app já cumpre todos os requisitos técnicos: `manifest.json`, `sw.js` com cache offline, ícone `icon.svg` em alta resolução e modo standalone.

---

## ✨ Recursos Inclusos no Aplicativo

1. **Devocional Diário com Data Atual:**
   - Exibição da data por extenso e versículo bíblico chave.
   - Reflexão inspiradora e edificante para o dia.
   - Oração diária fortalecedora.
   - Desafio prático de atitude cristã.
   - Calendário para navegar por qualquer dia do ano.

2. **🟢 Compartilhamento Completo no WhatsApp:**
   - Mensagem formatada com data, versículo, reflexão e oração.
   - Inclui o link do Instagram `https://www.instagram.com/cultodoempreendedoruva` e assinatura `Evangelista Rodolfo`.

3. **📸 Cartões com Pinturas de Jesus em IA para Instagram:**
   - Formatos **Stories (9:16)** e **Feed (1:1)** em 1080p.
   - Ilustrações bíblicas temáticas de Jesus: *Bom Pastor*, *Acalma a Tempestade*, *Braços Abertos* e *Oração no Monte*.
   - Filtro cinematográfico para leitura nítida do versículo sobre a imagem.

4. **🔊 Leitura por Áudio:**
   - Narração por voz suave em português do devocional e oração.

5. **👥 Lista de Contatos do WhatsApp & Envio Direcionado:**
   - **Importação Direta do Celular:** Pega contatos nativos da agenda do aparelho com 1 toque (Contact Picker API).
   - **Importação por Arquivo (.vcf / CSV):** Importa contatos exportados do WhatsApp, Google Contatos ou iCloud.
   - **Cadastro Manual & Colar em Lote:** Cadastre contatos manualmente ou cole listas completas.
   - **Envio Individual em 1 Toque:** Abre o WhatsApp com a conversa do contato já selecionada e a mensagem do dia preenchida.
   - **Controle de Envio Diário:** Identifica quem já recebeu o devocional hoje e quem ainda está pendente.
   - **Fila Rápida:** Botão para avançar e enviar para o próximo contato pendente sem se perder.

6. **❤️ Meus Favoritos & 📝 Diário de Oração Pessoal:**
   - Salve devocionais especiais e anote pedidos de oração que ficam gravados no próprio celular.
