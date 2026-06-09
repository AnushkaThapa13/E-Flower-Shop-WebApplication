CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    phone VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(500),
    stock INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orderId INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    method VARCHAR(100),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (orderId) REFERENCES orders(id)
);

CREATE TABLE IF NOT EXISTS inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item VARCHAR(255) NOT NULL,
    stock INT DEFAULT 0,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX (item)
);

INSERT INTO products (name, description, price, image_url, stock) VALUES
('Red Rose Bouquet', 'Classic dozen red roses wrapped in elegant paper', 899.00, 'https://images.pexels.com/photos/36147881/pexels-photo-36147881.jpeg', 25),
('Mixed Seasonal Blooms', 'Fresh mixed flowers for any occasion', 649.00, 'https://images.pexels.com/photos/36420493/pexels-photo-36420493.jpeg', 30),
('White Lily Arrangement', 'Pure white lilies in a premium vase', 799.00, 'https://images.pexels.com/photos/29599824/pexels-photo-29599824.jpeg', 15),
('Sunflower Bundle', 'Bright sunflowers to lift any mood', 549.00, 'https://images.pexels.com/photos/30906089/pexels-photo-30906089.jpeg', 20),
('Orchid Plant', 'Long-lasting indoor orchid plant', 1299.00, 'https://images.pexels.com/photos/36345700/pexels-photo-36345700.jpeg', 10),
('Anniversary Special', 'Premium roses and lilies combo', 1499.00, 'https://images.pexels.com/photos/5493234/pexels-photo-5493234.jpeg', 12);
