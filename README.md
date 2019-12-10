# Online Movie Store

Name for the Website
>Movie Fox (https://movie-store-simonwang210.c9users.io/movies/page/1)

## Project Description 

• Abstract
>Movie Fox is an online movie store which provides lots of different kinds of movies for customers to view and purchase online. >For each movie there are details description information, prices and trailers. Customers can view all the movies or by >different categories and search their favorite movies by name with the search bar. Customers can do these whether they log in >or not (Guest mode if they do not log in). After logging in, customers can leave and edit comments for any movies and everyone >can see them. They can also add desired movies to the shopping cart. Customers can see the prices details of selected movies >for their order in the cart and proceed to check out. They can view their purchase history in their profile pages and edit >their profiles here. The system administrator can log in by static username and add new movies, edit any movies’ details and >delete customers’ comments if needed.

• Homepage
>Customers first visit our welcome page which contains dynamic movie images recommended and a search bar used for searching >desired movies by name. When customers visit the homepage, they can find the header easily on the top which contains buttons >including return home, movie categories, shopping cart, log in and sign up. There is a search bar on the right below the >header which is the same use as the one on the welcome page and below there is the movie list.

• Movie list
>The movie list on the homepage contains all the movies available and shows their images. Customers can view their details by >clicking these images. The list can dynamically change the contents and adjust the width of the window when customers search >movies or click to view movies belonging to a certain category.

• Log in and sign up
>Customers can view all the contents of our website without logging in (the Guest mode) or logging in as a user. When customers >click the log in or sign up button on the header which is easily accessible, they come to the log in or sign up page. >Customers need to provide username(unique), password, first name, last name, email(unique), Avatar and introduction(optional). >All fields are validated to protect the privacy of customers and the server, especially the password. Customers can log out by >clicking the same button which will show “log out” then. The system administrator can log in by the static username “admin” >and corresponding password.

• Search
>Customers can input the whole or part of a movie’s name to view the list of all corresponding movies available now in the >store and other irrelevant movies will be hidden.

• Movie details
>When customers click a movie’s image on the homepage they will visit the movie details page. There is the description, the >price and the trailer of the movie. Customers can add desired movie to the shopping cart here by click the “add to cart” >button and leave and edit comments below of any movies. Everyone can view the comments here.

• Shopping cart
>Customers can not access the shopping cart in Guest mode. After they log in, they can access it by clicking the shopping cart >button on the right of the header on any page. They can view each item in their shopping carts which is shown as a row and on >the right side there is a “remove” button used for removing this item from the shopping cart if customers want. Customers can >click the “check out” button if there is at least one item in the cart or click the “cancel” button to return to view and >select more movies.

• Profile page
>Customers can view their profiles after logging in by clicking the mode button on the right side of the header. On the left vside there is the image and some basic information of the customer and on the right side there is the purchase history of the >customer. Customers can click the “edit” button to edit their profiles and click the “check out” button to buy movies in their >shopping carts now.

• Admin mode (add/edit/delete movie or edit/delete comments)
>When the administrator logs in as the static username “admin”, he can see the “add new movie” button on the homepage and the >“edit” and “delete” button on the movie details page. The administrator can provide the name, price, image, trailer, category >and description of a movie and click “submit” to add a new movie to the website. And he can edit all the information of all >movies available now in the store and delete customers’ comments if needed.

• Database Design 
>MongoDB Schema
![image](https://github.com/SHWsimon/Online_Movie_Store/blob/master/pic/Screen%20Shot%202019-12-09%20at%2011.22.48%20AM.png)

• Languages/frameworks used for implementation
  ><ul>
  ><li>Client-side</li>
  >  <p>JavaScript/CSS/HTML/EJS</p>
  ><li>Server-side</li>
  >  <p>Node.js</p>
  ><li>Database</li>
  >  <p>MongoDB</p>
  ><li>IDE</li>
  >  <p>Cloud9</p>
  ></ul>

• Screenshots for main functionalities 

  >• Homepage
  ![image](https://github.com/SHWsimon/Online_Movie_Store/blob/master/pic/Screen%20Shot%202019-12-09%20at%205.14.15%20PM.png)
  
  >• Log in and sign up
  ![image](https://github.com/SHWsimon/Online_Movie_Store/blob/master/pic/Screen%20Shot%202019-12-09%20at%205.14.35%20PM.png)
  
  >• Movie details
  ![image](https://github.com/SHWsimon/Online_Movie_Store/blob/master/pic/Screen%20Shot%202019-12-09%20at%205.14.57%20PM.png)
  
  >• Shopping cart
  ![image](https://github.com/SHWsimon/Online_Movie_Store/blob/master/pic/Screen%20Shot%202019-12-09%20at%205.15.13%20PM.png) 
  
  >• Profile page (include shop history)
  ![image](https://github.com/SHWsimon/Online_Movie_Store/blob/master/pic/Screen%20Shot%202019-12-09%20at%205.15.27%20PM.png)
  
  >• Add new movie
  ![image](https://github.com/SHWsimon/Online_Movie_Store/blob/master/pic/Screen%20Shot%202019-12-09%20at%205.15.40%20PM.png)
  
 
