define([], function(){

    var Vector2 = function(_x, _y){
        this.x = _x;
        this.y = _y;
    };

    Vector2.prototype.add = function(v2){
        return new Vector2(this.x + v2.x, this.y + v2.y);
    };

    Vector2.prototype.sub = function(v2){
        return new Vector2(this.x - v2.x, this.y - v2.y);
    };

    Vector2.prototype.mult = function(v2){
        return new Vector2(this.x * v2.x, this.y * v2.y);
    };  

    Vector2.prototype.div = function(v2){
        return new Vector2(this.x / v2.x, this.y / v2.y);
    };

    Vector2.prototype.scale = function(s){
        return new Vector2(this.x * s, this.y * s);
    };

    Vector2.prototype.length = function(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };

    Vector2.prototype.rotate = function(r){
        var cr = Math.cos(r);
        var sr = Math.sin(r);
        var px = this.x * cr - this.y * sr;
        var py = this.x * sr + this.y * cr;

        return new Vector2(px, py);
    };

    // Vector.prototype.project = function(){
        
    // };

    return Vector2;
});