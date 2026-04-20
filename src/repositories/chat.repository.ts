import { query } from "../config/postgres-db.js";
import type {
	ChatHistorySummary,
	ChatMessage,
	Conversation,
	CreateMessageInput,
} from "../types/chat/index.js";

function mapConversationRow(row: any): Conversation {
	return {
		id: row.id,
		userOneId: row.user_one_id,
		userTwoId: row.user_two_id,
		lastMessageId: row.last_message_id,
		lastMessageAt: row.last_message_at,
		createdAt: row.created_at,
		updatedAt: row.updated_at,
	};
}

function mapMessageRow(row: any): ChatMessage {
	return {
		id: row.id,
		conversationId: row.conversation_id,
		senderId: row.sender_id,
		receiverId: row.receiver_id,
		content: row.content,
		createdAt: row.created_at,
	};
}

export function normalizeConversationUsers(
	userAId: string,
	userBId: string,
): [string, string] {
	return userAId < userBId ? [userAId, userBId] : [userBId, userAId];
}

export async function userExists(userId: string): Promise<boolean> {
	const { rows } = await query(`SELECT 1 FROM users WHERE id = $1`, [userId]);
	return rows.length > 0;
}

export async function findConversationByUsers(
	userAId: string,
	userBId: string,
): Promise<Conversation | null> {
	const [userOneId, userTwoId] = normalizeConversationUsers(userAId, userBId);
	const { rows } = await query(
		`SELECT *
		 FROM conversations
		 WHERE user_one_id = $1 AND user_two_id = $2
		 LIMIT 1`,
		[userOneId, userTwoId],
	);

	if (!rows[0]) {
		return null;
	}

	return mapConversationRow(rows[0]);
}

export async function createConversation(
	userAId: string,
	userBId: string,
): Promise<Conversation> {
	const [userOneId, userTwoId] = normalizeConversationUsers(userAId, userBId);
	const { rows } = await query(
		`INSERT INTO conversations (user_one_id, user_two_id)
		 VALUES ($1, $2)
		 RETURNING *`,
		[userOneId, userTwoId],
	);

	return mapConversationRow(rows[0]);
}

export async function findOrCreateConversation(
	userAId: string,
	userBId: string,
): Promise<Conversation> {
	const existingConversation = await findConversationByUsers(userAId, userBId);
	if (existingConversation) {
		return existingConversation;
	}

	return createConversation(userAId, userBId);
}

export async function insertMessage(
	input: CreateMessageInput,
): Promise<ChatMessage> {
	const { rows } = await query(
		`INSERT INTO messages (conversation_id, sender_id, receiver_id, content)
		 VALUES ($1, $2, $3, $4)
		 RETURNING *`,
		[input.conversationId, input.senderId, input.receiverId, input.content],
	);

	return mapMessageRow(rows[0]);
}

export async function updateConversationLastMessage(
	conversationId: string,
	messageId: string,
	createdAt: Date,
): Promise<void> {
	await query(
		`UPDATE conversations
		 SET last_message_id = $2,
		     last_message_at = $3,
		     updated_at = NOW()
		 WHERE id = $1`,
		[conversationId, messageId, createdAt],
	);
}

export async function getMessagesByConversationId(
	conversationId: string,
): Promise<ChatMessage[]> {
	const { rows } = await query(
		`SELECT *
		 FROM messages
		 WHERE conversation_id = $1
		 ORDER BY created_at ASC, id ASC`,
		[conversationId],
	);

	return rows.map(mapMessageRow);
}

export async function getUserHistories(
	currentUserId: string,
): Promise<ChatHistorySummary[]> {
	const { rows } = await query(
		`SELECT
			 c.id AS conversation_id,
			 CASE
				 WHEN c.user_one_id = $1 THEN c.user_two_id
				 ELSE c.user_one_id
			 END AS other_user_id,
			 m.content AS last_message,
			 c.last_message_at
		 FROM conversations c
		 LEFT JOIN messages m ON m.id = c.last_message_id
		 WHERE c.user_one_id = $1 OR c.user_two_id = $1
		 ORDER BY c.last_message_at DESC NULLS LAST, c.updated_at DESC`,
		[currentUserId],
	);

	return rows.map((row) => ({
		otherUsername: row.other_username,
		conversationId: row.conversation_id,
		otherUserId: row.other_user_id,
		lastMessage: row.last_message ?? null,
		lastMessageAt: row.last_message_at ?? null,
	}));
}
