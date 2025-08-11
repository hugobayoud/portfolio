# Comment j'upload un article sur mon blog ?

Je stocke les articles sur Firebase firestore (projet "portfolio").

J'ai en local un dossier `articles` qui est .gitignore
Dans ce dossier `articles` il n'y a que des mes articles en markdown que je peux uploader via le script npm `npm run upload-blog {file_path}` (exemple: `npm run upload-blog-post "/Users/hugobayoud/prog/porfolio/articles/chapitre-1-je-me-relance.md"`).

Ce script `updload-blog-post` est dans le dossier `scripts` qui est lui aussi .gitignore.

Pour upload un nouvel article :

- Écrire l'article (🤓)
- Le mettre dans le dossier `articles` avec comme nom de fichier le slug plus ".md"
- Ajouter les metadata qui vont bien en haut de ce fichier
- Ajouter le BlogPostPreview data dans la bdd firebase firestore "portfolio-main" de la structure dans `src/libs/types/blog.ts:BlogPostPreview`
- Lancer la commande `npm run update-blog-post {absolute_path_to_md_file}`
