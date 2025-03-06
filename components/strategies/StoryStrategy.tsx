import { Container, Text } from '@radix-ui/themes';

export default function StoryStrategy() {
  return (
    <Container
      size="2"
      style={{
        margin: '70px 0',
        textAlign: 'center',
      }}
    >
      <Text style={{ opacity: 0.7 }}>
        Développeur depuis plus de cinq ans et passionné d'entrepreneuriat,
        j'aime transformer une idée en produit concret en alliant stratégie et
        technique. <Text weight="bold">Mon objectif est d'accompagner les</Text>
        <Text weight="bold">{` startups`}</Text> et
        <Text weight="bold">{` scale-ups`}</Text> avec une expertise pointue et
        une approche pragmatique pour faire
        <Text weight="bold">{` évoluer leurs produits.`}</Text>
      </Text>
    </Container>
  );
}
