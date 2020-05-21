<https://indiestats.gg/>

### An analytics app for the Super Smash Bros Ultimate competetive community.

indiestats is a web application that captures tournament data and reports analytics for the competitive eSport “Super Smash Bros”. The purpose of indiestats is to create a platform in which players can track their own progress against other rivals in the SoCal region and provide analytics to a community that would otherwise be left to dig through hundreds of online brackets.

The application is backed by a MongoDB database and Node express server all running on an EC2 in AWS. Data collection is a semi-automated process that pulls bracket documents from tournament hosting APIs. That data is then available as aggregations via an express API which also serves the frontend. The app is server side rendered, crossbrowser compatible and fully responsive. Bundling and tooling is managed through loaders and plugins in Webpack and Babel. The frontend is built using React following a containers & components architecture and leveraging powerful libraries like React Router and Ramda. The styling is primarily done using Styled Components and the layouts are designed using CSS features like Grid, Flexbox, and Media queries.
