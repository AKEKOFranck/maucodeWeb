import { EXTRA } from "./extra";
import { withExtra } from "./merge";

// Contenu pédagogique. Pour ajouter un module : copie un bloc dans "modules".
// Types de visuels : scene | grid | slide
// Les chapitres avancés sont dans extra.js et fusionnés en bas de ce fichier.
const BASE = {
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
      {
        slug: "documents-longs",
        added: "2026-10-27",
        title: "Les documents longs",
        icon: "FaClipboardList",
        intro: "Rapport, mémoire, dossier : on construit un long document structuré, avec sommaire automatique et numérotation maîtrisée.",
        chapters: [
          {
            title: "Structurer avec les styles de titre et le volet Navigation",
            explain: [
              "Un long document se construit comme une maison : d'abord la structure, ensuite la décoration. Applique Titre 1 aux grandes parties, Titre 2 aux sous-parties et Titre 3 aux sous-sous-parties (onglet Accueil, galerie des styles). Ne mets jamais un titre en gras et en gros à la main : Word ne le reconnaîtrait pas comme un titre.",
              "Ouvre ensuite l'onglet Affichage et coche Volet de navigation. Tous tes titres apparaissent à gauche sous forme de plan. Clique sur un titre pour y aller, ou glisse-le : toute la partie (titre et texte) se déplace avec lui.",
            ],
            visual: { type: "scene", items: [{ icon: "FaHeading", label: "Titre 1, 2 et 3" }, { icon: "FaClipboardList", label: "Le plan dans le volet" }, { icon: "FaArrowPointer", label: "Je glisse une partie" }], caption: "Les styles de titre construisent le plan de ton document." },
            tip: "Un Titre 2 doit toujours se trouver sous un Titre 1. Si tu sautes un niveau, la table des matières sera bancale.",
          },
          {
            title: "La table des matières automatique",
            explain: [
              "Une vraie table des matières ne se tape jamais à la main. Place le curseur à l'endroit voulu (souvent après la page de garde), puis Références, Table des matières, et choisis Table automatique 1. Word lit tes styles de titre et crée la liste avec les numéros de page.",
              "Tu as modifié des titres ou ajouté des pages ? Clique dans la table, puis sur Mettre à jour la table (ou appuie sur F9) et choisis Mettre à jour toute la table : titres et numéros de page sont rafraîchis. Maintiens Ctrl en cliquant sur une ligne pour aller directement à la page.",
            ],
            visual: { type: "grid", rows: [["Introduction", "3"], ["1. Le contexte", "4"], ["1.1 Les chiffres", "5"], ["2. Les solutions", "7"]], highlight: [], caption: "La table des matières récupère tes titres et leurs numéros de page." },
            tip: "Si un titre n'apparaît pas dans la table, c'est qu'il n'a pas de style Titre. Vérifie-le dans l'onglet Accueil.",
          },
          {
            title: "Sauts de section et numérotation des pages",
            explain: [
              "Une page de garde ne doit pas porter de numéro, et la numérotation doit commencer à 1 après le sommaire. Pour cela, découpe le document en sections : Disposition, Sauts de page, Page suivante. Chaque section peut avoir son propre en-tête, son pied de page et sa numérotation.",
              "Double-clique dans le pied de page de la section 2 et, dans l'onglet En-tête et pied de page, désactive Lier au précédent. Puis Numéro de page, Format des numéros de page, coche Commencer à et mets 1. Pour retirer le numéro de la toute première page, coche Première page différente.",
            ],
            visual: { type: "scene", items: [{ icon: "FaFile", label: "Section 1 : page de garde" }, { icon: "FaHashtag", label: "Section 2 : numéros 1, 2, 3" }, { icon: "FaCircleCheck", label: "Chaque section ses règles" }], caption: "Un saut de section permet de numéroter chaque partie à sa façon." },
            tip: "Un saut de page (Ctrl + Entrée) ne crée PAS une nouvelle section. Seul un saut de section permet de changer la numérotation ou l'orientation.",
          },
          {
            title: "Notes de bas de page",
            explain: [
              "Une note de bas de page donne une précision ou une source sans alourdir le texte. Place le curseur après le mot concerné, puis Références, Insérer une note de bas de page (ou Ctrl + Alt + F). Word ajoute un petit chiffre dans le texte et te place en bas de la page pour écrire la note.",
              "Les notes sont numérotées automatiquement : si tu en ajoutes une au milieu, toutes les autres se renumérotent. Pour supprimer une note, efface le petit chiffre dans le texte (pas le texte du bas) : la note disparaît.",
            ],
            visual: { type: "scene", items: [{ icon: "FaPen", label: "Curseur après le mot" }, { icon: "FaKeyboard", label: "Ctrl + Alt + F" }, { icon: "FaFile", label: "Note écrite en bas de page" }], caption: "Le chiffre dans le texte renvoie à la note en bas de la page." },
            tip: "Pour une bibliographie propre, utilise Références, Insérer une citation, puis Bibliographie : Word crée la liste des sources pour toi.",
          },
          {
            title: "Légendes et renvois automatiques",
            explain: [
              "Chaque image ou tableau d'un rapport mérite une légende numérotée : clic droit sur l'image, Insérer une légende, et Word écrit Figure 1. Si tu ajoutes une image avant, les numéros se mettent à jour tout seuls.",
              "Pour écrire « voir la Figure 2 » sans risque d'erreur, utilise un renvoi : Références, Renvoi, Type Figure, puis choisis la légende. Le texte devient un lien qui suit la numérotation. Avant d'envoyer, sélectionne tout (Ctrl + A) et appuie sur F9 pour mettre à jour tous les champs.",
            ],
            visual: { type: "scene", items: [{ icon: "FaImage", label: "Image avec légende" }, { icon: "FaArrowPointer", label: "Renvoi vers la figure" }, { icon: "FaCircleCheck", label: "Numéros toujours justes" }], caption: "Légendes et renvois restent justes même si tu ajoutes des images." },
            tip: "Ne tape jamais Figure 1 à la main : à la première image ajoutée, tous tes numéros seraient faux.",
          },
        ],
        quiz: [
          { q: "Un titre mis en gras et en taille 20 n'apparaît pas dans la table des matières. Quelle est la cause la plus probable ?", options: ["La table est trop longue", "Il n'a pas de style Titre 1, 2 ou 3", "Word est en panne"], answer: 1, why: "La table se construit à partir des styles de titre, pas de l'apparence du texte." },
          { q: "Tu veux que la page de garde n'ait pas de numéro et que le sommaire soit la page 1. Que faire ?", options: ["Appuyer sur Entrée jusqu'à changer de page", "Insérer un saut de section et désactiver Lier au précédent", "Supprimer les numéros à la main"], answer: 1, why: "Chaque section peut avoir sa propre numérotation, à condition de la détacher de la précédente." },
          { q: "Quel raccourci met à jour les champs (table des matières, renvois) ?", options: ["F5", "Ctrl + Z", "F9"], answer: 2, why: "F9 actualise les champs sélectionnés. Avec Ctrl + A avant, tu mets tout à jour." },
          { q: "Pourquoi utiliser un renvoi plutôt que taper « voir Figure 2 » ?", options: ["Le numéro se met à jour si l'ordre change", "C'est plus joli", "Il est plus petit"], answer: 0, why: "Un renvoi est lié à la légende : si les figures changent d'ordre, le numéro suit." },
          { q: "Tu insères une note de bas de page entre la note 1 et la note 2. Que se passe-t-il ?", options: ["Word refuse", "Il faut renuméroter à la main", "Les notes sont renumérotées automatiquement"], answer: 2, why: "La numérotation des notes est automatique." },
        ],
        exercise: {
          title: "Mon rapport structuré",
          instructions: [
            "Écris un rapport sur un sujet de ton choix avec 3 parties (Titre 1) et au moins 2 sous-parties (Titre 2).",
            "Ajoute une page de garde, puis un saut de section (Page suivante) après la table des matières.",
            "Insère une table des matières automatique juste après la page de garde.",
            "Numérote les pages à partir de la section 2, en commençant à 1, sans numéro sur la page de garde.",
            "Ajoute une image avec légende, un renvoi vers cette image et une note de bas de page. Mets tout à jour avec Ctrl + A puis F9.",
          ],
          correction: [
            "Sélectionne chaque titre et applique Titre 1 ou Titre 2 dans l'onglet Accueil. Vérifie le plan dans le Volet de navigation.",
            "Insertion, Page de garde. Place ensuite le curseur après la table et fais Disposition, Sauts de page, Page suivante.",
            "Curseur sur la page 2, puis Références, Table des matières, Table automatique 1.",
            "Dans le pied de page de la section 2, désactive Lier au précédent, puis Numéro de page, Format, Commencer à 1. Coche Première page différente pour la garde.",
            "Clic droit sur l'image, Insérer une légende. Références, Renvoi, Figure. Références, Insérer une note de bas de page. Puis Ctrl + A et F9.",
          ],
        },
      },
      {
        slug: "publipostage-et-collaboration",
        added: "2026-10-27",
        title: "Publipostage et travail à plusieurs",
        icon: "FaPaperPlane",
        intro: "Envoyer 100 lettres personnalisées en deux minutes, corriger un document à plusieurs et protéger ton travail.",
        chapters: [
          {
            title: "Préparer la liste des destinataires dans Excel",
            explain: [
              "Le publipostage fusionne un document type (la lettre) avec une liste (les destinataires). La liste se prépare dans Excel : une première ligne avec les titres des colonnes (Civilité, Nom, Prénom, Ville), puis une ligne par personne. Pas de ligne vide, pas de cellules fusionnées.",
              "Enregistre le fichier Excel et ferme-le avant de commencer, pour éviter les blocages. Des titres de colonnes clairs seront plus faciles à retrouver dans Word que des titres comme Colonne 2.",
            ],
            visual: { type: "grid", rows: [["Civilité", "Nom", "Prénom", "Ville"], ["Madame", "Traoré", "Awa", "Bouaké"], ["Monsieur", "Koné", "Issa", "Daloa"], ["Madame", "Diallo", "Mariam", "Korhogo"]], highlight: ["A1", "B1", "C1", "D1"], caption: "Une ligne de titres, puis une ligne par personne." },
            tip: "Écris les titres de colonnes sans accents ni espaces (Prenom, Ville) : cela évite des surprises dans les champs de fusion.",
          },
          {
            title: "Créer la lettre type et fusionner",
            explain: [
              "Dans Word, ouvre l'onglet Publipostage. Clique sur Démarrer le publipostage, puis Lettres. Ensuite Sélection des destinataires, Utiliser une liste existante, et choisis ton fichier Excel.",
              "Écris ta lettre une seule fois. Là où le nom doit apparaître, clique sur Insérer un champ de fusion et choisis Civilité, Nom, etc. Les champs apparaissent entre chevrons, par exemple <<Nom>>. Clique sur Aperçu des résultats et utilise les flèches pour vérifier chaque lettre.",
            ],
            visual: { type: "scene", items: [{ icon: "FaFile", label: "La lettre type" }, { icon: "FaTableCells", label: "La liste Excel" }, { icon: "FaWandMagicSparkles", label: "La fusion" }, { icon: "FaUsers", label: "Une lettre par personne" }], caption: "Une lettre, une liste : Word produit une lettre pour chaque personne." },
            tip: "Utilise Mettre en surbrillance les champs de fusion pour voir d'un coup d'œil ce qui est variable dans ta lettre.",
          },
          {
            title: "Filtrer les destinataires et terminer",
            explain: [
              "Tu veux écrire seulement aux habitants de Bouaké ? Clique sur Modifier la liste de destinataires, puis Filtrer, et choisis Ville égale à Bouaké. Tu peux aussi trier la liste ou décocher des personnes une par une.",
              "Pour finir, clique sur Terminer et fusionner. Modifier des documents individuels crée un nouveau fichier avec une page par destinataire : tu peux le relire, le corriger et l'enregistrer en PDF. Imprimer les documents envoie tout à l'imprimante. Envoyer des messages électroniques sert pour les e-mails, si Outlook est installé.",
            ],
            visual: { type: "scene", items: [{ icon: "FaTableCells", label: "Liste filtrée" }, { icon: "FaEye", label: "Aperçu des lettres" }, { icon: "FaFilePdf", label: "Fichier final" }], caption: "On filtre, on vérifie, puis on termine la fusion." },
            tip: "Termine par Modifier des documents individuels : tu gardes une trace et tu peux corriger une lettre avant d'imprimer.",
          },
          {
            title: "Suivi des modifications et commentaires",
            explain: [
              "Quand quelqu'un relit ton travail, tu veux voir ce qu'il a changé. Onglet Révision, clique sur Suivi des modifications (ou Ctrl + Maj + E). Désormais, chaque ajout et chaque suppression est coloré et marqué sur le côté.",
              "Pour décider, place le curseur sur une modification et clique sur Accepter ou Refuser. Pour poser une question sans toucher au texte, sélectionne un mot puis Nouveau commentaire : une bulle apparaît dans la marge et les autres peuvent y répondre.",
            ],
            visual: { type: "scene", items: [{ icon: "FaPenToSquare", label: "Le relecteur modifie" }, { icon: "FaEye", label: "Les changements sont visibles" }, { icon: "FaCircleCheck", label: "J'accepte ou je refuse" }], caption: "Le suivi garde la trace de chaque changement." },
            tip: "Avant d'envoyer la version finale, vérifie qu'il ne reste aucune modification ni aucun commentaire : Révision, Accepter, Accepter toutes les modifications, puis supprime les commentaires.",
          },
          {
            title: "Comparer deux versions",
            explain: [
              "Tu as deux versions d'un document et tu ne sais plus ce qui diffère ? Onglet Révision, Comparer, Comparer. Choisis le document d'origine et le document modifié, puis OK. Word crée un troisième document qui montre toutes les différences en suivi des modifications.",
              "Cette fonction est très utile pour un contrat ou un rapport relu par plusieurs personnes : tu retrouves chaque changement, même si le relecteur a oublié d'activer le suivi.",
            ],
            visual: { type: "scene", items: [{ icon: "FaFile", label: "Version 1" }, { icon: "FaPenToSquare", label: "Version 2" }, { icon: "FaWandMagicSparkles", label: "Différences affichées" }], caption: "Word montre exactement ce qui a changé entre deux versions." },
            tip: "Donne des noms clairs à tes versions (rapport-v1, rapport-v2) : tu sauras toujours laquelle est la plus récente.",
          },
          {
            title: "Protéger un document et créer un modèle",
            explain: [
              "Pour empêcher l'ouverture par n'importe qui : Fichier, Informations, Protéger le document, Chiffrer avec mot de passe. Note ce mot de passe : s'il est perdu, le document est irrécupérable. Pour permettre la lecture mais pas la modification, choisis Restreindre la modification.",
              "Si tu refais souvent le même document (lettre, facture), enregistre-le comme modèle : Fichier, Enregistrer sous, type Modèle Word (.dotx). À chaque ouverture, Word crée une copie neuve et ton modèle reste intact.",
            ],
            visual: { type: "scene", items: [{ icon: "FaFile", label: "Document final" }, { icon: "FaFloppyDisk", label: "Mot de passe ou modèle" }, { icon: "FaCircleCheck", label: "Travail protégé" }], caption: "Un mot de passe protège, un modèle fait gagner du temps." },
            tip: "Ne protège jamais un document avec un mot de passe que tu ne notes nulle part : il ne pourra pas être récupéré.",
          },
        ],
        quiz: [
          { q: "Comment doit être organisé le fichier Excel d'un publipostage ?", options: ["Avec des cellules fusionnées pour faire joli", "Une première ligne de titres, puis une ligne par personne, sans ligne vide", "Avec plusieurs tableaux sur la même feuille"], answer: 1, why: "Word lit la première ligne comme les noms des champs, puis chaque ligne comme un destinataire." },
          { q: "Tu veux écrire seulement aux personnes de Bouaké. Que faire ?", options: ["Écrire 10 lettres séparément", "Supprimer les autres lignes dans Excel", "Modifier la liste de destinataires, puis Filtrer"], answer: 2, why: "Le filtre garde la liste complète mais ne fusionne que les lignes choisies." },
          { q: "Quelle option de fin permet de relire chaque lettre avant d'imprimer ?", options: ["Modifier des documents individuels", "Imprimer directement", "Fermer sans enregistrer"], answer: 0, why: "Elle crée un fichier avec toutes les lettres, que tu peux relire et corriger." },
          { q: "Un collègue a modifié ton texte sans activer le suivi. Comment retrouver ses changements ?", options: ["Relire à l'œil les 40 pages", "Révision, Comparer les deux versions", "C'est impossible"], answer: 1, why: "La fonction Comparer détecte toutes les différences entre deux fichiers." },
          { q: "Quel format crée une copie neuve du document à chaque ouverture ?", options: ["PDF", "Texte brut (.txt)", "Modèle Word (.dotx)"], answer: 2, why: "Un modèle sert de base : le fichier d'origine n'est jamais modifié." },
        ],
        exercise: {
          title: "Mes invitations personnalisées",
          instructions: [
            "Dans Excel, crée une liste de 4 personnes avec les colonnes Civilite, Nom, Prenom, Ville. Enregistre-la sous « invites » et ferme-la.",
            "Dans Word, écris une lettre d'invitation à une fête, avec une formule d'appel vide.",
            "Lance le publipostage (Lettres), choisis la liste « invites » et insère les champs Civilite et Nom dans la formule d'appel.",
            "Filtre les destinataires pour ne garder que ceux d'une seule ville, puis vérifie avec Aperçu des résultats.",
            "Termine avec Modifier des documents individuels et enregistre le résultat en PDF.",
          ],
          correction: [
            "La ligne 1 contient les titres, les lignes 2 à 5 les personnes. Pas de ligne vide.",
            "Écris l'invitation, puis laisse « Cher » ou « Chère » devant l'endroit où iront les champs.",
            "Publipostage, Démarrer le publipostage, Lettres. Utiliser une liste existante, puis Insérer un champ de fusion.",
            "Modifier la liste de destinataires, Filtrer, Ville égale à ta ville. Les flèches de l'aperçu montrent seulement les personnes gardées.",
            "Terminer et fusionner, Modifier des documents individuels, puis Fichier, Enregistrer sous, type PDF.",
          ],
          visual: { type: "grid", rows: [["Civilite", "Nom", "Prenom", "Ville"], ["Madame", "Traoré", "Awa", "Bouaké"], ["Monsieur", "Koné", "Issa", "Daloa"], ["Madame", "Diallo", "Mariam", "Bouaké"]], highlight: ["A1", "B1", "C1", "D1"], caption: "Exemple de liste pour le publipostage." },
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
      {
        slug: "recherches-et-conditions",
        added: "2026-10-27",
        title: "Recherches et conditions",
        icon: "FaBrain",
        intro: "Excel qui réfléchit : conditions multiples, recherche dans une table et totaux par critère.",
        chapters: [
          {
            title: "SI avec ET, OU et SI imbriqués",
            explain: [
              "Une seule condition ne suffit pas toujours. Pour exiger que deux conditions soient vraies en même temps, utilise ET : =SI(ET(B2>=10;C2>=10);\"Admis\";\"Refusé\"). Pour qu'une seule suffise, utilise OU à la place de ET.",
              "Pour plusieurs niveaux de réponse, on emboîte les SI : =SI(B2>=16;\"Très bien\";SI(B2>=12;\"Bien\";SI(B2>=10;\"Passable\";\"Insuffisant\"))). Excel teste dans l'ordre et s'arrête au premier test vrai. Chaque SI ouvert doit avoir sa parenthèse fermante à la fin.",
            ],
            visual: { type: "grid", rows: [["Awa", "14", "11", "=SI(ET(B1>=10;C1>=10);\"Admis\";\"Refusé\")"], ["Koffi", "16", "8", "=SI(ET(B2>=10;C2>=10);\"Admis\";\"Refusé\")"]], highlight: ["D1", "D2"], caption: "Awa a 14 et 11 : Admis. Koffi a 8 en deuxième note : Refusé." },
            tip: "Mets les tests dans le bon ordre, du plus exigeant au moins exigeant : sinon le premier test vrai masque tous les autres.",
          },
          {
            title: "RECHERCHEV : retrouver une information dans une table",
            explain: [
              "Tu as un tableau de prix (code, prix) et une facture où tu tapes seulement le code. RECHERCHEV va chercher le prix à ta place : =RECHERCHEV(valeur cherchée; table; numéro de colonne; FAUX).",
              "Exemple : =RECHERCHEV(A2;$E$2:$F$5;2;FAUX). Excel cherche A2 dans la première colonne de E2:F5 et renvoie la valeur de la 2e colonne. FAUX signifie correspondance exacte : mets-le presque toujours. Les $ verrouillent la table quand tu recopies la formule vers le bas.",
            ],
            visual: { type: "grid", rows: [["H2", "=RECHERCHEV(A1;D1:E3;2;FAUX)", "", "R1", "1500"], ["", "", "", "H2", "1200"], ["", "", "", "S3", "700"]], highlight: ["B1"], caption: "Excel trouve H2 dans la liste de droite et renvoie 1200." },
            tip: "RECHERCHEV cherche seulement vers la droite : le code doit être dans la première colonne de la table. Si tu obtiens #N/A, vérifie les espaces en trop et l'orthographe du code.",
          },
          {
            title: "RECHERCHEX : la version moderne",
            explain: [
              "Sur Excel 365 et 2021, RECHERCHEX remplace avantageusement RECHERCHEV : =RECHERCHEX(A2;D2:D5;E2:E5;\"Introuvable\"). Tu donnes la valeur cherchée, la colonne où chercher, la colonne où lire le résultat, puis un message si rien n'est trouvé.",
              "Avantages : plus besoin de compter les colonnes, la recherche peut aller vers la gauche, et le message d'erreur est intégré. Sur une version plus ancienne d'Excel, la fonction n'existe pas : utilise RECHERCHEV.",
            ],
            visual: { type: "scene", items: [{ icon: "FaMagnifyingGlassPlus", label: "Je donne le code" }, { icon: "FaTableCells", label: "Excel cherche dans la colonne" }, { icon: "FaCircleCheck", label: "Il renvoie le résultat" }], caption: "RECHERCHEX cherche une colonne et lit le résultat dans une autre." },
            tip: "Pour savoir si ta version a RECHERCHEX, tape =RECHERCHEX( dans une cellule : si Excel propose la fonction, tu l'as.",
          },
          {
            title: "SOMME.SI, NB.SI et SOMME.SI.ENS",
            explain: [
              "Ces fonctions comptent ou additionnent seulement ce qui répond à un critère. =NB.SI(A2:A20;\"Riz\") compte combien de fois Riz apparaît. =SOMME.SI(A2:A20;\"Riz\";B2:B20) additionne les montants de B pour les lignes où A vaut Riz.",
              "Avec plusieurs critères : =SOMME.SI.ENS(B2:B20;A2:A20;\"Riz\";C2:C20;\"Bouaké\"). Attention : ici la plage à additionner vient EN PREMIER, alors qu'elle vient en dernier dans SOMME.SI. Un critère numérique s'écrit entre guillemets : \">=100\".",
            ],
            visual: { type: "grid", rows: [["Riz", "1500"], ["Huile", "1200"], ["Riz", "1500"], ["Total Riz", "=SOMME.SI(A1:A3;\"Riz\";B1:B3)"]], highlight: ["B4"], caption: "Seules les lignes Riz sont additionnées : 3000." },
            tip: "Les guillemets sont obligatoires autour d'un texte ou d'un opérateur comme \">10\", mais pas autour d'une référence de cellule.",
          },
          {
            title: "SIERREUR : des tableaux sans #N/A",
            explain: [
              "Quand une formule ne trouve rien, Excel affiche une erreur comme #N/A ou #DIV/0!, ce qui est laid dans un tableau final. SIERREUR remplace l'erreur par le message de ton choix : =SIERREUR(RECHERCHEV(A2;$E$2:$F$5;2;FAUX);\"Code inconnu\").",
              "Ne l'utilise pas partout : une erreur est parfois utile pour t'avertir d'un vrai problème. Mets SIERREUR seulement autour des formules dont tu connais la cause possible de l'erreur.",
            ],
            visual: { type: "scene", items: [{ icon: "FaBrain", label: "Formule en erreur" }, { icon: "FaWandMagicSparkles", label: "SIERREUR" }, { icon: "FaCircleCheck", label: "Message propre" }], caption: "SIERREUR remplace une erreur moche par un message clair." },
            tip: "Cache une erreur seulement quand tu l'as comprise. Sinon tu risques de masquer une vraie faute de calcul.",
          },
        ],
        quiz: [
          { q: "Quelle formule exige que B2 ET C2 soient au moins égales à 10 ?", options: ["=SI(OU(B2>=10;C2>=10);\"Admis\";\"Refusé\")", "=SI(ET(B2>=10;C2>=10);\"Admis\";\"Refusé\")", "=SI(B2>=10;C2>=10)"], answer: 1, why: "ET demande que toutes les conditions soient vraies. OU se contente d'une seule." },
          { q: "Dans =RECHERCHEV(A2;$E$2:$F$5;2;FAUX), que signifie le 2 ?", options: ["On recopie la formule 2 fois", "On lit la 2e colonne de la table", "On cherche pendant 2 secondes"], answer: 1, why: "Le numéro indique la colonne de la table où Excel lit le résultat." },
          { q: "Quel est le piège de SOMME.SI.ENS ?", options: ["Elle ne fonctionne qu'avec des textes", "Elle supprime les lignes", "La plage à additionner est le premier argument"], answer: 2, why: "Dans SOMME.SI.ENS, la plage à additionner passe en premier, contrairement à SOMME.SI." },
          { q: "Que fait SIERREUR ?", options: ["Elle remplace une erreur par un message choisi", "Elle corrige les fautes de frappe", "Elle supprime la formule"], answer: 0, why: "Si la formule donne une erreur, Excel affiche à la place le texte ou la valeur que tu indiques." },
          { q: "Quel avantage a RECHERCHEX sur RECHERCHEV ?", options: ["Elle est plus ancienne", "Elle peut chercher vers la gauche et gère le message d'erreur", "Elle n'a pas besoin de colonne de résultats"], answer: 1, why: "RECHERCHEX n'impose pas que la colonne de recherche soit à gauche et prévoit un message si rien n'est trouvé." },
        ],
        exercise: {
          title: "La facture automatique",
          instructions: [
            "Dans G1:H3, écris la table des prix : R1 1500, H2 1200, S3 700.",
            "En A1:D1 écris Code, Quantité, Prix unitaire, Total. Remplis A2:A4 avec des codes et B2:B4 avec des quantités.",
            "En C2, écris une formule RECHERCHEV qui va chercher le prix du code de A2 dans la table G1:H3.",
            "Entoure-la d'un SIERREUR qui affiche Code inconnu si le code n'existe pas.",
            "En D2, multiplie la quantité par le prix, recopie les formules vers le bas, puis teste avec un faux code.",
          ],
          correction: [
            "Les codes sont en colonne G, les prix en colonne H.",
            "Tab pour passer à droite, Entrée pour descendre.",
            "=RECHERCHEV(A2;$G$1:$H$3;2;FAUX), avec les $ pour verrouiller la table.",
            "=SIERREUR(RECHERCHEV(A2;$G$1:$H$3;2;FAUX);\"Code inconnu\")",
            "En D2 : =B2*C2. Tire la poignée de recopie vers le bas. Avec un faux code, le prix affiche Code inconnu et le total donne #VALEUR! (tu peux l'entourer d'un SIERREUR aussi).",
          ],
          visual: { type: "grid", rows: [["Code", "Quantité", "Prix unitaire", "Total"], ["R1", "2", "1500", "3000"], ["H2", "1", "1200", "1200"], ["S3", "3", "700", "2100"]], highlight: [], caption: "Résultat attendu pour des codes valides." },
        },
      },
      {
        slug: "analyse-professionnelle",
        added: "2026-10-27",
        title: "Analyse de données pro",
        icon: "FaChartColumn",
        intro: "On transforme une liste en vrai outil : tableaux structurés, listes déroulantes, segments, simulations et protection.",
        chapters: [
          {
            title: "Le tableau structuré (Ctrl + T)",
            explain: [
              "Sélectionne ta liste et appuie sur Ctrl + T (ou Insertion, Tableau). Excel crée un tableau structuré : les lignes alternent en couleur, des filtres apparaissent, et surtout le tableau s'agrandit tout seul quand tu ajoutes une ligne.",
              "Les formules deviennent lisibles : au lieu de =B2*C2, Excel écrit =[@Quantité]*[@Prix]. Dans l'onglet Création de tableau, coche Ligne des totaux pour obtenir un total en bas, avec un menu pour choisir Somme, Moyenne, etc. Donne aussi un nom clair à ton tableau (par exemple Ventes).",
            ],
            visual: { type: "grid", rows: [["Article", "Quantité", "Prix", "Total"], ["Riz", "2", "1500", "=[@Quantité]*[@Prix]"], ["Huile", "1", "1200", "=[@Quantité]*[@Prix]"]], highlight: ["D2", "D3"], caption: "La formule utilise le nom des colonnes au lieu des adresses de cases." },
            tip: "Dès qu'une liste va grandir, mets-la en tableau structuré : formules, graphiques et tableaux croisés suivront automatiquement.",
          },
          {
            title: "Validation des données : listes déroulantes",
            explain: [
              "Pour éviter les fautes de frappe (Riz, riz, Ris), force un choix dans une liste. Sélectionne les cases, puis Données, Validation des données. Dans Autoriser, choisis Liste et écris les valeurs séparées par des points-virgules : Riz;Huile;Sucre.",
              "L'onglet Alerte d'erreur permet d'écrire un message si quelqu'un tape autre chose. Pour une liste qui évolue, indique plutôt la plage d'une liste écrite dans une autre feuille : la liste déroulante se met à jour avec elle. Pour enlever la validation : Données, Validation des données, Effacer tout.",
            ],
            visual: { type: "scene", items: [{ icon: "FaTableCells", label: "Je sélectionne les cases" }, { icon: "FaListUl", label: "Validation : Liste" }, { icon: "FaCircleCheck", label: "Un seul choix possible" }], caption: "Une liste déroulante impose des données propres." },
            tip: "Des données propres rendent fiables les SOMME.SI et les tableaux croisés dynamiques.",
          },
          {
            title: "Segments et graphique croisé dynamique",
            explain: [
              "Un tableau croisé dynamique résume tes données ; un graphique croisé dynamique le met en dessin. Clique dans le tableau croisé, puis Analyse du tableau croisé dynamique, Graphique croisé dynamique, et choisis Colonnes.",
              "Pour filtrer d'un clic, ajoute un segment : Analyse du tableau croisé dynamique, Insérer un segment, coche par exemple Vendeur. Des gros boutons apparaissent : clique sur l'un d'eux et le tableau ET le graphique se filtrent en même temps. Maintiens Ctrl pour en choisir plusieurs.",
            ],
            visual: { type: "scene", items: [{ icon: "FaTableCells", label: "Tableau croisé" }, { icon: "FaChartColumn", label: "Graphique croisé" }, { icon: "FaArrowPointer", label: "Segment : un clic filtre tout" }], caption: "Un clic sur un segment met à jour le tableau et le graphique." },
            tip: "Un tableau de bord simple : un tableau croisé, un graphique et deux ou trois segments sur une seule feuille.",
          },
          {
            title: "Valeur cible : trouver le chiffre qui manque",
            explain: [
              "Tu as 12 et 14 aux deux premiers contrôles. Quelle note faut-il au troisième pour avoir 15 de moyenne ? Plutôt que d'essayer au hasard, laisse Excel chercher.",
              "Écris tes notes en B1 et B2, mets n'importe quel nombre en B3, et la formule =MOYENNE(B1:B3) en B4. Puis Données, Analyse de scénarios, Valeur cible. Renseigne : Cellule à définir B4, Valeur à atteindre 15, Cellule à modifier B3. Excel trouve 19.",
            ],
            visual: { type: "grid", rows: [["Contrôle 1", "12"], ["Contrôle 2", "14"], ["Contrôle 3", "19"], ["Moyenne", "=MOYENNE(B1:B3)"]], highlight: ["B3", "B4"], caption: "Avec 19 en B3, la moyenne vaut exactement 15." },
            tip: "La cellule à modifier doit contenir un nombre (pas une formule), et la cellule à définir doit contenir une formule qui en dépend.",
          },
          {
            title: "Protéger sa feuille",
            explain: [
              "Tu envoies un tableau à des collègues et tu veux qu'ils ne puissent remplir que certaines cases. D'abord, sélectionne les cases à remplir, fais un clic droit, Format de cellule, onglet Protection, et décoche Verrouillée.",
              "Ensuite, Révision, Protéger la feuille, saisis un mot de passe (facultatif) et valide. Les cases verrouillées, comme tes formules, ne peuvent plus être modifiées. Pour retirer la protection : Révision, Ôter la protection de la feuille. Ce mot de passe protège contre les erreurs, pas contre une attaque sérieuse.",
            ],
            visual: { type: "scene", items: [{ icon: "FaTableCells", label: "Cases à remplir déverrouillées" }, { icon: "FaFloppyDisk", label: "Révision, Protéger la feuille" }, { icon: "FaCircleCheck", label: "Formules à l'abri" }], caption: "On déverrouille les cases à remplir, puis on protège le reste." },
            tip: "Note ton mot de passe : une feuille protégée dont tu as perdu le mot de passe est très difficile à rouvrir.",
          },
        ],
        quiz: [
          { q: "Que se passe-t-il quand tu ajoutes une ligne sous un tableau structuré ?", options: ["Rien, il faut tout refaire", "Le tableau s'agrandit et les formules suivent", "Le fichier se ferme"], answer: 1, why: "Le tableau structuré s'étend automatiquement avec ses formules et sa mise en forme." },
          { q: "À quoi sert la validation de données de type Liste ?", options: ["À trier le tableau", "À imprimer en couleur", "À empêcher les fautes en imposant un choix"], answer: 2, why: "Elle propose une liste déroulante et refuse les valeurs qui n'y figurent pas." },
          { q: "Quel outil filtre un tableau croisé dynamique et son graphique d'un simple clic ?", options: ["Un segment", "Un commentaire", "Un saut de page"], answer: 0, why: "Un segment est un filtre sous forme de boutons, relié au tableau et au graphique." },
          { q: "Pour que la Valeur cible fonctionne, la cellule à modifier doit contenir…", options: ["Un texte", "Une image", "Un nombre, pas une formule"], answer: 2, why: "Excel change ce nombre jusqu'à ce que la formule atteigne la valeur voulue." },
          { q: "Avant de protéger une feuille, que faire pour les cases à remplir ?", options: ["Décocher Verrouillée dans Format de cellule", "Les colorier en jaune", "Les supprimer"], answer: 0, why: "Par défaut toutes les cases sont verrouillées : sans cette étape, personne ne pourrait rien saisir." },
        ],
        exercise: {
          title: "Mon tableau de suivi des ventes",
          instructions: [
            "Saisis 6 ventes avec les colonnes Vendeur, Produit, Quantité, Prix. Mets-les en tableau structuré avec Ctrl + T.",
            "Ajoute une colonne Total (Quantité × Prix) et active la ligne des totaux.",
            "Dans la colonne Produit, ajoute une liste déroulante avec Riz;Huile;Sucre.",
            "Crée un tableau croisé dynamique (total par vendeur), un graphique croisé et un segment sur Produit.",
            "Déverrouille les colonnes Vendeur à Prix, puis protège la feuille.",
          ],
          correction: [
            "Sélectionne la liste, Ctrl + T, coche « Mon tableau comporte des en-têtes ».",
            "Tape =[@Quantité]*[@Prix] dans la première case de Total. Création de tableau, Ligne des totaux.",
            "Sélectionne les cases de Produit, Données, Validation des données, Liste, Riz;Huile;Sucre.",
            "Insertion, Tableau croisé dynamique. Vendeur en Lignes, Total en Valeurs. Graphique croisé dynamique, puis Insérer un segment.",
            "Clic droit, Format de cellule, Protection, décoche Verrouillée. Révision, Protéger la feuille.",
          ],
          visual: { type: "grid", rows: [["Vendeur", "Produit", "Quantité", "Prix", "Total"], ["Awa", "Riz", "2", "1500", "3000"], ["Koffi", "Huile", "1", "1200", "1200"], ["Awa", "Sucre", "3", "700", "2100"]], highlight: [], caption: "Exemple de départ pour ton tableau de ventes." },
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
      {
        slug: "diaporama-professionnel",
        added: "2026-10-27",
        title: "Diaporama de niveau pro",
        icon: "FaDisplay",
        intro: "Transitions fluides, animations maîtrisées, graphiques et vidéos : tu passes d'une présentation correcte à une présentation professionnelle.",
        chapters: [
          {
            title: "La transition Morphose",
            explain: [
              "Morphose crée un mouvement fluide entre deux diapositives, comme dans un film. Crée la diapositive 1 avec ses objets (formes, images, texte). Duplique-la (clic droit, Dupliquer la diapositive), puis sur la copie, change la taille, la position ou la couleur des objets.",
              "Sélectionne la diapositive 2, onglet Transitions, choisis Morphose. Au diaporama, les objets glissent et grandissent tout seuls d'une page à l'autre. Pour que PowerPoint associe deux objets, ils doivent être du même type, ou porter le même nom dans le Volet de sélection (Accueil, Organiser, Volet de sélection).",
            ],
            visual: { type: "scene", items: [{ icon: "FaFile", label: "Diapositive 1" }, { icon: "FaWandMagicSparkles", label: "Morphose" }, { icon: "FaShapes", label: "Diapositive 2 : objets déplacés" }], caption: "Morphose anime le passage d'une diapositive à sa copie modifiée." },
            tip: "Morphose existe dans PowerPoint 2019 et Microsoft 365. Sur une version plus ancienne, utilise la transition Fondu.",
          },
          {
            title: "Animations avancées : trajectoires et déclencheurs",
            explain: [
              "Une trajectoire déplace un objet le long d'un chemin. Sélectionne l'objet, onglet Animations, Ajouter une animation, puis descends jusqu'à Trajectoires et choisis Lignes ou Arcs. Tu peux tirer les extrémités du chemin pour l'allonger.",
              "Un déclencheur lance l'animation seulement quand on clique sur un objet précis. Dans Animations, clique sur Déclencheur, puis Lors du clic sur, et choisis l'objet. Tu peux ainsi présenter dans l'ordre que tu veux, selon les questions du public. Le Volet Animation te permet de vérifier l'ordre et la durée.",
            ],
            visual: { type: "scene", items: [{ icon: "FaArrowPointer", label: "Je choisis l'objet" }, { icon: "FaShapes", label: "Trajectoire ou déclencheur" }, { icon: "FaCircleCheck", label: "Il bouge au bon moment" }], caption: "Une trajectoire déplace l'objet, un déclencheur choisit quand." },
            tip: "Teste toujours ton animation en lançant le diaporama avec F5 : l'aperçu de l'éditeur ne montre pas tout.",
          },
          {
            title: "Un graphique qui parle",
            explain: [
              "Insertion, Graphique, puis Colonnes groupées. Une petite feuille Excel s'ouvre : remplace les chiffres par les tiens, puis ferme-la. Pour corriger plus tard : clic sur le graphique, Création du graphique, Modifier les données.",
              "Un bon graphique raconte une seule idée. Donne-lui un titre qui dit la conclusion (par exemple « Les ventes ont doublé en 3 mois » plutôt que « Ventes »). Supprime ce qui est inutile (quadrillage, légende s'il n'y a qu'une série) et colore en vif la barre importante, en gris les autres.",
            ],
            visual: { type: "scene", items: [{ icon: "FaChartColumn", label: "Mes données" }, { icon: "FaPalette", label: "Une couleur qui met en avant" }, { icon: "FaHeading", label: "Titre = conclusion" }], caption: "Un graphique efficace met en avant une seule idée." },
            tip: "Cinq ou six barres au maximum par graphique, et jamais de 3D : elle déforme les proportions.",
          },
          {
            title: "Vidéo et son intégrés",
            explain: [
              "Insertion, Vidéo, Cet appareil : choisis ton fichier. Dans l'onglet Lecture, coupe les parties inutiles avec Découper la vidéo, et choisis Démarrage : Automatique pour qu'elle démarre toute seule, ou Au clic.",
              "Pour une musique de fond, Insertion, Audio, Audio sur mon PC, puis dans Lecture clique sur Exécuter en arrière-plan. Attention au poids : une vidéo lourde ralentit le fichier. Utilise Fichier, Informations, Compresser les médias avant de partager.",
            ],
            visual: { type: "scene", items: [{ icon: "FaFilm", label: "Insertion, Vidéo" }, { icon: "FaStopwatch", label: "Découper la vidéo" }, { icon: "FaDisplay", label: "Lecture automatique" }], caption: "On insère, on découpe, puis on règle le démarrage." },
            tip: "Insère la vidéo (pas un lien) pour qu'elle voyage avec le fichier, et teste-la sur l'ordinateur de présentation avant le jour J.",
          },
        ],
        quiz: [
          { q: "Que faut-il pour qu'une transition Morphose fonctionne bien ?", options: ["Des diapositives vides", "Les mêmes objets sur les deux diapositives, modifiés sur la seconde", "Une vidéo"], answer: 1, why: "Morphose anime les différences entre deux diapositives qui contiennent les mêmes objets." },
          { q: "À quoi sert un déclencheur d'animation ?", options: ["À supprimer l'animation", "À imprimer la page", "À lancer l'animation en cliquant sur un objet précis"], answer: 2, why: "Le déclencheur donne la main au présentateur : l'animation part au clic sur l'objet choisi." },
          { q: "Quel titre convient le mieux pour un graphique ?", options: ["Graphique 1", "Ventes", "Les ventes ont doublé en 3 mois"], answer: 2, why: "Un titre qui donne la conclusion dit au public ce qu'il doit retenir." },
          { q: "Comment alléger une présentation pleine de vidéos ?", options: ["Compresser les médias", "Réduire la taille de la police", "Supprimer le titre"], answer: 0, why: "La compression des médias réduit le poids du fichier sans changer la présentation." },
        ],
        exercise: {
          title: "Ma présentation animée",
          instructions: [
            "Crée une diapositive avec un rond et un titre, duplique-la, puis agrandis le rond sur la copie.",
            "Applique la transition Morphose à la deuxième diapositive.",
            "Ajoute une troisième diapositive avec un graphique en colonnes de 4 valeurs et un titre qui donne la conclusion.",
            "Colore en vif la barre la plus importante et en gris les autres.",
            "Ajoute une flèche avec une trajectoire déclenchée par le clic sur le rond, puis teste avec F5.",
          ],
          correction: [
            "Insertion, Formes, ovale. Clic droit sur la diapositive, Dupliquer la diapositive, puis tire sur un coin du rond.",
            "Sélectionne la diapositive 2, onglet Transitions, clique sur Morphose.",
            "Insertion, Graphique, Colonnes groupées, remplace les chiffres dans la feuille qui s'ouvre.",
            "Clique deux fois sur la barre importante, puis Remplissage de forme. Fais de même en gris pour les autres.",
            "Animations, Ajouter une animation, Trajectoires. Puis Déclencheur, Lors du clic sur, choisis le rond. Teste avec F5.",
          ],
          visual: { type: "scene", items: [{ icon: "FaShapes", label: "Petit rond" }, { icon: "FaWandMagicSparkles", label: "Morphose" }, { icon: "FaChartColumn", label: "Graphique avec conclusion" }], caption: "Le fil de ta présentation : forme, mouvement, graphique." },
        },
      },
      {
        slug: "presentation-interactive",
        added: "2026-10-27",
        title: "Présentation interactive",
        icon: "FaUsers",
        intro: "Sommaire cliquable, versions pour différents publics, narration enregistrée et travail à plusieurs.",
        chapters: [
          {
            title: "Liens hypertexte et boutons d'action",
            explain: [
              "Un lien permet de sauter vers une autre diapositive. Sélectionne un texte ou une forme, puis Insertion, Lien (ou Ctrl + K). Choisis Emplacement dans ce document, puis la diapositive de destination.",
              "Pour revenir en arrière, crée un bouton d'action : Insertion, Formes, tout en bas Boutons d'action. Dessine le bouton et, dans la fenêtre qui s'ouvre, choisis le lien (par exemple Diapositive précédente). Les liens ne fonctionnent qu'en mode diaporama : teste avec F5.",
            ],
            visual: { type: "scene", items: [{ icon: "FaShapes", label: "Un bouton ou un texte" }, { icon: "FaArrowPointer", label: "Insertion, Lien" }, { icon: "FaFile", label: "La diapositive de destination" }], caption: "Un clic sur le lien mène directement à la bonne diapositive." },
            tip: "Un sommaire cliquable en page 2 et un bouton Retour sur chaque page rendent ta présentation facile à parcourir.",
          },
          {
            title: "Zoom : un sommaire en images",
            explain: [
              "Zoom crée un sommaire avec les miniatures de tes diapositives. Insertion, Zoom, Zoom récapitulatif, puis coche les diapositives ou sections à inclure. PowerPoint ajoute une page de sommaire avec des vignettes cliquables.",
              "Pendant le diaporama, un clic sur une vignette t'amène à la section, et à la fin de la section tu reviens automatiquement au sommaire (option Retour au zoom, cochée par défaut). Pour que ça marche bien, range d'abord ta présentation en sections : clic droit dans le trieur, Ajouter une section.",
            ],
            visual: { type: "scene", items: [{ icon: "FaFilm", label: "Sections rangées" }, { icon: "FaMagnifyingGlassPlus", label: "Zoom récapitulatif" }, { icon: "FaDisplay", label: "Je choisis ma partie" }], caption: "Le zoom donne un sommaire visuel et cliquable." },
            tip: "Le zoom est idéal quand le public pose des questions : tu vas directement à la bonne partie sans avancer page par page.",
          },
          {
            title: "Diaporama personnalisé : un fichier, plusieurs publics",
            explain: [
              "Tu présentes le même sujet à des élèves et à des parents, mais pas avec les mêmes pages ? Ne fais pas deux fichiers. Diaporama, Diaporama personnalisé, Diaporamas personnalisés, Nouveau. Donne un nom (par exemple Parents) et ajoute seulement les diapositives voulues, dans l'ordre voulu.",
              "Pour le lancer : Diaporama, Diaporama personnalisé, puis choisis son nom. Tu modifies le contenu à un seul endroit : toutes les versions suivent. Une diapositive masquée (clic droit, Masquer la diapositive) reste dans le fichier mais n'est pas montrée.",
            ],
            visual: { type: "scene", items: [{ icon: "FaFilm", label: "Un seul fichier" }, { icon: "FaUsers", label: "Plusieurs publics" }, { icon: "FaCircleCheck", label: "Chacun sa version" }], caption: "Un seul fichier, autant de versions que de publics." },
            tip: "Donne des noms clairs aux diaporamas personnalisés : 5 minutes, 15 minutes, Parents.",
          },
          {
            title: "Narration et minutage enregistrés",
            explain: [
              "Pour une présentation qui se joue seule (borne, vidéo à envoyer), enregistre ta voix : Diaporama, Enregistrer le diaporama, À partir du début. Parle en changeant de diapositive : PowerPoint garde la voix et le temps de chaque page.",
              "Ensuite, Fichier, Exporter, Créer une vidéo pour obtenir un fichier lisible partout. Si une diapositive est ratée, tu peux réenregistrer uniquement celle-là. Branche un bon micro et parle dans une pièce calme.",
            ],
            visual: { type: "scene", items: [{ icon: "FaPersonChalkboard", label: "Je parle" }, { icon: "FaStopwatch", label: "Le temps est enregistré" }, { icon: "FaFilm", label: "Vidéo prête" }], caption: "La voix et le minutage sont enregistrés page par page." },
            tip: "Garde la narration courte : une idée et 20 à 40 secondes par diapositive.",
          },
          {
            title: "Travailler à plusieurs : partage et commentaires",
            explain: [
              "Enregistre ta présentation dans OneDrive, puis clique sur Partager en haut à droite. Entre l'adresse e-mail d'un collègue et choisis Peut modifier ou Peut afficher. Plusieurs personnes peuvent alors modifier en même temps, et tu vois leurs curseurs colorés.",
              "Pour demander un avis, sélectionne un élément, puis Révision, Nouveau commentaire. Chacun peut répondre et marquer le commentaire comme résolu. Si quelqu'un abîme le travail, Fichier, Informations, Historique des versions permet de revenir à une version précédente.",
            ],
            visual: { type: "scene", items: [{ icon: "FaUsers", label: "Plusieurs personnes" }, { icon: "FaPenToSquare", label: "Commentaires" }, { icon: "FaFloppyDisk", label: "Historique des versions" }], caption: "Tout le monde travaille sur le même fichier, avec un historique." },
            tip: "Avant de partager, décide qui peut modifier et qui peut seulement lire : en cas de doute, choisis Peut afficher.",
          },
        ],
        quiz: [
          { q: "Comment sauter vers une autre diapositive en cliquant sur un texte ?", options: ["Fichier, Quitter", "Affichage, Zoom", "Insertion, Lien, Emplacement dans ce document"], answer: 2, why: "Un lien vers un emplacement du document envoie directement à la diapositive choisie." },
          { q: "Que faut-il faire avant d'utiliser un zoom de section ?", options: ["Supprimer les images", "Ranger les diapositives en sections", "Passer en mode noir"], answer: 1, why: "Le zoom de section s'appuie sur les sections que tu as créées." },
          { q: "Comment préparer une version courte sans créer un deuxième fichier ?", options: ["Un diaporama personnalisé", "Copier-coller le fichier", "Imprimer en PDF"], answer: 0, why: "Un diaporama personnalisé sélectionne et ordonne des diapositives du même fichier." },
          { q: "Où retrouver une ancienne version si un collègue a tout cassé ?", options: ["Dans la corbeille de l'ordinateur", "C'est impossible", "Fichier, Informations, Historique des versions"], answer: 2, why: "Pour un fichier enregistré dans OneDrive, l'historique garde les versions précédentes." },
        ],
        exercise: {
          title: "Mon dossier interactif",
          instructions: [
            "Crée 6 diapositives rangées en 2 sections : Présentation et Exemples.",
            "Ajoute en diapositive 2 un sommaire avec Insertion, Zoom, Zoom récapitulatif.",
            "Sur chaque autre page, ajoute un bouton d'action qui revient à la diapositive 2.",
            "Crée un diaporama personnalisé nommé Version courte avec 3 diapositives.",
            "Teste tout avec F5, puis partage la présentation en lecture seule.",
          ],
          correction: [
            "Dans le trieur, clic droit puis Ajouter une section. Donne un nom à chaque section.",
            "Place-toi sur la diapositive 2, Insertion, Zoom, Zoom récapitulatif, coche les sections.",
            "Insertion, Formes, Boutons d'action, choisis Accueil, puis indique la diapositive 2 dans la fenêtre de lien.",
            "Diaporama, Diaporama personnalisé, Diaporamas personnalisés, Nouveau. Nom Version courte, ajoute 3 pages.",
            "F5 pour tester. Puis Partager, adresse e-mail, Peut afficher.",
          ],
          visual: { type: "slide", title: "Sommaire", bullets: ["Présentation", "Exemples", "Conclusion"], caption: "Exemple de sommaire de la diapositive 2." },
        },
      },
    ],
  },
};

// Ajoute les chapitres avancés de extra.js (après contrôle) aux modules ci-dessus
export const COURSES = withExtra(BASE, EXTRA);

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