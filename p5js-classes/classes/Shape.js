class Shape {
    // class properties
    x;
    y; 
    vx;
    vy;
    size;
    fillColour;
    lifetime;
    birthtime;
    timeAlive;
    dead = false;
    originalStates;
    constructor(x,y,size,fillColour,lifetime,vx,vy){
        this.x = x;
        this.y = y;
        this.size = size;
        this.fillColour = fillColour;
        this.lifetime = lifetime;
        this.birthtime = millis();
        this.vx = vx;
        this.vy = vy;
        this.originalStates = {size:this.size}
    }
    update(){
        //calculate how long the shape has been alive
        this.timeAlive = millis() - this.birthtime;
        //ratio of 0 to 1 from birth to death
        let ratio = this.timeAlive/this.lifetime;
        // test for death
        if (ratio>1){
            this.dead = true;
        }
        // process size based on ratio
        this.size = this.originalStates.size*(1-ratio); // remap ratio to 0
        // process movement
        this.x += this.vx;
        this.y += this.vy;
        // test for boundries collision
        if(this.x<0+this.size/2||this.x>width-this.size/2){
            this.vx*=-1;
        }
        if(this.y<0+this.size/2||this.y>height-this.size/2){
            this.vy*=-1;
        }
        // updates colour based on time alive
        let r=red(this.fillColour)
        let g=green(this.fillColour)
        let b=blue(this.fillColour)
        this.fillColour=color(r,g,b,255*(1-ratio));
    }
}