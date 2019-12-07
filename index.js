(() => {
    const setAttributesFromOptions = (d, tail, markerOptions, head) => {
        const [M] = d.split(/(?=[LMC])/);
        tail.setAttribute('d', M);

        Object.keys(markerOptions.tail).forEach((attr) => {
            tail.setAttribute(attr, markerOptions.tail[attr]);
        });

        Object.keys(markerOptions.head).forEach((attr) => {
            head.setAttribute(attr, markerOptions.head[attr]);
        });
    };

    const createClone = d => {
        const clone = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        clone.setAttribute('d', d);
        return clone;
    };

    const running = (idx, totalLength) => idx < totalLength;

    const followAlongPath = (markerOptions, clone, tail, head, totalLength, onEnd) => {
        let idx = 0;
        const speed = markerOptions.speed || 2;
        let destroy = null;

        const run = () => {
            const {
                x,
                y
            } = clone.getPointAtLength(idx);

            tail.setAttribute('d', tail.getAttribute('d') + ' ' + "L " + x + ',' + y);
            head.setAttribute('cx', x);
            head.setAttribute('cy', y);

            if (running(idx, totalLength)) {
                idx = idx + speed;
                destroy = requestAnimationFrame(run);
            } else {
                cancelAnimationFrame(destroy);

                if (typeof onEnd === 'function') {
                    onEnd({
                        head,
                        tail
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

        const head = document.createElementNS('http://www.w3.org/2000/svg', markerOptions.head.elem);
        const tail = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        setAttributesFromOptions(d, tail, markerOptions, head);

        const context = document.querySelector(svg);
        context.appendChild(head);
        context.appendChild(tail);

        const clone = createClone(d);
        const totalLength = clone.getTotalLength();

        followAlongPath(markerOptions, clone, tail, head, totalLength, onEnd);
    };

    const studiousDoodle = ({
        svg = 'svg',
        d,
        speed,
        head,
        tail,
        onEnd
    }) => {
        const markerOptions = {
            speed: speed || 3,
            head: head || {
                elem: 'circle',
                fill: 'black',
                r: 2
            },
            tail: tail || {
                fill: 'none',
                stroke: 'black',
                'stroke-dasharray': 3
            },
            onEnd: onEnd || (() => {
                return null;
            })
        };


        bootstrap({
            svg,
            d,
            markerOptions,
            onEnd
        });
    };


    if (typeof module !== "undefined" && module.exports) {
        module.exports = studiousDoodle;
    } else {
        window.studiousDoodle = studiousDoodle;
    }
})()
