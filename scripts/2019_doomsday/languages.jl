#=
Created on Monday 2 September 2019
Last update: -

@author: Michiel Stock
michielfmstock@gmail.com

Illustration of the Doomsday Argument on programming languages.
=#

using Plots

# DATA

languages_by_year = [
    ("Julia", 2012),
    ("Mathematica", 1982),
    ("MATLAB", 1984),
    ("R", 1997),
    ("Python", 1991),
    ("Fortran", 1957),
    ("C", 1972),
    ("C++", 1985)
]

now = 2019

# Plotting

sort!(languages_by_year, by=x->x[2])

languages, years = collect.(zip(languages_by_year...))

fig = scatter(years, languages, markercolor=:blue, label="Release")

vline!([now], color=:green, label="Current year")

scatter!(2now .- years, languages, markercolor=:red, label="Obsolescence (predicted)")

for (lang, year) in languages_by_year
    lcl, ucl = now + (now - year) / 9, now + 9(now - year)
    ucl = min(ucl, 2100)  # till my retirement
    plot!(fig, [lcl, ucl], [lang, lang], color=:red, linestyle=:dash,
            label="")
end

title!("Obsolescence of scientific programming laguages,\nas predicted by the Doomsday Argument")

savefig(fig, "languages_obsolescence.svg")
