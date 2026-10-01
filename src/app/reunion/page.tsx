import { Explanation } from '@/components/reunion/explanation';
import { PlayThrough } from '@/components/reunion/play-through';
import { PreparingScreen } from '@/components/reunion/preparing-screen';

import { assertCarouselPhotos, quizPhotoUrls } from './photos';
import { quiz } from './quiz';

assertCarouselPhotos(quiz);

export default function ReunionPage() {
  return (
    <PreparingScreen photos={quizPhotoUrls(quiz)}>
      <PlayThrough
        questions={quiz}
        explanations={quiz.map((question) => (
          <Explanation key={question.id} question={question} />
        ))}
      />
    </PreparingScreen>
  );
}
