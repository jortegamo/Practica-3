/*

  Requisitos: 

  La nave del usuario disparar� 2 misiles si est� pulsada la tecla de
  espacio y ha pasado el tiempo de recarga del arma.

  El arma tendr� un tiempo de recarga de 0,25s, no pudi�ndose enviar
  dos nuevos misiles antes de que pasen 0,25s desde que se enviaron
  los anteriores



  Especificaci�n:

  - Hay que a�adir a la variable sprites la especificaci�n del sprite
    missile

  - Cada vez que el usuario presione la tecla de espacio se a�adir�n
    misiles al tablero de juego en la posici�n en la que est� la nave
    del usuario. En el c�digo de la clase PlayerSip es donde tienen
    que a�adirse los misiles

  - La clase PlayerMissile es la que implementa los misiles. Es
    importante que la creaci�n de los misiles sea poco costosa pues va
    a haber muchos disparos, para lo cual se declarar�n los m�todos de
    la clase en el prototipo

*/

describe ("Clase PlayerMissile",function(){

	beforeEach (function(){
		loadFixtures('index.html');
		oldSpriteSheet = SpriteSheet;
		oldGame = Game;
	});
	
	afterEach (function(){
		Game = oldGame;
		SpriteSheet = oldSpriteSheet;
	});
	
	it("Definida la clase",function(){
		expect(PlayerMissile).toBeDefined();
	});
	
	it("Creando un misil",function(){
		Game = {width: 320, height: 480};
		var missile = new PlayerMissile(Game.width/2,Game.height);
		expect(missile.x).toBe(159);
		expect(missile.y).toBe(470);
		expect(missile.w).toBe(2);
		expect(missile.h).toBe(10);
		expect(missile.vy).toBe(-700);
	});
	
	it("step",function(){
		//creamos el board al que se van a a�adir los misiles.
		var board = new GameBoard();
		Game = {width: 320, height: 480};
		var missile1 = new PlayerMissile(Game.width/2, Game.height); //estara en la pos (159,470);
		board.add(missile1);
		spyOn(missile1,"step");
		spyOn(board,"remove");
		spyOn(board,"finalizeRemoved");
		board.step(1);
		expect(missile1.step).toHaveBeenCalledWith(1);
		//expect(board.remove).toHaveBeenCalled();
		//expect(board.filanizeRemoved).toHaveBeenCalled();
	});
	
	it("draw",function(){
		/*SpriteSheet = {
			map: {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 }},
			draw: function(){};
		};*/
		var board = new GameBoard();
		Game = {width: 320, height: 480};
		var missile = new PlayerMissile(Game.width/2, Game.height);
		spyOn(missile, "draw");
		spyOn(SpriteSheet, "draw");
		board.add(missile);
		board.draw();
		expect(missile.draw).toHaveBeenCalled();
	});
	
});