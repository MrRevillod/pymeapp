import * as SQLite from "expo-sqlite"

export const query = async <T>(sql: string, params: any[] = []): Promise<T> => {
	const db = await SQLite.openDatabaseAsync("app.db")

	return new Promise((resolve, reject) => {
		db.withTransactionAsync(async () => {
			try {
				if (sql.trim().toUpperCase().startsWith("SELECT")) {
					const result = await db.getAllAsync(sql, params)
					resolve(result as T)
				} else {
					const result = await db.runAsync(sql, params)
					resolve(result as T)
				}
			} catch (error) {
				reject(error)
			}
		})
	})
}

export const initDatabase = async () => {
	try {
		const db = await SQLite.openDatabaseAsync("app.db")

		await db.execAsync(`

            CREATE TABLE IF NOT EXISTS categories (
                id TEXT PRIMARY KEY NOT NULL,
                name TEXT NOT NULL
            );
    
            CREATE TABLE IF NOT EXISTS products (
                id TEXT PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                price INTEGER NOT NULL,
                categoryId TEXT NOT NULL,
                FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE CASCADE
            );

			CREATE TABLE IF NOT EXISTS history (
				id TEXT PRIMARY KEY NOT NULL,
				cart TEXT NOT NULL,
				total INTEGER NOT NULL,
				createdAt TEXT NOT NULL
			);
        `)

		// 	await db.execAsync(`
		// 	    DELETE FROM categories;
		// 	    DELETE FROM products;

		// 	    INSERT INTO categories (id, name) VALUES
		// 	    ('services-applications', 'Aplicaciones'),
		// 	    ('services-custom-designs', 'Diseños personalizados'),
		// 	    ('services-fake-nails', 'Uñas postizas (servicio)'),
		// 	    ('services-nail-art', 'Nail Art'),
		// 	    ('services-refill', 'Refill (Relleno)'),
		// 	    ('services-removal', 'Retiro de uñas'),

		// 	    ('products-polish', 'Esmaltes'),
		// 	    ('products-glitter', 'Brillos y Glitter'),
		// 	    ('products-fake-nails', 'Uñas postizas (producto)'),
		// 	    ('products-tools', 'Limas y Herramientas'),
		// 	    ('products-gel-acrylic', 'Geles y Acrílicos'),
		// 	    ('products-decorations', 'Decoraciones');

		// 	    INSERT INTO products (id, name, price, categoryId) VALUES
		// 	    ('srv-001', 'Aplicación básica semipermanente', 8000, 'services-applications'),
		// 	    ('srv-002', 'Aplicación gel UV', 10000, 'services-applications'),
		// 	    ('srv-003', 'Diseño personalizado', 2500, 'services-custom-designs'),
		// 	    ('srv-004', 'Uñas postizas con tip', 9000, 'services-fake-nails'),
		// 	    ('srv-005', 'Refill gel/acrílico', 7000, 'services-refill'),
		// 	    ('srv-006', 'Retiro de uñas', 3000, 'services-removal'),

		// 	    ('prd-001', 'Esmalte rojo intenso', 2500, 'products-polish'),
		// 	    ('prd-002', 'Esmalte nude rosado', 2500, 'products-polish'),
		// 	    ('prd-003', 'Brillo holográfico', 1800, 'products-glitter'),
		// 	    ('prd-004', 'Brillo dorado fino', 1800, 'products-glitter'),
		// 	    ('prd-005', 'Set de uñas postizas almendra', 3500, 'products-fake-nails'),
		// 	    ('prd-006', 'Lima profesional 180/100', 1200, 'products-tools'),
		// 	    ('prd-007', 'Gel constructor transparente', 4500, 'products-gel-acrylic'),
		// 	    ('prd-008', 'Decoraciones florales 3D', 2200, 'products-decorations');
		// 	`)
	} catch (error) {
		console.log("init sql:", error)
	}
}
