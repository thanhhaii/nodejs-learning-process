import { query } from "../config/postgres-db.js";
import type { ChatMessage, CreateMessageInput } from "../types/chat/index.js";

function mapRow(row: any): ChatMessage {
	return {
		id: row.id,
		senderId: row.sender_id,
		receiverId: row.receiver_id,
		content: row.content,
		createdAt: row.created_at,
	};
}

export async function insertMessage(
	input: CreateMessageInput,
): Promise<ChatMessage> {
	const { rows } = await query(
		`INSERT INTO messages (sender_id, receiver_id, content)
        VALUES($1, $2, $3)
        RETURNING *
        `,
		[input.senderId, input.receiverId, input.content],
	);

	return mapRow(rows[0]);
}

export async function getMessagesBetweenUsers(
	userAId: string,
	userBId: string,
): Promise<ChatMessage[]> {
	const { rows } = await query(
		`SELECT * FROM messages
     WHERE (sender_id = $1 AND receiver_id = $2)
        OR (sender_id = $2 AND receiver_id = $1)
     ORDER BY created_at ASC`,
		[userAId, userBId],
	);
	return rows.map(mapRow);
}

export async function userExists(userId: number): Promise<boolean> {
	const { rows } = await query(`SELECT 1 FROM users WHERE id = $1`, [userId]);
	return rows.length > 0;
}
