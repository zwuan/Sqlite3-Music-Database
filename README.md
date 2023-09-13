# Music Lookup and Follow System

## Running the app

Database initialization:

```
python3 init_db.py
```

Run the backend server : (run on localhost:5000)

```
python3 app.py
```

Interface：

* User : open ```./frontend/login.html```

* Admin : open ```./frontend/backstage.html```

---

## CRUD

### Insert

- User account registration
- User can modify their 4 types of follwing lists via subscribing
  - Song list
  - Artist list
  - Songwriter list
  - Producer list

* The admin can modify every list

### Delete

- The admin can delete accounts

### Search

- Songs lookups
  - Lookup songs by song name
  - Lookup songs by artist
  - Lookup songs by songwriter
  - Lookup songs by producer

- User follwoing list lookups
  - Lookups a user's following
    - Song
    - Artist
    - Songwriter
    - Producer

### Update

- The admin can update user name
