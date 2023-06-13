const scale = 1;
const height = 236 * scale;
const width = 506 * scale;
const rows = 5;
const columns = 5;

export default function chart(selector, data) {
    const canvas = document.querySelector(selector);

    if(canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        const stepY = height / rows;
        ctx.beginPath();
        ctx.strokeStyle = '#F4F4F6';
        ctx.lineWidth = scale;
        for(let i = 0; i <= rows; i += 1) {
            const y = stepY * i;
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        ctx.closePath();

        const stepX = width / columns;
        ctx.beginPath();
        ctx.strokeStyle = '#F4F4F6';
        ctx.lineWidth = scale;
        for(let i = 0; i <= columns; i += 1) {
            const x = stepX * i;
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        ctx.closePath();
        
        ctx.beginPath();;
        let x = 4 * scale;
        for(let i = 0; i < data.length; i++) {
            ctx.beginPath();
            ctx.lineWidth = scale * 2;
            ctx.lineCap = "round"
            ctx.strokeStyle = data[i].trend === 'increase' ? '#11CF8B' : '#FB3766';
            ctx.moveTo(x, (height - data[i].low * scale) - 1 * scale);
            ctx.lineTo(x, (height - data[i].high * scale) + 1 * scale);
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.lineWidth = scale * 8;
            ctx.lineCap = "round"
            ctx.strokeStyle = data[i].trend === 'increase' ? '#11CF8B' : '#FB3766';
            const start = (data[i].trend === 'increase' ? data[i].close : data[i].open) + (4 * scale);
            const end = (data[i].trend === 'increase' ? data[i].open : data[i].close) - (4 * scale);
            ctx.moveTo(x, height - start * scale);
            ctx.lineTo(x, height - end * scale);
            ctx.stroke();
            ctx.closePath();
            x += 22 * scale + scale * 2;
        }
    }
}