$fn=40; // resolution of the arcs

scale([10,10,10]) { // cm to mm scaling

	difference() {
		cylinder(h = 2, r=0.5);
		translate([0,0,0.1])
		cylinder(h = 2.2, r=0.175);
	}

}