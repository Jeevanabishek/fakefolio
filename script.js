/* ============================================================
   DATA MODEL
   Add a project by pushing an object here — no HTML editing needed.
   ============================================================ */
const PROJECTS = [
  {
    title: "Cafe Sales Analytics",
    image: "files/Adidas Dashboard.png",
    summary:
      "Independently built an end-to-end ETL pipeline to analyse cafe sales performance using a 2025 dataset of 10k transactions, delivering financial and operational analytics through a multi-page interactive Power BI dashboard.",
    tags: ["Excel", "Python (Pandas, NumPy)", "Jupyter Notebook", "MS SQL Server", "Power BI (DAX, Power Query)"],
    github: "https://github.com/Jeevanabishek/Cafe-Sales-Analytics",
    dashboards: ["files/Adidas Dashboard.png"]
    // Add more screenshots by pushing more paths here, e.g.:
    // dashboards: ["files/Cafe Dashboard 1.png", "files/Cafe Dashboard 2.png"]
  },
  {
    title: "Adidas US Sales Analytics",
    image: "files/NEET Dashboard.png",
    summary:
      "Independently designed and executed an end-to-end analytics project using a raw Adidas US sales dataset (2020-2021) — from data discovery through ETL pipeline development to multi-page Power BI dashboard delivery.",
    tags: ["Excel", "Python (Pandas, NumPy)", "Jupyter Notebook", "MySQL", "Power BI (DAX, Power Query)"],
    github: "https://github.com/Jeevanabishek/US-Adidas-Sales-Analytics",
    dashboards: ["files/NEET Dashboard.png"]
  }
];

function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((p, i) => `
    <article class="project-card">
      <div class="project-thumb">
        <img src="${p.image}" alt="${p.title} dashboard preview" loading="lazy"
             onerror="this.closest('.project-thumb').innerHTML='<div class=&quot;thumb-fallback&quot;><i class=&quot;fa fa-chart-line&quot; aria-hidden=&quot;true&quot;></i></div>'">
      </div>
      <h4>${p.title}</h4>
      <p>${p.summary}</p>
      <div class="tag-row">
        ${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}
      </div>
      <div class="project-links">
        <a href="${p.github}" target="_blank" rel="noopener">GitHub Repository</a>
        <button type="button" class="btn-dashboard" onclick="openLightbox(${i})">
          Dashboard Images
        </button>
      </div>
    </article>
  `).join("");
}

/* ============================================================
   DASHBOARD IMAGE LIGHTBOX
   ============================================================ */
let currentProject = null;
let currentIndex = 0;

function openLightbox(projectIndex) {
  currentProject = PROJECTS[projectIndex];
  currentIndex = 0;
  updateLightboxImage();
  const box = document.getElementById('lightbox');
  box.hidden = false;
  box.classList.toggle('single', currentProject.dashboards.length === 1);
  document.body.classList.add('no-scroll');
}

function closeLightbox() {
  document.getElementById('lightbox').hidden = true;
  document.body.classList.remove('no-scroll');
  currentProject = null;
}

function changeImage(direction) {
  if (!currentProject) return;
  const total = currentProject.dashboards.length;
  currentIndex = (currentIndex + direction + total) % total;
  updateLightboxImage();
}

function updateLightboxImage() {
  const img = document.getElementById('lightboxImg');
  img.src = currentProject.dashboards[currentIndex];
  img.alt = `${currentProject.title} dashboard image ${currentIndex + 1}`;
  document.getElementById('lightboxCounter').textContent =
    `${currentIndex + 1} / ${currentProject.dashboards.length}`;
}

document.addEventListener('keydown', (e) => {
  if (document.getElementById('lightbox').hidden) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') changeImage(1);
  if (e.key === 'ArrowLeft') changeImage(-1);
});

/* ============================================================
   KPI COUNT-UP (runs once, when the strip scrolls into view)
   ============================================================ */
function initKpiCounters() {
  const cards = document.querySelectorAll(".kpi-number");
  if (!cards.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animate = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const isDecimal = String(target).includes(".");

    if (prefersReducedMotion) {
      el.textContent = target.toLocaleString() + suffix;
      return;
    }

    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = target * progress;
      el.textContent = (isDecimal ? value.toFixed(2) : Math.round(value).toLocaleString()) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  cards.forEach(c => observer.observe(c));
}

$(document).ready(function () {

  renderProjects();
  initKpiCounters();

  // Scroll to top on page refresh
  setTimeout(() => { $("html, body").scrollTop(0); }, 10);

  // Sticky header
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }
    updateActiveSection();
  });

  // Typed.js role cycler (falls back to static text if the library fails to load)
  if (window.Typed) {
    new Typed("#typedRole", {
      strings: ["Python &amp; SQL",
                "Power BI &amp; Excel","Extract, Transform & Load (ETL) &amp; Data Cleaning ",
                "Exploratory Data Analysis (EDA)",
                "Dashboard Development",
                "Data Storytelling"],
      startDelay: 750,
      typeSpeed: 45,
      backSpeed: 25,
      backDelay: 1400,
      loop: true,
      smartBackspace: true
    });
  }

  // Mobile menu functionality
  $('.menu_icon').click(function (e) {
    e.preventDefault();
    $('#primary-nav').addClass('show');
    $(this).attr('aria-expanded', 'true');
    $('body').addClass('no-scroll');
  });

  $('.close-btn').on('click', function (e) {
    e.preventDefault();
    closeMobileNav();
  });

  $('.navbar').on('click', 'li a', function (e) {
    if ($(window).width() < 768) {
      closeMobileNav();
    }

    var target = $(this).attr("href");
    e.preventDefault();
    if (target === "#home") {
      $("html, body").animate({ scrollTop: 0 }, 500);
    } else if ($(target).length) {
      var offset = $(target).offset().top - 40;
      $("html, body").animate({ scrollTop: offset }, 500);
    }

    $(".navbar li a").removeClass("active");
    $(this).addClass("active");
  });

  function closeMobileNav() {
    $('#primary-nav').removeClass('show');
    $('.menu_icon').attr('aria-expanded', 'false');
    $('body').removeClass('no-scroll');
  }

  // ScrollReveal animations (respects prefers-reduced-motion via CSS override)
  if (window.ScrollReveal) {
    ScrollReveal({ distance: "60px", duration: 900, delay: 100, easing: "ease-out" });
    ScrollReveal().reveal(".hero-text", { origin: "left" });
    ScrollReveal().reveal(".hero-visual", { origin: "right" });
    ScrollReveal().reveal(".kpi-card", { origin: "bottom", interval: 80 });
    ScrollReveal().reveal(".project-card", { origin: "bottom", interval: 100 });
    ScrollReveal().reveal(".skill", { origin: "bottom", interval: 80 });
    ScrollReveal().reveal(".experience-area .timeline-item, .education-area .timeline-item", { origin: "bottom", interval: 120 });
  }

  // Google Sheet contact form submission — endpoint & field names unchanged
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyXSu1rLuouae6opWiDy8flfkpQcMOomKo_IXJ4NW6-vSZzveyMJGirKdK3_OfH8G1r/exec';
  const form = document.forms['submitToGoogleSheet'];
  const msg = document.getElementById("msg");
  const submitBtn = form.querySelector('.submit');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    document.getElementById("currentDate").value = `${day}-${month}-${year}`;

    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(() => {
        msg.style.color = "#5eead4";
        msg.innerHTML = "✅ Message sent successfully!";
        form.reset();
      })
      .catch(error => {
        console.error('Error!', error.message);
        msg.style.color = "#f66";
        msg.innerHTML = "❌ Failed to send message.";
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
        setTimeout(() => msg.innerHTML = "", 5000);
      });
  });

  // Active section detection
  function updateActiveSection() {
    var scrollPosition = $(window).scrollTop();

    if (scrollPosition < 10) {
      $(".navbar li a").removeClass("active");
      $(".navbar li a[href='#home']").addClass("active");
      return;
    }

    $("section[id]").each(function () {
      var target = $(this).attr("id");
      var offset = $(this).offset().top;
      var height = $(this).outerHeight();

      if (scrollPosition >= offset - 120 && scrollPosition < offset + height - 120) {
        $(".navbar li a").removeClass("active");
        $(".navbar li a[href='#" + target + "']").addClass("active");
      }
    });
  }

  updateActiveSection();
});
