DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS likes;

CREATE TABLE users (
    google_username TEXT NOT NULL PRIMARY KEY,
    google_avatar_url TEXT NOT NULL
);

CREATE TABLE posts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL,
    notifications BOOLEAN DEFAULT false,
    text TEXT,
    media_url TEXT NOT NULL,
    FOREIGN KEY (username) REFERENCES users(google_username)
);

CREATE TABLE likes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    post_id BIGINT NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY(post_id) REFERENCES posts(id),
    FOREIGN KEY(user_id) REFERENCES users(google_username)
);