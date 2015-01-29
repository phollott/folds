var s = Snap("#svg");
var block = s.rect(100, 100, 100, 100, 20, 20);
block.attr({
fill: "rgb(236, 240, 241)",
stroke: "#1f2c39",
strokeWidth: 3
});
block.drag();
