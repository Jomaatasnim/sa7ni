// Affiche toute erreur JavaScript en haut de la page (pour la voir sans ouvrir F12)
addEventListener("error", e => {
  let b = document.getElementById("jsErr");
  if (!b) { b = document.createElement("div"); b.id = "jsErr"; document.body.prepend(b); }
  b.textContent = "JS error: " + e.message + " (line " + e.lineno + ")";
});

// Utilisateur connecté (défini par auth.js) ; chaque compte a ses propres données
const ME = window.APP_USER;
const K = k => "sa7ni_" + k + ":" + ME.email;

// ===== Admin =====
// Les comptes dont l'email est dans cette liste peuvent modifier et supprimer N'IMPORTE QUELLE recette.
const ADMIN_EMAILS = ["tasnimjomaa4@gmail.com"];     // ← mets ici l'email du compte admin (en minuscules)
const isAdmin = ADMIN_EMAILS.includes(ME.email);
let editing = null;                                 // numéro de la recette en cours de modification (null = ajout)
// Changements faits par l'admin sur les recettes du site (gardés dans ce navigateur)
let adm = { edits: {}, hidden: [] };
try { adm = Object.assign(adm, JSON.parse(localStorage.getItem("sa7ni_admin")) || {}); } catch (e) { }
const saveAdm = () => { try { localStorage.setItem("sa7ni_admin", JSON.stringify(adm)); } catch (e) { } };

// ===== Helpers de base (définis en premier : utilisés partout) =====
const $ = s => document.querySelector(s);
const empty = msg => `<p class="empty">${msg}</p>`;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const R = [
  ["Kosksi bedjej", "Khalil Rouis", 4.5, 21, "images/kosksi-bedjej.jpg", "Lunch"], ["Cheesecake", "Tasnim Jomaa", 4.9, 37, "images/cheesecake.jpg", "Desserts"],
  ["Orange Juice", "Nikola Tesla", 4.7, 19, "images/3asir.jpg", "Drinks"], ["Ma9rouna bel bagri", "Dali Mohamed", 4.5, 21, "images/ma9rouna-bagri.jpg", "Dinner"],
  ["Mar9et loubya", "Mariem Taha", 4.8, 32, "images/loubya.jpg", "Breakfast"], ["Brik", "Arwa Saad", 4.8, 32, "images/brik.jpg", "Dinner"],
  ["Lablebi", "Sami Ben Ali", 4.6, 25, "images/lablebi.jpg", "Breakfast"], ["Chakchouka", "Rim Gharbi", 4.7, 28, "images/chakchouka.jpg", "Breakfast"],
  ["Slata machwiya", "Hela Mansour", 4.4, 17, "images/slata-machwiya.jpg", "Lunch"], ["Ma9rou4", "Youssef Jlassi", 4.9, 41, "images/ma9rou4.jpg", "Desserts"],
  ["Bambalouni", "Amira Trabelsi", 4.6, 23, "images/bambalouni.jpg", "Breakfast"], ["Thé aux pignons", "Oussama Dridi", 4.8, 30, "images/tey.jpg", "Drinks"],
  ["Ojja Merguez", "Tasnim Jomaa", 0, 0, "images/ojja-merguez.jpg", "Dinner"],
  ["Kosksi bel 3osben", "Tasnim Jomaa", 0, 0, "images/kosksi-3osben.jpg", "Lunch"],
  ["Kosksi bel7am", "Tasnim Jomaa", 0, 0, "images/kosksibel7am.jpg", "Lunch"],
  ["Roz jerbi", "Tasnim Jomaa", 0, 0, "images/roz-jerbi.jpg", "Lunch"],
  ["Mlou5iya", "Tasnim Jomaa", 0, 0, "images/mloukhiya.jpg", "Lunch"],
  ["Kammouniya", "Tasnim Jomaa", 0, 0, "images/kammouniya.jpg", "Dinner"]
];
// D[i] = détails de R[i] : [temps, personnes, ingrédients, étapes]
const D = [
  ["—", "—", ["300 gr de couscous fin", "4 morceaux de poulet", "Pois chiches mous", "1 gros oignon", "1 pomme de terre", "1/2 verre d'huile d'olive", "1 c. à café de coriandre en poudre", "1 c. à café de curcuma", "1/2 c. à soupe de harissa", "2 c. à soupe de tomates en conserve", "1.5 c. à café de piment rouge en poudre", "20 ml d'huile de tournesol"], ["Dans le bas du couscoussier, faire revenir l'oignon, le poulet et les épices dans l'huile d'olive pendant 10 minutes.", "Ajouter les tomates, l'harissa et les pois chiches, faire revenir encore 3 minutes. Ajouter 300 mL d'eau et laisser mijoter pendant 20 minutes.", "Éplucher la pomme de terre et la laver.", "Mettre le couscous dans un saladier avec une demi-cuillère à café de sel, l'huile de tournesol et 50 mL d'eau. Laisser reposer jusqu'à ce que les 20 minutes précédentes soient écoulées.", "Une fois les 20 minutes dépassées, émietter le couscous entre les mains pour séparer les graines. Cette étape consiste à frotter le couscous entre les mains jusqu'à ce qu'il n'y ait plus de graines collées.", "Ajouter la pomme de terre et 600 mL d'eau à la sauce.", "Mettre le couscous dans la partie supérieure du couscoussier et le faire cuire à la vapeur de la sauce une première fois pendant 15 minutes.", "Retirer le couscous de sa cuisson, le mettre dans un saladier sans décoller les graines qui restent collées au couscoussier, il est préférable de les jeter avant de remettre le couscous.", "Ajouter 200 mL d'eau à la sauce et remettre le couscous cuire à la vapeur pendant encore 15 à 20 minutes.", "Mettre le haut du couscoussier par-dessus le couscous et verser les 2/3 de la sauce. Laisser reposer pendant 5 mn puis mélanger délicatement.", "Si le couscous vous semble encore sec, rajouter un peu de sauce.", "Dresser un beau plat."]],
  ["25 min (cuisson 1 h 50, repos 1 h)", "6 Personnes", ["200 gr de biscuits moulus", "50 gr de beurre fondu", "600 gr de fromage frais", "1 citron", "3 œufs", "25 gr de farine ou maïzena", "20 cl de lait", "150 gr de sucre", "100 gr de crème fraîche épaisse"], ["Mélangez la poudre de biscuit avec le beurre fondu, étalez au fond d'un moule à bords amovibles, tassez, et passez 10 minutes au four à 180°C.", "Battez le fromage frais quelques secondes, ajoutez la crème fraîche, battez, ajoutez le zeste de citron, le sucre, les œufs 1 par 1.", "Ajoutez la farine tamisée puis enfin le lait.", "Versez par dessus la base de gâteau au biscuit.", "Faites chauffer le four à 210°C, enfournez le cheesecake pour 10 minutes, puis baissez le four à 90°C pendant 1 heure.", "Laissez le cheesecake encore 1 heure dans le four éteint, puis après l'avoir laissé tiédir, placez-le au frais jusqu'au lendemain."]],
  ["5 min", "2 Personnes", ["4 oranges", "Sucre (facultatif)", "Glaçons"],
    ["Presser les oranges.", "Ajouter le sucre si besoin et mélanger.", "Servir avec des glaçons."]],
  ["—", "—", ["2 morceaux de viande de bœuf", "250 gr de pâte fell", "4 c. à soupe de concentré de tomate", "1 pomme de terre coupée en 4", "2 piments verts", "50 gr de pois chiches déjà trempés", "1 c. à soupe de harissa arbi", "2 c. à café de harissa", "2 c. à café de paprika", "3 c. à café de tabel", "Ail haché", "2 feuilles de laurier", "Huile", "Sel et poivre"], ["Dans un faitout, verser l'huile et mettre les morceaux de viande de bœuf et la tomate concentrée.", "Puis verser un peu d'eau chaude.", "Ajouter l'harissa arbi, tabel, paprika, les feuilles de laurier et les pois chiches.", "Mélanger, couvrir d'eau et laisser cuire.", "Ajouter ensuite l'harissa, pomme de terre et ail. Saler et poivrer.", "Après cuisson de la viande, mettre les piments.", "Entre temps, cuire les pâtes dans l'eau bouillante salée, puis les égoutter.", "La sauce est prête, il ne reste plus que la mélanger avec les pâtes préalablement cuites en laissant de côté les morceaux de viande, la pomme de terre, le piment et les pois chiches.", "Dresser en mettant dessus morceaux de viande et de pomme de terre et les piments."]],
  ["35 min", "4 Personnes", ["Viande hachée", "haricots blancs déjà trempés la veille", "oignon haché", "poivrons", "1 c. à café d'ail haché", "sel et poivre", "tabel", "paprika", "harissa arbi", "l'huile"],
    ["Préparer les boulettes de viande: dans un bol mettre la viande hachée et assaisonner d'ail, coriandre, paprika, harissa arbi, menthe séchée, sel, poivre et un filet d'huile.", "Mélanger et former les boulettes", "Préparer la sauce: dans une marmite, faire chauffer l'huile et frire les poivrons puis ajouter les boulettes de viande et faire cuire", "Retirer les boulettes et les poivrons de la marmite et réserver.", "Puis y faire revenir l'oignon haché, ajouter le concentrée de tomate et l'harissa arbi.", "Couvrir d'eau, incorporer les haricots et assaisonner de tabel, poivre, paprika et laisser cuire.", "Après le cuisson des haricots remettre les boulettes de viande et enfin de cuisson ajouter les variantes"]],
  // Brik : recette corrigée
  ["40 min", "4 Personnes", ["4 feuilles de malsouka", "4 œufs", "1 boîte de thon émietté", "1 petit oignon haché", "1 poignée de persil haché", "1 c. à soupe de câpres", "50 gr de fromage râpé", "Sel et poivre", "Huile de friture", "1 citron"],
    ["Mélanger le thon, l'oignon, le persil, les câpres et le fromage râpé. Assaisonner de sel et de poivre.", "Plier une feuille de malsouka en deux et déposer au centre 1/4 de la farce en formant un petit nid.", "Casser un œuf entier au milieu de la farce.", "Replier rapidement la feuille en triangle et coller les bords avec un peu d'eau ou de farine délayée.", "Faire chauffer l'huile et y faire frire la brik 1 à 2 minutes de chaque côté, en l'arrosant d'huile pour que le blanc cuise tandis que le jaune reste coulant.", "Égoutter sur du papier absorbant et servir chaude avec un quartier de citron."]],
  ["—", "—", ["200 gr de pois chiches déjà trempés la veille", "Cumin", "Pain rassis", "Petites câpres", "Olives", "Ail", "Citron", "1 boîte de thon", "2 œufs", "Huile d'olive", "Harissa arbi"], ["Mettre dans une casserole les pois chiches avec leur eau, saler.", "Ajouter 1 L d'eau et laisser cuire une dizaine de minutes.", "Écraser 2 gousses d'ail, ajouter dans la casserole, avec une bonne cc de tabel (karouia).", "Pendant ce temps, couper du pain rassis en petits morceaux et remplir 2 grands bols.", "Casser 2 œufs dans la soupe, et laisser pocher quelques instants, puis éteindre le feu. L'œuf doit rester coulant à l'intérieur.", "Déposer immédiatement un œuf sur le dessus de chaque bol, puis arroser tout autour avec la soupe et les pois chiches.", "Sur chaque bol, ajouter une grosse cs de harissa, une cs de cumin moulu, du thon, des câpres, des olives.", "Passer sur le dessus un filet d'huile d'olive vierge et presser un quart de citron.", "Mélanger le tout puis déguster à la cuillère."]],
  ["25 min", "3 Personnes", ["Eggs", "Tomatoes", "Green peppers", "Onion", "Olive oil, spices"],
    ["Cut:|Chop the onion, tomatoes and peppers.", "Cook the vegetables:|Fry onion and peppers, then add tomatoes and spices.", "Add eggs:|Make small holes and crack the eggs into the sauce.", "Finish:|Cover and cook until the eggs are set."]],
  ["50 min", "5 Personnes", ["5 tomates", "10 poivrons", "2 piments verts", "Oignons", "Gousses d'ail", "100 gr de thon émietté", "100 gr d'olives", "Huile d'olive", "Jus d'1 petit citron", "1 c. à café de menthe séchée", "1 c. à café de carvi", "1 c. à café de coriandre moulue", "Sel", "Câpres", "1 œuf dur"], ["Mettre les poivrons, les tomates, les oignons, les piments et les gousses d'ail sur une plaque. Les faire griller dans le four ou au barbecue.", "Une fois les légumes grillés de tous les côtés, les mettre dans un sac plastique puis les éplucher et les écraser.", "Assaisonner avec la coriandre, la menthe et le carvi moulus. Ajouter le jus de citron et l'huile d'olive. Saler.", "Dresser dans un plat de service et décorer de thon, d'olives et d'œuf dur."]],
  ["—", "—", ["1 kilogram of semolina", "250 grams of flour (farina)", "500 grams of ground dates", "200 grams of sesame (jalajlan)", "1/2 sachet of bicarbonate", "1/2 bag of baking powder", "250 grams of sugar", "1/2 teaspoon of cinnamon", "1/2 tablespoon of orange peel powder mixed with a little oil", "1/2 lemon", "1 liter of oil for frying"], ["Filling: mix the cinnamon and the orange peel well.", "Add the ground dates and mix well until you get a dough.", "Divide the filling dough into small, equal balls and set aside.", "Dough: mix the flour, bicarbonate and baking powder well in a bowl and set aside.", "Empty the semolina into another bowl and pour a cup of hot oil over it.", "Add the flour mixture and mix.", "Pour in water gradually while mixing until you get a cohesive dough, then divide it into equal balls and set aside.", "Syrup: put the sugar in a pot and add the juice of half a lemon.", "Add a little water and bring to a boil until the syrup changes colour and turns golden.", "Remove the pot from the heat and set aside.", "Shaping: spread a ball of dough flat in a rectangular shape.", "Shape a ball of filling into a finger and place it on the dough so that the filling is narrower than the dough.", "Roll the dough, then press the makroudh mold on its surface.", "Remove the mold and cut the dough along the pattern.", "Pour the oil into a frying pan and heat it.", "Take the makroudh out of the pan and place it on a paper towel or in a colander to get rid of the oil.", "Soak the makroudh in the syrup, then put it on a serving dish and sprinkle it with sesame."]],
  ["1 h 15", "6 Personnes", ["Flour", "Yeast", "Sugar", "Milk", "Oil for frying"],
    ["Prepare the dough:|Mix flour, yeast, sugar and warm milk.", "Rest:|Cover and let it rise for 1 hour.", "Shape:|Make small rings or balls.", "Fry:|Fry until golden and puffy.", "Serve:|Roll in sugar and serve warm."]],
  ["15 min", "4 Personnes", ["Green tea", "Fresh mint", "Sugar", "Pine nuts", "Boiling water"],
    ["Rinse the tea:|Pour boiling water on the tea and discard it.", "Brew:|Add fresh water, mint and sugar and boil.", "Serve:|Pour from high into glasses and add pine nuts."]],
  ["—", "—", ["Merguez", "Pulpes de tomate", "1 oignon haché", "1 poivron", "Ail haché", "1 c. à soupe de harissa arbi", "1.5 c. à café de paprika", "1 c. à soupe de harissa", "1 c. à café de tabel", "Menthe séchée", "Huile d'olive", "Sel et poivre", "Œufs"], ["Dans une poêle, faire revenir l'oignon et les merguez dans l'huile d'olive.", "Ajouter les pulpes de tomate et l'harissa. Assaisonner de sel et de poivre.", "Verser un peu d'eau chaude, ajouter l'ail haché et laisser cuire sur un feu doux.", "Couper le poivron en lamelles et l'ajouter à la sauce avec le tabel et la paprika. Laisser cuire.", "En fin de cuisson ajouter la menthe séchée.", "Faire de petits puits avec une cuillère dans la sauce, casser les œufs par-dessus et les laisser cuire (ne pas mélanger) pendant quelques minutes.", "Servir."]],
  ["—", "—", ["1 blanc de poulet coupé en petits cubes", "100 gr de foie coupé", "2 boyaux du mouton (Mosran)", "1 botte de persil", "1 botte d'épinards", "3 carottes", "Petits pois", "Menthe sèche hachée", "1 oignon", "1 filet d'huile", "3 gousses d'ail", "1 c. à café de coriandre moulue ou (ras el hanout)", "1 c. à café de paprika", "1 c. à café de sel, poivre et curcuma", "1 c. à soupe de concentré de tomate", "1 c. à soupe d'harissa"], ["Découpez le blanc de poulet et le foie en petits dés.", "Laver, éplucher et hacher l'oignon, l'ail, le persil et les épinards.", "Couper les carottes en petits dés et les mélanger dans un grand bol avec les épinards, le persil, l'oignon, les carottes et les petits pois.", "Ajouter ensuite le blanc de poulet et le foie.", "Mettre les épices : l'ail, la menthe sèche, la coriandre, paprika, sel, poivre et curcuma, ajouter ensuite le concentré de tomate et la harissa.", "Verser un filet d'huile et mélanger le tout.", "Farcir le Mosran.", "Dès que la vapeur se dégage du couscoussier. Retirer la graine, la vider dans un grand plat, verser la sauce sur le couscous et bien mélanger.", "Dresser le couscous dans un grand plat puis disposer harmonieusement par-dessus le osben et les légumes."]],
  ["—", "—", ["1 كيلوغرام لحم خروف", "1 بصلة كبيرة", "3 ملعقة طعام معجون طماطم", "3 ملعقة طعام فلفل أحمر مرحي", "1/2 ملعقة قهوة فلفل أسود", "ملح", "2 فنجان زيت", "الكسكسي :", "1 كيلوغرام كسكسي", "2 ملعقة طعام زيت زيتون", "ماء", "للزينة :", "200 غرام حمص منقوع مسبقا في الماء", "100 غرام زبيب (عنب مجفف)", "1/2 ملعقة قهوة كركم", "بيض مسلوق", "فلفل أخضر مقلي"], ["نقطع اللحم ونقوم بتبليله مع نصف كمية معجون الطماطم، الفلفل الأحمر المرحي والملح ونخلط المكونات جيدا مع القليل من الماء.", "نترك اللحم المتبل جانبا حتى يمتص جميع التوابل.", "تحضير الصلصة : نسكب الزيت في قدر ونضيف البصل ونتركه يتقلى جيدا ونضيف اللحم المتبل.", "نضيف ما تبقى من معجون الطماطم، الفلفل الأحمر المرحي والفلفل الأسود ونضيف القليل من الماء ونترك الصلصة تطهى على نار هادئة مدة 10 دقائق.", "تحضير الكسكسي : نسكب الكسكسي في وعاء ونضيف القليل من الزيت ونرشه بنصف كوب من الماء ثم نفتته جيدا حتى نفصل حبات الكسكسي عن بعضها البعض.", "نضيف لتر من الماء الساخن للقدر وعندما يبدأ بالغليان نضع الكسكسي من فوق في كسكاس يطهى على البخار.", "بعد 20 دقيقة نسكب الكسكسي في إناء ونرشه بالقليل من الماء ونفتته جيدا ثم نرجعه ليطهى مرة ثانية على البخار.", "عندما يجهز الكسكسي نضعه في إناء متسع ونفتته جيداً، نتأكد من أن الصلصة واللحم جاهز.", "تحضير الحمص : نغلي الحمص في الماء مع الكركم و القليل من الملح.", "تحضير الزبيب : ننقع الزبيب مدة ساعة في الماء ثم نغليه مدة 5 دقائق.", "نصفي الحمص والزبيب من الماء، نخلطهم ثم نسكب فوقهم القليل من صلصة الكسكسي.", "نضيف الصلصة للكسكسي شيئاً فشيئاً حتى يسقى جيداً ويصبح أحمر اللون ونغطيه ونتركه يرتاح على جنب، بعد 5 دقائق نضع الكسكسي في طبق تقديم نضيف الحمص والزبيب، نرصف اللحم والبيض والفلفل الأخضر المقلي."]],
  ["30 min (cuisson 1 h)", "2 Personnes", ["Riz", "Viande et foie coupés en petits morceaux", "2 c. à soupe de concentré de tomate", "1 oignon haché", "1 carotte coupée en petits cubes", "1 poivron", "Piments de cayenne", "1 poignée de petits pois", "1 poignée de pois chiches déjà trempés", "Persil haché", "Épinards hachés", "Menthe séchée", "1 c. à café de paprika", "1 c. à café de tabel", "1 c. à café de curcuma", "1 c. à soupe de harissa arbi", "Ail haché", "Huile d'olive", "Sel et poivre"], ["Mettre de l'eau jusqu'à mi hauteur du bas du couscoussier et mettre à chauffer sur un feu moyen.", "En parallèle, verser dans un grand saladier un filet d'huile et ajouter la paprika, tabel, curcuma, sel, poivre, ail, harissa arbi et la tomate concentrée. Mélanger.", "Incorporer le riz et les morceaux de viande et de foie.", "Ajouter les épinards, le persil, l'oignon, la carotte, les petits pois, la menthe séchée et les pois chiches. Mélanger bien.", "Lorsque tout est bien mélangé, mettre dans le haut du couscoussier et faire cuire à feu moyen en mélangeant régulièrement.", "Dresser dans un plat et décorer de poivron frit et de piment de cayenne."]],
  ["—", "—", ["150 gr de mloukhia", "500 gr de viande de bœuf coupée en morceaux", "1 c. à café de concentré de tomate", "1 c. à café de harissa arbi", "2 feuilles de laurier", "1 oignon haché", "Ail", "Eau chaude", "1 c. à café de tabel", "Huile", "Paprika", "Sel"], ["Assaisonner la viande d'ail, de harissa arbi, feuilles de laurier, paprika, tabel, l'huile, mélanger et laisser mariner. Vous pouvez faire ceci la veille de votre mloukhia ce sera encore meilleur !", "Verser la poudre de mloukhia dans une marmite et la couvrir d'huile. Mélanger.", "Ajouter l'oignon, le concentré de tomate et les feuilles de laurier, faire revenir en mélangeant.", "Verser une louche d'eau chaude, remuer, reverser une autre louche, remuer et ce jusqu'à l'obtention d'une sauce pas trop liquide mais surtout pas crémeuse non plus, consistance d'une soupe légère : la sauce épaissira lors de la cuisson.", "Couvrir et laisser cuire 5 h minimum à feu doux en remuant de temps à autre et ajouter un peu d'eau si vous trouvez la préparation trop épaisse.", "Ajouter vos morceaux de viandes et le reste de la mixture.", "Quand la cuisson est terminée vous devez voir l'huile remonter à la surface.", "La mloukhia est cuite lorsqu'une couche d'huile remonte à la surface."]],
  ["—", "—", ["2 c. à soupe de tomate concassée", "Viande de bœuf coupée en cubes", "Foie et abats coupés en cubes", "Oignon", "1 c. à café d'ail haché", "1 c. à café de cumin", "Sel et poivre", "1 c. à café de curcuma", "2 poivrons verts", "1 c. à café de tabel", "1 c. à café de farine", "Huile", "1 poivron rouge séché", "Persil haché"], ["Faire revenir l'oignon et le poivron séché dans l'huile.", "Entre temps, assaisonner la viande et les abats de tabel, sel, poivre et curcuma.", "Mettre la viande et les abats dans la marmite avec un peu de farine et faire revenir.", "Incorporer les tomates concassées et laisser cuire.", "Après cuisson de la viande ajouter les poivrons et le cumin.", "Laisser sur le feu 5 minutes puis dresser dans un plat et parsemer de persil haché."]]
];
// Recettes publiées par l'utilisateur : gardées dans le navigateur et rechargées au démarrage
const BASE = R.length;
R.forEach(r => { r.key = r[0]; });                  // identifiant stable des recettes de base
R.forEach((r, i) => {
  const e = adm.edits[r.key];
  if (e) { r[0] = e.t; r[4] = e.p; r[5] = e.c; D[i] = e.d; }
  if (adm.hidden.includes(r.key)) r.hid = true;       // recette supprimée par l'admin
});
// Si le nombre de recettes de base change, on décale les numéros (favoris et notes) des recettes de l'utilisateur
try {
  const old = +localStorage.getItem(K("base")) || 12, d = BASE - old;
  if (d) {
    const f = JSON.parse(localStorage.getItem(K("favs"))) || [], r = JSON.parse(localStorage.getItem(K("rates"))) || {}, nr = {};
    for (const k in r) nr[+k >= old ? +k + d : k] = r[k];
    localStorage.setItem(K("favs"), JSON.stringify(f.map(i => i >= old ? i + d : i)));
    localStorage.setItem(K("rates"), JSON.stringify(nr));
  }
  localStorage.setItem(K("base"), BASE);
} catch (e) { }
let mineSaved = [];
try { mineSaved = JSON.parse(localStorage.getItem(K("mine"))) || []; } catch (e) { }
mineSaved.forEach(m => { R.push(m.r); D.push(m.d); });
// Notes de l'utilisateur : { numéroRecette: étoiles }, gardées dans le navigateur
let myRates = {};
try { myRates = JSON.parse(localStorage.getItem(K("rates"))) || {}; } catch (e) { }
const baseRate = R.map(r => [r[2], r[3]]);          // note et nombre d'avis d'origine
function recompute(i) {                              // moyenne = origine + ma note
  const [avg, n] = baseRate[i], mine = myRates[i];
  if (!mine) { R[i][2] = avg; R[i][3] = n; return; }
  R[i][3] = n + 1;
  R[i][2] = Math.round((avg * n + mine) / (n + 1) * 10) / 10;
}
Object.keys(myRates).forEach(i => R[i] ? recompute(i) : delete myRates[i]);
const rt = r => r[3] ? `${r[2]} · ${r[3]} review${r[3] > 1 ? "s" : ""}` : "New";

// Sécurité : tout texte venant de l'utilisateur passe par esc() ; l'image a un repli emoji si elle ne charge pas
const pic = e => /^(data:image\/|images\/)/.test(e)
  ? `<img src="${esc(e)}" alt="" onerror="this.replaceWith('🍽️')">`
  : esc(e);
const card = r => `<article class="card"><div class="thumb">${pic(r[4])}</div><h3>${esc(r[0])}</h3>
  <p class="author">By ${esc(r[1])}</p><p class="rating"><i>★</i> ${rt(r)}</p>
  <a href="#recipe/${R.indexOf(r)}" class="btn">Recipe</a></article>`;
const mini = r => `<a href="#recipe/${R.indexOf(r)}" class="card m"><div class="thumb">${pic(r[4])}</div><h3>${esc(r[0])}</h3>
  <p class="rating"><i>★</i> ${rt(r)}</p></a>`;
const fill = (id, list, fn) => $(id).innerHTML = list.map(fn).join("");

// Profile → My Recipes : seulement les recettes publiées par l'utilisateur
const drawMine = () => {
  const mine = R.slice(BASE);
  $("#mine").innerHTML = mine.length ? mine.map(mini).join("") : empty("You haven't published any recipe yet.");
  $("#recipesCount").textContent = mine.length;
};
drawMine();

// Home : affiche les recettes (filtre par recherche + catégorie)
let activeCat = "";                                  // catégorie choisie sur Home ("" = toutes)
const catOf = chip => chip.textContent.trim().split(" ")[0];
function drawPopular() {
  const v = $("#q").value.toLowerCase();
  const list = R.filter(r => !r.hid && r[0].toLowerCase().includes(v) && (!activeCat || r[5] === activeCat));
  $("#popTitle").textContent = activeCat || "Popular";
  $("#popular").innerHTML = list.length ? list.map(card).join("") : empty("No recipes found.");
}
$("#q").addEventListener("input", drawPopular);

// Étoiles + favoris
let note = 0;
const drawStars = () => $("#stars").innerHTML = [1, 2, 3, 4, 5].map(n =>
  `<button data-n="${n}">${n <= note ? "★" : "☆"}</button>`).join("");
drawStars();
function showRateMsg(i) {
  $("#rateMsg").textContent = myRates[i]
    ? `Thanks! You rated this recipe ${myRates[i]}/5. Tap the same star to remove your review.`
    : "Tap a star to rate this recipe.";
}
$("#stars").onclick = e => {
  const n = +e.target.dataset.n;
  if (!n) return;
  if (myRates[cur] === n) delete myRates[cur];
  else { myRates[cur] = n; addNotif(`You rated “${R[cur][0]}” ${n}/5 ⭐`); }
  try { localStorage.setItem(K("rates"), JSON.stringify(myRates)); } catch (_) { }
  recompute(cur);
  note = myRates[cur] || 0; drawStars(); showRateMsg(cur);
  $("#rRate").textContent = rt(R[cur]);
  drawPopular(); drawFavs(); drawMine();
};
// Favoris : liste vide au départ, remplie par le bouton de chaque recette
let favs = [], cur = 0;
try { favs = JSON.parse(localStorage.getItem(K("favs"))) || []; } catch (e) { }
favs = favs.filter(i => R[i]);
function setFavBtn() {
  const on = favs.includes(cur);
  $("#favBtn").classList.toggle("on", on);
  $("#favBtn").textContent = on ? "♥ In Favorites" : "Add To Favorites";
}
function drawFavs() {
  const v = $("#qf").value.toLowerCase();
  const vf = favs.filter(i => !R[i].hid);
  const list = vf.map(i => R[i]).filter(r => r[0].toLowerCase().includes(v));
  $("#favs").innerHTML = list.length ? list.map(card).join("")
    : empty(vf.length ? "No recipe matches your search." : "No favorites yet. Open a recipe and tap “Add To Favorites”.");
  $("#saved").innerHTML = vf.length ? vf.map(i => mini(R[i])).join("") : empty("Nothing saved yet.");
  $("#savedCount").textContent = vf.length;
  $("#reviewsCount").textContent = Object.keys(myRates).length;
}
$("#qf").addEventListener("input", drawFavs);
$("#favBtn").onclick = () => {
  if (!favs.includes(cur)) addNotif(`“${R[cur][0]}” added to your favorites ♥`);
  favs = favs.includes(cur) ? favs.filter(i => i !== cur) : [...favs, cur];
  try { localStorage.setItem(K("favs"), JSON.stringify(favs)); } catch (e) { }
  setFavBtn(); drawFavs();
};

// Formulaire : ajouter lignes
const line = (ph, v = "") => `<div class="line"><span>👨‍🍳</span><input placeholder="${ph}" value="${esc(v)}"></div>`;
const holders = { ing: "e.g Chicken", step: "e.g prepare the ingredients" };
for (const k in holders) { $("#" + k).innerHTML = line(holders[k]).repeat(3); }
document.querySelectorAll("[data-add]").forEach(b => b.onclick = () =>
  $("#" + b.dataset.add).insertAdjacentHTML("beforeend", line(holders[b.dataset.add])));
// Filtre Home : "All" montre tout ; un 2e clic sur une catégorie revient à "All"
const homeChips = document.querySelectorAll("#home .chip");
homeChips.forEach(c => c.onclick = () => {
  const again = c.classList.contains("sel") && c.dataset.all === undefined;
  const target = again ? homeChips[0] : c;
  homeChips.forEach(x => x.classList.toggle("sel", x === target));
  activeCat = target.dataset.all !== undefined ? "" : catOf(target);
  drawPopular();
});

// Dark mode : mémorisé entre les visites
try { if (localStorage.getItem("sa7ni_night") === "1") document.body.classList.add("night"); } catch (e) { }
$("#dark").onclick = () => {
  const on = document.body.classList.toggle("night");
  try { localStorage.setItem("sa7ni_night", on ? "1" : "0"); } catch (e) { }
};

// Page recette : affiche les détails du plat choisi
function showRecipe(i) {
  if (R[i] && R[i].hid) { location.hash = "#home"; return; }   // recette supprimée par l'admin
  const r = R[i] || R[0], d = D[R[i] ? i : 0];
  $("#rHero").innerHTML = pic(r[4]); $("#rTitle").textContent = r[0]; $("#rBy").textContent = r[1];
  $("#rRate").textContent = rt(r);
  $("#rTime").textContent = d[0]; $("#rServ").textContent = d[1];
  $("#rIng").innerHTML = d[2].map(x => `<li dir="auto">${esc(x)}</li>`).join("");
  $("#rSteps").innerHTML = d[3].map(s => {
    const k = s.indexOf("|");
    return `<li dir="auto">${k < 0 ? esc(s) : `<b>${esc(s.slice(0, k))}</b> ${esc(s.slice(k + 1))}`}</li>`;
  }).join("");
  cur = R[i] ? i : 0; setFavBtn();
  const canManage = cur >= BASE || isAdmin;         // ses propres recettes, ou toutes si admin
  $("#editBtn").hidden = !canManage; $("#delBtn").hidden = !canManage;
  note = myRates[cur] || 0; drawStars(); showRateMsg(cur);
}

// Navigation par #hash  (ex: #recipe/3)
function route() {
  const [id, arg] = (location.hash.slice(1) || "home").split("/");
  if (id !== "add" && editing !== null) resetAdd();
  if (id === "recipe") showRecipe(+arg || 0);
  document.querySelectorAll(".view").forEach(v => v.classList.toggle("show", v.id === id));
  document.querySelectorAll("[data-nav]").forEach(a => a.classList.toggle("active", a.dataset.nav === id));
  scrollTo(0, 0);
}
addEventListener("hashchange", () => { route(); drawPopular(); drawFavs(); }); route(); drawPopular(); drawFavs();

// ===== Page Add : photo, catégorie, publier, annuler =====
let photo = "";
const box = $("#add .photo");
const fileIn = $("#add input[type=file]");
const addChips = document.querySelectorAll("#add .chip");
const err = msg => { $("#addErr").textContent = msg || ""; };

function showPhoto(src) {
  photo = src;
  const old = box.querySelector("img"); if (old) old.remove();
  if (src) box.insertAdjacentHTML("afterbegin", `<img src="${src}" alt="Preview">`);
}

function readPhoto(f) {
  if (!f) return;
  err("");
  if (f.type && !f.type.startsWith("image/")) { err("Choose an image file (JPG, PNG or WebP)."); return; }
  const rd = new FileReader();
  rd.onerror = () => err("The image couldn't be read. Try another one.");
  rd.onload = () => {
    const raw = rd.result, im = new Image();
    im.onload = () => {                       // réduit les grandes photos à 1000px
      const k = Math.min(1, 1000 / Math.max(im.width, im.height));
      const cv = document.createElement("canvas");
      cv.width = Math.round(im.width * k); cv.height = Math.round(im.height * k);
      const cx = cv.getContext("2d");
      cx.fillStyle = "#fff"; cx.fillRect(0, 0, cv.width, cv.height);
      cx.drawImage(im, 0, 0, cv.width, cv.height);
      let out; try { out = cv.toDataURL("image/jpeg", 0.85); } catch (e) { out = raw; }
      showPhoto(out);
    };
    im.onerror = () => err("This image format isn't supported. Use JPG, PNG or WebP.");
    im.src = raw;
  };
  rd.readAsDataURL(f);
}
fileIn.addEventListener("click", () => { fileIn.value = ""; });   // permet de rechoisir la même image
fileIn.addEventListener("change", () => readPhoto(fileIn.files[0]));
box.addEventListener("dragover", e => e.preventDefault());
box.addEventListener("drop", e => { e.preventDefault(); readPhoto(e.dataTransfer.files[0]); });

addChips.forEach(c => c.addEventListener("click", () => {
  addChips.forEach(x => x.classList.remove("sel")); c.classList.add("sel");
}));
document.querySelector("#add .in").addEventListener("input", () => err(""));

// Remet tout le formulaire à zéro
function resetAdd() {
  document.querySelectorAll("#add .in").forEach(i => i.value = "");
  fileIn.value = "";
  addChips.forEach(x => x.classList.remove("sel"));
  showPhoto("");
  for (const k in holders) $("#" + k).innerHTML = line(holders[k]).repeat(3);
  editing = null;
  $("#add .add-title").textContent = "Add Recipe";
  $("#add .publish").textContent = "Publish recipe";
  err("");
}
$("#cancelAdd").addEventListener("click", () => {
  const was = editing;
  resetAdd();
  if (was !== null) location.hash = "#recipe/" + was; else scrollTo(0, 0);
});

$("#add .publish").addEventListener("click", () => {
  const [t, time, serv] = document.querySelectorAll("#add .in");
  const title = t.value.trim();
  if (!title) { err("Enter a recipe title before publishing."); t.focus(); return; }
  const vals = id => [...document.querySelectorAll(`#${id} input`)].map(i => i.value.trim()).filter(Boolean);
  const sel = document.querySelector("#add .chip.sel");
  if (!sel) { err("Choose a category before publishing."); return; }
  const tm = time.value.trim() || "—", sv = serv.value.trim() || "—", ing = vals("ing"), steps = vals("step");
  if (editing !== null) {                            // ----- enregistrer une modification -----
    const i = editing, rec = R[i];
    rec[0] = title; rec[4] = photo || rec[4]; rec[5] = catOf(sel);
    D[i] = [tm, sv, ing, steps];
    if (i >= BASE) {                                 // recette de l'utilisateur
      mineSaved[i - BASE] = { r: rec, d: D[i] };
      try { localStorage.setItem(K("mine"), JSON.stringify(mineSaved)); } catch (e) { }
    } else {                                         // recette du site (admin)
      adm.edits[rec.key] = { t: title, p: rec[4], c: rec[5], d: D[i] }; saveAdm();
    }
    addNotif(`Recipe “${title}” updated ✏️`);
    editing = null; resetAdd(); drawMine(); drawPopular(); drawFavs();
    location.hash = "#recipe/" + i;
    return;
  }
  const r = [title, ME.name, 0, 0, photo || "🍽️", catOf(sel)];
  const d = [tm, sv, ing, steps];
  R.push(r); D.push(d); baseRate.push([0, 0]);
  mineSaved.push({ r, d });
  try { localStorage.setItem(K("mine"), JSON.stringify(mineSaved)); } catch (e) { }
  drawMine();
  addNotif(`Your recipe “${title}” is published 🎉`);
  resetAdd();
  location.hash = "#recipe/" + (R.length - 1);
});

// ===== Notifications + Help & Support =====
const SUPPORT_EMAIL = "tasnimjomaa4@gmail.com";     // ← badlou b email 7a9i9i mte3ek
let notifs = [];
try {
  const raw = localStorage.getItem(K("notifs"));
  notifs = raw === null ? [{ t: `Welcome to SA7NI, ${ME.name} 👋 Publish your first recipe!`, d: Date.now(), r: 0 }] : JSON.parse(raw) || [];
} catch (e) { }
const saveN = () => { try { localStorage.setItem(K("notifs"), JSON.stringify(notifs)); } catch (e) { } };
const ago = ms => {
  const m = Math.floor((Date.now() - ms) / 60000);
  return m < 1 ? "Just now" : m < 60 ? m + " min ago" : m < 1440 ? Math.floor(m / 60) + " h ago" : Math.floor(m / 1440) + " d ago";
};
function drawNotifs() {
  $("#nList").innerHTML = notifs.length
    ? notifs.map(n => `<li class="${n.r ? "" : "new"}">${esc(n.t)}<small>${ago(n.d)}</small></li>`).join("")
    : empty("No notifications.");
  const u = notifs.filter(n => !n.r).length;
  $("#notifBadge").textContent = u; $("#notifBadge").hidden = !u;
}
function addNotif(t) { notifs.unshift({ t, d: Date.now(), r: 0 }); notifs = notifs.slice(0, 30); saveN(); drawNotifs(); }
saveN(); drawNotifs();

const nd = $("#notifDlg"), hd = $("#helpDlg");
[nd, hd].forEach(d => {
  d.addEventListener("click", e => { if (e.target === d || e.target.dataset.close !== undefined) d.close(); });
});
$("#notifBtn").onclick = () => { drawNotifs(); nd.showModal(); };
nd.addEventListener("close", () => { notifs.forEach(n => n.r = 1); saveN(); drawNotifs(); });
$("#nClear").onclick = () => { notifs = []; saveN(); drawNotifs(); };

$("#helpBtn").onclick = () => { $("#helpErr").textContent = ""; hd.showModal(); };
$("#helpSend").onclick = () => {
  const m = $("#helpMsg").value.trim();
  if (!m) { $("#helpErr").textContent = "Write your message first."; return; }
  location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("SA7NI support")}&body=${encodeURIComponent(m)}`;
  $("#helpMsg").value = ""; hd.close();
};

// ===== Profil + Log out =====
$("#pName").textContent = ME.name;
if (isAdmin) $("#pName").insertAdjacentHTML("beforeend", ' <span class="badge">Admin</span>');
$("#adminReset").hidden = !isAdmin;
$("#adminReset").onclick = () => {
  if (!confirm("Restore all the recipes you deleted or edited as admin?")) return;
  try { localStorage.removeItem("sa7ni_admin"); } catch (e) { }
  location.reload();
};
$("#logoutBtn").onclick = () => {
  try { localStorage.removeItem("sa7ni_session"); } catch (e) { }
  history.replaceState(null, "", location.pathname);
  location.reload();
};

// ===== Supprimer une recette : ses propres recettes, ou n'importe laquelle si on est admin =====
$("#delBtn").onclick = () => {
  const i = cur;
  if (!R[i] || !(i >= BASE || isAdmin) || !confirm(`Delete “${R[i][0]}”? ${i >= BASE ? "This can't be undone." : "(Admin) You can restore it from your Profile."}`)) return;
  const title = R[i][0];
  if (i >= BASE) {                                   // recette de l'utilisateur : suppression définitive
    R.splice(i, 1); D.splice(i, 1); baseRate.splice(i, 1); mineSaved.splice(i - BASE, 1);
    // les recettes après celle-ci changent de numéro : on corrige favoris et notes
    favs = favs.filter(f => f !== i).map(f => f > i ? f - 1 : f);
    const nr = {};
    for (const k in myRates) if (+k !== i) nr[+k > i ? +k - 1 : k] = myRates[k];
    myRates = nr;
    try {
      localStorage.setItem(K("mine"), JSON.stringify(mineSaved));
      localStorage.setItem(K("favs"), JSON.stringify(favs));
      localStorage.setItem(K("rates"), JSON.stringify(myRates));
    } catch (e) { }
  } else {                                           // recette du site : cachée par l'admin (réversible)
    if (!adm.hidden.includes(R[i].key)) adm.hidden.push(R[i].key);
    saveAdm(); R[i].hid = true;
  }
  addNotif(`Recipe “${title}” deleted 🗑️`);
  drawMine(); drawPopular(); drawFavs();
  location.hash = i >= BASE ? "#profile" : "#home";
};

// ===== Modifier une recette : ses propres recettes, ou n'importe laquelle si on est admin =====
const stepText = s => {                              // "Titre|texte" -> "Titre texte" (pour le formulaire)
  const k = s.indexOf("|");
  if (k < 0) return s;
  const head = s.slice(0, k);
  return /^Step \d+:$/.test(head) ? s.slice(k + 1) : head + " " + s.slice(k + 1);
};
$("#editBtn").onclick = () => {
  const i = cur;
  if (!R[i] || !(i >= BASE || isAdmin)) return;
  const r = R[i], d = D[i];
  const [t, time, serv] = document.querySelectorAll("#add .in");
  t.value = r[0];
  time.value = d[0] === "—" ? "" : d[0];
  serv.value = d[1] === "—" ? "" : d[1];
  addChips.forEach(x => x.classList.toggle("sel", catOf(x) === r[5]));
  showPhoto(/^(data:image\/|images\/)/.test(r[4]) ? r[4] : "");
  $("#ing").innerHTML = d[2].length ? d[2].map(x => line(holders.ing, x)).join("") : line(holders.ing).repeat(3);
  $("#step").innerHTML = d[3].length ? d[3].map(s => line(holders.step, stepText(s))).join("") : line(holders.step).repeat(3);
  $("#add .add-title").textContent = "Edit Recipe";
  $("#add .publish").textContent = "Save changes";
  err("");
  editing = i;
  location.hash = "#add";
};