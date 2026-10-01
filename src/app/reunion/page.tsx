import { PromptStep } from '@/components/reunion/prompt-step';

import { quiz } from './quiz';

export default function ReunionPage() {
  return <PromptStep question={quiz[0]} />;
}
