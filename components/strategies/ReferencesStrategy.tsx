import React from 'react';
import { Flex } from '@radix-ui/themes';

import ProjectCard from '../ProjectCard';
import SectionHeader from '../SectionHeader';

export default function ReferencesStrategy() {
  return (
    <Flex direction="column" gap="8">
      <SectionHeader subTitle={'On/Je parle de moi'} title={'Mes références'} />

      <Flex gap="3" direction="column" maxWidth="500px" className="mx-auto">
        <ProjectCard
          title="Le Progres"
          description={`Le journal "Le Progrès" nous a interviewé pour parler de l'application Lepto.`}
          image="/references/thumbnails/le_progres.png"
          backgroundImage="/references/le_progres_bg.png"
          link="https://www.leprogres.fr/economie/2024/04/07/avec-cette-application-plus-de-dispute-autour-de-l-addition"
        />
        <ProjectCard
          title="BFM TV Lyon"
          description="Raphaël Metro, mon associé sur l'application Sowhat a été interviewé sur BFM TV Lyon pour parler en direct de notre travail."
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
