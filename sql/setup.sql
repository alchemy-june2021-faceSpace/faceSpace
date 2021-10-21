DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS listings CASCADE;
DROP TABLE IF EXISTS wishlist;
DROP TABLE IF EXISTS purchases;


CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    google_username TEXT NOT NULL,
    google_email TEXT NOT NULL UNIQUE,
    google_avatar_url TEXT,
    user_phone VARCHAR(10)
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

CREATE TABLE categories (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category TEXT UNIQUE NOT NULL
);

CREATE TABLE listings (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL,
    description TEXT,
    price MONEY NOT NULL,
    photo TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    category_id BIGINT NOT NULL,
    FOREIGN KEY(category_id) REFERENCES categories(id)
);

CREATE TABLE wishlist (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    item_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    FOREIGN KEY(item_id) REFERENCES listings(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);


CREATE TABLE purchases (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL,
    item_id BIGINT NOT NULL,
    cost MONEY NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (item_id) REFERENCES listings(id)
);
