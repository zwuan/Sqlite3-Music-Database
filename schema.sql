CREATE TABLE song (
  sid VARCHAR PRIMARY KEY,
  title VARCHAR,
  genre VARCHAR,
  year INTEGER,
  language VARCHAR
);

CREATE TABLE artist (
  aid VARCHAR PRIMARY KEY,
  aname VARCHAR,
  abirth INTEGER,
  agender INTEGER,
  acountry VARCHAR
);

CREATE TABLE producer (
  pid VARCHAR PRIMARY KEY,
  pname VARCHAR,
  pbirth INTEGER,
  pgender INTEGER,
  pcountry VARCHAR
);

CREATE TABLE songwriter (
  wid VARCHAR PRIMARY KEY,
  wname VARCHAR,
  wbirth INTEGER,
  wgender INTEGER,
  wcountry VARCHAR
);

CREATE TABLE member (
  mid VARCHAR PRIMARY KEY,
  mname VARCHAR,
  mbirth INTEGER,
  mgender INTEGER,
  mcountry VARCHAR
);

CREATE TABLE follow_artist (
  faaid VARCHAR REFERENCES artist (aid),
  famid VARCHAR REFERENCES member (mid) ON DELETE CASCADE
);

CREATE TABLE follow_producer (
  fppid VARCHAR REFERENCES producer (pid),
  fpmid VARCHAR REFERENCES member (mid) ON DELETE CASCADE
);

CREATE TABLE follow_songwriter (
  fswid VARCHAR REFERENCES songwriter (wid),
  fsmid VARCHAR REFERENCES member (mid) ON DELETE CASCADE
);

CREATE TABLE sing (
  ssid VARCHAR REFERENCES song (sid),
  said VARCHAR REFERENCES artist (aid)
);

CREATE TABLE produce (
  psid VARCHAR REFERENCES song (sid),
  ppid VARCHAR REFERENCES producer (pid)
);

CREATE TABLE compose (
  csid VARCHAR REFERENCES song (sid),
  cwid VARCHAR REFERENCES songwriter (wid)
);

CREATE TABLE add_list (
  almid VARCHAR REFERENCES member (mid) ON DELETE CASCADE,
  alsid VARCHAR REFERENCES song (sid)
);
