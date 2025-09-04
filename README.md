# Compare Best Brokers

## Goal
The goal of this project is to build a **responsive and visually appealing web application** that connects to a **WordPress REST API**.  
All content (posts, images, brokers, ACF fields) is managed in WordPress, so the admin can easily update data without touching the code.  
This way, the frontend always stays up to date, while the backend is simple to manage.

## Tech Stack
- **Frontend**: React (Create React App)  
- **Styling**: Material UI, CSS  
- **Backend / API**: WordPress REST API (custom posts, ACF, media)  
- **Other**: services, hooks, and components for clean project structure
- **Libraries used**:  
  - **Framer Motion** → animations and smooth transitions  
  - **React Router** → routing between pages  
  - **Axios** → API requests  
  - **React Google ReCAPTCHA v3** → spam protection for forms    

## How it works
1. React frontend handles user interactions.  
2. Data (brokers, posts, images, custom fields) is fetched from the WordPress REST API.  
3. The app organizes and displays this data with Material UI components and custom CSS.
4. A **search with autocomplete** feature lets users quickly find brokers or news posts:  
5. Forms are integrated with **Google Sheets** (to save submissions) and also send a **thank-you email** to the user.  
6. Responsive design ensures it works across desktop and mobile.  

## Project Structure
- **/services** → API requests (WordPress endpoints)  
- **/components** → reusable UI blocks  
- **/pages** → main app pages  
- **styles** → styled materialUI components
