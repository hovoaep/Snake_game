function longShadow (elm){
    var draw, getAlpha, getColor, inShade, matchColor, setColor, shade, text;
  
    text = elm;
  
    getColor = function(imgData, x, y) {
      var a, b, data, g, index, r;
      index = (y * imgData.width + x) * 4;
      data = imgData.data;
      r = data[index];
      g = data[index + 1];
      b = data[index + 2];
      a = data[index + 3];
      return [r, g, b, a];
    };
  
    setColor = function(imgData, x, y, color) {
      var data, index;
      index = (y * imgData.width + x) * 4;
      data = imgData.data;
      data[index] = color[0];
      data[index + 1] = color[1];
      data[index + 2] = color[2];
      return data[index + 3] = color[3];
    };
  
    matchColor = function(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
    };
  
    getAlpha = function(imgData, x, y) {
      var data, index;
      data = imgData.data;
      index = (y * imgData.width + x) * 4 + 3;
      return data[index];
    };
  
    inShade = function(imgData, x, y) {
      var data;
      data = imgData.data;
      while (true) {if (window.CP.shouldStopExecution(1)){break;}
        x -= 1;
        y -= 1;
        if (x < 0 || y < 0) {
          // stop when we reach the edge
          return false;
        }
        if (getAlpha(imgData, x, y)) {
          // if it has any alpha value it casts shade
          return true;
        }
      }
  window.CP.exitedLoop(1);
  
    };
  
    shade = function(imgData, x, y) {
      var color;
      // transparent black 
      color = [0, 0, 0, 32];
      return setColor(imgData, x, y, color);
    };
  
    draw = function() {
      var $canvas, canvas, color, ctx, data, i, imgData, j, mx, my, ref, ref1, textColor, x, y;
      $canvas = $('canvas');
      canvas = $canvas.get(0);
      ctx = canvas.getContext('2d');
      ctx.font = 'bold 64px/64px arial black';
      ctx.fillStyle = 'white'; // remember to change textColor below
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      mx = canvas.width / 2;
      my = canvas.height / 2;
      ctx.fillText(text, mx, my);
      imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      data = imgData.data;
      // remember to change fillStyle above
      textColor = [255, 255, 255, 255];
      for (y = i = 0, ref = imgData.height - 1; 0 <= ref ? i <= ref : i >= ref; y = 0 <= ref ? ++i : --i) {if (window.CP.shouldStopExecution(3)){break;}
        for (x = j = 0, ref1 = imgData.width - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; x = 0 <= ref1 ? ++j : --j) {if (window.CP.shouldStopExecution(2)){break;}
          // skip colored in ones
          color = getColor(imgData, x, y);
          if (matchColor(color, textColor)) {
            continue;
          }
          if (inShade(imgData, x, y)) {
            
            // change the ones that are in the shade
            shade(imgData, x, y);
          }
        }
  window.CP.exitedLoop(2);
  
      }
  window.CP.exitedLoop(3);
  
      ctx.putImageData(imgData, 0, 0);
      return ctx.fillText(text, mx, my);
    };
  
    $(function() {
      return draw();
    });
  
  }
  
  