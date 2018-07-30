import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier

class predictor():
    def __init__(self):
       pass


    def predict(self,predict_this):
        def wdl(x):
            if x['Home Team Goals'] > x['Away Team Goals']:
                return "Win"
            elif x['Home Team Goals'] < x['Away Team Goals']:
                return "Loss"
            elif x['Home Team Goals'] == x['Away Team Goals']:
                return "Draw"
        matches = pd.read_csv(r"Datasets\world_cup\WorldCupMatches.csv")
        matches.drop_duplicates(inplace=True)
        matches.Year.value_counts(sort=False)
        matches.Attendance.fillna( np.max(matches[(matches.Year == 2014) & (matches.Stadium == 'Estadio Beira-Rio')].dropna().Attendance), inplace=True )
        matches["Result"] = matches.apply(wdl,axis=1)
        X=matches[matches["Home Team Name"]==predict_this["team"]][["Home Team Goals","Attendance","Half-time Home Goals","Half-time Away Goals"]]
        y = matches[matches["Home Team Name"]==predict_this["team"]]["Result"]
        rf = RandomForestClassifier(n_estimators=10)
        rf.fit(X,y)
        feed = np.array([predict_this["hg"],predict_this["attendance"],predict_this["hthg"],predict_this["htag"]]).reshape(1,-1)
        response = rf.predict(feed)
        return response[0]

