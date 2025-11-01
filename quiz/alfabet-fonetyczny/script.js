let przyciski = '';
for (i = 1; i <= 4; i++) {
    przyciski = przyciski + '<label class="przyciskBox" id="odpowiedz' + i + '"> </span></label>'
}

document.querySelector('.odpowiedzi').innerHTML = przyciski;
alfabet = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel', 'India', 'Juliett', 'Kilo', 'Lima', 'Mike', 'November', 'Oscar', 'Papa', 'Quebec', 'Romeo', 'Sierra', 'Tango', 'Uniform', 'Victor', 'Whiskey', 'X-ray', 'Yankee', 'Zulu'];

let pytania = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26'];
let ilePytan = pytania.length;
let nrPytania = pytania[0];

let nr = losujLiczbe();
let poprawnaOdpowiedz;

function losujLiczbe() {
    const liczba = Math.floor(Math.random() * pytania.length);
    const nr = pytania[liczba];
    pytania.splice(liczba, 1);
    return nr;
}

window.onload = wyswietlPytanie(nr);
let iloscPoprawnych = 0;
let zaznaczona;


function wyswietlPytanie(nr) {
    document.querySelector('.nrPytania').innerHTML = nrPytania + ' / ' + ilePytan;
    document.querySelector('.pytanie').innerHTML =  alfabet[nr].charAt(0) +' - ?';
    document.querySelector('.odpowiedzi').innerHTML = '<input type="text" class="odpowiedz">';
}

document.querySelector('.dalej').addEventListener("click", () => {
    nrPytania++;
    const poprawnaOdpowiedz = alfabet[nr];
    const odpowiedz = document.querySelector('.odpowiedz').value;
    const obliczenia = odpowiedz.charAt(0).toUpperCase() + odpowiedz.slice(1).toLowerCase();
    if (poprawnaOdpowiedz == obliczenia) {
        iloscPoprawnych++
    }

    if (nrPytania >= ilePytan) {
        return koniec();
    }

    nr = losujLiczbe();
    wyswietlPytanie(nr);
})


function koniec() {
    document.querySelector('.nrPytania').innerHTML = 'KONIEC!'
    document.querySelector('.pytanie').innerHTML = 'Twój wynik to: ' + iloscPoprawnych + '/' + ilePytan + '<br><br><input type="button" class="jeszczeRaz" onclick="location.reload()" value="Jeszcze raz">'

    document.querySelector('.odpowiedzi').innerHTML = '';
    document.querySelector('.dalej').style.display = 'none';
}
