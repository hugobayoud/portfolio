import { NextResponse } from 'next/server';

// Remplace TEAM_ID par ton Apple Developer Team ID (10 caracteres).
const TEAM_ID = '35ND55UGS7';
const BUNDLE_ID = 'com.tizy.leptoschaft';

export function GET() {
  const aasa = {
    applinks: {
      apps: [],
      details: [
        {
          appIDs: [`${TEAM_ID}.${BUNDLE_ID}`],
          components: [{ '/': '/invite/*' }],
        },
      ],
    },
  };

  return NextResponse.json(aasa, {
    headers: {
      // iOS exige un content-type JSON sans redirection.
      'Content-Type': 'application/json',
      // Evite les caches agressifs CDN qui peuvent casser la verification.
      'Cache-Control': 'no-store',
    },
  });
}
