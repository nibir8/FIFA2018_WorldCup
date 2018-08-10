
from flask import Flask, render_template, request, redirect, flash
from flask import session,url_for, escape
from predictor import predictor
from info import info
from flask import jsonify
from smtplib import SMTP
from flask import Flask
from flask_mail import Mail, Message

# from flaskext.mysql import MySQL
import unittest
from flaskext.mysql import MySQL
import json

mysql = MySQL()

app =Flask(__name__)
mail=Mail(app)

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'noreply.fifa18newsletter@gmail.com'
app.config['MAIL_PASSWORD'] = 'Nibir88**'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)


app.config['MYSQL_DATABASE_HOST'] = 'db.cs.dal.ca'
app.config['MYSQL_DATABASE_USER'] = 'rohit'
app.config['MYSQL_DATABASE_PASSWORD'] = 'B00779758'
app.config['MYSQL_DATABASE_DB'] = 'rohit'


# app.config['MYSQL_DATABASE_HOST'] = 'localhost'
# app.config['MYSQL_DATABASE_USER'] = 'root'
# app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
# app.config['MYSQL_DATABASE_DB'] = 'Group20'
mysql.init_app(app)

class App():

    @app.route('/')
    def main():
        return render_template('index.html')

    @app.route('/index')
    def home():
        return render_template('index.html')

    @app.route('/predict', methods = ['GET', 'POST'])
    def predict():
        return render_template("predict.html")

    @app.route('/videos', methods = ['GET', 'POST'])
    def videos():
        return render_template("videos.html")

    @app.route('/score', methods = ['GET', 'POST'])
    def score():
        return render_template("score.html")

    @app.route('/join', methods = ['GET', 'POST'])
    def Subscribe():
        if request.method == 'POST':
            name = request.form["name"]
            email = request.form['email']
            password = request.form['password']
            mailSubject = "FIFA Newsletter Subscription"
            mailBody = "Congratulations "+name+"!! You have subscribed to the FIFA Newsletter. Your username is : "+email+" and password is : "+password
            msg = Message(mailSubject, sender = "donotreply.fifa2018newsletter@gmail.com", recipients = [email])
            msg.body = mailBody
            mail.send(msg)
            conn = mysql.connect()
            cur = conn.cursor()
            sql = "INSERT INTO tbl_users (name,email,password) VALUES (%s, %s,%s)"
            cur.execute(sql, (name,email,password))
            conn.commit()
            conn.close()
            return render_template("join.html",msg="You have subscribed!! Check Email")
        else:
            return render_template("join.html",msg="")

    @app.route('/player_stats', methods = ['GET', 'POST'])
    def player():
        return render_template("visual1.html")

    @app.route('/player_info', methods=['GET', 'POST'])
    def player_info():
        name = request.form["player_name"]
        ob = info()
        res = ob.player_info(name)
        return json.dumps(res)

    @app.route('/team_info', methods=['GET', 'POST'])
    def team_info():
        name = request.form["team_name"]
        ob = info()
        res = ob.team_info(name)
        print(res)
        return json.dumps(res)

    @app.route('/destination', methods = ['GET', 'POST'])
    def destination():
        return render_template("destination.html")

    @app.route('/team_stats', methods = ['GET', 'POST'])
    def team():
        return render_template("visual2.html")

    @app.route('/predict_team',methods=['GET','POST'])
    def predict_team():
        print("i was called")
        predict_this = {"team":request.form["team"],
                        "hg":request.form["hg"],
                        "attendance":request.form["attendance"],
                        "hthg":request.form["hthg"],
                        "htag":request.form["htag"]
                        }
        print(predict_this)
        ob = predictor().predict(predict_this)
        return ob
