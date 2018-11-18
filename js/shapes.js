function cell(row,col,img){ 
	this.row=row;
	this.col=col;
	this.img=img;
	if(!cell.prototype.drop){
		cell.prototype.drop=function(){
			this.row++;
		}
	}
	if(!cell.prototype.moveR){
		cell.prototype.moveR=function(){
			this.col++;
		}
	}
		if(!cell.prototype.moveL){
		cell.prototype.moveL=function(){
			this.col--;
		}
	}

}
function shape(img,orgi){
	this.img=img;
	this.orgi=orgi;
	this.states=[];
	this.statei=0;
	if(!shape.prototype.drop){
		shape.prototype.drop=function(){
			for(var n=0;n<this.cells.length;n++){
				this.cells[n].drop();
			}
		}
	}
	if(!shape.prototype.moveR){
		shape.prototype.moveR=function(){
			for(var n=0;n<this.cells.length;n++){
				this.cells[n].moveR();
			}
		}
	}
	if(!shape.prototype.moveL){
		shape.prototype.moveL=function(){
			for(var n=0;n<this.cells.length;n++){
				this.cells[n].moveL();
			}
		}
	}
	if(!shape.prototype.rotateR){
		shape.prototype.rotateR=function(){
			if(this.constructor!=O){
				this.statei++;
				this.statei>=this.states.length&&(this.statei=0);
				var state=this.states[this.statei];
				var orgr=this.cells[this.orgi].row;
				var orgc=this.cells[this.orgi].col;
				for(var i=0;i<this.cells.length;i++){
					this.cells[i].row=orgr+state["r"+i];
					this.cells[i].col=orgc+state["c"+i];
				}

			}
		}
	}
	if(!shape.prototype.rotateL){
		shape.prototype.rotateL=function(){
			if(this.constructor!=O){
				this.statei--;
				this.statei<0&&(this.statei=this.states.length-1);
				var state=this.states[this.statei];
				var orgr=this.cells[this.orgi].row;
				var orgc=this.cells[this.orgi].col;
				for(var i=0;i<this.cells.length;i++){
					this.cells[i].row=orgr+state["r"+i];
					this.cells[i].col=orgc+state["c"+i];
				}

			}
		}
	}
}
function State(r0,c0,r1,c1,r2,c2,r3,c3){
	this.r0=r0;
	this.c0=c0;
	this.r1=r1;
	this.c1=c1;
	this.r2=r2;
	this.c2=c2;
	this.r3=r3;
	this.c3=c3;
}
function O(){
	shape.call(this,"img/O.png");
	if(!shape.prototype.isPrototypeOf(O.prototype)){
		Object.setPrototypeOf(O.prototype,shape.prototype)
	}
	this.cells=[new cell(0,4,this.img),new cell(0,5,this.img),
				new cell(1,4,this.img),new cell(1,5,this.img)]
}
function T(){
	shape.call(this,"img/T.png",1);
	if(!shape.prototype.isPrototypeOf(T.prototype)){
		Object.setPrototypeOf(T.prototype,shape.prototype)
	}
	this.cells=[new cell(0,3,this.img),new cell(0,4,this.img),
				new cell(0,5,this.img),new cell(1,4,this.img)];
	this.states[0]=new State(0,-1, 0,0, 0,1, 1,0);
	this.states[1]=new State(-1,0, 0,0, 1,0, 0,-1);
	this.states[2]=new State(0,1, 0,0, 0,-1, -1,0);
	this.states[3]=new State(1,0, 0,0, -1,0, 0,1);
				
}
function I(){
	shape.call(this,"img/I.png",1);
	if(!shape.prototype.isPrototypeOf(I.prototype)){
		Object.setPrototypeOf(I.prototype,shape.prototype)
	}
	this.cells=[new cell(0,3,this.img),new cell(0,4,this.img),
				new cell(0,5,this.img),new cell(0,6,this.img)];
	this.states[0]=new State(0,-1, 0,0, 0,1, 0,2);
	this.states[1]=new State(-1,0, 0,0, 1,0, 2,0);
}
function S(){
	shape.call(this,"img/S.png",3);
	if(!shape.prototype.isPrototypeOf(S.prototype)){
		Object.setPrototypeOf(S.prototype,shape.prototype)
	}
	this.cells=[new cell(0,4,this.img),new cell(0,5,this.img),
				new cell(1,3,this.img),new cell(1,4,this.img)];
	this.states[0]=new State(-1,0, -1,1, 0,-1, 0,0);
	this.states[1]=new State(0,-1, -1,-1, 1,0, 0,0);
}
function Z(){
	shape.call(this,"img/Z.png",2);
	if(!shape.prototype.isPrototypeOf(Z.prototype)){
		Object.setPrototypeOf(Z.prototype,shape.prototype)
	}
	this.cells=[new cell(0,3,this.img),new cell(0,4,this.img),
				new cell(1,4,this.img),new cell(1,5,this.img)];
	this.states[0]=new State(-1,-1, -1,0, 0,0, 0,1);
	this.states[1]=new State(-1,1, 0,1, 0,0, 1,0);
}
function L(){
	shape.call(this,"img/L.png",0);
	if(!shape.prototype.isPrototypeOf(L.prototype)){
		Object.setPrototypeOf(L.prototype,shape.prototype)
	}
	this.cells=[new cell(0,3,this.img),new cell(0,4,this.img),
				new cell(0,5,this.img),new cell(1,3,this.img)];
	this.states[0]=new State(0,0, 0,1, 0,2, 1,0);
	this.states[1]=new State(0,0, 1,0, 2,0, 0,-1);
	this.states[2]=new State(0,0, 0,-1, 0,-2, -1,0);
	this.states[3]=new State(0,0, -1,0, -2,0, 0,1);
}
function J(){
	shape.call(this,"img/J.png",2);
	if(!shape.prototype.isPrototypeOf(J.prototype)){
		Object.setPrototypeOf(J.prototype,shape.prototype)
	}
	this.cells=[new cell(0,3,this.img),new cell(0,4,this.img),
				new cell(0,5,this.img),new cell(1,5,this.img)];
	this.states[0]=new State(0,-2, 0,-1, 0,0, 1,0);
	this.states[1]=new State(-2,0, -1,0, 0,0, 0,-1);
	this.states[2]=new State(0,2, 0,1, 0,0, -1,0);
	this.states[3]=new State(2,0, 1,0, 0,0, 0,1);
}
				
