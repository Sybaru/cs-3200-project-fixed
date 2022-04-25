
DROP database IF EXISTS songDB;
create database songDB;
use songDB;

DROP TABLE IF EXISTS streaming_platform;
create table streaming_platform (
	platform_id int PRIMARY KEY,
    platform_name varchar(100)
);

DROP TABLE IF EXISTS list_of_playlists;
create table list_of_playlists (
	list_id int primary key,
    playlist_title varchar(50),
    userName varchar(20)
);

DROP TABLE IF EXISTS individual_playlist;
create table individual_playlist (
	indiv_playlist_id int primary key,
    song_id int,
    list_playlist_id int not null,
    
    CONSTRAINT belongs_to FOREIGN KEY (list_playlist_id) references list_of_playlists(list_id)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT
);

DROP TABLE IF EXISTS song;
create table song (
	song_id int PRIMARY KEY,
    song_name varchar(100),
    genre varchar(100), 
    song_length time,
    album_name varchar(100),
    streaming_platform int not null,
    playlist_id int not null,
    
    CONSTRAINT published_on FOREIGN KEY (streaming_platform) references streaming_platform(platform_id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
        
	CONSTRAINT in_playlist FOREIGN KEY (playlist_id) references individual_playlist(indiv_playlist_id)
		ON UPDATE RESTRICT
		ON DELETE RESTRICT
	
);

DROP TABLE IF EXISTS artist;
create table artist (
	artist_id int PRIMARY KEY,
    artist_name varchar(100),
    song int not null,
    
    CONSTRAINT performs FOREIGN KEY (song) references song(song_id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

DROP TABLE IF EXISTS record_label;
create table record_label (
	label_id int PRIMARY KEY,
    label_name varchar(100),
    song int not null,
    artist int not null,
    
    CONSTRAINT produces FOREIGN KEY (song) references song(song_id)
		ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT signs FOREIGN KEY (artist) references artist(artist_id)
		ON UPDATE CASCADE
        ON DELETE CASCADE
);

DROP TABLE IF EXISTS ranking;
create table ranking (
	ranking int PRIMARY KEY,
    year_in_top_100 int,
    song int not null,
    
    CONSTRAINT ranks_at FOREIGN KEY (song) references song(song_id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);


DROP TABLE IF EXISTS userTable;
create table userTable (
	userName varchar(20),
    userPassword varchar(20),
    userType varchar(20) -- determines if the user is a manger or regular user 
    
);








