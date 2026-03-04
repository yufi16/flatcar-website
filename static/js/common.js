// Menu mobile toggle
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
      const subMenuLinks = dropdown.querySelectorAll('a')
      const lastLink = subMenuLinks[subMenuLinks.length - 1]

      lastLink.addEventListener('blur', function() {
        item.parentElement.classList.remove('focus')
      })
    });
  }
});

// Close menu on nav/dropdown click
[".nav-link", ".dropdown-item"].forEach(className =>
  document.querySelectorAll(className).forEach(function(item) {
    item.addEventListener("click", function(e) {
      closeMenu(this);
    })
  })
);


// Cookies

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M480 400L288 400C279.2 400 272 392.8 272 384L272 128C272 119.2 279.2 112 288 112L421.5 112C425.7 112 429.8 113.7 432.8 116.7L491.3 175.2C494.3 178.2 496 182.3 496 186.5L496 384C496 392.8 488.8 400 480 400zM288 448L480 448C515.3 448 544 419.3 544 384L544 186.5C544 169.5 537.3 153.2 525.3 141.2L466.7 82.7C454.7 70.7 438.5 64 421.5 64L288 64C252.7 64 224 92.7 224 128L224 384C224 419.3 252.7 448 288 448zM160 192C124.7 192 96 220.7 96 256L96 512C96 547.3 124.7 576 160 576L352 576C387.3 576 416 547.3 416 512L416 496L368 496L368 512C368 520.8 360.8 528 352 528L160 528C151.2 528 144 520.8 144 512L144 256C144 247.2 151.2 240 160 240L176 240L176 192L160 192z"/></svg>
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
