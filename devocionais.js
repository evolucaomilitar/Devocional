// Banco de Devocionais Diários com Bases Bíblicas e Mensagens Motivacionais
// Cada devocional possui: id, diaAno (1 a 366), tema, versiculo, referencia, reflexao, oracao, aplicacao, tag

const DEVOCIONAIS_BASE = [
  {
    diaMes: "1-1",
    tema: "Novos Começos e Esperança Viva",
    versiculo: "Eis que faço coisa nova, que está saindo à luz; porventura não o percebeis? Eis que porei um caminho no deserto e rios no ermo.",
    referencia: "Isaías 43:19",
    reflexao: "Todo novo dia é uma folha em branco entregue pelo Criador em suas mãos. Não fique preso ao que deu errado ontem nem carregue o peso de culpas passadas. O Deus que você serve é especialista em abrir caminhos onde tudo parecia sem saída e fazer brotar fontes de água fresca nos desertos mais difíceis da vida. Levante a cabeça com a certeza de que a graça do Senhor se renovou esta manhã sobre você. Dê o primeiro passo com fé!",
    oracao: "Senhor meu Deus, coloco este dia em Tuas mãos. Que a Tua paz guie meus passos e que meus olhos enxerguem os novos caminhos que o Senhor está abrindo para mim e para minha família. Amém!",
    aplicacao: "Entregue a Deus uma preocupação antiga e declare vitória sobre ela hoje.",
    categoria: "Esperança"
  },
  {
    diaMes: "1-2",
    tema: "Paz que Excede Todo Entendimento",
    versiculo: "Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.",
    referencia: "João 14:27",
    reflexao: "O mundo tenta nos vender uma paz frágil, que depende de circunstâncias perfeitas. Mas a paz que Jesus oferece floresce mesmo no meio do vendaval. É aquela serenidade inexplicável que acalma a mente angustiada e diz: 'Fique tranquilo, o leme da sua vida está nas mãos de Quem comanda o universo'. Seja qual for a notícia ou cobrança que tente roubar o seu sossego hoje, lembre-se: a presença de Cristo é o seu porto seguro.",
    oracao: "Jesus, recebo a Tua paz neste momento. Silencia a tempestade dos meus pensamentos e acalma o meu coração. Eu confio no Teu controle soberano. Amém!",
    aplicacao: "Respire fundo, ore por 2 minutos antes de reagir a qualquer estresse do dia.",
    categoria: "Paz"
  },
  {
    diaMes: "1-3",
    tema: "A Força que Nasce na Fraqueza",
    versiculo: "Ele dá força ao cansado, e multiplica as forças ao que não tem nenhum vigor... os que esperam no Senhor renovarão as suas forças.",
    referencia: "Isaías 40:29, 31",
    reflexao: "Há dias em que a energia parece acabar antes mesmo do meio-dia. Deus não espera que você seja forte o tempo todo; Ele deseja ser a sua força quando a sua se esgota. Esperar no Senhor não é ficar de braços cruzados, mas sim ancorar o coração na certeza de que a ajuda dos céus nunca chega atrasada. Você vai voar alto novamente como a águia; apenas confie e continue marchando.",
    oracao: "Pai celeste, quando me sinto fraco, o Teu poder se aperfeiçoa em mim. Renova meu vigor físico, emocional e espiritual para vencer todos os desafios deste dia. Em nome de Jesus, amém!",
    aplicacao: "Compartilhe uma palavra de ânimo com alguém que você sabe que está cansado.",
    categoria: "Força"
  },
  {
    diaMes: "1-4",
    tema: "O Senhor é o Meu Pastor",
    versiculo: "O Senhor é o meu pastor; de nada terei falta. Em verdes pastagens me faz repousar e me conduz a águas tranquilas.",
    referencia: "Salmos 23:1-2",
    reflexao: "A ovelha não precisa saber onde será o pasto de amanhã; ela só precisa manter os olhos no Pastor. Deus cuida dos mínimos detalhes da sua vida. Ele sabe do que você precisa antes mesmo que você peça. Não deixe a ansiedade pelo dia de amanhã sufocar a bênção de hoje. Descanse nos braços do Bom Pastor, pois Ele jamais abandonou um filho Seu.",
    oracao: "Querido Deus, obrigado porque o Senhor cuida de mim como o mais amoroso pastor. Livra-me do medo da escassez e enche minha alma de gratidão e contentamento. Amém!",
    aplicacao: "Agradeça a Deus por 3 coisas simples que Ele supriu na sua vida esta semana.",
    categoria: "Provisão"
  },
  {
    diaMes: "1-5",
    tema: "Coragem para Avançar",
    versiculo: "Não fui eu que lhe ordenei? Seja forte e corajoso! Não se apavore nem desanime, pois o Senhor, o seu Deus, estará com você por onde você andar.",
    referencia: "Josué 1:9",
    reflexao: "A coragem não é a ausência de medo, mas a decisão sagrada de que a promessa de Deus é maior do que qualquer obstáculo. Josué estava diante do rio Jordão e de cidades com muralhas intransponíveis, mas Deus não lhe deu um mapa detalhado, deu-lhe uma garantia: 'Eu estarei com você'. Esse mesmo Deus está ao seu lado neste exato instante. Vá em frente!",
    oracao: "Senhor, repreende todo espírito de medo, paralisia e dúvida. Dá-me ousadia para abraçar as oportunidades e enfrentar os gigantes deste dia sabendo que a vitória vem de Ti. Amém!",
    aplicacao: "Faça aquela ligação ou tome a iniciativa que você vem adiando por insegurança.",
    categoria: "Coragem"
  },
  {
    diaMes: "1-6",
    tema: "O Amor que Tudo Supera",
    versiculo: "O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha. Não maltrata, não procura seus interesses, não se ira facilmente, não guarda rancor.",
    referencia: "1 Coríntios 13:4-5",
    reflexao: "Em um mundo apressado e muitas vezes áspero, o amor cristão é uma revolução silenciosa. Amar quando é fácil não requer fé; amar a quem nos machuca ou nos testa a paciência é onde Cristo brilha em nós. Hoje, escolha responder com mansidão, perdoar a ofensa antes que ela crie raiz e ser um canal de carinho e acolhimento para quem cruzar o seu caminho.",
    oracao: "Pai de amor, limpa o meu coração de qualquer amargura ou ressentimento. Capacita-me a amar como Jesus amou, com paciência, generosidade e perdão sincero. Amém!",
    aplicacao: "Envie uma mensagem de carinho ou faça um elogio sincero para alguém difícil hoje.",
    categoria: "Amor"
  },
  {
    diaMes: "1-7",
    tema: "Planos de Paz e um Futuro de Glória",
    versiculo: "Porque sou eu que conheço os planos que tenho para vocês, diz o Senhor, planos de fazê-los prosperar e não de causar dano, planos de dar-lhes esperança e um futuro.",
    referencia: "Jeremias 29:11",
    reflexao: "Muitas vezes ficamos inquietos tentando decifrar o amanhã. Mas Deus não nos chamou para planejar o futuro sozinhos, e sim para confiar no Arquiteto divino. Seus planos para você não são de destruição nem de fracasso; há um propósito de paz, maturidade e vitória sendo forjado até mesmo nas estações de espera. Descanse o coração: o autor da sua história não erra.",
    oracao: "Deus eterno, entrego meus projetos e sonhos em Tuas mãos. Que a Tua vontade boa, agradável e perfeita se cumpra na minha vida hoje e sempre. Amém!",
    aplicacao: "Escreva em um papel seu maior sonho e coloque-o simbolicamente sobre a sua Bíblia.",
    categoria: "Propósito"
  },
  {
    diaMes: "1-8",
    tema: "Vencedores em Todas as Coisas",
    versiculo: "Mas em todas estas coisas somos mais que vencedores, por meio daquele que nos amou.",
    referencia: "Romanos 8:37",
    reflexao: "Ser 'mais que vencedor' significa que, antes mesmo de a batalha começar, o desfecho já foi decidido na cruz do Calvário. As lutas que você enfrenta não vieram para te destruir, mas para comprovar o poder de Deus operando na sua vida. Não encare este dia como uma vítima das circunstâncias, mas como um filho amado do Rei dos reis.",
    oracao: "Senhor Jesus, obrigado por Tua vitória na cruz que me faz triunfar. Enche-me de fé e disposição para superar qualquer dificuldade neste dia. Eu confio no Teu amor invencível! Amém!",
    aplicacao: "Declare em voz alta durante o dia: 'Eu sou mais que vencedor em Cristo Jesus!'.",
    categoria: "Vitória"
  },
  {
    diaMes: "1-9",
    tema: "Lâmpada para os Meus Pés",
    versiculo: "Lâmpada para os meus pés é a tua palavra e luz, para o meu caminho.",
    referencia: "Salmos 119:105",
    reflexao: "Uma lamparina antiga não iluminava a estrada inteira a quilômetros de distância; ela iluminava apenas o próximo passo. Deus nos guia passo a passo, dia a dia. Você não precisa saber como tudo vai se resolver no mês que vem; apenas dê o passo de obediência que a Palavra de Deus pede hoje. Seja honesto, seja fiel e a luz divina continuará clareando sua jornada.",
    oracao: "Pai, ensina-me a amar e obedecer à Tua Palavra. Que as Escrituras sejam o filtro de todas as minhas decisões e palavras no dia de hoje. Em nome de Jesus, amém!",
    aplicacao: "Separe 5 minutos para ler um capítulo dos Salmos ou dos Provérbios hoje.",
    categoria: "Sabedoria"
  },
  {
    diaMes: "1-10",
    tema: "A Alegria que Transborda",
    versiculo: "Não vos entristeçais, porque a alegria do Senhor é a vossa força.",
    referencia: "Neemias 8:10b",
    reflexao: "A alegria cristã não é uma euforia superficial que se esvai quando surgem problemas. É uma âncora fincada no fundo da alma que sabe que Deus continua no trono. Sorria hoje não porque tudo está perfeito, mas porque o seu Redentor vive! Essa alegria contagiante desarmará o pessimismo ao seu redor e recarregará suas energias para vencer.",
    oracao: "Querido Deus, unge meu coração com o óleo da Tua alegria. Afasta a tristeza, o desânimo e o peso deste mundo. Que o Teu gozo seja o combustível das minhas horas. Amém!",
    aplicacao: "Coloque um louvor alegre para tocar no início do seu dia e cante com gratidão.",
    categoria: "Alegria"
  },
  {
    diaMes: "1-11",
    tema: "Graça Suficiente em Todo Tempo",
    versiculo: "Mas ele me disse: 'Minha graça é suficiente para você, pois o meu poder se aperfeiçoa na fraqueza'.",
    referencia: "2 Coríntios 12:9",
    reflexao: "Às vezes pedimos para Deus remover o espinho, mas Ele escolhe nos dar graça abundante para superá-lo e crescer através dele. A graça de Deus não é apenas o perdão do pecado; é o poder sobrenatural de Deus que nos sustenta de pé quando as pernas fraquejam. Para a jornada de hoje, a dose de graça que você recebeu é mais do que suficiente!",
    oracao: "Senhor, reconheço que dependo inteiramente da Tua graça. Que ela me baste, me console e me fortaleça em todas as minhas limitações. Glória a Ti! Amém!",
    aplicacao: "Quando sentir frustração hoje, ore: 'A Tua graça me basta, Senhor'.",
    categoria: "Graça"
  },
  {
    diaMes: "1-12",
    tema: "O Segredo da Gratidão Contínua",
    versiculo: "Dêem graças em todas as circunstâncias, pois esta é a vontade de Deus para vocês em Cristo Jesus.",
    referencia: "1 Tessalonicenses 5:18",
    reflexao: "A gratidão tem o poder milagroso de transformar o que temos em mais do que suficiente. Ela transforma um almoço simples em banquete, uma casa humilde em lar de paz e um estranho em amigo. Quando agradecemos antes mesmo de ver a resposta completa, demonstramos fé genuína. Agradeça pelo ar que respira, pela saúde, pelas lições e pelas bênçãos invisíveis que Deus já preparou para você.",
    oracao: "Pai amado, perdoa-me pelas vezes em que murmurei. Hoje escolho abrir meus lábios para agradecer por Teu amor, Tua fidelidade e por cada livramento silencioso. Amém!",
    aplicacao: "Liste mentalmente 10 motivos de gratidão antes de dormir hoje.",
    categoria: "Gratidão"
  },
  {
    diaMes: "1-13",
    tema: "Descanso para a Alma Agitada",
    versiculo: "Venham a mim, todos os que estão cansados e sobrecarregados, e eu darei descanso a vocês.",
    referencia: "Mateus 11:28",
    reflexao: "Vivemos numa sociedade que glorifica a exaustão e o imediatismo. Mas o convite de Jesus é um bálsamo para o coração acelerado: 'Venham a mim'. Ele não te chama para colocar mais um fardo nas suas costas, mas para trocar o seu peso pelo jugo suave do Seu amor. Desacelere por alguns instantes hoje e sinta o abraço restaurador de Cristo.",
    oracao: "Jesus amado, deponho aos Teus pés todo fardo pesado de ansiedade e obrigações. Recebo o Teu descanso e a Tua serenidade para minha mente e meu espírito. Amém!",
    aplicacao: "Tire uma pausa de 10 minutos sem telas nem celular para orar e meditar em silêncio.",
    categoria: "Descanso"
  },
  {
    diaMes: "1-14",
    tema: "A Fé que Enxerga o Invisível",
    versiculo: "Ora, a fé é a certeza daquilo que esperamos e a prova das coisas que não vemos.",
    referencia: "Hebreus 11:1",
    reflexao: "A dúvida olha para as circunstâncias e diz: 'É impossível'. A fé olha para as promessas de Deus e declara: 'Já está feito no céu'. A fé não fecha os olhos para a realidade; ela apenas ergue os olhos para um Deus que está infinitamente acima de qualquer realidade terrena. Continue acreditando na restauração da sua família, na cura e na vitória profissional. Deus está agindo nos bastidores!",
    oracao: "Senhor, aumenta a minha fé! Livra-me da incredulidade e ensina-me a caminhar confiando no que a Tua Palavra diz, e não naquilo que meus olhos humanos veem. Amém!",
    aplicacao: "Fale palavras de bênção e fé sobre a sua casa e seu trabalho hoje.",
    categoria: "Fé"
  },
  {
    diaMes: "1-15",
    tema: "Refúgio e Fortaleza Eterna",
    versiculo: "Deus é o nosso refúgio e a nossa fortaleza, auxílio sempre presente na adversidade.",
    referencia: "Salmos 46:1",
    reflexao: "Quando o mundo ao redor parece balançar e as incertezas batem à porta, onde você se abriga? As riquezas deste mundo passam e as pessoas podem falhar, mas o Senhor permanece como uma rocha inabalável. Ele não é um socorro distante ou demorado; Ele é socorro bem presente! Corra para os braços do Pai, pois ali nenhum mal pode prevalecer contra a sua vida.",
    oracao: "Deus Todo-Poderoso, Tu és o meu escudo e a minha fortaleza inabalável. Em Ti me escondo com segurança. Guarda os meus passos e protege a minha família hoje. Amém!",
    aplicacao: "Quando surgir uma preocupação repentina hoje, repita: 'Deus é o meu refúgio e fortaleza'.",
    categoria: "Proteção"
  },
  {
    diaMes: "1-16",
    tema: "Guardando o Tesouro do Coração",
    versiculo: "Acima de tudo, guarde o seu coração, pois dele depende toda a sua vida.",
    referencia: "Provérbios 4:23",
    reflexao: "O coração, na linguagem bíblica, é o centro dos pensamentos, desejos e sentimentos. Aquilo que você permite entrar pelos seus olhos e ouvidos alimenta o seu interior. Cuide do que você assiste, do que você ouve e com quem você gasta seu tempo. Encha seu coração com louvor, verdade e esperança, para que dele só brotem águas de vida e bênção.",
    oracao: "Senhor Deus, examina meu coração. Purifica-me de pensamentos ruins, rancor ou pessimismo. Que meu coração seja uma morada agradável para o Teu Santo Espírito. Amém!",
    aplicacao: "Evite discussões inúteis na internet ou no trabalho durante todo o dia de hoje.",
    categoria: "Pureza"
  },
  {
    diaMes: "1-17",
    tema: "Plantados Junto às Águas",
    versiculo: "Bendito o homem que confia no Senhor, e cuja esperança é o Senhor. Porque será como a árvore plantada junto às águas, que estende as suas raízes para o ribeiro.",
    referencia: "Jeremias 17:7-8",
    reflexao: "Uma árvore com raízes profundas não teme o ano da seca; suas folhas permanecem verdes e ela não para de produzir frutos saborosos. Quando a sua confiança está enraizada em Deus, a crise não te seca e as tempestades não te derrubam. Mergulhe suas raízes na oração e na Palavra hoje. A sua estação de frutificação e abundância está confirmada no Senhor!",
    oracao: "Pai amado, aprofunda as raízes da minha fé em Ti. Que mesmo em tempos difíceis, eu continue produzindo amor, paz, bondade e esperança para abençoar outros. Amém!",
    aplicacao: "Ore abençoando alguém da sua família que está precisando de frutos de ânimo.",
    categoria: "Confiança"
  },
  {
    diaMes: "1-18",
    tema: "Tudo Posso Naquele que me Fortalece",
    versiculo: "Tudo posso naquele que me fortalece.",
    referencia: "Filipenses 4:13",
    reflexao: "Este versículo não é uma fórmula mágica para ambições egoístas, mas uma declaração poderosa de contentamento e vitória espiritual. O apóstolo Paulo descobriu que, seja na fartura ou na escassez, na saúde ou na dor, Cristo era o segredo de sua resiliência. Você não está sozinho no desafio que tem pela frente; o poder do Deus Altíssimo habita em você!",
    oracao: "Jesus, coloco minhas metas, desafios e fraquezas diante de Ti. Capacita-me a realizar tudo aquilo que me confiaste com excelência e dignidade. Amém!",
    aplicacao: "Encare a tarefa mais difícil da sua lista hoje confiando no auxílio de Cristo.",
    categoria: "Força"
  },
  {
    diaMes: "1-19",
    tema: "O Poder da Palavra Gentil",
    versiculo: "A resposta calma desvia a fúria, mas a palavra ríspida desperta a ira.",
    referencia: "Provérbios 15:1",
    reflexao: "As palavras têm o poder de construir pontes ou erguer muros; de curar feridas ou envenenar relacionamentos. Hoje você terá dezenas de oportunidades para escolher como responder aos outros. Escolha a mansidão. Uma palavra temperada com graça e amor tem o poder de desarmar qualquer conflito e levar a luz de Cristo aos ambientes mais tensos.",
    oracao: "Senhor, coloca uma sentinela diante da minha boca e guarda a porta dos meus lábios. Que minhas palavras hoje transmitam vida, consolo, edificação e paz. Amém!",
    aplicacao: "Antes de responder a uma provocação hoje, conte até 5 e responda com carinho.",
    categoria: "Sabedoria"
  },
  {
    diaMes: "1-20",
    tema: "Deus Não Desiste de Você",
    versiculo: "Estou convencido de que aquele que começou boa obra em vocês, vai completá-la até o dia de Cristo Jesus.",
    referencia: "Filipenses 1:6",
    reflexao: "Você pode ter errado, pode ter tropeçado ou se sentido incapaz. Mas Deus nunca abandona uma obra inacabada. Ele é o Mestre Oleiro e você é o barro. Mesmo quando o vaso quebra, Ele refaz com ainda mais formosura e utilidade. Não desanime de si mesmo, porque Deus não desiste de você. Seu processo de amadurecimento está em andamento e o melhor ainda está por vir!",
    oracao: "Pai de misericórdia, obrigado por Tua paciência infinita comigo. Sei que estás trabalhando em meu caráter dia após dia. Que eu seja sensível ao Teu moldar gracioso. Amém!",
    aplicacao: "Perdoe a si mesmo por falhas passadas e renove hoje seu compromisso com Deus.",
    categoria: "Esperança"
  },
  {
    diaMes: "1-21",
    tema: "A Bússola da Oração",
    versiculo: "Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus.",
    referencia: "Filipenses 4:6",
    reflexao: "A ansiedade quer que você carregue amanhãs que ainda nem chegaram. A oração, por outro lado, pega o peso dos seus ombros e o deposita no altar de Deus. Quando você transformar cada preocupação em motivo de oração, experimentará uma tranquilidade que o mundo não entende. Não guarde para si: fale com Deus como um filho fala com o melhor dos pais.",
    oracao: "Senhor, entrego agora mesmo as inquietações que perturbam meu sono e minha mente. Sei que sabes de tudo e tens o melhor reservado para mim. Eu descanso em Ti. Amém!",
    aplicacao: "Escreva suas 3 maiores preocupações e transforme cada uma em uma curta oração.",
    categoria: "Paz"
  },
  {
    diaMes: "1-22",
    tema: "Luz do Mundo e Sal da Terra",
    versiculo: "Assim resplandeça a vossa luz diante dos homens, para que vejam as vossas boas obras e glorifiquem a vosso Pai, que está nos céus.",
    referencia: "Mateus 5:16",
    reflexao: "A lâmpada não foi feita para ficar escondida debaixo da cama, mas para iluminar a casa inteira. Onde quer que você esteja hoje — na sua casa, na empresa, na rua ou no trânsito — você é um embaixador do Reino de Deus. Seja a pessoa que traz esperança, que estende a mão sem esperar retorno e que reflete a beleza do amor de Jesus.",
    oracao: "Senhor Jesus, usa a minha vida como um farol de esperança. Onde houver tristeza, que eu leve consolo; onde houver conflito, que eu seja promotor da reconciliação. Amém!",
    aplicacao: "Pratique um ato de generosidade secreta para alguém que precisa hoje.",
    categoria: "Propósito"
  },
  {
    diaMes: "1-23",
    tema: "O Deus dos Impossíveis",
    versiculo: "Jesus olhou para eles e respondeu: 'Para o homem é impossível, mas para Deus todas as coisas são possíveis'.",
    referencia: "Mateus 19:26",
    reflexao: "O limite humano é o ponto de partida para o milagre divino. Quando os médicos, os advogados, os bancos ou as forças humanas dizem 'não tem mais jeito', Deus sussurra: 'Agora olhe para Mim'. Nunca meça o tamanho do seu problema pela sua capacidade; meça-o pela grandeza do Deus a quem você serve. Para Ele, não há caso perdido nem oração ignorada.",
    oracao: "Deus Todo-Poderoso, Tu és o Senhor do impossível. Eu creio que para Ti não há barreiras. Quebra os grilhões, abre as portas trancadas e manifesta a Tua glória na minha vida! Amém!",
    aplicacao: "Ore com convicção por uma causa que aos olhos humanos parece sem solução.",
    categoria: "Fé"
  },
  {
    diaMes: "1-24",
    tema: "O Escudo da Fé",
    versiculo: "Além disso, usem o escudo da fé, com o qual vocês poderão apagar todas as setas inflamadas do Maligno.",
    referencia: "Efésios 6:16",
    reflexao: "Pensamentos de derrota, acusações e desânimo são como flechas que tentam perfurar nossa mente. Mas você tem em mãos o escudo da fé. Toda vez que uma mentira surgir dizendo que você não vai conseguir ou que Deus te desamparou, levante o escudo da Palavra e declare: 'O meu Deus suprirá todas as minhas necessidades segundo as Suas riquezas em glória!'.",
    oracao: "Senhor, levanto o escudo da fé contra todo medo, dúvida e desânimo. Declaro que minha vida está guardada debaixo do sangue de Jesus e nenhuma arma forjada prevalecerá. Amém!",
    aplicacao: "Repita um versículo bíblico toda vez que um pensamento negativo tentar entrar hoje.",
    categoria: "Proteção"
  },
  {
    diaMes: "1-25",
    tema: "A Beleza da Paciência e da Espera",
    versiculo: "Espere no Senhor. Seja forte! Coragem! Espere no Senhor.",
    referencia: "Salmos 27:14",
    reflexao: "Esperar no Senhor nunca é tempo perdido; é tempo de preparo. Na sala de espera de Deus, Ele molda o nosso caráter para que possamos suportar e desfrutar o peso da bênção que virá. O fruto que amadurece no tempo certo é doce e nutritivo. Não atropele os planos de Deus com ansiedade; confie no relógio do Criador.",
    oracao: "Pai amado, acalma a pressa do meu coração. Ensina-me a descansar na certeza de que o Teu tempo é perfeito em cada área da minha existência. Em Jesus, amém!",
    aplicacao: "Pratique a paciência no trânsito ou em filas hoje, orando silenciosamente pelas pessoas ao redor.",
    categoria: "Paciência"
  },
  {
    diaMes: "1-26",
    tema: "O Dom do Perdão que Liberta",
    versiculo: "Sejam bondosos e compassivos uns para com os outros, perdoando-se mutuamente, assim como Deus os perdoou em Cristo.",
    referencia: "Efésios 4:32",
    reflexao: "Reter mágoa é como tomar veneno esperando que a outra pessoa sofra. O perdão não justifica o erro de quem te feriu; o perdão liberta o seu coração da prisão do ressentimento. Deus nos perdoou uma dívida impagável na cruz; por isso, temos a autoridade e a bênção de liberar o perdão para quem nos ofendeu. Voe livre: solte as correntes do passado hoje!",
    oracao: "Senhor, abro mão de todo ressentimento. Perdoo de coração a quem me magoou e peço que derrames bênçãos sobre essa pessoa. Cura as minhas feridas emocionais. Amém!",
    aplicacao: "Tome a decisão firme de perdoar uma ofensa recente e deseje o bem a essa pessoa.",
    categoria: "Perdão"
  },
  {
    diaMes: "1-27",
    tema: "A Riqueza da Generosidade",
    versiculo: "O generoso prosperará; quem dá alívio aos outros, alívio receberá.",
    referencia: "Provérbios 11:25",
    reflexao: "Deus não nos abençoa apenas para sermos uma represa, mas para sermos um rio de bênçãos para os outros. Uma mão fechada não apenas não consegue doar, como também não consegue receber novas graças. Quando você abençoa com seu tempo, seus ouvidos, seus recursos ou uma oração, Deus abre as comportas do céu sobre sua vida com abundância incalculável.",
    oracao: "Deus grandioso, livra-me do egoísmo e da mesquinhez. Dá-me um coração generoso e atento às necessidades do meu próximo. Faze de mim um instrumento da Tua provisão. Amém!",
    aplicacao: "Ajude alguém financeiramente, doe uma peça de roupa ou pague um café para alguém hoje.",
    categoria: "Generosidade"
  },
  {
    diaMes: "1-28",
    tema: "Firmados na Rocha Inabalável",
    versiculo: "Todo aquele, pois, que ouve estas minhas palavras e as pratica será comparado a um homem prudente que edificou a sua casa sobre a rocha.",
    referencia: "Mateus 7:24",
    reflexao: "A tempestade veio tanto para a casa sobre a areia quanto para a casa sobre a rocha. As tempestades da vida alcançam a todos; a diferença decisiva não está na ausência de chuva, mas no alicerce onde a vida está construída. Edifique sua casa na prática dos ensinamentos de Jesus, na oração e na integridade. Quando o vento soprar forte, sua casa permanecerá inabalável!",
    oracao: "Senhor Jesus, sê Tu o fundamento da minha família, do meu casamento, do meu trabalho e dos meus pensamentos. Que minha vida esteja firmada na Tua verdade eterna. Amém!",
    aplicacao: "Avalie suas decisões de hoje à luz da seguinte pergunta: 'O que Jesus faria em meu lugar?'.",
    categoria: "Sabedoria"
  },
  {
    diaMes: "1-29",
    tema: "O Cuidado de Deus nos Mínimos Detalhes",
    versiculo: "Não se vendem dois pardais por uma moedinha? Contudo, nenhum deles cai no chão sem o consentimento do Pai de vocês. E até os cabelos da cabeça de vocês estão todos contados.",
    referencia: "Mateus 10:29-30",
    reflexao: "Você nunca foi apenas mais um na multidão para Deus. Aquele que nomeou cada estrela do firmamento conhece cada batimento do seu coração e até o número dos seus fios de cabelo. Se Deus alimenta os passarinhos e veste as flores do campo com tanta formosura, com certeza Ele não esquecerá de você. Você tem um valor imensurável para Ele!",
    oracao: "Pai amoroso, obrigado por Teu cuidado pessoal e minucioso por mim. Afasta de mim a sensação de solidão ou abandono. Sei que sou precioso aos Teus olhos. Amém!",
    aplicacao: "Olhe para o céu ou para a natureza ao longo do dia e lembre-se do quanto Deus te ama.",
    categoria: "Cuidado de Deus"
  },
  {
    diaMes: "1-30",
    tema: "A Vitória que Vence o Mundo",
    versiculo: "Porque todo o que é nascido de Deus vence o mundo; e esta é a vitória que vence o mundo: a nossa fé.",
    referencia: "1 João 5:4",
    reflexao: "O mundo pode apresentar pressões intensas, tribulações e cobranças diárias. Mas você não pertence ao padrão deste mundo; você é nascido de Deus! A fé não é um mero pensamento positivo, é uma aliança com o Todo-Poderoso. Mantenha os seus olhos fitos na vitória já conquistada e avance com passos firmes e sorriso no rosto.",
    oracao: "Deus eterno, fortalece minha identidade como Teu filho amado. Que eu ande em triunfo, trazendo honra ao Teu nome em cada escolha deste dia. Em nome de Jesus, amém!",
    aplicacao: "Compartilhe uma palavra de fé com alguém que esteja abatido no trabalho ou na família.",
    categoria: "Vitória"
  },
  {
    diaMes: "1-31",
    tema: "Gratidão pelo Mês e Novos Horizontes",
    versiculo: "Até aqui nos ajudou o Senhor.",
    referencia: "1 Samuel 7:12",
    reflexao: "Olhe para trás e contemple os livramentos que Deus te deu. Talvez o caminho tenha tido subidas íngremes e noites escuras, mas a mão do Senhor esteve segurando a sua em cada milímetro da jornada. Diga de coração: 'Ebenézer, até aqui o Senhor me sustentou!'. E com essa mesma fidelidade, Ele continuará te conduzindo no próximo mês e por toda a sua vida.",
    oracao: "Senhor Deus, meu coração transborda em gratidão por Teu cuidado leal. Obrigado pelo sustento, pelo teto, pelo pão e pela Tua presença. Que venham novos dias sob a Tua bênção. Amém!",
    aplicacao: "Agradeça expressamente a Deus por um livramento marcante que você experimentou.",
    categoria: "Gratidão"
  }
];

// Gerador dinâmico de devocionais para todos os 366 dias do ano
// Cria mensagens temáticas variadas baseadas no dia do ano se não houver entrada fixa
function obterDevocionalPorData(data) {
  const dia = data.getDate();
  const mes = data.getMonth() + 1; // 1 a 12
  const chave = `${mes}-${dia}`;

  // Procura devocional exato na base
  const encontrado = DEVOCIONAIS_BASE.find(d => d.diaMes === chave);
  if (encontrado) {
    const dev = {
      ...encontrado,
      dataCompleta: formatarDataExtenso(data)
    };
    dev.imagemJesus = associarArteJesus(dev);
    return dev;
  }

  // Se não houver dia específico, mapeia para um índice determinístico rico
  // Calculando o dia do ano (1 a 366)
  const inicioAno = new Date(data.getFullYear(), 0, 0);
  const diff = data - inicioAno;
  const umDia = 1000 * 60 * 60 * 24;
  const diaDoAno = Math.floor(diff / umDia);

  const temasExtras = [
    {
      tema: "O Poder da Mansidão e da Fé",
      versiculo: "Bem-aventurados os mansos, porque herdarão a terra.",
      referencia: "Mateus 5:5",
      reflexao: "A mansidão não é fraqueza, mas poder sob controle divino. Em momentos de atrito, responda com a elegância do silêncio ou com palavras suaves. Deus defende os Seus filhos e honra quem escolhe a paz.",
      oracao: "Senhor, unge minhas atitudes com mansidão. Que Cristo seja visto em minhas reações hoje. Amém!",
      aplicacao: "Hoje, pratique o silêncio sábio diante de qualquer provocação.",
      categoria: "Paz"
    },
    {
      tema: "Renovação da Mente e Pensamentos Puros",
      versiculo: "E não vos conformeis com este mundo, mas transformai-vos pela renovação do vosso entendimento.",
      referencia: "Romanos 12:2",
      reflexao: "Nossa vida se move na direção dos nossos pensamentos mais frequentes. Se você alimentar pensamentos de derrota, sentirá desânimo. Se encher a mente com as promessas de Deus, colherá paz e coragem sobrenatural. Renove sua mente na Palavra hoje!",
      oracao: "Pai amado, limpa meus pensamentos de toda ansiedade e negativismo. Que eu pense naquilo que é nobre, amável e verdadeiro. Amém!",
      aplicacao: "Identifique um pensamento negativo e substitua-o imediatamente por uma promessa bíblica.",
      categoria: "Sabedoria"
    },
    {
      tema: "Deus Trabalha no Silêncio",
      versiculo: "Ainda que a figueira não floresça, nem haja fruto na vide... todavia eu me alegrarei no Senhor, exultarei no Deus da minha salvação.",
      referencia: "Habacuque 3:17-18",
      reflexao: "Mesmo quando o céu parece em silêncio e as respostas demoram a aparecer aos olhos humanos, Deus continua trabalhando ativamente a seu favor. O inverno prepara a terra para a primavera mais bonita. Não desista no meio do processo; a sua colheita de milagres está chegando!",
      oracao: "Senhor, ainda que eu não compreenda tudo agora, escolho confiar no Teu amor e no Teu agir silencioso. Minha alegria está em Ti. Amém!",
      aplicacao: "Sorria e agradeça a Deus por uma oração que ainda não foi respondida fisicamente.",
      categoria: "Confiança"
    },
    {
      tema: "A Família Debaixo da Graça de Deus",
      versiculo: "Eu e a minha casa serviremos ao Senhor.",
      referencia: "Josué 24:15c",
      reflexao: "Sua casa é um território sagrado guardado pelos anjos do Senhor. Seja você o sacerdote e a embaixadora da paz no seu lar hoje. Abençoe seus filhos, seu cônjuge, seus pais e parentes. Palavras de amor e orações constantes têm o poder de transformar a atmosfera do lar.",
      oracao: "Senhor Deus, abençoa a minha família. Coloca muralhas de proteção ao redor do nosso lar e derrama harmonia, saúde, carinho e respeito entre nós. Amém!",
      aplicacao: "Abrace alguém da sua família hoje com afeto e diga: 'Eu amo você e oro por sua vida'.",
      categoria: "Família"
    },
    {
      tema: "A Promessa de Vitória no Trabalho",
      versiculo: "Tudo o que fizerem, façam de todo o coração, como para o Senhor, e não para os homens.",
      referencia: "Colossenses 3:23",
      reflexao: "Seu trabalho ou seus afazeres diários são uma plataforma de adoração a Deus. Quando você faz suas tarefas com excelência, ética, pontualidade e dedicação, o nome de Cristo é glorificado. Deus vê o seu esforço nos bastidores e recompensará a sua fidelidade.",
      oracao: "Pai celeste, consagro a Ti meu trabalho e meus talentos. Abre portas de prosperidade e dá-me sabedoria para lidar com colegas e desafios. Amém!",
      aplicacao: "Faça suas tarefas de hoje com capricho e um coração grato pelo seu sustento.",
      categoria: "Propósito"
    },
    {
      tema: "A Água Viva que Sacia Toda Sede",
      versiculo: "Aquele, porém, que beber da água que eu lhe der nunca mais terá sede; pelo contrário, a água que eu lhe der será nele uma fonte a jorrar para a vida eterna.",
      referencia: "João 4:14",
      reflexao: "Nada neste mundo terreno — coisas materiais, status ou aprovação de pessoas — pode preencher o vazio infinito que foi feito para Deus habitar. Quando você bebe da presença de Jesus, sua alma encontra descanso pleno e satisfação verdadeira. Ele é tudo o que você precisa!",
      oracao: "Jesus, Tu és a fonte da água viva. Sacia os anseios do meu coração e faz brotar em mim rios de vida, paz e consolo para outros. Amém!",
      aplicacao: "Beba um copo de água fresca hoje lembrando-se de que Jesus é o manancial da sua alma.",
      categoria: "Esperança"
    },
    {
      tema: "Curados para Curar e Abençoar",
      versiculo: "Ele sara os de coração quebrantado e cura as suas feridas.",
      referencia: "Salmos 147:3",
      reflexao: "Deus não despreza as suas lágrimas nem ignora as dores secretas do seu peito. Ele é o Médico dos médicos, especialista em sarar corações feridos por decepções, perdas ou rejeição. Deixe a mão carinhosa de Jesus tocar a sua dor hoje. Ele vai transformar suas cicatrizes em testemunhos de glória!",
      oracao: "Senhor Jesus, toca nos lugares doloridos da minha alma. Cura as mágoas do passado e restaura minha alegria de viver. Eu recebo a Tua cura agora. Amém!",
      aplicacao: "Liberte hoje qualquer mágoa acumulada e ore pela cura emocional de um amigo.",
      categoria: "Cura"
    }
  ];

  // Alterna suavemente entre os temas
  const baseModelo = DEVOCIONAIS_BASE[diaDoAno % DEVOCIONAIS_BASE.length];
  const temaExtra = temasExtras[diaDoAno % temasExtras.length];

  const resultado = {
    diaMes: chave,
    tema: dia % 2 === 0 ? temaExtra.tema : baseModelo.tema,
    versiculo: dia % 2 === 0 ? temaExtra.versiculo : baseModelo.versiculo,
    referencia: dia % 2 === 0 ? temaExtra.referencia : baseModelo.referencia,
    reflexao: dia % 2 === 0 ? temaExtra.reflexao : baseModelo.reflexao,
    oracao: dia % 2 === 0 ? temaExtra.oracao : baseModelo.oracao,
    aplicacao: dia % 2 === 0 ? temaExtra.aplicacao : baseModelo.aplicacao,
    categoria: dia % 2 === 0 ? temaExtra.categoria : baseModelo.categoria,
    dataCompleta: formatarDataExtenso(data)
  };
  resultado.imagemJesus = associarArteJesus(resultado);
  return resultado;
}

// Catálogo de Ilustrações Digitais Artísticas de Jesus
const ARTES_JESUS = {
  pastor: {
    id: "pastor",
    arquivo: "../../brain/cbc69604-b8fe-4fe1-9f3d-383600f29921/jesus_bom_pastor_1792428830572.jpg",
    arquivoLocal: "assets/jesus-bom-pastor.jpg",
    titulo: "Jesus, o Bom Pastor",
    descricao: "O Pastor zeloso que cuida, protege e carrega Suas ovelhas."
  },
  tempestade: {
    id: "tempestade",
    arquivo: "../../brain/cbc69604-b8fe-4fe1-9f3d-383600f29921/jesus_paz_tempestade_1792428856047.jpg",
    arquivoLocal: "assets/jesus-paz-tempestade.jpg",
    titulo: "Jesus Acalma a Tempestade",
    descricao: "A mão que acalma os ventos e traz paz inabalável ao seu coração."
  },
  bracosAbertos: {
    id: "bracosAbertos",
    arquivo: "../../brain/cbc69604-b8fe-4fe1-9f3d-383600f29921/jesus_bracos_abertos_1792428881858.jpg",
    arquivoLocal: "assets/jesus-bracos-abertos.jpg",
    titulo: "Jesus de Braços Abertos",
    descricao: "O amor acolhedor, o perdão e o descanso para toda alma cansada."
  },
  oracao: {
    id: "oracao",
    arquivo: "../../brain/cbc69604-b8fe-4fe1-9f3d-383600f29921/jesus_oracao_luz_1792428914541.jpg",
    arquivoLocal: "assets/jesus-oracao-luz.jpg",
    titulo: "Jesus em Oração no Monte",
    descricao: "A força, intimidade e luz divina que vêm da comunhão com o Pai."
  }
};

function associarArteJesus(devocional) {
  const cat = (devocional.categoria || '').toLowerCase();
  const tema = (devocional.tema || '').toLowerCase();
  const versiculo = (devocional.versiculo || '').toLowerCase();

  if (cat.includes('provisão') || cat.includes('cuidado') || cat.includes('confiança') || tema.includes('pastor') || versiculo.includes('pastor') || cat.includes('família')) {
    return ARTES_JESUS.pastor;
  }
  if (cat.includes('paz') || cat.includes('proteção') || cat.includes('tempestade') || tema.includes('mar') || tema.includes('vento') || tema.includes('refúgio')) {
    return ARTES_JESUS.tempestade;
  }
  if (cat.includes('força') || cat.includes('coragem') || cat.includes('sabedoria') || cat.includes('oração') || tema.includes('oração') || tema.includes('luz')) {
    return ARTES_JESUS.oracao;
  }
  return ARTES_JESUS.bracosAbertos;
}

function formatarDataExtenso(data) {
  const opcoes = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const texto = data.toLocaleDateString('pt-BR', opcoes);
  // Deixar a primeira letra maiúscula
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function formatarDataCurta(data) {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}
