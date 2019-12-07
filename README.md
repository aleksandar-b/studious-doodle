## Usage

Here's what it looks like:

```javascript
studiousDoodle({
    d: 'M0,200 L280 0 320 60 0 600',
    head: {
        elem: 'circle',
        fill: 'white',
        r: 5
    },
    tail: {
        fill: 'none',
        stroke: 'white',
        'stroke-width': 1,
        'stroke-dasharray': 4
    }
});
```



[Try on Codepen](https://codepen.io/idx/pen/KVBzXX)

![Example](https://user-images.githubusercontent.com/13149550/69920477-c3204080-1488-11ea-964a-afd527c8e7ef.gif)



## Properties Overview 

| Property          | Required | Description                  | Default                  |
|---------------|----------|------------------------------|--------------------------|
| d            | Yes        | path d attribute             | none                     |
| svg           | No        | svg container css selector    | first svg element in DOM |
| speed | No        | speed of animation | see default marker options   |
| head | No        | head svg element and attributes | see default marker options   |
| tail | No        | tail svg attributes | see default marker options   |
| head | No        | head element | see default marker options   |
| onEnd | No        | on end callback | noop   


###### Default marker options

```javascript
    {
        speed: 3, 
        head: {
            elem: 'circle', // any svg element
            fill: 'black',
            r: 2
        },
        tail: { // path by default, not customizable
            fill: 'none',
            stroke: 'black',
            'stroke-dasharray': 3
        }
    }       


```
