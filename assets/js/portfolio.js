(function () {
  const openButtons = document.querySelectorAll("[data-modal]");
  const closeSelectors = "[data-close]";
  let lastFocus = null;

  function openModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    lastFocus = document.activeElement;

    m.classList.add("is-open");
    m.setAttribute("aria-hidden", "false");

    // focus first focusable element
    const focusable = m.querySelector("button, a, input, textarea, select, [tabindex]:not([tabindex='-1'])");
    if (focusable) focusable.focus();

    document.body.style.overflow = "hidden";
  }

  function closeModal(m) {
    m.classList.remove("is-open");
    m.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  openButtons.forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn.dataset.modal));
  });

  document.addEventListener("click", (e) => {
    const closeEl = e.target.closest(closeSelectors);
    if (!closeEl) return;

    const modal = e.target.closest(".modal");
    if (modal) closeModal(modal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const openModalEl = document.querySelector(".modal.is-open");
    if (openModalEl) closeModal(openModalEl);
  });
})();
