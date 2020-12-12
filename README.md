# Covid News

this is a simple website that show latest news about COVID-19. this site has some features such as sorting, filtering the news.

## Libraries

The list of libraries and packages use in this project comming below:
* axios: v0.21.0
* bootstrap: v4.5.3
* react-time-ago: v6.2.1
* javascript-time-ago: latest version
* react-icons: v4.1.0
* redux: v4.0.5
* react-redux: v7.2.2

## Structure

this Project is base on ReactJs  and containing main three files *Home.js*, *NewsList.Js* & *DetailsView.Js*.

That *Home.js* file is main page of the site and the other files are included in this files and just used to have a clear code.

After opening website and rendering *App.js* file the *Home.js* component loading and intime the *NewsList* that included in *Home.js* file rendering and get latest news with *COVID Vaccine* keyword and by default soring them by publised time and date. The *DetailsView.js* component is rendering when user clicked on each news item in the list.

## Explain Main Files

### Home.js

```
this.state = {
    virusOpacity: 0,
    fixHeader: false,
}
```
There are three state that declare in *Home* class constructor. 

**virusOpacity** used to set the opacity value of the virus illustrator that appear after scrolling to the bottom and vanish after scroll top.

**fixHeader** used to toggle the visibility of the secondary header that apear in scrolling such as *virusOpacity* action.

```
componentDidMount() {
    this.getVirusData();
    window.addEventListener('scroll', this.listenScrollEvent)
}
```
this method call after rendering and call *getVirusData* function and use *listenScrollEvent* as  scroll listener.
```
componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.show) {
        document.body.classList.add('overflow-hidden');
    } else {
        document.body.classList.remove('overflow-hidden');
    }
}
``` 
This method call after any change in state and props and check the dispaly state of *DetailsView* and if this class rendering and show is true this part add *overflow-hidden* class to body tag and prevent the background scrolling when *DetailsView* class is rendering and if *show* is false remove this class and body tag can has scroll bar.

`show props in declare in website store.`

### NewsList.js

### DetailsView.js