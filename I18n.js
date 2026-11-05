// Langues : fr (défaut), en, ar. Le choix est gardé dans le navigateur.
(() => {
    const LANGS = [["fr", "FR"], ["en", "EN"], ["ar", "عربي"]];
    let lang = "fr";
    try { const l = localStorage.getItem("sa7ni_lang"); if (LANGS.some(x => x[0] === l)) lang = l; } catch (e) { }
    const IDX = LANGS.findIndex(x => x[0] === lang);

    // clé: [français, english, عربي]
    const DICT = {
        "nav.home": ["🏠 Accueil", "🏠 Home", "🏠 الرئيسية"],
        "nav.favorites": ["♡ Favoris", "♡ Favorites", "♡ المفضلة"],
        "nav.add": ["＋ Ajouter", "＋ Add", "＋ إضافة"],
        "nav.profile": ["👤 Profil", "👤 Profile", "👤 الملف الشخصي"],
        search: ["rechercher des recettes...", "search recipes...", "ابحث عن وصفات..."],
        "catn.All": ["Tout", "All", "الكل"],
        "catn.Breakfast": ["Petit-déjeuner", "Breakfast", "فطور"],
        "catn.Lunch": ["Déjeuner", "Lunch", "غداء"],
        "catn.Dinner": ["Dîner", "Dinner", "عشاء"],
        "catn.Desserts": ["Desserts", "Desserts", "حلويات"],
        "catn.Drinks": ["Boissons", "Drinks", "مشروبات"],
        popular: ["Populaires", "Popular", "الأكثر شعبية"],
        back: ["← Retour", "← Back", "→ رجوع"],
        by: ["Par", "By", "بواسطة"],
        rateThis: ["⭐ Notez cette recette", "⭐ Rate this recipe", "⭐ قيّم هذه الوصفة"],
        "fav.add": ["Ajouter aux favoris", "Add To Favorites", "أضف إلى المفضلة"],
        "fav.on": ["♥ Dans les favoris", "♥ In Favorites", "♥ في المفضلة"],
        edit: ["Modifier la recette", "Edit recipe", "تعديل الوصفة"],
        del: ["Supprimer la recette", "Delete recipe", "حذف الوصفة"],
        ingredients: ["Ingrédients", "Ingredients", "المكونات"],
        instructions: ["Préparation", "Instructions", "طريقة التحضير"],
        favorites: ["Favoris", "Favorites", "المفضلة"],
        bio: ["Je cuisine avec amour", "Cooking with love", "أطبخ بحب"],
        statRecipes: ["Recettes", "Recipes", "وصفات"],
        statSaved: ["Enregistrées", "Saved", "محفوظة"],
        statReviews: ["Avis", "Reviews", "تقييمات"],
        myRecipes: ["Mes recettes", "My Recipes", "وصفاتي"],
        savedRecipes: ["Recettes enregistrées", "Saved Recipes", "الوصفات المحفوظة"],
        seeAll: ["Voir tout →", "See All →", "عرض الكل ←"],
        notifications: ["🔔 Notifications", "🔔 Notifications", "🔔 الإشعارات"],
        dark: ["🌙 Mode sombre", "🌙 Dark Mode", "🌙 الوضع الليلي"],
        help: ["❔ Aide et support", "❔ Help & Support", "❔ المساعدة والدعم"],
        adminReset: ["🛠️ Admin : restaurer les recettes supprimées / modifiées", "🛠️ Admin: restore deleted / edited recipes", "🛠️ مدير: استرجاع الوصفات المحذوفة / المعدّلة"],
        logout: ["⎋ Déconnexion", "⎋ Log Out", "⎋ تسجيل الخروج"],
        addRecipe: ["Ajouter une recette", "Add Recipe", "إضافة وصفة"],
        editRecipe: ["Modifier la recette", "Edit Recipe", "تعديل الوصفة"],
        publish: ["Publier la recette", "Publish recipe", "نشر الوصفة"],
        saveChanges: ["Enregistrer les modifications", "Save changes", "حفظ التغييرات"],
        addPhoto: ["Ajouter une photo", "Add a photo", "أضف صورة"],
        tapPhoto: ["Touchez pour choisir ou prendre une photo", "Tap to choose or take a photo", "اضغط لاختيار صورة أو التقاطها"],
        recipeTitle: ["Titre de la recette", "Recipe Title", "اسم الوصفة"],
        category: ["Catégorie", "Category", "الصنف"],
        prepTime: ["Temps de préparation", "Preparing Time", "وقت التحضير"],
        servings: ["Personnes", "Servings", "عدد الأشخاص"],
        phTitle: ["ex. Koksi bedjej", "e.g Koksi bedjej", "مثال: كسكسي بالدجاج"],
        phTime: ["🕒 ex. 30 min", "🕒 e.g 30 min", "🕒 مثال: 30 دقيقة"],
        phServ: ["👥 ex. 4 personnes", "👥 e.g 4 Persons", "👥 مثال: 4 أشخاص"],
        addIng: ["+ Ajouter un ingrédient", "+ Add Ingredient", "+ إضافة مكوّن"],
        addStep: ["+ Ajouter une étape", "+ Add Step", "+ إضافة خطوة"],
        phIng: ["ex. Poulet", "e.g Chicken", "مثال: دجاج"],
        phStep: ["ex. préparer les ingrédients", "e.g prepare the ingredients", "مثال: تحضير المكونات"],
        cancel: ["Annuler", "Cancel", "إلغاء"],
        login: ["Connexion", "Log in", "تسجيل الدخول"],
        signup: ["Inscription", "Sign up", "إنشاء حساب"],
        createAccount: ["Créer un compte", "Create account", "إنشاء الحساب"],
        name: ["Nom", "Name", "الاسم"],
        phName: ["ex. Tasnim", "e.g Tasnim", "مثال: تسنيم"],
        email: ["Email", "Email", "البريد الإلكتروني"],
        password: ["Mot de passe", "Password", "كلمة المرور"],
        phPw: ["min. 6 caractères", "min 6 characters", "6 أحرف على الأقل"],
        notifTitle: ["Notifications", "Notifications", "الإشعارات"],
        clearAll: ["Tout effacer", "Clear all", "مسح الكل"],
        helpTitle: ["Aide et support", "Help & Support", "المساعدة والدعم"],
        q1: ["Comment ajouter une recette ?", "How do I add a recipe?", "كيف أضيف وصفة؟"],
        a1: ["Ouvrez la page Ajouter, remplissez le titre, les ingrédients et les étapes, puis appuyez sur « Publier la recette ».", "Open the Add page, fill in the title, ingredients and steps, then tap “Publish recipe”.", "افتح صفحة الإضافة، املأ الاسم والمكونات والخطوات ثم اضغط «نشر الوصفة»."],
        q2: ["Comment enregistrer un favori ?", "How do I save a favorite?", "كيف أحفظ وصفة في المفضلة؟"],
        a2: ["Ouvrez une recette et appuyez sur « Ajouter aux favoris ». Retrouvez-la ensuite dans la page Favoris.", "Open any recipe and tap “Add To Favorites”. Find it later in the Favorites page.", "افتح أي وصفة واضغط «أضف إلى المفضلة». ستجدها لاحقًا في صفحة المفضلة."],
        q3: ["Comment noter une recette ?", "How do I rate a recipe?", "كيف أقيّم وصفة؟"],
        a3: ["Appuyez sur une étoile dans la page de la recette. Appuyez à nouveau sur la même étoile pour retirer votre note.", "Tap a star on the recipe page. Tap the same star again to remove your rating.", "اضغط على نجمة في صفحة الوصفة. اضغط على نفس النجمة مرة أخرى لحذف تقييمك."],
        q4: ["Où sont stockées mes données ?", "Where is my data stored?", "أين تُحفظ بياناتي؟"],
        a4: ["Tout reste dans ce navigateur. Effacer les données du navigateur supprime vos recettes, favoris et notes.", "Everything stays in this browser. Clearing the browser data deletes your recipes, favorites and ratings.", "كل شيء يبقى في هذا المتصفح. مسح بيانات المتصفح يحذف وصفاتك ومفضلتك وتقييماتك."],
        stillHelp: ["Besoin d'aide ?", "Still need help?", "تحتاج مساعدة؟"],
        phHelp: ["Décrivez votre problème...", "Describe your problem...", "اشرح مشكلتك..."],
        send: ["Envoyer le message", "Send message", "إرسال الرسالة"],

        // ----- textes dynamiques (script.js / auth.js) -----
        recipe: ["Recette", "Recipe", "الوصفة"],
        noMine: ["Vous n'avez publié aucune recette.", "You haven't published any recipe yet.", "لم تنشر أي وصفة بعد."],
        noRecipes: ["Aucune recette trouvée.", "No recipes found.", "لا توجد وصفات."],
        new: ["Nouveau", "New", "جديد"],
        review1: ["avis", "review", "تقييم"],
        reviewN: ["avis", "reviews", "تقييمات"],
        rateTap: ["Touchez une étoile pour noter cette recette.", "Tap a star to rate this recipe.", "اضغط على نجمة لتقييم هذه الوصفة."],
        rated: ["Merci ! Vous avez noté cette recette {0}/5. Touchez la même étoile pour retirer votre avis.", "Thanks! You rated this recipe {0}/5. Tap the same star to remove your review.", "شكرًا! قيّمت هذه الوصفة {0}/5. اضغط على نفس النجمة لحذف تقييمك."],
        ratedNotif: ["Vous avez noté « {0} » {1}/5 ⭐", "You rated “{0}” {1}/5 ⭐", "قيّمت «{0}» بـ {1}/5 ⭐"],
        favAdded: ["« {0} » ajoutée à vos favoris ♥", "“{0}” added to your favorites ♥", "تمت إضافة «{0}» إلى المفضلة ♥"],
        noFavs: ["Aucun favori. Ouvrez une recette et appuyez sur « Ajouter aux favoris ».", "No favorites yet. Open a recipe and tap “Add To Favorites”.", "لا توجد مفضلة بعد. افتح وصفة واضغط «أضف إلى المفضلة»."],
        noMatch: ["Aucune recette ne correspond à votre recherche.", "No recipe matches your search.", "لا توجد وصفة تطابق بحثك."],
        nothingSaved: ["Rien d'enregistré.", "Nothing saved yet.", "لا شيء محفوظ بعد."],
        errImg: ["Choisissez une image (JPG, PNG ou WebP).", "Choose an image file (JPG, PNG or WebP).", "اختر ملف صورة (JPG أو PNG أو WebP)."],
        errRead: ["Impossible de lire l'image. Essayez-en une autre.", "The image couldn't be read. Try another one.", "تعذّرت قراءة الصورة. جرّب صورة أخرى."],
        errFormat: ["Ce format d'image n'est pas supporté. Utilisez JPG, PNG ou WebP.", "This image format isn't supported. Use JPG, PNG or WebP.", "صيغة الصورة غير مدعومة. استعمل JPG أو PNG أو WebP."],
        errTitle: ["Entrez un titre avant de publier.", "Enter a recipe title before publishing.", "أدخل اسم الوصفة قبل النشر."],
        errCat: ["Choisissez une catégorie avant de publier.", "Choose a category before publishing.", "اختر صنفًا قبل النشر."],
        updated: ["Recette « {0} » modifiée ✏️", "Recipe “{0}” updated ✏️", "تم تعديل الوصفة «{0}» ✏️"],
        published: ["Votre recette « {0} » est publiée 🎉", "Your recipe “{0}” is published 🎉", "تم نشر وصفتك «{0}» 🎉"],
        deleted: ["Recette « {0} » supprimée 🗑️", "Recipe “{0}” deleted 🗑️", "تم حذف الوصفة «{0}» 🗑️"],
        welcome: ["Bienvenue sur SA7NI, {0} 👋 Publiez votre première recette !", "Welcome to SA7NI, {0} 👋 Publish your first recipe!", "مرحبًا بك في SA7NI يا {0} 👋 انشر أول وصفة لك!"],
        justNow: ["À l'instant", "Just now", "الآن"],
        minAgo: ["il y a {0} min", "{0} min ago", "منذ {0} دقيقة"],
        hAgo: ["il y a {0} h", "{0} h ago", "منذ {0} ساعة"],
        dAgo: ["il y a {0} j", "{0} d ago", "منذ {0} يوم"],
        noNotif: ["Aucune notification.", "No notifications.", "لا توجد إشعارات."],
        confirmUser: ["Supprimer « {0} » ? Cette action est irréversible.", "Delete “{0}”? This can't be undone.", "حذف «{0}»؟ لا يمكن التراجع عن هذا الإجراء."],
        confirmAdmin: ["Supprimer « {0} » ? (Admin) Vous pourrez la restaurer depuis votre Profil.", "Delete “{0}”? (Admin) You can restore it from your Profile.", "حذف «{0}»؟ (مدير) يمكنك استرجاعها من ملفك الشخصي."],
        confirmRestore: ["Restaurer toutes les recettes que vous avez supprimées ou modifiées en tant qu'admin ?", "Restore all the recipes you deleted or edited as admin?", "استرجاع كل الوصفات التي حذفتها أو عدّلتها كمدير؟"],
        writeMsg: ["Écrivez d'abord votre message.", "Write your message first.", "اكتب رسالتك أولًا."],
        supportSubject: ["Support SA7NI", "SA7NI support", "دعم SA7NI"],
        errEmail: ["Entrez un email valide.", "Enter a valid email.", "أدخل بريدًا إلكترونيًا صحيحًا."],
        errPw: ["Le mot de passe doit contenir au moins 6 caractères.", "Password must be at least 6 characters.", "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل."],
        errName: ["Entrez votre nom.", "Enter your name.", "أدخل اسمك."],
        errExists: ["Cet email a déjà un compte. Connectez-vous.", "This email already has an account. Log in instead.", "هذا البريد لديه حساب بالفعل. سجّل الدخول."],
        errWrong: ["Email ou mot de passe incorrect.", "Wrong email or password.", "البريد أو كلمة المرور غير صحيحة."]
    };

    window.LANG = lang;
    window.t = (k, ...a) => {
        const e = DICT[k];
        let s = e ? e[IDX] : k;
        a.forEach((v, i) => { s = s.split("{" + i + "}").join(v); });
        return s;
    };

    // Langue + sens d'écriture (arabe = droite → gauche)
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    // Textes statiques du HTML
    document.querySelectorAll("[data-i18n]").forEach(e => { e.textContent = t(e.dataset.i18n); });
    document.querySelectorAll("[data-i18n-ph]").forEach(e => { e.placeholder = t(e.dataset.i18nPh); });

    // Boutons de langue (dans chaque élément [data-langs])
    document.querySelectorAll("[data-langs]").forEach(box => {
        box.classList.add("langs");
        box.innerHTML = LANGS.map(([c, label]) =>
            `<button type="button" data-lang="${c}" class="${c === lang ? "sel" : ""}">${label}</button>`).join("");
        box.addEventListener("click", ev => {
            const c = ev.target.dataset && ev.target.dataset.lang;
            if (!c || c === lang) return;
            try { localStorage.setItem("sa7ni_lang", c); } catch (e) { }
            location.reload();
        });
    });
})();