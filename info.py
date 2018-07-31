import pandas as pd
import numpy as np
import re
import json

class info():

    def player_info(self,name):
        all_players = pd.read_csv(r"Datasets\world_cup\all_players.csv")
        squad = pd.read_csv(r"Datasets\world_cup\2018_squad.csv")
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
        skills = ['Acceleration','Ball Control','Dribbling','Stamina','Dribbling','Crossing']
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

        return json.dumps(new_info)
    def team_info(self,name):
        all_players = pd.read_csv(r"Datasets\world_cup\all_players.csv")
        squad = pd.read_csv(r"Datasets\world_cup\2018_squad.csv")
        # these are the countries with more than 20 players in their roster
        # countries = ['Albania', 'Algeria', 'Argentina', 'Australia', 'Austria', 'Belgium',
        #              'Bolivia', 'Bosnia Herzegovina', 'Brazil', 'Bulgaria', 'Cameroon',
        #              'Canada', 'Cape Verde', 'Chile', 'China PR', 'Colombia', 'Congo',
        #              'Costa Rica', 'Croatia', 'Czech Republic', 'DR Congo', 'Denmark',
        #              'Ecuador', 'Egypt', 'England', 'Finland', 'France', 'Georgia',
        #              'Germany', 'Ghana', 'Greece', 'Guinea', 'Hungary', 'Iceland', 'India',
        #              'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Korea Republic', 'Kosovo',
        #              'Mali', 'Mexico', 'Montenegro', 'Morocco', 'Netherlands', 'New Zealand',
        #              'Nigeria', 'Northern Ireland', 'Norway', 'Paraguay', 'Peru', 'Poland',
        #              'Portugal', 'Republic of Ireland', 'Romania', 'Russia', 'Saudi Arabia',
        #              'Scotland', 'Senegal', 'Serbia', 'Slovakia', 'Slovenia', 'South Africa',
        #              'Spain', 'Sweden', 'Switzerland', 'Tunisia', 'Turkey', 'Ukraine',
        #              'United States', 'Uruguay', 'Venezuela', 'Wales']
        # all_players = all_players[all_players.apply(lambda x: x["Nationality"] in countries,
        #                                                        axis=1)]
        #
        # def name_convertor(names):
        #     new_names = []
        #     for x in names:
        #         name = x.split(" ")
        #         if len(name) > 1:
        #             first_name = name[0][0] + "."
        #             name[0] = first_name
        #         new_names.append(" ".join(name))
        #     return new_names
        #
        # # take user input
        team_name = name
        # whole_team = all_players[all_players["Nationality"] == team_name].drop_duplicates()
        # whole_team = whole_team.dropna()
        # players = squad[squad["Team"] == team_name]
        # players["Player"] = players["Player"].apply(lambda x: re.sub("\(\w+\)", "", x).strip())
        # players["Name"] = name_convertor(players["Player"])
        # final_squad = pd.merge(whole_team, players, on=["Name"], how='inner')
        features = ['Team', 'Group', 'Squad Number', 'Position', 'Player', 'Date Of Birth',
       'Age', 'Caps', 'Goals', 'Club']
        # print(final_squad[features].reset_index().to_dict())
        return squad[squad["Team"]==name][features].reset_index().to_dict()




