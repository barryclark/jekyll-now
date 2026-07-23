# Generates images/votingPowerBasedOnIncomeData.png for globalGovernance.md.
#
# globalGovernanceCode.tsx (the original chart source) depended on an external
# CSV of Dutch household income by percentile that isn't checked into the repo,
# so its exact figures can no longer be reproduced. This script instead fits a
# lognormal income distribution to published 2022 CBS aggregates (median
# household spendable income, Gini coefficient) and reuses the same
# progressive tax brackets as globalGovernanceCode.tsx, then adds a baseline
# one-person-one-vote component blended 50/50 with the tax-weighted component.
#
# Requires: pip install numpy scipy matplotlib
import os
import numpy as np
from scipy.stats import norm, lognorm
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

# --- Reconstructed Dutch household spendable-income distribution (2022) ---
gini = 0.285
median_income = 30000.0
z = norm.ppf((1 + gini) / 2)
sigma = z * np.sqrt(2)
mu = np.log(median_income)

percentiles = np.arange(0.5, 100, 1.0)
p = percentiles / 100.0
income = lognorm.ppf(p, s=sigma, scale=np.exp(mu))

brackets = [(0, 0.15), (15000, 0.25), (35000, 0.35), (70000, 0.42), (150000, 0.48), (300000, 0.52)]

def progressive_tax(inc):
    sorted_brackets = sorted(brackets, key=lambda b: -b[0])
    remaining = inc
    total_tax = 0.0
    for threshold, rate in sorted_brackets:
        if remaining > threshold:
            taxable = remaining - threshold
            total_tax += taxable * rate
            remaining = threshold
    return total_tax

tax = np.array([progressive_tax(i) for i in income])

def normalize(x):
    return x / x.sum() * 100

baseline_norm = normalize(np.ones_like(income))
tax_norm = normalize(tax.copy())
alpha = 0.5
combined_norm = normalize(alpha * baseline_norm + (1 - alpha) * tax_norm)

def group_shares(values):
    bottom50 = values[percentiles < 50].sum()
    middle40 = values[(percentiles >= 50) & (percentiles < 90)].sum()
    top10 = values[percentiles >= 90].sum()
    top1 = values[percentiles >= 99].sum()
    return [bottom50, middle40, top10, top1]

baseline_g = group_shares(baseline_norm)
tax_g = group_shares(tax_norm)
combined_g = group_shares(combined_norm)

for label, g in [("baseline", baseline_g), ("tax", tax_g), ("combined", combined_g)]:
    print(label, [f"{v:.1f}" for v in g])

# --- Chart (dataviz skill: categorical slots 1/2/3 = blue/orange/aqua, fixed order) ---
BLUE = "#2a78d6"
ORANGE = "#eb6834"
AQUA = "#1baf7a"
SURFACE = "#fcfcfb"
PRIMARY_INK = "#0b0b0b"
SECONDARY_INK = "#52514e"
MUTED = "#898781"
GRID = "#e1e0d9"
BASELINE_AXIS = "#c3c2b7"

groups = ["Bottom 50%", "Middle 40%", "Top 10%", "Top 1%"]
series = [
    ("Baseline vote (equal per adult)", baseline_g, BLUE),
    ("Tax-weighted only", tax_g, ORANGE),
    ("Combined system (50/50 blend)", combined_g, AQUA),
]

fig, ax = plt.subplots(figsize=(10, 6.2), dpi=200)
fig.patch.set_facecolor(SURFACE)
ax.set_facecolor(SURFACE)

n_groups = len(groups)
n_series = len(series)
bar_width = 0.24
gap = 0.03
x = np.arange(n_groups)

for i, (label, values, color) in enumerate(series):
    offset = (i - (n_series - 1) / 2) * (bar_width + gap)
    bars = ax.bar(x + offset, values, width=bar_width, color=color, label=label,
                   edgecolor=SURFACE, linewidth=2, zorder=3)
    for rect, v in zip(bars, values):
        ax.text(rect.get_x() + rect.get_width() / 2, v + 0.8, f"{v:.1f}%",
                ha="center", va="bottom", fontsize=9.5, color=SECONDARY_INK, fontweight="medium")

ax.set_ylim(0, 58)
ax.set_ylabel("Share of total voting power", color=SECONDARY_INK, fontsize=11)
ax.set_xticks(x)
ax.set_xticklabels(groups, fontsize=11.5, color=PRIMARY_INK)
ax.tick_params(axis="y", colors=MUTED, labelsize=9.5)
ax.tick_params(axis="x", length=0)

ax.yaxis.grid(True, color=GRID, linewidth=1, zorder=0)
ax.set_axisbelow(True)
for spine in ["top", "right", "left"]:
    ax.spines[spine].set_visible(False)
ax.spines["bottom"].set_color(BASELINE_AXIS)

ax.set_title("Voting Power Under Three Systems", fontsize=15.5, color=PRIMARY_INK,
              fontweight="bold", pad=18, loc="left")

legend = ax.legend(loc="upper center", bbox_to_anchor=(0.5, -0.08), ncol=3, frameon=False,
                    fontsize=10, labelcolor=SECONDARY_INK)

plt.tight_layout()
output_path = os.path.join(os.path.dirname(__file__), "..", "images", "votingPowerBasedOnIncomeData.png")
plt.savefig(output_path, facecolor=SURFACE, bbox_inches="tight")
print(f"saved to {output_path}")
