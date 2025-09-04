# Comment j'upload un article sur mon blog ?

Je stocke les articles sur Firebase firestore (projet "portfolio").

J'ai en local un dossier `articles` qui est .gitignore
Dans ce dossier `articles` il n'y a que des mes articles en markdown que je peux uploader via le script npm `npm run upload-blog {file_path}` (exemple: `npm run upload-blog-post /Users/hugobayoud/prog/porfolio/articles/chapitre-1-je-me-relance.md`).

Ce script `updload-blog-post` est dans le dossier `scripts` qui est lui aussi .gitignore.

Pour upload un nouvel article :

- Écrire l'article (🤓)
- Le mettre dans le dossier `articles` avec comme nom de fichier le slug plus ".md"
- Ajouter les metadata qui vont bien en haut de ce fichier
- Ajouter le BlogPostPreview data dans la bdd firebase firestore "portfolio-main" de la structure dans `src/libs/types/blog.ts:BlogPostPreview`
- Lancer la commande `npm run update-blog-post /Users/hugobayoud/prog/porfolio/articles/nom-du-slug.md`
  Note : Pour voir le post directement sur hugobayoud.fr, il faut s'assurer que le champ `published` est à `true` en BDD.

# Comment tester un article en local

- Mettre le contenu de l'article avec ses metadata et le contenu dans le dossier `articles/development`.
- Modifier le fichier `articles/development/blog-post-preview.json` et mettre au moins le bon `slug` et bon `title` de l'article a tester
- Lancer l'app avec `npm run dev` : l'article doit apparaitre dans la liste des articles dispo en mode "dev"
