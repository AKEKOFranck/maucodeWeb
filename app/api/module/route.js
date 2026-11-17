import { NextResponse } from "next/server";
import { getCourse, getModule } from "@/lib/data/modules";
import { publicModule } from "@/lib/quizServer";
import { verifyBearer } from "@/lib/serverAuth";
import { createLimiter, clientIp } from "@/lib/rateLimit";
import { hasAccess } from "@/lib/entitlements";
import { isPaidModule } from "@/lib/paymentConfig";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ipLimit = createLimiter({ windowMs: 10 * 60 * 1000, max: 300 });
const json = (body, status = 200, headers = {}) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "private, no-store", ...headers } });

/* GET ?course=...&module=... : contenu d'un module payant, seulement si l'accès est payé */
export async function GET(request) {
  try {
    const w = ipLimit(clientIp(request));
    if (w > 0) return json({ error: "too_many_requests" }, 429, { "Retry-After": String(w) });

    const p = new URL(request.url).searchParams;
    const slug = p.get("course") || "";
    const moduleSlug = p.get("module") || "";
    const course = getCourse(slug);
    const mod = getModule(slug, moduleSlug);
    if (!course || !mod) return json({ error: "not_found" }, 404);

    const idx = course.modules.findIndex((m) => m.slug === moduleSlug);
    if (isPaidModule(slug, idx)) {
      const decoded = await verifyBearer(request, { checkRevoked: true });
      if (!decoded) return json({ error: "unauthorized" }, 401);
      if (!(await hasAccess(decoded.uid, slug, idx))) return json({ error: "payment_required" }, 402);
    }
    return json({ module: publicModule(mod) });
  } catch (e) {
    console.error("GET /api/module :", e);
    return json({ error: "server_error" }, 500);
  }
}