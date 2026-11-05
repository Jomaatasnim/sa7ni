// Langues du site : en / fr / ar. Le choix est mémorisé dans le navigateur.
(() => {
    const T = {
        // Navigation
        "nav.home": ["🏠 Home", "🏠 Accueil", "🏠 الرئيسية"],
        "nav.fav": ["♡ Favorites", "♡ Favoris", "♡ المفضلة"],
        "nav.add": ["＋ Add", "＋ Ajouter", "＋ إضافة"],
        "nav.profile": ["👤 Profile", "👤 Profil", "👤 الملف الشخصي"],
        // Home
        "home.search": ["search recipes...", "rechercher une recette...", "ابحث عن وصفة..."],
        "cat.All": ["All 🍽️", "Tout 🍽️", "الكل 🍽️"],
        "cat.Breakfast": ["Breakfast 🥞", "Petit-déjeuner 🥞", "فطور 🥞"],
        "cat.Lunch": ["Lunch 🥪", "Déjeuner 🥪", "غداء 🥪"],
        "cat.Dinner": ["Dinner 🍝", "Dîner 🍝", "عشاء 🍝"],
        "cat.Desserts": ["Desserts 🍰", "Desserts 🍰", "حلويات 🍰"],
        "cat.Drinks": ["Drinks 🍹", "Boissons 🍹", "مشروبات 🍹"],
        "popular": ["Popular", "Populaires", "الأكثر شعبية"],
        "card.recipe": ["Recipe", "Recette", "الوصفة"],
        "review": ["review", "avis", "تقييم"],
        "reviews": ["reviews", "avis", "تقييمات"],
        "new": ["New", "Nouveau", "جديد"],
        // Recette
        "back": ["← Back", "← Retour", "→ رجوع"],
        "by": ["By", "Par", "بواسطة"],
        "rate.this": ["⭐ Rate this recipe", "⭐ Notez cette recette", "⭐ قيّم هذه الوصفة"],
        "rate.tap": ["Tap a star to rate this recipe.", "Appuyez sur une étoile pour noter cette recette.", "اضغط على نجمة لتقييم هذه الوصفة."],
        "rate.thanks": ["Thanks! You rated this recipe {n}/5. Tap the same star to remove your review.",
            "Merci ! Vous avez noté cette recette {n}/5. Appuyez sur la même étoile pour retirer votre avis.",
            "شكراً! قيّمت هذه الوصفة بـ {n}/5. اضغط على النجمة نفسها لإزالة تقييمك."],
        "fav.add": ["Add To Favorites", "Ajouter aux favoris", "أضف إلى المفضلة"],
        "fav.in": ["♥ In Favorites", "♥ Dans les favoris", "♥ في المفضلة"],
        "edit": ["Edit recipe", "Modifier la recette", "تعديل الوصفة"],
        "del": ["Delete recipe", "Supprimer la recette", "حذف الوصفة"],
        "ingredients": ["Ingredients", "Ingrédients", "المكونات"],
        "instructions": ["Instructions", "Instructions", "طريقة التحضير"],
        "persons": ["{n} Persons", "{n} Personnes", "{n} أشخاص"],
        "w.cook": ["cooking", "cuisson", "طهي"],
        "w.rest": ["rest", "repos", "راحة"],
        "w.h": ["h", "h", "س"],
        "w.min": ["min", "min", "د"],
        "tr.busy": ["Translating…", "Traduction en cours…", "جارٍ الترجمة…"],
        "tr.fail": ["Translation unavailable right now (offline or daily limit). Showing the original text.",
            "Traduction indisponible pour le moment (hors ligne ou limite quotidienne). Texte original affiché.",
            "الترجمة غير متاحة حالياً (لا يوجد اتصال أو تم بلوغ الحد اليومي). يتم عرض النص الأصلي."],
        // Favoris / profil
        "favorites": ["Favorites", "Favoris", "المفضلة"],
        "bio": ["Cooking with love", "Je cuisine avec amour", "أطبخ بحب"],
        "stats.recipes": ["Recipes", "Recettes", "وصفات"],
        "stats.saved": ["Saved", "Enregistrées", "محفوظة"],
        "stats.reviews": ["Reviews", "Avis", "تقييمات"],
        "my.recipes": ["My Recipes", "Mes recettes", "وصفاتي"],
        "saved.recipes": ["Saved Recipes", "Recettes enregistrées", "الوصفات المحفوظة"],
        "seeAll": ["See All →", "Voir tout →", "عرض الكل ←"],
        "menu.notif": ["🔔 Notifications", "🔔 Notifications", "🔔 الإشعارات"],
        "menu.dark": ["🌙 Dark Mode", "🌙 Mode sombre", "🌙 الوضع الليلي"],
        "menu.help": ["❔ Help & Support", "❔ Aide et support", "❔ المساعدة والدعم"],
        "menu.admin": ["🛠️ Admin: restore deleted / edited recipes", "🛠️ Admin : restaurer les recettes supprimées / modifiées", "🛠️ المشرف: استعادة الوصفات المحذوفة / المعدّلة"],
        "menu.logout": ["⎋ Log Out", "⎋ Déconnexion", "⎋ تسجيل الخروج"],
        "admin": ["Admin", "Admin", "مشرف"],
        "admin.confirm": ["Restore all the recipes you deleted or edited as admin?", "Restaurer toutes les recettes que vous avez supprimées ou modifiées en tant qu'admin ?", "هل تريد استعادة كل الوصفات التي حذفتها أو عدّلتها كمشرف؟"],
        "del.confirm": ["Delete “{t}”? This can't be undone.", "Supprimer « {t} » ? Cette action est irréversible.", "هل تريد حذف «{t}»؟ لا يمكن التراجع عن هذا الإجراء."],
        "del.confirmAdmin": ["Delete “{t}”? (Admin) You can restore it from your Profile.", "Supprimer « {t} » ? (Admin) Vous pourrez la restaurer depuis votre profil.", "هل تريد حذف «{t}»؟ (مشرف) يمكنك استعادتها من ملفك الشخصي."],
        // Messages vides
        "e.none": ["No recipes found.", "Aucune recette trouvée.", "لم يتم العثور على وصفات."],
        "e.mine": ["You haven't published any recipe yet.", "Vous n'avez encore publié aucune recette.", "لم تنشر أي وصفة بعد."],
        "e.nofav": ["No favorites yet. Open a recipe and tap “Add To Favorites”.", "Pas encore de favoris. Ouvrez une recette et appuyez sur « Ajouter aux favoris ».", "لا توجد مفضلات بعد. افتح وصفة واضغط على «أضف إلى المفضلة»."],
        "e.nomatch": ["No recipe matches your search.", "Aucune recette ne correspond à votre recherche.", "لا توجد وصفة تطابق بحثك."],
        "e.nosaved": ["Nothing saved yet.", "Rien d'enregistré pour le moment.", "لا يوجد شيء محفوظ بعد."],
        // Ajout
        "add.heading": ["Add Recipe", "Ajouter une recette", "إضافة وصفة"],
        "add.edit": ["Edit Recipe", "Modifier la recette", "تعديل الوصفة"],
        "add.photo": ["Add a photo", "Ajouter une photo", "أضف صورة"],
        "add.photoHint": ["Tap to choose or take a photo", "Appuyez pour choisir ou prendre une photo", "اضغط لاختيار صورة أو التقاطها"],
        "add.title": ["Recipe Title", "Titre de la recette", "عنوان الوصفة"],
        "add.titlePh": ["e.g Koksi bedjej", "ex. Koksi bedjej", "مثال: كسكسي بالدجاج"],
        "add.category": ["Category", "Catégorie", "الفئة"],
        "add.time": ["Preparing Time", "Temps de préparation", "وقت التحضير"],
        "add.timePh": ["🕒 e.g 30 min", "🕒 ex. 30 min", "🕒 مثال: 30 دقيقة"],
        "add.serv": ["Servings", "Portions", "عدد الأشخاص"],
        "add.servPh": ["👥 e.g 4 Persons", "👥 ex. 4 personnes", "👥 مثال: 4 أشخاص"],
        "add.addIng": ["+ Add Ingredient", "+ Ajouter un ingrédient", "+ إضافة مكوّن"],
        "add.addStep": ["+ Add Step", "+ Ajouter une étape", "+ إضافة خطوة"],
        "ph.ing": ["e.g Chicken", "ex. Poulet", "مثال: دجاج"],
        "ph.step": ["e.g prepare the ingredients", "ex. préparer les ingrédients", "مثال: حضّر المكونات"],
        "cancel": ["Cancel", "Annuler", "إلغاء"],
        "add.publish": ["Publish recipe", "Publier la recette", "نشر الوصفة"],
        "add.save": ["Save changes", "Enregistrer les modifications", "حفظ التعديلات"],
        "err.title": ["Enter a recipe title before publishing.", "Saisissez un titre de recette avant de publier.", "أدخل عنوان الوصفة قبل النشر."],
        "err.cat": ["Choose a category before publishing.", "Choisissez une catégorie avant de publier.", "اختر فئة قبل النشر."],
        "err.imgType": ["Choose an image file (JPG, PNG or WebP).", "Choisissez un fichier image (JPG, PNG ou WebP).", "اختر ملف صورة (JPG أو PNG أو WebP)."],
        "err.imgRead": ["The image couldn't be read. Try another one.", "L'image n'a pas pu être lue. Essayez-en une autre.", "تعذّرت قراءة الصورة. جرّب صورة أخرى."],
        "err.imgFmt": ["This image format isn't supported. Use JPG, PNG or WebP.", "Ce format d'image n'est pas pris en charge. Utilisez JPG, PNG ou WebP.", "صيغة الصورة غير مدعومة. استخدم JPG أو PNG أو WebP."],
        // Auth
        "auth.login": ["Log in", "Se connecter", "تسجيل الدخول"],
        "auth.signup": ["Sign up", "S'inscrire", "إنشاء حساب"],
        "auth.create": ["Create account", "Créer un compte", "إنشاء الحساب"],
        "auth.name": ["Name", "Nom", "الاسم"],
        "auth.namePh": ["e.g Tasnim", "ex. Tasnim", "مثال: تسنيم"],
        "auth.email": ["Email", "E-mail", "البريد الإلكتروني"],
        "auth.pw": ["Password", "Mot de passe", "كلمة السر"],
        "auth.pwPh": ["min 6 characters", "6 caractères minimum", "6 أحرف على الأقل"],
        "a.email": ["Enter a valid email.", "Saisissez un e-mail valide.", "أدخل بريداً إلكترونياً صالحاً."],
        "a.pw": ["Password must be at least 6 characters.", "Le mot de passe doit contenir au moins 6 caractères.", "يجب أن تتكون كلمة السر من 6 أحرف على الأقل."],
        "a.name": ["Enter your name.", "Saisissez votre nom.", "أدخل اسمك."],
        "a.exists": ["This email already has an account. Log in instead.", "Cet e-mail a déjà un compte. Connectez-vous plutôt.", "هذا البريد لديه حساب بالفعل. سجّل الدخول بدلاً من ذلك."],
        "a.wrong": ["Wrong email or password.", "E-mail ou mot de passe incorrect.", "البريد الإلكتروني أو كلمة السر غير صحيحة."],
        // Notifications
        "notif.title": ["Notifications", "Notifications", "الإشعارات"],
        "notif.clear": ["Clear all", "Tout effacer", "مسح الكل"],
        "notif.none": ["No notifications.", "Aucune notification.", "لا توجد إشعارات."],
        "n.welcome": ["Welcome to SA7NI, {name} 👋 Publish your first recipe!", "Bienvenue sur SA7NI, {name} 👋 Publiez votre première recette !", "مرحباً بك في SA7NI يا {name} 👋 انشر أول وصفة لك!"],
        "n.rated": ["You rated “{t}” {n}/5 ⭐", "Vous avez noté « {t} » {n}/5 ⭐", "قيّمت «{t}» بـ {n}/5 ⭐"],
        "n.fav": ["“{t}” added to your favorites ♥", "« {t} » ajoutée à vos favoris ♥", "تمت إضافة «{t}» إلى مفضلتك ♥"],
        "n.upd": ["Recipe “{t}” updated ✏️", "Recette « {t} » modifiée ✏️", "تم تعديل الوصفة «{t}» ✏️"],
        "n.pub": ["Your recipe “{t}” is published 🎉", "Votre recette « {t} » est publiée 🎉", "تم نشر وصفتك «{t}» 🎉"],
        "n.del": ["Recipe “{t}” deleted 🗑️", "Recette « {t} » supprimée 🗑️", "تم حذف الوصفة «{t}» 🗑️"],
        "ago.now": ["Just now", "À l'instant", "الآن"],
        "ago.min": ["{n} min ago", "il y a {n} min", "منذ {n} دقيقة"],
        "ago.h": ["{n} h ago", "il y a {n} h", "منذ {n} ساعة"],
        "ago.d": ["{n} d ago", "il y a {n} j", "منذ {n} يوم"],
        // Aide
        "help.title": ["Help & Support", "Aide et support", "المساعدة والدعم"],
        "help.q1": ["How do I add a recipe?", "Comment ajouter une recette ?", "كيف أضيف وصفة؟"],
        "help.a1": ["Open the Add page, fill in the title, ingredients and steps, then tap “Publish recipe”.", "Ouvrez la page Ajouter, remplissez le titre, les ingrédients et les étapes, puis appuyez sur « Publier la recette ».", "افتح صفحة الإضافة، املأ العنوان والمكونات والخطوات، ثم اضغط على «نشر الوصفة»."],
        "help.q2": ["How do I save a favorite?", "Comment enregistrer un favori ?", "كيف أحفظ وصفة في المفضلة؟"],
        "help.a2": ["Open any recipe and tap “Add To Favorites”. Find it later in the Favorites page.", "Ouvrez une recette et appuyez sur « Ajouter aux favoris ». Retrouvez-la ensuite dans la page Favoris.", "افتح أي وصفة واضغط على «أضف إلى المفضلة». ستجدها لاحقاً في صفحة المفضلة."],
        "help.q3": ["How do I rate a recipe?", "Comment noter une recette ?", "كيف أقيّم وصفة؟"],
        "help.a3": ["Tap a star on the recipe page. Tap the same star again to remove your rating.", "Appuyez sur une étoile sur la page de la recette. Appuyez à nouveau sur la même étoile pour retirer votre note.", "اضغط على نجمة في صفحة الوصفة. اضغط على النجمة نفسها مرة أخرى لإزالة تقييمك."],
        "help.q4": ["Where is my data stored?", "Où sont stockées mes données ?", "أين يتم تخزين بياناتي؟"],
        "help.a4": ["Everything stays in this browser. Clearing the browser data deletes your recipes, favorites and ratings.", "Tout reste dans ce navigateur. Effacer les données du navigateur supprime vos recettes, favoris et notes.", "كل شيء يبقى في هذا المتصفح. مسح بيانات المتصفح يحذف وصفاتك ومفضلاتك وتقييماتك."],
        "help.still": ["Still need help?", "Besoin d'aide ?", "هل تحتاج إلى مساعدة؟"],
        "help.ph": ["Describe your problem...", "Décrivez votre problème...", "صف مشكلتك..."],
        "help.send": ["Send message", "Envoyer le message", "إرسال الرسالة"],
        "help.err": ["Write your message first.", "Écrivez d'abord votre message.", "اكتب رسالتك أولاً."]
    };
    const IDX = { en: 0, fr: 1, ar: 2 };
    let lang = "en";
    try { const s = localStorage.getItem("sa7ni_lang"); if (s in IDX) lang = s; } catch (e) { }
    const listeners = [];

    const t = (k, v) => {
        const row = T[k];
        if (!row) return k;
        let s = row[IDX[lang]] || row[0];
        if (v) for (const x in v) s = s.split("{" + x + "}").join(v[x]);
        return s;
    };

    function apply() {
        const h = document.documentElement;
        h.lang = lang; h.dir = lang === "ar" ? "rtl" : "ltr";
        document.querySelectorAll("[data-i]").forEach(e => { e.textContent = t(e.dataset.i); });
        document.querySelectorAll("[data-i-ph]").forEach(e => { e.placeholder = t(e.dataset.iPh); });
        document.querySelectorAll("[data-lang]").forEach(b => b.classList.toggle("sel", b.dataset.lang === lang));
    }

    function setLang(l) {
        if (!(l in IDX) || l === lang) return;
        lang = l;
        try { localStorage.setItem("sa7ni_lang", l); } catch (e) { }
        apply();
        listeners.forEach(f => { try { f(l); } catch (e) { console.error(e); } });
    }

    document.addEventListener("click", e => {
        const b = e.target.closest("[data-lang]");
        if (b) setLang(b.dataset.lang);
    });

    window.I18N = { t, apply, setLang, onChange: f => listeners.push(f), get lang() { return lang; } };
    apply();
})();