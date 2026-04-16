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
	pgm.createTable("conversations", {
		id: {
			type: "uuid",
			primaryKey: true,
			default: pgm.func("gen_random_uuid()"),
		},
		user_one_id: {
			type: "uuid",
			notNull: true,
			references: '"users"(id)',
			onDelete: "CASCADE",
		},
		user_two_id: {
			type: "uuid",
			notNull: true,
			references: '"users"(id)',
			onDelete: "CASCADE",
		},
		last_message_id: { type: "uuid", notNull: false },
		last_message_at: { type: "timestamptz", notNull: false },
		created_at: {
			type: "timestamptz",
			notNull: true,
			default: pgm.func("now()"),
		},
		updated_at: {
			type: "timestamptz",
			notNull: true,
			default: pgm.func("now()"),
		},
	});

	pgm.addConstraint("conversations", "conversations_user_pair_unique", {
		unique: ["user_one_id", "user_two_id"],
	});
	pgm.addConstraint("conversations", "conversations_different_users_check", {
		check: "user_one_id < user_two_id",
	});
	pgm.createIndex("conversations", ["user_one_id"]);
	pgm.createIndex("conversations", ["user_two_id"]);
	pgm.createIndex("conversations", ["last_message_at"], {
		name: "idx_conversations_last_message_at",
	});
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
	pgm.dropIndex("conversations", ["last_message_at"], {
		name: "idx_conversations_last_message_at",
	});
	pgm.dropIndex("conversations", ["user_two_id"]);
	pgm.dropIndex("conversations", ["user_one_id"]);
	pgm.dropConstraint("conversations", "conversations_different_users_check");
	pgm.dropConstraint("conversations", "conversations_user_pair_unique");
	pgm.dropTable("conversations");
};
