// Contenu pédagogique. Pour ajouter un module : copie un bloc dans "modules".
// Types de visuels : scene | grid | slide
export const COURSES = {
  word: {
    software: "Word",
    icon: "FaFileWord",
    accent: "#2b6cdf",
    title: "Word, la feuille magique",
    intro: "Tu vas apprendre à écrire, à ranger et à embellir un texte. C'est comme jouer avec une feuille de papier, mais sur l'ordinateur.",
    modules: [
      {
        slug: "decouvrir-word",
        title: "Découvrir Word",
        icon: "FaCompass",
        intro: "On ouvre Word pour la première fois et on fait connaissance.",
        chapters: [
          {
            title: "Word, c'est une feuille de papier",
            explain: [
              "Imagine une feuille blanche dans ton cahier. Word, c'est la même chose, mais sur l'écran.",
              "Tu écris avec le clavier, comme avec un stylo. Tu t'es trompé ? Pas de gomme : appuie sur la touche ⌫ (Retour arrière) et la lettre disparaît.",
            ],
            visual: { type: "scene", items: [{ icon: "FaFile", label: "La feuille blanche" }, { icon: "FaKeyboard", label: "Le clavier" }, { icon: "FaPen", label: "Ton texte" }], caption: "Tu tapes sur le clavier, et ton texte apparaît sur la feuille." },
            tip: "Le petit trait qui clignote s'appelle le curseur. C'est lui qui montre où la prochaine lettre va s'écrire.",
          },
          {
            title: "Le ruban : ta boîte à outils",
            explain: [
              "En haut de Word, il y a une grande bande pleine de boutons. On l'appelle le ruban.",
              "Chaque bouton sait faire une seule chose. Si tu ne sais pas ce qu'il fait, pose la souris dessus sans cliquer : son nom apparaît.",
            ],
            visual: { type: "scene", arrows: false, items: [{ icon: "FaBold", label: "Gras" }, { icon: "FaFont", label: "Police" }, { icon: "FaPalette", label: "Couleur" }, { icon: "FaFloppyDisk", label: "Enregistrer" }], caption: "Quelques boutons du ruban, comme des outils dans une trousse." },
            tip: "Tu ne peux pas casser Word en cliquant. Si ça change quelque chose que tu n'aimes pas, appuie sur Ctrl + Z pour revenir en arrière.",
          },
          {
            title: "Enregistrer : ranger ton travail",
            explain: [
              "Si tu fermes Word sans enregistrer, ton texte s'envole, comme un dessin que tu jettes à la poubelle.",
              "Pour le garder : appuie sur Ctrl + S en même temps. Donne-lui un nom, par exemple « mon premier texte », puis clique sur Enregistrer.",
            ],
            visual: { type: "scene", items: [{ icon: "FaPenToSquare", label: "Ton texte" }, { icon: "FaFloppyDisk", label: "Ctrl + S" }, { icon: "FaFolderOpen", label: "Rangé dans ton ordinateur" }], caption: "Enregistrer, c'est ranger ton texte dans un tiroir pour le retrouver." },
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
        icon: "FaPalette",
        intro: "Gras, couleurs, titres : on habille le texte pour qu'il se lise bien.",
        chapters: [
          {
            title: "Gras, italique, souligné",
            explain: ["Pour changer un mot, il faut d'abord le choisir. On dit le sélectionner : appuie sur le bouton gauche de la souris, glisse sur le mot, puis relâche. Il devient bleu.", "Ensuite clique sur le bouton B (gras), I (italique) ou S (souligné) du ruban."],
            visual: { type: "scene", items: [{ icon: "FaArrowPointer", label: "Je sélectionne le mot" }, { icon: "FaBold", label: "Je clique sur B" }, { icon: "FaWandMagicSparkles", label: "Le mot est en gras" }], caption: "D'abord choisir, ensuite décorer." },
            tip: "Raccourcis : Ctrl + B pour le gras, Ctrl + I pour l'italique.",
          },
          {
            title: "Le titre et la taille des lettres",
            explain: ["Un titre doit être plus gros que le reste, comme sur la couverture d'un livre.", "Sélectionne ta ligne, puis choisis un nombre plus grand dans la petite case des tailles (par exemple 24). Plus le nombre est grand, plus les lettres sont grosses."],
            visual: { type: "scene", arrows: false, items: [{ icon: "FaFont", label: "Taille 11 : texte normal" }, { icon: "FaHeading", label: "Taille 24 : titre" }], caption: "Un titre grand, un texte petit : on comprend tout de suite." },
            tip: "Garde le même style pour tous tes titres, le document sera plus propre.",
          },
          {
            title: "Aligner : gauche, centre, droite",
            explain: ["Aligner, c'est choisir où se range ton texte sur la feuille : collé à gauche, au milieu ou à droite.", "Les trois boutons à côté du gras font ce travail. Un titre se met souvent au centre."],
            visual: { type: "scene", arrows: false, items: [{ icon: "FaAlignLeft", label: "À gauche" }, { icon: "FaAlignCenter", label: "Au centre" }, { icon: "FaAlignRight", label: "À droite" }], caption: "Trois façons de ranger le texte." },
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
      {
        slug: "listes-et-images",
        added: "2026-10-14",
        title: "Listes et images",
        icon: "FaImage",
        intro: "On range des idées en liste et on ajoute des images pour illustrer.",
        chapters: [
          {
            title: "La liste à puces",
            explain: ["Une liste à puces, c'est comme ta liste de courses : un petit rond devant chaque idée.", "Sélectionne tes lignes, puis clique sur le bouton des puces dans le ruban (trois petits ronds avec des traits)."],
            visual: { type: "scene", items: [{ icon: "FaPenToSquare", label: "Mes lignes" }, { icon: "FaListUl", label: "Bouton puces" }, { icon: "FaClipboardList", label: "Une liste propre" }], caption: "Chaque ligne reçoit un petit rond devant elle." },
            tip: "Pour finir la liste, appuie deux fois sur Entrée.",
          },
          {
            title: "La liste numérotée",
            explain: ["Quand l'ordre compte (comme les étapes d'une recette), on numérote : 1, 2, 3.", "Le bouton est à côté de celui des puces. Il montre les chiffres 1, 2, 3 avec des traits."],
            visual: { type: "scene", arrows: false, items: [{ icon: "Fa1", label: "D'abord" }, { icon: "Fa2", label: "Ensuite" }, { icon: "Fa3", label: "Enfin" }], caption: "Les numéros montrent dans quel ordre faire les choses." },
            tip: "Puces quand l'ordre ne compte pas, numéros quand il compte.",
          },
          {
            title: "Ajouter une image",
            explain: ["Une image aide à comprendre. Va dans l'onglet Insertion, clique sur Images, puis choisis une photo dans ton ordinateur.", "Clique sur l'image pour la déplacer. Pour la rendre plus petite, tire sur un coin."],
            visual: { type: "scene", items: [{ icon: "FaArrowPointer", label: "Insertion, Images" }, { icon: "FaFolderOpen", label: "Je choisis la photo" }, { icon: "FaImage", label: "Elle arrive sur la page" }], caption: "Trois gestes pour mettre une photo dans ton texte." },
            tip: "Tire toujours par un coin, jamais par un côté, sinon l'image s'écrase.",
          },
        ],
        quiz: [
          { q: "Quand utiliser une liste numérotée ?", options: ["Quand l'ordre compte", "Jamais", "Pour mettre une image"], answer: 0, why: "Les numéros disent quoi faire en premier, en deuxième, etc." },
          { q: "Où trouver le bouton pour ajouter une image ?", options: ["Onglet Insertion", "Onglet Accueil, bouton Gras", "Dans la corbeille"], answer: 0, why: "Tout ce qu'on ajoute (images, tableaux) se trouve dans Insertion." },
          { q: "Comment rendre une image plus petite sans l'écraser ?", options: ["Tirer sur un coin", "Tirer sur un côté", "La supprimer"], answer: 0, why: "Les coins gardent les bonnes proportions." },
        ],
        exercise: {
          title: "Ma liste d'affaires pour l'école",
          instructions: ["Écris « Mes affaires » en titre, en gras.", "Écris 4 affaires, une par ligne.", "Mets-les en liste à puces.", "Ajoute une image en dessous et enregistre sous « affaires »."],
          correction: ["Sélectionne le titre puis clique sur B.", "Appuie sur Entrée entre chaque affaire.", "Sélectionne les 4 lignes puis clique sur le bouton des puces.", "Insertion, Images, choisis une photo, puis Ctrl + S."],
        },
      },
      {
        slug: "copier-et-imprimer",
        added: "2026-10-14",
        title: "Copier, imprimer, partager",
        icon: "FaPrint",
        intro: "On apprend à copier un texte, à l'imprimer et à l'envoyer en PDF.",
        chapters: [
          {
            title: "Copier, couper, coller",
            explain: ["Copier, c'est faire une photocopie d'un texte. Coller, c'est la poser ailleurs.", "Sélectionne le texte, appuie sur Ctrl + C (copier), clique où tu veux, puis Ctrl + V (coller). Ctrl + X coupe : le texte part de son ancienne place."],
            visual: { type: "scene", items: [{ icon: "FaArrowPointer", label: "Je sélectionne" }, { icon: "FaCopy", label: "Ctrl + C copie" }, { icon: "FaPaste", label: "Ctrl + V colle" }], caption: "Copier, puis coller : le texte existe deux fois." },
            tip: "Pour te souvenir : C comme Copier, V est juste à côté sur le clavier.",
          },
          {
            title: "Voir avant d'imprimer",
            explain: ["Imprimer coûte du papier. On regarde d'abord à quoi ressemblera la page.", "Appuie sur Ctrl + P. À droite, tu vois ta page telle qu'elle sortira de l'imprimante."],
            visual: { type: "scene", items: [{ icon: "FaKeyboard", label: "Ctrl + P" }, { icon: "FaEye", label: "Je regarde l'aperçu" }, { icon: "FaPrint", label: "J'imprime" }], caption: "Toujours regarder avant d'imprimer." },
            tip: "Tu peux choisir le nombre de copies dans la petite case « Copies ».",
          },
          {
            title: "Enregistrer en PDF",
            explain: ["Un PDF, c'est ton document figé, impossible à abîmer. On peut l'envoyer par e-mail ou WhatsApp.", "Choisis Fichier, puis Enregistrer sous, puis le type PDF."],
            visual: { type: "scene", items: [{ icon: "FaFileWord", label: "Mon document Word" }, { icon: "FaFilePdf", label: "Enregistrer en PDF" }, { icon: "FaPaperPlane", label: "Je l'envoie" }], caption: "Le PDF s'ouvre pareil sur tous les téléphones." },
            tip: "Envoie un PDF, pas un fichier Word : la mise en page ne bougera pas.",
          },
        ],
        quiz: [
          { q: "Quel raccourci colle un texte copié ?", options: ["Ctrl + V", "Ctrl + C", "Ctrl + X"], answer: 0, why: "Ctrl + V colle. Ctrl + C copie." },
          { q: "Que fait Ctrl + P ?", options: ["Ouvre l'impression", "Efface le texte", "Ferme Word"], answer: 0, why: "P comme Print, imprimer en anglais." },
          { q: "Pourquoi envoyer un PDF ?", options: ["La mise en page ne bouge pas", "Il est plus lourd", "Il est caché"], answer: 0, why: "Un PDF s'affiche partout de la même façon." },
        ],
        exercise: {
          title: "Mon affiche en PDF",
          instructions: ["Écris « Fête de l'école » en gros titre centré.", "Copie ce titre et colle-le en bas de la page.", "Regarde l'aperçu avec Ctrl + P.", "Enregistre-le en PDF sous le nom « affiche »."],
          correction: ["Sélectionne le titre, mets-le en taille 28, gras et centré.", "Ctrl + C, clique en bas, puis Ctrl + V.", "Ctrl + P, regarde à droite puis ferme.", "Fichier, Enregistrer sous, type PDF, nom « affiche »."],
        },
      },
    ],
  },

  excel: {
    software: "Excel",
    icon: "FaFileExcel",
    accent: "#1e8a4c",
    title: "Excel, le grand cahier à carreaux",
    intro: "Excel range les chiffres dans des cases et sait faire les calculs tout seul. Tu vas voir, c'est comme une calculatrice géante.",
    modules: [
      {
        slug: "decouvrir-excel",
        title: "Découvrir Excel",
        icon: "FaCompass",
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
            visual: { type: "scene", arrows: false, items: [{ icon: "FaFont", label: "Mots : à gauche" }, { icon: "FaHashtag", label: "Nombres : à droite" }], caption: "Mots à gauche, nombres à droite." },
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
        icon: "FaCalculator",
        intro: "Excel compte à ta place : tu écris la formule, il donne la réponse.",
        chapters: [
          {
            title: "Le signe égal : la phrase magique",
            explain: ["Pour qu'Excel calcule, commence toujours par le signe =. C'est comme dire « Excel, calcule ! ».", "Exemple : écris =2+3 puis Entrée. Excel écrit 5."],
            visual: { type: "scene", items: [{ icon: "FaKeyboard", label: "Je tape =2+3" }, { icon: "FaBrain", label: "Excel réfléchit" }, { icon: "Fa5", label: "Il écrit 5" }], caption: "Le signe = réveille le cerveau d'Excel." },
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
      {
        slug: "tableau-bien-presente",
        added: "2026-10-14",
        title: "Un tableau bien présenté",
        icon: "FaTableCells",
        intro: "On rend le tableau joli et facile à lire.",
        chapters: [
          {
            title: "Agrandir une colonne",
            explain: ["Parfois un mot est coupé, car la colonne est trop étroite.", "Place la souris sur le trait entre deux lettres (entre A et B). Quand la souris devient une double flèche, fais un double clic : la colonne s'ajuste toute seule."],
            visual: { type: "grid", rows: [["Ananas bien mûr", "300"], ["Pomme", "200"]], highlight: ["A1"], caption: "La colonne A est assez large pour lire le mot en entier." },
            tip: "Tu peux aussi tirer le trait avec la souris pour choisir la largeur.",
          },
          {
            title: "Mettre des couleurs et du gras",
            explain: ["La première ligne explique ce qu'il y a dessous. On la met en gras avec une couleur de fond.", "Sélectionne la ligne, clique sur B (gras), puis sur le pot de peinture pour choisir une couleur."],
            visual: { type: "grid", rows: [["Article", "Prix"], ["Riz", "1500"], ["Huile", "1200"]], highlight: ["A1", "B1"], caption: "La ligne 1 est en couleur : on comprend tout de suite." },
            tip: "Garde des couleurs douces. Du texte foncé sur fond clair se lit mieux.",
          },
          {
            title: "Ajouter des bordures",
            explain: ["Les bordures sont les traits autour des cases. Elles font un vrai tableau.", "Sélectionne ton tableau, puis clique sur le bouton des bordures (un carré à quatre cases) et choisis « Toutes les bordures »."],
            visual: { type: "scene", items: [{ icon: "FaArrowPointer", label: "Je sélectionne" }, { icon: "FaTableCells", label: "Bordures, toutes" }, { icon: "FaCircleCheck", label: "Tableau bien tracé" }], caption: "Les traits rendent le tableau plus clair." },
            tip: "Sans sélectionner d'abord, Excel ne sait pas où mettre les traits.",
          },
        ],
        quiz: [
          { q: "Comment ajuster une colonne toute seule ?", options: ["Double clic sur le trait entre les lettres", "Appuyer sur Suppr", "Éteindre l'écran"], answer: 0, why: "Le double clic ajuste la colonne à son contenu." },
          { q: "Pourquoi mettre la première ligne en gras ?", options: ["Elle explique le tableau", "Pour faire peur", "Elle est inutile"], answer: 0, why: "Elle donne le nom de chaque colonne." },
          { q: "Que faire avant de mettre des bordures ?", options: ["Sélectionner le tableau", "Enregistrer", "Fermer Excel"], answer: 0, why: "Excel doit savoir quelles cases changer." },
        ],
        exercise: {
          title: "Mon tableau de notes",
          instructions: ["En A1 écris « Matière », en B1 écris « Note ».", "Écris 3 matières avec leur note.", "Mets la ligne 1 en gras avec une couleur de fond.", "Ajoute toutes les bordures."],
          correction: ["A1, Tab, B1.", "Descends avec Entrée pour écrire les matières et les notes.", "Sélectionne A1:B1, clique sur B et sur le pot de peinture.", "Sélectionne tout le tableau, Bordures, Toutes les bordures."],
          visual: { type: "grid", rows: [["Matière", "Note"], ["Français", "14"], ["Maths", "16"], ["Sport", "18"]], highlight: ["A1", "B1"], caption: "Résultat attendu." },
        },
      },
      {
        slug: "trier-et-graphique",
        added: "2026-10-14",
        title: "Trier et dessiner un graphique",
        icon: "FaChartLine",
        intro: "On range les lignes dans l'ordre et on transforme les chiffres en dessin.",
        chapters: [
          {
            title: "Recopier une formule vers le bas",
            explain: ["Tu as écrit une formule dans une case et tu veux la même pour les cases d'en dessous ? Pas besoin de tout retaper.", "Clique sur la case. Un petit carré apparaît en bas à droite. Tire-le vers le bas : Excel copie la formule et l'adapte à chaque ligne."],
            visual: { type: "grid", rows: [["2", "3", "=A1*B1"], ["4", "5", "=A2*B2"], ["6", "7", "=A3*B3"]], highlight: ["C1"], caption: "On tire le petit carré de C1 vers le bas : les autres lignes se remplissent." },
            tip: "Ce petit carré s'appelle la poignée de recopie.",
          },
          {
            title: "Trier du plus petit au plus grand",
            explain: ["Trier, c'est ranger comme à l'école : du plus petit au plus grand, ou de A à Z.", "Clique dans la colonne à trier, puis dans l'onglet Données clique sur A→Z. Tout le tableau se range."],
            visual: { type: "scene", items: [{ icon: "FaShuffle", label: "Lignes en désordre" }, { icon: "FaArrowDownAZ", label: "Données, A→Z" }, { icon: "FaBarsStaggered", label: "Lignes rangées" }], caption: "Le tri range toutes les lignes d'un coup." },
            tip: "Ne sélectionne pas une seule colonne : Excel mélangerait tes données.",
          },
          {
            title: "Faire un graphique",
            explain: ["Un graphique est un dessin des chiffres. Les gens comprennent plus vite avec un dessin.", "Sélectionne ton tableau, puis Insertion, puis Colonnes. Les barres sont grandes pour les gros chiffres et petites pour les petits."],
            visual: { type: "scene", arrows: false, items: [{ icon: "FaChartColumn", label: "Barres" }, { icon: "FaChartPie", label: "Camembert" }, { icon: "FaChartLine", label: "Courbe" }], caption: "Trois sortes de graphiques pour montrer des chiffres." },
            tip: "Barres pour comparer, courbe pour suivre dans le temps, camembert pour les parts.",
          },
        ],
        quiz: [
          { q: "Comment s'appelle le petit carré qu'on tire pour recopier ?", options: ["La poignée de recopie", "Le bouton rouge", "Le curseur"], answer: 0, why: "On le tire vers le bas pour copier la formule." },
          { q: "Que fait le tri A→Z ?", options: ["Il range les lignes dans l'ordre", "Il efface le tableau", "Il colorie"], answer: 0, why: "Trier, c'est ranger dans l'ordre." },
          { q: "Quel graphique pour comparer des quantités ?", options: ["Les barres", "Une photo", "Rien"], answer: 0, why: "Les barres montrent tout de suite qui est le plus grand." },
        ],
        exercise: {
          title: "Le graphique de mes dépenses",
          instructions: ["En A1 « Mois » et B1 « Dépense ».", "Écris 3 mois avec une dépense chacun.", "Trie les dépenses du plus petit au plus grand.", "Fais un graphique en colonnes."],
          correction: ["Écris les mois en A et les dépenses en B.", "Clique dans la colonne B puis Données, A→Z.", "Sélectionne tout le tableau.", "Insertion puis Colonnes : le graphique apparaît !"],
          visual: { type: "grid", rows: [["Mois", "Dépense"], ["Janvier", "5000"], ["Février", "7000"], ["Mars", "9000"]], highlight: [], caption: "Tableau trié : des plus petites aux plus grandes dépenses." },
        },
      },
    ],
  },

  powerpoint: {
    software: "PowerPoint",
    icon: "FaFilePowerpoint",
    accent: "#d9531e",
    title: "PowerPoint, le livre d'images",
    intro: "PowerPoint sert à montrer des idées aux autres, page après page. Tu vas créer des diapositives simples et belles, puis les présenter.",
    modules: [
      {
        slug: "premiere-presentation",
        title: "Ma première présentation",
        icon: "FaFilm",
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
            visual: { type: "scene", items: [{ icon: "FaArrowPointer", label: "Je clique sur Nouvelle diapositive" }, { icon: "FaCirclePlus", label: "Une page s'ajoute" }], caption: "Un clic, une nouvelle page." },
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
        icon: "FaWandMagicSparkles",
        intro: "Couleurs, images, puis on présente devant tout le monde.",
        chapters: [
          {
            title: "Choisir un joli thème",
            explain: ["Un thème, c'est un habit tout prêt pour tes diapositives : couleurs et formes déjà choisies.", "Va dans l'onglet Création, passe la souris sur les thèmes, puis clique sur celui qui te plaît."],
            visual: { type: "scene", arrows: false, items: [{ icon: "FaRegSquare", label: "Page blanche" }, { icon: "FaPalette", label: "Thème coloré" }], caption: "Un thème habille toutes tes pages d'un seul clic." },
            tip: "Choisis un thème où l'on lit bien : lettres foncées sur fond clair, ou l'inverse.",
          },
          {
            title: "Ajouter une image",
            explain: ["Une image aide à comprendre. Onglet Insertion, puis Images, puis choisis une photo dans ton ordinateur.", "Tu peux la déplacer avec la souris et la rendre plus petite en tirant sur un coin."],
            visual: { type: "slide", title: "Mon chat", bullets: ["Il dort beaucoup", "Il aime le poisson"], caption: "Une image rend la page vivante." },
            tip: "Tire toujours par un coin, pas par un côté, sinon l'image s'écrase.",
          },
          {
            title: "Présenter : le grand moment",
            explain: ["Appuie sur la touche F5 : ta présentation passe en plein écran, comme au cinéma.", "Avec la flèche → tu vas à la page suivante. Avec Échap tu sors."],
            visual: { type: "scene", items: [{ icon: "FaKeyboard", label: "J'appuie sur F5" }, { icon: "FaDisplay", label: "Plein écran" }, { icon: "FaUsers", label: "Les gens écoutent" }], caption: "F5 pour commencer, Échap pour arrêter." },
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
      {
        slug: "formes-et-animations",
        added: "2026-10-14",
        title: "Formes et mouvements",
        icon: "FaShapes",
        intro: "On dessine des formes et on fait bouger les pages.",
        chapters: [
          {
            title: "Dessiner une forme",
            explain: ["Rond, carré, flèche : PowerPoint sait tout dessiner. Va dans Insertion, puis Formes, et choisis.", "Clique sur la page et glisse la souris : la forme apparaît. Tu peux écrire dedans."],
            visual: { type: "scene", arrows: false, items: [{ icon: "FaCircle", label: "Rond" }, { icon: "FaSquare", label: "Carré" }, { icon: "FaArrowRight", label: "Flèche" }], caption: "Les formes aident à expliquer une idée." },
            tip: "Une flèche entre deux formes montre qu'une chose mène à l'autre.",
          },
          {
            title: "Changer la couleur d'une forme",
            explain: ["Clique sur ta forme. Un nouvel onglet apparaît : Forme de forme.", "Choisis « Remplissage » pour la couleur dedans, et « Contour » pour la couleur du trait."],
            visual: { type: "scene", items: [{ icon: "FaRegSquare", label: "Forme blanche" }, { icon: "FaFillDrip", label: "Remplissage" }, { icon: "FaSquare", label: "Forme bleue" }], caption: "Deux clics pour changer la couleur." },
            tip: "Utilise la même couleur pour les idées qui vont ensemble.",
          },
          {
            title: "Les transitions : tourner la page",
            explain: ["Une transition, c'est la façon dont la page change : elle glisse, elle s'efface, elle tourne.", "Va dans l'onglet Transitions et clique sur celle que tu aimes. Tu la vois tout de suite."],
            visual: { type: "scene", items: [{ icon: "FaFile", label: "Page 1" }, { icon: "FaWandMagicSparkles", label: "Transition" }, { icon: "FaFile", label: "Page 2" }], caption: "La transition relie deux pages avec un petit effet." },
            tip: "Choisis la même transition pour toutes les pages : ce sera plus calme.",
          },
        ],
        quiz: [
          { q: "Où trouver les formes ?", options: ["Insertion, Formes", "Fichier, Quitter", "Affichage, Zoom"], answer: 0, why: "Tout ce qu'on ajoute à une page est dans Insertion." },
          { q: "Que fait une transition ?", options: ["Elle décore le passage d'une page à l'autre", "Elle efface la présentation", "Elle imprime"], answer: 0, why: "Elle anime le changement de page." },
          { q: "Pour changer la couleur dedans d'une forme, je clique sur…", options: ["Remplissage", "Contour", "Quitter"], answer: 0, why: "Remplissage = l'intérieur. Contour = le trait autour." },
        ],
        exercise: {
          title: "Le chemin de l'eau",
          instructions: ["Fais une nouvelle diapositive avec le titre « Le chemin de l'eau ».", "Dessine 3 formes : Pluie, Rivière, Mer.", "Relie-les avec 2 flèches.", "Ajoute une transition à la page."],
          correction: ["Nouvelle diapositive puis titre.", "Insertion, Formes, rectangle arrondi, écris dedans.", "Insertion, Formes, flèche entre chaque forme.", "Onglet Transitions, clique sur Fondu."],
          visual: { type: "scene", items: [{ icon: "FaCloudRain", label: "Pluie" }, { icon: "FaMountainSun", label: "Rivière" }, { icon: "FaWater", label: "Mer" }], caption: "Exemple du schéma attendu." },
        },
      },
      {
        slug: "presenter-avec-confiance",
        added: "2026-10-14",
        title: "Présenter avec confiance",
        icon: "FaTrophy",
        intro: "On apprend à parler devant les autres, sans avoir peur.",
        chapters: [
          {
            title: "Les 3 règles d'or",
            explain: ["Règle 1 : peu de mots. Règle 2 : de grosses lettres. Règle 3 : de belles couleurs qui contrastent.", "Si on doit plisser les yeux pour lire, c'est raté. Une diapositive se lit en 5 secondes."],
            visual: { type: "scene", arrows: false, items: [{ icon: "FaScissors", label: "Peu de mots" }, { icon: "FaMagnifyingGlassPlus", label: "Grosses lettres" }, { icon: "FaCircleHalfStroke", label: "Fond et texte bien différents" }], caption: "Trois règles pour une diapositive facile à lire." },
            tip: "Taille minimale conseillée : 24 pour le texte, 36 pour le titre.",
          },
          {
            title: "Les notes de l'orateur",
            explain: ["Tu ne dois pas tout écrire sur la page. Ce que tu veux dire, tu l'écris dans les notes, sous la diapositive.", "Clique sur « Notes » en bas de l'écran et écris. Seul toi les vois quand tu présentes."],
            visual: { type: "slide", title: "Les vacances", bullets: ["Plage", "Famille"], caption: "Sur la page : peu de mots. Dans les notes : tout ce que tu veux raconter." },
            tip: "Les notes sont comme ton aide-mémoire secret.",
          },
          {
            title: "S'entraîner et partager",
            explain: ["Avant le grand jour, entraîne-toi à voix haute avec F5, deux ou trois fois.", "Pour envoyer ta présentation, enregistre-la en PDF : Fichier, Enregistrer sous, type PDF."],
            visual: { type: "scene", items: [{ icon: "FaPersonChalkboard", label: "Je m'entraîne" }, { icon: "FaStopwatch", label: "Je regarde le temps" }, { icon: "FaPaperPlane", label: "J'envoie en PDF" }], caption: "S'entraîner enlève la peur." },
            tip: "Respire, parle doucement, regarde les gens. Une pause est plus belle qu'un « euh ».",
          },
        ],
        quiz: [
          { q: "Combien de temps pour lire une diapositive ?", options: ["Environ 5 secondes", "10 minutes", "Une heure"], answer: 0, why: "Peu de mots : on comprend d'un coup d'œil." },
          { q: "Où écrire ce que je veux dire à voix haute ?", options: ["Dans les notes", "Sur la page, en tout petit", "Nulle part"], answer: 0, why: "Les notes sont cachées au public." },
          { q: "Pour ne plus avoir peur, je dois…", options: ["M'entraîner à voix haute", "Lire sans regarder personne", "Éteindre la lumière"], answer: 0, why: "Plus on s'entraîne, plus on est à l'aise." },
        ],
        exercise: {
          title: "Mon mini exposé de 1 minute",
          instructions: ["Choisis un sujet que tu aimes (ton animal, ton sport…).", "Fais 3 diapositives avec très peu de mots.", "Écris dans les notes ce que tu vas dire.", "Entraîne-toi avec F5, puis enregistre en PDF."],
          correction: ["Une idée par diapositive : Début, Milieu, Fin.", "Chaque diapositive : un titre et 2 lignes maximum.", "Clique sur « Notes » en bas et écris tes phrases.", "F5 pour t'entraîner, puis Fichier, Enregistrer sous, PDF."],
        },
      },
    ],
  },
};

export const getCourse = (slug) => COURSES[slug] ?? null;
export const getModule = (slug, moduleSlug) =>
  COURSES[slug]?.modules.find((m) => m.slug === moduleSlug) ?? null;

// Modules ajoutés récemment (champ "added" au format AAAA-MM-JJ), pour les notifications
export const getNewModules = (days = 14) => {
  const limit = Date.now() - days * 86400000;
  return Object.entries(COURSES).flatMap(([course, c]) =>
    c.modules
      .filter((m) => m.added && new Date(m.added).getTime() >= limit)
      .map((m) => ({ course, courseTitle: c.software, slug: m.slug, title: m.title, added: m.added }))
  );
};