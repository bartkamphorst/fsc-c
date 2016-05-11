var circlesData = {};

jQuery(function($) {

  //container width defined in css, 300px

  $('.circle-container div[id*=circle-drag]').draggable({
    containment: 'parent',
    axis: 'x',
    stop: function(e, ui) {
      var t = $(this);
      var containerWidth = t.parent().width(),
        leftPos = 0, //left position inside 300px container
        overlapPercentage = 0, // percentage
        width = t.width(); //width/dia of circles

      leftPos = (2 * width + ui.position.left) - containerWidth;
      overlap = leftPos < 0 ? 0 : Math.round((leftPos / width) * 100);

      var area = intersectArea(leftPos, 0, width / 2, width, 0, width / 2);
      // since y coordinates of both circles are fixed, hence taken 0, and x2 coordinate of the othe rcircle is also fixed, so taken 'width', the diameter of the both circles, i.e. same. 

      overlapPercentage = Math.round(100 * area / (Math.PI * width * width / 4));

      var id = t.attr('id');
      circlesData[id + "-distance"] = leftPos;
      circlesData[id + "-overlap"] = overlapPercentage;
      console.log(circlesData);
      console.log(circlesData[id]);
      //uncomment the following 2 lines to display current numbers on screen
      // $('#left').text(leftPos);
      // $('#percent').text(overlapPercentage + '%');
    }
  });
});


function intersectArea(x1, y1, r1, x2, y2, r2) {
  var r1square = r1 * r1;
  var r2square = r2 * r2;
  var d = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  //if circles do not overlap
  if (d > r2 + r1) {
    return 0;
  }
  //if circle 1 is completely inside circle 2
  else if (d <= Math.abs(r1 - r2) && r1 >= r2) {
    // Return area of circle1
    return Math.PI * r2square;
  }
  //if circle 1 is completely inside circle 2
  else if (d <= Math.abs(r1 - r2) && r1 < r2) {
    // Return area of circle 1
    return Math.PI * r1square;
  }
  //if circles partially overlap
  else {
    var phi = (Math.acos((r1square + (d * d) - r2square) / (2 * r1 * d))) * 2;
    var theta = (Math.acos((r2square + (d * d) - r1square) / (2 * r2 * d))) * 2;
    var area1 = 0.5 * theta * r2square - 0.5 * r2square * Math.sin(theta);
    var area2 = 0.5 * phi * r1square - 0.5 * r1square * Math.sin(phi);

    return area1 + area2;
  }
}
