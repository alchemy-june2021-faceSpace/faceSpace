DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE users (
    google_username TEXT NOT NULL PRIMARY KEY,
    google_avatar_url TEXT NOT NULL
);

CREATE TABLE posts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL,
    FOREIGN KEY (username) REFERENCES users(google_username),
    notifications BOOLEAN DEFAULT false,
    text TEXT,
    media_url TEXT NOT NULL
);

CREATE TABLE comments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL,
    comment TEXT NOT NULL,
    post_id BIGINT NOT NULL,
    FOREIGN KEY(username) REFERENCES users(google_username),
    FOREIGN KEY(post_id) REFERENCES posts(id)
);

-- CREATE TABLE likes (
--     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     post_id BIGINT NOT NULL,
--     username TEXT NOT NULL,
--     FOREIGN KEY(post_id) REFERENCES posts(id),
--     FOREIGN KEY(username) REFERENCES users(google_username)
-- );
