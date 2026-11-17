// Cours « HTML et CSS » (5 000 F, module 1 gratuit). Même format que programming.js.
// Ce fichier n'importe rien : il est ajouté à COURSES dans modules.js.
// Les textes (explain, tip, quiz...) restent du texte brut, sans balise HTML.
// Les extraits de code vivent UNIQUEMENT dans les visuels « code » et « playground »,
// qui les affichent comme du texte ou dans un cadre isolé (iframe sandbox).
// Vérification : node scripts/check-courses.mjs

// Petits outils pour écrire les vérifications des missions (expressions régulières)
const Q = "[\\x22\\x27]"; // guillemet simple ou double
const open = (t) => "<" + t + "(?:\\s[^>]*)?>";
const tag = (t) => open(t) + "\\s*[^<\\s][\\s\\S]*?</" + t + "\\s*>"; // balise avec du texte dedans
const many = (t, n) => "(?:" + open(t) + "[\\s\\S]*?</" + t + "\\s*>[\\s\\S]*?){" + n + "}";
const rule = (sel, prop, val = "\\S") =>
  "(?:^|[\\s}])" + sel + "\\s*\\{(?:[^}]*[;\\s])?" + prop + "\\s*:\\s*" + val;

export const HTMLCSS = {
  "html-css": {
    software: "HTML et CSS",
    icon: "FaHtml5",
    accent: "#0e9f6e",
    title: "HTML et CSS : crée ta première page web",
    intro: "Tu vas apprendre à construire une vraie page web, en jouant des missions dans une console : tu écris le code, tu vois le résultat en direct, et chaque mission réussie te rapporte des points d'expérience.",
    modules: [
      /* =========================== MODULE 1 (gratuit) =========================== */
      {
        slug: "comprendre-une-page-web",
        added: "2026-11-17",
        title: "Comprendre une page web",
        icon: "FaCode",
        intro: "Balises, titres, paragraphes, liens et images : tes premières lignes de code.",
        chapters: [
          {
            title: "Bienvenue dans la console",
            explain: [
              "Une page web est un simple fichier texte. Le navigateur (Chrome, Safari, Firefox) le lit de haut en bas et dessine ce qu'il comprend. Rien de magique : il suit exactement ce qui est écrit.",
              "HTML décrit le contenu et la structure de la page : titres, paragraphes, liens, images. CSS décrit son apparence : couleurs, tailles, positions. Dans ce cours, chaque chapitre est une mission : tu écris du code, l'aperçu se met à jour en direct, et la mission se valide quand ton code est bon.",
            ],
            visual: {
              type: "terminal",
              title: "navigateur.exe",
              caption: "Voilà ce que fait le navigateur quand il ouvre une page.",
              lines: [
                { k: "cmd", t: "ouvrir mon-site.html" },
                { k: "out", t: "Lecture du fichier, de haut en bas..." },
                { k: "out", t: "Les balises (des mots entre chevrons) décrivent la page." },
                { k: "ok", t: "Page affichée : ton texte est devenu une page web." },
                { k: "warn", t: "Rappel : le navigateur ne devine rien, il lit ce qui est écrit." },
              ],
            },
            tip: "Tu ne peux rien casser : si ton code ne marche plus, appuie sur Recommencer.",
          },
          {
            title: "Les balises : le premier code",
            explain: [
              "Une balise est un mot entouré de chevrons. La plupart vont par deux : une balise ouvrante au début, une balise fermante à la fin, qui ressemble à l'ouvrante avec une barre oblique en plus. Le texte au milieu est le contenu.",
              "Le paragraphe utilise la balise p. Oublier la balise fermante est l'erreur la plus fréquente des débutants : l'aperçu te le montrera tout de suite.",
            ],
            visual: {
              type: "playground",
              mode: "html",
              caption: "Tape ton code à gauche : le résultat s'affiche à droite.",
              mission: "Écris un paragraphe qui dit bonjour.",
              example: `<p>Bonjour !</p>`,
              starter: `<!-- Écris ton paragraphe ici -->\n`,
              solution: `<p>Bonjour tout le monde !</p>`,
              checks: [{ label: "Un paragraphe avec du texte (balise p)", re: tag("p") }],
              xp: 10,
            },
            tip: "Écris la balise fermante tout de suite après l'ouvrante, puis remplis le milieu.",
          },
          {
            title: "Titres et paragraphes",
            explain: [
              "Il existe six niveaux de titres, de h1 (le plus important) à h6. On met un seul h1 par page, pour le titre principal. Les h2 servent aux grandes parties et les h3 aux sous-parties.",
              "Un titre ne sert pas à grossir le texte : il donne la structure de la page, que lisent aussi les moteurs de recherche et les lecteurs d'écran. Pour changer la taille des lettres, on utilisera CSS plus tard.",
            ],
            visual: {
              type: "playground",
              mode: "html",
              caption: "Un titre principal, puis deux paragraphes.",
              mission: "Écris un titre principal avec du texte, puis deux paragraphes.",
              example: `<h1>Ma ville</h1>\n<p>Abidjan est grande.</p>`,
              starter: `<h1></h1>\n<!-- ajoute deux paragraphes -->`,
              solution: `<h1>Ma ville</h1>\n<p>J'habite à Abidjan.</p>\n<p>C'est une grande ville.</p>`,
              checks: [
                { label: "Un titre principal h1 avec du texte", re: tag("h1") },
                { label: "Au moins deux paragraphes p", re: many("p", 2) },
              ],
              xp: 15,
            },
            tip: "Un seul h1 par page. Si tu veux un autre titre, utilise h2.",
          },
          {
            title: "Liens et images",
            explain: [
              "Un lien s'écrit avec la balise a et un attribut href, qui contient l'adresse de destination. Un attribut est une information ajoutée dans la balise ouvrante : un nom, le signe égal, puis une valeur entre guillemets. Le texte entre les balises est ce que la personne clique.",
              "Une image s'écrit avec la balise img, qui n'a pas de balise fermante. L'attribut src donne le fichier, et alt décrit l'image avec des mots : il aide les personnes qui n'ont pas la vue et s'affiche si l'image ne charge pas.",
            ],
            visual: {
              type: "playground",
              mode: "html",
              caption: "Un lien cliquable et une image décrite avec des mots.",
              mission: "Crée un lien vers un site, puis une image avec un texte alternatif.",
              example: `<a href="https://exemple.com">Mon site</a>\n<img src="photo.jpg" alt="Mon chat">`,
              starter: `<!-- un lien (a), puis une image (img) -->\n`,
              solution: `<a href="https://exemple.com">Mon site préféré</a>\n<img src="moi.jpg" alt="Ma photo">`,
              checks: [
                { label: "Un lien a avec href et un texte à cliquer", re: "<a\\s[^>]*href\\s*=\\s*" + Q + "[^\\x22\\x27]+" + Q + "[^>]*>[^<]+</a>" },
                { label: "Une image avec l'attribut src", re: "<img\\s[^>]*src\\s*=\\s*" + Q + "[^\\x22\\x27]+" + Q },
                { label: "Un texte alternatif (attribut alt)", re: "<img\\s[^>]*alt\\s*=\\s*" + Q + "[^\\x22\\x27]+" + Q },
              ],
              xp: 20,
            },
            tip: "Par sécurité, la console bloque les images et les sites externes : tu verras le texte alternatif à la place de l'image. Sur ton vrai site, elle s'affichera.",
          },
        ],
        quiz: [
          { q: "Qu'est-ce qu'une balise fermante ?", options: ["Une balise avec une barre oblique, qui termine l'élément", "Une balise qu'on écrit tout en haut de la page", "Une balise qui efface la page"], answer: 0, why: "La balise fermante ressemble à l'ouvrante, avec une barre oblique en plus. Elle marque la fin de l'élément." },
          { q: "Combien de titres h1 met-on en général dans une page ?", options: ["Six", "Autant qu'on veut", "Un seul"], answer: 2, why: "Le h1 est le titre principal de la page : il est unique. Pour les autres titres, on utilise h2, h3..." },
          { q: "Quel attribut donne l'adresse de destination d'un lien ?", options: ["src", "href", "alt"], answer: 1, why: "href contient l'adresse. L'attribut src sert pour les images, et alt décrit l'image." },
          { q: "À quoi sert l'attribut alt d'une image ?", options: ["À changer sa taille", "À la faire bouger", "À la décrire avec des mots"], answer: 2, why: "Le texte alternatif aide les personnes qui ne voient pas l'image, et s'affiche si elle ne charge pas." },
          { q: "Que décrit le langage HTML ?", options: ["Le contenu et la structure de la page", "Uniquement les couleurs", "La vitesse d'internet"], answer: 0, why: "HTML décrit le contenu et la structure. Les couleurs et la mise en forme relèvent de CSS." },
        ],
        exercise: {
          title: "Ma page de présentation",
          instructions: [
            "Crée un titre principal (h1) avec ton prénom.",
            "Ajoute un paragraphe qui dit d'où tu viens.",
            "Ajoute un titre h2 « Mes liens », puis un lien vers un site que tu aimes.",
            "Termine par une image avec un texte alternatif.",
          ],
          correction: [
            "Le prénom va entre la balise ouvrante et la balise fermante du h1.",
            "Un paragraphe utilise la balise p, avec ta phrase au milieu.",
            "Le lien utilise la balise a avec l'attribut href. Le texte à cliquer est entre les deux balises.",
            "L'image utilise img avec src et alt. Elle n'a pas de balise fermante.",
          ],
          visual: {
            type: "code",
            language: "html",
            caption: "Une solution possible.",
            code: `<h1>Awa</h1>\n<p>Je viens de Bouaké.</p>\n<h2>Mes liens</h2>\n<a href="https://exemple.com">Mon site préféré</a>\n<img src="moi.jpg" alt="Ma photo">`,
          },
        },
      },

      /* =========================== MODULE 2 =========================== */
      {
        slug: "html-complet",
        added: "2026-11-17",
        title: "HTML complet",
        icon: "FaLayerGroup",
        intro: "Listes, tableaux, formulaires et balises sémantiques : la page prend sa vraie forme.",
        chapters: [
          {
            title: "Les listes",
            explain: [
              "Une liste à puces s'écrit avec la balise ul, et chaque élément avec la balise li. Pour une liste numérotée, on remplace ul par ol. Chaque li doit toujours se trouver à l'intérieur d'un ul ou d'un ol.",
              "Les listes servent partout : menus de navigation, listes de courses, étapes d'une recette. Un menu de site est presque toujours une liste de liens.",
            ],
            visual: {
              type: "playground",
              mode: "html",
              caption: "Une liste à puces de trois éléments.",
              mission: "Crée une liste à puces de trois fruits.",
              example: `<ul>\n  <li>Mangue</li>\n  <li>Ananas</li>\n</ul>`,
              starter: `<ul>\n  <!-- trois éléments li ici -->\n</ul>`,
              solution: `<ul>\n  <li>Mangue</li>\n  <li>Ananas</li>\n  <li>Banane</li>\n</ul>`,
              checks: [
                { label: "Une liste ul", re: open("ul") + "[\\s\\S]*</ul\\s*>" },
                { label: "Trois éléments li", re: many("li", 3) },
              ],
              xp: 15,
            },
            tip: "ul pour une liste où l'ordre ne compte pas, ol pour une liste où il compte.",
          },
          {
            title: "Les tableaux",
            explain: [
              "Un tableau commence par la balise table. Chaque ligne est un tr. Dans une ligne, th est une cellule d'en-tête (en gras et centrée) et td est une cellule normale.",
              "Un tableau sert à présenter des données (prix, horaires, notes), jamais à placer les éléments d'une page : pour la mise en page, on utilisera CSS.",
            ],
            visual: {
              type: "playground",
              mode: "html",
              caption: "Un en-tête, puis deux lignes de données.",
              mission: "Crée un tableau Produit et Prix : deux cellules d'en-tête, puis deux lignes de données.",
              example: `<table>\n  <tr><th>Produit</th><th>Prix</th></tr>\n  <tr><td>Riz</td><td>1500</td></tr>\n</table>`,
              starter: `<table>\n  <!-- une ligne avec deux th, puis deux lignes avec deux td -->\n</table>`,
              solution: `<table>\n  <tr><th>Produit</th><th>Prix</th></tr>\n  <tr><td>Riz</td><td>1500</td></tr>\n  <tr><td>Huile</td><td>1200</td></tr>\n</table>`,
              checks: [
                { label: "Deux cellules d'en-tête th", re: many("th", 2) },
                { label: "Deux lignes de données avec des td", re: "(?:" + open("tr") + "[\\s\\S]*?" + open("td") + "[\\s\\S]*?</tr\\s*>[\\s\\S]*?){2}" },
              ],
              xp: 20,
            },
            tip: "Chaque ligne d'un tableau doit avoir le même nombre de cellules.",
          },
          {
            title: "Les formulaires",
            explain: [
              "Un formulaire s'écrit avec la balise form. Chaque champ est un input dont l'attribut type choisit le genre : text, email, password, number. Pour un long texte, on utilise textarea. Le bouton utilise button.",
              "Chaque champ doit avoir un label, le texte qui le décrit. L'attribut for du label reprend l'id du champ : on peut alors cliquer sur le texte pour activer le champ, et les lecteurs d'écran annoncent le bon nom. Dans la console, le formulaire ne s'envoie nulle part : il sert à s'entraîner.",
            ],
            visual: {
              type: "playground",
              mode: "html",
              caption: "Un formulaire de contact complet.",
              mission: "Crée un formulaire avec un label, un champ e-mail, une zone de message et un bouton.",
              example: `<form>\n  <label for="mail">E-mail</label>\n  <input id="mail" type="email">\n  <button>Envoyer</button>\n</form>`,
              starter: `<form>\n  <!-- label, champ e-mail, zone de message, bouton -->\n</form>`,
              solution: `<form>\n  <label for="mail">E-mail</label>\n  <input id="mail" type="email">\n  <label for="msg">Message</label>\n  <textarea id="msg"></textarea>\n  <button>Envoyer</button>\n</form>`,
              checks: [
                { label: "Un label avec du texte", re: tag("label") },
                { label: "Un champ input de type email", re: "<input\\s[^>]*type\\s*=\\s*" + Q + "?email" },
                { label: "Une zone de message (textarea)", re: open("textarea") + "[\\s\\S]*?</textarea\\s*>" },
                { label: "Un bouton", re: open("button") + "[\\s\\S]*?</button\\s*>" },
              ],
              xp: 25,
            },
            tip: "Utilise le bon type de champ : type email affiche le bon clavier sur téléphone et vérifie l'adresse.",
          },
          {
            title: "Les balises sémantiques",
            explain: [
              "Les balises sémantiques disent ce que contient chaque zone : header pour l'en-tête, nav pour le menu, main pour le contenu principal, footer pour le pied de page. Elles s'affichent comme de simples blocs, mais leur sens aide les moteurs de recherche et les lecteurs d'écran.",
              "Avant, on mettait tout dans des div sans nom. Aujourd'hui, on choisit la balise qui décrit le mieux le contenu, et on garde div seulement quand aucune autre ne convient.",
            ],
            visual: {
              type: "playground",
              mode: "html",
              caption: "Les quatre grandes zones d'une page.",
              mission: "Structure une page avec header, nav, main et footer, chacun avec du texte.",
              example: `<header>Mon site</header>\n<nav>Accueil</nav>\n<main>Contenu</main>\n<footer>Contact</footer>`,
              starter: `<!-- header, nav, main, footer -->\n`,
              solution: `<header>Mon club</header>\n<nav>Accueil - Activités</nav>\n<main>Bienvenue au club.</main>\n<footer>club@exemple.com</footer>`,
              checks: [
                { label: "Un en-tête header", re: tag("header") },
                { label: "Un menu nav", re: tag("nav") },
                { label: "Un contenu principal main", re: tag("main") },
                { label: "Un pied de page footer", re: tag("footer") },
              ],
              xp: 25,
            },
            tip: "Une page a un seul main. En cas de doute, demande-toi : que contient cette zone ?",
          },
        ],
        quiz: [
          { q: "Quelle balise crée un élément de liste ?", options: ["li", "td", "tr"], answer: 0, why: "li est un élément de liste, à l'intérieur de ul ou ol. td et tr appartiennent aux tableaux." },
          { q: "Dans un tableau, quelle balise désigne une ligne ?", options: ["td", "th", "tr"], answer: 2, why: "tr est une ligne. td est une cellule normale et th une cellule d'en-tête." },
          { q: "À quoi sert l'attribut for d'un label ?", options: ["À colorer le texte", "À relier le label au champ qui a le même id", "À envoyer le formulaire"], answer: 1, why: "for reprend l'id du champ : cliquer sur le label active le champ, et les lecteurs d'écran annoncent le bon nom." },
          { q: "Quelle balise contient le menu de navigation ?", options: ["main", "footer", "nav"], answer: 2, why: "nav est faite pour le menu. main contient le contenu principal et footer le pied de page." },
          { q: "Pourquoi préférer les balises sémantiques à des div sans nom ?", options: ["Elles décrivent le sens du contenu", "Elles sont plus rapides", "Elles se colorent toutes seules"], answer: 0, why: "Leur nom dit ce que contient la zone, ce qui aide les moteurs de recherche et les lecteurs d'écran." },
        ],
        exercise: {
          title: "La page de mon club",
          instructions: [
            "Crée un header avec le nom du club.",
            "Dans main, ajoute une liste de trois activités.",
            "Ajoute un tableau d'horaires avec deux jours.",
            "Termine par un footer avec ton e-mail.",
          ],
          correction: [
            "header contient simplement le nom du club.",
            "Dans main, une liste ul avec trois éléments li.",
            "Un tableau avec une ligne d'en-tête (th : Jour, Heure) puis deux lignes de données (td).",
            "Le footer se place tout en bas, après main.",
          ],
          visual: {
            type: "code",
            language: "html",
            caption: "Une solution possible.",
            code: `<header>Club de football</header>\n<main>\n  <ul>\n    <li>Entraînement</li>\n    <li>Match</li>\n    <li>Tournoi</li>\n  </ul>\n  <table>\n    <tr><th>Jour</th><th>Heure</th></tr>\n    <tr><td>Mardi</td><td>17h</td></tr>\n    <tr><td>Samedi</td><td>9h</td></tr>\n  </table>\n</main>\n<footer>club@exemple.com</footer>`,
          },
        },
      },

      /* =========================== MODULE 3 =========================== */
      {
        slug: "css-habiller-la-page",
        added: "2026-11-17",
        title: "CSS : habiller la page",
        icon: "FaCss3Alt",
        intro: "Sélecteurs, couleurs, texte, polices et la boîte (marge, remplissage, bordure) : la page devient belle.",
        chapters: [
          {
            title: "CSS, le costume de la page",
            explain: [
              "CSS s'écrit en règles. Une règle commence par un sélecteur, qui désigne les éléments à changer, puis des accolades contenant des déclarations : une propriété, le signe deux-points, une valeur et un point-virgule.",
              "Quand deux règles se contredisent, c'est la plus précise qui gagne : un id l'emporte sur une classe, qui l'emporte sur un nom de balise. À précision égale, c'est la règle écrite en dernier qui gagne.",
            ],
            visual: {
              type: "terminal",
              title: "css.exe",
              caption: "Comment le navigateur applique une règle CSS.",
              lines: [
                { k: "cmd", t: "css --regle 'h1 { color: red; }'" },
                { k: "out", t: "Sélecteur : h1 (la cible)" },
                { k: "out", t: "Déclaration : color rouge (le style)" },
                { k: "ok", t: "Tous les h1 de la page deviennent rouges." },
                { k: "warn", t: "Deux règles se contredisent ? La plus précise gagne, puis la plus récente." },
              ],
            },
            tip: "Le sélecteur dit qui, la déclaration dit comment.",
          },
          {
            title: "Sélecteurs et couleurs",
            explain: [
              "Le sélecteur peut être un nom de balise (h1), une classe (un point puis le nom, qui vise tous les éléments portant ce class) ou un id (un dièse puis le nom, pour un élément unique). La propriété color change la couleur du texte, et background-color change le fond.",
              "Une couleur s'écrit avec un nom (green), un code hexadécimal comme #1e8a4c, ou avec la fonction rgb. Assure-toi que le texte reste bien lisible sur son fond.",
            ],
            visual: {
              type: "playground",
              mode: "css",
              caption: "Le HTML est déjà écrit : à toi d'écrire le CSS.",
              mission: "Mets le titre h1 en vert, puis le paragraphe de classe intro en bleu.",
              baseHtml: `<h1>Ma page</h1>\n<p class="intro">Bienvenue sur ma page.</p>`,
              example: `h1 {\n  color: green;\n}`,
              starter: `/* 1. une règle pour h1\n   2. une règle pour .intro */\n`,
              solution: `h1 {\n  color: green;\n}\n.intro {\n  color: blue;\n}`,
              checks: [
                { label: "Une couleur de texte pour h1", re: rule("h1", "color") },
                { label: "Une couleur de texte pour la classe intro", re: rule("\\.intro", "color") },
              ],
              xp: 20,
            },
            tip: "Une classe peut servir à plusieurs éléments, un id à un seul. Préfère les classes.",
          },
          {
            title: "Texte et polices",
            explain: [
              "font-size règle la taille du texte, souvent en pixels (px). text-align aligne le texte : left, center ou right. font-family choisit la police ; on donne toujours une police de secours à la fin, par exemple Georgia puis serif.",
              "font-weight met en gras (bold) et font-style en italique (italic). Trop de polices différentes fatiguent la lecture : deux polices maximum par page.",
            ],
            visual: {
              type: "playground",
              mode: "css",
              caption: "Taille, alignement et police.",
              mission: "Mets le titre en 36 pixels et centré, puis le paragraphe en police Georgia.",
              baseHtml: `<h1>Mon titre</h1>\n<p>Un paragraphe de texte pour voir la police.</p>`,
              example: `p {\n  font-size: 20px;\n}`,
              starter: `/* h1 : font-size et text-align\n   p : font-family */\n`,
              solution: `h1 {\n  font-size: 36px;\n  text-align: center;\n}\np {\n  font-family: Georgia, serif;\n}`,
              checks: [
                { label: "Une taille de texte (font-size) pour h1", re: rule("h1", "font-size") },
                { label: "Un alignement (text-align) pour h1", re: rule("h1", "text-align") },
                { label: "Une police (font-family) pour p", re: rule("p", "font-family") },
              ],
              xp: 20,
            },
            tip: "Écris toujours l'unité : 36px et non 36.",
          },
          {
            title: "La boîte : marge, remplissage, bordure",
            explain: [
              "Chaque élément est une boîte à plusieurs couches. Au centre, le contenu. Autour, le padding (remplissage) qui sépare le contenu de la bordure. Puis la border (bordure), le trait visible. Enfin la margin (marge) qui écarte la boîte de ses voisines.",
              "Une bordure s'écrit en trois morceaux : épaisseur, style et couleur, par exemple 2px solid black. Pour retenir : le padding est à l'intérieur de la boîte, la marge est à l'extérieur.",
            ],
            visual: {
              type: "playground",
              mode: "css",
              caption: "Habille la carte de visite avec les trois propriétés de la boîte.",
              mission: "Donne à la classe carte une bordure, un remplissage de 20 pixels et une marge.",
              baseHtml: `<div class="carte">Ma carte de visite</div>`,
              baseCss: `.carte{background:#e6f4ea}`,
              example: `.carte {\n  padding: 20px;\n}`,
              starter: `/* .carte : border, padding, margin */\n`,
              solution: `.carte {\n  border: 2px solid black;\n  padding: 20px;\n  margin: 20px;\n}`,
              checks: [
                { label: "Une bordure (border)", re: rule("\\.carte", "border") },
                { label: "Un remplissage (padding)", re: rule("\\.carte", "padding") },
                { label: "Une marge (margin)", re: rule("\\.carte", "margin") },
              ],
              xp: 25,
            },
            tip: "Quand un espace te semble bizarre, regarde d'abord le padding et la margin.",
          },
          {
            title: "Le survol de la souris",
            explain: [
              "Une pseudo-classe cible un état d'un élément. La pseudo-classe hover s'applique quand la souris passe dessus : on l'écrit avec deux-points après le sélecteur. Elle rend la page vivante : boutons qui changent de couleur, liens qui se soulignent.",
              "On peut aussi arrondir les angles avec border-radius, et ajouter une transition pour que le changement soit doux. Teste toujours le survol avec ta souris dans l'aperçu.",
            ],
            visual: {
              type: "playground",
              mode: "css",
              caption: "Passe la souris sur le bouton dans l'aperçu.",
              mission: "Donne un fond au bouton, puis un autre fond quand la souris passe dessus.",
              baseHtml: `<button class="bouton">Clique-moi</button>`,
              baseCss: `.bouton{font-size:18px;padding:10px 20px;border:0;cursor:pointer}`,
              example: `.bouton:hover {\n  color: red;\n}`,
              starter: `/* .bouton : un fond\n   .bouton:hover : un autre fond */\n`,
              solution: `.bouton {\n  background-color: #1e8a4c;\n  color: white;\n}\n.bouton:hover {\n  background-color: #0b5d2e;\n}`,
              checks: [
                { label: "Un fond pour .bouton", re: rule("\\.bouton", "background(?:-color)?") },
                { label: "Un autre fond pour .bouton:hover", re: rule("\\.bouton:hover", "background(?:-color)?") },
              ],
              xp: 25,
            },
            tip: "Le survol n'existe pas sur téléphone : ne cache jamais une information importante derrière un hover.",
          },
        ],
        quiz: [
          { q: "Que désigne un sélecteur de classe ?", options: ["Tous les éléments qui portent ce nom de classe", "Un seul élément unique", "La page entière"], answer: 0, why: "Une classe peut être donnée à plusieurs éléments. Pour un élément unique, on utilise un id." },
          { q: "Quelle propriété change la couleur du texte ?", options: ["background-color", "color", "font-size"], answer: 1, why: "color change le texte. background-color change le fond, et font-size la taille." },
          { q: "Quel est l'ordre des couches de la boîte, de l'intérieur vers l'extérieur ?", options: ["Contenu, padding, bordure, marge", "Contenu, marge, bordure, padding", "Bordure, contenu, marge, padding"], answer: 0, why: "Le contenu est au centre, puis le padding, puis la bordure, puis la marge à l'extérieur." },
          { q: "Que fait la pseudo-classe hover ?", options: ["Elle cache l'élément", "Elle ferme la page", "Elle s'applique quand la souris passe sur l'élément"], answer: 2, why: "hover décrit l'état « la souris est dessus ». C'est ainsi qu'on fait changer un bouton au survol." },
          { q: "Que met-on à la fin d'une déclaration CSS ?", options: ["Une virgule", "Un point-virgule", "Un point"], answer: 1, why: "Le point-virgule termine chaque déclaration. Sans lui, la suivante risque de ne pas être lue." },
        ],
        exercise: {
          title: "Ma carte de visite",
          instructions: [
            "Crée une classe carte avec une bordure, un remplissage de 20 pixels et un fond clair.",
            "Mets le nom en 28 pixels et centré.",
            "Ajoute une marge de 20 pixels autour de la carte.",
            "Fais changer le fond de la carte quand la souris passe dessus.",
          ],
          correction: [
            "Une règle pour le sélecteur .carte avec border, padding et background-color.",
            "Une règle pour h2 avec font-size 28px et text-align center.",
            "Dans la règle .carte, ajoute margin : 20px.",
            "Une nouvelle règle .carte:hover qui change background-color.",
          ],
          visual: {
            type: "code",
            language: "css",
            caption: "Une solution possible.",
            code: `.carte {\n  border: 2px solid #1e8a4c;\n  padding: 20px;\n  margin: 20px;\n  background-color: #e6f4ea;\n}\n.carte h2 {\n  font-size: 28px;\n  text-align: center;\n}\n.carte:hover {\n  background-color: #cdeedb;\n}`,
          },
        },
      },

      /* =========================== MODULE 4 =========================== */
      {
        slug: "mise-en-page-moderne",
        added: "2026-11-17",
        title: "Mise en page moderne",
        icon: "FaMobileScreenButton",
        intro: "Flexbox, grille, adaptation au téléphone, puis un mini-projet de page de présentation.",
        chapters: [
          {
            title: "Flexbox : aligner en ligne",
            explain: [
              "Flexbox aligne des éléments en ligne ou en colonne. On l'active sur le conteneur (le parent) avec display flex : ses enfants deviennent des éléments flexibles, placés en ligne par défaut.",
              "justify-content répartit les éléments le long de la ligne : center, space-between (de l'espace entre eux) ou space-around. align-items les aligne dans l'autre sens, gap met un espace régulier entre eux, et flex-direction column les empile.",
            ],
            visual: {
              type: "playground",
              mode: "css",
              caption: "Un menu de trois liens, à disposer avec flexbox.",
              mission: "Place les trois liens sur une même ligne, répartis avec de l'espace entre eux.",
              baseHtml: `<div class="menu">\n  <a href="#">Accueil</a>\n  <a href="#">Cours</a>\n  <a href="#">Contact</a>\n</div>`,
              baseCss: `.menu{border:1px solid #888;padding:10px}.menu a{color:#06c}`,
              example: `.menu {\n  display: flex;\n}`,
              starter: `/* .menu : display flex et justify-content */\n`,
              solution: `.menu {\n  display: flex;\n  justify-content: space-between;\n}`,
              checks: [
                { label: "Flexbox activé sur .menu (display flex)", re: rule("\\.menu", "display", "flex") },
                { label: "Un espace réparti (justify-content : space-between)", re: rule("\\.menu", "justify-content", "space-(?:between|around|evenly)") },
              ],
              xp: 25,
            },
            tip: "Les propriétés flex se mettent sur le parent, pas sur chaque enfant.",
          },
          {
            title: "S'adapter au téléphone",
            explain: [
              "Beaucoup de visiteurs viennent d'un téléphone. Pour que la page s'adapte, on ajoute dans l'en-tête de la page la balise meta viewport, puis on utilise des media queries : des règles qui s'appliquent seulement si l'écran respecte une condition, par exemple une largeur maximale de 600 pixels.",
              "On conçoit d'abord pour le téléphone, puis on améliore pour les grands écrans : c'est l'approche mobile d'abord. Dans la console, le bouton Téléphone réduit l'aperçu pour que tu testes ta media query.",
            ],
            visual: {
              type: "playground",
              mode: "css",
              viewport: true,
              caption: "Bascule entre Ordinateur et Téléphone pour tester.",
              mission: "Mets les cartes en ligne avec flex, puis en colonne sur un écran de 600 pixels ou moins.",
              baseHtml: `<div class="cartes">\n  <div class="carte">Riz</div>\n  <div class="carte">Huile</div>\n  <div class="carte">Sucre</div>\n</div>`,
              baseCss: `.carte{background:#e6f4ea;padding:12px;border:1px solid #888}`,
              example: `@media (max-width: 600px) {\n  .carte {\n    color: red;\n  }\n}`,
              starter: `/* 1. display flex sur .cartes\n   2. une media query pour le téléphone */\n`,
              solution: `.cartes {\n  display: flex;\n  gap: 10px;\n}\n@media (max-width: 600px) {\n  .cartes {\n    flex-direction: column;\n  }\n}`,
              checks: [
                { label: "Les cartes en ligne (display flex sur .cartes)", re: rule("\\.cartes", "display", "flex") },
                { label: "Une media query avec max-width et flex-direction column", re: "@media\\s*\\(\\s*max-width\\s*:\\s*\\d+px\\s*\\)\\s*\\{[\\s\\S]*?flex-direction\\s*:\\s*column" },
              ],
              xp: 30,
            },
            tip: "Les points de rupture courants : 600 pixels pour le téléphone, 900 pour la tablette.",
          },
          {
            title: "La grille",
            explain: [
              "Grid dessine une grille en lignes et en colonnes. On l'active avec display grid sur le conteneur, puis grid-template-columns définit les colonnes. L'unité fr signifie une part de l'espace disponible : repeat(3, 1fr) crée trois colonnes égales.",
              "Flexbox convient à une seule direction (une barre de menu). Grid convient quand on pense en lignes et en colonnes (une galerie, un tableau de bord). On peut combiner les deux dans une même page.",
            ],
            visual: {
              type: "playground",
              mode: "css",
              caption: "Six cases à ranger en grille.",
              mission: "Affiche les cases en grille de trois colonnes égales, avec un espace de 10 pixels.",
              baseHtml: `<div class="galerie">\n  <div class="case">1</div>\n  <div class="case">2</div>\n  <div class="case">3</div>\n  <div class="case">4</div>\n  <div class="case">5</div>\n  <div class="case">6</div>\n</div>`,
              baseCss: `.case{background:#e6f4ea;border:1px solid #888;padding:12px;text-align:center}`,
              example: `.galerie {\n  display: grid;\n}`,
              starter: `/* .galerie : display grid, grid-template-columns, gap */\n`,
              solution: `.galerie {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 10px;\n}`,
              checks: [
                { label: "Une grille (display grid)", re: rule("\\.galerie", "display", "grid") },
                { label: "Trois colonnes égales (grid-template-columns)", re: rule("\\.galerie", "grid-template-columns", "[^;}]*(?:repeat\\s*\\(\\s*3|1fr\\s+1fr\\s+1fr)") },
                { label: "Un espace entre les cases (gap)", re: rule("\\.galerie", "gap") },
              ],
              xp: 30,
            },
            tip: "Besoin de deux colonnes sur téléphone ? Change repeat(3, 1fr) en repeat(2, 1fr) dans une media query.",
          },
          {
            title: "Mini-projet : ma page de présentation",
            explain: [
              "Tu as maintenant tous les outils : HTML pour la structure, CSS pour l'apparence, flexbox et grid pour la disposition. Ce dernier niveau est un mini-projet : une page de présentation complète, avec son HTML et son CSS dans le même cadre.",
              "Commence par le contenu (titre, paragraphe, liste), puis ajoute les couleurs, puis la mise en page. Teste en passant l'aperçu en mode Téléphone. Un code propre, avec des retraits réguliers et des noms de classes clairs, vaut mieux qu'un code compliqué.",
            ],
            visual: {
              type: "playground",
              mode: "html",
              viewport: true,
              caption: "Ici, le style s'écrit dans une balise style, au-dessus du contenu.",
              mission: "Complète la page : une liste d'au moins trois compétences, un fond coloré et une mise en page flex ou grid.",
              starter: `<style>\n  /* Ta mise en forme ici */\n</style>\n<header>Mon portfolio</header>\n<main>\n  <h1>Awa Koné</h1>\n  <p>Développeuse web en formation.</p>\n  <!-- ajoute une liste de compétences -->\n</main>\n<footer>Contact</footer>`,
              solution: `<style>\n  body { font-family: Arial, sans-serif; background: #f4fff8; }\n  header { background: #0b5d2e; color: white; padding: 12px; }\n  main { display: flex; gap: 20px; padding: 12px; }\n  footer { text-align: center; }\n</style>\n<header>Mon portfolio</header>\n<main>\n  <section>\n    <h1>Awa Koné</h1>\n    <p>Développeuse web en formation.</p>\n  </section>\n  <section>\n    <h2>Mes compétences</h2>\n    <ul>\n      <li>HTML</li>\n      <li>CSS</li>\n      <li>Flexbox</li>\n    </ul>\n  </section>\n</main>\n<footer>awa@exemple.com</footer>`,
              checks: [
                { label: "Une liste d'au moins trois éléments li", re: many("li", 3) },
                { label: "Une mise en page flex ou grid dans la balise style", re: "<style[^>]*>[\\s\\S]*display\\s*:\\s*(?:flex|grid)[\\s\\S]*</style\\s*>" },
                { label: "Une couleur de fond (background)", re: "background(?:-color)?\\s*:\\s*\\S" },
              ],
              xp: 40,
            },
            tip: "Bravo, tu as fini la partie jeu. Il ne te reste que le quiz pour valider le cours.",
          },
        ],
        quiz: [
          { q: "Sur quel élément écrit-on display flex ?", options: ["Sur chaque enfant", "Sur le conteneur parent", "Sur le titre de la page"], answer: 1, why: "Flexbox s'active sur le parent : ce sont ses enfants qui deviennent flexibles." },
          { q: "Que fait justify-content avec la valeur space-between ?", options: ["Il répartit les éléments avec de l'espace entre eux", "Il empile les éléments", "Il agrandit le texte"], answer: 0, why: "Le premier élément se colle au début, le dernier à la fin, et l'espace se répartit entre eux." },
          { q: "À quoi sert une media query ?", options: ["À charger une vidéo", "À envoyer un formulaire", "À appliquer des règles selon la taille de l'écran"], answer: 2, why: "Elle active des règles seulement si la condition est vraie, par exemple un écran de 600 pixels ou moins." },
          { q: "Que signifie 1fr dans une grille ?", options: ["Une part de l'espace disponible", "Un pixel", "Une seconde"], answer: 0, why: "fr est une fraction de l'espace libre : trois colonnes de 1fr se partagent la largeur à parts égales." },
          { q: "Quel outil convient le mieux à une galerie en lignes et en colonnes ?", options: ["Flexbox seul", "Grid", "Un tableau HTML"], answer: 1, why: "Grid pense en lignes et en colonnes. Un tableau HTML sert aux données, pas à la mise en page." },
        ],
        exercise: {
          title: "Ma galerie adaptative",
          instructions: [
            "Crée un conteneur avec six cases numérotées.",
            "Affiche-les en grille de trois colonnes avec un espace de 10 pixels.",
            "Sur un écran de 600 pixels ou moins, passe à une seule colonne.",
            "Teste l'aperçu en mode Téléphone.",
          ],
          correction: [
            "Un div de classe galerie contient six div de classe case.",
            "Sur .galerie : display grid, grid-template-columns repeat(3, 1fr) et gap 10px.",
            "Une media query max-width 600px qui met grid-template-columns à 1fr sur .galerie.",
            "Bascule sur Téléphone : les cases doivent s'empiler en une seule colonne.",
          ],
          visual: {
            type: "code",
            language: "css",
            caption: "Une solution possible du CSS.",
            code: `.galerie {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 10px;\n}\n@media (max-width: 600px) {\n  .galerie {\n    grid-template-columns: 1fr;\n  }\n}`,
          },
        },
      },
    ],
  },
};