// Login / Sign up / session. Tout est stocké dans le navigateur (projet démo, pas de serveur).
(() => {
  const LS = {
    get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v === null ? d : v; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const $a = s => document.querySelector(s);
  const users = () => LS.get("sa7ni_users", []);

  // Mot de passe : jamais stocké en clair (PBKDF2 ; hash simple de secours si le navigateur n'a pas crypto.subtle)
  async function hashPw(pw, salt) {
    try {
      const enc = new TextEncoder();
      const key = await crypto.subtle.importKey("raw", enc.encode(pw), "PBKDF2", false, ["deriveBits"]);
      const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: enc.encode(salt), iterations: 100000, hash: "SHA-256" }, key, 256);
      return [...new Uint8Array(bits)].map(b => b.toString(16).padStart(2, "0")).join("");
    } catch (e) {
      let h = 5381; for (const c of salt + pw) h = ((h * 33) ^ c.charCodeAt(0)) >>> 0;
      return "x" + h.toString(16);
    }
  }

  // ----- Session : connecté -> on charge l'application, sinon on montre le login -----
  const mail = LS.get("sa7ni_session", null);
  const me = mail && users().find(u => u.email === mail);
  if (me) {
    window.APP_USER = { name: me.name, email: me.email };
    document.body.classList.remove("guest");
    const s = document.createElement("script");
    s.src = "script.js?v=16";
    document.body.appendChild(s);
    return;
  }
  localStorage.removeItem("sa7ni_session");

  // ----- Formulaire -----
  let mode = "login";
  const err = m => { $a("#aErr").textContent = m || ""; };
  document.querySelectorAll(".tab").forEach(tb => tb.onclick = () => {
    mode = tb.dataset.mode;
    document.querySelectorAll(".tab").forEach(x => x.classList.toggle("sel", x === tb));
    $a("#nameRow").hidden = mode !== "signup";
    $a("#aGo").textContent = mode === "signup" ? t("createAccount") : t("login");
    $a("#aPw").autocomplete = mode === "signup" ? "new-password" : "current-password";
    err("");
  });
  document.querySelectorAll("#authForm input").forEach(i => i.addEventListener("input", () => err("")));

  $a("#authForm").addEventListener("submit", async e => {
    e.preventDefault();
    const name = $a("#aName").value.replace(/[<>&"]/g, "").trim().slice(0, 30);
    const email = $a("#aEmail").value.trim().toLowerCase();
    const pw = $a("#aPw").value;
    if (!/^\S+@\S+\.\S+$/.test(email)) return err(t("errEmail"));
    if (pw.length < 6) return err(t("errPw"));
    const list = users();
    if (mode === "signup") {
      if (!name) return err(t("errName"));
      if (list.some(u => u.email === email)) return err(t("errExists"));
      const salt = Math.random().toString(36).slice(2) + Date.now().toString(36);
      const hash = await hashPw(pw, salt);
      // Le tout premier compte récupère les recettes/favoris/notes déjà enregistrés avant l'ajout du login
      if (!list.length) ["mine", "rates", "favs", "notifs"].forEach(k => {
        const v = localStorage.getItem("sa7ni_" + k);
        if (v !== null) localStorage.setItem("sa7ni_" + k + ":" + email, v);
      });
      list.push({ name, email, salt, hash });
      LS.set("sa7ni_users", list);
    } else {
      const u = list.find(x => x.email === email);
      if (!u || u.hash !== await hashPw(pw, u.salt)) return err(t("errWrong"));
    }
    LS.set("sa7ni_session", email);
    location.reload();
  });
})();