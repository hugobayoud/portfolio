/**
 * The Quiz — every Question, in play order. See CONTEXT.md in this folder.
 *
 * - `choices` are shown in the order written (Lave ▲, Lagon ◆, Soleil ●, Forêt ■).
 * - `correct` is the index (0–3) of the Correct choice in `choices`.
 * - `explanation` is a free sequence of blocks, rendered top to bottom on the
 *   Reveal step. `text` accepts paragraphs (blank line), **bold** and *italic*.
 *   `carousel` lists photo file names from `public/reunion/<id>/`.
 */

type ExplanationBlock = { text: string } | { carousel: string[] };

type Question = {
  id: string;
  prompt: string;
  choices: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  explanation: ExplanationBlock[];
};

export const quiz: Question[] = [
  {
    id: 'ocean',
    prompt: 'Dans quel océan se situe l’île de La Réunion ?',
    choices: [
      'L’océan Atlantique',
      'L’océan Indien',
      'L’océan Pacifique',
      'L’océan Austral',
    ],
    correct: 1,
    explanation: [],
  },
  {
    id: 'capitale',
    prompt: 'Quelle est la capitale de l’île ?',
    choices: ['Saint-Pierre', 'Saint-Paul', 'Saint-Denis', 'Le Port'],
    correct: 2,
    explanation: [{ text: 'Elle compte plus de 100 000 habitants en 2022.' }],
  },
  {
    id: 'habitants',
    prompt: 'Combien y a-t-il d’habitants sur l’île ?',
    choices: ['500 000', '900 000', '1 200 000', '2 000 000'],
    correct: 1,
    explanation: [],
  },
  {
    id: 'volcan-actif',
    prompt: 'Quel volcan encore actif se situe sur cette île ?',
    choices: [
      'Le Piton de la Fournaise',
      'Le Piton des Neiges',
      'Le Grand Bénare',
      'Le Piton Maïdo',
    ],
    correct: 0,
    explanation: [{ text: '2632 m d’altitude.' }],
  },
  {
    id: 'point-culminant',
    prompt: 'Quel est le point culminant de l’île de La Réunion ?',
    choices: [
      'Le Piton de la Fournaise',
      'Le Grand Bénare',
      'Le Piton des Neiges',
      'Le Piton Maïdo',
    ],
    correct: 2,
    explanation: [
      {
        text: '3071 m d’altitude. Actif pendant près de deux millions d’années. Ses dernières éruptions datent d’environ 20 000 ans et il est considéré comme éteint.',
      },
    ],
  },
  {
    id: 'archipel',
    prompt:
      'Comment s’appelle l’archipel qui regroupe l’île de La Réunion, l’île Maurice et l’île Rodrigues ?',
    choices: [
      'L’archipel des Comores',
      'L’archipel des Seychelles',
      'L’archipel des Chagos',
      'L’archipel des Mascareignes',
    ],
    correct: 3,
    explanation: [
      {
        text: 'Le Piton des Neiges est le point culminant de tout l’archipel.',
      },
    ],
  },
  {
    id: 'plat',
    prompt: 'Parmi ces plats, lequel est emblématique de l’île de La Réunion ?',
    choices: ['Le bretzel', 'Le tacos', 'Le rougail saucisse', 'La paella'],
    correct: 2,
    explanation: [
      {
        text: 'Il y a aussi comme autres plats : le civet de zourite, fait à base de poulpe mijoté dans une sauce au vin rouge et aux épices, et aussi le massalé ca',
      },
    ],
  },
  {
    id: 'volcans',
    prompt: 'Combien y a-t-il de volcans à La Réunion ?',
    choices: ['1', '2', '3', '4'],
    correct: 2,
    explanation: [
      {
        text: 'Le Piton des Neiges, le Piton de la Fournaise et le volcan des Alizés.',
      },
    ],
  },
  {
    id: 'creole-reunionnais',
    prompt:
      'Petit point de vocabulaire : quelle est la différence entre un « Créole » et un « Réunionnais » ?',
    choices: [
      'Aucune, ce sont des synonymes',
      'Un Créole est né dans une ancienne colonie, un Réunionnais est originaire de l’île',
      'Un Créole parle créole, un Réunionnais est né sur l’île',
      'Un Créole est né avant 1946, un Réunionnais après',
    ],
    correct: 1,
    explanation: [
      {
        text: 'Le terme créole désigne une personne née dans les anciennes colonies européennes d’Amérique, des Mascareignes et du Cap-Vert, par opposition à celle née en Europe (ou en Afrique, en Inde, etc.) et arrivée ensuite. D’ailleurs...',
      },
    ],
  },
  {
    id: 'diagonale-des-fous',
    prompt:
      'Quel est le nom de la célèbre course de trail de 180 km qui traverse toute l’île chaque année ?',
    choices: [
      'La Traversée des cirques',
      'La Diagonale des fous',
      'La Course des trois pitons',
      'Le Défi du volcan',
    ],
    correct: 1,
    explanation: [
      {
        text: 'Course de 180 km qui part de Saint-Pierre et qui arrive à La Redoute. D’ailleurs, cette année, la course commence pendant que nous sommes à La Réunion, et nous pouvons voir l’arrivée des premiers et premières si vous le souhaitez. Ils partent le jeudi 15 à 22h et les premiers la font en environ 23h, nous pouvons donc essayer d’aller les voir au Stade de La Redoute avec une arrivée théorique vers 20h.',
      },
    ],
  },
];
