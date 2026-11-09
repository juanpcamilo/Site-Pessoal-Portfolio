# Portfólio Pessoal # 

Projeto de portfólio web desenvolvido para a disciplina de Desenvolvimento Front-End para Web do 2º Semestre de Análise e Desenvolvimento de Sistemas no Centro Universitário Braz Cubas.

##  Estrutura do Site
- `index.html`: Página inicial com apresentação e navegação principal.
- `curriculo.html`: Trajetória acadêmica e profissional.
- `formulario.html`: Formulário de contato com validação e feedback visual.
- `multimidia.html`: Galeria multimídia com reprodução de áudio e vídeo.
- `graficos.html`: Elementos visuais interativos e gráficos (SVG/Canvas).

---

## Uso do Feature JavaScript: Tema Claro/Escuro 

### O que a feature faz
Permite ao utilizador alternar entre o tema claro (Light Mode) e o tema escuro (Dark Mode) através de um botão presente no cabeçalho. A escolha do tema é aplicada globalmente em **todas as páginas do site** e é mantida após recarregar a página (F5) ou reabrir o navegador.

### Dados Persistidos no `localStorage`
- **Chave (`Key`):** `theme`
- **Valores (`Value`):** `"dark"` ou `"light"`

### Como Testar no DevTools
Abre qualquer página do site no navegador.
Clica no botão de alternar tema no cabeçalho.
Abre as Ferramentas do Desenvolvedor pressionando `F12` (ou clica com o botão direito -> **Inspecionar**).
Navega até a aba **Application** (ou **Aplicação**).
No menu lateral esquerdo, expande **Local Storage** e seleciona o endereço do site.
Verifica o par Chave/Valor: `theme` com o valor `dark` ou `light`.
Recarrega a página (`F5`) ou navega entre as outras 5 páginas do site para confirmar que o tema selecionado e o valor no `localStorage` permanecem salvos.

---

## Tecnologias Utilizadas
- HTML 
- CSS
- JavaScript 


## Autor
**Juan Camilo** — Estudante do 2º Semestre - Análise e Desenvolvimento de Sistemas (ADS).

Link do Projeto: https://juanpcamilo.github.io/Site-Pessoal-Portfolio/

