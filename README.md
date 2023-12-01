This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First
1. Set up your MongoDB database by providing the MONGODB_URL in the designated fields.

2. Define the SECRET_KEY for token generation.

3. Access the upload configuration in UploadThing. Provide values for NEXT_PUBLIC_UPLOAD_PRESET and NEXT_PUBLIC_CLOUD_NAME. Use the straightforward method to upload images, and feel free to customize it based on your specific requirements.

Second, copy file `example.env` and then change name into `.env.local`

Third, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Demonstrate

<video width="640" height="360" controls>
  <source src="./assets/demonstrate.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
