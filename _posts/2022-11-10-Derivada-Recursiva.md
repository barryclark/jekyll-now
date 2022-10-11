---
layout: post
title: Derivada Recursiva
---

Ejemplo de post con codigo

```c++
#include <iostream>
#include <cmath>
using namespace std;

#define F(x) (((3*(x)-1)/(pow((x),2)+3))*((3*(x)-1)/(pow((x),2)+3)))

//Derivada Progresiva
float prodfRec(float x, float h, int i)
{
  float resh=0.0, res=0.0;

  //Ciclos intermedios
  if (i>0)
    {
      resh=prodfRec((x+h),h,(i-1));
      res=prodfRec(x,h,(i-1));
    }

  //Ultimo ciclo
  else
    {
      resh=x+h;
      res=x;
    }

  //cout << endl << "resh "<< resh << " i " << i << endl;
  //cout << endl << "res " << res << " i " << i << endl;

  //Ciclos intermedios
  if (i!=0)
    return (resh-res)/h;

  //Ultimo ciclo
  else
    return (F(resh)-F(res))/h;
}

//Derivada Regresiva
float regdfRec(float x, float h, int i)
{
  float resh=0.0, res=0.0;

  //Ciclos intermedios
  if (i>0)
    {
      resh=regdfRec(x,h,(i-1));
      res=regdfRec((x-h),h,(i-1));
    }

  //Ultimo ciclo
  else
    {
      resh=x;
      res=x-h;
    }

  //cout << endl << "resh "<< resh << " i " << i << endl;
  //cout << endl << "res " << res << " i " << i << endl;

  //Ciclos intermedios
  if (i!=0)
    return (resh-res)/h;

  //Ultimo ciclo
  else
    return (F(resh)-F(res))/h;
}

//Derivada Central
float cendfRec(float x, float h, int i)
{
  float resh=0.0, res=0.0;

  //Ciclos intermedios
  if (i>0)
    {
      resh=cendfRec((x+h),h,(i-1));
      res=cendfRec((x-h),h,(i-1));
    }

  //Ultimo ciclo
  else
    {
      resh=x+h;
      res=x-h;
    }

  //cout << endl << "resh "<< resh << " i " << i << endl;
  //cout << endl << "res " << res << " i " << i << endl;

  //Ciclos intermedios
  if (i!=0)
    return (resh-res)/(2*h);

  //Ultimo ciclo
  else
    return (F(resh)-F(res))/(2*h);
}

int main ()
{
  float x=1.0, h=0.01;
  float result;
  int i;

  cout << "Introduce el grado de derivacion que buscas" << endl;
  scanf("%d", &i);
  i-=1;
  //cout << i << endl;

  //Progresiva
  result = prodfRec(x,h,i);
  cout << "Progresiva " << result << endl;

  //Regresiva
  result = regdfRec(x,h,i);
  cout << "Regresiva " << result << endl;

  //Central
  result = cendfRec(x,h,i);
  cout << "Central " << result << endl;

  return 0;
}
```
Next you can update your site name, avatar and other options using the _config.yml file in the root of your repository (shown below).

![_config.yml]({{ site.baseurl }}/images/config.png)

The easiest way to make your first post is to edit this one. Go into /_posts/ and update the Hello World markdown file. For more instructions head over to the [Jekyll Now repository](https://github.com/barryclark/jekyll-now) on GitHub.
