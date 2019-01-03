# devConnector
A social networking site for developers.

The backend of Developer Connector is Express/MongoDB. The frontend is React/Redux. The theme uses bootstrap. <br />
[https://dev-connector-v1.herokuapp.com](https://dev-connector-v1.herokuapp.com)

## Routes
All API endpoints for the application are managed in three files: posts.js, profile.js, users.js
Bcrypt is used for password hashing
Passport and JWT are used to send/authenticate user web tokens

## Models
The schema is kept incredibly simple with only 3 models: Post, Profile, and User
This allows for simple state management and straightforward queries

## Frontend Components
All components are named according to their function. To clarify, below is each folder name and its purpose:
add-credentials - for adding experience or education to user profile
auth - Login and Register components
common - Input, TextArea components that are commonly used, also definition of private route that is used in App.js
create-profile - component for creating new profile
dashboard - all dashboard components
edit-profile - editing user profile
layout - Footer, Landing, and Navbar component
not-found - displayed when page not found
post - components for displaying individual post
posts - components for displaying all posts
profile - components used on user profile page
profiles - components for displaying all user profiles


## State Management
There are four slices of state: 
```
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer
});
```

<kbd>![Alt text](/images/dev-connector-home-page.png?s=50)</kbd>
<kbd>![Alt text](/images/dev-connector-dashboard.png?s=50)</kbd>
<kbd>![Alt text](/images/dev-connector-profile-view.png?s=50)</kbd>
