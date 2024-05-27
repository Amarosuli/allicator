# Allicator

An application for ...

## Running Project

Since Bun is officialy available for Windows, we use Bun as the replacement JavaScript runtime for the project. You can access the Bun documentation [`here`](https://bun.sh/)  
Once you've installed Bun, navigate to your project directory, create .env file, and add the following line:

```env
PUBLIC_PB_URL="https://allicator.pockethost.io"
```

Then, run the commands below:

```bash
# install the dependencies
bun install

# running the development server
bun run dev

# or start the server and open the app in a new browser tab
bun run dev -- --open
```

## Runtime

- Nodejs v22.0.0
- Bun v1.1.10

## Dependencies

- [`Sveltekit 2.x.x`](https://kit.svelte.dev/)
- [`Shadcn-svelte`](https://www.shadcn-svelte.com/) (UI Component), this UI component use TailwindCSS
- [`Svelte-headless-table`](https://svelte-headless-table.bryanmylee.com/), this is library for data table
- [`lucide-svelte`](https://lucide.dev/guide/packages/lucide-svelte) (Icon)
- [`sveltekit-superforms`](https://superforms.rocks/) (Handling form)
- [`zod`](https://zod.dev/) TypeScript schema validation

## Backend

- [`Pocketbase`](https://pocketbase.io/)
