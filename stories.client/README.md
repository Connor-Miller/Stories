# Stories Client

## Purpose of the Application

The **Stories Client** is a web application designed to allow users to create, share, and explore various family stories. It provides a user-friendly interface built with React and utilizes modern web technologies to ensure a smooth and responsive experience. The application integrates with a backend server to manage user authentication, story data, and other functionalities.

## Getting Started

To get the application up and running on your local machine, follow these steps:

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** (Node package manager, comes with Node.js)
- **.NET SDK** (for the backend server)

### Installation

1. **Clone the Repository**

   Open your terminal and run the following command to clone the repository:

   ```bash
   git clone <repository-url>
   cd stories.client
   ```

2. **Install Dependencies**

   Navigate to the `stories.client` directory and install the required dependencies:

   ```bash
   npm install
   ```

3. **Run the Application**

   To start both the client and the server concurrently, use the following command:

   ```bash
   npm run start
   ```

   This command will:
   - Start the Vite development server for the client.
   - Navigate to the `Stories.Server` directory and run the .NET server.

### Accessing the Application

Once the application is running, you can access it in your web browser at:

```
http://localhost:5173
```

## Dependencies

The application relies on several key dependencies, which are listed in the `package.json` file:

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides a fast development environment.
- **Mantine**: A React component library for building user interfaces with a modern design.
- **Firebase**: Used for authentication and real-time database functionalities.
- **React Router**: For handling routing within the application.
- **Tailwind CSS**: A utility-first CSS framework for styling the application.

### Development Dependencies

- **TypeScript**: A superset of JavaScript that adds static types.
- **ESLint**: A tool for identifying and fixing problems in JavaScript code.
- **PostCSS**: A tool for transforming CSS with JavaScript plugins.

## Color Scheme

The application uses a modern color scheme that enhances readability and user experience. The primary colors are defined in the `App.tsx` file and include:

- **Primary Color**: A light blue shade for buttons and highlights.
- **Secondary Color**: A light purple shade for secondary elements.
- **Tertiary Color**: A light green shade for accents.

### Example Color Palette

- **Primary**: `#f3f3f7`
- **Secondary**: `#f1eeff`
- **Tertiary**: `#ebfffb`

## Stylistic Details

- The application is designed to be responsive, ensuring a seamless experience across devices.
- The layout is structured using a combination of flexbox and grid systems to provide a clean and organized interface.
- Components are styled using Tailwind CSS, allowing for rapid prototyping and consistent design.

## Conclusion

The **Stories Client** is a powerful tool for storytelling, built with modern web technologies. By following the instructions above, you can set up the application locally and start exploring its features. For any issues or contributions, feel free to open an issue or pull request in the repository.
