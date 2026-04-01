import { NextResponse } from "next/server";

// SHA-256 du certificat de signature Google Play (format AB:CD:...).
const SHA256_FINGERPRINT = "TON:SHA256:FINGERPRINT:ICI";
const PACKAGE_NAME = "com.tizy.leptoschaft";

export function GET() {
  const assetLinks = [
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: PACKAGE_NAME,
        sha256_cert_fingerprints: [SHA256_FINGERPRINT],
      },
    },
  ];

  return NextResponse.json(assetLinks, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
