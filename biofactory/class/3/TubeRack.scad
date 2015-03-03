$fn=40; // resolution of the arcs

// left side
difference() {
	cube([50,3,80]);

	translate([23.5,3.1,11.5]){
		rotate([90,0,0]){
			cylinder(h=3.2, d=3);
		}
	}
}

//bottom plate
translate([0,3,10]) {

	difference() {

		difference() {
			cube([50,194,3]);
			for ( i = [1 : 6] ) {
				translate([25,i * 28,-0.1]) {
					cylinder(h=3.2,d=20);
				}
			}
		}

		translate([20.7,0,-0.1]) {
			translate([1.3,-0.1,0]) {
				cube([3,7.2,3.2]);
			}
			translate([0,2,0]) {
				cube([5.6,2.2,3.2]);
			}
		}

	}

}

//top plate
translate([0,0,70]) {
	difference() {
		cube([50,200,3]);
		for ( i = [1 : 6] ) {
			translate([25,i * 28,-0.1]) {
				cylinder(h=3.2,d=20);
			}
		}
	}
}

//right plate
translate([0,197,0]) {
	cube([50,3,80]);
}
