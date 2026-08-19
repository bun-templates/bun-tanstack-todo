import { createServerFn } from "@tanstack/react-start";
import { sql } from "bun";
import z from "zod";

export interface Todo {
	id: number;
	title: string;
	completed: boolean;
	created_at?: Date | string;
}

async function ensureTodosTable() {
	try {
		await sql`
			CREATE TABLE IF NOT EXISTS todos (
				id SERIAL PRIMARY KEY,
				title TEXT NOT NULL,
				completed BOOLEAN NOT NULL DEFAULT false,
				created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			)
		`;
	} catch (error) {
		console.error("Error creating todos table:", error);
	}
}

export const getTodosFn = createServerFn({ method: "GET" }).handler(async () => {
	try {
		await ensureTodosTable();

		const result = await sql`SELECT * FROM todos ORDER BY id DESC`;
		return result;
	} catch (error) {
		console.error("Error fetching todos:", error);
		throw new Error("Failed to fetch todos");
	}
});

export const createTodoFn = createServerFn({ method: "POST" })
	.validator(z.object({ title: z.string().min(1).max(500) }))
	.handler(async ({ data }) => {
		try {
			const result = await sql`INSERT INTO todos (title) VALUES (${data.title}) RETURNING *`;
			if (!result || result.length === 0) {
				throw new Error("Failed to create todo");
			}
			return result[0];
		} catch (error) {
			console.error("Error creating todo:", error);
			throw new Error("Failed to create todo");
		}
	});

export const toggleTodoCompleteFn = createServerFn({ method: "POST" })
	.validator(z.object({ id: z.number().int().positive() }))
	.handler(async ({ data }) => {
		try {
			const result = await sql`UPDATE todos SET completed = NOT completed WHERE id = ${data.id} RETURNING *`;
			if (!result || result.length === 0) {
				throw new Error("Todo not found");
			}
			return result[0];
		} catch (error) {
			console.error("Error toggling todo:", error);
			throw new Error("Failed to toggle todo");
		}
	});

export const deleteTodoFn = createServerFn({ method: "POST" })
	.validator(z.object({ id: z.number().int().positive() }))
	.handler(async ({ data }) => {
		try {
			const result = await sql`DELETE FROM todos WHERE id = ${data.id} RETURNING id`;
			if (!result || result.length === 0) {
				throw new Error("Todo not found");
			}
			return { id: data.id };
		} catch (error) {
			console.error("Error deleting todo:", error);
			throw new Error("Failed to delete todo");
		}
	});
