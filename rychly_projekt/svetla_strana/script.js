/*POLOLETNÍ PROJEKT - PROGRAMOVÉ VYBAVENÍ - LUKÁŠ RYCHLÝ - AKTUÁLNÍ: JS/SVETLA_STRANA*/

//Inicializace canvasu. 
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

//Vstupní soubory.
let lod = new Image();
let pozadi = new Image();
let povrch = new Image();
let horniPrekazka = new Image();
let dolniPrekazka = new Image();
let nahled = new Image();
let hop = new Audio();
let pozadiHudba = new Audio();
let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
let slider2 = document.getElementById("myRange2");
let output2 = document.getElementById("demo2");
let gravitace = 1.5;
let posunNahoru = 20;

lod.src = 'images/lod1.png';
pozadi.src = 'images/pozadi.png';
povrch.src = 'images/povrch.png';
horniPrekazka.src = 'images/horniPrekazka.png';
dolniPrekazka.src = 'images/dolniPrekazka.png';
nahled.src = 'images/nahled.png'
hop.src = "sounds/hop.mp3";
pozadiHudba.src = "sounds/pozadiHudba.mp3";

//Zásah uživatele skrze nastavení hry.
let hodnota = parseInt(slider.value);
slider.oninput = function () {
    hodnota = parseInt(this.value);
    gravitace = hodnota;
}

let hodnota2 = parseInt(slider2.value);
slider2.oninput = function () {
    hodnota2 = parseInt(this.value);
    posunNahoru = hodnota2;
}

//Pohyb lodě směrem vzhůru.
document.addEventListener("keydown", pohybNahoru);
function pohybNahoru() {
    lodY = lodY - posunNahoru;
    hop.play();
}
//Řídící proměnné hry.
let mezera = 90;
let vyskaPrekazky1 = 242;
let posun = vyskaPrekazky1 + mezera;
let lodX = 10;
let lodY = 150;
let score = 0;


//Inicializace překážek.
let prekazky = [];

prekazky[0] = {
    x: canvas.width,
    y: 0
}

//Obtížnosti dle výběru.
function obtiznost1() {
    mezera = 90;
    posun = vyskaPrekazky1 + mezera;
}
function obtiznost2() {
    mezera = 180;
    posun = vyskaPrekazky1 + mezera;
}
function obtiznost3() {
    mezera = 400;
    posun = vyskaPrekazky1 + mezera;
}

//Inicializace prvotního náhledu.
nahled.onload = function () {
    ctx.drawImage(nahled, 0, 0);
}

//Hlavní funkce - překreslování canvasu.
function draw() {
    //Zapne hudbu.
    pozadiHudba.play();
    //Vykreslí pozadí.
    ctx.drawImage(pozadi, 0, 0);
    //Vykreslování jednotlivých překážek pomocí pole.
    for (let i = 0; i < prekazky.length; i++) {
        ctx.drawImage(horniPrekazka, prekazky[i].x, prekazky[i].y);
        ctx.drawImage(dolniPrekazka, prekazky[i].x, prekazky[i].y + posun);
        //Pohyb překážek.
        prekazky[i].x--;
        //Nová překážka + náhodné umístění v rámci osy Y.
        if (prekazky[i].x == 125) {
            prekazky.push({
                x: canvas.width,
                y: Math.floor(Math.random() * horniPrekazka.height) -
                    horniPrekazka.height
            });
        }
        //Podmínky, za kterých proběhne refresh stránky = konec hry. Podmínky se týkají srážky s určenými hranicemi či srážky se sloupy.
        if (lodX + lod.width >= prekazky[i].x && lodX <= prekazky[i].x + horniPrekazka.width
            && (lodY <= prekazky[i].y + horniPrekazka.height || lodY + lod.height >=
                prekazky[i].y + posun) || lodY + lod.height >= canvas.height - povrch.height || lodY <= 0) {
            //Zastavení hudby.
            pozadiHudba.pause();
            //Obnovení stránky.
            location.reload();
        }
        //Přičítání skore.
        if (prekazky[i].x == 5) {
            score++;
        }
        //V závislosti na score se mění pozadí hry.
        if (score >= 3) {
            pozadi.src = '../spolecna_pozadi/pozadi1.jpg';
            let image = document.getElementById('l1').src = '../spolecna_pozadi/unlock1.jpg';
        }
        if (score >= 5) {
            pozadi.src = '../spolecna_pozadi/pozadi2.jpg';
            let image = document.getElementById('l2').src = '../spolecna_pozadi/unlock2.jpg';
        }
        if (score >= 7) {
            pozadi.src = '../spolecna_pozadi/pozadi3.jpg';
            let image = document.getElementById('l3').src = '../spolecna_pozadi/unlock3.jpg';
        }
        if (score >= 9) {
            pozadi.src = '../spolecna_pozadi/pozadi4.jpg';
            let image = document.getElementById('l4').src = '../spolecna_pozadi/unlock4.jpg';
        }
        if (score >= 11) {
            pozadi.src = '../spolecna_pozadi/pozadi5.jpg';
            let image = document.getElementById('l5').src = '../spolecna_pozadi/unlock5.jpg';
        }
        if (score >= 13) {
            pozadi.src = '../spolecna_pozadi/pozadi6.jpg';
            let image = document.getElementById('l6').src = '../spolecna_pozadi/unlock6.jpg';
        }
        if (score >= 15) {
            pozadi.src = '../spolecna_pozadi/pozadi7.jpg';
            let image = document.getElementById('l7').src = '../spolecna_pozadi/unlock7.jpg';
        }
        if (score >= 17) {
            pozadi.src = '../spolecna_pozadi/pozadi8.jpg';
            let image = document.getElementById('l8').src = '../spolecna_pozadi/unlock8.jpg';
        }
        if (score >= 19) {
            pozadi.src = '../spolecna_pozadi/pozadi9.jpg';
            let image = document.getElementById('l9').src = '../spolecna_pozadi/unlock9.jpg';
        }
        if (score >= 21) {
            pozadi.src = '../spolecna_pozadi/pozadi10.jpg';
            let image = document.getElementById('l10').src = '../spolecna_pozadi/unlock10.jpg';
        }
        if (score >= 23) {
            pozadi.src = '../spolecna_pozadi/hlavni_c_pozadi.png';
        }
    }
    //Vykreslení povrchu v dolní části canvasu.
    ctx.drawImage(povrch, 0, canvas.height - povrch.height);
    //Vykreslení lodě.
    ctx.drawImage(lod, lodX, lodY);
    //Gravitace, která na loď působí a zajišťuje automatický pohyb po ose Y.
    lodY = lodY + gravitace;
    //Vypsání skore na určenou pozici v canvasu.
    ctx.fillStyle = "#FFE81F";
    ctx.font = "20px Arial";
    ctx.fillText("SCORE : " + score, 10, canvas.height - 20);
    //Obnovení relace.
    requestAnimationFrame(draw);
}