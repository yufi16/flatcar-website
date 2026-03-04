const cpSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
<path d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"
/></svg>`
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll("div.highlight").forEach(function(container) {
        const block = container.querySelector("pre code, pre");
        if (!block) return;

        if (container.querySelector(".copy-btn")) return;

        const button = document.createElement("button");
        button.className = "copy-btn";
        button.innerHTML = cpSVG;

        container.insertBefore(button, container.firstChild);

        button.addEventListener("click", function() {
            navigator.clipboard.writeText(block.innerText).then(() => {
                button.textContent = "Copied!";
                button.classList.add("copied");
                block.classList.add("copied"); // highlight code block background

                setTimeout(() => {
                    button.innerHTML = cpSVG;
                    button.classList.remove("copied");
                    block.classList.remove("copied");
                }, 2000);
            });
        });
    });
});