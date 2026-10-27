// Chapitres avancés ajoutés aux modules existants (même format que modules.js).
// Chaque module reçoit des chapitres (chapters) et des questions de quiz (quiz) en plus.
// Tout est contrôlé par merge.js avant d'être affiché.

export const EXTRA = {
  /* ======================= WORD ======================= */
  word: {
    "decouvrir-word": {
      chapters: [
        {
          title: "Rechercher et remplacer",
          explain: [
            "Dans un long texte, chercher un mot à l'œil est pénible. Appuie sur Ctrl + F : une zone de recherche s'ouvre et Word montre chaque endroit où le mot apparaît.",
            "Tu as écrit « Moussa » partout, mais il fallait « Moussa Traoré » ? Appuie sur Ctrl + H. Écris l'ancien mot, puis le nouveau. Clique sur Remplacer pour changer un endroit à la fois, ou sur Remplacer tout pour tout changer d'un coup.",
          ],
          visual: { type: "scene", items: [{ icon: "FaKeyboard", label: "Ctrl + H" }, { icon: "FaPenToSquare", label: "Ancien mot, nouveau mot" }, { icon: "FaWandMagicSparkles", label: "Tout est changé" }], caption: "Un seul geste pour corriger un mot partout dans le texte." },
          tip: "Remplacer tout est puissant mais risqué : chercher « le » changerait aussi « leçon » et « table ». Coche « Mot entier uniquement » (bouton Plus) ou remplace un par un.",
        },
        {
          title: "Le correcteur : fautes en rouge et en bleu",
          explain: [
            "Word souligne en rouge les mots qu'il ne connaît pas (fautes d'orthographe) et en bleu les phrases qui semblent mal construites (grammaire). Fais un clic droit sur le mot souligné : Word propose des corrections.",
            "Pour tout vérifier d'un coup, appuie sur F7. Si Word souligne un mot qui est juste (un nom propre, par exemple), choisis « Ajouter au dictionnaire » : il ne le soulignera plus.",
          ],
          visual: { type: "scene", items: [{ icon: "FaPen", label: "Je tape mon texte" }, { icon: "FaEye", label: "Word souligne les doutes" }, { icon: "FaCircleCheck", label: "Je corrige" }], caption: "Le correcteur te montre où regarder, c'est toi qui décides." },
          tip: "Si tout est souligné en rouge, vérifie la langue : onglet Révision, Langue, puis choisis Français. Et relis toujours toi-même : le correcteur se trompe parfois.",
        },
      ],
      quiz: [
        { q: "Quel raccourci ouvre la fenêtre « Remplacer » ?", options: ["Ctrl + H", "Ctrl + F", "Ctrl + R"], answer: 0, why: "Ctrl + H ouvre Remplacer. Ctrl + F, lui, sert seulement à chercher." },
        { q: "Un mot est souligné en rouge. Que faire d'abord ?", options: ["Faire un clic droit dessus pour voir les corrections", "Le supprimer sans regarder", "Éteindre Word"], answer: 0, why: "Le clic droit propose des corrections, et « Ajouter au dictionnaire » si le mot est juste." },
      ],
    },

    "mettre-en-forme": {
      chapters: [
        {
          title: "Les styles : changer tous les titres d'un coup",
          explain: [
            "Mettre chaque titre en taille 24 et en gras à la main, c'est long, et si tu changes d'avis, il faut tout refaire. Les styles font ce travail pour toi.",
            "Sélectionne ton titre, puis dans l'onglet Accueil clique sur le style « Titre 1 ». Pour un sous-titre, choisis « Titre 2 ». Ensuite, fais un clic droit sur le style et choisis « Modifier » : tous les titres de ce style changent en même temps.",
          ],
          visual: { type: "scene", items: [{ icon: "FaHeading", label: "J'applique Titre 1" }, { icon: "FaWandMagicSparkles", label: "Je modifie le style" }, { icon: "FaCircleCheck", label: "Tous les titres suivent" }], caption: "Un style, c'est une recette de mise en forme réutilisable." },
          tip: "Les styles servent aussi à fabriquer une table des matières automatique : Word retrouve tes titres tout seul (onglet Références).",
        },
        {
          title: "Interligne, espacement et retrait",
          explain: [
            "Un texte trop serré fatigue les yeux. L'interligne règle la hauteur entre les lignes : choisis 1,15 ou 1,5 dans le bouton d'interligne de l'onglet Accueil.",
            "L'espacement règle l'air entre deux paragraphes (onglet Disposition, cases Avant et Après). Le retrait de première ligne décale légèrement le début de chaque paragraphe, comme dans un livre : tu le trouves dans la fenêtre Paragraphe (clic droit sur le texte, puis Paragraphe).",
          ],
          visual: { type: "scene", arrows: false, items: [{ icon: "FaAlignLeft", label: "Interligne : entre les lignes" }, { icon: "FaBarsStaggered", label: "Espacement : entre les paragraphes" }, { icon: "FaArrowRight", label: "Retrait : début décalé" }], caption: "Trois réglages pour un texte aéré et agréable à lire." },
          tip: "N'appuie jamais plusieurs fois sur Entrée pour faire un vide entre deux paragraphes : utilise l'espacement. C'est plus propre et plus facile à changer.",
        },
      ],
      quiz: [
        { q: "Quel avantage ont les styles de titre ?", options: ["Modifier un style change tous les titres d'un coup", "Ils effacent les fautes", "Ils impriment plus vite"], answer: 0, why: "Tu règles le style une fois, et tous les titres qui l'utilisent suivent." },
        { q: "Comment mettre de l'air entre deux paragraphes proprement ?", options: ["Avec l'espacement des paragraphes", "En appuyant 5 fois sur Entrée", "En tapant des espaces"], answer: 0, why: "L'espacement se règle une fois et reste propre, même si tu modifies le texte." },
      ],
    },

    "listes-et-images": {
      chapters: [
        {
          title: "Listes à plusieurs niveaux",
          explain: [
            "Une idée peut avoir des sous-idées : « Fruits », puis dessous « Mangue » et « Banane ». Dans une liste, appuie sur la touche Tab : la ligne se décale à droite et devient une sous-liste.",
            "Pour revenir au niveau d'avant, appuie sur Maj + Tab (Maj est la flèche vers le haut, à gauche du clavier). Tu peux faire plusieurs niveaux, comme le plan d'un cours.",
          ],
          visual: { type: "scene", items: [{ icon: "FaListUl", label: "Je tape ma liste" }, { icon: "FaKeyboard", label: "Tab pour décaler" }, { icon: "FaClipboardList", label: "Une liste en niveaux" }], caption: "Tab descend d'un niveau, Maj + Tab remonte." },
          tip: "Ne décale pas avec la barre d'espace : utilise Tab, sinon ta liste sera de travers.",
        },
        {
          title: "Habiller l'image : le texte autour",
          explain: [
            "Par défaut, une image se comporte comme une grosse lettre : elle reste sur sa ligne et pousse le texte. Clique sur l'image, puis sur le petit bouton « Options de disposition » qui apparaît à côté d'elle.",
            "Choisis « Carré » pour que le texte contourne l'image, ou « Aligné sur le texte » pour la remettre sur sa ligne. Pour couper les bords inutiles, utilise Format de l'image puis Rogner. Pour une légende, fais un clic droit puis Insérer une légende.",
          ],
          visual: { type: "scene", items: [{ icon: "FaImage", label: "Je clique sur l'image" }, { icon: "FaWandMagicSparkles", label: "Disposition : Carré" }, { icon: "FaFile", label: "Le texte contourne l'image" }], caption: "Avec « Carré », le texte coule autour de la photo." },
          tip: "Une image trop lourde ralentit ton fichier. Réduis les grosses photos avant de les insérer, ou utilise Format de l'image puis Compresser les images.",
        },
      ],
      quiz: [
        { q: "Quelle touche décale une ligne de liste vers un sous-niveau ?", options: ["Tab", "Suppr", "Échap"], answer: 0, why: "Tab descend d'un niveau. Maj + Tab remonte." },
        { q: "Je veux que le texte contourne mon image. Quelle disposition choisir ?", options: ["Carré", "Aligné sur le texte", "Supprimer"], answer: 0, why: "Carré fait contourner l'image par le texte. Aligné sur le texte la garde sur sa ligne." },
      ],
    },

    "copier-et-imprimer": {
      chapters: [
        {
          title: "Coller sans la mise en forme, et le pinceau",
          explain: [
            "Quand tu copies un texte depuis internet, il arrive avec ses polices et ses couleurs, et ton document devient mal assorti. Après Ctrl + C, clique sur la petite flèche sous le bouton Coller (onglet Accueil) et choisis « Conserver le texte seulement » (l'icône avec un grand A).",
            "Le pinceau de mise en forme copie le style, pas le texte : sélectionne un mot bien décoré, clique sur le pinceau (onglet Accueil), puis passe sur un autre mot : il prend le même look. Double-clique sur le pinceau pour l'utiliser plusieurs fois.",
          ],
          visual: { type: "scene", items: [{ icon: "FaCopy", label: "Je copie depuis internet" }, { icon: "FaPaste", label: "Je colle : texte seulement" }, { icon: "FaCircleCheck", label: "Mon style reste propre" }], caption: "Le texte arrive sans les couleurs des autres sites." },
          tip: "Appuie sur Échap pour arrêter le pinceau quand tu as fini.",
        },
        {
          title: "Mise en page : marges, numéros et sauts de page",
          explain: [
            "Avant d'imprimer, règle ta page. Onglet Disposition : Marges (l'espace vide autour du texte) et Orientation (Portrait pour un texte, Paysage pour un grand tableau).",
            "Pour numéroter les pages : Insertion, Numéro de page. Pour commencer une nouvelle page proprement, appuie sur Ctrl + Entrée : c'est un saut de page. N'appuie jamais sur Entrée 20 fois : si tu changes un mot au-dessus, tout se décale.",
          ],
          visual: { type: "scene", items: [{ icon: "FaFile", label: "Marges et orientation" }, { icon: "FaHashtag", label: "Numéro de page" }, { icon: "FaPrint", label: "Prêt à imprimer" }], caption: "Trois réglages avant d'envoyer à l'imprimante." },
          tip: "Un en-tête ou un pied de page (onglet Insertion) se répète sur toutes les pages : parfait pour ton nom ou le titre du document.",
        },
      ],
      quiz: [
        { q: "Comment coller un texte d'internet sans ses couleurs ?", options: ["Choisir « Conserver le texte seulement »", "Coller trois fois", "Redémarrer l'ordinateur"], answer: 0, why: "Cette option garde les mots et laisse de côté la mise en forme du site." },
        { q: "Quel raccourci commence une nouvelle page proprement ?", options: ["Ctrl + Entrée", "Entrée 20 fois", "Ctrl + Z"], answer: 0, why: "Ctrl + Entrée insère un saut de page qui ne bouge pas si tu modifies le texte." },
      ],
    },
  },

  /* ======================= EXCEL ======================= */
  excel: {
    "decouvrir-excel": {
      chapters: [
        {
          title: "Sélectionner vite",
          explain: [
            "Glisser la souris sur 500 lignes est long. Clique sur une case, puis maintiens Maj et clique sur une autre case : toute la zone entre les deux est choisie. Clique sur la lettre d'une colonne pour choisir toute la colonne, ou sur le numéro d'une ligne pour toute la ligne.",
            "Quelques raccourcis : Ctrl + A sélectionne tout. Ctrl + flèche saute au bout d'un bloc de données. Ctrl + Maj + flèche sélectionne tout le bloc d'un coup. Pour choisir des cases qui ne se touchent pas, maintiens Ctrl en cliquant.",
          ],
          visual: { type: "grid", rows: [["Nom", "Note"], ["Awa", "14"], ["Koffi", "16"], ["Mariam", "12"]], highlight: ["A1", "B1", "A2", "B2", "A3", "B3", "A4", "B4"], caption: "Toute la zone A1:B4 est sélectionnée d'un seul coup." },
          tip: "Une zone s'écrit avec deux points : B2:D10 veut dire « de B2 jusqu'à D10 ». Tu t'en serviras dans les formules.",
        },
        {
          title: "Figer les volets",
          explain: [
            "Dans un grand tableau, quand tu descends, la première ligne disparaît et tu ne sais plus quelle colonne est quoi. Figer les volets garde la ligne du haut toujours visible.",
            "Onglet Affichage, Figer les volets, Figer la ligne supérieure. Pour garder aussi la première colonne, clique d'abord sur la case B2, puis choisis Affichage, Figer les volets, Figer les volets. Pour annuler : Affichage, Figer les volets, Libérer les volets.",
          ],
          visual: { type: "grid", rows: [["Nom", "Classe", "Note"], ["Awa", "6e", "14"], ["Koffi", "5e", "16"]], highlight: ["A1", "B1", "C1"], caption: "La ligne 1 reste en haut pendant que les autres lignes défilent." },
          tip: "Fige la ligne des titres dès que ton tableau dépasse l'écran : tu éviteras de te tromper de colonne.",
        },
      ],
      quiz: [
        { q: "Que fait Ctrl + A dans Excel ?", options: ["Il sélectionne tout", "Il ajoute une colonne", "Il ferme Excel"], answer: 0, why: "A comme « tout » : Ctrl + A sélectionne l'ensemble des cases." },
        { q: "À quoi sert « Figer les volets » ?", options: ["À garder les titres visibles quand on descend", "À bloquer l'ordinateur", "À effacer les lignes"], answer: 0, why: "La ligne des titres reste en haut, même quand on fait défiler un grand tableau." },
      ],
    },

    "premieres-formules": {
      chapters: [
        {
          title: "Moyenne, minimum, maximum",
          explain: [
            "Excel calcule aussi la moyenne d'une classe, la plus petite note et la plus grande. Les formules s'écrivent : =MOYENNE(B2:B10), =MIN(B2:B10) et =MAX(B2:B10).",
            "Pour compter combien de cases contiennent un nombre, utilise =NB(B2:B10). Pour compter toutes les cases remplies, même avec du texte, utilise =NBVAL(A2:A10).",
          ],
          visual: { type: "grid", rows: [["Awa", "14"], ["Koffi", "16"], ["Mariam", "12"], ["Moyenne", "=MOYENNE(B1:B3)"]], highlight: ["B4"], caption: "En B4, Excel affiche 14 : (14 + 16 + 12) ÷ 3." },
          tip: "Ne tape jamais la moyenne à la main : si une note change, ton résultat serait faux. Laisse la formule travailler.",
        },
        {
          title: "Références absolues : le signe $",
          explain: [
            "Quand tu tires une formule vers le bas, Excel décale les cases à chaque ligne : B1 devient B2, puis B3. C'est un problème quand une case doit rester la même, comme un taux de TVA ou une remise : il faut la verrouiller.",
            "On verrouille avec le signe $ : $B$1 reste toujours B1. Raccourci : écris B1 dans la formule, puis appuie sur F4. Exemple : =A3*(1+$B$1) donne le prix avec la TVA, ligne après ligne.",
          ],
          visual: { type: "grid", rows: [["TVA", "0,18"], ["Prix", "Prix TTC"], ["1000", "=A3*(1+$B$1)"], ["2000", "=A4*(1+$B$1)"]], highlight: ["B1"], caption: "$B$1 reste verrouillée quand on tire la formule vers le bas." },
          tip: "Sur certains ordinateurs portables, il faut appuyer sur Fn + F4.",
        },
        {
          title: "La fonction SI : faire décider Excel",
          explain: [
            "SI permet à Excel de choisir une réponse selon une condition. Elle s'écrit : =SI(condition; si c'est vrai; si c'est faux). Les parties sont séparées par des points-virgules.",
            "Exemple : =SI(B2>=10;\"Admis\";\"Refusé\"). Si la note en B2 est 10 ou plus, Excel écrit Admis, sinon Refusé. Les mots doivent toujours être entre guillemets.",
          ],
          visual: { type: "grid", rows: [["Awa", "14", "=SI(B1>=10;\"Admis\";\"Refusé\")"], ["Koffi", "8", "=SI(B2>=10;\"Admis\";\"Refusé\")"]], highlight: ["C1", "C2"], caption: "Awa a 14 : Excel écrit Admis. Koffi a 8 : Excel écrit Refusé." },
          tip: "Les signes de comparaison : > plus grand, < plus petit, >= plus grand ou égal, = égal, <> différent.",
        },
      ],
      quiz: [
        { q: "Quelle formule calcule la moyenne de B2 à B10 ?", options: ["=MOYENNE(B2:B10)", "=MAX(B2:B10)", "=NB(B2:B10)"], answer: 0, why: "MOYENNE fait la moyenne. MAX donne la plus grande valeur, NB compte les nombres." },
        { q: "Que fait le signe $ dans $B$1 ?", options: ["Il verrouille la case quand on recopie la formule", "Il ajoute des francs", "Il efface la case"], answer: 0, why: "Avec $, la case reste B1 même quand tu tires la formule vers le bas." },
        { q: "Que donne =SI(B2>=10;\"Admis\";\"Refusé\") si B2 vaut 8 ?", options: ["Refusé", "Admis", "8"], answer: 0, why: "8 n'est pas supérieur ou égal à 10 : la condition est fausse, donc Excel écrit Refusé." },
      ],
    },

    "tableau-bien-presente": {
      chapters: [
        {
          title: "Formats : monnaie, pourcentage, date",
          explain: [
            "Ne tape pas « 1500 F » dans une case : Excel croirait que c'est du texte et ne pourrait plus calculer. Écris 1500 et laisse le format faire le décor.",
            "Sélectionne les cases, fais un clic droit, Format de cellule, onglet Nombre. Choisis Monétaire, Pourcentage ou Date. Pour afficher F CFA, choisis Personnalisée et écris : # ##0 \"F CFA\". Le nombre reste un vrai nombre, il s'affiche seulement avec F CFA.",
          ],
          visual: { type: "grid", rows: [["Article", "Prix"], ["Riz", "1 500 F CFA"], ["Huile", "1 200 F CFA"]], highlight: ["B2", "B3"], caption: "Les prix s'affichent avec F CFA, mais restent des nombres." },
          tip: "Pour un pourcentage, écris 0,18 : avec le format Pourcentage, Excel affiche 18 %.",
        },
        {
          title: "Mise en forme conditionnelle : les couleurs qui préviennent",
          explain: [
            "Imagine une colonne de notes où les mauvaises notes se colorent toutes seules en rouge. C'est la mise en forme conditionnelle : la couleur dépend de la valeur de la case.",
            "Sélectionne les notes, onglet Accueil, Mise en forme conditionnelle, Règles de mise en surbrillance des cellules, Inférieur à. Tape 10 et choisis une couleur. Si tu changes une note, la couleur suit toute seule.",
          ],
          visual: { type: "grid", rows: [["Awa", "14"], ["Koffi", "8"], ["Mariam", "12"], ["Issa", "6"]], highlight: ["B2", "B4"], caption: "Les notes inférieures à 10 (B2 et B4) sont mises en évidence." },
          tip: "N'abuse pas des couleurs : une ou deux règles suffisent pour que l'œil voie tout de suite ce qui compte.",
        },
      ],
      quiz: [
        { q: "Pourquoi éviter d'écrire « 1500 F » dans une case ?", options: ["Excel croirait que c'est du texte et ne pourrait plus calculer", "C'est interdit par la loi", "Ça efface la case voisine"], answer: 0, why: "Écris le nombre seul et ajoute F CFA avec le format de cellule : le calcul reste possible." },
        { q: "Que fait la mise en forme conditionnelle ?", options: ["Elle change la couleur selon la valeur de la case", "Elle trie le tableau", "Elle imprime le tableau"], answer: 0, why: "La couleur suit la valeur : si la note change, la couleur change aussi." },
      ],
    },

    "trier-et-graphique": {
      chapters: [
        {
          title: "Filtrer : n'afficher que ce qu'on cherche",
          explain: [
            "Trier range les lignes. Filtrer, lui, cache celles qui ne t'intéressent pas. Clique dans ton tableau, puis onglet Données, Filtrer : de petites flèches apparaissent sur la ligne des titres.",
            "Clique sur la flèche d'une colonne et coche seulement ce que tu veux voir, par exemple la classe « 6e ». Les autres lignes sont cachées, pas supprimées. Pour tout revoir, clique sur Données, Effacer.",
          ],
          visual: { type: "scene", items: [{ icon: "FaTableCells", label: "Tout le tableau" }, { icon: "FaMagnifyingGlassPlus", label: "Filtre : classe 6e" }, { icon: "FaCircleCheck", label: "Seules les lignes voulues" }], caption: "Le filtre cache les lignes inutiles sans rien effacer." },
          tip: "Les numéros de ligne deviennent bleus quand un filtre est actif : des lignes sont cachées. Pense-y avant de recopier ou de compter.",
        },
        {
          title: "Tableau croisé dynamique : résumer en quelques clics",
          explain: [
            "Tu as 200 ventes et tu veux savoir combien chaque vendeur a vendu. Le tableau croisé dynamique résume tout en quelques clics, sans écrire de formule.",
            "Clique dans ton tableau, puis Insertion, Tableau croisé dynamique, OK. À droite, glisse « Vendeur » dans Lignes et « Montant » dans Valeurs : Excel calcule le total de chacun.",
            "Si les données changent, fais un clic droit sur le tableau croisé, puis Actualiser.",
          ],
          visual: { type: "grid", rows: [["Vendeur", "Total"], ["Awa", "45000"], ["Koffi", "32000"], ["Total général", "77000"]], highlight: ["A1", "B1"], caption: "Résultat : le total des ventes de chaque vendeur, calculé tout seul." },
          tip: "Ton tableau de départ doit avoir une ligne de titres et aucune ligne ou colonne vide au milieu, sinon le résumé sera faux.",
        },
      ],
      quiz: [
        { q: "Quelle différence entre trier et filtrer ?", options: ["Trier range les lignes, filtrer cache celles qu'on ne veut pas voir", "Trier efface, filtrer colorie", "Il n'y en a aucune"], answer: 0, why: "Trier change l'ordre. Filtrer cache temporairement certaines lignes." },
        { q: "À quoi sert un tableau croisé dynamique ?", options: ["À résumer beaucoup de lignes en quelques clics", "À écrire du texte", "À imprimer plus vite"], answer: 0, why: "Il calcule des totaux par catégorie (par vendeur, par mois…) sans formule." },
      ],
    },
  },

  /* ======================= POWERPOINT ======================= */
  powerpoint: {
    "premiere-presentation": {
      chapters: [
        {
          title: "Les dispositions : le plan d'une diapositive",
          explain: [
            "Une disposition, c'est le plan d'une diapositive : où se trouvent le titre, le texte, les images. Tu n'as pas à tout placer à la main : dans l'onglet Accueil, clique sur « Disposition » et choisis.",
            "« Titre et contenu » convient à la plupart des pages. « Deux contenus » est parfait pour comparer, par exemple une image à gauche et du texte à droite. « Titre seul » laisse la place à ton schéma.",
          ],
          visual: { type: "slide", title: "Deux contenus", bullets: ["Du texte à gauche", "Une image à droite"], caption: "Une disposition range les éléments à ta place." },
          tip: "Choisis la disposition avant d'écrire : si tu la changes après, tes boîtes de texte peuvent se déplacer.",
        },
        {
          title: "Réorganiser : le trieur et les sections",
          explain: [
            "Tu veux changer l'ordre de tes pages ? Onglet Affichage, puis Trieur de diapositives : toutes tes pages s'affichent en petit. Glisse-les avec la souris pour les déplacer.",
            "Clic droit sur une page pour la dupliquer, la supprimer ou la masquer (elle reste dans le fichier mais ne sera pas montrée). Pour une longue présentation, clic droit puis Ajouter une section : tu ranges tes pages par groupes, comme des chapitres.",
          ],
          visual: { type: "scene", items: [{ icon: "FaFilm", label: "Toutes les pages en petit" }, { icon: "FaArrowPointer", label: "Je glisse une page" }, { icon: "FaCircleCheck", label: "Le nouvel ordre" }], caption: "Le trieur montre ta présentation d'un seul coup d'œil." },
          tip: "Dupliquer une bonne page est plus rapide que d'en refaire une, et ça garde le même style.",
        },
      ],
      quiz: [
        { q: "Quelle disposition choisir pour comparer une image et du texte ?", options: ["Deux contenus", "Titre seul", "Page sans cadre"], answer: 0, why: "« Deux contenus » prépare deux zones côte à côte." },
        { q: "Où voir toutes les diapositives en petit pour les déplacer ?", options: ["Affichage, Trieur de diapositives", "Fichier, Imprimer", "Insertion, Formes"], answer: 0, why: "Le trieur montre toutes les pages et te laisse les glisser pour changer l'ordre." },
      ],
    },

    "belle-presentation": {
      chapters: [
        {
          title: "Le masque des diapositives",
          explain: [
            "Tu veux mettre ton logo sur toutes les pages ? Ne le copie pas 20 fois. Va dans l'onglet Affichage, puis Masque des diapositives : c'est le patron de toutes tes pages.",
            "Tout ce que tu changes sur la première grande page du masque (la police, une couleur, un logo) s'applique à toutes les pages. Quand tu as fini, clique sur « Fermer le mode masque ».",
          ],
          visual: { type: "scene", items: [{ icon: "FaFile", label: "Le masque, le patron" }, { icon: "FaWandMagicSparkles", label: "Je change le logo" }, { icon: "FaFilm", label: "Toutes les pages suivent" }], caption: "Un seul changement dans le masque, et toutes les pages sont à jour." },
          tip: "Fais les changements de style dans le masque, pas page par page : ta présentation restera cohérente.",
        },
        {
          title: "Aligner, répartir et grouper les objets",
          explain: [
            "Des formes mal rangées donnent une impression de désordre. Sélectionne plusieurs objets en cliquant dessus avec la touche Maj enfoncée, puis ouvre Accueil, Organiser, Aligner.",
            "Choisis « Aligner au milieu » pour les mettre sur la même ligne, puis « Distribuer horizontalement » pour avoir le même espace entre eux. Pour qu'ils bougent ensuite ensemble, appuie sur Ctrl + G : c'est le groupement.",
          ],
          visual: { type: "scene", items: [{ icon: "FaShapes", label: "Formes en désordre" }, { icon: "FaWandMagicSparkles", label: "Aligner et distribuer" }, { icon: "FaCircleCheck", label: "Formes bien rangées" }], caption: "Aligner donne tout de suite un air soigné." },
          tip: "Quand tu déplaces un objet, des lignes de repère apparaissent : elles te disent quand il est bien aligné avec les autres.",
        },
      ],
      quiz: [
        { q: "Où changer le logo de toutes les pages d'un coup ?", options: ["Dans le masque des diapositives", "Page par page", "Dans les notes"], answer: 0, why: "Le masque est le patron : ce que tu y changes s'applique à toutes les pages." },
        { q: "Que fait Ctrl + G sur plusieurs objets sélectionnés ?", options: ["Il les groupe pour les déplacer ensemble", "Il les efface", "Il les imprime"], answer: 0, why: "G comme Grouper : les objets groupés bougent et se redimensionnent comme un seul." },
      ],
    },

    "formes-et-animations": {
      chapters: [
        {
          title: "Animations : une idée à la fois",
          explain: [
            "Une animation fait apparaître un élément au bon moment, par exemple une idée à la fois pendant que tu parles. Sélectionne un texte ou une forme, puis onglet Animations et choisis « Apparition » ou « Fondu ».",
            "Le Volet Animation (un bouton de l'onglet Animations) liste toutes les animations dans l'ordre : tu peux les glisser pour changer l'ordre. Choisis « Au clic » pour déclencher à ton rythme, ou « Après la précédente » pour que tout s'enchaîne tout seul.",
          ],
          visual: { type: "slide", title: "Trois idées, trois clics", bullets: ["Premier clic : idée 1", "Deuxième clic : idée 2", "Troisième clic : idée 3"], caption: "Chaque idée apparaît au moment où tu en parles." },
          tip: "Une animation par idée, jamais plus. Trop d'effets fatiguent le public et détournent l'attention de ce que tu dis.",
        },
        {
          title: "SmartArt : un schéma en 30 secondes",
          explain: [
            "SmartArt est un schéma tout prêt : une suite d'étapes, un cycle, un organigramme. Onglet Insertion, SmartArt, puis choisis une catégorie comme « Processus » ou « Cycle ».",
            "Tu écris tes mots dans le volet de gauche et le schéma se dessine tout seul. Astuce : si tu as déjà une liste, sélectionne-la, puis Accueil, Convertir en graphique SmartArt.",
          ],
          visual: { type: "scene", items: [{ icon: "FaPenToSquare", label: "Ma liste d'idées" }, { icon: "FaShapes", label: "Convertir en SmartArt" }, { icon: "FaCircleCheck", label: "Un schéma prêt" }], caption: "Une simple liste devient un schéma en quelques clics." },
          tip: "Un schéma de 3 à 5 éléments se lit bien. Au-delà, coupe-le en deux pages.",
        },
      ],
      quiz: [
        { q: "Quelle option déclenche une animation à ton rythme ?", options: ["Au clic", "Après la précédente", "Jamais"], answer: 0, why: "« Au clic » attend que tu cliques. « Après la précédente » s'enchaîne toute seule." },
        { q: "À quoi sert SmartArt ?", options: ["À créer un schéma rapidement", "À corriger l'orthographe", "À imprimer en couleur"], answer: 0, why: "Il propose des schémas tout prêts (processus, cycle, organigramme) que tu remplis avec tes mots." },
      ],
    },

    "presenter-avec-confiance": {
      chapters: [
        {
          title: "Mode Présentateur et raccourcis du diaporama",
          explain: [
            "Pendant que tu présentes, le public voit la diapositive, mais toi tu peux voir tes notes et la page suivante grâce au mode Présentateur. Onglet Diaporama, coche « Utiliser le mode Présentateur » (il faut deux écrans, par exemple ton ordinateur et un projecteur).",
            "Raccourcis à connaître pendant la présentation : B met l'écran en noir pour que le public te regarde, toi (appuie encore sur B pour revenir). Tape un numéro puis Entrée pour sauter à cette page. Maintiens Ctrl en cliquant pour montrer un point avec le pointeur laser.",
          ],
          visual: { type: "scene", items: [{ icon: "FaDisplay", label: "Le public voit la page" }, { icon: "FaPersonChalkboard", label: "Toi, tu vois tes notes" }, { icon: "FaUsers", label: "Tu gardes le contact" }], caption: "Le mode Présentateur te donne un aide-mémoire que le public ne voit pas." },
          tip: "Teste ton matériel avant le jour J : câble, écran, volume. La plupart des problèmes viennent de là.",
        },
        {
          title: "Chronométrer et exporter en vidéo",
          explain: [
            "Pour savoir si ton exposé tient dans le temps donné, entraîne-toi avec F5 et chronomètre-toi. L'onglet Diaporama propose aussi « Vérifier le minutage », qui note le temps passé sur chaque page.",
            "Tu peux enregistrer ta présentation en vidéo : Fichier, Exporter, Créer une vidéo. Elle se lit sur n'importe quel téléphone, même sans PowerPoint, et tu peux l'envoyer par WhatsApp.",
          ],
          visual: { type: "scene", items: [{ icon: "FaStopwatch", label: "Je chronomètre" }, { icon: "FaFilm", label: "Je crée la vidéo" }, { icon: "FaPaperPlane", label: "J'envoie par WhatsApp" }], caption: "Une présentation chronométrée, puis partagée en vidéo." },
          tip: "Vise un peu moins que le temps donné : le stress fait parler plus vite, et il vaut mieux finir en avance que d'être coupé.",
        },
      ],
      quiz: [
        { q: "Que fait la touche B pendant le diaporama ?", options: ["Elle met l'écran en noir", "Elle quitte PowerPoint", "Elle supprime la page"], answer: 0, why: "L'écran devient noir pour que le public se concentre sur toi. Un second appui sur B le rallume." },
        { q: "Comment obtenir une vidéo de ma présentation ?", options: ["Fichier, Exporter, Créer une vidéo", "Insertion, Images", "Accueil, Gras"], answer: 0, why: "La vidéo se lit partout, même sans PowerPoint." },
      ],
    },
  },
};