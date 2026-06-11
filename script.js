const translations = {
  en: {
    brand: "Historical Bialystok",
    navHome: "Home",
    navGame: "Play",
    navHistory: "History",
    askAi: "Ask AI",
    navContact: "Contact",
    navAbout: "About project",
    navCookies: "Cookies",
    navDownload: "Download",
    navPrivacy: "Privacy",
    navAccess: "Accessibility",
    navCopyright: "Copyright",
    menu: "Menu",

    heroSmall: "1930s interactive 3D city experience",
    heroTitle: "Bialystok",
    heroSub: "Explore a historical reconstruction of the city through an interactive online and VR experience.",
    playGame: "Play",
    learnHistory: "History",
    contact: "Contact",

    gameSmall: "Online version",
    gameTitle: "Start the online experience",
    gameText: "Open the web version and explore the reconstruction directly in your browser.",
    gameLaunchText: "Enter the reconstruction and explore the city from your browser.",
    openGameButton: "Play",

    vrSmall: "Meta Quest version",
    vrTitle: "Install the VR experience",
    vrText: "Download the Android APK file and sideload it onto a Meta Quest headset using SideQuest or Meta Quest Developer Hub.",
    vrDownloadTitle: "Bialystok VR APK",
    vrDownloadText: "Use this file for Meta Quest installation.",
    vrTextLink: "Direct APK link",
    vrDownloadButton: "Download APK",
    vrStep1: "Enable developer mode for your Meta Quest headset in the Meta Horizon mobile app.",
    vrStep2: "Connect the headset to your computer with a USB cable and allow USB debugging inside the headset.",
    vrStep3: "Open SideQuest or Meta Quest Developer Hub, then install the downloaded APK file.",
    vrStep4: "In the headset, open the app from the Unknown Sources section of the app library.",

    footerText: "Bialystok 1930s Historical Reconstruction",
    copyrightNotice: "© 2026 Jaroslaw Glod",

    historyTitle: "History",
    historySmall: "City memory",
    historyIntro: "Bialystok has a long history as a meeting place of cultures, languages and religions in north-eastern Poland.",
    historyP1: "Before the Second World War, the city was home to Polish, Jewish, Belarusian, Russian and other communities. Its streets, markets, houses of worship and public spaces reflected this diverse urban life.",
    historyP2: "The war brought catastrophic destruction. Much of Bialystok was damaged or rebuilt, and the Jewish community, which had been central to the city for generations, was devastated during the Holocaust.",
    historyP3: "The reconstruction offers a way to imagine fragments of the city that were lost, using interactive space to connect visitors with Bialystok's historical memory.",

    aboutTitle: "About project",
    aboutSmall: "Interactive reconstruction",
    aboutP1: "Historical Bialystok is a 3D interactive model of the city inspired by its appearance before the Second World War.",
    aboutP2: "The project lets visitors explore the reconstruction online or experience it more immersively in VR, connecting local history with digital heritage.",

    contactTitle: "Contact",
    contactSmall: "Get in touch",
    name: "Name",
    email: "Email",
    message: "Message",
    sendDemo: "Send message",
    contactSent: "Thank you. Your message has been sent.",
    contactError: "Sorry, the message could not be sent. Please check the form and try again.",
    contactValidation: "Please complete all fields with a valid email address.",
    contactConfig: "The contact form SMTP login is not configured yet. Add the IONOS mailbox settings in contact-config.php.",
    contactMailError: "The server could not send the email. Please check the IONOS mailbox settings.",
    contactSmtpConnect: "The server could not connect to smtp.ionos.com. Check whether SMTP connections are allowed on this hosting package.",
    contactSmtpTls: "The server connected to IONOS but could not start TLS encryption.",
    contactSmtpAuth: "IONOS rejected the SMTP login. Check the mailbox address and password.",
    contactSmtpRejected: "IONOS rejected the email. Check that the sender mailbox exists and matches the SMTP login.",

    cookiesTitle: "Cookie policy",
    cookiesSmall: "Website information",
    cookiesP1: "This website does not contain cookies.",
    cookiesP2: "It has no advertising cookies, analytics tracking or third-party embedded services.",
    privacyTitle: "Privacy policy",
    privacySmall: "Website information",
    privacyP1: "If you use the contact form, your name, email address and message are sent by email so the project owner can reply.",
    privacyP2: "The interactive experience runs in the browser and does not require visitors to create an account.",

    accessTitle: "Accessibility statement",
    accessSmall: "Website information",
    accessP1: "The website uses semantic HTML, visible navigation, responsive layout and keyboard-accessible links and buttons.",
    accessP2: "The interactive 3D experience includes movement, visual detail and on-screen text that visitors may experience differently depending on their device.",

    copyrightTitle: "Copyright",
    copyrightSmall: "Rights and permissions",
    copyrightP1: "© 2026 Jaroslaw Glod. All rights reserved.",
    copyrightP2: "The website content, text, visual design, project materials, downloadable files and interactive reconstruction are protected by copyright unless another source or licence is stated.",
    copyrightP3: "You may view the website and download the provided APK for personal use on a Meta Quest device. You may not copy, redistribute, modify, publish or commercially use the project materials without prior written permission.",
    copyrightP4: "To request permission to reuse project content, please use the contact page."
  },

  pl: {
    brand: "Historyczny Białystok",
    navHome: "Start",
    navGame: "Doświadczenie",
    navGame: "Graj",
    navHistory: "Historia",
    askAi: "Zapytaj AI",
    navContact: "Kontakt",
    navAbout: "O projekcie",
    navCookies: "Cookies",
    navDownload: "Pobierz",
    navPrivacy: "Prywatność",
    navAccess: "Dostępność",
    navCopyright: "Copyright",
    menu: "Menu",

    heroSmall: "Interaktywne doświadczenie miasta 3D z lat 30.",
    heroTitle: "Białystok",
    heroSub: "Poznaj historyczną rekonstrukcję miasta jako interaktywne doświadczenie online i VR.",
    playGame: "Graj",
    learnHistory: "Historia",
    contact: "Kontakt",

    gameSmall: "Wersja online",
    gameTitle: "Rozpocznij doświadczenie online",
    gameText: "Otworz wersje webowa i zwiedzaj rekonstrukcje bezposrednio w przegladarce.",
    gameLaunchText: "Wejdź do rekonstrukcji i zwiedzaj miasto w przeglądarce.",
    openGameButton: "Graj",

    vrSmall: "Wersja Meta Quest",
    vrTitle: "Zainstaluj doswiadczenie VR",
    vrText: "Pobierz plik APK dla Androida i zainstaluj go na goglach Meta Quest za pomoca SideQuest albo Meta Quest Developer Hub.",
    vrDownloadTitle: "Bialystok VR APK",
    vrDownloadText: "Uzyj tego pliku do instalacji na Meta Quest.",
    vrTextLink: "Bezposredni link APK",
    vrDownloadButton: "Pobierz APK",
    vrStep1: "Wlacz tryb deweloperski dla gogli Meta Quest w aplikacji mobilnej Meta Horizon.",
    vrStep2: "Podlacz gogle do komputera kablem USB i zezwol na debugowanie USB w goglach.",
    vrStep3: "Otworz SideQuest albo Meta Quest Developer Hub, a nastepnie zainstaluj pobrany plik APK.",
    vrStep4: "W goglach otworz aplikacje z sekcji Unknown Sources w bibliotece aplikacji.",

    footerText: "Historyczna rekonstrukcja Białegostoku z lat 30.",
    copyrightNotice: "© 2026 Jaroslaw Glod",

    historyTitle: "Historia",
    historySmall: "Pamięć miasta",
    historyIntro: "Białystok ma długą historię jako miejsce spotkania kultur, języków i religii w północno-wschodniej Polsce.",
    historyP1: "Przed II wojną światową miasto było domem dla społeczności polskiej, żydowskiej, białoruskiej, rosyjskiej i innych. Ulice, targi, świątynie i przestrzenie publiczne odzwierciedlały tę różnorodność.",
    historyP2: "Wojna przyniosła katastrofalne zniszczenia. Duża część Białegostoku została uszkodzona lub przebudowana, a społeczność żydowska, od pokoleń ważna dla miasta, została zniszczona podczas Zagłady.",
    historyP3: "Rekonstrukcja pozwala wyobrazić sobie fragmenty utraconego miasta i łączy odwiedzających z historyczną pamięcią Białegostoku.",

    aboutTitle: "O projekcie",
    aboutSmall: "Interaktywna rekonstrukcja",
    aboutP1: "Historyczny Białystok to interaktywny model 3D miasta inspirowany jego wyglądem sprzed II wojny światowej.",
    aboutP2: "Projekt pozwala zwiedzać rekonstrukcję online lub bardziej immersyjnie w VR, łącząc lokalną historię z dziedzictwem cyfrowym.",

    contactTitle: "Kontakt",
    contactSmall: "Kontakt",
    name: "Imię",
    email: "Email",
    message: "Wiadomość",
    sendDemo: "Wyślij",

    sendDemo: "Wyslij wiadomosc",
    contactSent: "Dziekuje. Wiadomosc zostala wyslana.",
    contactError: "Nie udalo sie wyslac wiadomosci. Sprawdz formularz i sprobuj ponownie.",
    contactValidation: "Uzupelnij wszystkie pola i podaj poprawny adres email.",
    contactConfig: "Login SMTP formularza nie jest jeszcze skonfigurowany. Dodaj ustawienia skrzynki IONOS w contact-config.php.",
    contactMailError: "Serwer nie mogl wyslac emaila. Sprawdz ustawienia skrzynki IONOS.",
    contactSmtpConnect: "Serwer nie mogl polaczyc sie z smtp.ionos.com. Sprawdz, czy hosting pozwala na polaczenia SMTP.",
    contactSmtpTls: "Serwer polaczyl sie z IONOS, ale nie mogl uruchomic szyfrowania TLS.",
    contactSmtpAuth: "IONOS odrzucil logowanie SMTP. Sprawdz adres skrzynki i haslo.",
    contactSmtpRejected: "IONOS odrzucil email. Sprawdz, czy skrzynka nadawcy istnieje i zgadza sie z loginem SMTP.",

    cookiesTitle: "Polityka cookies",
    cookiesSmall: "Informacje o stronie",
    cookiesP1: "Ta strona nie zawiera plików cookies.",
    cookiesP2: "Nie zawiera reklamowych plików cookies, analityki ani zewnętrznych usług osadzonych.",
    privacyTitle: "Polityka prywatności",
    privacySmall: "Informacje o stronie",
    privacyP1: "Jesli uzyjesz formularza kontaktowego, imie, adres email i wiadomosc zostana wyslane emailem, aby autor projektu mogl odpowiedziec.",
    privacyP2: "Interaktywne doświadczenie działa w przeglądarce i nie wymaga tworzenia konta.",

    accessTitle: "Deklaracja dostępności",
    accessSmall: "Informacje o stronie",
    accessP1: "Strona używa semantycznego HTML, widocznej nawigacji, responsywnego układu oraz linków i przycisków dostępnych z klawiatury.",
    accessP2: "Interaktywne doświadczenie 3D zawiera ruch, detale wizualne i tekst ekranowy, które odwiedzający mogą odbierać różnie w zależności od urządzenia.",

    copyrightTitle: "Copyright",
    copyrightSmall: "Prawa i zgody",
    copyrightP1: "© 2026 Jaroslaw Glod. Wszelkie prawa zastrzezone.",
    copyrightP2: "Tresci strony, teksty, projekt wizualny, materialy projektu, pliki do pobrania i interaktywna rekonstrukcja sa chronione prawem autorskim, chyba ze podano inne zrodlo lub licencje.",
    copyrightP3: "Mozesz ogladac strone i pobrac udostepniony plik APK do osobistego uzytku na urzadzeniu Meta Quest. Nie wolno kopiowac, rozpowszechniac, modyfikowac, publikowac ani wykorzystywac komercyjnie materialow projektu bez uprzedniej pisemnej zgody.",
    copyrightP4: "Aby poprosic o zgode na ponowne wykorzystanie tresci projektu, uzyj strony kontaktowej."
  }
};

function setLanguage(lang) {
  localStorage.setItem("siteLanguage", lang);
  document.documentElement.lang = lang === "pl" ? "pl" : "en";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll("[data-lang-button]").forEach((button) => {
    button.classList.toggle("active", button.dataset.langButton === lang);
  });

  setupContactStatus(lang);
}

function setupLanguageButtons() {
  document.querySelectorAll("[data-lang-button]").forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.langButton);
    });
  });
}

function setupMobileMenu() {
  const button = document.querySelector("[data-menu-button]");
  const nav = document.querySelector("[data-nav]");
  if (!button || !nav) return;

  button.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

function setupContactStatus(lang) {
  const status = document.querySelector("[data-contact-status]");
  if (!status) return;

  const params = new URLSearchParams(window.location.search);
  const contactStatus = params.get("contact");
  const statusKey = {
    sent: "contactSent",
    error: "contactError",
    validation: "contactValidation",
    config: "contactConfig",
    mailerror: "contactMailError",
    smtpconnect: "contactSmtpConnect",
    smtptls: "contactSmtpTls",
    smtpauth: "contactSmtpAuth",
    smtprejected: "contactSmtpRejected"
  }[contactStatus];

  if (!statusKey || !translations[lang] || !translations[lang][statusKey]) {
    status.hidden = true;
    status.textContent = "";
    return;
  }

  status.hidden = false;
  status.dataset.status = contactStatus;
  status.textContent = translations[lang][statusKey];
}

document.addEventListener("DOMContentLoaded", () => {
  setupLanguageButtons();
  setupMobileMenu();
  setLanguage(localStorage.getItem("siteLanguage") || "en");
});
