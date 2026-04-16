export const openApiDocument = {
	openapi: "3.0.3",
	info: {
		title: "NodeJS Learning API",
		version: "1.0.0",
		description: "OpenAPI documentation for the current Express endpoints.",
	},
	servers: [
		{
			url: "/",
			description: "Current server",
		},
	],
	tags: [
		{
			name: "Health",
		},
		{
			name: "Auth",
		},
		{
			name: "Users",
		},
		{
			name: "Chat",
		},
		{
			name: "Files",
		},
	],
	components: {
		securitySchemes: {
			bearerAuth: {
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
			},
		},
		schemas: {
			HealthResponse: {
				type: "object",
				properties: {
					health: {
						type: "boolean",
						example: true,
					},
				},
			},
			ErrorResponse: {
				type: "object",
				properties: {
					error: {
						type: "string",
						example: "Internal Server Error",
					},
					message: {
						type: "string",
						example: "Something went wrong",
						nullable: true,
					},
				},
			},
			User: {
				type: "object",
				properties: {
					id: {
						type: "string",
						format: "uuid",
						example: "2db7b37c-5901-447b-9e1d-5d5bb12f0c41",
					},
					username: {
						type: "string",
						example: "john_doe",
					},
					email: {
						type: "string",
						format: "email",
						example: "john@example.com",
					},
				},
			},
			RegisterRequest: {
				type: "object",
				required: ["username", "email", "password"],
				properties: {
					username: {
						type: "string",
						example: "john_doe",
					},
					email: {
						type: "string",
						format: "email",
						example: "john@example.com",
					},
					password: {
						type: "string",
						format: "password",
						example: "secret123",
					},
				},
			},
			LoginRequest: {
				type: "object",
				required: ["identifier", "password"],
				properties: {
					identifier: {
						type: "string",
						example: "john@example.com",
					},
					password: {
						type: "string",
						format: "password",
						example: "secret123",
					},
				},
			},
			LoginResponse: {
				type: "object",
				properties: {
					user: {
						$ref: "#/components/schemas/User",
					},
					accessToken: {
						type: "string",
						example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
					},
					refreshToken: {
						type: "string",
						example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
					},
				},
			},
			ChatMessage: {
				type: "object",
				properties: {
					id: {
						type: "string",
						format: "uuid",
						example: "7d4f9578-3d63-4f56-a18b-0cfce03bdad3",
					},
					conversationId: {
						type: "string",
						format: "uuid",
						example: "9c26dc85-2044-4ebe-8455-a77652ecfe8f",
					},
					senderId: {
						type: "string",
						format: "uuid",
						example: "2db7b37c-5901-447b-9e1d-5d5bb12f0c41",
					},
					receiverId: {
						type: "string",
						format: "uuid",
						example: "5d28db85-f3d5-4627-bf3f-e2d6cff3450a",
					},
					content: {
						type: "string",
						example: "Hello from websocket chat",
					},
					createdAt: {
						type: "string",
						format: "date-time",
						example: "2026-04-16T08:30:00.000Z",
					},
				},
			},
			ChatHistorySummary: {
				type: "object",
				properties: {
					conversationId: {
						type: "string",
						format: "uuid",
						example: "9c26dc85-2044-4ebe-8455-a77652ecfe8f",
					},
					otherUserId: {
						type: "string",
						format: "uuid",
						example: "5d28db85-f3d5-4627-bf3f-e2d6cff3450a",
					},
					lastMessage: {
						type: "string",
						nullable: true,
						example: "Hello from websocket chat",
					},
					lastMessageAt: {
						type: "string",
						format: "date-time",
						nullable: true,
						example: "2026-04-16T08:30:00.000Z",
					},
				},
			},
			ChatMessagesResponse: {
				type: "object",
				properties: {
					data: {
						type: "array",
						items: {
							$ref: "#/components/schemas/ChatMessage",
						},
					},
				},
			},
			ChatHistoriesResponse: {
				type: "object",
				properties: {
					data: {
						type: "array",
						items: {
							$ref: "#/components/schemas/ChatHistorySummary",
						},
					},
				},
			},
			UploadResponse: {
				type: "object",
				properties: {
					message: {
						type: "string",
						example: "Upload successful",
					},
					file: {
						type: "string",
						example: "img-1710000000000.png",
					},
				},
			},
		},
	},
	paths: {
		"/": {
			get: {
				tags: ["Health"],
				summary: "Health check",
				responses: {
					"200": {
						description: "Service is healthy",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/HealthResponse",
								},
							},
						},
					},
				},
			},
		},
		"/api/register": {
			post: {
				tags: ["Auth"],
				summary: "Register a new user",
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/RegisterRequest",
							},
						},
					},
				},
				responses: {
					"201": {
						description: "User created",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/User",
								},
							},
						},
					},
					"400": {
						description: "Missing required fields",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/ErrorResponse",
								},
							},
						},
					},
					"409": {
						description: "Email or username already exists",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/ErrorResponse",
								},
							},
						},
					},
				},
			},
		},
		"/api/login": {
			post: {
				tags: ["Auth"],
				summary: "Log in with username or email",
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/LoginRequest",
							},
						},
					},
				},
				responses: {
					"200": {
						description: "Authenticated successfully",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/LoginResponse",
								},
							},
						},
					},
					"400": {
						description: "Missing required fields",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/ErrorResponse",
								},
							},
						},
					},
					"401": {
						description: "Invalid credentials",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/ErrorResponse",
								},
							},
						},
					},
				},
			},
		},
		"/api/users": {
			get: {
				tags: ["Users"],
				summary: "Get all users",
				security: [{ bearerAuth: [] }],
				responses: {
					"200": {
						description: "List of users",
						content: {
							"application/json": {
								schema: {
									type: "array",
									items: {
										$ref: "#/components/schemas/User",
									},
								},
							},
						},
					},
					"401": {
						description: "Unauthorized",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/ErrorResponse",
								},
							},
						},
					},
				},
			},
		},
		"/api/user/{id}": {
			get: {
				tags: ["Users"],
				summary: "Get a single user by id",
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						name: "id",
						in: "path",
						required: true,
						schema: {
							type: "string",
							format: "uuid",
						},
					},
				],
				responses: {
					"200": {
						description: "User found",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/User",
								},
							},
						},
					},
					"400": {
						description: "Invalid user id",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/ErrorResponse",
								},
							},
						},
					},
					"401": {
						description: "Unauthorized",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/ErrorResponse",
								},
							},
						},
					},
					"404": {
						description: "User not found",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/ErrorResponse",
								},
							},
						},
					},
				},
			},
		},
		"/api/chat/histories": {
			get: {
				tags: ["Chat"],
				summary: "Get chat histories for the current user",
				security: [{ bearerAuth: [] }],
				responses: {
					"200": {
						description: "Chat histories fetched successfully",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/ChatHistoriesResponse",
								},
							},
						},
					},
					"401": {
						description: "Unauthorized",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/ErrorResponse",
								},
							},
						},
					},
					"500": {
						description: "Internal server error",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/ErrorResponse",
								},
							},
						},
					},
				},
			},
		},
		"/api/chat/{userId}/messages": {
			get: {
				tags: ["Chat"],
				summary: "Get message history with another user",
				security: [{ bearerAuth: [] }],
				parameters: [
					{
						name: "userId",
						in: "path",
						required: true,
						schema: {
							type: "string",
							format: "uuid",
						},
						description: "The other user's id",
					},
				],
				responses: {
					"200": {
						description: "Messages fetched successfully",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/ChatMessagesResponse",
								},
							},
						},
					},
					"400": {
						description: "Invalid user id",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/ErrorResponse",
								},
							},
						},
					},
					"401": {
						description: "Unauthorized",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/ErrorResponse",
								},
							},
						},
					},
					"404": {
						description: "User not found",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/ErrorResponse",
								},
							},
						},
					},
					"500": {
						description: "Internal server error",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/ErrorResponse",
								},
							},
						},
					},
				},
			},
		},
		"/api/upload": {
			post: {
				tags: ["Files"],
				summary: "Upload a file stream",
				description:
					"This endpoint currently streams the raw request body directly to a PNG file on disk.",
				requestBody: {
					required: true,
					content: {
						"application/octet-stream": {
							schema: {
								type: "string",
								format: "binary",
							},
						},
					},
				},
				responses: {
					"201": {
						description: "Upload completed",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/UploadResponse",
								},
							},
						},
					},
					"500": {
						description: "Upload failed",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/ErrorResponse",
								},
							},
						},
					},
				},
			},
		},
	},
} as const;
