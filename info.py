import pandas as pd
import numpy as np
import re
import json
import os
dir_path = os.path.dirname(os.path.realpath(__file__)) + "/Datasets/"

class info():

    def player_info(self,name):
        all_players = pd.read_csv(dir_path + "all_players.csv")
        squad = pd.read_csv( dir_path + "2018_squad.csv")
        info = all_players[all_players["Name"]==name]
        column_names =['Name', 'Age', 'Photo', 'Nationality',  'Overall',
       'Club',  'Value', 'Wage',  'Acceleration',
       'Aggression', 'Agility', 'Balance', 'Ball Control', 'Composure',
       'Crossing', 'Curve', 'Dribbling',  'Finishing',
        'Heading Accuracy','Jumping',
       'Long Passing', 'Long Shots', 'Penalties', 'Positioning',
       'Reactions', 'Stamina','Strength', 'Vision',
       'Volleys']

        pinfo =  info[column_names].reset_index().to_dict()

        new_info = {}
        skills = ['Acceleration','Crossing','Dribbling','Balance','Finishing','Stamina']
        print(pinfo)
        new_info["id"]=pinfo["Name"][0]
        list_of_skills = []
        for skill in skills:
            d={}
            d["skill"]=skill
            d["count"]=pinfo[skill][0]//5
            list_of_skills.append(d)
        print(list_of_skills)
        new_info["data"]=list_of_skills
        with open('static/js/player_info.json', 'w') as outfile:
            json.dump(new_info,outfile)
        print(json.dumps(new_info))
        return json.dumps(new_info)
    def team_info(self,name):
        all_players = pd.read_csv(dir_path + "all_players.csv")
        squad = pd.read_csv(dir_path + "2018_squad.csv")

        team_name = name
        features = ['Team', 'Group', 'Squad Number', 'Position', 'Player', 'Date Of Birth',
       'Age', 'Caps', 'Goals', 'Club']

        return squad[squad["Team"]==name][features].reset_index().to_dict()
