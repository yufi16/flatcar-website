// Mobile menu toggle
document.querySelector('.mobile-menu')?.addEventListener('click', function(e) {
  document.body.classList.toggle('mobile-menu_open');
});

// Docs menu toggle
document.querySelector('.docs-menu')?.addEventListener('click', function(e) {
  document.body.classList.toggle('show');
});

function closeMenu(elem) {
  if(document.body.classList.contains('mobile-menu_open')) {
    if(!elem.classList.contains('dropdown-toggle')) {
      document.querySelector('.mobile-menu')?.click();
    }
  }
}

// Dropdown navigation for mobile
document.querySelectorAll(".nav-item.dropdown .nav-link").forEach(function(item) {
  item.addEventListener("click", function(e) {
    e.preventDefault();
    if(document.body.classList.contains('mobile-menu_open')) {
      if(!this.classList.contains('nav-link_selected')) {
        document.querySelectorAll('.nav-link').forEach(function(elem) {
          elem.classList.remove('nav-link_selected');
        });
        this.classList.add('nav-link_selected');
      } else {
        this.classList.remove('nav-link_selected');
      }
    }
  });
});

// Dropdown focus handling for desktop
document.querySelectorAll(".nav-item.dropdown .nav-link").forEach(function(item) {
  if(!document.body.classList.contains('mobile-menu_open')) {
    item.addEventListener("focus", function(e) {
      item.parentElement.classList.add("focus");
    });

    // This logic is based on https://www.a11ywithlindsey.com/blog/create-accessible-dropdown-navigation
    item.parentElement.querySelectorAll(".dropdown-menu").forEach(function(dropdown) {
      const subMenuLinks = dropdown.querySelectorAll('a');
      const lastLink = subMenuLinks[subMenuLinks.length - 1];

      lastLink?.addEventListener('blur', function() {
        item.parentElement.classList.remove('focus');
      });
    });
  }
});

// Close menu on link clicks
[".nav-link", ".dropdown-item"].forEach(className =>
  document.querySelectorAll(className).forEach(function(item) {
    item.addEventListener("click", function(e) {
      closeMenu(this);
    });
  })
);


// Cookies

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

document.querySelectorAll(".contact-cookies-consent-notice").forEach(
  function (item) {
    if (getCookie("cookieconsent_status") !== "allow") {
      item.classList.remove("d-none");
    }
  }
);
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("pre code").forEach(block => {
    const wrapper = block.parentNode;
    wrapper.classList.add("code-block");

    const button = document.createElement("button");
    button.className = "copy-btn";
    button.setAttribute("aria-label", "Copy to clipboard");
    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"/></svg>
    `;
    wrapper.appendChild(button);

    button.addEventListener("click", () => {
      navigator.clipboard.writeText(block.innerText).then(() => {
        button.classList.add("copied");
        setTimeout(() => button.classList.remove("copied"), 1200);
      });
    });
  });
});