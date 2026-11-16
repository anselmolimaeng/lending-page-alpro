/* Alpro — interações do site */
(function () {
  "use strict";

  // Número que recebe as solicitações de orçamento (formato internacional, só dígitos)
  var WHATSAPP = "5519997738131";
  var EMAIL = "anselmo.lima@alpro.com.br";

  document.documentElement.classList.remove("no-js");

  // Header: sombra ao rolar
  var header = document.querySelector(".site-header");
  function onScroll() { header && header.classList.toggle("is-scrolled", window.scrollY > 10); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Menu mobile
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open);
      document.body.classList.toggle("nav-open", open);
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      }
    });
  }

  // Link ativo no menu
  var page = document.body.getAttribute("data-page");
  document.querySelectorAll("[data-nav]").forEach(function (a) {
    if (a.getAttribute("data-nav") === page) { a.classList.add("is-active"); a.setAttribute("aria-current", "page"); }
  });

  // Ano no rodapé
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Animação de entrada
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Filtro do portfólio
  var filters = document.querySelectorAll(".filter");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.getAttribute("data-filter");
      filters.forEach(function (b) { b.classList.toggle("is-active", b === btn); b.setAttribute("aria-pressed", b === btn); });
      document.querySelectorAll(".gallery .project").forEach(function (p) {
        p.classList.toggle("is-hidden", f !== "all" && p.getAttribute("data-cat") !== f);
      });
    });
  });

  // Pré-seleciona o tipo de serviço via ?servico=admin|reforma|outro
  var params = new URLSearchParams(location.search);
  var pre = params.get("servico");
  if (pre) {
    var radio = document.querySelector('input[name="servico"][value="' + pre + '"]');
    if (radio) radio.checked = true;
  }

  // Formulários (orçamento e contato): valida e envia via WhatsApp
  document.querySelectorAll("form[data-lead-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (input) {
        var field = input.closest(".field");
        var valid = input.type === "email" ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value) : input.value.trim() !== "";
        if (field) field.classList.toggle("has-error", !valid);
        if (!valid && ok) { input.focus(); ok = false; }
      });
      if (!ok) return;

      var data = new FormData(form);
      var labels = {
        servico: "Serviço", nome: "Nome", telefone: "Telefone", email: "E-mail", cidade: "Cidade",
        tipo: "Tipo de imóvel", metragem: "Metragem aprox.", fase: "Fase do projeto", prazo: "Início desejado", mensagem: "Mensagem"
      };
      var servicos = { admin: "Administração de obra", reforma: "Reforma de alto padrão", outro: "Orçamento de outra obra" };
      var lines = ["*" + (form.getAttribute("data-title") || "Contato pelo site") + "*", ""];
      data.forEach(function (v, k) {
        if (!String(v).trim()) return;
        if (k === "servico") v = servicos[v] || v;
        lines.push("*" + (labels[k] || k) + ":* " + v);
      });
      var text = encodeURIComponent(lines.join("\n"));
      var url = "https://wa.me/" + WHATSAPP + "?text=" + text;
      var mail = document.querySelector("[data-mailto]");
      if (mail) mail.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(form.getAttribute("data-title") || "Contato pelo site") + "&body=" + encodeURIComponent(lines.join("\n").replace(/\*/g, ""));
      var waLink = form.querySelector("[data-wa-link]");
      if (waLink) waLink.href = url;
      form.classList.add("is-sent");
      window.open(url, "_blank", "noopener");
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    form.querySelectorAll("input, select, textarea").forEach(function (el) {
      el.addEventListener("input", function () { var f = el.closest(".field"); if (f) f.classList.remove("has-error"); });
    });
  });

  // Máscara simples de telefone
  document.querySelectorAll('input[type="tel"]').forEach(function (el) {
    el.addEventListener("input", function () {
      var d = el.value.replace(/\D/g, "").slice(0, 11);
      if (d.length > 6) el.value = "(" + d.slice(0, 2) + ") " + d.slice(2, d.length - 4) + "-" + d.slice(-4);
      else if (d.length > 2) el.value = "(" + d.slice(0, 2) + ") " + d.slice(2);
      else el.value = d;
    });
  });
})();
