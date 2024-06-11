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

export const engineModuleSchema = z.object({
	name: z.string().trim().min(2, 'Module Name is required, Minimal 2 Characters'),
	description: z.string().trim().optional(),
	parent_module: z.string().trim().optional()
});

export const unitSchema = z.object({
	name: z.string().trim().min(2, 'Unit name is required, Minimal 2 Characters'),
	description: z.string().trim().optional()
});

export const projectTypeSchema = z.object({
	name: z.string().trim().min(2, 'Project name is required, Minimal 2 Characters'),
	code: z.string().trim().min(2, 'Project code is required, Minimal 2 Characters'),
	description: z.string().trim().optional()
});

export const userRoleSchema = z.object({
	name: z.string().trim().min(2, 'Role name is required, Minimal 2 Characters').toUpperCase(),
	description: z.string().optional()
});

export const userSchema = z.object({
	username: z.number().min(6, 'Username or Employee ID is required, Minimal 6 Characters'),
	email: z.string().email().optional(),
	name: z.string().trim().min(2, 'name is required, Minimal 2 Characters'),
	avatar: z.string().trim().optional(),
	unit_id: z.string().trim().min(2, 'Unit is required, Minimal 2 Characters'),
	role_id: z.string().trim().min(2, 'Role is required, Minimal 2 Characters')
});

export const customerSchema = z.object({
	name: z.string().trim().min(2, 'name is required, Minimal 2 Characters'),
	description: z.string().optional(),
	logo: z
		.instanceof(File, { message: 'Please upload a file.' })
		.refine((f) => f.size < 100_000, 'Max 100 kB upload size.')
		.optional(),
	code_IATA: z.string().optional(),
	code_ICAO: z.string().optional()
});
