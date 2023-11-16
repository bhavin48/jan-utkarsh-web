Recommended VS Code Extensions:

1. Name: Code Spell Checker
   Id: streetsidesoftware.code-spell-checker
   Description: Spelling checker for source code
   Version: 2.20.5
   Publisher: Street Side Software
   VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker

2. Name: Prettier - Code formatter
   Id: esbenp.prettier-vscode
   Description: Code formatter using prettier
   Version: 10.1.0
   Publisher: Prettier
   VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

3. Name: Material Icon Theme
   Id: PKief.material-icon-theme
   Description: Material Design Icons for Visual Studio Code
   Version: 4.29.0
   Publisher: Philipp Kief
   VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme

4. Name: Auto Import
   Id: steoates.autoimport
   Description: Automatically finds, parses and provides code actions and code completion for all available imports. Works with Typescript and TSX
   Version: 1.5.4
   Publisher: steoates
   VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=steoates.autoimport

5. Name: Auto Rename Tag
   Id: formulahendry.auto-rename-tag
   Description: Auto rename paired HTML/XML tag
   Version: 0.1.10
   Publisher: Jun Han
   VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag

Naming Conventions:

1. **Component Names:**

   - Use PascalCase for component names.
   - Choose descriptive and meaningful names that convey the purpose of the component.
   - Suffix common component types to make them distinguishable, such as `Button`, `Card`, `Header`, etc.

2. **File Names:**

   - Use PascalCase for file names that correspond to React components.
   - Use lowercase for other type of file names
   - Match the component name with the file name. For example, `MyComponent.js` for a component named `MyComponent`.

3. **Folder Structure:**

   - Organize your components into meaningful folders for better organization.
   - Use lowercase for folder names and separate words with hyphens or underscores.
   - For example: `components`, `containers`, `utils`, `styles`, etc.

4. **Props:**

   - Use camelCase for prop names.
   - Document the expected props for each component in the README.
   - Provide default values if applicable and explain their purpose.

5. **State Variables:**

   - Use camelCase for state variable names.
   - Clearly explain the role of each state variable if you're using class components or hooks.

6. **Event Handlers:**

   - Use the `handle` prefix for event handler function names.
   - Be descriptive about what the handler does. For instance, `handleClick`, `handleChange`, etc.

7. **CSS Classes and Styles:**

   - Use lowercase and hyphen-separated words for CSS class names.
   - Consider using a CSS naming methodology like BEM (Block Element Modifier) or CSS Modules.

8. **Constants:**

   - Use uppercase for constants and separate words with underscores.
   - Document the purpose of each constant and where it's used.

9. **Enums and Enum-Like Objects:**

   - Use uppercase for enum values and separate words with underscores.
   - Explain the purpose and usage of enums in the project.

10. **Utility Functions:**

    - Use camelCase for utility function names.
    - Mention the purpose and usage of each utility function.

11. **Comments and Documentation:**

    - Comment your code to explain complex logic or any non-obvious decisions.
    - Use JSDoc comments to document function parameters, return values, and descriptions.

    for TS:

12. **Type and Interface Names:**

    - Use PascalCase for type and interface names.
    - Make type names descriptive and indicative of their purpose.
    - Prefix type names with `I` for interfaces, like `IUser`, and use regular PascalCase for other types.

13. **Generic Type Parameters:**

    - Use concise and meaningful single-letter names for generic type parameters.
    - Use `T` for a generic type, `K` for a key, `V` for a value, etc.

14. **Prop Types and Default Props:**

    - Describe prop types using TypeScript's type annotations.
    - Include default values as part of your prop interfaces.

15. **Enums:**

    - When using enums in TypeScript, follow the same conventions mentioned earlier for enum value naming.
    - Use uppercase for enum values and separate words with underscores.

16. **Union Types and Intersection Types:**

    - Name union types with a clear indication of the types involved, like `stringOrNumber`.
    - Similarly, name intersection types descriptively, like `Props & DispatchProps`.

17. **Type Assertion:**

    - When using type assertions, indicate that in the variable or function name, such as `someVariable as SomeType`.

18. **Type Utilities:**

    - If you're using TypeScript utility types (e.g., `Partial`, `Pick`, `Record`), name your variables and types clearly.

19. **Type Annotations in Functions:**

    - Use TypeScript type annotations for function parameters and return types.
    - Clearly indicate optional parameters using the `?` modifier.

20. **Type-Related Prefixes:**

    - Use `is` as a prefix for functions that return boolean values indicating a type check, like `isString`.

21. **React State and Props Interfaces:**

    - Define interfaces for React component state and props to ensure proper type checking.

22. **Type Aliases:**
    - Use `type` to define custom type aliases for complex or reusable type combinations.

Adding a New Page: Step-by-Step Guide:...

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
