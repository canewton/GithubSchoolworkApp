import axios from 'axios';

//make an instance of axios that has some preset options assigned
//this gets some code reuse
export default axios.create({
    //baseURL save you from having to write the entire URL
    //all of the urls that I use have this string at the start of it
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers:{
        Authorization: 'Bearer V7OwXydePrWCx-ux7mbP07ii8hP_CCd8ipXVmcZI4NuHrAwX8NyntETsF_QIgM4cqVNtFitP87OYJBeje5hn3PoLjvLhhfC0B0rxoFkrT4IEkMnsP7_E4Iqq4EYDYHYx'
    }
});