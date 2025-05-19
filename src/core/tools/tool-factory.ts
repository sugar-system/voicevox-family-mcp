import type { ZodRawShape } from 'zod';
import type { ToolCallback } from '@modelcontextprotocol/sdk/server/mcp.js';

export interface IToolFactory<Args extends ZodRawShape> {
  name: string;
  description: string;
  schema: Args;
  handler: ToolCallback<Args>;
}

export class ToolFactory<Args extends ZodRawShape> implements IToolFactory<Args> {
  constructor(
    public name: string,
    public description: string,
    public schema: Args,
    public handler: ToolCallback<Args>,
  ) {}
}
