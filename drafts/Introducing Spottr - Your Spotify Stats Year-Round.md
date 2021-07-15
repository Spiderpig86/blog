# 🎉 Introducing Spottr - Your Spotify Stats Year-Round

As a long-time Spotify user, I love the end-of-year stats that Spotify surfaces each year. If you’re like me, you probably hate waiting till the end of each year just to see your top songs, artists, and genres.

This is why I developed **Spottr**, a progressive web app that satisfies that curiosity!

## What

![](https://raw.githubusercontent.com/Spiderpig86/spottr/master/src/assets/images/preview.png)

Spottr is a PWA developed to surface your Spotify listening habits year-round rather than at the end of each year.

## Why

The first main reason as stated above was the burning desire I had to know about how my listening habits have changed over time.

The second reason was to rewrite this project again from scratch using Angular 10, Tailwind CSS, and push my design and front-end development skills. My first iteration was started back in 2018 with Angular 6, but I scrapped that since the project was not planned out properly. I am by no means an expert front-end developer (I mainly do back-end), but I wanted to see if I can produce a significantly better application just with more careful planning and research. 

One of the more interesting pieces of the app is the `CachedHttpService`. This TTL cache was developed out of a need to keep the PWA snappy and keep data consumption low. If you think about the usage patterns of someone using Spotify, people may sometimes spend lots of time browsing different artists, albums, tracks, etc. which could result in a lot of extra round trips between the client and Spotify servers. This service was developed to provide a centralized mechanism to cache all HTTP requests. This allows for any other service to leverage the same caching strategy, resulting in faster development times.

The library also allows for a custom time limit to be set for the cached entries (the duration is known as TTL or time-to-live). Each request can have a unique TTL if you so desire.

As a result, all other Angular services developed such as `ArtistService`, `TrackService`, etc. all follow a repeatable and consistent pattern which reduces the chances for any silly bugs.

```ts
@Injectable()
export class MyService {
    // Inject the service here
    constructor(private http: CachedHttpService) {}
    
    getSomeData(id: string): Observable<GetSomeDataResponse> {
        const endpoint = new URL(ENDPOINTS.get(`get_some_data`));
        return this.http.get({
            url: endpoint.toString(),
            cacheMins: DEFAULT_CACHE_MINS,
        });
    }
    
    putSomeData(id: string, foo: Foo, bar: Bar): Observable<PutSomeDataResponse> {
        const endpoint = new URL(ENDPOINTS.get(`post_some_data`));
        const body: PutSomeDataRequest = {
            id,
            foo,
            bar,
        };
        return this.http.post({
            url: endpoint.toString(),
            body,
        });
    }
}
```

This is just a brief overview of how it works, but I may write a more in-depth post on this in the future.

On the UI side, this is my first project experimenting with Tailwind CSS which ended up being quite pleasant to use. A good chunk of the interface was built using [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout). As a long-time Flexbox user, CSS Grid has proven to be an even more flexible way to lay out your components.

> Short self plug: If you’re looking for an extensive yet simple-to-learn SCSS framework, check out my project [Cirrus](https://cirrus-ui.netlify.app/)!

## How to Use

- Head over to [spottr.vercel.app](https://spottr.vercel.app/login).
- Log in using your Spotify credentials.
- Browse Spottr!

## Current Features

**Top Stats**

- View details for your top:
  - Artists
  - Tracks
  - Genres
- Get data broken down for:
  - Last 4 Weeks
  - Last 6 Months
  - All Time

**Playlist**

- Browse the playlists you follow or created.
- Get similar tracks for a given playlist.
- Export similar playlist to your Spotify account.

**Track**

- View track details including musical and audio features.
- Discover related tracks.

**Artist**

- View artist genres, follower count, and popularity.
- View artist's top tracks.
- Discover similar artists.

## Preview

![](https://raw.githubusercontent.com/Spiderpig86/spottr/master/images/demo.gif)

## Tech Stack

- :zap: [Angular](https://angular.io/) - a platform for building mobile and desktop web applications.
- :art: [Tailwind](https://tailwindcss.com/) - Rapidly build modern websites without ever leaving your HTML.
- :musical_note: [Spotify API](https://developer.spotify.com/documentation/web-api/) - for fetching Spotify data.
- :bar_chart: [Chart.js](https://www.chartjs.org/) - Simple, clean and engaging HTML5 based JavaScript charts.

## Planned Updates

- View recently played tracks.
- View top albums.
- Detailed beat analysis graph.
- Informational cards for each track and artist.
- Song lyrics.

## Thanks for reading!
:gem: Thank you for taking the time to check out this post. For more content like this, head over to my actual [blog](https://slim.netlify.app/). Feel free to reach out to me on [LinkedIn](https://www.linkedin.com/in/serbis/) and follow me on [Github](https://github.com/Spiderpig86).