window.$=HTMLElement.prototype.$=function(selector){
	return (window==this?document:this).querySelectorAll(selector);
}
var tetris={
	RN:20,
	CN:10,
	CSIZE:26,
	OFFSET_X:15,
	OFFSET_Y:15,
	pg:null,
	currShape:null,
	nextShape:null,
	interval:500,
	timer:null,
	wall:[],
	state:1,
	STATE_GAMERUNNING:1,
	STATE_GAMEOVER:0,
	STATE_PAUSE:2,
	SCORES:[0,20,50,80,200],
	score:0,
	lines:0,
	IMG_GAMEOVER:"img/game-over.png",
	IMG_PAUSE:"img/pause.png",
	init:function(){
			this.score=0;
			this.lines=0;
			this.state=1;
		this.pg=$('.playground')[0];
		for(var i=0;i<this.RN;i++){

			this.wall[i]=[];
		}

		this.currShape=this.ramdomShape();
		this.nextShape=this.ramdomShape();
		this.paint();

		this.timer=setInterval(function(){
		tetris.drop();
		tetris.paint();

		},this.interval);
		document.onkeydown=function(){
			var e=window.event||arguments[0];
			switch(e.keyCode){
				case 37:tetris.moveL();break;
				case 39:tetris.moveR();break;
				case 40:tetris.drop();break;
				case 38:tetris.rotateR();break;
				case 90:tetris.rotateL();break;
				case 80:tetris.pause();break;
				case 81:tetris.gameover();break;
				case 67:tetris.mycontinue();break;
				case 83:
				if(this.state==this.STATE_GAMEOVER){
					tetris.init()};

				
			}
		}
	},
	pause:function(){
		if(this.state==this.STATE_GAMERUNNING){
			this.state=this.STATE_PAUSE;

		}
	},
	gameover:function(){
		this.state=this.STATE_GAMEOVER;
		clearInterval(this.timer);
		this.timer=null;
		this.paint();
	},
	mycontinue:function(){
		if(this.state==this.STATE_PAUSE){
			this.state=this.STATE_GAMERUNNING;
		}
	},

	paint:function(){
		this.pg.innerHTML=this.pg.innerHTML.replace(/(<img(.*?)>)/g,"");
		this.paintShape();
		this.paintwall();
		this.paintNext();
		this.paintScore();
		this.paintState();
	},
	paintNext:function(){

		var cells=this.nextShape.cells;
		for(var i=0;i<cells.length;i++){
			var r=cells[i].row+1;
			var c=cells[i].col+10;
			var X=c*this.CSIZE+this.OFFSET_X;
			var Y=r*this.CSIZE+this.OFFSET_Y;
			var img=new Image();
			img.src=cells[i].img;
			img.style.left=X+"px";
			img.style.top=Y+"px";
			this.pg.appendChild(img);
		}
	},
	paintState:function(){
		var img=new Image();
		switch(this.state){
			case this.STATE_GAMEOVER:
				img.src=this.IMG_GAMEOVER;
				break;
				case this.STATE_PAUSE:
				img.src=this.IMG_PAUSE
		}
		this.pg.appendChild(img);
	},
	paintScore:function(){
		$("span")[0].innerHTML=this.score;
		$("span")[1].innerHTML=this.lines;
	},
	drop:function(){
		if(this.state==this.STATE_GAMERUNNING){
			if(this.candrop()){
				this.currShape.drop()
			}else{
				this.landIntowall();
				var ln=this.deleteLines();
				this.score+=this.SCORES[ln];
				this.lines+=ln;
				if(!this.isGameOver()){
				this.currShape=this.nextShape;
				this.nextShape=this.ramdomShape();
				}else{
					clearInterval(this.timer);
					timer=null;
					this.state=this.STATE_GAMEOVER;
					this.paint();
				}
			}
		}

	},
	deleteLines:function(){
		var lines=0;
		for(var row=0;row<this.wall.length;row++){
			if(this.isFull(row)){
				this.deleteL(row);
				lines++
			}
		}
		return lines;
	},
	isFull:function(row){
		
		for(var i=0;i<this.CN;i++){
			if(!this.wall[row][i]){
				return false;
			}
		}
		return true;
	},
	deleteL:function(row){
		this.wall.splice(row,1);
		this.wall.unshift([]);
		for(var r=row;r>0;r--){
			for(var c=0;c<this.CN;c++){
				if(this.wall[r][c]){
					this.wall[r][c].row++;
				}
			}
		}
	},
	rotateR:function(){
		if(this.state==this.STATE_GAMERUNNING){
			this.currShape.rotateR();
			if(this.outOfBounds()||this.hit()){
				this.currShape.rotateL()
			}
		}
	},
	rotateL:function(){
		if(this.state==this.STATE_GAMERUNNING){
			this.currShape.rotateL();
			if(this.outOfBounds()||this.hit()){
				this.currShape.rotateR()
			}
		}	
	},
	
	moveR:function(){
		if(this.state==this.STATE_GAMERUNNING){
			this.currShape.moveR();
			if(this.outOfBounds()||this.hit()){
				this.currShape.moveL()
			}
		}
	},
	moveL:function(){
		if(this.state==this.STATE_GAMERUNNING){
			this.currShape.moveL();
			if(this.outOfBounds()||this.hit()){
				this.currShape.moveR();
			}
		}
	},
	outOfBounds:function(){
		var cells=this.currShape.cells;
		for(var i=0;i<cells.length;i++){
			if(cells[i].col<0||cells[i].col>=this.CN){
				return true;
			}
		}
		return false;
	},
	hit:function(){
		var cells=this.currShape.cells;
		for(var i=0;i<cells.length;i++){
			if(this.wall[cells[i].row][cells[i].col]){
				return true;
			}
		}
		return false;
	},
	isGameOver:function(){
		var cells=this.nextShape.cells;
		for(var i=0;i<cells.length;i++){
			var cell=this.wall[cells[i].row][cells[i].col];
			if(cell){
				return true;
			}
		}
		return false;
	},
	paintwall:function(){
		for(var i=0;i<this.RN;i++){
			for(var n=0;n<this.CN;n++){
				if(this.wall[i][n]){
				var X=this.wall[i][n].col*this.CSIZE+this.OFFSET_X;
				var Y=this.wall[i][n].row*this.CSIZE+this.OFFSET_Y;
				var img=new Image();
				img.src=this.wall[i][n].img;
				img.style.left=X+"px";
				img.style.top=Y+"px";
				this.pg.appendChild(img);
				}
			}
		}
	},
	landIntowall:function(){
		var cells=this.currShape.cells;
		for(var i=0;i<cells.length;i++){
		this.wall[cells[i].row][cells[i].col]=cells[i];
		}
	},
	candrop:function(){
		var cells=this.currShape.cells;
		for(var i=0;i<cells.length;i++){
			if(cells[i].row==this.RN-1){
				return false;
			}
			if(this.wall[cells[i].row+1][cells[i].col]){
				return false;
			}
		}
			return true;

	},
	ramdomShape:function(){
		switch(parseInt(Math.random()*7)){
			case 0: return new O();
			case 1: return new I();
			case 2: return new S();
			case 3: return new T();
			case 4: return new L();
			case 5: return new J();
			case 6: return new Z();
		}
	},
	paintShape:function(){
		var cells=this.currShape.cells;
		for(var i=0;i<cells.length;i++){
			var X=cells[i].col*this.CSIZE+this.OFFSET_X;
			var Y=cells[i].row*this.CSIZE+this.OFFSET_Y;
			var img=new Image();
			img.src=cells[i].img;
			img.style.left=X+"px";
			img.style.top=Y+"px";
			this.pg.appendChild(img);
		}
		
		
	}
}
window.onload=function(){
	tetris.init();

}