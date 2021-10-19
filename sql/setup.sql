DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    google_username TEXT NOT NULL,
    google_email TEXT NOT NULL UNIQUE,
    google_avatar_url TEXT
);

CREATE TABLE posts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    notifications BOOLEAN DEFAULT false,
    text TEXT,
    media_url TEXT NOT NULL
);

-- CREATE TABLE comments (
--     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     username TEXT NOT NULL,
--     comment TEXT NOT NULL,
--     post_id BIGINT NOT NULL,
--     FOREIGN KEY(username) REFERENCES users(google_username),
--     FOREIGN KEY(post_id) REFERENCES posts(id)
-- );

-- CREATE TABLE likes (
--     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     post_id BIGINT NOT NULL,
--     username TEXT NOT NULL,
--     FOREIGN KEY(post_id) REFERENCES posts(id),
--     FOREIGN KEY(username) REFERENCES users(google_username)
-- );
INSERT INTO users (google_username, google_email, google_avatar_url) VALUES ('joe mac', 'joe.email.com', 'http://local.com');
