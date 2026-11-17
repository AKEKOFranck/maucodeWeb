// Cours « Les fondamentaux de la programmation » (aucun langage : on apprend à raisonner).
// Même format que lib/data/modules.js. Texte brut uniquement : pas de HTML.
// Ce fichier n'importe rien : il est ajouté à COURSES dans modules.js.
// Vérification : node scripts/check-courses.mjs
export const PROGRAMMING = {
  fondamentaux: {
    software: "Programmation",
    icon: "FaBrain",
    accent: "#7c3aed",
    title: "Les fondamentaux de la programmation",
    intro: "Avant d'écrire du code, il faut apprendre à réfléchir comme un programmeur. Ici, pas de langage compliqué : on comprend les idées qui servent partout, en Python comme en JavaScript.",
    modules: [
      /* =========================== MODULE 1 =========================== */
      {
        slug: "penser-comme-un-programmeur",
        added: "2026-11-17",
        title: "Penser comme un programmeur",
        icon: "FaBrain",
        intro: "Programme, algorithme, variables et opérateurs : les briques de base de tout programme.",
        chapters: [
          {
            title: "Un programme, c'est une recette",
            explain: [
              "Une recette de cuisine est une liste d'instructions que tu suis dans l'ordre. Un programme, c'est pareil : une liste d'instructions que l'ordinateur suit, une par une, sans jamais se fatiguer.",
              "L'ordinateur est très obéissant mais pas intelligent : il fait exactement ce que tu écris, rien de plus. Si la recette oublie le sel, il n'en met pas. Programmer, c'est donc apprendre à donner des instructions claires et complètes.",
            ],
            visual: { type: "scene", items: [{ icon: "FaClipboardList", label: "La recette (le programme)" }, { icon: "FaBrain", label: "L'ordinateur la suit" }, { icon: "FaCircleCheck", label: "Le résultat" }], caption: "Tu écris la recette, l'ordinateur l'exécute à la lettre." },
            tip: "Python et JavaScript sont seulement des langues pour écrire la recette. Ici, on apprend à réfléchir, quel que soit le langage.",
          },
          {
            title: "L'algorithme : réfléchir avant d'écrire",
            explain: [
              "Un algorithme est la recette écrite en français, avant de choisir un langage. Il décrit les étapes pour résoudre un problème avec trois parties : l'entrée (ce qu'on donne), le traitement (ce qu'on fait) et la sortie (ce qu'on obtient).",
              "Exemple : calculer le prix d'un sac de riz avec une réduction. Entrée : le prix et le pourcentage. Traitement : calculer la réduction puis la retrancher. Sortie : le prix à payer. Écris toujours ces trois parties avant de coder.",
            ],
            visual: { type: "slide", title: "Algorithme : préparer du thé", bullets: ["Faire bouillir l'eau", "Verser l'eau sur le thé", "Attendre 3 minutes", "Servir"], caption: "Des étapes précises, dans le bon ordre." },
            tip: "Un bon algorithme est précis (pas de « un peu »), fini (il s'arrête) et dans le bon ordre.",
          },
          {
            title: "Variables et types",
            explain: [
              "Une variable est une boîte qui porte une étiquette et contient une valeur. La boîte « age » peut contenir 15. Tu peux changer le contenu : l'année suivante, age prend la valeur 16.",
              "Chaque valeur a un type : entier (15), décimal (1,62), texte (« Awa ») ou booléen (vrai ou faux). Le type décide de ce qu'on peut faire : deux nombres s'additionnent, mais deux textes se collent : « 5 » plus « 5 » donne « 55 ».",
            ],
            visual: { type: "grid", rows: [["Variable", "Valeur", "Type"], ["prenom", "Awa", "texte"], ["age", "15", "entier"], ["taille", "1,62", "décimal"], ["admis", "vrai", "booléen"]], highlight: ["A1", "B1", "C1"], caption: "Chaque variable a un nom, une valeur et un type." },
            tip: "Donne des noms clairs à tes variables : prix_total se comprend tout de suite, x non.",
          },
          {
            title: "Les opérateurs",
            explain: [
              "Les opérateurs de calcul sont +, -, * et /. Deux autres sont très utiles : la division entière (7 divisé par 2 donne 3) et le reste, appelé modulo (7 modulo 2 donne 1). Le modulo sert à savoir si un nombre est pair : s'il reste 0 quand on divise par 2, il est pair.",
              "Les opérateurs de comparaison donnent vrai ou faux : égal, différent, plus grand, plus petit. Attention : un seul signe = range une valeur dans une variable, alors que comparer s'écrit souvent avec deux signes ==. Les opérateurs logiques ET, OU et NON combinent des conditions.",
            ],
            visual: { type: "grid", rows: [["Opération", "Écriture", "Résultat"], ["Division entière", "7 div 2", "3"], ["Reste (modulo)", "7 modulo 2", "1"], ["Égal ?", "7 == 2", "faux"], ["Différent ?", "7 != 2", "vrai"]], highlight: ["C2", "C3"], caption: "Le modulo donne le reste de la division." },
            tip: "Confondre = (ranger une valeur) et == (comparer) est l'erreur numéro un des débutants.",
          },
        ],
        quiz: [
          { q: "Que fait un ordinateur avec un programme ?", options: ["Il devine ce que tu veux dire", "Il suit les instructions exactement, dans l'ordre", "Il corrige tes erreurs tout seul"], answer: 1, why: "Il fait exactement ce qui est écrit, rien de plus et rien de moins." },
          { q: "Qu'est-ce qu'un algorithme ?", options: ["Une suite d'étapes précises pour résoudre un problème", "Un langage de programmation", "Un type de clavier"], answer: 0, why: "L'algorithme est la recette, indépendante du langage choisi ensuite." },
          { q: "Quel type convient à la valeur vrai ?", options: ["Entier", "Texte", "Booléen"], answer: 2, why: "Un booléen ne peut valoir que vrai ou faux." },
          { q: "Que vaut 17 modulo 5 ?", options: ["2", "3", "12"], answer: 0, why: "17 = 3 fois 5 plus 2. Le reste est 2." },
          { q: "Comment savoir si un nombre n est pair ?", options: ["Si n modulo 2 vaut 1", "Si n div 2 vaut 0", "Si n modulo 2 vaut 0"], answer: 2, why: "Un nombre pair se divise par 2 sans reste." },
          { q: "Quelles sont les trois parties d'un algorithme ?", options: ["Début, milieu, fin", "Entrée, traitement, sortie", "Titre, texte, image"], answer: 1, why: "On donne des entrées, on les traite, on obtient une sortie." },
        ],
        exercise: {
          title: "Le prix avec réduction",
          instructions: [
            "Écris l'algorithme qui calcule le prix à payer pour un article de 8000 F avec 15 % de réduction.",
            "Commence par noter l'entrée, le traitement et la sortie.",
            "Donne un nom clair à chaque variable.",
            "Teste ton algorithme à la main avec 8000 F et 15 %, puis avec 10000 F et 20 %.",
          ],
          correction: [
            "Entrées : prix et pourcentage. Sortie : prix_final.",
            "Traitement : reduction = prix * pourcentage / 100, puis prix_final = prix - reduction.",
            "Pour 8000 et 15 : reduction = 1200, prix_final = 6800.",
            "Pour 10000 et 20 : reduction = 2000, prix_final = 8000.",
          ],
          visual: { type: "grid", rows: [["prix", "pourcentage", "reduction", "prix_final"], ["8000", "15", "1200", "6800"], ["10000", "20", "2000", "8000"]], highlight: ["D2", "D3"], caption: "Résultats attendus pour les deux tests." },
        },
      },

      /* =========================== MODULE 2 =========================== */
      {
        slug: "faire-des-choix-et-repeter",
        added: "2026-11-17",
        title: "Faire des choix et répéter",
        icon: "FaShuffle",
        intro: "Conditions, boucles et fonctions : le programme décide, répète et se range.",
        chapters: [
          {
            title: "Les conditions : si, sinon",
            explain: [
              "Une condition fait choisir un chemin. En français : si la note est supérieure ou égale à 10, afficher Admis, sinon afficher Refusé. L'ordinateur teste la condition : si elle est vraie, il suit le premier chemin, sinon l'autre.",
              "On peut enchaîner : si note ≥ 16, Très bien ; sinon si note ≥ 12, Bien ; sinon si note ≥ 10, Passable ; sinon Insuffisant. L'ordinateur s'arrête au premier test vrai : mets donc le plus exigeant en premier.",
            ],
            visual: { type: "scene", items: [{ icon: "FaBrain", label: "Je teste la condition" }, { icon: "FaCircleCheck", label: "Vrai : chemin 1" }, { icon: "FaShuffle", label: "Faux : chemin 2" }], caption: "Un seul des deux chemins est suivi." },
            tip: "Les deux chemins ne s'exécutent jamais ensemble : c'est l'un ou l'autre.",
          },
          {
            title: "Combiner : ET, OU, NON",
            explain: [
              "ET est vrai seulement si les deux conditions sont vraies : avoir 10 en maths ET 10 en français. OU est vrai dès qu'une des deux l'est : être inscrit OU avoir une invitation. NON inverse : NON vrai donne faux.",
              "Pour vérifier qu'une note est entre 10 et 20, écris : note ≥ 10 ET note ≤ 20. L'erreur classique est d'écrire note ≥ 10 OU note ≤ 20 : ce test est toujours vrai, quelle que soit la note.",
            ],
            visual: { type: "grid", rows: [["A", "B", "A ET B", "A OU B"], ["vrai", "vrai", "vrai", "vrai"], ["vrai", "faux", "faux", "vrai"], ["faux", "vrai", "faux", "vrai"], ["faux", "faux", "faux", "faux"]], highlight: ["C1", "D1"], caption: "La table de vérité de ET et de OU." },
            tip: "ET est strict (tout doit être vrai), OU est large (un seul suffit).",
          },
          {
            title: "Les boucles : répéter sans se fatiguer",
            explain: [
              "Une boucle répète des instructions. La boucle POUR s'utilise quand on sait combien de fois : pour i de 1 à 5, afficher i affiche 1, 2, 3, 4, 5. La boucle TANT QUE répète tant qu'une condition est vraie, sans savoir combien de tours il faudra.",
              "Exemple de TANT QUE : tant que le solde est supérieur à 0, retirer 500. Attention à la boucle infinie : si rien dans la boucle ne change la condition, elle ne s'arrête jamais et le programme se bloque. Vérifie toujours que quelque chose avance.",
            ],
            visual: { type: "slide", title: "Boucle POUR de 1 à 3", bullets: ["i vaut 1 : afficher 1", "i vaut 2 : afficher 2", "i vaut 3 : afficher 3", "i dépasse 3 : fin"], caption: "La boucle s'arrête quand i dépasse la limite." },
            tip: "POUR quand on connaît le nombre de tours, TANT QUE quand on dépend d'une condition.",
          },
          {
            title: "Les boucles imbriquées",
            explain: [
              "Une boucle dans une boucle : la boucle intérieure fait tous ses tours à chaque tour de la boucle extérieure. Pour une table de multiplication de 1 à 3 : pour a de 1 à 3, pour b de 1 à 3, afficher a fois b. Cela donne 3 fois 3, soit 9 résultats.",
              "Le nombre d'opérations se multiplie : 10 tours dehors et 10 dedans font 100 opérations ; 1000 et 1000 en font un million. Plus on imbrique de boucles, plus le programme ralentit. Retiens-le, on en reparle avec la complexité.",
            ],
            visual: { type: "grid", rows: [["1", "2", "3"], ["2", "4", "6"], ["3", "6", "9"]], highlight: ["C3"], caption: "Deux boucles de 3 tours donnent 9 cases." },
            tip: "Une boucle imbriquée est un tableau : une boucle pour les lignes, une pour les colonnes.",
          },
          {
            title: "Les fonctions : des mini-recettes",
            explain: [
              "Une fonction est une mini-recette à laquelle tu donnes un nom. Tu l'écris une fois et tu l'utilises partout. Elle reçoit des paramètres (les entrées) et peut renvoyer un résultat. Exemple : prixFinal(prix, pourcentage) renvoie le prix moins la réduction.",
              "Avantages : pas de répétition, un seul endroit à corriger, un programme plus lisible. Une bonne fonction fait une seule chose et porte un nom qui la décrit. Les variables créées dedans n'existent que dedans : on les dit locales.",
            ],
            visual: { type: "scene", items: [{ icon: "FaPen", label: "J'écris la fonction une fois" }, { icon: "FaPaperPlane", label: "Je l'appelle avec des valeurs" }, { icon: "FaCircleCheck", label: "Elle renvoie un résultat" }], caption: "Une fonction : écrite une fois, utilisée partout." },
            tip: "Si tu copies-colles le même bloc deux fois, c'est le signe qu'il faut en faire une fonction.",
          },
        ],
        quiz: [
          { q: "Quelle structure choisir quand on ne sait pas combien de répétitions il faudra ?", options: ["Une boucle POUR de 1 à 10", "Une variable", "Une boucle TANT QUE"], answer: 2, why: "TANT QUE continue tant que la condition reste vraie, quel que soit le nombre de tours." },
          { q: "Que vaut vrai ET faux ?", options: ["vrai", "faux", "On ne peut pas savoir"], answer: 1, why: "ET exige que les deux soient vrais." },
          { q: "Comment tester qu'une note est entre 10 et 20 ?", options: ["note ≥ 10 ET note ≤ 20", "note ≥ 10 OU note ≤ 20", "note = 10 ET note = 20"], answer: 0, why: "Les deux bornes doivent être respectées en même temps : c'est un ET." },
          { q: "Une boucle de 10 tours contient une boucle de 10 tours. Combien de fois l'intérieur s'exécute-t-il ?", options: ["20", "10", "100"], answer: 2, why: "10 fois 10 : l'intérieur refait ses 10 tours à chaque tour extérieur." },
          { q: "Pourquoi une boucle infinie se produit-elle ?", options: ["Rien ne change la condition d'arrêt", "L'ordinateur est trop lent", "La boucle est trop courte"], answer: 0, why: "Si la condition ne change jamais, la boucle ne trouve jamais la sortie." },
          { q: "À quoi sert une fonction ?", options: ["À éteindre le programme", "À éviter de répéter le même bloc d'instructions", "À effacer les variables"], answer: 1, why: "On écrit la mini-recette une fois et on l'appelle autant de fois que nécessaire." },
        ],
        exercise: {
          title: "Les mentions de la classe",
          instructions: [
            "Écris une fonction mention(note) : 16 ou plus donne Très bien, 12 ou plus donne Bien, 10 ou plus donne Passable, sinon Insuffisant.",
            "Parcours avec une boucle les notes 14, 9 et 17 et affiche la mention de chacune.",
            "Compte combien de notes sont supérieures ou égales à 10.",
            "Affiche le nombre d'admis à la fin.",
          ],
          correction: [
            "On teste dans l'ordre : si note ≥ 16 renvoyer Très bien, sinon si note ≥ 12 renvoyer Bien, sinon si note ≥ 10 renvoyer Passable, sinon Insuffisant.",
            "Pour chaque note de la liste, afficher mention(note) : Bien, Insuffisant, Très bien.",
            "Crée une variable admis qui vaut 0 au départ. Dans la boucle, si note ≥ 10, augmente admis de 1.",
            "Après la boucle, afficher admis : 2 (les notes 14 et 17).",
          ],
          visual: { type: "grid", rows: [["note", "mention", "admis ?"], ["14", "Bien", "oui"], ["9", "Insuffisant", "non"], ["17", "Très bien", "oui"]], highlight: [], caption: "Résultats attendus." },
        },
      },

      /* =========================== MODULE 3 =========================== */
      {
        slug: "ranger-ses-donnees",
        added: "2026-11-17",
        title: "Ranger ses données",
        icon: "FaTableCells",
        intro: "Tableaux, chaînes, dictionnaires, piles, files et ensembles : bien ranger pour bien chercher.",
        chapters: [
          {
            title: "Les tableaux : une rangée de casiers",
            explain: [
              "Un tableau range plusieurs valeurs sous un seul nom, comme une rangée de casiers numérotés. Le numéro d'un casier s'appelle l'indice, et on commence à compter à 0 : le premier élément a l'indice 0, le deuxième l'indice 1.",
              "Pour lire le troisième prénom d'un tableau prenoms, on écrit prenoms[2]. Pour tout parcourir, une boucle va de 0 jusqu'à la taille moins 1. Aller au-delà de la dernière case donne l'erreur « hors limites », très fréquente chez les débutants.",
            ],
            visual: { type: "grid", rows: [["Indice", "0", "1", "2", "3"], ["Prénom", "Awa", "Koffi", "Issa", "Mariam"]], highlight: ["B1", "C1", "D1", "E1"], caption: "Le tableau a 4 éléments, les indices vont de 0 à 3." },
            tip: "Un tableau de 4 éléments a pour dernier indice 3, pas 4.",
          },
          {
            title: "Les chaînes de caractères",
            explain: [
              "Une chaîne de caractères est un texte vu comme un tableau de lettres : « Awa » a trois caractères aux indices 0, 1 et 2. On peut connaître sa longueur, lire une lettre, passer en majuscules, découper, ou coller deux textes bout à bout (la concaténation).",
              "Pour vérifier un palindrome (kayak, radar), compare la chaîne avec son inverse. Pour compter les voyelles, parcours chaque lettre avec une boucle et teste si elle fait partie de a, e, i, o, u, y.",
            ],
            visual: { type: "scene", items: [{ icon: "FaFont", label: "Un texte" }, { icon: "FaBarsStaggered", label: "Découpé en lettres" }, { icon: "FaWandMagicSparkles", label: "Transformé" }], caption: "Un texte, c'est un tableau de lettres." },
            tip: "Les majuscules et les espaces comptent : « Awa » et « awa » sont deux textes différents.",
          },
          {
            title: "Les dictionnaires : clé et valeur",
            explain: [
              "Un dictionnaire range des paires clé et valeur, comme un répertoire : tu cherches un nom (la clé) et tu obtiens un numéro (la valeur). Contrairement au tableau, on ne retrouve pas l'information par un indice mais par sa clé.",
              "Les clés sont uniques : écrire deux fois la même clé remplace la valeur. Un dictionnaire est idéal pour compter (combien de fois chaque mot apparaît) ou décrire un objet (un élève avec son nom, sa ville, son âge). Retrouver une valeur par sa clé reste très rapide, même avec des milliers d'entrées.",
            ],
            visual: { type: "grid", rows: [["Clé", "Valeur"], ["nom", "Awa"], ["ville", "Bouaké"], ["age", "15"]], highlight: ["A1", "B1"], caption: "Chaque clé mène à sa valeur." },
            tip: "Question à te poser : est-ce que je cherche par position (tableau) ou par nom (dictionnaire) ?",
          },
          {
            title: "Piles, files et ensembles",
            explain: [
              "Une pile fonctionne comme des assiettes empilées : on pose et on retire au sommet, donc dernier arrivé, premier sorti. Le bouton Annuler (Ctrl + Z) en est un exemple : la dernière action est annulée en premier.",
              "Une file fonctionne comme la queue devant un guichet : premier arrivé, premier servi. Un ensemble garde chaque valeur une seule fois : ajouter Awa deux fois ne la compte qu'une fois, ce qui est pratique pour supprimer les doublons d'une liste.",
            ],
            visual: { type: "scene", items: [{ icon: "FaFile", label: "Pile : dernier arrivé, premier sorti" }, { icon: "FaUsers", label: "File : premier arrivé, premier servi" }, { icon: "FaCircleCheck", label: "Ensemble : jamais de doublon" }], caption: "Trois façons de ranger selon le besoin." },
            tip: "Pile pour revenir en arrière, file pour traiter dans l'ordre d'arrivée, ensemble pour éviter les doublons.",
          },
        ],
        quiz: [
          { q: "Quel est l'indice du premier élément d'un tableau ?", options: ["1", "0", "-1"], answer: 1, why: "On commence à compter à 0 dans presque tous les langages." },
          { q: "Un tableau a 5 éléments. Quel est le dernier indice ?", options: ["5", "6", "4"], answer: 2, why: "Les indices vont de 0 à 4." },
          { q: "Quelle structure pour retrouver un numéro de téléphone à partir d'un nom ?", options: ["Un dictionnaire", "Une pile", "Une file"], answer: 0, why: "Le nom est la clé, le numéro est la valeur." },
          { q: "Le bouton Annuler fonctionne plutôt comme…", options: ["Une file", "Une pile", "Un ensemble"], answer: 1, why: "La dernière action faite est la première annulée : dernier arrivé, premier sorti." },
          { q: "Quelle structure supprime automatiquement les doublons ?", options: ["Une pile", "Un tableau trié", "Un ensemble"], answer: 2, why: "Un ensemble garde chaque valeur une seule fois." },
          { q: "Comment s'appelle l'action de coller deux textes bout à bout ?", options: ["La concaténation", "La boucle", "Le modulo"], answer: 0, why: "Concaténer, c'est enchaîner deux chaînes en une." },
        ],
        exercise: {
          title: "Le répertoire de la classe",
          instructions: [
            "Crée un dictionnaire avec 4 élèves et leur ville : Awa Bouaké, Koffi Daloa, Issa Bouaké, Mariam Korhogo.",
            "Parcours le dictionnaire et compte combien d'élèves habitent Bouaké.",
            "Crée la liste de prénoms Awa, Koffi, Awa, Issa et supprime les doublons avec un ensemble.",
            "Affiche la longueur du prénom le plus long.",
          ],
          correction: [
            "Les clés sont les prénoms, les valeurs sont les villes.",
            "Compteur à 0, puis pour chaque ville, si elle vaut Bouaké, ajoute 1 : le résultat est 2.",
            "L'ensemble donne Awa, Koffi, Issa : trois valeurs au lieu de quatre.",
            "Koffi (5 lettres) est le plus long : 5.",
          ],
          visual: { type: "grid", rows: [["Élève", "Ville"], ["Awa", "Bouaké"], ["Koffi", "Daloa"], ["Issa", "Bouaké"], ["Mariam", "Korhogo"]], highlight: ["B2", "B4"], caption: "Deux élèves habitent Bouaké." },
        },
      },

      /* =========================== MODULE 4 =========================== */
      {
        slug: "les-grands-classiques",
        added: "2026-11-17",
        title: "Les grands classiques",
        icon: "FaMagnifyingGlassPlus",
        intro: "Recherches, tris, récursivité et complexité : les algorithmes que tout le monde doit connaître.",
        chapters: [
          {
            title: "La recherche séquentielle",
            explain: [
              "Pour chercher une valeur dans un tableau, le plus simple est de regarder case par case, du début à la fin, jusqu'à la trouver. C'est la recherche séquentielle. Pour chercher 18 dans 4, 9, 18, 25, il faut trois comparaisons.",
              "Dans le pire cas (valeur absente ou en dernière place), on regarde les n éléments : 1000 éléments demandent 1000 comparaisons. Elle fonctionne toujours, même si le tableau est en désordre, mais devient lente quand les données sont nombreuses.",
            ],
            visual: { type: "slide", title: "Chercher 18", bullets: ["Case 0 : 4, non", "Case 1 : 9, non", "Case 2 : 18, trouvé !", "On s'arrête"], caption: "On s'arrête dès que la valeur est trouvée." },
            tip: "Si la valeur n'existe pas, pense à renvoyer un résultat clair, par exemple -1, au lieu de ne rien dire.",
          },
          {
            title: "La recherche dichotomique",
            explain: [
              "Si le tableau est trié, on peut faire bien mieux : regarder la case du milieu. Valeur trop petite ? On garde la moitié de droite. Trop grande ? On garde la moitié de gauche. À chaque étape on élimine la moitié des possibilités, comme pour deviner un nombre entre 1 et 100 en demandant « plus grand ou plus petit ? ».",
              "Pour 1000 éléments, 10 étapes suffisent au maximum ; pour un million, 20. Condition obligatoire : le tableau doit être trié. Sur un tableau en désordre, le résultat est faux.",
            ],
            visual: { type: "scene", items: [{ icon: "FaBarsStaggered", label: "Tableau trié" }, { icon: "FaMagnifyingGlassPlus", label: "Je regarde le milieu" }, { icon: "FaCircleCheck", label: "J'élimine la moitié" }], caption: "Chaque étape coupe le problème en deux." },
            tip: "Dichotomie vient d'un mot grec qui veut dire « couper en deux ».",
          },
          {
            title: "Les tris",
            explain: [
              "Trier, c'est ranger du plus petit au plus grand. Tri par sélection : on cherche le plus petit élément, on le place en première position, puis on recommence avec le reste. Tri à bulles : on compare deux voisins et on les échange s'ils sont dans le mauvais ordre, jusqu'à ce qu'aucun échange ne soit nécessaire.",
              "Ces tris sont faciles à comprendre mais lents : pour n éléments, ils font environ n fois n opérations. Les langages proposent des tris bien plus rapides (tri fusion, tri rapide) : en pratique, on utilise la fonction de tri déjà fournie.",
            ],
            visual: { type: "grid", rows: [["Départ", "5", "2", "4"], ["Étape 1", "2", "5", "4"], ["Étape 2", "2", "4", "5"]], highlight: ["B3", "C3", "D3"], caption: "Le tri par sélection place le plus petit en premier, puis recommence." },
            tip: "Apprends un tri simple pour comprendre l'idée, puis utilise celui du langage dans tes vrais programmes.",
          },
          {
            title: "La récursivité",
            explain: [
              "Une fonction récursive s'appelle elle-même sur un problème plus petit. Exemple : factorielle de 4 vaut 4 fois factorielle de 3, qui vaut 3 fois factorielle de 2, et ainsi de suite jusqu'à factorielle de 1, qui vaut 1.",
              "Toute récursion a besoin d'un cas de base (là où l'on s'arrête, ici factorielle de 1 vaut 1) et d'un appel sur un problème plus petit. Sans cas de base, la fonction s'appelle sans fin et le programme plante. C'est très élégant pour parcourir des dossiers ou des arbres.",
            ],
            visual: { type: "scene", items: [{ icon: "FaBrain", label: "factorielle(4)" }, { icon: "FaArrowRight", label: "4 fois factorielle(3)" }, { icon: "FaCircleCheck", label: "Cas de base : factorielle(1) = 1" }], caption: "On descend jusqu'au cas de base, puis on remonte les résultats." },
            tip: "Avant d'écrire une fonction récursive, écris d'abord son cas de base.",
          },
          {
            title: "La complexité : mesurer la vitesse",
            explain: [
              "La complexité mesure combien de temps un algorithme demande quand les données grandissent. On compte les opérations en fonction de n, le nombre d'éléments, et on la note O(n), qui se lit « de l'ordre de n ».",
              "Ce qui compte n'est pas le temps exact mais la façon dont il grandit. Doubler les données double le temps pour O(n), mais le multiplie par quatre pour O(n²). Sur de petites données tout va vite ; sur de grandes, l'algorithme choisi fait toute la différence.",
            ],
            visual: { type: "grid", rows: [["Complexité", "Exemple", "Pour n = 1000"], ["O(1)", "Lire une case d'un tableau", "1"], ["O(log n)", "Recherche dichotomique", "10"], ["O(n)", "Recherche séquentielle", "1000"], ["O(n²)", "Deux boucles imbriquées", "1 000 000"]], highlight: ["C2", "C3", "C4", "C5"], caption: "Plus la complexité grandit, plus le programme ralentit." },
            tip: "Quand un programme est lent sur beaucoup de données, cherche d'abord les boucles imbriquées.",
          },
        ],
        quiz: [
          { q: "Quelle condition faut-il pour utiliser la recherche dichotomique ?", options: ["Le tableau est trié", "Le tableau est vide", "Le tableau contient des textes"], answer: 0, why: "On élimine une moitié parce qu'on sait que les valeurs sont rangées dans l'ordre." },
          { q: "Environ combien d'étapes maximum pour une recherche dichotomique dans 1000 éléments ?", options: ["1000", "10", "500"], answer: 1, why: "Chaque étape coupe en deux : 1000, 500, 250... on arrive à 1 en environ 10 étapes." },
          { q: "Qu'est-ce que le cas de base d'une fonction récursive ?", options: ["L'appel le plus long", "La condition qui arrête les appels", "Le nom de la fonction"], answer: 1, why: "Sans cas de base, la fonction s'appelle sans fin." },
          { q: "Deux boucles imbriquées de n tours chacune ont pour complexité…", options: ["O(n)", "O(1)", "O(n²)"], answer: 2, why: "n tours dehors fois n tours dedans font n fois n opérations." },
          { q: "Dans le tri à bulles, quand échange-t-on deux voisins ?", options: ["Quand ils sont dans le mauvais ordre", "Quand ils sont égaux", "Quand ils sont tous les deux grands"], answer: 0, why: "L'échange remet les deux voisins dans l'ordre." },
          { q: "Les données doublent. Un algorithme en O(n) devient…", options: ["Quatre fois plus lent", "Environ deux fois plus lent", "Aussi rapide qu'avant"], answer: 1, why: "En O(n), le temps grandit proportionnellement au nombre d'éléments." },
        ],
        exercise: {
          title: "Chercher plus vite",
          instructions: [
            "Le tableau trié est 3, 8, 12, 20, 31. Cherche la valeur 20 avec la recherche séquentielle et compte les comparaisons.",
            "Cherche la même valeur avec la recherche dichotomique et compte les comparaisons.",
            "Donne la complexité de chaque méthode.",
            "Explique pourquoi la dichotomie devient bien meilleure avec un million d'éléments.",
          ],
          correction: [
            "Séquentielle : 3, 8, 12, 20. Quatre comparaisons.",
            "Dichotomique : le milieu est 12 (indice 2), 20 est plus grand, on garde 20 et 31. On regarde 20 : trouvé en 2 comparaisons.",
            "Séquentielle : O(n). Dichotomique : O(log n).",
            "Pour un million d'éléments, la séquentielle peut demander un million de comparaisons, la dichotomique environ 20.",
          ],
          visual: { type: "grid", rows: [["Indice", "0", "1", "2", "3", "4"], ["Valeur", "3", "8", "12", "20", "31"]], highlight: ["E2"], caption: "20 se trouve à l'indice 3." },
        },
      },
    ],
  },
};