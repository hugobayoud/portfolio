import { Explanation } from '@/components/reunion/explanation';
import { PlayThrough } from '@/components/reunion/play-through';

import { assertCarouselPhotos } from './photos';
import { quiz } from './quiz';

assertCarouselPhotos(quiz);

export default function ReunionPage() {
  return (
    <PlayThrough
      questions={quiz}
      explanations={quiz.map((question) => (
        <Explanation key={question.id} blocks={question.explanation} />
      ))}
    />
  );
}
