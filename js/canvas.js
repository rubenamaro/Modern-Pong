

	function onKeyDown(evt) {
		if (evt.keyCode == 38) 
		{
			evt.preventDefault();
			upKey = true;
		}
		else if (evt.keyCode == 40)
		{
			evt.preventDefault();
			downKey = true;
		}
	}
	function onKeyUp(evt) {
	  if (evt.keyCode == 38) upKey = false;
	  else if (evt.keyCode == 40) downKey = false;
	}
	// Variables per a definir el Canvas.
	var canvas;  
	var ctx;

	// Posicio de la pilota
	var x = 400;
	var y = 300;

	// Velicitat de deslaçament de la pilota
	var dx = 2;
	var dy = 4;

	// Tamany del canvas
	var WIDTH = 400;
	var HEIGHT = 300; 
	
	var paddleX = 10;
	var paddleY = 20;
	var paddleWidth = 20;
	var paddleHeight = 40;


	var continua = false;
	var data_inicial;
	
	
	//moviment cap amunt o cap abaix
	var upKey = false;
	var downKey = false;	

	var soundEfx = document.getElementById("soundEfx");
	var gameOver = document.getElementById("gameOver");
	var counter = 0;
	var llistat;
	
	function update_counter(){
		//global data_inicial; 
		var stop_data = (new Date).getTime();
		//alert ( ( stop_data - data_inicial ) / 1000 );
		//$("#counter").value( ( stop_data - data_inicial ) / 1000  );	
		if(continua)
		{	
			counter =  ( stop_data - data_inicial ) / 1000 ;
		}
	}

	// Dibuixem el cercle
	function circle(x,y,r) {
		ctx.beginPath();
		ctx.arc(x, y, r, 0, Math.PI*2, true);
		ctx.fill();
	}


	function paddle( x, y, w, h ){
	
		ctx.beginPath();
		ctx.rect(x, y, w, h);
		
		ctx.closePath();
		ctx.fill();
	}

	
	function labelPoints(x,y,w,h)
	{
		// Main text
		ctx.fillStyle = '#000000'
		ctx.font = '12px "Rock Salt"';
		ctx.fillText('Punts: ', x-10, y);
	}
	function points( x, y, w, h ){
	
		ctx.fillStyle = '#0000ff'
		ctx.font = '12px "Rock Salt"';
		ctx.fillText(counter, x+50, y);
	}

	// Dibuixem el contenidor del Joc.
	function rect(x,y,w,h) {
		ctx.beginPath();
		ctx.rect(x,y,w,h);
		ctx.closePath();
		ctx.fill();
	}



	//I clear the canvas before to draw it again.
	function clear() {
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
	}

	function init() {
		canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");
		return setInterval(draw, 10);
	}
	
	function pantallaInicial()
	{
			canvas = document.getElementById("canvas");
			ctx = canvas.getContext("2d");
            
			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.href = 'http://fonts.googleapis.com/css?family=Rock+Salt';
			document.getElementsByTagName('head')[0].appendChild(link);
			
			ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, WIDTH, HEIGHT);
			

            // Main text
            ctx.fillStyle = '#a1cb2f'
            ctx.textAlign = 'center';
            ctx.font = '30px "Rock Salt"';
            ctx.fillText('MODERN PONG', WIDTH / 2, HEIGHT / 2 - 50);

            // Sub text
            ctx.fillStyle = '#ffffff';
            ctx.font = '10px "Rock Salt"';
            ctx.fillText('Clica per començar', WIDTH / 2, HEIGHT/ 2);			
					
			canvas.setAttribute('onclick','comencaPartida()');
	}

	function pantallaFinal()
	{
			canvas = document.getElementById("canvas");
			ctx = canvas.getContext("2d");
            
			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.href = 'http://fonts.googleapis.com/css?family=Rock+Salt';
			document.getElementsByTagName('head')[0].appendChild(link);
			
			ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, WIDTH, HEIGHT);
			

            // Main text
            ctx.fillStyle = '#ff0000'
            ctx.textAlign = 'center';
            ctx.font = '30px "Rock Salt"';
            ctx.fillText('GAME OVER', WIDTH / 2, HEIGHT / 4);

            // Sub text
			ctx.fillStyle = '#a1cb2f';
            ctx.font = '20px "Rock Salt"';
            ctx.fillText(counter + " punts!!!", WIDTH / 2, HEIGHT/3+50);	

		
			// Sub text
			ctx.fillStyle = '#a1cb2f';
            ctx.font = '15px "Rock Salt"';
            ctx.fillText(calculaPosicio(counter*1000)+' Posició', WIDTH / 2, HEIGHT/2+50);	
			canvas.setAttribute('onclick','pantallaInicial()');
			
            // Sub text
            ctx.fillStyle = '#ffffff';
            ctx.font = '10px "Rock Salt"';
            ctx.fillText('Clica per tornar a jugar', WIDTH / 2, HEIGHT-50);
			
			
	}
	function comencaPartida()
	{
			// Posicio de la pilota
			x = 400;
			y = 300;
			
			paddleX = 10;
			paddleY = 20;
			paddleWidth = 20;
			paddleHeight = 40;
			continua = true;
			counter = 0;
			
			$(canvas).removeAttr('onclick');
			$('#stop').show();
			data_inicial = (new Date).getTime();
	}
	function finalitzaPartida()
	{

		continua = false;
		pantallaFinal();
		gameOver.play();
		counter = 0;
		$('#stop').hide();
	}
	function draw() {
		if ( continua == true ){
			clear();

			update_counter();
			ctx.fillStyle = "#FAF7F8";
			rect(0,0,WIDTH,HEIGHT);

			ctx.fillStyle = "#444444";
			circle(x, y, 10);
			ctx.fillStyle = "#0000ff";
			
			if (upKey)
			{
				
				if (paddleY <= 0)
				{
					paddleY = 0;
				}
				else
				{
					paddleY-= 5;
				}
			}
			else if (downKey)
			{
				if ((paddleY + paddleHeight) >= HEIGHT)
				{
					paddleY = HEIGHT-paddleHeight;
				}
				else{
					paddleY += 5;
				}
				
			}
			paddle(paddleX, paddleY, paddleWidth, paddleHeight);
			
			labelPoints(WIDTH-80,HEIGHT-10,40,20);
			points(WIDTH-80,HEIGHT-10,40,20);

			if (x + dx > WIDTH || x + dx < 0){
				dx = -dx;
			}
			if (y + dy > HEIGHT || y + dy < 0){
				dy = -dy;
			}

			x += dx;
			y += dy;
			

			if( x== (paddleX + paddleWidth) && y < (paddleHeight + paddleY+20) && y > paddleY-20)
			{
				dx = -dx;
				soundEfx.play();
			}
			if(x==0) finalitzaPartida();		
		}
	}
	
	function calculaPosicio(punts)
	{
		var posicio;
		var i = 0;
		var trobat = false;
		while(i<10 && !trobat)
		{
			trobat = llistat[i].points <= punts;
			if(!trobat) i++;
		}
		posicio = i+1;
		return posicio;
	}
	$( document ).ready(function() {
		data_inicial = (new Date).getTime();
		$.getJSON('src/user_info.php', function(data){
			data = data.sort(predicatBy("points"));
			llistat = data;
		});
	});

	function predicatBy(prop){
	   return function(a,b){
		  if( a[prop] > b[prop]){
			  return -1;
		  }else if( a[prop] < b[prop] ){
			  return 1;
		  }
		  return 0;
	   }
	}
	
	$(document).keydown(onKeyDown);
	$(document).keyup(onKeyUp);
	pantallaInicial();
	init();