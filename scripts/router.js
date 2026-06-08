import { renderPage } from "./main.js";

const route = (event) => {
  //Get the hash from the clicked link and set it as the window location hash, then call the renderPage function to render the appropriate tasks based on the new hash
  event = event || window.event;
  //Prevent the default link behavior of navigating to a new page
  event.preventDefault();
  //Set the window location hash to the href attribute of the clicked link
  window.location.hash = event.target.getAttribute("href");
};
//Handle the hash change event to render the appropriate tasks based on the new hash
const handleLocation = () => {
  renderPage();
};
//Listen for hash changes and call the handleLocation function to render the appropriate tasks based on the new hash
window.addEventListener("hashchange", handleLocation);
//Set the window route function to the route function defined above so that it can be called from the HTML onclick attributes of the links
window.route = route;
//Call the handleLocation function on page load to render the appropriate tasks based on the initial hash
handleLocation();
