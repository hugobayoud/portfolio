'use client';

import React from 'react';
import { Container, Text } from '@radix-ui/themes';

import { useLanguage } from '../../src/i18n/LanguageProvider';

export default function StoryStrategy() {
  const { messages } = useLanguage();

  // Split the text to maintain the bold formatting
  const fullText = messages.strategies.story.text;
  const parts = fullText.split(
    /(\bstartups\b|\bscale-ups\b|\bévoluer leurs produits\b|\bMon objectif est d'accompagner les\b)/gi
  );

  return (
    <Container
      size="2"
      style={{
        margin: '70px 0',
        textAlign: 'center',
      }}
    >
      <Text style={{ opacity: 0.7 }}>
        {parts.map((part: string, index: number) => {
          // Check if this part should be bold
          const isBold =
            /startups|scale-ups|évoluer leurs produits|Mon objectif est d'accompagner les/i.test(
              part
            );

          return isBold ? (
            <Text key={index} weight="bold">
              {part}
            </Text>
          ) : (
            <React.Fragment key={index}>{part}</React.Fragment>
          );
        })}
      </Text>
    </Container>
  );
}
