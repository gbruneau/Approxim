# baseVite
Base Template for Javascript with internalisation


using the [**Vite**](https://vitejs.dev/) framework.
#### To star a new project
```Shell
cd myDevemopmentFolder
npx degit gbruneau/baseVite myNewApplicationName
cd myNewApplicationName
npm install
``` 
Result
``` 
┣━ myDevelopmentFolder/
┃   ┗━ myNewApplicationName/
``` 

#### Before build
In the file `vite.config.js` , rename the output directory (`outDir`)  
from `BaseVite` to your application name (`myNewApplicationName`). 
```JavaScript
// vite.config.js
export default {
    root: "src",
    base: "./",
    clearScreen: false,
    server: {https: false},
    build:
        {
         𝐨𝐮𝐭𝐃𝐢𝐫: "../dist/𝐦𝐲𝐍𝐞𝐰𝐀𝐩𝐩𝐥𝐢𝐜𝐚𝐭𝐢𝐨𝐧𝐍a𝐦𝐞",
         manifest: true 
        }    
  }
```
#### Structure
This is the structure given after build.
```
𝐦𝐲𝐍𝐞𝐰𝐀𝐩𝐩𝐥𝐢𝐜𝐚𝐭𝐢𝐨𝐧𝐍𝐚𝐦𝐞/
   ┣━ 𝐝𝐢𝐬𝐭/
   ┃   ┗━ 𝐦𝐲𝐍𝐞𝐰𝐀𝐩𝐩𝐥𝐢𝐜𝐚𝐭𝐢𝐨𝐧𝐍𝐚𝐦𝐞/
   ┃         ┣━ 𝐚𝐬𝐬𝐞𝐭𝐬/           Distribution Images, css, js 
   ┃         ┣━ index.html      Main distribution htlm page
   ┃         ┣━ i18n/           Translation files
   ┃         ┗━ manifest.json   Distribution files index
   ┣━ 𝐧𝐨𝐝𝐞_𝐦𝐨𝐝𝐮𝐥𝐞𝐬/
   ┣━ i18n/
   ┃   ┣━ languages.json        List of languages for traduction
   ┃   ┣━ en.json               English
   ┃   ┣━ fr.json               French
   ┃   ┗━ es.json               Spanish             
   ┣━ 𝐬𝐫𝐜/
   ┃   ┣━ 𝐢𝐦𝐚𝐠𝐞𝐬/                 Source images
   ┃   ┣━ 𝐩𝐮𝐛𝐥𝐢𝐜/                 Source fichiers acceder dynamiquement
   ┃   ┣━ index.css            
   ┃   ┣━ main.js
   ┃   ┣━ style.css
   ┃   ┗━ version.json          No du dernier build (date.heure)
   ┣━ .gitignore
   ┣━ package.json
   ┣━ README.md
   ┗━ vite.config.js
   ```
