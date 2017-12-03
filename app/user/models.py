from app import db


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    email = db.Column(db.String(255), unique=True)
    phonenumber = db.Column(db.String(255))

    def __init__(self, name, email, phonenumber):
        self.name = name
        self.email = email
        self.phonenumber = phonenumber
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
        }

    def __repr__(self):
        return "User<%d> %s" % (self.id, self.name)
