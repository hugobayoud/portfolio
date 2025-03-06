import { Flex, Text } from '@radix-ui/themes';

import ProjectCard from '../ProjectCard';

export default function ProjectsStrategy() {
  return (
    <Flex direction="column" gap="6">
      <Text weight="bold" size="7">
        Mes projets
      </Text>
      <Text>
        I create applications and tools to be profitable and help people with my
        skills.
      </Text>

      <Flex gap="3" direction="column" maxWidth="500px">
        <ProjectCard
          title="Lepto"
          description="Automatiser les remboursements entre amis en voyage tout en évitant les tensions liées aux finances. Le défi majeur : proposer une expérience plus fluide et intuitive que les concurrents, comme Tricount, grâce à une UI/UX optimisée."
          image="/projects/logos/lepto.png"
          backgroundImage="/projects/lepto_bg.png"
          link="https://count.lepto.app/"
        />
        <ProjectCard
          title="Sowhat"
          description="Une FinTech qui exploite l'Open Finance pour aider les utilisateurs à mieux gérer leur budget, leurs économies et leur patrimoine. Dans un marché nouveau mais avec de nombreux acteurs, l'objectif a été de repenser l'interface et d'identifier les fonctionnalités clés qui feront la différence. Simplicité, efficacité et impact sont les maîtres mots."
          image="/projects/logos/sowhat.png"
          backgroundImage="/projects/sowhat_bg.png"
          link="https://sowhat-app.com"
        />
        <ProjectCard
          title="Monkey Factory"
          description="Faciliter la mobilité urbaine en centralisant divers moyens de transport (vélos, trottinettes, bus, covoiturage…) au sein d'une application unique. Mon rôle : intégrer un système de calcul d'itinéraire performant et optimiser l'architecture Back-end en mono-repo pour une gestion efficace des services."
          image="/projects/logos/mybus.png"
          backgroundImage="/projects/mybus_bg.png"
          link="https://mybus.io/"
        />
      </Flex>
    </Flex>
  );
}
