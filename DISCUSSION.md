# Discussion

Hello! Thank you for considering me for this opportunity.

## Process

The first step I took was to review the application and development environment. I am a big proponent of test driven development (TDD), so my first commits involved installing `vitest` and `react-testing-library`.

Next, I took a look at the application code. It was written as though it was a classic client-side rendered single page application. Next.js and the app router API allow for a variety of rendering options, including server side rendering. Next.js does not recommend using the `"use client"` directive in a `page.tsx` file. Instead, you should push the client components to the "leaves" of your component tree.

I created several client components (any component that uses hooks, specifically) and imported those into the `page.tsx` file. I started with the `SearchTerm` component, which will update the URL with a search query parameter. Because the search input and the search results are separate components, it is more simple to use URL to manage application state. The `SearchResults` component will listen to the URL params, and make a fetch request when the query changes.

The `Header` component is also a client component due to a small amount of client side javascript required to manage the mobile collapsible menu experience.

The application design uses a mobile first approach, and was intentionally kept minimalistic and simple.

## If I had more time

To better prepare this application for a true production ready environment, I would have performed he following:
- Added pagination for the API query. Assuming there are thousands of records, rendering _all_ of them on the UI could be extremely process intensive (and possibly even crash the browser!). The API would need to support pagination using additional URL query parameters, such as number of records to return and the offset. The API response would also need to inform the browser how many records are available, and which ones are being returned.
- Use [Tanstack Query](https://tanstack.com/query/latest) to manage server state on the UI. This library is fantastic at managing API requests, and is compatible with SSR and Next. You can fetch the initial data on the RSC, and seed the query cache so you can deliver a fully rendered experience to the user from the initial request, versus the way it works now where the HTML table is empty and requires the client to make the API call to fetch data and render the table component.
- Use [mock-service-worker](https://mswjs.io/) to improve mocking APi requests for unit testing. Mocking the fetch object isn't very scalable with a more complex application, and MSW allows you to test your API configuration (especailly if you're using a library like axios).
- Use [Playwrite](https://playwright.dev/) for end-to-end (e2e) testing. While the application is unit tested, a full-stack solution for true e2e testing is crucial for any production CI/CD pipeline to prevent incidental regressions that can negatively impact the user experience.
- Debounce the network requests. Currently, the application will make a fetch request with each key press. This can become incredibly resource intensive on the API. I would debounce the network calls so the request is only made once the user has stopped typing their query.
- Caching the responses. This can be done several different ways. The Tanstack Query library can cache the results on the front-end, but you can also cache certain responses from the API. This can reduce not only the time it takes for a request to resolve, but reduce the impact to the server.