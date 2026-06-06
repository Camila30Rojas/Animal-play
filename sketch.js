// =====================================
// ANIMAL EXPLORER DELUXE
// VERSION ILUSTRADA
// =====================================

let pantalla = "menu";
let animalSeleccionado = null;
let estrellas = 0;
let fondoImg = null;
let turtugaImg = null;
let sapitoImg = null;
let fuentePrincipal = null;

let animales = [
	{
		nombre: "León",
		emoji: "🦁",
		habitat: "Sabana",
		descripcion: "El rey de la sabana africana.",
		desbloqueado: true
	},
	{
		nombre: "Elefante",
		emoji: "🐘",
		habitat: "Sabana",
		descripcion: "El mamífero terrestre más grande.",
		desbloqueado: true
	},
	{
		nombre: "Tucán",
		emoji: "🦜",
		habitat: "Selva",
		descripcion: "Famoso por su enorme pico colorido.",
		desbloqueado: true
	},
	{
		nombre: "Panda",
		emoji: "🐼",
		habitat: "Bosque",
		descripcion: "Le encanta comer bambú.",
		desbloqueado: false
	},
	{
		nombre: "Pingüino",
		emoji: "🐧",
		habitat: "Antártida",
		descripcion: "Excelente nadador.",
		desbloqueado: false
	},
	{
		nombre: "Zorro",
		emoji: "🦊",
		habitat: "Bosque",
		descripcion: "Ágil e inteligente.",
		desbloqueado: false
	}
];

function preload(){
	fondoImg = loadImage(
		"images/fondo.jpg",
		() => {},
		() => { fondoImg = null; }
	);

	fuentePrincipal = loadFont(
		"fonts/LuckiestGuy-Regular.ttf",
		() => {},
		() => { fuentePrincipal = null; }
	);

	// Intentar cargar la imagen de la tortuga (varias variantes de nombre)
	let turtugaCandidates = [
		"images/Turtuga 2.png",
		"images/Turtuga2.png",
		"images/turtuga2.png",
		"images/Turtuga 2.jpg",
		"images/Turtuga2.jpg"
	];

	function tryLoadT(i){
		if(i>=turtugaCandidates.length){ turtugaImg = null; return; }
		loadImage(
			turtugaCandidates[i],
			img => { turtugaImg = img; },
			() => { tryLoadT(i+1); }
		);
	}

	tryLoadT(0);

	// Intentar cargar la imagen del sapito (varias variantes de nombre)
	let sapitoCandidates = [
		"images/Sapito.png",
		"images/sapito.png",
		"images/Sapito 1.png",
		"images/Sapito1.png",
		"images/Sapito.jpg"
	];

	function tryLoadS(i){
		if(i>=sapitoCandidates.length){ sapitoImg = null; return; }
		loadImage(
			sapitoCandidates[i],
			img => { sapitoImg = img; },
			() => { tryLoadS(i+1); }
		);
	}

	tryLoadS(0);

}

function usarFuenteTexto(){
if(fuentePrincipal){
textFont(fuentePrincipal);
}
}

function usarFuenteEmoji(){
textFont("Segoe UI Emoji");
}

function dibujarEmoji(txt,x,y){
push();
usarFuenteEmoji();
noStroke();
// Aumenta un 20% el tamaño actual de texto para emojis
let s = textSize();
textSize(s * 1.2);
text(txt,x,y);
pop();
}

function dibujarTextoBordeCafe(txt,x,y,tam,colorTexto=255){
push();
usarFuenteTexto();
fill(colorTexto);
stroke("#5A2E12");
strokeWeight(4);
textSize(tam);
text(txt,x,y);
pop();
}

function dibujarTextoBordeCafeCaja(txt,x,y,w,h,tam,colorTexto=255){
	push();
	usarFuenteTexto();

	// Fondo caja: amarillo quemado clarito
	noStroke();
	fill(250,218,110,200); // amarillo quemado clarito (RGBA)
	rect(x,y,w,h,8);

	// Borde sutil alrededor de la caja
	noFill();
	stroke("#5A2E12");
	strokeWeight(2);
	rect(x,y,w,h,8);

	// Preparar texto
	textSize(tam);
	textLeading(tam * 1.2);

	fill(colorTexto);
	stroke("#5A2E12");
	strokeWeight(3);

	// Padding interno reducido para caja más compacta
	let padX = 10;
	let padY = 8;
	let maxW = w - padX*2;

	// Dividir texto en líneas respetando el ancho disponible
	let words = txt.split(' ');
	let lines = [];
	let cur = '';
	for(let i=0;i<words.length;i++){
		let word = words[i];
		let test = cur.length==0 ? word : cur + ' ' + word;
		if(textWidth(test) <= maxW){
			cur = test;
		} else {
			if(cur.length>0) lines.push(cur);
			cur = word;
		}
	}
	if(cur.length>0) lines.push(cur);

	// Calcular altura total y posicion inicial para centrar verticalmente
	let lineH = (textAscent() + textDescent()) * 1.2;
	let totalH = lines.length * lineH;
	let startY = y + (h - totalH)/2;

	// Dibujar líneas centradas horizontalmente
	textAlign(CENTER,CENTER);
	for(let i=0;i<lines.length;i++){
		let ly = startY + i*lineH + lineH/2;
		text(lines[i], x + w/2, ly);
	}
	pop();
}

function setup(){

createCanvas(1280,720);

textAlign(CENTER,CENTER);

rectMode(CORNER);

usarFuenteTexto();
}

function draw(){

dibujarFondo();

if(pantalla=="menu"){
menuPrincipal();
}

if(pantalla=="coleccion"){
coleccion();
}

if(pantalla=="animal"){
fichaAnimal();
}

if(pantalla=="minijuego"){
minijuego();
}

barraInferior();
contadorEstrellas();
}

// ============================
// FONDO
// ============================

function dibujarFondo(){

if(fondoImg){
image(fondoImg,0,0,width,height);
return;
}

background("#BFE9FF");

for(let i=0;i<height;i++){

let c = lerpColor(
color("#BFE9FF"),
color("#EAF9FF"),
i/height
);

stroke(c);
line(0,i,width,i);
}

noStroke();

// SOL

fill("#FFF176");
circle(width/2,180,260);

// COLINAS

fill("#DCE775");
ellipse(width/2,height+40,1800,500);

fill("#AED581");
ellipse(width/2,height+160,1800,500);

// ARBOLES

for(let x=80;x<width;x+=220){

fill("#8D6E63");
rect(x,height-300,35,120);

fill("#66BB6A");
circle(x+15,height-320,100);

fill("#81C784");
circle(x-10,height-300,70);

fill("#81C784");
circle(x+40,height-300,70);
}

// HOJAS

textSize(70);

 dibujarEmoji("🌼",70,50);
 dibujarEmoji("🌼",220,40);

 dibujarEmoji("🌼",width-70,50);
 dibujarEmoji("🌼",width-220,40);
}
// ============================
// MENU PRINCIPAL
// ============================

function menuPrincipal(){

cartelTitulo("ANIMAL EXPLORER");

botonMenu(width/2,250,"🎉","JUGAR");
botonMenu(width/2,380,"📚","COLECCIÓN");
botonMenu(width/2,510,"🎮","MINIJUEGO");

botonAjustes();

// Mostrar imagen de la tortuga a la derecha del menú si existe
if(turtugaImg){
	// dibuja la imagen un poco más grande y desplazada hacia abajo
	let w = 320;
	let h = 320;
	let centerX = width - 220;
	let centerY = 340; // bajada adicional
	image(turtugaImg, centerX - w/2, centerY - h/2, w, h);
} else {
	// fallback: emoji (más grande)
	textSize(180);
	dibujarEmoji("🐢", width - 220, 340);
}

// Mostrar sapito en la esquina inferior izquierda si existe
if(sapitoImg){
	let w2 = 160; // tamaño
	let h2 = 160;
	let x2 = 220; // movido más a la derecha
	let y2 = height - 210; // subido un poco
	image(sapitoImg, x2 - w2/2, y2 - h2/2, w2, h2);
} else {
	textSize(120);
	dibujarEmoji("🐸", 220, height - 210);
}
}

// ============================
// CARTEL SUPERIOR
// ============================

function cartelTitulo(txt){

fill(0,40);
rect(width/2-315,50,630,90,20);

fill("#7B4A1E");
rect(width/2-330,40,660,100,25);

fill("#B67B4A");
rect(width/2-310,55,620,70,18);

fill(255);
stroke("#5A2E12");
strokeWeight(4);

textSize(42);
text(txt,width/2,90);

noStroke();
}

// ============================
// BOTONES MENU
// ============================

function botonMenu(x,y,icono,texto){

fill(0,40);
rect(x-214,y-39,428,78,20);

fill("#7B4A1E");
rect(x-220,y-45,440,90,20);

fill("#B67B4A");
rect(x-210,y-35,420,70,15);

fill("#8D5A32");
circle(x-150,y,70);

fill("#E8B66A");
circle(x-150,y,55);

fill(255);
textSize(26);
dibujarEmoji(icono,x-150,y);

fill(255);
textSize(30);
dibujarTextoBordeCafe(texto,x+25,y,30);
}

// ============================
// AJUSTES
// ============================

function botonAjustes(){

fill("#7B4A1E");
circle(90,90,90);

fill("#B67B4A");
circle(90,90,70);

fill(255);
textSize(34);
 dibujarEmoji("🛠️",90,90);
}

// ============================
// ESTRELLAS
// ============================

function contadorEstrellas(){

fill("#7B4A1E");
circle(width-90,90,100);

fill("#B67B4A");
circle(width-90,90,80);

fill(255);

textSize(20);
dibujarEmoji("🌟",width-90,75);

textSize(16);
dibujarTextoBordeCafe(estrellas,width-90,105,16);
}
// ============================
// COLECCION
// ============================

function coleccion(){
	cartelTitulo("COLECCIÓN");

	// Layout dinámico centrado y escalable para ocupar la pantalla
	let rows = 2;
	let cols = 3;

	let paddingTop = 140; // espacio para el título
	let paddingSides = 80;
	let gapX = 40;
	let gapY = 40;

	let cardW = Math.min(300, (width - paddingSides*2 - gapX*(cols-1)) / cols);
	let cardH = Math.min(240, (height - paddingTop - paddingSides - gapY*(rows-1)) / rows);

	// Reducir un poco el tamaño de las tarjetas
	let cardScale = 0.85;
	cardW *= cardScale;
	cardH *= cardScale;

	let totalW = cols*cardW + (cols-1)*gapX;
	let totalH = rows*cardH + (rows-1)*gapY;

	let startX = width/2 - totalW/2;
	// Subir las tarjetas un poco más (ajustada)
	// ahora bajadas 15px respecto a la versión previa
	let startY = paddingTop + (height - paddingTop - totalH)/2 - 55;

	let index = 0;

	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = startX + c*(cardW + gapX);
			let y = startY + r*(cardH + gapY);

			// sombra
			fill(0,40);
			rect(x+8,y+8,cardW,cardH,20);

			// tarjeta madera
			fill("#7B4A1E");
			rect(x,y,cardW,cardH,20);

			fill("#B67B4A");
			rect(x+10,y+10,cardW-20,cardH-20,15);

			fill("#4A2740");
			rect(x+18,y+18,cardW-36,cardH-36,12);


			// contenido
			let centerX = x + cardW/2;
			// colocar emoji un poco más abajo dentro de la tarjeta
			let emojiY = y + cardH*0.45;
			let nameY = y + cardH*0.86;

			// limitar tamaño del emoji para que nunca sobresalga de la tarjeta
			let maxEmojiByW = cardW - 40;
			let maxEmojiByH = cardH * 0.45;
			if(animales[index] && animales[index].desbloqueado){
				let emojiSize = Math.min(120, cardW*0.35, maxEmojiByW, maxEmojiByH);
				textSize(emojiSize);
				dibujarEmoji(animales[index].emoji, centerX, emojiY);

				fill(255);
				dibujarTextoBordeCafe(animales[index].nombre, centerX, nameY, Math.min(22, cardW*0.07));
			} else {
				let lockSize = Math.min(90, cardW*0.35, cardH*0.42);
				textSize(lockSize);
				dibujarEmoji("🔒", centerX, emojiY);

				fill(255);
				dibujarTextoBordeCafe("Bloqueado", centerX, nameY, Math.min(20, cardW*0.06));
			}

			index++;
		}
	}

	botonAtras();
}

// ============================
// FICHA ANIMAL
// ============================

function fichaAnimal(){

cartelTitulo(animalSeleccionado.nombre);

// LIBRO

	fill(0,40);
	rect(185,165,920,430,25);

	fill("#A97449");
	rect(170,150,940,450,25);

	// Borde oscuro alrededor del recuadro grande (consistente con otros elementos)
	noFill();
	stroke("#5A2E12");
	strokeWeight(5); // borde más grueso
	rect(170,150,940,450,25);
	noStroke();

	fill("#F7F0DF");
	rect(210,190,860,370,15);

// ANILLAS

	for(let y=220;y<540;y+=55){

		fill("#6D4C41");
		circle(width/2,y,18);

	}

// ANIMAL (centrado página izquierda)

// Círculo decorativo detrás del animal

	// Círculo decorativo detrás del animal (centrado en la caja)
	fill("#E8F5E9");
	// coordinadas calculadas para centrar dentro de la caja (izquierda)
	circle(425,355,240);

	// Animal centrado y aumentado
	textSize(160);
	dibujarEmoji(animalSeleccionado.emoji,425,355);

// TEXTO (centrado página derecha)

fill("#444");

textAlign(CENTER,CENTER);

textSize(38);
dibujarTextoBordeCafe(
animalSeleccionado.nombre,
850,
250,
38,
"#FFF8E8"
);

textSize(26);
dibujarTextoBordeCafe(
"Hábitat: " + animalSeleccionado.habitat,
850,
310,
26,
"#FFF8E8"
);

// DESCRIPCIÓN CENTRADA

textSize(24);

dibujarTextoBordeCafeCaja(
	animalSeleccionado.descripcion,
	670,      // inicio caja (movida 10px a la derecha)
	345,      // inicio caja (más cerca)
	360,      // ancho caja (más estrecha)
	100,      // alto caja (más compacto)
	22,
	"#FFF8E8"
);

botonAtras();

}
// ============================
// BOTON ATRAS
// ============================

function botonAtras(){

fill("#7B4A1E");
rect(40,40,120,50,15);

fill("#B67B4A");
rect(45,45,110,40,12);

fill(255);

textSize(20);
dibujarTextoBordeCafe("ATRÁS",100,65,20);
}
// ============================
// MINIJUEGO
// ============================

function minijuego(){

cartelTitulo("¿DE QUIÉN ES LA HUELLA?");

textSize(150);
dibujarEmoji("🐾",width/2,245);

fill(255);
textSize(28);
dibujarTextoBordeCafe(
"Selecciona el animal correcto",
width/2,
365,
28
);

opcion(320,480,"🦁");
opcion(640,480,"🐘");
opcion(960,480,"🦊");

botonAtras();
}

// ============================
// OPCIONES
// ============================

function opcion(x,y,emoji){

fill(0,40);
rect(x-74,y-74,148,148,20);

fill("#7B4A1E");
rect(x-80,y-80,160,160,20);

fill("#B67B4A");
rect(x-70,y-70,140,140,15);

textSize(90);
dibujarEmoji(emoji,x,y);
}

// ============================
// BARRA INFERIOR
// ============================

function barraInferior(){

fill("#5E3415");
rect(0,height-110,width,110);

let iconos=[
"🚀",
"🎶",
"📚",
"🏆",
"🛒"
];

for(let i=0;i<iconos.length;i++){

let x = 150 + i*220;

fill("#7B4A1E");
circle(x,height-55,70);

fill("#B67B4A");
circle(x,height-55,55);

fill(255);

textSize(26);
dibujarEmoji(
iconos[i],
x,
height-55
);
}
}

// ============================
// CLICKS
// ============================

function mousePressed(){

// MENU

if(pantalla=="menu"){

// JUGAR

	if(
	mouseX>420 &&
	mouseX<860 &&
	mouseY>205 &&
	mouseY<295
	){

	pantalla="coleccion";
	}

// COLECCION

	if(
	mouseX>420 &&
	mouseX<860 &&
	mouseY>335 &&
	mouseY<425
	){

	pantalla="coleccion";
	}

// MINIJUEGO

	if(
	mouseX>420 &&
	mouseX<860 &&
	mouseY>465 &&
	mouseY<555
	){

	pantalla="minijuego";
	}
}

// ============================
// COLECCION
// ============================

else if(pantalla=="coleccion"){

	if(
		mouseX>40 &&
		mouseX<160 &&
		mouseY>40 &&
		mouseY<90
	){
		pantalla="menu";
		return;
	}

	// Detección de clics usando el mismo layout dinámico centrado
	let rows = 2;
	let cols = 3;

	let paddingTop = 140;
	let paddingSides = 80;
	let gapX = 40;
	let gapY = 40;

	let cardW = Math.min(300, (width - paddingSides*2 - gapX*(cols-1)) / cols);
	let cardH = Math.min(240, (height - paddingTop - paddingSides - gapY*(rows-1)) / rows);

	let totalW = cols*cardW + (cols-1)*gapX;
	let totalH = rows*cardH + (rows-1)*gapY;

	let startX = width/2 - totalW/2;
	let startY = paddingTop + (height - paddingTop - totalH)/2 - 55;

	let index = 0;
	for(let r=0;r<rows;r++){
		for(let c=0;c<cols;c++){
			let x = startX + c*(cardW + gapX);
			let y = startY + r*(cardH + gapY);

			if(mouseX > x && mouseX < x + cardW && mouseY > y && mouseY < y + cardH){
				if(animales[index] && animales[index].desbloqueado){
					animalSeleccionado = animales[index];
					pantalla = "animal";
					return;
				}
			}

			index++;
		}
	}
}


// ============================
// FICHA
// ============================

else if(pantalla=="animal"){

if(
mouseX>40 &&
mouseX<160 &&
mouseY>40 &&
mouseY<90
){

pantalla="coleccion";
}
}

// ============================
// MINIJUEGO
// ============================

else if(pantalla=="minijuego"){

// ATRAS

if(
mouseX>40 &&
mouseX<160 &&
mouseY>40 &&
mouseY<90
){

pantalla="menu";
return;
}

// LEON

if(
mouseX>240 &&
mouseX<400 &&
mouseY>400 &&
mouseY<560
){

estrellas++;

for(let a of animales){

if(!a.desbloqueado){

a.desbloqueado=true;
break;
}
}

alert(
"¡Correcto! Has desbloqueado un nuevo animal."
);
}

// ELEFANTE

if(
mouseX>560 &&
mouseX<720 &&
mouseY>400 &&
mouseY<560
){

alert("Incorrecto");
}

// ZORRO

if(
mouseX>880 &&
mouseX<1040 &&
mouseY>400 &&
mouseY<560
){

alert("Incorrecto");
}
}
}