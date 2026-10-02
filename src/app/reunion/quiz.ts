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

export type Question = {
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
    explanation: [{ carousel: ['ocean-1.webp', 'ocean-2.webp'] }],
  },
  {
    id: 'capitale',
    prompt: 'Quelle est la capitale de l’île ?',
    choices: ['Saint-Pierre', 'Saint-Paul', 'Saint-Denis', 'Le Port'],
    correct: 2,
    explanation: [
      { text: 'Elle compte plus de 150 000 habitants en 2023.' },
      { carousel: ['capitale-1.webp'] },
    ],
  },
  {
    id: 'habitants',
    prompt: 'Combien d’habitants compte environ l’île ?',
    choices: ['500 000', '900 000', '1 200 000', '2 000 000'],
    correct: 1,
    explanation: [],
  },
  {
    id: 'volcan-actif',
    prompt: 'Quel volcan encore actif se trouve sur l’île ?',
    choices: [
      'Le Piton de la Fournaise',
      'Le Piton des Neiges',
      'Le Grand Bénare',
      'Le Piton Maïdo',
    ],
    correct: 0,
    explanation: [
      {
        text: '2 632 m d’altitude. C’est l’un des volcans les plus actifs au monde. Sans vouloir vous faire peur : ces dix dernières années, il est entré en éruption en moyenne tous les neuf mois. Dernière éruption : de février à avril 2026.',
      },
      { carousel: ['volcan-actif-1.webp', 'volcan-actif-2.webp'] },
    ],
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
        text: '3 071 m d’altitude. Actif pendant près de deux millions d’années, il est aujourd’hui considéré comme éteint : ses dernières éruptions remontent à environ 12 000 ans. Il occupe les trois cinquièmes de la surface de l’île.',
      },
      { carousel: ['point-culminant-1.webp'] },
    ],
  },
  {
    id: 'archipel',
    prompt:
      'Comment s’appelle l’archipel qui regroupe La Réunion, l’île Maurice et l’île Rodrigues ?',
    choices: [
      'L’archipel des Comores',
      'L’archipel des Seychelles',
      'L’archipel des Chagos',
      'L’archipel des Mascareignes',
    ],
    correct: 3,
    explanation: [
      {
        text: 'Le Piton des Neiges en est le point culminant. La Réunion est française, l’île Maurice est un État indépendant et l’île Rodrigues fait partie de la République de Maurice.',
      },
      { carousel: ['archipel-1.webp', 'archipel-2.webp', 'archipel-3.webp'] },
    ],
  },
  {
    id: 'plat',
    prompt: 'Parmi ces plats, lequel est emblématique de l’île de La Réunion ?',
    choices: ['Le bretzel', 'La paella', 'Le rougail saucisse', 'Le mafé'],
    correct: 2,
    explanation: [
      {
        text: 'Autres spécialités : le civet de zourite, du poulpe mijoté dans une sauce au vin rouge et aux épices, et le cabri massalé, du cabri (le petit de la chèvre) cuisiné au massalé, un mélange d’épices (coriandre, cumin, origan, clou de girofle).',
      },
      { carousel: ['plat-1.webp', 'plat-2.webp'] },
    ],
  },
  {
    id: 'agriculture',
    prompt: 'Quel est le pilier de l’agriculture réunionnaise ?',
    choices: [
      'Le café',
      'La banane',
      'Le coprah (noix de coco)',
      'La canne à sucre',
    ],
    correct: 3,
    explanation: [
      {
        text: 'Elle couvre environ 60 % de la surface agricole de l’île (près de 20 000 hectares). Le café y était très cultivé jusque vers 1800, avant d’être remplacé par la canne à sucre.',
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
        text: 'Le Piton des Neiges, le Piton de la Fournaise et le volcan des Alizés. Ce dernier, aussi appelé « proto-Fournaise », est un volcan ancien sur lequel s’est construit le massif de la Fournaise. Son cratère n’est plus visible depuis des centaines de milliers d’années : il a été démantelé par de grands glissements de terrain et par l’érosion.',
      },
      { carousel: ['volcans-1.webp'] },
    ],
  },
  {
    id: 'langue',
    prompt: 'Quelle est la langue régionale de La Réunion ?',
    choices: ['Le malgache', 'Le français', 'L’anglais', 'Le créole'],
    correct: 3,
    explanation: [
      {
        text: 'Une personne née à La Réunion est **réunionnaise**, et on dit aussi couramment qu’elle est **créole**. En revanche, quelqu’un venu d’ailleurs vivre sur l’île est réunionnais, mais pas créole. D’ailleurs…',
      },
    ],
  },
  {
    id: 'metropolitain',
    prompt: 'Comment appelle-t-on un métropolitain en vacances à La Réunion ?',
    choices: ['Un grègue', 'Un boucané', 'Un zoreil', "L'Étranger"],
    correct: 2,
    explanation: [
      {
        text: 'On l’écrit aussi z’oreille ou zorey. Le mot désigne aussi un métropolitain installé sur l’île, pas seulement en vacances. Il a pu (et peut encore) être employé de façon très péjorative.',
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
        text: 'Elle part de Saint-Pierre et arrive au stade de La Redoute. Cette année, elle a lieu pendant notre séjour : le départ est donné le jeudi 15 à 22 h et les premiers mettent environ 23 h. Si vous le voulez, on peut aller voir les premières arrivées à La Redoute, prévues vers 20 h.',
      },
      { carousel: ['diagonale-des-fous-1.webp'] },
    ],
  },
  {
    id: 'fleur',
    prompt: 'Quelle fleur, très présente sur l’île, annonce l’été ?',
    choices: ['Le flamboyant', 'La lavande', 'Le coquelicot', 'La tulipe'],
    correct: 0,
    explanation: [
      {
        text: 'Ce n’est pas une espèce endémique : cet arbre vient de Madagascar. On croise aussi beaucoup de bougainvilliers sur l’île.',
      },
      { carousel: ['fleur-1.webp', 'fleur-2.webp'] },
    ],
  },
  {
    id: 'ancien-nom',
    prompt: 'Avant 1848, quel était le nom de l’île de La Réunion ?',
    choices: [
      'L’île Bourbon',
      'L’île de France',
      'L’île Dauphine',
      'L’île Royale',
    ],
    correct: 0,
    explanation: [
      {
        text: 'Pendant la Révolution, la Convention renomme l’île Bourbon « île de la Réunion », en hommage à la réunion des fédérés marseillais et des gardes nationaux parisiens. Ce nom ne devient définitif qu’en 1848.',
      },
    ],
  },
  {
    id: 'migration',
    prompt:
      'Quel animal migre jusqu’aux côtes de La Réunion de juillet à octobre ?',
    choices: [
      'L’albatros de Bourbon',
      'Le marlin bleu',
      'La sterne des Mascareignes',
      'La baleine à bosse',
    ],
    correct: 3,
    explanation: [
      {
        text: 'En 2023, environ 1 100 baleines à bosse ont été recensées autour de l’île. Elles se nourrissent en Antarctique pendant l’été austral (de décembre à mars), puis rejoignent les eaux chaudes pendant l’hiver austral (de juin à octobre).',
      },
      { carousel: ['migration-1.webp'] },
    ],
  },
  {
    id: 'maloya',
    prompt: 'Qu’est-ce que le maloya, très populaire sur l’île ?',
    choices: [
      'Un genre musical',
      'Un plat épicé',
      'Un fruit tropical',
      'Un vent chaud',
    ],
    correct: 0,
    explanation: [
      {
        text: 'Deux genres musicaux sont très répandus à La Réunion : le maloya et le séga (origine: l’île Maurice).',
      },
    ],
  },
  {
    id: 'riviere',
    prompt: 'Comment s’appelle la plus grande rivière de La Réunion ?',
    choices: [
      'La rivière des Galets',
      'La rivière du Mât',
      'La rivière des Marsouins',
      'La rivière des Remparts',
    ],
    correct: 1,
    explanation: [
      {
        text: 'Longue de 35 km, elle prend sa source au nord du Piton des Neiges. Une rhumerie porte aussi son nom, et sa distillerie se visite (si jamais…).',
      },
      { carousel: ['riviere-1.webp'] },
    ],
  },
  {
    id: 'poisson',
    prompt:
      'Parmi ces poissons, lequel a-t-on le plus de chances de croiser à la plage ces prochains jours ?',
    choices: [
      'La raie brunette',
      'Le sar à museau pointu',
      'La dorade royale',
      'L’idole des Maures',
    ],
    correct: 3,
    explanation: [
      {
        text: 'Aussi appelée zancle cornu, c’est un poisson tropical omnivore qui vit dans tout l’Indo-Pacifique, emblématique des récifs coralliens de l’océan Indien. Les trois autres vivent surtout dans l’Atlantique.',
      },
      { carousel: ['poisson-1.webp', 'poisson-2.webp'] },
    ],
  },
  {
    id: 'oiseau',
    prompt:
      'Place aux oiseaux : lequel, très présent à La Réunion, est l’emblème de l’île ?',
    choices: ['Le paille-en-queue', 'Le tuit-tuit', 'Le toucan', 'Le tec-tec'],
    correct: 0,
    explanation: [
      {
        text: 'On l’appelle aussi phaéton. C’est également l’emblème de la compagnie aérienne mauricienne Air Mauritius. D’ailleurs, en parlant d’avions…',
      },
      { carousel: ['oiseau-1.webp', 'oiseau-2.webp', 'oiseau-3.webp'] },
    ],
  },
  {
    id: 'aviateur',
    prompt:
      'Quel aviateur français est né à Saint-Denis de La Réunion le 6 octobre 1888 ?',
    choices: [
      'Louis Blériot',
      'Antoine de Saint-Exupéry',
      'Roland Garros',
      'Jean Mermoz',
    ],
    correct: 2,
    explanation: [
      { text: 'Il y avait des indices sur vos billets d’avion.' },
      { carousel: ['aviateur-1.webp', 'aviateur-2.webp'] },
    ],
  },
  {
    id: 'drapeau',
    prompt: 'Combien de couleurs compte le drapeau de La Réunion ?',
    choices: ['2', '3', '4', '5'],
    correct: 1,
    explanation: [
      {
        text: 'Il s’appelle « Lo Mahavéli » (le Volcan rayonnant). Ce n’est pas le drapeau officiel : l’île est un département français, son drapeau officiel est donc le bleu-blanc-rouge. Mais c’est le plus répandu et le plus apprécié des habitants.',
      },
      { carousel: ['drapeau-1.webp'] },
    ],
  },
];
