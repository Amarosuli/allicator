import { z } from 'zod';

export const loginSchema = z.object({
	employeeId: z.string().trim().min(6, 'Employee Id is required, Minimal 6 Characters'),
	password: z.string().trim().min(8, 'Minimal password is 8 Characters')
});

export const engineFamilySchema = z.object({
	name: z.string().trim().min(2, 'Family name is required, Minimal 2 Characters'),
	description: z.string().trim().optional()
});

export const engineModelSchema = z.object({
	name: z.string().trim().min(2, 'Model name is required, Minimal 2 Characters'),
	description: z.string().trim().optional(),
	family_id: z.string().trim().min(1, 'Engine family is necessary')
});
