import nodemailer from "nodemailer";

export const runtime = "nodejs";

const TO = "fm0055970@gmail.com";
const clean = (v, max) => String(v ?? "").trim().slice(0, max);
const esc = (t) => t.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

export async function POST(req) {
  try {
    const user = process.env.GMAIL_USER;
    // Les espaces du mot de passe d'application sont retirés automatiquement
    const pass = (process.env.GMAIL_APP_PASSWORD || "").replace(/\s/g, "");

    if (!user || !pass) {
      console.error("[feedback] GMAIL_USER ou GMAIL_APP_PASSWORD manquant dans .env.local (redémarre le serveur après modification)");
      return Response.json({ error: "Le serveur d'e-mail n'est pas configuré." }, { status: 500 });
    }

    const b = await req.json();
    const name = clean(b.name, 80);
    const email = clean(b.email, 120);
    const kind = clean(b.kind, 60);
    const message = clean(b.message, 1500);
    const course = clean(b.course, 60);
    const module = clean(b.module, 120);

    if (!name || !message || !/^\S+@\S+\.\S+$/.test(email)) {
      return Response.json({ error: "Vérifie ton prénom, ton e-mail et ton message." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `Maucode <${user}>`,
      to: TO,
      replyTo: email,
      subject: `[Maucode] ${kind} : ${course} / ${module}`,
      html: `<p><b>${esc(kind)}</b> (${esc(course)} : ${esc(module)})</p>
             <p><b>${esc(name)}</b> &lt;${esc(email)}&gt;</p>
             <p>${esc(message).replace(/\n/g, "<br>")}</p>`,
    });

    return Response.json({ ok: true });
  } catch (err) {
    // L'erreur exacte s'affiche dans le terminal où tourne "npm run dev"
    console.error("[feedback] Échec de l'envoi :", err?.code, err?.responseCode, err?.message);
    return Response.json({ error: "L'envoi a échoué. Réessaie dans un instant." }, { status: 500 });
  }
}