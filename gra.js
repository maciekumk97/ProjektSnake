	const plansza = document.querySelector("canvas");
    const ctx = plansza.getContext("2d");
	let punkty = document.querySelector("p");
	document.addEventListener("keydown",sterowanie);
	//setInterval(gra,1000/10);
	
	let px=10;
	let py=10; // pozycje weza
	let jx=20;
	let jy=20; // startowa pozycja jablka
	let xv=0;
	let yv=0; //predkosc
	let slad=[];
	let ogon = 3; // poczatkowa dlugosc ogona
	let lk=25;
	let lp=25;  //liczba kratek i plytek 25*25=625
	let score=0; // punkty na start;
	let tryb_gry;
	
	function menu() {
	ctx.fillStyle = 'white';
	ctx.fillRect(0,0,plansza.width,plansza.height);
	
	ctx.fillStyle = 'Green';
	ctx.font="40px Sylfaen";
	ctx.fillText("Snake",245,lk+20);
	
	ctx.fillStyle = 'red';
	ctx.font="25px Sylfaen";
	ctx.fillText("Nacisnij enter, żeby zacząć grać",130,lk+80);
	
	ctx.fillStyle = 'blue';
	ctx.font="20px Sylfaen";
	ctx.fillText("Żeby zapauzować gre, kliknij spacje",150,lk+150);
	
	ctx.fillStyle = 'blue';
	ctx.font="20px Sylfaen";
	ctx.fillText("Wybierz poziom trudności: ",180,lk+200);
	ctx.fillStyle = 'green';
	ctx.fillText("Kliknij 1: Easy ",220,lk+220);
	ctx.fillStyle = 'black';
	ctx.fillText("Kliknij 2: Normal ",220,lk+240);
	ctx.fillStyle = 'red';
	ctx.fillText("Kliknij 3: Hard ",220,lk+260);
	
	ctx.fillStyle = 'blue';
	ctx.font="20px Sylfaen";
	ctx.fillText("Tryby gry: ",180,lk+290);
	ctx.fillStyle = 'orange';
	ctx.fillText("Kliknij 4: Normalny ",220,lk+310);
	ctx.fillStyle = 'purple';
	ctx.fillText("Kliknij 5: Torus ",220,lk+330);
	
	ctx.fillStyle = 'red';
	ctx.font="20px Arial";
	ctx.fillText("Designed by: Maciek Świechowicz",155,lk+580);
	ctx.font="20px Sylfaen";
	
	}
	menu();
	
	function gra() {
	px+=xv;
	py+=yv;
		
		if(tryb_gry==0)
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
		else if(tryb_gry==1)
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
	ctx.fillRect(0,0,plansza.width,plansza.height);
	
	
	ctx.fillStyle = 'black';  // kolor węża
		for(let i=0;i<slad.length;i++) {
			ctx.fillRect(slad[i].x*lk,slad[i].y*lk,lk-2,lk-2); // wąż
			if(slad[i].x==px && slad[i].y==py) {
				ogon = 3;
				score = 0;
			}
		}
		slad.push({x:px,y:py});
		while(slad.length>ogon)
		{
		slad.shift();
		}
	
		if(jx==px && jy==py) 
		{	
			ogon++;
			score++;
			jx=Math.floor(Math.random()*lp);
			jy=Math.floor(Math.random()*lp);
			
		}
	
		ctx.fillStyle="green";  // jablko 
		ctx.fillRect(jx*lk,jy*lk,lk-2,lk-2);
		let score_text = "Punkty: " + score;
		ctx.fillStyle = 'red';
		ctx.font="25px arial";
		ctx.fillText(score_text, 245, lk+20 );
		

	}
	
    
	
	function sterowanie(klik) {
    switch(klik.keyCode) {
        case 37:
            xv=-1;yv=0;
            break;
        case 38:
            xv=0;yv=-1;
            break;
        case 39:
            xv=1;yv=0;
            break;
        case 40:
            xv=0;yv=1;
            break;
		case 32:
			alert("pauza");
			break;
		case 13:
			setInterval(gra,1000/x);
			break;
		case 49:
			x=10;
			menu();
			ctx.fillStyle = 'green';
			ctx.fillText("Kliknij 1: Easy - wybrales ",220,lk+220);
			
			break;
		case 50:
			x=15;
			menu();
			ctx.fillStyle = 'black';
			ctx.fillText("Kliknij 2: Normal - wybrales ",220,lk+240);
			break;
		case 51:
			x=20;
			menu();
			ctx.fillStyle = 'red';
			ctx.fillText("Kliknij 3: Hard - wybrałeś ",220,lk+260);
			break;	
		case 52:
			tryb_gry=0;
			menu();
			ctx.fillStyle = 'orange';
			ctx.fillText("Kliknij 4: Normalny - wybrałeś ",220,lk+310);
				if(x==10)
				{
				ctx.fillStyle = 'green';
				ctx.fillText("Kliknij 1: Easy - wybrales ",220,lk+220);
				}
				else if(x==15)
				{
				ctx.fillStyle = 'black';
				ctx.fillText("Kliknij 2: Normal - wybrales ",220,lk+240);
				}
				else if(x==20)
				{
				ctx.fillStyle = 'red';
				ctx.fillText("Kliknij 3: Hard - wybrałeś ",220,lk+260);
				}
			break;	
		case 53:
			tryb_gry=1;
			menu();
			ctx.fillStyle = 'purple';
			ctx.fillText("Kliknij 5: Torus - wybrałeś ",220,lk+330);
			
			if(x==10)
				{
				ctx.fillStyle = 'green';
				ctx.fillText("Kliknij 1: Easy - wybrales ",220,lk+220);
				}
				else if(x==15)
				{
				ctx.fillStyle = 'black';
				ctx.fillText("Kliknij 2: Normal - wybrales ",220,lk+240);
				}
				else if(x==20)
				{
				ctx.fillStyle = 'red';
				ctx.fillText("Kliknij 3: Hard - wybrałeś ",220,lk+260);
				}
			break;		
		}
		
	}
	
