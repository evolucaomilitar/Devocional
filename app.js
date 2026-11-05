// ==========================================================================
// APP DEVOCIONAL DIÁRIO - LÓGICA PRINCIPAL & COMPARTILHAMENTO
// ==========================================================================

let dataSelecionada = new Date();
let devocionalAtual = null;
let formatoInstagram = 'story'; // 'story' (9:16) ou 'feed' (1:1)
let temaInstagram = 'arte-jesus'; // Padrão: Imagens de Jesus geradas por IA
let arteJesusSelecionada = null; // Permite escolher outra arte específica
let cacheImagens = {}; // Cache de imagens carregadas
let synth = window.speechSynthesis;
let isSpeaking = false;

// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  inicializarLucide();
  carregarTemaModo();
  carregarDevocional(dataSelecionada);
  configurarEventos();
  registrarServiceWorker();
});

function inicializarLucide() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// --------------------------------------------------------------------------
// CARREGAMENTO DO DEVOCIONAL
// --------------------------------------------------------------------------
function carregarDevocional(data) {
  devocionalAtual = obterDevocionalPorData(data);

  // Atualiza cabeçalhos e rótulos de data
  const dataExtenso = formatarDataExtenso(data);
  const dataCurta = formatarDataCurta(data);
  const isHoje = formatarDataCurta(new Date()) === dataCurta;

  document.getElementById('headerSubData').textContent = isHoje 
    ? `Hoje, ${dataExtenso}` 
    : `Devocional de ${dataExtenso}`;
  
  document.getElementById('labelDataAtualTopo').textContent = isHoje 
    ? `Hoje, ${data.getDate()} de ${obterNomeMes(data.getMonth())}` 
    : `${data.getDate()} de ${obterNomeMes(data.getMonth())}`;

  document.getElementById('devocionalDataCompleta').textContent = dataExtenso;
  document.getElementById('devocionalTema').textContent = devocionalAtual.tema;
  document.getElementById('devocionalCategoria').innerHTML = `
    <i data-lucide="bookmark" class="w-3.5 h-3.5"></i>
    ${devocionalAtual.categoria || 'Esperança & Fé'}
  `;

  // Versículo & Referência
  document.getElementById('devocionalVersiculo').textContent = `"${devocionalAtual.versiculo}"`;
  document.getElementById('devocionalReferencia').textContent = `— ${devocionalAtual.referencia}`;

  // Reflexão formatada
  const containerReflexao = document.getElementById('devocionalReflexao');
  containerReflexao.innerHTML = `<p>${devocionalAtual.reflexao}</p>`;

  // Oração e Aplicação
  document.getElementById('devocionalOracao').textContent = `"${devocionalAtual.oracao}"`;
  document.getElementById('devocionalAplicacao').textContent = devocionalAtual.aplicacao;

  // Atualiza estado de Favorito
  atualizarIconeFavorito();

  // Carrega anotação do diário de oração para este dia
  carregarDiarioDoDia(dataCurta);

  // Atualiza arte de Jesus da mensagem
  const arte = arteJesusSelecionada || devocionalAtual.imagemJesus || (typeof ARTES_JESUS !== 'undefined' ? ARTES_JESUS.pastor : null);
  const imgElement = document.getElementById('imgJesusDevocional');
  const legendaElement = document.getElementById('legendaArteJesusDevocional');
  const nomeArteAtual = document.getElementById('nomeArteJesusAtual');
  
  if (imgElement && arte) {
    imgElement.src = arte.arquivo;
    imgElement.onerror = () => { if (arte.arquivoLocal) imgElement.src = arte.arquivoLocal; };
    imgElement.alt = arte.titulo;
  }
  if (legendaElement && arte) {
    legendaElement.textContent = arte.titulo;
  }
  if (nomeArteAtual && arte) {
    nomeArteAtual.textContent = arte.titulo;
  }

  // Se o modal do Instagram estiver aberto, renderiza a imagem
  if (!document.getElementById('modalInstagram').classList.contains('hidden')) {
    renderizarCanvasInstagram();
  }

  // Interrompe áudio anterior se estiver falando
  if (isSpeaking && synth) {
    synth.cancel();
    atualizarBotaoAudio(false);
  }

  inicializarLucide();
}

function obterNomeMes(mesIndice) {
  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  return meses[mesIndice];
}

// --------------------------------------------------------------------------
// COMPARTILHAMENTO NO WHATSAPP COM DATA DO DIA E FORMATAÇÃO BÍBLICA
// --------------------------------------------------------------------------
function montarMensagemFormatada() {
  const dataExtenso = formatarDataExtenso(dataSelecionada);
  
  return `🕊️ *PALAVRA DIÁRIA • DEVOCIONAL DA PALAVRA*
📅 *${dataExtenso}*

✨ *Tema:* ${devocionalAtual.tema}

📖 *Versículo do Dia:*
"${devocionalAtual.versiculo}"
— _${devocionalAtual.referencia}_

💬 *Reflexão:*
${devocionalAtual.reflexao}

🙏 *Oração de Hoje:*
"${devocionalAtual.oracao}"

🌿 *Atitude do Dia:*
${devocionalAtual.aplicacao}

━━━━━━━━━━━━━━━━━━━━
Compartilhe esta bênção com quem você ama! Que o Senhor abençoe ricamente o seu dia. ✨

📱 Siga nosso Instagram:
https://www.instagram.com/cultodoempreendedoruva

Evangelista Rodolfo`;
}

function compartilharNoWhatsApp() {
  const texto = montarMensagemFormatada();
  const urlEncoded = encodeURIComponent(texto);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${urlEncoded}`;
  window.open(whatsappUrl, '_blank');
}

// --------------------------------------------------------------------------
// GERADOR DE CARTÃO PARA INSTAGRAM COM HTML5 CANVAS (STORIES & POST)
// --------------------------------------------------------------------------
function abrirModalInstagram() {
  const modal = document.getElementById('modalInstagram');
  modal.classList.remove('hidden');
  renderizarCanvasInstagram();
}

function fecharModalInstagram() {
  const modal = document.getElementById('modalInstagram');
  modal.classList.add('hidden');
}

function renderizarCanvasInstagram() {
  const canvas = document.getElementById('canvasPreview');
  const ctx = canvas.getContext('2d');

  // Dimensões de Alta Resolução (1080p)
  const isStory = formatoInstagram === 'story';
  const width = 1080;
  const height = isStory ? 1920 : 1080;

  canvas.width = width;
  canvas.height = height;

  const arte = arteJesusSelecionada || (devocionalAtual && devocionalAtual.imagemJesus) || (typeof ARTES_JESUS !== 'undefined' ? ARTES_JESUS.pastor : null);

  if (temaInstagram === 'arte-jesus' && arte) {
    carregarEProcessarImagem(arte.arquivo, arte.arquivoLocal, (img) => {
      // 1. Desenha a foto de Jesus cobrindo o canvas sem distorção
      desenharImagemCover(ctx, img, width, height);

      // 2. Filtro cinematográfico de contraste para os textos bíblicos
      desenharFiltroCinema(ctx, width, height, isStory);

      // 3. Moldura e cantoneiras elegantes
      desenharOrnamentos(ctx, width, height, isStory);

      // 4. Cabeçalho com data do dia
      desenharCabecalhoData(ctx, width, height, isStory);

      // 5. Versículo em destaque com sombra e contraste
      desenharVersiculo(ctx, width, height, isStory);

      // 6. Rodapé com perfil do Instagram e assinatura Evangelista Rodolfo
      desenharRodape(ctx, width, height, isStory);
    });
  } else {
    // 1. FUNDO DO CARTÃO (Gradientes de acordo com o tema selecionado)
    desenharFundo(ctx, width, height);

    // 2. MOLDURA E ORNAMENTOS ELEGANTES
    desenharOrnamentos(ctx, width, height, isStory);

    // 3. CABEÇALHO DO DEVOCIONAL COM DATA DO DIA EM DESTAQUE
    desenharCabecalhoData(ctx, width, height, isStory);

    // 4. VERSÍCULO BÍBLICO EM DESTAQUE COM TIPOGRAFIA NOBRE
    desenharVersiculo(ctx, width, height, isStory);

    // 5. RODAPÉ COM MENSAGEM DE BÊNÇÃO
    desenharRodape(ctx, width, height, isStory);
  }
}

function carregarEProcessarImagem(src, fallbackSrc, callback) {
  if (cacheImagens[src] && cacheImagens[src].complete && cacheImagens[src].naturalWidth > 0) {
    callback(cacheImagens[src]);
    return;
  }
  const img = new Image();
  img.onload = () => {
    cacheImagens[src] = img;
    callback(img);
  };
  img.onerror = () => {
    if (fallbackSrc && src !== fallbackSrc) {
      carregarEProcessarImagem(fallbackSrc, null, callback);
    } else {
      // Se não carregar a imagem, desenha o fundo elegante padrão
      const canvas = document.getElementById('canvasPreview');
      const ctx = canvas.getContext('2d');
      desenharFundo(ctx, canvas.width, canvas.height);
      const isStory = formatoInstagram === 'story';
      desenharOrnamentos(ctx, canvas.width, canvas.height, isStory);
      desenharCabecalhoData(ctx, canvas.width, canvas.height, isStory);
      desenharVersiculo(ctx, canvas.width, canvas.height, isStory);
      desenharRodape(ctx, canvas.width, canvas.height, isStory);
    }
  };
  img.src = src;
}

function desenharImagemCover(ctx, img, width, height) {
  if (!img) return;
  const imgAspect = img.width / img.height;
  const canvasAspect = width / height;
  let sx, sy, sw, sh;
  if (imgAspect > canvasAspect) {
    sh = img.height;
    sw = img.height * canvasAspect;
    sx = (img.width - sw) / 2;
    sy = 0;
  } else {
    sw = img.width;
    sh = img.width / canvasAspect;
    sx = 0;
    sy = (img.height - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);
}

function desenharFiltroCinema(ctx, width, height, isStory) {
  // 1. Escurecimento suave geral da foto
  ctx.fillStyle = 'rgba(8, 7, 12, 0.40)';
  ctx.fillRect(0, 0, width, height);

  // 2. Gradiente superior para o cabeçalho e data do dia
  const gradTop = ctx.createLinearGradient(0, 0, 0, height * 0.35);
  gradTop.addColorStop(0, 'rgba(5, 4, 8, 0.94)');
  gradTop.addColorStop(0.65, 'rgba(5, 4, 8, 0.65)');
  gradTop.addColorStop(1, 'rgba(5, 4, 8, 0)');
  ctx.fillStyle = gradTop;
  ctx.fillRect(0, 0, width, height * 0.35);

  // 3. Placa de leitura translúcida central para o versículo bíblico
  const yCentro = isStory ? height * 0.48 : height * 0.54;
  const radial = ctx.createRadialGradient(width / 2, yCentro, 40, width / 2, yCentro, width * 0.65);
  radial.addColorStop(0, 'rgba(10, 8, 16, 0.84)');
  radial.addColorStop(0.7, 'rgba(10, 8, 16, 0.60)');
  radial.addColorStop(1, 'rgba(10, 8, 16, 0.15)');
  ctx.fillStyle = radial;
  ctx.fillRect(40, yCentro - 260, width - 80, 520);

  // 4. Gradiente inferior profundo para o rodapé (Instagram e Evangelista Rodolfo)
  const yBottomStart = isStory ? height * 0.74 : height * 0.70;
  const gradBottom = ctx.createLinearGradient(0, yBottomStart, 0, height);
  gradBottom.addColorStop(0, 'rgba(5, 4, 8, 0)');
  gradBottom.addColorStop(0.35, 'rgba(5, 4, 8, 0.78)');
  gradBottom.addColorStop(1, 'rgba(5, 4, 8, 0.96)');
  ctx.fillStyle = gradBottom;
  ctx.fillRect(0, yBottomStart, width, height - yBottomStart);
}

function desenharFundo(ctx, width, height) {
  let gradiente;

  if (temaInstagram === 'aurora') {
    // Amanhecer dourado acolhedor
    gradiente = ctx.createLinearGradient(0, 0, width, height);
    gradiente.addColorStop(0, '#78350f');   // Âmbar profundo
    gradiente.addColorStop(0.35, '#b45309'); // Âmbar rico
    gradiente.addColorStop(0.7, '#d97706');  // Dourado
    gradiente.addColorStop(1, '#f59e0b');   // Sol quente
    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, width, height);

    // Efeito de luz suave
    const radial = ctx.createRadialGradient(width * 0.5, height * 0.3, 50, width * 0.5, height * 0.3, width * 0.8);
    radial.addColorStop(0, 'rgba(254, 243, 199, 0.28)');
    radial.addColorStop(1, 'rgba(0, 0, 0, 0.15)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, width, height);

  } else if (temaInstagram === 'celestial') {
    // Noite de oração & estrelas serenas
    gradiente = ctx.createLinearGradient(0, 0, width, height);
    gradiente.addColorStop(0, '#090d16');
    gradiente.addColorStop(0.5, '#0f172a');
    gradiente.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, width, height);

    // Pequenas partículas de luz celestial
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    for (let i = 0; i < 40; i++) {
      const rx = (Math.sin(i * 99) * 10000) % width;
      const ry = (Math.cos(i * 33) * 10000) % height;
      const rSize = (Math.abs(Math.sin(i)) * 2.5) + 1;
      ctx.beginPath();
      ctx.arc(Math.abs(rx), Math.abs(ry), rSize, 0, Math.PI * 2);
      ctx.fill();
    }

  } else if (temaInstagram === 'oliva') {
    // Verde Salmo 23 - Águas Tranquilas
    gradiente = ctx.createLinearGradient(0, 0, width, height);
    gradiente.addColorStop(0, '#142e1d');
    gradiente.addColorStop(0.6, '#1e3a2b');
    gradiente.addColorStop(1, '#2f573f');
    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, width, height);

  } else {
    // Minimalista & Pergaminho Nobre
    gradiente = ctx.createLinearGradient(0, 0, width, height);
    gradiente.addColorStop(0, '#fef9ee');
    gradiente.addColorStop(0.6, '#fef3c7');
    gradiente.addColorStop(1, '#fde68a');
    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, width, height);
  }
}

function desenharOrnamentos(ctx, width, height, isStory) {
  const isClaro = temaInstagram === 'minimalista';
  const corBorda = isClaro ? 'rgba(180, 83, 9, 0.3)' : 'rgba(255, 255, 255, 0.22)';
  const margem = 60;

  // Borda fina elegante
  ctx.strokeStyle = corBorda;
  ctx.lineWidth = 2.5;
  ctx.strokeRect(margem, margem, width - margem * 2, height - margem * 2);

  // Cantoneiras nos 4 cantos
  const cantoTam = 24;
  ctx.lineWidth = 4;
  ctx.strokeStyle = isClaro ? '#b45309' : '#fbbf24';

  // Superior esquerdo
  ctx.beginPath();
  ctx.moveTo(margem, margem + cantoTam);
  ctx.lineTo(margem, margem);
  ctx.lineTo(margem + cantoTam, margem);
  ctx.stroke();

  // Superior direito
  ctx.beginPath();
  ctx.moveTo(width - margem - cantoTam, margem);
  ctx.lineTo(width - margem, margem);
  ctx.lineTo(width - margem, margem + cantoTam);
  ctx.stroke();

  // Inferior esquerdo
  ctx.beginPath();
  ctx.moveTo(margem, height - margem - cantoTam);
  ctx.lineTo(margem, height - margem);
  ctx.lineTo(margem + cantoTam, height - margem);
  ctx.stroke();

  // Inferior direito
  ctx.beginPath();
  ctx.moveTo(width - margem - cantoTam, height - margem);
  ctx.lineTo(width - margem, height - margem);
  ctx.lineTo(width - margem, height - margem - cantoTam);
  ctx.stroke();
}

function desenharCabecalhoData(ctx, width, height, isStory) {
  const isClaro = temaInstagram === 'minimalista';
  const corTextoSec = isClaro ? '#78350f' : '#fef3c7';
  const corDourado = isClaro ? '#b45309' : '#fbbf24';
  const dataExtenso = formatarDataExtenso(dataSelecionada).toUpperCase();

  ctx.textAlign = 'center';

  // Badge do App
  let yAtual = isStory ? 180 : 130;
  ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = corDourado;
  ctx.letterSpacing = '4px';
  ctx.fillText('🕊️  P A L A V R A   D I Á R I A  🕊️', width / 2, yAtual);

  // DATA DO DIA EM DESTAQUE (com maiúsculas e espaçamento nobre)
  yAtual += isStory ? 55 : 45;
  ctx.font = '700 32px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = isClaro ? '#1c1917' : '#ffffff';
  ctx.letterSpacing = '2px';
  ctx.fillText(dataExtenso, width / 2, yAtual);

  // Linha divisória ornamental
  yAtual += 35;
  ctx.strokeStyle = isClaro ? 'rgba(180, 83, 9, 0.35)' : 'rgba(251, 191, 36, 0.45)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 120, yAtual);
  ctx.lineTo(width / 2 + 120, yAtual);
  ctx.stroke();

  // Título / Tema
  yAtual += isStory ? 70 : 55;
  ctx.font = 'italic 700 44px "Playfair Display", serif';
  ctx.fillStyle = corDourado;
  ctx.fillText(devocionalAtual.tema, width / 2, yAtual);
}

function desenharVersiculo(ctx, width, height, isStory) {
  const isClaro = temaInstagram === 'minimalista';
  const corTexto = isClaro ? '#1c1917' : '#ffffff';
  const corRef = isClaro ? '#92400e' : '#fde68a';

  let yCentro = isStory ? height * 0.48 : height * 0.54;
  const maxWidth = width - 240;

  // Aspas gigantes sutis ao fundo
  ctx.font = '700 180px "Playfair Display", serif';
  ctx.fillStyle = isClaro ? 'rgba(180, 83, 9, 0.1)' : 'rgba(255, 255, 255, 0.12)';
  ctx.textAlign = 'center';
  ctx.fillText('“', width / 2, yCentro - 90);

  // Texto do Versículo com quebra de linha inteligente
  const fontSize = isStory ? 48 : 42;
  const lineHeight = fontSize * 1.45;
  ctx.font = `italic 600 ${fontSize}px "Playfair Display", serif`;
  ctx.fillStyle = corTexto;
  ctx.textAlign = 'center';

  if (temaInstagram === 'arte-jesus') {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 3;
  }

  const linhas = quebrarLinhas(ctx, `"${devocionalAtual.versiculo}"`, maxWidth);

  // Centraliza o bloco verticalmente
  let yTexto = yCentro - (linhas.length * lineHeight) / 2;
  for (let linha of linhas) {
    ctx.fillText(linha, width / 2, yTexto);
    yTexto += lineHeight;
  }

  // Referência Bíblica
  yTexto += 30;
  ctx.font = '700 36px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = corRef;
  ctx.fillText(`— ${devocionalAtual.referencia}`, width / 2, yTexto);

  // Se for formato Story (que tem muito espaço vertical), adiciona reflexão condensada
  if (isStory) {
    yTexto += 70;
    ctx.font = '500 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = isClaro ? '#44403c' : 'rgba(255, 255, 255, 0.95)';
    
    // Resumo da reflexão (primeira frase impactante)
    const primeiraFrase = devocionalAtual.reflexao.split('.')[0] + '.';
    const linhasRef = quebrarLinhas(ctx, primeiraFrase, width - 280);
    for (let l of linhasRef.slice(0, 3)) {
      ctx.fillText(l, width / 2, yTexto);
      yTexto += 38;
    }
  }

  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}

function desenharRodape(ctx, width, height, isStory) {
  const isClaro = temaInstagram === 'minimalista';
  const corRodape = isClaro ? '#78350f' : 'rgba(255, 255, 255, 0.85)';

  const yRodape = height - 120;
  ctx.textAlign = 'center';
  ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = corRodape;
  ctx.fillText('Siga nosso Instagram: @cultodoempreendedoruva', width / 2, yRodape);

  ctx.font = 'italic 700 22px "Playfair Display", serif';
  ctx.fillStyle = isClaro ? '#92400e' : '#fde68a';
  ctx.fillText('Evangelista Rodolfo', width / 2, yRodape + 36);
}

// Utilitário para quebrar texto suavemente nas bordas do Canvas
function quebrarLinhas(ctx, texto, maxWidth) {
  const palavras = texto.split(' ');
  const linhas = [];
  let linhaAtual = palavras[0];

  for (let i = 1; i < palavras.length; i++) {
    const palavra = palavras[i];
    const largura = ctx.measureText(linhaAtual + ' ' + palavra).width;
    if (largura < maxWidth) {
      linhaAtual += ' ' + palavra;
    } else {
      linhas.push(linhaAtual);
      linhaAtual = palavra;
    }
  }
  linhas.push(linhaAtual);
  return linhas;
}

// Download da Imagem para Instagram em PNG 1080p
function baixarImagemInstagram() {
  const canvas = document.getElementById('canvasPreview');
  const dataCurta = formatarDataCurta(dataSelecionada).replace(/\//g, '-');
  const nomeArquivo = `Devocional-${dataCurta}-${formatoInstagram}.png`;

  const link = document.createElement('a');
  link.download = nomeArquivo;
  link.href = canvas.toDataURL('image/png');
  link.click();

  exibirToast('✨ Imagem baixada em alta qualidade! Pronta para o Instagram.');
}

// Compartilhamento Direto da Imagem (Web Share API - Abre Instagram no celular)
async function compartilharDiretoInstagram() {
  const canvas = document.getElementById('canvasPreview');
  const dataExtenso = formatarDataExtenso(dataSelecionada);

  if (navigator.canShare && navigator.share) {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        exibirToast('Não foi possível gerar a imagem.');
        return;
      }
      const dataCurta = formatarDataCurta(dataSelecionada).replace(/\//g, '-');
      const file = new File([blob], `Devocional-${dataCurta}.png`, { type: 'image/png' });

      try {
        await navigator.share({
          title: `Devocional do Dia - ${dataExtenso}`,
          text: `Mensagem de esperança para hoje: "${devocionalAtual.versiculo}" — ${devocionalAtual.referencia}`,
          files: [file]
        });
        exibirToast('Compartilhando com sucesso!');
      } catch (err) {
        if (err.name !== 'AbortError') {
          // Se falhou o share nativo, baixa a imagem
          baixarImagemInstagram();
        }
      }
    }, 'image/png');
  } else {
    // Se o navegador não suporta compartilhamento direto de arquivo, baixa a imagem
    baixarImagemInstagram();
    exibirToast('Imagem salva! Agora abra o Instagram e selecione-a nos seus Stories ou Feed.');
  }
}

// --------------------------------------------------------------------------
// LEITURA DE VOZ (TEXT-TO-SPEECH)
// --------------------------------------------------------------------------
function alternarAudioDevocional() {
  if (!synth) {
    exibirToast('Seu navegador não suporta leitura por áudio.');
    return;
  }

  if (isSpeaking) {
    synth.cancel();
    atualizarBotaoAudio(false);
    isSpeaking = false;
  } else {
    const textoParaFalar = `Devocional de ${formatarDataExtenso(dataSelecionada)}. Tema: ${devocionalAtual.tema}. Versículo do dia: ${devocionalAtual.versiculo}. Referência: ${devocionalAtual.referencia}. Reflexão: ${devocionalAtual.reflexao}. Oração do dia: ${devocionalAtual.oracao}`;

    const utterance = new SpeechSynthesisUtterance(textoParaFalar);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.95; // Leitura pausada e reflexiva

    utterance.onstart = () => {
      isSpeaking = true;
      atualizarBotaoAudio(true);
    };

    utterance.onend = () => {
      isSpeaking = false;
      atualizarBotaoAudio(false);
    };

    utterance.onerror = () => {
      isSpeaking = false;
      atualizarBotaoAudio(false);
    };

    synth.speak(utterance);
  }
}

function atualizarBotaoAudio(falando) {
  const icon = document.getElementById('audioIcon');
  const text = document.getElementById('audioText');
  if (falando) {
    icon.setAttribute('data-lucide', 'square');
    text.textContent = 'Pausar';
  } else {
    icon.setAttribute('data-lucide', 'volume-2');
    text.textContent = 'Ouvir';
  }
  inicializarLucide();
}

// --------------------------------------------------------------------------
// FAVORITOS (LOCALSTORAGE)
// --------------------------------------------------------------------------
function obterFavoritos() {
  try {
    return JSON.parse(localStorage.getItem('mana_favoritos')) || [];
  } catch (e) {
    return [];
  }
}

function salvarFavoritos(lista) {
  localStorage.setItem('mana_favoritos', JSON.stringify(lista));
}

function alternarFavorito() {
  const dataCurta = formatarDataCurta(dataSelecionada);
  let favoritos = obterFavoritos();
  const index = favoritos.findIndex(f => f.dataCurta === dataCurta);

  if (index >= 0) {
    favoritos.splice(index, 1);
    exibirToast('Mensagem removida dos seus favoritos.');
  } else {
    favoritos.push({
      dataCurta,
      dataIso: dataSelecionada.toISOString(),
      tema: devocionalAtual.tema,
      versiculo: devocionalAtual.versiculo,
      referencia: devocionalAtual.referencia
    });
    exibirToast('❤️ Mensagem guardada nos seus favoritos!');
  }

  salvarFavoritos(favoritos);
  atualizarIconeFavorito();
}

function atualizarIconeFavorito() {
  const dataCurta = formatarDataCurta(dataSelecionada);
  const favoritos = obterFavoritos();
  const existe = favoritos.some(f => f.dataCurta === dataCurta);

  const heartIcon = document.getElementById('heartIcon');
  if (existe) {
    heartIcon.classList.add('text-red-500', 'fill-red-500');
  } else {
    heartIcon.classList.remove('text-red-500', 'fill-red-500');
  }
}

function abrirModalFavoritos() {
  const modal = document.getElementById('modalFavoritos');
  const container = document.getElementById('listaFavoritosContainer');
  const favoritos = obterFavoritos();

  if (favoritos.length === 0) {
    container.innerHTML = `
      <div class="text-center py-10 text-stone-400">
        <i data-lucide="heart-off" class="w-10 h-10 mx-auto mb-2 opacity-50"></i>
        <p class="text-sm font-medium">Você ainda não favoritou nenhum devocional.</p>
        <p class="text-xs text-stone-400 mt-1">Toque no ícone de coração em qualquer dia para guardar aqui.</p>
      </div>
    `;
  } else {
    container.innerHTML = favoritos.map(item => `
      <div class="p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-amber-50/40 dark:bg-stone-800/60 hover:border-amber-400 transition cursor-pointer flex items-center justify-between gap-3" onclick="selecionarDataFavorita('${item.dataIso}')">
        <div>
          <span class="text-[11px] font-bold text-amber-700 dark:text-amber-400 block">${item.dataCurta}</span>
          <h4 class="font-bold text-sm text-stone-800 dark:text-stone-100">${item.tema}</h4>
          <p class="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 italic">${item.versiculo}</p>
        </div>
        <i data-lucide="chevron-right" class="w-4 h-4 text-stone-400"></i>
      </div>
    `).join('');
  }

  inicializarLucide();
  modal.classList.remove('hidden');
}

function selecionarDataFavorita(isoDate) {
  dataSelecionada = new Date(isoDate);
  carregarDevocional(dataSelecionada);
  document.getElementById('modalFavoritos').classList.add('hidden');
}

// --------------------------------------------------------------------------
// DIÁRIO DE ORAÇÃO PESSOAL
// --------------------------------------------------------------------------
function carregarDiarioDoDia(dataCurta) {
  const diarios = JSON.parse(localStorage.getItem('mana_diario') || '{}');
  const texto = diarios[dataCurta] || '';
  document.getElementById('textoDiarioOracao').value = texto;
}

function salvarDiarioDoDia() {
  const dataCurta = formatarDataCurta(dataSelecionada);
  const texto = document.getElementById('textoDiarioOracao').value.trim();
  const diarios = JSON.parse(localStorage.getItem('mana_diario') || '{}');

  if (texto) {
    diarios[dataCurta] = texto;
  } else {
    delete diarios[dataCurta];
  }

  localStorage.setItem('mana_diario', JSON.stringify(diarios));

  const status = document.getElementById('statusSalvoDiario');
  status.classList.remove('opacity-0');
  setTimeout(() => status.classList.add('opacity-0'), 2500);
}

// --------------------------------------------------------------------------
// UTILITÁRIO DE COPIAR E TOAST FEEDBACK
// --------------------------------------------------------------------------
function copiarParaAreaDeTransferencia(texto, mensagemSucesso) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(texto).then(() => {
      exibirToast(mensagemSucesso);
    }).catch(() => fallbackCopiar(texto, mensagemSucesso));
  } else {
    fallbackCopiar(texto, mensagemSucesso);
  }
}

function fallbackCopiar(texto, mensagemSucesso) {
  const textarea = document.createElement('textarea');
  textarea.value = texto;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  exibirToast(mensagemSucesso);
}

let timeoutToast;
function exibirToast(mensagem) {
  const toast = document.getElementById('toastMensagem');
  const textoSpan = document.getElementById('toastTexto');
  textoSpan.textContent = mensagem;

  toast.classList.remove('opacity-0', 'translate-y-4');
  toast.classList.add('opacity-100', 'translate-y-0');

  clearTimeout(timeoutToast);
  timeoutToast = setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-4');
  }, 3000);
}

// --------------------------------------------------------------------------
// MODO ESCURO E CONFIGURAÇÃO
// --------------------------------------------------------------------------
function carregarTemaModo() {
  const isDark = localStorage.getItem('mana_dark') === 'true';
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

function alternarModoEscuro() {
  const html = document.documentElement;
  html.classList.toggle('dark');
  localStorage.setItem('mana_dark', html.classList.contains('dark'));
  inicializarLucide();
}

// --------------------------------------------------------------------------
// EVENT LISTENERS E CONTROLES
// --------------------------------------------------------------------------
function configurarEventos() {
  // Navegação de Dias
  document.getElementById('btnDiaAnterior').addEventListener('click', () => {
    dataSelecionada.setDate(dataSelecionada.getDate() - 1);
    carregarDevocional(dataSelecionada);
  });

  document.getElementById('btnDiaProximo').addEventListener('click', () => {
    dataSelecionada.setDate(dataSelecionada.getDate() + 1);
    carregarDevocional(dataSelecionada);
  });

  // Botões de WhatsApp
  document.getElementById('btnShareWhatsAppTopo').addEventListener('click', compartilharNoWhatsApp);
  document.getElementById('btnShareWhatsAppBottom').addEventListener('click', compartilharNoWhatsApp);

  // Abertura do Modal de Imagem do Instagram
  document.getElementById('btnAbrirModalInstagramTopo').addEventListener('click', abrirModalInstagram);
  document.getElementById('btnAbrirModalInstagramBottom').addEventListener('click', abrirModalInstagram);
  document.getElementById('btnFecharModalInstagram').addEventListener('click', fecharModalInstagram);

  // Alternador de Formato (Story x Feed)
  const btnStory = document.getElementById('btnFormatoStory');
  const btnFeed = document.getElementById('btnFormatoFeed');

  btnStory.addEventListener('click', () => {
    formatoInstagram = 'story';
    btnStory.classList.add('border-2', 'border-amber-600', 'bg-amber-50', 'dark:bg-amber-950/50', 'text-amber-900', 'dark:text-amber-200');
    btnFeed.classList.remove('border-2', 'border-amber-600', 'bg-amber-50', 'dark:bg-amber-950/50', 'text-amber-900', 'dark:text-amber-200');
    renderizarCanvasInstagram();
  });

  btnFeed.addEventListener('click', () => {
    formatoInstagram = 'feed';
    btnFeed.classList.add('border-2', 'border-amber-600', 'bg-amber-50', 'dark:bg-amber-950/50', 'text-amber-900', 'dark:text-amber-200');
    btnStory.classList.remove('border-2', 'border-amber-600', 'bg-amber-50', 'dark:bg-amber-950/50', 'text-amber-900', 'dark:text-amber-200');
    renderizarCanvasInstagram();
  });

  // Seletor de Tema Visual do Card
  document.querySelectorAll('.btnTemaCard').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btnTemaCard').forEach(b => {
        b.classList.remove('border-2', 'border-amber-600', 'bg-amber-100', 'text-amber-900', 'dark:bg-amber-950', 'dark:text-amber-200');
        b.classList.add('border-stone-300', 'dark:border-stone-700', 'bg-stone-100', 'dark:bg-stone-800', 'text-stone-700', 'dark:text-stone-300');
      });
      btn.classList.add('border-2', 'border-amber-600', 'bg-amber-100', 'text-amber-900', 'dark:bg-amber-950', 'dark:text-amber-200');
      btn.classList.remove('border-stone-300', 'dark:border-stone-700', 'bg-stone-100', 'dark:bg-stone-800', 'text-stone-700', 'dark:text-stone-300');
      temaInstagram = btn.getAttribute('data-tema');

      const seletorSub = document.getElementById('seletorSubArtesJesus');
      if (seletorSub) {
        if (temaInstagram === 'arte-jesus') {
          seletorSub.classList.remove('hidden');
        } else {
          seletorSub.classList.add('hidden');
        }
      }

      renderizarCanvasInstagram();
    });
  });

  // Seletor de Ilustração Específica de Jesus
  document.querySelectorAll('.btnTrocarArteJesus').forEach(btn => {
    btn.addEventListener('click', () => {
      const chave = btn.getAttribute('data-arte');
      if (typeof ARTES_JESUS !== 'undefined' && ARTES_JESUS[chave]) {
        arteJesusSelecionada = ARTES_JESUS[chave];

        document.querySelectorAll('.btnTrocarArteJesus').forEach(b => {
          b.classList.remove('border-amber-500', 'bg-white', 'dark:bg-stone-900', 'font-bold', 'text-amber-900', 'dark:text-amber-200');
          b.classList.add('border-stone-200', 'dark:border-stone-700', 'bg-stone-50', 'dark:bg-stone-900/60', 'font-medium', 'text-stone-700', 'dark:text-stone-300');
        });
        btn.classList.add('border-amber-500', 'bg-white', 'dark:bg-stone-900', 'font-bold', 'text-amber-900', 'dark:text-amber-200');
        btn.classList.remove('border-stone-200', 'dark:border-stone-700', 'bg-stone-50', 'dark:bg-stone-900/60', 'font-medium', 'text-stone-700', 'dark:text-stone-300');

        const nomeEl = document.getElementById('nomeArteJesusAtual');
        if (nomeEl) nomeEl.textContent = arteJesusSelecionada.titulo;

        // Se estava em outro tema, volta para arte-jesus
        temaInstagram = 'arte-jesus';
        document.querySelectorAll('.btnTemaCard').forEach(b => {
          if (b.getAttribute('data-tema') === 'arte-jesus') {
            b.classList.add('border-2', 'border-amber-600', 'bg-amber-100', 'text-amber-900', 'dark:bg-amber-950', 'dark:text-amber-200');
          } else {
            b.classList.remove('border-2', 'border-amber-600', 'bg-amber-100', 'text-amber-900', 'dark:bg-amber-950', 'dark:text-amber-200');
          }
        });

        renderizarCanvasInstagram();
      }
    });
  });

  // Ações de Imagem
  document.getElementById('btnBaixarImagem').addEventListener('click', baixarImagemInstagram);
  document.getElementById('btnCompartilharDiretoInstagram').addEventListener('click', compartilharDiretoInstagram);

  // Copiar Textos
  document.getElementById('btnCopiarTexto').addEventListener('click', () => {
    copiarParaAreaDeTransferencia(montarMensagemFormatada(), '✓ Mensagem devocional copiada com sucesso!');
  });
  document.getElementById('btnCopiarTextoBottom').addEventListener('click', () => {
    copiarParaAreaDeTransferencia(montarMensagemFormatada(), '✓ Mensagem devocional copiada com sucesso!');
  });
  document.getElementById('btnCopiarVersiculo').addEventListener('click', () => {
    copiarParaAreaDeTransferencia(`"${devocionalAtual.versiculo}" — ${devocionalAtual.referencia}`, '✓ Versículo bíblico copiado!');
  });

  // Áudio TTS
  document.getElementById('btnOuvirAudio').addEventListener('click', alternarAudioDevocional);

  // Favoritos
  document.getElementById('btnFavoritar').addEventListener('click', alternarFavorito);
  document.getElementById('btnFavoritarBottom').addEventListener('click', alternarFavorito);

  // Diário de Oração
  document.getElementById('btnSalvarDiario').addEventListener('click', salvarDiarioDoDia);

  // Calendário
  const modalCalendario = document.getElementById('modalCalendario');
  const inputData = document.getElementById('inputDataSelecionada');
  
  document.getElementById('btnAbrirCalendario').addEventListener('click', () => {
    inputData.value = dataSelecionada.toISOString().split('T')[0];
    modalCalendario.classList.remove('hidden');
  });

  document.getElementById('btnFecharModalCalendario').addEventListener('click', () => {
    modalCalendario.classList.add('hidden');
  });

  document.getElementById('btnAtalhoHoje').addEventListener('click', () => {
    dataSelecionada = new Date();
    carregarDevocional(dataSelecionada);
    modalCalendario.classList.add('hidden');
  });

  document.getElementById('btnConfirmarData').addEventListener('click', () => {
    if (inputData.value) {
      const partes = inputData.value.split('-');
      // Cria a data no fuso local para evitar offset
      dataSelecionada = new Date(parseInt(partes[0]), parseInt(partes[1]) - 1, parseInt(partes[2]));
      carregarDevocional(dataSelecionada);
      modalCalendario.classList.add('hidden');
    }
  });

  // Modal Favoritos
  document.getElementById('btnFecharModalFavoritos').addEventListener('click', () => {
    document.getElementById('modalFavoritos').classList.add('hidden');
  });

  // Modo Escuro
  document.getElementById('btnToggleDark').addEventListener('click', alternarModoEscuro);

  // Navegação Inferior Mobile
  document.getElementById('navHoje').addEventListener('click', () => {
    dataSelecionada = new Date();
    carregarDevocional(dataSelecionada);
  });

  document.getElementById('navCalendario').addEventListener('click', () => {
    inputData.value = dataSelecionada.toISOString().split('T')[0];
    modalCalendario.classList.remove('hidden');
  });

  document.getElementById('navInstagram').addEventListener('click', abrirModalInstagram);
  document.getElementById('navFavoritos').addEventListener('click', abrirModalFavoritos);
}

// --------------------------------------------------------------------------
// REGISTRO DE SERVICE WORKER PARA SUPORTE OFFLINE / PWA
// --------------------------------------------------------------------------
function registrarServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {
      // Ignora erro se executado diretamente sem servidor http
    });
  }
}
