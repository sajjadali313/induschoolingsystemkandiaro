(function () {
  var S = window.SITE || {}, $ = function (id) { return document.getElementById(id); };
  var esc = function (t) { var d = document.createElement("div"); d.textContent = t == null ? "" : t; return d.innerHTML; };
  var safeUrl = function (u) { return /^(https?:|images\/|\.\/|\/|mailto:|tel:)/i.test(u) ? u : "#"; };
  $("year").textContent = new Date().getFullYear();

  var menu = document.querySelector(".menu"), nav = $("nav");
  menu.addEventListener("click", function () {
    var open = nav.classList.toggle("open"); menu.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", function () { nav.classList.remove("open"); menu.setAttribute("aria-expanded", "false"); });

  function list(id, items, empty, row) {
    $(id).innerHTML = items && items.length ? items.map(row).join("") : '<p class="empty">' + empty + "</p>";
  }
  list("faculty", S.faculty, "Teacher profiles will be added soon.", function (f) {
    return '<article class="card"><h3>' + esc(f.name) + "</h3><p>" + esc(f.role) + "</p></article>"; });
  list("campus-list", S.campuses, "Campus details will be added soon. Please use the contact section.", function (c) {
    return '<article class="card"><h3>' + esc(c.name) + "</h3><p>" + esc(c.address) + "</p><p>" + esc(c.phone) + "</p></article>"; });
  list("event-list", S.events, "No upcoming events are listed right now.", function (e) {
    return '<article class="card"><h3>' + esc(e.title) + '</h3><p><time datetime="' + esc(e.date) + '">' + esc(e.date) + "</time></p><p>" + esc(e.text) + "</p></article>"; });
  list("gallery-list", S.gallery, "Photos will be added soon.", function (g) {
    return '<img loading="lazy" src="' + esc(safeUrl(g.src)) + '" alt="' + esc(g.alt) + '">'; });
  list("resource-list", S.resources, "Timetables and downloads will be added soon.", function (r) {
    return '<li><a href="' + esc(safeUrl(r.url)) + '">' + esc(r.title) + "</a></li>"; });

  var c = [];
  if (S.phone) c.push('<li>Phone: <a href="tel:' + esc(S.phone.replace(/[^\d+]/g, "")) + '">' + esc(S.phone) + "</a></li>");
  if (S.whatsapp) c.push('<li><a href="https://wa.me/' + esc(S.whatsapp.replace(/\D/g, "")) + '">Chat on WhatsApp</a></li>');
  if (S.email) c.push('<li>Email: <a href="mailto:' + esc(S.email) + '">' + esc(S.email) + "</a></li>");
  if (S.address) c.push("<li>" + esc(S.address) + "</li>");
  if (S.mapUrl) c.push('<li><a href="' + esc(safeUrl(S.mapUrl)) + '">Open in Google Maps</a></li>');
  $("contact-list").innerHTML = c.length ? c.join("") : '<li class="empty">Contact details will be added soon.</li>';

  var form = $("inquiry"), status = $("status");
  function say(msg, cls) { status.textContent = msg; status.className = cls; }
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var d = new FormData(form), bad = [];
    ["name", "phone", "class"].forEach(function (k) {
      var el = form.elements[k], miss = !String(d.get(k) || "").trim();
      el.setAttribute("aria-invalid", miss); if (miss) bad.push(el);
    });
    var em = form.elements.email;
    if (em.value && !em.checkValidity()) { em.setAttribute("aria-invalid", "true"); bad.push(em); } else em.removeAttribute("aria-invalid");
    if (bad.length) { say("Please complete the highlighted fields.", "err"); bad[0].focus(); return; }
    if (d.get("website")) return; // spam trap
    var body = "Name: " + d.get("name") + "\nPhone: " + d.get("phone") + "\nEmail: " + d.get("email") + "\nClass: " + d.get("class") + "\nMessage: " + d.get("message");
    if (S.formEndpoint) {
      say("Sending…", "");
      fetch(S.formEndpoint, { method: "POST", headers: { Accept: "application/json" }, body: d })
        .then(function (r) { if (!r.ok) throw 0; form.reset(); say("Thank you. We received your inquiry and will call you soon.", "ok"); })
        .catch(function () { say("The inquiry could not be sent. Please call or message us instead.", "err"); });
    } else if (S.email) {
      location.href = "mailto:" + S.email + "?subject=" + encodeURIComponent("Admission inquiry") + "&body=" + encodeURIComponent(body);
      say("Your email app should open. Send the message to complete your inquiry.", "ok");
    } else say("Online inquiries are not set up yet. Please use the contact details below.", "err");
  });
})();
