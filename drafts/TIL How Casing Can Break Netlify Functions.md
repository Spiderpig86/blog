# TIL How Casing Can Break Netlify Functions

Did you know Netlify Functions could break when renamed to the same name with a different casing? I sure didn't.

## What are Netlify Functions?

If you know what AWS Lambda or GCP Cloud Functions are, then Netlify Functions won't be a stranger to you. Netlify functions are serverless functions powered by Netlify's infrastructure. These functions are designed to allow you and me to quickly build and deploy serverless applications without the need for managing infrastructure or scaling concerns.

One of the common ways we can use Netlify Functions is by serving API routes defined in frameworks like Next.js. Suppose I wanted to create some endpoints for my frontend application to call, like `/api/toast/<id>`. In that case, Next.js enables you to create your route within the same root directory under the `/pages/api` directory. You can read more about it [here](https://nextjs.org/docs/api-routes/introduction).

## Is this a bug?

I have been toying around with Netlify Functions to test a few APIs here and there to see how easy it is to integrate into a project. Over time, one of the routes I defined stopped working on my live deployment. _And the worst part was that it worked locally._

![](https://media.tenor.com/EkIUnR14JCIAAAAd/works-on-my-machine-ryan-gosling.gif)

The route was a [dynamic API route](https://nextjs.org/docs/api-routes/dynamic-api-routes) that took in an id called `toastId` so I can fetch a piece of Toast by id (this is a simple test app, don't worry about it).

```ts
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { toastId } = req.query;
    // Fetch the piece of toast by id and do something with it...
  } catch (ex) {
    // ...
  }
};
```

Looking through the Git history to see what change may have broke, it didn't give too many hints as to how I broke it -- neither did logging out the value on my local deployment. 

What did help was logging out the value on the deployed instance of my test app. Turns out, my renaming of the dynamic route file from `[toastid].ts` to `[toastId].ts` broke what I initially deployed to Netlify. When I ran the server locally, the casing change took effect as expected. However, it was not reflected when deployed to Netlify. As a result, my route was not able to extract the path parameter using the following  code snippet:

```ts
const { toastId } = req.query; // `toastid` was being populated instead
```

After renaming the file from `[toastId].ts` to `[toastid].ts`, the route worked once more.

Now, is this a bug or just an undocumented behavior? Unfortunately, I have yet to find an answer for this in the Netlify and Next.js documentation or StackOverflow and Github Discussions. Please let me know if any of you do!

## Tl;dr

The name you choose for your routes in your Next.js app matters. It may not be apparent when you're working on it locally, but quirks such as this one on Netlify can throw a wrench into your application deployed in prod.