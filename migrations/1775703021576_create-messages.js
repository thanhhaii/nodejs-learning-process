/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
	pgm.createTable("messages", {
		id: {
			type: "uuid",
			primaryKey: true,
			default: pgm.func("gen_random_uuid()"),
		},
		sender_id: {
			type: "integer",
			notNull: true,
			references: '"users"(id)',
			onDelete: "CASCADE",
		},
		receiver_id: {
			type: "integer",
			notNull: true,
			references: '"users"(id)',
			onDelete: "CASCADE",
		},
		content: {
			type: "text",
			notNull: true,
		},
		created_at: {
			type: "timestamptz",
			notNull: true,
			default: pgm.func("NOW()"),
		},
	});

	pgm.createIndex("messages", ["sender_id", "receiver_id", "created_at"], {
		name: "idx_messages_conversation",
	});
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
	pgm.dropIndex("messages", ["sender_id", "receiver_id", "created_at"], {
		name: "idx_messages_conversation",
	});
	pgm.dropTable("messages");
};
