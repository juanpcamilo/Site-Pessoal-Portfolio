
'use strict';

/* ---------- Chaves usadas no localStorage ---------- */
const CHAVES = {
    tema: 'tema',
    nome: 'nomeVisitante',
    interesses: 'interesses',
    rascunho: 'rascunhoContato'
};

/* ---------- Funções de apoio ----------
   O localStorage pode falhar (aba anônima, bloqueio do navegador).
   O try/catch evita que o site quebre nesses casos. */
function lerStorage(chave) {
    try {
        return localStorage.getItem(chave); // devolve null se a chave não existe
    } catch (erro) {
        return null;
    }
}

function gravarStorage(chave, valor) {
    try {
        localStorage.setItem(chave, valor); // só guarda TEXTO
    } catch (erro) {
        /* sem armazenamento: o site continua funcionando, só não lembra */
    }
}

function removerStorage(chave) {
    try {
        localStorage.removeItem(chave);
    } catch (erro) { /* idem */ }
}

/* Mostra ou limpa uma mensagem de erro e marca o campo como inválido (acessibilidade) */
function mostrarErro(campo, areaErro, mensagem) {
    areaErro.textContent = mensagem;
    if (mensagem) {
        campo.setAttribute('aria-invalid', 'true');
    } else {
        campo.removeAttribute('aria-invalid');
    }
}


/* ==========================================================
   TEMA CLARO / ESCURO
   ========================================================== */
function iniciarTema() {
    const cabecalho = document.querySelector('header.cabecalho');
    if (!cabecalho) return;

    // Lê a escolha anterior; qualquer valor estranho vira "claro"
    let tema = lerStorage(CHAVES.tema) === 'escuro' ? 'escuro' : 'claro';

    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'btn-tema';
    cabecalho.appendChild(botao);

    function aplicar() {
        // O CSS reage à classe tema-escuro no <body> (body.tema-escuro)
        document.body.classList.toggle('tema-escuro', tema === 'escuro');
        botao.textContent = tema === 'escuro' ? 'Ativar tema claro' : 'Ativar tema escuro';
    }

    botao.addEventListener('click', () => {
        tema = tema === 'escuro' ? 'claro' : 'escuro'; // 1. muda o estado
        gravarStorage(CHAVES.tema, tema);              // 2. persiste
        aplicar();                                     // 3. atualiza a tela
    });

    aplicar();
}


/*BOAS-VINDAS */
function iniciarBoasVindas() {
    const titulo = document.getElementById('titulo-boas-vindas');
    const formulario = document.getElementById('form-nome');
    const campo = document.getElementById('campo-nome');
    const areaErro = document.getElementById('erro-nome');
    const botaoTrocar = document.getElementById('btn-trocar-nome');
    if (!titulo || !formulario || !campo || !areaErro || !botaoTrocar) return;

    // Decide o que mostrar com base no que existe no storage (null = primeira visita)
    function renderizar() {
        const nome = lerStorage(CHAVES.nome);
        if (nome) {
            titulo.textContent = `Olá, ${nome}!`; // textContent: nunca innerHTML com texto do usuário
            formulario.hidden = true;
            botaoTrocar.hidden = false;
        } else {
            titulo.textContent = 'Olá, bem-vindo(a)!';
            formulario.hidden = false;
            botaoTrocar.hidden = true;
        }
    }

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const nome = campo.value.trim(); // trim: espaços não contam

        if (nome.length < 2) {
            mostrarErro(campo, areaErro, 'Digite seu nome (mínimo 2 letras).');
            campo.focus();
            return;
        }

        mostrarErro(campo, areaErro, '');
        gravarStorage(CHAVES.nome, nome);
        campo.value = '';
        renderizar();
    });

    botaoTrocar.addEventListener('click', () => {
        removerStorage(CHAVES.nome);
        renderizar();
        campo.focus();
    });

    renderizar();
}


/* ==========================================================
    LISTA DE INTERESSES
   ========================================================== */
function iniciarInteresses() {
    const formulario = document.getElementById('form-interesse');
    const campo = document.getElementById('campo-interesse');
    const areaErro = document.getElementById('erro-interesse');
    const lista = document.getElementById('lista-interesses');
    const mensagemVazia = document.getElementById('lista-vazia');
    if (!formulario || !campo || !areaErro || !lista || !mensagemVazia) return;

    // Carregar: do storage (texto) para um array. Se não houver nada, começa vazio.
    function carregar() {
        try {
            const dados = JSON.parse(lerStorage(CHAVES.interesses) || '[]');
            return Array.isArray(dados) ? dados.filter((item) => typeof item === 'string') : [];
        } catch (erro) {
            return []; // JSON corrompido não pode quebrar a página
        }
    }

    // O array é o "estado": a tela sempre é desenhada a partir dele
    let interesses = carregar();

    function salvar() {
        gravarStorage(CHAVES.interesses, JSON.stringify(interesses));
    }

    function renderizar() {
        lista.replaceChildren(); // limpa a lista antes de redesenhar

        interesses.forEach((texto, indice) => {
            const item = document.createElement('li');

            const rotulo = document.createElement('span');
            rotulo.textContent = texto; // seguro contra HTML digitado pelo usuário

            const remover = document.createElement('button');
            remover.type = 'button';
            remover.textContent = 'Remover';
            remover.dataset.indice = indice;
            remover.setAttribute('aria-label', `Remover ${texto}`);

            item.append(rotulo, remover);
            lista.appendChild(item);
        });

        mensagemVazia.hidden = interesses.length > 0;
    }

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const texto = campo.value.trim();

        if (texto === '') {
            mostrarErro(campo, areaErro, 'Digite um interesse antes de adicionar.');
            campo.focus();
            return;
        }

        const jaExiste = interesses.some((item) => item.toLowerCase() === texto.toLowerCase());
        if (jaExiste) {
            mostrarErro(campo, areaErro, 'Esse interesse já está na lista.');
            campo.focus();
            return;
        }

        mostrarErro(campo, areaErro, '');
        interesses.push(texto); // 1. muda o estado
        salvar();               // 2. persiste
        renderizar();           // 3. atualiza a tela
        campo.value = '';
        campo.focus();
    });

    // Delegação de eventos: um único listener na <ul> atende todos os botões "Remover"
    lista.addEventListener('click', (evento) => {
        const botao = evento.target.closest('button[data-indice]');
        if (!botao) return;

        interesses.splice(Number(botao.dataset.indice), 1);
        salvar();
        renderizar();
    });

    renderizar();
}


/* ==========================================================
   FORMULÁRIO: validação + rascunho
   ========================================================== */
function iniciarFormulario() {
    const formulario = document.getElementById('form-contato');
    const feedback = document.getElementById('feedback-form');
    const avisoRascunho = document.getElementById('aviso-rascunho');
    if (!formulario || !feedback || !avisoRascunho) return;

    const nomesDosCampos = ['nome', 'email', 'celular', 'data', 'assunto', 'mensagem'];

    // Cada regra devolve o texto do erro, ou '' quando o valor é válido
    const regras = {
        nome: (v) => (/^\S+\s+\S+/.test(v.trim()) ? '' : 'Informe nome e sobrenome.'),
        email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Informe um e-mail válido, como nome@email.com.'),
        celular: (v) => {
            const digitos = v.replace(/\D/g, ''); // só números
            return digitos.length === 10 || digitos.length === 11 ? '' : 'Informe o celular com DDD (10 ou 11 números).';
        },
        data: (v) => (v ? '' : 'Escolha uma data.'),
        assunto: (v) => (v ? '' : 'Selecione um assunto.'),
        mensagem: (v) => (v.trim().length >= 10 ? '' : 'Escreva pelo menos 10 caracteres.')
    };

    const campoDe = (nome) => formulario.elements[nome];
    const erroDe = (nome) => document.getElementById(`erro-form-${nome}`);

    function validarCampo(nome) {
        const mensagem = regras[nome](campoDe(nome).value);
        mostrarErro(campoDe(nome), erroDe(nome), mensagem);
        return mensagem === '';
    }

    /* ----- Rascunho ----- */
    function salvarRascunho() {
        const rascunho = {};
        nomesDosCampos.forEach((nome) => { rascunho[nome] = campoDe(nome).value; });
        gravarStorage(CHAVES.rascunho, JSON.stringify(rascunho));
    }

    function restaurarRascunho() {
        let rascunho = null;
        try {
            rascunho = JSON.parse(lerStorage(CHAVES.rascunho));
        } catch (erro) {
            rascunho = null;
        }
        if (!rascunho || typeof rascunho !== 'object') return; // sem rascunho: campos ficam vazios

        let recuperouAlgo = false;
        nomesDosCampos.forEach((nome) => {
            if (typeof rascunho[nome] === 'string' && rascunho[nome] !== '') {
                campoDe(nome).value = rascunho[nome];
                recuperouAlgo = true;
            }
        });

        if (recuperouAlgo) {
            avisoRascunho.textContent = 'Recuperamos o rascunho que você tinha começado a preencher.';
            avisoRascunho.hidden = false;
        }
    }

    // "input" dispara a cada tecla; "change" cobre o select e o campo de data
    formulario.addEventListener('input', (evento) => {
        salvarRascunho();
        // Se o campo já estava com erro, revalida enquanto a pessoa corrige
        if (evento.target.getAttribute('aria-invalid') === 'true') {
            validarCampo(evento.target.name);
        }
    });
    formulario.addEventListener('change', salvarRascunho);

    /* ----- Envio ----- */
    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault(); // não recarrega a página

        const invalidos = nomesDosCampos.filter((nome) => !validarCampo(nome));

        feedback.hidden = false;
        if (invalidos.length > 0) {
            feedback.className = 'feedback falha';
            feedback.textContent = `Corrija ${invalidos.length} campo(s) destacado(s) acima e envie novamente.`;
            campoDe(invalidos[0]).focus(); // leva o teclado ao primeiro erro
            return;
        }

        const primeiroNome = campoDe('nome').value.trim().split(/\s+/)[0];
        feedback.className = 'feedback sucesso';
        feedback.textContent = `Mensagem enviada com sucesso! Obrigado, ${primeiroNome}.`;

        formulario.reset();
        removerStorage(CHAVES.rascunho); // envio válido: o rascunho não serve mais
        avisoRascunho.hidden = true;
    });

    restaurarRascunho();
}


/* ---------- Ponto de partida ----------
   O script usa "defer": roda depois que o HTML foi lido. */
iniciarTema();
iniciarBoasVindas();
iniciarInteresses();
iniciarFormulario();