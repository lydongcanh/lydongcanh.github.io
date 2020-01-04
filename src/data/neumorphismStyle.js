export default function neumorphismStyle(
    {
        style,
        backgroundStartColor = "rgba(0, 0, 0, .03)",
        backgroundEndColor = "rgba(255, 255, 255, 1)",
        shadowStartColor = "rgba(255, 255, 255, 1)",
        shadowEndColor = "rgba(0, 0, 0, .4)",
        shadowDistance = "10px",
        borderRadius = "10px" 
    } = {},
) {
    let result = {
        borderRadius: borderRadius,
        background: `linear-gradient(145deg, ${backgroundStartColor}, ${backgroundEndColor})`,
        boxShadow: `0 -${shadowDistance} ${shadowDistance} ${shadowStartColor}, 
                    0 ${shadowDistance} ${shadowDistance} ${shadowEndColor}`
    };

    if (style) {
        for(let prop in style) {
            if (Object.prototype.hasOwnProperty.call(style, prop)) {
                result[prop] = style[prop];
            }
        }
    }

    return result;
}