# webFinal

Irvan Nayaradou

Animation:
-Utilisation du DOM pour gérer certains éléments de la page(append + remove + innerHTML/innerText):
    -quand bird meurt il reapparait (.remove,.apennd au document)

-Ajout/suppression de sprites au cours de l’animation:

-Un enchaînement:
    -bird se stabilise apres chaque mouvement de monté ou de descent

-Modification de l’état des sprites au cours de l’animation
    -il meurt donc arrete voler pour tomber puis disparait progresivement

-Mouvement de sprites (x, y)
    -sur pagechat au contacte du feu bird meut

-Programmation par objet pour au moins 2 types de sprite
    -feux de camp,bird;
    
page de chat:

caracteristque chat:
-chat
    -chaque membre possende une couleur aleatoire(donc 2 membres peuvent avoir la meme couleur mais tres peux de chance)
    -cette couleur s'affiche que sur le nom du membres lors de l'envoie de son message
    -/new_color pour changer la couleur de tous les membres

-lste de membres
    -les membres connecté aparaissent avec leurs couleurs
    -tandis que les membres qui etait connecté apparaissent en noir dans la categorie membres offlines

événements en fonction de la souris:
-click sur feux de camp:
    -feux de camp devient feux-glacé de camp apres un click et reviens a la normal si on click de nouveau
    -l'etat du feux de camps peut influer sur d'autres objets  

Objet bird(flappy bird):
-sur le page de chat:
    -couleur depends de l'eat du feux de camp
    -avec les haut,bas,gauche,droite on peut deplacer le bird su l'ecran de tchat
    -click sur lui le tue
    -son contact avec le feu de camp le tue
    -quand meurt deviens gris tombe de plus en pus vite et disparait progressivement

