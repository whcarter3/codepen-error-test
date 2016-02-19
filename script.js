// Div's for logging
var logDiv = document.getElementById("log");  
var logDetailsDiv = document.getElementById("logDetails"); 

// Div containing our image
var divPloatje = document.getElementById('ploatje');

// Initial Mouse coords
var mouse = {x: -100, y: -100};

// Fire of the Mask function so the mask is automagically following whatever is in the mouse var.
fixMask();


if('ontouchstart' in   document.documentElement){
  // Touch events available, wire to touchStart and touchMove
    divPloatje.addEventListener('touchmove',touchMove,false);
    divPloatje.addEventListener('touchstart',touchStart,false);
  divPloatje.addEventListener('touchend',touchEnd,false);
}else{
  // Touch events not available, wire to touchMove only
    divPloatje.addEventListener('mousemove',touchMove,false);
}

  
function touchStart( e ) { 
  console.debug( "Touch Start! " + e.type + " event=" + inspect( e ) );  
  //logDetails( inspect( e.touches.item(0) ) );  
  e.preventDefault();  // PreventDefault prevents native scrolling on device
  return false;  
}  
  
function touchMove( e ) { 
  
  if(e.touches == null){
    // No touch available fallback to mouse
    mouse = getMouse(e, divPloatje);
    console.debug("Mouse Move");  
  }else{
    //Touch available
    var targetEvent =  e.touches.item(0);  
    //log("[x,y] from target=" + targetEvent.clientX + "," + targetEvent.clientY );  
    // Assign clientX and ClientY values to mouse.x,y 
    mouse.x = targetEvent.clientX; 
    mouse.y = targetEvent.clientY;
   // console.debug("Touch Move");  
  }
  
  //log("[x,y] in mouse=" + mouse.x + "," + mouse.y );  
  

  //logDetails( inspect( e ) );  
  e.preventDefault();  // Kill native scroll again, might be double measure, not shure... ;-)
  return false;  
}  

function touchEnd(e){
console.debug("touchEnd (!)");
//  var strImage = '-webkit-radial-gradient('+ mouse.x+'px '+mouse.y+'px,10px 10px, rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 1) 30%, rgba(255, 255, 255, 0.1) 80%, rgba(255, 255, 255, 0.1) 100%)';
  //divPloatje.style.WebkitMaskImage = strImage;
}


// This function is scheduled by using RequestAnimationFrame
// Should provide smoother animation but I'm on the fence here.
// My S3 is loving it, my Tegra tablet seems slower...
function fixMask(){
 webkitRequestAnimationFrame(fixMask);
    // Create string for -webkit-mask-image CSS attribute
  var strImage = '-webkit-radial-gradient('+ mouse.x+'px '+mouse.y+'px,100px 100px, rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 1) 70%, rgba(255, 255, 255, 0.1) 80%, rgba(255, 255, 255, 0.1) 100%)';
  divPloatje.style.WebkitMaskImage = strImage;
 
  
  //log("WebKitMaskImage:" + strImage);
}

// Util Functions
function getMouse(e, canvas) {
    var element = canvas,
        offsetX = 0,
        offsetY = 0,
        mx, my;

    // Compute the total offset. It's possible to cache this if you want
    if (element.offsetParent !== undefined) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
    }

    mx = e.pageX - offsetX;
    my = e.pageY - offsetY;

    // We return a simple javascript object with x and y defined
    return {
        x: mx,
        y: my
    };
}

function log( text ) {  
    logDiv.innerHTML = text;  
}  
  
function inspect( obj ) {  
  if (typeof obj === "undefined") {  
      return "undefined";  
  }  
  var _props = [];  
  
    for ( var i in obj ) {  
        _props.push( i + " : " + obj[i] );   
    }  
    return " {" + _props.join( ",<br>" ) + "} ";  
}  
