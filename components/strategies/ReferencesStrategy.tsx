import React from 'react';
import { Flex, Text } from '@radix-ui/themes';

import ProjectCard from '../ProjectCard';

export default function ReferencesStrategy() {
  return (
    <Flex direction="column" gap="6">
      <Text weight="bold" size="7">
        Mes références
      </Text>

      <Text>On/Je parle de moi</Text>

      <Flex gap="3" direction="column" maxWidth="500px">
        <ProjectCard
          title="Le Progres"
          description={`Le journal local "Le Progrès" nous a interviewé pour parler de l'applicationLepto.`}
          image="/references/thumbnails/le_progres.png"
          backgroundImage="/references/le_progres_bg.png"
          link="https://www.leprogres.fr/economie/2024/04/07/avec-cette-application-plus-de-dispute-autour-de-l-addition"
        />
        <ProjectCard
          title="BFM TV Lyon"
          description="Raphaël Metro, mon associé sur l'application Sowhat a été interview sur BFM TV Lyon pour parler en direct de notre travail."
          image="/references/thumbnails/bfm_lyon.png"
          backgroundImage="/references/bfm_bg.png"
          link="https://www.bfmtv.com/lyon/replay-emissions/bonsoir-lyon/sowhat-l-application-lyonnaise-qui-permet-de-mieux-gerer-son-budget_VN-202502170665.html"
        />
        <ProjectCard
          title="Podcast"
          description="Invité au micro de Fabien Serra sur Tizy Media, je reviens sur mon parcours dans le développement, les FinTechs et l'entrepreneuriat."
          image="/references/thumbnails/podcast.png"
          backgroundImage="/references/podcast_bg.png"
          link="https://youtu.be/oDuGcrbxy6s?si=imEuTjTFmLMlNxjS"
        />
      </Flex>
    </Flex>
  );
}
