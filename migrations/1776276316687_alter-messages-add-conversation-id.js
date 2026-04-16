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
	pgm.addColumn("messages", {
		conversation_id: {
			type: "uuid",
			notNull: false,
			references: '"conversations"(id)',
			onDelete: "CASCADE",
		},
	});

	pgm.createIndex("messages", ["conversation_id", "created_at", "id"], {
		name: "idx_messages_conversation_created_id",
	});
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
	pgm.dropIndex("messages", ["conversation_id", "created_at", "id"], {
		name: "idx_messages_conversation_created_id",
	});

	pgm.dropColumn("messages", "conversation_id");
};
