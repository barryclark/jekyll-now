$fn=40; // resolution of the arcs

axis_radius = 0.225; // radius of the motor shaft

tube_radius = 0.55; // inner radius of the tube holders
tube_angle = 45; // angle in the rotor
tube_pos = 4.75; // position of tube holders

scale([10,10,10]) { // cm to mm scaling

difference () { // substract tube holders from outer ring

	difference () { // substract inner groove

		difference() { // substract cone from main disk

			union() {
				cylinder (h = 1.25, r=3.75); // main disk part 1
				cylinder (h = 1.9, r=3.25); // main disk part 2
				
				// smoothen edge torus
				translate([0,0,1.25])
				rotate_extrude(convexity = 10)
				translate([3, 0, 0])
				circle(r = 0.75);
			}

			translate([0,0,1]) // raise cone from bottom
			cylinder (h = 1.1, r1 = 1.65, r2 = 3, center = false); // cone

			translate([0,0,-0.1])
			cylinder (h = 1.2, r=axis_radius); // axis

		}

		// groove under tube holders
		translate([0,0,0.8])
		difference() { // ring
			cylinder (h = 0.25, r = 1.65); // outside ring
			translate([0,0,-0.5]) {
				cylinder (h = 1.3, r = 1.3); // inside ring
			}
		}
	}

	//tube holding cylinders on 12, 3, 6 and 9 o'clock
	translate([-1 * tube_pos,0,-1]) rotate([0,tube_angle,0]) cylinder(h=8, r=tube_radius);
	translate([tube_pos,0,-1]) rotate([0,-1*tube_angle,0]) cylinder(h=8, r=tube_radius);
	translate([0,-1 * tube_pos,-1]) rotate([0,tube_angle,90]) cylinder(h=8, r=tube_radius);
	translate([0,tube_pos,-1]) rotate([0,-1*tube_angle,90]) cylinder(h=8, r=tube_radius);

	//tube holding cylinders in between the previous tubes
	translate([-1 * tube_pos * cos(45), -1 * tube_pos * sin(45),-1]) rotate ([0,tube_angle,45]) cylinder(h=8, r=tube_radius);
	translate([-1 * tube_pos * cos(45), tube_pos * sin(45),-1]) rotate([0,tube_angle,-45]) cylinder(h=8, r=tube_radius);
	translate([tube_pos * cos(45), -1 * tube_pos * sin(45),-1]) rotate([0,-1*tube_angle,-45]) cylinder(h=8, r=tube_radius);
	translate([tube_pos * cos(45), tube_pos * sin(45),-1]) rotate([0,-1*tube_angle,45]) cylinder(h=8, r=tube_radius);

}

}