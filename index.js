const run = ({
    svg,
    d,
    markerOptions
}) => {

    const marker = document.createElementNS('http://www.w3.org/2000/svg', markerOptions.head.elem);

    const dashed = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const [M] = d.split(/(?=[LMC])/);

    dashed.setAttribute('d', M);

    Object.keys(markerOptions.tail).forEach((attr) => {
        dashed.setAttribute(attr, markerOptions.tail[attr]);
    });

    Object.keys(markerOptions.head).forEach((attr) => {
        marker.setAttribute(attr, markerOptions.head[attr]);
    });

    const context = document.querySelector(svg);

    context.appendChild(marker);
    context.appendChild(dashed);


    const clone = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    clone.setAttribute('d', d);

    const totalLength = clone.getTotalLength();
    let idx = 0;
    const speed = markerOptions.speed || 2;
    const run = () => {
        const {
            x,
            y
        } = clone.getPointAtLength(idx);

        dashed.setAttribute('d', dashed.getAttribute('d') + ' ' + "L " + x + ',' + y);
        marker.setAttribute('cx', x);
        marker.setAttribute('cy', y);

        if (idx < totalLength) {
            idx = idx + speed;
            requestAnimationFrame(run);
        }
    };

    requestAnimationFrame(run);
}

const markerTail = ({
    svg = 'svg',
    d,
    markerOptions = {}
}) => {
    const markerDefaults = {
        speed: 3,
        head: {
            elem: 'circle',
            fill: 'black',
            r: 2
        },
        tail: {
            fill: 'none',
            stroke: 'black',
            'stroke-dasharray': 3
        },
    };


    const app = run({
        svg,
        d,
        markerOptions: Object.assign({}, markerDefaults, markerOptions)
    });
};

if (typeof module != "undefined" && module.exports) {
    module.exports = markerTail;
}
