#include <iostream>
#include <cmath>

double funcion(double x){
    return cos(x);
}

double derivativeProg(double (*inFunc)(double), double x, double h);
double derivativeReg(double (*inFunc)(double), double x, double h);
double derivativeCent(double (*inFunc)(double), double x, double h);
double r_derivativeNProg(double (*inFunc)(double), double x, double h, int n);
double r_derivativeNReg(double (*inFunc)(double), double x, double h, int n);
double r_derivativeNCent(double (*inFunc)(double), double x, double h, int n);

double taylorProg(double (*inFunc)(double), double x, double a, double h, int n);
double taylorReg(double (*inFunc)(double), double x, double a, double h, int n);
double taylorCent(double (*inFunc)(double), double x, double a, double h, int n);

int main(int argc, char* argv[]){

    std::cout << "Taylor diferencia progresiva: " << taylorProg(&funcion, M_PI/4, 0, 0.01, 3) << std::endl;
    std::cout << "Taylor diferencia regresiva: " << taylorReg(&funcion, M_PI/4, 0, 0.01, 3) << std::endl;
    std::cout << "Taylor diferencia central: " << taylorCent(&funcion, M_PI/4, 0, 0.01, 3) << std::endl;
    return 0;
}

double derivativeProg(double (*inFunc)(double), double x, double h){

    return (inFunc(x + h)-inFunc(x))/(h);
}
double derivativeReg(double (*inFunc)(double), double x, double h){

    return (inFunc(x)-inFunc(x - h))/(h);
}
double derivativeCent(double (*inFunc)(double), double x, double h){

    return (inFunc(x + h)-inFunc(x - h))/(2*h);
}

double r_derivativeNProg(double (*inFunc)(double), double x, double h, int n){
    if(n < 1){
	std::cout << "ERROR:Derivada 0" << std::endl;
	exit(-1);
    }
    if(n == 1){
	return derivativeProg(inFunc, x, h);
    }
    else{
	return (r_derivativeNProg(inFunc, x + h, h, n-1) - r_derivativeNProg(inFunc, x, h, n-1))/(h);
    }
}

double r_derivativeNReg(double (*inFunc)(double), double x, double h, int n){
    if(n < 1){
	std::cout << "ERROR:Derivada 0" << std::endl;
	exit(-1);
    }
    if(n == 1){
	return derivativeReg(inFunc, x, h);
    }
    else{
	return (r_derivativeNReg(inFunc, x, h, n-1) - r_derivativeNReg(inFunc, x - h, h, n-1))/(h);
    }
}

double r_derivativeNCent(double (*inFunc)(double), double x, double h, int n){
    if(n < 1){
	std::cout << "ERROR:Derivada 0" << std::endl;
	exit(-1);
    }
    if(n == 1){
	return derivativeCent(inFunc, x, h);
    }
    else{
	return (r_derivativeNCent(inFunc, x + h, h, n-1) - r_derivativeNCent(inFunc, x - h, h, n-1))/(2*h);
    }
}

double taylorProg(double (*inFunc)(double), double x, double a, double h, int n){
    if(n < 0){
        std::cout << "ERROR:Taylor n < 0" << std::endl;
        exit(-1);
    }
    double res = inFunc(a);
    for(int i=1; i < n; i++){
        res += r_derivativeNProg(inFunc, a, h, n)*(pow(x-a, n))/(tgamma(n+1));
    }
    return res;
}
double taylorReg(double (*inFunc)(double), double x, double a, double h, int n){
    if(n < 0){
        std::cout << "ERROR:Taylor n < 0" << std::endl;
        exit(-1);
    }
    double res = inFunc(a);
    for(int i=1; i < n; i++){
        res += r_derivativeNReg(inFunc, a, h, n)*(pow(x-a, n))/(tgamma(n+1));
    }
    return res;
}
double taylorCent(double (*inFunc)(double), double x, double a, double h, int n){
    if(n < 0){
        std::cout << "ERROR:Taylor n < 0" << std::endl;
        exit(-1);
    }
    double res = inFunc(a);
    for(int i=1; i < n; i++){
        res += r_derivativeNCent(inFunc, a, h, n)*(pow(x-a, n))/(tgamma(n+1));
    }
    return res;
}
