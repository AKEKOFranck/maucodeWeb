// Contenu pédagogique. Pour ajouter un module : copie un bloc dans "modules".
// Types de visuels : scene | grid | slide
export const COURSES = {
  word: {
    software: "Word",
    emoji: "📄",
    accent: "#2b6cdf",
    title: "Word, la feuille magique",
    intro: "Tu vas apprendre à écrire, à ranger et à embellir un texte. C'est comme jouer avec une feuille de papier, mais sur l'ordinateur.",
    modules: [
      {
        slug: "decouvrir-word",
        title: "Découvrir Word",
        emoji: "🧭",
        intro: "On ouvre Word pour la première fois et on fait connaissance.",
        chapters: [
          {
            title: "Word, c'est une feuille de papier",
            explain: [
              "Imagine une feuille blanche dans ton cahier. Word, c'est la même chose, mais sur l'écran.",
              "Tu écris avec le clavier, comme avec un stylo. Tu t'es trompé ? Pas de gomme : appuie sur la touche ⌫ (Retour arrière) et la lettre disparaît.",
            ],
            visual: { type: "scene", items: [{ emoji: "📄", label: "La feuille blanche" }, { emoji: "⌨️", label: "Le clavier" }, { emoji: "✍️", label: "Ton texte" }], caption: "Tu tapes sur le clavier, et ton texte apparaît sur la feuille." },
            tip: "Le petit trait qui clignote s'appelle le curseur. C'est lui qui montre où la prochaine lettre va s'écrire.",
          },
          {
            title: "Le ruban : ta boîte à outils",
            explain: [
              "En haut de Word, il y a une grande bande pleine de boutons. On l'appelle le ruban.",
              "Chaque bouton sait faire une seule chose. Si tu ne sais pas ce qu'il fait, pose la souris dessus sans cliquer : son nom apparaît.",
            ],
            visual: { type: "scene", arrows: false, items: [{ emoji: "🅱️", label: "Gras" }, { emoji: "🔤", label: "Police" }, { emoji: "🎨", label: "Couleur" }, { emoji: "💾", label: "Enregistrer" }], caption: "Quelques boutons du ruban, comme des outils dans une trousse." },
            tip: "Tu ne peux pas casser Word en cliquant. Si ça change quelque chose que tu n'aimes pas, appuie sur Ctrl + Z pour revenir en arrière.",
          },
          {
            title: "Enregistrer : ranger ton travail",
            explain: [
              "Si tu fermes Word sans enregistrer, ton texte s'envole, comme un dessin que tu jettes à la poubelle.",
              "Pour le garder : appuie sur Ctrl + S en même temps. Donne-lui un nom, par exemple « mon premier texte », puis clique sur Enregistrer.",
            ],
            visual: { type: "scene", items: [{ emoji: "📝", label: "Ton texte" }, { emoji: "💾", label: "Ctrl + S" }, { emoji: "🗂️", label: "Rangé dans ton ordinateur" }], caption: "Enregistrer, c'est ranger ton texte dans un tiroir pour le retrouver." },
            tip: "Enregistre souvent, toutes les 5 minutes. Ça ne coûte rien et ça évite les mauvaises surprises.",
          },
        ],
        quiz: [
          { q: "Quelle touche efface la lettre que je viens d'écrire ?", options: ["⌫ Retour arrière", "Ctrl + S", "F5"], answer: 0, why: "⌫ efface la lettre juste avant le curseur, comme une gomme." },
          { q: "Comment enregistrer mon texte rapidement ?", options: ["Ctrl + Z", "Ctrl + S", "Fermer Word"], answer: 1, why: "S comme Sauvegarder. Ctrl + Z, lui, sert à revenir en arrière." },
          { q: "Comment savoir ce que fait un bouton du ruban ?", options: ["Je pose la souris dessus", "Je l'ignore", "J'éteins l'ordinateur"], answer: 0, why: "Son nom apparaît dans une petite bulle, sans rien changer à ton texte." },
        ],
        exercise: {
          title: "Ta première carte",
          instructions: ["Ouvre Word et clique sur « Document vierge ».", "Écris : « Bonjour, je m'appelle » puis ton prénom.", "Écris sur une nouvelle ligne (touche Entrée) : « J'apprends Word avec Maucode ».", "Appuie sur Ctrl + S et enregistre sous le nom « carte-prenom »."],
          correction: ["Après « Document vierge », ta feuille blanche s'ouvre.", "Tu dois voir ta phrase avec ton prénom à la fin.", "La touche Entrée te fait descendre sur la ligne d'en dessous.", "Dans la liste de tes fichiers, tu vois « carte-prenom » : c'est gagné !"],
        },
      },
      {
        slug: "mettre-en-forme",
        title: "Rendre ton texte joli",
        emoji: "🎨",
        intro: "Gras, couleurs, titres : on habille le texte pour qu'il se lise bien.",
        chapters: [
          {
            title: "Gras, italique, souligné",
            explain: ["Pour changer un mot, il faut d'abord le choisir. On dit le sélectionner : appuie sur le bouton gauche de la souris, glisse sur le mot, puis relâche. Il devient bleu.", "Ensuite clique sur le bouton B (gras), I (italique) ou S (souligné) du ruban."],
            visual: { type: "scene", items: [{ emoji: "🖱️", label: "Je sélectionne le mot" }, { emoji: "🅱️", label: "Je clique sur B" }, { emoji: "✨", label: "Le mot est en gras" }], caption: "D'abord choisir, ensuite décorer." },
            tip: "Raccourcis : Ctrl + B pour le gras, Ctrl + I pour l'italique.",
          },
          {
            title: "Le titre et la taille des lettres",
            explain: ["Un titre doit être plus gros que le reste, comme sur la couverture d'un livre.", "Sélectionne ta ligne, puis choisis un nombre plus grand dans la petite case des tailles (par exemple 24). Plus le nombre est grand, plus les lettres sont grosses."],
            visual: { type: "scene", arrows: false, items: [{ emoji: "🔡", label: "Taille 11 : texte normal" }, { emoji: "🔠", label: "Taille 24 : titre" }], caption: "Un titre grand, un texte petit : on comprend tout de suite." },
            tip: "Garde le même style pour tous tes titres, le document sera plus propre.",
          },
          {
            title: "Aligner : gauche, centre, droite",
            explain: ["Aligner, c'est choisir où se range ton texte sur la feuille : collé à gauche, au milieu ou à droite.", "Les trois boutons à côté du gras font ce travail. Un titre se met souvent au centre."],
            visual: { type: "scene", arrows: false, items: [{ emoji: "⬅️", label: "À gauche" }, { emoji: "↔️", label: "Au centre" }, { emoji: "➡️", label: "À droite" }], caption: "Trois façons de ranger le texte." },
            tip: "Raccourci pour centrer : Ctrl + E.",
          },
        ],
        quiz: [
          { q: "Avant de mettre un mot en gras, que dois-je faire ?", options: ["Le sélectionner", "Enregistrer", "Fermer Word"], answer: 0, why: "Word doit savoir quel mot tu veux changer." },
          { q: "Quelle taille est la plus grosse ?", options: ["10", "12", "28"], answer: 2, why: "Plus le nombre est grand, plus les lettres sont grandes." },
          { q: "Où met-on souvent un titre ?", options: ["Au centre", "Dans un coin caché", "En bas de page"], answer: 0, why: "Centré, il se voit tout de suite." },
        ],
        exercise: {
          title: "Mon mini CV",
          instructions: ["Écris ton prénom et ton nom sur la première ligne.", "Mets-les en taille 24, en gras, centrés.", "Dessous, écris « Mes qualités » puis 3 qualités, une par ligne.", "Mets « Mes qualités » en gras et enregistre."],
          correction: ["Sélectionne la ligne du nom avec la souris.", "Taille 24, bouton B, bouton centrer (ou Ctrl + E).", "Une qualité par ligne : appuie sur Entrée entre chaque.", "Sélectionne « Mes qualités », clique sur B, puis Ctrl + S."],
        },
      },
    ],
  },

  excel: {
    software: "Excel",
    emoji: "📊",
    accent: "#1e8a4c",
    title: "Excel, le grand cahier à carreaux",
    intro: "Excel range les chiffres dans des cases et sait faire les calculs tout seul. Tu vas voir, c'est comme une calculatrice géante.",
    modules: [
      {
        slug: "decouvrir-excel",
        title: "Découvrir Excel",
        emoji: "🧭",
        intro: "On apprend à lire le tableau et à écrire dans les cases.",
        chapters: [
          {
            title: "Un grand cahier à carreaux",
            explain: ["Excel est un immense cahier à carreaux. Chaque petit carreau s'appelle une cellule (ou une case).", "Les colonnes vont de haut en bas et portent des lettres : A, B, C. Les lignes vont de gauche à droite et portent des numéros : 1, 2, 3."],
            visual: { type: "grid", rows: [["", "", ""], ["", "", ""], ["", "", ""]], highlight: ["B2"], caption: "La case jaune est dans la colonne B et sur la ligne 2 : elle s'appelle B2." },
            tip: "Le nom de la case choisie s'affiche en haut à gauche, dans la petite boîte « Zone Nom ».",
          },
          {
            title: "Écrire dans une case",
            explain: ["Clique sur une case, tape ce que tu veux, puis appuie sur Entrée : tu passes à la case en dessous.", "Pour changer ce qui est écrit, clique sur la case et écris par-dessus. Pour effacer, appuie sur la touche Suppr."],
            visual: { type: "grid", rows: [["Fruit", "Prix"], ["Pomme", "200"], ["Mangue", "500"]], highlight: ["A2"], caption: "Un petit tableau : les fruits à gauche, les prix à droite." },
            tip: "Pour aller à droite, utilise la touche Tab. Pour aller en bas, la touche Entrée.",
          },
          {
            title: "Les chiffres et les mots",
            explain: ["Excel sait faire la différence entre un mot (Pomme) et un nombre (200).", "Les nombres se collent à droite de la case. Les mots se collent à gauche. Ça te montre qu'Excel a bien compris."],
            visual: { type: "scene", arrows: false, items: [{ emoji: "🔤", label: "Mots : à gauche" }, { emoji: "🔢", label: "Nombres : à droite" }], caption: "Mots à gauche, nombres à droite." },
            tip: "Si ton nombre est collé à gauche, vérifie que tu n'as pas tapé une lettre par erreur.",
          },
        ],
        quiz: [
          { q: "Comment s'appelle un petit carreau d'Excel ?", options: ["Une cellule", "Une page", "Un tiroir"], answer: 0, why: "Une cellule, ou case, est l'endroit où l'on écrit." },
          { q: "Une case est dans la colonne C, ligne 4. Quel est son nom ?", options: ["4C", "C4", "CC"], answer: 1, why: "On dit toujours la lettre d'abord, puis le numéro : C4." },
          { q: "Quelle touche te fait descendre à la case du dessous ?", options: ["Entrée", "Échap", "Suppr"], answer: 0, why: "Entrée valide ce que tu as écrit et descend d'une case." },
        ],
        exercise: {
          title: "Ma liste de courses",
          instructions: ["En A1 écris « Article », en B1 écris « Prix ».", "Écris 3 articles dans la colonne A (A2, A3, A4).", "Écris leur prix dans la colonne B.", "Enregistre sous le nom « courses »."],
          correction: ["Clique sur A1, écris Article, appuie sur Tab, écris Prix.", "Descends avec Entrée pour écrire les articles.", "Les prix se mettent tout seuls à droite : ce sont des nombres.", "Ctrl + S, nom « courses »."],
          visual: { type: "grid", rows: [["Article", "Prix"], ["Riz", "1500"], ["Huile", "1200"], ["Sucre", "700"]], highlight: [], caption: "Voilà à quoi doit ressembler ton tableau." },
        },
      },
      {
        slug: "premieres-formules",
        title: "Faire des calculs",
        emoji: "🧮",
        intro: "Excel compte à ta place : tu écris la formule, il donne la réponse.",
        chapters: [
          {
            title: "Le signe égal : la phrase magique",
            explain: ["Pour qu'Excel calcule, commence toujours par le signe =. C'est comme dire « Excel, calcule ! ».", "Exemple : écris =2+3 puis Entrée. Excel écrit 5."],
            visual: { type: "scene", items: [{ emoji: "⌨️", label: "Je tape =2+3" }, { emoji: "🧠", label: "Excel réfléchit" }, { emoji: "5️⃣", label: "Il écrit 5" }], caption: "Le signe = réveille le cerveau d'Excel." },
            tip: "Les signes : + pour ajouter, - pour enlever, * pour multiplier, / pour partager.",
          },
          {
            title: "Calculer avec les cases",
            explain: ["Au lieu d'écrire les nombres, tu peux écrire le nom des cases. Exemple : =B2+B3.", "Le grand avantage : si tu changes un prix, le résultat change tout seul !"],
            visual: { type: "grid", rows: [["Pomme", "200"], ["Mangue", "500"], ["Total", "=B1+B2"]], highlight: ["B3"], caption: "En B3, Excel va additionner B1 et B2 et afficher 700." },
            tip: "Au lieu de taper B1, tu peux cliquer sur la case : Excel écrit son nom pour toi.",
          },
          {
            title: "SOMME : additionner beaucoup de cases",
            explain: ["Additionner 20 cases une à une, c'est long. La formule SOMME le fait pour toi : =SOMME(B1:B5).", "Les deux points « : » veulent dire « de B1 jusqu'à B5 »."],
            visual: { type: "grid", rows: [["Riz", "1500"], ["Huile", "1200"], ["Sucre", "700"], ["Total", "=SOMME(B1:B3)"]], highlight: ["B4"], caption: "SOMME(B1:B3) additionne les trois prix : 3400." },
            tip: "Tu peux aussi cliquer sur le bouton Σ dans le ruban : Excel devine la somme tout seul.",
          },
        ],
        quiz: [
          { q: "Par quel signe commence une formule ?", options: ["=", "?", "#"], answer: 0, why: "Sans le signe =, Excel pense que c'est juste un texte." },
          { q: "Que fait =SOMME(B1:B3) ?", options: ["Elle efface B1 à B3", "Elle additionne B1, B2 et B3", "Elle colore B1 à B3"], answer: 1, why: "SOMME additionne toutes les cases de B1 à B3." },
          { q: "Je change un prix. Que devient le total ?", options: ["Il ne bouge pas", "Il change tout seul", "Excel se ferme"], answer: 1, why: "Les formules suivent les cases : c'est la magie d'Excel." },
        ],
        exercise: {
          title: "Le total de mes courses",
          instructions: ["Reprends ton fichier « courses ».", "En A5 écris « Total ».", "En B5 écris une formule SOMME pour additionner tes prix.", "Change un prix et regarde le total bouger."],
          correction: ["Ouvre « courses » avec Fichier puis Ouvrir.", "Clique sur A5 et écris Total.", "En B5 écris =SOMME(B2:B4) puis Entrée.", "Change B2 : le total change aussi, bravo !"],
          visual: { type: "grid", rows: [["Article", "Prix"], ["Riz", "1500"], ["Huile", "1200"], ["Sucre", "700"], ["Total", "=SOMME(B2:B4)"]], highlight: ["B5"], caption: "Résultat attendu : 3400 dans la case B5." },
        },
      },
    ],
  },

  powerpoint: {
    software: "PowerPoint",
    emoji: "🎤",
    accent: "#d9531e",
    title: "PowerPoint, le livre d'images",
    intro: "PowerPoint sert à montrer des idées aux autres, page après page. Tu vas créer des diapositives simples et belles, puis les présenter.",
    modules: [
      {
        slug: "premiere-presentation",
        title: "Ma première présentation",
        emoji: "🎬",
        intro: "On crée des diapositives et on y écrit nos idées.",
        chapters: [
          {
            title: "Une diapositive, c'est une page de livre",
            explain: ["Une présentation PowerPoint ressemble à un livre d'images. Chaque page s'appelle une diapositive (ou un slide).", "Sur la gauche, tu vois toutes tes pages en petit. Celle sur laquelle tu cliques s'affiche en grand au milieu."],
            visual: { type: "slide", title: "Mon titre", bullets: ["Une idée", "Une autre idée"], caption: "Une diapositive : un titre en haut, quelques mots dessous." },
            tip: "Une idée par diapositive. Si tu veux dire deux choses, fais deux pages.",
          },
          {
            title: "Ajouter une nouvelle diapositive",
            explain: ["Pour ajouter une page : clique sur « Nouvelle diapositive » dans l'onglet Accueil.", "Une nouvelle page blanche apparaît juste après celle que tu avais choisie."],
            visual: { type: "scene", items: [{ emoji: "🖱️", label: "Je clique sur Nouvelle diapositive" }, { emoji: "➕", label: "Une page s'ajoute" }], caption: "Un clic, une nouvelle page." },
            tip: "Raccourci : Ctrl + M ajoute une diapositive.",
          },
          {
            title: "Écrire dans les cadres",
            explain: ["Les cadres avec « Cliquez pour ajouter un titre » sont des boîtes à texte. Clique dedans et écris.", "Écris peu de mots, de grosses lettres. Les gens regardent l'écran en t'écoutant."],
            visual: { type: "slide", title: "Mes vacances", bullets: ["La plage", "Ma famille", "Les jeux"], caption: "Trois idées courtes valent mieux qu'un grand paragraphe." },
            tip: "Pas plus de 5 lignes par diapositive.",
          },
        ],
        quiz: [
          { q: "Comment s'appelle une page de PowerPoint ?", options: ["Une diapositive", "Une cellule", "Un dossier"], answer: 0, why: "Une diapositive, ou slide, est une page de ta présentation." },
          { q: "Quel raccourci ajoute une diapositive ?", options: ["Ctrl + M", "Ctrl + Z", "Ctrl + P"], answer: 0, why: "M comme Meilleure nouvelle page : essaie-le !" },
          { q: "Combien de mots mettre sur une diapositive ?", options: ["Un roman entier", "Peu de mots", "Aucun mot, jamais"], answer: 1, why: "Peu de mots : on les lit d'un coup d'œil." },
        ],
        exercise: {
          title: "Je me présente en 2 diapositives",
          instructions: ["Ouvre PowerPoint et choisis « Présentation vierge ».", "Diapositive 1 : écris ton prénom en titre.", "Ajoute une diapositive : titre « Ce que j'aime », avec 3 idées.", "Enregistre sous le nom « moi »."],
          correction: ["La première page propose un titre et un sous-titre.", "Écris ton prénom dans le grand cadre du haut.", "Nouvelle diapositive, titre puis 3 lignes (Entrée entre chaque).", "Ctrl + S, nom « moi »."],
          visual: { type: "slide", title: "Ce que j'aime", bullets: ["Le football", "La musique", "Les gâteaux"], caption: "Exemple de la deuxième diapositive." },
        },
      },
      {
        slug: "belle-presentation",
        title: "Faire joli et présenter",
        emoji: "🌈",
        intro: "Couleurs, images, puis on présente devant tout le monde.",
        chapters: [
          {
            title: "Choisir un joli thème",
            explain: ["Un thème, c'est un habit tout prêt pour tes diapositives : couleurs et formes déjà choisies.", "Va dans l'onglet Création, passe la souris sur les thèmes, puis clique sur celui qui te plaît."],
            visual: { type: "scene", arrows: false, items: [{ emoji: "⬜", label: "Page blanche" }, { emoji: "🎨", label: "Thème coloré" }], caption: "Un thème habille toutes tes pages d'un seul clic." },
            tip: "Choisis un thème où l'on lit bien : lettres foncées sur fond clair, ou l'inverse.",
          },
          {
            title: "Ajouter une image",
            explain: ["Une image aide à comprendre. Onglet Insertion, puis Images, puis choisis une photo dans ton ordinateur.", "Tu peux la déplacer avec la souris et la rendre plus petite en tirant sur un coin."],
            visual: { type: "slide", title: "Mon chat", bullets: ["🐱 Il dort beaucoup", "Il aime le poisson"], caption: "Une image rend la page vivante." },
            tip: "Tire toujours par un coin, pas par un côté, sinon l'image s'écrase.",
          },
          {
            title: "Présenter : le grand moment",
            explain: ["Appuie sur la touche F5 : ta présentation passe en plein écran, comme au cinéma.", "Avec la flèche → tu vas à la page suivante. Avec Échap tu sors."],
            visual: { type: "scene", items: [{ emoji: "⌨️", label: "J'appuie sur F5" }, { emoji: "📺", label: "Plein écran" }, { emoji: "👏", label: "Les gens écoutent" }], caption: "F5 pour commencer, Échap pour arrêter." },
            tip: "Regarde les gens, pas l'écran. L'écran t'aide, c'est toi qui parles.",
          },
        ],
        quiz: [
          { q: "Quelle touche lance la présentation ?", options: ["F5", "F1", "Suppr"], answer: 0, why: "F5 lance le diaporama en plein écran." },
          { q: "Comment passer à la page suivante ?", options: ["Flèche →", "Échap", "Ctrl + S"], answer: 0, why: "La flèche droite avance, la flèche gauche recule." },
          { q: "Comment agrandir une image sans l'écraser ?", options: ["Tirer par un coin", "Tirer par un côté", "La supprimer"], answer: 0, why: "Les coins gardent les bonnes proportions." },
        ],
        exercise: {
          title: "Ma présentation finale",
          instructions: ["Reprends ta présentation « moi ».", "Choisis un thème dans l'onglet Création.", "Ajoute une image sur une diapositive.", "Lance avec F5 et présente-toi à voix haute."],
          correction: ["Fichier puis Ouvrir, choisis « moi ».", "Création puis clic sur un thème.", "Insertion, Images, choisis une photo.", "F5, avance avec →, quitte avec Échap. Bravo !"],
        },
      },
    ],
  },
};

export const getCourse = (slug) => COURSES[slug] ?? null;
export const getModule = (slug, moduleSlug) =>
  COURSES[slug]?.modules.find((m) => m.slug === moduleSlug) ?? null;