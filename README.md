# Gummiand

Gummiand is an exam project for the course "Node.js Full Stack Development".

It is a simple Kanban app with a real time chat as well.

<!---->
<!---->  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⡶⠿⠿⠷⣶⣄⠀⠀⠀⠀⠀
<!---->  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⡿⠁⠀⠀⢀⣀⡀⠙⣷⡀⠀⠀⠀
<!---->  ⠀⠀⠀⡀⠀⠀⠀⠀⠀⢠⣿⠁⠀⠀⠀⠘⠿⠃⠀⢸⣿⣿⣿⣿
<!---->  ⠀⣠⡿⠛⢷⣦⡀⠀⠀⠈⣿⡄⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⠟
<!---->  ⢰⡿⠁⠀⠀⠙⢿⣦⣤⣤⣼⣿⣄⠀⠀⠀⠀⠀⢴⡟⠛⠋⠁⠀
<!---->  ⣿⠇⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠈⣿⡀⠀⠀⠀
<!---->  ⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⡇⠀⠀⠀
<!---->  ⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⡇⠀⠀⠀
<!---->  ⠸⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡿⠀⠀⠀⠀
<!---->  ⠀⠹⣷⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣰⡿⠁⠀⠀⠀⠀
<!---->  ⠀⠀⠀⠉⠙⠛⠿⠶⣶⣶⣶⣶⣶⠶⠿⠟⠛⠉⠀⠀⠀⠀⠀⠀
<!---->  
<!---->


## Stack
- Node.js
- MongoDB
- Socket.io


## Features
- Sign up
- Login / logout
- Account deletion. 
- Includes owned tasks
- Manage tasks (CRUD)

- sorting & filtering
- Query Tasks on:
    - completed
    - creation date
- limit (custom)
- pagination (skip)
- Upload files
    - 

dan@note44:~/eksamen/exam$ tree -I "node_modules|media-manager"
.
├── client
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   ├── images
│   │   ├── gummiand2.png
│   │   ├── gummiand3.png
│   │   ├── gummiand.png
│   │   ├── rubber_duck.png
│   │   ├── rubber_duck.webp
│   │   └── universe.jpg
│   ├── index.html
│   ├── output.css
│   ├── package.json
│   ├── package-lock.json
│   ├── page-layouts.application-ui.kanban-board.html
│   ├── server.js
│   ├── site.webmanifest
│   ├── src
│   │   ├── components
│   │   │   ├── KanbanBoard.svelte
│   │   │   ├── KanbanColumn.svelte
│   │   │   └── KanbanTask.svelte
│   │   ├── css
│   │   │   ├── chat.css
│   │   │   ├── kanban.css
│   │   │   └── styles.css
│   │   ├── js
│   │   │   ├── chat.js
│   │   │   ├── chat-main.js
│   │   │   ├── chat-script.js
│   │   │   ├── drag.js
│   │   │   ├── index.js
│   │   │   ├── login.js
│   │   │   ├── signup.js
│   │   │   ├── todo.js
│   │   │   └── utils
│   │   │       ├── messages.js
│   │   │       └── users.js
│   │   └── pages
│   │       ├── chat.html
│   │       ├── kanban.html
│   │       ├── login.html
│   │       ├── signup.html
│   │       └── snak.html
│   ├── styles.css
│   └── tailwind.config.js
├── LICENSE
├── package.json
├── package-lock.json
├── proj.js
├── README.md
├── server
│   ├── 3000;
│   ├── 3005;
│   ├── app.js
│   ├── database
│   │   └── database.js
│   ├── emails
│   │   └── emails.js
│   ├── eslint.config.js
│   ├── images
│   │   ├── a5a56d83236eb18cc50febc3ab247b94
│   │   └── f95662401caee25abf24af1f98fb0e14
│   ├── middleware
│   │   ├── authMiddleware.js
│   │   └── fileSystemMiddleware.js
│   ├── models
│   │   ├── taskModel.js
│   │   └── userModel.js
│   ├── mongo
│   ├── package.json
│   ├── package-lock.json
│   └── routers
│       ├── taskRouter.js
│       └── userRouter.js
