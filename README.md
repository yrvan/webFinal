# webFinal

**Auteur :** Irvan Nayaradou

Git: <https://github.com/yrvan/webFinal>

## Animation

- **Utilisation du DOM pour gérer certains éléments de la page (append, remove, innerHTML/innerText) :**
  - Quand le "bird" meurt, il réapparaît (utilisation de `.remove`, `.append` au document).

- **Ajout/suppression de sprites au cours de l'animation.**
  - le curseur apparais brievement puis disparait une fois toutes frames affichées

- **Un enchaînement :**
  - Le "bird" se stabilise après chaque mouvement de montée ou de descente.

- **Modification de l'état des sprites au cours de l'animation :**
  - Le "bird" meurt, cesse de voler, tombe puis disparaît progressivement.

- **Mouvement de sprites (x, y) :**
  - Sur la page "chat", au contact du feu, le "bird" meurt.

- **Programmation par objet pour au moins 2 types de sprite :**
  - Feux de camp, bird.

## Page de chat

### Caractéristiques chat

- **Chat :**
  - Chaque membre possède une couleur aléatoire (deux membres peuvent avoir la même couleur, mais c'est peu probable).
  - Cette couleur s'affiche uniquement sur le nom du membre lors de l'envoi de son message.
  - Utilisation de `/new_color` pour changer la couleur de tous les membres.

- **Liste de membres :**
  - Les membres connectés apparaissent avec leur couleur.
  - Les membres précédemment connectés apparaissent en noir dans la catégorie "membres offlines".

### Événements en fonction de la souris

- **Click sur feux de camp :**
  - Le feu de camp devient un "feu-glacé" après un clic et revient à la normale si on clique de nouveau.
  - L'état du feu de camp peut influencer d'autres objets.

- **Passe sur Bird(onmouseover) :**
  - bird meurt

- **Passe sur Cloud(onmouseover) :**
  - disparait progressivement

- **Molette sur Page index :**
  - permet de gerer la vitesse du vent

### Événements en fonction du clavier

- **Page de chat :**
  - les fleches directionelle permettent a bird de se deplacer dans le direction en question
  - la bar d'espace fait apparaitre un nuage

- **Page register :**
  - la bar d'espace fait apparaitre un nuage

### Objet bird

- **Sur la page de chat :**
  - La couleur dépend de l'état du feu de camp.
  - Avec les touches haut, bas, gauche, droite, on peut déplacer le bird sur l'écran de chat.
  - La souris sur lui fait apparaître un réticule qui le tue.
  - Son contact avec le feu de camp le tue.
  - Quand il meurt, il devient gris, tombe de plus en plus vite et disparaît progressivement.

- **Sur la page index :**
  - Apparaît aléatoirement depuis un des deux tuyaux et se déplace également aléatoirement.
  - Quand il apparaît, l'opacité augmente progressivement et le mouvement est similaire à une propulsion.
  - La souris sur lui fait apparaître un réticule qui le tue.
  - la bar d'espace le fait apparaitre
  - postion x depends de la vitesse du vent de la page

### Objet feux de camp

- **Page chat :**
  - Possède 2 états : feu de camp normal et feu de camp glacé.
  - Cliquer sur lui le fait changer d'état.

### Objet nuage

- **Page register :**
  - apparait aleatoirement a droite ou a gauche
  - se deplace du coté oposé d'ou il spawn
  - avec une opacité aleatoire
  - la souris sur lui le fait disparaitre progressivement
  - quand espace est press un nuage apparait

### Objet Wind

  -indique la vitesse et la direction que possede le vent
  -pparais brievement puis disparait une fois toutes frames affichées
