![logo-be-the-hero](https://raw.githubusercontent.com/dhapolinario/be-the-hero/master/frontend/src/assets/logo-bethehero.png)

# Semana OmniStack 11.0

Este foi o projeto feito na 11ª semana OmniStack da RocketSeat. 

Sistema para para conectar ONGs com pessoas dispostas a contribuir.

**Nota: Como teste, neste branch foi removido o backend em Node.js e adicionado o BaaS (Backend as a Service) com Google Firebase.**
Para ver o projeto original, acesse o branch [master](https://github.com/dhapolinario/be-the-hero).

Possui conexão com serviço Google Firebase, um sistema web e um app mobile.
### Tecnologias
- Firebase - BaaS
- React - Frontend web
- React Native/Expo - Mobile app
- Jest - Testes

# Instalação

Baixe ou faça um clone do projeto e acesse a pasta do projeto.

## Front-end

Entre na pasta `frontend` e execute os seguintes comandos:
-   `$ npm install`  para instalar as dependências.
-   `$ npm start`  para iniciar o servidor do sistema web em `localhost:3000`.

## Mobile

-   Entre na pasta  `mobile/`  e execute os seguintes comandos:
-   `$ npm install`  para instalar as dependências.
-   `$ npm start`  para iniciar o servidor com Expo.

## Firebase

Siga [estes passos](https://firebase.google.com/docs/web/setup?hl=pt-br) para adicionar o Firebase ao projeto.

Recomenda-se a instalação do [Firebase CLI](https://firebase.google.com/docs/cli).

Para ambos os projetos, o arquivo `src/configs/firebaseConfig.js` (baseado no arquivo firebaseConfig.js.example) deve ser configurado conforme projeto Firebase. 


