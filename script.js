const text = "Securing Systems • Exploiting Vulnerabilities • Building Defenses";
let i = 0;

function typing() {
  if (i < text.length) {
    document.querySelector(".typing").textContent += text.charAt(i);
    i++;
    setTimeout(typing, 50);
  }
}

typing();