# AWD Assignment 2


1. Change matchpage to user center/profile page
 * who viewed you
 * change matches
2. Realtime chat page
3. match quality realtime representation
4. user authentication
5. state perseve: cookies
5. a page explaining the matching algorithm
6. at least one page describing the architecture you used, the design choices you made and any difficulties encountered along the way.
7. one page describing the test and validation strategy and results.
8. one page giving short bios of yourself, and any references used.

### hash function: https://github.com/h2non/jshashes
### css library: bulma

# database
* user profile database: userid, interests list, description, who_viewed_me(userid list)

* authentication: userid, username, hashed_password
当用户登陆时候，发送cookie: userid=userid; hashvalue = hash(userid+username), 用户端保存。   
当每次登陆的时候，用户发送cookie到服务器端, "userid=zhangle;hashvalue=daf%$%#defghy5t4"，服务器端查到userid, username，做hash(userid+username) ==? hashvalue

* message: fromid, toid, content, time

* friends: userid, *username* del, friends(userid list)

# Todo:
JiYan:
  * user center webpage
  * match quality result page 
  * other user's profile page (username, )
Zhangle:
  * add friend page
  * chatting page
  * authentication
 

## Reference
1. https://www.w3schools.com/css/css3_gradients.asp*/
2. http://eloquentjavascript.net/
3. https://webpack.github.io/docs/webpack-dev-server.html
4. http://learn.shayhowe.com/html-css/
5. http://weizhifeng.net/javascript-the-core.html
6. https://validator.w3.org/
7. https://www.google.com/fonts
8. https://www.w3schools.com/css/default.asp
9. https://www.w3schools.com/js/default.asp
10. http://meyerweb.com/eric/tools/css/reset/
11. Pictures: 
 * https://s-media-cache-ak0.pinimg.com/736x/57/48/7e/57487ed6d715132d0fd2c086ef25d5a5.jpg
 * http://www.peepandthebigwideworld.com/static/images/games_only_btn.png
 * https://img.clipartfest.com/981ae1ce51f56cf6aa3c693f9b9be44e_sports-high-school-sports-clipart_1430-1075.jpeg
