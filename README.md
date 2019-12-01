Here's what it looks like:

```javascript
markerTail({
    d: 'M0,200 L280 0 320 60 0 600',
    markerOptions: {
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
    },
  }
});
```

[Try on Codepen](https://codepen.io/idx/pen/KVBzXX)

![Example](https://user-images.githubusercontent.com/13149550/69920477-c3204080-1488-11ea-964a-afd527c8e7ef.gif)


