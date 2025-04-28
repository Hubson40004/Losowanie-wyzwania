let ostatnieZadanie = "";
let historia = [];

window.onload = () => {
    const dzisiaj = new Date().toDateString();
    const ostatniaData = localStorage.getItem("data");

    if (ostatniaData !== dzisiaj) {
        localStorage.clear();
        localStorage.setItem("data", dzisiaj);
    } else {
        const wykonane = JSON.parse(localStorage.getItem("historia")) || [];
        historia = wykonane;
    }
};

const wyzwania = [
    "Zrób 10 pompek", "Napisz komuś miły komentarz", "Spędź godzinę bez telefonu",
    "Uśmiechnij się do 3 osób", "Przeczytaj 2 strony książki", "Zrób sobie herbatę i odpocznij",
    "Zrób 20 przysiadów", "Napisz na kartce 3 rzeczy, za które jesteś dziś wdzięczny",
    "Wyjdź na 10-minutowy spacer", "Nie sprawdzaj telefonu przez 30 minut",
    "Narysuj coś kreatywnego", "Posprzątaj swoje biurko", "Posłuchaj ulubionej muzyki",
    "Zadzwoń do bliskiej osoby", "Zjedz coś zdrowego", "Zrób listę celów na jutro",
    "Wyłącz powiadomienia na godzinę", "Zapisz pozytywne myśli", "Zrób medytację przez 5 minut",
    "Rozciągnij się przez 10 minut"
];

function losuj() {
    const wynik = document.getElementById("wynik");
    const konfetti = document.getElementById("konfetti-gif");
    let zmiana = 0;

    const interval = setInterval(() => {
        const temp = wyzwania[Math.floor(Math.random() * wyzwania.length)];
        wynik.textContent = temp;
        zmiana++;
        if (zmiana >= 10) {
            clearInterval(interval);
            const finalne = wyzwania[Math.floor(Math.random() * wyzwania.length)];
            wynik.textContent = finalne;
            wynik.classList.remove("podkreslone");
            ostatnieZadanie = finalne;
            konfetti.style.display = "block";
            setTimeout(() => {
                konfetti.style.display = "none";
            }, 5000);
            document.getElementById("ukonczone").style.display = "inline-block";
        }
    }, 200);
}

function ukonczZadanie() {
    historia.push(ostatnieZadanie);
    localStorage.setItem("historia", JSON.stringify(historia));

    const wynik = document.getElementById("wynik");
    wynik.classList.add("podkreslone");
    document.getElementById("gratulacje").style.display = "block";
    document.getElementById("pokazHistorie").style.display = "inline-block";
    document.getElementById("ukonczone").style.display = "none";
}

function pokazHistorie() {
    const lista = document.getElementById("historia");
    lista.innerHTML = "";

    historia.forEach(zad => {
        const el = document.createElement("li");
        el.textContent = `✅ ${zad}`;
        lista.appendChild(el);
    });

    lista.style.display = "block";
}