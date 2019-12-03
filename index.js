(() => {
    const setAttributesFromOptions = (d, dashed, markerOptions, marker) => {
        const [M] = d.split(/(?=[LMC])/);
        dashed.setAttribute('d', M);

        Object.keys(markerOptions.tail).forEach((attr) => {
            dashed.setAttribute(attr, markerOptions.tail[attr]);
        });

        Object.keys(markerOptions.head).forEach((attr) => {
            marker.setAttribute(attr, markerOptions.head[attr]);
        });
    };

    const createClone = d => {
        const clone = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        clone.setAttribute('d', d);
        return clone;
    };

    const running = (idx, totalLength) => idx < totalLength;

    const followAlongPath = (markerOptions, clone, dashed, marker, totalLength, onEnd) => {
        let idx = 0;
        const speed = markerOptions.speed || 2;
        let destroy = null;

        const run = () => {
            const {
                x,
                y
            } = clone.getPointAtLength(idx);

            dashed.setAttribute('d', dashed.getAttribute('d') + ' ' + "L " + x + ',' + y);
            marker.setAttribute('cx', x);
            marker.setAttribute('cy', y);

            if (running(idx, totalLength)) {
                idx = idx + speed;
                destroy = requestAnimationFrame(run);
            } else {
                cancelAnimationFrame(destroy);

                if (typeof onEnd === 'function') {
                    onEnd({
                        marker,
                        dashed
                    });
                }
            }
        };

        destroy = requestAnimationFrame(run);
    };

    const bootstrap = ({
                           svg,
                           d,
                           markerOptions,
                           onEnd
                       }) => {

        const marker = document.createElementNS('http://www.w3.org/2000/svg', markerOptions.head.elem);
        const dashed = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        setAttributesFromOptions(d, dashed, markerOptions, marker);

        const context = document.querySelector(svg);

        context.appendChild(marker);
        context.appendChild(dashed);

        const clone = createClone(d);
        const totalLength = clone.getTotalLength();

        followAlongPath(markerOptions, clone, dashed, marker, totalLength, onEnd);
    };

    const markerTail = ({
                            svg = 'svg',
                            d,
                            markerOptions = {},
                            onEnd
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
            onEnd: () => {
                return null;
            }
        };


        bootstrap({
            svg,
            d,
            markerOptions: Object.assign({}, markerDefaults, markerOptions),
            onEnd
        });
    };


    if (typeof module !== "undefined" && module.exports) {
        module.exports = markerTail;
    } else {
        window.studiousDoodle = markerTail;
    }
})()
