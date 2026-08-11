/* ==========================================================================
   TOUR GUARAPUAVA — script.js
   JavaScript puro (sem frameworks). Organizado por responsabilidade:
   1. Dados mockados
   2. Estado da aplicação
   3. Navegação entre telas
   4. Home (busca, categorias, destaques)
   5. Mapa (marcadores simulados)
   6. Detalhes do ponto turístico (+ galeria/lightbox)
   7. Favoritos (localStorage)
   8. Linhas de ônibus e linha detalhada (abas)
   9. Utilitários (toast, etc.)
   ========================================================================== */

/* ==========================================================================
   1. DADOS MOCKADOS
   ========================================================================== */

const CATEGORIAS = [
  { id: "parques", nome: "Parques", icone: "🌳" },
  { id: "cachoeiras", nome: "Cachoeiras", icone: "💧" },
  { id: "historia", nome: "História", icone: "🏛️" },
  { id: "cultura", nome: "Cultura", icone: "🎭" },
  { id: "trilhas", nome: "Trilhas", icone: "🥾" },
];

// Imagens provisórias (Unsplash), mantendo proporção/finalidade da referência.
const lugares = [
  {
    id: 1,
    nome: "Parque do Lago",
    categoria: "parques",
    categoriaLabel: "Parques",
    descricao: "Principal ponto turístico de Guarapuava, ideal para caminhadas, piqueniques e lazer em família. Conta com trilhas arborizadas, pista de caminhada e um lago central que é o cartão postal da cidade.",
    avaliacao: 4.8,
    avaliacoes: 324,
    distancia: "1,2 km",
    destaque: true,
    tag: "Cartão postal da cidade",
    imagem: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
    galeria: [
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=600&auto=format&fit=crop",
    ],
    endereco: "Av. das Torres, 1000 - Guarapuava/PR",
    horario: "Seg a Dom: 06h às 22h",
    telefone: "(42) 3623-1234",
    site: "www.guarapuava.pr.gov.br",
    mapaPos: { top: 46, left: 46 },
  },
  {
    id: 2,
    nome: "Salto São Francisco",
    categoria: "cachoeiras",
    categoriaLabel: "Cachoeiras",
    descricao: "A maior cachoeira do sul do Brasil, com cerca de 90 metros de queda d'água. Um espetáculo natural cercado por mata nativa, ótimo para fotos e contemplação.",
    avaliacao: 4.7,
    avaliacoes: 512,
    distancia: "24 km",
    destaque: true,
    tag: "Maior cachoeira do sul do Brasil",
    imagem: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=1200&auto=format&fit=crop",
    galeria: [
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=600&auto=format&fit=crop",
    ],
    endereco: "Estrada Rural do Salto, s/n - Guarapuava/PR",
    horario: "Seg a Dom: 08h às 18h",
    telefone: "(42) 3623-5566",
    site: "www.saltosaofrancisco.com.br",
    mapaPos: { top: 20, left: 68 },
  },
  {
    id: 3,
    nome: "Catedral Nossa Senhora de Belém",
    categoria: "historia",
    categoriaLabel: "História",
    descricao: "Marco histórico e religioso do centro da cidade, com arquitetura imponente e vitrais notáveis. Um dos pontos mais fotografados de Guarapuava.",
    avaliacao: 4.6,
    avaliacoes: 210,
    distancia: "0,8 km",
    imagem: "https://images.unsplash.com/photo-1548276145-69a9521f0499?q=80&w=1200&auto=format&fit=crop",
    galeria: [
      "https://images.unsplash.com/photo-1548276145-69a9521f0499?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?q=80&w=600&auto=format&fit=crop",
    ],
    endereco: "Praça Rui Barbosa, s/n - Centro, Guarapuava/PR",
    horario: "Seg a Sáb: 07h às 19h",
    telefone: "(42) 3624-1122",
    site: "www.diocesedeguarapuava.org.br",
    mapaPos: { top: 32, left: 24 },
  },
  {
    id: 4,
    nome: "Museu Municipal",
    categoria: "cultura",
    categoriaLabel: "Cultura",
    descricao: "Acervo dedicado à história e à cultura dos Campos de Guarapuava, com peças indígenas, fotografias antigas e objetos dos primeiros colonizadores.",
    avaliacao: 4.5,
    avaliacoes: 98,
    distancia: "1,5 km",
    imagem: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?q=80&w=1200&auto=format&fit=crop",
    galeria: [
      "https://images.unsplash.com/photo-1554907984-15263bfd63bd?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554914963-5e37c0d1c6f2?q=80&w=600&auto=format&fit=crop",
    ],
    endereco: "Rua Barão do Rio Branco, 500 - Centro, Guarapuava/PR",
    horario: "Ter a Dom: 09h às 17h",
    telefone: "(42) 3624-3344",
    site: "www.museuguarapuava.pr.gov.br",
    mapaPos: { top: 58, left: 20 },
  },
  {
    id: 5,
    nome: "Trilha da Serrinha",
    categoria: "trilhas",
    categoriaLabel: "Trilhas",
    descricao: "Trilha de dificuldade moderada com mirantes que revelam vistas panorâmicas dos Campos Gerais. Ideal para quem busca contato com a natureza.",
    avaliacao: 4.9,
    avaliacoes: 156,
    distancia: "9 km",
    imagem: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
    galeria: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=600&auto=format&fit=crop",
    ],
    endereco: "Acesso pela Estrada da Serrinha, km 6 - Guarapuava/PR",
    horario: "Seg a Dom: 06h às 17h",
    telefone: "(42) 3625-7788",
    site: "www.trilhasguarapuava.com.br",
    mapaPos: { top: 75, left: 58 },
  },
  {
    id: 6,
    nome: "Parque das Araucárias",
    categoria: "parques",
    categoriaLabel: "Parques",
    descricao: "Área verde preservada com araucárias centenárias, playground e espaço para piquenique. Um refúgio tranquilo perto do centro.",
    avaliacao: 4.6,
    avaliacoes: 189,
    distancia: "2,4 km",
    imagem: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=1200&auto=format&fit=crop",
    galeria: [
      "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?q=80&w=600&auto=format&fit=crop",
    ],
    endereco: "Rua das Araucárias, 200 - Guarapuava/PR",
    horario: "Seg a Dom: 06h às 20h",
    telefone: "(42) 3626-9900",
    site: "www.guarapuava.pr.gov.br/parques",
    mapaPos: { top: 15, left: 40 },
  },
  {
    id: 7,
    nome: "Cachoeira do Rio das Pedras",
    categoria: "cachoeiras",
    categoriaLabel: "Cachoeiras",
    descricao: "Queda d'água de fácil acesso, com poço natural para banho em dias quentes. Ponto favorito de famílias nos fins de semana.",
    avaliacao: 4.4,
    avaliacoes: 142,
    distancia: "15 km",
    imagem: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1200&auto=format&fit=crop",
    galeria: [
      "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=600&auto=format&fit=crop",
    ],
    endereco: "Estrada do Rio das Pedras, km 10 - Guarapuava/PR",
    horario: "Seg a Dom: 08h às 18h",
    telefone: "(42) 3627-4455",
    site: "www.guarapuava.pr.gov.br/cachoeiras",
    mapaPos: { top: 63, left: 78 },
  },
  {
    id: 8,
    nome: "Theatro Municipal",
    categoria: "cultura",
    categoriaLabel: "Cultura",
    descricao: "Casa de espetáculos com programação de teatro, música e dança durante todo o ano. Referência cultural da região central do Paraná.",
    avaliacao: 4.7,
    avaliacoes: 87,
    distancia: "1,0 km",
    imagem: "https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=1200&auto=format&fit=crop",
    galeria: [
      "https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?q=80&w=600&auto=format&fit=crop",
    ],
    endereco: "Rua XV de Novembro, 750 - Centro, Guarapuava/PR",
    horario: "Ter a Dom: 14h às 22h",
    telefone: "(42) 3628-1010",
    site: "www.theatromunicipal.guarapuava.pr.gov.br",
    mapaPos: { top: 40, left: 34 },
  },
];

const linhasOnibus = [
  {
    id: "101",
    cor: "badge-101",
    nome: "Centro – Parque do Lago",
    via: "Via Santa Cruz",
    proximoOnibus: "3 min",
    itinerario: [
      { nome: "Terminal Central", info: "Ponto de partida" },
      { nome: "Rua XV de Novembro", info: "Parada 2" },
      { nome: "Santa Cruz", info: "Parada 3" },
      { nome: "Parque do Lago", info: "Destino final", final: true },
    ],
    horarios: [
      { dir: "Centro → Parque do Lago", time: "05:40" },
      { dir: "Centro → Parque do Lago", time: "06:10" },
      { dir: "Centro → Parque do Lago", time: "06:40" },
      { dir: "Parque do Lago → Centro", time: "07:00" },
      { dir: "Parque do Lago → Centro", time: "07:30" },
      { dir: "Centro → Parque do Lago", time: "08:00" },
    ],
  },
  {
    id: "102",
    cor: "badge-102",
    nome: "Centro – Salto São Francisco",
    via: "Via Santana",
    proximoOnibus: "7 min",
    itinerario: [
      { nome: "Terminal Central", info: "Ponto de partida" },
      { nome: "Bairro Santana", info: "Parada 2" },
      { nome: "Estrada Rural", info: "Parada 3" },
      { nome: "Salto São Francisco", info: "Destino final", final: true },
    ],
    horarios: [
      { dir: "Centro → Salto", time: "06:00" },
      { dir: "Centro → Salto", time: "07:20" },
      { dir: "Salto → Centro", time: "12:00" },
      { dir: "Salto → Centro", time: "17:40" },
    ],
  },
  {
    id: "103",
    cor: "badge-103",
    nome: "Centro – Aeroporto",
    via: "Via Vila Bela",
    proximoOnibus: "12 min",
    itinerario: [
      { nome: "Terminal Central", info: "Ponto de partida" },
      { nome: "Vila Bela", info: "Parada 2" },
      { nome: "Av. do Aeroporto", info: "Parada 3" },
      { nome: "Aeroporto de Guarapuava", info: "Destino final", final: true },
    ],
    horarios: [
      { dir: "Centro → Aeroporto", time: "05:30" },
      { dir: "Centro → Aeroporto", time: "08:15" },
      { dir: "Aeroporto → Centro", time: "10:45" },
      { dir: "Aeroporto → Centro", time: "18:20" },
    ],
  },
  {
    id: "104",
    cor: "badge-104",
    nome: "Centro – Industrial",
    via: "Via Boqueirão",
    proximoOnibus: "5 min",
    itinerario: [
      { nome: "Terminal Central", info: "Ponto de partida" },
      { nome: "Boqueirão", info: "Parada 2" },
      { nome: "Distrito Industrial", info: "Destino final", final: true },
    ],
    horarios: [
      { dir: "Centro → Industrial", time: "05:20" },
      { dir: "Centro → Industrial", time: "06:00" },
      { dir: "Industrial → Centro", time: "17:10" },
      { dir: "Industrial → Centro", time: "18:00" },
    ],
  },
];

/* ==========================================================================
   2. ESTADO DA APLICAÇÃO
   ========================================================================== */

const state = {
  currentScreen: "home",
  selectedCategoria: null,
  selectedLugarId: null,
  selectedLinhaId: null,
  galleryIndex: 0,
  favoritos: [], // ids de lugares favoritados
};

/* ==========================================================================
   3. NAVEGAÇÃO ENTRE TELAS
   ========================================================================== */

function irParaTela(nomeTela) {
  document.querySelectorAll(".screen").forEach((el) => el.classList.remove("active"));
  const alvo = document.getElementById(`screen-${nomeTela}`);
  if (alvo) alvo.classList.add("active");
  state.currentScreen = nomeTela;

  // Atualiza estado ativo da navegação inferior (apenas para telas principais)
  const telasPrincipais = ["home", "mapa", "linhas", "favoritos", "perfil"];
  document.querySelectorAll(".nav-item").forEach((btn) => {
    const tela = btn.dataset.nav;
    const ativo = telasPrincipais.includes(nomeTela) && tela === nomeTela;
    btn.classList.toggle("active", ativo);
  });

  // Rola o corpo da tela para o topo ao trocar
  const body = alvo ? alvo.querySelector(".app-body, .detail-scroll") : null;
  if (body) body.scrollTop = 0;

  if (nomeTela === "favoritos") renderFavoritos();
  if (nomeTela === "perfil") atualizarStatsPerfil();
}

function configurarNavegacaoInferior() {
  document.querySelectorAll(".nav-item").forEach((btn) => {
    btn.addEventListener("click", () => irParaTela(btn.dataset.nav));
  });
}

function configurarAcoesGerais() {
  document.querySelectorAll("[data-action]").forEach((el) => {
    el.addEventListener("click", () => {
      const acao = el.dataset.action;
      if (acao === "voltar-home") irParaTela("home");
      if (acao === "ir-home") irParaTela("home");
      if (acao === "voltar-linhas") irParaTela("linhas");
      if (acao === "ver-todas-categorias" || acao === "ver-todas-destaques" || acao === "ver-todas-proximos") {
        mostrarTodosOsLugares();
      }
      if (acao === "ver-todas-galeria" && state.selectedLugarId) {
        abrirLightbox(0);
      }
    });
  });
}

/* ==========================================================================
   4. HOME (busca, categorias, destaques, próximos)
   ========================================================================== */

function renderCategorias() {
  const container = document.getElementById("category-row");
  container.innerHTML = CATEGORIAS.map(
    (cat) => `
    <button class="category-item" data-categoria="${cat.id}" aria-label="Filtrar por ${cat.nome}">
      <span class="category-icon">${cat.icone}</span>
      <span>${cat.nome}</span>
    </button>`
  ).join("");

  container.querySelectorAll(".category-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const catId = btn.dataset.categoria;
      const jaAtiva = state.selectedCategoria === catId;
      state.selectedCategoria = jaAtiva ? null : catId;
      container.querySelectorAll(".category-item").forEach((b) => b.classList.remove("active"));
      if (!jaAtiva) btn.classList.add("active");

      if (state.selectedCategoria) {
        filtrarPorCategoria(state.selectedCategoria);
      } else {
        esconderResultadosBusca();
      }
    });
  });
}

function renderDestaques() {
  const container = document.getElementById("highlight-row");
  const destaques = lugares.filter((l) => l.destaque);
  container.innerHTML = destaques
    .map(
      (l) => `
    <div class="highlight-card" data-lugar-id="${l.id}" role="button" tabindex="0">
      <img src="${l.imagem}" alt="${l.nome}" loading="lazy">
      <span class="rating-pill">★ ${l.avaliacao}</span>
      <div class="overlay">
        <span class="name">${l.nome}</span>
        <span class="tag">${l.tag || l.categoriaLabel}</span>
      </div>
    </div>`
    )
    .join("");

  container.querySelectorAll("[data-lugar-id]").forEach((el) => {
    el.addEventListener("click", () => abrirDetalhes(Number(el.dataset.lugarId)));
  });
}

function renderProximos() {
  const container = document.getElementById("near-row");
  const ordenados = [...lugares].sort((a, b) => parseFloat(a.distancia) - parseFloat(b.distancia));
  container.innerHTML = ordenados
    .slice(0, 6)
    .map(
      (l) => `
    <div class="near-thumb" data-lugar-id="${l.id}" role="button" tabindex="0" aria-label="${l.nome}">
      <img src="${l.imagem}" alt="${l.nome}" loading="lazy">
    </div>`
    )
    .join("");

  container.querySelectorAll("[data-lugar-id]").forEach((el) => {
    el.addEventListener("click", () => abrirDetalhes(Number(el.dataset.lugarId)));
  });
}

function esconderResultadosBusca() {
  document.getElementById("search-results").classList.add("hidden");
  document.getElementById("home-default-content").classList.remove("hidden");
}

function mostrarResultados(lista, tituloVazio) {
  const defaultContent = document.getElementById("home-default-content");
  const results = document.getElementById("search-results");
  defaultContent.classList.add("hidden");
  results.classList.remove("hidden");

  if (lista.length === 0) {
    results.innerHTML = `<p class="no-results">${tituloVazio || "Nenhum lugar encontrado."}</p>`;
    return;
  }

  results.innerHTML = lista
    .map(
      (l) => `
    <div class="result-card" data-lugar-id="${l.id}" role="button" tabindex="0">
      <img src="${l.imagem}" alt="${l.nome}" loading="lazy">
      <div>
        <h3>${l.nome}</h3>
        <p class="result-cat">${l.categoriaLabel} · ★ ${l.avaliacao}</p>
        <p>${l.distancia} de você</p>
      </div>
    </div>`
    )
    .join("");

  results.querySelectorAll("[data-lugar-id]").forEach((el) => {
    el.addEventListener("click", () => abrirDetalhes(Number(el.dataset.lugarId)));
  });
}

function filtrarPorCategoria(catId) {
  const cat = CATEGORIAS.find((c) => c.id === catId);
  const resultado = lugares.filter((l) => l.categoria === catId);
  mostrarResultados(resultado, `Nenhum lugar encontrado em "${cat ? cat.nome : catId}".`);
}

function mostrarTodosOsLugares() {
  state.selectedCategoria = null;
  document.querySelectorAll(".category-item").forEach((b) => b.classList.remove("active"));
  mostrarResultados(lugares, "Nenhum lugar encontrado.");
}

function configurarBuscaHome() {
  const input = document.getElementById("home-search");
  input.addEventListener("input", () => {
    const termo = input.value.trim().toLowerCase();
    if (!termo) {
      esconderResultadosBusca();
      return;
    }
    const filtrados = lugares.filter(
      (l) =>
        l.nome.toLowerCase().includes(termo) ||
        l.categoriaLabel.toLowerCase().includes(termo) ||
        l.descricao.toLowerCase().includes(termo)
    );
    mostrarResultados(filtrados, `Nenhum resultado para "${input.value}".`);
  });
}

/* ==========================================================================
   5. MAPA (marcadores simulados)
   ========================================================================== */

function renderMapa() {
  const container = document.getElementById("map-markers");
  container.innerHTML = lugares
    .map((l) => {
      const icone = { parques: "🌳", cachoeiras: "💧", historia: "🏛️", cultura: "🎭", trilhas: "🥾" }[l.categoria] || "📍";
      return `
      <button class="map-marker" style="left:${l.mapaPos.left}%; top:${l.mapaPos.top}%;" data-lugar-id="${l.id}" aria-label="${l.nome}">
        <span>${icone}</span>
      </button>`;
    })
    .join("");

  container.querySelectorAll(".map-marker").forEach((el) => {
    el.addEventListener("click", () => selecionarMarcador(Number(el.dataset.lugarId)));
  });
}

function selecionarMarcador(lugarId) {
  document.querySelectorAll(".map-marker").forEach((m) => m.classList.remove("selected"));
  const marker = document.querySelector(`.map-marker[data-lugar-id="${lugarId}"]`);
  if (marker) marker.classList.add("selected");

  const lugar = lugares.find((l) => l.id === lugarId);
  if (!lugar) return;

  const preview = document.getElementById("map-preview");
  preview.innerHTML = `
    <div class="map-preview-card">
      <img src="${lugar.imagem}" alt="${lugar.nome}">
      <div class="map-preview-info">
        <h3>${lugar.nome}</h3>
        <p>★ ${lugar.avaliacao} (${lugar.avaliacoes})</p>
        <p class="dist">${lugar.distancia} de você</p>
      </div>
    </div>
    <button class="btn btn-solid" id="map-ver-detalhes">Ver detalhes</button>
  `;
  document.getElementById("map-ver-detalhes").addEventListener("click", () => abrirDetalhes(lugar.id));
}

function configurarBuscaMapa() {
  const input = document.getElementById("map-search");
  input.addEventListener("input", () => {
    const termo = input.value.trim().toLowerCase();
    document.querySelectorAll(".map-marker").forEach((marker) => {
      const lugar = lugares.find((l) => l.id === Number(marker.dataset.lugarId));
      const visivel = !termo || lugar.nome.toLowerCase().includes(termo);
      marker.style.display = visivel ? "flex" : "none";
    });
  });
}

function configurarBotaoLocalizar() {
  document.getElementById("locate-btn").addEventListener("click", () => {
    mostrarToast("Localização atualizada");
  });
}

/* ==========================================================================
   6. DETALHES DO PONTO TURÍSTICO
   ========================================================================== */

function abrirDetalhes(lugarId) {
  const lugar = lugares.find((l) => l.id === lugarId);
  if (!lugar) return;
  state.selectedLugarId = lugarId;
  state.galleryIndex = 0;

  document.getElementById("detail-img").src = lugar.imagem;
  document.getElementById("detail-img").alt = lugar.nome;
  document.getElementById("detail-name-top").textContent = lugar.nome;
  document.getElementById("detail-name").textContent = lugar.nome;
  document.getElementById("detail-rating-value").textContent = lugar.avaliacao.toFixed(1);
  document.getElementById("detail-rating-count").textContent = `(${lugar.avaliacoes} avaliações)`;
  document.getElementById("detail-desc").textContent = lugar.descricao;
  document.getElementById("detail-endereco").textContent = lugar.endereco;
  document.getElementById("detail-horario").textContent = lugar.horario;
  document.getElementById("detail-telefone").textContent = lugar.telefone;
  document.getElementById("detail-site").textContent = lugar.site;
  document.getElementById("gallery-counter").textContent = `1/${lugar.galeria.length}`;

  const galleryGrid = document.getElementById("gallery-grid");
  galleryGrid.innerHTML = lugar.galeria
    .map((img, i) => `<img src="${img}" alt="${lugar.nome} - foto ${i + 1}" data-index="${i}" loading="lazy">`)
    .join("");
  galleryGrid.querySelectorAll("img").forEach((img) => {
    img.addEventListener("click", () => abrirLightbox(Number(img.dataset.index)));
  });

  atualizarBotaoFavorito();
  irParaTela("detalhes");
}

function atualizarBotaoFavorito() {
  const isFav = state.favoritos.includes(state.selectedLugarId);
  const label = document.getElementById("btn-favoritar-label");
  const btn = document.getElementById("btn-favoritar");
  const btnTop = document.getElementById("detail-fav-top-btn");
  label.textContent = isFav ? "Favoritado" : "Favoritar";
  btn.classList.toggle("is-active", isFav);
  btnTop.style.color = isFav ? "#ff6b6b" : "#fff";
  btnTop.querySelector("path").setAttribute("fill", isFav ? "currentColor" : "none");
}

function configurarBotoesDetalhes() {
  document.getElementById("btn-favoritar").addEventListener("click", alternarFavoritoAtual);
  document.getElementById("detail-fav-top-btn").addEventListener("click", alternarFavoritoAtual);
  document.getElementById("btn-tracar-rota").addEventListener("click", () => {
    mostrarToast("Traçando rota até o local...");
    irParaTela("mapa");
    if (state.selectedLugarId) selecionarMarcador(state.selectedLugarId);
  });
}

function alternarFavoritoAtual() {
  if (!state.selectedLugarId) return;
  alternarFavorito(state.selectedLugarId);
  atualizarBotaoFavorito();
}

/* ---------- Lightbox (galeria ampliada) ---------- */

function abrirLightbox(index) {
  const lugar = lugares.find((l) => l.id === state.selectedLugarId);
  if (!lugar) return;
  state.galleryIndex = index;
  atualizarLightbox();
  document.getElementById("lightbox").classList.remove("hidden");
}

function atualizarLightbox() {
  const lugar = lugares.find((l) => l.id === state.selectedLugarId);
  if (!lugar) return;
  document.getElementById("lightbox-img").src = lugar.galeria[state.galleryIndex];
  document.getElementById("lightbox-img").alt = `${lugar.nome} - foto ${state.galleryIndex + 1}`;
  document.getElementById("lightbox-counter").textContent = `${state.galleryIndex + 1}/${lugar.galeria.length}`;
  document.getElementById("gallery-counter").textContent = `${state.galleryIndex + 1}/${lugar.galeria.length}`;
}

function configurarLightbox() {
  document.getElementById("lightbox-close").addEventListener("click", () => {
    document.getElementById("lightbox").classList.add("hidden");
  });
  document.getElementById("lightbox-prev").addEventListener("click", () => {
    const lugar = lugares.find((l) => l.id === state.selectedLugarId);
    if (!lugar) return;
    state.galleryIndex = (state.galleryIndex - 1 + lugar.galeria.length) % lugar.galeria.length;
    atualizarLightbox();
  });
  document.getElementById("lightbox-next").addEventListener("click", () => {
    const lugar = lugares.find((l) => l.id === state.selectedLugarId);
    if (!lugar) return;
    state.galleryIndex = (state.galleryIndex + 1) % lugar.galeria.length;
    atualizarLightbox();
  });
}

/* ==========================================================================
   7. FAVORITOS (localStorage)
   ========================================================================== */

const FAVORITOS_KEY = "tourGuarapuava.favoritos";

function carregarFavoritos() {
  try {
    const salvos = localStorage.getItem(FAVORITOS_KEY);
    state.favoritos = salvos ? JSON.parse(salvos) : [];
  } catch (e) {
    state.favoritos = [];
  }
}

function salvarFavoritos() {
  try {
    localStorage.setItem(FAVORITOS_KEY, JSON.stringify(state.favoritos));
  } catch (e) {
    // localStorage indisponível; a sessão continua funcionando sem persistência
    console.warn("Não foi possível salvar os favoritos:", e);
  }
}

function alternarFavorito(lugarId) {
  const lugar = lugares.find((l) => l.id === lugarId);
  const index = state.favoritos.indexOf(lugarId);
  if (index >= 0) {
    state.favoritos.splice(index, 1);
    mostrarToast(`${lugar ? lugar.nome : "Local"} removido dos favoritos`);
  } else {
    state.favoritos.push(lugarId);
    mostrarToast(`${lugar ? lugar.nome : "Local"} adicionado aos favoritos`);
  }
  salvarFavoritos();
}

function renderFavoritos() {
  const lista = document.getElementById("favoritos-list");
  const vazio = document.getElementById("favoritos-empty");
  const favoritosLugares = lugares.filter((l) => state.favoritos.includes(l.id));

  if (favoritosLugares.length === 0) {
    lista.innerHTML = "";
    vazio.classList.remove("hidden");
    return;
  }
  vazio.classList.add("hidden");
  lista.innerHTML = favoritosLugares
    .map(
      (l) => `
    <div class="fav-card">
      <img src="${l.imagem}" alt="${l.nome}" data-lugar-id="${l.id}" loading="lazy">
      <div class="fav-card-info" data-lugar-id="${l.id}">
        <h3>${l.nome}</h3>
        <p>★ ${l.avaliacao} · ${l.categoriaLabel}</p>
      </div>
      <button class="fav-remove" data-remove-id="${l.id}" aria-label="Remover ${l.nome} dos favoritos">✕</button>
    </div>`
    )
    .join("");

  lista.querySelectorAll("[data-lugar-id]").forEach((el) => {
    el.addEventListener("click", () => abrirDetalhes(Number(el.dataset.lugarId)));
  });
  lista.querySelectorAll("[data-remove-id]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      alternarFavorito(Number(el.dataset.removeId));
      renderFavoritos();
    });
  });
}

function atualizarStatsPerfil() {
  document.getElementById("stat-favoritos").textContent = state.favoritos.length;
}

/* ==========================================================================
   8. LINHAS DE ÔNIBUS
   ========================================================================== */

function renderLinhas() {
  const container = document.getElementById("linhas-list");
  container.innerHTML = linhasOnibus
    .map(
      (linha) => `
    <button class="linha-card" data-linha-id="${linha.id}">
      <span class="badge ${linha.cor}">${linha.id}</span>
      <div class="linha-card-info">
        <h3>${linha.nome}</h3>
        <p>${linha.via}</p>
        <p class="linha-card-next">🚌 Próximo ônibus ${linha.proximoOnibus}</p>
      </div>
      <span class="chevron">
        <svg viewBox="0 0 24 24" width="18" height="18"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
    </button>`
    )
    .join("");

  container.querySelectorAll("[data-linha-id]").forEach((el) => {
    el.addEventListener("click", () => abrirLinhaDetalhe(el.dataset.linhaId));
  });
}

function configurarLinhas() {
  document.getElementById("refresh-linhas").addEventListener("click", () => {
    mostrarToast("Horários atualizados");
  });
  document.getElementById("btn-ver-no-mapa").addEventListener("click", () => {
    irParaTela("mapa");
  });
}

/* ---------- Linha detalhada (abas: Trajeto / Horários / Itinerário) ---------- */

function abrirLinhaDetalhe(linhaId) {
  const linha = linhasOnibus.find((l) => l.id === linhaId);
  if (!linha) return;
  state.selectedLinhaId = linhaId;

  document.getElementById("linha-titulo").textContent = `Linha ${linha.id}`;
  const badge = document.getElementById("linha-badge");
  badge.textContent = linha.id;
  badge.className = `badge ${linha.cor}`;
  document.getElementById("linha-info-nome").textContent = linha.nome;
  document.getElementById("linha-info-via").textContent = linha.via;

  renderHorarios(linha);
  renderItinerario(linha);
  ativarAba("trajeto");
  animarOnibus();

  irParaTela("linha-detalhe");
}

function renderHorarios(linha) {
  const container = document.getElementById("horarios-list");
  container.innerHTML = linha.horarios
    .map(
      (h) => `
    <div class="horario-item">
      <span class="dir">${h.dir}</span>
      <span class="time">${h.time}</span>
    </div>`
    )
    .join("");
}

function renderItinerario(linha) {
  const container = document.getElementById("itinerario-list");
  container.innerHTML = linha.itinerario
    .map(
      (item, i) => `
    <div class="itinerario-item ${item.final ? "final" : ""}">
      <div class="dot-col">
        <span class="dot"></span>
        <span class="connector"></span>
      </div>
      <div>
        <p>${item.nome}</p>
        <span>${item.info}</span>
      </div>
    </div>`
    )
    .join("");
}

function ativarAba(nomeAba) {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    const ativo = btn.dataset.tab === nomeAba;
    btn.classList.toggle("active", ativo);
    btn.setAttribute("aria-selected", String(ativo));
  });
  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.toggle("hidden", panel.id !== `tab-${nomeAba}`);
  });
}

function configurarAbasLinha() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => ativarAba(btn.dataset.tab));
  });
  document.getElementById("refresh-trajeto").addEventListener("click", () => {
    mostrarToast("Posição do ônibus atualizada");
    animarOnibus();
  });
}

// Simula o movimento do ônibus em tempo real ao longo do trajeto
const posicoesOnibus = [
  { left: 80, top: 41 },
  { left: 64, top: 24 },
  { left: 40, top: 30 },
  { left: 20, top: 62 },
];
let onibusIndex = 0;

function animarOnibus() {
  onibusIndex = (onibusIndex + 1) % posicoesOnibus.length;
  const pos = posicoesOnibus[onibusIndex];
  const marker = document.getElementById("bus-marker");
  if (marker) {
    marker.style.left = `${pos.left}%`;
    marker.style.top = `${pos.top}%`;
  }
}

/* ==========================================================================
   9. UTILITÁRIOS
   ========================================================================== */

let toastTimeout = null;
function mostrarToast(mensagem) {
  const toast = document.getElementById("toast");
  toast.textContent = mensagem;
  toast.classList.remove("hidden");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.add("hidden"), 2200);
}

/* ==========================================================================
   INICIALIZAÇÃO
   ========================================================================== */

function iniciarApp() {
  carregarFavoritos();

  renderCategorias();
  renderDestaques();
  renderProximos();
  renderMapa();
  renderLinhas();

  configurarNavegacaoInferior();
  configurarAcoesGerais();
  configurarBuscaHome();
  configurarBuscaMapa();
  configurarBotaoLocalizar();
  configurarBotoesDetalhes();
  configurarLightbox();
  configurarLinhas();
  configurarAbasLinha();

  irParaTela("home");
}

document.addEventListener("DOMContentLoaded", iniciarApp);