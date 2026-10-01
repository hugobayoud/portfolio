# Comment je publie un Short sur le blog ?

Les Shorts sont indexés dans Firestore (projet "portfolio", base `portfolio-main`) et leurs fichiers (cover, images, corps markdown) sont stockés dans Firebase Storage. Tout se fait via le script `publish-short`, à partir d'un dossier `drafts/` local (`.gitignore`).

Pour publier un nouveau Short :

- Créer un dossier dans `drafts/<mon-slug>/` (le nom du dossier devient le slug).
- Y écrire `body.md` avec le frontmatter (`title`, `description`, `date`, `published`, `keywords?`) suivi du corps en markdown.
- Ajouter `cover.(jpg|jpeg|png|webp)` dans ce dossier.
- Les éventuelles images inline vont dans `drafts/<mon-slug>/images/` et sont référencées depuis `body.md` en `![alt](./images/xxx.ext)`.
- Lancer `npm run publish-short drafts/<mon-slug>`.

Le script (`scripts/publish-short.js`, lui aussi `.gitignore`) :

1. lit et valide le frontmatter de `body.md`,
2. passe la cover dans `sharp` pour générer la version `.webp`, sa largeur/hauteur et le `blurDataURL`,
3. uploade le corps markdown + les images (cover et inline) sur Firebase Storage,
4. upsert le doc `shorts/{slug}` dans Firestore,
5. ping `POST /api/revalidate` pour rafraîchir le feed statique en quelques secondes (sans redéploiement git).

Setup requis en local (`.env.local`) :

- `GOOGLE_APPLICATION_CREDENTIALS` — chemin vers une clé de service Firebase (Console Firebase → Paramètres du projet → Comptes de service).
- `REVALIDATE_SECRET` — doit correspondre à la valeur définie sur l'app déployée.
- `REVALIDATE_URL` — optionnel, endpoint de revalidation à pinger (défaut : `https://hugobayoud.com/api/revalidate`).

Note : `published: false` dans le frontmatter garde le Short hors du feed public tout en le stockant.

# Comment j'ajoute des photos au quiz La Réunion ?

- Déposer les originaux (JPEG, PNG ou HEIC, toute taille), déjà nommés, dans `drafts/reunion/<question-id>/`.
- Lancer `npm run reunion:photos`.
- Référencer chaque photo dans un bloc `carousel` de `src/app/reunion/quiz.ts` par son nom en `.webp`.

Le script (`scripts/reunion-photos.js`, lui aussi `.gitignore`) redimensionne chaque original à 1600 px max sur le grand côté (jamais d'agrandissement), le convertit en WebP qualité 75 sans aucune métadonnée (EXIF/GPS compris) dans `public/reunion/<question-id>/`, puis réécrit le manifeste `src/app/reunion/photos.json` (largeur/hauteur de chaque photo). Les HEIC passent d'abord par `sips` (macOS uniquement). Relancer le script est sans effet de bord.

`npm run build` échoue, en nommant la Question et le fichier, si un `carousel` référence une photo absente du manifeste.
