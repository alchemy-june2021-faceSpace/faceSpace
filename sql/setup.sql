DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS listings CASCADE;
DROP TABLE IF EXISTS wishlist;


CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    google_username TEXT NOT NULL,
    google_email TEXT NOT NULL UNIQUE,
    google_avatar_url TEXT
);

CREATE TABLE posts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL,
    notifications BOOLEAN DEFAULT false,
    text TEXT,
    media_url TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE comments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL,
    comment TEXT NOT NULL,
    post_id BIGINT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(post_id) REFERENCES posts(id)
);

CREATE TABLE likes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    post_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    FOREIGN KEY(post_id) REFERENCES posts(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE listings (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL,
    description TEXT,
    price MONEY NOT NULL,
    photo TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
    -- category_id BIGINT NOT NULL,
    -- FOREIGN KEY(category_id) REFERENCES categories(id)
);

CREATE TABLE wishlist (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    item_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    FOREIGN KEY(item_id) REFERENCES listings(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);

-- INSERT INTO users (google_username, google_email, google_avatar_url)
-- VALUES ('test-user', 'test-email@email.com', 'image.jpg');

-- INSERT INTO listings (user_id, description, price, photo)
-- VALUES ('1', 'Good stuff', 12.00, 'image.jpg');