document.addEventListener("DOMContentLoaded", () => {
  const favoriListesi = document.getElementById("favori-listesi");
  const yeniLinkInput = document.getElementById("yeni-link");
  const ekleButon = document.getElementById("ekle-buton");

  // Favori linkleri yükle
  chrome.storage.sync.get(["favoriLinkler"], (result) => {
    const favoriLinkler = result.favoriLinkler || [];
    favoriLinkler.forEach(link => favoriEkle(link));
  });

  // Yeni link ekle
  ekleButon.addEventListener("click", () => {
    const yeniLink = yeniLinkInput.value.trim();
    if (yeniLink) {
      favoriEkle(yeniLink);
      chrome.storage.sync.get(["favoriLinkler"], (result) => {
        const favoriLinkler = result.favoriLinkler || [];
        favoriLinkler.push(yeniLink);
        chrome.storage.sync.set({ favoriLinkler });
      });
      yeniLinkInput.value = "";
    }
  });

  // Favori linki listeye ekle
  function favoriEkle(link) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = link;
    a.textContent = link;
    a.target = "_blank";
    li.appendChild(a);
    favoriListesi.appendChild(li);
  }
});
