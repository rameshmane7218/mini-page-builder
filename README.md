<h1 align="center">Mini Page Builder</h1>
<p align="center">It is an Drag and drop page builder which has functionality to Import and Export page layout</p>

</br>

## 🚀 Features

- Drag and Drop Block/Element
- Import Page Layout with data validation
- Export Page Layout
- Well Structured code
- Easy to create new Block/Element

## Folder Structure

- `src`
  - `components`: UI Components that used to build editor which is not `Editor Blocks/Elements` used to build page
  - `core`: All editor related components, Blocks/Elements and editor context
  - `pages`: website pages
  - all necessary folders...

## How everything is working

Code is written in such a way that we can reuse Editor in another page also for that I created different folder named as `core`, which has all Editor related components and blocks

- Used localStorage to persist editor data even after we reload page
- Editor is divided in different components namely `Header`, `Preview`, `Sidebar`. Everything is written in such a way that we can later customize the editor view however we want, like if we want sidebar at left side then just change the main `Editor` component layout and css the functionality remains same
- `Blocks` are `Elements` used to drag and drop to build page
- Used `React DnD` to archive drag and drop functionality
- Blocks/Elements data is not hardcoded anywhere



## 💻 Run Locally

Clone the project

```bash
  git clone https://github.com/rameshmane7218/mini-page-builder
```

Go to the project directory

```bash
  cd mini-page-builder
```

Install dependencies

```bash
  npm install
```

Start the localhost server

```bash
  npm start
```

## Deployed link

[https://mini-page-builder-swart.vercel.app/](https://mini-page-builder-swart.vercel.app/)
