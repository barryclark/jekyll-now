include <threads.scad>;

union() {

difference() {

union() {

difference() {
	difference() {
		difference () {
			union () {
				cylinder(h=25, d=51); //main cilinder
				cylinder(h=6, d=54); //brim
			}

			cylinder(h=23, r1=20.5, r2=20.2); // conish inside
		}

		translate([0,0,-1]) {
			// thread
			metric_thread(diameter = 46.6, pitch = 4, length = 21, internal = true);
		}
	}

	translate([0,0,-1]) {
		cylinder(h=4,d=46.6); // inside brim
	}
} 


// diameter inside cone rim 
/* translate([0,0,17]) {
	difference() {
		cylinder(h = 6, r1 = 14, r2 = 17);
		translate([0,0,-0.5]) {
			cylinder(h = 5, d = 28);
		}
	}
}

} // union */

// tube connector

	translate([7,0,0]) {
		union () {
			translate ([0,0,0]) {
				//cylinder(h=25, d=12);
				cylinder(h=25, r1 = 4, r2 = 7);
				//cylinder(h=5, r1 = 2.5, r2 = 4);
			}
			translate ([0,0,6]) {
				//cylinder(h=7, r1 = 2.5, r2 = 6);
			}
			translate([0,0,20]) {
				cylinder(h=20, r1 = 7, r2 = 2.5);
			}
			translate([0,0,34]) {
				cylinder(h=7, r1=4.5, r2=2.5);
			}
		}
	}

	translate([-4,-6,0]) {
		union () {
			translate ([0,0,0]) {
				//cylinder(h=25, d=12);
				cylinder(h=25, r1 = 4, r2 = 7);
				//cylinder(h=5, r1 = 2.5, r2 = 4);
			}
			translate ([0,0,6]) {
				//cylinder(h=7, r1 = 2.5, r2 = 6);
			}
			translate([0,0,20]) {
				cylinder(h=20, r1 = 7, r2 = 2.5);
			}
			translate([0,0,34]) {
				cylinder(h=7, r1=4.5, r2=2.5);
			}
		}
	}

	translate([-4,6,0]) {
			translate ([0,0,0]) {
				//cylinder(h=25, d=12);
				cylinder(h=25, r1 = 4, r2 = 7);
				//cylinder(h=5, r1 = 2.5, r2 = 4);
			}
			translate ([0,0,6]) {
				//cylinder(h=7, r1 = 2.5, r2 = 6);
			}
			translate([0,0,20]) {
				cylinder(h=20, r1 = 7, r2 = 2.5);
			}
			translate([0,0,34]) {
				cylinder(h=7, r1=4.5, r2=2.5);
			}
	}

} // union

	translate([7,0,-1]) {
		cylinder(h=50, d = 4);
	}
	translate([-4,-6,-1]) {
		cylinder(h=50, d = 4);
	}
	translate([-4,6,-1]) {
		cylinder(h=50, d = 4);
	}

} // difference

} // union



