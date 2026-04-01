"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

// TODO: Renseigner l'URL réelle App Store.
const APP_STORE_URL = "https://apps.apple.com/app/id<TON_APP_ID>";
// TODO: Renseigner l'URL réelle Google Play.
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.tizy.leptoschaft";

const ANDROID_PACKAGE = "com.tizy.leptoschaft";
const APP_NAME = "Leptoschaft";
const PRIMARY = "#9E072B";

type OS = "ios" | "android" | "unknown";
type Phase = "redirecting" | "fallback";

function getOS(): OS {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return "ios";
  if (/Android/.test(ua)) return "android";
  return "unknown";
}

export default function InvitePage() {
  const params = useParams<{ code: string }>();
  const code = Array.isArray(params.code) ? params.code[0] : params.code;

  const [phase, setPhase] = useState<Phase>("redirecting");
  const [os, setOs] = useState<OS>("unknown");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (!code) {
      setPhase("fallback");
      return;
    }

    const detectedOs = getOS();
    setOs(detectedOs);

    if (detectedOs === "unknown") {
      // Desktop : affiche juste les liens de téléchargement
      setPhase("fallback");
      return;
    }

    if (detectedOs === "android") {
      // Android Intent URL : le système gère nativement l'app installée / non installée.
      // Si l'app est installée → ouvre l'app. Sinon → ouvre PLAY_STORE_URL.
      const fallback = encodeURIComponent(PLAY_STORE_URL);
      window.location.href = `intent://invite/${code}#Intent;scheme=leptoschaft;package=${ANDROID_PACKAGE};S.browser_fallback_url=${fallback};end`;
      // Filet de sécurité si l'Intent URL n'est pas traitée (navigateurs non-Chrome)
      timer.current = setTimeout(() => setPhase("fallback"), 2500);
      return () => {
        if (timer.current) clearTimeout(timer.current);
      };
    }

    // iOS : tentative via custom scheme.
    // Si les Universal Links sont actifs et l'app installée, cette page
    // est généralement bypassée et l'app s'ouvre directement.
    const onHide = () => {
      if (document.hidden && timer.current) clearTimeout(timer.current);
    };
    document.addEventListener("visibilitychange", onHide, { once: true });

    window.location.href = `leptoschaft://invite/${code}`;

    timer.current = setTimeout(() => {
      setPhase("fallback");
      window.location.href = APP_STORE_URL;
    }, 1500);

    return () => {
      if (timer.current) clearTimeout(timer.current);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [code]);

  const storeUrl = os === "ios" ? APP_STORE_URL : PLAY_STORE_URL;
  const storeLabel =
    os === "ios" ? "Telecharger sur l'App Store" : "Telecharger sur Google Play";

  return (
    <main style={styles.root}>
      <div style={styles.card}>
        <div style={styles.logo}>{APP_NAME}</div>

        {phase === "redirecting" ? (
          <>
            <Spinner />
            <p style={styles.heading}>Ouverture de {APP_NAME}...</p>
            <p style={styles.sub}>Tu es invite a rejoindre un evenement.</p>
          </>
        ) : (
          <>
            <p style={styles.heading}>Telecharge {APP_NAME}</p>
            <p style={styles.sub}>
              Pour rejoindre cet evenement, tu as besoin de l'application.
            </p>
          </>
        )}

        {(phase === "fallback" || os !== "unknown") && (
          <a href={storeUrl} style={styles.button}>
            {storeLabel}
          </a>
        )}

        {os === "unknown" && (
          <div style={styles.storeRow}>
            <a href={APP_STORE_URL} style={styles.button}>
              App Store
            </a>
            <a href={PLAY_STORE_URL} style={{ ...styles.button, ...styles.buttonOutline }}>
              Google Play
            </a>
          </div>
        )}
      </div>
    </main>
  );
}

function Spinner() {
  return (
    <div style={spinnerStyles.wrapper}>
      <div style={spinnerStyles.ring} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    minHeight: "100dvh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fafafa",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    padding: "24px",
  },
  card: {
    background: "white",
    borderRadius: "20px",
    padding: "48px 40px",
    maxWidth: "420px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
  },
  logo: {
    fontSize: "28px",
    fontWeight: "800",
    color: PRIMARY,
    marginBottom: "32px",
    letterSpacing: "-0.5px",
  },
  heading: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#111827",
    margin: "16px 0 8px",
  },
  sub: {
    fontSize: "15px",
    color: "#6B7280",
    lineHeight: "1.5",
    margin: "0 0 28px",
  },
  button: {
    display: "inline-block",
    background: PRIMARY,
    color: "white",
    borderRadius: "12px",
    padding: "14px 28px",
    fontSize: "15px",
    fontWeight: "600",
    textDecoration: "none",
    marginTop: "8px",
  },
  buttonOutline: {
    background: "transparent",
    color: PRIMARY,
    border: `2px solid ${PRIMARY}`,
  },
  storeRow: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "8px",
  },
};

const spinnerStyles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    margin: "8px 0",
  },
  ring: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: `4px solid ${PRIMARY}20`,
    borderTopColor: PRIMARY,
    animation: "spin 0.8s linear infinite",
  },
};
