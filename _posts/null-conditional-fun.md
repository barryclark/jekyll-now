The other day I realized that with the addition of the null conditional operator in C# 6, we can our terseness on in some additional situations. Instead of having to do a thing like this:

var thing = someParameter != null && someProperty.subProperty != null && someSubProperty.subPropCollection != null
  ? new List<string>() 
  : someParameter.subProperty.subPropCollection;
  
We can just do it like this:

var thing = someProperty?.subProperty?.subPropCollection ?? new List<string>();

Go fortha and do good with this newfound information!
