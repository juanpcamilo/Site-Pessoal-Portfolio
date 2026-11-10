# Site Pessoal - Juan Camilo

## Sobre o Projeto

Este projeto foi desenvolvido na disciplina de Desenvolvimento Front-End - 2º Semestre, com o objetivo de criar um site pessoal/portfólio utilizando HTML, CSS e JavaScript.

O site apresenta informações pessoais, currículo, formulário de contato, conteúdos multimídia e gráficos.

## Tecnologias Utilizadas

- HTML
- CSS
- JavaScript


## Estrutura do Projeto

- `index.html` - Página inicial.
- `curriculo.html` - Apresentação do currículo.
- `formulario.html` - Formulário de contato.
- `multimidia.html` - Conteúdos de áudio e vídeo.
- `graficos.html` - Gráficos e elementos SVG.
- `css/estilos.css` - Arquivo responsável pela aparência visual do site.
- `js/scripts.js` - Arquivo responsável pelas funcionalidades JavaScript.
- `img/` - Pasta com imagens utilizadas no projeto.
- `multimidia/` - Pasta com arquivos de áudio e vídeo.

## Funcionalidades JavaScript

O projeto possui as seguintes funcionalidades:

1. **Tema claro e escuro:** permite alternar entre os temas e salva a preferência do visitante.
2. **Boas-vindas:** solicita o nome do visitante e armazena a informação para apresentar uma saudação nas próximas visitas.
3. **Lista de interesses:** permite adicionar e remover interesses, mantendo os itens salvos.
4. **Validação de formulário:** verifica os campos preenchidos e apresenta mensagens de erro ou sucesso na própria página.
5. **Rascunho de formulário:** salva os dados digitados e permite recuperá-los posteriormente.

## Armazenamento de Dados - localStorage

O projeto utiliza o `localStorage` do navegador para armazenar informações e recuperá-las mesmo após atualizar ou fechar a página.

### Dados Persistidos

- **Tema:** chave `tema`, com os valores `"escuro"` ou `"claro"`.
- **Nome do visitante:** armazenado para exibir as mensagens de boas-vindas.
- **Lista de interesses:** mantém os interesses adicionados pelo visitante.
- **Rascunho do formulário:** preserva os dados preenchidos para recuperação posterior.

## Como Testar as Funcionalidades

1. Acesse a página inicial.
2. Informe seu nome e verifique a mensagem de boas-vindas.
3. Alterne entre o tema claro e escuro.
4. Adicione interesses à lista.
5. Atualize a página e verifique se as informações continuam salvas.
6. Acesse o formulário e teste a validação dos campos.
7. Preencha alguns campos, feche a página e abra novamente para verificar a recuperação do rascunho.
8. Navegue pelas cinco páginas e confira o funcionamento do menu e a manutenção do tema.

### Verificação do localStorage

Para verificar os dados armazenados:

1. Abra o site no navegador.
2. Pressione `F12` para abrir as ferramentas do desenvolvedor.
3. Acesse a aba `Application`.
4. Selecione `Local Storage`.
5. Escolha o endereço do site.
6. Confira as informações armazenadas.

## Versionamento

O projeto utiliza Git e GitHub para controle de versão, com commits descritivos para registrar as alterações realizadas durante o desenvolvimento.

## Autor

**Juan Camilo**

Estudante de Análise e Desenvolvimento de Sistemas.



