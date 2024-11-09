export const generatePolygonSegments = (numSegments: number) => {
    const colors = [
        '#FFDD00', '#FFA500', '#FF0000', '#800080', '#4B0082',
        '#008000', '#00FF00', '#00FFFF'
    ]; // Add more colors if necessary
    const styles = [];

    // Calculate each segment's clip-path
    for (let i = 0; i < numSegments; i++) {
        const angle1 = (360 / numSegments) * i;
        const angle2 = (360 / numSegments) * (i + 1);

        const x1 = 50 + 50 * Math.cos((angle1 * Math.PI) / 180);
        const y1 = 50 + 50 * Math.sin((angle1 * Math.PI) / 180);
        const x2 = 50 + 50 * Math.cos((angle2 * Math.PI) / 180);
        const y2 = 50 + 50 * Math.sin((angle2 * Math.PI) / 180);

        // Create a clip-path in polygon format
        const clipPath = `polygon(50% 50%, ${x1}% ${y1}%, ${x2}% ${y2}%)`;

        // Assign a style object for each segment, including text
        styles.push({
            backgroundColor: colors[i % colors.length], // Cycle through colors
            clipPath,
            text: `Segment ${i + 1}`, // Add text for each segment
        });
    }

    return styles;
};



export const generatePolygonSegmentsSmall = (numSegments: number) => {
    const styles = [];

    // Calculate each segment's clip-path
    for (let i = 0; i < numSegments; i++) {
        const angle1 = (360 / numSegments) * i;
        const angle2 = (360 / numSegments) * (i + 1);

        const x1 = 50 + 50 * Math.cos((angle1 * Math.PI) / 180);
        const y1 = 50 + 50 * Math.sin((angle1 * Math.PI) / 180);
        const x2 = 50 + 50 * Math.cos((angle2 * Math.PI) / 180);
        const y2 = 50 + 50 * Math.sin((angle2 * Math.PI) / 180);

        // Create a clip-path in polygon format
        const clipPath = `polygon(50% 50%, ${x1}% ${y1}%, ${x2}% ${y2}%)`;

        // Assign a style object for each segment
        styles.push({
            // backgroundColor: 'bg-background', // Cycle through colors
            clipPath,
        });
    }

    return styles;
}
