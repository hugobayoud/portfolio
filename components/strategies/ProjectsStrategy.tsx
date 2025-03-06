import { Flex } from '@radix-ui/themes';

import ProjectCard from '../ProjectCard';
import SectionHeader from '../SectionHeader';

export default function ProjectsStrategy() {
  return (
    <Flex direction="column" gap="8">
      <SectionHeader
        title={'Mes projets'}
        subTitle={
          'Je crée des applications et des outils pour être rentable et aider les gens avec mes compétences.'
        }
      />

      <Flex gap="3" direction="column" maxWidth="500px" className="mx-auto">
        <ProjectCard
          title="Lepto"
          description="Automatiser les remboursements entre amis en voyage tout en évitant les tensions liées aux finances. Le défi majeur : proposer une expérience plus fluide et intuitive que les concurrents, comme Tricount, grâce à une UI/UX optimisée."
          image="/projects/logos/lepto.png"
          backgroundImage="/projects/lepto_bg.png"
          link="https://count.lepto.app/"
        />
        <ProjectCard
          title="Sowhat"
          description="Une FinTech qui exploite l'Open Finance pour aider les utilisateurs à mieux gérer leur budget, leurs économies et leur patrimoine. Simplicité, efficacité et impact sont les maîtres mots."
          image="/projects/logos/sowhat.png"
          backgroundImage="/projects/sowhat_bg.png"
          link="https://sowhat-app.com"
        />
        <ProjectCard
          title="Monkey Factory"
          description="Faciliter la mobilité urbaine en centralisant les moyens de transport (vélos, trottinettes, bus, covoiturage…) au sein d'une application. Mon rôle : intégrer un système de calcul d'itinéraire performant et optimiser l'architecture Back-end en mono-repo."
          image="/projects/logos/mybus.png"
          backgroundImage="/projects/mybus_bg.png"
          link="https://mybus.io/"
        />
      </Flex>
    </Flex>
  );
}
