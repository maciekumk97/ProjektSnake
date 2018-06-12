	const plansza = document.querySelector("canvas");
    const ctx = plansza.getContext("2d");
	document.addEventListener("keydown",sterowanie);  //Dodanie eventu, gdy nacisniemy jakiś klawisz;
	
	let px=10;
	let py=10; 		// pozycje weza
	let jx=20;
	let jy=20; 		// startowa pozycja jablka
	let xv=0;
	let yv=0; 		//predkosc
	let slad=[];	
	let ogon = 3; 	// poczatkowa dlugosc ogona
	const lk=25;
	const lp=25;  	//liczba kratek i plytek 25*25=625
	let score=0; 	// punkty na start;
	let tryb_gry;
	
	function menu() {   // funkcja wyswietlajaca menu 
	ctx.fillStyle = 'white';
	ctx.fillRect(0,0,plansza.width,plansza.height);
	
	ctx.fillStyle = 'Green';
	ctx.font="40px Sylfaen";
	ctx.fillText("Snake",245,lk+20);        // Napis snake na gorze
	
	ctx.fillStyle = 'red';
	ctx.font="25px Sylfaen";
	ctx.fillText("Nacisnij enter, żeby zacząć grać",130,lk+80);   // Napisy z instrukcjami
	
	ctx.fillStyle = 'blue';
	ctx.font="20px Sylfaen";
	ctx.fillText("Żeby zapauzować gre, kliknij spacje",150,lk+150);
	
	ctx.fillStyle = 'blue';										  // Poziomy trudnosci
	ctx.font="20px Sylfaen";
	ctx.fillText("Wybierz poziom trudności: ",180,lk+200);
	ctx.fillStyle = 'green';
	ctx.fillText("Kliknij 1: Easy ",220,lk+220);
	ctx.fillStyle = 'black';
	ctx.fillText("Kliknij 2: Normal ",220,lk+240);
	ctx.fillStyle = 'red';
	ctx.fillText("Kliknij 3: Hard ",220,lk+260);
	
	ctx.fillStyle = 'blue';										 // Tryby gry
	ctx.font="20px Sylfaen";
	ctx.fillText("Tryby gry: ",180,lk+290);
	ctx.fillStyle = 'orange';
	ctx.fillText("Kliknij 4: Normalny ",220,lk+310);
	ctx.fillStyle = 'purple';
	ctx.fillText("Kliknij 5: Torus ",220,lk+330);
	
	ctx.fillStyle = 'red';
	ctx.font="20px Arial";
	ctx.fillText("Designed by: Maciek Świechowicz",155,lk+580);  // autor
	ctx.font="20px Sylfaen";
	
	}
	menu();  //uruchomienie funkcji menu
	
	function gra() {    //glowna funkcja, opdowiadajaca za dzialanie calej gry
	px+=xv;       //zmiana polozenia weza
	py+=yv;
		
		if(tryb_gry==0)        //Pierwszy tryb gry "normalny", po zetknieciu ze sciana przegrywamy
			{
			if(px < 0-1) {
				alert('koniec gry, odśwież przeglądarke');
			}
			if(px > lp) {
				alert('koniec gry, odśwież przeglądarke');
			}
			if(py < 0-1) {
				alert('koniec gry, odśwież przeglądarke');
			}
			if(py > lp) {
				alert('koniec gry, odśwież przeglądarke');
			} 
		}
		else if(tryb_gry==1)  //Drugi tryb gry - Torus; Po wjechaniu w sciane, przenosimy sie na poczatek planszy
		{
			if(px < 0) {
				px = lp-1;
			}
			if(px > lp-1) {
				px = 0;
			}
			if(py < 0) {
				py = lp-1;
			}
			if(py > lp-1) {
				py = 0;
			}
		}
		
	ctx.fillStyle = 'white';
	ctx.fillRect(0,0,plansza.width,plansza.height);    //rysowanie planszy, zeby była caly czas biala
	
	
	ctx.fillStyle = 'black';  // kolor węża
		for(let i=0;i<slad.length;i++) {
			ctx.fillRect(slad[i].x*lk,slad[i].y*lk,lk-2,lk-2); // tworzenie weza
			if(slad[i].x==px && slad[i].y==py) {  //warunek, ktory jest spelniony wjedziemy sami w siebie.
				ogon = 3;						  //Poczatkowa wartosc ogonu 3 i 0 punktow. Wraca do tego stanu gdy w siebie wjedziemy
				score = 0;
			}
		}
		slad.push({x:px,y:py});    // Tworzenie sladu
		while(slad.length>ogon)	   // Jezeli dlugosc sladu jest dluzsza od ogona
		{
		slad.shift();              // Ogon sie nie robi dluzszy
		}
	
		if(jx==px && jy==py) 	   // Warunek deklarujacy co sie dzieje, jesli "zjemy jabłko", czyli jak wjedziemy na zielony kwadrat
		{	
			ogon++;				   				// Inkrementacja ogonu o 1;
			score++;			   				// To samo z punktami jak powyżej;
			jx=Math.floor(Math.random()*lp);	// Wylosowanie kolejnych pozycji "jabłka"
			jy=Math.floor(Math.random()*lp);
			
		}
	
		ctx.fillStyle="green"; 					 // Kolor jablka
		ctx.fillRect(jx*lk,jy*lk,lk-2,lk-2);	 // Stworzenie jabłka
		let score_text = "Punkty: " + score;	 // Stworzenie zmiennej dla punktów
		ctx.fillStyle = 'red';					 // Ustalenie koloru dla wyniku
		ctx.font="25px arial";					 // Ustalenie czcionki i rozmiaru 
		ctx.fillText(score_text, 245, lk+20 );	 // Wyswietlenie ilosci punktów
		

	}
	
    
	
	function sterowanie(klik) {		// Funkcja odpowiedzialna za sterowanie
    switch(klik.keyCode) {
        case 37:					// Strzałka w lewo
            xv=-1;yv=0;
            break;
        case 38:					// Strzałka w góre
            xv=0;yv=-1;
            break;
        case 39:					// Strzałka w prawo
            xv=1;yv=0;
            break;
        case 40:					// Strzalka w dol
            xv=0;yv=1;
            break;
		case 32:					// Spacja
			alert("pauza");
			break;
		case 13:					// Enter; uruchomienie gry
			setInterval(gra,1000/x);// Ustawienie częstotliwości odswieżania
			break;
		case 49:					// Klawisz "1" na klawiaturze
			x=5;					// Ustawienie zmiennej x na 5, czyli najwolniejsze odswiezanie. Tryb Easy
			menu();
			ctx.fillStyle = 'green';
			ctx.fillText("Kliknij 1: Easy - wybrales ",220,lk+220);
			
			break;
		case 50:					// Klawisz "2" na klawiaturze
			x=10;					// Jak wyzej, to samo w Case 51;
			menu();
			ctx.fillStyle = 'black';
			ctx.fillText("Kliknij 2: Normal - wybrales ",220,lk+240);
			break;
		case 51:					// Klawisz "3" na klawiaturze
			x=15;
			menu();
			ctx.fillStyle = 'red';
			ctx.fillText("Kliknij 3: Hard - wybrałeś ",220,lk+260);
			break;	
		case 52:					// Klawisz "4" na klawiaturze
			tryb_gry=0;			
			menu();
			ctx.fillStyle = 'orange';
			ctx.fillText("Kliknij 4: Normalny - wybrałeś ",220,lk+310);		
			if(x==5)				// Instrukcje warunkowe odpowiedzialna za poziom trudnosci gry
				{
				ctx.fillStyle = 'green';
				ctx.fillText("Kliknij 1: Easy - wybrales ",220,lk+220);
				}
			else if(x==10)
				{
				ctx.fillStyle = 'black';
				ctx.fillText("Kliknij 2: Normal - wybrales ",220,lk+240);
				}
			else if(x==15)
				{
				ctx.fillStyle = 'red';
				ctx.fillText("Kliknij 3: Hard - wybrałeś ",220,lk+260);
				}
			break;	
		case 53:				// Klawisz "5" na klawiaturze
			tryb_gry=1;
			menu();
			ctx.fillStyle = 'purple';
			ctx.fillText("Kliknij 5: Torus - wybrałeś ",220,lk+330);
			
			if(x==5)			// To samo co w Case 42;
				{
				ctx.fillStyle = 'green';
				ctx.fillText("Kliknij 1: Easy - wybrales ",220,lk+220);
				}
			else if(x==10)
				{
				ctx.fillStyle = 'black';
				ctx.fillText("Kliknij 2: Normal - wybrales ",220,lk+240);
				}
			else if(x==15)
				{
				ctx.fillStyle = 'red';
				ctx.fillText("Kliknij 3: Hard - wybrałeś ",220,lk+260);
				}
			break;		
		}
		
	}
	
