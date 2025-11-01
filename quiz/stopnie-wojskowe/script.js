let przyciski = '';
for (i = 1; i <= 4; i++) {
    przyciski = przyciski + '<label class="przyciskBox" id="odpowiedz' + i + '"> </span></label>'
}

document.querySelector('.odpowiedzi').innerHTML = przyciski;

stopnie = ['Szeregowy', 'Starszy Szeregowy', 'Starszy Szeregowy Specjalista', 'Kapral', 'Starszy kapral', 'Plutonowy', 'Sierżant', 'Starszy Sierżant', 'Młodszy Chorąży', 'Chorąży', 'Starszy Chorąży', 'Starszy Chorąży Specjalista', 'Podporucznik', 'Porucznik', 'Kapitan', 'Major', 'Podpułkownik', 'Pułkownik', 'Generał Brygady', 'Generał Dywizji', 'Generał Broni', 'Generał', 'Marszałek Polski']

let pytania = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
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
    document.querySelector('.pytanie').innerHTML = '<img src="../img/stopnie/' + nr + '.png"><br>Co to za stopień?';

    let zaznaczenie = '';
    const poprawnaLiczba = Math.floor(Math.random() * 4 + 1);
    const idPoprawne = '#odpowiedz' + poprawnaLiczba;
    const poprawna = stopnie[nr - 1];

    let byloOdpowiedzi = [];
    for (odp = 1; odp <= 4; odp++) {
        document.querySelector(idPoprawne).innerHTML = poprawna + zaznaczenie;
        poprawnaOdpowiedz = idPoprawne;

        const id = '#odpowiedz' + odp;
        const liczba = Math.floor(Math.random() * stopnie.length);
        let odpowiedz = stopnie[liczba];

        if (odpowiedz == poprawna || byloOdpowiedzi.includes(odpowiedz)) {
            const liczba = Math.floor(Math.random() * stopnie.length);
            odpowiedz = stopnie[liczba];
            byloOdpowiedzi.push(stopnie[liczba])
        } else {
            byloOdpowiedzi.push(stopnie[liczba])
        }

        zaznaczenie = '<input type="radio" name="odp" value=' + odp + 'class="odpowiedz">';

        if (id == idPoprawne) continue;
        document.querySelector(id).innerHTML = odpowiedz + zaznaczenie;
    }

    for (i = 1; i <= 4; i++) {
        const przyciski = document.querySelectorAll('.przyciskBox');
        let przycisk = document.querySelector('#odpowiedz' + i);
        przycisk.addEventListener("click", () => {
            przyciski.forEach(przycisk => {
                przycisk.classList.remove("active");
                const radio = przycisk.querySelector('input[type="radio"]');
                if (radio) radio.checked = false;
            });

            zaznaczona = przycisk.id;
            przycisk.classList.remove('active');
            przycisk.classList.add('active');
        })
    }
}

document.querySelector('.dalej').addEventListener("click", () => {
    const przyciski = document.querySelectorAll('.przyciskBox');
    przyciski.forEach(przycisk => {
        przycisk.classList.remove('active');
        const radio = przycisk.querySelector('input[type="radio"]');
        if (radio) radio.checked = false;
    });

    nrPytania++;

    const obliczenia = zaznaczona.replace("odpowiedz", '#odpowiedz')
    if (obliczenia == poprawnaOdpowiedz) {
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
