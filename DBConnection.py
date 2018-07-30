from sshtunnel import SSHTunnelForwarder
import pymysql

class DBConnection(object):    

    def __init__(self):
       pass

    
    def getConnection(self):
        try:    
                connection = pymysql.connect(
                host = '',
                user = '',
                password = '',
                db = '')
                
            
        except pymysql.Error as e:
            print(e)
            connection = None        
        return connection
