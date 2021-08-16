# MOVIO

Movio is our first attempt at building a full-stack website. It is a website designed to allow the user to search up movies and add them to a watchlist. From the watchlist, the user can perform basic CRUD. Information about the movie is gathered through the usage of various apis to in order to display a variety of data including basic information such as the release date and box office earnings, links to associated streaming sites, and a list of recommended titles.

## Contents:

-  [Technologies Used](#Technologies-Used)
-  [Existing Features](#Existing-Features)
-  [Planned Features](#Planned-Features)
-  [Challenges](#Challenges)
-  [Lessons Learned](#Lessons-Learned)
-  [Wireframes](#Wireframes)
-  [Screenshots](#Screenshots)

## Technologies Used
[Details](#Details)
- Express
- Node.js
- Axios
- HTML
- CSS
- EJS
- Bootstrap
- Dotenv
- Mongoose
- Mongodb
- MVC 
- REST
- Git/Github
- APIS
    - OMDB
    - Youtube
    - Watchmode
    - Tastedive


## Existing Features
- [Search for movie](#Homepage)
- [Store and delete movies](#Watchlist)
- [View movie details](#Movie-Details)
    - Watch movie trailer
    - See available streaming sites
    - See recommnedations based on movie

## Planned Features
- User functionality through Express Sessions
    - Login and signup pages
    - User reviews for movies
    - Share movies
- About us page
- Search by genre/directors/etc
- Additional styling on the movie details page
- Adjust CSS for multiple screen sizes


## Challenges
A major headache we had during this project was dealing with the struggles of API limitations. While we began with the OMDB Api for simplicities sake, we found that it did not have a wide variety of functionality. It also has several issues such as not being able to search some titles (e.g. Pixar's Up) because of returned interal errors. It also occasionally gave back titles that were either not movies, or titles that were just a little bit sketchy. When dealing with the Watchmode API, we found that in order to get from a title search to the name of the streaming service, it required a grand total of three separate API calls, coming from a free API key with limited calls. We circumvented this issue where we could by storing the information locally where possible, but this remained an issue.

We began this project as complete amateurs to CSS. In the beginning we barely knew how to style a page, but by the end of the project we developed our skillset to include usage of various CSS technologies such as flexbox and grid. We also employed various CSS animations in order to produce sleek, but not distracting page responsiveness. 

Our project is comprised of three novice web-devlopers with a total of zero hours of design experience between us. Thus, coming up with a design to create in the first place was of significant struggle for us. We are pleased with the end result, but believe that with a more experienced designer we could have achieved much more.


## Lessons Learned

The largest lession we got from this project was to be more thorough in our API selection. Several days into the project we realized the limitations in our chosen API and given time, would have wanted to use a different one. However as that would require some major refactoring of our code, we decided against it at the time. In the future we would spend a little more time thinking about our desired features and picking an API that would meet those requirements. 

## Wireframes

![](/resources/wireframe1.png)

![](/resources/wireframe2.png)

![](/resources/wireframe3.png)

## Screenshots
### Homepage
![](/resources/homepage.png)
### Watchlist (User Index)
![](/resources/watchlist.png)
### Movie Details
![](/resources/show.png)


### Details
- Axios
    - We used axios to make api fetch calls because we learned that the 'fetch' method does not function with Node.
- EJS
    - Our views pages are rendered with Embedded Javascript and styled with CSS.
- Bootstrap
    - Our project ended up with the Bootstrap carousel and collapse functionality. While we began the project excited about the wealth of frameworks that bootstrap had, we developed a distaste for the lack of the customizability and began phasing Bootstrap where possible. 
- MongoDB/Mongoose
    - We made use of the MongoDB database technology in order to store information about the user's movies. 
- MVC 
    - This project was organized under MVC practices in order to maximize efficiency in collaboration and legibility.
- REST
    - All routes in this project were produced with the REST convention.
- APIS
    - OMDB
        - The user's primary searches are conducted with the OMBD database. 
    - Youtube
        - We use the Youtube API in order to embed a youtube trailer of the user's desired movie
    - Watchmode
        - We use the Watchmode API in order to get a list of streaming services the user's movie is available on. While there is functionality in order to employ region specific searching, we chose not to employ this due to our use of a limited free API key.
    - Tastedive
        - We use this API to generate of list of recommended titles based on off the user's choice movie. 
 
 
 
 
 
 
 
