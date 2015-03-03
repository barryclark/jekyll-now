$fn=40; // resolution of the arcs

scale([10,10,10]) { // cm to mm scaling

difference () { // substract tube holders from outer ring

difference () { // substract inner groove

	difference() { // substract cone from main disk

		translate([0,0,-0.4])
		cylinder (h = 4, r=12); // main disk

		translate([0,0,0.9]) // raise cone from bottom
		cylinder (h = 2.8, r1 = 8, r2 = 10.8, center = false); // cone

		translate([0,0,-0.6])
		cylinder (h = 1.6, r=0.635); // axis

		translate([0,0,0.5]) // groove around axis
		cylinder (h = 0.5, r=1);

	}

	// groove under tube holders
	translate([0,0,0.5])
	difference() { // ring
		cylinder (h = 0.5, r = 8);
		cylinder (h = 0.5, r = 7.5);
	}

}

//tube holding cylinders
translate([-11.5,0,-1]) rotate([0,35,0]) cylinder(h=8, r=1.2);
translate([11.5,0,-1]) rotate([0,-35,0]) cylinder(h=8, r=1.2);

translate([0,-11.5,-1]) rotate([0,35,90]) cylinder(h=8, r=1.2);
translate([0,11.5,-1]) rotate([0,-35,90]) cylinder(h=8, r=1.2);

translate([-11.5 * cos(22.5), -11.5 * sin(22.5),-1]) rotate ([0,35,22.5]) cylinder(h=8, r=1.2);
translate([-11.5 * cos(45),-11.5 * sin(45),-1]) rotate ([0,35,45]) cylinder(h=8, r=1.2);
translate([-11.5 * cos(67.5),-11.5 * sin(67.5),-1]) rotate ([0,35,67.5]) cylinder(h=8, r=1.2);

translate([-11.5 * cos(22.5), 11.5 * sin(22.5),-1]) rotate([0,35,-22.5]) cylinder(h=8, r=1.2);
translate([-11.5 * cos(45), 11.5 * sin(45),-1]) rotate([0,35,-45]) cylinder(h=8, r=1.2);
translate([-11.5 * cos(67.5), 11.5 * sin(67.5),-1]) rotate([0,35,-67.5]) cylinder(h=8, r=1.2);

translate([11.5 * cos(22.5), -11.5 * sin(22.5),-1]) rotate([0,-35,-22.5]) cylinder(h=8, r=1.2);
translate([11.5 * cos(45), -11.5 * sin(45),-1]) rotate([0,-35,-45]) cylinder(h=8, r=1.2);
translate([11.5 * cos(67.5), -11.5 * sin(67.5),-1]) rotate([0,-35,-67.5]) cylinder(h=8, r=1.2);

translate([11.5 * cos(22.5), 11.5 * sin(22.5),-1]) rotate([0,-35,22.5]) cylinder(h=8, r=1.2);
translate([11.5 * cos(45), 11.5 * sin(45),-1]) rotate([0,-35,45]) cylinder(h=8, r=1.2);
translate([11.5 * cos(67.5), 11.5 * sin(67.5),-1]) rotate([0,-35,67.5]) cylinder(h=8, r=1.2);
}

}