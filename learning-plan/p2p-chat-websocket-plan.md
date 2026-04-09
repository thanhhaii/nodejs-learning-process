# P2P Chat WebSocket Implementation Plan

## Goal
Implement a minimal 1-to-1 chat feature in this Node.js project using WebSocket for real-time communication and Postgres for message storage.

The feature should:
- allow authenticated users to connect to a WebSocket server
- allow one user to send a direct message to another user
- store each message in the database
- deliver the message in real time if the receiver is online
- allow users to fetch chat history through HTTP API

This project should follow the current repo structure:

`routes -> controllers -> services -> repositories`

---

## Phase 1: Understand the existing backend structure

Before building chat, review the current project flow.

Focus on these existing parts:
- `src/server.ts`
- `src/app.ts`
- `src/routes/`
- `src/controllers/`
- `src/services/`
- `src/config/postgres-db.ts`
- `src/middlewares/auth.middleware.ts`
- `src/services/jwt.service.ts`

What to understand:
- how the Express server starts
- how JWT auth currently works
- how Postgres queries are executed
- how routes/controllers/services are currently organized

Expected outcome:
- you know where to attach the WebSocket server
- you know how to reuse JWT verification
- you know where chat logic should live

---

## Phase 2: Define the MVP scope clearly

Only implement MVP direct chat.

In scope:
- direct user-to-user chat
- JWT-authenticated WebSocket connection
- message persistence in Postgres
- fetch conversation history via REST API

Out of scope:
- group chat
- unread counts
- typing indicators
- online presence UI
- read receipts
- pagination
- message editing/deleting
- multiple active sockets per user

Expected behavior:
- one authenticated user connects to WebSocket
- one authenticated user sends message to another user
- server validates the request
- server saves message to DB
- server pushes message to receiver if receiver is online
- sender can later fetch message history

---

## Phase 3: Choose the chat architecture

Use the current architecture consistently.

Recommended structure:
- `src/routes/chat.routes.ts`
- `src/controllers/chat.controller.ts`
- `src/services/chat.service.ts`
- `src/repositories/chat.repository.ts`
- `src/types/chat/`

Responsibilities:
- routes: define endpoints
- controllers: handle request/response only
- services: business logic, socket event flow, validation orchestration
- repositories: SQL queries only
- types: message models and socket payload contracts

Do not place SQL directly in controllers.

Do not place WebSocket business rules directly in route files.

Expected outcome:
- chat code is isolated and consistent with the rest of the repo

---

## Phase 4: Design the database schema

Create a migration for a `messages` table.

Recommended columns:
- `id`
- `sender_id`
- `receiver_id`
- `content`
- `created_at`

Suggested rules:
- `sender_id` references `users.id`
- `receiver_id` references `users.id`
- `content` is required text
- `created_at` defaults to current timestamp

MVP decision:
- do not create a separate `conversations` table
- define a conversation by two user IDs
- query history using both directions:
  - sender -> receiver
  - receiver -> sender

Expected outcome:
- every direct message can be stored and retrieved reliably

---

## Phase 5: Define TypeScript contracts first

Before implementing logic, define the types you will need.

Suggested domain types:
- `ChatMessage`
- `CreateMessageInput`
- `ChatHistoryItem`
- `SocketAuthUser`
- `SendMessageEvent`
- `MessageSentEvent`
- `MessageReceivedEvent`
- `SocketErrorEvent`

Recommended message shape:
- `id`
- `senderId`
- `receiverId`
- `content`
- `createdAt`

Important rule:
- never trust `senderId` from the client payload
- always derive sender identity from the authenticated token / socket context

Expected outcome:
- service and repository contracts are clear before implementation

---

## Phase 6: Add WebSocket support to the server

Attach a WebSocket server to the existing HTTP server.

Implementation direction:
- update server bootstrap so Express and WebSocket share the same server
- do not run a separate chat server for MVP

Authentication rule:
- authenticate the socket connection using the existing JWT access token logic
- reject the connection if token is invalid or expired

Recommended approach:
- authenticate during connection setup, not after message sending starts

Why:
- each socket should already represent a known authenticated user
- it keeps message handlers simpler and safer

Expected outcome:
- every active socket is associated with exactly one authenticated user

---

## Phase 7: Manage connected users in memory

Create a lightweight connection registry in the chat service layer.

Recommended behavior:
- map `userId -> socket`
- when a user reconnects, replace the old socket with the new one
- when a socket disconnects, remove it from the registry
- for MVP, allow only one active connection per user

Important note:
- this in-memory map is only for live delivery
- Postgres remains the source of truth for persisted chat data

Expected outcome:
- the server can determine whether a receiver is online

---

## Phase 8: Define the socket event flow

Use a small, explicit event model.

Client to server:
- `send_message`

Payload:
- `receiverId`
- `content`

Server-side validation:
- sender must be authenticated
- `receiverId` must be valid
- receiver must exist
- content must not be empty
- content must not be only whitespace
- sender cannot message self in MVP

Server flow for `send_message`:
1. identify sender from socket auth context
2. validate input
3. persist message to database
4. acknowledge success to sender
5. if receiver is online, push message to receiver

Server to sender:
- `message_sent`

Server to receiver:
- `message_received`

Server error event:
- `error`

Important rule:
- persist first, emit second
- database save must happen before live delivery

Expected outcome:
- real-time behavior stays consistent with persisted data

---

## Phase 9: Build the repository layer

The repository should contain database access only.

Repository responsibilities:
- insert a new message
- fetch message history between two users
- optionally check whether a receiver user exists

History query requirement:
- return messages where:
  - sender is current user and receiver is target user
  - or sender is target user and receiver is current user

Sort order:
- ascending by `created_at`

Expected outcome:
- SQL logic is isolated and reusable

---

## Phase 10: Build the service layer

The service should coordinate business logic.

Service responsibilities:
- validate send-message input
- check receiver existence
- call repository to save message
- manage online-user socket lookup
- emit socket events
- provide history retrieval logic for controller usage

Important rules:
- services should not depend on Express request/response objects
- services should not return password hashes or internal DB-only fields
- services should centralize behavior so controllers stay thin

Expected outcome:
- chat behavior is implemented in one logical place

---

## Phase 11: Add REST API for message history

Add an authenticated HTTP endpoint for chat history.

Recommended endpoint:
- `GET /api/chat/:userId/messages`

Behavior:
- current authenticated user comes from auth middleware
- `:userId` is the other participant
- return messages between the two users
- reject invalid user IDs
- return chronological history

Controller responsibilities:
- parse and validate route param
- call service
- map success/error to HTTP response

Expected outcome:
- users can reload previous messages from the database

---

## Phase 12: Update API documentation

Update Swagger/OpenAPI docs to include the new chat API.

Add:
- chat tag
- history endpoint
- response schema for chat message items
- possible error responses

Also document WebSocket behavior in markdown comments or project docs:
- how clients authenticate
- supported socket events
- expected payload shape
- success/error event examples

Expected outcome:
- future you can test and maintain the feature more easily

---

## Phase 13: Validation and security rules

Enforce these rules consistently:
- only authenticated users can access chat APIs
- only authenticated sockets can send messages
- reject invalid or expired JWTs
- reject self-message attempts
- reject empty message content
- reject nonexistent receiver users
- never expose password hashes
- never trust sender identity from client payload

Expected outcome:
- the MVP is simple but not sloppy

---

## Phase 14: Manual test scenarios

After implementation, manually verify these scenarios.

### Auth and connection
- register 2 users
- login both users
- connect both to WebSocket using valid access tokens
- verify invalid token connection is rejected

### Live messaging
- user A sends message to user B
- verify message is stored in Postgres
- verify user B receives real-time event
- verify user A receives success acknowledgement

### Offline receiver
- disconnect user B
- user A sends a message
- verify message is still stored
- verify no crash happens
- reconnect user B and fetch history through API

### History API
- request `GET /api/chat/:userId/messages`
- verify both sent and received messages are returned
- verify result order is chronological

### Validation failures
- invalid target user ID
- nonexistent receiver
- empty content
- whitespace-only content
- self-message attempt
- invalid JWT

Expected outcome:
- the full MVP behavior is proven manually

---

## Phase 15: Definition of done

The feature is done when:
- authenticated users can connect through WebSocket
- one user can send direct messages to another
- each message is stored in Postgres
- receiver gets real-time delivery when online
- chat history can be loaded via HTTP endpoint
- validation errors are handled cleanly
- Swagger is updated for the REST portion
- code structure follows routes -> controllers -> services -> repositories

---

## Suggested implementation order

Build in this order:
1. message table migration
2. chat types
3. repository functions
4. service logic
5. HTTP history endpoint
6. WebSocket server bootstrap
7. socket auth
8. send/receive event flow
9. Swagger update
10. manual testing

This order keeps persistence and contracts stable before real-time behavior.

---

## Notes for myself

Keep the MVP small.
Do not try to solve every messaging problem in the first version.
The learning goal is to understand:
- how WebSocket integrates with Express
- how JWT auth can protect real-time connections
- how to separate chat logic by layers
- how persistence and live delivery work together
