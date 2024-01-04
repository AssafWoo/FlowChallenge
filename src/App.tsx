import "./App.css";
import PostsPage from "./pages/Posts/posts";
import Statistics from "./pages/Statistics/statistics";

/*
  List of overall things I would change:
    1. I might change the way the data is fetched. I might use a GraphQL API instead of REST because of the way the api is designed.
    2. I would Change the overall design & add toasts, modals, skeletons to improve user experience.
    3. I would create Zustand store to manage the state of the application, with different slices for different parts of the application.
    4. I would modular the components even more to make them more reusable, testable and maintainable.
    5. I would add Router to the application to make it more dynamic, also guards to protect the routes.
    6. I would change the current stracture of the post page and the statistics page, I would create a layout component and wrap the pages with it.
    7. I would create constants for design and components, such as color constants, common wrapper and boxes, breakpoints, etc.
    8. I would build dynamic page header to remove the need to create a header for each page.
    9. Use REM units for ALL stuff, like - font sizes and other sizes all across the application.

    Common styles would sit in the styles folder.
    Store would sit in the store folder.

    More specific comments are use appropiate places in the code with "Future" / "Exaplain" note to them.
    */

function App() {
  return (
    <>
      <PostsPage />
      <Statistics />
    </>
  );
}

export default App;
