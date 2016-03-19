from gurobipy import *
import numpy as np
import pandas as pd

points = "Points"
salary = "Salary"
position = "Position"

def optimize(player_names, player_data):
    varbs = {}  # key: player name, value : var

    m = Model()

    for p in player_names:
        varbs[p] = m.addVar(vtype=GRB.BINARY, name = p)

    m.update()

    all_const = LinExpr()
    for p in player_names:
            all_const.addTerms(1,varbs[p])
    all_const = all_const == 9

    # QB
    qb_const = LinExpr()
    for p in player_names:
        if player_data.loc[p, position] == "QB":
            qb_const.addTerms(1,varbs[p])
    qb_const = qb_const ==  1


    # WRs
    wr_const = LinExpr()
    for p in player_names:
        if player_data.loc[p, position] == "WR":
            wr_const.addTerms(1,varbs[p])
    wr2_const =  3 <= wr_const.copy()
    wr_const =  wr_const <= 4

    rb_const = LinExpr()
    for p in player_names:
        if player_data.loc[p, position] == "RB":
            rb_const.addTerms(1,varbs[p])
    rb2_const =  2 <= rb_const.copy()
    rb_const =  rb_const <= 3

    te_const = LinExpr()
    for p in player_names:
        if player_data.loc[p, position] == "TE":
            te_const.addTerms(1,varbs[p])
    te2_const = te_const.copy()
    te2_const = 1 <= te2_const
    te_const =  te_const <= 2

    dst_const = LinExpr()
    for p in player_names:
        if player_data.loc[p, position] == "DST":
            dst_const.addTerms(1,varbs[p])
    dst_const =   dst_const == 1

    sal_const = LinExpr()
    for p in player_names:
        if type(player_data.loc[p, position]) == type(''):
            sal_const.addTerms(player_data.loc[p,salary],varbs[p])
    sal_const = sal_const <= 50000


    m.addConstr(all_const, "team number constraint")
    m.addConstr(qb_const, "qb constraint")
    m.addConstr(wr_const, "wr constraint")
    m.addConstr(wr2_const, "wr2 constraint")
    m.addConstr(rb_const, "rb constraint")
    m.addConstr(rb2_const, "rb2 const")
    m.addConstr(te_const, "te constraint")
    m.addConstr(te2_const, "te 2 constraint")
    m.addConstr(dst_const, "dst constraint")
    m.addConstr(sal_const, 'salary constraint')

    # Objective
    obj = LinExpr()
    for p in player_names:
        if type(player_data.loc[p, points]) == np.float64:
            obj.add(varbs[p], player_data.loc[p, points])

    m.setObjective(obj, sense= GRB.MAXIMIZE)
    m.update()

    m.optimize()

    sal = 50000
    team = []
    for v in m.getVars():
        if v.x ==1:
            sal -= player_data.loc[v.varName, salary]
            print('%s %g %s' % (v.varName, player_data.loc[v.varName, points], player_data.loc[v.varName, position]))
            team += [v.varName]

    print("Salary leftover: " + str(sal))
    print('Obj: %g' % m.objVal)


def main():

    player_data = pd.read_csv('player_input.csv', index_col=0 )
    player_data[points] = player_data[points].astype(np.float64) # Fixes issue around data types
    optimize(player_data.index, player_data)

if __name__ == '__main__':
    main()



