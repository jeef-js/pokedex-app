function trimImage(url) {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const figure = document.createElement('figure');

    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        const pixels = ctx.getImageData(0, 0, img.width, img.height);
        let x;
        let y;
        const bound = {
            top: null,
            bottom: null,
            left: null,
            right: null
        };

        for(let i = 0; i < pixels.data.length; i += 4) {
            if(pixels.data[i + 3] !== 0) {
                x = i / 4 % img.width;
                y = ~~((i / 4) / img.width);

                if(bound.top === null || bound.top > y) {
                    bound.top = y;
                }

                if (bound.left === null) {
                    bound.left = x; 
                } else if (x < bound.left) {
                    bound.left = x;
                }
          
                if (bound.right === null) {
                    bound.right = x; 
                } else if (bound.right < x) {
                    bound.right = x;
                }
          
                if (bound.bottom === null) {
                    bound.bottom = y;
                } else if (bound.bottom < y) {
                    bound.bottom = y;
                }
            }
        }

        const trimHeight = bound.bottom - bound.top + 1;
        const trimWidth = bound.right - bound.left + 1;
        const trim = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);

        const trimmedCanvas = document.createElement('canvas');
        trimmedCanvas.width = trimWidth;
        trimmedCanvas.height = trimHeight;
        trimmedCanvas.getContext('2d').putImageData(trim, 0, 0);

        figure.appendChild(trimmedCanvas);
    }

    img.crossOrigin = 'Anonymous';
    img.src = url;

    return figure;
}
