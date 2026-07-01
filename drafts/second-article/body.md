---
title: 'This is my second article with the same text'
description: 'Une courte réflexion sur tout ce qui touche au cron job et au budget avec Vercel AI gateway'
date: 2026-07-02
published: true
keywords: [perso, dev]
---

J’avais construit un outil interne pour Silicon Mania. Et mes collègues ne pouvaient même pas l’utiliser.

Contexte, on doit repérer les tweets les plus viraux de l’actualité tech, puis générer un post prêt à publier, avec le ton et la direction artistique de Silicon Mania.

![Feed d'Auto-News outil interne à Silicon Mania](./images/auto-news-feed.jpg)

Problème, j’avais set-up un cronjob, une tâche automatique qui se lançait toutes les deux heures pour cherchait du contenu. Le workflow utilise Vercel AI Gateway, un service qui permet d’utiliser ChatGPT, Claude ou Gemini sans gérer les clés d’API.

Pour éviter les mauvaises surprises, j’avais limité ce cronjob à $5 par jour. Sauf que les tests manuels de Gabriel (lien X) utilisaient la même config = même budget.

Résultat, quand le quota était déjà consommé, Gabriel lançait une génération et recevait juste des erreurs. L’outil marchait, mais plus pour les humains.

Mais la solution a été bête (mais utile) : séparer les crédits. Une clé limitée pour les générations automatiques. Une autre pour les générations manuelles.

![Screenshot du dashboard Vercel (secret env.)](./images/vercel-secret-env.png)
