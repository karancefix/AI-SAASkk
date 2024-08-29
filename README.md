# GENIUS AI-SAAS

AI-SAAS is a full-stack Next.js application built with TypeScript that integrates various AI models from Hugging Face to provide content generation services, including text, code, music, video, and image generation. This project includes a frontend and backend, both developed using Next.js. It also integrates payment processing using Stripe, state management with Zustand, and several other modern technologies.

## Features

- **Text Generation**: A chatbot that completes texts and answers questions using Hugging Face models.
- **Code Generation**: Generates code snippets based on user input.
- **Music Generation**: Creates music tracks based on given parameters.
- **Video Generation**: Produces videos using AI.
- **Image Generation**: Generates images based on prompts.
- **Authentication**: User authentication and management using Clerk.
- **Payments**: Integrated Stripe for payment processing.
- **State Management**: Managed global state using Zustand.
- **Real-time Updates**: Utilized PusherJs for real-time functionalities.
- **Validation**: Used Zod for schema validation.
- **Database**: MongoDB with Mongoose for handling data storage and retrieval.
- **Deployment**: Deployed on Vercel.

## Technologies Used

- **Frontend & Backend**: Next.js, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **State Management**: Zustand
- **Database**: MongoDB, Mongoose
- **Authentication**: Clerk
- **AI Models**: Hugging Face, Replicate AI
- **Payment Processing**: Stripe
- **Real-time Features**: PusherJs
- **Validation**: Zod
- **Deployment**: Vercel
- **Additional Tools**: Firebase, Node.js

## Folder Structure

- **/app**: Contains the main application logic, including routing and pages.
- **/components**: Reusable UI components used throughout the application.
- **/hooks**: Custom React hooks for managing state and side effects.
- **/lib**: Utility functions and configurations.
- **/prisma**: Database schema and ORM configurations.
- **/public**: Static files like images, fonts, etc.
- **.env**: Environment variables for sensitive information.
- **.eslintc.json**: ESLint configuration for code linting.
- **/middleware.ts**: Middleware logic for the application.
- **next.config.mjs**: Next.js configuration file.
- **package.json**: Project metadata and dependencies.
- **tailwind.config.ts**: Configuration for Tailwind CSS.
- **tsconfig.json**: TypeScript configuration file.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Abdulbasit110/AI-SAAS.git
   ```
2. Navigate to the project directory:
   ```bash
   cd AI-SAAS
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the required environment variables for MongoDB, Stripe, Clerk, and any other services used.

5. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment

This project is deployed on Vercel. To deploy your own version:

1. Connect your repository to Vercel.
2. Configure your environment variables on Vercel.
3. Deploy the project.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
